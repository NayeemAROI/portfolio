import { topics } from "@/data/topics";

/**
 * Maps a service pillar id to the contact form topic it should preselect.
 * Keep the values in sync with `topics` in `@/data/topics`.
 */
export const serviceTopics: Record<string, (typeof topics)[number]> = {
  deliverability: "Deliverability rescue",
  "cold-outreach": "Cold email infrastructure",
  "workspace-m365": "Google Workspace / M365",
  "lead-generation": "B2B lead generation",
  "web-support": "WordPress support",
};

export function contactHrefForService(serviceId: string): string {
  const topic = serviceTopics[serviceId];
  return topic ? `/contact?topic=${encodeURIComponent(topic)}` : "/contact";
}
