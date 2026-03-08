/**
 * Checkout API - Create Stripe checkout session
 */

import { createClient } from '@/lib/supabase/server';
import { createCheckoutSession } from '@/lib/stripe/stripe';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const origin = request.headers.get('origin') || 'http://localhost:3000';
    const successUrl = `${origin}/dashboard?success=true`;
    const cancelUrl = `${origin}/pricing?canceled=true`;

    const session = await createCheckoutSession(
      user.id,
      user.email || '',
      successUrl,
      cancelUrl
    );

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
