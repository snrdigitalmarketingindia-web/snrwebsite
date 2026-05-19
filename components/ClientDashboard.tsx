"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import { getSession, clearSession } from "@/lib/dashboard-auth";
import { getClientById } from "@/lib/mock-analytics";
import type { MockClient, MonthData, KeywordRanking, CampaignMetrics } from "@/lib/mock-analytics";
import { getLeadsAsync, getDashboardStats, isSupabaseConfigured } from "@/lib/supabase/leads";
import type { Lead } from "@/lib/supabase/leads";

/* ─────────────────────── helpers ─────────────────────────── */

function fmt(n: number) {
  if (n >= 100000) return `${(n / 100000).toFixed(1)}L`;
  if (n >= 1000)   return `${(n / 1000).toFixed(1)}K`;
  return n.toString();
}

function inr(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

/* ─────────────────────── Sparkline ───────────────────────── */

function Sparkline({ values, color = "#3B82F6" }: { values: number[]; color?: string }) {
  if (values.length < 2) return null;
  const W = 100, H = 36;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const pts = values.map((v, i) => {
    const x = (i / (values.length - 1)) * W;
    const y = H - ((v - min) / range) * (H - 4) - 2;
    return [x, y] as [number, number];
  });
  const linePath  = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x} ${y}`).join(" ");
  const fillPath  = `${linePath} L ${W} ${H} L 0 ${H} Z`;

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="overflow-visible">
      <defs>
        <linearGradient id={`grad-${color.replace("#","")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={fillPath} fill={`url(#grad-${color.replace("#","")})`} />
      <path d={linePath}  stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─────────────────────── TrendBadge ──────────────────────── */

function TrendBadge({ value }: { value: number }) {
  const up = value >= 0;
  return (
    <span className={`inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full ${up ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>
      {up ? (
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
        </svg>
      ) : (
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
        </svg>
      )}
      {Math.abs(value)}%
    </span>
  );
}

/* ─────────────────────── MetricCard ──────────────────────── */

function MetricCard({
  icon, label, value, sub, trend, sparkData, color = "#3B82F6",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  trend?: number;
  sparkData?: number[];
  color?: string;
}) {
  return (
    <div className="bg-[#111C35] rounded-2xl border border-white/[0.07] p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
          {icon}
        </div>
        {trend !== undefined && <TrendBadge value={trend} />}
      </div>
      <div>
        <p className="text-2xl font-bold text-white">{value}</p>
        <p className="text-slate-500 text-xs mt-0.5">{label}</p>
        {sub && <p className="text-slate-600 text-xs mt-0.5">{sub}</p>}
      </div>
      {sparkData && <Sparkline values={sparkData} color={color} />}
    </div>
  );
}

/* ─────────────────────── CampaignCard ────────────────────── */

function CampaignCard({ title, icon, metrics, color }: { title: string; icon: React.ReactNode; metrics: CampaignMetrics; color: string }) {
  const items = [
    { label: "Impressions",   value: fmt(metrics.impressions) },
    { label: "Clicks",        value: fmt(metrics.clicks) },
    { label: "Leads",         value: metrics.leads.toString() },
    { label: "Ad Spend",      value: inr(metrics.spend) },
    { label: "Cost / Lead",   value: inr(metrics.cpl) },
    { label: "CTR",           value: `${metrics.ctr}%` },
  ];
  return (
    <div className="bg-[#111C35] rounded-2xl border border-white/[0.07] p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
            {icon}
          </div>
          <div>
            <p className="text-white font-semibold text-sm">{title}</p>
            <p className="text-slate-600 text-xs">This Month</p>
          </div>
        </div>
        <TrendBadge value={metrics.trend} />
      </div>
      <div className="grid grid-cols-3 gap-3">
        {items.map((item) => (
          <div key={item.label} className="bg-[#0A0F1E] rounded-xl p-3">
            <p className="text-white font-bold text-sm">{item.value}</p>
            <p className="text-slate-600 text-xs mt-0.5">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────── SEO Rankings ────────────────────── */

function SEORankingsTable({ keywords }: { keywords: KeywordRanking[] }) {
  return (
    <div className="bg-[#111C35] rounded-2xl border border-white/[0.07] p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-white font-semibold">Keyword Rankings</p>
          <p className="text-slate-500 text-xs mt-0.5">Google Search Position</p>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-600">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500" />Improved</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" />Dropped</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.05]">
              <th className="text-left text-slate-600 font-medium pb-3 text-xs">Keyword</th>
              <th className="text-center text-slate-600 font-medium pb-3 text-xs">Position</th>
              <th className="text-center text-slate-600 font-medium pb-3 text-xs">Change</th>
              <th className="text-right text-slate-600 font-medium pb-3 text-xs">Volume/mo</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {keywords.map((kw) => (
              <tr key={kw.keyword} className="group hover:bg-white/[0.02] transition-colors">
                <td className="py-3 pr-4">
                  <span className="text-slate-300 text-xs capitalize">{kw.keyword}</span>
                </td>
                <td className="py-3 text-center">
                  <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg font-bold text-xs ${
                    kw.position <= 3 ? "bg-green-500/15 text-green-400 border border-green-500/20" :
                    kw.position <= 10 ? "bg-blue-500/15 text-blue-400 border border-blue-500/20" :
                    "bg-white/[0.05] text-slate-400 border border-white/[0.08]"
                  }`}>
                    {kw.position}
                  </span>
                </td>
                <td className="py-3 text-center">
                  {kw.change === 0 ? (
                    <span className="text-slate-600 text-xs">—</span>
                  ) : (
                    <span className={`text-xs font-semibold flex items-center justify-center gap-0.5 ${kw.change > 0 ? "text-green-400" : "text-red-400"}`}>
                      {kw.change > 0 ? "↑" : "↓"} {Math.abs(kw.change)}
                    </span>
                  )}
                </td>
                <td className="py-3 text-right">
                  <span className="text-slate-500 text-xs">{kw.searchVolume.toLocaleString("en-IN")}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─────────────────────── Bar Chart ───────────────────────── */

function MonthlyBarChart({ data, field, label, color }: {
  data: MonthData[];
  field: keyof MonthData;
  label: string;
  color: string;
}) {
  const values = data.map((d) => d[field] as number);
  const max = Math.max(...values);
  return (
    <div>
      <p className="text-slate-500 text-xs mb-3">{label}</p>
      <div className="flex items-end gap-2 h-24">
        {data.map((d, i) => {
          const height = Math.round(((d[field] as number) / max) * 100);
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
              <div
                className="w-full rounded-t-sm transition-all duration-500"
                style={{ height: `${height}%`, background: `${color}`, opacity: i === data.length - 1 ? 1 : 0.4 + (i / data.length) * 0.5 }}
              />
              <span className="text-slate-700 text-[10px] whitespace-nowrap">{d.month.split(" ")[0]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────── Traffic Card ────────────────────── */

function TrafficCard({ client }: { client: MockClient }) {
  const t = client.data.websiteTraffic;
  return (
    <div className="bg-[#111C35] rounded-2xl border border-white/[0.07] p-6">
      <p className="text-white font-semibold mb-1">Website Traffic</p>
      <p className="text-slate-500 text-xs mb-5">This Month</p>
      <div className="grid grid-cols-2 gap-3 mb-5">
        {[
          { label: "Sessions",       value: fmt(t.sessions) },
          { label: "Page Views",     value: fmt(t.pageViews) },
          { label: "Bounce Rate",    value: `${t.bounceRate}%` },
          { label: "Avg Duration",   value: t.avgDuration },
        ].map((item) => (
          <div key={item.label} className="bg-[#0A0F1E] rounded-xl p-3">
            <p className="text-white font-bold text-sm">{item.value}</p>
            <p className="text-slate-600 text-xs mt-0.5">{item.label}</p>
          </div>
        ))}
      </div>
      <p className="text-slate-500 text-xs mb-3">Top Pages</p>
      <div className="space-y-2">
        {t.topPages.map((pg) => {
          const pct = Math.round((pg.visits / t.sessions) * 100);
          return (
            <div key={pg.page}>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-400 font-mono truncate max-w-[70%]">{pg.page}</span>
                <span className="text-slate-500">{fmt(pg.visits)}</span>
              </div>
              <div className="h-1 bg-white/[0.05] rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────── PDF Export ──────────────────────── */

function exportPDF(client: MockClient) {
  const d = client.data;
  const now = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>SNR Digital Marketing — ${client.name} Report</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #fff; color: #1e293b; font-size: 13px; padding: 40px; }
    .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 32px; padding-bottom: 20px; border-bottom: 2px solid #e2e8f0; }
    .logo { font-size: 22px; font-weight: 800; color: #1e293b; }
    .logo span { color: #2563eb; }
    .report-meta { text-align: right; }
    .report-meta h2 { font-size: 16px; color: #1e293b; }
    .report-meta p { color: #64748b; font-size: 12px; margin-top: 3px; }
    .trust-banner { background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 12px 16px; margin-bottom: 24px; color: #1e40af; font-size: 12px; }
    h3 { font-size: 14px; font-weight: 700; color: #1e293b; margin-bottom: 12px; margin-top: 24px; }
    .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 24px; }
    .card { border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px; }
    .card .val { font-size: 22px; font-weight: 800; color: #1e293b; }
    .card .lbl { font-size: 11px; color: #64748b; margin-top: 3px; }
    .card .trend { font-size: 11px; color: #16a34a; font-weight: 600; margin-top: 4px; }
    .table { width: 100%; border-collapse: collapse; }
    .table th { text-align: left; font-size: 11px; color: #94a3b8; font-weight: 600; padding: 8px; border-bottom: 1px solid #e2e8f0; background: #f8fafc; }
    .table td { padding: 8px; border-bottom: 1px solid #f1f5f9; font-size: 12px; color: #374151; }
    .pos { display: inline-block; width: 24px; height: 24px; border-radius: 6px; text-align: center; line-height: 24px; font-weight: 700; font-size: 11px; }
    .pos-top3 { background: #dcfce7; color: #15803d; }
    .pos-10 { background: #dbeafe; color: #1d4ed8; }
    .pos-other { background: #f1f5f9; color: #64748b; }
    .up { color: #16a34a; font-weight: 600; }
    .down { color: #dc2626; font-weight: 600; }
    .ads-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .section-card { border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px; }
    .section-card h4 { font-size: 13px; font-weight: 700; margin-bottom: 10px; color: #1e293b; }
    .footer { margin-top: 32px; padding-top: 16px; border-top: 1px solid #e2e8f0; text-align: center; color: #94a3b8; font-size: 11px; }
    @media print { body { padding: 24px; } }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="logo">SNR <span>Digital</span> Marketing</div>
      <p style="color:#64748b;font-size:12px;margin-top:4px">AI-Powered Growth & Reporting Platform</p>
    </div>
    <div class="report-meta">
      <h2>Monthly Performance Report</h2>
      <p>${client.name} &bull; ${client.industry}</p>
      <p>Generated: ${now}</p>
      <p>Campaign start: ${client.campaignStart}</p>
    </div>
  </div>

  <div class="trust-banner">
    ✓ SNR Digital Marketing provides transparent, data-driven reporting for all clients. Helping businesses across India track real growth.
  </div>

  <h3>Campaign Overview</h3>
  <div class="grid">
    <div class="card">
      <div class="val">${d.summary.totalLeads}</div>
      <div class="lbl">Total Leads</div>
      <div class="trend">↑ ${d.summary.leadsChange}% vs last month</div>
    </div>
    <div class="card">
      <div class="val">${fmt(d.summary.organicTraffic)}</div>
      <div class="lbl">Organic Traffic</div>
      <div class="trend">↑ ${d.summary.trafficChange}% growth</div>
    </div>
    <div class="card">
      <div class="val">${d.summary.totalCalls}</div>
      <div class="lbl">Calls Received</div>
    </div>
    <div class="card">
      <div class="val">${d.summary.roi}×</div>
      <div class="lbl">Return on Investment</div>
      <div class="trend" style="color:#2563eb">Campaign ROI</div>
    </div>
  </div>

  <h3>SEO Keyword Rankings</h3>
  <table class="table">
    <thead>
      <tr>
        <th>Keyword</th>
        <th>Position</th>
        <th>Change</th>
        <th>Monthly Volume</th>
      </tr>
    </thead>
    <tbody>
      ${d.seoKeywords.map((k) => `
      <tr>
        <td>${k.keyword}</td>
        <td><span class="pos ${k.position <= 3 ? "pos-top3" : k.position <= 10 ? "pos-10" : "pos-other"}">${k.position}</span></td>
        <td class="${k.change > 0 ? "up" : k.change < 0 ? "down" : ""}">${k.change > 0 ? "↑ " : k.change < 0 ? "↓ " : ""}${Math.abs(k.change) || "–"}</td>
        <td>${k.searchVolume.toLocaleString("en-IN")}</td>
      </tr>`).join("")}
    </tbody>
  </table>

  <h3>Paid Advertising Performance</h3>
  <div class="ads-grid">
    <div class="section-card">
      <h4>Google Ads</h4>
      <table class="table">
        <tbody>
          <tr><td>Impressions</td><td><b>${fmt(d.googleAds.impressions)}</b></td></tr>
          <tr><td>Clicks</td><td><b>${fmt(d.googleAds.clicks)}</b></td></tr>
          <tr><td>Leads Generated</td><td><b>${d.googleAds.leads}</b></td></tr>
          <tr><td>Ad Spend</td><td><b>${inr(d.googleAds.spend)}</b></td></tr>
          <tr><td>Cost Per Lead</td><td><b>${inr(d.googleAds.cpl)}</b></td></tr>
          <tr><td>CTR</td><td><b>${d.googleAds.ctr}%</b></td></tr>
        </tbody>
      </table>
    </div>
    <div class="section-card">
      <h4>Meta Ads (Facebook & Instagram)</h4>
      <table class="table">
        <tbody>
          <tr><td>Impressions</td><td><b>${fmt(d.metaAds.impressions)}</b></td></tr>
          <tr><td>Clicks</td><td><b>${fmt(d.metaAds.clicks)}</b></td></tr>
          <tr><td>Leads Generated</td><td><b>${d.metaAds.leads}</b></td></tr>
          <tr><td>Ad Spend</td><td><b>${inr(d.metaAds.spend)}</b></td></tr>
          <tr><td>Cost Per Lead</td><td><b>${inr(d.metaAds.cpl)}</b></td></tr>
          <tr><td>CTR</td><td><b>${d.metaAds.ctr}%</b></td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <h3>Website Traffic</h3>
  <div class="grid">
    <div class="card"><div class="val">${fmt(d.websiteTraffic.sessions)}</div><div class="lbl">Sessions</div></div>
    <div class="card"><div class="val">${fmt(d.websiteTraffic.pageViews)}</div><div class="lbl">Page Views</div></div>
    <div class="card"><div class="val">${d.websiteTraffic.bounceRate}%</div><div class="lbl">Bounce Rate</div></div>
    <div class="card"><div class="val">${d.websiteTraffic.avgDuration}</div><div class="lbl">Avg. Duration</div></div>
  </div>

  <div class="footer">
    <p>SNR Digital Marketing &bull; Hyderabad, India &bull; +91 99894 37777 &bull; snrdigitalmarketing.com</p>
    <p style="margin-top:4px">This report is confidential and prepared exclusively for ${client.name}. All data sourced from campaign analytics.</p>
  </div>
</body>
</html>`;

  const w = window.open("", "_blank");
  if (w) {
    w.document.write(html);
    w.document.close();
    setTimeout(() => w.print(), 600);
  }
}

/* ─────────────────────── Main Dashboard ──────────────────── */

type Tab = "overview" | "seo" | "ads" | "leads";

export default function ClientDashboard() {
  const router = useRouter();
  const { user, profile, loading: authLoading, signOut, isSupabaseReady } = useAuth();

  const [client,    setClient]    = useState<MockClient | null>(null);
  const [tab,       setTab]       = useState<Tab>("overview");
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [realLeads, setRealLeads] = useState<Lead[]>([]);
  const [realStats, setRealStats] = useState<{
    total: number; newCount: number; hotCount: number; highIntent: number; todayCount: number;
  } | null>(null);

  /* ── Auth gate ── */
  useEffect(() => {
    if (authLoading) return;

    if (isSupabaseReady) {
      // Real Supabase auth: must be logged in
      if (!user) { router.replace("/login"); return; }
      // Load mock display data based on profile role (admin sees demo, clients see their own)
      const fallbackId = profile?.role === "admin" ? "demo" : "demo";
      const c = getClientById(fallbackId);
      setClient(c ?? null);
      // Fetch real leads
      const uid = profile?.role === "admin" ? undefined : user.id;
      getLeadsAsync(uid).then(setRealLeads);
      getDashboardStats(uid).then(setRealStats);
    } else {
      // Demo mode: localStorage session
      const session = getSession();
      if (!session) { router.replace("/login"); return; }
      const c = getClientById(session.clientId);
      if (!c) { router.replace("/login"); return; }
      setClient(c);
    }
  }, [authLoading, user, profile, isSupabaseReady, router]);

  async function logout() {
    if (isSupabaseReady) {
      await signOut();
    } else {
      clearSession();
    }
    router.push("/login");
  }

  if (authLoading || !client) {
    return (
      <div className="min-h-screen bg-[#0A0F1E] flex items-center justify-center">
        <svg className="w-8 h-8 text-blue-400 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    );
  }

  // Use real stats when available, fall back to mock
  const liveLeadCount   = realStats?.total       ?? client.data.summary.totalLeads;
  const liveCallCount   = realStats?.todayCount   ?? client.data.summary.totalCalls;
  const liveWaCount     = realStats?.newCount     ?? client.data.summary.totalWhatsApp;

  const d  = client.data;
  const leadsSparkline = d.monthlyTrend.map((m) => m.leads);
  const trafficSparkline = d.monthlyTrend.map((m) => m.organicTraffic);

  const tabs: { id: Tab; label: string }[] = [
    { id: "overview", label: "Overview"    },
    { id: "seo",      label: "SEO"         },
    { id: "ads",      label: "Paid Ads"    },
    { id: "leads",    label: "Leads"       },
  ];

  return (
    <div className="min-h-screen bg-[#0A0F1E]">
      {/* ── Top Nav ── */}
      <header className="sticky top-0 z-40 bg-[#0A0F1E]/95 backdrop-blur border-b border-white/[0.06] px-6 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <Link href="/" className="text-white font-bold text-base tracking-tight flex-shrink-0">
            SNR <span className="text-blue-400">Digital</span>
          </Link>
          <span className="text-white/20 hidden sm:block">|</span>
          <span className="text-slate-400 text-sm truncate hidden sm:block">
            {isSupabaseReady ? (profile?.business_name ?? profile?.name ?? client.name) : client.name}
            <span className="ml-2 text-xs text-slate-600">• {client.industry}</span>
          </span>
          {isSupabaseReady && (
            <span className="hidden sm:flex items-center gap-1 text-xs text-green-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Live Data
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => exportPDF(client)}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400 text-xs font-semibold hover:bg-blue-600/20 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Download Report
          </button>

          {/* Avatar menu */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-9 h-9 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-sm"
            >
              {(isSupabaseReady ? (profile?.name ?? user?.email ?? client.name) : client.name)[0]?.toUpperCase()}
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-11 w-44 bg-[#111C35] border border-white/[0.07] rounded-xl shadow-2xl py-1 z-50">
                <div className="px-4 py-2 border-b border-white/[0.06]">
                  <p className="text-white text-xs font-semibold truncate">{isSupabaseReady ? (profile?.name ?? client.name) : client.name}</p>
                  <p className="text-slate-500 text-xs truncate">{isSupabaseReady ? (user?.email ?? "") : client.email}</p>
                </div>
                <button
                  onClick={() => exportPDF(client)}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-slate-400 hover:text-white text-xs hover:bg-white/[0.04] transition-colors sm:hidden"
                >
                  Download Report
                </button>
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-red-400 hover:text-red-300 text-xs hover:bg-red-500/5 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ── Trust Banner ── */}
      <div className="bg-blue-600/8 border-b border-blue-500/10 px-6 py-2.5 flex items-center justify-center gap-2">
        <svg className="w-4 h-4 text-blue-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
        <p className="text-blue-400 text-xs font-medium">
          We provide <strong className="text-blue-300">transparent reporting</strong> for all our clients &nbsp;·&nbsp; Helping businesses across India track real growth
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* ── Page header ── */}
        <div className="flex items-start justify-between flex-wrap gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">
              {isSupabaseReady ? (profile?.business_name ?? profile?.name ?? client.name) : client.name}
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Campaign active since {client.campaignStart} &nbsp;·&nbsp;
              Services: {client.services.join(", ")}
            </p>
            {isSupabaseReady && (
              <p className="text-xs text-green-400/80 mt-1 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
                Connected to Supabase — {realStats ? `${realStats.total} real leads tracked` : "loading live data…"}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2 bg-[#111C35] border border-white/[0.07] rounded-xl px-4 py-2 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Campaign Active
          </div>
        </div>

        {/* ── Tab bar ── */}
        <div className="flex gap-1 mb-8 bg-[#111C35] rounded-xl p-1 w-fit border border-white/[0.07]">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                tab === t.id
                  ? "bg-blue-600 text-white shadow"
                  : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ═══════════════════ OVERVIEW ═══════════════════════ */}
        {tab === "overview" && (
          <div className="space-y-6">
            {/* Summary metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <MetricCard
                icon={<svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>}
                label="Total Leads"
                value={liveLeadCount.toString()}
                trend={d.summary.leadsChange}
                sparkData={leadsSparkline}
                color="#3B82F6"
              />
              <MetricCard
                icon={<svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>}
                label="Organic Traffic"
                value={fmt(d.summary.organicTraffic)}
                trend={d.summary.trafficChange}
                sparkData={trafficSparkline}
                color="#22C55E"
              />
              <MetricCard
                icon={<svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>}
                label="Calls Received"
                value={d.summary.totalCalls.toString()}
                color="#A855F7"
              />
              <MetricCard
                icon={<svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                label="Campaign ROI"
                value={`${d.summary.roi}×`}
                sub={`${inr(d.summary.adSpend)} total spend`}
                color="#F59E0B"
              />
            </div>

            {/* Monthly trend */}
            <div className="bg-[#111C35] rounded-2xl border border-white/[0.07] p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-white font-semibold">Growth Trend</p>
                  <p className="text-slate-500 text-xs mt-0.5">Last {d.monthlyTrend.length} months</p>
                </div>
                <TrendBadge value={d.summary.leadsChange} />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                <MonthlyBarChart data={d.monthlyTrend} field="leads"          label="Monthly Leads"            color="#3B82F6" />
                <MonthlyBarChart data={d.monthlyTrend} field="organicTraffic" label="Organic Traffic"          color="#22C55E" />
                <MonthlyBarChart data={d.monthlyTrend} field="adSpend"        label="Ad Spend (₹)" color="#F59E0B" />
              </div>
            </div>

            {/* Bottom row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Lead sources */}
              <div className="bg-[#111C35] rounded-2xl border border-white/[0.07] p-6">
                <p className="text-white font-semibold mb-1">Lead Sources</p>
                <p className="text-slate-500 text-xs mb-5">How enquiries reached you</p>
                {[
                  { label: "Google Ads",         count: d.googleAds.leads, color: "#3B82F6" },
                  { label: "Meta Ads",            count: d.metaAds.leads,   color: "#8B5CF6" },
                  { label: "Organic (SEO)",       count: d.summary.totalLeads - d.googleAds.leads - d.metaAds.leads, color: "#22C55E" },
                  { label: "WhatsApp Direct",     count: d.summary.totalWhatsApp,  color: "#F59E0B" },
                  { label: "Phone Calls",         count: d.summary.totalCalls,     color: "#EC4899" },
                ].map((src) => {
                  const pct = Math.round((src.count / (d.summary.totalLeads + d.summary.totalCalls + d.summary.totalWhatsApp)) * 100);
                  return (
                    <div key={src.label} className="mb-3">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="text-slate-300">{src.label}</span>
                        <span className="text-slate-500">{src.count} leads</span>
                      </div>
                      <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: src.color }} />
                      </div>
                    </div>
                  );
                })}
              </div>

              <TrafficCard client={client} />
            </div>
          </div>
        )}

        {/* ═══════════════════ SEO ══════════════════════════ */}
        {tab === "seo" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Keywords on Page 1",  value: d.seoKeywords.filter(k => k.position <= 10).length.toString(), color: "#22C55E" },
                { label: "Top 3 Positions",     value: d.seoKeywords.filter(k => k.position <= 3).length.toString(),  color: "#3B82F6" },
                { label: "Rankings Improved",   value: d.seoKeywords.filter(k => k.change > 0).length.toString(),     color: "#F59E0B" },
                { label: "Organic Traffic",     value: fmt(d.summary.organicTraffic),                                 color: "#A855F7" },
              ].map((m) => (
                <div key={m.label} className="bg-[#111C35] rounded-2xl border border-white/[0.07] p-5">
                  <p className="text-2xl font-bold" style={{ color: m.color }}>{m.value}</p>
                  <p className="text-slate-500 text-xs mt-1">{m.label}</p>
                </div>
              ))}
            </div>
            <SEORankingsTable keywords={d.seoKeywords} />
            <div className="bg-[#111C35] rounded-2xl border border-white/[0.07] p-6">
              <p className="text-white font-semibold mb-5">Organic Traffic Growth</p>
              <MonthlyBarChart data={d.monthlyTrend} field="organicTraffic" label="Monthly Organic Sessions" color="#22C55E" />
            </div>
          </div>
        )}

        {/* ═══════════════════ ADS ══════════════════════════ */}
        {tab === "ads" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Total Ad Leads",   value: (d.googleAds.leads + d.metaAds.leads).toString(), color: "#3B82F6" },
                { label: "Total Ad Spend",   value: inr(d.googleAds.spend + d.metaAds.spend),         color: "#F59E0B" },
                { label: "Avg Cost / Lead",  value: inr(Math.round((d.googleAds.spend + d.metaAds.spend) / (d.googleAds.leads + d.metaAds.leads))), color: "#22C55E" },
                { label: "Campaign ROI",     value: `${d.summary.roi}×`,                              color: "#A855F7" },
              ].map((m) => (
                <div key={m.label} className="bg-[#111C35] rounded-2xl border border-white/[0.07] p-5">
                  <p className="text-2xl font-bold" style={{ color: m.color }}>{m.value}</p>
                  <p className="text-slate-500 text-xs mt-1">{m.label}</p>
                </div>
              ))}
            </div>
            <CampaignCard
              title="Google Search Ads"
              color="#3B82F6"
              metrics={d.googleAds}
              icon={
                <svg className="w-4 h-4 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              }
            />
            <CampaignCard
              title="Meta Ads (Facebook & Instagram)"
              color="#8B5CF6"
              metrics={d.metaAds}
              icon={
                <svg className="w-4 h-4 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              }
            />
            <div className="bg-[#111C35] rounded-2xl border border-white/[0.07] p-6">
              <p className="text-white font-semibold mb-5">Monthly Ad Spend</p>
              <MonthlyBarChart data={d.monthlyTrend} field="adSpend" label="Ad Spend (₹)" color="#F59E0B" />
            </div>
          </div>
        )}

        {/* ═══════════════════ LEADS ════════════════════════ */}
        {tab === "leads" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <MetricCard
                icon={<svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>}
                label="Total Leads" value={d.summary.totalLeads.toString()} trend={d.summary.leadsChange} sparkData={leadsSparkline} color="#3B82F6"
              />
              <MetricCard
                icon={<svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>}
                label="Phone Calls" value={d.summary.totalCalls.toString()} color="#A855F7"
              />
              <MetricCard
                icon={<svg className="w-4 h-4 text-green-400" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>}
                label="WhatsApp Enquiries" value={d.summary.totalWhatsApp.toString()} color="#22C55E"
              />
              <MetricCard
                icon={<svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" /></svg>}
                label="Form Submissions" value={(d.summary.totalLeads - d.summary.totalCalls - d.summary.totalWhatsApp).toString()} color="#F59E0B"
              />
            </div>

            {/* Monthly leads chart */}
            <div className="bg-[#111C35] rounded-2xl border border-white/[0.07] p-6">
              <p className="text-white font-semibold mb-5">Monthly Lead Volume</p>
              <MonthlyBarChart data={d.monthlyTrend} field="leads" label="Total Leads Per Month" color="#3B82F6" />
            </div>

            {/* Lead breakdown table */}
            <div className="bg-[#111C35] rounded-2xl border border-white/[0.07] p-6">
              <p className="text-white font-semibold mb-5">Monthly Breakdown</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/[0.05]">
                      {["Month", "Total Leads", "Calls", "WhatsApp", "Ad Spend"].map((h) => (
                        <th key={h} className="text-left text-slate-600 font-medium pb-3 text-xs pr-4">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {[...d.monthlyTrend].reverse().map((m, i) => (
                      <tr key={m.month} className={i === 0 ? "bg-blue-500/[0.04]" : ""}>
                        <td className="py-3 pr-4 text-xs text-slate-300 font-medium">{m.month} {i === 0 ? <span className="ml-1 text-blue-400 text-[10px]">Latest</span> : ""}</td>
                        <td className="py-3 pr-4 text-xs text-white font-bold">{m.leads}</td>
                        <td className="py-3 pr-4 text-xs text-slate-400">{m.calls}</td>
                        <td className="py-3 pr-4 text-xs text-slate-400">{m.whatsapp}</td>
                        <td className="py-3 pr-4 text-xs text-slate-400">{inr(m.adSpend)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── Bottom PDF export CTA ── */}
        <div className="mt-10 bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white font-semibold">Monthly Performance Report</p>
            <p className="text-slate-400 text-sm mt-1">Download a PDF summary for your records or client meetings.</p>
          </div>
          <button
            onClick={() => exportPDF(client)}
            className="btn-green px-8 py-3 rounded-xl font-bold text-sm flex items-center gap-2 flex-shrink-0"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Download Monthly Report (PDF)
          </button>
        </div>

      </div>
    </div>
  );
}
