const testimonials = [
  {
    business: "City Dental Clinic",
    industry: "Healthcare",
    result: "Got 3x more patient enquiries within 2 weeks of running Google Ads.",
    initial: "C",
  },
  {
    business: "SkyView Real Estate",
    industry: "Real Estate",
    result: "Our property listings started getting daily WhatsApp leads through Meta Ads.",
    initial: "S",
  },
  {
    business: "BrightPath Academy",
    industry: "Education",
    result: "Student admissions doubled after we redesigned the website and ran SEO.",
    initial: "B",
  },
  {
    business: "Spice Garden Restaurant",
    industry: "Hospitality",
    result: "Online orders increased by 60% within the first month of digital marketing.",
    initial: "S",
  },
];

export default function Testimonials() {
  return (
    <section className="py-28 px-6 bg-[#0A0F1E]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Results
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            Businesses That Grew With Us
          </h2>
          <p className="text-slate-400 mt-4 text-lg max-w-xl mx-auto">
            Real results from real businesses across India.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.business}
              className="bg-[#111C35] rounded-2xl p-7 border border-white/[0.07] flex flex-col gap-4 card-hover"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-slate-300 text-sm leading-relaxed flex-1">
                &ldquo;{t.result}&rdquo;
              </p>

              {/* Business */}
              <div className="flex items-center gap-3 pt-2 border-t border-white/[0.06]">
                <div className="w-9 h-9 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-sm">
                  {t.initial}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{t.business}</p>
                  <p className="text-slate-500 text-xs">{t.industry}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
