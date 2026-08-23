import {
  CheckCircle2,
  Clock,
  Mail,
  ShieldCheck,
  Star,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { proofMetrics } from "@/data/proof";
import { Reveal } from "@/components/Reveal";

const iconMap: Record<string, LucideIcon> = {
  check: CheckCircle2,
  star: Star,
  shield: ShieldCheck,
  clock: Clock,
  zap: Zap,
  mail: Mail,
};

export function PostmasterStrip() {
  return (
    <section aria-label="Verified profile record" className="border-b border-line bg-card">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-center justify-between border-b border-line-soft py-3 font-mono text-[11px] text-muted">
          <span className="tracking-wider uppercase font-semibold text-ink">
            Postmaster report // verified Upwork metrics
          </span>
          <span className="text-delivered-ink font-medium">
            ● ALL CHECKS PASSING
          </span>
        </div>

        <dl className="grid grid-cols-2 divide-line-soft md:grid-cols-4 md:divide-x py-2">
          {proofMetrics.map((metric, i) => {
            const Icon = iconMap[metric.icon] ?? CheckCircle2;
            return (
              <div key={metric.id} className="py-4 md:px-6 md:first:pl-0 md:last:pr-0">
                <div className="flex items-center justify-between">
                  <dt className="font-mono text-[11px] tracking-wider text-muted uppercase">
                    {metric.label.replace(/_/g, " ")}
                  </dt>
                  {metric.badge && (
                    <span className="rounded border border-delivered/30 bg-delivered/10 px-1.5 py-0.5 font-mono text-[9px] font-semibold text-delivered-ink">
                      {metric.badge}
                    </span>
                  )}
                </div>
                <dd className="mt-2 flex items-center gap-2 font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
                  <Icon className="size-5 text-delivered-ink" />
                  {metric.value}
                </dd>
                <dd className="mt-1 font-sans text-xs text-muted">
                  {metric.caption}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
