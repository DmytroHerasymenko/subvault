import type { LegalDocument } from "./types";
import { SUPPORT_EMAIL } from "@/lib/constants";

const LAST_UPDATED = "2025-06-25";
const CONTACT = SUPPORT_EMAIL;

export const termsIt: LegalDocument = {
  title: "Termini di servizio",
  lastUpdated: LAST_UPDATED,
  intro:
    "Questi Termini regolano l'utilizzo di Renulo. Creando un account o utilizzando il servizio, accetta questi Termini.",
  sections: [
    {
      heading: "1. Servizio",
      paragraphs: [
        "Renulo la aiuta a monitorare manualmente abbonamenti e spese ricorrenti. Non è una banca, un processore di pagamenti né un consulente finanziario.",
        "Totali e conversioni valutarie utilizzano tassi di cambio approssimativi e sono solo a scopo informativo.",
      ],
    },
    {
      heading: "2. Account",
      paragraphs: [
        "Deve fornire informazioni accurate e proteggere le proprie credenziali.",
        "È responsabile dell'attività svolta con il suo account.",
        "Può eliminare il suo account in qualsiasi momento nelle Impostazioni.",
      ],
    },
    {
      heading: "3. Uso consentito",
      paragraphs: [
        "Non utilizzi il servizio in modo improprio, non tenti accessi non autorizzati e non lo usi per scopi illeciti.",
        "Possiamo sospendere o chiudere account che violano questi Termini o danneggiano il servizio.",
      ],
    },
    {
      heading: "4. Funzionalità gratuite e a pagamento",
      paragraphs: [
        "Renulo può offrire piani gratuiti e a pagamento. Il piano gratuito è attualmente illimitato. Prezzi e funzionalità possono cambiare con preavviso.",
      ],
    },
    {
      heading: "5. Esclusione di responsabilità",
      paragraphs: [
        "Il servizio è fornito «così com'è» senza garanzie di funzionamento ininterrotto o privo di errori.",
        "Non siamo responsabili delle decisioni che prende in base alle informazioni mostrate nell'app (ad es. cancellare un abbonamento).",
      ],
    },
    {
      heading: "6. Limitazione di responsabilità",
      paragraphs: [
        "Nella misura consentita dalla legge, Renulo non è responsabile per danni indiretti o consequenziali. La nostra responsabilità totale è limitata all'importo che ci ha pagato nei dodici mesi precedenti il reclamo (o zero se utilizza il piano gratuito).",
        "Nulla in questi Termini limita i diritti che le spettano ai sensi delle leggi imperative sulla protezione dei consumatori del suo paese.",
      ],
    },
    {
      heading: "7. Modifiche",
      paragraphs: [
        "Possiamo aggiornare questi Termini. L'uso continuato dopo le modifiche implica l'accettazione. Le modifiche sostanziali saranno comunicate ove appropriato.",
      ],
    },
    {
      heading: "8. Contatto",
      paragraphs: [`Domande: ${CONTACT}.`],
    },
  ],
};
