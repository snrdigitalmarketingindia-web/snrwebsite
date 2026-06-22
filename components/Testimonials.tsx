const aggregateRatingSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "SNR Digital Marketing",
  "url": "https://www.snrdigitalmarketing.com",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "47",
    "bestRating": "5",
    "worstRating": "1",
  },
  "review": [
    {
      "@type": "Review",
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "author": { "@type": "Organization", "name": "City Dental Clinic" },
      "reviewBody": "Within 2 weeks we started receiving quality patient enquiries every day. The Google Ads campaigns were perfectly targeted.",
    },
    {
      "@type": "Review",
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "author": { "@type": "Organization", "name": "SkyView Real Estate" },
      "reviewBody": "Our property listings started getting consistent leads through Meta Ads. Best ROI we have seen from any marketing.",
    },
    {
      "@type": "Review",
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "author": { "@type": "Organization", "name": "BrightPath Academy" },
      "reviewBody": "Student admissions doubled within one admission season. SNR redesigned our website and ran SEO that actually worked.",
    },
  ],
};

const testimonials = [
  {
    business: "City Dental Clinic",
    industry: "Healthcare · Hyderabad",
    result: "Within 2 weeks we started receiving quality patient enquiries every day. The Google Ads campaigns were perfectly targeted.",
    initial: "C",
    highlight: "Daily patient enquiries in 2 weeks",
  },
  {
    business: "SkyView Real Estate",
    industry: "Real Estate · Hyderabad",
    result: "Our property listings started getting consistent WhatsApp leads through Meta Ads. Best ROI we have seen from any marketing.",
    initial: "S",
    highlight: "Daily WhatsApp property leads",
  },
  {
    business: "BrightPath Academy",
    industry: "Education · Hyderabad",
    result: "Student admissions doubled within one admission season. SNR redesigned our website and ran SEO that actually worked.",
    initial: "B",
    highlight: "2X student admissions",
  },
];

export default function Testimonials() {
  return (
    <section className="py-28 px-6 bg-[#0A0F1E]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingSchema) }} />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Client Results
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            Businesses That Grew With Us
          </h2>
          <p className="text-slate-400 mt-4 text-lg max-w-xl mx-auto">
            Real results from real businesses across India.
          </p>
          <p className="text-slate-500 text-sm mt-2">
            We work with selected businesses to ensure measurable growth — not vanity metrics.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.business}
              className="bg-[#111C35] rounded-2xl p-7 border border-white/[0.07] flex flex-col gap-4 card-hover"
            >
              {/* Highlight badge */}
              <div className="inline-flex w-fit items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-semibold">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {t.highlight}
              </div>

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
              <div className="flex items-center gap-3 pt-3 border-t border-white/[0.06]">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-sm shrink-0">
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
