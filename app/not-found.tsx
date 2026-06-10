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
  "/contact":      "/",
  "/about":        "/",
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

        {/* WhatsApp CTA */}
        <div className="mt-8 pt-6 border-t border-white/[0.06]">
          <p className="text-slate-500 text-xs mb-3">Need help? Talk to us directly</p>
          <a
            href="https://wa.me/919989437777?text=Hi%2C%20I%20need%20help%20with%20your%20website"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 text-sm font-medium transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp: +91 99894 37777
          </a>
        </div>
      </div>
    </div>
  );
}
