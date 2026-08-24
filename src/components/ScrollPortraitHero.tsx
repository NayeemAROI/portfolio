"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { site } from "@/data/site";
import { links } from "@/data/links";
import { ArrowRight, ShieldCheck, Mail, ArrowDown } from "lucide-react";

const FRAME_COUNT = 180;
const MAX_ANGLE = 220;
const CACHE_LIMIT_DESKTOP = 28;
const CACHE_LIMIT_MOBILE = 18;

const clamp = (val: number, min: number, max: number) => Math.min(max, Math.max(min, val));
const pad = (val: number) => String(val).padStart(3, "0");

export function ScrollPortraitHero() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [isReady, setIsReady] = useState(false);
  const [loadPercent, setLoadPercent] = useState(0);
  const [angle, setAngle] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [loadStatusText, setLoadStatusText] = useState("Loading frames");
  const [statusComplete, setStatusComplete] = useState(false);

  useEffect(() => {
    const scene = sceneRef.current;
    const canvas = canvasRef.current;
    if (!scene || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });
    if (!ctx) return;

    const mobileQuery = window.matchMedia("(max-width: 700px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let assetBase = mobileQuery.matches
      ? "/assets/frames-mobile"
      : "/assets/frames-desktop";
    
    let targetFrame = 0;
    let displayedFrame = -1;
    let renderRequest = 0;
    let warmedFrames = 0;
    let warmingStarted = false;
    let destroyed = false;

    const frameCache = new Map<number, ImageBitmap | HTMLImageElement>();
    const frameLoads = new Map<number, Promise<ImageBitmap | HTMLImageElement>>();

    const frameUrl = (index: number) => `${assetBase}/frame_${pad(index + 1)}.webp`;
    const cacheLimit = () => (mobileQuery.matches ? CACHE_LIMIT_MOBILE : CACHE_LIMIT_DESKTOP);

    function touchCache(index: number, image: ImageBitmap | HTMLImageElement) {
      frameCache.delete(index);
      frameCache.set(index, image);
    }

    function trimCache() {
      const protectedFrames = new Set([
        targetFrame,
        clamp(targetFrame - 1, 0, FRAME_COUNT - 1),
        clamp(targetFrame + 1, 0, FRAME_COUNT - 1),
      ]);

      while (frameCache.size > cacheLimit()) {
        const oldest = frameCache.keys().next().value;
        if (oldest === undefined) break;
        if (protectedFrames.has(oldest)) {
          const img = frameCache.get(oldest)!;
          frameCache.delete(oldest);
          frameCache.set(oldest, img);
          continue;
        }
        const img = frameCache.get(oldest);
        if (img && "close" in img && typeof img.close === "function") {
          img.close();
        }
        frameCache.delete(oldest);
      }
    }

    async function decodeBlob(blob: Blob): Promise<ImageBitmap | HTMLImageElement> {
      if ("createImageBitmap" in window) {
        return createImageBitmap(blob);
      }
      return new Promise((resolve, reject) => {
        const objectUrl = URL.createObjectURL(blob);
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          URL.revokeObjectURL(objectUrl);
          resolve(img);
        };
        img.onerror = (e) => {
          URL.revokeObjectURL(objectUrl);
          reject(e);
        };
        img.src = objectUrl;
      });
    }

    async function loadFrame(index: number): Promise<ImageBitmap | HTMLImageElement> {
      const safeIndex = clamp(index, 0, FRAME_COUNT - 1);
      if (frameCache.has(safeIndex)) {
        const cached = frameCache.get(safeIndex)!;
        touchCache(safeIndex, cached);
        return cached;
      }
      if (frameLoads.has(safeIndex)) return frameLoads.get(safeIndex)!;

      const promise = fetch(frameUrl(safeIndex), { cache: "force-cache" })
        .then((res) => {
          if (!res.ok) throw new Error(`Frame ${safeIndex + 1} failed: ${res.status}`);
          return res.blob();
        })
        .then(decodeBlob)
        .then((img) => {
          frameLoads.delete(safeIndex);
          if (!destroyed) {
            touchCache(safeIndex, img);
            trimCache();
          }
          return img;
        })
        .catch((err) => {
          frameLoads.delete(safeIndex);
          throw err;
        });

      frameLoads.set(safeIndex, promise);
      return promise;
    }

    function fitCanvas() {
      if (!canvas) return;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.round(canvas.clientWidth * ratio));
      const height = Math.max(1, Math.round(canvas.clientHeight * ratio));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    }

    function drawImage(image: ImageBitmap | HTMLImageElement) {
      if (!canvas || !ctx || destroyed) return;
      fitCanvas();
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imageWidth = image.width || ("naturalWidth" in image ? image.naturalWidth : canvasWidth);
      const imageHeight = image.height || ("naturalHeight" in image ? image.naturalHeight : canvasHeight);
      
      const scale = Math.max(canvasWidth / imageWidth, canvasHeight / imageHeight);
      const drawWidth = imageWidth * scale;
      const drawHeight = imageHeight * scale;
      const focalX = mobileQuery.matches ? 0.43 : 0.5;
      const x = (canvasWidth - drawWidth) * focalX;
      const y = 0;

      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(image, x, y, drawWidth, drawHeight);
    }

    function nearestCachedFrame(index: number): number | null {
      if (frameCache.has(index)) return index;
      for (let distance = 1; distance < FRAME_COUNT; distance++) {
        const lower = index - distance;
        const upper = index + distance;
        if (lower >= 0 && frameCache.has(lower)) return lower;
        if (upper < FRAME_COUNT && frameCache.has(upper)) return upper;
      }
      return null;
    }

    async function renderTarget() {
      renderRequest = 0;
      if (destroyed) return;
      const requested = targetFrame;
      const nearby = nearestCachedFrame(requested);
      if (nearby !== null && displayedFrame !== nearby) {
        drawImage(frameCache.get(nearby)!);
        displayedFrame = nearby;
      }

      try {
        const img = await loadFrame(requested);
        if (targetFrame === requested && !destroyed) {
          drawImage(img);
          displayedFrame = requested;
        }
      } catch (err) {
        console.error("Frame render error", err);
      }
    }

    function requestRender() {
      if (!renderRequest) renderRequest = requestAnimationFrame(renderTarget);
    }

    function preloadAround(index: number) {
      const offsets = [1, -1, 2, -2, 3, -3, 4, -4];
      offsets.forEach((offset) => {
        const candidate = index + offset;
        if (candidate >= 0 && candidate < FRAME_COUNT) {
          loadFrame(candidate).catch(() => {});
        }
      });
    }

    function getProgress() {
      if (!scene) return 0;
      const rect = scene.getBoundingClientRect();
      const scrollDist = Math.max(1, scene.offsetHeight - window.innerHeight);
      return clamp(-rect.top / scrollDist, 0, 1);
    }

    function updateFromScroll() {
      if (reducedMotion.matches) return;
      const progress = getProgress();
      targetFrame = Math.round(progress * (FRAME_COUNT - 1));
      
      setScrollProgress(progress);
      setAngle(Math.round(progress * MAX_ANGLE));
      setCurrentFrame(targetFrame + 1);

      requestRender();
      preloadAround(targetFrame);
    }

    async function warmCompressedCache() {
      if (warmingStarted || reducedMotion.matches) return;
      warmingStarted = true;

      let cursor = 0;
      const workers = Math.min(4, navigator.hardwareConcurrency || 4);

      async function worker() {
        while (cursor < FRAME_COUNT && !destroyed) {
          const index = cursor++;
          try {
            const res = await fetch(frameUrl(index), { cache: "force-cache" });
            if (res.ok) await res.blob();
          } catch {
            // Low-priority background warmup
          }
          warmedFrames++;
          const pct = Math.round((warmedFrames / FRAME_COUNT) * 100);
          setLoadPercent(pct);
          setLoadStatusText(`Frames ${pct}%`);
          if (warmedFrames >= FRAME_COUNT) {
            setLoadStatusText("Frames ready");
            setTimeout(() => setStatusComplete(true), 600);
          }
        }
      }

      await Promise.all(Array.from({ length: workers }, () => worker()));
    }

    async function initialize() {
      try {
        const first = await loadFrame(0);
        if (destroyed) return;
        drawImage(first);
        displayedFrame = 0;
        setIsReady(true);
        preloadAround(0);
        warmCompressedCache();
        updateFromScroll();
      } catch (err) {
        console.error("Initialization failed", err);
        setLoadStatusText("Load error");
      }
    }

    function resetForBreakpoint() {
      const nextBase = mobileQuery.matches
        ? "/assets/frames-mobile"
        : "/assets/frames-desktop";
      if (nextBase === assetBase) {
        const img = frameCache.get(displayedFrame);
        if (img) drawImage(img);
        return;
      }

      frameCache.forEach((img) => {
        if (img && "close" in img && typeof img.close === "function") {
          img.close();
        }
      });
      frameCache.clear();
      frameLoads.clear();
      assetBase = nextBase;
      displayedFrame = -1;
      warmedFrames = 0;
      warmingStarted = false;
      initialize();
    }

    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resetForBreakpoint, 120);
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("scroll", updateFromScroll, { passive: true });
    mobileQuery.addEventListener("change", resetForBreakpoint);

    initialize();

    return () => {
      destroyed = true;
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", updateFromScroll);
      mobileQuery.removeEventListener("change", resetForBreakpoint);
      if (renderRequest) cancelAnimationFrame(renderRequest);
      frameCache.forEach((img) => {
        if (img && "close" in img && typeof img.close === "function") {
          img.close();
        }
      });
      frameCache.clear();
    };
  }, []);

  return (
    <section
      ref={sceneRef}
      id="portrait-hero"
      aria-label="Interactive 220-degree portrait scroll sequence"
      className="relative h-[480vh] w-full bg-term text-term-ink"
    >
      {/* Sticky Stage Container */}
      <div className="sticky top-0 h-screen h-[100svh] w-full overflow-hidden bg-term isolation-auto">
        
        {/* Full-screen Canvas */}
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="Portrait of Nayeemur Rahman changing angle as you scroll"
          className="block size-full bg-black object-cover"
        />

        {/* Subtle Vignette & Gradient Overlays */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-1 bg-gradient-to-b from-black/40 via-transparent to-black/60 md:bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.6)_100%)]"
        />

        {/* Loading Overlay */}
        {!isReady && (
          <div
            role="status"
            aria-live="polite"
            className="absolute inset-0 z-20 grid place-items-center bg-black/90 p-4 transition-opacity duration-300"
          >
            <div className="w-64 text-center font-mono">
              <p className="text-xs tracking-widest text-term-muted uppercase">
                Calibrating Portrait Sequence
              </p>
              <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-term-line">
                <div
                  className="h-full bg-delivered-bright transition-all duration-200"
                  style={{ width: `${Math.max(8, loadPercent)}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* HUD Interactive Overlay Layer */}
        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-4 sm:p-8 md:p-12">
          
          {/* Top Bar HUD */}
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-delivered-bright tracking-widest uppercase">
                  NR // DELIVERABILITY SYSTEM
                </span>
                <span className="rounded bg-delivered/15 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-delivered-bright">
                  220° SCROLL
                </span>
              </div>
              <p className="font-mono text-[11px] text-term-muted">
                {site.role} • {site.location}
              </p>
            </div>

            <div className="text-right">
              <div className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-term-line bg-term-surface/80 px-3 py-1 font-mono text-[11px] text-term-ink">
                <ShieldCheck className="size-3.5 text-delivered-bright" />
                <span>100% JSS • TOP RATED</span>
              </div>
              <p
                className={`mt-1 font-mono text-[10px] text-term-muted transition-opacity duration-300 ${
                  statusComplete ? "opacity-0" : "opacity-100"
                }`}
              >
                {loadStatusText}
              </p>
            </div>
          </div>

          {/* Center / Lower Left Copy & Primary CTAs */}
          <div className="pointer-events-auto max-w-xl space-y-4">
            <h1 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl lg:leading-[1.1]">
              Cold email that lands in the{" "}
              <span className="text-delivered-bright">primary inbox</span>, not spam.
            </h1>

            <p className="text-sm sm:text-base leading-relaxed text-term-muted max-w-lg">
              {site.bio}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-delivered px-5 py-2.5 font-mono text-xs font-semibold text-term shadow-md transition-all hover:bg-delivered-bright active:scale-95"
              >
                <Mail className="size-4" />
                Fix My Deliverability
                <ArrowRight className="size-3.5" />
              </Link>

              <a
                href={links.upwork}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-term-line bg-term-surface/90 px-4 py-2.5 font-mono text-xs font-medium text-term-ink transition-colors hover:border-term-muted hover:bg-term active:scale-95"
              >
                <ShieldCheck className="size-4 text-delivered-bright" />
                Upwork Profile
              </a>
            </div>

            <div className="flex items-center gap-2 pt-2 text-[11px] font-mono text-term-muted">
              <ArrowDown className="size-3.5 animate-bounce text-delivered-bright" />
              <span>Scroll down to rotate perspective ({angle}° / {MAX_ANGLE}°)</span>
            </div>
          </div>

          {/* Bottom Right Dial & Progress Meter */}
          <div className="flex items-end justify-between border-t border-term-line/60 pt-4">
            <div className="font-mono text-[11px] text-term-muted">
              <span>{site.stats.rating} ★ Rating</span>
              <span className="mx-2">•</span>
              <span>7/7 Projects Delivered</span>
            </div>

            <div className="flex items-center gap-3 font-mono">
              <div className="text-right">
                <span className="block text-sm font-bold text-delivered-bright tabular-nums">
                  {angle}°
                </span>
                <span className="block text-[10px] text-term-muted tabular-nums">
                  {pad(currentFrame)} / {FRAME_COUNT}
                </span>
              </div>

              {/* Vertical Fill Meter */}
              <div className="relative h-10 w-1.5 overflow-hidden rounded-full bg-term-line">
                <div
                  className="w-full bg-delivered-bright transition-transform duration-75 origin-top"
                  style={{ transform: `scaleY(${scrollProgress})` }}
                />
              </div>
            </div>
          </div>

        </div>

        {/* Noscript static fallback */}
        <noscript>
          <img
            src="/assets/frames-desktop/frame_001.webp"
            alt="Portrait of Nayeemur Rahman"
            className="size-full object-cover"
          />
        </noscript>
      </div>
    </section>
  );
}
