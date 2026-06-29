import { getTranslations } from "next-intl/server";
import { LegalDocumentView } from "@/components/legal/legal-document";
import { getPrivacy } from "@/lib/legal";

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("legal");
  const doc = getPrivacy(locale);

  return (
    <LegalDocumentView
      doc={doc}
      lastUpdatedLabel={t("lastUpdated", { date: doc.lastUpdated })}
    />
  );
}
