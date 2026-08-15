"use client";
import { useState } from "react";

export default function IndependenceDayBanner() {
  const [visible, setVisible] = useState(true);

  // Auto-hide after Aug 16 ends (IST = UTC+5:30)
  const now = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000;
  const ist = new Date(now.getTime() + istOffset);
  if (ist.getUTCFullYear() > 2026 || ist.getUTCMonth() > 7 || ist.getUTCDate() > 16) return null;

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999]">
      {/* Tricolor stripe */}
      <div className="flex h-1">
        <div className="flex-1 bg-[#FF9933]" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-[#138808]" />
      </div>

      <div
        style={{ background: "linear-gradient(90deg, #0f0c29, #302b63, #24243e)" }}
        className="flex items-center justify-center gap-3 px-4 py-2.5 text-center"
      >
        {/* Animated flag emoji */}
        <span className="text-lg animate-pulse select-none">🇮🇳</span>

        <p className="text-white text-xs sm:text-sm font-medium leading-snug">
          <span className="text-[#FF9933] font-bold">Jai Hind!</span>{" "}
          Wishing every Indian entrepreneur a{" "}
          <span className="text-white font-semibold">Happy 79th Independence Day</span>
          {" "}— may your business grow as free, bold &amp; unstoppable as our nation.{" "}
          <span className="text-[#138808] font-semibold">🚀 Vande Mataram!</span>
        </p>

        <span className="text-lg animate-pulse select-none">🇮🇳</span>

        <button
          onClick={() => setVisible(false)}
          aria-label="Dismiss"
          className="ml-2 flex-shrink-0 w-5 h-5 rounded-full bg-white/10 hover:bg-white/25 transition-colors flex items-center justify-center text-white/70 hover:text-white text-xs font-bold"
        >
          ✕
        </button>
      </div>

      {/* Bottom tricolor stripe */}
      <div className="flex h-0.5">
        <div className="flex-1 bg-[#FF9933]" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-[#138808]" />
      </div>
    </div>
  );
}
