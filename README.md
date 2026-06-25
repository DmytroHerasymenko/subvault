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

Open [http://localhost:3000/ua](http://localhost:3000/ua)

### 4. Deploy on Vercel (free)

1. Push this repo to GitHub (see below)
2. Go to [vercel.com/new](https://vercel.com/new) → Import Git Repository
3. Select the repo → Framework: **Next.js** (auto-detected)
4. **Environment Variables** (add all three):

| Name | Value |
|------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://bjpudauocwqlavwdinnt.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | your anon key from Supabase |
| `NEXT_PUBLIC_SITE_URL` | `https://YOUR-APP.vercel.app` (set after first deploy, then redeploy) |

5. Click **Deploy**
6. After deploy, copy your Vercel URL (e.g. `https://subvault-xxx.vercel.app`)
7. Update **NEXT_PUBLIC_SITE_URL** in Vercel → Settings → Environment Variables → **Redeploy**
8. Update **Supabase** → Authentication → URL Configuration:
   - Site URL: `https://YOUR-APP.vercel.app`
   - Redirect URLs: `https://YOUR-APP.vercel.app/auth/callback`
9. **Google OAuth** (if used): add the same Supabase callback URL in Google Cloud Console

**Push to GitHub (one time):**

```bash
cd C:\Users\mcdim\Projects\subvault
gh repo create subvault --public --source=. --remote=origin --push
```

Or create an empty repo on GitHub and:

```bash
git remote add origin https://github.com/DmytroHerasymenko/subvault.git
git push -u origin master
```

## Monetization (planned)

- Free tier: up to 15 subscriptions (enforced in UI)
- Future Pro: unlimited subs, reminders, export, family sharing
- Payment: Stripe when ready

## Project structure

```
src/
  app/[locale]/     # Pages (ua, en)
  components/       # UI, dashboard, auth
  lib/              # Supabase, types, exchange rates
  i18n/             # next-intl config
messages/           # ua.json, en.json
supabase/schema.sql # Database + RLS
```

## Exchange rates

Totals in your preferred currency use [Frankfurter](https://www.frankfurter.app/) (free, no API key). Rates are approximate.
