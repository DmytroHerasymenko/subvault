export const locales = ["ua", "en", "pl"] as const;
export type AppLocale = (typeof locales)[number];
export const defaultLocale: AppLocale = "ua";
