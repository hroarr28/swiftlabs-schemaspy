import { createClient } from "@/lib/supabase/server";

export async function getSubscriptionStatus(): Promise<string> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return "free";

  const { data: profile } = await supabase
    .from("profiles")
    .select("subscription_status")
    .eq("id", user.id)
    .single();

  return profile?.subscription_status || "free";
}

export function isPro(status: string): boolean {
  return status === "active" || status === "trialing";
}
