const industries = [
  "Hospitals",
  "Clinics",
  "Real Estate",
  "Education",
  "Startups",
  "Retail",
  "E-commerce",
  "Restaurants",
];

export default function TrustStrip() {
  return (
    <section className="bg-[#111C35] py-12 px-6 border-y border-white/[0.06]">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-white font-semibold text-lg mb-2">
          Trusted by Growing Businesses Across India
        </p>
        <p className="text-slate-400 text-sm mb-8">
          We work with businesses in every industry to get more customers online
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {industries.map((ind) => (
            <span
              key={ind}
              className="px-4 py-2 rounded-full bg-white/[0.05] border border-white/[0.08] text-slate-300 text-sm font-medium"
            >
              {ind}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
