import { toIntlLocale } from "@/lib/intl-locale";
import type { BillingPeriod } from "@/lib/types";

/** Parse YYYY-MM-DD as a local calendar date. */
export function parseBillingDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function formatBillingDateISO(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addBillingPeriod(date: Date, billingPeriod: BillingPeriod): Date {
  const next = new Date(date);
  if (billingPeriod === "yearly") {
    next.setFullYear(next.getFullYear() + 1);
    return next;
  }

  const day = next.getDate();
  next.setMonth(next.getMonth() + 1);
  if (next.getDate() !== day) {
    next.setDate(0);
  }
  return next;
}

/** Roll forward until the billing date is today or in the future. */
export function getEffectiveNextBillingDate(
  dateStr: string | null,
  billingPeriod: BillingPeriod,
  today: Date = new Date(),
): string | null {
  if (!dateStr) return null;

  let date = parseBillingDate(dateStr);
  const ref = startOfDay(today);

  while (startOfDay(date) < ref) {
    date = addBillingPeriod(date, billingPeriod);
  }

  return formatBillingDateISO(date);
}

export function formatBillingDateDisplay(dateStr: string, locale: string): string {
  const date = parseBillingDate(dateStr);
  return new Intl.DateTimeFormat(toIntlLocale(locale), {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}
