# Schema Spy Deployment Checklist

**Status:** 95% complete — ready for deployment

All code complete. Remaining tasks require Supabase/Stripe/Vercel dashboard access.

---

## ✅ Completed (No Action Needed)

- [x] All features implemented (upload, parse, visualize, export)
- [x] Stripe integration code complete
- [x] Subscription gating implemented
- [x] Export features (PNG, Markdown, PDF)
- [x] Landing page copy updated
- [x] Sitemap and robots.txt added
- [x] SEO meta tags on all pages
- [x] Terms and privacy pages with real content
- [x] Build passing (16 routes, zero errors)
- [x] Test data available (`test-data/sample-schema.sql`)
- [x] README documentation complete

---

## 🚀 Deployment Steps (Requires Tom)

### Step 1: Supabase Database Setup (15 minutes)

1. **Run migrations:**
   - Open Supabase dashboard: https://supabase.com/dashboard
   - Navigate to your project → SQL Editor
   - Run each migration file in order:
     ```
     supabase/migrations/001_initial.sql
     supabase/migrations/002_rls.sql
     supabase/migrations/003_subscriptions.sql
     ```
   - Verify tables created: `schemaspy_projects`, `schemaspy_tables`, `schemaspy_columns`, `schemaspy_indexes`, `schemaspy_relationships`, `schemaspy_subscriptions`

2. **Verify RLS policies:**
   - Check that Row Level Security is enabled on all tables
   - Test that users can only see their own projects

---

### Step 2: Stripe Product Setup (20 minutes)

1. **Create product:**
   - Go to: https://dashboard.stripe.com/products
   - Click "Add product"
   - Name: `Schema Spy Pro`
   - Description: `Monthly subscription to Schema Spy database visualization tool`
   - Click "Create product"

2. **Add pricing:**
   - Click "Add another price"
   - Price: `£8.00 GBP`
   - Billing period: `Monthly`
   - Click "Add price"

3. **Copy price ID:**
   - Click on the price you just created
   - Copy the price ID (starts with `price_...`)
   - Add to `.env.local` as `STRIPE_PRICE_ID=price_...`

4. **Configure webhook:**
   - Go to: https://dashboard.stripe.com/webhooks
   - Click "Add endpoint"
   - For now, use: `https://your-app-name.vercel.app/api/webhooks/stripe` (update after deployment)
   - Select events:
     - `checkout.session.completed`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
   - Click "Add endpoint"
   - Copy the webhook signing secret (starts with `whsec_...`)
   - Add to `.env.local` as `STRIPE_WEBHOOK_SECRET=whsec_...`

---

### Step 3: Vercel Deployment (15 minutes)

1. **Create new project:**
   - Go to: https://vercel.com/new
   - Import from Git
   - Select repository: `swiftlabs` (or wherever this is hosted)
   - Set root directory: `products/schemaspy`
   - Framework: Next.js

2. **Set environment variables:**
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://ylehaohyelejaytpzrbf.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<from Supabase dashboard>
   SUPABASE_SERVICE_ROLE_KEY=<from Supabase dashboard>
   STRIPE_SECRET_KEY=<from Stripe dashboard>
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<from Stripe dashboard>
   STRIPE_WEBHOOK_SECRET=<from Step 2>
   STRIPE_PRICE_ID=<from Step 2>
   ```

3. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete
   - Note the production URL (e.g., `schemaspy.vercel.app`)

4. **Configure custom domain (optional):**
   - Go to: Project Settings → Domains
   - Add: `schemaspy.swiftlabs.dev`
   - Follow DNS instructions

---

### Step 4: Update Stripe Webhook URL (5 minutes)

1. **Update webhook endpoint:**
   - Go back to: https://dashboard.stripe.com/webhooks
   - Click on the webhook you created
   - Update URL to production domain: `https://schemaspy.vercel.app/api/webhooks/stripe`
   - Click "Update endpoint"

---

### Step 5: Test Checkout Flow (15 minutes)

1. **Test signup:**
   - Go to production URL
   - Click "Get started"
   - Create a new account
   - Should redirect to checkout

2. **Test Stripe checkout:**
   - Use test card: `4242 4242 4242 4242`
   - Expiry: any future date
   - CVC: any 3 digits
   - ZIP: any 5 digits
   - Complete checkout

3. **Verify subscription created:**
   - Check Supabase: `schemaspy_subscriptions` table should have new row
   - Check Stripe dashboard: subscription should appear
   - Log back into app: should have access to dashboard

4. **Test upload:**
   - Upload `test-data/sample-schema.sql`
   - Verify ER diagram renders all tables and relationships
   - Test all export formats (PNG, Markdown, PDF)

5. **Test billing portal:**
   - Click "Manage billing" button
   - Should open Stripe Customer Portal
   - Verify you can update card or cancel subscription

---

### Step 6: Final QA (15 minutes)

1. **Mobile responsive:**
   - Open DevTools → Responsive mode
   - Test at 375px width
   - Verify all pages look good

2. **SEO check:**
   - Visit: `https://schemaspy.vercel.app/sitemap.xml` (should return XML)
   - Visit: `https://schemaspy.vercel.app/robots.txt` (should return plain text)
   - View page source: verify meta tags present

3. **Smoke test all routes:**
   - [ ] Landing page loads
   - [ ] Pricing page loads
   - [ ] Login page loads
   - [ ] Signup page loads
   - [ ] Dashboard redirects to login when not authenticated
   - [ ] Terms page loads
   - [ ] Privacy page loads

---

## 🎉 Post-Launch

1. **Monitor errors:**
   - Check Vercel logs for errors
   - Check Supabase logs for database issues
   - Check Stripe dashboard for failed webhooks

2. **Test with real SQL dumps:**
   - Try PostgreSQL dump
   - Try MySQL dump
   - Try SQLite dump

3. **Mark as shipped:**
   - Update `product-queue.json` → set status to "shipped"
   - Add to shipped products list
   - Log to dashboard: `node ~/projects/swiftlabs/scripts/log-activity.mjs ship builder schemaspy "Schema Spy launched"`

---

## 🐛 Common Issues

**Webhook not triggering:**
- Check Stripe webhook secret is correct
- Check webhook URL is correct
- Check events are selected correctly
- Check Vercel logs for errors

**Subscription not showing in app:**
- Check `schemaspy_subscriptions` table in Supabase
- Verify webhook fired in Stripe dashboard
- Check service role key is set in Vercel env vars

**Export not working:**
- Check browser console for errors
- Verify dependencies installed: `html2canvas`, `jspdf`

**ER diagram not rendering:**
- Check SQL parsing worked (view `schemaspy_tables` table)
- Check relationships parsed (view `schemaspy_relationships` table)
- Check browser console for ReactFlow errors

---

## 📊 Success Metrics

Track these after launch:
- Signups per day
- Conversion rate (signup → paid)
- Churn rate
- Average schemas uploaded per user
- Most common export format

---

**Estimated total time:** 1.5 hours

**When complete:** Schema Spy will be live and accepting payments! 🚀
