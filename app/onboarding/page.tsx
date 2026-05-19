"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createTenant, setCurrentTenant, BRAND_COLORS, PLANS, type OnboardingData,
} from "@/lib/tenant-engine";

/* ── Step definitions ────────────────────────────────────────── */

const STEPS = [
  { id: 1, label: "Agency Info",    icon: "🏢" },
  { id: 2, label: "Brand Color",    icon: "🎨" },
  { id: 3, label: "Contact Setup",  icon: "📋" },
  { id: 4, label: "Admin Account",  icon: "🔐" },
];

/* ── Progress bar ────────────────────────────────────────────── */

function StepBar({ current, total, color }: { current: number; total: number; color: string }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`flex-1 h-1 rounded-full transition-all duration-500 ${i < current ? "opacity-100" : "opacity-20"}`}
          style={{ background: i < current ? color : "#334155" }}
        />
      ))}
    </div>
  );
}

/* ── Field ────────────────────────────────────────────────────── */

function Field({
  label, value, onChange, placeholder, type = "text", required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-slate-400 text-xs font-semibold mb-1.5 block">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#0A0F1E] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 transition-colors"
      />
    </div>
  );
}

/* ── Preview dashboard card ──────────────────────────────────── */

function DashboardPreview({ data }: { data: Partial<OnboardingData> }) {
  const color = data.brandColor ?? "#3B82F6";
  const name  = data.agencyName || "Your Agency";
  return (
    <div className="rounded-2xl overflow-hidden border border-white/[0.1] bg-[#111C35]">
      {/* Simulated nav */}
      <div className="px-4 h-11 flex items-center gap-2.5 border-b border-white/[0.06]"
        style={{ background: `${color}12` }}>
        <div className="w-6 h-6 rounded-lg flex items-center justify-center text-white text-xs font-bold"
          style={{ background: color }}>{name[0]}</div>
        <span className="text-white text-sm font-bold">{name}</span>
        <div className="ml-auto flex gap-1">
          {["Leads", "Campaigns", "Reports"].map((l) => (
            <span key={l} className="text-slate-500 text-[10px] px-2 py-0.5 rounded">{l}</span>
          ))}
        </div>
      </div>
      {/* Simulated body */}
      <div className="p-4 space-y-3 bg-[#0B1020]">
        <div className="grid grid-cols-3 gap-2">
          {[{ v: "247", l: "Total Leads" }, { v: "18", l: "Clients" }, { v: "94%", l: "Satisfaction" }].map((c) => (
            <div key={c.l} className="rounded-xl p-3 border" style={{ background: `${color}08`, borderColor: `${color}20` }}>
              <p className="text-white font-bold text-base">{c.v}</p>
              <p className="text-slate-600 text-[10px]">{c.l}</p>
            </div>
          ))}
        </div>
        <div className="h-1 rounded-full bg-white/[0.05] overflow-hidden">
          <div className="h-full rounded-full w-[72%]" style={{ background: color }} />
        </div>
        <div className="flex gap-2">
          <div className="flex-1 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06]" />
          <div className="w-20 h-8 rounded-lg text-white text-[10px] flex items-center justify-center font-semibold"
            style={{ background: color }}>Get Started</div>
        </div>
      </div>
    </div>
  );
}

/* ── Success screen ──────────────────────────────────────────── */

