import {
  formatMoneyCompact,
  formatMoneyStandard,
} from "@/lib/currency-format";
import type { Currency } from "@/lib/types";
import { cn } from "@/lib/utils";

export function MoneyAmount({
  amount,
  currency,
  locale,
  className,
}: {
  amount: number;
  currency: Currency | string;
  locale: string;
  className?: string;
}) {
  return (
    <span className={cn("tabular-nums", className)}>
      <span className="sm:hidden">{formatMoneyCompact(amount, currency, locale)}</span>
      <span className="hidden sm:inline">{formatMoneyStandard(amount, currency, locale)}</span>
    </span>
  );
}
