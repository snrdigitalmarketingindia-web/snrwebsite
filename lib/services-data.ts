export type ServicePage = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  hero: {
    badge: string;
    heading: string;
    subheading: string;
    cta: string;
  };
  intro: string;
  benefits: { icon: string; title: string; desc: string }[];
  process: { step: number; title: string; desc: string }[];
  results: { stat: string; label: string }[];
  faqs: { q: string; a: string }[];
  schema: Record<string, unknown>;
};

export type LocationPage = {
  slug: string;
  city: string;
  service: string;
  metaTitle: string;
  metaDescription: string;
  hero: {
    heading: string;
    subheading: string;
  };
  intro: string;
  whyUs: { title: string; desc: string }[];
  faqs: { q: string; a: string }[];
};

export const servicePages: ServicePage[] = [
  {
    slug: "seo-services",
    title: "SEO Services",
    metaTitle: "SEO Services in India — Rank #1 on Google | SNR Digital Marketing",
    metaDescription:
      "Top SEO services in India. We help businesses rank on page 1 of Google with technical SEO, content, and link building. Get a free SEO audit today.",
    hero: {
      badge: "Search Engine Optimisation",
      heading: "Rank #1 on Google & Get Daily Organic Leads",
      subheading:
        "Our proven SEO system drives qualified traffic to your website — without paying for every click. Start growing today.",
      cta: "Get Free SEO Audit",
    },
    intro:
      "SEO (Search Engine Optimisation) is the process of ranking your website higher on Google so potential customers find you before your competitors. At SNR Digital Marketing, we use a data-driven, white-hat SEO strategy covering technical optimisation, content creation, and authority link building to deliver sustainable, long-term rankings.",
    benefits: [
      { icon: "🔍", title: "Keyword Research & Strategy", desc: "We identify high-intent keywords your customers actually search for, targeting terms that drive enquiries, not just traffic." },
      { icon: "⚙️", title: "Technical SEO Audit & Fixes", desc: "Site speed, Core Web Vitals, crawlability, schema markup — we fix every technical issue that holds your ranking back." },
      { icon: "✍️", title: "SEO Content Creation", desc: "We write Google-optimised service pages, blog articles, and landing pages that rank and convert visitors into leads." },
      { icon: "🔗", title: "Authority Link Building", desc: "High-quality backlinks from relevant Indian and global websites that strengthen your domain authority and rankings." },
      { icon: "📊", title: "Monthly Ranking Reports", desc: "Transparent monthly reports showing keyword rankings, traffic growth, and leads generated — so you always know your ROI." },
      { icon: "🗺️", title: "Local SEO & Google Maps", desc: "Dominate local search results and Google Maps for your city so nearby customers find and call you first." },
    ],
    process: [
      { step: 1, title: "Free SEO Audit", desc: "We analyse your website's current performance, technical health, and competitor landscape." },
      { step: 2, title: "Strategy & Keywords", desc: "We build a 90-day keyword and content roadmap aligned to your business goals." },
      { step: 3, title: "On-Page Optimisation", desc: "Optimise every page — titles, meta, headings, content, internal links, and schema." },
      { step: 4, title: "Content & Links", desc: "Publish SEO content and acquire quality backlinks to build authority." },
      { step: 5, title: "Track & Scale", desc: "Monthly reporting with rankings, traffic, and lead data. Refine and scale what works." },
    ],
    results: [
      { stat: "3×", label: "Average traffic increase in 90 days" },
      { stat: "Page 1", label: "Google rankings for target keywords" },
      { stat: "60%", label: "More leads from organic search" },
      { stat: "6 months", label: "Average time to dominant rankings" },
    ],
    faqs: [
      { q: "How long does SEO take to show results?", a: "Most clients see measurable ranking improvements within 60–90 days. Significant traffic and lead growth typically happens between 4–6 months. SEO is a long-term investment — once rankings are achieved, organic traffic continues without ongoing ad spend." },
      { q: "What industries do you serve for SEO?", a: "We specialise in SEO for hospitals, clinics, real estate agencies, educational institutes, e-commerce stores, and local service businesses across India." },
      { q: "Do you use white-hat SEO techniques?", a: "Yes, 100%. We only use Google-approved, white-hat SEO methods that build sustainable rankings. We never use spammy tactics that risk penalties." },
      { q: "What is included in your SEO packages?", a: "All plans include keyword research, on-page optimisation, technical SEO fixes, monthly content creation, link building, and monthly ranking reports." },
      { q: "Can you help with local SEO in Hyderabad?", a: "Absolutely. We have deep expertise in local SEO for Hyderabad businesses — including Google Business Profile optimisation, local citations, and map pack rankings." },
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "SEO Services",
      "provider": { "@type": "Organization", "name": "SNR Digital Marketing" },
      "areaServed": "India",
      "description": "Professional SEO services in India to rank businesses on page 1 of Google.",
    },
  },
  {
    slug: "google-ads-management",
    title: "Google Ads Management",
    metaTitle: "Google Ads Management India — Get Leads in 24 Hours | SNR Digital Marketing",
    metaDescription:
      "Expert Google Ads management in India. We run high-ROI Search, Display & YouTube campaigns that generate real leads and sales. Free audit available.",
    hero: {
      badge: "Google Ads (PPC)",
      heading: "Get Customer Enquiries Within 24 Hours With Google Ads",
      subheading:
        "We manage Google Ads campaigns that put your business in front of customers who are actively searching for what you offer — right now.",
      cta: "Get Free Google Ads Audit",
    },
    intro:
      "Google Ads is the fastest way to put your business in front of high-intent customers. When someone searches for your service, your ad appears at the very top of Google results — above all organic listings. SNR Digital Marketing specialises in ROI-focused Google Ads management for Indian businesses, combining expert campaign strategy, precise audience targeting, and conversion-optimised landing pages.",
    benefits: [
      { icon: "⚡", title: "Search Ads", desc: "Appear at the top of Google when customers search for exactly what you offer. Pay only when they click." },
      { icon: "🖥️", title: "Display & Retargeting", desc: "Show banner ads across millions of websites to build brand awareness and re-engage visitors who didn't convert." },
      { icon: "🎥", title: "YouTube Ads", desc: "Reach your audience with video ads on YouTube — powerful for brand building and high-ticket services." },
      { icon: "🛒", title: "Shopping Campaigns", desc: "For e-commerce businesses, we run Shopping ads that display your products directly in Google search results." },
      { icon: "📞", title: "Call-Only Campaigns", desc: "Drive direct phone calls from Google Ads — perfect for clinics, lawyers, and service businesses." },
      { icon: "📈", title: "Conversion Tracking", desc: "Every lead, call, and sale is tracked so you know your exact cost per lead and return on ad spend." },
    ],
    process: [
      { step: 1, title: "Account Audit / Setup", desc: "We audit your existing account or build a new one with proper structure, tracking, and goals." },
      { step: 2, title: "Keyword & Competitor Research", desc: "Identify high-intent keywords and analyse what competitors are bidding on." },
      { step: 3, title: "Campaign Build & Launch", desc: "Create optimised campaigns, ad groups, compelling ad copy, and conversion-focused landing pages." },
      { step: 4, title: "Bid & Budget Optimisation", desc: "Continuous A/B testing of ads, bid adjustments, and negative keyword management to lower cost per lead." },
      { step: 5, title: "Report & Scale", desc: "Weekly performance reports with leads, cost per lead, and ROAS. Scale winning campaigns aggressively." },
    ],
    results: [
      { stat: "24h", label: "Time to first leads after launch" },
      { stat: "40%", label: "Lower cost per lead vs industry average" },
      { stat: "5×", label: "Average return on ad spend (ROAS)" },
      { stat: "₹500", label: "Average cost per qualified lead" },
    ],
    faqs: [
      { q: "How much budget do I need for Google Ads?", a: "We recommend a minimum monthly ad spend of ₹15,000 for Search campaigns in India. Your ads budget is separate from our management fee. We help you get the maximum ROI from every rupee spent." },
      { q: "How quickly will I see results from Google Ads?", a: "Google Ads can generate leads within 24–48 hours of launch. Unlike SEO, results are immediate because your ads appear at the top of Google as soon as campaigns go live." },
      { q: "Do you provide landing pages for campaigns?", a: "Yes. We design and build high-conversion landing pages specifically optimised for your Google Ads campaigns to maximise lead generation." },
      { q: "What is your Google Ads management fee?", a: "Our management fee starts at ₹8,000/month for up to ₹30,000 ad spend. We offer flat-fee pricing — no percentage of spend — so our incentives are always aligned with your ROI, not your budget size." },
      { q: "Can you manage my existing Google Ads account?", a: "Absolutely. We'll audit your existing account, identify waste, restructure campaigns, and improve performance from day one." },
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Google Ads Management",
      "provider": { "@type": "Organization", "name": "SNR Digital Marketing" },
      "areaServed": "India",
    },
  },
  {
    slug: "meta-ads-management",
    title: "Meta Ads Management",
    metaTitle: "Meta Ads Agency India — Facebook & Instagram Ads | SNR Digital Marketing",
    metaDescription:
      "Expert Facebook & Instagram (Meta) Ads management in India. We generate leads and sales for your business with targeted social media advertising. Free strategy call.",
    hero: {
      badge: "Facebook & Instagram Ads",
      heading: "Generate Quality Leads With Facebook & Instagram Ads",
      subheading:
        "We run data-driven Meta Ads campaigns that put your business in front of the right audience — driving daily enquiries and measurable sales.",
      cta: "Get Free Meta Ads Strategy",
    },
    intro:
      "With over 400 million active users in India on Facebook and Instagram, Meta Ads offer unparalleled reach and targeting capabilities. SNR Digital Marketing creates and manages high-performing Meta Ads campaigns that generate genuine business enquiries — using precise audience targeting, compelling creative, and optimised lead funnels.",
    benefits: [
      { icon: "🎯", title: "Precise Audience Targeting", desc: "Target by location, age, income, interests, and behaviour. Reach exactly who will buy from you." },
      { icon: "📱", title: "Instagram & Facebook Ads", desc: "Multi-placement campaigns across Feed, Stories, Reels, and Explore — where your customers spend their time." },
      { icon: "📋", title: "Lead Generation Campaigns", desc: "Meta Lead Forms that capture name, phone, and email directly within Facebook/Instagram — zero friction for the user." },
      { icon: "🔄", title: "Retargeting & Lookalike", desc: "Retarget website visitors and create lookalike audiences that mirror your best existing customers." },
      { icon: "🎨", title: "Creative Design & Copywriting", desc: "Eye-catching ad creatives and persuasive copy designed specifically for Indian audiences and your industry." },
      { icon: "📊", title: "Full Funnel Reporting", desc: "Track impressions, clicks, leads, and cost per result. Know your exact ROI every week." },
    ],
    process: [
      { step: 1, title: "Audience Research", desc: "Define and build precise custom audiences using your customer data, interests, and demographics." },
      { step: 2, title: "Creative Development", desc: "Design scroll-stopping images, videos, and carousel ads with conversion-focused copy." },
      { step: 3, title: "Campaign Launch", desc: "Structure and launch campaigns with proper objectives — Lead Gen, Traffic, Conversions, or Awareness." },
      { step: 4, title: "Test & Optimise", desc: "A/B test creatives, audiences, and placements. Cut losers, scale winners every week." },
      { step: 5, title: "Scale & Report", desc: "Weekly performance reports. Scale profitable ad sets to maximise lead volume within your budget." },
    ],
    results: [
      { stat: "₹200", label: "Average cost per lead for local businesses" },
      { stat: "10×", label: "ROAS for e-commerce clients" },
      { stat: "48h", label: "Campaign live after strategy sign-off" },
      { stat: "3×", label: "More leads vs boosted posts" },
    ],
    faqs: [
      { q: "What is the minimum budget for Meta Ads?", a: "We recommend a minimum ad spend of ₹10,000/month for Meta Ads. This allows enough budget to test audiences and creatives effectively and generate consistent leads." },
      { q: "Can Meta Ads work for B2B businesses?", a: "Yes, Meta Ads can be effective for B2B if the right targeting is used — LinkedIn-style interest and job-title targeting on Facebook. We tailor the strategy to your specific business model." },
      { q: "What type of businesses benefit most from Meta Ads?", a: "Real estate, hospitals/clinics, coaching institutes, salons, restaurants, e-commerce, and any business serving a local or regional audience benefit greatly from Meta Ads." },
      { q: "Do you create the ad creatives?", a: "Yes. Our team designs all ad images, videos, and writes the copy. We create platform-native formats for Facebook Feed, Instagram Stories, and Reels." },
      { q: "How do you measure Meta Ads success?", a: "We track Cost Per Lead, Lead Quality (% that convert to enquiries), ROAS (for e-commerce), and weekly lead volume — all reported in a clear dashboard every week." },
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Meta Ads Management",
      "provider": { "@type": "Organization", "name": "SNR Digital Marketing" },
      "areaServed": "India",
    },
  },
  {
    slug: "website-development",
    title: "Website Development",
    metaTitle: "Website Development India — Fast, SEO-Ready Websites | SNR Digital Marketing",
    metaDescription:
      "Professional website development in India. We build fast, mobile-first, SEO-optimised websites that convert visitors into leads. Get a free website audit.",
    hero: {
      badge: "Website Development",
      heading: "Websites That Convert Visitors Into Paying Customers",
      subheading:
        "We design and build fast, mobile-first, SEO-ready websites for Indian businesses — built to generate daily leads and enquiries.",
      cta: "Get Free Website Consultation",
    },
    intro:
      "Your website is your most important digital asset. A slow, outdated, or poorly designed website loses you customers every day. SNR Digital Marketing builds professional, high-performance websites that are fast on mobile, optimised for Google, and designed to convert visitors into leads — helping you win business 24/7.",
    benefits: [
      { icon: "📱", title: "Mobile-First Design", desc: "Over 80% of Indian internet users are on mobile. We build for mobile first, ensuring perfect experience on every device." },
      { icon: "⚡", title: "Lightning-Fast Performance", desc: "Optimised code, compressed images, and CDN delivery for sub-2-second load times — faster than 95% of competitors." },
      { icon: "🔍", title: "SEO-Ready Structure", desc: "Every page built with proper heading hierarchy, schema markup, meta tags, and site structure for maximum Google visibility." },
      { icon: "🎨", title: "Premium UI/UX Design", desc: "Pixel-perfect designs that build trust, communicate your brand value, and guide visitors to take action." },
      { icon: "📞", title: "Conversion Optimisation", desc: "Strategic CTAs, WhatsApp buttons, click-to-call, and lead forms placed to maximise enquiries from every visitor." },
      { icon: "🔧", title: "CMS & Easy Updates", desc: "User-friendly content management so you can update text, images, and services without any technical knowledge." },
    ],
    process: [
      { step: 1, title: "Discovery & Planning", desc: "Understand your business goals, target audience, and competitors to define the ideal website structure." },
      { step: 2, title: "Design Mockups", desc: "Create wireframes and high-fidelity designs for your approval before any development begins." },
      { step: 3, title: "Development", desc: "Build the website with clean code, mobile responsiveness, and performance optimisation." },
      { step: 4, title: "SEO & Content", desc: "On-page SEO setup, schema markup, sitemap, and content integration for every page." },
      { step: 5, title: "Launch & Support", desc: "Deploy to your domain, connect analytics, and provide 3 months of post-launch support." },
    ],
    results: [
      { stat: "< 2s", label: "Average page load time" },
      { stat: "95+", label: "Google PageSpeed score" },
      { stat: "3×", label: "More leads vs old website" },
      { stat: "7 days", label: "Average delivery for standard sites" },
    ],
    faqs: [
      { q: "How much does a website cost?", a: "Our websites start at ₹15,000 for a 5-page business website. E-commerce and custom web applications are priced based on requirements. All websites include mobile responsiveness, basic SEO, and 3 months of support." },
      { q: "How long does it take to build a website?", a: "A standard 5–10 page business website is delivered in 7–10 working days after design approval. E-commerce sites typically take 15–21 days." },
      { q: "Do you provide website hosting?", a: "Yes, we offer managed hosting starting at ₹3,000/year — including SSL certificate, daily backups, and uptime monitoring." },
      { q: "Can you redesign my existing website?", a: "Absolutely. We specialise in redesigning outdated websites — improving speed, design, mobile experience, and SEO — while preserving your existing content." },
      { q: "Will my website rank on Google?", a: "Every website we build is SEO-ready with proper structure and on-page optimisation. For active monthly SEO to rank for competitive keywords, we recommend adding our SEO service package." },
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Website Development",
      "provider": { "@type": "Organization", "name": "SNR Digital Marketing" },
      "areaServed": "India",
    },
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    metaTitle: "Mobile App Development India — Android & iOS Apps | SNR Digital Marketing",
    metaDescription:
      "Professional Android and iOS mobile app development in India. We build customer-facing apps, delivery apps, and business automation apps. Free consultation.",
    hero: {
      badge: "Mobile App Development",
      heading: "Custom Android & iOS Apps for Your Business",
      subheading:
        "We build fast, intuitive mobile apps that help you serve customers better, automate operations, and stay ahead of competitors.",
      cta: "Discuss Your App Idea",
    },
    intro:
      "A well-built mobile app can transform how your customers interact with your business — increasing loyalty, repeat purchases, and operational efficiency. SNR Digital Marketing delivers custom Android and iOS app development for Indian businesses — from customer-facing apps to internal business tools — built with modern technology and designed to scale.",
    benefits: [
      { icon: "📱", title: "Native Android & iOS", desc: "Platform-native apps that deliver the best performance and user experience on both Android and iPhone." },
      { icon: "⚛️", title: "Cross-Platform (React Native)", desc: "One codebase for both platforms — faster development and lower cost without compromising quality." },
      { icon: "🛒", title: "E-commerce Apps", desc: "Product catalogues, cart, payment gateway integration (Razorpay/UPI), and order management." },
      { icon: "🚚", title: "Delivery & Booking Apps", desc: "Real-time tracking, slot booking, driver management, and notification systems for delivery businesses." },
      { icon: "🔔", title: "Push Notifications", desc: "Engage users with personalised push notifications for offers, reminders, and updates — driving repeat business." },
      { icon: "📊", title: "Analytics & Dashboard", desc: "In-app analytics and admin dashboard to track user behaviour, orders, and revenue in real time." },
    ],
    process: [
      { step: 1, title: "Requirements & Wireframes", desc: "Define features, user flows, and create clickable wireframes for your approval." },
      { step: 2, title: "UI/UX Design", desc: "High-fidelity screens designed to your brand with intuitive, finger-friendly navigation." },
      { step: 3, title: "Development & Testing", desc: "Agile development sprints with weekly demos and thorough QA testing on real devices." },
      { step: 4, title: "App Store Submission", desc: "Handle the full Google Play and Apple App Store submission and approval process." },
      { step: 5, title: "Launch & Maintenance", desc: "App launch support, performance monitoring, and ongoing updates and improvements." },
    ],
    results: [
      { stat: "4.5★", label: "Average app store rating for our apps" },
      { stat: "30 days", label: "Typical MVP delivery timeline" },
      { stat: "99.9%", label: "App uptime (crash-free sessions)" },
      { stat: "2×", label: "Customer retention with a branded app" },
    ],
    faqs: [
      { q: "How much does it cost to develop a mobile app?", a: "A simple business app (catalogue + enquiry) starts at ₹50,000. E-commerce apps with payments start at ₹1,00,000. Complex apps with real-time features are priced after discovery. We provide a detailed quote after understanding your requirements." },
      { q: "How long does app development take?", a: "A basic app MVP takes 4–6 weeks. Full-featured e-commerce or delivery apps typically take 8–12 weeks. We use agile development so you see progress weekly." },
      { q: "Do you publish the app to Play Store and App Store?", a: "Yes, we handle the complete submission process for both Google Play Store and Apple App Store, including screenshots, descriptions, and category selection." },
      { q: "Do you offer app maintenance after launch?", a: "Yes. We offer monthly maintenance packages starting at ₹5,000/month covering bug fixes, OS compatibility updates, and minor feature enhancements." },
      { q: "Can you build the backend/API for my app?", a: "Yes. We build complete solutions including the mobile front-end, REST API backend, and admin dashboard — everything your app needs to function." },
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Mobile App Development",
      "provider": { "@type": "Organization", "name": "SNR Digital Marketing" },
      "areaServed": "India",
    },
  },
  {
    slug: "ai-geo-optimization",
    title: "AI & GEO Optimization",
    metaTitle: "AI & GEO Optimization India — Rank in ChatGPT, Gemini & AI Search | SNR",
    metaDescription:
      "Future-proof your business with AI SEO and Generative Engine Optimisation (GEO). Get your brand cited in ChatGPT, Google AI Overviews, and Gemini. Hyderabad India.",
    hero: {
      badge: "AI & GEO Optimisation",
      heading: "Get Your Business Found in ChatGPT, Gemini & AI Search",
      subheading:
        "The future of search is AI. We optimise your digital presence to appear in AI-generated answers, Google AI Overviews, and next-gen search engines.",
      cta: "Book Free AI Visibility Audit",
    },
    intro:
      "Over 30% of search queries now return AI-generated answers instead of traditional blue links. ChatGPT, Google's AI Overviews, and Gemini are changing how customers discover businesses. Generative Engine Optimisation (GEO) is the new frontier of digital marketing — and SNR Digital Marketing is one of the first agencies in India specialising in making businesses visible in AI-powered search.",
    benefits: [
      { icon: "🤖", title: "AI Overview Optimisation", desc: "Optimise your content to be cited in Google's AI Overviews — the summaries that now appear above all traditional search results." },
      { icon: "💬", title: "ChatGPT & Gemini Citations", desc: "Structure your website content so AI models train on and cite your business when users ask relevant questions." },
      { icon: "📝", title: "E-E-A-T Content Strategy", desc: "Build Experience, Expertise, Authoritativeness, and Trust signals that both AI models and Google reward." },
      { icon: "🏢", title: "Brand Entity Optimisation", desc: "Establish your business as a recognised, trusted entity in AI knowledge graphs — the foundation of AI visibility." },
      { icon: "⭐", title: "Review & Reputation Signals", desc: "Amplify your reviews across Google, Trustpilot, and industry platforms — a key signal for AI citations." },
      { icon: "🔗", title: "Structured Data & Schema", desc: "Advanced schema markup (FAQ, LocalBusiness, Review, Product) that helps AI models understand and surface your business." },
    ],
    process: [
      { step: 1, title: "AI Visibility Audit", desc: "Check how your business appears (or doesn't) in ChatGPT, Gemini, and Google AI Overviews today." },
      { step: 2, title: "Entity & Brand Signals", desc: "Build consistent Name/Address/Phone citations and brand entity signals across the web." },
      { step: 3, title: "Content Restructuring", desc: "Rewrite and restructure content to answer questions in the format AI models prefer to cite." },
      { step: 4, title: "Schema & Technical GEO", desc: "Implement comprehensive structured data and technical optimisations for AI crawlers." },
      { step: 5, title: "Monitor & Expand", desc: "Track AI citation frequency and expand coverage across more topics and queries monthly." },
    ],
    results: [
      { stat: "3×", label: "More AI search citations in 90 days" },
      { stat: "40%", label: "Of queries now show AI Overviews" },
      { stat: "First", label: "Agency in Hyderabad offering GEO" },
      { stat: "2026", label: "Year AI SEO becomes non-negotiable" },
    ],
    faqs: [
      { q: "What is GEO (Generative Engine Optimisation)?", a: "GEO is the practice of optimising your content and digital presence to appear in AI-generated answers from tools like ChatGPT, Google AI Overviews, Gemini, and Perplexity — the next evolution beyond traditional SEO." },
      { q: "Is GEO replacing traditional SEO?", a: "No — GEO complements SEO. Strong traditional SEO forms the foundation for AI visibility. However, businesses that only do traditional SEO will increasingly miss out as AI captures more search traffic." },
      { q: "How do I know if AI is showing my business in answers?", a: "We conduct a comprehensive AI visibility audit — testing dozens of queries related to your business across ChatGPT, Gemini, Perplexity, and Google AI Overviews to map your current AI presence." },
      { q: "How long does GEO take to show results?", a: "Initial improvements in AI citations are typically seen within 60–90 days as AI models update their training data and Google refreshes its AI Overviews content pool." },
      { q: "Which businesses benefit most from GEO?", a: "Any business where customers ask AI for recommendations: healthcare, legal, finance, real estate, education, and professional services. If someone might ask ChatGPT 'who is the best [your service] in [your city]', GEO is critical for you." },
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "AI & GEO Optimization",
      "provider": { "@type": "Organization", "name": "SNR Digital Marketing" },
      "areaServed": "India",
    },
  },
];

