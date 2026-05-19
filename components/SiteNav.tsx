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
        <Link href="/" className="text-white font-bold text-lg tracking-tight flex-shrink-0">
          SNR <span className="text-blue-400">Digital</span>
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
            href="/dashboard"
            className="text-slate-400 hover:text-white text-sm px-3 py-1.5 rounded-lg hover:bg-white/[0.05] transition-colors flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            Dashboard
          </Link>
          <Link
            href="/campaigns"
            className="text-slate-400 hover:text-white text-sm px-3 py-1.5 rounded-lg hover:bg-white/[0.05] transition-colors flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            Campaigns
          </Link>
        </div>

        <a
          href="https://wa.me/919989437777?text=Hi%2C%20I%20want%20to%20grow%20my%20business%20online"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-green px-5 py-2.5 rounded-xl font-semibold text-sm flex-shrink-0"
        >
          Free Audit
        </a>
      </div>
    </nav>
  );
}
