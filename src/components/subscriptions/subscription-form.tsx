"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { CATEGORIES, CURRENCIES } from "@/lib/constants";
import { fetchDetectedPreferences } from "@/lib/profile-preferences";
import {
  getServiceTemplates,
  type ServiceTemplate,
  type TemplateRegion,
} from "@/lib/service-templates";
import type { Subscription, SubscriptionFormData } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";

type DefaultableField = "name" | "amount" | "currency" | "billing_period" | "category";

const emptyDefaults: Record<DefaultableField, boolean> = {
  name: false,
  amount: false,
  currency: false,
  billing_period: false,
  category: false,
};

function createEmptyForm(currency: SubscriptionFormData["currency"]): SubscriptionFormData {
  return {
    name: "",
    amount: 0,
    currency,
    billing_period: "monthly",
    category: "streaming",
    status: "active",
    next_billing_date: null,
    notes: null,
  };
}

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
  const [templates, setTemplates] = useState<ServiceTemplate[]>(() =>
    getServiceTemplates(locale === "ua" ? "ua" : locale === "pl" ? "pl" : "eu"),
  );
  const [templateRegion, setTemplateRegion] = useState<TemplateRegion>(
    locale === "ua" ? "ua" : locale === "pl" ? "pl" : "eu",
  );
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
      : createEmptyForm("EUR"),
  );
  const [defaultFields, setDefaultFields] = useState(emptyDefaults);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initial) return;

    let cancelled = false;
    void fetchDetectedPreferences().then(({ currency, region }) => {
      if (cancelled) return;
      setTemplates(getServiceTemplates(region));
      setTemplateRegion(region);
      setForm((current) =>
        current.name ? current : { ...createEmptyForm(currency), ...current, currency },
      );
    });

    return () => {
      cancelled = true;
    };
  }, [initial]);

  function patchForm(
    patch: Partial<SubscriptionFormData>,
    touched?: DefaultableField[],
  ) {
    setForm((current) => ({ ...current, ...patch }));
    if (touched?.length) {
      setDefaultFields((current) => {
        const next = { ...current };
        for (const field of touched) next[field] = false;
        return next;
      });
    }
  }

  function applyTemplate(tpl: ServiceTemplate) {
    setForm((current) => ({
      ...current,
      name: tpl.name,
      amount: tpl.amount,
      currency: tpl.currency,
      billing_period: tpl.billing_period,
      category: tpl.category,
    }));
    setDefaultFields({
      name: true,
      amount: true,
      currency: true,
      billing_period: true,
      category: true,
    });
  }

  function defaultFieldClass(field: DefaultableField) {
    return defaultFields[field] ? "text-muted-foreground" : undefined;
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

  const regionLabel = t(`templateRegions.${templateRegion}` as `templateRegions.${TemplateRegion}`);

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-border bg-card p-5">
      {!initial && (
        <div>
          <Label className="mb-2 block">{t("templates")}</Label>
          <div className="flex flex-wrap gap-2">
            {templates.map((tpl) => (
              <Button
                key={`${tpl.name}-${tpl.currency}`}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => applyTemplate(tpl)}
              >
                {tpl.name}
              </Button>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {t("templatesHint", { region: regionLabel })}
          </p>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label className="mb-1 block">{t("name")}</Label>
          <Input
            required
            value={form.name}
            className={defaultFieldClass("name")}
            onChange={(e) => patchForm({ name: e.target.value }, ["name"])}
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
            className={defaultFieldClass("amount")}
            onChange={(e) =>
              patchForm({ amount: parseFloat(e.target.value) || 0 }, ["amount"])
            }
          />
        </div>
        <div>
          <Label className="mb-1 block">{t("currency")}</Label>
          <Select
            value={form.currency}
            className={defaultFieldClass("currency")}
            onChange={(e) =>
              patchForm(
                { currency: e.target.value as SubscriptionFormData["currency"] },
                ["currency"],
              )
            }
          >
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label className="mb-1 block">{t("billingPeriod")}</Label>
          <Select
            value={form.billing_period}
            className={defaultFieldClass("billing_period")}
            onChange={(e) =>
              patchForm(
                {
                  billing_period: e.target.value as SubscriptionFormData["billing_period"],
                },
                ["billing_period"],
              )
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
            className={defaultFieldClass("category")}
            onChange={(e) =>
              patchForm(
                { category: e.target.value as SubscriptionFormData["category"] },
                ["category"],
              )
            }
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {tc(c)}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label className="mb-1 block">{t("status")}</Label>
          <Select
            value={form.status}
            onChange={(e) =>
              patchForm({ status: e.target.value as SubscriptionFormData["status"] })
            }
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
            onChange={(e) =>
              patchForm({ next_billing_date: e.target.value || null })
            }
          />
        </div>
        <div className="sm:col-span-2">
          <Label className="mb-1 block">{t("notes")}</Label>
          <Input
            value={form.notes ?? ""}
            onChange={(e) => patchForm({ notes: e.target.value })}
          />
        </div>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex flex-wrap gap-2">
        <Button type="submit" disabled={loading}>
          {t("save")}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          {t("cancel")}
        </Button>
        {initial && (
          <Button type="button" variant="destructive" onClick={handleDelete} disabled={loading}>
            {t("delete")}
          </Button>
        )}
      </div>
    </form>
  );
}