export const locationPages: LocationPage[] = [
  {
    slug: "seo-services-hyderabad",
    city: "Hyderabad",
    service: "SEO Services",
    metaTitle: "SEO Services in Hyderabad — Rank #1 on Google | SNR Digital Marketing",
    metaDescription:
      "Best SEO company in Hyderabad. We help local businesses rank on page 1 of Google with proven SEO strategies. Free SEO audit for Hyderabad businesses.",
    hero: {
      heading: "SEO Services in Hyderabad — Rank on Page 1 of Google",
      subheading:
        "SNR Digital Marketing is Hyderabad's trusted SEO agency. We help local businesses across Banjara Hills, Hitech City, Gachibowli & beyond rank higher and get more customers online.",
    },
    intro:
      "Hyderabad's digital economy is booming — and competition for top Google rankings is fierce. Whether you run a hospital in Banjara Hills, a real estate agency in Gachibowli, or a coaching institute in Ameerpet, our Hyderabad SEO services help you outrank competitors and capture high-intent local search traffic.",
    whyUs: [
      { title: "Deep Hyderabad Market Knowledge", desc: "We understand the local competitive landscape across all major Hyderabad neighbourhoods — Hitech City, Banjara Hills, Jubilee Hills, Ameerpet, and more." },
      { title: "Telugu & English SEO", desc: "We optimise for both English and regional search queries to capture the full Hyderabad and Telangana audience." },
      { title: "Results in 90 Days", desc: "Our Hyderabad clients see measurable ranking improvements within 60–90 days with our proven local SEO framework." },
      { title: "Transparent Reporting", desc: "Monthly ranking reports with keyword positions, traffic data, and leads generated — no fluff, just results." },
    ],
    faqs: [
      { q: "Which areas of Hyderabad do you serve?", a: "We serve businesses across all of Hyderabad including Banjara Hills, Hitech City, Gachibowli, Ameerpet, Kukatpally, Secunderabad, Jubilee Hills, Madhapur, and surrounding areas." },
      { q: "How much do SEO services cost in Hyderabad?", a: "Our Hyderabad SEO packages start at ₹8,000/month for local SEO and ₹15,000/month for comprehensive SEO targeting competitive keywords." },
      { q: "Can you get my business on Google Maps in Hyderabad?", a: "Yes. Our local SEO service includes full Google Business Profile optimisation to help your business rank in the top 3 of Google Maps for your target areas in Hyderabad." },
    ],
  },
  {
    slug: "digital-marketing-hyderabad",
    city: "Hyderabad",
    service: "Digital Marketing",
    metaTitle: "Digital Marketing Agency in Hyderabad — SNR Digital Marketing",
    metaDescription:
      "Top digital marketing agency in Hyderabad. SEO, Google Ads, Meta Ads & website development for Hyderabad businesses. Proven results. Free consultation.",
    hero: {
      heading: "Hyderabad's Leading Digital Marketing Agency",
      subheading:
        "We help businesses across Hyderabad grow online with data-driven SEO, Google Ads, Meta Ads, and website development. Trusted by 150+ local businesses.",
    },
    intro:
      "Hyderabad is one of India's fastest-growing business hubs — and digital marketing is the engine driving that growth. SNR Digital Marketing is a full-service digital marketing agency based in Hyderabad, serving businesses across industries with end-to-end online marketing solutions that generate real, measurable results.",
    whyUs: [
      { title: "Hyderabad-Based Team", desc: "We are not a remote agency or outsourced service. Our team is based in Hyderabad — we understand your market, your customers, and your competition." },
      { title: "All Services Under One Roof", desc: "SEO, Google Ads, Meta Ads, content marketing, website development, and mobile apps — no need to manage multiple agencies." },
      { title: "Industry-Specific Expertise", desc: "Dedicated experience in healthcare, real estate, education, and e-commerce — the key industries driving Hyderabad's growth." },
      { title: "Guaranteed Lead Growth", desc: "We focus on business outcomes — leads, calls, and revenue — not vanity metrics like impressions or followers." },
    ],
    faqs: [
      { q: "Are you a Hyderabad-based digital marketing agency?", a: "Yes. SNR Digital Marketing is headquartered in Hyderabad and serves businesses across Telangana, Andhra Pradesh, and all of India." },
      { q: "What industries do you serve in Hyderabad?", a: "We work with hospitals, real estate agencies, educational institutes, restaurants, e-commerce stores, manufacturing companies, and professional services firms across Hyderabad." },
      { q: "How do I get started with your digital marketing services?", a: "Book a free consultation via WhatsApp or phone. We'll analyse your business, understand your goals, and recommend the right digital marketing strategy within 24 hours." },
    ],
  },
  {
    slug: "google-ads-agency-hyderabad",
    city: "Hyderabad",
    service: "Google Ads",
    metaTitle: "Google Ads Agency in Hyderabad — Get Leads in 24 Hours | SNR Digital",
    metaDescription:
      "Expert Google Ads agency in Hyderabad. We run high-ROI Google Search, Display & YouTube campaigns for Hyderabad businesses. Free campaign audit. Call now.",
    hero: {
      heading: "Google Ads Agency in Hyderabad — Leads in 24 Hours",
      subheading:
        "We manage results-driven Google Ads campaigns for Hyderabad businesses — generating daily leads at the lowest possible cost per enquiry.",
    },
    intro:
      "Looking for a Google Ads agency in Hyderabad that actually delivers results? SNR Digital Marketing specialises in Google Ads management for Hyderabad businesses — from hospitals and real estate developers to educational institutes and e-commerce stores. We've helped Hyderabad businesses generate thousands of qualified leads through expert campaign management.",
    whyUs: [
      { title: "Google Certified Partners", desc: "Our team is certified in Google Ads — ensuring your campaigns are managed to the highest professional standards." },
      { title: "Hyderabad Industry Expertise", desc: "We know which keywords, bidding strategies, and ad formats work for Hyderabad's specific industries and customer behaviour." },
      { title: "No Long-Term Lock-In", desc: "Month-to-month contracts. We earn your business through results, not contracts." },
      { title: "Lowest Cost Per Lead", desc: "Our optimisation process consistently reduces cost per lead by 30–50% compared to self-managed campaigns." },
    ],
    faqs: [
      { q: "What is the minimum ad budget for Google Ads in Hyderabad?", a: "We recommend a minimum ad spend of ₹15,000/month for Hyderabad campaigns. This is separate from our management fee starting at ₹8,000/month." },
      { q: "Do you specialise in any industries for Google Ads in Hyderabad?", a: "Yes — we have deep expertise in Google Ads for hospitals, real estate agencies, coaching institutes, and e-commerce stores in Hyderabad." },
      { q: "How soon can my Google Ads campaign go live?", a: "We can have your campaign live within 48–72 hours of starting the onboarding process." },
    ],
  },
  {
    slug: "seo-company-india",
    city: "India",
    service: "SEO",
    metaTitle: "Best SEO Company in India — Page 1 Rankings Guaranteed | SNR Digital",
    metaDescription:
      "Top SEO company in India with proven results. We rank Indian businesses on page 1 of Google with white-hat SEO. Serving clients across all major Indian cities.",
    hero: {
      heading: "India's Trusted SEO Company — Get to Page 1 of Google",
      subheading:
        "SNR Digital Marketing provides enterprise-grade SEO services across India — helping businesses in every major city dominate Google search and generate daily organic leads.",
    },
    intro:
      "India has over 800 million internet users — and Google is how most of them discover new businesses. SNR Digital Marketing is a leading SEO company in India, delivering Page 1 Google rankings for businesses across Mumbai, Delhi, Bangalore, Hyderabad, Chennai, Pune, and beyond. Our proven SEO methodology combines technical excellence, content strategy, and authority building to deliver rankings that last.",
    whyUs: [
      { title: "Pan-India SEO Expertise", desc: "We've delivered SEO results for businesses across 20+ Indian cities — understanding the unique competitive landscape in each market." },
      { title: "Industry-Specific SEO", desc: "Dedicated SEO frameworks for healthcare, real estate, education, manufacturing, and e-commerce — built from years of experience in each sector." },
      { title: "White-Hat Only", desc: "100% Google-compliant SEO techniques. No shortcuts, no penalties, no risk. Just sustainable rankings that compound over time." },
      { title: "Bilingual SEO", desc: "We optimise for both English and regional Indian languages — capturing the full spectrum of how your customers search." },
    ],
    faqs: [
      { q: "Do you provide SEO services across all of India?", a: "Yes. We serve clients across all major Indian cities — Mumbai, Delhi, Bangalore, Hyderabad, Chennai, Pune, Kolkata, Ahmedabad, and beyond — with fully remote engagement." },
      { q: "How is your SEO pricing structured?", a: "Our India-wide SEO packages start at ₹10,000/month for small businesses and scale up based on the number of keywords, pages, and competition level. We offer monthly rolling contracts with no minimum term." },
      { q: "Can you help a new website rank on Google?", a: "Yes. We have a proven process for ranking new websites — starting with foundational technical SEO and content, then building authority progressively. New sites typically see initial rankings within 90 days and strong positions within 6 months." },
    ],
  },
];
