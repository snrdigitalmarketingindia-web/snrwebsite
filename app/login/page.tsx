"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import { authenticateClient } from "@/lib/mock-analytics";
import { saveSession } from "@/lib/dashboard-auth";

export default function LoginPage() {
  const router = useRouter();
  const { user, loading, signIn, isSupabaseReady } = useAuth();

  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [busy,     setBusy]     = useState(false);
  const [showPass, setShowPass] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (!loading && user) router.replace("/dashboard");
  }, [loading, user, router]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");

    if (isSupabaseReady) {
      /* ── Real Supabase auth ── */
      const err = await signIn(email.trim(), password);
      if (err) {
        setError(err);
        setBusy(false);
      } else {
        router.push("/dashboard");
      }
    } else {
      /* ── Mock auth fallback (no Supabase configured) ── */
      setTimeout(() => {
        const client = authenticateClient(email.trim(), password);
        if (client) {
          saveSession({ clientId: client.id, clientName: client.name, email: client.email, loginTime: new Date().toISOString() });
          router.push("/dashboard");
        } else {
          setError("Invalid credentials. Try demo@snrdigital.com / Demo@1234");
          setBusy(false);
        }
      }, 700);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0F1E] flex items-center justify-center">
        <svg className="w-7 h-7 text-blue-400 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0F1E] flex flex-col">
      {/* Top bar */}
      <div className="px-8 py-5 border-b border-white/[0.06]">
        <Link href="/" className="text-white font-bold text-lg tracking-tight">
          SNR <span className="text-blue-400">Digital</span>
          <span className="ml-2 text-xs font-normal text-slate-500 border border-white/10 px-2 py-0.5 rounded-full">
            Client Portal
          </span>
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-5">
              <svg className="w-7 h-7 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-1">Client Dashboard</h1>
            <p className="text-slate-400 text-sm">Sign in to view your campaign performance</p>
          </div>

          {/* Supabase badge */}
          {isSupabaseReady ? (
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 text-xs font-medium">Powered by Supabase — Real authentication</span>
            </div>
          ) : (
            <div className="bg-amber-500/8 border border-amber-500/20 rounded-xl px-4 py-3 mb-6 text-center">
              <p className="text-amber-400 text-xs">Demo mode — Add <code className="bg-amber-500/10 px-1 rounded">NEXT_PUBLIC_SUPABASE_URL</code> to enable real auth</p>
            </div>
          )}

          {/* Form */}
          <div className="bg-[#111C35] rounded-2xl border border-white/[0.07] p-8">
            <form onSubmit={handleLogin} className="flex flex-col gap-5">
              <div>
                <label className="block text-slate-400 text-sm font-medium mb-1.5">Email Address</label>
                <input
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com" required
                  className="w-full bg-[#0A0F1E] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/60 transition-colors text-sm"
                />
              </div>

              <div>
                <label className="block text-slate-400 text-sm font-medium mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"} value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••" required
                    className="w-full bg-[#0A0F1E] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/60 transition-colors text-sm pr-11"
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      {showPass
                        ? <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                        : <><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></>
                      }
                    </svg>
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <button type="submit" disabled={busy}
                className="btn-green w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed mt-1"
              >
                {busy ? (
                  <><svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>Signing In...</>
                ) : "Sign In to Dashboard"}
              </button>
            </form>

            {/* Demo hint shown only in demo mode */}
            {!isSupabaseReady && (
              <div className="mt-6 pt-5 border-t border-white/[0.06]">
                <p className="text-slate-600 text-xs text-center mb-3">Demo credentials</p>
                <div className="bg-[#0A0F1E] rounded-xl p-3 space-y-1">
                  <p className="text-slate-500 text-xs font-mono">demo@snrdigital.com / Demo@1234</p>
                  <p className="text-slate-500 text-xs font-mono">realty@client.com / Client@123</p>
                  <p className="text-slate-500 text-xs font-mono">edu@client.com / Client@123</p>
                </div>
              </div>
            )}

            {/* Signup link */}
            {isSupabaseReady && (
              <p className="text-center text-slate-600 text-xs mt-6">
                New client?&nbsp;
                <Link href="/signup" className="text-blue-400 hover:text-blue-300 underline">
                  Request access
                </Link>
              </p>
            )}
          </div>

          <p className="text-center text-slate-700 text-xs mt-6">
            Need help?&nbsp;
            <a href="mailto:snrdigitalmarketingindia@gmail.com?subject=Dashboard%20Login%20Help"
              className="text-blue-500 hover:text-blue-400 underline">
              Contact SNR Digital Marketing
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
