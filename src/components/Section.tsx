import React from "react";

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className = "",
  dark = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`relative w-full py-16 md:py-24 ${
        dark ? "bg-term text-term-ink" : "bg-paper text-ink"
      } ${className}`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {(eyebrow || title || description) && (
          <div className="mb-12 md:mb-16">
            {eyebrow && (
              <span
                className={`inline-block font-mono text-xs tracking-wider uppercase ${
                  dark ? "text-delivered-bright" : "text-delivered-ink"
                }`}
              >
                {eyebrow}
              </span>
            )}
            {title && (
              <h2
                className={`mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl ${
                  dark ? "text-term-ink" : "text-ink"
                }`}
              >
                {title}
              </h2>
            )}
            {description && (
              <p
                className={`mt-3 max-w-2xl text-base leading-relaxed ${
                  dark ? "text-term-muted" : "text-muted"
                }`}
              >
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
