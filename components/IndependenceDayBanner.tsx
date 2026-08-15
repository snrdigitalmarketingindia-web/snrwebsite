"use client";
import { useState, useEffect } from "react";

export default function IndependenceDayBanner() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Auto-hide after Aug 16 ends (IST = UTC+5:30)
    const now = new Date();
    const ist = new Date(now.getTime() + 5.5 * 60 * 60 * 1000);
    if (ist.getUTCFullYear() > 2026 || ist.getUTCMonth() > 7 || ist.getUTCDate() > 16) return;

    const dismissed = sessionStorage.getItem("id80-dismissed");
    if (!dismissed) {
      setMounted(true);
      setTimeout(() => setVisible(true), 300);
    }
  }, []);

  const dismiss = () => {
    setVisible(false);
    setTimeout(() => setMounted(false), 500);
    sessionStorage.setItem("id80-dismissed", "1");
  };

  if (!mounted) return null;

  return (
    <>
      <style>{`
        @keyframes floatUp {
          0%,100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes sparkle {
          0%,100% { opacity:0; transform:scale(0) rotate(0deg); }
          50% { opacity:1; transform:scale(1) rotate(180deg); }
        }
        @keyframes slideUp {
          from { opacity:0; transform:translateY(40px); }
          to { opacity:1; transform:translateY(0); }
        }
        @keyframes slideDown {
          from { opacity:1; transform:translateY(0); }
          to { opacity:0; transform:translateY(40px); }
        }
        .id-banner { animation: slideUp 0.5s cubic-bezier(.34,1.56,.64,1) forwards; }
        .id-banner.hide { animation: slideDown 0.4s ease-in forwards; }
        .id-float { animation: floatUp 3s ease-in-out infinite; }
        .id-chakra { animation: spin-slow 8s linear infinite; }
        .id-shimmer {
          background: linear-gradient(90deg,#FF9933 0%,#fff 25%,#FF9933 40%,#138808 60%,#fff 75%,#138808 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }
        .sparkle-1 { animation: sparkle 2s ease-in-out infinite 0s; }
        .sparkle-2 { animation: sparkle 2s ease-in-out infinite 0.5s; }
        .sparkle-3 { animation: sparkle 2s ease-in-out infinite 1s; }
        .sparkle-4 { animation: sparkle 2s ease-in-out infinite 1.5s; }
      `}</style>

      <div className={`fixed bottom-6 left-1/2 z-[9999] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 id-banner id-float ${!visible ? "hide" : ""}`}>
        {/* Glowing border wrapper */}
        <div className="relative rounded-2xl p-[2px]" style={{
          background: "linear-gradient(135deg, #FF9933 0%, #fff 33%, #138808 66%, #FF9933 100%)",
          boxShadow: "0 8px 40px rgba(255,153,51,0.35), 0 4px 20px rgba(19,136,8,0.25), 0 0 60px rgba(255,153,51,0.15)"
        }}>
          {/* Card body */}
          <div className="rounded-2xl px-5 py-4 relative overflow-hidden" style={{
            background: "linear-gradient(135deg, #0a0a1a 0%, #0d1b2a 40%, #0a150a 100%)"
          }}>

            {/* Background glow blobs */}
            <div className="absolute top-0 left-0 w-32 h-32 rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: "#FF9933" }} />
            <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: "#138808" }} />

            {/* Sparkles */}
            <span className="sparkle-1 absolute top-3 left-12 text-yellow-300 text-sm">✦</span>
            <span className="sparkle-2 absolute top-2 right-24 text-orange-300 text-xs">★</span>
            <span className="sparkle-3 absolute bottom-3 left-1/3 text-green-300 text-xs">✦</span>
            <span className="sparkle-4 absolute bottom-2 right-16 text-yellow-200 text-sm">★</span>

            {/* Top tricolor line */}
            <div className="absolute top-0 left-0 right-0 h-[3px] flex rounded-t-2xl overflow-hidden">
              <div className="flex-1" style={{ background: "#FF9933" }} />
              <div className="flex-1 bg-white" />
              <div className="flex-1" style={{ background: "#138808" }} />
            </div>

            <div className="flex items-center gap-4 pt-1">
              {/* Ashoka Chakra */}
              <div className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center border-2 border-white/20"
                style={{ background: "radial-gradient(circle, #1a1a4e, #0a0a2a)" }}>
                <span className="id-chakra text-3xl leading-none select-none">⚙️</span>
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="id-shimmer font-extrabold text-base sm:text-lg leading-tight tracking-wide mb-0.5">
                  🇮🇳 Happy 80th Independence Day! 🇮🇳
                </p>
                <p className="text-white/80 text-xs sm:text-sm leading-snug">
                  Wishing every Indian entrepreneur freedom to dream, courage to build &amp; the strength to grow.{" "}
                  <span className="text-[#FF9933] font-semibold">Jai Hind!</span>{" "}
                  <span className="text-[#138808] font-semibold">Vande Mataram!</span>
                </p>
              </div>

              {/* Dismiss */}
              <button
                onClick={dismiss}
                aria-label="Dismiss"
                className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all text-xs font-bold border border-white/10"
              >
                ✕
              </button>
            </div>

            {/* Bottom tricolor line */}
            <div className="absolute bottom-0 left-0 right-0 h-[3px] flex rounded-b-2xl overflow-hidden">
              <div className="flex-1" style={{ background: "#FF9933" }} />
              <div className="flex-1 bg-white" />
              <div className="flex-1" style={{ background: "#138808" }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
