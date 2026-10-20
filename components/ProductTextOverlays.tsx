"use client";

import React from "react";
import { MotionValue, motion, useTransform } from "framer-motion";
import { Product } from "@/data/products";
import { Sparkles, ShieldCheck, Flame, Droplets, ChevronDown } from "lucide-react";

interface ProductTextOverlaysProps {
  product: Product;
  scrollYProgress: MotionValue<number>;
}

export default function ProductTextOverlays({
  product,
  scrollYProgress,
}: ProductTextOverlaysProps) {
  // Stage 1: Hero Intro (0.0 to 0.22)
  const opacity1 = useTransform(scrollYProgress, [0, 0.04, 0.16, 0.22], [1, 1, 0.5, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.22], [0, -60]);
  const scale1 = useTransform(scrollYProgress, [0, 0.22], [1, 0.95]);

  // Stage 2: Swirl & Origin Features (0.22 to 0.50)
  const opacity2 = useTransform(scrollYProgress, [0.22, 0.28, 0.44, 0.50], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.22, 0.28, 0.50], [50, 0, -50]);
  const x2 = useTransform(scrollYProgress, [0.22, 0.28], [-40, 0]);

  // Stage 3: Burst & Vitality Features (0.50 to 0.76)
  const opacity3 = useTransform(scrollYProgress, [0.50, 0.56, 0.70, 0.76], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.50, 0.56, 0.76], [50, 0, -50]);
  const x3 = useTransform(scrollYProgress, [0.50, 0.56], [40, 0]);

  // Stage 4: Pure Standard & Commerce Teaser (0.76 to 0.98)
  const opacity4 = useTransform(scrollYProgress, [0.76, 0.82, 0.94, 0.99], [0, 1, 1, 0.3]);
  const y4 = useTransform(scrollYProgress, [0.76, 0.82, 0.99], [50, 0, -20]);
  const scale4 = useTransform(scrollYProgress, [0.76, 0.84], [0.92, 1]);

  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-center items-center overflow-hidden">
      {/* STAGE 1: CLEAN ORIGINAL HERO WITH REFINED LUXURY TYPOGRAPHY */}
      <motion.div
        style={{ opacity: opacity1, y: y1, scale: scale1 }}
        className="absolute inset-0 flex flex-col items-center justify-between py-24 sm:py-28 px-6 text-center max-w-5xl mx-auto"
      >
        {/* Top Header */}
        <div className="relative flex flex-col items-center">
          {/* Subtle ambient backlight glow */}
          <div
            className="absolute -inset-x-20 -inset-y-10 rounded-full blur-3xl opacity-25 pointer-events-none"
            style={{ backgroundColor: product.themeColor }}
          />

          <h1 className="relative text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white/95 to-white/70 drop-shadow-[0_20px_45px_rgba(0,0,0,0.5)] select-none">
            {product.section1.title.endsWith(".") ? (
              <>
                {product.section1.title.slice(0, -1)}
                <span
                  className="inline-block transition-colors duration-500 ml-0.5"
                  style={{ color: product.themeColor }}
                >
                  .
                </span>
              </>
            ) : (
              product.section1.title
            )}
          </h1>

          <p className="relative text-xl sm:text-2xl md:text-3xl font-light text-white/90 tracking-wider mt-3 drop-shadow-[0_8px_24px_rgba(0,0,0,0.6)]">
            {product.section1.subtitle}
          </p>
        </div>

        {/* Bottom Scroll Prompt */}
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <div className="flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-black/50 backdrop-blur-xl border border-white/20 text-white shadow-2xl">
            <span className="text-xs uppercase tracking-widest font-semibold text-white/90">
              Scroll to explore
            </span>
            <ChevronDown className="w-4 h-4 text-amber-300 animate-pulse" />
          </div>
        </div>
      </motion.div>

      {/* STAGE 2: LEFT-ALIGNED ORIGIN FEATURES */}
      <motion.div
        style={{ opacity: opacity2, y: y2, x: x2 }}
        className="absolute inset-x-0 max-w-7xl mx-auto px-6 sm:px-12 flex justify-start pointer-events-none"
      >
        <div className="max-w-xl text-left bg-black/60 backdrop-blur-2xl p-8 sm:p-10 rounded-3xl border border-white/20 shadow-[0_25px_50px_rgba(0,0,0,0.8)] pointer-events-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-orange-500/30 text-orange-200 border border-orange-400/40 mb-4">
            <Droplets className="w-3.5 h-3.5 text-orange-300" />
            100% Uncompromised Origin
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight drop-shadow-lg">
            {product.section2.title}
          </h2>
          {product.section2.subtitle && (
            <p className="text-base sm:text-lg font-light text-white/90 mt-4 leading-relaxed">
              {product.section2.subtitle}
            </p>
          )}

          {/* Stats Badges */}
          <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-white/15">
            {product.stats.map((stat, i) => (
              <div key={i} className="text-left bg-white/5 rounded-2xl p-3 border border-white/10">
                <div className="text-2xl font-black text-amber-300">{stat.val}</div>
                <div className="text-[11px] uppercase tracking-wider text-white/70 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* STAGE 3: RIGHT-ALIGNED NUTRITION FEATURES */}
      <motion.div
        style={{ opacity: opacity3, y: y3, x: x3 }}
        className="absolute inset-x-0 max-w-7xl mx-auto px-6 sm:px-12 flex justify-end pointer-events-none"
      >
        <div className="max-w-xl text-left bg-black/60 backdrop-blur-2xl p-8 sm:p-10 rounded-3xl border border-white/20 shadow-[0_25px_50px_rgba(0,0,0,0.8)] pointer-events-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-500/30 text-amber-200 border border-amber-400/40 mb-4">
            <Flame className="w-3.5 h-3.5 text-amber-300" />
            Living Enzyme Retention
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight drop-shadow-lg">
            {product.section3.title}
          </h2>
          {product.section3.subtitle && (
            <p className="text-base sm:text-lg font-light text-white/90 mt-4 leading-relaxed">
              {product.section3.subtitle}
            </p>
          )}

          {/* Feature Badges */}
          <div className="flex flex-wrap gap-2.5 mt-6">
            {product.features.map((feat, i) => (
              <span
                key={i}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white/10 text-white border border-white/20 backdrop-blur-md"
              >
                ✓ {feat}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* STAGE 4: CENTERED PURITY PUNCHLINE */}
      <motion.div
        style={{ opacity: opacity4, y: y4, scale: scale4 }}
        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center max-w-4xl mx-auto pointer-events-none"
      >
        <div className="bg-black/70 backdrop-blur-2xl p-8 sm:p-12 rounded-3xl border border-white/25 shadow-[0_25px_60px_rgba(0,0,0,0.8)] pointer-events-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-emerald-500/30 text-emerald-200 border border-emerald-400/40 mb-5">
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            The Gold Standard of Cold Press
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-white leading-tight tracking-tight drop-shadow-2xl">
            {product.section4.title}
          </h2>
          <p className="text-base sm:text-xl font-light text-white/90 mt-4 max-w-2xl mx-auto">
            {product.description}
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="text-3xl font-extrabold text-amber-300">
              {product.price}{" "}
              <span className="text-sm font-normal text-white/70">/ {product.buyNowSection.unit}</span>
            </div>
            <button
              type="button"
              onClick={() => {
                const buy = document.getElementById("buy-section");
                if (buy) buy.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-7 py-3 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold text-sm shadow-xl hover:scale-105 active:scale-95 transition-transform"
            >
              Order This Flavor Now
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
