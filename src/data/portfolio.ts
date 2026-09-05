export interface PortfolioCase {
  id: string;
  file: string;
  title: string;
  category: "Deliverability" | "Cold Email" | "Web Development";
  summary: string;
  tags: string[];
  /**
   * Verified facts only: configuration state, tooling, and figures that are
   * visible on the Upwork profile. No invented outcome numbers (see
   * PRODUCT.md "Quarantined figures" and truth.test.ts).
   */
  lines: { label: string; value: string }[];
}

export const portfolioCases: PortfolioCase[] = [
  {
    id: "case-deliverability",
    file: "CASE-01",
    title: "Email Deliverability & DNS Authentication",
    category: "Deliverability",
    summary:
      "Full SPF, DKIM, DMARC, and MX record alignment to move cold outreach domains out of the spam folder, with sender status verified in Google Workspace and Microsoft 365.",
    tags: ["SPF", "DKIM", "DMARC", "Google Workspace", "Postmaster Tools"],
    lines: [
      { label: "AUTHENTICATION", value: "SPF + DKIM + DMARC, aligned" },
      { label: "POLICY", value: "DMARC p=reject enforced" },
      { label: "VERIFIED WITH", value: "Postmaster Tools · SNDS · MXToolbox" },
    ],
  },
  {
    id: "case-campaign",
    file: "CASE-02",
    title: "Cold Email Outbound System",
    category: "Cold Email",
    summary:
      "Automated outbound campaign infrastructure in Instantly and Apollo: secondary sending domains, scheduled warmup ramps, and inbox rotation configured before volume goes up.",
    tags: ["Instantly.ai", "Apollo.io", "Warmup", "B2B Outreach"],
    lines: [
      { label: "WARMUP", value: "Scheduled ramps, rotation pools" },
      { label: "SENDING", value: "Custom tracking domain, bounce triage" },
      { label: "STACK", value: "Instantly · Smartlead · Apollo" },
    ],
  },
  {
    id: "case-wordpress",
    file: "CASE-03",
    title: "WordPress & WooCommerce Development",
    category: "Web Development",
    summary:
      "Responsive WordPress sites and WooCommerce stores built with Elementor, wired to transactional SMTP so order and contact notifications actually arrive.",
    tags: ["WordPress", "WooCommerce", "Elementor", "SMTP Routing"],
    lines: [
      { label: "CLIENT RATING", value: "5.0 on Upwork" },
      { label: "EMAIL", value: "Transactional SMTP, deliverability-first" },
      { label: "ALSO", value: "Cloudflare SSL · speed hardening" },
    ],
  },
];
