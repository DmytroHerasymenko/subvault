import type { LegalDocument } from "./types";
import { SUPPORT_EMAIL } from "@/lib/constants";

const LAST_UPDATED = "2025-06-25";
const CONTACT = SUPPORT_EMAIL;

export const termsDe: LegalDocument = {
  title: "Nutzungsbedingungen",
  lastUpdated: LAST_UPDATED,
  intro:
    "Diese Bedingungen regeln Ihre Nutzung von Renulo. Mit Erstellung eines Kontos oder Nutzung des Dienstes stimmen Sie diesen Bedingungen zu.",
  sections: [
    {
      heading: "1. Dienst",
      paragraphs: [
        "Renulo hilft Ihnen, Abonnements und wiederkehrende Ausgaben manuell zu verfolgen. Es ist keine Bank, kein Zahlungsdienstleister und kein Finanzberater.",
        "Summen und Währungsumrechnungen nutzen ungefähre Wechselkurse und dienen nur Informationszwecken.",
      ],
    },
    {
      heading: "2. Konto",
      paragraphs: [
        "Sie müssen korrekte Angaben machen und Ihre Zugangsdaten schützen.",
        "Sie sind für Aktivitäten unter Ihrem Konto verantwortlich.",
        "Sie können Ihr Konto jederzeit in den Einstellungen löschen.",
      ],
    },
    {
      heading: "3. Zulässige Nutzung",
      paragraphs: [
        "Missbrauchen Sie den Dienst nicht, versuchen Sie keinen unbefugten Zugriff und nutzen Sie ihn nicht für rechtswidrige Zwecke.",
        "Wir können Konten sperren oder beenden, die gegen diese Bedingungen verstoßen oder dem Dienst schaden.",
      ],
    },
    {
      heading: "4. Kostenlose und kostenpflichtige Funktionen",
      paragraphs: [
        "Renulo kann kostenlose und kostenpflichtige Tarife anbieten. Der kostenlose Tarif ist derzeit unbegrenzt. Preise und Funktionen können mit Vorankündigung geändert werden.",
      ],
    },
    {
      heading: "5. Haftungsausschluss",
      paragraphs: [
        "Der Dienst wird „wie besehen“ ohne Gewähr für unterbrechungsfreien oder fehlerfreien Betrieb bereitgestellt.",
        "Wir haften nicht für Entscheidungen, die Sie auf Basis der in der App angezeigten Informationen treffen (z. B. Kündigung eines Abos).",
      ],
    },
    {
      heading: "6. Haftungsbeschränkung",
      paragraphs: [
        "Soweit gesetzlich zulässig, haftet Renulo nicht für indirekte oder Folgeschäden. Unsere Gesamthaftung ist auf den Betrag begrenzt, den Sie uns in den zwölf Monaten vor dem Anspruch gezahlt haben (oder null bei kostenlosem Tarif).",
        "Nichts in diesen Bedingungen schränkt Rechte ein, die Ihnen nach zwingendem Verbraucherschutzrecht in Ihrem Land zustehen.",
      ],
    },
    {
      heading: "7. Änderungen",
      paragraphs: [
        "Wir können diese Bedingungen aktualisieren. Fortgesetzte Nutzung nach Änderungen gilt als Zustimmung. Wesentliche Änderungen werden, wo angemessen, mitgeteilt.",
      ],
    },
    {
      heading: "8. Kontakt",
      paragraphs: [`Fragen: ${CONTACT}.`],
    },
  ],
};
