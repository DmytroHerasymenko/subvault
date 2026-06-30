import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales, type AppLocale } from "@/i18n/config";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { DisplayCurrencyProvider } from "@/components/layout/display-currency-context";
import { createClient } from "@/lib/supabase/server";
import type { Currency } from "@/lib/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as AppLocale)) notFound();

  const messages = await getMessages();
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let preferredCurrency: Currency = "EUR";
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("preferred_currency")
      .eq("id", user.id)
      .single();
    preferredCurrency = (profile?.preferred_currency as Currency) ?? "EUR";
  }

  return (
    <NextIntlClientProvider messages={messages}>
      <DisplayCurrencyProvider userId={user?.id ?? null} initialCurrency={preferredCurrency}>
        <Header locale={locale} userEmail={user?.email} userId={user?.id} />
        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
        <Footer locale={locale} />
      </DisplayCurrencyProvider>
    </NextIntlClientProvider>
  );
}
