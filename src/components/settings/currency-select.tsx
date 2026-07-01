"use client";

import { Select } from "@/components/ui/select";
import { CURRENCIES } from "@/lib/constants";
import { formatCurrencyLabel } from "@/lib/currency-format";
import type { Currency } from "@/lib/types";

export function CurrencySelect({
  value,
  onChange,
  id,
  className,
  locale,
  compact,
  "aria-label": ariaLabel,
}: {
  value: Currency;
  onChange: (currency: Currency) => void | Promise<void>;
  id?: string;
  className?: string;
  locale?: string;
  /** Header mobile: ISO code only. Default shows symbol + code when locale is set. */
  compact?: boolean;
  "aria-label"?: string;
}) {
  return (
    <Select
      id={id}
      value={value}
      onChange={(e) => void onChange(e.target.value as Currency)}
      className={className}
      aria-label={ariaLabel}
    >
      {CURRENCIES.map((c) => (
        <option key={c} value={c}>
          {compact || !locale ? c : formatCurrencyLabel(c, locale)}
        </option>
      ))}
    </Select>
  );
}
