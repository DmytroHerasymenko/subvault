import { locales, type AppLocale } from "@/i18n/config";
import type { Currency } from "@/lib/types";

const LOCALE_ALIASES: Record<string, AppLocale> = {
  ua: "ua",
  uk: "ua",
  en: "en",
  pl: "pl",
  de: "de",
  cs: "cs",
};

export function parseAcceptLanguage(header: string | null): AppLocale | null {
  if (!header) return null;

  for (const part of header.split(",")) {
    const tag = part.split(";")[0]?.trim().toLowerCase();
    if (!tag) continue;

    const base = tag.split("-")[0];
    const fromFull = LOCALE_ALIASES[tag];
    if (fromFull) return fromFull;
    const fromBase = LOCALE_ALIASES[base];
    if (fromBase) return fromBase;
  }

  return null;
}

export function resolveDefaultLocale(acceptLanguage: string | null): AppLocale {
  const detected = parseAcceptLanguage(acceptLanguage);
  if (detected) return detected;
  return "en";
}

export function currencyForCountry(country: string | null): Currency {
  switch (country?.toUpperCase()) {
    case "UA":
      return "UAH";
    case "PL":
      return "PLN";
    case "CZ":
      return "CZK";
    case "CH":
      return "CHF";
    case "US":
      return "USD";
    default:
      return "EUR";
  }
}

export function currencyForLocale(locale: AppLocale): Currency {
  switch (locale) {
    case "ua":
      return "UAH";
    case "pl":
      return "PLN";
    case "cs":
      return "CZK";
    default:
      return "EUR";
  }
}

/** Country (Vercel geo) first, then locale mapping, then EUR. */
export function resolveDefaultCurrency(
  country: string | null,
  locale: AppLocale,
): Currency {
  if (country) return currencyForCountry(country);
  return currencyForLocale(locale);
}

export function isAppLocale(value: string): value is AppLocale {
  return locales.includes(value as AppLocale);
}
