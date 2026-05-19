import { getSupabase, isSupabaseConfigured } from "./client";
import type { Profile } from "./types";

export type AuthUser = {
  id: string;
  email: string;
  profile: Profile | null;
};

/* Sign in with email + password */
export async function signIn(email: string, password: string): Promise<{ user: AuthUser | null; error: string | null }> {
  const sb = getSupabase();
  if (!sb) return { user: null, error: "Supabase is not configured." };

  const { data, error } = await sb.auth.signInWithPassword({ email, password });
  if (error || !data.user) return { user: null, error: error?.message ?? "Login failed." };

  const profile = await fetchProfile(data.user.id);
  return { user: { id: data.user.id, email: data.user.email!, profile }, error: null };
}

/* Sign up — creates auth user + profile row */
export async function signUp(
  email: string,
  password: string,
  name: string,
  businessName?: string
): Promise<{ error: string | null }> {
  const sb = getSupabase();
  if (!sb) return { error: "Supabase is not configured." };

  const { data, error } = await sb.auth.signUp({ email, password });
  if (error || !data.user) return { error: error?.message ?? "Sign-up failed." };

  // Create profile row
  const { error: profileError } = await sb.from("profiles").insert({
    id: data.user.id,
    name,
    email,
    role: "client",
    business_name: businessName ?? null,
    business_type: null,
    location: null,
  });

  if (profileError) return { error: profileError.message };
  return { error: null };
}

/* Sign out */
export async function signOut(): Promise<void> {
  const sb = getSupabase();
  if (sb) await sb.auth.signOut();
}

/* Fetch current session (returns null if not logged in) */
export async function getSession(): Promise<AuthUser | null> {
  const sb = getSupabase();
  if (!sb) return null;

  const { data: { session } } = await sb.auth.getSession();
  if (!session?.user) return null;

  const profile = await fetchProfile(session.user.id);
  return { id: session.user.id, email: session.user.email!, profile };
}

/* Fetch profile row for a user id */
async function fetchProfile(userId: string): Promise<Profile | null> {
  const sb = getSupabase();
  if (!sb) return null;
  const { data } = await sb.from("profiles").select("*").eq("id", userId).single();
  return data ?? null;
}

export { isSupabaseConfigured };
