/* Multi-Tenant SaaS Engine — white-label architecture.
   localStorage-backed for demo; Supabase schema in supabase/tenant-schema.sql. */

/* ── Plan config ─────────────────────────────────────────────── */

export type PlanId = "starter" | "growth" | "pro";

export type PlanConfig = {
  id:              PlanId;
  name:            string;
  price:           string;
  priceMonthly:    number;
  leadLimit:       number;
  clientLimit:     number;
  campaignLimit:   number;
  aiScoring:       boolean;
  whiteLabel:      boolean;
  customDomain:    boolean;
  prioritySupport: boolean;
  features:        string[];
  color:           string;
  badge:           string;
};

export const PLANS: Record<PlanId, PlanConfig> = {
  starter: {
    id: "starter", name: "Starter", price: "₹2,999/mo", priceMonthly: 2999,
    leadLimit: 100, clientLimit: 3, campaignLimit: 5,
    aiScoring: false, whiteLabel: false, customDomain: false, prioritySupport: false,
    features: ["Up to 100 leads/mo", "3 client accounts", "5 AI campaigns", "Basic CRM", "CSV export"],
    color: "#64748B", badge: "bg-slate-500/15 text-slate-300 border-slate-500/30",
  },
  growth: {
    id: "growth", name: "Growth", price: "₹7,999/mo", priceMonthly: 7999,
    leadLimit: 500, clientLimit: 15, campaignLimit: 25,
    aiScoring: true, whiteLabel: true, customDomain: false, prioritySupport: false,
    features: ["Up to 500 leads/mo", "15 client accounts", "25 AI campaigns", "AI lead scoring", "White-label branding", "Advanced analytics"],
    color: "#3B82F6", badge: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  },
  pro: {
    id: "pro", name: "Pro Agency", price: "₹19,999/mo", priceMonthly: 19999,
    leadLimit: 9999, clientLimit: 9999, campaignLimit: 9999,
    aiScoring: true, whiteLabel: true, customDomain: true, prioritySupport: true,
    features: ["Unlimited leads", "Unlimited clients", "Unlimited AI campaigns", "Custom domain support", "Priority support", "API access", "Team accounts"],
    color: "#A855F7", badge: "bg-purple-500/15 text-purple-300 border-purple-500/30",
  },
};

/* ── Tenant type ─────────────────────────────────────────────── */

export type TenantStatus = "active" | "trial" | "suspended";

export type Tenant = {
  id:            string;
  agencyName:    string;
  tagline:       string;
  brandColor:    string;
  logo:          string | null;
  contactEmail:  string;
  contactPhone:  string;
  website:       string;
  plan:          PlanId;
  status:        TenantStatus;
  adminEmail:    string;
  createdAt:     string;
  customDomain:  string | null;
  leadCount:     number;
  clientCount:   number;
  campaignCount: number;
  mrr:           number;
};

/* ── Default brand colors ────────────────────────────────────── */

export const BRAND_COLORS = [
  { name: "Ocean Blue",    hex: "#3B82F6" },
  { name: "Royal Purple",  hex: "#8B5CF6" },
  { name: "Emerald",       hex: "#10B981" },
  { name: "Amber",         hex: "#F59E0B" },
  { name: "Rose",          hex: "#F43F5E" },
  { name: "Cyan",          hex: "#06B6D4" },
  { name: "Indigo",        hex: "#6366F1" },
  { name: "Orange",        hex: "#F97316" },
];

/* ── Onboarding state ────────────────────────────────────────── */

export type OnboardingData = {
  agencyName:   string;
  tagline:      string;
  brandColor:   string;
  contactEmail: string;
  contactPhone: string;
  website:      string;
  adminEmail:   string;
  adminPassword:string;
};

/* ── Platform stats ──────────────────────────────────────────── */

export type PlatformStats = {
  totalTenants:   number;
  activeTenants:  number;
  trialTenants:   number;
  totalLeads:     number;
  totalCampaigns: number;
  totalMRR:       number;
  planBreakdown:  Record<PlanId, number>;
};

/* ── localStorage CRUD ───────────────────────────────────────── */

const TENANTS_KEY  = "snr_saas_tenants_v1";
const CURRENT_KEY  = "snr_current_tenant_v1";

export function getTenants(): Tenant[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(TENANTS_KEY) ?? "[]"); } catch { return []; }
}

function persistTenants(tenants: Tenant[]) {
  localStorage.setItem(TENANTS_KEY, JSON.stringify(tenants));
}

export function saveTenant(tenant: Tenant): void {
  const all = getTenants().filter((t) => t.id !== tenant.id);
  persistTenants([tenant, ...all]);
}

export function updateTenantStatus(id: string, status: TenantStatus): void {
  persistTenants(getTenants().map((t) => t.id === id ? { ...t, status } : t));
}

export function updateTenantPlan(id: string, plan: PlanId): void {
  persistTenants(getTenants().map((t) => t.id === id ? { ...t, plan, mrr: PLANS[plan].priceMonthly } : t));
}

export function deleteTenant(id: string): void {
  persistTenants(getTenants().filter((t) => t.id !== id));
  if (getCurrentTenantId() === id) clearCurrentTenant();
}

export function getCurrentTenantId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(CURRENT_KEY);
}

export function setCurrentTenant(id: string): void {
  localStorage.setItem(CURRENT_KEY, id);
}

export function clearCurrentTenant(): void {
  localStorage.removeItem(CURRENT_KEY);
}

export function getCurrentTenant(): Tenant | null {
  const id  = getCurrentTenantId();
  if (!id) return null;
  return getTenants().find((t) => t.id === id) ?? null;
}

