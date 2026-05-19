"use client";

import { useState, useEffect, useRef } from "react";
import { getCampaigns } from "@/lib/campaign-engine";
import { getLeads } from "@/lib/leads";
import {
  generateOperatorSnapshot,
  ALERT_META, PRIORITY_META, KNOWLEDGE_META,
  type OperatorSnapshot,
  type AiAlert,
  type AiRecommendation,
  type BudgetSuggestion,
  type CreativeImprovement,
  type AiTask,
  type KnowledgeCard,
  type StrategistInsight,
} from "@/lib/ai-operator-engine";

/* ══════════════════════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════════════════════ */

function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

/* ══════════════════════════════════════════════════════════════
   ANIMATED COUNTER
══════════════════════════════════════════════════════════════ */

function AnimCounter({ to, duration = 1200 }: { to: number; duration?: number }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(to / (duration / 16));
    const t = setInterval(() => {
      start += step;
      if (start >= to) { setVal(to); clearInterval(t); } else setVal(start);
    }, 16);
    return () => clearInterval(t);
  }, [to, duration]);
  return <>{val}</>;
}

/* ══════════════════════════════════════════════════════════════
   PULSE DOT
══════════════════════════════════════════════════════════════ */

function PulseDot({ color = "bg-green-400" }: { color?: string }) {
  return (
    <span className="relative flex h-2 w-2">
      <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", color)} />
      <span className={cn("relative inline-flex rounded-full h-2 w-2", color)} />
    </span>
  );
}

/* ══════════════════════════════════════════════════════════════
   AI BRAIN STATUS BAR
══════════════════════════════════════════════════════════════ */

const ANALYSIS_MESSAGES = [
  "Analyzing campaign performance metrics…",
  "Scanning lead quality signals across all sources…",
  "Comparing CPL against India market benchmarks…",
  "Generating budget optimization recommendations…",
  "Evaluating creative performance patterns…",
  "Identifying growth opportunities in your pipeline…",
  "Building autonomous task queue…",
  "Analysis complete — 12 insights ready",
];

function AiBrainBar({ score }: { score: number }) {
  const [msgIdx, setMsgIdx] = useState(0);
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setTyping(false);
      setTimeout(() => {
        setMsgIdx((i) => (i + 1) % ANALYSIS_MESSAGES.length);
        setTyping(true);
      }, 300);
    }, 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="bg-[#0D1829] border border-blue-500/20 rounded-2xl p-5 flex items-center gap-5">
      {/* AI brain icon */}
      <div className="w-12 h-12 rounded-xl bg-blue-600/15 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
        <svg className="w-6 h-6 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
        </svg>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <PulseDot color="bg-blue-400" />
          <span className="text-blue-400 text-xs font-semibold uppercase tracking-wider">AI Engine Active</span>
        </div>
        <p className={cn("text-slate-300 text-sm transition-opacity duration-300", typing ? "opacity-100" : "opacity-0")}>
          {ANALYSIS_MESSAGES[msgIdx]}
        </p>
      </div>

      {/* Score */}
      <div className="flex-shrink-0 text-right">
        <p className="text-2xl font-bold text-white"><AnimCounter to={score} /></p>
        <p className="text-slate-500 text-xs">Platform Score</p>
      </div>

      {/* Score arc */}
      <div className="flex-shrink-0">
        <svg width="52" height="52" viewBox="0 0 52 52">
          <circle cx="26" cy="26" r="21" fill="none" stroke="#1E3A5F" strokeWidth="4" />
          <circle
            cx="26" cy="26" r="21" fill="none"
            stroke="#3B82F6" strokeWidth="4"
            strokeDasharray={`${(score / 100) * 132} 132`}
            strokeLinecap="round"
            transform="rotate(-90 26 26)"
            style={{ transition: "stroke-dasharray 1.2s ease" }}
          />
          <text x="26" y="30" textAnchor="middle" fill="#93C5FD" fontSize="11" fontWeight="700">{score}%</text>
        </svg>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   ALERT CARD
══════════════════════════════════════════════════════════════ */

