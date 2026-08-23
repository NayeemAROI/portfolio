"use client";

import { useState } from "react";
import Link from "next/link";
import { site } from "@/data/site";
import { links } from "@/data/links";
import { ArrowRight, Inbox, ShieldCheck, Mail, Copy, Check, Star } from "lucide-react";

const INBOX_ROWS = [
  {
    record: "SPF / DKIM / DMARC",
    outcome: "Authentication aligned end to end",
    detail: "Alignment, not just presence. p=reject when the domain can carry it.",
  },
  {
    record: "MX / DNS",
    outcome: "Routing and records under control",
    detail: "Cloudflare, GoDaddy, Namecheap, cPanel.",
  },
  {
    record: "Workspace / M365",
    outcome: "Tenants configured and migrated",
    detail: "Mailbox migration without downtime.",
  },
  {
    record: "Warmup / rotation",
    outcome: "Sending inboxes kept healthy",
    detail: "Pacing and rotation across sending accounts.",
  },
  {
    record: "Instantly / Apollo / Clay",
    outcome: "Campaign infrastructure that scales",
    detail: "Sequences, enrichment, list hygiene before a send.",
  },
];

const marqueeTokens = [
  "SPF ALIGNED ✓",
  "DKIM SIGNED ✓",
  "DMARC ENFORCED ✓",
  "MX ROUTED ✓",
  "TRACKING DOMAIN ACTIVE ✓",
  "WARMUP HEALTHY ✓",
  "REPUTATION HIGH ✓",
  "INBOX: PRIMARY ✓",
];

const SAMPLE_HEADER = `Authentication-Results: mx.google.com;
  spf=pass       smtp.mailfrom=example.com;
  dkim=pass      header.i=@example.com;
  dmarc=pass     (p=REJECT sp=REJECT) header.from=example.com;`;

function DeliveredCheck({ index }: { index: number }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className="size-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path
        className="inbox-check"
        style={{ "--i": index } as React.CSSProperties}
        d="M2.5 8.5 L6 12 L13.5 4"
      />
    </svg>
  );
}

export function HeroDeliverability() {
  const [copied, setCopied] = useState(false);

  const copyHeader = async () => {
    try {
      await navigator.clipboard.writeText(SAMPLE_HEADER);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore clipboard failure gracefully
    }
  };

  return (
    <section className="relative overflow-hidden border-b border-line bg-paper pt-12 pb-16 md:pt-20 md:pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-10">
          
          {/* Left: Positioning & Value Proposition */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 border border-line bg-card px-3 py-1.5 rounded-full shadow-2xs">
              <span className="size-2 rounded-full bg-delivered animate-pulse" />
              <span className="font-mono text-xs font-medium text-ink">
                {site.availability}
              </span>
            </div>

            <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08]">
              Cold email that lands in the{" "}
              <span className="text-delivered-ink">primary inbox</span>, not spam.
            </h1>

            <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-muted sm:text-lg">
              {site.headline}
            </p>

            <p className="mt-3 text-sm leading-relaxed text-ink/80">
              I configure, authenticate, and rescue outbound email infrastructure. From full SPF/DKIM/DMARC alignment and Google Workspace/Microsoft 365 migrations to scalable Instantly/Apollo campaign architecture.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-delivered-ink px-5 py-3 font-mono text-xs font-semibold text-white transition-colors hover:bg-ink active:scale-95"
              >
                <Mail className="size-4" aria-hidden="true" />
                Get deliverability help
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>

              <a
                href={links.upwork}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-card px-5 py-3 font-mono text-xs font-medium text-ink shadow-2xs transition-colors hover:border-muted hover:bg-paper active:scale-95"
              >
                <ShieldCheck className="size-4 text-delivered-ink" aria-hidden="true" />
                Hire on Upwork
              </a>
            </div>

            <dl className="mt-8 grid max-w-md grid-cols-3 gap-4 border-t border-line pt-6 font-mono text-xs">
              <div>
                <dt className="text-muted">Job Success</dt>
                <dd className="mt-0.5 text-lg font-bold text-ink">
                  {site.stats.jss}
                </dd>
              </div>
              <div>
                <dt className="text-muted">Rating</dt>
                <dd className="mt-0.5 text-lg font-bold text-ink">
                  {site.stats.rating} ★
                </dd>
              </div>
              <div>
                <dt className="text-muted">Completed</dt>
                <dd className="mt-0.5 text-lg font-bold text-ink">
                  {site.stats.completedJobs} / {site.stats.completedJobs}
                </dd>
              </div>
            </dl>
          </div>

          {/* Right: Signature Inbox Deliverability Motif */}
          <div className="lg:col-span-6">
            <div className="border border-line bg-card rounded-2xl shadow-sm overflow-hidden">
              <div className="flex items-baseline justify-between border-b border-line bg-paper px-4 py-3">
                <span className="font-mono text-[11px] tracking-wider text-muted uppercase">
                  Verified Outbound Infrastructure
                </span>
                <span className="font-mono text-[11px] font-semibold text-delivered-ink">
                  5 / 5 ALIGNED
                </span>
              </div>

              <ul className="divide-y divide-line-soft">
                {INBOX_ROWS.map((row, i) => (
                  <li
                    key={row.record}
                    className="inbox-row flex gap-3 px-4 py-3.5"
                    style={{ "--i": i } as React.CSSProperties}
                  >
                    <span className="mt-0.5 text-delivered-ink">
                      <DeliveredCheck index={i} />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-mono text-[11px] tracking-wide text-muted">
                        {row.record}
                      </span>
                      <span className="mt-0.5 block text-sm font-semibold text-ink">
                        {row.outcome}
                      </span>
                      <span className="mt-0.5 block text-xs leading-relaxed text-muted">
                        {row.detail}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>

              <div className="inbox-seal border-t border-line bg-delivered-wash px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="size-4 text-delivered-ink" aria-hidden="true" />
                    <span className="font-mono text-xs font-semibold text-delivered-ink">
                      Authentication: PASS (SPF, DKIM, DMARC)
                    </span>
                  </div>
                  <span className="font-mono text-[10px] rounded bg-delivered/10 px-2 py-0.5 text-delivered-ink font-bold">
                    PRIMARY INBOX
                  </span>
                </div>
              </div>
            </div>

            {/* Reference Sample */}
            <figure className="mt-4">
              <figcaption className="flex items-center justify-between gap-3">
                <span className="font-mono text-[10px] tracking-wider text-muted uppercase">
                  RFC 2606 Sample Header
                </span>
                <button
                  type="button"
                  onClick={copyHeader}
                  className="inline-flex items-center gap-1.5 border border-line bg-card px-2 py-1 font-mono text-[10px] text-muted transition-colors hover:text-ink rounded"
                >
                  {copied ? (
                    <>
                      <Check className="size-3 text-delivered-ink" aria-hidden="true" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="size-3" aria-hidden="true" />
                      Copy Header
                    </>
                  )}
                </button>
              </figcaption>
              <pre className="mt-1.5 overflow-x-auto rounded-lg border border-term-line bg-term p-3 font-mono text-[11px] leading-relaxed text-term-ink">
                {SAMPLE_HEADER}
              </pre>
            </figure>
          </div>

        </div>
      </div>

      {/* Marquee Ticker */}
      <div className="marquee relative mt-12 border-y border-line bg-card py-2.5" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 gap-10">
              {marqueeTokens.map((token) => (
                <span
                  key={`${copy}-${token}`}
                  className="whitespace-nowrap font-mono text-[11px] tracking-wider text-muted"
                >
                  {token}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
