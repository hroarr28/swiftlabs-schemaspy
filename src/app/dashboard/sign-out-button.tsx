"use client";

import { createClient } from "@/lib/supabase/client";

export function SignOutButton() {
  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <button onClick={handleSignOut} className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
      Log out
    </button>
  );
}
