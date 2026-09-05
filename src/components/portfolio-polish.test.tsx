import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import { ComposeCTA } from "./ComposeCTA";
import { ScrollPortraitHero } from "./ScrollPortraitHero";

let host: HTMLDivElement;
let root: Root;
beforeEach(() => {
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
  host = document.createElement("div");
  document.body.append(host);
  root = createRoot(host);
  vi.stubGlobal("matchMedia", vi.fn(() => ({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() })));
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
});
afterEach(async () => {
  await act(async () => root.unmount());
  host.remove();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});
async function render(element: React.ReactNode) {
  await act(async () => root.render(element));
}
async function fill(selector: string, value: string) {
  const field = host.querySelector<HTMLInputElement | HTMLTextAreaElement>(selector)!;
  const proto = field.tagName === "TEXTAREA" ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
  await act(async () => {
    Object.getOwnPropertyDescriptor(proto, "value")!.set!.call(field, value);
    field.dispatchEvent(new Event("input", { bubbles: true }));
  });
}
async function prepare() {
  await fill('input[aria-label="Your name"]', "Dana & 李");
  await fill('textarea[aria-label="Message"]', "Our domains land in spam. Can you inspect SPF & DKIM?");
  await act(async () => host.querySelector("form")!.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true })));
}
describe("contact preparation", () => {
  it("requires a name and a useful message before preparing", async () => {
    await render(<ComposeCTA />);
    expect(host.querySelector("form")!.checkValidity()).toBe(false);
    await act(async () => host.querySelector("form")!.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true })));
    expect(host.textContent).not.toContain("Email prepared, not sent.");
  });
  it("preserves encoded content and never claims the mail client opened", async () => {
    await render(<ComposeCTA />);
    await prepare();
    expect(host.textContent).toContain("Email prepared, not sent.");
    const link = Array.from(host.querySelectorAll("a")).find(a => a.textContent === "Open email app");
    expect(link).toBeDefined();
    const params = new URLSearchParams(link!.getAttribute("href")!.split("?")[1]);
    expect(params.get("subject")).toContain("Dana & 李");
    expect(params.get("body")).toContain("SPF & DKIM?");
    expect(host.textContent).not.toContain("Draft opened");
  });
  it("offers manual recovery when clipboard permission is denied", async () => {
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: vi.fn().mockRejectedValue(new Error("denied")) } });
    await render(<ComposeCTA />);
    await prepare();
    const copy = Array.from(host.querySelectorAll("button")).find(b => b.textContent === "Copy message");
    expect(copy).toBeDefined();
    await act(async () => copy!.click());
    expect(host.textContent).toContain("Select the message below and copy it manually.");
    expect(host.querySelector('textarea[readonly]')).not.toBeNull();
  });
});
describe("progressive portrait and reading path", () => {
  it("keeps the real portrait and actions without canvas support", async () => {
    await render(<ScrollPortraitHero />);
    expect(host.querySelector("picture img")).not.toBeNull();
    expect(host.querySelector('[role="status"]')).toBeNull();
    expect(host.querySelector('a[href="#services"]')).not.toBeNull();
    expect(host.querySelector("h1")!.textContent).toContain("Cold email");
  });
  it("does not fetch the sequence when reduced motion is enabled", async () => {
    const fetch = vi.fn();
    vi.stubGlobal("fetch", fetch);
    const image = vi.fn();
    vi.stubGlobal("Image", image);
    await render(<ScrollPortraitHero />);
    expect(image).not.toHaveBeenCalled();
    expect(fetch).not.toHaveBeenCalled();
    expect(host.querySelector("section")!.getAttribute("data-animated")).not.toBe("true");
  });
  it("keeps revealed content readable before JavaScript", () => {
    const css = readFileSync("src/app/globals.css", "utf8");
    const rule = css.match(/\.reveal\s*\{([^}]+)\}/)?.[1];
    expect(rule).toBeDefined();
    expect(rule).not.toMatch(/opacity:\s*0(?:;|\s)/);
    expect(rule).not.toContain("will-change");
  });
});
