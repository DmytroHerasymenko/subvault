"use client";

import { Select } from "@/components/ui/select";
import { CURRENCIES } from "@/lib/constants";
import type { Currency } from "@/lib/types";

export function CurrencySelect({
  value,
  onChange,
  id,
  className,
}: {
  value: Currency;
  onChange: (currency: Currency) => void;
  id?: string;
  className?: string;
}) {
  return (
    <Select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value as Currency)}
      className={className}
    >
      {CURRENCIES.map((c) => (
        <option key={c} value={c}>
          {c}
        </option>
      ))}
    </Select>
  );
}
