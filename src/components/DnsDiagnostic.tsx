import { Reveal } from "@/components/Reveal";

/**
 * Demonstration records per PRODUCT.md: labeled as demo, using the RFC 2606
 * reserved domain example.com rather than a plausible real one.
 */
const records = [
  {
    type: "TXT",
    host: "@",
    value: "v=spf1 include:_spf.google.com ~all",
    status: "PASS",
  },
  {
    type: "TXT",
    host: "google._domainkey",
    value: "v=DKIM1; k=rsa; p=MIGfMA0GCSq...",
    status: "PASS",
  },
  {
    type: "TXT",
    host: "_dmarc",
    value: "v=DMARC1; p=reject; adkim=s; aspf=s",
    status: "PASS",
  },
  {
    type: "MX",
    host: "@",
    value: "1 smtp.google.com",
    status: "ROUTED",
  },
  {
    type: "CNAME",
    host: "track",
    value: "custom tracking domain",
    status: "ACTIVE",
  },
];

export function DnsDiagnostic() {
  return (
    <section className="scroll-mt-16 bg-term text-term-ink">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 md:py-28">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-delivered-bright">
            Diagnostic
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
            What a healthy domain looks like.
          </h2>
          <p className="mt-4 text-term-muted">
            Demonstration records for example.com. Every engagement starts with
            this audit: SPF, DKIM, DMARC alignment, MX routing, blacklist scan,
            postmaster reputation.
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-12">
          <div className="overflow-hidden rounded-2xl border border-term-line bg-term-surface shadow-term">
            <div className="flex items-center gap-2 border-b border-term-line px-4 py-3 font-mono text-xs text-term-muted">
              <span className="text-delivered-bright">$</span>
              dig TXT +short example.com
              <span className="animate-blink inline-block h-3.5 w-[7px] bg-term-muted/70" />
              <span className="ml-auto rounded-md border border-term-line px-2 py-0.5 text-[10px] uppercase tracking-wider">
                demo
              </span>
            </div>

            <div className="hidden grid-cols-[64px_150px_1fr_88px] gap-3 border-b border-term-line px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-term-muted sm:grid">
              <span>Type</span>
              <span>Host</span>
              <span>Value</span>
              <span className="text-right">Status</span>
            </div>

            <ul>
              {records.map((record) => (
                <li
                  key={`${record.type}-${record.host}`}
                  className="grid grid-cols-[56px_1fr_auto] items-center gap-3 border-b border-term-line px-4 py-3 font-mono text-xs last:border-0 sm:grid-cols-[64px_150px_1fr_88px]"
                >
                  <span className="text-term-ink">{record.type}</span>
                  <span className="hidden truncate text-term-muted sm:block">
                    {record.host}
                  </span>
                  <span className="truncate text-term-muted">{record.value}</span>
                  <span className="justify-self-end rounded border border-delivered/30 bg-delivered/15 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-delivered-bright">
                    {record.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-4 font-mono text-[11px] text-term-muted">
            # if your records do not look like this, that is usually the whole problem.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
