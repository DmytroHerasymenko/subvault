import type { AppLocale } from "@/i18n/config";

const intlLocaleMap: Record<AppLocale, string> = {
  ua: "uk-UA",
  en: "en-US",
  pl: "pl-PL",
  de: "de-DE",
  cs: "cs-CZ",
  es: "es-ES",
  fr: "fr-FR",
  it: "it-IT",
};

export function toIntlLocale(locale: string): string {
  return intlLocaleMap[locale as AppLocale] ?? "en-US";
}
