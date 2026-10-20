"use client";

import React, { useEffect, useState } from "react";
import { Product } from "@/data/products";
import { ShoppingBag, Sparkles } from "lucide-react";

interface NavbarProps {
  currentProduct: Product;
  onOrderClick: () => void;
  cartCount?: number;
}

export default function Navbar({
  currentProduct,
  onOrderClick,
  cartCount = 0,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/60 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo (Icon Only) */}
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-pink-500 p-[1.5px] shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none group"
          aria-label="Home"
        >
          <div className="w-full h-full bg-black/85 rounded-[14px] flex items-center justify-center backdrop-blur-md group-hover:bg-black/70 transition-colors">
            {/* Abstract Lightning / Banana Hybrid SVG */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-orange-400 group-hover:text-amber-300 transition-colors drop-shadow"
            >
              <path
                d="M13 2L4.5 13.5H11.5L9.5 22L19.5 10H13.5L15 2H13Z"
                fill="url(#banana-lightning-grad)"
              />
              <path
                d="M5 19C7 21 14 22 19 17"
                stroke="url(#banana-curve-grad)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="banana-lightning-grad" x1="4.5" y1="2" x2="19.5" y2="22" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FBBF24" />
                  <stop offset="0.5" stopColor="#F97316" />
                  <stop offset="1" stopColor="#EC4899" />
                </linearGradient>
                <linearGradient id="banana-curve-grad" x1="5" y1="17" x2="19" y2="22" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#F59E0B" />
                  <stop offset="1" stopColor="#EF4444" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </button>

        {/* Navigation Action - Enhanced Order Now Button */}
        <div className="relative group">
          {/* Ambient Dynamic Glow */}
          <div
            className="absolute -inset-1 rounded-full opacity-60 blur-md group-hover:opacity-100 group-hover:blur-lg transition-all duration-500 pointer-events-none"
            style={{
              background: `linear-gradient(135deg, ${currentProduct.themeColor}, #F97316, #EC4899)`,
            }}
          />

          <button
            onClick={onOrderClick}
            type="button"
            className="relative inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full font-bold text-sm text-white overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl bg-black/60 backdrop-blur-xl border border-white/25"
          >
            {/* Shimmer light sweep */}
            <span className="absolute -inset-full bg-gradient-to-r from-transparent via-white/20 to-transparent -rotate-45 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" />

            {/* Inner theme-colored shopping bag icon badge */}
            <span
              className="w-6 h-6 rounded-full flex items-center justify-center text-black transition-transform duration-300 group-hover:scale-110"
              style={{ backgroundColor: currentProduct.themeColor }}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
            </span>

            <span className="tracking-wide font-semibold">Order Now</span>

            {cartCount > 0 ? (
              <span
                className="px-2 py-0.5 text-xs rounded-full font-black text-black"
                style={{ backgroundColor: currentProduct.themeColor }}
              >
                {cartCount}
              </span>
            ) : (
              <Sparkles className="w-3.5 h-3.5 text-amber-300 group-hover:rotate-12 transition-transform duration-300" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
