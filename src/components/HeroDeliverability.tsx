"use client";

import { useState } from "react";
import { site } from "@/data/site";
import { links } from "@/data/links";
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Terminal,
  Mail,
  Copy,
  Check,
  Sparkles,
  Inbox,
} from "lucide-react";

export function HeroDeliverability() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"auth" | "raw">("auth");

  const copyHeader = () => {
    navigator.clipboard.writeText(
      "Authentication-Results: mx.google.com; dkim=pass header.i=@outreach.domain.com; spf=pass (google.com: domain of nayeem@outreach.domain.com designates 209.85.220.41); dmarc=pass (p=REJECT) header.from=outreach.domain.com"
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden border-b border-line bg-paper pt-12 pb-16 md:pt-20 md:pb-24">
      {/* Background subtle grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(var(--color-ink) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8 lg:items-center">
          
          {/* Left Column: Core Positioning & Value Proposition */}
          <div className="lg:col-span-7">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3.5 py-1.5 shadow-2xs">
              <span className="flex size-2 rounded-full bg-delivered animate-pulse" />
              <span className="font-mono text-xs font-medium text-ink">
                Available for New Client Projects
              </span>
              <span className="text-line">•</span>
              <span className="font-mono text-xs text-muted">0–4h Response</span>
            </div>

            {/* Main Headline */}
            <h1 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl md:text-5xl lg:leading-[1.15]">
              Cold email that lands in the{" "}
              <span className="relative whitespace-nowrap text-delivered-ink underline decoration-delivered/40 decoration-wavy underline-offset-4">
                Primary Inbox
              </span>
              , not Spam.
            </h1>

            {/* Sub-headline / Positioning Statement */}
            <p className="mt-5 text-lg leading-relaxed text-muted sm:text-xl">
              {site.headline}
            </p>

            <p className="mt-3 text-sm leading-relaxed text-ink/80">
              I configure, authenticate, and rescue outbound email infrastructure. From full SPF/DKIM/DMARC alignment and Google Workspace/Microsoft 365 migrations to scalable Instantly/Apollo campaign architecture.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-delivered px-5 py-3 font-mono text-xs font-semibold text-white shadow-sm transition hover:bg-delivered-ink active:scale-95"
              >
                <Mail className="size-4" />
                Get Deliverability Help
                <ArrowRight className="size-4" />
              </a>

              <a
                href={links.upwork}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-card px-5 py-3 font-mono text-xs font-medium text-ink shadow-2xs transition hover:border-muted hover:bg-paper active:scale-95"
              >
                <ShieldCheck className="size-4 text-delivered-ink" />
                Hire on Upwork (100% JSS)
              </a>
            </div>

            {/* Fast Micro-Proofs */}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line/80 pt-6 font-mono text-xs text-muted">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-delivered-ink" />
                <span>100% Job Success Score</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-delivered-ink" />
                <span>5.0 ★ Client Rating</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-delivered-ink" />
                <span>ID & Identity Verified</span>
              </div>
            </div>
          </div>

          {/* Right Column: Signature Deliverability Diagnostic Card */}
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-2xl border border-term-line bg-term shadow-xl">
              
              {/* Terminal Window Header */}
              <div className="flex items-center justify-between border-b border-term-line bg-term-surface px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="size-2.5 rounded-full bg-spam/70" />
                    <span className="size-2.5 rounded-full bg-warm/70" />
                    <span className="size-2.5 rounded-full bg-delivered/70" />
                  </div>
                  <span className="font-mono text-[11px] text-term-muted">
                    diagnostic://auth-results.mx
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab(activeTab === "auth" ? "raw" : "auth")}
                    className="font-mono text-[10px] text-term-muted hover:text-term-ink"
                  >
                    [{activeTab.toUpperCase()}]
                  </button>
                  <button
                    onClick={copyHeader}
                    className="text-term-muted transition hover:text-term-ink"
                    title="Copy Header Record"
                  >
                    {copied ? (
                      <Check className="size-3.5 text-delivered-bright" />
                    ) : (
                      <Copy className="size-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Status Header Badge */}
              <div className="flex items-center justify-between border-b border-term-line/60 bg-term/90 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="flex size-2 rounded-full bg-delivered-bright animate-ping" />
                  <span className="font-mono text-xs font-bold text-delivered-bright">
                    AUTHENTICATION: PASS
                  </span>
                </div>
                <div className="flex items-center gap-1.5 rounded bg-delivered/20 px-2 py-0.5 font-mono text-[10px] text-delivered-bright">
                  <Inbox className="size-3" />
                  PRIMARY INBOX
                </div>
              </div>

              {/* Diagnostic Rows */}
              <div className="p-4 font-mono text-xs">
                {activeTab === "auth" ? (
                  <div className="space-y-2.5">
                    {/* SPF Row */}
                    <div className="rounded-lg border border-term-line bg-term-surface/50 p-2.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-delivered-bright">SPF // PASS</span>
                        <span className="text-[10px] text-term-muted">ip4:209.85.220.41</span>
                      </div>
                      <p className="mt-1 text-[11px] text-term-muted leading-relaxed">
                        Designated Google Workspace server authorized for domain sending.
                      </p>
                    </div>

                    {/* DKIM Row */}
                    <div className="rounded-lg border border-term-line bg-term-surface/50 p-2.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-delivered-bright">DKIM // 2048-BIT PASS</span>
                        <span className="text-[10px] text-term-muted">s=google d=outreach</span>
                      </div>
                      <p className="mt-1 text-[11px] text-term-muted leading-relaxed">
                        Cryptographic signature verified with zero header tampering.
                      </p>
                    </div>

                    {/* DMARC Row */}
                    <div className="rounded-lg border border-term-line bg-term-surface/50 p-2.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-delivered-bright">DMARC // ALIGNED (p=reject)</span>
                        <span className="text-[10px] text-term-muted">100% Policy</span>
                      </div>
                      <p className="mt-1 text-[11px] text-term-muted leading-relaxed">
                        Strict policy prevents domain spoofing & protects sender domain.
                      </p>
                    </div>

                    {/* MX & Postmaster */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div className="rounded-lg border border-term-line bg-term-surface/50 p-2">
                        <span className="text-[10px] text-term-muted block">MX ROUTING</span>
                        <span className="text-[11px] font-bold text-term-ink">0 Google MX</span>
                      </div>
                      <div className="rounded-lg border border-term-line bg-term-surface/50 p-2">
                        <span className="text-[10px] text-term-muted block">POSTMASTER</span>
                        <span className="text-[11px] font-bold text-delivered-bright">High Rep</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded bg-term-surface p-3 text-[11px] leading-relaxed text-term-muted font-mono whitespace-pre-wrap">
                    {`Authentication-Results: mx.google.com;
  dkim=pass header.i=@outreach.domain.com header.s=google;
  spf=pass (google.com: domain of nayeem@outreach.domain.com designates 209.85.220.41 as permitted sender);
  dmarc=pass (p=REJECT sp=REJECT dis=none) header.from=outreach.domain.com;
  Received-SPF: pass client-ip=209.85.220.41;
  X-Google-Smtp-Source: AUTHENTICATED/VERIFIED;`}
                  </div>
                )}

                <div className="mt-4 flex items-center justify-between border-t border-term-line/80 pt-3 text-[11px] text-term-muted">
                  <span>Audit Engine: NayeemAROI</span>
                  <span className="text-delivered-bright">100% Delivery Confidence</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
