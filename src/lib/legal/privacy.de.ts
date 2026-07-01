import type { LegalDocument } from "./types";
import { SUPPORT_EMAIL } from "@/lib/constants";

const LAST_UPDATED = "2025-06-25";
const CONTACT = SUPPORT_EMAIL;

export const privacyDe: LegalDocument = {
  title: "Datenschutzerklärung",
  lastUpdated: LAST_UPDATED,
  intro:
    "Renulo („wir“, „uns“) ist ein Dienst zum Verfolgen von Abonnements. Diese Erklärung beschreibt, welche personenbezogenen Daten wir verarbeiten, warum, und welche Rechte Sie nach DSGVO und ähnlichen Gesetzen haben (einschließlich für Nutzer in Deutschland, Polen und der Ukraine).",
  sections: [
    {
      heading: "1. Verantwortlicher",
      paragraphs: [
        `Betreiber des Dienstes: Renulo. Kontakt für Datenschutzanfragen: ${CONTACT}.`,
      ],
    },
    {
      heading: "2. Welche Daten wir erheben",
      paragraphs: [
        "Kontodaten: E-Mail-Adresse, Authentifizierungskennungen (einschließlich bei Google-Anmeldung, falls genutzt).",
        "Profildaten: Anzeigename (falls angegeben), bevorzugte Währung, Spracheinstellung.",
        "Von Ihnen eingegebene Abo-Daten: Dienstnamen, Beträge, Währungen, Abrechnungsdaten, Kategorien, Notizen.",
        "Technische Daten: Sitzungs-Cookies, die für die Anmeldung erforderlich sind (siehe Cookies).",
        "Wir verbinden uns nicht mit Ihrem Bankkonto und scannen Ihr E-Mail-Postfach nicht.",
      ],
    },
    {
      heading: "3. Warum wir Ihre Daten nutzen",
      paragraphs: [
        "Zur Erstellung und Absicherung Ihres Kontos und Bereitstellung des Abo-Trackers.",
        "Zur Speicherung und Anzeige Ihrer Abos und Ausgabenübersichten.",
        "Zum Versand transaktionaler E-Mails (z. B. E-Mail-Bestätigung) über unseren Auth-Anbieter.",
        "Rechtsgrundlage (DSGVO): Vertragserfüllung (Bereitstellung des Dienstes) und, wo anwendbar, berechtigtes Interesse am Betrieb und Schutz des Dienstes.",
      ],
    },
    {
      heading: "4. Wo Daten gespeichert werden",
      paragraphs: [
        "Daten werden in Supabase (Datenbank und Authentifizierung) gespeichert und über Vercel bereitgestellt. Anbieter können Daten in der EU, den USA oder anderen Regionen gemäß ihren Bedingungen und Schutzmaßnahmen (z. B. Standardvertragsklauseln) verarbeiten.",
      ],
    },
    {
      heading: "5. Wie lange wir Daten aufbewahren",
      paragraphs: [
        "Aktives Konto: Wir bewahren Ihre Daten auf, solange Ihr Konto besteht.",
        "Nach Löschung Ihres Kontos: Profil- und Abo-Daten werden ohne unangemessene Verzögerung aus unserer Datenbank entfernt. Backups unserer Infrastrukturanbieter können Kopien für eine begrenzte Zeit (typischerweise bis zu einigen Wochen) vor automatischer Rotation behalten.",
        "Server- und Sicherheitsprotokolle können von unseren Hosting-Anbietern für begrenzte Zeit zu Fehlerbehebung und Missbrauchsprävention aufbewahrt werden.",
      ],
    },
    {
      heading: "6. Cookies",
      paragraphs: [
        "Wir verwenden nur essenzielle Cookies zur Aufrechterhaltung Ihrer Anmeldesitzung. Derzeit nutzen wir keine Werbe- oder Analyse-Cookies. Falls wir später Analysen hinzufügen, aktualisieren wir diese Erklärung und holen die erforderliche Einwilligung ein (z. B. in der EU).",
      ],
    },
    {
      heading: "7. Weitergabe an Dritte",
      paragraphs: [
        "Wir nutzen Supabase (Auth/Datenbank), Vercel (Hosting) und optional Google (Anmeldung). Wir verkaufen Ihre personenbezogenen Daten nicht.",
        "Wechselkursdaten werden von öffentlichen APIs abgerufen; dafür werden keine personenbezogenen Daten übermittelt.",
      ],
    },
    {
      heading: "8. Ihre Rechte",
      paragraphs: [
        "Sie können Ihre Daten einsehen, berichtigen oder löschen. Sie können Ihr Konto in den Einstellungen löschen; dabei werden Profil und Abos entfernt.",
        "Sie können eine erteilte Einwilligung widerrufen, bestimmter Verarbeitung widersprechen und Beschwerde bei einer Aufsichtsbehörde einlegen (z. B. beim Landesdatenschutzbeauftragten in Deutschland).",
        `Zur Ausübung Ihrer Rechte kontaktieren Sie ${CONTACT}.`,
      ],
    },
    {
      heading: "9. Kinder",
      paragraphs: [
        "Renulo richtet sich nicht an Kinder unter 16 Jahren. Wir erheben wissentlich keine Daten von Kindern.",
      ],
    },
    {
      heading: "10. Änderungen",
      paragraphs: [
        "Wir können diese Erklärung aktualisieren. Die neue Version wird auf dieser Seite mit aktualisiertem Datum veröffentlicht.",
      ],
    },
  ],
};
