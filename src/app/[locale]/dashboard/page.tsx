import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DashboardClient } from "@/components/subscriptions/dashboard-client";
import type { Currency, Subscription } from "@/lib/types";

export default async function DashboardPage({
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

  const { data: subscriptions } = await supabase
    .from("subscriptions")
    .select("*")
    .order("created_at", { ascending: false });

  const preferredCurrency = (profile?.preferred_currency as Currency) ?? "UAH";

  return (
    <DashboardClient
      locale={locale}
      userId={user.id}
      subscriptions={(subscriptions as Subscription[]) ?? []}
      preferredCurrency={preferredCurrency}
    />
  );
}
