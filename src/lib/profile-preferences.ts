import type { AppLocale } from "@/i18n/config";
import type { Currency } from "@/lib/types";
import type { TemplateRegion } from "@/lib/service-templates";

export async function fetchDetectedPreferences(): Promise<{
  locale: AppLocale;
  currency: Currency;
  region: TemplateRegion;
}> {
  const res = await fetch("/api/detect-preferences");
  if (!res.ok) {
    return { locale: "en", currency: "EUR", region: "eu" };
  }
  return (await res.json()) as {
    locale: AppLocale;
    currency: Currency;
    region: TemplateRegion;
  };
}

export async function saveProfilePreferences(
  supabase: ReturnType<typeof import("@/lib/supabase/client").createClient>,
  userId: string,
  locale: string,
  currency: Currency,
) {
  await supabase
    .from("profiles")
    .update({ locale, preferred_currency: currency })
    .eq("id", userId);
}
