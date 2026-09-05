"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Clock, MapPin, ShieldCheck } from "lucide-react";
import { site } from "@/data/site";
import { links } from "@/data/links";
import { CopyEmail } from "@/components/CopyEmail";

const topics = ["Deliverability rescue", "Cold email infrastructure", "Google Workspace / M365", "B2B lead generation", "WordPress support", "Something else"] as const;

type MessageInput = { email: string; name: string; company: string; topic: string; message: string };
// Reuses the encoded mailto contract reviewed in PR #11, without app-detection timers.
export function buildMailto(input: MessageInput): string {
  const subject = `${input.topic}: ${input.name}`;
  const body = [input.message, "", `Name: ${input.name}`, `Company: ${input.company || "-"}`, `Topic: ${input.topic}`].join("\n");
  return `mailto:${input.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function ComposeCTA() {
  const id = useId();
  const resultRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [topic, setTopic] = useState<string>(topics[0]);
  const [message, setMessage] = useState("");
  const [draft, setDraft] = useState<{ href: string; text: string } | null>(null);
  const [feedback, setFeedback] = useState("");

  function handlePrepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || message.trim().length < 20) {
      setFeedback("Add your name and a message of at least 20 characters.");
      event.currentTarget.querySelector<HTMLElement>(!name.trim() ? "input" : "textarea")?.focus();
      return;
    }
    const input = { email: links.email, name: name.trim(), company: company.trim(), topic, message: message.trim() };
    setDraft({ href: buildMailto(input), text: [`To: ${input.email}`, `Subject: ${input.topic}: ${input.name}`, "", input.message, "", `Name: ${input.name}`, `Company: ${input.company || "-"}`, `Topic: ${input.topic}`].join("\n") });
    setFeedback("");
  }

  async function copyMessage() {
    if (!draft) return;
    try {
      if (!navigator.clipboard) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(draft.text);
      setFeedback("Message copied. Paste it into your email app to send.");
    } catch {
      setFeedback("Select the message below and copy it manually.");
      const text = resultRef.current?.querySelector("textarea");
      text?.focus();
      text?.select();
    }
  }

  return (
    <section id="contact" className="compose-section">
      <div className="compose-layout">
        <div className="compose-intro">
          <h2>Ready when you are.</h2>
          <p>Describe the symptom: open rates tanking, mail landing in spam, a migration on the horizon. You get a plain-language diagnosis and a plan, not jargon.</p>
          <ul>
            <li><Clock size={18} aria-hidden="true" />{site.availability}</li>
            <li><MapPin size={18} aria-hidden="true" />{site.location} · {site.timezone}</li>
            <li><ShieldCheck size={18} aria-hidden="true" />{site.stats.jss} Job Success · ID verified on Upwork</li>
          </ul>
          <div className="compose-alternatives">
            <CopyEmail />
            <a href={links.upwork} target="_blank" rel="noopener noreferrer">Hire on Upwork <ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
        </div>
        <form className="compose-form" onSubmit={handlePrepare} onChange={() => { setDraft(null); setFeedback(""); }}>
          <div className="compose-title">New message</div>
          <div className="compose-fields">
            <p className="compose-recipient"><span>To</span><span>{links.email}</span></p>
            <label htmlFor={`${id}-topic`}>Subject</label>
            <select id={`${id}-topic`} value={topic} onChange={e => setTopic(e.target.value)}>
              {topics.map(t => <option key={t}>{t}</option>)}
            </select>
            <div className="compose-names">
              <div><label htmlFor={`${id}-name`}>Your name</label><input id={`${id}-name`} aria-label="Your name" autoComplete="name" value={name} onChange={e => setName(e.target.value)} required maxLength={120} /></div>
              <div><label htmlFor={`${id}-company`}>Company (optional)</label><input id={`${id}-company`} aria-label="Company" autoComplete="organization" value={company} onChange={e => setCompany(e.target.value)} maxLength={160} /></div>
            </div>
            <label htmlFor={`${id}-message`}>What needs fixing?</label>
            <p id={`${id}-hint`} className="compose-hint">Domains, volume, tools, symptoms. At least 20 characters.</p>
            <textarea id={`${id}-message`} aria-label="Message" aria-describedby={`${id}-hint`} value={message} onChange={e => setMessage(e.target.value)} required minLength={20} maxLength={2000} rows={5} />
            <button type="submit" className="compose-prepare">Prepare email <ArrowUpRight size={18} aria-hidden="true" /></button>
            <p className="compose-hint">Nothing is sent from this website. No trackers attached.</p>
            <p role="status" className="compose-feedback">{feedback}</p>
            {draft && <div ref={resultRef} className="compose-result">
              <p role="status" className="compose-result-title">Email prepared, not sent.</p>
              <p>Open your email app to review and send, or copy the message into webmail.</p>
              <div className="compose-result-actions"><a href={draft.href}>Open email app</a><button type="button" onClick={copyMessage}>Copy message</button></div>
              <label htmlFor={`${id}-prepared`}>Prepared message</label>
              <textarea id={`${id}-prepared`} readOnly value={draft.text} rows={7} />
            </div>}
          </div>
        </form>
      </div>
    </section>
  );
}
