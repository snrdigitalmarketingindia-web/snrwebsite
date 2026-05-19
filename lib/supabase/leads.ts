/* Async lead operations — Supabase-primary with localStorage fallback.
   Admin page and SmartLeadForm both use this module. */

import { getSupabase, isSupabaseConfigured } from "./client";
import {
  getLeads as lsGetLeads,
  saveLead as lsSaveLead,
  updateLeadStatus as lsUpdateStatus,
  deleteLead as lsDeleteLead,
  exportCSV as lsExportCSV,
  getStats as lsGetStats,
  computeTags,
  type Lead,
  type LeadStatus,
} from "@/lib/leads";

/* Re-export types so callers only need one import */
export type { Lead, LeadStatus };
export { computeTags, getStats } from "@/lib/leads";

/* ── Fetch all leads ─────────────────────────────────────────── */

export async function getLeadsAsync(clientId?: string): Promise<Lead[]> {
  const sb = getSupabase();

  if (!sb) return lsGetLeads();

  let query = sb.from("leads").select("*").order("created_at", { ascending: false });
  if (clientId) query = query.eq("client_id", clientId);

  const { data, error } = await query;
  if (error || !data) return lsGetLeads();

  // Map DB rows → Lead shape (compatible with existing UI)
  return data.map((row) => ({
    id:           row.id,
    name:         row.name,
    phone:        row.phone,
    businessType: row.business_type ?? "",
    goal:         row.goal ?? "",
    budget:       row.budget ?? "",
    timestamp:    row.created_at,
    status:       row.status,
    tags:         row.tags ?? [],
  }));
}

/* ── Save a lead ─────────────────────────────────────────────── */

export async function saveLeadAsync(
  data: Pick<Lead, "name" | "phone" | "businessType" | "goal" | "budget">,
  source: "smart_form" | "manual" = "smart_form"
): Promise<Lead> {
  // Always save to localStorage first (admin page fallback)
  const localLead = lsSaveLead(data);

  const sb = getSupabase();
  if (!sb) return localLead;

  const { data: inserted, error } = await sb.from("leads").insert({
    name:          data.name,
    phone:         data.phone,
    business_type: data.businessType,
    goal:          data.goal,
    budget:        data.budget,
    status:        "new",
    tags:          computeTags(data),
    source,
    client_id:     null,
  }).select().single();

  if (error || !inserted) return localLead;

  return {
    id:           inserted.id,
    name:         inserted.name,
    phone:        inserted.phone,
    businessType: inserted.business_type ?? "",
    goal:         inserted.goal ?? "",
    budget:       inserted.budget ?? "",
    timestamp:    inserted.created_at,
    status:       inserted.status,
    tags:         inserted.tags ?? [],
  };
}

/* ── Update status ───────────────────────────────────────────── */

export async function updateLeadStatusAsync(id: string, status: LeadStatus): Promise<void> {
  // Keep localStorage in sync
  lsUpdateStatus(id, status);

  const sb = getSupabase();
  if (!sb) return;
  await sb.from("leads").update({ status }).eq("id", id);
}

/* ── Delete a lead ───────────────────────────────────────────── */

export async function deleteLeadAsync(id: string): Promise<void> {
  lsDeleteLead(id);

  const sb = getSupabase();
  if (!sb) return;
  await sb.from("leads").delete().eq("id", id);
}

/* ── Export CSV ──────────────────────────────────────────────── */

export async function exportCSVAsync(): Promise<void> {
  const leads = await getLeadsAsync();
  if (!leads.length) return;

  const headers = ["Name", "Phone", "Business Type", "Goal", "Budget", "Status", "Tags", "Date"];
  const rows = leads.map((l) => [
    l.name, l.phone, l.businessType, l.goal, l.budget, l.status,
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

/* ── Dashboard stats ─────────────────────────────────────────── */

export async function getDashboardStats(clientId?: string) {
  const leads = await getLeadsAsync(clientId);
  const today = new Date().toDateString();
  return {
    total:      leads.length,
    todayCount: leads.filter((l) => new Date(l.timestamp).toDateString() === today).length,
    hotCount:   leads.filter((l) => l.tags.includes("🔥 Hot Lead")).length,
    highIntent: leads.filter((l) => l.tags.includes("📞 High Intent")).length,
    newCount:   leads.filter((l) => l.status === "new").length,
    byStatus: {
      new:       leads.filter((l) => l.status === "new").length,
      contacted: leads.filter((l) => l.status === "contacted").length,
      warm:      leads.filter((l) => l.status === "warm").length,
      converted: leads.filter((l) => l.status === "converted").length,
    },
  };
}

/* ── Subscribe to real-time lead inserts (Supabase only) ─────── */

export function subscribeToLeads(callback: (lead: Lead) => void): (() => void) | null {
  const sb = getSupabase();
  if (!sb) return null;

  const channel = sb
    .channel("leads-realtime")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "leads" },
      (payload) => {
        const row = payload.new as Record<string, unknown>;
        callback({
          id:           row.id as string,
          name:         row.name as string,
          phone:        row.phone as string,
          businessType: (row.business_type as string) ?? "",
          goal:         (row.goal as string) ?? "",
          budget:       (row.budget as string) ?? "",
          timestamp:    row.created_at as string,
          status:       row.status as LeadStatus,
          tags:         (row.tags as string[]) ?? [],
        });
      }
    )
    .subscribe();

  return () => sb.removeChannel(channel);
}

export { isSupabaseConfigured };
