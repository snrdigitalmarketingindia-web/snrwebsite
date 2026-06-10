export default function MiniCTA() {
  return (
    <section className="py-14 px-6 bg-[#111C35] border-y border-white/[0.06]">
      <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <p className="text-white font-semibold text-xl">Want more customers? Let&apos;s talk.</p>
          <p className="text-slate-400 text-sm mt-1">Free consultation — no commitment needed.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <a
            href="mailto:snrdigitalmarketingindia@gmail.com?subject=Free%20Growth%20Audit%20Request&body=Hi%20SNR%20Digital%20Marketing%2C%0A%0AI%20would%20like%20a%20free%20consultation.%0A%0AName%3A%0ABusiness%3A%0AGoal%3A"
            className="btn-green px-6 py-3 rounded-xl font-semibold text-sm inline-flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            Email Us
          </a>
          <a
            href="mailto:snrdigitalmarketingindia@gmail.com?subject=Free%20Consultation%20Request&body=Hi%20SNR%2C%0A%0AI%20want%20to%20grow%20my%20business.%20Please%20get%20in%20touch."
            className="px-6 py-3 rounded-xl font-semibold text-sm inline-flex items-center justify-center gap-2 border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white transition-all duration-200 whitespace-nowrap"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            Get Free Audit
          </a>
        </div>
      </div>
    </section>
  );
}
