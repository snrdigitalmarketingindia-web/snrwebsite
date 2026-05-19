"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";

export default function SignupPage() {
  const router = useRouter();
  const { user, loading, signUp, isSupabaseReady } = useAuth();

  const [name,     setName]     = useState("");
  const [business, setBusiness] = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [confirm,  setConfirm]  = useState("");
  const [error,    setError]    = useState("");
  const [success,  setSuccess]  = useState(false);
  const [busy,     setBusy]     = useState(false);

  useEffect(() => {
    if (!loading && user) router.replace("/dashboard");
  }, [loading, user, router]);

  // Redirect to login if Supabase not configured
  useEffect(() => {
    if (!loading && !isSupabaseReady) router.replace("/login");
  }, [loading, isSupabaseReady, router]);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password.length < 8)  { setError("Password must be at least 8 characters."); return; }
    if (password !== confirm)  { setError("Passwords do not match."); return; }

    setBusy(true);
    const err = await signUp(email.trim(), password, name.trim(), business.trim() || undefined);
    setBusy(false);

    if (err) {
      setError(err);
    } else {
      setSuccess(true);
    }
  }

  if (loading || !isSupabaseReady) {
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
          {success ? (
            <div className="bg-[#111C35] rounded-2xl border border-green-500/20 p-10 text-center">
              <div className="w-14 h-14 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-5">
                <svg className="w-7 h-7 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-white font-bold text-xl mb-2">Account Created!</h2>
              <p className="text-slate-400 text-sm mb-6">
                Check your email to confirm your account. Once confirmed, you can sign in to your dashboard.
              </p>
              <Link href="/login" className="btn-green inline-block px-8 py-3 rounded-xl font-bold text-sm">
                Go to Login
              </Link>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="w-14 h-14 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-5">
                  <svg className="w-7 h-7 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold text-white mb-1">Request Dashboard Access</h1>
                <p className="text-slate-400 text-sm">Create your client account to view your campaign performance</p>
              </div>

              <div className="bg-[#111C35] rounded-2xl border border-white/[0.07] p-8">
                <form onSubmit={handleSignup} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-slate-400 text-sm font-medium mb-1.5">Your Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                      placeholder="Rajesh Kumar" required
                      className="w-full bg-[#0A0F1E] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/60 transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-sm font-medium mb-1.5">Business Name <span className="text-slate-600">(optional)</span></label>
                    <input type="text" value={business} onChange={(e) => setBusiness(e.target.value)}
                      placeholder="My Company Pvt. Ltd."
                      className="w-full bg-[#0A0F1E] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/60 transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-sm font-medium mb-1.5">Email Address</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com" required
                      className="w-full bg-[#0A0F1E] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/60 transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-sm font-medium mb-1.5">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                      placeholder="At least 8 characters" required minLength={8}
                      className="w-full bg-[#0A0F1E] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/60 transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-sm font-medium mb-1.5">Confirm Password</label>
                    <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)}
                      placeholder="Repeat your password" required
                      className="w-full bg-[#0A0F1E] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/60 transition-colors text-sm"
                    />
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
                      </svg>Creating Account...</>
                    ) : "Create My Account"}
                  </button>
                </form>

                <p className="text-center text-slate-600 text-xs mt-5">
                  Already have an account?&nbsp;
                  <Link href="/login" className="text-blue-400 hover:text-blue-300 underline">Sign in</Link>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
