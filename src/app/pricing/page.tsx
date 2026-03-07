import { Metadata } from 'next';
import Link from 'next/link';
import { CheckIcon } from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: 'Pricing | ProductName',
  description: 'Simple, transparent pricing. Start free, upgrade when you need more.',
  openGraph: {
    title: 'Pricing | ProductName',
    description: 'Simple, transparent pricing. Start free, upgrade when you need more.',
  },
};

const tiers = [
  {
    name: 'Free',
    price: '£0',
    description: 'Perfect for trying out ProductName',
    features: [
      '10 credits per month',
      'Basic features',
      'Community support',
      '7-day history',
    ],
    cta: 'Get Started',
    href: '/auth/signup',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '£10',
    description: 'For professionals and small teams',
    features: [
      '500 credits per month',
      'All features unlocked',
      'Priority support',
      'Unlimited history',
      'Export to PDF',
      'Custom branding',
    ],
    cta: 'Start Free Trial',
    href: '/auth/signup?plan=pro',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large teams with custom needs',
    features: [
      'Unlimited credits',
      'Dedicated support',
      'Custom integrations',
      'SLA guarantee',
      'On-premise option',
      'White-label',
    ],
    cta: 'Contact Sales',
    href: 'mailto:sales@productname.com',
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Simple, transparent pricing
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Start free, upgrade when you need more. No hidden fees.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-3xl p-8 ${
                tier.highlighted
                  ? 'bg-blue-600 text-white ring-2 ring-blue-600'
                  : 'bg-white dark:bg-gray-800 ring-1 ring-gray-200 dark:ring-gray-700'
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center rounded-full bg-blue-500 px-4 py-1 text-xs font-semibold text-white">
                    Most Popular
                  </span>
                </div>
              )}

              <h3
                className={`text-xl font-semibold ${
                  tier.highlighted ? 'text-white' : 'text-gray-900 dark:text-white'
                }`}
              >
                {tier.name}
              </h3>

              <p
                className={`mt-4 text-sm ${
                  tier.highlighted ? 'text-blue-100' : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                {tier.description}
              </p>

              <p className="mt-6 flex items-baseline gap-x-1">
                <span
                  className={`text-4xl font-bold tracking-tight ${
                    tier.highlighted ? 'text-white' : 'text-gray-900 dark:text-white'
                  }`}
                >
                  {tier.price}
                </span>
                {tier.price !== 'Custom' && (
                  <span
                    className={`text-sm font-semibold ${
                      tier.highlighted ? 'text-blue-100' : 'text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    /month
                  </span>
                )}
              </p>

              <ul className="mt-8 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon
                      className={`h-6 w-6 flex-shrink-0 ${
                        tier.highlighted ? 'text-white' : 'text-blue-600 dark:text-blue-400'
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        tier.highlighted ? 'text-white' : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={tier.href}
                className={`mt-8 block w-full rounded-lg px-4 py-3 text-center text-sm font-semibold transition ${
                  tier.highlighted
                    ? 'bg-white text-blue-600 hover:bg-gray-100'
                    : 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
                }`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mx-auto mt-24 max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Frequently asked questions
          </h2>
          <dl className="mt-10 space-y-8">
            <div>
              <dt className="text-lg font-semibold text-gray-900 dark:text-white">
                Can I change plans later?
              </dt>
              <dd className="mt-2 text-gray-600 dark:text-gray-300">
                Yes! You can upgrade or downgrade at any time. Changes take effect immediately,
                and we'll prorate your billing.
              </dd>
            </div>
            <div>
              <dt className="text-lg font-semibold text-gray-900 dark:text-white">
                Is there a free trial?
              </dt>
              <dd className="mt-2 text-gray-600 dark:text-gray-300">
                The Free plan is available forever. Pro plans come with a 7-day free trial—no
                credit card required.
              </dd>
            </div>
            <div>
              <dt className="text-lg font-semibold text-gray-900 dark:text-white">
                What payment methods do you accept?
              </dt>
              <dd className="mt-2 text-gray-600 dark:text-gray-300">
                We accept all major credit cards via Stripe. Enterprise customers can pay by
                invoice.
              </dd>
            </div>
            <div>
              <dt className="text-lg font-semibold text-gray-900 dark:text-white">
                Can I cancel anytime?
              </dt>
              <dd className="mt-2 text-gray-600 dark:text-gray-300">
                Yes. Cancel anytime from your dashboard. You'll keep access until the end of your
                billing period.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
