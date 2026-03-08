'use client';

/**
 * Checkout Button Component
 * Handles Stripe checkout redirect
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface CheckoutButtonProps {
  className?: string;
  requiresAuth?: boolean;
}

export default function CheckoutButton({
  className = '',
  requiresAuth = false,
}: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCheckout = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401 && requiresAuth) {
          // User not authenticated, redirect to signup
          router.push('/signup?redirect=/pricing');
          return;
        }
        throw new Error(data.error || 'Failed to create checkout session');
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to start checkout. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={isLoading}
      className={className || "block w-full bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"}
    >
      {isLoading ? 'Loading...' : 'Get started →'}
    </button>
  );
}
