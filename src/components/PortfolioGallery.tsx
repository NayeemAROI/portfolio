import { portfolioCases } from "@/data/portfolio";
import { Section } from "./Section";
import { CheckCircle2, ShieldCheck, Mail, Globe, ArrowRight } from "lucide-react";

export function PortfolioGallery() {
  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "Deliverability":
        return <ShieldCheck className="size-4 text-delivered-ink" />;
      case "Cold Email":
        return <Mail className="size-4 text-delivered-ink" />;
      case "Web Development":
        return <Globe className="size-4 text-delivered-ink" />;
      default:
        return <CheckCircle2 className="size-4 text-delivered-ink" />;
    }
  };

  return (
    <Section
      id="portfolio"
      eyebrow="CASE-03 // VERIFIED WORK"
      title="Featured Deliverables"
      description="Proven results across email security authentication, outbound cold campaign setup, and full-stack WordPress systems."
    >
      <div className="grid gap-6 md:grid-cols-3">
        {portfolioCases.map((item) => (
          <div
            key={item.id}
            className="flex flex-col justify-between rounded-2xl border border-line bg-card p-6 shadow-2xs transition hover:-translate-y-1 hover:border-muted hover:shadow-md"
          >
            <div>
              {/* Category tag */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 rounded-full border border-line bg-paper px-2.5 py-0.5 font-mono text-[10px] font-medium text-ink">
                  {getCategoryIcon(item.category)}
                  <span>{item.category}</span>
                </div>
                <span className="font-mono text-[10px] text-delivered-ink font-semibold">
                  COMPLETED
                </span>
              </div>

              {/* Title */}
              <h3 className="mt-4 font-display text-lg font-bold tracking-tight text-ink">
                {item.title}
              </h3>

              {/* Summary */}
              <p className="mt-2 text-xs leading-relaxed text-muted">
                {item.summary}
              </p>

              {/* Metrics pill */}
              <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl border border-line/60 bg-paper/70 p-2.5 font-mono text-xs">
                {item.metrics.map((m, i) => (
                  <div key={i}>
                    <span className="text-[10px] text-muted block">{m.label}</span>
                    <span className="font-bold text-ink text-[11px]">{m.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags footer */}
            <div className="mt-5 border-t border-line/60 pt-3">
              <div className="flex flex-wrap gap-1">
                {item.tags.map((t, i) => (
                  <span
                    key={i}
                    className="rounded bg-paper px-1.5 py-0.5 font-mono text-[10px] text-muted border border-line/40"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
