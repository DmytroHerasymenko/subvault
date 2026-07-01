import type { LegalDocument } from "./types";
import { privacyEn } from "./privacy.en";
import { privacyPl } from "./privacy.pl";
import { privacyUa } from "./privacy.ua";
import { privacyDe } from "./privacy.de";
import { privacyCs } from "./privacy.cs";
import { termsEn } from "./terms.en";
import { termsPl } from "./terms.pl";
import { termsUa } from "./terms.ua";
import { termsDe } from "./terms.de";
import { termsCs } from "./terms.cs";

const privacyByLocale: Record<string, LegalDocument> = {
  ua: privacyUa,
  en: privacyEn,
  pl: privacyPl,
  de: privacyDe,
  cs: privacyCs,
};

const termsByLocale: Record<string, LegalDocument> = {
  ua: termsUa,
  en: termsEn,
  pl: termsPl,
  de: termsDe,
  cs: termsCs,
};

export function getPrivacy(locale: string): LegalDocument {
  return privacyByLocale[locale] ?? privacyEn;
}

export function getTerms(locale: string): LegalDocument {
  return termsByLocale[locale] ?? termsEn;
}
