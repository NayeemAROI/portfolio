export const topics = [
  "Deliverability rescue",
  "Cold email infrastructure",
  "Google Workspace / M365",
  "B2B lead generation",
  "WordPress support",
  "Something else",
] as const;

export type ContactTopic = (typeof topics)[number];

export function isContactTopic(value: string): value is ContactTopic {
  return (topics as readonly string[]).includes(value);
}
