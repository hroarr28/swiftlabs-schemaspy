"use client";

// TEMPLATE: Wrap premium features in <ProGate> to show upgrade prompt for free users
// Usage: <ProGate isPro={isPro}>{children}</ProGate>
// Or with custom limit message: <ProGate isPro={isPro} message="Upgrade to save more than 3 projects">

export function ProGate({
  isPro,
  children,
  message = "Upgrade to Pro to unlock this feature",
}: {
  isPro: boolean;
  children: React.ReactNode;
  message?: string;
}) {
  if (isPro) return <>{children}</>;

  return (
    <div className="relative">
      <div className="pointer-events-none opacity-40 blur-[2px] select-none">
        {children}
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center p-6 rounded-lg border border-zinc-700 bg-zinc-900/95 shadow-lg max-w-sm">
          <p className="text-sm text-zinc-300 mb-4">{message}</p>
          <a
            href="/api/checkout"
            className="inline-block px-5 py-2.5 bg-brand text-white text-sm font-medium rounded-md hover:bg-brand-dark transition-colors"
          >
            Upgrade to Pro
          </a>
        </div>
      </div>
    </div>
  );
}

// TEMPLATE: Simple usage counter for freemium limits
// Track in localStorage or Supabase depending on needs
export function useFreemiumCounter(key: string, limit: number) {
  if (typeof window === "undefined") return { count: 0, remaining: limit, exceeded: false, increment: () => {} };

  const stored = localStorage.getItem(`freemium_${key}`);
  const data = stored ? JSON.parse(stored) : { count: 0, date: new Date().toDateString() };

  // Reset daily
  if (data.date !== new Date().toDateString()) {
    data.count = 0;
    data.date = new Date().toDateString();
  }

  const increment = () => {
    data.count++;
    localStorage.setItem(`freemium_${key}`, JSON.stringify(data));
  };

  return {
    count: data.count,
    remaining: Math.max(0, limit - data.count),
    exceeded: data.count >= limit,
    increment,
  };
}
