'use client';

/**
 * Billing Button Component
 * Opens Stripe customer portal for managing subscription
 */

import { useState } from 'react';

export default function BillingButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleManageBilling = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/portal', {
        method: 'POST',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create portal session');
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Portal error:', error);
      alert('Failed to open billing portal. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleManageBilling}
      disabled={isLoading}
      className="text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50"
    >
      {isLoading ? 'Loading...' : 'Manage billing'}
    </button>
  );
}
