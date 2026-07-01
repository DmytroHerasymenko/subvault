import type { LegalDocument } from "./types";
import { privacyEn } from "./privacy.en";
import { privacyPl } from "./privacy.pl";
import { privacyUa } from "./privacy.ua";
import { privacyDe } from "./privacy.de";
import { privacyCs } from "./privacy.cs";
import { privacyEs } from "./privacy.es";
import { privacyFr } from "./privacy.fr";
import { privacyIt } from "./privacy.it";
import { termsEn } from "./terms.en";
import { termsPl } from "./terms.pl";
import { termsUa } from "./terms.ua";
import { termsDe } from "./terms.de";
import { termsCs } from "./terms.cs";
import { termsEs } from "./terms.es";
import { termsFr } from "./terms.fr";
import { termsIt } from "./terms.it";

const privacyByLocale: Record<string, LegalDocument> = {
  ua: privacyUa,
  en: privacyEn,
  pl: privacyPl,
  de: privacyDe,
  cs: privacyCs,
  es: privacyEs,
  fr: privacyFr,
  it: privacyIt,
};

const termsByLocale: Record<string, LegalDocument> = {
  ua: termsUa,
  en: termsEn,
  pl: termsPl,
  de: termsDe,
  cs: termsCs,
  es: termsEs,
  fr: termsFr,
  it: termsIt,
};

export function getPrivacy(locale: string): LegalDocument {
  return privacyByLocale[locale] ?? privacyEn;
}

export function getTerms(locale: string): LegalDocument {
  return termsByLocale[locale] ?? termsEn;
}
