"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { CATEGORIES, CURRENCIES, SERVICE_TEMPLATES } from "@/lib/constants";
import type { Subscription, SubscriptionFormData } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";

const emptyForm: SubscriptionFormData = {
  name: "",
  amount: 0,
  currency: "UAH",
  billing_period: "monthly",
  category: "streaming",
  status: "active",
  next_billing_date: null,
  notes: null,
};

export function SubscriptionForm({
  locale,
  userId,
  initial,
  onSaved,
  onCancel,
}: {
  locale: string;
  userId: string;
  initial?: Subscription;
  onSaved: () => void;
  onCancel: () => void;
}) {
  const t = useTranslations("subscription");
  const tc = useTranslations("categories");
  const [form, setForm] = useState<SubscriptionFormData>(
    initial
      ? {
          name: initial.name,
          amount: initial.amount,
          currency: initial.currency,
          billing_period: initial.billing_period,
          category: initial.category,
          status: initial.status,
          next_billing_date: initial.next_billing_date,
          notes: initial.notes,
        }
      : emptyForm
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function applyTemplate(index: number) {
    const tpl = SERVICE_TEMPLATES[index];
    setForm({
      ...form,
      name: tpl.name,
      amount: tpl.amount,
      currency: tpl.currency,
      billing_period: tpl.billing_period,
      category: tpl.category,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();

    const payload = {
      user_id: userId,
      name: form.name.trim(),
      amount: form.amount,
      currency: form.currency,
      billing_period: form.billing_period,
      category: form.category,
      status: form.status,
      next_billing_date: form.next_billing_date || null,
      notes: form.notes?.trim() || null,
    };

    const { error: dbError } = initial
      ? await supabase.from("subscriptions").update(payload).eq("id", initial.id)
      : await supabase.from("subscriptions").insert(payload);

    setLoading(false);
    if (dbError) {
      setError(dbError.message);
      return;
    }
    onSaved();
  }

  async function handleDelete() {
    if (!initial || !confirm(t("deleteConfirm"))) return;
    setLoading(true);
    const supabase = createClient();
    await supabase.from("subscriptions").delete().eq("id", initial.id);
    setLoading(false);
    onSaved();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-border bg-card p-5">
      {!initial && (
        <div>
          <Label className="mb-2 block">{t("templates")}</Label>
          <div className="flex flex-wrap gap-2">
            {SERVICE_TEMPLATES.map((tpl, i) => (
              <Button
                key={`${tpl.name}-${tpl.currency}-${i}`}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => applyTemplate(i)}
              >
                {tpl.name}
              </Button>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">{t("templatesHint")}</p>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label className="mb-1 block">{t("name")}</Label>
          <Input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div>
          <Label className="mb-1 block">{t("amount")}</Label>
          <Input
            required
            type="number"
            min="0"
            step="0.01"
            value={form.amount || ""}
            onChange={(e) => setForm({ ...form, amount: parseFloat(e.target.value) || 0 })}
          />
        </div>
        <div>
          <Label className="mb-1 block">{t("currency")}</Label>
          <Select
            value={form.currency}
            onChange={(e) => setForm({ ...form, currency: e.target.value as SubscriptionFormData["currency"] })}
          >
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </Select>
        </div>
        <div>
          <Label className="mb-1 block">{t("billingPeriod")}</Label>
          <Select
            value={form.billing_period}
            onChange={(e) =>
              setForm({ ...form, billing_period: e.target.value as SubscriptionFormData["billing_period"] })
            }
          >
            <option value="monthly">{t("monthly")}</option>
            <option value="yearly">{t("yearly")}</option>
          </Select>
        </div>
        <div>
          <Label className="mb-1 block">{t("category")}</Label>
          <Select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value as SubscriptionFormData["category"] })}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{tc(c)}</option>
            ))}
          </Select>
        </div>
        <div>
          <Label className="mb-1 block">{t("status")}</Label>
          <Select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value as SubscriptionFormData["status"] })}
          >
            <option value="active">{t("active")}</option>
            <option value="cancelled">{t("cancelled")}</option>
            <option value="trial">{t("trial")}</option>
          </Select>
        </div>
        <div>
          <Label className="mb-1 block">{t("nextBilling")}</Label>
          <Input
            type="date"
            value={form.next_billing_date ?? ""}
            onChange={(e) => setForm({ ...form, next_billing_date: e.target.value || null })}
          />
        </div>
        <div className="sm:col-span-2">
          <Label className="mb-1 block">{t("notes")}</Label>
          <Input
            value={form.notes ?? ""}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />
        </div>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex flex-wrap gap-2">
        <Button type="submit" disabled={loading}>{t("save")}</Button>
        <Button type="button" variant="outline" onClick={onCancel}>{t("cancel")}</Button>
        {initial && (
          <Button type="button" variant="destructive" onClick={handleDelete} disabled={loading}>
            {t("delete")}
          </Button>
        )}
      </div>
    </form>
  );
}
