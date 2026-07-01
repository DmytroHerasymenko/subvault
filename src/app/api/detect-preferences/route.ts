import { NextResponse } from "next/server";
import { headers } from "next/headers";
import {
  resolveDefaultCurrency,
  resolveDefaultLocale,
} from "@/lib/locale-preferences";
import { resolveTemplateRegion } from "@/lib/service-templates";
import type { AppLocale } from "@/i18n/config";

export async function GET() {
  const headerStore = await headers();
  const acceptLanguage = headerStore.get("accept-language");
  const country = headerStore.get("x-vercel-ip-country");

  const locale = resolveDefaultLocale(acceptLanguage);
  const currency = resolveDefaultCurrency(country, locale);
  const region = resolveTemplateRegion(country, locale as AppLocale);

  return NextResponse.json({ locale, currency, region });
}
