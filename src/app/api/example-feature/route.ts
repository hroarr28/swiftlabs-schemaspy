import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { incrementUsage, getPlanLimit } from '@/lib/usage';

/**
 * Example API route with usage tracking
 * 
 * Pattern:
 * 1. Authenticate user
 * 2. Get user's plan tier
 * 3. Increment usage (throws if limit reached)
 * 4. Perform the actual feature logic
 */
export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    // 1. Get authenticated user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Get user's profile and plan tier
    const { data: profile } = await supabase
      .from('profiles')
      .select('tier')
      .eq('id', user.id)
      .single();

    const tier = profile?.tier || 'free';
    const planLimit = getPlanLimit(tier);

    // 3. Increment usage and check limit
    const usage = await incrementUsage(user.id, planLimit);

    if (usage.limitReached) {
      return NextResponse.json(
        {
          error: 'Monthly limit reached',
          usage: usage.usage,
          limit: usage.limit,
          upgrade_url: '/pricing',
        },
        { status: 429 }
      );
    }

    // 4. Perform your feature logic here
    // Example: process request, call AI API, generate content, etc.
    const result = {
      message: 'Feature executed successfully',
      // ... your feature data
    };

    // Return result with usage info
    return NextResponse.json({
      ...result,
      usage: {
        used: usage.usage,
        limit: usage.limit,
        remaining: usage.limit - usage.usage,
      },
    });
  } catch (error) {
    console.error('Feature error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
