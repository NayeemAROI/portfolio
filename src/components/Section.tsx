import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";

type SectionProps = {
  id?: string;
  eyebrow: string;
  title: string;
  intro?: string;
  tone?: "paper" | "subtle";
  children: ReactNode;
};

export function Section({
  id,
  eyebrow,
  title,
  intro,
  tone = "paper",
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-16 border-t border-line ${
        tone === "subtle" ? "bg-paper-subtle" : "bg-paper"
      }`}
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 md:py-28">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-delivered-ink">
            {eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
            {title}
          </h2>
          {intro ? <p className="mt-4 text-muted">{intro}</p> : null}
        </Reveal>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
