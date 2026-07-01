import type { LegalDocument } from "./types";
import { SUPPORT_EMAIL } from "@/lib/constants";

const LAST_UPDATED = "2025-06-25";
const CONTACT = SUPPORT_EMAIL;

export const privacyCs: LegalDocument = {
  title: "Zásady ochrany osobních údajů",
  lastUpdated: LAST_UPDATED,
  intro:
    "Renulo („my“, „nás“) je služba pro sledování předplatných. Tyto zásady vysvětlují, jaké osobní údaje zpracováváme, proč a jaká máte práva podle GDPR a podobných předpisů (včetně pro uživatele v Česku, Polsku a na Ukrajině).",
  sections: [
    {
      heading: "1. Správce údajů",
      paragraphs: [
        `Provozovatel služby: Renulo. Kontakt pro dotazy k ochraně údajů: ${CONTACT}.`,
      ],
    },
    {
      heading: "2. Jaké údaje shromažďujeme",
      paragraphs: [
        "Údaje o účtu: e-mailová adresa, identifikátory pro přihlášení (včetně přihlášení přes Google, pokud ho používáte).",
        "Profilové údaje: zobrazované jméno (pokud je uvedeno), preferovaná měna, jazyk rozhraní.",
        "Údaje o předplatných, která zadáte: názvy služeb, částky, měny, data plateb, kategorie, poznámky.",
        "Technické údaje: nezbytné session cookies pro udržení přihlášení (viz Cookies).",
        "Nepřipojujeme se k vašemu bankovnímu účtu ani neprohledáváme e-mailovou schránku.",
      ],
    },
    {
      heading: "3. Proč vaše údaje používáme",
      paragraphs: [
        "K vytvoření a zabezpečení vašeho účtu a poskytování správce předplatných.",
        "K ukládání a zobrazování vašich předplatných a souhrnů výdajů.",
        "K odesílání transakčních e-mailů (např. potvrzení e-mailu) prostřednictvím našeho poskytovatele autentizace.",
        "Právní základ (GDPR): plnění smlouvy (poskytování služby) a, kde je to vhodné, oprávněný zájem na provozu a zabezpečení služby.",
      ],
    },
    {
      heading: "4. Kde jsou údaje uloženy",
      paragraphs: [
        "Údaje jsou uloženy v Supabase (databáze a autentizace) a poskytovány přes Vercel. Poskytovatelé mohou zpracovávat údaje v EU, USA nebo jiných regionech podle svých podmínek a záruk (např. standardní smluvní doložky).",
      ],
    },
    {
      heading: "5. Jak dlouho údaje uchováváme",
      paragraphs: [
        "Aktivní účet: údaje uchováváme po dobu existence vašeho účtu.",
        "Po smazání účtu: profilové údaje a předplatná jsou z naší databáze odstraněny bez zbytečného odkladu. Zálohy našich poskytovatelů infrastruktury mohou kopie uchovávat po omezenou dobu (typicky až několik týdnů) před automatickou rotací.",
        "Serverové a bezpečnostní logy mohou být našimi poskytovateli hostingu uchovávány po omezenou dobu pro řešení problémů a prevenci zneužití.",
      ],
    },
    {
      heading: "6. Cookies",
      paragraphs: [
        "Používáme pouze nezbytné cookies pro udržení přihlášené session. V současnosti nepoužíváme reklamní ani analytické cookies. Pokud analytiku přidáme, tyto zásady aktualizujeme a vyžádáme souhlas, kde je to povinné (např. v EU).",
      ],
    },
    {
      heading: "7. Sdílení s třetími stranami",
      paragraphs: [
        "Používáme Supabase (auth/databáze), Vercel (hosting) a volitelně Google (přihlášení). Vaše osobní údaje neprodáváme.",
        "Směnné kurzy získáváme z veřejných API; pro tento účel neodesíláme osobní údaje.",
      ],
    },
    {
      heading: "8. Vaše práva",
      paragraphs: [
        "Můžete přistupovat ke svým údajům, opravit je nebo je smazat. Účet můžete smazat v Nastavení; tím se odstraní profil a předplatná.",
        "Můžete odvolat souhlas, kde je zpracování založeno na souhlasu, vznést námitku proti určitému zpracování a podat stížnost u dozorového úřadu (např. ÚOOÚ v Česku).",
        `Pro uplatnění práv nás kontaktujte na ${CONTACT}.`,
      ],
    },
    {
      heading: "9. Děti",
      paragraphs: [
        "Renulo není určeno dětem mladším 16 let. Vědomě neshromažďujeme údaje od dětí.",
      ],
    },
    {
      heading: "10. Změny",
      paragraphs: [
        "Tyto zásady můžeme aktualizovat. Novou verzi zveřejníme na této stránce s aktualizovaným datem.",
      ],
    },
  ],
};
