import type { LegalDocument } from "./types";
import { SUPPORT_EMAIL } from "@/lib/constants";

const LAST_UPDATED = "2025-06-25";
const CONTACT = SUPPORT_EMAIL;

export const termsPl: LegalDocument = {
  title: "Regulamin",
  lastUpdated: LAST_UPDATED,
  intro:
    "Niniejszy Regulamin określa zasady korzystania z Renulo. Tworzenie konta lub korzystanie z usługi oznacza akceptację Regulaminu.",
  sections: [
    {
      heading: "1. Usługa",
      paragraphs: [
        "Renulo pomaga ręcznie śledzić subskrypcje i wydatki cykliczne. Nie jest bankiem, procesorem płatności ani doradcą finansowym.",
        "Sumy i przewalutowania używają przybliżonych kursów walut i mają charakter wyłącznie informacyjny.",
      ],
    },
    {
      heading: "2. Konto",
      paragraphs: [
        "Musisz podać prawdziwe informacje i chronić dane logowania.",
        "Ponosisz odpowiedzialność za działania na swoim koncie.",
        "Możesz usunąć konto w dowolnym momencie w Ustawieniach.",
      ],
    },
    {
      heading: "3. Dozwolone korzystanie",
      paragraphs: [
        "Nie wykorzystuj usługi w sposób niewłaściwy, nie próbuj uzyskać nieautoryzowanego dostępu ani używać jej do celów niezgodnych z prawem.",
        "Możemy zawiesić lub usunąć konta naruszające Regulamin lub szkodzące usłudze.",
      ],
    },
    {
      heading: "4. Funkcje darmowe i płatne",
      paragraphs: [
        "Renulo może oferować plany darmowe i płatne. W planie darmowym mogą obowiązywać limity (np. liczba subskrypcji). Ceny i funkcje mogą się zmieniać z odpowiednim wyprzedzeniem.",
      ],
    },
    {
      heading: "5. Wyłączenie odpowiedzialności",
      paragraphs: [
        "Usługa jest świadczona „w stanie obecnym” bez gwarancji nieprzerwanego lub bezbłędnego działania.",
        "Nie ponosimy odpowiedzialności za decyzje podejmowane na podstawie informacji w aplikacji (np. anulowanie subskrypcji).",
      ],
    },
    {
      heading: "6. Ograniczenie odpowiedzialności",
      paragraphs: [
        "W maksymalnym zakresie dozwolonym przez prawo Renulo nie ponosi odpowiedzialności za szkody pośrednie lub wynikowe. Łączna odpowiedzialność jest ograniczona do kwoty opłaconej nam w ciągu dwunastu miesięcy przed roszczeniem (lub zero, jeśli korzystasz z planu darmowego).",
        "Żaden postanowienie Regulaminu ogranicza praw wynikających z obowiązujących przepisów o ochronie konsumentów w Twoim kraju.",
      ],
    },
    {
      heading: "7. Zmiany",
      paragraphs: [
        "Możemy aktualizować Regulamin. Dalsze korzystanie po zmianach oznacza akceptację. Istotne zmiany będą komunikowane w odpowiednim zakresie.",
      ],
    },
    {
      heading: "8. Kontakt",
      paragraphs: [`Pytania: ${CONTACT}.`],
    },
  ],
};
