export default function PrivacyPage() {
  return (
    <div className="min-h-screen max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-2xl font-semibold text-zinc-100 mb-8">Privacy Policy</h1>
      <div className="text-sm text-zinc-400 leading-[1.8] space-y-6">
        <p>Last updated: {new Date().toLocaleDateString("en-GB", { month: "long", year: "numeric" })}</p>

        <h2 className="text-lg font-semibold text-zinc-200 mt-8">What we collect</h2>
        <p>When you create an account, we collect your email address. When you use the service, we store the data you provide (e.g. files you upload, content you create). We use Vercel Analytics for anonymous, cookieless page view counts.</p>

        <h2 className="text-lg font-semibold text-zinc-200">How we use it</h2>
        <p>Your data is used solely to provide the service. We do not sell, rent, or share your personal data with third parties. We do not run advertising or tracking scripts.</p>

        <h2 className="text-lg font-semibold text-zinc-200">Where it&apos;s stored</h2>
        <p>Data is stored in Supabase (PostgreSQL) hosted in the EU (London region). Payments are processed by Stripe. Both providers are GDPR compliant.</p>

        <h2 className="text-lg font-semibold text-zinc-200">Your rights</h2>
        <p>Under UK GDPR, you have the right to access, correct, or delete your personal data. You can delete your account from the dashboard settings, or email us and we&apos;ll handle it within 30 days.</p>

        <h2 className="text-lg font-semibold text-zinc-200">Cookies</h2>
        <p>We use essential cookies only (authentication session). No tracking cookies, no third-party cookies.</p>

        <h2 className="text-lg font-semibold text-zinc-200">Contact</h2>
        <p>Data controller: SwiftLabs, United Kingdom. Email: hello@swiftlabs.dev</p>
      </div>
    </div>
  );
}
