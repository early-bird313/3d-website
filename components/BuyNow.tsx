"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Product } from "@/data/products";
import {
  ShoppingBag,
  Truck,
  RotateCcw,
  ShieldCheck,
  Plus,
  Minus,
  Check,
  Sparkles,
} from "lucide-react";
import confetti from "canvas-confetti";

interface BuyNowProps {
  product: Product;
  onAddToCart?: (qty: number) => void;
}

export default function BuyNow({ product, onAddToCart }: BuyNowProps) {
  const [quantity, setQuantity] = useState(1);
  const [isOrdered, setIsOrdered] = useState(false);

  const handleIncrement = () => setQuantity((prev) => Math.min(prev + 1, 24));
  const handleDecrement = () => setQuantity((prev) => Math.max(prev - 1, 1));

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ["#FFB74D", "#FFA726", "#F97316", "#EC4899", "#FFFFFF"],
      });
    } catch {
      // Fallback if canvas-confetti is not loaded
    }
  };

  const handleOrder = () => {
    triggerConfetti();
    setIsOrdered(true);
    if (onAddToCart) {
      onAddToCart(quantity);
    }
    setTimeout(() => {
      setIsOrdered(false);
    }, 3000);
  };

  // Calculate numeric total if price has currency sign
  const numericPrice = parseInt(product.buyNowSection.price.replace(/[^\d]/g, ""), 10) || 120;
  const totalPrice = numericPrice * quantity;

  return (
    <section id="buy-section" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto z-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative rounded-3xl p-8 sm:p-14 bg-black/50 backdrop-blur-2xl border border-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] overflow-hidden"
      >
        {/* Ambient Top Glow */}
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl opacity-30 pointer-events-none"
          style={{ backgroundColor: product.themeColor }}
        />

        <div className="relative z-10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-10">
          {/* LEFT: PRODUCT & PRICING */}
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-white border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Limited Micro-Batch Available
            </div>

            <div>
              <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                {product.name}
              </h2>
              <p className="text-lg text-white/70 font-light mt-1">
                {product.subName}
              </p>
            </div>

            {/* Processing Badges */}
            <div className="flex flex-wrap gap-2 pt-1">
              {product.buyNowSection.processingParams.map((param, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1 rounded-full text-xs font-semibold bg-white/10 text-white/90 border border-white/15 backdrop-blur-md"
                >
                  ✓ {param}
                </span>
              ))}
            </div>

            {/* Trust Policies */}
            <div className="space-y-3 pt-4 border-t border-white/10 text-xs sm:text-sm text-white/70">
              <div className="flex items-start gap-3">
                <Truck className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                <span>{product.buyNowSection.deliveryPromise}</span>
              </div>
              <div className="flex items-start gap-3">
                <RotateCcw className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{product.buyNowSection.returnPolicy}</span>
              </div>
            </div>
          </div>

          {/* RIGHT: COMMERCE CONTROLS */}
          <div className="w-full lg:w-80 p-6 rounded-2xl bg-white/5 border border-white/15 backdrop-blur-xl flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-wider text-white/60 font-medium">
                Price
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-4xl sm:text-5xl font-black text-white">
                  ₹{totalPrice}
                </span>
                <span className="text-xs text-white/60">
                  ({product.buyNowSection.unit})
                </span>
              </div>
            </div>

            {/* Quantity Picker */}
            <div className="my-6">
              <label className="text-xs font-semibold uppercase tracking-wider text-white/70 mb-2 block">
                Select Quantity
              </label>
              <div className="flex items-center justify-between bg-black/40 rounded-xl border border-white/15 p-1.5">
                <button
                  type="button"
                  onClick={handleDecrement}
                  disabled={quantity <= 1}
                  className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center text-white transition-all"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-xl font-bold text-white px-4">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={handleIncrement}
                  className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-white transition-all"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Order Action Button */}
            <button
              type="button"
              onClick={handleOrder}
              disabled={isOrdered}
              className={`w-full py-4 px-6 rounded-2xl font-bold text-base flex items-center justify-center gap-3 transition-all duration-300 shadow-xl active:scale-95 ${
                isOrdered
                  ? "bg-emerald-500 text-white"
                  : "text-white hover:brightness-110 shadow-orange-500/30"
              }`}
              style={{
                background: isOrdered
                  ? "#10B981"
                  : "linear-gradient(135deg, #f97316 0%, #ec4899 100%)",
              }}
            >
              {isOrdered ? (
                <>
                  <Check className="w-5 h-5 animate-bounce" />
                  <span>Added to Chilled Box!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  <span>Order Now • ₹{totalPrice}</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 mt-4 text-[11px] text-white/50">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Chilled Doorstep Delivery in 24h</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
