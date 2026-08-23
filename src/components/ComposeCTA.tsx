"use client";

import { useState, type FormEvent } from "react";
import { Clock, MapPin, Send, ShieldCheck } from "lucide-react";
import { site } from "@/data/site";
import { links } from "@/data/links";
import { CopyEmail } from "@/components/CopyEmail";
import { Reveal } from "@/components/Reveal";

const topics = [
  "Deliverability rescue",
  "Cold email infrastructure",
  "Google Workspace / M365",
  "B2B lead generation",
  "WordPress support",
  "Something else",
] as const;

export function ComposeCTA() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [topic, setTopic] = useState<string>(topics[0]);
  const [message, setMessage] = useState("");
  const [drafted, setDrafted] = useState(false);

  const handleSend = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = `${topic}: ${name || "new project"}`;
    const bodyLines = [
      message || "Hi Nayeemur,",
      "",
      `Name: ${name || "-"}`,
      `Company: ${company || "-"}`,
      `Topic: ${topic}`,
    ];
    window.location.href = `mailto:${links.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
    setDrafted(true);
  };

  return (
    <section id="contact" className="paper-halo border-t border-line bg-paper">
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 md:py-20">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-delivered-ink">
              Contact
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
              Ready when you are.
            </h2>
            <p className="mt-4 max-w-md text-muted">
              Describe the symptom: open rates tanking, mail landing in spam, a
              migration on the horizon. You get a plain-language diagnosis and a
              plan, not jargon.
            </p>

            <ul className="mt-8 space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Clock className="size-4 text-delivered" />
                {site.availability}
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="size-4 text-delivered" />
                {site.location} · {site.timezone}
              </li>
              <li className="flex items-center gap-3">
                <ShieldCheck className="size-4 text-delivered" />
                {site.stats.jss} Job Success · ID verified on Upwork
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <CopyEmail />
              <a
                href={links.upwork}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-ink px-3.5 py-2 text-sm font-medium text-paper transition-colors hover:bg-delivered hover:text-term"
              >
                Hire on Upwork
              </a>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <form
              onSubmit={handleSend}
              className="overflow-hidden rounded-2xl border border-term-line bg-term text-term-ink shadow-term"
            >
              <div className="flex items-center gap-3 border-b border-term-line px-4 py-3">
                <span className="flex gap-1.5">
                  <span className="size-2.5 rounded-full bg-spam/70" />
                  <span className="size-2.5 rounded-full bg-warm/70" />
                  <span className="size-2.5 rounded-full bg-delivered/70" />
                </span>
                <span className="font-mono text-xs text-term-muted">New message</span>
              </div>

              <div className="space-y-3 px-4 py-4 sm:px-5">
                <div className="flex items-center gap-2 border-b border-term-line pb-2.5">
                  <span className="w-14 shrink-0 font-mono text-xs text-term-muted">To</span>
                  <span className="rounded-md bg-delivered/15 px-2 py-0.5 font-mono text-xs text-delivered-bright">
                    {links.email}
                  </span>
                </div>

                <div className="flex items-center gap-2 border-b border-term-line pb-2.5">
                  <label htmlFor="cta-topic" className="w-14 shrink-0 font-mono text-xs text-term-muted">
                    Subject
                  </label>
                  <select
                    id="cta-topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full bg-transparent text-sm text-term-ink outline-none [&>option]:bg-term"
                  >
                    {topics.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    aria-label="Your name"
                    className="rounded-lg border border-term-line bg-term-surface px-3 py-2.5 text-sm text-term-ink placeholder:text-term-muted focus:border-delivered focus:outline-none"
                  />
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Company (optional)"
                    aria-label="Company"
                    className="rounded-lg border border-term-line bg-term-surface px-3 py-2.5 text-sm text-term-ink placeholder:text-term-muted focus:border-delivered focus:outline-none"
                  />
                </div>

                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="What's going on with your email? Domains, volume, tools, symptoms"
                  aria-label="Message"
                  rows={5}
                  className="w-full resize-none rounded-lg border border-term-line bg-term-surface px-3 py-2.5 text-sm text-term-ink placeholder:text-term-muted focus:border-delivered focus:outline-none"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-term-line px-4 py-3.5 sm:px-5">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-delivered px-5 py-2.5 font-semibold text-term transition-all hover:-translate-y-0.5 hover:bg-delivered-bright"
                >
                  <Send className="size-4" />
                  Send it
                </button>
                <span className="font-mono text-[11px] text-term-muted">
                  {drafted
                    ? "Draft opened in your email app. Hit send there."
                    : "Opens your email app. No trackers attached."}
                </span>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
