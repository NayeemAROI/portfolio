import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock, Languages, MapPin } from "lucide-react";
import { site } from "@/data/site";
import { TimelineSection } from "@/components/TimelineSection";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Email deliverability specialist covering authentication, outbound infrastructure, and the web stack underneath.",
};

const dailyDrivers = [
  "Instantly.ai",
  "Smartlead.ai",
  "Apollo.io",
  "Clay",
  "LinkedIn Sales Navigator",
  "Google Admin",
  "Microsoft 365",
  "Exchange Online",
  "Cloudflare",
  "MXToolbox",
  "Postmaster Tools",
  "GoDaddy",
  "Namecheap",
  "cPanel",
  "WordPress",
  "WooCommerce",
  "Elementor",
];

export default function AboutPage() {
  return (
    <>
      <section className="paper-halo border-b border-line bg-paper">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <p className="animate-rise font-mono text-xs uppercase tracking-[0.22em] text-delivered-ink">
            About
          </p>
          <h1
            className="animate-rise mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl"
            style={{ animationDelay: "80ms" }}
          >
            Deliverability is a discipline. I treat it like one.
          </h1>
          <p
            className="animate-rise mt-5 max-w-2xl leading-relaxed text-muted"
            style={{ animationDelay: "160ms" }}
          >
            {site.bio} The work spans three tracks that reinforce each other:
            authentication and infrastructure, outbound systems that respect
            domain reputation, and the web stack that everything else depends
            on.
          </p>

          <ul
            className="animate-rise mt-8 flex flex-wrap gap-3 text-sm"
            style={{ animationDelay: "240ms" }}
          >
            <li className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3.5 py-1.5">
              <MapPin className="size-4 text-delivered" />
              {site.location}
            </li>
            <li className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3.5 py-1.5">
              <Clock className="size-4 text-delivered" />
              {site.timezone}
            </li>
            <li className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3.5 py-1.5">
              <Languages className="size-4 text-delivered" />
              English (fluent) · Bengali (native)
            </li>
          </ul>
        </div>
      </section>

      <TimelineSection />

      <section className="border-t border-line bg-paper-subtle">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-delivered-ink">
              Daily drivers
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight md:text-3xl">
              The stack I actually work in.
            </h2>
            <div className="mt-6 flex max-w-3xl flex-wrap gap-2">
              {dailyDrivers.map((tool) => (
                <span
                  key={tool}
                  className="rounded-lg border border-line bg-card px-3 py-1.5 font-mono text-xs text-muted"
                >
                  {tool}
                </span>
              ))}
            </div>
            <Link
              href="/contact"
              className="mt-10 inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-3 font-medium text-paper transition-colors hover:bg-delivered hover:text-term"
            >
              Work with me
              <ArrowUpRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
