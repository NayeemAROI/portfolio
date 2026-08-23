import { experiences, certifications, education } from "@/data/timeline";
import { Section } from "./Section";
import { Briefcase, Award, GraduationCap, CheckCircle2 } from "lucide-react";

export function TimelineSection() {
  return (
    <Section
      id="experience"
      eyebrow="HISTORY-05 // CREDENTIALS & EXPERIENCE"
      title="Background & Certifications"
      description="Proven domain experience in B2B lead generation, deliverability systems, web development, and certified LinkedIn marketing."
    >
      <div className="grid gap-8 lg:grid-cols-12">
        
        {/* Work Experience (Left 7 cols) */}
        <div className="lg:col-span-7">
          <div className="flex items-center gap-2 mb-6">
            <Briefcase className="size-4 text-delivered-ink" />
            <h3 className="font-display text-lg font-bold text-ink">
              Employment History
            </h3>
          </div>

          <div className="space-y-6 border-l-2 border-line pl-4 sm:pl-6">
            {experiences.map((exp, i) => (
              <div key={i} className="relative">
                {/* Dot */}
                <div className="absolute -left-[21px] sm:-left-[29px] top-1.5 size-2.5 rounded-full border-2 border-paper bg-delivered" />

                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className="font-sans text-sm font-bold text-ink">
                      {exp.role}
                    </h4>
                    <span className="font-mono text-xs text-muted">
                      {exp.period}
                    </span>
                  </div>

                  <span className="font-mono text-xs text-delivered-ink font-semibold block mt-0.5">
                    {exp.organization}
                  </span>

                  <p className="mt-2 text-xs leading-relaxed text-muted">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications & Education (Right 5 cols) */}
        <div className="space-y-8 lg:col-span-5">
          
          {/* Certifications */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Award className="size-4 text-delivered-ink" />
              <h3 className="font-display text-lg font-bold text-ink">
                Verified Certifications
              </h3>
            </div>

            <div className="space-y-3">
              {certifications.map((cert, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-line bg-card p-4 shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-xs font-bold text-ink">
                      {cert.title}
                    </span>
                    <span className="inline-flex items-center gap-1 font-mono text-[10px] text-delivered-ink">
                      <CheckCircle2 className="size-3" />
                      VERIFIED
                    </span>
                  </div>
                  <div className="mt-1 flex items-center justify-between font-mono text-[11px] text-muted">
                    <span>Issuer: {cert.issuer}</span>
                    <span>{cert.period}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="size-4 text-delivered-ink" />
              <h3 className="font-display text-lg font-bold text-ink">
                Education
              </h3>
            </div>

            <div className="space-y-3">
              {education.map((edu, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-line bg-card p-4 shadow-2xs"
                >
                  <span className="font-sans text-xs font-bold text-ink block">
                    {edu.degree}
                  </span>
                  <span className="mt-1 font-mono text-[11px] text-muted block">
                    {edu.institution}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </Section>
  );
}
