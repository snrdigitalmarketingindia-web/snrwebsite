import FAQSection from "@/components/FAQSection";
import PageCTA from "@/components/PageCTA";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import type { LocationPage } from "@/lib/services-data";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "SNR Digital Marketing",
  "description": "Digital marketing agency in Hyderabad offering SEO, Google Ads, Meta Ads, and website development services.",
  "url": "https://snrdigitalmarketing.com",
  "email": "snrdigitalmarketingindia@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Hyderabad",
    "addressRegion": "Telangana",
    "addressCountry": "IN",
  },
  "areaServed": ["Hyderabad", "Secunderabad", "Telangana", "India"],
  "sameAs": [
    "https://www.facebook.com/snrdigitalmarketing",
    "https://www.instagram.com/snrdigitalmarketing",
  ],
};

export default function LocationPageLayout({ page }: { page: LocationPage }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      {/* Hero */}
      <section className="relative py-24 px-6 bg-[#0A0F1E] overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            {page.city} · {page.service}
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-5">
            {page.hero.heading}
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">{page.hero.subheading}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`mailto:snrdigitalmarketingindia@gmail.com?subject=${encodeURIComponent(`Enquiry: ${page.service} in ${page.city}`)}&body=Hi%20SNR%20Digital%20Marketing%2C%0A%0AI%20want%20${encodeURIComponent(page.service)}%20services%20in%20${encodeURIComponent(page.city)}.%0A%0AName%3A%0ABusiness%3A%0AGoal%3A`}
              className="btn-green px-10 py-4 rounded-xl font-bold text-base inline-flex items-center gap-2 shadow-xl"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              Get Free Consultation
            </a>
            <a
              href="mailto:snrdigitalmarketingindia@gmail.com?subject=Quick%20Enquiry&body=Hi%20SNR%2C%0A%0AI%20have%20a%20quick%20question."
              className="btn-blue-outline px-8 py-4 rounded-xl font-semibold text-base inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              Email Us
            </a>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 px-6 bg-[#111C35]">
        <div className="max-w-3xl mx-auto">
          <p className="text-slate-300 text-lg leading-relaxed">{page.intro}</p>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20 px-6 bg-[#0A0F1E]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">
            Why Choose SNR Digital Marketing?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {page.whyUs.map((w) => (
              <div key={w.title} className="bg-[#111C35] rounded-2xl p-6 border border-white/[0.07]">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">{w.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{w.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection faqs={page.faqs} />
      <PageCTA
        heading={`Ready to Grow Your Business in ${page.city}?`}
        subject={encodeURIComponent(`Enquiry: ${page.service} in ${page.city}`)}
      />
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
