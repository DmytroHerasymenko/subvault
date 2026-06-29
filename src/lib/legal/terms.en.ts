import type { LegalDocument } from "./types";
import { SUPPORT_EMAIL } from "@/lib/constants";

const LAST_UPDATED = "2025-06-25";
const CONTACT = SUPPORT_EMAIL;

export const termsEn: LegalDocument = {
  title: "Terms of Service",
  lastUpdated: LAST_UPDATED,
  intro:
    "These Terms govern your use of Renulo. By creating an account or using the service, you agree to these Terms.",
  sections: [
    {
      heading: "1. Service",
      paragraphs: [
        "Renulo helps you manually track subscriptions and recurring expenses. It is not a bank, payment processor, or financial advisor.",
        "Totals and currency conversions use approximate exchange rates and are for informational purposes only.",
      ],
    },
    {
      heading: "2. Account",
      paragraphs: [
        "You must provide accurate information and keep your credentials secure.",
        "You are responsible for activity under your account.",
        "You may delete your account at any time in Settings.",
      ],
    },
    {
      heading: "3. Acceptable use",
      paragraphs: [
        "Do not misuse the service, attempt unauthorized access, or use it for unlawful purposes.",
        "We may suspend or terminate accounts that violate these Terms or harm the service.",
      ],
    },
    {
      heading: "4. Free and paid features",
      paragraphs: [
        "Renulo may offer free and paid tiers. Limits (e.g. number of subscriptions) may apply on the free plan. Pricing and features may change with notice.",
      ],
    },
    {
      heading: "5. Disclaimer",
      paragraphs: [
        "The service is provided “as is” without warranties of uninterrupted or error-free operation.",
        "We are not liable for decisions you make based on information shown in the app (e.g. cancelling a subscription).",
      ],
    },
    {
      heading: "6. Limitation of liability",
      paragraphs: [
        "To the maximum extent permitted by law, Renulo is not liable for indirect or consequential damages. Our total liability is limited to the amount you paid us in the twelve months before the claim (or zero if you use the free tier).",
        "Nothing in these Terms limits rights you have under mandatory consumer protection laws in your country.",
      ],
    },
    {
      heading: "7. Changes",
      paragraphs: [
        "We may update these Terms. Continued use after changes means acceptance. Material changes will be communicated where appropriate.",
      ],
    },
    {
      heading: "8. Contact",
      paragraphs: [`Questions: ${CONTACT}.`],
    },
  ],
};
