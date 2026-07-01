import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function monthlyAmount(amount: number, billingPeriod: "monthly" | "yearly") {
  return billingPeriod === "yearly" ? amount / 12 : amount;
}

export { formatMoney, formatMoneyCompact, formatMoneyStandard } from "@/lib/currency-format";
