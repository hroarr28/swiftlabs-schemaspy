/**
 * Schema Spy - Terms of Service
 */

import Link from 'next/link';

export default function TermsPage() {
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
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        <p className="text-sm text-gray-600 mb-12">Last updated: 8 March 2026</p>

        <div className="prose prose-gray max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceptance of Terms</h2>
            <p className="text-gray-700">
              By accessing or using Schema Spy, you agree to be bound by these Terms of Service. If you do not agree, do not use the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Description</h2>
            <p className="text-gray-700">
              Schema Spy is a database schema visualization tool. We provide software that parses SQL dump files and generates interactive ER diagrams and documentation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">User Accounts</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>You must provide accurate information when creating an account</li>
              <li>You are responsible for maintaining the security of your account</li>
              <li>You must be at least 18 years old to use this service</li>
              <li>One account per user; do not share accounts</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceptable Use</h2>
            <p className="text-gray-700 mb-4">
              You agree NOT to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Upload malicious code or attempt to compromise the service</li>
              <li>Reverse engineer or copy our software</li>
              <li>Use the service for illegal purposes</li>
              <li>Abuse rate limits or attempt to overload systems</li>
              <li>Share your account with others</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment and Billing</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Subscriptions are billed monthly in GBP</li>
              <li>You authorize recurring charges to your payment method</li>
              <li>Refunds are issued at our discretion</li>
              <li>We may change pricing with 30 days notice</li>
              <li>Cancel anytime from your account settings</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Ownership</h2>
            <p className="text-gray-700">
              You retain all rights to your uploaded SQL files and schema data. We claim no ownership. You grant us a license to process and store your data solely to provide the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Availability</h2>
            <p className="text-gray-700">
              We strive for 99.9% uptime but do not guarantee uninterrupted service. We may perform maintenance with notice when possible.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
            <p className="text-gray-700">
              Schema Spy is provided "as is" without warranties. We are not liable for any damages arising from use of the service, including data loss or business interruption.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Termination</h2>
            <p className="text-gray-700">
              We may terminate or suspend your account at any time for violations of these terms. You may cancel your subscription at any time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
            <p className="text-gray-700">
              We may update these terms. Continued use after changes constitutes acceptance. We will notify you of major changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law</h2>
            <p className="text-gray-700">
              These terms are governed by the laws of England and Wales.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact</h2>
            <p className="text-gray-700">
              For questions about these terms, email: hello@schemaspy.com
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
