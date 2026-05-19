import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL  ?? "";
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const isSupabaseConfigured = Boolean(url && key);

// Use untyped client to avoid complex generic inference issues in static builds
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _client: SupabaseClient<any> | null = null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getSupabase(): SupabaseClient<any> | null {
  if (typeof window === "undefined") return null;
  if (!isSupabaseConfigured) return null;
  if (!_client) {
    _client = createClient(url, key, {
      auth: { persistSession: true, storageKey: "snr_supabase_auth" },
    });
  }
  return _client;
}
