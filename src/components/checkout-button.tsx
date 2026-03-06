"use client";

import { useState } from "react";

interface CheckoutButtonProps {
  priceId: string;
  label?: string;
  className?: string;
}

export function CheckoutButton({
  priceId,
  label = "Upgrade to Pro",
  className = "",
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("No checkout URL returned");
        setLoading(false);
      }
    } catch {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`px-6 py-3 bg-brand text-white text-sm font-medium rounded-md hover:bg-brand-dark disabled:opacity-50 transition-colors ${className}`}
    >
      {loading ? "Redirecting..." : label}
    </button>
  );
}
