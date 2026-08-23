"use client";

import { useState } from "react";
import { Section } from "./Section";
import { Check, Copy, Shield, Terminal, ArrowRight } from "lucide-react";

interface RecordItem {
  type: string;
  host: string;
  value: string;
  purpose: string;
  status: "OK" | "PASS" | "VERIFIED";
}

const sampleRecords: RecordItem[] = [
  {
    type: "TXT",
    host: "@",
    value: "v=spf1 include:_spf.google.com ~all",
    purpose: "Authorizes designated servers to send email on behalf of your domain.",
    status: "PASS",
  },
  {
    type: "TXT",
    host: "google._domainkey",
    value: "v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0...",
    purpose: "Signs outgoing messages cryptographically to prove the email wasn't altered in transit.",
    status: "PASS",
  },
  {
    type: "TXT",
    host: "_dmarc",
    value: "v=DMARC1; p=reject; rua=mailto:dmarc-reports@domain.com; pct=100; sp=reject",
    purpose: "Instructs receiving inboxes (Gmail/Outlook) to reject unauthenticated spoofing attempts.",
    status: "VERIFIED",
  },
  {
    type: "MX",
    host: "@",
    value: "1 smtp.google.com",
    purpose: "Routes incoming business mail to your secure Google Workspace / Microsoft 365 inbox.",
    status: "OK",
  },
  {
    type: "CNAME",
    host: "track.outreach",
    value: "custom.instantly.ai",
    purpose: "Custom tracking domain (CTD) isolates open/click tracking to protect domain reputation.",
    status: "OK",
  },
];

export function DnsDiagnostic() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (val: string, idx: number) => {
    navigator.clipboard.writeText(val);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <Section
      id="dns-auth"
      dark
      eyebrow="DNS-02 // INFRASTRUCTURE & AUTHENTICATION"
      title="The Anatomy of Inbox Delivery"
      description="Every message you send is evaluated by receiving mail servers in milliseconds. Here is how I configure your DNS layer for 100% authentication alignment."
    >
      <div className="overflow-hidden rounded-2xl border border-term-line bg-term-surface/70 shadow-2xl">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-term-line bg-term-surface px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <Terminal className="size-4 text-delivered-bright" />
            <span className="font-mono text-xs text-term-ink">
              DNS_AUTHENTICATION_TABLE // BIND_CONFIG
            </span>
          </div>
          <span className="font-mono text-[11px] text-delivered-bright">
            STATUS: 100% ALIGNED
          </span>
        </div>

        {/* Table representation */}
        <div className="overflow-x-auto p-4 sm:p-6 font-mono text-xs">
          <div className="min-w-[640px] space-y-3">
            {/* Header row */}
            <div className="grid grid-cols-12 gap-3 pb-2 text-[10px] uppercase tracking-wider text-term-muted border-b border-term-line">
              <div className="col-span-2">Record Type</div>
              <div className="col-span-3">Host / Name</div>
              <div className="col-span-5">Value / Payload</div>
              <div className="col-span-2 text-right">Verification</div>
            </div>

            {/* Content rows */}
            {sampleRecords.map((rec, i) => (
              <div
                key={i}
                className="group grid grid-cols-12 items-center gap-3 rounded-lg border border-term-line/50 bg-term/60 p-3 transition-colors hover:border-term-line hover:bg-term"
              >
                <div className="col-span-2">
                  <span className="inline-block rounded bg-delivered/15 px-2 py-0.5 font-bold text-delivered-bright">
                    {rec.type}
                  </span>
                </div>
                <div className="col-span-3 text-term-ink font-medium truncate">
                  {rec.host}
                </div>
                <div className="col-span-5 text-term-muted truncate">
                  <span className="text-term-ink/90">{rec.value}</span>
                </div>
                <div className="col-span-2 flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleCopy(rec.value, i)}
                    className="p-1 text-term-muted hover:text-term-ink transition"
                    title="Copy Record"
                  >
                    {copiedIndex === i ? (
                      <Check className="size-3.5 text-delivered-bright" />
                    ) : (
                      <Copy className="size-3.5" />
                    )}
                  </button>
                  <span className="rounded border border-delivered/30 bg-delivered/10 px-1.5 py-0.5 text-[10px] font-bold text-delivered-bright">
                    {rec.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Diagnostic Note */}
          <div className="mt-6 rounded-xl border border-term-line/80 bg-term p-4 text-xs text-term-muted leading-relaxed">
            <div className="flex items-center gap-2 font-bold text-term-ink">
              <Shield className="size-4 text-delivered-bright" />
              <span>Deliverability Guarantee</span>
            </div>
            <p className="mt-1.5">
              Improperly formatted SPF strings, missing DKIM selectors, or unaligned DMARC policies are the #1 reason cold campaigns fail. I audit your domain registrar (Cloudflare, GoDaddy, Namecheap) and configure clean records with zero propagation downtime.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