function SuccessScreen({ agencyName, color, onDashboard }: {
  agencyName: string;
  color: string;
  onDashboard: () => void;
}) {
  return (
    <div className="text-center">
      <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-5 text-4xl border"
        style={{ background: `${color}20`, borderColor: `${color}40` }}>
        🎉
      </div>
      <h2 className="text-white font-bold text-2xl mb-2">{agencyName} is Live!</h2>
      <p className="text-slate-400 text-sm mb-6 max-w-sm mx-auto">
        Your white-label AI Marketing Operating System is ready. All features are active on your Growth trial.
      </p>

      <div className="bg-[#111C35] rounded-2xl border border-white/[0.07] p-5 mb-6 text-left space-y-3">
        {[
          { icon: "✅", text: "AI Lead Scoring Engine — active" },
          { icon: "✅", text: "Campaign Generator — 25 campaigns included" },
          { icon: "✅", text: "White-label branding applied" },
          { icon: "✅", text: "Client dashboard ready" },
          { icon: "✅", text: "Growth trial started — 14 days free" },
        ].map((item) => (
          <div key={item.text} className="flex items-center gap-3">
            <span>{item.icon}</span>
            <span className="text-slate-300 text-sm">{item.text}</span>
          </div>
        ))}
      </div>

      <button
        onClick={onDashboard}
        className="w-full py-3.5 rounded-xl font-bold text-white text-sm transition-colors"
        style={{ background: color }}
      >
        Open My Dashboard →
      </button>

      <p className="text-slate-600 text-xs mt-4">
        PIN for Super Admin: <span className="text-slate-500 font-mono">snr2025</span>
      </p>
    </div>
  );
}

