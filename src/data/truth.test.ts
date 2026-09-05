import { describe, expect, it } from "vitest";
import { services } from "./services";
import { testimonials } from "./testimonials";
import { proofMetrics } from "./proof";
import { site } from "./site";
import { portfolioCases } from "./portfolio";
import { experiences, certifications, education } from "./timeline";

/**
 * PRODUCT.md hard rule: no invented numbers, clients, or logos. This file is
 * where that rule becomes executable. Two categories are banned.
 *
 * 1. Retired claims. Anything from the old Apex Pipeline page or the
 *    superseded AUTH PASS branch. If one reappears, someone copied from a
 *    dead draft.
 * 2. Unverifiable promises. Deliverability has no guarantees: mailbox
 *    providers decide placement, not the sender. Any absolute promise reads
 *    as a tell to the exact technical buyer this site is for.
 */
const BANNED_PATTERNS: Array<[RegExp, string]> = [
  [/lorem/i, "placeholder text"],
  [/apex pipeline/i, "retired brand"],
  [/\$4\.6M/i, "retired invented figure"],
  [/250\+\s*meetings/i, "retired invented figure"],
  [/\+32%/i, "retired invented figure"],
  [/3\.1x/i, "retired invented figure"],
  [/apexpipeline/i, "retired invented address"],
  [/100%\s*deliver(y|ability)/i, "unverifiable promise"],
  [/guaranteed?\s+(inbox|delivery|placement)/i, "unverifiable promise"],
  [/delivery confidence/i, "unverifiable promise"],
  [/\bninja\b/i, "banned voice"],
  [/\brockstar\b/i, "banned voice"],
  [/\bguru\b/i, "banned voice"],
  [/passionate/i, "banned voice"],
  // Invented outcome metrics removed from the case files: these read like
  // dashboard numbers but were never backed by a screenshot or export.
  [/zero burn/i, "unverifiable invented metric"],
  [/primary\s*100/i, "unverifiable invented metric"],
  [/95\s*[\u2013-]\s*100\s*%/i, "unverifiable invented metric"],
  [/inbox health/i, "unverifiable invented metric"],
  // Distorted counts. The profile says 7 of 8 jobs completed, 3 in progress.
  [/7\s*\/\s*7/i, "distorted job count (profile says 7 of 8)"],
  // "Top Rated" is an Upwork badge this profile has not been shown to carry.
  [/top rated/i, "unverified badge claim"],
  [/\u2014/, "em dash (PRODUCT.md voice rule)"],
];

const allData = {
  services,
  testimonials,
  proofMetrics,
  site,
  portfolioCases,
  experiences,
  certifications,
  education,
};

const allDataString = JSON.stringify(allData);

describe("content truth guards", () => {
  it.each(BANNED_PATTERNS)(
    "never publishes %s (%s)",
    (pattern: RegExp, reason: string) => {
      const hit = allDataString.match(pattern);
      expect(
        hit,
        `found ${JSON.stringify(hit?.[0])} in published data: ${reason}`
      ).toBeNull();
    }
  );

  it("every service carries deliverables and named tools", () => {
    expect(services.length).toBeGreaterThanOrEqual(5);
    for (const s of services) {
      expect(s.deliverables.length).toBeGreaterThanOrEqual(3);
      expect(s.tools.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("every testimonial is a real 5.0 with a quote long enough to be real", () => {
    expect(testimonials).toHaveLength(7);
    for (const t of testimonials) {
      expect(t.rating).toBe(5.0);
      expect(t.quote.length).toBeGreaterThan(15);
    }
  });

  it("profile metrics match the Upwork profile", () => {
    expect(site.stats.jss).toBe("100%");
    expect(site.stats.rating).toBe("5.0");
    expect(site.stats.completedJobs).toBe("7");
    expect(site.stats.totalJobs).toBe("8");
  });

  /**
   * These three were wrong in the first build: DNA Protected read Jul 2023,
   * Aggressive ROI read Feb 2020, SoftTech-iT ended Jun 2022. Published
   * biography does not get to drift, so it is pinned.
   */
  it("employment dates match the Upwork profile", () => {
    const byOrg = (needle: string) =>
      experiences.find((e) => e.organization.includes(needle));

    expect(byOrg("DNA Protected")?.period).toBe("Jul 2025 \u2013 Present");
    expect(byOrg("Aggressive ROI")?.period).toBe("Feb 2021 \u2013 Present");
    expect(byOrg("SoftTech-iT")?.period).toBe("Jan 2017 \u2013 Jun 2020");
  });

  it("certifications carry an issue date and a verified flag", () => {
    expect(certifications.length).toBeGreaterThan(0);
    for (const c of certifications) {
      expect(c.period).toMatch(/\d{4}/);
      expect(c.verified).toBe(true);
    }
  });
});
