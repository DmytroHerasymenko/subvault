"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { createClient } from "@/lib/supabase/client";
import type { Currency } from "@/lib/types";

type DisplayCurrencyContextValue = {
  currency: Currency;
  setCurrency: (currency: Currency) => Promise<void>;
};

const DisplayCurrencyContext = createContext<DisplayCurrencyContextValue | null>(null);

export function DisplayCurrencyProvider({
  userId,
  initialCurrency,
  children,
}: {
  userId: string | null;
  initialCurrency: Currency;
  children: ReactNode;
}) {
  const [currency, setCurrencyState] = useState<Currency>(initialCurrency);

  useEffect(() => {
    setCurrencyState(initialCurrency);
  }, [initialCurrency]);

  async function setCurrency(next: Currency) {
    setCurrencyState(next);
    if (!userId) return;
    const supabase = createClient();
    await supabase.from("profiles").update({ preferred_currency: next }).eq("id", userId);
  }

  return (
    <DisplayCurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </DisplayCurrencyContext.Provider>
  );
}

export function useDisplayCurrency() {
  const ctx = useContext(DisplayCurrencyContext);
  if (!ctx) {
    throw new Error("useDisplayCurrency must be used within DisplayCurrencyProvider");
  }
  return ctx;
}
