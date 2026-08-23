import Link from "next/link";
import { ArrowRight, Inbox, ShieldCheck, Star } from "lucide-react";
import { site } from "@/data/site";

const inboxRows = [
  {
    sender: "Google Postmaster",
    subject: "Domain reputation: High",
    time: "09:12",
  },
  {
    sender: "Prospect (reply)",
    subject: "Re: quick question about your offer",
    time: "09:14",
  },
  {
    sender: "DMARC digest",
    subject: "p=reject · 100% aligned sources",
    time: "09:20",
  },
  {
    sender: "Instantly",
    subject: "Warmup healthy across all inboxes",
    time: "09:31",
  },
  {
    sender: "Client",
    subject: "Open rates are up again — nice work",
    time: "09:44",
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

const heroStats = [
  { value: "87–100%", label: "inbox health scores" },
  { value: "45–53%", label: "campaign open rates" },
  { value: "10,000+", label: "replies generated" },
];

export function HeroDeliverability() {
  return (
    <section className="relative overflow-hidden bg-term text-term-ink">
      <div className="term-halo absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-6xl px-4 pb-16 pt-16 sm:px-6 md:pb-20 md:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Copy column */}
          <div>
            <p className="animate-rise inline-flex items-center gap-2 rounded-full border border-term-line bg-term-surface px-3.5 py-1.5">
              <span className="size-1.5 rounded-full bg-delivered-bright animate-pulse-dot" />
              <span className="font-mono text-[11px] tracking-wide text-term-muted">
                {site.availability}
              </span>
            </p>

            <h1
              className="animate-rise mt-6 font-display text-4xl font-semibold leading-[1.06] tracking-tight sm:text-5xl lg:text-[3.6rem]"
              style={{ animationDelay: "90ms" }}
            >
              Your emails belong in the{" "}
              <span className="text-delivered-bright">primary inbox.</span>
              <br />
              I put them there.
            </h1>

            <p
              className="animate-rise mt-5 max-w-xl text-base leading-relaxed text-term-muted sm:text-lg"
              style={{ animationDelay: "180ms" }}
            >
              {site.bio}
            </p>

            <div
              className="animate-rise mt-8 flex flex-wrap items-center gap-3"
              style={{ animationDelay: "270ms" }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-delivered px-5 py-3 font-semibold text-term transition-all hover:-translate-y-0.5 hover:bg-delivered-bright"
              >
                Fix my deliverability
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/work"
                className="inline-flex items-center gap-2 rounded-xl border border-term-line px-5 py-3 font-medium text-term-ink transition-colors hover:border-term-muted hover:bg-term-surface"
              >
                See the receipts
              </Link>
            </div>

            <dl
              className="animate-rise mt-10 grid max-w-lg grid-cols-3 gap-4"
              style={{ animationDelay: "360ms" }}
            >
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <dt className="order-2 text-xs text-term-muted">{stat.label}</dt>
                  <dd className="u-tabular font-display text-2xl font-semibold text-term-ink">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Inbox simulation */}
          <div className="animate-rise" style={{ animationDelay: "200ms" }}>
            <div className="overflow-hidden rounded-2xl border border-term-line bg-term-surface shadow-term">
              <div className="flex items-center gap-3 border-b border-term-line px-4 py-3">
                <span className="flex gap-1.5">
                  <span className="size-2.5 rounded-full bg-spam/70" />
                  <span className="size-2.5 rounded-full bg-warm/70" />
                  <span className="size-2.5 rounded-full bg-delivered/70" />
                </span>
                <span className="font-mono text-xs text-term-muted">
                  inbox — primary
                </span>
                <span className="ml-auto hidden rounded-md border border-term-line px-2 py-0.5 font-mono text-[10px] text-term-muted sm:block">
                  in:inbox from:you
                </span>
              </div>

              <div className="grid sm:grid-cols-[110px_1fr]">
                <aside className="hidden border-r border-term-line p-3 sm:block">
                  <ul className="space-y-1 font-mono text-[11px]">
                    <li className="flex items-center justify-between rounded-md bg-delivered/15 px-2 py-1.5 text-delivered-bright">
                      <span className="inline-flex items-center gap-1.5">
                        <Inbox className="size-3" />
                        Primary
                      </span>
                      <span>{inboxRows.length}</span>
                    </li>
                    <li className="flex items-center justify-between px-2 py-1.5 text-term-muted">
                      <span>Updates</span>
                      <span>—</span>
                    </li>
                    <li className="flex items-center justify-between px-2 py-1.5 text-term-muted">
                      <span>Spam</span>
                      <span className="rounded bg-delivered/20 px-1.5 text-delivered-bright">0</span>
                    </li>
                    <li className="flex items-center justify-between px-2 py-1.5 text-term-muted">
                      <span>Trash</span>
                      <span>—</span>
                    </li>
                  </ul>
                </aside>

                <ul className="divide-y divide-term-line">
                  {inboxRows.map((row, i) => (
                    <li
                      key={row.subject}
                      className="animate-land flex items-center gap-3 px-4 py-3"
                      style={{ animationDelay: `${400 + i * 160}ms` }}
                    >
                      <span className="size-1.5 shrink-0 rounded-full bg-delivered-bright" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[13px] font-semibold text-term-ink">
                          {row.sender}
                        </p>
                        <p className="truncate text-xs text-term-muted">{row.subject}</p>
                      </div>
                      <span className="shrink-0 font-mono text-[10px] text-term-muted">
                        {row.time}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between border-t border-term-line px-4 py-2.5">
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-delivered-bright">
                  <ShieldCheck className="size-3" />
                  SPF PASS · DKIM PASS · DMARC PASS
                </span>
                <span className="inline-flex items-center gap-1 font-mono text-[10px] text-term-muted">
                  <Star className="size-3 fill-warm text-warm" />
                  {site.stats.rating} · {site.stats.jss} JSS
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="marquee relative border-t border-term-line py-3" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 gap-10">
              {marqueeTokens.map((token) => (
                <span
                  key={`${copy}-${token}`}
                  className="whitespace-nowrap font-mono text-[11px] tracking-[0.18em] text-term-muted"
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
