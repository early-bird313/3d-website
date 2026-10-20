"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle2, Instagram, Twitter, Facebook, Sparkles } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail("");
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="relative bg-gray-950 text-white border-t border-white/10 z-20 overflow-hidden">
      {/* Subtle top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-orange-500/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Column 1: Brand (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-amber-500 to-pink-500 flex items-center justify-center p-0.5">
                <div className="w-full h-full bg-black/80 rounded-[14px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                </div>
              </div>
              <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                Nano Banana
              </span>
            </div>
            <p className="text-white/60 text-sm max-w-sm leading-relaxed">
              Pioneering the future of fresh botanical nutrition. We engineer cold-pressed liquid elixirs with 0% compromise, delivering living enzymes and raw antioxidants straight to your doorstep.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="#social"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#social"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#social"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Shop Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Shop Blends
            </h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li>
                <a href="#flavor-0" className="hover:text-white transition-colors">
                  Cream Mango
                </a>
              </li>
              <li>
                <a href="#flavor-1" className="hover:text-white transition-colors">
                  Dutch Chocolate
                </a>
              </li>
              <li>
                <a href="#flavor-2" className="hover:text-white transition-colors">
                  Ruby Pomegranate
                </a>
              </li>
              <li>
                <a href="#buy-section" className="hover:text-white transition-colors">
                  Curated Tasting Box
                </a>
              </li>
              <li>
                <a href="#buy-section" className="hover:text-white transition-colors">
                  Monthly Cold Subscription
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Support & Science
            </h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  HPP Cold Technology
                </a>
              </li>
              <li>
                <a href="#shipping" className="hover:text-white transition-colors">
                  Cold-Chain Logistics
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Nutritional FAQ
                </a>
              </li>
              <li>
                <a href="#wholesale" className="hover:text-white transition-colors">
                  Wholesale & Studios
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact Care Team
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Stay In The Flow
            </h4>
            <p className="text-xs text-white/60 leading-relaxed">
              Receive private drop notifications, exclusive seasonal harvests, and science-backed health insights.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/40 text-sm focus:outline-none focus:border-orange-500 transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center transition-colors"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              {subscribed && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Welcome to the Nano Banana inner circle!</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* BOTTOM LEGAL & COPYRIGHT */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Nano Banana Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#cookies" className="hover:text-white transition-colors">
              Cookie Preferences
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