function AlertCard({ alert }: { alert: AiAlert }) {
  const meta = ALERT_META[alert.severity];
  return (
    <div className={cn("rounded-xl border p-4 relative overflow-hidden group hover:scale-[1.01] transition-transform", meta.bg, meta.border)}>
      {alert.isNew && (
        <span className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
      )}
      <div className="flex items-start gap-3">
        <span className="text-base mt-0.5 flex-shrink-0">{meta.icon}</span>
        <div className="flex-1 min-w-0">
          <p className={cn("font-semibold text-sm mb-1", meta.color)}>{alert.title}</p>
          <p className="text-slate-400 text-xs leading-relaxed">{alert.description}</p>
          {alert.metric && (
            <div className="mt-2 flex items-center gap-2 flex-wrap">
              <span className="text-slate-600 text-xs">Metric:</span>
              <span className="text-slate-300 text-xs font-medium">{alert.metric}</span>
              {alert.change && (
                <>
                  <span className="text-slate-700">·</span>
                  <span className="text-slate-400 text-xs font-mono">{alert.change}</span>
                </>
              )}
            </div>
          )}
          <div className="mt-3">
            <span className={cn("inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg cursor-pointer hover:brightness-110 transition", meta.bg, meta.color, meta.border, "border")}>
              → {alert.action}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   RECOMMENDATION CARD
══════════════════════════════════════════════════════════════ */

function RecommendationCard({ rec }: { rec: AiRecommendation }) {
  const [open, setOpen] = useState(false);

  const channelColors: Record<string, string> = {
    google: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    meta:   "text-purple-400 bg-purple-500/10 border-purple-500/20",
    seo:    "text-green-400 bg-green-500/10 border-green-500/20",
    general:"text-slate-400 bg-slate-500/10 border-slate-500/20",
  };

  const priorityColors: Record<string, string> = {
    high: "text-red-400", medium: "text-amber-400", low: "text-slate-400",
  };

  return (
    <div className="bg-[#0D1829] border border-white/[0.06] rounded-xl overflow-hidden hover:border-white/[0.12] transition-colors">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start gap-4 p-5 text-left"
      >
        <div className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center">
          <svg className={cn("w-4 h-4", priorityColors[rec.priority])} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <p className="text-white font-semibold text-sm">{rec.title}</p>
            <span className={cn("text-xs px-2 py-0.5 rounded-md border capitalize", channelColors[rec.channel])}>
              {rec.channel}
            </span>
          </div>
          <p className="text-slate-400 text-xs">{rec.insight}</p>
          <p className="text-green-400 text-xs font-semibold mt-1.5">↑ {rec.potentialGain}</p>
        </div>
        <svg className={cn("w-4 h-4 text-slate-600 flex-shrink-0 mt-1 transition-transform", open && "rotate-180")} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {open && (
        <div className="px-5 pb-5 border-t border-white/[0.05] pt-4 space-y-3">
          <div>
            <p className="text-slate-500 text-xs mb-2">Expected Impact</p>
            <p className="text-amber-300 text-sm font-medium">{rec.impact}</p>
          </div>
          <div>
            <p className="text-slate-500 text-xs mb-2">Action Steps</p>
            <ol className="space-y-1.5">
              {rec.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                  <span className="w-4 h-4 rounded-full bg-blue-600/20 border border-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0 text-[10px] font-bold mt-0.5">{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   BUDGET CARD
══════════════════════════════════════════════════════════════ */

function BudgetCard({ sug }: { sug: BudgetSuggestion }) {
  const actionColors = {
    increase: { color: "text-green-400",  bg: "bg-green-500/10",  border: "border-green-500/20",  icon: "↑" },
    decrease: { color: "text-red-400",    bg: "bg-red-500/10",    border: "border-red-500/20",    icon: "↓" },
    shift:    { color: "text-blue-400",   bg: "bg-blue-500/10",   border: "border-blue-500/20",   icon: "⇄" },
    pause:    { color: "text-amber-400",  bg: "bg-amber-500/10",  border: "border-amber-500/20",  icon: "⏸" },
  }[sug.action];

  return (
    <div className="bg-[#0D1829] border border-white/[0.06] rounded-xl p-5 space-y-3 hover:border-white/[0.12] transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className={cn("w-7 h-7 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0", actionColors.bg, actionColors.border, "border", actionColors.color)}>
            {actionColors.icon}
          </span>
          <span className={cn("text-xs font-semibold uppercase tracking-wide capitalize", actionColors.color)}>
            {sug.action}
          </span>
        </div>
        <div className="text-right">
          <p className="text-white font-bold text-sm">{sug.amount}</p>
          <div className="flex items-center gap-1 justify-end mt-1">
            <div className="h-1 bg-white/[0.05] rounded-full w-16 overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: `${sug.confidence}%` }} />
            </div>
            <span className="text-slate-500 text-xs">{sug.confidence}% conf.</span>
          </div>
        </div>
      </div>

      {sug.from && sug.to && (
        <div className="flex items-center gap-2 text-xs">
          <span className="text-red-400 bg-red-500/10 px-2 py-0.5 rounded">{sug.from}</span>
          <span className="text-slate-600">→</span>
          <span className="text-green-400 bg-green-500/10 px-2 py-0.5 rounded">{sug.to}</span>
        </div>
      )}
      {!sug.from && sug.to && (
        <p className="text-xs text-slate-400">Allocate to: <span className="text-blue-400">{sug.to}</span></p>
      )}
      {sug.from && !sug.to && (
        <p className="text-xs text-slate-400">Reduce from: <span className="text-amber-400">{sug.from}</span></p>
      )}

      <p className="text-slate-400 text-xs leading-relaxed">{sug.reason}</p>
      <div className="bg-green-500/5 border border-green-500/10 rounded-lg px-3 py-2">
        <p className="text-green-400 text-xs font-medium">Expected Impact: {sug.expectedImpact}</p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   CREATIVE IMPROVEMENT CARD
══════════════════════════════════════════════════════════════ */

function CreativeCard({ item }: { item: CreativeImprovement }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(item.improved).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  const channelBadge = {
    google: "text-blue-400 bg-blue-500/10",
    meta:   "text-purple-400 bg-purple-500/10",
    both:   "text-cyan-400 bg-cyan-500/10",
  }[item.channel];

  return (
    <div className="bg-[#0D1829] border border-white/[0.06] rounded-xl p-5 space-y-3 hover:border-white/[0.12] transition-colors">
      <div className="flex items-center justify-between">
        <span className={cn("text-xs px-2 py-0.5 rounded-md font-medium capitalize", channelBadge)}>
          {item.channel} · {item.type}
        </span>
        <span className="text-green-400 text-xs font-bold bg-green-500/10 px-2 py-0.5 rounded-md">
          +{item.improvementScore}% est. CTR
        </span>
      </div>

      <div className="space-y-2">
        <div className="bg-red-500/5 border border-red-500/10 rounded-lg p-3">
          <p className="text-red-400/60 text-[10px] uppercase tracking-wider mb-1">Current</p>
          <p className="text-slate-400 text-sm">{item.current}</p>
        </div>
        <div className="bg-green-500/5 border border-green-500/10 rounded-lg p-3 relative">
          <p className="text-green-400/60 text-[10px] uppercase tracking-wider mb-1">AI Improved</p>
          <p className="text-green-300 text-sm font-medium pr-8">{item.improved}</p>
          <button
            onClick={copy}
            className="absolute top-2 right-2 w-6 h-6 rounded-md bg-green-500/10 flex items-center justify-center hover:bg-green-500/20 transition-colors"
            title="Copy"
          >
            {copied ? (
              <svg className="w-3 h-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            ) : (
              <svg className="w-3 h-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <p className="text-slate-500 text-xs leading-relaxed">{item.reason}</p>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   TASK CARD
══════════════════════════════════════════════════════════════ */

function TaskCard({ task, onDone }: { task: AiTask; onDone: () => void }) {
  const pm = PRIORITY_META[task.priority];

  const categoryIcons: Record<string, React.ReactNode> = {
    "follow-up": <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>,
    "campaign":  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" /></svg>,
    "content":   <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" /></svg>,
    "seo":       <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>,
    "creative":  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" /></svg>,
  };

  return (
    <div className="bg-[#0D1829] border border-white/[0.06] rounded-xl p-4 flex items-start gap-3 hover:border-white/[0.12] transition-colors group">
      <div className="mt-0.5 flex-shrink-0">
        <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center", pm.bg, "border border-white/[0.08]", pm.color)}>
          {categoryIcons[task.category]}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <p className="text-white text-sm font-semibold">{task.title}</p>
          <span className={cn("text-[10px] px-1.5 py-0.5 rounded font-semibold", pm.bg, pm.color)}>{pm.label}</span>
        </div>
        <p className="text-slate-400 text-xs leading-relaxed mb-2">{task.description}</p>
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-slate-600 text-xs flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {task.estimatedTime}
          </span>
          <span className="text-slate-600 text-xs flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5" /></svg>
            Due: {task.dueIn}
          </span>
          {task.potentialRevenue && (
            <span className="text-green-400 text-xs font-medium">↑ {task.potentialRevenue}</span>
          )}
        </div>
      </div>
      <button
        onClick={onDone}
        className="flex-shrink-0 w-5 h-5 rounded-md border border-white/[0.12] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-green-500/20 hover:border-green-500/30"
        title="Mark done"
      >
        <svg className="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   KNOWLEDGE CARD
══════════════════════════════════════════════════════════════ */

function KnowledgeCardUI({ card }: { card: KnowledgeCard }) {
  const [open, setOpen] = useState(false);
  const km = KNOWLEDGE_META[card.category];

  const diffColors = {
    beginner:     "text-green-400 bg-green-500/10",
    intermediate: "text-amber-400 bg-amber-500/10",
    advanced:     "text-purple-400 bg-purple-500/10",
  };

  return (
    <div className="bg-[#0D1829] border border-white/[0.06] rounded-xl overflow-hidden hover:border-white/[0.12] transition-colors">
      <button onClick={() => setOpen(!open)} className="w-full p-4 flex items-start gap-3 text-left">
        <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center flex-shrink-0">
          <span className={cn("text-xs font-bold", km.color)}>
            {card.category === "seo" ? "S" : card.category === "google-ads" ? "G" : card.category === "meta-ads" ? "M" : card.category === "cro" ? "C" : "AI"}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-0.5">
            <span className={cn("text-xs font-medium", km.color)}>{km.label}</span>
            <span className={cn("text-[10px] px-1.5 py-0.5 rounded font-medium capitalize", diffColors[card.difficulty])}>
              {card.difficulty}
            </span>
          </div>
          <p className="text-white text-sm font-semibold leading-snug">{card.title}</p>
        </div>
        <svg className={cn("w-4 h-4 text-slate-600 flex-shrink-0 transition-transform mt-1", open && "rotate-180")} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      {open && (
        <div className="px-4 pb-4 space-y-3 border-t border-white/[0.05] pt-3">
          <p className="text-slate-300 text-xs leading-relaxed">{card.insight}</p>
          <div className="bg-blue-500/5 border border-blue-500/10 rounded-lg px-3 py-2">
            <p className="text-blue-400 text-[10px] font-semibold uppercase tracking-wider mb-1">Pro Tip</p>
            <p className="text-blue-300 text-xs leading-relaxed">{card.tip}</p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   STRATEGIST INSIGHT CARD
══════════════════════════════════════════════════════════════ */

function StrategistCard({ insight }: { insight: StrategistInsight }) {
  const typeColors = {
    growth:      { color: "text-green-400",  bg: "bg-green-500/10",  border: "border-green-500/20",  label: "Growth" },
    risk:        { color: "text-red-400",    bg: "bg-red-500/10",    border: "border-red-500/20",    label: "Risk Alert" },
    opportunity: { color: "text-amber-400",  bg: "bg-amber-500/10",  border: "border-amber-500/20",  label: "Opportunity" },
    trend:       { color: "text-cyan-400",   bg: "bg-cyan-500/10",   border: "border-cyan-500/20",   label: "Trend" },
  }[insight.type];

  return (
    <div className="bg-[#0D1829] border border-white/[0.06] rounded-xl p-5 space-y-3 hover:border-white/[0.12] transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className={cn("text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md border mb-2 inline-block", typeColors.color, typeColors.bg, typeColors.border)}>
            {typeColors.label}
          </span>
          <h3 className="text-white font-bold text-sm leading-snug">{insight.title}</h3>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-xs text-slate-500">AI Confidence</p>
          <p className="text-white font-bold">{insight.confidence}%</p>
        </div>
      </div>

      <p className="text-slate-400 text-xs leading-relaxed">{insight.analysis}</p>

      <div className="bg-white/[0.03] border border-white/[0.05] rounded-lg p-3">
        <p className="text-blue-400 text-[10px] font-semibold uppercase tracking-wider mb-1.5">AI Recommendation</p>
        <p className="text-slate-300 text-xs leading-relaxed">{insight.recommendation}</p>
      </div>

      {insight.data && insight.data.length > 0 && (
        <div className="flex gap-3 flex-wrap">
          {insight.data.map((d) => (
            <div key={d.label} className="bg-white/[0.03] border border-white/[0.05] rounded-lg px-3 py-2 flex-1 min-w-[90px]">
              <p className="text-white font-bold text-xs">{d.value}</p>
              <p className="text-slate-600 text-[10px] mt-0.5">{d.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   LEAD QUALITY VISUAL
══════════════════════════════════════════════════════════════ */

function LeadQualityPanel({ snapshot }: { snapshot: OperatorSnapshot }) {
  const lq = snapshot.leadQuality;

  return (
    <div className="space-y-6">
      {/* Score card */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Lead Quality Score", value: `${lq.qualityScore}%`, color: "#22C55E", sub: "AI composite score" },
          { label: "Top Industry",       value: lq.topIndustry.split(" ")[0],  color: "#3B82F6", sub: `${lq.topConvRate}% conv. rate` },
          { label: "Best Channel",       value: "Google",                  color: "#A855F7", sub: "Lowest CPL channel" },
          { label: "Hot Lead Rate",      value: "32%",                        color: "#F59E0B", sub: "of all leads" },
        ].map((m) => (
          <div key={m.label} className="bg-[#0D1829] border border-white/[0.06] rounded-xl p-4">
            <p className="text-2xl font-bold" style={{ color: m.color }}>{m.value}</p>
            <p className="text-slate-500 text-xs mt-0.5">{m.label}</p>
            <p className="text-slate-600 text-[10px] mt-0.5">{m.sub}</p>
          </div>
        ))}
      </div>

      {/* Industry breakdown */}
      <div className="bg-[#0D1829] border border-white/[0.06] rounded-xl p-5">
        <h3 className="text-white font-semibold text-sm mb-4">Industry Performance Analysis</h3>
        <div className="space-y-3">
          {lq.industryBreakdown.map((ind) => (
            <div key={ind.industry}>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-300">{ind.industry}</span>
                <div className="flex items-center gap-3">
                  <span className="text-slate-500">{ind.count} leads</span>
                  <span className="font-semibold" style={{ color: ind.color }}>{ind.convRate}% conv.</span>
                  <span className="text-slate-600 font-mono">₹{ind.avgCpl} CPL</span>
                </div>
              </div>
              <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${ind.convRate * 2.2}%`, background: ind.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Channel breakdown */}
      <div className="bg-[#0D1829] border border-white/[0.06] rounded-xl p-5">
        <h3 className="text-white font-semibold text-sm mb-4">Lead Channel Quality</h3>
        <div className="space-y-3">
          {lq.channelBreakdown.map((ch) => {
            const qc = { high: "text-green-400 bg-green-500/10", medium: "text-amber-400 bg-amber-500/10", low: "text-red-400 bg-red-500/10" }[ch.quality];
            return (
              <div key={ch.channel} className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-300">{ch.channel}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500">{ch.leads} leads</span>
                      <span className="text-slate-600">{ch.cpl}</span>
                      <span className={cn("text-[10px] px-1.5 py-0.5 rounded font-semibold", qc)}>{ch.quality}</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full transition-all duration-700" style={{ width: `${ch.share}%` }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-[#0D1829] border border-white/[0.06] rounded-xl p-5">
        <h3 className="text-white font-semibold text-sm mb-3">AI Lead Quality Recommendations</h3>
        <div className="space-y-2">
          {lq.recommendations.map((rec, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
              <span className="text-blue-400 mt-0.5 flex-shrink-0">→</span>
              {rec}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   OVERVIEW SUMMARY TAB
══════════════════════════════════════════════════════════════ */

function OverviewTab({ snapshot, onTabChange }: { snapshot: OperatorSnapshot; onTabChange: (t: string) => void }) {
  const criticalAlerts = snapshot.alerts.filter((a) => a.severity === "critical").length;
  const urgentTasks = snapshot.tasks.filter((t) => t.priority === "urgent").length;
  const newAlerts = snapshot.alerts.filter((a) => a.isNew).length;

  return (
    <div className="space-y-6">
      {/* Quick stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Active Alerts", value: snapshot.alerts.length, sub: `${criticalAlerts} critical`, color: "#EF4444", onClick: () => onTabChange("alerts") },
          { label: "AI Recommendations", value: snapshot.recommendations.length, sub: "Optimizations ready", color: "#3B82F6", onClick: () => onTabChange("recommendations") },
          { label: "Pending Tasks", value: snapshot.tasks.length, sub: `${urgentTasks} urgent`, color: "#F59E0B", onClick: () => onTabChange("tasks") },
          { label: "Knowledge Insights", value: snapshot.knowledgeCards.length, sub: "Tips available", color: "#A855F7", onClick: () => onTabChange("knowledge") },
        ].map((m) => (
          <button key={m.label} onClick={m.onClick} className="bg-[#0D1829] border border-white/[0.06] rounded-xl p-4 text-left hover:border-white/[0.12] hover:scale-[1.02] transition-all group">
            <p className="text-2xl font-bold text-white"><AnimCounter to={m.value} /></p>
            <p className="text-slate-500 text-xs mt-0.5">{m.label}</p>
            <p className="text-xs font-medium mt-1" style={{ color: m.color }}>{m.sub}</p>
          </button>
        ))}
      </div>

      {/* Top alerts preview */}
      <div className="bg-[#0D1829] border border-white/[0.06] rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold text-sm flex items-center gap-2">
            <span>Active Alerts</span>
            {newAlerts > 0 && <span className="text-[10px] bg-blue-500/20 text-blue-400 border border-blue-500/20 px-1.5 py-0.5 rounded-full">{newAlerts} new</span>}
          </h3>
          <button onClick={() => onTabChange("alerts")} className="text-blue-400 text-xs hover:text-blue-300">View all →</button>
        </div>
        <div className="space-y-3">
          {snapshot.alerts.slice(0, 3).map((a) => <AlertCard key={a.id} alert={a} />)}
        </div>
      </div>

      {/* Top strategist insight */}
      <div className="bg-[#0D1829] border border-white/[0.06] rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold text-sm">AI Strategist — Top Insight</h3>
          <button onClick={() => onTabChange("strategist")} className="text-blue-400 text-xs hover:text-blue-300">View all →</button>
        </div>
        <StrategistCard insight={snapshot.strategistInsights[0]} />
      </div>

      {/* Top task */}
      <div className="bg-[#0D1829] border border-white/[0.06] rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold text-sm">Priority Task Queue</h3>
          <button onClick={() => onTabChange("tasks")} className="text-blue-400 text-xs hover:text-blue-300">View all →</button>
        </div>
        <div className="space-y-3">
          {snapshot.tasks.slice(0, 3).map((t) => (
            <TaskCard key={t.id} task={t} onDone={() => {}} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════════ */

type TabId = "overview" | "alerts" | "strategist" | "recommendations" | "budget" | "creative" | "tasks" | "knowledge" | "leads";

export default function AiOperatorPage() {
  const [snapshot, setSnapshot] = useState<OperatorSnapshot | null>(null);
  const [tab, setTab] = useState<TabId>("overview");
  const [doneTasks, setDoneTasks] = useState<Set<string>>(new Set());
  const [filterSeverity, setFilterSeverity] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [kbFilter, setKbFilter] = useState<string>("all");

  useEffect(() => {
    const campaigns = getCampaigns();
    const leads = getLeads();
    setSnapshot(generateOperatorSnapshot(campaigns, leads.length));
  }, []);

  function markTaskDone(id: string) {
    setDoneTasks((prev) => new Set([...prev, id]));
  }

  if (!snapshot) {
    return (
      <div className="min-h-screen bg-[#0A0F1E] flex items-center justify-center">
        <div className="text-center space-y-3">
          <svg className="w-8 h-8 text-blue-400 animate-spin mx-auto" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-slate-400 text-sm">Initializing AI Marketing OS…</p>
        </div>
      </div>
    );
  }

  const tabs: { id: TabId; label: string; badge?: number }[] = [
    { id: "overview",        label: "Overview" },
    { id: "alerts",          label: "Alerts",          badge: snapshot.alerts.filter((a) => a.isNew).length },
    { id: "strategist",      label: "AI Strategist" },
    { id: "recommendations", label: "Optimize" },
    { id: "budget",          label: "Budget AI" },
    { id: "creative",        label: "Creative AI" },
    { id: "tasks",           label: "Task Queue",      badge: snapshot.tasks.filter((t) => t.priority === "urgent" && !doneTasks.has(t.id)).length },
    { id: "leads",           label: "Lead Quality" },
    { id: "knowledge",       label: "Knowledge" },
  ];

  const visibleAlerts = snapshot.alerts.filter((a) => {
    if (filterSeverity !== "all" && a.severity !== filterSeverity) return false;
    if (filterCategory !== "all" && a.category !== filterCategory) return false;
    return true;
  });

  const visibleTasks = snapshot.tasks.filter((t) => !doneTasks.has(t.id));
  const visibleKnowledge = kbFilter === "all"
    ? snapshot.knowledgeCards
    : snapshot.knowledgeCards.filter((k) => k.category === kbFilter);

  return (
    <div className="min-h-screen bg-[#0A0F1E]">

      {/* ── Page Header ── */}
      <div className="bg-[#0A0F1E] border-b border-white/[0.06] px-4 sm:px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600/30 to-purple-600/30 border border-blue-500/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                </div>
                <h1 className="text-xl font-bold text-white">AI Marketing OS</h1>
                <span className="flex items-center gap-1.5 text-xs text-green-400 font-medium bg-green-500/10 border border-green-500/20 px-2.5 py-1 rounded-full">
                  <PulseDot color="bg-green-400" />
                  Autonomous Analysis Active
                </span>
              </div>
              <p className="text-slate-500 text-sm">
                Your AI marketing strategist — continuously monitoring, recommending, and optimizing.
              </p>
            </div>
            <div className="text-right">
              <p className="text-slate-600 text-xs">Last analyzed</p>
              <p className="text-slate-400 text-xs font-medium">
                {new Date(snapshot.lastAnalyzed).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">

        {/* AI Brain Status */}
        <AiBrainBar score={snapshot.analysisScore} />

        {/* ── Tab Navigation ── */}
        <div className="overflow-x-auto -mx-4 sm:-mx-6 px-4 sm:px-6">
          <div className="flex gap-1 w-max bg-[#0D1829] border border-white/[0.06] rounded-xl p-1">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  "flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap",
                  tab === t.id
                    ? "bg-blue-600 text-white shadow"
                    : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                )}
              >
                {t.label}
                {t.badge !== undefined && t.badge > 0 && (
                  <span className={cn(
                    "w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center",
                    tab === t.id ? "bg-white/20 text-white" : "bg-red-500/20 text-red-400"
                  )}>
                    {t.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ══════ OVERVIEW ══════ */}
        {tab === "overview" && (
          <OverviewTab snapshot={snapshot} onTabChange={(t) => setTab(t as TabId)} />
        )}

        {/* ══════ ALERTS ══════ */}
        {tab === "alerts" && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 flex-wrap">
              <p className="text-slate-400 text-sm">Filter:</p>
              {(["all", "critical", "warning", "success", "info"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setFilterSeverity(s)}
                  className={cn(
                    "text-xs px-3 py-1.5 rounded-lg capitalize font-medium transition-colors",
                    filterSeverity === s ? "bg-blue-600 text-white" : "text-slate-400 bg-white/[0.04] hover:bg-white/[0.08]"
                  )}
                >
                  {s}
                </button>
              ))}
              <span className="text-slate-700">|</span>
              {(["all", "performance", "budget", "creative", "leads", "opportunity"] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setFilterCategory(c)}
                  className={cn(
                    "text-xs px-3 py-1.5 rounded-lg capitalize font-medium transition-colors",
                    filterCategory === c ? "bg-purple-600 text-white" : "text-slate-400 bg-white/[0.04] hover:bg-white/[0.08]"
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {visibleAlerts.map((a) => <AlertCard key={a.id} alert={a} />)}
              {visibleAlerts.length === 0 && (
                <p className="text-slate-500 text-sm col-span-2 text-center py-8">No alerts match the current filter.</p>
              )}
            </div>
          </div>
        )}

        {/* ══════ STRATEGIST ══════ */}
        {tab === "strategist" && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/15 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <svg className="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
                <p className="text-white font-semibold text-sm">Your AI Business Strategist</p>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                The AI Strategist continuously analyzes your campaigns, leads, market trends, and competitor landscape to surface high-impact growth insights. Each insight includes AI confidence score and actionable next steps.
              </p>
            </div>
            <div className="space-y-4">
              {snapshot.strategistInsights.map((si) => <StrategistCard key={si.id} insight={si} />)}
            </div>
          </div>
        )}

        {/* ══════ RECOMMENDATIONS ══════ */}
        {tab === "recommendations" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-slate-400 text-sm">{snapshot.recommendations.length} optimization recommendations ready</p>
              <span className="text-xs text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">AI-Generated</span>
            </div>
            <div className="space-y-3">
              {snapshot.recommendations.map((r) => <RecommendationCard key={r.id} rec={r} />)}
            </div>
          </div>
        )}

        {/* ══════ BUDGET ══════ */}
        {tab === "budget" && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-amber-600/10 to-orange-600/10 border border-amber-500/15 rounded-xl p-4">
              <p className="text-amber-400 font-semibold text-sm mb-1">AI Budget Intelligence</p>
              <p className="text-slate-400 text-xs leading-relaxed">
                The AI analyzes your spend allocation across channels, compares CPL benchmarks, and recommends rebalancing to maximize lead volume without increasing total budget.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {snapshot.budgetSuggestions.map((b) => <BudgetCard key={b.id} sug={b} />)}
            </div>
          </div>
        )}

        {/* ══════ CREATIVE ══════ */}
        {tab === "creative" && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-500/15 rounded-xl p-4">
              <p className="text-purple-400 font-semibold text-sm mb-1">AI Creative Workshop</p>
              <p className="text-slate-400 text-xs leading-relaxed">
                AI analyzes your current ad copy against high-performing patterns in Indian markets. Each improvement includes the reasoning and estimated CTR lift. Click copy to use instantly.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {snapshot.creativeImprovements.map((c) => <CreativeCard key={c.id} item={c} />)}
            </div>
          </div>
        )}

        {/* ══════ TASKS ══════ */}
        {tab === "tasks" && (
          <div className="space-y-4">
            {doneTasks.size > 0 && (
              <div className="flex items-center gap-2 bg-green-500/5 border border-green-500/10 rounded-xl px-4 py-2.5 text-sm text-green-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {doneTasks.size} task{doneTasks.size > 1 ? "s" : ""} completed this session
              </div>
            )}
            <div className="space-y-3">
              {visibleTasks.map((t) => (
                <TaskCard key={t.id} task={t} onDone={() => markTaskDone(t.id)} />
              ))}
              {visibleTasks.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  </div>
                  <p className="text-white font-semibold text-sm">All tasks completed!</p>
                  <p className="text-slate-500 text-xs mt-1">The AI will generate new tasks as campaigns run.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ══════ LEADS ══════ */}
        {tab === "leads" && <LeadQualityPanel snapshot={snapshot} />}

        {/* ══════ KNOWLEDGE ══════ */}
        {tab === "knowledge" && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-slate-500 text-sm">Filter:</p>
              {(["all", "seo", "google-ads", "meta-ads", "cro", "ai-marketing"] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setKbFilter(cat)}
                  className={cn(
                    "text-xs px-3 py-1.5 rounded-lg capitalize font-medium transition-colors",
                    kbFilter === cat
                      ? "bg-blue-600 text-white"
                      : "text-slate-400 bg-white/[0.04] hover:bg-white/[0.08]"
                  )}
                >
                  {cat === "all" ? "All Topics" : KNOWLEDGE_META[cat]?.label ?? cat}
                </button>
              ))}
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {visibleKnowledge.map((k) => <KnowledgeCardUI key={k.id} card={k} />)}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
