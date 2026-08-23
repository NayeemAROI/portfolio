import { Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { site } from "@/data/site";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";

function Stars({ className = "size-3.5" }: { className?: string }) {
  return (
    <span className="flex gap-0.5" aria-label="5.0 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`${className} fill-warm text-warm`} />
      ))}
    </span>
  );
}

export function ReviewsSection() {
  const featured = testimonials[2];
  const rest = testimonials.filter((_, i) => i !== 2);

  return (
    <Section
      tone="subtle"
      eyebrow="Client feedback"
      title="Seven contracts. Seven 5.0s."
      intro={`Every completed Upwork contract to date, quoted verbatim. ${site.stats.jss} Job Success Score.`}
    >
      <Reveal>
        <figure className="rounded-card border border-line bg-card p-8 text-center shadow-card md:p-10">
          <div className="flex justify-center">
            <Stars className="size-4" />
          </div>
          <blockquote className="mx-auto mt-4 max-w-3xl font-display text-2xl font-medium leading-snug tracking-tight md:text-3xl">
            “{featured.quote}”
          </blockquote>
          <figcaption className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-muted">
            {featured.project} · {featured.rating.toFixed(1)} rating
          </figcaption>
        </figure>
      </Reveal>

      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {rest.map((review, i) => (
          <Reveal key={review.id} delay={i * 60}>
            <figure className="flex h-full flex-col rounded-card border border-line bg-card p-6 shadow-card">
              <Stars />
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed">
                “{review.quote}”
              </blockquote>
              <figcaption className="mt-4 border-t border-line pt-3">
                <p className="font-mono text-[11px] uppercase tracking-wide text-muted">
                  {review.project}
                </p>
                {review.tags ? (
                  <p className="mt-2 flex flex-wrap gap-1.5">
                    {review.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-paper-subtle px-2 py-0.5 font-mono text-[10px] text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </p>
                ) : null}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
