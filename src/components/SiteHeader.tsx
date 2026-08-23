"use client";

import { useState } from "react";
import Link from "next/link";
import { site } from "@/data/site";
import { links } from "@/data/links";
import { ShieldCheck, ArrowUpRight, Menu, X, Mail } from "lucide-react";

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-line bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
        {/* Brand / Name & Status */}
        <div className="flex items-center gap-3">
          <Link href="/" className="group flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-lg bg-ink font-mono text-xs font-bold text-paper transition-transform group-hover:scale-105">
              NR
            </span>
            <div>
              <span className="block font-sans text-sm font-semibold tracking-tight text-ink">
                {site.name}
              </span>
              <span className="block font-mono text-[11px] text-muted">
                {site.role}
              </span>
            </div>
          </Link>
          
          <div className="hidden items-center gap-1.5 rounded-full border border-delivered/30 bg-delivered/10 px-2.5 py-0.5 md:flex">
            <span className="size-1.5 animate-pulse rounded-full bg-delivered" />
            <span className="font-mono text-[11px] font-medium text-delivered-ink">
              100% JSS • TOP RATED
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <a
            href="#services"
            className="font-mono text-xs text-muted transition-colors hover:text-ink"
          >
            // SERVICES
          </a>
          <a
            href="#dns-auth"
            className="font-mono text-xs text-muted transition-colors hover:text-ink"
          >
            // DNS & AUTH
          </a>
          <a
            href="#reviews"
            className="font-mono text-xs text-muted transition-colors hover:text-ink"
          >
            // REVIEWS
          </a>
          <a
            href="#experience"
            className="font-mono text-xs text-muted transition-colors hover:text-ink"
          >
            // BACKGROUND
          </a>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href={links.upwork}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-card px-3 py-1.5 font-mono text-xs font-medium text-ink shadow-2xs transition hover:border-muted"
          >
            <ShieldCheck className="size-3.5 text-delivered-ink" />
            Upwork Profile
            <ArrowUpRight className="size-3 text-muted" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 rounded-lg bg-delivered px-3.5 py-1.5 font-mono text-xs font-semibold text-white shadow-sm transition hover:bg-delivered-ink active:scale-95"
          >
            <Mail className="size-3.5" />
            Get in Touch
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex size-9 items-center justify-center rounded-lg border border-line md:hidden"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="size-4 text-ink" /> : <Menu className="size-4 text-ink" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-line bg-card px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3 font-mono text-xs">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-muted hover:text-ink"
            >
              // SERVICES
            </a>
            <a
              href="#dns-auth"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-muted hover:text-ink"
            >
              // DNS & AUTH
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-muted hover:text-ink"
            >
              // REVIEWS
            </a>
            <a
              href="#experience"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-muted hover:text-ink"
            >
              // BACKGROUND
            </a>
            <div className="mt-2 flex flex-col gap-2 pt-2 border-t border-line">
              <a
                href={links.upwork}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 rounded-lg border border-line bg-paper py-2 font-mono text-xs text-ink"
              >
                <ShieldCheck className="size-3.5 text-delivered-ink" />
                View Upwork Profile
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-1.5 rounded-lg bg-delivered py-2 font-mono text-xs font-semibold text-white"
              >
                <Mail className="size-3.5" />
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
