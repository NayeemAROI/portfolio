import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { ComposeCTA } from "@/components/ComposeCTA";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get a plain-language deliverability diagnosis. Responds in 0-4 hours, GMT+6.",
};

const checklist = [
  "How many domains and inboxes you send from",
  "Current stack: ESP, warmup tool, CRM",
  "What changed right before things broke",
  "Where emails land now — spam, promotions, or nowhere",
];

export default function ContactPage() {
  return (
    <>
      <section className="paper-halo border-b border-line bg-paper">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <p className="animate-rise font-mono text-xs uppercase tracking-[0.22em] text-delivered-ink">
            Contact
          </p>
          <h1
            className="animate-rise mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl"
            style={{ animationDelay: "80ms" }}
          >
            Tell me where it hurts.
          </h1>
          <p
            className="animate-rise mt-4 max-w-xl text-muted"
            style={{ animationDelay: "160ms" }}
          >
            The more specifics you include, the faster the diagnosis. Useful
            details:
          </p>
          <ul
            className="animate-rise mt-6 grid max-w-2xl gap-3 sm:grid-cols-2"
            style={{ animationDelay: "240ms" }}
          >
            {checklist.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 rounded-card border border-line bg-card p-4 text-sm shadow-card"
              >
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-delivered" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ComposeCTA />
    </>
  );
}
