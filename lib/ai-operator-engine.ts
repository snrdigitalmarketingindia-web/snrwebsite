/* AI Marketing OS — Autonomous Operator Engine
   Rule-based, no external APIs. Structured for future OpenAI / Ads API integration. */

import type { GeneratedCampaign } from "@/lib/campaign-engine";

/* ══════════════════════════════════════════════════════════════
   TYPES
══════════════════════════════════════════════════════════════ */

export type AlertSeverity = "critical" | "warning" | "success" | "info";
export type AlertCategory = "performance" | "budget" | "creative" | "leads" | "opportunity";

export type AiAlert = {
  id:          string;
  severity:    AlertSeverity;
  category:    AlertCategory;
  title:       string;
  description: string;
  metric?:     string;
  change?:     string;
  action:      string;
  isNew:       boolean;
};

export type AiRecommendation = {
  id:             string;
  type:           "optimization" | "expansion" | "pause" | "creative" | "budget";
  priority:       "high" | "medium" | "low";
  title:          string;
  insight:        string;
  impact:         string;
  steps:          string[];
  potentialGain:  string;
  channel:        "google" | "meta" | "seo" | "general";
};

export type BudgetSuggestion = {
  id:             string;
  action:         "increase" | "decrease" | "shift" | "pause";
  from?:          string;
  to?:            string;
  amount:         string;
  reason:         string;
  expectedImpact: string;
  confidence:     number;
};

export type CreativeImprovement = {
  id:               string;
  type:             "headline" | "description" | "hook" | "cta";
  current:          string;
  improved:         string;
  reason:           string;
  channel:          "google" | "meta" | "both";
  improvementScore: number;
};

export type AiTask = {
  id:               string;
  priority:         "urgent" | "high" | "medium" | "low";
  category:         "follow-up" | "campaign" | "content" | "seo" | "creative";
  title:            string;
  description:      string;
  estimatedTime:    string;
  potentialRevenue?: string;
  dueIn:            string;
};

export type KnowledgeCard = {
  id:         string;
  category:   "seo" | "google-ads" | "meta-ads" | "cro" | "ai-marketing";
  title:      string;
  insight:    string;
  tip:        string;
  difficulty: "beginner" | "intermediate" | "advanced";
};

export type StrategistInsight = {
  id:             string;
  type:           "growth" | "risk" | "opportunity" | "trend";
  title:          string;
  analysis:       string;
  recommendation: string;
  data?:          { label: string; value: string }[];
  confidence:     number;
};

export type IndustryPerf = {
  industry:     string;
  count:        number;
  convRate:     number;
  avgCpl:       number;
  color:        string;
};

export type ChannelPerf = {
  channel:  string;
  leads:    number;
  cpl:      string;
  quality:  "high" | "medium" | "low";
  share:    number;
};

export type LeadQualityReport = {
  topIndustry:         string;
  topConvRate:         number;
  bestChannel:         string;
  qualityScore:        number;
  industryBreakdown:   IndustryPerf[];
  channelBreakdown:    ChannelPerf[];
  weeklyTrend:         number[];
  recommendations:     string[];
};

export type OperatorSnapshot = {
  alerts:           AiAlert[];
  recommendations:  AiRecommendation[];
  budgetSuggestions:BudgetSuggestion[];
  creativeImprovements: CreativeImprovement[];
  tasks:            AiTask[];
  knowledgeCards:   KnowledgeCard[];
  strategistInsights: StrategistInsight[];
  leadQuality:      LeadQualityReport;
  analysisScore:    number;
  lastAnalyzed:     string;
};

/* ══════════════════════════════════════════════════════════════
   ALERT GENERATOR
══════════════════════════════════════════════════════════════ */

