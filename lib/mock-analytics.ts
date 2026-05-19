/* Mock analytics data for the client dashboard.
   Designed for easy swap to real API (Firebase/Supabase) later. */

export type MonthData = {
  month: string;
  organicTraffic: number;
  leads: number;
  adSpend: number;
  calls: number;
  whatsapp: number;
};

export type KeywordRanking = {
  keyword: string;
  position: number;
  change: number;  // positive = improved (moved up), negative = dropped
  searchVolume: number;
};

export type CampaignMetrics = {
  impressions: number;
  clicks: number;
  leads: number;
  spend: number;
  cpl: number;  // cost per lead
  ctr: number;  // click-through rate %
  trend: number; // % change vs last month
};

export type ClientData = {
  summary: {
    totalLeads: number;
    totalCalls: number;
    totalWhatsApp: number;
    organicTraffic: number;
    adSpend: number;
    roi: number;  // x return
    leadsChange: number;
    trafficChange: number;
  };
  monthlyTrend: MonthData[];
  seoKeywords: KeywordRanking[];
  googleAds: CampaignMetrics;
  metaAds: CampaignMetrics;
  websiteTraffic: {
    sessions: number;
    pageViews: number;
    bounceRate: number;
    avgDuration: string;
    topPages: { page: string; visits: number }[];
  };
};

export type MockClient = {
  id: string;
  name: string;
  businessType: string;
  email: string;
  password: string;
  industry: string;
  campaignStart: string;
  location: string;
  services: string[];
  data: ClientData;
};

