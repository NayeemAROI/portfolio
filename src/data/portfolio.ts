export interface PortfolioCase {
  id: string;
  title: string;
  category: "Deliverability" | "Cold Email" | "Web Development";
  summary: string;
  tags: string[];
  metrics: { label: string; value: string }[];
}

export const portfolioCases: PortfolioCase[] = [
  {
    id: "case-deliverability",
    title: "Email Deliverability & DNS Authentication",
    category: "Deliverability",
    summary:
      "Full SPF, DKIM, DMARC, and MX record alignment to rescue cold outreach domains from the spam folder and ensure verified sender status in Google Workspace and Microsoft 365.",
    tags: ["SPF", "DKIM", "DMARC", "Google Workspace", "Postmaster Tools"],
    metrics: [
      { label: "Inbox Status", value: "Primary 100%" },
      { label: "DMARC Policy", value: "Aligned & Enforced" },
    ],
  },
  {
    id: "case-campaign",
    title: "Cold Email Outbound System Architecture",
    category: "Cold Email",
    summary:
      "Automated outbound campaign infrastructure deployed in Instantly and Apollo with custom tracking domains, gradual warmup ramps, and inbox rotation.",
    tags: ["Instantly.ai", "Apollo.io", "Warmup", "B2B Outreach"],
    metrics: [
      { label: "Inbox Health", value: "95–100%" },
      { label: "Domain Protection", value: "Zero Burn" },
    ],
  },
  {
    id: "case-wordpress",
    title: "WordPress & WooCommerce Development",
    category: "Web Development",
    summary:
      "Custom responsive WordPress websites and WooCommerce stores built with Elementor, featuring fast loading speeds and reliable transactional SMTP email routing.",
    tags: ["WordPress", "WooCommerce", "Elementor", "SMTP Routing"],
    metrics: [
      { label: "Client Rating", value: "5.0 ★" },
      { label: "Email Routing", value: "100% Delivered" },
    ],
  },
];
