"use client";

import React from "react";
import { motion } from "framer-motion";
import { Product } from "@/data/products";
import { Award, Leaf, Zap, ShieldCheck, HeartHandshake, CheckCircle2 } from "lucide-react";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-20">
      {/* SECTION HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center max-w-3xl mx-auto mb-20"
      >
        <span
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-white/10 backdrop-blur-md border border-white/20 mb-4"
          style={{ color: product.themeColor }}
        >
          <Leaf className="w-4 h-4" />
          Behind The Bottle
        </span>
        <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight drop-shadow-xl">
          Crafted with Obsessive Purity
        </h2>
        <p className="mt-4 text-lg sm:text-xl text-white/80 font-light leading-relaxed">
          Every drop of {product.name} is a testament to what happens when nature’s peak harvests meet pharmaceutical-grade cold pressure preservation.
        </p>
      </motion.div>

      {/* TWO COLUMN STORY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Card 1: Details Section */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative rounded-3xl p-8 sm:p-10 bg-black/40 backdrop-blur-xl border border-white/15 shadow-2xl flex flex-col justify-between overflow-hidden group hover:border-white/30 transition-all duration-300"
        >
          <div
            className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none group-hover:opacity-30 transition-opacity"
            style={{ backgroundColor: product.themeColor }}
          />

          <div>
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-6">
              <Award className="w-6 h-6 text-amber-300" />
            </div>
            <span className="text-xs uppercase tracking-widest font-semibold text-white/60">
              The Provenance
            </span>
            <h3 className="text-3xl font-extrabold text-white mt-1 mb-4">
              {product.detailsSection.title}
            </h3>
            <p className="text-white/80 text-base sm:text-lg leading-relaxed font-light">
              {product.detailsSection.description}
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-4">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-xs font-bold text-white">
                100
              </div>
              <div className="w-8 h-8 rounded-full bg-amber-500/40 border border-white/30 flex items-center justify-center text-xs font-bold text-white">
                %
              </div>
            </div>
            <span className="text-xs text-white/70 font-medium">
              Verified Single-Origin Micro-Batch
            </span>
          </div>
        </motion.div>

        {/* Card 2: Freshness Section */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="relative rounded-3xl p-8 sm:p-10 bg-black/40 backdrop-blur-xl border border-white/15 shadow-2xl flex flex-col justify-between overflow-hidden group hover:border-white/30 transition-all duration-300"
        >
          <div
            className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none group-hover:opacity-30 transition-opacity"
            style={{ backgroundColor: product.themeColor }}
          />

          <div>
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-6">
              <Zap className="w-6 h-6 text-amber-300" />
            </div>
            <span className="text-xs uppercase tracking-widest font-semibold text-white/60">
              The Science
            </span>
            <h3 className="text-3xl font-extrabold text-white mt-1 mb-4">
              {product.freshnessSection.title}
            </h3>
            <p className="text-white/80 text-base sm:text-lg leading-relaxed font-light">
              {product.freshnessSection.description}
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-3 gap-2 text-center">
            {product.stats.map((stat, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-2.5 border border-white/10">
                <div className="text-lg font-black text-white">{stat.val}</div>
                <div className="text-[10px] tracking-wider uppercase text-white/60 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* THREE PILLAR HIGHLIGHTS */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
      >
        <div className="p-6 rounded-2xl bg-black/30 backdrop-blur-lg border border-white/10 flex items-start gap-4">
          <div className="p-3 rounded-xl bg-orange-500/20 text-orange-300 border border-orange-500/30 shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-white text-lg">Hyper-Pure Filtration</h4>
            <p className="text-sm text-white/70 mt-1">Multi-stage cold filtration isolates pure nectar and micro-nutrients without fibrous sediment.</p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-black/30 backdrop-blur-lg border border-white/10 flex items-start gap-4">
          <div className="p-3 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 shrink-0">
            <Leaf className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-white text-lg">Zero Heat Ever</h4>
            <p className="text-sm text-white/70 mt-1">Conventional pasteurization boils away vitamins. We use 87,000 psi isobaric pressure instead.</p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-black/30 backdrop-blur-lg border border-white/10 flex items-start gap-4">
          <div className="p-3 rounded-xl bg-pink-500/20 text-pink-300 border border-pink-500/30 shrink-0">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-white text-lg">Fair Trade Direct</h4>
            <p className="text-sm text-white/70 mt-1">Direct partnerships with generational orchards guarantee ethical compensation and peak ripeness.</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