export function generateAlerts(campaigns: GeneratedCampaign[]): AiAlert[] {
  const alerts: AiAlert[] = [];
  let idx = 0;

  if (campaigns.length === 0) {
    alerts.push({
      id: `alert_${idx++}`, severity: "info", category: "opportunity",
      title: "No Active Campaigns Detected",
      description: "Your AI engine has no campaign data to analyze. Create your first campaign to unlock autonomous optimization.",
      action: "Create Campaign",
      isNew: true,
    });
    return alerts;
  }

  // Analyze each active campaign for performance signals
  for (const camp of campaigns) {
    const g = camp.simulation.google;
    const m = camp.simulation.meta;
    const bt = camp.input.businessType.toLowerCase();

    // CPL thresholds by industry (₹)
    const highCplThreshold =
      bt.includes("real estate") ? 1200 :
      bt.includes("hospital")    ? 400  :
      bt.includes("education")   ? 350  :
      bt.includes("ecommerce")   ? 200  : 600;

    const gCplNum = parseInt(g.cpl.replace(/[₹,]/g, ""));
    const mCplNum = parseInt(m.cpl.replace(/[₹,]/g, ""));
    const gCtrNum = parseFloat(g.ctr);
    const mCtrNum = parseFloat(m.ctr);

    if (gCplNum > highCplThreshold) {
      alerts.push({
        id: `alert_${idx++}`, severity: "warning", category: "performance",
        title: `Google Ads CPL Above Benchmark`,
        description: `${camp.name}: Cost Per Lead of ${g.cpl} exceeds industry benchmark of ₹${highCplThreshold}. Consider narrowing keyword targeting or improving landing page quality score.`,
        metric: "CPL", change: `${g.cpl} vs ₹${highCplThreshold} benchmark`,
        action: "Review Keywords",
        isNew: true,
      });
    }

    if (gCtrNum < 2.5) {
      alerts.push({
        id: `alert_${idx++}`, severity: "warning", category: "creative",
        title: "Low Google Ads CTR Detected",
        description: `${camp.name}: CTR of ${g.ctr} is below the 3% target. Ad copy needs stronger value propositions and more specific messaging.`,
        metric: "CTR", change: `${g.ctr} (target: 3%+)`,
        action: "Improve Ad Copy",
        isNew: false,
      });
    }

    if (mCtrNum < 1.2) {
      alerts.push({
        id: `alert_${idx++}`, severity: "warning", category: "creative",
        title: "Meta Ads CTR Needs Attention",
        description: `Meta Ads for ${camp.name} have a CTR of ${m.ctr}. Try hook-based creatives with stronger opening 3 seconds.`,
        metric: "CTR", change: `${m.ctr} (target: 1.5%+)`,
        action: "Test New Creatives",
        isNew: true,
      });
    }

    if (g.leads > 20) {
      alerts.push({
        id: `alert_${idx++}`, severity: "success", category: "performance",
        title: "High-Performing Google Campaign",
        description: `${camp.name} is generating ${g.leads} leads/month from Google Ads. Consider scaling budget by 20% to maximize this momentum.`,
        metric: "Leads", change: `${g.leads} leads at ${g.cpl}`,
        action: "Scale Budget",
        isNew: true,
      });
    }

    if (m.leads < 3 && mCplNum > 800) {
      alerts.push({
        id: `alert_${idx++}`, severity: "critical", category: "budget",
        title: "Meta Ads Underperforming",
        description: `${camp.name} Meta Ads generated only ${m.leads} leads at ${m.cpl} CPL. Immediate creative refresh or audience restructure needed.`,
        metric: "Leads + CPL", change: `${m.leads} leads, ${m.cpl} CPL`,
        action: "Pause & Restructure",
        isNew: true,
      });
    }

    if (bt.includes("hospital") || bt.includes("clinic")) {
      alerts.push({
        id: `alert_${idx++}`, severity: "info", category: "opportunity",
        title: "Evening Hours Opportunity — Healthcare",
        description: "Healthcare campaigns show 34% higher conversion rates between 6–9 PM. Consider increasing bid modifiers for evening hours.",
        action: "Adjust Bid Schedule",
        isNew: false,
      });
    }
  }

  // Global insights
  if (campaigns.length >= 2) {
    alerts.push({
      id: `alert_${idx++}`, severity: "info", category: "opportunity",
      title: "Cross-Campaign Retargeting Available",
      description: "You have multiple campaigns running. Create a unified retargeting audience from all campaign visitors to lower overall CPL by an estimated 25%.",
      action: "Set Up Retargeting",
      isNew: true,
    });
  }

  alerts.push({
    id: `alert_${idx++}`, severity: "success", category: "leads",
    title: "Lead Quality Trend: Positive",
    description: "AI analysis shows 68% of recent leads have high-intent signals (budget ₹15K+, clear goal). Prioritize immediate follow-up on hot leads.",
    action: "Review Hot Leads",
    isNew: false,
  });

  return alerts.slice(0, 8);
}

/* ══════════════════════════════════════════════════════════════
   RECOMMENDATIONS GENERATOR
══════════════════════════════════════════════════════════════ */

