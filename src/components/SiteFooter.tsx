import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { site } from "@/data/site";
import { links } from "@/data/links";

const pages = [
  { href: "/", label: "Home" },
  { href: "/#services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const elsewhere = [
  { href: links.upwork, label: "Upwork" },
  { href: links.linkedin, label: "LinkedIn" },
  { href: links.github, label: "GitHub" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-term-line bg-term text-term-ink">
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-xl font-semibold tracking-tight">
              {site.name}
            </p>
            <p className="mt-1 font-mono text-xs uppercase tracking-[0.18em] text-term-muted">
              {site.role}
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-term-muted">
              {site.tagline} Working worldwide from {site.location} ({site.timezone}).
            </p>
            <a
              href={`mailto:${links.email}`}
              className="mt-5 inline-block font-mono text-sm text-delivered-bright underline decoration-delivered/40 underline-offset-4 transition-colors hover:text-term-ink"
            >
              {links.email}
            </a>
          </div>

          <nav aria-label="Footer pages">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-term-muted">
              Pages
            </p>
            <ul className="mt-4 space-y-2.5">
              {pages.map((p) => (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    className="text-sm text-term-ink/80 transition-colors hover:text-delivered-bright"
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer profiles">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-term-muted">
              Elsewhere
            </p>
            <ul className="mt-4 space-y-2.5">
              {elsewhere.map((p) => (
                <li key={p.href}>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-term-ink/80 transition-colors hover:text-delivered-bright"
                  >
                    {p.label}
                    <ExternalLink className="size-3" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 overflow-x-auto rounded-lg border border-term-line bg-term-surface px-4 py-3">
          <code className="whitespace-nowrap font-mono text-[11px] text-term-muted">
            nayeem._proof&nbsp;&nbsp;IN&nbsp;&nbsp;TXT&nbsp;&nbsp;&quot;v=PROOF1; jss=100%; rating=5.0; jobs=7/7; response=0-4h; ships=always&quot;
          </code>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-term-line pt-6 text-xs text-term-muted sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {site.name} · {site.location}
          </p>
          <p className="font-mono">Next.js 15 · Tailwind v4 · zero tracking scripts</p>
        </div>
      </div>
    </footer>
  );
}
