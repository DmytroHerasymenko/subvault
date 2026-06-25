# SubVault

Track all your subscriptions in one place — Netflix, YouTube, Gemini, internet, and more.

**Free stack:** Next.js · Supabase (auth + DB) · Vercel hosting

## Features (MVP)

- Email + password and Google sign-in
- Per-user isolated data (Supabase Row Level Security)
- Add / edit / delete subscriptions with quick templates
- Monthly & yearly totals in UAH, USD, or EUR
- Category breakdown (streaming, internet, AI, software, games, other)
- Filters and sorting
- Ukrainian and English UI

## Setup

### 1. Supabase (free)

1. Create a project at [supabase.com](https://supabase.com)
2. SQL Editor → run `supabase/schema.sql`
3. Authentication → Providers → enable **Email** and **Google**
4. Authentication → URL Configuration:
   - Site URL: `http://localhost:3000` (later your Vercel URL)
   - Redirect URLs: `http://localhost:3000/auth/callback`, `https://your-app.vercel.app/auth/callback`
5. Settings → API → copy **Project URL** and **anon public** key

### 2. Local env

```bash
cp .env.example .env.local
```

Fill in:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Install & run

```bash
npm install
npm run dev
```

Open [http://localhost:3000/uk](http://localhost:3000/uk)

### 4. Deploy on Vercel (free)

1. Push to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Add the same env vars (use production URL for `NEXT_PUBLIC_SITE_URL`)
4. Update Supabase redirect URLs with your Vercel domain

## Monetization (planned)

- Free tier: up to 15 subscriptions (enforced in UI)
- Future Pro: unlimited subs, reminders, export, family sharing
- Payment: Stripe when ready

## Project structure

```
src/
  app/[locale]/     # Pages (uk, en)
  components/       # UI, dashboard, auth
  lib/              # Supabase, types, exchange rates
  i18n/             # next-intl config
messages/           # uk.json, en.json
supabase/schema.sql # Database + RLS
```

## Exchange rates

Totals in your preferred currency use [Frankfurter](https://www.frankfurter.app/) (free, no API key). Rates are approximate.
