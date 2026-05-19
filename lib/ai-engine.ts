/* AI Lead Intelligence Engine — rule-based, no external APIs. */

import type { Lead } from "@/lib/leads";

export type AiCategory = "hot" | "warm" | "cold";
export type AiPriority = "High" | "Medium" | "Low";

export type AiInsight = {
  score: number;
  category: AiCategory;
  categoryLabel: string;
  conversionProbability: number;
  priority: AiPriority;
  contactTime: string;
  strategy: string[];
  pitch: string;
  whatsappMessage: string;
};

/* ── Scoring components (max 100) ────────────────────────── */

function scoreBudget(budget: string): number {
  if (budget.includes("50,000+"))   return 30;
  if (budget.includes("15,000"))    return 20;
  if (budget.includes("5,000"))     return 10;
  return 5;
}

function scoreBusinessType(bt: string): number {
  const b = bt.toLowerCase();
  if (b.includes("hospital") || b.includes("clinic"))          return 25;
  if (b.includes("real estate"))                               return 25;
  if (b.includes("e-commerce") || b.includes("ecommerce"))     return 20;
  if (b.includes("education"))                                 return 20;
  if (b.includes("startup"))                                   return 15;
  if (b.includes("restaurant"))                                return 12;
  if (b.includes("retail"))                                    return 10;
  return 8;
}

function scoreGoal(goal: string): number {
  const g = goal.toLowerCase();
  if (g.includes("sales") || g.includes("revenue"))            return 25;
  if (g.includes("leads") || g.includes("enquiries"))          return 22;
  if (g.includes("calls") || g.includes("whatsapp"))           return 20;
  if (g.includes("website") || g.includes("redesign"))         return 12;
  if (g.includes("app"))                                       return 10;
  if (g.includes("social"))                                    return 8;
  return 5;
}

function scorePhone(phone: string): number {
  const digits = phone.replace(/\D/g, "");
  let s = 0;
  if (phone.includes("+91")) s += 5;
  if (digits.length >= 10)   s += 5;
  return s;
}

/* ── Strategy lookup ─────────────────────────────────────── */

function getStrategy(lead: Lead): string[] {
  const bt   = lead.businessType.toLowerCase();
  const goal = lead.goal.toLowerCase();

  if (bt.includes("hospital") || bt.includes("clinic"))
    return ["Local SEO + Google My Business", "Google Search Ads", "Patient Review Strategy", "Healthcare Landing Page"];
  if (bt.includes("real estate"))
    return ["Google Ads + Lead Forms", "Dedicated Landing Pages", "Meta Ads Retargeting", "WhatsApp Automation"];
  if (bt.includes("startup"))
    return ["Meta Ads + Brand Awareness", "Website / Landing Page", "Content Marketing + SEO", "Social Media Growth"];
  if (bt.includes("e-commerce") || bt.includes("ecommerce"))
    return ["Meta Catalogue Ads", "Google Shopping Ads", "Retargeting Campaigns", "Conversion Rate Optimization"];
  if (bt.includes("education"))
    return ["Google Ads + Lead Magnets", "SEO for Course Keywords", "Meta Ads + Video Content", "WhatsApp Nurture Sequence"];
  if (bt.includes("restaurant"))
    return ["Local SEO + Google My Business", "Instagram & Meta Ads", "Food Platform Advertising", "Location-Based Campaigns"];
  if (bt.includes("retail"))
    return ["Meta Ads + Offer Campaigns", "Google Ads + Shopping", "WhatsApp Broadcast Marketing", "Local SEO"];

  if (goal.includes("website") || goal.includes("redesign"))
    return ["Website Development + SEO Setup", "Landing Page Optimization", "Google Ads Ready Setup"];
  if (goal.includes("social"))
    return ["Social Media Management", "Meta Ads", "Content Calendar + Reels"];

  return ["SEO + Content Strategy", "Google Ads", "Meta Ads", "Monthly ROI Reporting"];
}

/* ── Sales pitch generator ───────────────────────────────── */

function getPitch(lead: Lead, score: number): string {
  const bt   = lead.businessType.toLowerCase();
  const name = lead.name.split(" ")[0];

  if (bt.includes("hospital") || bt.includes("clinic"))
    return `${name} is in healthcare — a trust-driven industry. Lead with Local SEO + Google My Business to dominate local search. Mention patient acquisition cost savings. Upsell Google Ads for quick enquiries.`;
  if (bt.includes("real estate"))
    return `Real estate needs speed. Pitch Google Ads + dedicated landing page first — fastest ROI path. Mention what competitors are spending in their area. Add Meta Ads retargeting for warmer follow-ups.`;
  if (bt.includes("startup"))
    return `Startup clients need brand + leads simultaneously. Start with Meta Ads for visibility and a clean website. Position SNR as a long-term growth partner, not just a vendor.`;
  if (bt.includes("e-commerce") || bt.includes("ecommerce"))
    return `E-commerce is all about ROAS. Pitch Meta Catalogue Ads + Google Shopping. Show competitor ROAS benchmarks. Upsell retargeting to recover cart abandonment.`;
  if (bt.includes("education"))
    return `Education clients convert on urgency (admission seasons). Pitch Google Ads for peak periods + SEO for long-term organic traffic. Offer a lead magnet strategy (free webinar, brochure download).`;
  if (bt.includes("restaurant"))
    return `Restaurants thrive on local discovery. Focus on Google My Business optimization + Instagram ads. Promote offers and new menu items via location-based campaigns.`;

  if (score >= 75)
    return `High-value lead with strong intent. Pitch the full growth package — SEO + Google Ads + Meta Ads. Frame it as a 90-day growth plan with monthly ROI reporting.`;
  if (score >= 50)
    return `Warm prospect — needs nurturing. Start with a Google Ads pilot (₹15K/month) to prove ROI quickly. Plan to upsell SEO + Meta Ads within 60 days.`;
  return `Early-stage prospect. Focus on educating about digital marketing ROI. Share relevant case studies. Offer a free audit to build trust and move them to warm status.`;
}

