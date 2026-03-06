# SwiftLabs SaaS Starter

Template for building new SwiftLabs products. Clone this, replace the placeholders, ship.

## Quick Start

1. Copy this template: `cp -r templates/saas-starter products/your-product`
2. `cd products/your-product && npm install`
3. Copy `.env.example` to `.env.local` and fill in your keys
4. Create a Supabase project and run `supabase/migration.sql`
5. Replace all `ProductName` / `TEMPLATE` markers with your product details
6. `npm run dev`

## What's Included

- **Landing page** — Hero, features, pricing, FAQ
- **Auth** — Sign up, log in, forgot/reset password (Supabase)
- **Dashboard shell** — Protected route with user info
- **Stripe** — Checkout, customer portal, webhook handler
- **Middleware** — Route protection (dashboard requires auth)
- **SEO** — Sitemap, robots.txt, meta tags
- **Dark theme** — Zinc colour scale, Inter font

## Customisation Checklist

- [ ] Update `layout.tsx` metadata (title, description)
- [ ] Update `page.tsx` (hero, features, pricing, FAQ)
- [ ] Update brand colour in `globals.css` (`--color-brand`)
- [ ] Replace "ProductName" in nav/footer
- [ ] Add product-specific tables to `supabase/migration.sql`
- [ ] Create Stripe price ID and wire up checkout
- [ ] Set env vars in Vercel
- [ ] Add Terms and Privacy pages
