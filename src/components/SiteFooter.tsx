"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { links } from "@/data/links";
import { ShieldCheck, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";

export function SiteFooter() {
  const [dhakaTime, setDhakaTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Dhaka",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setDhakaTime(new Intl.DateTimeFormat("en-US", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="border-t border-line bg-card py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-8 border-b border-line/60">
          
          {/* Brand & Location */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded bg-ink font-mono text-xs font-bold text-paper">
                NR
              </span>
              <span className="font-sans text-base font-bold text-ink">
                {site.name}
              </span>
            </div>
            <p className="font-mono text-xs text-muted max-w-md">
              {site.role} • {site.location}
            </p>
            {dhakaTime && (
              <div className="flex items-center gap-2 font-mono text-[11px] text-muted">
                <span className="size-1.5 rounded-full bg-delivered animate-pulse" />
                <span>Local Time: {dhakaTime} (Dhaka GMT+6)</span>
              </div>
            )}
          </div>

          {/* Direct Profile Links */}
          <div className="flex flex-wrap gap-4 font-mono text-xs">
            <a
              href={links.upwork}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-muted hover:text-delivered-ink transition"
            >
              <ShieldCheck className="size-3.5" />
              Upwork
              <ArrowUpRight className="size-3" />
            </a>

            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-muted hover:text-ink transition"
            >
              <Github className="size-3.5" />
              GitHub
              <ArrowUpRight className="size-3" />
            </a>

            <a
              href={links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-muted hover:text-ink transition"
            >
              <Linkedin className="size-3.5" />
              LinkedIn
              <ArrowUpRight className="size-3" />
            </a>

            <a
              href={`mailto:${links.email}`}
              className="inline-flex items-center gap-1.5 text-muted hover:text-ink transition"
            >
              <Mail className="size-3.5" />
              Email
            </a>
          </div>

        </div>

        {/* Bottom Colophon */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-muted">
          <span>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </span>
          <span className="text-center sm:text-right">
            Delivered System • Next.js 15 • 100% Verified Upwork Proof
          </span>
        </div>
      </div>
    </footer>
  );
}
