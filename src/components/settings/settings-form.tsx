"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { CURRENCIES } from "@/lib/constants";
import type { Currency } from "@/lib/types";

export function SettingsForm({
  userId,
  preferredCurrency,
}: {
  userId: string;
  preferredCurrency: Currency;
}) {
  const t = useTranslations("settings");
  const [currency, setCurrency] = useState(preferredCurrency);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const supabase = createClient();
    await supabase
      .from("profiles")
      .update({ preferred_currency: currency })
      .eq("id", userId);
    setLoading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <form onSubmit={handleSave} className="max-w-sm space-y-4 rounded-xl border border-border bg-card p-5">
      <h1 className="text-xl font-bold">{t("title")}</h1>
      <div>
        <Label className="mb-1 block">{t("displayCurrency")}</Label>
        <Select
          value={currency}
          onChange={(e) => setCurrency(e.target.value as Currency)}
        >
          {CURRENCIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </Select>
      </div>
      <Button type="submit" disabled={loading}>{t("save")}</Button>
      {saved && <p className="text-sm text-success">Saved!</p>}
    </form>
  );
}
