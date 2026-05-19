import FAQSection from "@/components/FAQSection";
import PageCTA from "@/components/PageCTA";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import type { ServicePage } from "@/lib/services-data";

export default function ServicePageLayout({ page }: { page: ServicePage }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(page.schema) }}
      />
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
            href={`https://wa.me/919989437777?text=Hi%2C%20I%20want%20to%20know%20about%20${encodeURIComponent(page.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-green px-10 py-4 rounded-xl font-bold text-base inline-flex items-center gap-2 shadow-xl"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
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
      <PageCTA ctaLabel={page.hero.cta} waText={encodeURIComponent(`Hi, I want to know about ${page.title}`)} />
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
