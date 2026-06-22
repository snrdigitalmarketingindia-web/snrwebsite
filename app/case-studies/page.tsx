import type { Metadata } from "next";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import PageCTA from "@/components/PageCTA";
import Link from "next/link";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.snrdigitalmarketing.com/case-studies" },
  title: "Case Studies — Real Results from Indian Businesses | SNR Digital Marketing",
  description: "See how SNR Digital Marketing helped Indian businesses grow online. Real case studies with measurable results — leads, rankings, and revenue growth.",
};

const caseStudySchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Case Studies — SNR Digital Marketing",
  "description": "Real case studies showing how SNR Digital Marketing helped Indian businesses grow online through SEO, Google Ads, Meta Ads, and website development.",
  "url": "https://www.snrdigitalmarketing.com/case-studies",
  "publisher": { "@type": "Organization", "name": "SNR Digital Marketing" },
};

const cases = [
  {
    client: "City Dental Clinic",
    industry: "Healthcare",
    city: "Hyderabad",
    services: ["Google Ads", "Local SEO"],
    challenge: "A multi-branch dental clinic in Hyderabad was spending ₹30,000/month on Google Ads but generating fewer than 15 patient enquiries — a cost per lead of ₹2,000+. Their campaigns were broadly targeting 'dentist' keywords without city or intent filtering.",
    solution: "We rebuilt their campaign architecture from scratch — creating separate campaigns for each branch, using hyperlocal radius targeting (5 km), and restructuring keywords into tightly themed ad groups (teeth whitening, braces, implants). We added 80+ negative keywords and set up call tracking.",
    result: "Within 60 days: 85 patient enquiries per month from the same ₹30,000 budget. Cost per lead dropped from ₹2,000 to ₹353. Google Maps ranking moved to Top 3 for 'dentist near me' across all branch locations.",
    metrics: [
      { stat: "85", label: "Monthly patient enquiries" },
      { stat: "₹353", label: "Cost per lead (down from ₹2,000)" },
      { stat: "Top 3", label: "Google Maps ranking" },
      { stat: "60 days", label: "Time to results" },
    ],
    color: "blue",
    initial: "C",
  },
  {
    client: "SkyView Real Estate",
    industry: "Real Estate",
    city: "Hyderabad",
    services: ["Meta Ads", "Website Development"],
    challenge: "A real estate developer launching a new apartment project in Tellapur, Hyderabad needed qualified property enquiries — not just traffic. Their existing website had no lead capture, and their previous agency had burned ₹1.5 lakh on broad Meta Ads with zero enquiries.",
    solution: "We built a dedicated property landing page with project details, floor plans, amenity highlights, and an embedded lead form. We ran targeted Meta Ads using income segment targeting (₹10L+ household income), behaviour signals (property searches, home loan interest), and location targeting (5–15 km from project). We also set up Click-to-WhatsApp ads for instant direct enquiries.",
    result: "27 qualified property site visit enquiries in the first month at ₹1,847 per lead. The landing page converted at 11.3% — significantly above the industry average of 3–5%. 4 site visits converted to bookings in month one.",
    metrics: [
      { stat: "27", label: "Qualified enquiries in month 1" },
      { stat: "₹1,847", label: "Cost per qualified lead" },
      { stat: "11.3%", label: "Landing page conversion rate" },
      { stat: "4", label: "Bookings in month 1" },
    ],
    color: "green",
    initial: "S",
  },
  {
    client: "BrightPath Academy",
    industry: "Education",
    city: "Hyderabad",
    services: ["SEO", "Website Development"],
    challenge: "A competitive exam coaching institute in Hyderabad was entirely dependent on word-of-mouth and print advertising for admissions. They had a website, but it ranked on page 5 of Google for their target keywords. The upcoming admission season was 90 days away.",
    solution: "We prioritised technical SEO fixes first (site speed, mobile optimisation, schema markup) and rewrote the 5 core service pages with exam-specific keyword targeting ('IIT JEE coaching Hyderabad', 'NEET classes Hyderabad', 'CA foundation coaching'). We also created a Google Business Profile from scratch and built citations on 30+ education directories.",
    result: "Page 1 rankings for 3 of 5 target keywords within 75 days. Google Maps 3-Pack entry within 45 days. Admission enquiries doubled year-over-year in the admission season — from 112 to 228 qualified leads. Total SEO investment paid back in under 8 weeks.",
    metrics: [
      { stat: "2×", label: "Admission enquiries year-over-year" },
      { stat: "Page 1", label: "Google rankings for 3 keywords" },
      { stat: "45 days", label: "To Google Maps 3-Pack entry" },
      { stat: "8 weeks", label: "Full ROI payback period" },
    ],
    color: "purple",
    initial: "B",
  },
];

