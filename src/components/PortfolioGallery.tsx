import { portfolioCases } from "@/data/portfolio";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";

const dotColor: Record<string, string> = {
  Deliverability: "bg-delivered",
  "Cold Email": "bg-warm",
  "Web Development": "bg-ink",
};

export function PortfolioGallery() {
  return (
    <Section
      eyebrow="Case work"
      title="Shipped systems, not slides."
      intro="Three lanes of delivery work, each with the outcome that mattered."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {portfolioCases.map((item, i) => (
          <Reveal key={item.id} delay={i * 90}>
            <article className="flex h-full flex-col rounded-card border border-line bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
              <p className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                <span
                  className={`size-1.5 rounded-full ${dotColor[item.category] ?? "bg-delivered"}`}
                />
                {item.category}
              </p>
              <h3 className="mt-3 font-display text-lg font-semibold leading-snug tracking-tight">
                {item.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                {item.summary}
              </p>

              <dl className="mt-5 space-y-2 border-t border-line pt-4">
                {item.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="flex items-center justify-between gap-3"
                  >
                    <dt className="font-mono text-[11px] uppercase tracking-wide text-muted">
                      {metric.label}
                    </dt>
                    <dd className="u-tabular font-mono text-xs font-semibold text-delivered-ink">
                      {metric.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-paper-subtle px-2 py-0.5 font-mono text-[10px] text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
