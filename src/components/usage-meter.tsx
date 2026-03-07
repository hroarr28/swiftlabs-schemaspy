'use client';

import Link from 'next/link';

interface UsageMeterProps {
  usage: number;
  limit: number;
  featureName?: string;
}

export function UsageMeter({ usage, limit, featureName = 'credits' }: UsageMeterProps) {
  const percentage = Math.min((usage / limit) * 100, 100);
  const isNearLimit = percentage >= 80;
  const isAtLimit = percentage >= 100;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Usage this month
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {usage.toLocaleString()} / {limit.toLocaleString()} {featureName}
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {Math.round(percentage)}%
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-4 h-3 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className={`h-full transition-all duration-300 ${
            isAtLimit
              ? 'bg-red-500'
              : isNearLimit
                ? 'bg-amber-500'
                : 'bg-blue-500'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Warning messages */}
      {isAtLimit && (
        <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/20">
          <p className="text-sm text-red-800 dark:text-red-200">
            <strong>Limit reached.</strong> Upgrade your plan to continue using this feature.
          </p>
          <Link
            href="/pricing"
            className="mt-2 inline-block text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400"
          >
            View plans →
          </Link>
        </div>
      )}

      {isNearLimit && !isAtLimit && (
        <div className="rounded-md bg-amber-50 p-4 dark:bg-amber-900/20">
          <p className="text-sm text-amber-800 dark:text-amber-200">
            You're approaching your monthly limit. Consider upgrading to avoid interruptions.
          </p>
          <Link
            href="/pricing"
            className="mt-2 inline-block text-sm font-medium text-amber-600 hover:text-amber-700 dark:text-amber-400"
          >
            View plans →
          </Link>
        </div>
      )}
    </div>
  );
}
