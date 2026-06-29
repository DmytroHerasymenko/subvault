import type { Category, Currency } from "./types";

export const APP_NAME = "Renulo";

/** Canonical site URL — from env at build time; fallback is free Vercel subdomain. */
export const APP_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "") ||
  "https://renulo.vercel.app";

export const CURRENCIES: Currency[] = ["UAH", "USD", "EUR"];

export const CATEGORIES: Category[] = [
  "streaming",
  "internet",
  "ai",
  "software",
  "games",
  "other",
];

export const SERVICE_TEMPLATES: Array<{
  name: string;
  category: Category;
  amount: number;
  currency: Currency;
  billing_period: "monthly" | "yearly";
}> = [
  { name: "Netflix", category: "streaming", amount: 15, currency: "USD", billing_period: "monthly" },
  { name: "YouTube Premium", category: "streaming", amount: 14, currency: "USD", billing_period: "monthly" },
  { name: "Spotify", category: "streaming", amount: 11, currency: "USD", billing_period: "monthly" },
  { name: "Disney+", category: "streaming", amount: 8, currency: "USD", billing_period: "monthly" },
  { name: "Apple TV+", category: "streaming", amount: 10, currency: "USD", billing_period: "monthly" },
  { name: "ChatGPT Plus", category: "ai", amount: 20, currency: "USD", billing_period: "monthly" },
  { name: "Google Gemini", category: "ai", amount: 20, currency: "USD", billing_period: "monthly" },
  { name: "Claude Pro", category: "ai", amount: 20, currency: "USD", billing_period: "monthly" },
  { name: "Microsoft 365", category: "software", amount: 7, currency: "USD", billing_period: "monthly" },
  { name: "Adobe Creative Cloud", category: "software", amount: 55, currency: "USD", billing_period: "monthly" },
  { name: "PlayStation Plus", category: "games", amount: 10, currency: "USD", billing_period: "monthly" },
  { name: "Xbox Game Pass", category: "games", amount: 15, currency: "USD", billing_period: "monthly" },
  { name: "Internet", category: "internet", amount: 300, currency: "UAH", billing_period: "monthly" },
  { name: "Mobile plan", category: "internet", amount: 200, currency: "UAH", billing_period: "monthly" },
];

export const FREE_TIER_LIMIT = 15;
