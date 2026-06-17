"use client";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { trackFormStep, trackFormSubmit } from "@/lib/analytics";
import { saveLeadAsync } from "@/lib/supabase/leads";

const EJS_SERVICE  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID  ?? "";
const EJS_TEMPLATE = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const EJS_KEY      = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY  ?? "";

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
  { value: "₹5,000 – ₹15,000 / month",  label: "Starter",  desc: "Best for small businesses starting out" },
  { value: "₹15,000 – ₹50,000 / month", label: "Growth",   desc: "Accelerated growth for established businesses" },
  { value: "₹50,000+ / month",           label: "Premium",  desc: "Maximum results with dedicated team" },
];

type Step = 1 | 2 | 3 | 4 | "done";

export default function SmartLeadForm() {
  const [step,         setStep]         = useState<Step>(1);
  const [businessType, setBusinessType] = useState("");
  const [goal,         setGoal]         = useState("");
  const [budget,       setBudget]       = useState("");
  const [name,         setName]         = useState("");
  const [phone,        setPhone]        = useState("");
  const [saving,       setSaving]       = useState(false);

  function selectBusiness(val: string) { setBusinessType(val); trackFormStep(1, val); setStep(2); }
  function selectGoal(val: string)     { setGoal(val);         trackFormStep(2, val); setStep(3); }
  function selectBudget(val: string)   { setBudget(val);       trackFormStep(3, val); setStep(4); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setSaving(true);

    // Save to Supabase (+ localStorage fallback) — non-blocking
    saveLeadAsync(
      { name: name.trim(), phone: phone.trim(), businessType, goal, budget },
      "smart_form"
    ).catch(() => { /* silently ignore */ });

    trackFormSubmit(businessType, goal);

    // Send email via EmailJS — no server needed, fires silently
    try {
      await emailjs.send(
        EJS_SERVICE,
        EJS_TEMPLATE,
        {
          from_name:     name.trim(),
          from_phone:    phone.trim(),
          business_type: businessType,
          goal,
          budget,
          reply_to:      "snrdigitalmarketingindia@gmail.com",
        },
        EJS_KEY
      );
    } catch {
      // EmailJS failed — fall back to opening email client
      const subject = encodeURIComponent("New Lead: Free Growth Audit Request");
      const body    = encodeURIComponent(
        `New lead from the website.\n\nBusiness: ${businessType}\nGoal: ${goal}\nBudget: ${budget}\nName: ${name.trim()}\nPhone: ${phone.trim()}`
      );
      window.open(`mailto:snrdigitalmarketingindia@gmail.com?subject=${subject}&body=${body}`, "_blank");
    }

    setSaving(false);
    setStep("done");
  }

  const steps = ["Business", "Goal", "Budget", "Contact"];

  return (
    <section id="get-started" className="py-28 px-6 bg-[#111C35]">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-3">Get Started</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Start Your Growth Journey</h2>
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

              {step === 1 && (
                <>
                  <h3 className="text-xl font-semibold text-white mb-6">What type of business do you run?</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {businessTypes.map((b) => (
                      <button key={b.value} onClick={() => selectBusiness(b.value)}
                        className="flex flex-col items-center gap-2 p-5 rounded-2xl border border-white/[0.07] bg-[#111C35] hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-200 group">
                        <span className="text-3xl">{b.icon}</span>
                        <span className="text-slate-300 text-sm font-medium text-center group-hover:text-white transition-colors">{b.value}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <h3 className="text-xl font-semibold text-white mb-2">What&apos;s your main goal?</h3>
                  <p className="text-slate-500 text-sm mb-6">Business: <span className="text-slate-300">{businessType}</span></p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {goals.map((g) => (
                      <button key={g.value} onClick={() => selectGoal(g.value)}
                        className="flex items-center gap-3 p-5 rounded-2xl border border-white/[0.07] bg-[#111C35] hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-200 group text-left">
                        <span className="text-2xl">{g.icon}</span>
                        <span className="text-slate-300 text-sm font-medium group-hover:text-white transition-colors">{g.value}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <h3 className="text-xl font-semibold text-white mb-2">What&apos;s your monthly marketing budget?</h3>
                  <p className="text-slate-500 text-sm mb-6">Goal: <span className="text-slate-300">{goal}</span></p>
                  <div className="flex flex-col gap-3">
                    {budgets.map((b) => (
                      <button key={b.value} onClick={() => selectBudget(b.value)}
                        className="flex items-center justify-between p-5 rounded-2xl border border-white/[0.07] bg-[#111C35] hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-200 group text-left">
                        <div>
                          <p className="text-white font-semibold text-sm group-hover:text-blue-300 transition-colors">{b.value}</p>
                          <p className="text-slate-500 text-xs mt-0.5">{b.desc}</p>
                        </div>
                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">{b.label}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {step === 4 && (
                <>
                  <h3 className="text-xl font-semibold text-white mb-2">How should we reach you?</h3>
                  <p className="text-slate-500 text-sm mb-6">Budget: <span className="text-slate-300">{budget}</span></p>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                      <label className="block text-slate-400 text-sm mb-1.5 font-medium">Your Name</label>
                      <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rajesh Kumar" required
                        className="w-full bg-[#111C35] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/60 transition-colors text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-sm mb-1.5 font-medium">Phone Number</label>
                      <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 9XXXXXXXXX" required
                        className="w-full bg-[#111C35] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/60 transition-colors text-sm"
                      />
                    </div>
                    <p className="text-slate-600 text-xs">
                      Your details will be sent via email to our growth team. We will contact you within 24 hours.
                    </p>
                    <button type="submit" disabled={saving}
                      className="btn-green w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 shadow-lg mt-1 disabled:opacity-60"
                    >
                      {saving ? (
                        <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                      )}
                      Send My Details via Email
                    </button>
                  </form>
                </>
              )}
            </div>
          </>
        )}

        {step === "done" && (
          <div className="bg-[#0A0F1E] rounded-3xl p-10 border border-green-500/20 text-center">
            <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Details Sent!</h3>
            <p className="text-slate-400 text-base max-w-md mx-auto mb-6">
              We have received your details. Our growth expert will analyse your business and contact you within{" "}
              <span className="text-white font-medium">24 hours</span>.
            </p>
            <p className="text-slate-500 text-sm">
              Didn&apos;t hear back? Email us at{" "}
              <a
                href="mailto:snrdigitalmarketingindia@gmail.com"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                snrdigitalmarketingindia@gmail.com
              </a>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
