"use client";
import { useState, useEffect, useCallback } from "react";
import {
  getLeadsAsync, updateLeadStatusAsync, deleteLeadAsync, exportCSVAsync,
  getDashboardStats, computeTags, subscribeToLeads,
  isSupabaseConfigured,
  type Lead, type LeadStatus,
} from "@/lib/supabase/leads";

/* ── Helpers ──────────────────────────────────────────────────────────── */

const STATUS_META: Record<LeadStatus, { label: string; color: string; dot: string }> = {
  new:       { label: "New",       color: "bg-blue-500/15 text-blue-300 border-blue-500/30",       dot: "bg-blue-400" },
  contacted: { label: "Contacted", color: "bg-yellow-500/15 text-yellow-300 border-yellow-500/30", dot: "bg-yellow-400" },
  warm:      { label: "Warm",      color: "bg-orange-500/15 text-orange-300 border-orange-500/30", dot: "bg-orange-400" },
  converted: { label: "Converted", color: "bg-green-500/15 text-green-300 border-green-500/30",    dot: "bg-green-400" },
};

type FilterTab = "all" | LeadStatus;

const TABS: { id: FilterTab; label: string }[] = [
  { id: "all",       label: "All Leads" },
  { id: "new",       label: "New" },
  { id: "contacted", label: "Contacted" },
  { id: "warm",      label: "Warm" },
  { id: "converted", label: "Converted" },
];

const PIPELINE: { id: LeadStatus; label: string; color: string }[] = [
  { id: "new",       label: "New Leads",  color: "border-blue-500/40" },
  { id: "contacted", label: "Contacted",  color: "border-yellow-500/40" },
  { id: "warm",      label: "Interested", color: "border-orange-500/40" },
  { id: "converted", label: "Converted",  color: "border-green-500/40" },
];

/* ── Seed demo data (localStorage fallback only) ─────────────────────── */

async function seedDemo() {
  const { getLeads: lsGetLeads } = await import("@/lib/leads");
  if (lsGetLeads().length > 0 || isSupabaseConfigured) return;
  const statuses: LeadStatus[] = ["new", "new", "contacted", "warm", "new"];
  const demos = [
    { name: "Rajesh Kumar",   phone: "+91 9876543210", businessType: "Hospital / Clinic",  goal: "More Leads & Enquiries",   budget: "₹15,000 – ₹50,000 / month" },
    { name: "Priya Sharma",   phone: "+91 9123456780", businessType: "Real Estate",         goal: "More Calls & WhatsApp",    budget: "₹50,000+ / month" },
    { name: "Amit Verma",     phone: "+91 9988776655", businessType: "Startup",             goal: "Build / Redesign Website", budget: "₹5,000 – ₹15,000 / month" },
    { name: "Sunitha Reddy",  phone: "+91 9700112233", businessType: "Education",           goal: "More Leads & Enquiries",   budget: "₹15,000 – ₹50,000 / month" },
    { name: "Kiran Malhotra", phone: "+91 9811223344", businessType: "E-commerce",          goal: "More Sales & Revenue",     budget: "₹50,000+ / month" },
  ];
  const leads = demos.map((d, i) => ({
    ...d, id: `demo_${i}`,
    timestamp: new Date(Date.now() - i * 18_000_000).toISOString(),
    status: statuses[i],
    tags: computeTags(d),
  }));
  localStorage.setItem("snr_leads_v1", JSON.stringify(leads));
}

/* ── Component ───────────────────────────────────────────────────────── */

type Stats = { total: number; todayCount: number; hotCount: number; highIntent: number; newCount: number };

