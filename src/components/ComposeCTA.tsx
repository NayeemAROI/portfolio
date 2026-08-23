"use client";

import { useId, useState } from "react";
import { site } from "@/data/site";
import { links } from "@/data/links";
import { services } from "@/data/services";
import { Section } from "./Section";
import { Send, ShieldCheck, Mail, ArrowUpRight } from "lucide-react";

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
      description="Domain authentication problems, a full Google Workspace or M365 setup, or cold outbound that needs to scale. Tell me which one you are dealing with."
    >
      <div className="mx-auto max-w-3xl border border-line bg-card">
        <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line px-4 py-3 sm:px-6">
          <span className="font-mono text-xs font-semibold text-ink">
            New message // project brief
          </span>
          <span className="font-mono text-[11px] text-muted">{site.timezone}</span>
        </div>

        {handedOff ? (
          /* Honest hand-off state. mailto: gives no success signal back, so
             this describes the attempt and keeps both real paths visible. */
          <div className="px-4 py-10 sm:px-8">
            <h3 className="font-display text-2xl font-bold text-ink">
              Your email client should be opening now
            </h3>
            <p className="mt-3 max-w-[60ch] text-[15px] leading-relaxed text-muted">
              The draft is prefilled with what you wrote. If nothing opened,
              your browser has no mail client registered, which is common. Both
              routes below work either way.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={`mailto:${links.email}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-delivered-ink px-5 py-2.5 font-mono text-sm font-semibold text-white transition-colors hover:bg-ink"
              >
                <Mail className="size-4" aria-hidden="true" />
                {links.email}
              </a>
              <a
                href={links.upwork}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-line px-5 py-2.5 font-mono text-sm font-medium text-ink transition-colors hover:border-ink"
              >
                <ShieldCheck className="size-4 text-delivered-ink" aria-hidden="true" />
                Message on Upwork
              </a>
            </div>

            <button
              type="button"
              onClick={() => setHandedOff(false)}
              className="mt-6 font-mono text-xs text-muted underline underline-offset-4 transition-colors hover:text-ink"
            >
              Back to the form
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 p-4 sm:p-6">
            <div className="flex flex-wrap items-baseline gap-x-3 border-b border-line-soft pb-3 font-mono text-xs">
              <span className="text-muted">To:</span>
              <span className="font-medium text-ink">
                {site.name}, {site.role}
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
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
                  autoComplete="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="rounded-lg border border-line bg-paper px-3 py-2.5 text-sm text-ink"
                />
              </div>

              <div className="flex flex-col gap-1.5">
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
                  autoComplete="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="rounded-lg border border-line bg-paper px-3 py-2.5 text-sm text-ink"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
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
                className="rounded-lg border border-line bg-paper px-3 py-2.5 text-sm text-ink"
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

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor={`${uid}-message`}
                className="font-mono text-xs text-muted"
              >
                Domain and details
              </label>
              <textarea
                id={`${uid}-message`}
                name="message"
                rows={5}
                required
                aria-describedby={`${uid}-hint`}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="rounded-lg border border-line bg-paper p-3 text-sm text-ink"
              />
              <span
                id={`${uid}-hint`}
                className="font-mono text-[11px] leading-relaxed text-muted"
              >
                Sending domain, current open rate, and what you are seeing.
                Enough to diagnose before we talk.
              </span>
            </div>

            <div className="flex flex-col gap-3 border-t border-line-soft pt-5 sm:flex-row sm:items-center sm:justify-between">
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
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-delivered-ink px-5 py-2.5 font-mono text-sm font-semibold text-white transition-colors hover:bg-ink"
              >
                <Send className="size-4" aria-hidden="true" />
                Send brief
              </button>
            </div>
          </form>
        )}
      </div>
    </Section>
  );
}
