import { toIntlLocale } from "@/lib/intl-locale";
import type { Currency } from "@/lib/types";

/** Single source of truth — extend when adding currencies (also update Currency type). */
export const SUPPORTED_CURRENCIES = ["UAH", "USD", "EUR", "PLN", "CZK", "CHF", "GBP"] as const satisfies readonly Currency[];

export function isCurrency(value: string): value is Currency {
  return (SUPPORTED_CURRENCIES as readonly string[]).includes(value);
}

function asCurrency(currency: string): Currency {
  return isCurrency(currency) ? currency : "EUR";
}

function formatParts(
  amount: number,
  currency: Currency,
  appLocale: string,
  currencyDisplay: Intl.NumberFormatOptions["currencyDisplay"],
): Intl.NumberFormatPart[] {
  return new Intl.NumberFormat(toIntlLocale(appLocale), {
    style: "currency",
    currency,
    currencyDisplay,
    maximumFractionDigits: 2,
  }).formatToParts(amount);
}

/** Mobile: narrow symbol only (e.g. $42.25, 280,00 ₴). */
export function formatMoneyCompact(
  amount: number,
  currency: Currency | string,
  appLocale: string,
): string {
  return formatParts(amount, asCurrency(currency), appLocale, "narrowSymbol")
    .map((part) => part.value)
    .join("")
    .replace(/\s+/g, " ")
    .trim();
}

/** Desktop: symbol + ISO code (e.g. $42.25 USD, 280,00 ₴ UAH). */
export function formatMoneyStandard(
  amount: number,
  currency: Currency | string,
  appLocale: string,
): string {
  const code = asCurrency(currency);
  const formatted = formatParts(amount, code, appLocale, "symbol")
    .map((part) => part.value)
    .join("")
    .replace(/\s+/g, " ")
    .trim();

  if (new RegExp(`\\b${code}\\b`, "i").test(formatted)) {
    return formatted;
  }

  return `${formatted} ${code}`;
}

/** Default formatting — same as standard (desktop-oriented). */
export function formatMoney(
  amount: number,
  currency: Currency | string,
  appLocale: string,
): string {
  return formatMoneyStandard(amount, currency, appLocale);
}

export function getCurrencySymbol(currency: Currency, appLocale: string): string {
  const symbol = formatParts(0, currency, appLocale, "narrowSymbol").find(
    (part) => part.type === "currency",
  )?.value;

  return symbol?.trim() || currency;
}

/** Select labels: symbol + code where helpful (e.g. "$ USD"). */
export function formatCurrencyLabel(currency: Currency, appLocale: string): string {
  const symbol = getCurrencySymbol(currency, appLocale);
  if (symbol.toUpperCase() === currency) {
    return currency;
  }
  return `${symbol} ${currency}`;
}
