import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { SignOutButton } from "./sign-out-button";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  return (
    <div className="min-h-screen">
      {/* Dashboard Nav */}
      <nav className="border-b border-zinc-800/50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-sm font-semibold text-zinc-100">ProductName</span>
          <div className="flex items-center gap-4">
            <span className="text-xs text-zinc-500">{user.email}</span>
            <SignOutButton />
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-semibold text-zinc-100 mb-2">Dashboard</h1>
        <p className="text-sm text-zinc-500 mb-8">Welcome back. This is your dashboard shell.</p>

        {/* TEMPLATE: Add your product-specific dashboard content here */}
        <div className="p-8 rounded-lg border border-zinc-800 border-dashed text-center">
          <p className="text-sm text-zinc-600">Your product content goes here.</p>
        </div>
      </main>
    </div>
  );
}
