import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { defaultLocale, type AppLocale } from "@/i18n/config";
import { createClient } from "@/lib/supabase/server";
import { isAppLocale, resolveDefaultCurrency } from "@/lib/locale-preferences";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const signupLocale = searchParams.get("locale");
  const setup = searchParams.get("setup") === "1";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user && setup && signupLocale && isAppLocale(signupLocale)) {
        const headerStore = await headers();
        const currency = resolveDefaultCurrency(
          headerStore.get("x-vercel-ip-country"),
          signupLocale as AppLocale,
        );
        await supabase
          .from("profiles")
          .update({ locale: signupLocale, preferred_currency: currency })
          .eq("id", user.id);
      } else if (user && signupLocale && isAppLocale(signupLocale)) {
        await supabase.from("profiles").update({ locale: signupLocale }).eq("id", user.id);
      }

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("locale")
          .eq("id", user.id)
          .single();

        const locale = isAppLocale(profile?.locale ?? "") ? profile!.locale : defaultLocale;
        return NextResponse.redirect(`${origin}/${locale}/dashboard`);
      }
    }
  }

  return NextResponse.redirect(`${origin}/${defaultLocale}/login`);
}
