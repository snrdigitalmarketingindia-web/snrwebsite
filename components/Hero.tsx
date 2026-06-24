import RotatingTagline from "./RotatingTagline";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden glow-hero px-6 pt-32 pb-24">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Blue glow orb */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-blue-600/12 blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center fade-in-up">
        {/* Rotating industry tagline */}
        <RotatingTagline />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium mb-6">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Hyderabad&apos;s Trusted Digital Marketing Agency
        </div>

        {/* Pain line */}
        <p className="text-green-400 font-semibold text-lg sm:text-xl mb-3 tracking-wide">
          Struggling to get customers online?
        </p>

        {/* H1 */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.1] tracking-tight text-white mb-5">
          Your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
            Digital Growth
          </span>{" "}
          Partner
        </h1>

        {/* Outcome line */}
        <p className="text-lg sm:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          We help you generate daily customer enquiries using{" "}
          <span className="text-white font-medium">SEO, Google Ads, Meta Ads &amp; Websites</span>.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <a
            href="mailto:snrdigitalmarketingindia@gmail.com?subject=Free%20AI%20Business%20Growth%20Audit&body=Hi%20SNR%20Digital%20Marketing%2C%0A%0AI%20want%20a%20free%20AI%20business%20growth%20audit.%0A%0AName%3A%0ABusiness%3A%0AGoal%3A"
            className="btn-green w-full sm:w-auto px-10 py-5 rounded-xl font-bold text-lg inline-flex items-center justify-center gap-2 shadow-xl"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            Get Free AI Business Audit
          </a>
          <a
            href="mailto:snrdigitalmarketingindia@gmail.com?subject=Growth%20Expert%20Consultation&body=Hi%20SNR%2C%0A%0AI%27d%20like%20to%20speak%20with%20a%20growth%20expert.%0A%0AName%3A%0ABusiness%3A"
            className="btn-blue-outline w-full sm:w-auto px-8 py-5 rounded-xl font-semibold text-base inline-flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            Talk to Growth Expert
          </a>
        </div>

        {/* Trust line */}
        <p className="text-slate-500 text-sm mb-5">
          ✓&nbsp; Free — No commitment &nbsp;·&nbsp; ✓&nbsp; Results in 2–4 weeks &nbsp;·&nbsp; ✓&nbsp; Focused on measurable growth
        </p>

        {/* Services strip */}
        <p className="text-slate-600 text-sm tracking-wide">
          SEO &nbsp;·&nbsp; AI / GEO &nbsp;·&nbsp; Google Ads &nbsp;·&nbsp; Meta Ads &nbsp;·&nbsp; Websites &nbsp;·&nbsp; Mobile Apps
        </p>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0A0F1E] to-transparent" />
    </section>
  );
}
