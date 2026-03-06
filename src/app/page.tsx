// TEMPLATE: Replace all placeholder content with your product details

const features = [
  {
    title: "Feature One",
    description: "Describe what this feature does and why it matters.",
  },
  {
    title: "Feature Two",
    description: "Describe what this feature does and why it matters.",
  },
  {
    title: "Feature Three",
    description: "Describe what this feature does and why it matters.",
  },
];

const faqs = [
  { q: "How does it work?", a: "Explain how your product works in plain language." },
  { q: "What does it cost?", a: "Explain your pricing simply." },
  { q: "Can I cancel anytime?", a: "Yes, cancel your subscription at any time from the dashboard." },
  { q: "Is my data secure?", a: "Yes. We use Supabase with row-level security. Your data is encrypted in transit and at rest." },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="border-b border-zinc-800/50">
        <div className="max-w-4xl mx-auto px-6 py-5 flex items-center justify-between">
          <span className="text-sm font-semibold text-zinc-100">ProductName</span>
          <div className="flex items-center gap-4">
            <a href="/auth/login" className="text-[13px] text-zinc-500 hover:text-zinc-200 transition-colors">
              Log in
            </a>
            <a href="/auth/signup" className="text-[13px] px-4 py-2 bg-brand text-white rounded-md hover:bg-brand-dark transition-colors">
              Get started
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-32 pb-20 text-center">
        <h1 className="text-4xl sm:text-5xl font-semibold text-zinc-50 tracking-tight leading-[1.1] mb-5">
          One clear headline about your product
        </h1>
        <p className="text-lg text-zinc-400 max-w-xl mx-auto mb-8">
          One or two sentences explaining what it does and who it&apos;s for.
        </p>
        <div className="flex items-center justify-center gap-3">
          <a href="/auth/signup" className="px-6 py-3 bg-brand text-white text-sm font-medium rounded-md hover:bg-brand-dark transition-colors">
            Start free
          </a>
          <a href="#features" className="px-6 py-3 border border-zinc-700 text-zinc-300 text-sm font-medium rounded-md hover:border-zinc-500 transition-colors">
            Learn more
          </a>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-2xl font-semibold text-zinc-100 text-center mb-12">
          Features
        </h2>
        <div className="grid sm:grid-cols-3 gap-8">
          {features.map((f) => (
            <div key={f.title} className="p-6 rounded-lg border border-zinc-800 bg-zinc-900/50">
              <h3 className="text-base font-semibold text-zinc-100 mb-2">{f.title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-t border-zinc-800/50">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h2 className="text-2xl font-semibold text-zinc-100 mb-4">Simple pricing</h2>
          <p className="text-zinc-500 mb-10">No tiers, no hidden fees.</p>
          <div className="max-w-sm mx-auto p-8 rounded-lg border border-zinc-800 bg-zinc-900/50">
            <p className="text-4xl font-bold text-zinc-50 mb-1">
              £X<span className="text-lg font-normal text-zinc-500">/month</span>
            </p>
            <p className="text-sm text-zinc-500 mb-6">Everything included.</p>
            <a href="/auth/signup" className="block w-full py-3 bg-brand text-white text-sm font-medium rounded-md hover:bg-brand-dark transition-colors text-center">
              Get started
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-2xl font-semibold text-zinc-100 text-center mb-12">FAQ</h2>
        <div className="max-w-xl mx-auto space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="text-sm font-semibold text-zinc-200 mb-2">{f.q}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800/50">
        <div className="max-w-4xl mx-auto px-6 py-8 flex items-center justify-between">
          <p className="text-[12px] text-zinc-600">&copy; {new Date().getFullYear()} SwiftLabs</p>
          <div className="flex gap-4">
            <a href="/terms" className="text-[12px] text-zinc-600 hover:text-zinc-400 transition-colors">Terms</a>
            <a href="/privacy" className="text-[12px] text-zinc-600 hover:text-zinc-400 transition-colors">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
