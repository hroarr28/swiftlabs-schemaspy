"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      window.location.href = "/dashboard";
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-zinc-100 mb-8 text-center">Log in</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-md px-3 py-2">{error}</p>}
          <input
            type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required
            className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-md text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-brand"
          />
          <input
            type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required
            className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-md text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-brand"
          />
          <button type="submit" disabled={loading}
            className="w-full py-3 bg-brand text-white text-sm font-medium rounded-md hover:bg-brand-dark disabled:opacity-50 transition-colors">
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>
        <div className="mt-4 text-center space-y-2">
          <a href="/auth/forgot-password" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">Forgot password?</a>
          <p className="text-xs text-zinc-600">
            No account? <a href="/auth/signup" className="text-brand hover:text-zinc-200 transition-colors">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}
