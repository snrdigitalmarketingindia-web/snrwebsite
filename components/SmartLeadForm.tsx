"use client";
import { useState } from "react";
import { trackFormStep, trackFormSubmit, trackWhatsApp } from "@/lib/analytics";

const businessTypes = [
  { value: "Hospital / Clinic", icon: "🏥" },
  { value: "Real Estate",       icon: "🏠" },
  { value: "Education",         icon: "🎓" },
  { value: "E-commerce",        icon: "🛒" },
  { value: "Startup",           icon: "🚀" },
  { value: "Other Business",    icon: "💼" },
];

const goals = [
  { value: "More Leads & Enquiries",       icon: "📩" },
  { value: "More Calls & WhatsApp",        icon: "📞" },
  { value: "More Sales & Revenue",         icon: "💰" },
  { value: "Build / Redesign Website",     icon: "🌐" },
];

const budgets = [
  { value: "₹5,000 – ₹15,000 / month",  label: "Starter",    desc: "Best for small businesses starting out" },
  { value: "₹15,000 – ₹50,000 / month", label: "Growth",     desc: "Accelerated growth for established businesses" },
  { value: "₹50,000+ / month",           label: "Premium",    desc: "Maximum results with dedicated team" },
];

type Step = 1 | 2 | 3 | 4 | "done";

