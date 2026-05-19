export type BlogPost = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  publishedAt: string;
  readTime: string;
  category: string;
  excerpt: string;
  coverAlt: string;
  content: BlogSection[];
  faqs: { q: string; a: string }[];
  schema: Record<string, unknown>;
};

export type BlogSection = {
  type: "h2" | "h3" | "p" | "ul" | "ol";
  text?: string;
  items?: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "seo-tips-for-hyderabad-businesses-2025",
    title: "10 SEO Tips for Hyderabad Businesses to Rank on Page 1 in 2025",
    metaTitle: "10 SEO Tips for Hyderabad Businesses — Rank on Page 1 in 2025",
    metaDescription:
      "Practical SEO tips for Hyderabad businesses to rank higher on Google in 2025. Local SEO, Google Business Profile, mobile optimisation and more.",
    publishedAt: "2025-04-15",
    readTime: "8 min read",
    category: "SEO",
    excerpt:
      "Hyderabad's digital competition is intensifying. Here are 10 proven SEO strategies that local businesses can implement right now to outrank competitors and capture more organic leads.",
    coverAlt: "SEO tips for Hyderabad businesses 2025",
    content: [
      { type: "p", text: "Hyderabad is one of India's fastest-growing business cities — and with that growth comes fierce competition for Google's top positions. Whether you run a clinic in Banjara Hills, a real estate agency in Gachibowli, or a coaching institute in Ameerpet, here are 10 SEO strategies to help you rank on page 1 in 2025." },
      { type: "h2", text: "1. Optimise Your Google Business Profile Completely" },
      { type: "p", text: "For local businesses in Hyderabad, Google Business Profile (formerly Google My Business) is the most important SEO asset you have. An incomplete or unoptimised profile costs you map pack visibility. Fill in every field, add 20+ photos, collect reviews regularly, and post weekly updates." },
      { type: "h2", text: "2. Target Hyderabad-Specific Keywords" },
      { type: "p", text: "Generic keywords like 'digital marketing agency' have massive national competition. Instead, target '[service] in Hyderabad', '[service] in Banjara Hills', or '[service] near Hitech City'. These local intent keywords have lower competition and higher conversion rates because the searcher is ready to buy." },
      { type: "h2", text: "3. Build Location Pages for Key Neighbourhoods" },
      { type: "p", text: "If your business serves multiple areas across Hyderabad, create dedicated location pages for each — Kukatpally, Ameerpet, Madhapur, Jubilee Hills. Each page should have unique content about that specific area, not just a copy-paste with the neighbourhood name swapped." },
      { type: "h2", text: "4. Fix Your Website's Core Web Vitals" },
      { type: "p", text: "Google uses page experience signals including LCP (loading speed), FID (interactivity), and CLS (visual stability) as ranking factors. Use Google's PageSpeed Insights to identify issues. Common fixes: compress images, remove unused plugins, and use a fast hosting provider." },
      { type: "h2", text: "5. Get Reviews on Google and Justdial" },
      { type: "p", text: "Reviews are a critical local SEO signal. Aim for 50+ genuine Google reviews with responses from your team. In Hyderabad, Justdial and Sulekha are also important for local citations and trust signals — especially for service businesses." },
      { type: "h2", text: "6. Create Content That Answers Local Questions" },
      { type: "p", text: "Write blog posts and FAQ pages that answer questions your Hyderabad customers are asking: 'best [service] in Hyderabad', 'how to choose a [service provider] in Hyderabad', '[service] cost in Hyderabad 2025'. This type of content attracts high-intent local traffic." },
      { type: "h2", text: "7. Build Local Backlinks from Hyderabad Sources" },
      { type: "p", text: "Links from Hyderabad-based websites, news portals, business directories, and industry associations carry extra weight for local SEO. Get listed on Hyderabad Chamber of Commerce, local news sites, and industry-specific directories." },
      { type: "h2", text: "8. Optimise for Mobile-First Search" },
      { type: "p", text: "Over 85% of Hyderabad's internet users access Google on mobile. Google indexes the mobile version of your site first. Ensure your website loads in under 3 seconds on mobile, has readable text without zooming, and buttons that are easy to tap." },
      { type: "h2", text: "9. Add Schema Markup for Local Businesses" },
      { type: "p", text: "LocalBusiness schema markup tells Google exactly who you are, what you do, and where you're located. Add Organization, LocalBusiness, and FAQ schema to your key pages. This helps with rich snippet features and improves your click-through rates from search results." },
      { type: "h2", text: "10. Optimise for AI Overviews (GEO)" },
      { type: "p", text: "Google's AI Overviews now appear for 40%+ of search queries. Structure your content to answer questions directly, use authoritative data and statistics, and build E-E-A-T signals (Experience, Expertise, Authoritativeness, Trust). Businesses that adapt to AI search early will have a significant advantage in 2025 and beyond." },
      { type: "p", text: "Implementing these 10 strategies consistently over 6 months will put your Hyderabad business in a strong position to dominate local Google search. If you need help implementing any of these, our SEO team offers a free audit to identify your biggest ranking opportunities." },
    ],
    faqs: [
      { q: "How long does SEO take to show results in Hyderabad?", a: "Most Hyderabad businesses see initial ranking improvements within 60–90 days of consistent SEO work. Competitive keywords typically take 4–6 months to reach page 1." },
      { q: "Is local SEO different from national SEO?", a: "Yes. Local SEO focuses on ranking for geographically-specific searches (like 'dentist in Hyderabad') and includes Google Business Profile optimisation, local citations, and neighbourhood-specific content — strategies that aren't as relevant for national SEO." },
      { q: "How much should a Hyderabad business spend on SEO?", a: "Effective SEO for Hyderabad businesses typically starts at ₹8,000–₹15,000/month. The return on investment is typically 5–10× over 12 months as organic traffic compounds." },
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "10 SEO Tips for Hyderabad Businesses to Rank on Page 1 in 2025",
      "author": { "@type": "Organization", "name": "SNR Digital Marketing" },
      "publisher": { "@type": "Organization", "name": "SNR Digital Marketing" },
      "datePublished": "2025-04-15",
    },
  },
  {
    slug: "google-ads-vs-seo-which-is-better",
    title: "Google Ads vs SEO: Which is Better for Your Indian Business in 2025?",
    metaTitle: "Google Ads vs SEO — Which is Better for Indian Businesses in 2025?",
    metaDescription:
      "Google Ads vs SEO: a comprehensive comparison for Indian businesses. Understand costs, timelines, ROI, and which strategy fits your business goals.",
    publishedAt: "2025-03-20",
    readTime: "10 min read",
    category: "Digital Marketing",
    excerpt:
      "Should you invest in Google Ads for immediate leads or SEO for long-term growth? This comprehensive guide helps Indian business owners make the right decision.",
    coverAlt: "Google Ads vs SEO comparison for Indian businesses",
    content: [
      { type: "p", text: "Every business owner in India asks this question: 'Should I run Google Ads or focus on SEO?' The honest answer is — it depends on your timeline, budget, and goals. Here's a comprehensive comparison to help you decide." },
      { type: "h2", text: "What is Google Ads?" },
      { type: "p", text: "Google Ads (formerly Google AdWords) is a paid advertising platform where you bid to appear at the top of Google search results. You pay every time someone clicks your ad (Pay-Per-Click or PPC). The key benefit: your ads can be live and generating leads within 24–48 hours of launching." },
      { type: "h2", text: "What is SEO?" },
      { type: "p", text: "SEO (Search Engine Optimisation) is the process of improving your website to rank higher in Google's organic (non-paid) search results. Unlike Google Ads, SEO traffic is free per click — but achieving top rankings requires ongoing investment in content, technical optimisation, and link building." },
      { type: "h2", text: "Cost Comparison: Google Ads vs SEO in India" },
      { type: "p", text: "Google Ads costs vary by industry. In India, competitive industries like real estate (₹100–₹500 per click), healthcare (₹50–₹300 per click), and education (₹30–₹200 per click) can make the cost per lead significant. SEO requires upfront investment but has no per-click cost — organic traffic is free once rankings are achieved." },
      { type: "h2", text: "Timeline: How Quickly Will You See Results?" },
      { type: "ul", items: [
        "Google Ads: Leads within 24–48 hours of launching",
        "SEO: Initial ranking improvements in 60–90 days; strong organic traffic in 4–6 months",
        "Google Ads stops the moment you stop paying",
        "SEO continues to generate traffic for months or years after work is done",
      ]},
      { type: "h2", text: "Which is Better for Your Indian Business?" },
      { type: "p", text: "The answer depends on your situation:" },
      { type: "ul", items: [
        "Choose Google Ads if: you need leads immediately, have a product launch, or are testing a new market",
        "Choose SEO if: you're building a long-term business and want sustainable, compounding growth",
        "Do both if: you have the budget — use Google Ads for immediate leads while SEO builds over time",
        "Start with SEO if: you're in a less competitive niche or have a tight budget",
      ]},
      { type: "h2", text: "The Best Strategy: Google Ads + SEO Together" },
      { type: "p", text: "The most successful Indian businesses use both strategies together. Google Ads generates immediate leads while SEO builds a permanent organic traffic asset. As SEO rankings grow, you can reduce your Ads spend — reducing cost per lead over time while maintaining total lead volume." },
      { type: "p", text: "Our recommendation for most Indian SMBs: Start with a small Google Ads campaign (₹15,000–₹20,000/month) to generate immediate leads and validate your offer, while simultaneously investing in SEO. By month 6, your SEO should be delivering organic leads that supplement — or replace — your paid ads." },
    ],
    faqs: [
      { q: "Is Google Ads worth it for small businesses in India?", a: "Yes, if managed correctly. Google Ads can generate leads at ₹200–₹500 per lead for most Indian small businesses — which is excellent ROI if your service value is high. The key is professional campaign management to minimise wasted spend." },
      { q: "Can I do SEO myself or do I need an agency?", a: "Basic on-page SEO can be done yourself, but competitive keyword rankings typically require technical expertise, content strategy, and link building — areas where a professional SEO agency delivers significantly better results." },
      { q: "What is a good monthly budget for Google Ads in India?", a: "For meaningful results in most Indian cities, we recommend a minimum ad spend of ₹15,000/month. Highly competitive industries like real estate or education may need ₹30,000–₹50,000/month for sufficient volume." },
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "Google Ads vs SEO: Which is Better for Your Indian Business in 2025?",
      "author": { "@type": "Organization", "name": "SNR Digital Marketing" },
      "publisher": { "@type": "Organization", "name": "SNR Digital Marketing" },
      "datePublished": "2025-03-20",
    },
  },
  {
    slug: "how-to-generate-leads-for-real-estate-in-india",
    title: "How to Generate More Real Estate Leads Online in India (2025 Guide)",
    metaTitle: "Generate Real Estate Leads Online in India — 2025 Complete Guide",
    metaDescription:
      "Complete guide to digital lead generation for Indian real estate businesses. Facebook Ads, Google Ads, SEO, and WhatsApp marketing strategies that work.",
    publishedAt: "2025-02-28",
    readTime: "12 min read",
    category: "Lead Generation",
    excerpt:
      "Real estate is one of India's most competitive digital marketing verticals. This guide covers the most effective online lead generation strategies for Indian real estate developers and agents.",
    coverAlt: "Real estate lead generation India digital marketing",
    content: [
      { type: "p", text: "Real estate is one of the most competitive digital marketing verticals in India — and generating quality leads online has never been more important (or more challenging). This guide covers the strategies that are working right now for Indian real estate businesses." },
      { type: "h2", text: "1. Facebook & Instagram Lead Ads (Meta Ads)" },
      { type: "p", text: "Meta Ads remain the #1 source of real estate leads in India for mid and premium projects. The targeting capabilities — income level, life events (newly married, expecting a child), residential area, and financial interests — allow hyper-targeted campaigns that reach your exact buyer profile." },
      { type: "p", text: "For best results, use Meta Lead Forms (in-app forms) rather than sending traffic to your website. The friction is lower and lead volume is typically 3–5× higher. Target buyers by income bracket, location, and property-relevant interests." },
      { type: "h2", text: "2. Google Search Ads for High-Intent Buyers" },
      { type: "p", text: "When someone searches '2BHK flats in Hyderabad under 60 lakhs' or 'plots for sale in Gachibowli', they are ready to buy. Google Search Ads put your project in front of these high-intent buyers at the exact moment of decision. While cost-per-click is high in real estate (₹100–₹500), the quality of these leads is exceptional." },
      { type: "h2", text: "3. SEO for Long-Term Organic Lead Flow" },
      { type: "p", text: "Ranking organically for location-based property searches generates free leads indefinitely. Target keywords like '[project type] in [city/area]', '[BHK configuration] [city area]', and 'plots for sale in [area]'. Content marketing (neighbourhood guides, investment guides) also attracts pre-decision buyers." },
      { type: "h2", text: "4. WhatsApp Marketing for Lead Nurturing" },
      { type: "p", text: "In India, WhatsApp is the most effective channel for nurturing real estate leads. Use WhatsApp Business API to send project updates, price revisions, site visit confirmations, and follow-up sequences. Response rates on WhatsApp are 5–10× higher than email for Indian real estate leads." },
      { type: "h2", text: "5. Video Marketing on YouTube and Instagram" },
      { type: "p", text: "Virtual property tours, neighbourhood walkthrough videos, and builder credibility videos are powerful trust-builders for expensive real estate purchases. YouTube Ads targeting people who search for related content, combined with Instagram Reels, can significantly improve your lead conversion rates." },
      { type: "h2", text: "6. Google Business Profile & Local SEO" },
      { type: "p", text: "Real estate agencies and developers with optimised Google Business Profiles appear in Google Maps results when buyers search locally. Regular updates, professional photos, and 50+ genuine reviews build trust and drive direct enquiries." },
      { type: "h2", text: "The Complete Real Estate Lead Generation Stack" },
      { type: "ul", items: [
        "Meta Ads (Facebook/Instagram) — Volume leads at ₹200–₹600 per lead",
        "Google Search Ads — High-intent leads at ₹500–₹1,500 per lead",
        "SEO + Content — Free organic leads (3–6 month build time)",
        "WhatsApp automation — Convert and nurture your leads",
        "YouTube/Reels — Build trust and increase conversion rates",
      ]},
    ],
    faqs: [
      { q: "Which digital channel generates the most real estate leads in India?", a: "Meta Ads (Facebook & Instagram) typically generate the highest volume of real estate leads in India due to superior targeting. Google Ads generate lower volume but higher quality (intent-based) leads. Most successful real estate marketers use both." },
      { q: "What is the average cost per lead for real estate in India?", a: "For Meta Ads: ₹200–₹600 per lead depending on the city, price point, and campaign quality. For Google Ads: ₹500–₹1,500 per lead. Quality leads (those who visit the site) typically cost ₹2,000–₹5,000 across channels." },
      { q: "How important is a landing page vs a website for real estate ads?", a: "Dedicated landing pages almost always outperform websites for paid advertising. A landing page has one goal — capturing the visitor's contact information — with no distractions. We typically see 3–5× better conversion rates with a dedicated landing page versus sending ad traffic to a general website." },
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "How to Generate More Real Estate Leads Online in India (2025 Guide)",
      "author": { "@type": "Organization", "name": "SNR Digital Marketing" },
      "publisher": { "@type": "Organization", "name": "SNR Digital Marketing" },
      "datePublished": "2025-02-28",
    },
  },
  {
    slug: "digital-marketing-for-hospitals-clinics-india",
    title: "Digital Marketing for Hospitals & Clinics in India: A 2025 Guide",
    metaTitle: "Digital Marketing for Hospitals & Clinics India — Get More Patients Online",
    metaDescription:
      "Complete digital marketing guide for hospitals and clinics in India. SEO, Google Ads, Meta Ads, and reputation management strategies to grow patient appointments.",
    publishedAt: "2025-01-20",
    readTime: "11 min read",
    category: "Healthcare Marketing",
    excerpt:
      "Patients are searching Google before booking any medical appointment. Here's how hospitals and clinics in India can use digital marketing to grow patient enquiries consistently.",
    coverAlt: "Digital marketing for hospitals and clinics India",
    content: [
      { type: "p", text: "The patient journey in India has fundamentally shifted. Before booking an appointment, 70%+ of patients now search Google for the doctor's credentials, clinic reviews, specialisation, and location. Healthcare providers who aren't visible online are losing patients to competitors every single day." },
      { type: "h2", text: "1. Google Business Profile — Your Most Important Asset" },
      { type: "p", text: "For hospitals and clinics, Google Business Profile is non-negotiable. When someone searches 'cardiologist near me' or 'best dental clinic in Hyderabad', the map pack (top 3 listings) gets 70% of clicks. Ensure your profile has accurate hours, services, photos of your facility, and — critically — consistent review collection." },
      { type: "h2", text: "2. SEO for Medical Specialisation Keywords" },
      { type: "p", text: "Rank organically for your specialisations. If you're a dermatologist in Hyderabad, target 'dermatologist in [area]', 'best skin clinic in Hyderabad', 'acne treatment Hyderabad', etc. Medical SEO requires E-E-A-T signals (doctor credentials, published content, certifications) which we help establish systematically." },
      { type: "h2", text: "3. Google Ads for Urgent Care & Specialist Appointments" },
      { type: "p", text: "For urgent or high-intent medical searches ('orthopaedic surgeon Hyderabad', 'IVF clinic Hyderabad'), Google Ads deliver immediate visibility. Call-only campaigns that prompt patients to call directly are particularly effective for clinics, generating 40–60% lower cost per appointment than website-click campaigns." },
      { type: "h2", text: "4. Meta Ads for Health Awareness & New Patients" },
      { type: "p", text: "Facebook and Instagram Ads work for healthcare when focused on awareness and education — 'Book your annual health checkup', 'Free diabetes screening camp', or 'New patient consultation offer'. Target by age, location, and health-related interests. AHCA compliance note: never target based on diagnosed conditions." },
      { type: "h2", text: "5. Online Reputation Management" },
      { type: "p", text: "Healthcare is a trust purchase. 90% of patients check reviews before choosing a clinic. Implement a systematic review collection process — text message reminders after appointments linking to your Google review page. Respond professionally to all reviews, including negative ones. Aim for 4.5+ star average with 100+ reviews." },
      { type: "h2", text: "6. Content Marketing & Doctor Personal Branding" },
      { type: "p", text: "Doctors who publish educational content — blog articles, YouTube videos, Instagram health tips — build enormous trust and SEO authority. A cardiologist with 50 articles on heart health will naturally rank for dozens of related medical keywords and be recommended by AI tools when patients ask health questions." },
    ],
    faqs: [
      { q: "Is digital marketing effective for small clinics in India?", a: "Yes, especially local SEO and Google Business Profile — both of which require minimal ongoing investment but deliver significant patient growth for local clinics. Small clinics in tier-2 cities often see dramatic results because competition for local Google visibility is much lower." },
      { q: "What digital marketing channels work best for hospitals in India?", a: "SEO + Google Business Profile (for organic patient discovery), Google Ads (for high-intent appointment searches), and online reputation management are the three highest-ROI channels for most Indian hospitals and clinics." },
      { q: "Are there any restrictions on healthcare advertising in India?", a: "Yes. Healthcare advertising in India must comply with the Indian Medical Association guidelines and platform policies. Testimonials making medical claims, before/after images, and guaranteed outcome claims are restricted. We ensure full compliance in all healthcare campaigns we manage." },
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "Digital Marketing for Hospitals & Clinics in India: A 2025 Guide",
      "author": { "@type": "Organization", "name": "SNR Digital Marketing" },
      "publisher": { "@type": "Organization", "name": "SNR Digital Marketing" },
      "datePublished": "2025-01-20",
    },
  },
  {
    slug: "what-is-geo-generative-engine-optimization",
    title: "What is GEO (Generative Engine Optimisation)? The Future of SEO in 2025",
    metaTitle: "What is GEO — Generative Engine Optimisation? The Future of SEO | SNR",
    metaDescription:
      "Understand Generative Engine Optimisation (GEO) — why it matters for your business, how ChatGPT and Google AI Overviews work, and how to optimise for AI search in 2025.",
    publishedAt: "2025-05-01",
    readTime: "9 min read",
    category: "AI & GEO",
    excerpt:
      "AI search is reshaping how customers find businesses. ChatGPT, Google AI Overviews, and Gemini are answering questions instead of showing links. Here's what GEO is and why every business needs it in 2025.",
    coverAlt: "GEO Generative Engine Optimisation AI search 2025",
    content: [
      { type: "p", text: "Search is changing faster than at any point in the last 20 years. When someone asks ChatGPT 'what is the best digital marketing agency in Hyderabad?', it doesn't show 10 blue links — it gives a direct answer, citing specific businesses it considers most credible. This is the new reality of search in 2025, and it demands a new strategy: Generative Engine Optimisation (GEO)." },
      { type: "h2", text: "What is Generative Engine Optimisation (GEO)?" },
      { type: "p", text: "GEO is the practice of optimising your digital presence to appear in AI-generated answers from ChatGPT, Google AI Overviews, Google Gemini, Perplexity, and other AI-powered search tools. Just as traditional SEO is about ranking in Google's blue links, GEO is about being cited in AI responses." },
      { type: "h2", text: "Why Does GEO Matter for Your Business?" },
      { type: "ul", items: [
        "Google AI Overviews now appear for 40%+ of search queries, replacing traditional links",
        "ChatGPT has over 180 million monthly users asking it for business recommendations",
        "Perplexity AI processes 10 million+ queries per day",
        "Businesses cited in AI answers get significant traffic and trust transfer",
        "Early movers will establish dominant AI visibility before competition catches up",
      ]},
      { type: "h2", text: "How Do AI Models Decide What to Cite?" },
      { type: "p", text: "AI models like ChatGPT and Gemini synthesise information from across the web. They prioritise sources that demonstrate E-E-A-T (Experience, Expertise, Authoritativeness, Trust) — the same signals Google uses for traditional SEO, but amplified. They also prefer structured, question-and-answer style content, and sources that are widely cited and referenced by other authoritative sources." },
      { type: "h2", text: "Key GEO Strategies for 2025" },
      { type: "ol", items: [
        "Build comprehensive FAQ and Q&A content that directly answers queries in your industry",
        "Establish strong brand entity signals — consistent NAP (Name, Address, Phone) across all platforms",
        "Get featured in authoritative industry publications and news sites that AI models heavily weight",
        "Implement comprehensive schema markup (FAQPage, LocalBusiness, Review, Product)",
        "Build E-E-A-T signals — author credentials, certifications, case studies, and data-driven content",
        "Collect and manage reviews on Google, industry platforms, and social proof sites",
      ]},
      { type: "h2", text: "GEO vs Traditional SEO: What's the Difference?" },
      { type: "p", text: "Traditional SEO optimises for Google's algorithm to rank web pages. GEO optimises for AI models' synthesis and citation decisions — which is about authority, trustworthiness, and content structure rather than keyword density and backlink count. The good news: strong traditional SEO is the foundation for GEO. They're complementary, not competing strategies." },
      { type: "h2", text: "How to Get Started with GEO" },
      { type: "p", text: "Start by running an AI visibility audit — ask ChatGPT, Gemini, and Perplexity questions that your customers might ask about your service and city. Note whether your business is mentioned. This baseline tells you exactly how much AI visibility work needs to be done. SNR Digital Marketing offers free AI visibility audits for Indian businesses — the first step to capturing the AI search opportunity." },
    ],
    faqs: [
      { q: "Does GEO replace SEO?", a: "No — GEO extends and complements traditional SEO. Strong technical SEO, content, and backlinks form the foundation for AI visibility. Businesses should invest in both for complete search presence in 2025 and beyond." },
      { q: "Can small businesses benefit from GEO?", a: "Absolutely. In fact, small businesses in less competitive niches have an advantage — there's less competition for AI citations in specific local markets. A well-executed GEO strategy can put a small Hyderabad clinic or law firm in AI answers before their much larger competitors adapt." },
      { q: "How do I know if ChatGPT mentions my business?", a: "You can test this manually by asking ChatGPT and Gemini relevant questions. SNR Digital Marketing also provides AI visibility audits — a systematic test of 20–30 relevant queries across multiple AI platforms to map your current AI presence." },
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "What is GEO (Generative Engine Optimisation)? The Future of SEO in 2025",
      "author": { "@type": "Organization", "name": "SNR Digital Marketing" },
      "publisher": { "@type": "Organization", "name": "SNR Digital Marketing" },
      "datePublished": "2025-05-01",
    },
  },
];
