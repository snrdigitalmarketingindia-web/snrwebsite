"use client";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase/client";
import type { Profile } from "@/lib/supabase/types";
import type { User } from "@supabase/supabase-js";

type AuthContextType = {
  user:    User | null;
  profile: Profile | null;
  loading: boolean;
  isAdmin: boolean;
  isSupabaseReady: boolean;
  signIn:  (email: string, password: string) => Promise<string | null>;
  signOut: () => Promise<void>;
  signUp:  (email: string, password: string, name: string, businessName?: string) => Promise<string | null>;
};

const AuthContext = createContext<AuthContextType>({
  user: null, profile: null, loading: true, isAdmin: false,
  isSupabaseReady: false,
  signIn: async () => null,
  signOut: async () => {},
  signUp: async () => null,
});

export const useAuth = () => useContext(AuthContext);

async function fetchProfile(userId: string): Promise<Profile | null> {
  const sb = getSupabase();
  if (!sb) return null;
  const { data } = await sb.from("profiles").select("*").eq("id", userId).single();
  return (data as Profile) ?? null;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user,    setUser]    = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = useCallback(async (u: User | null) => {
    if (!u) { setProfile(null); return; }
    const p = await fetchProfile(u.id);
    setProfile(p);
  }, []);

  useEffect(() => {
    const sb = getSupabase();
    if (!sb) { setLoading(false); return; }

    // Load initial session
    sb.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      loadProfile(session?.user ?? null).finally(() => setLoading(false));
    });

    // Listen for auth state changes
    const { data: { subscription } } = sb.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      loadProfile(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [loadProfile]);

  const signIn = async (email: string, password: string): Promise<string | null> => {
    const sb = getSupabase();
    if (!sb) return "Supabase is not configured.";
    const { error } = await sb.auth.signInWithPassword({ email, password });
    return error?.message ?? null;
  };

  const signOut = async () => {
    const sb = getSupabase();
    if (sb) await sb.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  const signUp = async (email: string, password: string, name: string, businessName?: string): Promise<string | null> => {
    const sb = getSupabase();
    if (!sb) return "Supabase is not configured.";

    const { data, error } = await sb.auth.signUp({
      email, password,
      options: { data: { name, role: "client" } },
    });
    if (error) return error.message;

    // Insert profile row if trigger hasn't fired yet
    if (data.user) {
      await sb.from("profiles").upsert({
        id: data.user.id, name, email,
        role: "client",
        business_name: businessName ?? null,
        business_type: null, location: null,
      });
    }
    return null;
  };

  return (
    <AuthContext.Provider value={{
      user, profile, loading,
      isAdmin: profile?.role === "admin",
      isSupabaseReady: isSupabaseConfigured,
      signIn, signOut, signUp,
    }}>
      {children}
    </AuthContext.Provider>
  );
}
