const steps = [
  {
    number: "01",
    title: "Understand Your Business",
    description: "We deep-dive into your industry, competitors, and customer base.",
  },
  {
    number: "02",
    title: "Create Strategy",
    description: "A custom growth plan built around your goals and budget.",
  },
  {
    number: "03",
    title: "Run Campaigns",
    description: "Launch and optimize ads, SEO, and content that actually converts.",
  },
  {
    number: "04",
    title: "Deliver Customers",
    description: "Track results, report transparently, and scale what works.",
  },
];

export default function Process() {
  return (
    <section className="py-24 px-6 bg-[#0B0F19]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-3">
            How It Works
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            Our Simple Process
          </h2>
          <p className="text-gray-400 mt-4 text-lg max-w-xl mx-auto">
            From first call to measurable growth — here&apos;s how we work.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-10 left-[calc(12.5%+1rem)] right-[calc(12.5%+1rem)] h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-4">
                {/* Number circle */}
                <div className="relative w-20 h-20 rounded-full bg-blue-500/10 border-2 border-blue-500/40 flex items-center justify-center z-10">
                  <span className="text-2xl font-bold text-blue-400">{step.number}</span>
                </div>
                <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed max-w-[200px]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
