/**
 * Schema Spy - Pricing Page
 */

import Link from 'next/link';
import CheckoutButton from '@/components/checkout-button';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <nav className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <Link href="/">
            <h1 className="text-2xl font-bold text-blue-600">Schema Spy</h1>
          </Link>
          <div className="flex gap-4">
            <Link href="/login" className="text-gray-600 hover:text-blue-600">
              Log in
            </Link>
            <Link
              href="/signup"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Get started
            </Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-gray-600">
              One plan. All features. Cancel anytime.
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border-2 border-blue-600 p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro</h3>
                <p className="text-gray-600 mb-6">
                  Everything you need to visualise database schemas
                </p>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-gray-900">£8</span>
                  <span className="text-gray-600 ml-2">/month</span>
                </div>
                <CheckoutButton requiresAuth />
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <svg
                    className="h-6 w-6 text-green-600 flex-shrink-0"
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
                  <div>
                    <p className="font-medium text-gray-900">Unlimited uploads</p>
                    <p className="text-sm text-gray-600">
                      Upload as many SQL dumps as you need
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg
                    className="h-6 w-6 text-green-600 flex-shrink-0"
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
                  <div>
                    <p className="font-medium text-gray-900">Interactive ER diagrams</p>
                    <p className="text-sm text-gray-600">
                      Zoom, pan, and explore your schema visually
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg
                    className="h-6 w-6 text-green-600 flex-shrink-0"
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
                  <div>
                    <p className="font-medium text-gray-900">All database types</p>
                    <p className="text-sm text-gray-600">
                      PostgreSQL, MySQL, SQLite, SQL Server
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg
                    className="h-6 w-6 text-green-600 flex-shrink-0"
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
                  <div>
                    <p className="font-medium text-gray-900">Export documentation</p>
                    <p className="text-sm text-gray-600">
                      PDF, Markdown, PNG exports
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg
                    className="h-6 w-6 text-green-600 flex-shrink-0"
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
                  <div>
                    <p className="font-medium text-gray-900">Priority support</p>
                    <p className="text-sm text-gray-600">
                      Email support within 24 hours
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-8 text-sm text-gray-600">
              <p>Cancel anytime. No long-term contracts.</p>
              <p className="mt-2">
                All prices in GBP. VAT may apply.
              </p>
            </div>
          </div>

          <div className="mt-20 pt-20 border-t">
            <h3 className="text-2xl font-bold text-center mb-12">
              Frequently asked questions
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Can I upload multiple databases?
                </h4>
                <p className="text-gray-600 text-sm">
                  Yes! Upload as many SQL dumps as you need. Each one becomes a separate project you can visualise.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  What file formats do you support?
                </h4>
                <p className="text-gray-600 text-sm">
                  We support standard SQL dump files from PostgreSQL (pg_dump), MySQL (mysqldump), SQLite, and SQL Server.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Can I cancel my subscription?
                </h4>
                <p className="text-gray-600 text-sm">
                  Yes, you can cancel anytime from your account settings. You'll retain access until the end of your billing period.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Is my data secure?
                </h4>
                <p className="text-gray-600 text-sm">
                  Yes. All data is encrypted at rest and in transit. We never see your actual data values, only the schema structure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="container mx-auto px-4 py-12 mt-20 border-t">
        <div className="flex justify-between items-center text-sm text-gray-600">
          <p>© 2026 Schema Spy. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
