import type { AppLocale } from "./config";

/** UI labels and flag emoji per locale (locale code ≠ country, but flags aid recognition). */
export const localeMeta: Record<AppLocale, { label: string; flag: string }> = {
  ua: { label: "Українська", flag: "🇺🇦" },
  en: { label: "English", flag: "🇬🇧" },
  pl: { label: "Polski", flag: "🇵🇱" },
  de: { label: "Deutsch", flag: "🇩🇪" },
  cs: { label: "Čeština", flag: "🇨🇿" },
};

export function formatLocaleOption(locale: AppLocale) {
  const { flag, label } = localeMeta[locale];
  return `${flag} ${label}`;
}

export function formatLocaleOptionShort(locale: AppLocale) {
  const { flag } = localeMeta[locale];
  return `${flag} ${locale.toUpperCase()}`;
}
