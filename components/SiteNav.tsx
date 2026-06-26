import Link from "next/link";

const services = [
  { label: "SEO Services",           href: "/seo-services" },
  { label: "Google Ads",             href: "/google-ads-management" },
  { label: "Meta Ads",               href: "/meta-ads-management" },
  { label: "Website Development",    href: "/website-development" },
  { label: "Mobile App Development", href: "/mobile-app-development" },
  { label: "AI & GEO Optimization",  href: "/ai-geo-optimization" },
];

export default function SiteNav() {
  return (
    <nav className="sticky top-0 z-40 bg-[#0A0F1E]/95 backdrop-blur border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex-shrink-0" aria-label="SNR Digital Marketing — Home">
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
          <Link
            href="/blog"
            className="text-slate-400 hover:text-white text-sm px-3 py-1.5 rounded-lg hover:bg-white/[0.05] transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/about"
            className="text-slate-400 hover:text-white text-sm px-3 py-1.5 rounded-lg hover:bg-white/[0.05] transition-colors"
          >
            About
          </Link>
        </div>

        <a
          href="mailto:snrdigitalmarketingindia@gmail.com?subject=Free%20Growth%20Audit%20Request&body=Hi%20SNR%20Digital%20Marketing%2C%0A%0AI%20would%20like%20a%20free%20growth%20audit%20for%20my%20business.%0A%0AName%3A%0ABusiness%3A%0AGoal%3A"
          className="btn-green px-5 py-2.5 rounded-xl font-semibold text-sm flex-shrink-0"
        >
          Free Audit
        </a>
      </div>
    </nav>
  );
}
