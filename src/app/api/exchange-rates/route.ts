import { NextResponse } from "next/server";
import type { Currency } from "@/lib/types";

/** How many units of each currency equal 1 USD */
const FALLBACK: Record<Currency, number> = {
  USD: 1,
  EUR: 0.92,
  UAH: 41,
  PLN: 4.0,
  CZK: 23.5,
  CHF: 0.88,
};

export async function GET() {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error("fetch failed");
    const data = await res.json();
    if (data.result !== "success") throw new Error("api error");

    const rates = data.conversion_rates as Record<string, number>;
    return NextResponse.json({
      USD: 1,
      EUR: rates.EUR ?? FALLBACK.EUR,
      UAH: rates.UAH ?? FALLBACK.UAH,
      PLN: rates.PLN ?? FALLBACK.PLN,
      CZK: rates.CZK ?? FALLBACK.CZK,
      CHF: rates.CHF ?? FALLBACK.CHF,
    });
  } catch {
    return NextResponse.json(FALLBACK);
  }
}
