/**
 * Subscription Utilities
 * Helper functions to check subscription status
 */

import { createClient } from '@/lib/supabase/server';

export interface Subscription {
  id: string;
  user_id: string;
  stripe_customer_id: string;
  stripe_subscription_id: string;
  status: string;
  created_at: string;
  updated_at: string;
}

/**
 * Check if user has an active subscription
 */
export async function hasActiveSubscription(): Promise<boolean> {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return false;
  }

  const { data: subscription } = await supabase
    .from('schemaspy_subscriptions')
    .select('status')
    .eq('user_id', user.id)
    .single();

  return subscription?.status === 'active';
}

/**
 * Get user's subscription details
 */
export async function getSubscription(): Promise<Subscription | null> {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return null;
  }

  const { data: subscription } = await supabase
    .from('schemaspy_subscriptions')
    .select('*')
    .eq('user_id', user.id)
    .single();

  return subscription;
}
