"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Clock, MapPin, Send, ShieldCheck } from "lucide-react";
import { site } from "@/data/site";
import { links } from "@/data/links";
import { topics, isContactTopic, type ContactTopic } from "@/data/topics";
import { CopyEmail } from "@/components/CopyEmail";
import { Reveal } from "@/components/Reveal";

type Errors = { name?: string; message?: string };

export function buildMailto(input: {
  email: string;
  name: string;
  company: string;
  topic: string;
  message: string;
}): string {
  const subject = `${input.topic}: ${input.name}`;
  const bodyLines = [
    input.message,
    "",
    `Name: ${input.name}`,
    `Company: ${input.company || "-"}`,
    `Topic: ${input.topic}`,
  ];
  return `mailto:${input.email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
}

export function ComposeCTA() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [topic, setTopic] = useState<ContactTopic>(topics[0]);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [drafted, setDrafted] = useState(false);
  const [mailClientStalled, setMailClientStalled] = useState(false);
  const stallTimer = useRef<number | null>(null);

  // Preselect the topic when arriving from a service page (/contact?topic=...).
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("topic");
    if (requested && isContactTopic(requested)) {
      setTopic(requested);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (stallTimer.current !== null) {
        window.clearTimeout(stallTimer.current);
      }
    };
  }, []);

  const validate = (): Errors => {
    const next: Errors = {};
    if (name.trim().length < 2) {
      next.name = "Add your name so I know who I am replying to.";
    }
    if (message.trim().length < 20) {
      next.message = "Add a couple of sentences about the symptoms (20 characters or more).";
    }
    return next;
  };

  const handleSend = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setMailClientStalled(false);
    window.location.href = buildMailto({
      email: links.email,
      name: name.trim(),
      company: company.trim(),
      topic,
      message: message.trim(),
    });
    setDrafted(true);

    // If no mail client takes over, the tab stays visible. Offer a fallback.
    if (stallTimer.current !== null) window.clearTimeout(stallTimer.current);
    stallTimer.current = window.setTimeout(() => {
      if (document.visibilityState === "visible") {
        setMailClientStalled(true);
      }
    }, 1600);
  };

  const plainText = [
    `To: ${links.email}`,
    `Subject: ${topic}: ${name.trim() || "new project"}`,
    "",
    message.trim(),
    "",
    `Name: ${name.trim() || "-"}`,
    `Company: ${company.trim() || "-"}`,
  ].join("\n");

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
              noValidate
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
                    onChange={(e) => setTopic(e.target.value as ContactTopic)}
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
                  <div>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      aria-label="Your name"
                      required
                      aria-required="true"
                      aria-invalid={errors.name ? "true" : undefined}
                      aria-describedby={errors.name ? "cta-name-error" : undefined}
                      className="w-full rounded-lg border border-term-line bg-term-surface px-3 py-2.5 text-sm text-term-ink placeholder:text-term-muted focus:border-delivered focus:outline-none aria-[invalid=true]:border-spam"
                    />
                    {errors.name ? (
                      <p id="cta-name-error" className="mt-1.5 text-xs text-spam">
                        {errors.name}
                      </p>
                    ) : null}
                  </div>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Company (optional)"
                    aria-label="Company"
                    className="h-fit rounded-lg border border-term-line bg-term-surface px-3 py-2.5 text-sm text-term-ink placeholder:text-term-muted focus:border-delivered focus:outline-none"
                  />
                </div>

                <div>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="What's going on with your email? Domains, volume, tools, symptoms"
                    aria-label="Message"
                    rows={5}
                    required
                    aria-required="true"
                    aria-invalid={errors.message ? "true" : undefined}
                    aria-describedby={errors.message ? "cta-message-error" : undefined}
                    className="w-full resize-none rounded-lg border border-term-line bg-term-surface px-3 py-2.5 text-sm text-term-ink placeholder:text-term-muted focus:border-delivered focus:outline-none aria-[invalid=true]:border-spam"
                  />
                  {errors.message ? (
                    <p id="cta-message-error" className="mt-1.5 text-xs text-spam">
                      {errors.message}
                    </p>
                  ) : null}
                </div>

                <p aria-live="polite" className="sr-only">
                  {Object.keys(errors).length > 0
                    ? "The form has errors. Check the highlighted fields."
                    : ""}
                </p>

                {mailClientStalled ? (
                  <div
                    role="status"
                    className="rounded-lg border border-term-line bg-term-surface p-3 text-xs text-term-muted"
                  >
                    <p className="font-medium text-term-ink">
                      No mail app opened?
                    </p>
                    <p className="mt-1">
                      Some devices have no default email client. Copy the message
                      below and send it from webmail.
                    </p>
                    <pre className="mt-2 max-h-40 overflow-auto whitespace-pre-wrap break-words font-mono text-[11px] text-term-ink">
{plainText}
                    </pre>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => navigator.clipboard?.writeText(plainText)}
                        className="rounded-md border border-term-line px-2.5 py-1.5 font-medium text-term-ink transition-colors hover:border-term-muted"
                      >
                        Copy message
                      </button>
                      <a
                        href={links.upwork}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-md border border-term-line px-2.5 py-1.5 font-medium text-term-ink transition-colors hover:border-term-muted"
                      >
                        Message me on Upwork
                      </a>
                    </div>
                  </div>
                ) : null}
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
