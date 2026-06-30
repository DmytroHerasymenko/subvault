"use client";

import { Select } from "@/components/ui/select";
import { CURRENCIES } from "@/lib/constants";
import type { Currency } from "@/lib/types";

export function CurrencySelect({
  value,
  onChange,
  id,
  className,
  "aria-label": ariaLabel,
}: {
  value: Currency;
  onChange: (currency: Currency) => void | Promise<void>;
  id?: string;
  className?: string;
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
          {c}
        </option>
      ))}
    </Select>
  );
}
