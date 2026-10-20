"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useMotionValue } from "framer-motion";
import { Product } from "@/data/products";
import ProductTextOverlays from "./ProductTextOverlays";
import { Loader2 } from "lucide-react";

interface ProductBottleScrollProps {
  product: Product;
}

const TOTAL_FRAMES = 120;

const TIMELINE_STEPS = [
  { label: "Sunrise", range: [0, 0.25] },
  { label: "Harvest", range: [0.25, 0.50] },
  { label: "Nutrition", range: [0.50, 0.75] },
  { label: "Pure Gold", range: [0.75, 1.0] },
];

export default function ProductBottleScroll({ product }: ProductBottleScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  
  // Physics & Inertia interpolation refs
  const targetFrameRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);
  const targetProgressRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);

  // Framer Motion value for synchronized text overlays
  const scrollProgressMotion = useMotionValue<number>(0);

  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(0);

  // Draw image to canvas with COVER fit + High-definition smoothing + Parallax drift
  const drawFrame = useCallback((frameFloat: number, progress: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Enable ultra-crisp high-quality image smoothing
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const frameIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(frameFloat)));
    const img = imagesRef.current[frameIndex];

    if (!img || !img.complete || img.naturalWidth === 0) {
      // Find nearest loaded frame as fallback
      let fallbackImg: HTMLImageElement | null = null;
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const prev = imagesRef.current[frameIndex - offset];
        if (prev && prev.complete && prev.naturalWidth > 0) {
          fallbackImg = prev;
          break;
        }
        const next = imagesRef.current[frameIndex + offset];
        if (next && next.complete && next.naturalWidth > 0) {
          fallbackImg = next;
          break;
        }
      }

      if (fallbackImg) {
        renderImageCover(ctx, fallbackImg, canvas.width, canvas.height, progress);
      }
      return;
    }

    renderImageCover(ctx, img, canvas.width, canvas.height, progress);
  }, []);

  // COVER MODE with subtle vertical parallax and scale drift
  const renderImageCover = (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    canvasW: number,
    canvasH: number,
    progress: number
  ) => {
    const imgW = img.naturalWidth;
    const imgH = img.naturalHeight;

    // Scale to cover 100% of the screen
    // Add subtle scale parallax: 1.04 at start -> 1.00 at full reveal
    const baseScale = Math.max(canvasW / imgW, canvasH / imgH);
    const dynamicScale = baseScale * (1.04 - progress * 0.04);

    const drawW = imgW * dynamicScale;
    const drawH = imgH * dynamicScale;

    // Vertical parallax: subtly descends and pans up as you scroll, giving a tangible feeling of scrolling down
    const parallaxY = (progress - 0.5) * (canvasH * 0.06);

    const drawX = (canvasW - drawW) / 2;
    const drawY = (canvasH - drawH) / 2 - parallaxY;

    ctx.clearRect(0, 0, canvasW, canvasH);
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  };

  // High-DPI canvas resizing
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.round(window.innerWidth * dpr);
    const h = Math.round(window.innerHeight * dpr);

    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }

    drawFrame(currentFrameRef.current, currentProgressRef.current);
  }, [drawFrame]);

  // Preload all 120 sharpened frames
  useEffect(() => {
    let cancelled = false;
    imagesRef.current = [];
    setLoadedCount(0);
    setIsReady(false);

    const images: HTMLImageElement[] = [];
    let count = 0;

    const handleLoaded = (index: number) => {
      if (cancelled) return;
      count++;
      setLoadedCount(count);

      if (index === 1 || count === 1) {
        drawFrame(0, 0);
      }
      if (count >= 15) {
        setIsReady(true);
      }
    };

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `${product.folderPath}/${i}.webp`;

      img.onload = () => handleLoaded(i);
      img.onerror = () => {
        // Fallback to .jpg
        if (img.src.endsWith(".webp")) {
          img.src = `${product.folderPath}/${i}.jpg`;
        } else {
          handleLoaded(i);
        }
      };

      images.push(img);
    }

    imagesRef.current = images;

    const timer = setTimeout(() => {
      if (!cancelled) setIsReady(true);
    }, 1000);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [product.folderPath, drawFrame]);

  // Smooth kinetic animation loop (LERP interpolation)
  useEffect(() => {
    let active = true;

    const tick = () => {
      if (!active) return;

      // Lerp progress and frame for natural kinetic momentum
      const progressDiff = targetProgressRef.current - currentProgressRef.current;
      currentProgressRef.current += progressDiff * 0.18;

      const frameDiff = targetFrameRef.current - currentFrameRef.current;
      currentFrameRef.current += frameDiff * 0.18;

      // Update overlays
      scrollProgressMotion.set(currentProgressRef.current);

      // Determine active timeline step
      const stepIdx = TIMELINE_STEPS.findIndex(
        (s) => currentProgressRef.current >= s.range[0] && currentProgressRef.current <= s.range[1]
      );
      if (stepIdx !== -1) {
        setActiveStep(stepIdx);
      }

      // Draw interpolated frame with parallax
      drawFrame(currentFrameRef.current, currentProgressRef.current);

      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      active = false;
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [drawFrame, scrollProgressMotion]);

  // Update target progress on window scroll
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const totalScrollable = rect.height - window.innerHeight;

    if (totalScrollable <= 0) return;

    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));

    targetProgressRef.current = progress;
    targetFrameRef.current = progress * (TOTAL_FRAMES - 1);
  }, []);

  // Listen to scroll and resize
  useEffect(() => {
    handleResize();
    handleScroll();

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleResize, handleScroll]);

  const progressPercent = Math.min(100, Math.round((loadedCount / TOTAL_FRAMES) * 100));

  return (
    <section ref={containerRef} className="relative h-[500vh] w-full">
      {/* Sticky Fullscreen Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Fullscreen 3D Canvas (Edge-to-Edge with Parallax Motion) */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full select-none"
          style={{ width: "100%", height: "100%" }}
        />

        {/* Loading Overlay */}
        {!isReady && (
          <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md transition-opacity duration-500">
            <Loader2 className="w-10 h-10 animate-spin text-orange-400 mb-4" />
            <p className="text-white text-sm font-semibold tracking-wider uppercase">
              Loading 3D Visuals... {progressPercent}%
            </p>
            <div className="w-48 h-1.5 bg-white/20 rounded-full mt-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-400 to-amber-300 transition-all duration-200"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Tactile Vertical Scroll Timeline on the Right */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-end gap-5">
          <div className="flex flex-col items-end gap-1.5">
            {TIMELINE_STEPS.map((step, idx) => {
              const isCurrent = idx === activeStep;
              return (
                <div key={idx} className="flex items-center gap-3 group">
                  <span
                    className={`text-[10px] uppercase font-bold tracking-widest transition-all duration-300 ${
                      isCurrent
                        ? "text-white opacity-100 scale-105"
                        : "text-white/40 opacity-60"
                    }`}
                  >
                    {step.label}
                  </span>
                  <div
                    className={`rounded-full transition-all duration-300 ${
                      isCurrent
                        ? "w-2.5 h-2.5 bg-amber-400 shadow-[0_0_12px_#F59E0B]"
                        : "w-1.5 h-1.5 bg-white/30"
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* Vertical progress rail */}
          <div className="w-0.5 h-32 bg-white/15 rounded-full overflow-hidden relative">
            <div
              className="w-full bg-gradient-to-b from-amber-400 to-orange-500 transition-all duration-75"
              style={{
                height: `${Math.round(currentProgressRef.current * 100)}%`,
              }}
            />
          </div>
        </div>

        {/* Synchronized Text & Feature Overlays */}
        <ProductTextOverlays
          product={product}
          scrollYProgress={scrollProgressMotion}
        />
      </div>
    </section>
  );
}
