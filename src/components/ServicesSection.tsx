import Link from "next/link";
import {
  ArrowRight,
  Flame,
  Search,
  Server,
  ShieldCheck,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { services } from "@/data/services";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";

const iconMap: Record<string, LucideIcon> = {
  deliverability: ShieldCheck,
  "cold-outreach": Flame,
  "workspace-m365": Server,
  "lead-generation": Search,
  "web-support": Wrench,
};

/* Balanced rows: 3+3 on the first row, 2+2+2 on the second (desktop). */
const spans = [
  "md:col-span-3 lg:col-span-3",
  "md:col-span-3 lg:col-span-3",
  "md:col-span-3 lg:col-span-2",
  "md:col-span-3 lg:col-span-2",
  "md:col-span-6 lg:col-span-2",
];

export function ServicesSection() {
  return (
    <Section
      id="services"
      eyebrow="Services"
      title="Five pillars. One outcome: delivered."
      intro="Everything below is production work I do every week, not a menu of maybes. Each pillar has its own playbook."
    >
      <div className="grid gap-4 md:grid-cols-6">
        {services.map((service, i) => {
          const Icon = iconMap[service.id] ?? ShieldCheck;
          return (
            <Reveal key={service.id} delay={i * 70} className={spans[i]}>
              <Link
                href={`/services/${service.id}`}
                className="group flex h-full flex-col rounded-card border border-line bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-delivered/50 hover:shadow-lift"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="grid size-10 place-items-center rounded-xl bg-delivered/10 text-delivered-ink transition-colors group-hover:bg-delivered group-hover:text-term">
                    <Icon className="size-5" />
                  </span>
                  <span className="rounded border border-line px-2 py-0.5 font-mono text-[10px] tracking-widest text-muted">
                    {service.code}
                  </span>
                </div>

                <h3 className="mt-4 font-display text-xl font-semibold tracking-tight">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {service.headline}
                </p>

                <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
                  {service.tools.slice(0, 4).map((tool) => (
                    <span
                      key={tool}
                      className="rounded-md bg-paper-subtle px-2 py-0.5 font-mono text-[10px] text-muted"
                    >
                      {tool}
                    </span>
                  ))}
                  {service.tools.length > 4 ? (
                    <span className="rounded-md bg-paper-subtle px-2 py-0.5 font-mono text-[10px] text-muted">
                      +{service.tools.length - 4}
                    </span>
                  ) : null}
                </div>

                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-delivered-ink">
                  View playbook
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
