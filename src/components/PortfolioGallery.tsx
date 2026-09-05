import { portfolioCases } from "@/data/portfolio";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";

/**
 * Case files. Layout is editorial, not a uniform card row: the first file is
 * the headline engagement (wide), the third runs horizontal. Every line under
 * a file is a verified fact (see src/data/portfolio.ts).
 */
export function PortfolioGallery() {
  const [first, second, third] = portfolioCases;

  return (
    <Section
      code="FILE-04"
      eyebrow="Case work"
      title="Shipped systems, on the record."
      intro="Three lanes of delivery work. Numbers stay out of it unless they survive verification; the configuration and the receipts speak instead."
    >
      <div className="grid gap-4 md:grid-cols-12">
        {/* CASE-01: headline file, wide */}
        <Reveal className="md:col-span-12 lg:col-span-7">
          <CaseFile item={first} featured />
        </Reveal>

        {/* CASE-02: tall */}
        <Reveal delay={90} className="md:col-span-12 lg:col-span-5">
          <CaseFile item={second} />
        </Reveal>

        {/* CASE-03: horizontal */}
        <Reveal delay={140} className="md:col-span-12">
          <CaseFile item={third} horizontal />
        </Reveal>
      </div>
    </Section>
  );
}

type CaseItem = (typeof portfolioCases)[number];

function CaseFile({
  item,
  featured = false,
  horizontal = false,
}: {
  item: CaseItem;
  featured?: boolean;
  horizontal?: boolean;
}) {
  return (
    <article
      className={`flex h-full flex-col rounded-card border border-line bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-delivered/50 hover:shadow-lift ${
        horizontal ? "p-6 sm:flex-row sm:items-start sm:gap-8 md:p-8" : "p-6 md:p-7"
      }`}
    >
      <div className={horizontal ? "sm:max-w-md" : ""}>
        <div className="flex items-center justify-between gap-3">
          <p className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            <span className="rounded border border-line bg-paper-subtle px-1.5 py-0.5 font-semibold text-ink">
              {item.file}
            </span>
            {item.category}
          </p>
          <span className="rounded border border-delivered/30 bg-delivered/10 px-1.5 py-0.5 font-mono text-[9px] font-semibold tracking-wider text-delivered-ink">
            VERIFIED
          </span>
        </div>

        <h3
          className={`mt-4 font-display font-semibold leading-snug tracking-tight ${
            featured ? "text-2xl md:text-3xl" : "text-lg md:text-xl"
          }`}
        >
          {item.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {item.summary}
        </p>

        {horizontal ? null : (
          <div className="mt-auto pt-5">
            <CaseLines item={item} />
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
          </div>
        )}
      </div>

      {horizontal ? (
        <div className="mt-5 flex-1 sm:mt-0">
          <CaseLines item={item} />
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
        </div>
      ) : null}
    </article>
  );
}

function CaseLines({ item }: { item: CaseItem }) {
  return (
    <dl className="border-t border-line">
      {item.lines.map((line) => (
        <div
          key={line.label}
          className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5 border-b border-line py-2 last:border-0"
        >
          <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
            {line.label}
          </dt>
          <dd className="u-tabular font-mono text-xs font-medium text-delivered-ink">
            {line.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
