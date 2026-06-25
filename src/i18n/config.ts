export const locales = ["uk", "en"] as const;
export type AppLocale = (typeof locales)[number];
export const defaultLocale: AppLocale = "uk";
