import type { LegalDocument } from "./types";
import { SUPPORT_EMAIL } from "@/lib/constants";

const LAST_UPDATED = "2025-06-25";
const CONTACT = SUPPORT_EMAIL;

export const privacyIt: LegalDocument = {
  title: "Informativa sulla privacy",
  lastUpdated: LAST_UPDATED,
  intro:
    "Renulo («noi») è un servizio di monitoraggio degli abbonamenti. Questa informativa descrive quali dati personali trattiamo, perché, e quali diritti ha ai sensi del GDPR e di leggi simili (inclusi gli utenti in Italia, Polonia e Ucraina).",
  sections: [
    {
      heading: "1. Titolare del trattamento",
      paragraphs: [
        `Operatore del servizio: Renulo. Contatto per richieste sulla privacy: ${CONTACT}.`,
      ],
    },
    {
      heading: "2. Quali dati raccogliamo",
      paragraphs: [
        "Dati dell'account: indirizzo e-mail, identificatori di autenticazione (inclusi quelli dell'accesso con Google, se utilizzato).",
        "Dati del profilo: nome visualizzato (se fornito), valuta preferita, preferenza linguistica.",
        "Dati degli abbonamenti inseriti: nomi dei servizi, importi, valute, date di fatturazione, categorie, note.",
        "Dati tecnici: cookie di sessione necessari per mantenere l'accesso (vedi Cookie).",
        "Non ci connettiamo al suo conto bancario né analizziamo la sua casella di posta.",
      ],
    },
    {
      heading: "3. Perché utilizziamo i suoi dati",
      paragraphs: [
        "Per creare e proteggere il suo account e fornire il tracker degli abbonamenti.",
        "Per archiviare e mostrare i suoi abbonamenti e i riepiloghi delle spese.",
        "Per inviare e-mail transazionali (ad es. conferma e-mail) tramite il nostro provider di autenticazione.",
        "Base giuridica (GDPR): esecuzione del contratto (fornitura del servizio) e, ove applicabile, legittimo interesse a gestire e proteggere il servizio.",
      ],
    },
    {
      heading: "4. Dove vengono archiviati i dati",
      paragraphs: [
        "I dati sono archiviati in Supabase (database e autenticazione) e serviti tramite Vercel. I fornitori possono trattare dati nell'UE, negli Stati Uniti o in altre regioni secondo i loro termini e le garanzie (ad es. clausole contrattuali standard).",
      ],
    },
    {
      heading: "5. Per quanto tempo conserviamo i dati",
      paragraphs: [
        "Account attivo: conserviamo i suoi dati finché il suo account esiste.",
        "Dopo l'eliminazione dell'account: i dati del profilo e degli abbonamenti vengono rimossi dal nostro database senza indebito ritardo. I backup dei nostri fornitori di infrastruttura possono conservare copie per un periodo limitato (in genere fino a qualche settimana) prima della rotazione automatica.",
        "I log del server e di sicurezza possono essere conservati per un periodo limitato dai nostri provider di hosting per la risoluzione dei problemi e la prevenzione degli abusi.",
      ],
    },
    {
      heading: "6. Cookie",
      paragraphs: [
        "Utilizziamo solo cookie essenziali per mantenere la sessione di accesso. Al momento non utilizziamo cookie pubblicitari o di analisi. Se aggiungeremo analisi in futuro, aggiorneremo questa informativa e richiederemo il consenso ove necessario (ad es. nell'UE).",
      ],
    },
    {
      heading: "7. Condivisione con terze parti",
      paragraphs: [
        "Utilizziamo Supabase (autenticazione/database), Vercel (hosting) e, facoltativamente, Google (accesso). Non vendiamo i suoi dati personali.",
        "I dati sui tassi di cambio vengono recuperati da API pubbliche; per tale scopo non vengono inviati dati personali.",
      ],
    },
    {
      heading: "8. I suoi diritti",
      paragraphs: [
        "Può accedere, rettificare o eliminare i suoi dati. Può eliminare il suo account nelle Impostazioni, il che rimuoverà profilo e abbonamenti.",
        "Può revocare il consenso prestato, opporsi a determinati trattamenti e presentare un reclamo a un'autorità di controllo (ad es. il Garante per la protezione dei dati personali in Italia).",
        `Per esercitare i suoi diritti, contatti ${CONTACT}.`,
      ],
    },
    {
      heading: "9. Minori",
      paragraphs: [
        "Renulo non è destinato a minori di 16 anni. Non raccogliamo consapevolmente dati di minori.",
      ],
    },
    {
      heading: "10. Modifiche",
      paragraphs: [
        "Possiamo aggiornare questa informativa. La nuova versione sarà pubblicata su questa pagina con una data aggiornata.",
      ],
    },
  ],
};
