export default function TermsPage() {
  return (
    <div className="min-h-screen max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-2xl font-semibold text-zinc-100 mb-8">Terms of Service</h1>
      <div className="text-sm text-zinc-400 leading-[1.8] space-y-6">
        <p>Last updated: {new Date().toLocaleDateString("en-GB", { month: "long", year: "numeric" })}</p>

        <h2 className="text-lg font-semibold text-zinc-200 mt-8">1. Agreement</h2>
        <p>By using this service, you agree to these terms. If you do not agree, do not use the service.</p>

        <h2 className="text-lg font-semibold text-zinc-200">2. Service</h2>
        <p>We provide a software tool accessible via web browser. We reserve the right to modify, suspend, or discontinue the service at any time.</p>

        <h2 className="text-lg font-semibold text-zinc-200">3. Accounts</h2>
        <p>You are responsible for maintaining the security of your account. You must provide accurate information when creating an account.</p>

        <h2 className="text-lg font-semibold text-zinc-200">4. Payment</h2>
        <p>Paid plans are billed monthly via Stripe. You may cancel at any time from your dashboard. Refunds are handled on a case-by-case basis.</p>

        <h2 className="text-lg font-semibold text-zinc-200">5. Data</h2>
        <p>Your data belongs to you. We do not sell, share, or use your data for purposes other than providing the service. See our Privacy Policy for details.</p>

        <h2 className="text-lg font-semibold text-zinc-200">6. Limitation of Liability</h2>
        <p>The service is provided &quot;as is&quot; without warranties. We are not liable for any damages arising from your use of the service.</p>

        <h2 className="text-lg font-semibold text-zinc-200">7. Governing Law</h2>
        <p>These terms are governed by the laws of England and Wales.</p>

        <h2 className="text-lg font-semibold text-zinc-200">8. Contact</h2>
        <p>Questions? Email hello@swiftlabs.dev</p>
      </div>
    </div>
  );
}
