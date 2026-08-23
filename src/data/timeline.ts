export interface ExperienceItem {
  role: string;
  organization: string;
  period: string;
  description: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  period: string;
  verified: boolean;
}

export interface EducationItem {
  degree: string;
  institution: string;
}

/**
 * Dates track the Upwork profile exactly. If a date here disagrees with the
 * profile, the profile wins: this is published biography, not a rough sketch.
 */
export const experiences: ExperienceItem[] = [
  {
    role: "LinkedIn B2B Lead Generation Specialist",
    organization: "DNA Protected — Crime Prevention & Software",
    period: "Jul 2025 – Present",
    description:
      "Managing targeted B2B lead generation, prospect identification on LinkedIn Sales Navigator, and data enrichment for outbound pipeline growth.",
  },
  {
    role: "Key Account Manager, Digital Marketing & Lead Gen",
    organization: "Aggressive ROI",
    period: "Feb 2021 – Present",
    description:
      "Overseeing cold email infrastructure, deliverability troubleshooting, inbox warmup rotation, and client account growth strategies.",
  },
  {
    role: "Web Developer",
    organization: "SoftTech-iT Institute",
    period: "Jan 2017 – Jun 2020",
    description:
      "Built and maintained responsive WordPress websites, handled hosting and DNS migrations, and configured transactional SMTP servers.",
  },
];

export const certifications: CertificationItem[] = [
  {
    title: "LinkedIn Marketing Strategy",
    issuer: "LinkedIn",
    period: "Issued Sep 2024",
    verified: true,
  },
  {
    title: "LinkedIn Marketing Solutions Fundamentals",
    issuer: "LinkedIn",
    period: "Issued Jan 2024",
    verified: true,
  },
];

export const education: EducationItem[] = [
  {
    degree: "B.Sc. in Computer Science & Engineering",
    institution: "Green University of Bangladesh",
  },
  {
    degree: "Diploma in Computer Engineering",
    institution: "Model Institute of Science & Technology",
  },
];
