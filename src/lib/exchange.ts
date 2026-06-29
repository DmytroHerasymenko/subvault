import type { Currency } from "./types";

const CACHE_TTL_MS = 60 * 60 * 1000;

/**
 * How many units of each currency equal 1 USD (same as open.er-api.com format).
 * e.g. UAH ≈ 41 means 1 USD = 41 UAH
 */
const FALLBACK_RATES_PER_USD: Record<Currency, number> = {
  USD: 1,
  EUR: 0.92,
  UAH: 41,
  PLN: 4.0,
};

let cachedRates: Record<Currency, number> | null = null;
let cacheTime = 0;

async function loadRatesPerUsd(): Promise<Record<Currency, number>> {
  const now = Date.now();
  if (cachedRates && now - cacheTime < CACHE_TTL_MS) return cachedRates;

  try {
    const base =
      typeof window !== "undefined"
        ? window.location.origin
        : process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

    const res = await fetch(`${base}/api/exchange-rates`);
    if (!res.ok) throw new Error("rate fetch failed");
    const data = (await res.json()) as Record<Currency, number>;

    cachedRates = {
      USD: data.USD ?? 1,
      EUR: data.EUR ?? FALLBACK_RATES_PER_USD.EUR,
      UAH: data.UAH ?? FALLBACK_RATES_PER_USD.UAH,
      PLN: data.PLN ?? FALLBACK_RATES_PER_USD.PLN,
    };
    cacheTime = now;
    return cachedRates;
  } catch {
    cachedRates = { ...FALLBACK_RATES_PER_USD };
    cacheTime = now;
    return cachedRates;
  }
}

/** How many `to` units equal 1 `from` unit */
export async function getExchangeRate(from: Currency, to: Currency): Promise<number> {
  if (from === to) return 1;
  const rates = await loadRatesPerUsd();
  return rates[to] / rates[from];
}

export async function convertAmount(
  amount: number,
  from: Currency,
  to: Currency
): Promise<number> {
  return amount * (await getExchangeRate(from, to));
}
