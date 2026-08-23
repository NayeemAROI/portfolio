export interface ProofMetric {
  id: string;
  label: string;
  value: string;
  caption: string;
  icon: "check" | "star" | "shield" | "clock" | "zap" | "mail";
}

/**
 * Every figure here is visible on the Upwork profile. Nothing is inferred,
 * averaged, or rounded up. See PRODUCT.md "Quarantined figures" for the ones
 * that were removed and what evidence would let them back in.
 */
export const proofMetrics: ProofMetric[] = [
  {
    id: "jss",
    label: "JOB_SUCCESS_SCORE",
    value: "100%",
    caption: "Across all completed contracts",
    icon: "shield",
  },
  {
    id: "rating",
    label: "CLIENT_RATING",
    value: "5.0",
    caption: "Every completed project, no exceptions",
    icon: "star",
  },
  {
    id: "jobs",
    label: "JOBS_CLOSED",
    value: "7 / 8",
    caption: "Three more in progress",
    icon: "check",
  },
  {
    id: "identity",
    label: "IDENTITY",
    value: "Verified",
    caption: "ID checked by Upwork",
    icon: "shield",
  },
];
