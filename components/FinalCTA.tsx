export default function FinalCTA() {
  return (
    <section className="relative py-28 px-6 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-[#111C35]" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-green-500/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-blue-600/8 blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-4">
          Get Started Today
        </p>
        <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-5">
          Ready to Grow Your Business?
        </h2>
        <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          We help you get more customers online through SEO, Ads and Digital
          Marketing. Talk to us — it&apos;s free.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <a
            href="mailto:snrdigitalmarketingindia@gmail.com?subject=Free%20Business%20Growth%20Audit&body=Hi%20SNR%20Digital%20Marketing%2C%0A%0AI%20want%20a%20free%20business%20growth%20audit.%0A%0AName%3A%0ABusiness%3A%0AGoal%3A"
            className="btn-green w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-base inline-flex items-center justify-center gap-2 shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            Get Free Audit
          </a>
          <a
            href="mailto:snrdigitalmarketingindia@gmail.com?subject=Business%20Enquiry&body=Hi%20SNR%2C%0A%0AI%27d%20like%20to%20grow%20my%20business%20online.%0A%0AName%3A%0ABusiness%3A%0AGoal%3A"
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-base inline-flex items-center justify-center gap-2 border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            Email Us
          </a>
        </div>

        {/* Contact info */}
        <div className="flex items-center justify-center text-sm text-slate-500">
          <a
            href="mailto:snrdigitalmarketingindia@gmail.com"
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            snrdigitalmarketingindia@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}
