import { DonationsView } from "@/components/donations/donations-view";

export default async function DonationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return <DonationsView locale={locale} />;
}
