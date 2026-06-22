import type { Metadata } from "next";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Link from "next/link";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.snrdigitalmarketing.com/about" },
  title: "About SNR Digital Marketing — Hyderabad Digital Marketing Agency",
  description:
    "SNR Digital Marketing is a Hyderabad-based digital marketing agency founded by Srinivas Reddy in 2024. We help Indian businesses grow online through SEO, Google Ads, Meta Ads, and GEO.",
};

const founderSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Srinivas Reddy",
  "jobTitle": "Founder & Digital Marketing Strategist",
  "worksFor": {
    "@type": "Organization",
    "name": "SNR Digital Marketing",
    "url": "https://www.snrdigitalmarketing.com",
  },
  "url": "https://www.snrdigitalmarketing.com/about",
  "knowsAbout": [
    "SEO", "Google Ads", "Meta Ads", "Generative Engine Optimization",
    "Local SEO", "Website Development", "Digital Marketing Strategy",
  ],
};

const services = [
  { icon: "🔍", title: "SEO Services", desc: "Rank higher on Google and capture organic leads every day." },
  { icon: "📡", title: "GEO / AI SEO", desc: "Get cited by ChatGPT, Gemini, and Perplexity for your industry." },
  { icon: "📢", title: "Google Ads", desc: "Pay-per-click campaigns with maximum ROI and zero wasted spend." },
  { icon: "📘", title: "Meta Ads", desc: "Facebook & Instagram ads that generate daily enquiries." },
  { icon: "🌐", title: "Website Development", desc: "Fast, conversion-optimised websites that rank and convert." },
  { icon: "📱", title: "Mobile App Development", desc: "Native and cross-platform apps for Indian businesses." },
];

const values = [
  { title: "Results First", desc: "Every strategy is tied to a measurable business outcome — leads, sales, or revenue. Vanity metrics don't pay salaries." },
  { title: "Radical Transparency", desc: "You get full visibility into your campaigns, spend, and results. No black boxes, no hidden fees." },
  { title: "Indian Market Expertise", desc: "We understand how Indian customers search, browse, and buy — and we build campaigns around that reality." },
  { title: "Speed to Results", desc: "Our clients see measurable results in 60–90 days, not 12 months. We prioritise quick wins alongside long-term growth." },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(founderSchema) }}
      />

      {/* Hero */}
      <section className="relative py-24 px-6 bg-[#0A0F1E] overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-4">About Us</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-5">
            Hyderabad&apos;s Digital Marketing Agency <br className="hidden sm:block" />
            Built for Real Business Growth
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Founded in 2024, SNR Digital Marketing helps Indian businesses get more customers online through SEO, Google Ads, Meta Ads, and the latest AI search optimisation strategies.
          </p>
        </div>
      </section>

      {/* Founder section */}
      <section className="py-20 px-6 bg-[#111C35]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              {/* Avatar placeholder */}
              <div className="w-32 h-32 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mb-6">
                <span className="text-5xl font-bold text-blue-400">S</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-1">Srinivas Reddy</h2>
              <p className="text-blue-400 text-sm font-medium mb-4">Founder & Digital Marketing Strategist</p>
              <p className="text-slate-300 leading-relaxed mb-4">
                Srinivas Reddy founded SNR Digital Marketing in 2024 with a single mission: give Indian businesses access to the same high-quality digital marketing strategies used by large enterprises — at a price that makes sense for growing businesses.
              </p>
              <p className="text-slate-400 leading-relaxed mb-6">
                With hands-on expertise in SEO, paid advertising, and the emerging field of Generative Engine Optimization (GEO), Srinivas leads every client engagement with a focus on measurable outcomes and transparent reporting.
              </p>
              <div className="flex gap-3">
                <a
                  href="mailto:snrdigitalmarketingindia@gmail.com"
                  className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  Get in touch
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {[
                { label: "Founded", value: "2024" },
                { label: "Location", value: "Hyderabad, Telangana" },
                { label: "Specialisation", value: "SEO, GEO, Google Ads, Meta Ads" },
                { label: "Markets Served", value: "India — all major cities" },
                { label: "Languages", value: "English, Telugu, Hindi" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4 bg-[#0A0F1E] rounded-xl p-4 border border-white/[0.07]">
                  <p className="text-slate-500 text-sm w-36 flex-shrink-0">{item.label}</p>
                  <p className="text-white text-sm font-medium">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-6 bg-[#0A0F1E]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
          <div className="flex flex-col gap-4 text-slate-300 leading-relaxed text-base">
            <p>
              SNR Digital Marketing was born from a frustration that many Indian business owners share: paying for digital marketing without seeing real results. Too many agencies promise Page 1 rankings in 30 days and deliver nothing but reports full of impressions and clicks that never turned into customers.
            </p>
            <p>
              We started with a different philosophy — every rupee spent on marketing should be traceable to a business outcome. Whether that&apos;s a lead from a Google Ad, a new patient from an SEO article, or a property enquiry from a Meta campaign, we build our strategies around what actually matters to your business.
            </p>
            <p>
              Based in Hyderabad, we understand the local market deeply. We know how a clinic owner in Banjara Hills thinks differently from a software startup in HITEC City, and we tailor our approach accordingly. We also stay ahead of emerging trends — including Generative Engine Optimization (GEO), which ensures your business gets cited by AI tools like ChatGPT, Gemini, and Perplexity.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-6 bg-[#111C35]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">What We Do</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s) => (
              <div key={s.title} className="bg-[#0A0F1E] rounded-2xl p-6 border border-white/[0.07]">
                <span className="text-3xl mb-4 block">{s.icon}</span>
                <h3 className="text-white font-semibold mb-2">{s.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6 bg-[#0A0F1E]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">How We Work</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {values.map((v) => (
              <div key={v.title} className="bg-[#111C35] rounded-2xl p-6 border border-white/[0.07]">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">{v.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-[#111C35]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Work Together?</h2>
          <p className="text-slate-400 mb-8">Get a free growth audit for your business — no commitment, no hard sell.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:snrdigitalmarketingindia@gmail.com?subject=Free%20Growth%20Audit%20Request&body=Hi%20Srinivas%2C%0A%0AI%20would%20like%20a%20free%20growth%20audit%20for%20my%20business.%0A%0AName%3A%0ABusiness%3A%0AGoal%3A"
              className="btn-green px-8 py-4 rounded-xl font-bold text-sm inline-flex items-center gap-2"
            >
              Get Free Audit
            </a>
            <Link href="/contact" className="btn-blue-outline px-8 py-4 rounded-xl font-semibold text-sm">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
