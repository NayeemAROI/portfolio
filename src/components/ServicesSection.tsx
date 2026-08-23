import { services } from "@/data/services";
import { Section } from "./Section";
import { CheckCircle2, ArrowRight } from "lucide-react";

export function ServicesSection() {
  return (
    <Section
      id="services"
      eyebrow="MX-01 // CORE SERVICES"
      title="What I Can Do For You"
      description="Specialized email deliverability, cloud workspace setup, outbound cold email infrastructure, and WordPress development."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => {
          const isFeatured = index === 0;
          return (
            <div
              key={service.id}
              className={`group flex flex-col justify-between rounded-2xl border p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${
                isFeatured
                  ? "border-delivered/40 bg-card shadow-sm md:col-span-2 lg:col-span-2"
                  : "border-line bg-card shadow-2xs"
              }`}
            >
              <div>
                {/* Header tag */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-delivered-ink">
                    {service.code}
                  </span>
                  {isFeatured && (
                    <span className="rounded-full bg-delivered/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-delivered-ink">
                      PRIMARY SPECIALTY
                    </span>
                  )}
                </div>

                {/* Title & Headline */}
                <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-ink group-hover:text-delivered-ink transition-colors">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {service.headline}
                </p>

                {/* Deliverables Checklist */}
                <div className="mt-5 space-y-2.5 border-t border-line/60 pt-4">
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-ink/80 block">
                    Core Deliverables:
                  </span>
                  {service.deliverables.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-ink/90">
                      <CheckCircle2 className="size-3.5 shrink-0 text-delivered-ink mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools tags & CTA Footer */}
              <div className="mt-6 border-t border-line/60 pt-4">
                <div className="flex flex-wrap gap-1.5">
                  {service.tools.map((tool, i) => (
                    <span
                      key={i}
                      className="rounded bg-paper px-2 py-0.5 font-mono text-[10px] text-muted border border-line/50"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-delivered-ink hover:underline"
                  >
                    Request this service
                    <ArrowRight className="size-3" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
