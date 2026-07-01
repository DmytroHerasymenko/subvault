import type { LegalDocument } from "./types";
import { SUPPORT_EMAIL } from "@/lib/constants";

const LAST_UPDATED = "2025-06-25";
const CONTACT = SUPPORT_EMAIL;

export const termsCs: LegalDocument = {
  title: "Podmínky služby",
  lastUpdated: LAST_UPDATED,
  intro:
    "Tyto podmínky upravují vaše používání Renulo. Vytvořením účtu nebo používáním služby s nimi souhlasíte.",
  sections: [
    {
      heading: "1. Služba",
      paragraphs: [
        "Renulo vám pomáhá ručně sledovat předplatná a pravidelné výdaje. Není bankou, platební bránou ani finančním poradcem.",
        "Součty a převody měn používají přibližné směnné kurzy a slouží pouze pro informaci.",
      ],
    },
    {
      heading: "2. Účet",
      paragraphs: [
        "Musíte uvádět správné údaje a chránit své přihlašovací údaje.",
        "Jste odpovědní za aktivitu pod vaším účtem.",
        "Účet můžete kdykoli smazat v Nastavení.",
      ],
    },
    {
      heading: "3. Přípustné použití",
      paragraphs: [
        "Nezneužívejte službu, nepokoušejte se o neoprávněný přístup ani ji nepoužívejte k nezákonným účelům.",
        "Můžeme pozastavit nebo ukončit účty, které porušují tyto podmínky nebo poškozují službu.",
      ],
    },
    {
      heading: "4. Bezplatné a placené funkce",
      paragraphs: [
        "Renulo může nabízet bezplatné a placené tarify. Bezplatný tarif je v současnosti neomezený. Ceny a funkce se mohou změnit s předchozím upozorněním.",
      ],
    },
    {
      heading: "5. Vyloučení odpovědnosti",
      paragraphs: [
        "Služba je poskytována „tak jak je“ bez záruky nepřerušeného nebo bezchybného provozu.",
        "Neodpovídáme za rozhodnutí, která učiníte na základě informací v aplikaci (např. zrušení předplatného).",
      ],
    },
    {
      heading: "6. Omezení odpovědnosti",
      paragraphs: [
        "V maximálním rozsahu povoleném zákonem Renulo neodpovídá za nepřímé nebo následné škody. Naše celková odpovědnost je omezena na částku, kterou jste nám zaplatili v dvanácti měsících před nárokem (nebo nula, pokud používáte bezplatný tarif).",
        "Nic v těchto podmínkách neomezuje práva, která vám přísluší podle kogentních předpisů o ochraně spotřebitele ve vaší zemi.",
      ],
    },
    {
      heading: "7. Změny",
      paragraphs: [
        "Tyto podmínky můžeme aktualizovat. Pokračující používání po změnách znamená souhlas. Podstatné změny budou v případě potřeby oznámeny.",
      ],
    },
    {
      heading: "8. Kontakt",
      paragraphs: [`Dotazy: ${CONTACT}.`],
    },
  ],
};