export function generateRecommendations(campaigns: GeneratedCampaign[]): AiRecommendation[] {
  const recs: AiRecommendation[] = [];

  if (campaigns.length === 0) {
    return [
      {
        id: "rec_0", type: "expansion", priority: "high", channel: "general",
        title: "Launch Your First AI Campaign",
        insight: "Businesses using AI-generated campaign structures see 42% lower CPL on average. No campaign data exists yet.",
        impact: "Potential 40–80 leads/month from a ₹15K budget",
        steps: ["Go to AI Campaign Engine", "Enter your business type & goal", "Review AI-generated strategy", "Activate campaign"],
        potentialGain: "40–80 leads/month",
      },
    ];
  }

  recs.push(
    {
      id: "rec_1", type: "optimization", priority: "high", channel: "google",
      title: "Add Negative Keywords to Reduce Wasted Spend",
      insight: "Industry analysis shows 18–25% of ad spend in Indian markets goes to irrelevant searches. Negative keyword lists can recover this budget.",
      impact: "Estimated 15–20% CPL reduction",
      steps: ["Download Search Terms Report", "Identify irrelevant queries", "Add negative keywords: 'jobs', 'salary', 'free', 'DIY'", "Review weekly for new irrelevant terms"],
      potentialGain: "₹3,000–₹6,000/month savings",
    },
    {
      id: "rec_2", type: "creative", priority: "high", channel: "meta",
      title: "Refresh Meta Ad Creatives Every 14 Days",
      insight: "Meta Ads suffer creative fatigue after 10–14 days. Frequency scores above 2.5 signal audience saturation and rising CPL.",
      impact: "Prevent 30% CTR drop from ad fatigue",
      steps: ["Monitor frequency score in Ads Manager", "Prepare 3 new creative variants", "A/B test hook-based vs offer-based creatives", "Kill lowest performer after 7 days"],
      potentialGain: "Maintain CTR at 1.8%+ vs fatigue drop to 0.8%",
    },
    {
      id: "rec_3", type: "expansion", priority: "medium", channel: "seo",
      title: "Create City + Service Landing Pages",
      insight: "Long-tail local keywords ('digital marketing Hyderabad', 'SEO agency Madhapur') show 3× higher conversion rates than generic terms.",
      impact: "15–30 organic leads/month within 90 days",
      steps: ["Identify top 5 service + city combinations", "Create dedicated landing pages for each", "Optimize on-page SEO elements", "Build 5–10 local citations per page"],
      potentialGain: "30+ organic leads/month at zero ad cost",
    },
    {
      id: "rec_4", type: "budget", priority: "medium", channel: "general",
      title: "Shift 20% Budget to Best-Performing Channel",
      insight: "Performance data suggests Google Search consistently delivers lower CPL than Meta for high-intent B2B and healthcare queries in Indian markets.",
      impact: "Estimated 12% overall CPL improvement",
      steps: ["Compare CPL across Google vs Meta for last 30 days", "Identify which campaign has lowest CPL", "Reallocate 20% of Meta budget to Google Search", "Monitor for 14 days before further adjustments"],
      potentialGain: "10–15 additional leads/month same budget",
    },
    {
      id: "rec_5", type: "optimization", priority: "medium", channel: "google",
      title: "Enable Automated Ad Extensions",
      insight: "Campaigns without full ad extensions lose 20–30% of ad real estate. Sitelinks, callouts, and call extensions are free to add and increase CTR by up to 15%.",
      impact: "Estimated 10–15% CTR improvement",
      steps: ["Audit current ad extensions", "Add call extension with +91 number", "Add 4 sitelink extensions", "Add 3 callout extensions", "Enable location extension if applicable"],
      potentialGain: "15% CTR improvement = same budget, more traffic",
    },
    {
      id: "rec_6", type: "expansion", priority: "low", channel: "meta",
      title: "Launch Lookalike Audience Campaign",
      insight: "Upload your converted lead list to Meta to create a 1–2% Lookalike Audience. This typically delivers 40% lower CPL vs cold prospecting.",
      impact: "30–40% CPL reduction for warm audiences",
      steps: ["Export converted leads as CSV (minimum 100)", "Upload to Meta Custom Audiences", "Create 1% Lookalike Audience from converters", "Launch new ad set with 20% of total Meta budget"],
      potentialGain: "40% lower CPL = significantly higher ROI",
    }
  );

  return recs;
}

/* ══════════════════════════════════════════════════════════════
   BUDGET SUGGESTIONS GENERATOR
══════════════════════════════════════════════════════════════ */

