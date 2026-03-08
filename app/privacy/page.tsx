/**
 * Schema Spy - Privacy Policy
 */

import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b">
        <div className="container mx-auto px-4 py-6">
          <Link href="/">
            <h1 className="text-2xl font-bold text-blue-600">Schema Spy</h1>
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        <p className="text-sm text-gray-600 mb-12">Last updated: 8 March 2026</p>

        <div className="prose prose-gray max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What we collect</h2>
            <p className="text-gray-700 mb-4">
              When you use Schema Spy, we collect:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Email address (for account creation)</li>
              <li>Database schema structure from uploaded SQL files</li>
              <li>Usage data (uploads, diagram views)</li>
              <li>Payment information (via Stripe, not stored on our servers)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How we use your data</h2>
            <p className="text-gray-700 mb-4">
              We use your data to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Provide schema visualization services</li>
              <li>Process payments and manage subscriptions</li>
              <li>Send important service updates</li>
              <li>Improve our product</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data security</h2>
            <p className="text-gray-700">
              All data is encrypted at rest and in transit using industry-standard encryption. We use Supabase for data storage, which complies with SOC 2 Type II and is GDPR-compliant.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-party services</h2>
            <p className="text-gray-700 mb-4">
              We use the following third-party services:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Supabase</strong> — Database and authentication</li>
              <li><strong>Stripe</strong> — Payment processing</li>
              <li><strong>Vercel</strong> — Hosting</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your rights</h2>
            <p className="text-gray-700 mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Access your personal data</li>
              <li>Request deletion of your data</li>
              <li>Export your data</li>
              <li>Opt out of marketing emails</li>
            </ul>
            <p className="text-gray-700 mt-4">
              To exercise these rights, contact us at hello@schemaspy.com
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact</h2>
            <p className="text-gray-700">
              For privacy concerns, email: hello@schemaspy.com
            </p>
          </section>
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
