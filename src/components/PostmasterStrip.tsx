import { proofMetrics } from "@/data/proof";
import { ShieldCheck, Star, CheckCircle, Clock } from "lucide-react";

export function PostmasterStrip() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "shield":
        return <ShieldCheck className="size-4 text-delivered-ink" />;
      case "star":
        return <Star className="size-4 text-warm fill-warm/20" />;
      case "check":
        return <CheckCircle className="size-4 text-delivered-ink" />;
      case "clock":
        return <Clock className="size-4 text-muted" />;
      default:
        return <CheckCircle className="size-4 text-delivered-ink" />;
    }
  };

  return (
    <div className="w-full border-b border-line bg-card py-6">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {proofMetrics.map((metric) => (
            <div
              key={metric.id}
              className="flex flex-col justify-between rounded-xl border border-line/60 bg-paper/50 p-4 transition-colors hover:border-line hover:bg-paper"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-wider text-muted uppercase">
                  {metric.label}
                </span>
                {getIcon(metric.icon)}
              </div>

              <div className="mt-3">
                <span className="font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
                  {metric.value}
                </span>
                <span className="mt-0.5 block font-sans text-xs text-muted">
                  {metric.caption}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