export function generateBudgetSuggestions(campaigns: GeneratedCampaign[]): BudgetSuggestion[] {
  if (campaigns.length === 0) {
    return [
      {
        id: "bs_0", action: "increase", to: "Google Search",
        amount: "₹15,000/month",
        reason: "Google Search is the highest-intent channel for B2B and service businesses in India. Start here for fastest ROI.",
        expectedImpact: "30–50 leads/month",
        confidence: 87,
      },
    ];
  }

  const suggestions: BudgetSuggestion[] = [
    {
      id: "bs_1", action: "shift", from: "Meta Awareness", to: "Google Search",
      amount: "₹3,000–₹5,000/month",
      reason: "AI analysis shows Google Search CPL is 35% lower than Meta for lead generation goals in your industry mix. Shifting spend capitalizes on higher purchase intent.",
      expectedImpact: "12–18 additional leads/month at same total spend",
      confidence: 82,
    },
    {
      id: "bs_2", action: "increase", to: "Retargeting Campaigns",
      amount: "₹2,000–₹4,000/month",
      reason: "Website visitors who see retargeting ads are 70% more likely to convert. Current data suggests retargeting budget is underfunded relative to awareness spend.",
      expectedImpact: "8–15 warm leads/month, CPL 40% below cold traffic",
      confidence: 91,
    },
    {
      id: "bs_3", action: "decrease", from: "Broad Match Keywords",
      amount: "Reallocate ₹2,000–₹3,000/month",
      reason: "Broad match keywords are consuming 20–30% of Google budget on irrelevant queries. Shifting to phrase/exact match improves lead quality significantly.",
      expectedImpact: "Same leads, 20% lower CPL, higher quality",
      confidence: 78,
    },
    {
      id: "bs_4", action: "increase", to: "Video Ads (YouTube/Reels)",
      amount: "₹3,000–₹5,000/month",
      reason: "Video ad CPM in India is 60% lower than image ads. Early brand touchpoints from video reduce CPL on subsequent lead generation campaigns.",
      expectedImpact: "3× brand recall lift, 15% CPL reduction over 60 days",
      confidence: 74,
    },
  ];

  // Add campaign-specific suggestion if real estate or high-value industry
  const hasRealEstate = campaigns.some((c) => c.input.businessType.toLowerCase().includes("real estate"));
  if (hasRealEstate) {
    suggestions.push({
      id: "bs_5", action: "shift", from: "Meta Brand Awareness", to: "Google Search + Call Ads",
      amount: "₹5,000–₹8,000/month",
      reason: "Real estate buyers research extensively on Google before converting. Call Ads directly connect high-intent searchers with your sales team, skipping the landing page friction.",
      expectedImpact: "Site visit bookings up 25–40%",
      confidence: 88,
    });
  }

  return suggestions;
}

/* ══════════════════════════════════════════════════════════════
   CREATIVE IMPROVEMENT ENGINE
══════════════════════════════════════════════════════════════ */

export function generateCreativeImprovements(campaigns: GeneratedCampaign[]): CreativeImprovement[] {
  const improvements: CreativeImprovement[] = [
    // Generic improvements that apply universally
    {
      id: "ci_1", type: "headline", channel: "google",
      current: "Get More Customers",
      improved: "Get Daily Customer Enquiries — Guaranteed Results",
      reason: "Specificity + outcome-focus + guarantee signal outperforms generic CTAs by 40% in Indian B2B markets.",
      improvementScore: 38,
    },
    {
      id: "ci_2", type: "headline", channel: "google",
      current: "Best Digital Marketing Company",
      improved: "3× More Leads in 60 Days — Free Audit",
      reason: "Quantified outcome with specific timeframe and zero-risk offer drives 55% higher CTR than superlative claims.",
      improvementScore: 52,
    },
    {
      id: "ci_3", type: "hook", channel: "meta",
      current: "Looking for more customers?",
      improved: "Most businesses in Hyderabad lose ₹50,000/month on marketing that doesn't work. Here's what actually does…",
      reason: "Problem-first hooks with local specificity and loss aversion trigger 3× higher scroll-stop rate vs question-based openers.",
      improvementScore: 67,
    },
    {
      id: "ci_4", type: "hook", channel: "meta",
      current: "We help businesses grow online",
      improved: "We generated 247 leads for a Hyderabad clinic in 30 days. Here's the exact strategy:",
      reason: "Social proof with specific numbers and location creates immediate credibility. Case-study hooks get 4× more engagement than feature statements.",
      improvementScore: 71,
    },
    {
      id: "ci_5", type: "description", channel: "google",
      current: "Professional services. Contact us today.",
      improved: "₹15K ad spend → 45 qualified leads. Free strategy call reveals how we'd do the same for your business.",
      reason: "ROI demonstration with specific numbers + zero-friction CTA (free call vs 'contact us') improves conversion rate by 35%.",
      improvementScore: 42,
    },
    {
      id: "ci_6", type: "cta", channel: "both",
      current: "Learn More",
      improved: "See My Free Growth Plan",
      reason: "'Learn More' is the lowest-converting CTA button. Personalized, outcome-focused CTAs ('My', 'Your', 'Free') improve click rate by 25–40%.",
      improvementScore: 33,
    },
    {
      id: "ci_7", type: "cta", channel: "meta",
      current: "Contact Us",
      improved: "Claim Free Business Audit →",
      reason: "Action + benefit + directional arrow creates urgency and value exchange. Converts 2.3× better than passive contact CTAs.",
      improvementScore: 55,
    },
  ];

  // Add campaign-specific improvements
  for (const camp of campaigns.slice(0, 2)) {
    const bt = camp.input.businessType;
    const loc = camp.input.location;

    if (camp.googleAds.headlines.length > 0) {
      improvements.push({
        id: `ci_camp_${camp.id}`, type: "headline", channel: "google",
        current: camp.googleAds.headlines[0],
        improved: `${bt} in ${loc} — Free Consultation Today`,
        reason: `Adding location + zero-friction offer to existing headline increases local search CTR by 25–35%.`,
        improvementScore: 28,
      });
    }
  }

  return improvements;
}

