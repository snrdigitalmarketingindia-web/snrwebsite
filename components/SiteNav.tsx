"use client";
import Link from "next/link";
import { useState } from "react";

const services = [
  { label: "SEO Services",           href: "/seo-services" },
  { label: "Google Ads",             href: "/google-ads-management" },
  { label: "Meta Ads",               href: "/meta-ads-management" },
  { label: "Website Development",    href: "/website-development" },
  { label: "Mobile App Development", href: "/mobile-app-development" },
  { label: "Social Media Mgmt",      href: "/social-media-management" },
  { label: "AI & GEO Optimization",  href: "/ai-geo-optimization" },
];

const allLinks = [
  ...services,
  { label: "Blog",  href: "/blog" },
  { label: "About", href: "/about" },
];

export default function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-[#0A0F1E]/95 backdrop-blur border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0" aria-label="SNR Digital Marketing — Home" onClick={() => setOpen(false)}>
          <svg viewBox="0 0 175 56" width="158" height="50" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="0" y="2" width="72" height="48" rx="11" fill="#1E3A8A"/>
            <clipPath id="snr-clip"><rect x="0" y="2" width="72" height="48" rx="11"/></clipPath>
            <polygon points="42,2 72,2 72,32" fill="#22C55E" clipPath="url(#snr-clip)"/>
            <text x="62" y="12" textAnchor="middle" dominantBaseline="middle" fontFamily="system-ui,-apple-system,sans-serif" fontSize="14" fontWeight="900" fill="white">↗</text>
            <text x="36" y="38" textAnchor="middle" fontFamily="system-ui,-apple-system,sans-serif" fontSize="24" fontWeight="800" fill="white" letterSpacing="2">SNR</text>
            <text x="76" y="21" fontFamily="system-ui,-apple-system,sans-serif" fontSize="17" fontWeight="700" fill="#7DD3FC">Digital</text>
            <text x="76" y="43" fontFamily="system-ui,-apple-system,sans-serif" fontSize="17" fontWeight="700" fill="#22C55E">Marketing</text>
          </svg>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1 flex-wrap">
          {services.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="text-slate-400 hover:text-white text-sm px-3 py-1.5 rounded-lg hover:bg-white/[0.05] transition-colors"
            >
              {s.label}
            </Link>
          ))}
          <Link href="/blog" className="text-slate-400 hover:text-white text-sm px-3 py-1.5 rounded-lg hover:bg-white/[0.05] transition-colors">Blog</Link>
          <Link href="/about" className="text-slate-400 hover:text-white text-sm px-3 py-1.5 rounded-lg hover:bg-white/[0.05] transition-colors">About</Link>
        </div>

        <div className="flex items-center gap-3">
          {/* CTA — always visible */}
          <a
            href="mailto:snrdigitalmarketingindia@gmail.com?subject=Free%20Growth%20Audit%20Request&body=Hi%20SNR%20Digital%20Marketing%2C%0A%0AI%20would%20like%20a%20free%20growth%20audit%20for%20my%20business.%0A%0AName%3A%0ABusiness%3A%0AGoal%3A"
            className="btn-green px-5 py-2.5 rounded-xl font-semibold text-sm flex-shrink-0"
          >
            Free Audit
          </a>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 rounded-lg hover:bg-white/[0.05] transition-colors"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`block w-5 h-0.5 bg-slate-300 transition-all duration-200 ${open ? "rotate-45 translate-y-1" : "-translate-y-1"}`} />
            <span className={`block w-5 h-0.5 bg-slate-300 transition-all duration-200 ${open ? "opacity-0" : "opacity-100"}`} />
            <span className={`block w-5 h-0.5 bg-slate-300 transition-all duration-200 ${open ? "-rotate-45 -translate-y-1" : "translate-y-1"}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#0A0F1E] border-t border-white/[0.06] px-6 py-4 flex flex-col gap-1">
          {allLinks.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              onClick={() => setOpen(false)}
              className="text-slate-300 hover:text-white text-sm px-3 py-3 rounded-lg hover:bg-white/[0.05] transition-colors border-b border-white/[0.04] last:border-0"
            >
              {s.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
