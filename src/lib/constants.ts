import type { Category, Currency } from "./types";

export const APP_NAME = "Renulo";

/** Public contact for privacy/terms and user support. */
export const SUPPORT_EMAIL = "renulo.app@gmail.com";

/** Canonical site URL — from env at build time; fallback is free Vercel subdomain. */
export const APP_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "") ||
  "https://renulo.vercel.app";

export const CURRENCIES: Currency[] = ["UAH", "USD", "EUR", "PLN"];

export const CATEGORIES: Category[] = [
  "streaming",
  "internet",
  "ai",
  "software",
  "games",
  "other",
];

export const FREE_TIER_LIMIT = 15;
