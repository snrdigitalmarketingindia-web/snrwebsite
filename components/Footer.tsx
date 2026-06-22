import Link from "next/link";

const services = [
  { label: "SEO Services",          href: "/seo-services" },
  { label: "Google Ads",            href: "/google-ads-management" },
  { label: "Meta Ads",              href: "/meta-ads-management" },
  { label: "Website Development",   href: "/website-development" },
  { label: "Mobile App Dev",        href: "/mobile-app-development" },
  { label: "AI & GEO Optimization", href: "/ai-geo-optimization" },
];

const locations = [
  { label: "SEO Services Hyderabad",         href: "/seo-services-hyderabad" },
  { label: "Digital Marketing Hyderabad",    href: "/digital-marketing-hyderabad" },
  { label: "Google Ads Agency Hyderabad",    href: "/google-ads-agency-hyderabad" },
  { label: "SEO Company India",              href: "/seo-company-india" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0A0F1E] border-t border-white/[0.06] py-14 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Top grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand + NAP */}
          <div className="lg:col-span-2">
            <p className="text-white font-bold text-lg mb-2">
              SNR <span className="text-blue-400">Digital</span> Marketing
            </p>
            <p className="text-slate-400 text-sm mb-5 max-w-xs leading-relaxed">
              Hyderabad&apos;s trusted digital marketing agency helping Indian businesses get more customers online.
            </p>
            {/* NAP */}
            <div className="flex flex-col gap-2 text-sm text-slate-400">
              <span className="flex items-start gap-2">
                <svg className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                Hyderabad, Telangana, India
              </span>
              <a href="mailto:snrdigitalmarketingindia@gmail.com" className="flex items-center gap-2 hover:text-white transition-colors">
                <svg className="w-4 h-4 text-slate-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                snrdigitalmarketingindia@gmail.com
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="text-white font-semibold text-sm mb-4">Services</p>
            <ul className="flex flex-col gap-2">
              {services.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="text-slate-400 hover:text-white text-sm transition-colors">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <p className="text-white font-semibold text-sm mb-4">Locations</p>
            <ul className="flex flex-col gap-2">
              {locations.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-slate-400 hover:text-white text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <p>© {new Date().getFullYear()} SNR Digital Marketing. All rights reserved.</p>
          <p>Your Digital Growth Partner · Hyderabad, India</p>
        </div>
      </div>
    </footer>
  );
}
