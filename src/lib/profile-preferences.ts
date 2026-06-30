import type { AppLocale } from "@/i18n/config";
import type { Currency } from "@/lib/types";

export async function fetchDetectedPreferences(): Promise<{
  locale: AppLocale;
  currency: Currency;
}> {
  const res = await fetch("/api/detect-preferences");
  if (!res.ok) {
    return { locale: "en", currency: "EUR" };
  }
  return (await res.json()) as { locale: AppLocale; currency: Currency };
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
