import FAQSection from "@/components/FAQSection";
import PageCTA from "@/components/PageCTA";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import type { ServicePage } from "@/lib/services-data";

const BASE = "https://www.snrdigitalmarketing.com";

export default function ServicePageLayout({ page }: { page: ServicePage }) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE },
      { "@type": "ListItem", "position": 2, "name": page.title, "item": `${BASE}/${page.slug}` },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `How ${page.title} Works — SNR Digital Marketing`,
    "step": page.process.map((p) => ({
      "@type": "HowToStep",
      "position": p.step,
      "name": p.title,
      "text": p.desc,
    })),
  };

  const speakableSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": page.metaTitle,
    "speakable": { "@type": "SpeakableSpecification", "cssSelector": ["h1", "h2"] },
    "url": `${BASE}/${page.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(page.schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      {/* Hero */}
      <section className="relative py-24 px-6 bg-[#0A0F1E] overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-4">
            {page.hero.badge}
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-5">
            {page.hero.heading}
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
            {page.hero.subheading}
          </p>
          <a
            href={`mailto:snrdigitalmarketingindia@gmail.com?subject=${encodeURIComponent(`Enquiry: ${page.title}`)}&body=Hi%20SNR%20Digital%20Marketing%2C%0A%0AI%20want%20to%20know%20more%20about%20${encodeURIComponent(page.title)}.%0A%0AName%3A%0ABusiness%3A%0AGoal%3A`}
            className="btn-green px-10 py-4 rounded-xl font-bold text-base inline-flex items-center gap-2 shadow-xl"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            {page.hero.cta}
          </a>
        </div>
      </section>

      {/* Results strip */}
      <section className="py-12 px-6 bg-[#111C35] border-y border-white/[0.06]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6">
          {page.results.map((r) => (
            <div key={r.label} className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-blue-400">{r.stat}</p>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">{r.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 px-6 bg-[#0A0F1E]">
        <div className="max-w-3xl mx-auto">
          <p className="text-slate-300 text-lg leading-relaxed">{page.intro}</p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-6 bg-[#111C35]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">
            What&apos;s Included
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {page.benefits.map((b) => (
              <div key={b.title} className="bg-[#0A0F1E] rounded-2xl p-6 border border-white/[0.07]">
                <span className="text-3xl mb-4 block">{b.icon}</span>
                <h3 className="text-white font-semibold mb-2">{b.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-6 bg-[#0A0F1E]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">
            How We Work
          </h2>
          <div className="flex flex-col gap-5">
            {page.process.map((p, i) => (
              <div key={p.title} className="flex gap-5 items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                  {p.step}
                </div>
                <div className="pt-1">
                  <h3 className="text-white font-semibold mb-1">{p.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>
                  {i < page.process.length - 1 && (
                    <div className="mt-5 ml-[-22px] w-px h-5 bg-white/10" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection faqs={page.faqs} />
      <PageCTA ctaLabel={page.hero.cta} subject={encodeURIComponent(`Enquiry: ${page.title}`)} />
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
