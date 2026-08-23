import type { Metadata } from "next";
import { display, sans, mono } from "@/lib/fonts";
import { site } from "@/data/site";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import "./globals.css";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
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
  authors: [{ name: site.name, url: "https://github.com/NayeemAROI" }],
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: site.headline,
    type: "website",
    locale: "en_US",
    siteName: site.name,
  },
  twitter: {
    card: "summary",
    title: `${site.name} — ${site.role}`,
    description: site.headline,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable} scroll-smooth`}
    >
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
      </body>
    </html>
  );
}
