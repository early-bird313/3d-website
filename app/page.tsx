"use client";

import React, { useState, useEffect } from "react";
import { products } from "@/data/products";
import Navbar from "@/components/Navbar";
import ProductBottleScroll from "@/components/ProductBottleScroll";
import ProductDetails from "@/components/ProductDetails";
import BuyNow from "@/components/BuyNow";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Compass,
} from "lucide-react";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [cartCount, setCartCount] = useState<number>(0);

  const currentProduct = products[currentIndex];
  const nextIndex = (currentIndex + 1) % products.length;
  const nextProduct = products[nextIndex];

  // Scroll Reset and CSS variable update whenever flavor changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });

    if (typeof document !== "undefined") {
      document.documentElement.style.setProperty(
        "--product-gradient",
        currentProduct.gradient
      );
      document.documentElement.style.setProperty(
        "--theme-color",
        currentProduct.themeColor
      );
    }
  }, [currentIndex, currentProduct]);

  const handlePrevFlavor = () => {
    setCurrentIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const handleNextFlavor = () => {
    setCurrentIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  const handleSelectFlavor = (index: number) => {
    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  };

  const scrollToBuy = () => {
    const buyEl = document.getElementById("buy-section");
    if (buyEl) {
      buyEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleAddToCart = (qty: number) => {
    setCartCount((prev) => prev + qty);
  };

  return (
    <main className="relative min-h-screen w-full select-none">
      {/* GLOBAL NAVBAR */}
      <Navbar
        currentProduct={currentProduct}
        onOrderClick={scrollToBuy}
        cartCount={cartCount}
      />

      {/* FIXED FLAVOR NAVIGATION ARROWS (DESKTOP) */}
      <div className="fixed inset-y-0 left-4 sm:left-6 z-40 flex items-center pointer-events-none">
        <button
          type="button"
          onClick={handlePrevFlavor}
          className="pointer-events-auto w-12 h-12 rounded-full bg-black/50 hover:bg-black/80 border border-white/20 backdrop-blur-xl flex items-center justify-center text-white/90 hover:text-white hover:scale-110 active:scale-95 transition-all duration-300 shadow-2xl"
          aria-label="Previous Flavor"
          title="Previous Flavor"
        >
          <ChevronLeft className="w-6 h-6 -ml-0.5" />
        </button>
      </div>

      <div className="fixed inset-y-0 right-4 sm:right-6 z-40 flex items-center pointer-events-none">
        <button
          type="button"
          onClick={handleNextFlavor}
          className="pointer-events-auto w-12 h-12 rounded-full bg-black/50 hover:bg-black/80 border border-white/20 backdrop-blur-xl flex items-center justify-center text-white/90 hover:text-white hover:scale-110 active:scale-95 transition-all duration-300 shadow-2xl"
          aria-label="Next Flavor"
          title="Next Flavor"
        >
          <ChevronRight className="w-6 h-6 -mr-0.5" />
        </button>
      </div>

      {/* FIXED BOTTOM-CENTER PILL MENU */}
      <nav
        aria-label="Flavor selector"
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 px-3 py-2 rounded-full bg-black/70 backdrop-blur-2xl border border-white/20 shadow-2xl flex items-center gap-1.5 sm:gap-2"
      >
        {products.map((item, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={item.id}
              onClick={() => handleSelectFlavor(idx)}
              className={`relative px-4 sm:px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 flex items-center gap-2 ${
                isActive
                  ? "text-black shadow-lg"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activePill"
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: item.themeColor }}
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span
                className={`relative z-10 w-2 h-2 rounded-full transition-colors ${
                  isActive ? "bg-black" : ""
                }`}
                style={{ backgroundColor: isActive ? "#000" : item.themeColor }}
              />
              <span className="relative z-10 whitespace-nowrap">{item.name}</span>
            </button>
          );
        })}
      </nav>

      {/* PRODUCT CONTENT CONTAINER - Clean native DOM to ensure sticky works perfectly */}
      <div key={currentProduct.id} className="relative w-full">
        {/* 1. FULL DESKTOP SCROLL ENGINE: Fullscreen Canvas 3D Sequence & Overlays */}
        <ProductBottleScroll product={currentProduct} />

        {/* 2. PRODUCT DETAILS SECTION */}
        <ProductDetails product={currentProduct} />

        {/* 3. COMMERCE & BUY NOW SECTION */}
        <BuyNow product={currentProduct} onAddToCart={handleAddToCart} />

        {/* 4. NEXT FLAVOR CTA - LARGE SLANTED EDGE BANNER */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto z-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative overflow-hidden rounded-3xl bg-black/60 backdrop-blur-2xl border border-white/20 p-8 sm:p-14 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-8 group"
          >
            {/* Ambient Accent Glow */}
            <div
              className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full blur-3xl opacity-25 pointer-events-none group-hover:opacity-40 transition-opacity"
              style={{ backgroundColor: nextProduct.themeColor }}
            />

            <div className="space-y-3 text-center sm:text-left">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-white/80">
                <Compass className="w-3.5 h-3.5 text-amber-300" />
                Continue The Journey
              </span>
              <h3 className="text-3xl sm:text-4xl font-black text-white">
                Next Up: {nextProduct.name}
              </h3>
              <p className="text-white/70 text-sm sm:text-base font-light max-w-md">
                {nextProduct.subName} {nextProduct.description}
              </p>
            </div>

            <button
              type="button"
              onClick={handleNextFlavor}
              className="group/btn relative px-8 py-4 rounded-2xl font-bold text-base text-black flex items-center gap-3 transition-transform duration-300 hover:scale-105 active:scale-95 shadow-2xl"
              style={{ backgroundColor: nextProduct.themeColor }}
            >
              <span>Switch to {nextProduct.name}</span>
              <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </section>
      </div>

      {/* FOOTER */}
      <Footer />
    </main>
  );
}
