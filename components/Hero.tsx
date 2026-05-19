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
            href="https://wa.me/919989437777?text=Hi%2C%20I%20want%20a%20Free%20AI%20Business%20Growth%20Audit"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-green w-full sm:w-auto px-10 py-5 rounded-xl font-bold text-lg inline-flex items-center justify-center gap-2 shadow-xl"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Get Free AI Business Audit
          </a>
          <a
            href="tel:+919989437777"
            className="btn-blue-outline w-full sm:w-auto px-8 py-5 rounded-xl font-semibold text-base inline-flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
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
