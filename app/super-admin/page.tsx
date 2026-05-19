"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import {
  getTenants, updateTenantStatus, updateTenantPlan, deleteTenant,
  seedDemoTenants, getPlatformStats,
  PLANS, type Tenant, type PlanId, type TenantStatus,
} from "@/lib/tenant-engine";

/* ── Helpers ─────────────────────────────────────────────────── */

function fmt(n: number) { return `₹${n.toLocaleString("en-IN")}`; }

const STATUS_META: Record<TenantStatus, { label: string; color: string; dot: string }> = {
  active:    { label: "Active",    color: "bg-green-500/15 text-green-300 border-green-500/30",   dot: "bg-green-400"  },
  trial:     { label: "Trial",     color: "bg-blue-500/15 text-blue-300 border-blue-500/30",      dot: "bg-blue-400"   },
  suspended: { label: "Suspended", color: "bg-red-500/15 text-red-300 border-red-500/30",         dot: "bg-red-400"    },
};

/* ── Usage bar ───────────────────────────────────────────────── */

function UsageBar({ used, limit, color }: { used: number; limit: number; color: string }) {
  const pct = limit >= 9999 ? 35 : Math.min(100, Math.round((used / limit) * 100));
  return (
    <div>
      <div className="flex items-center justify-between text-xs mb-1">
        <span className="text-slate-500">{used.toLocaleString()}</span>
        <span className="text-slate-600">{limit >= 9999 ? "∞" : limit}</span>
      </div>
      <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}

/* ── Tenant row card ─────────────────────────────────────────── */

function TenantCard({
  tenant, onStatus, onPlan, onDelete, onSelect, selected,
}: {
  tenant:   Tenant;
  onStatus: (id: string, s: TenantStatus) => void;
  onPlan:   (id: string, p: PlanId) => void;
  onDelete: (id: string) => void;
  onSelect: (t: Tenant) => void;
  selected: boolean;
}) {
  const sm   = STATUS_META[tenant.status];
  const plan = PLANS[tenant.plan];
  const age  = Math.floor((Date.now() - new Date(tenant.createdAt).getTime()) / 86400000);

  return (
    <div
      onClick={() => onSelect(tenant)}
      className={`bg-[#111C35] rounded-2xl border p-5 cursor-pointer transition-all hover:border-white/20 ${
        selected ? "border-blue-500/40 ring-1 ring-blue-500/20" : "border-white/[0.07]"
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 border"
            style={{ background: `${tenant.brandColor}20`, borderColor: `${tenant.brandColor}40`, color: tenant.brandColor }}>
            {tenant.agencyName[0]}
          </div>
          <div className="min-w-0">
            <p className="text-white font-semibold text-sm truncate">{tenant.agencyName}</p>
            <p className="text-slate-600 text-xs truncate">{tenant.adminEmail}</p>
          </div>
        </div>
        <span className={`text-xs font-semibold px-2 py-1 rounded-lg border flex-shrink-0 ${sm.color}`}>{sm.label}</span>
      </div>

      {/* Plan badge */}
      <div className="flex items-center justify-between mb-4">
        <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${plan.badge}`}>{plan.name}</span>
        <span className="text-slate-500 text-xs">{age}d ago</span>
      </div>

      {/* Usage */}
      <div className="space-y-2.5 mb-4">
        {[
          { label: "Leads",     used: tenant.leadCount,     limit: PLANS[tenant.plan].leadLimit,     color: "#3B82F6" },
          { label: "Clients",   used: tenant.clientCount,   limit: PLANS[tenant.plan].clientLimit,   color: "#22C55E" },
          { label: "Campaigns", used: tenant.campaignCount, limit: PLANS[tenant.plan].campaignLimit, color: "#A855F7" },
        ].map((u) => (
          <div key={u.label}>
            <p className="text-slate-600 text-[10px] mb-0.5">{u.label}</p>
            <UsageBar used={u.used} limit={u.limit} color={u.color} />
          </div>
        ))}
      </div>

      {/* MRR */}
      {tenant.mrr > 0 && (
        <div className="bg-green-500/5 border border-green-500/10 rounded-lg px-3 py-1.5 mb-4">
          <p className="text-green-400 text-xs font-semibold">{fmt(tenant.mrr)} MRR</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
        <select
          value={tenant.plan}
          onChange={(e) => onPlan(tenant.id, e.target.value as PlanId)}
          className="flex-1 text-xs font-semibold px-2 py-1.5 rounded-lg border border-white/[0.1] bg-[#0A0F1E] text-slate-300 cursor-pointer"
        >
          {(Object.keys(PLANS) as PlanId[]).map((p) => (
            <option key={p} value={p} className="bg-[#0A0F1E]">{PLANS[p].name}</option>
          ))}
        </select>
        <select
          value={tenant.status}
          onChange={(e) => onStatus(tenant.id, e.target.value as TenantStatus)}
          className={`text-xs font-semibold px-2 py-1.5 rounded-lg border bg-transparent cursor-pointer ${sm.color}`}
        >
          <option value="active"    className="bg-[#0A0F1E] text-white">Active</option>
          <option value="trial"     className="bg-[#0A0F1E] text-white">Trial</option>
          <option value="suspended" className="bg-[#0A0F1E] text-white">Suspended</option>
        </select>
        <button
          onClick={() => { if (confirm(`Delete ${tenant.agencyName}?`)) onDelete(tenant.id); }}
          className="w-8 h-8 rounded-lg bg-red-500/10 hover:bg-red-500/25 text-red-400 flex items-center justify-center transition-colors flex-shrink-0"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ── Tenant detail panel ─────────────────────────────────────── */

function TenantDetail({ tenant }: { tenant: Tenant }) {
  const plan = PLANS[tenant.plan];
  return (
    <div className="space-y-4">
      {/* Identity */}
      <div className="bg-[#111C35] rounded-2xl border border-white/[0.07] p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-xl border"
            style={{ background: `${tenant.brandColor}20`, borderColor: `${tenant.brandColor}40`, color: tenant.brandColor }}>
            {tenant.agencyName[0]}
          </div>
          <div>
            <h2 className="text-white font-bold text-lg">{tenant.agencyName}</h2>
            <p className="text-slate-500 text-sm">{tenant.tagline}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 text-xs">
          {[
            { label: "Email",    value: tenant.contactEmail  },
            { label: "Phone",    value: tenant.contactPhone  },
            { label: "Website",  value: tenant.website       },
            { label: "Domain",   value: tenant.customDomain ?? "Not configured" },
            { label: "Admin",    value: tenant.adminEmail    },
            { label: "Joined",   value: new Date(tenant.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) },
          ].map((i) => (
            <div key={i.label} className="bg-[#0A0F1E] rounded-xl p-3 border border-white/[0.06]">
              <p className="text-slate-500 mb-0.5">{i.label}</p>
              <p className="text-slate-300 font-medium truncate">{i.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Brand preview */}
      <div className="bg-[#111C35] rounded-2xl border border-white/[0.07] p-5">
        <p className="text-white font-semibold text-sm mb-3">Brand Preview</p>
        <div className="rounded-xl overflow-hidden border border-white/[0.07]">
          <div className="px-4 h-12 flex items-center gap-3 border-b border-white/[0.06]"
            style={{ background: `${tenant.brandColor}10` }}>
            <div className="w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs"
              style={{ background: tenant.brandColor, color: "#fff" }}>
              {tenant.agencyName[0]}
            </div>
            <span className="text-white font-bold text-sm">{tenant.agencyName}</span>
            <span className="ml-auto text-xs px-3 py-1 rounded-lg font-semibold text-white"
              style={{ background: tenant.brandColor }}
            >Dashboard</span>
          </div>
          <div className="p-4 bg-[#0A0F1E] space-y-2">
            <div className="h-16 rounded-xl border" style={{ background: `${tenant.brandColor}08`, borderColor: `${tenant.brandColor}20` }}>
              <div className="h-full flex items-center px-4 gap-2">
                <div className="w-8 h-8 rounded-lg" style={{ background: `${tenant.brandColor}20` }} />
                <div className="space-y-1 flex-1">
                  <div className="h-2 rounded-full w-24" style={{ background: `${tenant.brandColor}30` }} />
                  <div className="h-1.5 rounded-full w-16 bg-white/[0.05]" />
                </div>
                <div className="w-16 h-6 rounded-lg text-white text-[10px] flex items-center justify-center font-semibold"
                  style={{ background: tenant.brandColor }}>
                  {tenant.plan === "pro" ? "Pro" : tenant.plan === "growth" ? "Growth" : "Starter"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Plan usage */}
      <div className="bg-[#111C35] rounded-2xl border border-white/[0.07] p-5">
        <div className="flex items-center justify-between mb-4">
          <p className="text-white font-semibold text-sm">Plan Usage</p>
          <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${plan.badge}`}>{plan.name} — {plan.price}</span>
        </div>
        <div className="space-y-4">
          {[
            { label: "Leads",     used: tenant.leadCount,     limit: PLANS[tenant.plan].leadLimit,     color: "#3B82F6" },
            { label: "Clients",   used: tenant.clientCount,   limit: PLANS[tenant.plan].clientLimit,   color: "#22C55E" },
            { label: "Campaigns", used: tenant.campaignCount, limit: PLANS[tenant.plan].campaignLimit, color: "#A855F7" },
          ].map((u) => (
            <div key={u.label}>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-400">{u.label}</span>
                <span className="text-slate-500">{u.used} / {u.limit >= 9999 ? "∞" : u.limit}</span>
              </div>
              <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all" style={{
                  width: `${u.limit >= 9999 ? 35 : Math.min(100, Math.round((u.used / u.limit) * 100))}%`,
                  background: u.color,
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Plan features */}
      <div className="bg-[#111C35] rounded-2xl border border-white/[0.07] p-5">
        <p className="text-white font-semibold text-sm mb-3">Included Features</p>
        <div className="space-y-2">
          {plan.features.map((f) => (
            <div key={f} className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              <span className="text-slate-300 text-xs">{f}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── PIN gate (demo / non-Supabase mode) ─────────────────────── */

const SUPER_ADMIN_PIN = "snr2025";

function PinGate({ onUnlock }: { onUnlock: () => void }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  function tryUnlock() {
    if (pin === SUPER_ADMIN_PIN) { onUnlock(); }
    else { setError(true); setTimeout(() => setError(false), 1500); }
  }

  return (
    <div className="min-h-screen bg-[#0A0F1E] flex items-center justify-center p-4">
      <div className="bg-[#111C35] rounded-2xl border border-white/[0.1] p-8 w-full max-w-sm text-center shadow-2xl">
        <div className="w-14 h-14 rounded-2xl bg-red-600/20 border border-red-500/30 flex items-center justify-center mx-auto mb-5">
          <svg className="w-7 h-7 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
        </div>
        <h2 className="text-white font-bold text-lg mb-1">Super Admin Access</h2>
        <p className="text-slate-500 text-sm mb-6">Enter the master PIN to continue</p>
        <input
          type="password"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && tryUnlock()}
          placeholder="Enter PIN…"
          className={`w-full bg-[#0A0F1E] border rounded-xl px-4 py-3 text-center text-white tracking-[0.3em] text-lg focus:outline-none mb-4 transition-colors ${
            error ? "border-red-500" : "border-white/[0.1] focus:border-red-500/50"
          }`}
        />
        {error && <p className="text-red-400 text-xs mb-3">Incorrect PIN</p>}
        <button onClick={tryUnlock}
          className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm transition-colors">
          Unlock Super Admin
        </button>
        <p className="text-slate-700 text-xs mt-4">Only SNR master admin access</p>
      </div>
    </div>
  );
}

/* ── Main page ───────────────────────────────────────────────── */

export default function SuperAdminPage() {
  const { isAdmin, loading: authLoading, isSupabaseReady } = useAuth();
  const [unlocked,  setUnlocked]  = useState(false);
  const [tenants,   setTenants]   = useState<Tenant[]>([]);
  const [stats,     setStats]     = useState({ totalTenants: 0, activeTenants: 0, trialTenants: 0, totalLeads: 0, totalCampaigns: 0, totalMRR: 0, planBreakdown: { starter: 0, growth: 0, pro: 0 } });
  const [selected,  setSelected]  = useState<Tenant | null>(null);
  const [filter,    setFilter]    = useState<"all" | "active" | "trial" | "suspended">("all");

  function reload() {
    seedDemoTenants();
    setTenants(getTenants());
    setStats(getPlatformStats());
  }

  useEffect(() => {
    if (isAdmin || unlocked) reload();
  }, [isAdmin, unlocked]);

  // Auth gate
  if (authLoading) return <div className="min-h-screen bg-[#0A0F1E] flex items-center justify-center"><svg className="w-8 h-8 text-red-400 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg></div>;

  if (isSupabaseReady && !isAdmin) return (
    <div className="min-h-screen bg-[#0A0F1E] flex items-center justify-center p-4">
      <div className="bg-[#111C35] rounded-2xl border border-red-500/20 p-8 text-center max-w-sm">
        <p className="text-4xl mb-3">🚫</p>
        <h2 className="text-white font-bold text-lg mb-2">Access Denied</h2>
        <p className="text-slate-400 text-sm">Super Admin is restricted to SNR master admin only.</p>
      </div>
    </div>
  );

  if (!isSupabaseReady && !unlocked) return <PinGate onUnlock={() => setUnlocked(true)} />;

  const filtered = tenants.filter((t) => filter === "all" || t.status === filter);

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-white">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#0D1528]/95 backdrop-blur border-b border-white/[0.07] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <div>
              <h1 className="text-white font-bold text-base">SNR Super Admin</h1>
              <p className="text-slate-500 text-xs">AI Marketing Operating System · Platform Control</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={reload} className="px-3 py-2 rounded-lg border border-white/[0.1] text-slate-400 hover:text-white text-sm transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">

        {/* Platform stats */}
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
          {[
            { label: "Total Agencies",  value: stats.totalTenants.toString(),   color: "text-white"          },
            { label: "Active",          value: stats.activeTenants.toString(),   color: "text-green-400"      },
            { label: "Trials",          value: stats.trialTenants.toString(),    color: "text-blue-400"       },
            { label: "Total Leads",     value: stats.totalLeads.toLocaleString(), color: "text-purple-400"    },
            { label: "Campaigns",       value: stats.totalCampaigns.toString(),  color: "text-amber-400"      },
            { label: "Platform MRR",    value: fmt(stats.totalMRR),              color: "text-green-400"      },
          ].map((s) => (
            <div key={s.label} className="bg-[#111C35] rounded-2xl p-4 border border-white/[0.07]">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-slate-500 text-xs mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Plan breakdown */}
        <div className="bg-[#111C35] rounded-2xl border border-white/[0.07] p-5">
          <p className="text-white font-semibold text-sm mb-4">Plan Distribution</p>
          <div className="flex gap-4">
            {(["starter", "growth", "pro"] as PlanId[]).map((pid) => {
              const count = stats.planBreakdown[pid];
              const pct   = stats.totalTenants > 0 ? Math.round((count / stats.totalTenants) * 100) : 0;
              const plan  = PLANS[pid];
              return (
                <div key={pid} className="flex-1">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className={`font-semibold ${pid === "pro" ? "text-purple-400" : pid === "growth" ? "text-blue-400" : "text-slate-400"}`}>{plan.name}</span>
                    <span className="text-slate-500">{count} · {pct}%</span>
                  </div>
                  <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: plan.color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1.5">
          {(["all", "active", "trial", "suspended"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all capitalize ${
                filter === f ? "bg-red-600 text-white border-red-600" : "bg-white/[0.04] text-slate-400 border-white/[0.08] hover:text-white"
              }`}>
              {f} {f !== "all" && `(${tenants.filter(t => t.status === f).length})`}
            </button>
          ))}
        </div>

        {/* Tenants grid + detail */}
        <div className="flex gap-6">
          <div className={`${selected ? "hidden sm:grid sm:w-[480px] flex-shrink-0" : "w-full grid"} grid-cols-1 sm:grid-cols-2 gap-4 self-start`}>
            {filtered.length === 0 && (
              <div className="col-span-2 bg-[#111C35] rounded-2xl border border-white/[0.07] p-10 text-center text-slate-500">
                <p className="text-3xl mb-2">🏢</p>
                <p>No agencies in this filter</p>
              </div>
            )}
            {filtered.map((t) => (
              <TenantCard
                key={t.id}
                tenant={t}
                selected={selected?.id === t.id}
                onSelect={setSelected}
                onStatus={(id, s) => { updateTenantStatus(id, s); reload(); }}
                onPlan={(id, p) => { updateTenantPlan(id, p); reload(); }}
                onDelete={(id) => { deleteTenant(id); reload(); if (selected?.id === id) setSelected(null); }}
              />
            ))}
          </div>

          {selected && (
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-4">
                <button onClick={() => setSelected(null)} className="text-slate-500 hover:text-white text-xs flex items-center gap-1 sm:hidden">← Back</button>
                <p className="text-slate-400 text-xs">Agency Detail</p>
                <button onClick={() => setSelected(null)} className="text-slate-500 hover:text-white transition-colors hidden sm:block">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <TenantDetail tenant={selected} />
            </div>
          )}
        </div>

        {/* Subscription plans reference */}
        <div className="bg-[#111C35] rounded-2xl border border-white/[0.07] p-6">
          <p className="text-white font-semibold mb-5">Subscription Plans</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {(Object.values(PLANS)).map((plan) => (
              <div key={plan.id} className="bg-[#0A0F1E] rounded-2xl border border-white/[0.07] p-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-white font-bold">{plan.name}</p>
                  <p className="text-green-400 font-bold text-sm">{plan.price}</p>
                </div>
                <div className="space-y-1.5 mb-4">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-center gap-2">
                      <svg className="w-3.5 h-3.5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      <span className="text-slate-400 text-xs">{f}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500 border-t border-white/[0.05] pt-3">
                  <span>{stats.planBreakdown[plan.id]} agencies</span>
                  <span>{fmt(plan.priceMonthly * stats.planBreakdown[plan.id])} MRR</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-slate-700 text-xs text-center">
          SNR AI Marketing Operating System · Super Admin Panel · Multi-tenant SaaS Platform
        </p>
      </main>
    </div>
  );
}
