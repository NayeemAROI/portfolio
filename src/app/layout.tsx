import type { Metadata } from "next";
import { display, sans, mono } from "@/lib/fonts";
import { site } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  title: `${site.name} — ${site.role}`,
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
      <body className="min-h-screen bg-paper text-ink selection:bg-delivered/20 selection:text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
