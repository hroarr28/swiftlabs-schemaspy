'use client';

import { useState } from 'react';

export function ManageSubscriptionButton() {
  const [loading, setLoading] = useState(false);

  const handleManageSubscription = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/stripe/portal', {
        method: 'POST',
      });

      const data = await res.json();

      if (data.error) {
        alert(data.error);
        return;
      }

      // Redirect to Stripe customer portal
      window.location.href = data.url;
    } catch (error) {
      console.error('Error opening portal:', error);
      alert('Failed to open billing portal. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleManageSubscription}
      disabled={loading}
      className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
    >
      {loading ? 'Loading...' : 'Manage Subscription'}
    </button>
  );
}
