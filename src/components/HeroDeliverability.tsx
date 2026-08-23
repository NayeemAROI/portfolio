"use client";

import { useState } from "react";
import { site } from "@/data/site";
import { links } from "@/data/links";
import { ShieldCheck, ArrowRight, Mail, Copy, Check } from "lucide-react";

/**
 * Signature moment: DESIGN.md motif 1. Value props arrive as inbox rows on a
 * 60ms stagger, each with its delivered check drawing in behind it, then the
 * authentication seal lands. Plays once. No loop anywhere in this component.
 *
 * Every row states a capability, not a result. Rows are hairline-separated,
 * not carded: the spec says borders over shadows, and cards inside a card are
 * the thing this world exists to avoid.
 */
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

/**
 * Reference sample only. example.com is reserved by RFC 2606 precisely so it
 * cannot be mistaken for a real domain, and no IP or selector is quoted. This
 * demonstrates the shape of a passing result. It is not a client's audit.
 */
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
      // Clipboard can be blocked by permissions policy. The sample is visible
      // and selectable on the page, so failing quietly is the honest outcome:
      // do not flash a success state for something that did not happen.
    }
  };

  return (
    <section className="border-b border-line bg-paper pt-12 pb-16 md:pt-20 md:pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-start lg:gap-10">
          {/* ---------- Positioning ---------- */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 border border-line bg-card px-3 py-1.5">
              <span className="size-2 rounded-full bg-delivered" />
              <span className="font-mono text-xs font-medium text-ink">
                Available for new client work
              </span>
            </div>

            <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl lg:text-[3.5rem] lg:leading-[1.05]">
              Cold email that lands in the primary inbox, not spam.
            </h1>

            <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-muted">
              I configure, authenticate, and rescue outbound email
              infrastructure. Authentication and DNS first, then the campaign
              systems on top of it.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-delivered-ink px-5 py-3 font-mono text-sm font-semibold text-white transition-colors hover:bg-ink"
              >
                <Mail className="size-4" aria-hidden="true" />
                Get deliverability help
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>

              <a
                href={links.upwork}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-card px-5 py-3 font-mono text-sm font-medium text-ink transition-colors hover:border-ink"
              >
                <ShieldCheck className="size-4 text-delivered-ink" aria-hidden="true" />
                Hire on Upwork
              </a>
            </div>

            <dl className="mt-9 grid max-w-md grid-cols-3 gap-x-6 border-t border-line pt-6 font-mono text-xs">
              <div>
                <dt className="text-muted">Job success</dt>
                <dd className="mt-0.5 text-base font-semibold text-ink">
                  {site.stats.jss}
                </dd>
              </div>
              <div>
                <dt className="text-muted">Rating</dt>
                <dd className="mt-0.5 text-base font-semibold text-ink">
                  {site.stats.rating}
                </dd>
              </div>
              <div>
                <dt className="text-muted">Jobs closed</dt>
                <dd className="mt-0.5 text-base font-semibold text-ink">
                  {site.stats.completedJobs}
                </dd>
              </div>
            </dl>
          </div>

          {/* ---------- The inbox: signature moment ---------- */}
          <div className="lg:col-span-6">
            <div className="border border-line bg-card">
              <div className="flex items-baseline justify-between border-b border-line px-4 py-3">
                <span className="font-mono text-[11px] tracking-wider text-muted uppercase">
                  What arrives when this is done right
                </span>
                <span className="font-mono text-[11px] text-delivered-ink">5 / 5</span>
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
                      <span className="mt-0.5 block text-[15px] font-medium text-ink">
                        {row.outcome}
                      </span>
                      <span className="mt-0.5 block text-[13px] leading-relaxed text-muted">
                        {row.detail}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>

              {/* the seal lands after the last row */}
              <div className="inbox-seal border-t border-line bg-delivered-wash px-4 py-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="size-4 text-delivered-ink" aria-hidden="true" />
                  <span className="font-mono text-xs font-semibold text-delivered-ink">
                    Authentication: pass
                  </span>
                </div>
              </div>
            </div>

            {/* Reference sample, labelled before it is read. */}
            <figure className="mt-4">
              <figcaption className="flex items-center justify-between gap-3">
                <span className="font-mono text-[11px] tracking-wider text-muted uppercase">
                  Reference sample · not a client result
                </span>
                <button
                  type="button"
                  onClick={copyHeader}
                  className="inline-flex items-center gap-1.5 border border-line bg-card px-2 py-1 font-mono text-[11px] text-muted transition-colors hover:text-ink"
                >
                  {copied ? (
                    <>
                      <Check className="size-3 text-delivered-ink" aria-hidden="true" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="size-3" aria-hidden="true" />
                      Copy
                    </>
                  )}
                </button>
              </figcaption>
              <pre className="mt-2 overflow-x-auto border border-term-line bg-term p-3 font-mono text-[11px] leading-relaxed text-term-ink">
                {SAMPLE_HEADER}
              </pre>
              <p className="mt-2 font-mono text-[11px] leading-relaxed text-muted">
                example.com is a reserved domain (RFC 2606). This shows the
                shape of a passing result, not any client&rsquo;s configuration.
              </p>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
