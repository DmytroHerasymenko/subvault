import type { LegalDocument } from "./types";
import { SUPPORT_EMAIL } from "@/lib/constants";

const LAST_UPDATED = "2025-06-25";
const CONTACT = SUPPORT_EMAIL;

export const privacyFr: LegalDocument = {
  title: "Politique de confidentialité",
  lastUpdated: LAST_UPDATED,
  intro:
    "Renulo (« nous ») est un service de suivi d'abonnements. Cette politique décrit quelles données personnelles nous traitons, pourquoi, et quels droits vous avez en vertu du RGPD et de lois similaires (y compris pour les utilisateurs en France, en Pologne et en Ukraine).",
  sections: [
    {
      heading: "1. Responsable du traitement",
      paragraphs: [
        `Opérateur du service : Renulo. Contact pour les demandes relatives à la confidentialité : ${CONTACT}.`,
      ],
    },
    {
      heading: "2. Données que nous collectons",
      paragraphs: [
        "Données de compte : adresse e-mail, identifiants d'authentification (y compris via la connexion Google, si vous l'utilisez).",
        "Données de profil : nom d'affichage (si fourni), devise préférée, préférence linguistique.",
        "Données d'abonnements que vous saisissez : noms de services, montants, devises, dates de facturation, catégories, notes.",
        "Données techniques : cookies de session nécessaires pour maintenir votre connexion (voir Cookies).",
        "Nous ne nous connectons pas à votre compte bancaire et ne scannons pas votre boîte mail.",
      ],
    },
    {
      heading: "3. Pourquoi nous utilisons vos données",
      paragraphs: [
        "Pour créer et sécuriser votre compte et fournir le suivi d'abonnements.",
        "Pour stocker et afficher vos abonnements et résumés de dépenses.",
        "Pour envoyer des e-mails transactionnels (p. ex. confirmation d'e-mail) via notre fournisseur d'authentification.",
        "Base légale (RGPD) : exécution du contrat (fourniture du service) et, le cas échéant, intérêt légitime à exploiter et sécuriser le service.",
      ],
    },
    {
      heading: "4. Où les données sont stockées",
      paragraphs: [
        "Les données sont stockées dans Supabase (base de données et authentification) et diffusées via Vercel. Les fournisseurs peuvent traiter des données dans l'UE, aux États-Unis ou dans d'autres régions conformément à leurs conditions et garanties (p. ex. clauses contractuelles types).",
      ],
    },
    {
      heading: "5. Durée de conservation des données",
      paragraphs: [
        "Compte actif : nous conservons vos données tant que votre compte existe.",
        "Après la suppression de votre compte : les données de profil et d'abonnements sont supprimées de notre base de données sans délai injustifié. Les sauvegardes de nos fournisseurs d'infrastructure peuvent conserver des copies pendant une période limitée (généralement jusqu'à quelques semaines) avant rotation automatique.",
        "Les journaux serveur et de sécurité peuvent être conservés pendant une durée limitée par nos hébergeurs pour le dépannage et la prévention des abus.",
      ],
    },
    {
      heading: "6. Cookies",
      paragraphs: [
        "Nous utilisons uniquement des cookies essentiels pour maintenir votre session de connexion. Nous n'utilisons pas de cookies publicitaires ou analytiques pour le moment. Si nous ajoutons des analyses ultérieurement, nous mettrons à jour cette politique et demanderons le consentement lorsque requis (p. ex. dans l'UE).",
      ],
    },
    {
      heading: "7. Partage avec des tiers",
      paragraphs: [
        "Nous utilisons Supabase (authentification/base de données), Vercel (hébergement) et, en option, Google (connexion). Nous ne vendons pas vos données personnelles.",
        "Les données de taux de change sont récupérées auprès d'API publiques ; aucune donnée personnelle n'est transmise à cette fin.",
      ],
    },
    {
      heading: "8. Vos droits",
      paragraphs: [
        "Vous pouvez accéder à vos données, les rectifier ou les supprimer. Vous pouvez supprimer votre compte dans les Paramètres, ce qui supprimera votre profil et vos abonnements.",
        "Vous pouvez retirer un consentement accordé, vous opposer à certains traitements et déposer une plainte auprès d'une autorité de contrôle (p. ex. la CNIL en France).",
        `Pour exercer vos droits, contactez ${CONTACT}.`,
      ],
    },
    {
      heading: "9. Enfants",
      paragraphs: [
        "Renulo ne s'adresse pas aux enfants de moins de 16 ans. Nous ne collectons pas sciemment de données concernant des enfants.",
      ],
    },
    {
      heading: "10. Modifications",
      paragraphs: [
        "Nous pouvons mettre à jour cette politique. La nouvelle version sera publiée sur cette page avec une date mise à jour.",
      ],
    },
  ],
};
