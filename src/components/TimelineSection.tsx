import { Award, GraduationCap, Languages } from "lucide-react";
import { certifications, education, experiences } from "@/data/timeline";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";

export function TimelineSection() {
  return (
    <Section
      code="REC-06"
      eyebrow="Track record"
      title="The long game."
      intro="Employment, certifications, and the education behind the work."
    >
      <div className="grid gap-10 lg:grid-cols-2">
        <Reveal>
          <ol className="relative border-l border-line pl-8">
            {experiences.map((item) => (
              <li key={item.role} className="relative pb-10 last:pb-0">
                <span className="absolute -left-[37px] top-1.5 size-2.5 rounded-full bg-delivered ring-4 ring-paper" />
                <p className="font-mono text-xs text-muted">{item.period}</p>
                <h3 className="mt-1 font-display text-lg font-semibold tracking-tight">
                  {item.role}
                </h3>
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-delivered-ink">
                  {item.organization}
                </p>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
        </Reveal>

        <div className="space-y-4">
          <Reveal delay={80}>
            <div className="rounded-card border border-line bg-card p-6 shadow-card">
              <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                <Award className="size-4 text-delivered" />
                Certifications
              </p>
              <ul className="mt-4 space-y-4">
                {certifications.map((cert) => (
                  <li key={cert.title} className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium">{cert.title}</p>
                      <p className="text-xs text-muted">
                        {cert.issuer} · {cert.period}
                      </p>
                    </div>
                    {cert.verified ? (
                      <span className="rounded border border-delivered/30 bg-delivered/10 px-1.5 py-0.5 font-mono text-[9px] font-semibold tracking-wider text-delivered-ink">
                        VERIFIED
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="rounded-card border border-line bg-card p-6 shadow-card">
              <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                <GraduationCap className="size-4 text-delivered" />
                Education
              </p>
              <ul className="mt-4 space-y-4">
                {education.map((item) => (
                  <li key={item.degree}>
                    <p className="text-sm font-medium">{item.degree}</p>
                    <p className="text-xs text-muted">{item.institution}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <div className="rounded-card border border-line bg-card p-6 shadow-card">
              <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                <Languages className="size-4 text-delivered" />
                Languages
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex items-center justify-between">
                  <span>English</span>
                  <span className="font-mono text-xs text-muted">Fluent</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Bengali</span>
                  <span className="font-mono text-xs text-muted">Native</span>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
