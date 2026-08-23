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

export const experiences: ExperienceItem[] = [
  {
    role: "LinkedIn B2B Lead Generation Specialist",
    organization: "DNA Protected",
    period: "Jul 2023 – Present",
    description:
      "Managing targeted B2B lead generation, prospect identification on LinkedIn Sales Navigator, and data enrichment for outbound pipeline growth.",
  },
  {
    role: "Key Account Manager & Lead Gen Expert",
    organization: "Aggressive ROI",
    period: "Feb 2020 – Present",
    description:
      "Overseeing cold email infrastructure, deliverability troubleshooting, inbox warmup rotation, and client account growth strategies.",
  },
  {
    role: "Web Developer",
    organization: "SoftTech-IT Institute",
    period: "Jan 2017 – Jun 2022",
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
