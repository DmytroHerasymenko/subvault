import { NextResponse } from "next/server";
import { headers } from "next/headers";
import {
  resolveDefaultCurrency,
  resolveDefaultLocale,
} from "@/lib/locale-preferences";

export async function GET() {
  const headerStore = await headers();
  const acceptLanguage = headerStore.get("accept-language");
  const country = headerStore.get("x-vercel-ip-country");

  const locale = resolveDefaultLocale(acceptLanguage);
  const currency = resolveDefaultCurrency(country, locale);

  return NextResponse.json({ locale, currency });
}
