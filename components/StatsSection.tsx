const stats = [
  { number: "500+", label: "Leads Generated", sublabel: "For our clients every month" },
  { number: "50+",  label: "Businesses Helped", sublabel: "Across India" },
  { number: "10X",  label: "Average Growth", sublabel: "For our clients" },
  { number: "Pan India", label: "Reach", sublabel: "Hyderabad & beyond" },
];

export default function StatsSection() {
  return (
    <section className="py-16 px-6 bg-[#111C35] border-y border-white/[0.06]">
      <div className="max-w-5xl mx-auto">
        <p className="text-center text-slate-400 text-sm font-medium uppercase tracking-widest mb-10">
          Helping growing businesses across India achieve real results
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div
              key={i}
              className="stat-pop text-center p-6 rounded-2xl bg-[#0A0F1E] border border-white/[0.07]"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <p className="text-4xl sm:text-5xl font-bold text-white mb-1">{s.number}</p>
              <p className="text-blue-400 font-semibold text-sm mb-1">{s.label}</p>
              <p className="text-slate-500 text-xs">{s.sublabel}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