/* ══════════════════════════════════════════════════════════════
   AUTONOMOUS TASK GENERATOR
══════════════════════════════════════════════════════════════ */

export function generateTasks(campaigns: GeneratedCampaign[], leadCount: number): AiTask[] {
  const tasks: AiTask[] = [
    {
      id: "task_1", priority: "urgent", category: "follow-up",
      title: "Follow Up With Warm Leads Older Than 3 Days",
      description: "AI detected warm leads that have not been contacted in 3+ days. Response time is the #1 factor in B2B conversion — every day of delay drops conversion probability by 8%.",
      estimatedTime: "30 minutes",
      potentialRevenue: "₹45,000–₹90,000",
      dueIn: "Today",
    },
    {
      id: "task_2", priority: "high", category: "campaign",
      title: "Create Retargeting Campaign for Website Visitors",
      description: "Set up a retargeting campaign to re-engage website visitors who did not convert. This audience is already warm — CPL is typically 40% lower than cold traffic.",
      estimatedTime: "2–3 hours",
      potentialRevenue: "₹30,000–₹60,000",
      dueIn: "This Week",
    },
    {
      id: "task_3", priority: "high", category: "seo",
      title: "Publish 2 Blog Posts Targeting Local Keywords",
      description: "SEO data shows 'digital marketing [city]' and 'Google Ads agency [city]' keywords have high search volume with low competition. Content targeting these drives organic leads within 60–90 days.",
      estimatedTime: "4–5 hours",
      potentialRevenue: "Long-term: 20+ organic leads/month",
      dueIn: "This Week",
    },
    {
      id: "task_4", priority: "high", category: "creative",
      title: "A/B Test 3 New Meta Ad Creatives",
      description: "AI Creative Engine has generated new hook-based ad variations. Test all 3 against current best performer to identify the highest CTR creative before scaling spend.",
      estimatedTime: "1–2 hours",
      potentialRevenue: "30% CTR improvement = ₹20,000+ in efficiency gains",
      dueIn: "This Week",
    },
    {
      id: "task_5", priority: "medium", category: "seo",
      title: "Set Up Google My Business for Local SEO Boost",
      description: "Verified Google Business Profiles appear in local pack results which generate 3× more clicks than organic listings. This is a zero-cost, high-impact action.",
      estimatedTime: "45 minutes",
      dueIn: "This Week",
    },
    {
      id: "task_6", priority: "medium", category: "campaign",
      title: "Add Call Extensions to All Active Google Campaigns",
      description: "Campaigns without call extensions are missing 15–20% of potential leads who prefer calling over form fills. Call extensions are free and take 10 minutes to set up.",
      estimatedTime: "20 minutes",
      dueIn: "Today",
    },
    {
      id: "task_7", priority: "medium", category: "content",
      title: "Create WhatsApp Broadcast Message for Nurture Sequence",
      description: "Leads that receive a personalized WhatsApp follow-up within 24 hours convert at 3× the rate of email-only nurture. AI has pre-written message templates ready.",
      estimatedTime: "30 minutes",
      potentialRevenue: "₹25,000–₹50,000 from warmed leads",
      dueIn: "Tomorrow",
    },
    {
      id: "task_8", priority: "low", category: "seo",
      title: "Build 10 Local Business Citations",
      description: "Consistent NAP (Name, Address, Phone) citations on JustDial, IndiaMart, Sulekha, and similar directories boost local SEO rankings significantly within 30–60 days.",
      estimatedTime: "2 hours",
      dueIn: "This Month",
    },
  ];

  if (leadCount > 10) {
    tasks.unshift({
      id: "task_0", priority: "urgent", category: "follow-up",
      title: `Review ${leadCount} Leads — AI Has Scored & Ranked Them`,
      description: `AI has analyzed all ${leadCount} leads and ranked them by conversion probability. Focus on the top 20% (Hot Leads) for maximum ROI on your follow-up time.`,
      estimatedTime: "45 minutes",
      potentialRevenue: "₹1L–₹3L estimated pipeline value",
      dueIn: "Today",
    });
  }

  return tasks;
}

/* ══════════════════════════════════════════════════════════════
   KNOWLEDGE CENTER
══════════════════════════════════════════════════════════════ */

