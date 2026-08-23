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
    <section className="border-b border-line bg-paper-subtle">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-px overflow-hidden px-4 py-10 sm:px-6 md:grid-cols-4 md:py-12">
        {proofMetrics.map((metric, i) => {
          const Icon = iconMap[metric.icon] ?? CheckCircle2;
          return (
            <Reveal key={metric.id} delay={i * 80} className="p-4 md:p-5">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                  {metric.label}
                </span>
                {metric.badge ? (
                  <span className="rounded border border-delivered/30 bg-delivered/10 px-1.5 py-0.5 font-mono text-[9px] font-semibold tracking-wider text-delivered-ink">
                    {metric.badge}
                  </span>
                ) : null}
              </div>
              <p className="u-tabular mt-3 flex items-center gap-2 font-display text-3xl font-semibold tracking-tight">
                <Icon className="size-5 text-delivered" />
                {metric.value}
              </p>
              <p className="mt-1.5 text-sm text-muted">{metric.caption}</p>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
