"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CurrencySelect } from "@/components/settings/currency-select";
import { CURRENCIES } from "@/lib/constants";
import type { Currency } from "@/lib/types";

export function SettingsForm({
  locale,
  userId,
  userEmail,
  preferredCurrency,
}: {
  locale: string;
  userId: string;
  userEmail: string;
  preferredCurrency: Currency;
}) {
  const t = useTranslations("settings");
  const router = useRouter();
  const [currency, setCurrency] = useState(preferredCurrency);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

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

  async function handleDeleteAccount() {
    setDeleteError(null);
    setDeleteLoading(true);
    try {
      const res = await fetch("/api/account/delete", { method: "POST" });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setDeleteError(data.error ?? t("deleteError"));
        return;
      }
      router.push(`/${locale}`);
      router.refresh();
    } catch {
      setDeleteError(t("deleteError"));
    } finally {
      setDeleteLoading(false);
    }
  }

  const canDelete = deleteConfirm === "DELETE";

  return (
    <div className="max-w-sm space-y-8">
      <form onSubmit={handleSave} className="space-y-4 rounded-xl border border-border bg-card p-5">
        <h1 className="text-xl font-bold">{t("title")}</h1>
        <div>
          <Label className="mb-1 block">{t("displayCurrency")}</Label>
          <CurrencySelect value={currency} onChange={setCurrency} />
        </div>
        <Button type="submit" disabled={loading}>{t("save")}</Button>
        {saved && <p className="text-sm text-success">{t("saved")}</p>}
      </form>

      <section className="rounded-xl border border-destructive/30 bg-card p-5">
        <h2 className="text-lg font-semibold text-destructive">{t("deleteTitle")}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{t("deleteDesc")}</p>
        {!deleteOpen ? (
          <Button
            type="button"
            variant="outline"
            className="mt-4 border-destructive/50 text-destructive hover:bg-destructive/10"
            onClick={() => setDeleteOpen(true)}
          >
            {t("deleteButton")}
          </Button>
        ) : (
          <div className="mt-4 space-y-3">
            <p className="text-sm text-muted-foreground">{t("deleteConfirmHint", { email: userEmail })}</p>
            <Input
              value={deleteConfirm}
              onChange={(e) => setDeleteConfirm(e.target.value)}
              placeholder={t("deleteConfirmPlaceholder")}
              autoComplete="off"
            />
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                disabled={deleteLoading}
                onClick={() => {
                  setDeleteOpen(false);
                  setDeleteConfirm("");
                  setDeleteError(null);
                }}
              >
                {t("deleteCancel")}
              </Button>
              <Button
                type="button"
                disabled={!canDelete || deleteLoading}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                onClick={handleDeleteAccount}
              >
                {deleteLoading ? t("deleteLoading") : t("deleteConfirmButton")}
              </Button>
            </div>
            {deleteError && <p className="text-sm text-destructive">{deleteError}</p>}
          </div>
        )}
      </section>
    </div>
  );
}