export default function AdminPage() {
  const [leads,         setLeads]         = useState<Lead[]>([]);
  const [stats,         setStats]         = useState<Stats>({ total: 0, todayCount: 0, hotCount: 0, highIntent: 0, newCount: 0 });
  const [tab,           setTab]           = useState<FilterTab>("all");
  const [view,          setView]          = useState<"table" | "pipeline">("table");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [search,        setSearch]        = useState("");
  const [loading,       setLoading]       = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    const [data, s] = await Promise.all([getLeadsAsync(), getDashboardStats()]);
    setLeads(data);
    setStats(s);
    setLoading(false);
  }, []);

  useEffect(() => {
    seedDemo().then(refresh);

    // Real-time subscription (Supabase only)
    const unsubscribe = subscribeToLeads((newLead) => {
      setLeads((prev) => [newLead, ...prev]);
      setStats((s) => ({ ...s, total: s.total + 1, newCount: s.newCount + 1, todayCount: s.todayCount + 1 }));
    });

    return () => { unsubscribe?.(); };
  }, [refresh]);

  async function handleStatus(id: string, status: LeadStatus) {
    await updateLeadStatusAsync(id, status);
    refresh();
  }

  async function handleDelete(id: string) {
    await deleteLeadAsync(id);
    setConfirmDelete(null);
    refresh();
  }

  const filtered = leads.filter((l) => {
    const matchTab = tab === "all" || l.status === tab;
    const q = search.toLowerCase();
    const matchSearch = !q ||
      l.name.toLowerCase().includes(q) ||
      l.phone.includes(q) ||
      l.businessType.toLowerCase().includes(q);
    return matchTab && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-white">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#0D1528]/95 backdrop-blur border-b border-white/[0.07] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-white font-bold text-base">SNR Lead Dashboard</h1>
              <p className="text-slate-500 text-xs flex items-center gap-1.5">
                {isSupabaseConfigured ? (
                  <><span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />Supabase · Real-time · {leads.length} leads</>
                ) : (
                  <><span className="w-1.5 h-1.5 rounded-full bg-yellow-400 inline-block" />localStorage mode · {leads.length} leads</>
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={refresh} title="Refresh"
              className={`px-3 py-2 rounded-lg border border-white/[0.1] text-slate-400 hover:text-white text-sm transition-colors ${loading ? "animate-pulse" : ""}`}
            >
              <svg className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
            <button
              onClick={() => setView(v => v === "table" ? "pipeline" : "table")}
              className="px-4 py-2 rounded-lg border border-white/[0.1] text-slate-300 hover:text-white hover:border-white/20 text-sm transition-colors flex items-center gap-1.5"
            >
              {view === "table" ? (
                <><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" /></svg>Pipeline</>
              ) : (
                <><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18M10 6h11M10 18h11M3 6h.01M3 18h.01" /></svg>Table</>
              )}
            </button>
            <button
              onClick={exportCSVAsync}
              className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white text-sm font-semibold transition-colors flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export CSV
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Total Leads",    value: stats.total,      color: "text-blue-400" },
            { label: "New Today",      value: stats.todayCount, color: "text-green-400" },
            { label: "🔥 Hot Leads",   value: stats.hotCount,   color: "text-red-400" },
            { label: "📞 High Intent", value: stats.highIntent, color: "text-purple-400" },
          ].map((s) => (
            <div key={s.label} className="bg-[#111C35] rounded-2xl p-5 border border-white/[0.07]">
              <p className="text-slate-500 text-xs mb-1">{s.label}</p>
              <p className={`text-3xl font-bold ${s.color} ${loading ? "animate-pulse" : ""}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Search + Filter tabs */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {TABS.map((t) => {
              const count = t.id === "all" ? leads.length : leads.filter(l => l.status === t.id).length;
              return (
                <button key={t.id} onClick={() => setTab(t.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    tab === t.id ? "bg-blue-600 text-white border-blue-600" : "bg-white/[0.04] text-slate-400 border-white/[0.08] hover:text-white"
                  }`}
                >
                  {t.label} <span className="opacity-60">({count})</span>
                </button>
              );
            })}
          </div>
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, phone, business..."
            className="bg-[#111C35] border border-white/[0.1] rounded-xl px-4 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 w-full sm:w-64"
          />
        </div>

        {/* TABLE VIEW */}
        {view === "table" && (
          <div className="bg-[#111C35] rounded-2xl border border-white/[0.07] overflow-hidden">
            {loading && leads.length === 0 ? (
              <div className="py-20 text-center text-slate-500">
                <svg className="w-7 h-7 text-blue-400 animate-spin mx-auto mb-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <p className="font-medium">Loading leads…</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="py-20 text-center text-slate-500">
                <p className="text-4xl mb-3">📭</p>
                <p className="font-medium">No leads found</p>
                <p className="text-xs mt-1">Submit the lead form on the main site to see leads here.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/[0.06] text-slate-500 text-xs uppercase tracking-wider">
                      {["Contact", "Business", "Goal", "Budget", "Tags", "Status", "Date", "Actions"].map((h) => (
                        <th key={h} className="text-left px-5 py-3 font-semibold whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((lead, i) => {
                      const sm = STATUS_META[lead.status];
                      return (
                        <tr key={lead.id}
                          className={`border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors ${i % 2 === 0 ? "" : "bg-white/[0.01]"}`}
                        >
                          <td className="px-5 py-4">
                            <p className="text-white font-semibold">{lead.name}</p>
                            <a href={`tel:${lead.phone}`} className="text-blue-400 text-xs hover:underline">{lead.phone}</a>
                          </td>
                          <td className="px-5 py-4 text-slate-300 whitespace-nowrap">{lead.businessType}</td>
                          <td className="px-5 py-4 text-slate-400 text-xs max-w-[150px]">{lead.goal}</td>
                          <td className="px-5 py-4 text-slate-300 whitespace-nowrap text-xs">{lead.budget}</td>
                          <td className="px-5 py-4">
                            <div className="flex flex-col gap-1">
                              {lead.tags.map((tag) => (
                                <span key={tag} className="text-xs whitespace-nowrap">{tag}</span>
                              ))}
                            </div>
                          </td>
                          <td className="px-5 py-4">
                            <select
                              value={lead.status}
                              onChange={(e) => handleStatus(lead.id, e.target.value as LeadStatus)}
                              className={`text-xs font-semibold px-2 py-1 rounded-lg border bg-transparent cursor-pointer ${sm.color}`}
                            >
                              {(Object.keys(STATUS_META) as LeadStatus[]).map((s) => (
                                <option key={s} value={s} className="bg-[#111C35] text-white">{STATUS_META[s].label}</option>
                              ))}
                            </select>
                          </td>
                          <td className="px-5 py-4 text-slate-500 text-xs whitespace-nowrap">
                            {new Date(lead.timestamp).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "2-digit" })}
                            <br />
                            {new Date(lead.timestamp).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2">
                              <a
                                href={`https://wa.me/${lead.phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi ${lead.name}, this is SNR Digital Marketing. We received your enquiry for ${lead.goal}. When is a good time to talk?`)}`}
                                target="_blank" rel="noopener noreferrer" title="WhatsApp"
                                className="w-7 h-7 rounded-lg bg-green-500/10 hover:bg-green-500/25 text-green-400 flex items-center justify-center transition-colors"
                              >
                                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                              </a>
                              <a href={`tel:${lead.phone}`} title="Call"
                                className="w-7 h-7 rounded-lg bg-blue-500/10 hover:bg-blue-500/25 text-blue-400 flex items-center justify-center transition-colors">
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                              </a>
                              <button onClick={() => setConfirmDelete(lead.id)} title="Delete"
                                className="w-7 h-7 rounded-lg bg-red-500/10 hover:bg-red-500/25 text-red-400 flex items-center justify-center transition-colors">
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* PIPELINE VIEW */}
        {view === "pipeline" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PIPELINE.map((stage) => {
              const stageLeads = leads.filter((l) => l.status === stage.id);
              return (
                <div key={stage.id} className={`bg-[#111C35] rounded-2xl border ${stage.color} p-4`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-semibold text-sm">{stage.label}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/[0.07] text-slate-400 font-medium">{stageLeads.length}</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    {stageLeads.length === 0 && <p className="text-slate-600 text-xs text-center py-4">No leads</p>}
                    {stageLeads.map((lead) => (
                      <div key={lead.id} className="bg-[#0A0F1E] rounded-xl p-3 border border-white/[0.06] space-y-2">
                        <p className="text-white text-sm font-semibold">{lead.name}</p>
                        <p className="text-slate-500 text-xs">{lead.businessType}</p>
                        <div className="flex flex-wrap gap-1">
                          {lead.tags.map((tag) => <span key={tag} className="text-xs">{tag}</span>)}
                        </div>
                        <div className="flex gap-1.5 pt-1">
                          <a href={`https://wa.me/${lead.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer"
                            className="flex-1 py-1 text-center text-xs rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/25 transition-colors">WhatsApp</a>
                          {stage.id !== "converted" && (
                            <button
                              onClick={() => handleStatus(lead.id,
                                stage.id === "new" ? "contacted" :
                                stage.id === "contacted" ? "warm" : "converted"
                              )}
                              className="flex-1 py-1 text-center text-xs rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/25 transition-colors"
                            >Move →</button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <p className="text-slate-600 text-xs text-center">
          SNR Lead Dashboard ·{" "}
          {isSupabaseConfigured
            ? "Data stored in Supabase PostgreSQL database"
            : "Data stored in browser localStorage — configure Supabase to enable cloud sync"}
        </p>
      </main>

      {/* Delete confirm modal */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111C35] rounded-2xl p-7 border border-red-500/20 max-w-sm w-full text-center shadow-2xl">
            <p className="text-2xl mb-3">🗑️</p>
            <h3 className="text-white font-bold text-lg mb-2">Delete this lead?</h3>
            <p className="text-slate-400 text-sm mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDelete(null)}
                className="flex-1 py-2.5 rounded-xl border border-white/10 text-slate-300 hover:text-white text-sm transition-colors">
                Cancel
              </button>
              <button onClick={() => handleDelete(confirmDelete)}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-sm transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