export const mockClients: MockClient[] = [
  /* ── Demo / SNR Internal ──────────────────────────────────────────── */
  {
    id: "demo",
    name: "SNR Demo Client",
    businessType: "Healthcare",
    email: "demo@snrdigital.com",
    password: "Demo@1234",
    industry: "Hospital / Clinic",
    campaignStart: "November 2024",
    location: "Hyderabad",
    services: ["SEO", "Google Ads", "Meta Ads", "Website"],
    data: {
      summary: {
        totalLeads: 312,
        totalCalls: 87,
        totalWhatsApp: 156,
        organicTraffic: 18420,
        adSpend: 84000,
        roi: 6.4,
        leadsChange: 38,
        trafficChange: 124,
      },
      monthlyTrend: [
        { month: "Dec 24", organicTraffic: 3200, leads: 28, adSpend: 12000, calls: 9,  whatsapp: 14 },
        { month: "Jan 25", organicTraffic: 4800, leads: 38, adSpend: 14000, calls: 12, whatsapp: 19 },
        { month: "Feb 25", organicTraffic: 6200, leads: 47, adSpend: 14000, calls: 14, whatsapp: 23 },
        { month: "Mar 25", organicTraffic: 8900, leads: 62, adSpend: 14000, calls: 18, whatsapp: 31 },
        { month: "Apr 25", organicTraffic: 12400, leads: 78, adSpend: 15000, calls: 22, whatsapp: 39 },
        { month: "May 25", organicTraffic: 18420, leads: 59, adSpend: 15000, calls: 12, whatsapp: 30 },
      ],
      seoKeywords: [
        { keyword: "multispecialty hospital hyderabad",  position: 3,  change: 8,  searchVolume: 2400 },
        { keyword: "best hospital banjara hills",         position: 2,  change: 14, searchVolume: 1800 },
        { keyword: "cardiologist hyderabad",              position: 5,  change: 6,  searchVolume: 3200 },
        { keyword: "orthopaedic surgeon hyderabad",       position: 4,  change: 11, searchVolume: 2100 },
        { keyword: "hospital near me hyderabad",          position: 1,  change: 3,  searchVolume: 8500 },
        { keyword: "health checkup packages hyderabad",   position: 7,  change: -2, searchVolume: 1400 },
        { keyword: "paediatric clinic hyderabad",         position: 6,  change: 4,  searchVolume: 960 },
        { keyword: "gynaecologist hyderabad",             position: 9,  change: 7,  searchVolume: 2800 },
        { keyword: "diabetologist near me",               position: 12, change: 5,  searchVolume: 1700 },
        { keyword: "ivf clinic hyderabad",                position: 8,  change: 9,  searchVolume: 4200 },
      ],
      googleAds: {
        impressions: 124800,
        clicks: 4370,
        leads: 178,
        spend: 48000,
        cpl: 270,
        ctr: 3.5,
        trend: 22,
      },
      metaAds: {
        impressions: 382000,
        clicks: 8240,
        leads: 134,
        spend: 36000,
        cpl: 269,
        ctr: 2.16,
        trend: 14,
      },
      websiteTraffic: {
        sessions: 18420,
        pageViews: 54600,
        bounceRate: 38,
        avgDuration: "3m 42s",
        topPages: [
          { page: "/",                  visits: 7200 },
          { page: "/cardiology",        visits: 3400 },
          { page: "/health-checkup",    visits: 2800 },
          { page: "/contact",           visits: 2100 },
          { page: "/orthopaedics",      visits: 1640 },
        ],
      },
    },
  },

  /* ── Real Estate Client ───────────────────────────────────────────── */
  {
    id: "realty",
    name: "Skyline Realty",
    businessType: "Real Estate",
    email: "realty@client.com",
    password: "Client@123",
    industry: "Real Estate",
    campaignStart: "January 2025",
    location: "Hyderabad",
    services: ["Google Ads", "Meta Ads", "Landing Pages"],
    data: {
      summary: {
        totalLeads: 486,
        totalCalls: 124,
        totalWhatsApp: 278,
        organicTraffic: 9840,
        adSpend: 148000,
        roi: 12.8,
        leadsChange: 64,
        trafficChange: 82,
      },
      monthlyTrend: [
        { month: "Jan 25", organicTraffic: 1200, leads: 52,  adSpend: 22000, calls: 14, whatsapp: 30 },
        { month: "Feb 25", organicTraffic: 2100, leads: 68,  adSpend: 24000, calls: 17, whatsapp: 40 },
        { month: "Mar 25", organicTraffic: 3400, leads: 84,  adSpend: 25000, calls: 21, whatsapp: 48 },
        { month: "Apr 25", organicTraffic: 5800, leads: 106, adSpend: 26000, calls: 28, whatsapp: 62 },
        { month: "May 25", organicTraffic: 7200, leads: 98,  adSpend: 24000, calls: 24, whatsapp: 56 },
        { month: "Jun 25", organicTraffic: 9840, leads: 78,  adSpend: 27000, calls: 20, whatsapp: 42 },
      ],
      seoKeywords: [
        { keyword: "2bhk flats hyderabad",               position: 4,  change: 12, searchVolume: 8400 },
        { keyword: "plots for sale gachibowli",           position: 2,  change: 18, searchVolume: 3600 },
        { keyword: "luxury apartments hyderabad",         position: 6,  change: 8,  searchVolume: 4200 },
        { keyword: "real estate agency hyderabad",        position: 5,  change: 9,  searchVolume: 2800 },
        { keyword: "residential plots near hitech city",  position: 3,  change: 15, searchVolume: 2200 },
        { keyword: "3bhk flat hyderabad under 1 crore",   position: 8,  change: 6,  searchVolume: 5600 },
        { keyword: "villa for sale in jubilee hills",     position: 7,  change: -1, searchVolume: 1800 },
        { keyword: "property investment hyderabad 2025",  position: 11, change: 14, searchVolume: 3100 },
        { keyword: "commercial property hyderabad",       position: 9,  change: 4,  searchVolume: 2400 },
        { keyword: "new projects in gachibowli",          position: 6,  change: 10, searchVolume: 1900 },
      ],
      googleAds: {
        impressions: 218400,
        clicks: 8720,
        leads: 264,
        spend: 82000,
        cpl: 311,
        ctr: 3.99,
        trend: 34,
      },
      metaAds: {
        impressions: 614000,
        clicks: 14800,
        leads: 222,
        spend: 66000,
        cpl: 297,
        ctr: 2.41,
        trend: 28,
      },
      websiteTraffic: {
        sessions: 9840,
        pageViews: 31200,
        bounceRate: 42,
        avgDuration: "4m 18s",
        topPages: [
          { page: "/",               visits: 3800 },
          { page: "/projects",       visits: 2600 },
          { page: "/gachibowli",     visits: 1800 },
          { page: "/2bhk-flats",     visits: 1400 },
          { page: "/contact",        visits: 960 },
        ],
      },
    },
  },

  /* ── Education Client ────────────────────────────────────────────── */
  {
    id: "edu",
    name: "EduPrime Academy",
    businessType: "Education",
    email: "edu@client.com",
    password: "Client@123",
    industry: "Education",
    campaignStart: "February 2025",
    location: "Hyderabad",
    services: ["SEO", "Google Ads", "Meta Ads"],
    data: {
      summary: {
        totalLeads: 228,
        totalCalls: 62,
        totalWhatsApp: 104,
        organicTraffic: 12600,
        adSpend: 62000,
        roi: 4.2,
        leadsChange: 52,
        trafficChange: 96,
      },
      monthlyTrend: [
        { month: "Feb 25", organicTraffic: 1400, leads: 18, adSpend: 9000,  calls: 5,  whatsapp: 8  },
        { month: "Mar 25", organicTraffic: 2800, leads: 28, adSpend: 10000, calls: 8,  whatsapp: 13 },
        { month: "Apr 25", organicTraffic: 4600, leads: 42, adSpend: 11000, calls: 12, whatsapp: 19 },
        { month: "May 25", organicTraffic: 7200, leads: 56, adSpend: 12000, calls: 16, whatsapp: 26 },
        { month: "Jun 25", organicTraffic: 9800, leads: 48, adSpend: 10000, calls: 13, whatsapp: 22 },
        { month: "Jul 25", organicTraffic: 12600, leads: 36, adSpend: 10000, calls: 8, whatsapp: 16 },
      ],
      seoKeywords: [
        { keyword: "best coaching institute hyderabad",   position: 4, change: 9,  searchVolume: 6200 },
        { keyword: "neet coaching hyderabad",             position: 3, change: 14, searchVolume: 8800 },
        { keyword: "jee coaching ameerpet",               position: 5, change: 7,  searchVolume: 4600 },
        { keyword: "online coaching classes hyderabad",   position: 6, change: 11, searchVolume: 3400 },
        { keyword: "mba entrance coaching hyderabad",     position: 8, change: 5,  searchVolume: 2800 },
        { keyword: "upsc coaching hyderabad",             position: 7, change: -3, searchVolume: 5200 },
        { keyword: "bank exam coaching hyderabad",        position: 9, change: 8,  searchVolume: 3800 },
        { keyword: "ielts coaching hyderabad",            position: 6, change: 12, searchVolume: 4100 },
        { keyword: "gate coaching institute hyderabad",   position: 11, change: 6, searchVolume: 2600 },
        { keyword: "study abroad consultants hyderabad",  position: 10, change: 4, searchVolume: 3200 },
      ],
      googleAds: {
        impressions: 96400,
        clicks: 3860,
        leads: 124,
        spend: 36000,
        cpl: 290,
        ctr: 4.0,
        trend: 18,
      },
      metaAds: {
        impressions: 248000,
        clicks: 6200,
        leads: 104,
        spend: 26000,
        cpl: 250,
        ctr: 2.5,
        trend: 22,
      },
      websiteTraffic: {
        sessions: 12600,
        pageViews: 38400,
        bounceRate: 36,
        avgDuration: "4m 02s",
        topPages: [
          { page: "/",             visits: 4800 },
          { page: "/neet-coaching",visits: 3200 },
          { page: "/jee-coaching", visits: 2400 },
          { page: "/admissions",   visits: 1600 },
          { page: "/contact",      visits: 1200 },
        ],
      },
    },
  },
];

export function getClientById(id: string): MockClient | undefined {
  return mockClients.find((c) => c.id === id);
}

export function authenticateClient(email: string, password: string): MockClient | null {
  return mockClients.find((c) => c.email === email && c.password === password) ?? null;
}
