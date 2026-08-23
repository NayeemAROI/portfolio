"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { links } from "@/data/links";

export function CopyEmail({ className = "" }: { className?: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(links.email);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${links.email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className={`inline-flex items-center gap-2 rounded-lg border border-line bg-card px-3.5 py-2 font-mono text-sm transition-colors hover:border-delivered hover:text-delivered-ink ${className}`}
      aria-live="polite"
    >
      {copied ? (
        <Check className="size-4 text-delivered" />
      ) : (
        <Copy className="size-4" />
      )}
      {copied ? "Copied" : links.email}
    </button>
  );
}
