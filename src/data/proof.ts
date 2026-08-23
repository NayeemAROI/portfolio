export interface ProofMetric {
  id: string;
  label: string;
  value: string;
  caption: string;
  badge?: string;
  icon: "check" | "star" | "shield" | "clock" | "zap" | "mail";
}

export const proofMetrics: ProofMetric[] = [
  {
    id: "jss",
    label: "JOB_SUCCESS_SCORE",
    value: "100%",
    caption: "Top Rated on Upwork",
    badge: "VERIFIED",
    icon: "shield",
  },
  {
    id: "rating",
    label: "CLIENT_RATING",
    value: "5.0 ★",
    caption: "Every completed project",
    badge: "PERFECT",
    icon: "star",
  },
  {
    id: "jobs",
    label: "COMPLETED_JOBS",
    value: "7 / 7",
    caption: "100% 5-star feedback",
    badge: "DELIVERED",
    icon: "check",
  },
  {
    id: "response",
    label: "AVG_RESPONSE_TIME",
    value: "0–4h",
    caption: "Fast turnaround (GMT+6)",
    badge: "LIVE",
    icon: "clock",
  },
];
