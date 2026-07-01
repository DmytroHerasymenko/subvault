import type { AppLocale } from "@/i18n/config";
import type { Category, Currency } from "@/lib/types";

export type TemplateRegion = "us" | "eu" | "ua" | "pl" | "cz" | "ch";

export type ServiceTemplate = {
  name: string;
  category: Category;
  amount: number;
  currency: Currency;
  billing_period: "monthly" | "yearly";
};

const EU_COUNTRY_CODES = new Set([
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU",
  "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PT", "RO", "SK", "SI", "ES", "SE",
  "IS", "LI", "NO", "CH", "GB",
]);

const US_TEMPLATES: ServiceTemplate[] = [
  { name: "Netflix", category: "streaming", amount: 20, currency: "USD", billing_period: "monthly" },
  { name: "YouTube Premium", category: "streaming", amount: 16, currency: "USD", billing_period: "monthly" },
  { name: "Spotify", category: "streaming", amount: 13, currency: "USD", billing_period: "monthly" },
  { name: "Disney+", category: "streaming", amount: 10, currency: "USD", billing_period: "monthly" },
  { name: "Apple TV+", category: "streaming", amount: 10, currency: "USD", billing_period: "monthly" },
  { name: "ChatGPT Plus", category: "ai", amount: 20, currency: "USD", billing_period: "monthly" },
  { name: "Google Gemini", category: "ai", amount: 20, currency: "USD", billing_period: "monthly" },
  { name: "Claude Pro", category: "ai", amount: 20, currency: "USD", billing_period: "monthly" },
  { name: "Microsoft 365", category: "software", amount: 10, currency: "USD", billing_period: "monthly" },
  { name: "Adobe Creative Cloud", category: "software", amount: 60, currency: "USD", billing_period: "monthly" },
  { name: "PlayStation Plus", category: "games", amount: 10, currency: "USD", billing_period: "monthly" },
  { name: "Xbox Game Pass", category: "games", amount: 17, currency: "USD", billing_period: "monthly" },
];

const EU_TEMPLATES: ServiceTemplate[] = [
  { name: "Netflix", category: "streaming", amount: 15, currency: "EUR", billing_period: "monthly" },
  { name: "YouTube Premium", category: "streaming", amount: 14, currency: "EUR", billing_period: "monthly" },
  { name: "Spotify", category: "streaming", amount: 12, currency: "EUR", billing_period: "monthly" },
  { name: "Disney+", category: "streaming", amount: 9, currency: "EUR", billing_period: "monthly" },
  { name: "Apple TV+", category: "streaming", amount: 10, currency: "EUR", billing_period: "monthly" },
  { name: "ChatGPT Plus", category: "ai", amount: 20, currency: "EUR", billing_period: "monthly" },
  { name: "Google Gemini", category: "ai", amount: 20, currency: "EUR", billing_period: "monthly" },
  { name: "Claude Pro", category: "ai", amount: 20, currency: "EUR", billing_period: "monthly" },
  { name: "Microsoft 365", category: "software", amount: 10, currency: "EUR", billing_period: "monthly" },
  { name: "Adobe Creative Cloud", category: "software", amount: 60, currency: "EUR", billing_period: "monthly" },
  { name: "PlayStation Plus", category: "games", amount: 10, currency: "EUR", billing_period: "monthly" },
  { name: "Xbox Game Pass", category: "games", amount: 17, currency: "EUR", billing_period: "monthly" },
  { name: "Internet", category: "internet", amount: 45, currency: "EUR", billing_period: "monthly" },
  { name: "Mobile plan", category: "internet", amount: 25, currency: "EUR", billing_period: "monthly" },
];

const UA_TEMPLATES: ServiceTemplate[] = [
  { name: "Netflix", category: "streaming", amount: 280, currency: "UAH", billing_period: "monthly" },
  { name: "YouTube Premium", category: "streaming", amount: 120, currency: "UAH", billing_period: "monthly" },
  { name: "Spotify", category: "streaming", amount: 99, currency: "UAH", billing_period: "monthly" },
  { name: "Disney+", category: "streaming", amount: 99, currency: "UAH", billing_period: "monthly" },
  { name: "Apple TV+", category: "streaming", amount: 99, currency: "UAH", billing_period: "monthly" },
  { name: "ChatGPT Plus", category: "ai", amount: 20, currency: "USD", billing_period: "monthly" },
  { name: "Google Gemini", category: "ai", amount: 20, currency: "USD", billing_period: "monthly" },
  { name: "Claude Pro", category: "ai", amount: 20, currency: "USD", billing_period: "monthly" },
  { name: "Microsoft 365", category: "software", amount: 350, currency: "UAH", billing_period: "monthly" },
  { name: "Adobe Creative Cloud", category: "software", amount: 2200, currency: "UAH", billing_period: "monthly" },
  { name: "PlayStation Plus", category: "games", amount: 350, currency: "UAH", billing_period: "monthly" },
  { name: "Xbox Game Pass", category: "games", amount: 500, currency: "UAH", billing_period: "monthly" },
  { name: "Internet", category: "internet", amount: 400, currency: "UAH", billing_period: "monthly" },
  { name: "Mobile plan", category: "internet", amount: 250, currency: "UAH", billing_period: "monthly" },
];

