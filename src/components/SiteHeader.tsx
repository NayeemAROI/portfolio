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
  /**
   * On the home route the sticky header floats over the dark portrait cover
   * first, then over paper sections. It flips to the dark treatment while the
   * hero is in view and back to paper the moment it is not. The initial state
   * assumes the home route loads at the top (over the hero) so the first
   * paint is already correct; the observer corrects it for anchor loads and
   * restored scroll positions. Non-home routes always render paper.
   */
  const [heroVisible, setHeroVisible] = useState(pathname === "/");
  const dark = pathname === "/" && heroVisible && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on route change. Previous-path tracking during
  // render replaces an effect-driven setState (react-hooks/set-state-in-effect).
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (pathname !== "/") return;
    const hero = document.getElementById("portrait-hero");
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      // Flip slightly before the hero fully clears the 64px header.
      { rootMargin: "-64px 0px 0px 0px", threshold: 0 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) =>
    href.startsWith("/#") ? false : pathname === href || pathname.startsWith(`${href}/`);

  const surface = dark
    ? "border-transparent bg-transparent"
    : scrolled
      ? "border-line bg-paper/90 shadow-card backdrop-blur-md"
      : "border-transparent bg-paper/70 backdrop-blur-sm";

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${surface}`}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5">
          <span
            className={`grid size-8 place-items-center rounded-lg font-mono text-sm font-bold transition-colors group-hover:bg-delivered group-hover:text-term ${
              dark
                ? "border border-term-line bg-white/10 text-delivered-bright"
                : "bg-ink text-delivered-bright"
            }`}
          >
            N
          </span>
          <span className={`hidden flex-col leading-tight sm:flex ${dark ? "text-paper" : ""}`}>
            <span className="font-display text-sm font-semibold tracking-tight">
              Nayeemur Rahman
            </span>
            <span
              className={`font-mono text-[10px] uppercase tracking-[0.18em] ${
                dark ? "text-term-muted" : "text-muted"
              }`}
            >
              Email Deliverability
            </span>
          </span>
        </Link>

        <div
          className={`hidden items-center gap-2 rounded-full border px-3 py-1 lg:flex ${
            dark ? "border-term-line bg-white/5" : "border-line bg-card"
          }`}
        >
          <span className="size-1.5 rounded-full bg-delivered animate-pulse-dot" />
          <span
            className={`font-mono text-[11px] tracking-wide ${
              dark ? "text-term-muted" : "text-muted"
            }`}
          >
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
                  ? dark
                    ? "bg-white/15 text-paper"
                    : "bg-ink text-paper"
                  : dark
                    ? "text-term-muted hover:bg-white/10 hover:text-paper"
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
          className={`grid size-10 place-items-center rounded-lg border transition-colors md:hidden ${
            dark ? "border-white/20 text-paper" : "border-line"
          }`}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-paper md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-4 py-4 sm:px-6" aria-label="Mobile">
            {navItems.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="animate-rise border-b border-line/60 py-3.5 font-display text-lg font-medium last:border-0"
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
