"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const navItems = [
  { href: "/#services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href.startsWith("/#") ? false : pathname === href || pathname.startsWith(`${href}/`);

  // Dark glass style at top of homepage, clean paper style elsewhere or when scrolled
  const isDarkNav = isHome && !scrolled;

  return (
    <header
      className={`fixed top-0 z-50 w-full border-b transition-all duration-300 ${
        isDarkNav
          ? "border-white/10 bg-black/40 text-white backdrop-blur-md"
          : scrolled
          ? "border-line bg-paper/90 shadow-card backdrop-blur-md text-ink"
          : "border-transparent bg-paper/80 backdrop-blur-sm text-ink"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-lg bg-ink font-mono text-sm font-bold text-delivered-bright transition-colors group-hover:bg-delivered group-hover:text-term">
            N
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className={`font-display text-sm font-semibold tracking-tight ${isDarkNav ? "text-white" : "text-ink"}`}>
              Nayeemur Rahman
            </span>
            <span className={`font-mono text-[10px] uppercase tracking-[0.18em] ${isDarkNav ? "text-white/60" : "text-muted"}`}>
              Email Deliverability
            </span>
          </span>
        </Link>

        <div className={`hidden items-center gap-2 rounded-full border px-3 py-1 lg:flex ${
          isDarkNav ? "border-white/15 bg-white/5 text-white/80" : "border-line bg-card text-muted"
        }`}>
          <span className="size-1.5 rounded-full bg-delivered-bright animate-pulse-dot" />
          <span className="font-mono text-[11px] tracking-wide">
            SPF · DKIM · DMARC · PASS
          </span>
        </div>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                isActive(item.href)
                  ? isDarkNav
                    ? "bg-white/20 text-white font-semibold"
                    : "bg-ink text-paper font-semibold"
                  : isDarkNav
                  ? "text-white/75 hover:bg-white/10 hover:text-white"
                  : "text-muted hover:bg-paper-subtle hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-delivered px-4 py-1.5 text-sm font-semibold text-term transition-colors hover:bg-delivered-bright"
          >
            Start a project
            <ArrowUpRight className="size-3.5" />
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className={`grid size-10 place-items-center rounded-lg border md:hidden ${
            isDarkNav ? "border-white/20 text-white" : "border-line text-ink"
          }`}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className={`border-t md:hidden ${isDarkNav ? "border-white/10 bg-black/95 text-white" : "border-line bg-paper text-ink"}`}>
          <nav className="mx-auto flex max-w-6xl flex-col px-4 py-4 sm:px-6" aria-label="Mobile">
            {navItems.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`animate-rise border-b py-3.5 font-display text-lg font-medium last:border-0 ${
                  isDarkNav ? "border-white/10 text-white" : "border-line/60 text-ink"
                }`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex items-center justify-center gap-2 rounded-xl bg-delivered px-4 py-3 font-semibold text-term"
            >
              Start a project
              <ArrowUpRight className="size-4" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
