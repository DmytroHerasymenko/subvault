import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SettingsForm } from "@/components/settings/settings-form";
import type { Currency } from "@/lib/types";

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect(`/${locale}/login`);

  const { data: profile } = await supabase
    .from("profiles")
    .select("preferred_currency")
    .eq("id", user.id)
    .single();

  return (
    <SettingsForm
      locale={locale}
      userId={user.id}
      userEmail={user.email ?? ""}
      preferredCurrency={(profile?.preferred_currency as Currency) ?? "UAH"}
    />
  );
}
