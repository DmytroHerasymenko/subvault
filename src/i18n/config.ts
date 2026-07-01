export const locales = ["ua", "en", "pl", "de", "cs"] as const;
export type AppLocale = (typeof locales)[number];
export const defaultLocale: AppLocale = "en";
