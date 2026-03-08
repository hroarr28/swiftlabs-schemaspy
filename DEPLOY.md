# Schema Spy Deployment Guide

## Quick Deploy

**Product:** Database schema visualizer — upload SQL dump, get ER diagrams  
**Pricing:** £8/month (Stripe ID: price_1T8ZbnCjlSeC9GYc9mlodvGt)  
**GitHub:** https://github.com/hroarr28/swiftlabs-schemaspy

---

## 1. Run Database Migrations

```bash
cd ~/projects/swiftlabs/projects/schemaspy
cat supabase/migrations/*.sql
```

Copy output → paste into https://supabase.com/dashboard/project/ijejglwvvufgbgpwouus/sql/new

Verify tables created:
- `schemaspy_projects`
- `schemaspy_diagrams`
- `schemaspy_subscriptions`

---

## 2. Deploy to Vercel

```bash
cd ~/projects/swiftlabs/projects/schemaspy
npm install
npm run build  # Verify zero errors
vercel --prod
```

**Environment variables:**
```env
NEXT_PUBLIC_SUPABASE_URL=<from .env.local>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<from .env.local>
SUPABASE_SERVICE_ROLE_KEY=<from .env.local>
STRIPE_SECRET_KEY=<from .env.local>
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<from .env.local>
STRIPE_PRICE_ID=price_1T8ZbnCjlSeC9GYc9mlodvGt
STRIPE_WEBHOOK_SECRET=<from Stripe dashboard after webhook creation>
NEXT_PUBLIC_APP_URL=https://schemaspy.swiftlabs.dev
```

---

## 3. Configure Stripe Webhook

https://dashboard.stripe.com/test/webhooks → Add endpoint:
- URL: `https://schemaspy.swiftlabs.dev/api/webhooks/stripe`
- Events: `checkout.session.completed`, `customer.subscription.*`
- Copy signing secret → update Vercel env var

---

## 4. Test

1. Upload SQL dump (PostgreSQL, MySQL, SQLite)
2. Verify ER diagram generated
3. Test interactive navigation
4. Upgrade to Pro → verify unlocks export features
5. Test PDF export of diagrams

---

## Post-Deployment

```bash
node ~/projects/swiftlabs/scripts/log-activity.mjs deploy builder schemaspy "Deployed to https://schemaspy.swiftlabs.dev"
```
