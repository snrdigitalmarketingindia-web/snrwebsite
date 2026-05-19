"use client";
import { useState, useEffect } from "react";
import {
  generateCampaign, getCampaigns, saveCampaign, updateCampaignStatus, deleteCampaign,
  type GeneratedCampaign, type CampaignInput,
} from "@/lib/campaign-engine";

/* ── Constants ───────────────────────────────────────────────── */

const BUSINESS_TYPES = [
  "Hospital / Clinic", "Real Estate", "Startup", "E-commerce",
  "Education", "Restaurant", "Retail", "IT / Software", "Finance / Insurance",
];

const GOALS = [
  "More Leads & Enquiries", "More Calls & WhatsApp",
  "More Sales & Revenue", "Brand Awareness", "App Downloads",
];

const BUDGETS = [
  "₹5,000 – ₹15,000 / month",
  "₹15,000 – ₹50,000 / month",
  "₹50,000+ / month",
];

const STATUS_META = {
  suggested: { label: "Suggested",  color: "bg-blue-500/15 text-blue-300 border-blue-500/30"  },
  active:    { label: "Active",     color: "bg-green-500/15 text-green-300 border-green-500/30" },
  paused:    { label: "Paused",     color: "bg-slate-500/15 text-slate-300 border-slate-500/30" },
};

const DETAIL_TABS = [
  "Overview", "Google Ads", "Meta Ads", "Landing Page", "Creative Ideas", "Simulation",
] as const;
type DetailTab = typeof DETAIL_TABS[number];

/* ── Generate steps (animation) ─────────────────────────────── */

const STEPS = [
  "Analysing business type…",
  "Generating keyword strategy…",
  "Writing ad headlines & descriptions…",
  "Building Meta Ads audience…",
  "Designing landing page structure…",
  "Running performance simulation…",
  "Finalising campaign plan…",
];

/* ── Small UI helpers ────────────────────────────────────────── */

function Tag({ children, color = "blue" }: { children: React.ReactNode; color?: "blue" | "green" | "purple" | "amber" }) {
  const cls = {
    blue:   "bg-blue-500/10 text-blue-400 border-blue-500/20",
    green:  "bg-green-500/10 text-green-400 border-green-500/20",
    purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    amber:  "bg-amber-500/10 text-amber-400 border-amber-500/20",
  }[color];
  return <span className={`text-xs px-2 py-0.5 rounded-full border ${cls}`}>{children}</span>;
}

function SectionCard({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#0A0F1E] rounded-2xl border border-white/[0.07] p-5">
      <p className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
        <span>{icon}</span>{title}
      </p>
      {children}
    </div>
  );
}

