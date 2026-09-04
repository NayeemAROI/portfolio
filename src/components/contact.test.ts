import { describe, expect, it } from "vitest";
import { services } from "@/data/services";
import { topics, isContactTopic } from "@/data/topics";
import { serviceTopics, contactHrefForService } from "@/data/serviceTopics";
import { buildMailto } from "@/components/ComposeCTA";

describe("contact topics", () => {
  it("recognises every known topic", () => {
    for (const topic of topics) {
      expect(isContactTopic(topic)).toBe(true);
    }
    expect(isContactTopic("Free crypto")).toBe(false);
  });

  it("maps every service pillar to a valid topic", () => {
    for (const service of services) {
      const topic = serviceTopics[service.id];
      expect(topic, `missing contact topic for service "${service.id}"`).toBeDefined();
      expect(isContactTopic(topic)).toBe(true);
    }
  });

  it("builds a contact link that preselects the topic", () => {
    const href = contactHrefForService("deliverability");
    expect(href.startsWith("/contact?topic=")).toBe(true);
    const value = new URLSearchParams(href.split("?")[1]).get("topic");
    expect(value).toBe("Deliverability rescue");
  });

  it("falls back to a plain contact link for unknown services", () => {
    expect(contactHrefForService("does-not-exist")).toBe("/contact");
  });
});

describe("buildMailto", () => {
  const mailto = buildMailto({
    email: "hello@example.com",
    name: "Dana",
    company: "Acme",
    topic: "Deliverability rescue",
    message: "Our mail started landing in spam last week.",
  });

  it("targets the given address", () => {
    expect(mailto.startsWith("mailto:hello@example.com?")).toBe(true);
  });

  it("encodes the subject and body", () => {
    const params = new URLSearchParams(mailto.split("?")[1]);
    expect(params.get("subject")).toBe("Deliverability rescue: Dana");
    const body = params.get("body") ?? "";
    expect(body).toContain("Our mail started landing in spam last week.");
    expect(body).toContain("Name: Dana");
    expect(body).toContain("Company: Acme");
    expect(body).toContain("Topic: Deliverability rescue");
  });

  it("marks an empty company rather than leaving a blank line", () => {
    const withoutCompany = buildMailto({
      email: "hello@example.com",
      name: "Dana",
      company: "",
      topic: "Something else",
      message: "Question about warmup.",
    });
    const body = new URLSearchParams(withoutCompany.split("?")[1]).get("body") ?? "";
    expect(body).toContain("Company: -");
  });
});
