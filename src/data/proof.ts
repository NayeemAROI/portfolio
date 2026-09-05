export interface ProofMetric {
  id: string;
  label: string;
  value: string;
  caption: string;
  chip: string;
}

/**
 * Every figure here is visible on the Upwork profile. Nothing is inferred,
 * averaged, or rounded up. See PRODUCT.md "Quarantined figures" for the ones
 * that were removed and what evidence would let them back in.
 */
export const proofMetrics: ProofMetric[] = [
  {
    id: "jss",
    label: "JOB SUCCESS SCORE",
    value: "100%",
    caption: "Across all completed contracts",
    chip: "PASS",
  },
  {
    id: "rating",
    label: "CLIENT RATING",
    value: "5.0",
    caption: "Every completed job, no exceptions",
    chip: "5.0 / 5",
  },
  {
    id: "jobs",
    label: "JOBS CLOSED",
    value: "7 OF 8",
    caption: "Three more contracts in progress",
    chip: "3 ACTIVE",
  },
  {
    id: "identity",
    label: "IDENTITY",
    value: "Verified",
    caption: "Government ID checked by Upwork",
    chip: "ON FILE",
  },
];
