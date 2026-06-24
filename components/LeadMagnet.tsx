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
              href="mailto:snrdigitalmarketingindia@gmail.com?subject=Free%20Business%20Growth%20Audit&body=Hi%20SNR%20Digital%20Marketing%2C%0A%0AI%20want%20a%20free%20business%20growth%20audit.%0A%0AName%3A%0ABusiness%3A%0AGoal%3A"
              className="btn-green px-8 py-4 rounded-xl font-bold text-base inline-flex items-center justify-center gap-2 shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              Get My Free Audit
            </a>
            <a
              href="mailto:snrdigitalmarketingindia@gmail.com?subject=Quick%20Enquiry&body=Hi%20SNR%2C%0A%0AI%20have%20a%20quick%20question."
              className="btn-blue-outline px-8 py-4 rounded-xl font-semibold text-base inline-flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              Email Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
