/* Lead CRM — localStorage-backed mini CRM.
   All operations are synchronous and safe on server (no-ops when window is absent). */

export type LeadStatus = "new" | "contacted" | "warm" | "converted";

export type Lead = {
  id: string;
  name: string;
  phone: string;
  businessType: string;
  goal: string;
  budget: string;
  timestamp: string;
  status: LeadStatus;
  tags: string[];
};

const KEY = "snr_leads_v1";

/* ── Tag computation ─────────────────────────────────────────────────── */

export function computeTags(lead: Pick<Lead, "budget" | "businessType" | "goal">): string[] {
  const tags: string[] = [];

  if (lead.budget.includes("50,000+"))        tags.push("🔥 Hot Lead");
  else if (lead.budget.includes("15,000"))     tags.push("⚡ Warm Lead");
  else                                         tags.push("🟢 Normal Lead");

  if (["Hospital / Clinic", "Real Estate"].includes(lead.businessType))
    tags.push("🎯 Priority");

  if (lead.goal.includes("Leads") || lead.goal.includes("Calls"))
    tags.push("📞 High Intent");

  return tags;
}

/* ── Persistence helpers ─────────────────────────────────────────────── */

export function getLeads(): Lead[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]") as Lead[];
  } catch {
    return [];
  }
}

function persist(leads: Lead[]) {
  localStorage.setItem(KEY, JSON.stringify(leads));
}

/* ── CRUD ────────────────────────────────────────────────────────────── */

export function saveLead(
  data: Pick<Lead, "name" | "phone" | "businessType" | "goal" | "budget">
): Lead {
  const lead: Lead = {
    ...data,
    id: `lead_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    timestamp: new Date().toISOString(),
    status: "new",
    tags: computeTags(data),
  };
  const leads = getLeads();
  leads.unshift(lead);
  persist(leads);
  return lead;
}

export function updateLeadStatus(id: string, status: LeadStatus) {
  persist(getLeads().map((l) => (l.id === id ? { ...l, status } : l)));
}

export function deleteLead(id: string) {
  persist(getLeads().filter((l) => l.id !== id));
}

/* ── Export ──────────────────────────────────────────────────────────── */

export function exportCSV() {
  const leads = getLeads();
  if (!leads.length) return;

  const headers = ["Name", "Phone", "Business Type", "Goal", "Budget", "Status", "Tags", "Date"];
  const rows = leads.map((l) => [
    l.name,
    l.phone,
    l.businessType,
    l.goal,
    l.budget,
    l.status,
    l.tags.join(" | "),
    new Date(l.timestamp).toLocaleString("en-IN"),
  ]);

  const csv = [headers, ...rows]
    .map((row) => row.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
    .join("\n");

  const a = Object.assign(document.createElement("a"), {
    href: URL.createObjectURL(new Blob([csv], { type: "text/csv" })),
    download: `snr_leads_${new Date().toISOString().slice(0, 10)}.csv`,
  });
  a.click();
  URL.revokeObjectURL(a.href);
}

/* ── Analytics helpers ───────────────────────────────────────────────── */

export function getStats(leads: Lead[]) {
  const today = new Date().toDateString();
  return {
    total: leads.length,
    todayCount: leads.filter((l) => new Date(l.timestamp).toDateString() === today).length,
    hotCount: leads.filter((l) => l.tags.includes("🔥 Hot Lead")).length,
    highIntent: leads.filter((l) => l.tags.includes("📞 High Intent")).length,
    newCount: leads.filter((l) => l.status === "new").length,
  };
}
