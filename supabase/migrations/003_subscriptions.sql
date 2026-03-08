-- Schema Spy Subscriptions Table
-- Stores Stripe subscription data for billing

CREATE TABLE IF NOT EXISTS schemaspy_subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_customer_id TEXT NOT NULL,
  stripe_subscription_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active', -- active, canceled, past_due, etc.
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  
  UNIQUE(user_id),
  UNIQUE(stripe_customer_id),
  UNIQUE(stripe_subscription_id)
);

-- Index for fast user lookups
CREATE INDEX IF NOT EXISTS idx_schemaspy_subscriptions_user_id 
  ON schemaspy_subscriptions(user_id);

-- Index for Stripe customer lookups
CREATE INDEX IF NOT EXISTS idx_schemaspy_subscriptions_stripe_customer_id 
  ON schemaspy_subscriptions(stripe_customer_id);

-- Enable RLS
ALTER TABLE schemaspy_subscriptions ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own subscription
CREATE POLICY "Users can view their own subscription"
  ON schemaspy_subscriptions
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Service role can manage all subscriptions (for webhooks)
CREATE POLICY "Service role can manage subscriptions"
  ON schemaspy_subscriptions
  FOR ALL
  USING (auth.role() = 'service_role');
