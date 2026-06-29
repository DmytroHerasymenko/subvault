import type { AppLocale } from "@/i18n/config";

const intlLocaleMap: Record<AppLocale, string> = {
  ua: "uk-UA",
  en: "en-US",
  pl: "pl-PL",
};

export function toIntlLocale(locale: string): string {
  return intlLocaleMap[locale as AppLocale] ?? "en-US";
}
