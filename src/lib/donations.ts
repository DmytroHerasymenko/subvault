export const MONOBANK_JAR_URL = "https://send.monobank.ua/jar/3NcHKnNiSB";
export const REVOLUT_ME_URL = "https://revolut.me/renulo";

export type DonationMethod = "monobank" | "revolut";

const DONATION_URLS: Record<DonationMethod, string> = {
  monobank: MONOBANK_JAR_URL,
  revolut: REVOLUT_ME_URL,
};

/** UA: Monobank first; other locales: Revolut first. */
export function orderedDonationMethods(locale: string): DonationMethod[] {
  if (locale === "ua") return ["monobank", "revolut"];
  return ["revolut", "monobank"];
}

export function donationUrl(method: DonationMethod): string {
  return DONATION_URLS[method];
}
