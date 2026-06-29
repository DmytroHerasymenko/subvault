import type { LegalDocument } from "./types";
import { privacyEn } from "./privacy.en";
import { privacyUa } from "./privacy.ua";
import { termsEn } from "./terms.en";
import { termsUa } from "./terms.ua";

export function getPrivacy(locale: string): LegalDocument {
  return locale === "ua" ? privacyUa : privacyEn;
}

export function getTerms(locale: string): LegalDocument {
  return locale === "ua" ? termsUa : termsEn;
}
