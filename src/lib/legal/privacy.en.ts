import type { LegalDocument } from "./types";
import { SUPPORT_EMAIL } from "@/lib/constants";

const LAST_UPDATED = "2025-06-25";
const CONTACT = SUPPORT_EMAIL;

export const privacyEn: LegalDocument = {
  title: "Privacy Policy",
  lastUpdated: LAST_UPDATED,
  intro:
    "Renulo (“we”, “us”) is a subscription tracking service. This policy explains what personal data we process, why, and your rights under GDPR and similar laws (including for users in Poland and Ukraine).",
  sections: [
    {
      heading: "1. Data controller",
      paragraphs: [
        `Service operator: Renulo. Contact for privacy requests: ${CONTACT}.`,
      ],
    },
    {
      heading: "2. What we collect",
      paragraphs: [
        "Account data: email address, authentication identifiers (including from Google sign-in if you use it).",
        "Profile data: display name (if provided), preferred currency, language preference.",
        "Subscription data you enter: service names, amounts, currencies, billing dates, categories, notes.",
        "Technical data: session cookies required to keep you logged in (see Cookies).",
        "We do not connect to your bank account or scan your email inbox.",
      ],
    },
    {
      heading: "3. Why we use your data",
      paragraphs: [
        "To create and secure your account and provide the subscription tracker.",
        "To store and display your subscriptions and spending summaries.",
        "To send transactional emails (e.g. email confirmation) via our auth provider.",
        "Legal basis (GDPR): contract performance (providing the service) and, where applicable, legitimate interest in operating and securing the service.",
      ],
    },
    {
      heading: "4. Where data is stored",
      paragraphs: [
        "Data is stored in Supabase (database and authentication) and served via Vercel. Providers may process data in the EU, US, or other regions according to their terms and safeguards (e.g. Standard Contractual Clauses).",
      ],
    },
    {
      heading: "5. How long we keep data",
      paragraphs: [
        "Active account: we keep your data for as long as your account exists.",
        "After you delete your account: profile and subscription data are removed from our database without undue delay. Backups held by our infrastructure providers may retain copies for a limited period (typically up to a few weeks) before automatic rotation.",
        "Server and security logs may be kept for a limited time by our hosting providers for troubleshooting and abuse prevention.",
      ],
    },
    {
      heading: "6. Cookies",
      paragraphs: [
        "We use essential cookies only to maintain your login session. We do not use advertising or analytics cookies at this time. If we add analytics later, we will update this policy and ask for consent where required (e.g. in the EU).",
      ],
    },
    {
      heading: "7. Sharing with third parties",
      paragraphs: [
        "We use Supabase (auth/database), Vercel (hosting), and optionally Google (sign-in). We do not sell your personal data.",
        "Exchange rate data is fetched from public APIs; no personal data is sent for that purpose.",
      ],
    },
    {
      heading: "8. Your rights",
      paragraphs: [
        "You may access, correct, or delete your data. You can delete your account in Settings, which removes your profile and subscriptions.",
        "You may withdraw consent where processing is consent-based, object to certain processing, and lodge a complaint with a supervisory authority (e.g. UODO in Poland, or the relevant authority in your country).",
        `To exercise rights, contact ${CONTACT}.`,
      ],
    },
    {
      heading: "9. Children",
      paragraphs: [
        "Renulo is not directed at children under 16. We do not knowingly collect data from children.",
      ],
    },
    {
      heading: "10. Changes",
      paragraphs: [
        "We may update this policy. We will post the new version on this page with an updated date.",
      ],
    },
  ],
};
