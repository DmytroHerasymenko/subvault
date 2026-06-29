import { getTranslations } from "next-intl/server";
import { LegalDocumentView } from "@/components/legal/legal-document";
import { getTerms } from "@/lib/legal";

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("legal");
  const doc = getTerms(locale);

  return (
    <LegalDocumentView
      doc={doc}
      lastUpdatedLabel={t("lastUpdated", { date: doc.lastUpdated })}
    />
  );
}