/* ── Platform stats ──────────────────────────────────────────── */

export function getPlatformStats(): PlatformStats {
  const tenants = getTenants();
  return {
    totalTenants:   tenants.length,
    activeTenants:  tenants.filter((t) => t.status === "active").length,
    trialTenants:   tenants.filter((t) => t.status === "trial").length,
    totalLeads:     tenants.reduce((s, t) => s + t.leadCount, 0),
    totalCampaigns: tenants.reduce((s, t) => s + t.campaignCount, 0),
    totalMRR:       tenants.reduce((s, t) => s + t.mrr, 0),
    planBreakdown:  {
      starter: tenants.filter((t) => t.plan === "starter").length,
      growth:  tenants.filter((t) => t.plan === "growth").length,
      pro:     tenants.filter((t) => t.plan === "pro").length,
    },
  };
}

/* ── Create tenant from onboarding data ─────────────────────── */

export function createTenant(data: OnboardingData, plan: PlanId = "trial" as PlanId): Tenant {
  const id = `tenant_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
  const tenant: Tenant = {
    id,
    agencyName:    data.agencyName,
    tagline:       data.tagline || "AI-Powered Marketing Agency",
    brandColor:    data.brandColor,
    logo:          null,
    contactEmail:  data.contactEmail,
    contactPhone:  data.contactPhone,
    website:       data.website,
    plan:          "growth",
    status:        "trial",
    adminEmail:    data.adminEmail,
    createdAt:     new Date().toISOString(),
    customDomain:  null,
    leadCount:     0,
    clientCount:   0,
    campaignCount: 0,
    mrr:           0,
  };
  saveTenant(tenant);
  return tenant;
}

/* ── Demo seed data ──────────────────────────────────────────── */

export function seedDemoTenants(): void {
  if (getTenants().length > 0) return;

  const demos: Tenant[] = [
    {
      id: "tenant_snr_master",
      agencyName: "SNR Digital Marketing",
      tagline: "AI-Powered Growth for Indian Businesses",
      brandColor: "#3B82F6",
      logo: null,
      contactEmail: "snrdigitalmarketingindia@gmail.com",
      contactPhone: "+91 99894 37777",
      website: "snrdigitalmarketingindia.com",
      plan: "pro",
      status: "active",
      adminEmail: "snrdigitalmarketingindia@gmail.com",
      createdAt: new Date(Date.now() - 180 * 86400000).toISOString(),
      customDomain: "app.snrdigital.com",
      leadCount: 247,
      clientCount: 18,
      campaignCount: 34,
      mrr: 0,
    },
    {
      id: "tenant_abc_growth",
      agencyName: "ABC Growth Agency",
      tagline: "Scale Your Business with Smart Marketing",
      brandColor: "#10B981",
      logo: null,
      contactEmail: "admin@abcgrowth.com",
      contactPhone: "+91 98765 43210",
      website: "abcgrowthagency.com",
      plan: "growth",
      status: "active",
      adminEmail: "admin@abcgrowth.com",
      createdAt: new Date(Date.now() - 45 * 86400000).toISOString(),
      customDomain: null,
      leadCount: 89,
      clientCount: 7,
      campaignCount: 12,
      mrr: 7999,
    },
    {
      id: "tenant_xyz_ads",
      agencyName: "XYZ Ads Solutions",
      tagline: "Performance Marketing That Converts",
      brandColor: "#F59E0B",
      logo: null,
      contactEmail: "hello@xyzads.in",
      contactPhone: "+91 91234 56789",
      website: "xyzads.in",
      plan: "starter",
      status: "trial",
      adminEmail: "hello@xyzads.in",
      createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
      customDomain: null,
      leadCount: 12,
      clientCount: 2,
      campaignCount: 3,
      mrr: 0,
    },
    {
      id: "tenant_apex_digital",
      agencyName: "Apex Digital Studio",
      tagline: "Creative + Performance Marketing",
      brandColor: "#8B5CF6",
      logo: null,
      contactEmail: "team@apexdigital.co",
      contactPhone: "+91 88888 77777",
      website: "apexdigital.co",
      plan: "pro",
      status: "active",
      adminEmail: "team@apexdigital.co",
      createdAt: new Date(Date.now() - 92 * 86400000).toISOString(),
      customDomain: "dashboard.apexdigital.co",
      leadCount: 312,
      clientCount: 24,
      campaignCount: 41,
      mrr: 19999,
    },
  ];

  persistTenants(demos);
}

/* ── Usage limit helpers ─────────────────────────────────────── */

export function isWithinLimit(tenant: Tenant, type: "leads" | "clients" | "campaigns"): boolean {
  const plan = PLANS[tenant.plan];
  if (type === "leads")     return tenant.leadCount     < plan.leadLimit;
  if (type === "clients")   return tenant.clientCount   < plan.clientLimit;
  if (type === "campaigns") return tenant.campaignCount < plan.campaignLimit;
  return false;
}

export function getUsagePercent(tenant: Tenant, type: "leads" | "clients" | "campaigns"): number {
  const plan = PLANS[tenant.plan];
  if (plan.leadLimit === 9999) return Math.min(60, Math.round(Math.random() * 40 + 20));
  if (type === "leads")     return Math.min(100, Math.round((tenant.leadCount     / plan.leadLimit)     * 100));
  if (type === "clients")   return Math.min(100, Math.round((tenant.clientCount   / plan.clientLimit)   * 100));
  if (type === "campaigns") return Math.min(100, Math.round((tenant.campaignCount / plan.campaignLimit) * 100));
  return 0;
}