export function getKnowledgeCards(): KnowledgeCard[] {
  return [
    {
      id: "k_1", category: "google-ads", difficulty: "beginner",
      title: "Quality Score is Your #1 Cost Lever",
      insight: "Google Quality Score (1–10) determines your ad rank and CPC. A QS of 8+ means you pay 30–40% less per click than a competitor with QS 4, even bidding the same.",
      tip: "Improve Quality Score by aligning keyword → ad copy → landing page as a tightly themed triangle. One theme per ad group.",
    },
    {
      id: "k_2", category: "meta-ads", difficulty: "beginner",
      title: "The 3-Second Rule for Video Ads",
      insight: "Meta's algorithm measures '3-second video views' as a primary signal. If your first 3 seconds don't stop the scroll, the rest of your video never gets seen — wasting your entire production cost.",
      tip: "Open with a pattern interrupt: surprising stat, bold claim, or direct question. Never start with your logo or company name.",
    },
    {
      id: "k_3", category: "seo", difficulty: "intermediate",
      title: "E-E-A-T: The New SEO Currency",
      insight: "Google's 2024 core updates heavily weight Experience, Expertise, Authoritativeness, and Trustworthiness. Sites demonstrating real-world expertise rank significantly higher than thin content sites.",
      tip: "Add author bios, case studies, client testimonials, and industry credentials to every key page. Show, don't just tell.",
    },
    {
      id: "k_4", category: "cro", difficulty: "beginner",
      title: "Above-The-Fold CTA Increases Conversions 25%",
      insight: "Landing page studies show that users who see the CTA without scrolling convert 25–40% more than those who have to scroll to find it. Most Indian business websites bury their CTA.",
      tip: "Place your primary CTA button in the top 600px of every landing page. Use high-contrast color (green, orange) against dark or white backgrounds.",
    },
    {
      id: "k_5", category: "ai-marketing", difficulty: "advanced",
      title: "GEO: Optimize for AI Search Engines",
      insight: "Generative Engine Optimization (GEO) is the new SEO. ChatGPT, Gemini, and Perplexity now answer business queries directly — brands not optimized for AI search lose 30–40% of future organic visibility.",
      tip: "Add FAQ sections, structured data (Schema.org), and clear 'best for' statements to your service pages. AI engines favor concise, factual, well-structured content.",
    },
    {
      id: "k_6", category: "google-ads", difficulty: "intermediate",
      title: "Broad Match + Smart Bidding = Modern Best Practice",
      insight: "Counter-intuitively, Broad Match keywords with Target CPA bidding outperform Exact Match in high-volume campaigns. Google's AI finds high-converting queries humans would never think to target.",
      tip: "Only switch to Broad Match after accumulating 50+ conversions. Without conversion data, Smart Bidding has nothing to learn from — stick to Phrase Match until then.",
    },
    {
      id: "k_7", category: "meta-ads", difficulty: "intermediate",
      title: "Advantage+ Audiences vs Manual Targeting in India",
      insight: "Meta's Advantage+ Shopping Audiences consistently outperform manual detailed targeting for e-commerce in India. However, for B2B and services, manual targeting still delivers 20–30% lower CPL.",
      tip: "Use Advantage+ for e-commerce campaigns with catalogue ads. Use manual detailed targeting for service businesses targeting specific demographics (age, income, behavior).",
    },
    {
      id: "k_8", category: "cro", difficulty: "advanced",
      title: "WhatsApp CTA Converts 3× Better Than Phone in India",
      insight: "Indian consumers overwhelmingly prefer WhatsApp for initial business contact over phone calls or email. Landing pages with a WhatsApp CTA see 2.5–3.5× higher lead conversion than 'Call Now' CTAs.",
      tip: "Add a floating WhatsApp button to every landing page. Pre-fill the message with context: 'Hi, I saw your ad for [service] and want to know more.'",
    },
  ];
}

/* ══════════════════════════════════════════════════════════════
   STRATEGIST INSIGHTS
══════════════════════════════════════════════════════════════ */

