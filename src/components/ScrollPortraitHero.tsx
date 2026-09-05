"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowRight, ShieldCheck } from "lucide-react";
import { site } from "@/data/site";
import { links } from "@/data/links";

const FRAME_COUNT = 180;
const pad = (index: number) => String(index + 1).padStart(3, "0");

/** The real portrait and hiring path work before animation or JavaScript. */
export function ScrollPortraitHero() {
  const sceneRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const scene = sceneRef.current;
    const canvas = canvasRef.current;
    if (!scene || !canvas) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const roomy = window.matchMedia("(min-width: 768px) and (min-height: 760px)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    const lightConnection = connection?.saveData || /^(slow-)?2g$/.test(connection?.effectiveType ?? "");
    const base = window.location.pathname.startsWith("/portfolio") ? "/portfolio" : "";
    const cache = new Map<number, HTMLImageElement>();
    let disposed = false;
    let active = false;
    let target = 0;
    let pending: HTMLImageElement | null = null;
    let request = 0;
    let context: CanvasRenderingContext2D | null = null;

    function cancelPending() {
      if (pending) {
        pending.onload = null;
        pending.onerror = null;
        pending = null;
      }
    }

    function draw(image: HTMLImageElement) {
      if (!canvas || !context || disposed || !active) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const height = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== width) canvas.width = width;
      if (canvas.height !== height) canvas.height = height;
      const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
      context.drawImage(image, (width - image.naturalWidth * scale) / 2, 0, image.naturalWidth * scale, image.naturalHeight * scale);
      canvas.style.opacity = "1";
    }

    function fallback() {
      active = false;
      cancelPending();
      cache.clear();
      if (canvas) canvas.style.opacity = "0";
      if (!disposed) setAnimated(false);
    }

    function renderTarget() {
      if (!active || disposed) return;
      const cached = cache.get(target);
      if (cached) {
        cache.delete(target);
        cache.set(target, cached);
        draw(cached);
        return;
      }
      // ponytail: one in-flight image and 20 decoded frames, no full-sequence prefetch.
      // Upgrade only if measured fast-scroll latency justifies a wider queue.
      if (pending) return;
      const index = target;
      const image = new Image();
      pending = image;
      image.decoding = "async";
      image.onload = () => {
        if (disposed || !active || pending !== image) return;
        pending = null;
        cache.set(index, image);
        while (cache.size > 20) cache.delete(cache.keys().next().value!);
        if (index === target) draw(image);
        else renderTarget();
      };
      image.onerror = fallback;
      image.src = `${base}/assets/frames-desktop/frame_${pad(index)}.webp`;
    }

    function update() {
      request = 0;
      if (!scene || !active || document.hidden) return;
      const rect = scene.getBoundingClientRect();
      if (rect.bottom <= 64 || rect.top >= window.innerHeight) return;
      const distance = Math.max(1, scene.offsetHeight - (window.innerHeight - 64));
      const progress = Math.min(1, Math.max(0, (64 - rect.top) / distance));
      target = Math.round(progress * (FRAME_COUNT - 1));
      renderTarget();
    }

    function schedule() {
      if (!request && active) request = requestAnimationFrame(update);
    }

    function configure() {
      if (disposed) return;
      fallback();
      if (reduced.matches || !roomy.matches || lightConnection) return;
      context = canvas!.getContext("2d");
      if (!context) return;
      active = true;
      setAnimated(true);
      // Wait for React to apply the enhanced scene height before measuring it.
      schedule();
    }

    const startup = requestAnimationFrame(configure);
    reduced.addEventListener("change", configure);
    roomy.addEventListener("change", configure);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    document.addEventListener("visibilitychange", schedule);
    return () => {
      disposed = true;
      active = false;
      cancelAnimationFrame(startup);
      cancelAnimationFrame(request);
      cancelPending();
      cache.clear();
      reduced.removeEventListener("change", configure);
      roomy.removeEventListener("change", configure);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("visibilitychange", schedule);
    };
  }, []);

  return (
    <section ref={sceneRef} id="portrait-hero" className="portrait-cover" data-animated={animated ? "true" : undefined} aria-label="Portrait of Nayeemur Rahman">
      <div className="portrait-stage">
        <picture className="portrait-image">
          <source media="(max-width: 700px)" srcSet="assets/frames-mobile/frame_001.webp" />
          {/* A plain image is intentional: the static export and no-JS path must work. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="assets/frames-desktop/frame_001.webp" alt="Black and white portrait of Nayeemur Rahman" fetchPriority="high" width={1920} height={1080} />
        </picture>
        <canvas ref={canvasRef} aria-hidden="true" className="portrait-canvas" />
        <div className="portrait-shade" aria-hidden="true" />
        <div className="portrait-content">
          <div className="portrait-presence">
            <p>{site.availability}</p>
            <p>{site.location} · {site.timezone}</p>
          </div>
          <div className="portrait-copy">
            <h1>Cold email that lands in the <span>primary inbox</span>, not spam.</h1>
            <p className="portrait-bio">{site.bio}</p>
            <div className="portrait-actions">
              <Link href="/contact" className="portrait-primary">Fix my deliverability <ArrowRight size={18} aria-hidden="true" /></Link>
              <a href={links.upwork} target="_blank" rel="noopener noreferrer" className="portrait-secondary"><ShieldCheck size={18} aria-hidden="true" /> Upwork profile</a>
            </div>
            <a href="#services" className="portrait-skip"><ArrowDown size={18} aria-hidden="true" /> Explore services</a>
          </div>
        </div>
      </div>
    </section>
  );
}
