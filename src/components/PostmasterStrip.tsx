import { proofMetrics } from "@/data/proof";

/**
 * DESIGN.md motif 2, the postmaster strip: proof rendered as a monospace
 * report rather than a metric card grid. One row, hairline dividers, no card
 * per figure. The figures are small on purpose: they are evidence in a report,
 * not a scoreboard.
 */
export function PostmasterStrip() {
  return (
    <section aria-label="Verified profile record" className="border-b border-line bg-card">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-center gap-2 border-b border-line-soft py-3">
          <span className="font-mono text-[11px] tracking-wider text-muted uppercase">
            Postmaster report
          </span>
          <span className="font-mono text-[11px] text-muted">
            · upwork, verified
          </span>
        </div>

        <dl className="grid grid-cols-2 divide-line-soft md:grid-cols-4 md:divide-x">
          {proofMetrics.map((metric) => (
            <div key={metric.id} className="py-5 md:px-6 md:first:pl-0 md:last:pr-0">
              <dt className="font-mono text-[11px] tracking-wider text-muted lowercase">
                {metric.label.toLowerCase().replace(/_/g, " ")}
              </dt>
              <dd className="mt-1.5 font-mono text-xl font-semibold tracking-tight text-ink">
                {metric.value}
              </dd>
              <dd className="mt-0.5 text-[13px] leading-snug text-muted">
                {metric.caption}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
