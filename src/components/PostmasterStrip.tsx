import { links } from "@/data/links";
import { proofMetrics } from "@/data/proof";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";

/**
 * Postmaster strip: proof rendered as a monospace report, straight after the
 * portrait cover. Every figure is verified on the Upwork profile (see
 * src/data/proof.ts and PRODUCT.md).
 */
export function PostmasterStrip() {
  return (
    <section
      aria-label="Verified Upwork track record"
      className="border-b border-term-line bg-term text-term-ink"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 md:py-10">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-delivered-bright">
            <span className="text-term-muted">RCPT-01 // </span>
            Receipts
          </p>
          <a
            href={links.upwork}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.16em] text-term-muted transition-colors hover:text-delivered-bright"
          >
            Source: Upwork profile
            <ArrowUpRight className="size-3" />
          </a>
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-term-line bg-term-line md:grid-cols-4">
          {proofMetrics.map((metric, i) => (
            <Reveal
              key={metric.id}
              delay={i * 70}
              className="bg-term-surface"
            >
              <div className="flex h-full flex-col px-4 py-5 md:px-5">
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-term-muted">
                  {metric.label}
                </dt>
                <dd className="u-tabular mt-2.5 flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                  <span className="font-mono text-2xl font-semibold tracking-tight text-delivered-bright md:text-3xl">
                    {metric.value}
                  </span>
                  <span className="rounded border border-delivered/30 bg-delivered/10 px-1.5 py-0.5 font-mono text-[9px] font-semibold tracking-wider text-delivered-bright">
                    {metric.chip}
                  </span>
                </dd>
                <p className="mt-1.5 text-xs leading-relaxed text-term-muted">
                  {metric.caption}
                </p>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
