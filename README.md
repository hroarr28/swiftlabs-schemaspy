# Schema Spy

Database schema visualization tool. Upload SQL dumps and get interactive ER diagrams + documentation exports.

## Features

- 🗂️ Upload SQL dumps (PostgreSQL, MySQL, SQLite, SQL Server)
- 📊 Interactive ER diagrams with ReactFlow
- 📤 Export as PNG, Markdown, and PDF
- 🔐 Stripe subscription billing (£8/month)
- 🎨 Clean, minimal UI

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth
- **Payments:** Stripe Checkout + Customer Portal
- **Diagrams:** ReactFlow
- **Exports:** html2canvas (PNG), jsPDF (PDF)
- **Deployment:** Vercel

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (for webhooks)
   - `STRIPE_SECRET_KEY`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `STRIPE_PRICE_ID` (after creating Stripe product)

3. **Run database migrations:**
   ```bash
   # Connect to Supabase and run all .sql files in supabase/migrations/
   ```

4. **Create Stripe product:**
   ```bash
   # Via Stripe Dashboard:
   # 1. Create product "Schema Spy Pro"
   # 2. Add £8/month recurring price
   # 3. Copy price ID to STRIPE_PRICE_ID in .env.local
   ```

5. **Configure Stripe webhook:**
   ```bash
   # In Stripe Dashboard:
   # Add webhook endpoint: https://your-domain.com/api/webhooks/stripe
   # Select events: checkout.session.completed, customer.subscription.updated, customer.subscription.deleted
   # Copy webhook secret to STRIPE_WEBHOOK_SECRET in .env.local
   ```

6. **Run development server:**
   ```bash
   npm run dev
   ```

## Deployment

1. **Deploy to Vercel:**
   ```bash
   vercel --prod
   ```

2. **Set environment variables in Vercel:**
   - All variables from `.env.local`
   - Set `SUPABASE_SERVICE_ROLE_KEY` (for webhooks)

3. **Update Stripe webhook URL:**
   - Change to production domain in Stripe Dashboard

4. **Test checkout flow:**
   - Use test card: `4242 4242 4242 4242`
   - Verify subscription created in Supabase

## Database Schema

**Tables:**
- `schemaspy_projects` — User projects
- `schemaspy_tables` — Parsed tables
- `schemaspy_columns` — Table columns
- `schemaspy_indexes` — Table indexes
- `schemaspy_relationships` — Foreign key relationships
- `schemaspy_subscriptions` — Stripe subscription data

## Development Status

✅ **Complete:**
- Authentication (login/signup)
- Dashboard with project list
- SQL upload and parsing
- ER diagram visualization
- Schema browser sidebar
- Export to PNG/Markdown/PDF
- Stripe checkout integration
- Subscription gating
- Customer portal access
- Webhook handling

🚧 **Remaining for launch:**
- [ ] Run migrations on Supabase
- [ ] Create Stripe product (£8/month)
- [ ] Configure webhook in Stripe
- [ ] Test checkout flow end-to-end
- [ ] Test with production SQL dumps
- [ ] Deploy to Vercel
- [x] Update landing page copy
- [x] Add sitemap and robots.txt
- [ ] Final QA pass

## Testing

Test SQL dump available at: `test-data/sample-schema.sql`

To test locally:
1. Sign up for an account
2. Upload `test-data/sample-schema.sql`
3. Verify ER diagram shows all tables and relationships
4. Test export features (PNG, Markdown, PDF)

## Support

For issues, email: help@schemaspy.dev (to be configured)
