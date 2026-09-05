import { chromium, expect } from "@playwright/test";
import { mkdir, symlink, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { spawn } from "node:child_process";
import assert from "node:assert/strict";

// Runs against the actual Next static export, including its GitHub Pages prefix.
// Playwright is installed only in CI; package.json and the lockfile are untouched.
await mkdir(".browser-site", { recursive: true });
await symlink(resolve("out"), ".browser-site/portfolio", "dir");
await mkdir("browser-evidence", { recursive: true });
const server = spawn("python3", ["-m", "http.server", "4173", "--bind", "127.0.0.1", "--directory", ".browser-site"], { stdio: "ignore" });
const origin = "http://127.0.0.1:4173/portfolio/";
const results = [];
let browser;
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
try {
  for (let attempt = 0; attempt < 50; attempt++) {
    try { if ((await fetch(origin)).ok) break; } catch { /* Server startup only. */ }
    if (attempt === 49) throw new Error("Static export server did not start");
    await sleep(100);
  }
  browser = await chromium.launch();
  for (const width of [320, 360, 390, 768, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: "reduce" });
    const page = await context.newPage();
    const failures = [];
    page.on("pageerror", error => failures.push(error.message));
    page.on("response", response => { if (response.status() >= 400 && response.url().startsWith(origin)) failures.push(`${response.status()} ${response.url()}`); });
    await page.goto(origin, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `Horizontal overflow at ${width}px`);
    await expect(page.locator(".portrait-image img")).toBeVisible();
    assert(await page.locator(".portrait-image img").evaluate(img => img.complete && img.naturalWidth > 0), `Portrait failed at ${width}px`);
    await expect(page.locator(".portrait-cover")).not.toHaveAttribute("data-animated", "true");
    const sizes = await page.locator(".compose-form input, .compose-form select, .compose-form textarea").evaluateAll(elements => elements.map(el => ({ height: el.getBoundingClientRect().height, font: parseFloat(getComputedStyle(el).fontSize) })));
    assert(sizes.every(size => size.height >= 44 && size.font >= 16), `Small form controls at ${width}px`);
    await page.screenshot({ path: `browser-evidence/hero-${width}.png` });
    await page.locator(".compose-prepare").click();
    assert(await page.locator(".compose-form input:invalid").count(), "Empty name was accepted");
    await page.getByRole("textbox", { name: "Your name", exact: true }).fill("Dana & 李");
    await page.getByRole("textbox", { name: "Message", exact: true }).fill("Our domains land in spam. Please inspect SPF & DKIM.");
    await page.locator(".compose-prepare").click();
    await expect(page.getByText("Email prepared, not sent.", { exact: true })).toBeVisible();
    const href = await page.getByRole("link", { name: "Open email app", exact: true }).getAttribute("href");
    assert(new URLSearchParams(href.split("?")[1]).get("subject").includes("Dana & 李"), "Mailto encoding lost content");
    // Actual keyboard input is essential: pointer-initiated .focus() need not
    // match :focus-visible and cannot test the keyboard user's experience.
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Open email app", exact: true })).toBeFocused();
    const focus = await page.getByRole("link", { name: "Open email app", exact: true }).evaluate(el => ({ style: getComputedStyle(el).outlineStyle, width: parseFloat(getComputedStyle(el).outlineWidth) }));
    assert(focus.style !== "none" && focus.width >= 2, "Missing keyboard focus ring");
    if (width === 390 || width === 1440) {
      await page.locator(".compose-result").scrollIntoViewIfNeeded();
      await page.screenshot({ path: `browser-evidence/contact-${width}.png` });
    }
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `Prepared message overflows at ${width}px`);
    await page.getByRole("textbox", { name: "Your name", exact: true }).fill("Updated name");
    await expect(page.locator(".compose-result")).toHaveCount(0);
    assert.deepEqual(failures, [], `Browser errors at ${width}px`);
    results.push(`PASS ${width}px: portrait, overflow, form sizing, validation, Unicode encoding, keyboard focus, draft invalidation`);
    await context.close();
  }
  const motion = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: "no-preference" });
  const page = await motion.newPage();
  await page.goto(origin, { waitUntil: "networkidle" });
  await expect(page.locator(".portrait-cover")).toHaveAttribute("data-animated", "true");
  await expect(page.locator(".portrait-canvas")).toHaveCSS("opacity", "1");
  const first = await page.locator("canvas").evaluate(canvas => canvas.toDataURL());
  await page.evaluate(() => scrollTo(0, 600));
  await expect.poll(() => page.locator("canvas").evaluate(canvas => canvas.toDataURL())).not.toBe(first);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".portrait-cover")).not.toHaveAttribute("data-animated", "true");
  await expect(page.locator(".portrait-canvas")).toHaveCSS("opacity", "0");
  assert(await page.locator(".portrait-cover").evaluate(el => el.offsetHeight < innerHeight * 1.5), "Reduced-motion scene retains forced scroll");
  results.push("PASS desktop: canvas changes on scroll; live reduced-motion switch restores static portrait and collapses scene");
  await motion.close();

  const noJS = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const plain = await noJS.newPage();
  await plain.goto(origin, { waitUntil: "networkidle" });
  assert(await plain.locator(".portrait-image img").evaluate(img => img.complete && img.naturalWidth > 0), "No-JS portrait failed");
  assert(await plain.locator(".reveal").evaluateAll(els => els.every(el => getComputedStyle(el).opacity === "1")), "No-JS content hidden");
  await expect(plain.getByRole("link", { name: "Explore services", exact: true })).toBeVisible();
  results.push("PASS no JavaScript: real portrait, visible reading sections, services link");
  await noJS.close();

  const routes = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
  const routePage = await routes.newPage();
  for (const route of ["work/", "about/", "contact/", "services/deliverability/"]) {
    const response = await routePage.goto(origin + route, { waitUntil: "networkidle" });
    assert.equal(response.status(), 200, `Route failed: ${route}`);
    assert(await routePage.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `Route overflows: ${route}`);
    results.push(`PASS mobile route: ${route}`);
  }
  await routes.close();
  await writeFile("browser-evidence/results.txt", results.join("\n") + "\n");
  console.log(results.join("\n"));
} catch (error) {
  await writeFile("browser-evidence/results.txt", results.join("\n") + `\nFAIL ${error.stack}\n`);
  console.error(`::error::Browser acceptance failed: ${error.message}`);
  throw error;
} finally {
  await browser?.close();
  server.kill("SIGTERM");
}
