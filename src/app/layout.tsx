import type { Metadata } from "next";
import { site } from "@/data/site";
import { links } from "@/data/links";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
// Self-hosted fonts (fontsource). No build-time or runtime Google Fonts
// dependency: `next/font/google` fetches from fonts.googleapis.com during
// build, which breaks airgapped/CI environments and adds a third-party
// request on every page load.
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${site.name} · ${site.role}`,
    template: `%s · ${site.name}`,
  },
  description: site.headline,
  keywords: [
    "Email Deliverability",
    "SPF DKIM DMARC Setup",
    "Cold Email Infrastructure",
    "Instantly.ai",
    "Apollo.io",
    "Google Workspace Setup",
    "Microsoft 365 Migration",
    "WordPress Support",
    "Nayeemur Rahman",
    "NayeemAROI",
  ],
  authors: [{ name: site.name, url: links.github }],
  openGraph: {
    title: `${site.name} · ${site.role}`,
    description: site.headline,
    type: "website",
    locale: "en_US",
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} · ${site.role}`,
    description: site.headline,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  email: `mailto:${links.email}`,
  description: site.bio,
  knowsAbout: [
    "Email deliverability",
    "SPF, DKIM and DMARC authentication",
    "Cold email infrastructure",
    "Google Workspace",
    "Microsoft 365",
    "WordPress",
  ],
  sameAs: [links.github, links.linkedin, links.upwork],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="flex min-h-screen flex-col bg-paper text-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
