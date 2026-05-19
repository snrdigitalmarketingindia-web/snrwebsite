export default function LeadMagnet() {
  return (
    <section className="relative py-28 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-[#0A0F1E]" />
      {/* Green tint glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-green-500/6 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="bg-gradient-to-br from-[#111C35] to-[#0D1528] rounded-3xl p-10 sm:p-14 border border-green-500/20 shadow-2xl text-center">
          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>

          {/* Label */}
          <p className="text-green-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Free — No Obligation
          </p>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-snug">
            Get a Free Business Growth Audit
          </h2>

          {/* Subtext */}
          <p className="text-slate-400 text-base sm:text-lg mb-4 max-w-xl mx-auto leading-relaxed">
            We analyze your business online presence and show you exactly how to get more customers — at no cost.
          </p>

          {/* What you get */}
          <ul className="text-slate-300 text-sm text-left max-w-sm mx-auto mb-8 space-y-2">
            {[
              "SEO health check of your website",
              "Competitor analysis in your industry",
              "Top 3 growth opportunities for your business",
              "Recommended ad strategy with expected ROI",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <svg className="w-4 h-4 text-green-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </li>
            ))}
          </ul>

          {/* Urgency */}
          <p className="text-amber-400/80 text-sm font-medium mb-6">
            ⚡ Limited free audits available this month — We work with selected businesses only
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/919989437777?text=Hi%2C%20I%20want%20a%20Free%20Business%20Growth%20Audit"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-green px-8 py-4 rounded-xl font-bold text-base inline-flex items-center justify-center gap-2 shadow-lg"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Get My Free Audit
            </a>
            <a
              href="tel:+919989437777"
              className="btn-blue-outline px-8 py-4 rounded-xl font-semibold text-base inline-flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call +91 9989437777
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
