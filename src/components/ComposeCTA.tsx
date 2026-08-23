"use client";

import { useId, useState } from "react";
import { site } from "@/data/site";
import { links } from "@/data/links";
import { services } from "@/data/services";
import { Section } from "./Section";
import { CopyEmail } from "@/components/CopyEmail";
import { Send, ShieldCheck, Mail, ArrowUpRight, Clock, MapPin } from "lucide-react";

export function ComposeCTA() {
  const uid = useId();
  const [handedOff, setHandedOff] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "General deliverability and spam audit",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Project inquiry: ${formData.service} (${formData.name})`
    );
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nService: ${formData.service}\n\nProject details:\n${formData.message}`
    );
    window.location.href = `mailto:${links.email}?subject=${subject}&body=${body}`;
    setHandedOff(true);
  };

  return (
    <Section
      id="contact"
      eyebrow="COMPOSE-06 // GET IN TOUCH"
      title="Let's fix your email deliverability"
      intro="Domain authentication problems, a full Google Workspace or M365 setup, or cold outbound that needs to scale. Tell me which one you are dealing with."
    >
      <div className="mx-auto max-w-4xl grid gap-8 lg:grid-cols-[1fr_1.3fr] items-start">
        {/* Left column: Direct contacts & meta */}
        <div className="space-y-6">
          <div>
            <h3 className="font-display text-2xl font-bold tracking-tight text-ink">
              Ready when you are.
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Describe the symptom — open rates dropping, emails landing in spam, a domain setup, or a migration. You get a direct, plain-language diagnosis and plan.
            </p>
          </div>

          <ul className="space-y-3 font-mono text-xs text-ink/90">
            <li className="flex items-center gap-2.5">
              <Clock className="size-4 text-delivered-ink" />
              <span>Responds in 0–4 hours (Dhaka GMT+6)</span>
            </li>
            <li className="flex items-center gap-2.5">
              <MapPin className="size-4 text-delivered-ink" />
              <span>{site.location}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <ShieldCheck className="size-4 text-delivered-ink" />
              <span>100% Job Success Score on Upwork</span>
            </li>
          </ul>

          <div className="flex flex-wrap gap-3 pt-2">
            <CopyEmail />
            <a
              href={links.upwork}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-card px-3.5 py-2 font-mono text-xs font-medium text-ink shadow-2xs hover:border-muted transition"
            >
              <ShieldCheck className="size-3.5 text-delivered-ink" />
              Hire on Upwork
              <ArrowUpRight className="size-3 text-muted" />
            </a>
          </div>
        </div>

        {/* Right column: Compose form */}
        <div className="border border-line bg-card rounded-2xl shadow-sm overflow-hidden">
          <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line bg-paper px-4 py-3 sm:px-6">
            <span className="font-mono text-xs font-semibold text-ink">
              New message // project brief
            </span>
            <span className="font-mono text-[11px] text-muted">{site.timezone}</span>
          </div>

          {handedOff ? (
            <div className="p-6 sm:p-8 text-center">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-delivered/10 text-delivered-ink">
                <Mail className="size-6" />
              </div>
              <h3 className="mt-4 font-display text-xl font-bold text-ink">
                Your email client should be opening now
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted max-w-md mx-auto">
                The draft is prefilled with your message. If nothing opened, you can email directly or message on Upwork.
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a
                  href={`mailto:${links.email}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-delivered-ink px-4 py-2 font-mono text-xs font-semibold text-white transition-colors hover:bg-ink"
                >
                  <Mail className="size-3.5" />
                  {links.email}
                </a>
                <a
                  href={links.upwork}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-line px-4 py-2 font-mono text-xs font-medium text-ink hover:bg-paper"
                >
                  <ShieldCheck className="size-3.5 text-delivered-ink" />
                  Message on Upwork
                </a>
              </div>

              <button
                type="button"
                onClick={() => setHandedOff(false)}
                className="mt-6 font-mono text-xs text-muted underline hover:text-ink"
              >
                Back to form
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 p-4 sm:p-6">
              <div className="flex flex-wrap items-baseline gap-x-3 border-b border-line/60 pb-2.5 font-mono text-xs">
                <span className="text-muted">To:</span>
                <span className="font-medium text-ink">
                  {site.name}, {site.role}
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor={`${uid}-name`}
                    className="font-mono text-xs text-muted"
                  >
                    Your name
                  </label>
                  <input
                    id={`${uid}-name`}
                    name="name"
                    type="text"
                    required
                    placeholder="Alex Morgan"
                    autoComplete="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="rounded-lg border border-line bg-paper px-3 py-2 text-xs font-sans text-ink focus:border-delivered focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label
                    htmlFor={`${uid}-email`}
                    className="font-mono text-xs text-muted"
                  >
                    Your email
                  </label>
                  <input
                    id={`${uid}-email`}
                    name="email"
                    type="email"
                    required
                    placeholder="alex@company.com"
                    autoComplete="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="rounded-lg border border-line bg-paper px-3 py-2 text-xs font-sans text-ink focus:border-delivered focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor={`${uid}-service`}
                  className="font-mono text-xs text-muted"
                >
                  What you need
                </label>
                <select
                  id={`${uid}-service`}
                  name="service"
                  value={formData.service}
                  onChange={(e) =>
                    setFormData({ ...formData, service: e.target.value })
                  }
                  className="rounded-lg border border-line bg-paper px-3 py-2 text-xs font-sans text-ink focus:border-delivered focus:outline-none"
                >
                  <option value="General deliverability and spam audit">
                    General deliverability and spam audit
                  </option>
                  {services.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor={`${uid}-message`}
                  className="font-mono text-xs text-muted"
                >
                  Domain and details
                </label>
                <textarea
                  id={`${uid}-message`}
                  name="message"
                  rows={4}
                  required
                  placeholder="Sending domain, current open rates, spam issues, or migration requirements..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="rounded-lg border border-line bg-paper p-3 text-xs font-sans text-ink focus:border-delivered focus:outline-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-line/60">
                <a
                  href={links.upwork}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-xs text-muted transition-colors hover:text-ink"
                >
                  Prefer Upwork? Message me there
                  <ArrowUpRight className="size-3" aria-hidden="true" />
                </a>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-delivered-ink px-5 py-2.5 font-mono text-xs font-semibold text-white transition-colors hover:bg-ink cursor-pointer"
                >
                  <Send className="size-3.5" aria-hidden="true" />
                  Send brief
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </Section>
  );
}