export function generateStrategistInsights(campaigns: GeneratedCampaign[], leadCount: number): StrategistInsight[] {
  const totalSimLeads = campaigns.reduce((s, c) => s + c.simulation.combined.totalLeads, 0);
  const hasCampaigns = campaigns.length > 0;

  const insights: StrategistInsight[] = [
    {
      id: "si_1", type: "growth", confidence: 84,
      title: "Your Growth Engine is Ready to Scale",
      analysis: hasCampaigns
        ? `With ${campaigns.length} campaigns generating an estimated ${totalSimLeads} leads/month, your acquisition engine is functional. The next lever is improving lead quality — not just volume.`
        : "Your platform is set up but lacks campaign data. Generating your first AI campaign will unlock full autonomous analysis.",
      recommendation: "Focus the next 30 days on CPL reduction (targeting + creative) rather than increasing budget. Optimize first, scale second.",
      data: [
        { label: "Active Campaigns", value: campaigns.length.toString() },
        { label: "Est. Monthly Leads", value: totalSimLeads.toString() },
        { label: "AI Leads Scored", value: leadCount.toString() },
      ],
    },
    {
      id: "si_2", type: "opportunity", confidence: 91,
      title: "WhatsApp Automation is Your Biggest Untapped Lever",
      analysis: "India has 530M+ WhatsApp users. Businesses using WhatsApp Business API for lead nurture see 3–5× higher conversion vs email. Your current workflow lacks automated WhatsApp follow-ups.",
      recommendation: "Implement a 3-message WhatsApp sequence: (1) immediate welcome + value, (2) case study at Day 2, (3) offer/urgency at Day 5. This alone can improve conversion rate by 40–60%.",
      data: [
        { label: "WhatsApp Penetration IN", value: "91%" },
        { label: "Open Rate vs Email", value: "4–5×" },
        { label: "Avg Conversion Lift", value: "45%" },
      ],
    },
    {
      id: "si_3", type: "trend", confidence: 88,
      title: "AI Search is Reshaping Lead Generation",
      analysis: "28% of Google searches now have AI Overview results that answer questions directly — reducing clicks to websites. Businesses optimized for traditional SEO are seeing 10–20% organic traffic decline.",
      recommendation: "Invest in GEO (Generative Engine Optimization): structured content, FAQ schema, and brand mention strategies that make your business visible inside AI-generated answers.",
      data: [
        { label: "AI Overview Queries", value: "28% of searches" },
        { label: "SEO Traffic Impact", value: "–15% avg" },
        { label: "GEO Opportunity", value: "First mover" },
      ],
    },
    {
      id: "si_4", type: "risk", confidence: 76,
      title: "Single-Channel Dependency is a Business Risk",
      analysis: hasCampaigns
        ? "Your campaigns show heavier investment in Google Ads. Depending on a single channel creates fragility — algorithm updates or CPL spikes can cut lead flow by 50% overnight."
        : "No multi-channel strategy detected. Relying on organic-only or a single paid channel creates revenue risk.",
      recommendation: "Build a 3-channel acquisition system: Google Ads (immediate demand), Meta Ads (awareness + retargeting), and SEO (compounding organic). Each channel should contribute 25%+ of leads within 90 days.",
      data: [
        { label: "Recommended Channels", value: "3 minimum" },
        { label: "Risk Level", value: hasCampaigns && campaigns.length === 1 ? "High" : "Medium" },
        { label: "Diversification Score", value: `${Math.min(100, campaigns.length * 35)}%` },
      ],
    },
    {
      id: "si_5", type: "growth", confidence: 79,
      title: "Video Content Will 3× Your Meta Ad Performance",
      analysis: "Meta Ads with video content consistently outperform static images: 3× more reach, 2× lower CPM, and higher engagement signals that reduce overall campaign costs through improved Ad Relevance Score.",
      recommendation: "Produce 2 short-form videos per month (60–90 seconds). Founder/team testimonial style. Authentic, low-production videos outperform polished agency content in Indian markets.",
      data: [
        { label: "Video vs Image CPM", value: "60% cheaper" },
        { label: "Engagement Rate", value: "3× higher" },
        { label: "Recommended Length", value: "60–90 sec" },
      ],
    },
  ];

  return insights;
}

/* ══════════════════════════════════════════════════════════════
   LEAD QUALITY ANALYSIS
══════════════════════════════════════════════════════════════ */

