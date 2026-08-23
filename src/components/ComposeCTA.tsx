"use client";

import { useState } from "react";
import { site } from "@/data/site";
import { links } from "@/data/links";
import { services } from "@/data/services";
import { Section } from "./Section";
import { Send, ShieldCheck, CheckCircle, Clock, Mail, ArrowUpRight } from "lucide-react";

export function ComposeCTA() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "deliverability",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Creates a mailto link fallback with prefilled fields
    const subject = encodeURIComponent(`Project Inquiry: ${formData.service} (${formData.name})`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nService: ${formData.service}\n\nProject Details:\n${formData.message}`
    );
    window.location.href = `mailto:${links.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <Section
      id="contact"
      eyebrow="COMPOSE-06 // GET IN TOUCH"
      title="Let's Fix Your Email Deliverability"
      description="Whether you have domain authentication issues, need a full Google Workspace/M365 setup, or want to scale cold email outbound, let's connect."
    >
      <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-line bg-card shadow-lg">
        
        {/* Compose Window Header */}
        <div className="flex items-center justify-between border-b border-line bg-paper px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-line" />
            <span className="size-3 rounded-full bg-line" />
            <span className="size-3 rounded-full bg-line" />
            <span className="ml-2 font-mono text-xs font-semibold text-ink">
              New Message // Project Brief
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] text-muted">
            <Clock className="size-3 text-delivered-ink" />
            <span>Avg Response: 0–4 Hours</span>
          </div>
        </div>

        {/* Form Body */}
        {submitted ? (
          <div className="p-8 sm:p-12 text-center">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-delivered/10 text-delivered-ink">
              <CheckCircle className="size-8" />
            </div>
            <h3 className="mt-4 font-display text-2xl font-bold text-ink">
              Message Prepared & Ready!
            </h3>
            <p className="mt-2 text-sm text-muted">
              Your default email client should open. You can also reach out directly via Upwork.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={() => setSubmitted(false)}
                className="rounded-lg border border-line px-4 py-2 font-mono text-xs text-ink hover:bg-paper"
              >
                Send Another Message
              </button>
              <a
                href={links.upwork}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-delivered px-4 py-2 font-mono text-xs font-semibold text-white"
              >
                <ShieldCheck className="size-3.5" />
                Open Upwork Profile
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
            {/* To Line */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 border-b border-line/60 pb-3 font-mono text-xs">
              <span className="w-16 text-muted">To:</span>
              <span className="font-medium text-ink">
                {site.name} &lt;{site.role}&gt;
              </span>
            </div>

            {/* Name & Email */}
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5 font-mono text-xs">
                <label className="text-muted">Your Name:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="rounded-lg border border-line bg-paper px-3 py-2 text-xs font-sans text-ink focus:border-delivered focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5 font-mono text-xs">
                <label className="text-muted">Your Email:</label>
                <input
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="rounded-lg border border-line bg-paper px-3 py-2 text-xs font-sans text-ink focus:border-delivered focus:outline-none"
                />
              </div>
            </div>

            {/* Service Selection */}
            <div className="flex flex-col gap-1.5 font-mono text-xs">
              <label className="text-muted">Service Required:</label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="rounded-lg border border-line bg-paper px-3 py-2 text-xs font-sans text-ink focus:border-delivered focus:outline-none"
              >
                {services.map((s) => (
                  <option key={s.id} value={s.title}>
                    {s.title}
                  </option>
                ))}
                <option value="General Deliverability Audit">General Deliverability & Spam Audit</option>
              </select>
            </div>

            {/* Message Area */}
            <div className="flex flex-col gap-1.5 font-mono text-xs">
              <label className="text-muted">Project Scope / Domain Details:</label>
              <textarea
                rows={4}
                required
                placeholder="Share your domain name, current open rate, spam issues, or project requirements..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="rounded-lg border border-line bg-paper p-3 text-xs font-sans text-ink focus:border-delivered focus:outline-none"
              />
            </div>

            {/* Submit & Secondary Action */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-line/60">
              <div className="flex items-center gap-2 font-mono text-[11px] text-muted">
                <span className="size-2 rounded-full bg-delivered animate-pulse" />
                <span>Timezone: {site.timezone}</span>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={links.upwork}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-xs text-muted hover:text-ink transition"
                >
                  Message on Upwork
                  <ArrowUpRight className="size-3" />
                </a>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-delivered px-5 py-2.5 font-mono text-xs font-semibold text-white shadow-sm transition hover:bg-delivered-ink active:scale-95 cursor-pointer"
                >
                  <Send className="size-3.5" />
                  Send Message
                </button>
              </div>
            </div>
          </form>
        )}

      </div>
    </Section>
  );
}
