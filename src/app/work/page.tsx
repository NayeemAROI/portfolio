import type { Metadata } from "next";
import { ArrowUpRight, Star } from "lucide-react";
import { site } from "@/data/site";
import { links } from "@/data/links";
import { testimonials } from "@/data/testimonials";
import { PortfolioGallery } from "@/components/PortfolioGallery";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Every completed Upwork contract: 100% Job Success Score and a 5.0 rating on all completed jobs.",
};

const headlineStats = [
  { value: site.stats.jss, label: "Job Success Score" },
  { value: site.stats.rating, label: "average rating" },
  {
    value: `${site.stats.completedJobs}/${site.stats.completedJobs}`,
    label: "five-star completions",
  },
  {
    value: site.stats.inProgress,
    label: "contracts in progress",
  },
];

export default function WorkPage() {
  return (
    <>
      <section className="paper-halo border-b border-line bg-paper">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <p className="animate-rise font-mono text-xs uppercase tracking-[0.22em] text-delivered-ink">
            Work
          </p>
          <h1
            className="animate-rise mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl"
            style={{ animationDelay: "80ms" }}
          >
            The receipts.
          </h1>
          <p
            className="animate-rise mt-4 max-w-xl text-muted"
            style={{ animationDelay: "160ms" }}
          >
            No mockups, no borrowed logos. Verified contract history and every
            client quote, straight from Upwork.
          </p>

          <dl
            className="animate-rise mt-10 grid max-w-2xl grid-cols-2 gap-6 sm:grid-cols-4"
            style={{ animationDelay: "240ms" }}
          >
            {headlineStats.map((stat) => (
              <div key={stat.label}>
                <dd className="u-tabular font-display text-3xl font-semibold tracking-tight">
                  {stat.value}
                </dd>
                <dt className="mt-1 text-xs text-muted">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <PortfolioGallery />

      <section className="border-t border-line bg-paper-subtle">
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 md:py-28">
          <Reveal className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-delivered-ink">
              Contract log
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
              Every job. Every word.
            </h2>
          </Reveal>

          <ol className="mt-12 space-y-3">
            {testimonials.map((review, i) => (
              <Reveal key={review.id} delay={Math.min(i * 50, 200)}>
                <li className="rounded-card border border-line bg-card p-5 shadow-card sm:p-6">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <span className="font-mono text-xs text-muted">
                      #{String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex gap-0.5" aria-label="5.0 out of 5 stars">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star key={s} className="size-3.5 fill-warm text-warm" />
                      ))}
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-wide text-muted">
                      {review.project}
                    </span>
                    <span className="ml-auto rounded border border-delivered/30 bg-delivered/10 px-1.5 py-0.5 font-mono text-[9px] font-semibold tracking-wider text-delivered-ink">
                      {review.rating.toFixed(1)} · COMPLETED
                    </span>
                  </div>
                  <blockquote className="mt-3 text-sm leading-relaxed sm:text-base">
                    “{review.quote}”
                  </blockquote>
                </li>
              </Reveal>
            ))}
          </ol>

          <Reveal className="mt-10">
            <a
              href={links.upwork}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-3 font-medium text-paper transition-colors hover:bg-delivered hover:text-term"
            >
              Verify it all on Upwork
              <ArrowUpRight className="size-4" />
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
