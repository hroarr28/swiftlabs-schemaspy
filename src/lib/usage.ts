import { createClient } from '@/lib/supabase/server';

export interface UsageData {
  usage: number;
  limit: number;
  percentage: number;
  limitReached: boolean;
}

/**
 * Get plan limits based on user's tier
 */
export function getPlanLimit(tier: string): number {
  const limits: Record<string, number> = {
    free: 10,
    pro: 500,
    enterprise: 999999, // Effectively unlimited
  };
  return limits[tier] || limits.free;
}

/**
 * Get current month in YYYY-MM format
 */
function getCurrentMonth(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

/**
 * Increment usage for the current user
 * Returns current usage and whether limit is reached
 */
export async function incrementUsage(userId: string, planLimit: number): Promise<UsageData> {
  const supabase = await createClient();
  const month = getCurrentMonth();

  const { data, error } = await supabase.rpc('increment_usage', {
    p_user_id: userId,
    p_month: month,
    p_plan_limit: planLimit,
  });

  if (error) {
    console.error('Failed to increment usage:', error);
    throw new Error('Failed to track usage');
  }

  const result = data[0];
  return {
    usage: result.current_usage,
    limit: planLimit,
    percentage: Math.round((result.current_usage / planLimit) * 100),
    limitReached: result.limit_reached,
  };
}

/**
 * Get current usage for a user
 */
export async function getCurrentUsage(userId: string): Promise<UsageData> {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc('get_current_usage', {
    p_user_id: userId,
  });

  if (error) {
    console.error('Failed to get usage:', error);
    return { usage: 0, limit: 10, percentage: 0, limitReached: false };
  }

  const result = data[0] || { usage_count: 0, plan_limit: 10, percentage: 0 };
  return {
    usage: result.usage_count,
    limit: result.plan_limit,
    percentage: result.percentage,
    limitReached: result.usage_count >= result.plan_limit,
  };
}

/**
 * Check if user has reached their limit
 * Use this as middleware in API routes
 */
export async function checkUsageLimit(userId: string, planLimit: number): Promise<boolean> {
  const usage = await getCurrentUsage(userId);
  return !usage.limitReached;
}