/* ── Main page ───────────────────────────────────────────────── */

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [data, setData] = useState<OnboardingData>({
    agencyName: "", tagline: "", brandColor: "#3B82F6",
    contactEmail: "", contactPhone: "", website: "",
    adminEmail: "", adminPassword: "",
  });

  function set(key: keyof OnboardingData, val: string) {
    setData((d) => ({ ...d, [key]: val }));
  }

  function canNext(): boolean {
    if (step === 1) return data.agencyName.trim().length >= 2;
    if (step === 2) return !!data.brandColor;
    if (step === 3) return data.contactEmail.includes("@");
    if (step === 4) return data.adminEmail.includes("@") && data.adminPassword.length >= 6;
    return false;
  }

  function handleFinish() {
    const tenant = createTenant(data);
    setCurrentTenant(tenant.id);
    setDone(true);
  }

  const color = data.brandColor || "#3B82F6";

  if (done) {
    return (
      <div className="min-h-screen bg-[#0A0F1E] flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <SuccessScreen
            agencyName={data.agencyName}
            color={color}
            onDashboard={() => router.push("/dashboard")}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0F1E] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest mb-2">White-Label Setup</p>
          <h1 className="text-white text-3xl font-bold">
            Launch Your <span style={{ color }}>AI Marketing</span> System
          </h1>
          <p className="text-slate-400 text-sm mt-2">Set up your branded agency dashboard in 4 steps</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Left: Form */}
          <div className="bg-[#111C35] rounded-2xl border border-white/[0.07] p-7">
            {/* Step indicator */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-xs font-semibold">{STEPS[step - 1].icon} Step {step} of {STEPS.length}</span>
              <span className="text-white text-xs font-bold">{STEPS[step - 1].label}</span>
            </div>

            <StepBar current={step} total={STEPS.length} color={color} />

            {/* Step content */}
            {step === 1 && (
              <div className="space-y-4">
                <Field
                  label="Agency Name" value={data.agencyName} onChange={(v) => set("agencyName", v)}
                  placeholder="e.g. ABC Growth Agency" required
                />
                <Field
                  label="Agency Tagline" value={data.tagline} onChange={(v) => set("tagline", v)}
                  placeholder="e.g. AI-Powered Marketing for Growth"
                />
                {data.agencyName.length >= 2 && (
                  <div className="bg-green-500/5 border border-green-500/15 rounded-xl p-3 flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span className="text-green-400 text-xs">{data.agencyName} — name available!</span>
                  </div>
                )}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <p className="text-slate-400 text-sm">Choose your brand accent color — it will be applied across your dashboard, reports, and client portal.</p>
                <div className="grid grid-cols-4 gap-3">
                  {BRAND_COLORS.map((c) => (
                    <button
                      key={c.hex}
                      onClick={() => set("brandColor", c.hex)}
                      className={`relative aspect-square rounded-2xl transition-all border-2 ${
                        data.brandColor === c.hex ? "scale-110 border-white" : "border-transparent hover:scale-105"
                      }`}
                      style={{ background: c.hex }}
                      title={c.name}
                    >
                      {data.brandColor === c.hex && (
                        <svg className="w-5 h-5 text-white absolute inset-0 m-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
                <div>
                  <label className="text-slate-400 text-xs font-semibold mb-1.5 block">Custom Hex</label>
                  <div className="flex gap-2 items-center">
                    <div className="w-10 h-10 rounded-xl border border-white/[0.1]" style={{ background: color }} />
                    <input
                      type="text"
                      value={data.brandColor}
                      onChange={(e) => set("brandColor", e.target.value)}
                      placeholder="#3B82F6"
                      className="flex-1 bg-[#0A0F1E] border border-white/[0.1] rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-blue-500/50"
                    />
                  </div>
                </div>
                <div className="rounded-xl p-3 border text-center"
                  style={{ background: `${color}15`, borderColor: `${color}30` }}>
                  <p className="text-white text-sm font-semibold">{data.agencyName || "Your Agency"}</p>
                  <p className="text-xs mt-0.5" style={{ color }}>{data.tagline || "AI-Powered Marketing Agency"}</p>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <Field label="Business Email" value={data.contactEmail} onChange={(v) => set("contactEmail", v)} placeholder="hello@agency.com" type="email" required />
                <Field label="Phone Number" value={data.contactPhone} onChange={(v) => set("contactPhone", v)} placeholder="+91 98765 43210" />
                <Field label="Website" value={data.website} onChange={(v) => set("website", v)} placeholder="www.youragency.com" />
                <div className="bg-blue-500/5 border border-blue-500/15 rounded-xl p-3">
                  <p className="text-blue-400 text-xs">📌 Future: your agency will be accessible at <span className="font-mono">yourname.snrsystem.com</span></p>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <Field label="Admin Email" value={data.adminEmail} onChange={(v) => set("adminEmail", v)} placeholder="admin@agency.com" type="email" required />
                <Field label="Admin Password" value={data.adminPassword} onChange={(v) => set("adminPassword", v)} placeholder="Min. 6 characters" type="password" required />
                {data.adminPassword.length > 0 && data.adminPassword.length < 6 && (
                  <p className="text-red-400 text-xs">Password must be at least 6 characters</p>
                )}
                <div className="bg-amber-500/5 border border-amber-500/15 rounded-xl p-3">
                  <p className="text-amber-400 text-xs">🔐 Your admin credentials will be used to log in to your branded dashboard.</p>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex gap-3 mt-7">
              {step > 1 && (
                <button onClick={() => setStep(s => s - 1)}
                  className="flex-1 py-3 rounded-xl border border-white/[0.1] text-slate-300 hover:text-white text-sm font-semibold transition-colors">
                  Back
                </button>
              )}
              {step < STEPS.length ? (
                <button
                  onClick={() => setStep(s => s + 1)}
                  disabled={!canNext()}
                  className="flex-1 py-3 rounded-xl font-bold text-white text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ background: canNext() ? color : "#334155" }}
                >
                  Continue →
                </button>
              ) : (
                <button
                  onClick={handleFinish}
                  disabled={!canNext()}
                  className="flex-1 py-3 rounded-xl font-bold text-white text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ background: canNext() ? color : "#334155" }}
                >
                  🚀 Launch My Dashboard
                </button>
              )}
            </div>
          </div>

          {/* Right: Live preview */}
          <div className="space-y-4">
            <div className="bg-[#111C35] rounded-2xl border border-white/[0.07] p-5">
              <p className="text-white font-semibold text-sm mb-4">Live Preview</p>
              <DashboardPreview data={data} />
            </div>

            {/* Features included */}
            <div className="bg-[#111C35] rounded-2xl border border-white/[0.07] p-5">
              <p className="text-white font-semibold text-sm mb-3">What You Get</p>
              <div className="space-y-2">
                {[
                  "AI Lead Scoring & Intelligence",
                  "Campaign Generator (Google + Meta)",
                  "White-label branded dashboard",
                  "Client portal & reporting",
                  "CRM with pipeline view",
                  "PDF report exports",
                  "14-day Growth plan trial",
                ].map((f) => (
                  <div key={f} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: `${color}20` }}>
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
                    </div>
                    <span className="text-slate-400 text-xs">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