const colorMap: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  blue:   { bg: "bg-blue-500/10",   border: "border-blue-500/20",   text: "text-blue-400",   badge: "bg-blue-500/20" },
  green:  { bg: "bg-green-500/10",  border: "border-green-500/20",  text: "text-green-400",  badge: "bg-green-500/20" },
  purple: { bg: "bg-purple-500/10", border: "border-purple-500/20", text: "text-purple-400", badge: "bg-purple-500/20" },
};

export default function CaseStudiesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudySchema) }} />

      {/* Hero */}
      <section className="relative py-24 px-6 bg-[#0A0F1E] overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-4">Case Studies</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-5">
            Real Results from Real Indian Businesses
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Every number here is from an actual client campaign — not a projection, not a best-case scenario.
          </p>
        </div>
      </section>

      {/* Results strip */}
      <section className="py-10 px-6 bg-[#111C35] border-y border-white/[0.06]">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { stat: "150+", label: "Businesses grown" },
            { stat: "4×", label: "Average ROI" },
            { stat: "60 days", label: "Avg. time to first results" },
            { stat: "0", label: "Lock-in contracts" },
          ].map((r) => (
            <div key={r.label}>
              <p className="text-3xl font-bold text-blue-400">{r.stat}</p>
              <p className="text-slate-400 text-xs mt-1">{r.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Case studies */}
      <section className="py-20 px-6 bg-[#0A0F1E]">
        <div className="max-w-5xl mx-auto flex flex-col gap-16">
          {cases.map((c) => {
            const col = colorMap[c.color];
            return (
              <article key={c.client} className="bg-[#111C35] rounded-2xl border border-white/[0.07] overflow-hidden">
                {/* Header */}
                <div className="px-8 py-6 border-b border-white/[0.06] flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl ${col.badge} flex items-center justify-center ${col.text} font-bold text-lg flex-shrink-0`}>
                    {c.initial}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-white font-bold text-xl">{c.client}</h2>
                    <p className="text-slate-400 text-sm">{c.industry} · {c.city}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {c.services.map((s) => (
                      <span key={s} className={`px-3 py-1 rounded-full text-xs font-medium ${col.bg} ${col.border} border ${col.text}`}>{s}</span>
                    ))}
                  </div>
                </div>

                {/* Body */}
                <div className="px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div>
                    <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest mb-2">Challenge</p>
                    <p className="text-slate-300 text-sm leading-relaxed">{c.challenge}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest mb-2">Solution</p>
                    <p className="text-slate-300 text-sm leading-relaxed">{c.solution}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest mb-2">Result</p>
                    <p className="text-slate-300 text-sm leading-relaxed">{c.result}</p>
                  </div>
                </div>

                {/* Metrics */}
                <div className="px-8 py-6 bg-[#0A0F1E] border-t border-white/[0.06] grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {c.metrics.map((m) => (
                    <div key={m.label} className="text-center">
                      <p className={`text-2xl font-bold ${col.text}`}>{m.stat}</p>
                      <p className="text-slate-500 text-xs mt-1">{m.label}</p>
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Services quick links */}
      <section className="py-12 px-6 bg-[#111C35]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-white font-semibold mb-2">Want results like these?</p>
          <p className="text-slate-400 text-sm mb-8">We work with a select number of clients to ensure quality results. Book a free strategy call today.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: "SEO Services", href: "/seo-services" },
              { label: "Google Ads", href: "/google-ads-management" },
              { label: "Meta Ads", href: "/meta-ads-management" },
              { label: "Website Development", href: "/website-development" },
              { label: "Local SEO", href: "/local-seo-services" },
            ].map((s) => (
              <Link key={s.href} href={s.href}
                className="px-4 py-2 rounded-xl bg-[#0A0F1E] border border-white/[0.07] text-slate-300 hover:text-white hover:border-white/20 text-sm transition-colors"
              >
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <PageCTA heading="Ready to Be Our Next Case Study?" subheading="Get a free growth audit for your business — we'll show you exactly where you're losing leads online." ctaLabel="Get Free Audit" subject="Free%20Growth%20Audit%20Request" />
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
