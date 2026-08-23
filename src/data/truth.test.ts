import { describe, expect, it } from "vitest";
import { services } from "./services";
import { testimonials } from "./testimonials";
import { proofMetrics } from "./proof";
import { site } from "./site";
import { portfolioCases } from "./portfolio";
import { experiences, certifications, education } from "./timeline";

const BANNED_PATTERNS = [
  /lorem/i,
  /apex pipeline/i,
  /\$4\.6M/i,
  /250\+ meetings/i,
  /ninja/i,
  /rockstar/i,
  /guru/i,
  /passionate/i,
];

const allDataString = JSON.stringify({
  services,
  testimonials,
  proofMetrics,
  site,
  portfolioCases,
  experiences,
  certifications,
  education,
});

describe("Content Truth & Guard Tests", () => {
  it("never includes fabricated claims or placeholder text", () => {
    for (const pattern of BANNED_PATTERNS) {
      expect(allDataString).not.toMatch(pattern);
    }
  });

  it("contains exactly 5 verified service pillars with robust deliverables", () => {
    expect(services).toHaveLength(5);
    for (const s of services) {
      expect(s.deliverables.length).toBeGreaterThanOrEqual(3);
      expect(s.tools.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("contains all 7 verified Upwork reviews with 5.0 rating", () => {
    expect(testimonials).toHaveLength(7);
    for (const t of testimonials) {
      expect(t.rating).toBe(5.0);
      expect(t.quote.length).toBeGreaterThan(15);
    }
  });

  it("contains verified profile metrics matching Upwork", () => {
    expect(site.stats.jss).toBe("100%");
    expect(site.stats.rating).toBe("5.0");
    expect(site.stats.completedJobs).toBe("7");
  });
});
