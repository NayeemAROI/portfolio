export interface ServicePillar {
  id: string;
  code: string;
  title: string;
  headline: string;
  description: string;
  deliverables: string[];
  tools: string[];
}

export const services: ServicePillar[] = [
  {
    id: "deliverability",
    code: "AUTH-01",
    title: "Email Deliverability & Authentication",
    headline: "SPF, DKIM, DMARC, and MX setup so your emails land in the primary inbox, not spam.",
    description:
      "Comprehensive diagnostic and configuration of email security records with proper alignment to prevent spoofing and guarantee high inbox placement rates.",
    deliverables: [
      "SPF, DKIM, and DMARC (p=none / p=quarantine / p=reject) configuration & alignment",
      "MX, TXT, CNAME, and BIMI brand verification records",
      "Google Postmaster Tools & Microsoft SNDS spam diagnostic recovery",
      "Blacklist & spam trap remediation and reputation rebuilding",
    ],
    tools: ["Postmaster Tools", "Microsoft SNDS", "Cloudflare", "MXToolbox", "GoDaddy", "Namecheap"],
  },
  {
    id: "cold-outreach",
    code: "CAMP-02",
    title: "Cold Email & Outbound Infrastructure",
    headline: "Scalable sending infrastructure built for high reply rates and zero domain burn.",
    description:
      "Full outbound architecture setup including secondary sending domains, automated warmup schedules, rotation pools, and custom tracking domains.",
    deliverables: [
      "Secondary domain & subdomain infrastructure planning",
      "Automated mailbox warmup configuration in Instantly & Smartlead",
      "Sending ramp schedules & inbox rotation to protect domain reputation",
      "Custom tracking domains (CTD) and bounce monitoring",
    ],
    tools: ["Instantly.ai", "Smartlead.ai", "Apollo.io", "Clay", "Lemlist"],
  },
  {
    id: "workspace-m365",
    code: "TENANT-03",
    title: "Google Workspace & Microsoft 365",
    headline: "Tenant setup, administration, and zero-downtime email migrations.",
    description:
      "Professional cloud workspace configuration, custom domain routing, user and alias provisioning, and safe mailbox cutovers without lost messages.",
    deliverables: [
      "New tenant setup, custom domain verification & routing policies",
      "User, alias, distribution list, and shared mailbox provisioning",
      "Cross-platform migrations: Workspace ⇄ M365, cPanel, Zoho, Roundcube",
      "Zero data loss cutover planning with MX propagation coordination",
    ],
    tools: ["Google Admin", "Microsoft 365 Admin", "Exchange Online", "PowerShell", "cPanel"],
  },
  {
    id: "lead-generation",
    code: "LEAD-04",
    title: "B2B Lead Generation & Data Enrichment",
    headline: "Targeted prospect sourcing and verified contact list enrichment.",
    description:
      "Data-driven prospect list building with valid business emails and verified decision-maker attributes ready for cold outreach campaigns.",
    deliverables: [
      "LinkedIn Sales Navigator search filtering & Boolean scraping",
      "Apollo.io & Clay waterfall email validation and data enrichment",
      "Decision-maker identification (ICP matching)",
      "Clean, deduplicated CSV exports formatted for instant campaign upload",
    ],
    tools: ["Apollo.io", "Clay", "LinkedIn Sales Navigator", "Google Sheets"],
  },
  {
    id: "web-support",
    code: "WEB-05",
    title: "Website Support & WordPress Development",
    headline: "Fast, reliable WordPress & WooCommerce maintenance and SMTP integration.",
    description:
      "End-to-end website support, theme & Elementor customizations, server-to-inbox transactional SMTP setup, and speed optimizations.",
    deliverables: [
      "WordPress & WooCommerce setup, fixes, and theme customization",
      "Elementor responsive layout building and HTML-to-WP conversions",
      "Transactional SMTP setup so order & contact notifications deliver reliably",
      "SSL, Cloudflare CDN, and security hardening",
    ],
    tools: ["WordPress", "WooCommerce", "Elementor", "HTML/CSS/JS", "Cloudflare"],
  },
];
