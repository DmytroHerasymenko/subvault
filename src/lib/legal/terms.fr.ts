import type { LegalDocument } from "./types";
import { SUPPORT_EMAIL } from "@/lib/constants";

const LAST_UPDATED = "2025-06-25";
const CONTACT = SUPPORT_EMAIL;

export const termsFr: LegalDocument = {
  title: "Conditions d'utilisation",
  lastUpdated: LAST_UPDATED,
  intro:
    "Ces Conditions régissent votre utilisation de Renulo. En créant un compte ou en utilisant le service, vous acceptez ces Conditions.",
  sections: [
    {
      heading: "1. Service",
      paragraphs: [
        "Renulo vous aide à suivre manuellement vos abonnements et dépenses récurrentes. Il ne s'agit pas d'une banque, d'un processeur de paiement ni d'un conseiller financier.",
        "Les totaux et les conversions de devises utilisent des taux de change approximatifs et sont fournis à titre informatif uniquement.",
      ],
    },
    {
      heading: "2. Compte",
      paragraphs: [
        "Vous devez fournir des informations exactes et protéger vos identifiants.",
        "Vous êtes responsable de l'activité effectuée sous votre compte.",
        "Vous pouvez supprimer votre compte à tout moment dans les Paramètres.",
      ],
    },
    {
      heading: "3. Utilisation acceptable",
      paragraphs: [
        "N'utilisez pas le service de manière abusive, ne tentez pas d'accès non autorisé et ne l'utilisez pas à des fins illicites.",
        "Nous pouvons suspendre ou résilier les comptes qui enfreignent ces Conditions ou nuisent au service.",
      ],
    },
    {
      heading: "4. Fonctionnalités gratuites et payantes",
      paragraphs: [
        "Renulo peut proposer des offres gratuites et payantes. L'offre gratuite est actuellement illimitée. Les tarifs et les fonctionnalités peuvent être modifiés avec préavis.",
      ],
    },
    {
      heading: "5. Clause de non-responsabilité",
      paragraphs: [
        "Le service est fourni « en l'état » sans garantie de fonctionnement ininterrompu ou sans erreur.",
        "Nous ne sommes pas responsables des décisions que vous prenez sur la base des informations affichées dans l'application (p. ex. résilier un abonnement).",
      ],
    },
    {
      heading: "6. Limitation de responsabilité",
      paragraphs: [
        "Dans la mesure permise par la loi, Renulo n'est pas responsable des dommages indirects ou consécutifs. Notre responsabilité totale est limitée au montant que vous nous avez versé au cours des douze mois précédant la réclamation (ou zéro si vous utilisez l'offre gratuite).",
        "Rien dans ces Conditions ne limite les droits dont vous disposez en vertu des lois impératives de protection des consommateurs de votre pays.",
      ],
    },
    {
      heading: "7. Modifications",
      paragraphs: [
        "Nous pouvons mettre à jour ces Conditions. L'utilisation continue après modification vaut acceptation. Les modifications importantes seront communiquées le cas échéant.",
      ],
    },
    {
      heading: "8. Contact",
      paragraphs: [`Questions : ${CONTACT}.`],
    },
  ],
};
