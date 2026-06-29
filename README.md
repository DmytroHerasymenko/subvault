# Renulo

Track all your subscriptions in one place — Netflix, YouTube, Gemini, internet, and more.

**Live (free):** [https://renulo.vercel.app](https://renulo.vercel.app) · **Later:** `renulo.app`

**Free stack:** Next.js · Supabase (auth + DB) · Vercel hosting

## Features (MVP)

- Email + password and Google sign-in
- Per-user isolated data (Supabase Row Level Security)
- Add / edit / delete subscriptions with quick templates
- Monthly & yearly totals in UAH, USD, or EUR
- Category breakdown (streaming, internet, AI, software, games, other)
- Filters and sorting
- Ukrainian, English, and Polish UI

## Setup

### 1. Supabase (free)

1. Create a project at [supabase.com](https://supabase.com)
2. SQL Editor → run `supabase/schema.sql`
3. Authentication → Providers → enable **Email** and **Google**
4. **Custom SMTP** — see **§7** (required for production signup emails; built-in Supabase mail is ~2–6/hour).
5. Authentication → URL Configuration — see **§5** below (use `renulo.vercel.app` first).
6. Settings → API → copy **Project URL** and **anon public** key

### 2. Local env

```bash
cp .env.example .env.local
```

Fill in:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

`SUPABASE_SERVICE_ROLE_KEY` is required for **Delete account** (Settings). Add it in Vercel env too — **never** prefix with `NEXT_PUBLIC_`.

### 3. Install & run

```bash
npm install
npm run dev
```

Open [http://localhost:3000/ua](http://localhost:3000/ua)

### 4. Deploy on Vercel (free hosting)

See **Phase 1** below for `renulo.vercel.app` (free). **Phase 2** is when you buy `renulo.app`.

#### Phase 1 — start on `renulo.vercel.app` (no domain purchase)

1. Push this repo to GitHub (commit all Renulo changes).
2. [vercel.com/new](https://vercel.com/new) → Import repo (or use existing project).
3. **Settings → General → Project Name** → set to `renulo` (production URL becomes `https://renulo.vercel.app`). If the name is taken, use e.g. `renulo-app` → `https://renulo-app.vercel.app` and use that URL everywhere below instead of `renulo.vercel.app`.
4. **Settings → Environment Variables** (Production + Preview + Development):

| Name | Value |
|------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | service role key (account deletion only; server-side) |
| `NEXT_PUBLIC_SITE_URL` | `https://renulo.vercel.app` |

5. **Deployments** → Redeploy latest (or push to `main` to trigger deploy).
6. Configure Supabase and Google (sections 5–6 below).
7. Open `https://renulo.vercel.app/ua` and test signup / Google login.

#### Phase 2 — switch to `renulo.app` (after buying the domain)

1. Register `renulo.app` (Namecheap, Cloudflare, or Vercel Domains).
2. Vercel → **Settings → Domains** → Add `renulo.app` and `www.renulo.app` → set DNS as Vercel shows.
3. Change `NEXT_PUBLIC_SITE_URL` to `https://renulo.app` → **Redeploy**.
4. Supabase → update Site URL and add `https://renulo.app/auth/callback` (keep old Vercel URL in redirect list until you drop it).
5. Google OAuth → add `https://renulo.app` to authorized origins.

### 5. Supabase URL configuration

**Authentication → URL Configuration**

**Phase 1 (now):**

- Site URL: `https://renulo.vercel.app`
- Redirect URLs (add each line):
  - `http://localhost:3000/auth/callback`
  - `https://renulo.vercel.app/auth/callback`
  - `https://*.vercel.app/auth/callback` (preview deploys)

**Phase 2 (after domain):** Site URL → `https://renulo.app`; add `https://renulo.app/auth/callback` and `https://www.renulo.app/auth/callback`.

### 6. Google OAuth (if enabled in Supabase)

In [Google Cloud Console](https://console.cloud.google.com/) → your OAuth client:

- **Authorized JavaScript origins:** `https://renulo.vercel.app` (later also `https://renulo.app`)
- **Authorized redirect URIs:** leave as Supabase callback only, e.g. `https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback` (not your app URL)

Supabase handles the redirect to `/auth/callback` on your site.

### 7. Custom SMTP (Resend — free tier)

Built-in Supabase email is fine for quick tests but hits a low hourly limit. Use your own SMTP before real users sign up.

**Recommended:** [Resend](https://resend.com) (free ~100 emails/day after domain verification).

1. Create a Resend account (use `renulo.app@gmail.com` or your admin email).
2. **Domains** → add `renulo.app` when you own it → add DNS records → verify.
   Until then, use **Gmail SMTP** interim (see script below) or disable **Confirm email** for testing only.
3. **API Keys** → create key → copy `re_...`.
4. Configure Supabase — **either** dashboard **or** script:

**Dashboard:** Authentication → **SMTP** → Enable custom SMTP

| Field | Resend value |
|-------|----------------|
| Host | `smtp.resend.com` |
| Port | `587` |
| Username | `resend` |
| Password | your Resend API key |
| Sender email | `no-reply@renulo.app` (verified domain) |
| Sender name | `Renulo` |

Then Authentication → **Rate Limits** → raise **Email sent** (e.g. 100/hour).

**Script (optional):**

```bash
# Token: https://supabase.com/dashboard/account/tokens
export SUPABASE_ACCESS_TOKEN=...
export RESEND_API_KEY=re_...
export SMTP_FROM_EMAIL=no-reply@renulo.app
node scripts/configure-supabase-smtp.mjs
```

**Gmail interim** (any recipient, no domain purchase; use App Password with 2FA):

```bash
export SMTP_PROVIDER=gmail
export SMTP_FROM_EMAIL=renulo.app@gmail.com
export GMAIL_APP_PASSWORD=...
node scripts/configure-supabase-smtp.mjs
```

## Monetization (planned)

- Free tier: up to 15 subscriptions (enforced in UI)
- Future Pro: unlimited subs, reminders, export, family sharing
- Payment: Stripe when ready

## Project structure

```
src/
  app/[locale]/     # Pages (ua, en, pl)
  components/       # UI, dashboard, auth
  lib/              # Supabase, types, exchange rates
  i18n/             # next-intl config
messages/           # ua.json, en.json, pl.json
supabase/schema.sql # Database + RLS
```

## Exchange rates

Totals in your preferred currency use [Frankfurter](https://www.frankfurter.app/) and [open.er-api.com](https://open.er-api.com/) (free). Rates are approximate.