function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  function doCopy() {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
  return (
    <button onClick={doCopy}
      className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
        copied ? "bg-green-600 text-white" : "bg-white/[0.06] text-slate-300 hover:bg-white/[0.1]"
      }`}>
      {copied ? "✓ Copied" : label}
    </button>
  );
}

/* ── Detail view tabs ────────────────────────────────────────── */

function OverviewTab({ c }: { c: GeneratedCampaign }) {
  return (
    <div className="space-y-4">
      {/* Budget split */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total Budget",      value: c.googleAds.monthlyBudget.replace("₹", "₹") === c.metaAds.monthlyBudget ? c.googleAds.monthlyBudget : "Split below", color: "text-white" },
          { label: "Google Ads Budget", value: c.googleAds.monthlyBudget,  color: "text-blue-400"  },
          { label: "Meta Ads Budget",   value: c.metaAds.monthlyBudget,    color: "text-purple-400" },
        ].map((m) => (
          <div key={m.label} className="bg-[#0A0F1E] rounded-xl p-4 border border-white/[0.07]">
            <p className={`text-lg font-bold ${m.color}`}>{m.value}</p>
            <p className="text-slate-500 text-xs mt-0.5">{m.label}</p>
          </div>
        ))}
      </div>

      {/* Strategy notes */}
      <SectionCard title="Campaign Strategy" icon="🎯">
        <p className="text-slate-400 text-sm leading-relaxed">{c.strategyNotes}</p>
      </SectionCard>

      {/* CTA options */}
      <SectionCard title="CTA Options — Pick the Best" icon="🔘">
        <div className="flex flex-wrap gap-2">
          {c.ctaOptions.map((cta) => (
            <div key={cta} className="flex items-center gap-1">
              <span className="bg-blue-600/10 border border-blue-500/20 text-blue-400 text-xs px-3 py-1.5 rounded-lg font-medium">{cta}</span>
              <CopyButton text={cta} />
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Projected summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Projected Leads",  value: c.simulation.combined.totalLeads.toString(), color: "text-green-400"  },
          { label: "Avg Cost / Lead",  value: c.simulation.combined.avgCpl,                color: "text-blue-400"   },
          { label: "Total Ad Spend",   value: c.simulation.combined.totalSpend,             color: "text-amber-400"  },
          { label: "Projected ROI",    value: c.simulation.combined.projectedRoi,           color: "text-purple-400" },
        ].map((m) => (
          <div key={m.label} className="bg-[#0A0F1E] rounded-xl p-4 border border-white/[0.07] text-center">
            <p className={`text-xl font-bold ${m.color}`}>{m.value}</p>
            <p className="text-slate-500 text-xs mt-0.5">{m.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function GoogleAdsTab({ c }: { c: GeneratedCampaign }) {
  const g = c.googleAds;
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Campaign Type", value: g.campaignType,    color: "text-blue-400"  },
          { label: "Bid Strategy",  value: g.bidStrategy,     color: "text-green-400" },
          { label: "Daily Budget",  value: g.dailyBudget,     color: "text-amber-400" },
          { label: "Monthly",       value: g.monthlyBudget,   color: "text-purple-400"},
        ].map((m) => (
          <div key={m.label} className="bg-[#0A0F1E] rounded-xl p-4 border border-white/[0.07]">
            <p className={`text-sm font-bold ${m.color}`}>{m.value}</p>
            <p className="text-slate-500 text-xs mt-0.5">{m.label}</p>
          </div>
        ))}
      </div>

      <SectionCard title="Target Keywords" icon="🔑">
        <div className="flex flex-wrap gap-2 mb-3">
          {g.keywords.map((kw) => <Tag key={kw} color="blue">{kw}</Tag>)}
        </div>
        <CopyButton text={g.keywords.join("\n")} label="Copy All Keywords" />
      </SectionCard>

      <SectionCard title="Negative Keywords" icon="🚫">
        <div className="flex flex-wrap gap-2">
          {g.negativeKeywords.map((kw) => (
            <span key={kw} className="text-xs px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">{kw}</span>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Ad Headlines (10 Variants)" icon="📝">
        <div className="space-y-2">
          {g.headlines.map((h, i) => (
            <div key={i} className="flex items-center justify-between gap-3 bg-[#111C35] rounded-lg px-3 py-2 border border-white/[0.06]">
              <p className="text-slate-300 text-sm">{h}</p>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-slate-600 text-xs">{h.length}/30</span>
                <CopyButton text={h} />
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Ad Descriptions (5 Variants)" icon="📄">
        <div className="space-y-3">
          {g.descriptions.map((d, i) => (
            <div key={i} className="bg-[#111C35] rounded-lg px-4 py-3 border border-white/[0.06]">
              <p className="text-slate-300 text-sm leading-relaxed mb-2">{d}</p>
              <div className="flex items-center justify-between">
                <span className="text-slate-600 text-xs">{d.length}/90 chars</span>
                <CopyButton text={d} />
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Ad Extensions" icon="🔗">
        <div className="flex flex-wrap gap-2">
          {g.adExtensions.map((ext) => <Tag key={ext} color="green">{ext}</Tag>)}
        </div>
      </SectionCard>
    </div>
  );
}

function MetaAdsTab({ c }: { c: GeneratedCampaign }) {
  const m = c.metaAds;
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[
          { label: "Objective",     value: m.objective,     color: "text-purple-400" },
          { label: "Daily Budget",  value: m.dailyBudget,   color: "text-amber-400"  },
          { label: "Monthly",       value: m.monthlyBudget, color: "text-blue-400"   },
        ].map((item) => (
          <div key={item.label} className="bg-[#0A0F1E] rounded-xl p-4 border border-white/[0.07]">
            <p className={`text-sm font-bold ${item.color}`}>{item.value}</p>
            <p className="text-slate-500 text-xs mt-0.5">{item.label}</p>
          </div>
        ))}
      </div>

      <SectionCard title="Audience Targeting" icon="🎯">
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-slate-500 text-xs w-20 flex-shrink-0 pt-0.5">Age Range</span>
            <Tag color="blue">{m.audience.ageRange}</Tag>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-slate-500 text-xs w-20 flex-shrink-0 pt-0.5">Interests</span>
            <div className="flex flex-wrap gap-1.5">
              {m.audience.interests.map((i) => <Tag key={i} color="purple">{i}</Tag>)}
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-slate-500 text-xs w-20 flex-shrink-0 pt-0.5">Behaviors</span>
            <div className="flex flex-wrap gap-1.5">
              {m.audience.behaviors.map((b) => <Tag key={b} color="amber">{b}</Tag>)}
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-slate-500 text-xs w-20 flex-shrink-0 pt-0.5">Location</span>
            <span className="text-slate-300 text-xs">{m.audience.locations}</span>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Ad Formats" icon="📱">
        <div className="flex flex-wrap gap-2">
          {m.adFormats.map((f) => <Tag key={f} color="green">{f}</Tag>)}
        </div>
      </SectionCard>

      <SectionCard title="Primary Ad Copy" icon="✍️">
        <pre className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap font-sans bg-[#111C35] rounded-xl p-4 border border-white/[0.06]">{m.primaryText}</pre>
        <div className="mt-3"><CopyButton text={m.primaryText} label="Copy Ad Copy" /></div>
      </SectionCard>

      <SectionCard title="Hook Lines (for Reels / Stories)" icon="🪝">
        <div className="space-y-2">
          {m.hookLines.map((hook, i) => (
            <div key={i} className="flex items-start justify-between gap-3 bg-[#111C35] rounded-lg px-4 py-3 border border-white/[0.06]">
              <p className="text-slate-300 text-sm italic">{hook}</p>
              <CopyButton text={hook} />
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Creative Concept" icon="🎨">
        <p className="text-slate-400 text-sm leading-relaxed">{m.creativeConcept}</p>
      </SectionCard>

      <div className="bg-[#0A0F1E] rounded-xl p-4 border border-white/[0.07] flex items-center justify-between">
        <div>
          <p className="text-white text-sm font-semibold">Recommended CTA Button</p>
          <p className="text-slate-500 text-xs mt-0.5">Use this in your Meta Ads CTA field</p>
        </div>
        <span className="bg-blue-600 text-white text-sm font-bold px-4 py-2 rounded-xl">{m.ctaButton}</span>
      </div>
    </div>
  );
}

function LandingPageTab({ c }: { c: GeneratedCampaign }) {
  const lp = c.landingPage;
  return (
    <div className="space-y-4">
      {/* Hero section */}
      <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-2xl p-6">
        <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-2">Hero Section</p>
        <h2 className="text-white text-2xl font-bold mb-2">{lp.heroHeadline}</h2>
        <p className="text-slate-400 text-sm mb-4">{lp.subHeadline}</p>
        <div className="flex flex-wrap gap-2">
          <span className="bg-blue-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl">{lp.cta}</span>
          <span className="border border-white/20 text-slate-300 text-sm font-semibold px-5 py-2.5 rounded-xl">{lp.secondaryCta}</span>
        </div>
        <div className="mt-4 flex gap-2">
          <CopyButton text={lp.heroHeadline} label="Copy Headline" />
          <CopyButton text={lp.cta} label="Copy CTA" />
        </div>
      </div>

      {/* Above fold */}
      <SectionCard title="Above-Fold Checklist" icon="📐">
        <div className="space-y-2">
          {lp.aboveFold.map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5 flex-shrink-0">✓</span>
              <span className="text-slate-300 text-sm">{item}</span>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Sections */}
      <SectionCard title="Page Sections (in order)" icon="📋">
        <div className="space-y-3">
          {lp.sections.map((s, i) => (
            <div key={i} className="flex gap-3 bg-[#111C35] rounded-xl p-4 border border-white/[0.06]">
              <span className="w-6 h-6 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-400 text-xs flex items-center justify-center font-bold flex-shrink-0">{i + 1}</span>
              <div>
                <p className="text-white text-sm font-semibold">{s.title}</p>
                <p className="text-slate-500 text-xs mt-0.5">{s.description}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Trust elements */}
      <SectionCard title="Trust Elements to Include" icon="🛡️">
        <div className="flex flex-wrap gap-2">
          {lp.trustElements.map((t) => <Tag key={t} color="green">{t}</Tag>)}
        </div>
      </SectionCard>
    </div>
  );
}

function CreativeIdeasTab({ c }: { c: GeneratedCampaign }) {
  const ideas = c.creativeIdeas;
  return (
    <div className="space-y-4">
      <SectionCard title="Image Ad Concepts" icon="🖼️">
        <div className="space-y-2">
          {ideas.imageAds.map((idea, i) => (
            <div key={i} className="flex items-start gap-3 bg-[#111C35] rounded-lg p-3 border border-white/[0.06]">
              <span className="text-slate-600 text-xs w-4 flex-shrink-0">{i + 1}.</span>
              <p className="text-slate-300 text-sm">{idea}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Video Ad Concepts" icon="🎬">
        <div className="space-y-2">
          {ideas.videoAds.map((idea, i) => (
            <div key={i} className="flex items-start gap-3 bg-[#111C35] rounded-lg p-3 border border-white/[0.06]">
              <span className="text-slate-600 text-xs w-4 flex-shrink-0">{i + 1}.</span>
              <p className="text-slate-300 text-sm">{idea}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Reel / Short Video Hook Lines" icon="🪝">
        <div className="space-y-2">
          {ideas.reelHooks.map((hook, i) => (
            <div key={i} className="flex items-start justify-between gap-3 bg-[#111C35] rounded-lg px-4 py-3 border border-white/[0.06]">
              <p className="text-slate-300 text-sm italic">{hook}</p>
              <CopyButton text={hook} />
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Copy Angles to Test" icon="✏️">
        <div className="space-y-2">
          {ideas.copyAngles.map((angle, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
              <p className="text-slate-300 text-sm">{angle}</p>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

function SimulationTab({ c }: { c: GeneratedCampaign }) {
  const sim = c.simulation;
  return (
    <div className="space-y-4">
      {/* Disclaimer */}
      <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl px-4 py-3 flex items-start gap-2">
        <span className="text-amber-400 flex-shrink-0">⚠️</span>
        <p className="text-amber-400/80 text-xs leading-relaxed">
          These are projections based on industry benchmarks for the Indian market. Actual results will vary based on ad quality, landing page, competition, and seasonality. Use these as planning estimates only.
        </p>
      </div>

      {/* Combined summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Est. Leads",  value: sim.combined.totalLeads.toString(), color: "text-green-400"  },
          { label: "Avg Cost / Lead",   value: sim.combined.avgCpl,                color: "text-blue-400"   },
          { label: "Total Ad Spend",    value: sim.combined.totalSpend,             color: "text-amber-400"  },
          { label: "Projected ROI",     value: sim.combined.projectedRoi,           color: "text-purple-400" },
        ].map((m) => (
          <div key={m.label} className="bg-[#111C35] rounded-2xl p-5 border border-white/[0.07] text-center">
            <p className={`text-2xl font-bold ${m.color}`}>{m.value}</p>
            <p className="text-slate-500 text-xs mt-1">{m.label}</p>
          </div>
        ))}
      </div>

      {/* Google breakdown */}
      <div className="bg-[#0A0F1E] rounded-2xl border border-blue-500/10 p-5">
        <p className="text-white font-semibold mb-4 flex items-center gap-2">
          <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          Google Ads — Projected Performance
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {[
            { label: "Impressions", value: sim.google.impressions.toLocaleString("en-IN") },
            { label: "Clicks",      value: sim.google.clicks.toLocaleString("en-IN")      },
            { label: "CTR",         value: sim.google.ctr                                  },
            { label: "Est. Leads",  value: sim.google.leads.toString()                    },
            { label: "Cost / Lead", value: sim.google.cpl                                  },
            { label: "Ad Spend",    value: sim.google.spend                                },
          ].map((m) => (
            <div key={m.label} className="bg-[#111C35] rounded-xl p-3 text-center border border-blue-500/10">
              <p className="text-white font-bold text-sm">{m.value}</p>
              <p className="text-slate-600 text-xs mt-0.5">{m.label}</p>
            </div>
          ))}
        </div>
        {/* CTR bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>CTR Performance</span><span>{sim.google.ctr}</span>
          </div>
          <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${parseFloat(sim.google.ctr) * 10}%` }} />
          </div>
        </div>
      </div>

      {/* Meta breakdown */}
      <div className="bg-[#0A0F1E] rounded-2xl border border-purple-500/10 p-5">
        <p className="text-white font-semibold mb-4 flex items-center gap-2">
          <svg className="w-4 h-4 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          Meta Ads — Projected Performance
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {[
            { label: "Reach",       value: sim.meta.reach.toLocaleString("en-IN")   },
            { label: "Clicks",      value: sim.meta.clicks.toLocaleString("en-IN")  },
            { label: "CTR",         value: sim.meta.ctr                              },
            { label: "Est. Leads",  value: sim.meta.leads.toString()                },
            { label: "Cost / Lead", value: sim.meta.cpl                              },
            { label: "Ad Spend",    value: sim.meta.spend                            },
          ].map((m) => (
            <div key={m.label} className="bg-[#111C35] rounded-xl p-3 text-center border border-purple-500/10">
              <p className="text-white font-bold text-sm">{m.value}</p>
              <p className="text-slate-600 text-xs mt-0.5">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Campaign Card ───────────────────────────────────────────── */

function CampaignCard({
  campaign, onSelect, onStatus, onDelete,
}: {
  campaign: GeneratedCampaign;
  onSelect: (c: GeneratedCampaign) => void;
  onStatus: (id: string, s: GeneratedCampaign["status"]) => void;
  onDelete: (id: string) => void;
}) {
  const sm = STATUS_META[campaign.status];
  const sim = campaign.simulation.combined;
  return (
    <div
      className="bg-[#111C35] rounded-2xl border border-white/[0.07] p-5 cursor-pointer hover:border-blue-500/30 transition-all group"
      onClick={() => onSelect(campaign)}
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="min-w-0">
          <p className="text-white font-semibold text-sm truncate group-hover:text-blue-400 transition-colors">{campaign.name}</p>
          <p className="text-slate-500 text-xs mt-0.5">{new Date(campaign.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "2-digit" })}</p>
        </div>
        <span className={`text-xs font-semibold px-2 py-1 rounded-lg border flex-shrink-0 ${sm.color}`}>{sm.label}</span>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { label: "Est. Leads", value: sim.totalLeads.toString(), color: "text-green-400"  },
          { label: "Avg CPL",    value: sim.avgCpl,                color: "text-blue-400"   },
          { label: "Budget",     value: campaign.googleAds.monthlyBudget, color: "text-amber-400" },
        ].map((m) => (
          <div key={m.label} className="bg-[#0A0F1E] rounded-xl p-2.5 text-center border border-white/[0.05]">
            <p className={`text-sm font-bold ${m.color}`}>{m.value}</p>
            <p className="text-slate-600 text-[10px] mt-0.5">{m.label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        <Tag color="blue">{campaign.input.businessType}</Tag>
        <Tag color="green">{campaign.input.goal}</Tag>
        <Tag color="purple">{campaign.input.location || "All Areas"}</Tag>
      </div>

      <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
        <select
          value={campaign.status}
          onChange={(e) => onStatus(campaign.id, e.target.value as GeneratedCampaign["status"])}
          className={`text-xs font-semibold px-2 py-1 rounded-lg border bg-transparent cursor-pointer flex-1 ${sm.color}`}
        >
          <option value="suggested" className="bg-[#111C35] text-white">Suggested</option>
          <option value="active"    className="bg-[#111C35] text-white">Active</option>
          <option value="paused"    className="bg-[#111C35] text-white">Paused</option>
        </select>
        <button
          onClick={() => onDelete(campaign.id)}
          className="w-8 h-8 rounded-lg bg-red-500/10 hover:bg-red-500/25 text-red-400 flex items-center justify-center transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ── Main Page ───────────────────────────────────────────────── */

export default function CampaignsPage() {
  const [campaigns,   setCampaigns]   = useState<GeneratedCampaign[]>([]);
  const [showForm,    setShowForm]    = useState(false);
  const [generating,  setGenerating]  = useState(false);
  const [genStep,     setGenStep]     = useState(0);
  const [selected,    setSelected]    = useState<GeneratedCampaign | null>(null);
  const [detailTab,   setDetailTab]   = useState<DetailTab>("Overview");
  const [form,        setForm]        = useState<CampaignInput>({
    businessType: "", goal: "", budget: "", location: "",
  });

  useEffect(() => { setCampaigns(getCampaigns()); }, []);

  async function handleGenerate() {
    if (!form.businessType || !form.goal || !form.budget) return;
    setGenerating(true);
    setGenStep(0);

    for (let i = 0; i < STEPS.length; i++) {
      setGenStep(i);
      await new Promise((r) => setTimeout(r, 400));
    }

    const campaign = generateCampaign(form);
    saveCampaign(campaign);
    setCampaigns(getCampaigns());
    setGenerating(false);
    setShowForm(false);
    setSelected(campaign);
    setDetailTab("Overview");
    setForm({ businessType: "", goal: "", budget: "", location: "" });
  }

  function handleStatus(id: string, status: GeneratedCampaign["status"]) {
    updateCampaignStatus(id, status);
    setCampaigns(getCampaigns());
    if (selected?.id === id) setSelected((prev) => prev ? { ...prev, status } : null);
  }

  function handleDelete(id: string) {
    deleteCampaign(id);
    setCampaigns(getCampaigns());
    if (selected?.id === id) setSelected(null);
  }

  const totalLeads = campaigns.reduce((s, c) => s + c.simulation.combined.totalLeads, 0);
  const active     = campaigns.filter((c) => c.status === "active").length;

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-white">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#0D1528]/95 backdrop-blur border-b border-white/[0.07] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
            </div>
            <div>
              <h1 className="text-white font-bold text-base">AI Campaign Engine</h1>
              <p className="text-slate-500 text-xs">{campaigns.length} campaigns · {active} active · ~{totalLeads} projected leads</p>
            </div>
          </div>
          <button
            onClick={() => { setShowForm(true); setSelected(null); }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Create Campaign
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Campaigns",   value: campaigns.length.toString(),                             color: "text-purple-400" },
            { label: "Active Campaigns",  value: active.toString(),                                       color: "text-green-400"  },
            { label: "Projected Leads",   value: totalLeads.toString(),                                   color: "text-blue-400"   },
            { label: "Campaigns Created", value: campaigns.filter(c => c.status === "suggested").length.toString(), color: "text-amber-400"  },
          ].map((s) => (
            <div key={s.label} className="bg-[#111C35] rounded-2xl p-5 border border-white/[0.07]">
              <p className="text-slate-500 text-xs mb-1">{s.label}</p>
              <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-6">
          {/* Campaign list */}
          <div className={`${selected ? "hidden sm:block sm:w-80 flex-shrink-0" : "w-full"}`}>
            {campaigns.length === 0 && !showForm ? (
              <div className="bg-[#111C35] rounded-2xl border border-white/[0.07] p-16 text-center">
                <p className="text-5xl mb-4">🚀</p>
                <p className="text-white font-semibold text-lg mb-2">No campaigns yet</p>
                <p className="text-slate-500 text-sm mb-6">Create your first AI campaign in 30 seconds</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm transition-colors"
                >
                  Create First Campaign
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {campaigns.map((c) => (
                  <CampaignCard
                    key={c.id}
                    campaign={c}
                    onSelect={(camp) => { setSelected(camp); setDetailTab("Overview"); }}
                    onStatus={handleStatus}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Detail panel */}
          {selected && (
            <div className="flex-1 min-w-0">
              {/* Detail header */}
              <div className="bg-[#111C35] rounded-2xl border border-white/[0.07] p-5 mb-4">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <button onClick={() => setSelected(null)} className="text-slate-500 hover:text-white text-xs flex items-center gap-1 mb-2 sm:hidden">
                      ← Back
                    </button>
                    <h2 className="text-white font-bold text-lg">{selected.name}</h2>
                    <p className="text-slate-500 text-xs mt-1">
                      Created {new Date(selected.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}
                    </p>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg border ${STATUS_META[selected.status].color}`}>
                    {STATUS_META[selected.status].label}
                  </span>
                </div>

                {/* Tab bar */}
                <div className="flex gap-1 overflow-x-auto pb-1">
                  {DETAIL_TABS.map((t) => (
                    <button
                      key={t}
                      onClick={() => setDetailTab(t)}
                      className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                        detailTab === t ? "bg-purple-600 text-white" : "text-slate-400 hover:text-white hover:bg-white/[0.05]"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab content */}
              {detailTab === "Overview"      && <OverviewTab c={selected} />}
              {detailTab === "Google Ads"    && <GoogleAdsTab c={selected} />}
              {detailTab === "Meta Ads"      && <MetaAdsTab c={selected} />}
              {detailTab === "Landing Page"  && <LandingPageTab c={selected} />}
              {detailTab === "Creative Ideas"&& <CreativeIdeasTab c={selected} />}
              {detailTab === "Simulation"    && <SimulationTab c={selected} />}
            </div>
          )}
        </div>
      </div>

      {/* Generate form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111C35] rounded-2xl border border-white/[0.1] w-full max-w-lg shadow-2xl">
            {!generating ? (
              <>
                <div className="p-6 border-b border-white/[0.07]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-white font-bold">Create AI Campaign</h2>
                        <p className="text-slate-500 text-xs">Full campaign plan in seconds</p>
                      </div>
                    </div>
                    <button onClick={() => setShowForm(false)} className="text-slate-500 hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <label className="text-slate-400 text-xs font-semibold mb-1.5 block">Business Type *</label>
                    <select
                      value={form.businessType}
                      onChange={(e) => setForm((f) => ({ ...f, businessType: e.target.value }))}
                      className="w-full bg-[#0A0F1E] border border-white/[0.1] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500/50"
                    >
                      <option value="">Select business type…</option>
                      {BUSINESS_TYPES.map((bt) => <option key={bt} value={bt}>{bt}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-400 text-xs font-semibold mb-1.5 block">Campaign Goal *</label>
                    <select
                      value={form.goal}
                      onChange={(e) => setForm((f) => ({ ...f, goal: e.target.value }))}
                      className="w-full bg-[#0A0F1E] border border-white/[0.1] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500/50"
                    >
                      <option value="">Select campaign goal…</option>
                      {GOALS.map((g) => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-400 text-xs font-semibold mb-1.5 block">Monthly Budget *</label>
                    <select
                      value={form.budget}
                      onChange={(e) => setForm((f) => ({ ...f, budget: e.target.value }))}
                      className="w-full bg-[#0A0F1E] border border-white/[0.1] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500/50"
                    >
                      <option value="">Select budget range…</option>
                      {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-400 text-xs font-semibold mb-1.5 block">Target Location</label>
                    <input
                      type="text"
                      value={form.location}
                      onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                      placeholder="e.g. Hyderabad, Mumbai, Delhi…"
                      className="w-full bg-[#0A0F1E] border border-white/[0.1] rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-purple-500/50"
                    />
                  </div>

                  <button
                    onClick={handleGenerate}
                    disabled={!form.businessType || !form.goal || !form.budget}
                    className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                    </svg>
                    Generate Full Campaign Plan
                  </button>
                </div>
              </>
            ) : (
              /* Generating state */
              <div className="p-10 text-center">
                <div className="w-16 h-16 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center mx-auto mb-5">
                  <svg className="w-8 h-8 text-purple-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Generating Campaign…</h3>
                <p className="text-purple-400 text-sm mb-6 min-h-[20px] transition-all">{STEPS[genStep]}</p>
                <div className="space-y-2">
                  {STEPS.map((step, i) => (
                    <div key={i} className="flex items-center gap-3 text-left">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                        i < genStep ? "bg-green-500" : i === genStep ? "bg-purple-500 animate-pulse" : "bg-white/[0.08]"
                      }`}>
                        {i < genStep && (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        )}
                      </div>
                      <p className={`text-xs transition-colors ${i <= genStep ? "text-slate-300" : "text-slate-700"}`}>{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
