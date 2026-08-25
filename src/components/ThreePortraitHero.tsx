"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { site } from "@/data/site";
import { links } from "@/data/links";
import { ArrowRight, ShieldCheck, Mail, Sparkles } from "lucide-react";
import * as THREE from "three";

const FRAME_COUNT = 240;
const CENTER_FRAME = 120; // Frame 120 is direct front-facing
const CACHE_LIMIT_DESKTOP = 36;
const CACHE_LIMIT_MOBILE = 20;

const clamp = (val: number, min: number, max: number) => Math.min(max, Math.max(min, val));
const pad = (val: number) => String(val).padStart(3, "0");

export function ThreePortraitHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isReady, setIsReady] = useState(false);
  const [loadPercent, setLoadPercent] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(CENTER_FRAME);
  const [angleDeg, setAngleDeg] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let destroyed = false;
    const mobileQuery = window.matchMedia("(max-width: 700px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let assetBase = mobileQuery.matches
      ? "/assets/frames-mobile"
      : "/assets/frames-desktop";

    const frameUrl = (index: number) => `${assetBase}/frame_${pad(index + 1)}.webp`;
    const cacheLimit = () => (mobileQuery.matches ? CACHE_LIMIT_MOBILE : CACHE_LIMIT_DESKTOP);

    // --- Three.js Setup ---
    const scene = new THREE.Scene();
    
    // Perspective Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 8.5);

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    // 3D Portrait Plane Mesh
    // 16:9 aspect ratio plane
    const planeGeo = new THREE.PlaneGeometry(8, 4.5, 16, 16);
    
    // Create initial canvas texture
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = 1920;
    tempCanvas.height = 1080;
    const texture = new THREE.CanvasTexture(tempCanvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    const planeMat = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: 1,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    const portraitMesh = new THREE.Mesh(planeGeo, planeMat);
    portraitMesh.position.set(mobileQuery.matches ? 0 : 0.8, -0.3, 0);
    scene.add(portraitMesh);

    // Ambient 3D Particle Cloud behind portrait
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 16;
      particlePositions[i + 1] = (Math.random() - 0.5) * 10;
      particlePositions[i + 2] = (Math.random() - 0.5) * 6 - 2;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x34d07c,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // --- Frame & Texture Cache ---
    const frameCache = new Map<number, ImageBitmap | HTMLImageElement>();
    const frameLoads = new Map<number, Promise<ImageBitmap | HTMLImageElement>>();

    function trimCache(targetIndex: number) {
      const protectedSet = new Set([
        targetIndex,
        clamp(targetIndex - 1, 0, FRAME_COUNT - 1),
        clamp(targetIndex + 1, 0, FRAME_COUNT - 1),
        CENTER_FRAME,
      ]);

      while (frameCache.size > cacheLimit()) {
        const oldest = frameCache.keys().next().value;
        if (oldest === undefined) break;
        if (protectedSet.has(oldest)) {
          const item = frameCache.get(oldest)!;
          frameCache.delete(oldest);
          frameCache.set(oldest, item);
          continue;
        }
        const item = frameCache.get(oldest);
        if (item && "close" in item && typeof item.close === "function") {
          item.close();
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
        frameCache.delete(safeIndex);
        frameCache.set(safeIndex, cached);
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
            frameCache.set(safeIndex, img);
            trimCache(safeIndex);
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

    let displayedIndex = -1;

    function applyTexture(img: ImageBitmap | HTMLImageElement) {
      if (tempCanvas.width !== img.width || tempCanvas.height !== img.height) {
        tempCanvas.width = img.width;
        tempCanvas.height = img.height;
      }
      const tCtx = tempCanvas.getContext("2d");
      if (tCtx) {
        tCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
        tCtx.drawImage(img, 0, 0);
        texture.needsUpdate = true;
      }
    }

    function preloadAround(index: number) {
      const offsets = [1, -1, 2, -2, 3, -3, 4, -4, 6, -6, 8, -8];
      offsets.forEach((offset) => {
        const candidate = index + offset;
        if (candidate >= 0 && candidate < FRAME_COUNT) {
          loadFrame(candidate).catch(() => {});
        }
      });
    }

    // --- Interactive Mouse & 3D Tilt Physics ---
    const mouse = {
      x: 0,        // -1 (left) to 1 (right)
      y: 0,        // -1 (top) to 1 (bottom)
      targetX: 0,
      targetY: 0,
      inside: false,
    };

    let targetFrame = CENTER_FRAME;
    let currentFrameFloat = CENTER_FRAME;

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const xNorm = (e.clientX - rect.left) / rect.width; // 0 to 1
      const yNorm = (e.clientY - rect.top) / rect.height; // 0 to 1

      mouse.targetX = (xNorm - 0.5) * 2;
      mouse.targetY = (yNorm - 0.5) * 2;
      mouse.inside = true;
      setIsHovered(true);

      // Map horizontal position (0..1) directly to frames (0..239)
      // Left = 0 (Profile left), Center = 120 (Front), Right = 239 (Profile right)
      targetFrame = Math.round(clamp(xNorm, 0, 1) * (FRAME_COUNT - 1));
      preloadAround(targetFrame);
    };

    const onPointerLeave = () => {
      mouse.targetX = 0;
      mouse.targetY = 0;
      mouse.inside = false;
      targetFrame = CENTER_FRAME;
      setIsHovered(false);
    };

    container.addEventListener("pointermove", onPointerMove, { passive: true });
    container.addEventListener("pointerleave", onPointerLeave, { passive: true });

    // Background warming workers
    let warmingStarted = false;
    let warmedFrames = 0;
    async function warmCache() {
      if (warmingStarted || reducedMotion.matches) return;
      warmingStarted = true;
      let cursor = 0;
      const workers = Math.min(4, navigator.hardwareConcurrency || 4);

      async function worker() {
        while (cursor < FRAME_COUNT && !destroyed) {
          const idx = cursor++;
          try {
            const res = await fetch(frameUrl(idx), { cache: "force-cache" });
            if (res.ok) await res.blob();
          } catch {}
          warmedFrames++;
          const pct = Math.round((warmedFrames / FRAME_COUNT) * 100);
          setLoadPercent(pct);
        }
      }
      await Promise.all(Array.from({ length: workers }, () => worker()));
    }

    // Initialize with Center Frame
    async function init() {
      try {
        const centerImg = await loadFrame(CENTER_FRAME);
        if (destroyed) return;
        applyTexture(centerImg);
        displayedIndex = CENTER_FRAME;
        setIsReady(true);
        preloadAround(CENTER_FRAME);
        warmCache();
      } catch (err) {
        console.error("Three.js hero initialization error", err);
      }
    }

    init();

    // --- Animation Loop ---
    let animId = 0;
    const clock = new THREE.Clock();

    function animate() {
      if (destroyed) return;
      animId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth Lerp Mouse Positions
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Smooth Frame Interpolation
      currentFrameFloat += (targetFrame - currentFrameFloat) * 0.14;
      const frameToRender = Math.round(currentFrameFloat);

      if (frameToRender !== displayedIndex && frameCache.has(frameToRender)) {
        applyTexture(frameCache.get(frameToRender)!);
        displayedIndex = frameToRender;
        setCurrentFrame(frameToRender + 1);
        
        // Calculate degree angle: -90° (left) -> 0° (front) -> +90° (right)
        const angle = Math.round(((frameToRender - CENTER_FRAME) / CENTER_FRAME) * 90);
        setAngleDeg(angle);
      }

      // --- 3D Real Perspective Tilting ---
      if (!reducedMotion.matches) {
        // 3D Yaw & Pitch on the Mesh
        portraitMesh.rotation.y = mouse.x * 0.22;
        portraitMesh.rotation.x = -mouse.y * 0.12;
        portraitMesh.rotation.z = -mouse.x * 0.03;

        // Subtle Floating Breathing Parallax
        portraitMesh.position.y = -0.3 + Math.sin(time * 1.5) * 0.04 - mouse.y * 0.08;
        portraitMesh.position.x = (mobileQuery.matches ? 0 : 0.8) + mouse.x * 0.12;

        // Camera Parallax
        camera.position.x = mouse.x * 0.25;
        camera.position.y = -mouse.y * 0.18;
        camera.lookAt(0, 0, 0);

        // Particle floating
        particleSystem.rotation.y = time * 0.03;
      }

      renderer.render(scene, camera);
    }

    animate();

    // Resize Handler
    const onResize = () => {
      if (!canvas || !container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
      portraitMesh.position.x = mobileQuery.matches ? 0 : 0.8;
    };

    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      destroyed = true;
      cancelAnimationFrame(animId);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      planeGeo.dispose();
      planeMat.dispose();
      texture.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="three-hero"
      aria-label="Interactive 3D Three.js portrait hero"
      className="relative min-h-[92vh] w-full overflow-hidden bg-term text-term-ink select-none"
    >
      {/* Three.js WebGL Canvas */}
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Interactive 3D portrait of Nayeemur Rahman tilting towards pointer"
        className="absolute inset-0 size-full cursor-grab active:cursor-grabbing"
      />

      {/* Atmospheric Lighting & Gradient Halos */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(31,165,90,0.12),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-term via-term/80 to-transparent"
      />

      {/* Loader */}
      {!isReady && (
        <div
          role="status"
          aria-live="polite"
          className="absolute inset-0 z-20 grid place-items-center bg-term/90 p-4 transition-opacity duration-300"
        >
          <div className="w-64 text-center font-mono">
            <p className="text-xs tracking-widest text-term-muted uppercase">
              Initializing 3D Neural Portrait
            </p>
            <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-term-line">
              <div
                className="h-full bg-delivered-bright transition-all duration-200"
                style={{ width: `${Math.max(12, loadPercent)}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Technical HUD & Brand Overlay */}
      <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-6xl flex-col justify-between p-4 pt-24 sm:p-8 sm:pt-28 md:p-12 md:pt-32 pointer-events-none">
        
        {/* Top Meta Bar */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-term-line bg-term-surface/80 px-3 py-1 backdrop-blur-xs">
              <span className="size-2 rounded-full bg-delivered-bright animate-pulse" />
              <span className="font-mono text-xs font-semibold text-term-ink tracking-wider">
                3D INTERACTIVE PERSPECTIVE
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
            <div className="flex items-center justify-end gap-1.5 mt-1 font-mono text-[10px] text-delivered-bright">
              <Sparkles className="size-3" />
              <span>Move pointer to tilt 3D angle</span>
            </div>
          </div>
        </div>

        {/* Center / Left Copy & CTAs */}
        <div className="max-w-xl space-y-5 pointer-events-auto my-auto py-8">
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:leading-[1.08]">
            Cold email that lands in the{" "}
            <span className="text-delivered-bright">primary inbox</span>, not spam.
          </h1>

          <p className="text-base sm:text-lg leading-relaxed text-term-muted max-w-lg">
            {site.headline}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-delivered px-5 py-3 font-mono text-xs font-semibold text-term shadow-md transition-all hover:bg-delivered-bright hover:shadow-lg active:scale-95"
            >
              <Mail className="size-4" />
              Fix My Deliverability
              <ArrowRight className="size-3.5" />
            </Link>

            <a
              href={links.upwork}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-term-line bg-term-surface/90 px-4 py-3 font-mono text-xs font-medium text-term-ink transition-colors hover:border-term-muted hover:bg-term active:scale-95"
            >
              <ShieldCheck className="size-4 text-delivered-bright" />
              Upwork Profile
            </a>
          </div>
        </div>

        {/* Bottom Readout */}
        <div className="flex items-end justify-between border-t border-term-line/60 pt-4 font-mono text-xs">
          <div className="text-term-muted">
            <span className="text-term-ink font-semibold">{site.stats.rating} ★ Rating</span>
            <span className="mx-2">•</span>
            <span>7/7 Verified Upwork Projects</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right font-mono">
              <span className="block text-sm font-bold text-delivered-bright tabular-nums">
                {angleDeg > 0 ? `+${angleDeg}°` : `${angleDeg}°`}
              </span>
              <span className="block text-[10px] text-term-muted tabular-nums">
                Frame {pad(currentFrame)} / {FRAME_COUNT}
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default ThreePortraitHero;
