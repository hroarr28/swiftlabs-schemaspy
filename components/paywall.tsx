/**
 * Paywall Component
 * Shows when user doesn't have an active subscription
 */

import Link from 'next/link';
import CheckoutButton from './checkout-button';

export default function Paywall() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-600">Schema Spy</h1>
            <form action="/auth/signout" method="post">
              <button
                type="submit"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-xl p-12 border">
            <svg
              className="mx-auto h-16 w-16 text-blue-600 mb-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Subscribe to get started
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              You need an active subscription to upload and visualise database schemas
            </p>

            <div className="bg-blue-50 rounded-xl p-6 mb-8">
              <div className="mb-4">
                <span className="text-5xl font-bold text-gray-900">£8</span>
                <span className="text-gray-600 ml-2">/month</span>
              </div>

              <ul className="space-y-3 text-left mb-6">
                <li className="flex items-center gap-3">
                  <svg
                    className="h-5 w-5 text-green-600 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700">Unlimited SQL uploads</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg
                    className="h-5 w-5 text-green-600 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700">Interactive ER diagrams</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg
                    className="h-5 w-5 text-green-600 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700">Export as PNG, PDF, Markdown</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg
                    className="h-5 w-5 text-green-600 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700">All database types supported</span>
                </li>
              </ul>

              <CheckoutButton className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" />
            </div>

            <p className="text-sm text-gray-600">
              Cancel anytime. No long-term contracts.{' '}
              <Link href="/pricing" className="text-blue-600 hover:underline">
                View pricing details
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
