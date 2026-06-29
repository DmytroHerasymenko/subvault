import type { LegalDocument } from "./types";
import { privacyEn } from "./privacy.en";
import { privacyPl } from "./privacy.pl";
import { privacyUa } from "./privacy.ua";
import { termsEn } from "./terms.en";
import { termsPl } from "./terms.pl";
import { termsUa } from "./terms.ua";

const privacyByLocale: Record<string, LegalDocument> = {
  ua: privacyUa,
  en: privacyEn,
  pl: privacyPl,
};

const termsByLocale: Record<string, LegalDocument> = {
  ua: termsUa,
  en: termsEn,
  pl: termsPl,
};

export function getPrivacy(locale: string): LegalDocument {
  return privacyByLocale[locale] ?? privacyEn;
}

export function getTerms(locale: string): LegalDocument {
  return termsByLocale[locale] ?? termsEn;
}
