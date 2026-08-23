import { testimonials } from "@/data/testimonials";
import { links } from "@/data/links";
import { Section } from "./Section";
import { Star, ShieldCheck, ArrowUpRight, Quote } from "lucide-react";

export function ReviewsSection() {
  return (
    <Section
      id="reviews"
      eyebrow="FEEDBACK-04 // UPWORK CLIENT REVIEWS"
      title="100% 5.0 ★ Client Satisfaction"
      description="Verbatim reviews from verified clients on Upwork across deliverability, cold outreach, and web development projects."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="flex flex-col justify-between rounded-2xl border border-line bg-card p-6 shadow-2xs transition hover:border-muted hover:shadow-sm"
          >
            <div>
              {/* Star Rating & Verified Badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="size-3.5 fill-warm text-warm"
                    />
                  ))}
                  <span className="ml-1 font-mono text-xs font-bold text-ink">
                    5.0
                  </span>
                </div>

                <span className="inline-flex items-center gap-1 font-mono text-[10px] text-delivered-ink font-semibold">
                  <ShieldCheck className="size-3" />
                  VERIFIED
                </span>
              </div>

              {/* Quote */}
              <div className="relative mt-4">
                <Quote className="absolute -top-1 -left-1 size-5 text-line -z-0 opacity-50" />
                <p className="relative z-10 text-sm leading-relaxed text-ink/90 font-medium italic">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>
            </div>

            {/* Project info footer */}
            <div className="mt-5 border-t border-line/60 pt-3">
              <span className="font-mono text-[11px] font-semibold text-ink block">
                Project: {item.project}
              </span>
              {item.tags && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {item.tags.map((t, i) => (
                    <span
                      key={i}
                      className="rounded bg-paper px-1.5 py-0.5 font-mono text-[9px] text-muted border border-line/40"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Upwork Profile Proof Bar */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-delivered/30 bg-delivered/5 p-4 sm:p-5">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-delivered text-white">
            <ShieldCheck className="size-5" />
          </div>
          <div>
            <span className="font-sans text-sm font-bold text-ink">
              All reviews are publicly verified on Upwork
            </span>
            <span className="block font-sans text-xs text-muted">
              100% Job Success Score • ID Verified • Top Rated Freelancer
            </span>
          </div>
        </div>

        <a
          href={links.upwork}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg bg-card px-4 py-2 font-mono text-xs font-semibold text-ink border border-line shadow-2xs hover:border-muted transition whitespace-nowrap"
        >
          View Live Upwork Profile
          <ArrowUpRight className="size-3.5 text-muted" />
        </a>
      </div>
    </Section>
  );
}