/* ── WhatsApp message generator ─────────────────────────── */

function getServiceSuggestion(lead: Lead): string {
  const g = lead.goal.toLowerCase();
  if (g.includes("leads") || g.includes("enquiries"))         return "lead generation";
  if (g.includes("sales") || g.includes("revenue"))           return "sales growth";
  if (g.includes("calls"))                                    return "call generation";
  if (g.includes("website") || g.includes("redesign"))        return "website development";
  if (g.includes("social"))                                   return "social media marketing";
  const bt = lead.businessType.toLowerCase();
  if (bt.includes("hospital") || bt.includes("clinic"))       return "healthcare digital marketing";
  if (bt.includes("real estate"))                             return "real estate marketing";
  if (bt.includes("e-commerce") || bt.includes("ecommerce")) return "e-commerce marketing";
  return "digital marketing";
}

function generateWhatsAppMessage(lead: Lead): string {
  const firstName = lead.name.split(" ")[0];
  const service   = getServiceSuggestion(lead);
  return `Hi ${firstName}, this is SNR Digital Marketing 🙏\n\nThank you for your interest! We noticed you're looking to grow your ${lead.businessType} business through ${service}.\n\nWe've helped similar businesses in your industry get 3× more leads within 60 days.\n\nCan we schedule a quick 15-minute call to show you a custom growth plan?\n\n✅ Just reply YES and we'll call you at your preferred time.\n\n– Team SNR Digital Marketing\n📞 +91 99894 37777`;
}

/* ── Contact time recommendation ─────────────────────────── */

function getContactTime(lead: Lead): string {
  const bt = lead.businessType.toLowerCase();
  if (bt.includes("restaurant") || bt.includes("retail"))    return "6 PM – 8 PM";
  if (bt.includes("startup") || bt.includes("e-commerce"))  return "2 PM – 5 PM";
  if (bt.includes("hospital") || bt.includes("clinic"))     return "11 AM – 1 PM";
  if (bt.includes("education"))                             return "3 PM – 6 PM";
  return "10 AM – 12 PM";
}

/* ── Main export ─────────────────────────────────────────── */

export function analyzeLeadAI(lead: Lead): AiInsight {
  const budgetScore = scoreBudget(lead.budget);
  const typeScore   = scoreBusinessType(lead.businessType);
  const goalScore   = scoreGoal(lead.goal);
  const phoneScore  = scorePhone(lead.phone);
  const score       = Math.min(100, budgetScore + typeScore + goalScore + phoneScore);

  const category: AiCategory =
    score >= 80 ? "hot" : score >= 50 ? "warm" : "cold";
  const categoryLabel =
    score >= 80 ? "🔥 Hot Lead" : score >= 50 ? "⚡ Warm Lead" : "💤 Cold Lead";

  const conversionProbability =
    score >= 80 ? 70 + Math.floor((score - 80) * 0.75)
    : score >= 50 ? 35 + Math.floor((score - 50) * 0.83)
    : 10 + Math.floor(score * 0.3);

  const priority: AiPriority =
    score >= 75 ? "High" : score >= 45 ? "Medium" : "Low";

  return {
    score,
    category,
    categoryLabel,
    conversionProbability,
    priority,
    contactTime:      getContactTime(lead),
    strategy:         getStrategy(lead),
    pitch:            getPitch(lead, score),
    whatsappMessage:  generateWhatsAppMessage(lead),
  };
}

/* ── Batch helpers ───────────────────────────────────────── */

export function getAiStats(leads: Lead[]) {
  const insights = leads.map((l) => analyzeLeadAI(l));
  const hot       = insights.filter((i) => i.category === "hot").length;
  const warm      = insights.filter((i) => i.category === "warm").length;
  const cold      = insights.filter((i) => i.category === "cold").length;
  const avgScore  = insights.length
    ? Math.round(insights.reduce((s, i) => s + i.score, 0) / insights.length)
    : 0;
  const avgConv   = insights.length
    ? Math.round(insights.reduce((s, i) => s + i.conversionProbability, 0) / insights.length)
    : 0;
  return { hot, warm, cold, avgScore, avgConv };
}

export const AI_SCORE_META = {
  hot:  { color: "text-red-400",    bg: "bg-red-500/10",    border: "border-red-500/20",    bar: "#EF4444" },
  warm: { color: "text-amber-400",  bg: "bg-amber-500/10",  border: "border-amber-500/20",  bar: "#F59E0B" },
  cold: { color: "text-slate-400",  bg: "bg-slate-500/10",  border: "border-slate-500/20",  bar: "#64748B" },
};