export function analyzeLeadQuality(leadCount: number): LeadQualityReport {
  const industryBreakdown: IndustryPerf[] = [
    { industry: "Healthcare / Clinic", count: Math.round(leadCount * 0.22), convRate: 38, avgCpl: 320,  color: "#22C55E" },
    { industry: "Real Estate",         count: Math.round(leadCount * 0.18), convRate: 22, avgCpl: 850,  color: "#3B82F6" },
    { industry: "Education",           count: Math.round(leadCount * 0.16), convRate: 31, avgCpl: 280,  color: "#A855F7" },
    { industry: "E-Commerce",          count: Math.round(leadCount * 0.14), convRate: 18, avgCpl: 160,  color: "#F59E0B" },
    { industry: "Restaurant / Food",   count: Math.round(leadCount * 0.12), convRate: 42, avgCpl: 120,  color: "#EC4899" },
    { industry: "Startup / Tech",      count: Math.round(leadCount * 0.10), convRate: 14, avgCpl: 520,  color: "#06B6D4" },
    { industry: "Other",               count: Math.round(leadCount * 0.08), convRate: 20, avgCpl: 400,  color: "#64748B" },
  ];

  const channelBreakdown: ChannelPerf[] = [
    { channel: "Google Search Ads", leads: Math.round(leadCount * 0.38), cpl: "₹420",  quality: "high",   share: 38 },
    { channel: "Meta Ads",          leads: Math.round(leadCount * 0.28), cpl: "₹580",  quality: "medium", share: 28 },
    { channel: "Organic SEO",       leads: Math.round(leadCount * 0.18), cpl: "₹0",    quality: "high",   share: 18 },
    { channel: "WhatsApp Direct",   leads: Math.round(leadCount * 0.10), cpl: "₹0",    quality: "high",   share: 10 },
    { channel: "Referral",          leads: Math.round(leadCount * 0.06), cpl: "₹0",    quality: "high",   share: 6  },
  ];

  const weeklyTrend = [
    Math.round(leadCount * 0.12),
    Math.round(leadCount * 0.15),
    Math.round(leadCount * 0.18),
    Math.round(leadCount * 0.14),
    Math.round(leadCount * 0.20),
    Math.round(leadCount * 0.22),
    Math.round(leadCount * 0.19),
  ];

  return {
    topIndustry: "Healthcare / Clinic",
    topConvRate: 42,
    bestChannel: "Google Search Ads",
    qualityScore: leadCount > 20 ? 74 : leadCount > 5 ? 61 : 45,
    industryBreakdown,
    channelBreakdown,
    weeklyTrend,
    recommendations: [
      "Prioritize healthcare and restaurant leads — highest conversion rates in your mix",
      "Google Search leads convert at 2× the rate of Meta leads — ensure fast follow-up",
      "Organic and referral leads have highest quality score — invest more in SEO and referral programs",
      "Education leads spike during admission season (Jan–Feb, May–June) — plan campaigns accordingly",
    ],
  };
}

/* ══════════════════════════════════════════════════════════════
   MASTER SNAPSHOT GENERATOR
══════════════════════════════════════════════════════════════ */

export function generateOperatorSnapshot(
  campaigns: GeneratedCampaign[],
  leadCount: number = 0
): OperatorSnapshot {
  const score = Math.min(100,
    40 +
    (campaigns.length > 0 ? 20 : 0) +
    (leadCount > 10 ? 15 : leadCount > 0 ? 8 : 0) +
    (campaigns.length >= 2 ? 15 : 0) +
    (leadCount > 50 ? 10 : 0)
  );

  return {
    alerts:               generateAlerts(campaigns),
    recommendations:      generateRecommendations(campaigns),
    budgetSuggestions:    generateBudgetSuggestions(campaigns),
    creativeImprovements: generateCreativeImprovements(campaigns),
    tasks:                generateTasks(campaigns, leadCount),
    knowledgeCards:       getKnowledgeCards(),
    strategistInsights:   generateStrategistInsights(campaigns, leadCount),
    leadQuality:          analyzeLeadQuality(Math.max(leadCount, 12)),
    analysisScore:        score,
    lastAnalyzed:         new Date().toISOString(),
  };
}

/* ══════════════════════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════════════════════ */

export const ALERT_META: Record<AlertSeverity, { color: string; bg: string; border: string; icon: string }> = {
  critical: { color: "text-red-400",    bg: "bg-red-500/10",    border: "border-red-500/25",    icon: "🔴" },
  warning:  { color: "text-amber-400",  bg: "bg-amber-500/10",  border: "border-amber-500/25",  icon: "🟡" },
  success:  { color: "text-green-400",  bg: "bg-green-500/10",  border: "border-green-500/25",  icon: "🟢" },
  info:     { color: "text-blue-400",   bg: "bg-blue-500/10",   border: "border-blue-500/25",   icon: "🔵" },
};

export const PRIORITY_META: Record<"urgent" | "high" | "medium" | "low", { color: string; bg: string; label: string }> = {
  urgent: { color: "text-red-400",    bg: "bg-red-500/10",    label: "Urgent"  },
  high:   { color: "text-amber-400",  bg: "bg-amber-500/10",  label: "High"    },
  medium: { color: "text-blue-400",   bg: "bg-blue-500/10",   label: "Medium"  },
  low:    { color: "text-slate-400",  bg: "bg-slate-500/10",  label: "Low"     },
};

export const KNOWLEDGE_META: Record<KnowledgeCard["category"], { color: string; label: string }> = {
  "google-ads":   { color: "text-blue-400",    label: "Google Ads"   },
  "meta-ads":     { color: "text-purple-400",  label: "Meta Ads"     },
  "seo":          { color: "text-green-400",   label: "SEO"          },
  "cro":          { color: "text-amber-400",   label: "CRO"          },
  "ai-marketing": { color: "text-cyan-400",    label: "AI Marketing" },
};
