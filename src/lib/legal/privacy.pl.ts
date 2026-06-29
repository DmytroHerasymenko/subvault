import type { LegalDocument } from "./types";
import { SUPPORT_EMAIL } from "@/lib/constants";

const LAST_UPDATED = "2025-06-25";
const CONTACT = SUPPORT_EMAIL;

export const privacyPl: LegalDocument = {
  title: "Polityka prywatności",
  lastUpdated: LAST_UPDATED,
  intro:
    "Renulo („my”, „nas”) to usługa śledzenia subskrypcji. Niniejsza polityka wyjaśnia, jakie dane osobowe przetwarzamy, dlaczego i jakie masz prawa na mocy RODO oraz podobnych przepisów (w tym dla użytkowników w Polsce i Ukrainie).",
  sections: [
    {
      heading: "1. Administrator danych",
      paragraphs: [
        `Operator usługi: Renulo. Kontakt w sprawach prywatności: ${CONTACT}.`,
      ],
    },
    {
      heading: "2. Jakie dane zbieramy",
      paragraphs: [
        "Dane konta: adres email, identyfikatory uwierzytelniania (w tym z logowania Google, jeśli go używasz).",
        "Dane profilu: nazwa wyświetlana (jeśli podana), preferowana waluta, język interfejsu.",
        "Dane subskrypcji, które wprowadzasz: nazwy usług, kwoty, waluty, daty rozliczeń, kategorie, notatki.",
        "Dane techniczne: niezbędne pliki cookie sesji do utrzymania logowania (patrz Pliki cookie).",
        "Nie łączymy się z Twoim kontem bankowym ani nie skanujemy skrzynki email.",
      ],
    },
    {
      heading: "3. Dlaczego używamy Twoich danych",
      paragraphs: [
        "Aby utworzyć i zabezpieczyć konto oraz świadczyć usługę śledzenia subskrypcji.",
        "Aby przechowywać i wyświetlać subskrypcje oraz podsumowania wydatków.",
        "Aby wysyłać wiadomości transakcyjne (np. potwierdzenie email) przez dostawcę uwierzytelniania.",
        "Podstawa prawna (RODO): wykonanie umowy (świadczenie usługi) oraz, w stosownych przypadkach, uzasadniony interes w prowadzeniu i zabezpieczaniu usługi.",
      ],
    },
    {
      heading: "4. Gdzie przechowujemy dane",
      paragraphs: [
        "Dane są przechowywane w Supabase (baza danych i uwierzytelnianie) i udostępniane przez Vercel. Dostawcy mogą przetwarzać dane w UE, USA lub innych regionach zgodnie ze swoimi warunkami i zabezpieczeniami (np. Standardowe Klauzule Umowne).",
      ],
    },
    {
      heading: "5. Jak długo przechowujemy dane",
      paragraphs: [
        "Aktywne konto: przechowujemy dane tak długo, jak istnieje Twoje konto.",
        "Po usunięciu konta: dane profilu i subskrypcji są usuwane z naszej bazy bez zbędnej zwłoki. Kopie zapasowe u dostawców infrastruktury mogą być przechowywane przez ograniczony czas (zwykle do kilku tygodni) przed automatyczną rotacją.",
        "Logi serwera i bezpieczeństwa mogą być przechowywane przez ograniczony czas u dostawców hostingu na potrzeby diagnostyki i zapobiegania nadużyciom.",
      ],
    },
    {
      heading: "6. Pliki cookie",
      paragraphs: [
        "Używamy wyłącznie niezbędnych plików cookie do utrzymania sesji logowania. Obecnie nie używamy plików cookie reklamowych ani analitycznych. Jeśli dodamy analitykę w przyszłości, zaktualizujemy tę politykę i poprosimy o zgodę, gdzie wymagane (np. w UE).",
      ],
    },
    {
      heading: "7. Udostępnianie danych podmiotom trzecim",
      paragraphs: [
        "Korzystamy z Supabase (auth/baza danych), Vercel (hosting) i opcjonalnie Google (logowanie). Nie sprzedajemy Twoich danych osobowych.",
        "Dane kursów walut pobieramy z publicznych API; w tym celu nie wysyłamy danych osobowych.",
      ],
    },
    {
      heading: "8. Twoje prawa",
      paragraphs: [
        "Możesz uzyskać dostęp do danych, je poprawić lub usunąć. Możesz usunąć konto w Ustawieniach — to usuwa profil i subskrypcje.",
        "Możesz wycofać zgodę, gdy przetwarzanie opiera się na zgodzie, wnieść sprzeciw wobec określonego przetwarzania i złożyć skargę do organu nadzorowego (np. UODO w Polsce lub odpowiedniego organu w Twoim kraju).",
        `Aby skorzystać z praw, skontaktuj się: ${CONTACT}.`,
      ],
    },
    {
      heading: "9. Dzieci",
      paragraphs: [
        "Renulo nie jest przeznaczone dla dzieci poniżej 16 lat. Nie zbieramy świadomie danych od dzieci.",
      ],
    },
    {
      heading: "10. Zmiany",
      paragraphs: [
        "Możemy aktualizować tę politykę. Nowa wersja będzie opublikowana na tej stronie z datą aktualizacji.",
      ],
    },
  ],
};
