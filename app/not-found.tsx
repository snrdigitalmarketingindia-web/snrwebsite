/* GitHub Pages 404 — JS redirect map for GSC fix.
   Next.js renders this as 404.html in the static export (out/404.html).
   GitHub Pages serves this file for every unmatched URL. */

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/* ── Redirect map ────────────────────────────────────────────────────────────
   Add any old URLs here that GSC reports as 404s.
   Format: "/old-path": "/new-path"
   ──────────────────────────────────────────────────────────────────────── */
const REDIRECT_MAP: Record<string, string> = {
  // Old GitHub Pages paths (before custom domain)
  "/snrwebsite":                              "/",
  "/snrwebsite/":                             "/",
  "/snrwebsite/blog":                         "/blog",
  "/snrwebsite/dashboard":                    "/dashboard",
  "/snrwebsite/campaigns":                    "/campaigns",
  "/snrwebsite/admin":                        "/admin",
  "/snrwebsite/seo-services":                 "/seo-services",
  "/snrwebsite/google-ads-management":        "/google-ads-management",
  "/snrwebsite/meta-ads-management":          "/meta-ads-management",
  "/snrwebsite/website-development":          "/website-development",
  "/snrwebsite/mobile-app-development":       "/mobile-app-development",
  "/snrwebsite/ai-geo-optimization":          "/ai-geo-optimization",
  "/snrwebsite/seo-services-hyderabad":       "/seo-services-hyderabad",
  "/snrwebsite/seo-company-india":            "/seo-company-india",
  "/snrwebsite/digital-marketing-hyderabad":  "/digital-marketing-hyderabad",
  "/snrwebsite/google-ads-agency-hyderabad":  "/google-ads-agency-hyderabad",

  // Common crawl / junk paths
  "/index.html":   "/",
  "/index.php":    "/",
  "/home":         "/",
  "/services":     "/seo-services",
  "/contact":      "/contact",
  "/about":        "/about",
};

/* ── Strip junk query params from homepage ──────────────────────────────── */
const JUNK_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_term",
                     "utm_content", "fbclid", "gclid", "msclkid", "ref",
                     "_ga", "sessionid", "sid", "__cf_chl_tk"];

export default function NotFound() {
  const [redirecting, setRedirecting] = useState(false);
  const [target, setTarget]           = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const path   = window.location.pathname.replace(/\/$/, "") || "/";
    const search = window.location.search;

    // 1. Check redirect map (exact match)
    if (REDIRECT_MAP[path]) {
      setTarget(REDIRECT_MAP[path]);
      setRedirecting(true);
      window.location.replace(REDIRECT_MAP[path]);
      return;
    }

    // 2. Check redirect map (with trailing slash stripped)
    const pathNoSlash = path.replace(/\/$/, "");
    if (REDIRECT_MAP[pathNoSlash]) {
      setTarget(REDIRECT_MAP[pathNoSlash]);
      setRedirecting(true);
      window.location.replace(REDIRECT_MAP[pathNoSlash]);
      return;
    }

    // 3. Strip junk query params from homepage
    if (path === "/" || path === "") {
      const params = new URLSearchParams(search);
      let dirty = false;
      JUNK_PARAMS.forEach((p) => { if (params.has(p)) { params.delete(p); dirty = true; } });
      if (dirty) {
        const clean = params.toString() ? `/?${params.toString()}` : "/";
        window.history.replaceState({}, "", clean);
      }
    }
  }, []);

  if (redirecting) {
    return (
      <div className="min-h-screen bg-[#0A0F1E] flex items-center justify-center">
        <div className="text-center">
          <svg className="w-8 h-8 text-blue-400 animate-spin mx-auto mb-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          <p className="text-slate-400 text-sm">Redirecting{target ? ` to ${target}` : ""}…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0F1E] flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        {/* 404 number */}
        <p className="text-8xl font-black text-white/[0.07] select-none mb-2">404</p>

        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-blue-600/15 border border-blue-500/20 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-white mb-3">Page Not Found</h1>
        <p className="text-slate-400 text-sm mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        {/* Quick links */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {[
            { label: "Home",              href: "/" },
            { label: "SEO Services",      href: "/seo-services" },
            { label: "Google Ads",        href: "/google-ads-management" },
            { label: "Meta Ads",          href: "/meta-ads-management" },
            { label: "Blog",              href: "/blog" },
            { label: "Website Dev",       href: "/website-development" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="bg-[#111C35] border border-white/[0.07] rounded-xl px-4 py-3 text-slate-300 text-sm hover:text-white hover:border-white/[0.14] transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors text-sm"
        >
          ← Back to Home
        </Link>

        {/* Email CTA */}
        <div className="mt-8 pt-6 border-t border-white/[0.06]">
          <p className="text-slate-500 text-xs mb-3">Need help? Email us directly</p>
          <a
            href="mailto:snrdigitalmarketingindia@gmail.com?subject=Need%20Help&body=Hi%20SNR%2C%0A%0AI%20could%20not%20find%20the%20page%20I%20was%20looking%20for.%20Can%20you%20help%20me%3F"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            snrdigitalmarketingindia@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
}