export default function SmartLeadForm() {
  const [step, setStep] = useState<Step>(1);
  const [businessType, setBusinessType] = useState("");
  const [goal, setGoal] = useState("");
  const [budget, setBudget] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  function selectBusiness(val: string) {
    setBusinessType(val);
    trackFormStep(1, val);
    setStep(2);
  }

  function selectGoal(val: string) {
    setGoal(val);
    trackFormStep(2, val);
    setStep(3);
  }

  function selectBudget(val: string) {
    setBudget(val);
    trackFormStep(3, val);
    setStep(4);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    trackFormSubmit(businessType, goal);
    trackWhatsApp("smart_lead_form");

    const msg = encodeURIComponent(
      `Hi SNR Digital Marketing,\n\nI want to grow my business online.\n\n` +
      `Business Type: ${businessType}\nGoal: ${goal}\nBudget: ${budget}\n` +
      `Name: ${name}\nPhone: ${phone}\n\nPlease contact me for a free growth audit.`
    );
    window.open(`https://wa.me/919989437777?text=${msg}`, "_blank");
    setStep("done");
  }

  const steps = ["Business", "Goal", "Budget", "Contact"];

  return (
    <section id="get-started" className="py-28 px-6 bg-[#111C35]">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Get Started
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Start Your Growth Journey
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Answer 4 quick questions and we&apos;ll reach out with a custom growth plan for your business.
          </p>
        </div>

        {step !== "done" && (
          <>
            {/* Step indicators */}
            <div className="flex items-center justify-center gap-2 mb-10">
              {steps.map((s, i) => {
                const num = i + 1;
                const active = step === num;
                const done = typeof step === "number" && step > num;
                return (
                  <div key={s} className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      done  ? "bg-green-500 text-white" :
                      active ? "bg-blue-600 text-white ring-4 ring-blue-500/20" :
                               "bg-white/[0.07] text-slate-500"
                    }`}>
                      {done ? (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : num}
                    </div>
                    <span className={`text-xs font-medium hidden sm:block ${active ? "text-white" : "text-slate-600"}`}>{s}</span>
                    {i < steps.length - 1 && (
                      <div className={`w-8 h-px mx-1 ${done ? "bg-green-500/50" : "bg-white/[0.08]"}`} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Card */}
            <div className="bg-[#0A0F1E] rounded-3xl p-8 sm:p-10 border border-white/[0.07]">

              {/* Step 1 — Business Type */}
              {step === 1 && (
                <>
                  <h3 className="text-xl font-semibold text-white mb-6">What type of business do you run?</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {businessTypes.map((b) => (
                      <button
                        key={b.value}
                        onClick={() => selectBusiness(b.value)}
                        className="flex flex-col items-center gap-2 p-5 rounded-2xl border border-white/[0.07] bg-[#111C35] hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-200 group"
                      >
                        <span className="text-3xl">{b.icon}</span>
                        <span className="text-slate-300 text-sm font-medium text-center group-hover:text-white transition-colors">{b.value}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* Step 2 — Goal */}
              {step === 2 && (
                <>
                  <h3 className="text-xl font-semibold text-white mb-2">What&apos;s your main goal?</h3>
                  <p className="text-slate-500 text-sm mb-6">Business: <span className="text-slate-300">{businessType}</span></p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {goals.map((g) => (
                      <button
                        key={g.value}
                        onClick={() => selectGoal(g.value)}
                        className="flex items-center gap-3 p-5 rounded-2xl border border-white/[0.07] bg-[#111C35] hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-200 group text-left"
                      >
                        <span className="text-2xl">{g.icon}</span>
                        <span className="text-slate-300 text-sm font-medium group-hover:text-white transition-colors">{g.value}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* Step 3 — Budget */}
              {step === 3 && (
                <>
                  <h3 className="text-xl font-semibold text-white mb-2">What&apos;s your monthly marketing budget?</h3>
                  <p className="text-slate-500 text-sm mb-6">Goal: <span className="text-slate-300">{goal}</span></p>
                  <div className="flex flex-col gap-3">
                    {budgets.map((b) => (
                      <button
                        key={b.value}
                        onClick={() => selectBudget(b.value)}
                        className="flex items-center justify-between p-5 rounded-2xl border border-white/[0.07] bg-[#111C35] hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-200 group text-left"
                      >
                        <div>
                          <p className="text-white font-semibold text-sm group-hover:text-blue-300 transition-colors">{b.value}</p>
                          <p className="text-slate-500 text-xs mt-0.5">{b.desc}</p>
                        </div>
                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                          {b.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* Step 4 — Contact */}
              {step === 4 && (
                <>
                  <h3 className="text-xl font-semibold text-white mb-2">How should we reach you?</h3>
                  <p className="text-slate-500 text-sm mb-6">Budget: <span className="text-slate-300">{budget}</span></p>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                      <label className="block text-slate-400 text-sm mb-1.5 font-medium">Your Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rajesh Kumar"
                        required
                        className="w-full bg-[#111C35] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/60 transition-colors text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-sm mb-1.5 font-medium">Phone Number</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 9XXXXXXXXX"
                        required
                        className="w-full bg-[#111C35] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/60 transition-colors text-sm"
                      />
                    </div>
                    <p className="text-slate-600 text-xs">
                      Your details will be sent via WhatsApp to our growth team. We will contact you within 24 hours.
                    </p>
                    <button
                      type="submit"
                      className="btn-green w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 shadow-lg mt-1"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      Send My Details on WhatsApp
                    </button>
                  </form>
                </>
              )}
            </div>
          </>
        )}

        {/* Success state */}
        {step === "done" && (
          <div className="bg-[#0A0F1E] rounded-3xl p-10 border border-green-500/20 text-center">
            <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Details Sent!</h3>
            <p className="text-slate-400 text-base max-w-md mx-auto mb-6">
              We have received your details. Our growth expert will analyze your business and contact you within <span className="text-white font-medium">24 hours</span>.
            </p>
            <p className="text-amber-400/80 text-sm font-medium">
              ⚡ Didn&apos;t open WhatsApp? &nbsp;
              <a
                href={`https://wa.me/919989437777?text=${encodeURIComponent(`Hi SNR Digital Marketing,\n\nBusiness: ${businessType}\nGoal: ${goal}\nBudget: ${budget}\nName: ${name}\nPhone: ${phone}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-amber-400 hover:text-amber-300"
              >
                Click here to send on WhatsApp
              </a>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