const PL_TEMPLATES: ServiceTemplate[] = [
  { name: "Netflix", category: "streaming", amount: 49, currency: "PLN", billing_period: "monthly" },
  { name: "YouTube Premium", category: "streaming", amount: 40, currency: "PLN", billing_period: "monthly" },
  { name: "Spotify", category: "streaming", amount: 23, currency: "PLN", billing_period: "monthly" },
  { name: "Disney+", category: "streaming", amount: 29, currency: "PLN", billing_period: "monthly" },
  { name: "Apple TV+", category: "streaming", amount: 35, currency: "PLN", billing_period: "monthly" },
  { name: "ChatGPT Plus", category: "ai", amount: 80, currency: "PLN", billing_period: "monthly" },
  { name: "Google Gemini", category: "ai", amount: 80, currency: "PLN", billing_period: "monthly" },
  { name: "Claude Pro", category: "ai", amount: 80, currency: "PLN", billing_period: "monthly" },
  { name: "Microsoft 365", category: "software", amount: 40, currency: "PLN", billing_period: "monthly" },
  { name: "Adobe Creative Cloud", category: "software", amount: 250, currency: "PLN", billing_period: "monthly" },
  { name: "PlayStation Plus", category: "games", amount: 50, currency: "PLN", billing_period: "monthly" },
  { name: "Xbox Game Pass", category: "games", amount: 65, currency: "PLN", billing_period: "monthly" },
  { name: "Internet", category: "internet", amount: 70, currency: "PLN", billing_period: "monthly" },
  { name: "Mobile plan", category: "internet", amount: 50, currency: "PLN", billing_period: "monthly" },
];

const CZ_TEMPLATES: ServiceTemplate[] = [
  { name: "Netflix", category: "streaming", amount: 259, currency: "CZK", billing_period: "monthly" },
  { name: "YouTube Premium", category: "streaming", amount: 199, currency: "CZK", billing_period: "monthly" },
  { name: "Spotify", category: "streaming", amount: 169, currency: "CZK", billing_period: "monthly" },
  { name: "Disney+", category: "streaming", amount: 199, currency: "CZK", billing_period: "monthly" },
  { name: "Apple TV+", category: "streaming", amount: 229, currency: "CZK", billing_period: "monthly" },
  { name: "ChatGPT Plus", category: "ai", amount: 480, currency: "CZK", billing_period: "monthly" },
  { name: "Google Gemini", category: "ai", amount: 480, currency: "CZK", billing_period: "monthly" },
  { name: "Claude Pro", category: "ai", amount: 480, currency: "CZK", billing_period: "monthly" },
  { name: "Microsoft 365", category: "software", amount: 269, currency: "CZK", billing_period: "monthly" },
  { name: "Adobe Creative Cloud", category: "software", amount: 1500, currency: "CZK", billing_period: "monthly" },
  { name: "PlayStation Plus", category: "games", amount: 299, currency: "CZK", billing_period: "monthly" },
  { name: "Xbox Game Pass", category: "games", amount: 449, currency: "CZK", billing_period: "monthly" },
  { name: "Internet", category: "internet", amount: 599, currency: "CZK", billing_period: "monthly" },
  { name: "Mobile plan", category: "internet", amount: 399, currency: "CZK", billing_period: "monthly" },
];

const CH_TEMPLATES: ServiceTemplate[] = [
  { name: "Netflix", category: "streaming", amount: 18, currency: "CHF", billing_period: "monthly" },
  { name: "YouTube Premium", category: "streaming", amount: 16, currency: "CHF", billing_period: "monthly" },
  { name: "Spotify", category: "streaming", amount: 13, currency: "CHF", billing_period: "monthly" },
  { name: "Disney+", category: "streaming", amount: 13, currency: "CHF", billing_period: "monthly" },
  { name: "Apple TV+", category: "streaming", amount: 12, currency: "CHF", billing_period: "monthly" },
  { name: "ChatGPT Plus", category: "ai", amount: 20, currency: "CHF", billing_period: "monthly" },
  { name: "Google Gemini", category: "ai", amount: 20, currency: "CHF", billing_period: "monthly" },
  { name: "Claude Pro", category: "ai", amount: 20, currency: "CHF", billing_period: "monthly" },
  { name: "Microsoft 365", category: "software", amount: 10, currency: "CHF", billing_period: "monthly" },
  { name: "Adobe Creative Cloud", category: "software", amount: 60, currency: "CHF", billing_period: "monthly" },
  { name: "PlayStation Plus", category: "games", amount: 10, currency: "CHF", billing_period: "monthly" },
  { name: "Xbox Game Pass", category: "games", amount: 17, currency: "CHF", billing_period: "monthly" },
  { name: "Internet", category: "internet", amount: 49, currency: "CHF", billing_period: "monthly" },
  { name: "Mobile plan", category: "internet", amount: 29, currency: "CHF", billing_period: "monthly" },
];

export function resolveTemplateRegion(
  country: string | null,
  locale: AppLocale,
): TemplateRegion {
  const code = country?.toUpperCase();
  if (code === "UA") return "ua";
  if (code === "PL") return "pl";
  if (code === "US") return "us";
  if (code === "CZ") return "cz";
  if (code === "CH") return "ch";
  if (code && EU_COUNTRY_CODES.has(code)) return "eu";

  if (locale === "ua") return "ua";
  if (locale === "pl") return "pl";
  if (locale === "cs") return "cz";

  return "eu";
}

export function getServiceTemplates(region: TemplateRegion): ServiceTemplate[] {
  switch (region) {
    case "ua":
      return UA_TEMPLATES;
    case "pl":
      return PL_TEMPLATES;
    case "cz":
      return CZ_TEMPLATES;
    case "ch":
      return CH_TEMPLATES;
    case "us":
      return US_TEMPLATES;
    default:
      return EU_TEMPLATES;
  }
}
