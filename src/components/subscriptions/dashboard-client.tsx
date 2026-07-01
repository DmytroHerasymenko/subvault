"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDisplayCurrency } from "@/components/layout/display-currency-context";
import { SubscriptionForm } from "./subscription-form";
import { SubscriptionFiltersBar } from "./filters";
import { DashboardStats } from "./dashboard-stats";
import {
  formatBillingDateCompact,
  formatBillingDateDisplay,
  getEffectiveNextBillingDate,
} from "@/lib/billing-date";
import { convertAmount } from "@/lib/exchange";
import { formatMoney, monthlyAmount } from "@/lib/utils";
import { toIntlLocale } from "@/lib/intl-locale";
import { createClient } from "@/lib/supabase/client";
import type { Category, Subscription, SubscriptionFilters } from "@/lib/types";
import { CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const defaultFilters: SubscriptionFilters & { sortBy: "amount" | "name" | "date" } = {
  category: "all",
  status: "all",
  billing_period: "all",
  search: "",
  sortBy: "amount",
};

function startEdit(sub: Subscription, setShowForm: (v: boolean) => void, setEditing: (s: Subscription) => void) {
  setShowForm(false);
  setEditing(sub);
}

function SubscriptionPriceColumn({
  amount,
  currency,
  billingPeriod,
  displayCurrency,
  converted,
  intlLocale,
  perMonthLabel,
  perYearLabel,
  className,
}: {
  amount: number;
  currency: string;
  billingPeriod: Subscription["billing_period"];
  displayCurrency: string;
  converted?: number;
  intlLocale: string;
  perMonthLabel: string;
  perYearLabel: string;
  className?: string;
}) {
  const periodLabel = billingPeriod === "monthly" ? perMonthLabel : perYearLabel;
  const monthlyInOriginal = monthlyAmount(amount, billingPeriod);
  const showConversion = converted != null && currency !== displayCurrency;

  return (
    <div className={cn("w-[11rem] shrink-0 text-right tabular-nums", className)}>
      <p className="font-semibold leading-tight">
        {formatMoney(amount, currency, intlLocale)}
        <span className="text-sm font-normal text-muted-foreground">{periodLabel}</span>
      </p>
      {billingPeriod === "yearly" && (
        <p className="text-xs leading-tight text-muted-foreground">
          {formatMoney(monthlyInOriginal, currency, intlLocale)}
          {perMonthLabel}
        </p>
      )}
      {showConversion && (
        <p className="text-sm leading-tight text-muted-foreground">
          ≈ {formatMoney(converted, displayCurrency, intlLocale)}
          {perMonthLabel}
        </p>
      )}
    </div>
  );
}

export function DashboardClient({
  locale,
  userId,
  subscriptions: initialSubs,
}: {
  locale: string;
  userId: string;
  subscriptions: Subscription[];
}) {
  const t = useTranslations("dashboard");
  const ts = useTranslations("subscription");
  const tc = useTranslations("categories");
  const { currency: displayCurrency } = useDisplayCurrency();
  const [subscriptions, setSubscriptions] = useState(initialSubs);
  const [filters, setFilters] = useState(defaultFilters);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Subscription | null>(null);
  const [rates, setRates] = useState<{
    monthly: number;
    yearly: number;
    byCategory: Record<Category, number>;
    convertedById: Record<string, number>;
  } | null>(null);

  const intlLocale = toIntlLocale(locale);

  useEffect(() => {
    setSubscriptions(initialSubs);
  }, [initialSubs]);

  useEffect(() => {
    let cancelled = false;

    async function syncBillingDates() {
      const pending = initialSubs.filter((sub) => {
        if (!sub.next_billing_date) return false;
        const next = getEffectiveNextBillingDate(sub.next_billing_date, sub.billing_period);
        return next !== sub.next_billing_date;
      });

      if (pending.length === 0) {
        if (!cancelled) setSubscriptions(initialSubs);
        return;
      }

      const supabase = createClient();
      const updated = await Promise.all(
        initialSubs.map(async (sub) => {
          if (!sub.next_billing_date) return sub;
          const next = getEffectiveNextBillingDate(sub.next_billing_date, sub.billing_period);
          if (next === sub.next_billing_date) return sub;

          const { error } = await supabase
            .from("subscriptions")
            .update({ next_billing_date: next })
            .eq("id", sub.id);

          return error ? sub : { ...sub, next_billing_date: next };
        }),
      );

      if (!cancelled) setSubscriptions(updated);
    }

    void syncBillingDates();
    return () => {
      cancelled = true;
    };
  }, [initialSubs]);

  const filtered = useMemo(() => {
    let list = [...subscriptions];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter((s) => s.name.toLowerCase().includes(q));
    }
    if (filters.category !== "all") list = list.filter((s) => s.category === filters.category);
    if (filters.status !== "all") list = list.filter((s) => s.status === filters.status);
    if (filters.billing_period !== "all")
      list = list.filter((s) => s.billing_period === filters.billing_period);

    list.sort((a, b) => {
      if (filters.sortBy === "name") return a.name.localeCompare(b.name);
      if (filters.sortBy === "date") {
        const da =
          getEffectiveNextBillingDate(a.next_billing_date, a.billing_period) ?? "";
        const db =
          getEffectiveNextBillingDate(b.next_billing_date, b.billing_period) ?? "";
        return da.localeCompare(db);
      }
      const ma = monthlyAmount(a.amount, a.billing_period);
      const mb = monthlyAmount(b.amount, b.billing_period);
      return mb - ma;
    });

    return list;
  }, [subscriptions, filters]);

  const activeCount = subscriptions.filter((s) => s.status === "active").length;

  useEffect(() => {
    async function calc() {
      const active = subscriptions.filter((s) => s.status === "active");
      let monthly = 0;
      const byCat = Object.fromEntries(CATEGORIES.map((c) => [c, 0])) as Record<Category, number>;

      const convertedById: Record<string, number> = {};

      for (const sub of active) {
        const m = monthlyAmount(Number(sub.amount), sub.billing_period);
        try {
          const converted = await convertAmount(m, sub.currency, displayCurrency);
          monthly += converted;
          byCat[sub.category] += converted;
          convertedById[sub.id] = converted;
        } catch {
          if (sub.currency === displayCurrency) {
            monthly += m;
            byCat[sub.category] += m;
            convertedById[sub.id] = m;
          }
        }
      }

      setRates({ monthly, yearly: monthly * 12, byCategory: byCat, convertedById });
    }
    calc();
  }, [subscriptions, displayCurrency]);

  async function refresh() {
    const supabase = createClient();
    const { data } = await supabase
      .from("subscriptions")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setSubscriptions(data as Subscription[]);
    setShowForm(false);
    setEditing(null);
  }

  const hasFilters =
    filters.search !== "" ||
    filters.category !== "all" ||
    filters.status !== "all" ||
    filters.billing_period !== "all";

  return (
    <div className="space-y-4 sm:space-y-6">
      {rates && (
        <DashboardStats
          totalMonthly={rates.monthly}
          totalYearly={rates.yearly}
          byCategory={rates.byCategory}
          currency={displayCurrency}
          locale={locale}
          activeCount={activeCount}
        />
      )}

      <p className="text-xs text-muted-foreground">
        {t("conversionNote", { currency: displayCurrency })}
      </p>

      <SubscriptionFiltersBar filters={filters} onChange={setFilters} />

      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold">{t("title")}</h2>
        {!showForm && !editing && (
          <Button onClick={() => setShowForm(true)}>
            {t("addSubscription")}
          </Button>
        )}
      </div>

      {showForm && !editing && (
        <SubscriptionForm
          locale={locale}
          userId={userId}
          onSaved={refresh}
          onCancel={() => setShowForm(false)}
        />
      )}

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-8 text-center">
          {subscriptions.length === 0 ? (
            <>
              <p className="font-medium">{t("emptyTitle")}</p>
              <p className="mt-1 text-sm text-muted-foreground">{t("emptyDesc")}</p>
            </>
          ) : (
            <>
              <p className="font-medium">{ts("noResults")}</p>
              {hasFilters && (
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3"
                  onClick={() => setFilters(defaultFilters)}
                >
                  {t("clearFilters")}
                </Button>
              )}
            </>
          )}
        </div>
      ) : (
        <ul className="divide-y divide-border rounded-xl border border-border bg-card">
          {filtered.map((sub) => {
            const nextBillingDate = getEffectiveNextBillingDate(
              sub.next_billing_date,
              sub.billing_period,
            );
            const isEditing = editing?.id === sub.id;
            const converted = rates?.convertedById[sub.id];
            const compactDate = nextBillingDate
              ? formatBillingDateCompact(nextBillingDate)
              : null;
            const metaParts = [
              tc(sub.category),
              ts(sub.status),
              compactDate,
            ].filter(Boolean);

            return (
              <li key={sub.id} className={cn(isEditing && "bg-muted/30")}>
                <div className="flex items-start gap-2 px-3 py-2.5 sm:hidden">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{sub.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {metaParts.join(" · ")}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-0.5">
                    <span className="text-sm font-semibold whitespace-nowrap tabular-nums">
                      {formatMoney(Number(sub.amount), sub.currency, intlLocale)}
                      <span className="text-xs font-normal text-muted-foreground">
                        {sub.billing_period === "monthly" ? ts("perMonth") : ts("perYear")}
                      </span>
                    </span>
                    {sub.billing_period === "yearly" && (
                      <span className="text-xs whitespace-nowrap text-muted-foreground tabular-nums">
                        {formatMoney(
                          monthlyAmount(Number(sub.amount), sub.billing_period),
                          sub.currency,
                          intlLocale,
                        )}
                        {ts("perMonth")}
                      </span>
                    )}
                    {converted != null && sub.currency !== displayCurrency && (
                      <span className="text-xs whitespace-nowrap text-muted-foreground tabular-nums">
                        ≈ {formatMoney(converted, displayCurrency, intlLocale)}
                        {ts("perMonth")}
                      </span>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 w-9 shrink-0 p-0"
                    onClick={() => startEdit(sub, setShowForm, setEditing)}
                    aria-label={t("editSubscription")}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>

                <div className="hidden items-center gap-4 px-4 py-3 sm:flex">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{sub.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {tc(sub.category)} · {ts(sub.status)}
                      {nextBillingDate &&
                        ` · ${ts("nextBillingOn", {
                          date: formatBillingDateDisplay(nextBillingDate, locale),
                        })}`}
                    </p>
                  </div>
                  <SubscriptionPriceColumn
                    amount={Number(sub.amount)}
                    currency={sub.currency}
                    billingPeriod={sub.billing_period}
                    displayCurrency={displayCurrency}
                    converted={converted}
                    intlLocale={intlLocale}
                    perMonthLabel={ts("perMonth")}
                    perYearLabel={ts("perYear")}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="shrink-0"
                    onClick={() => startEdit(sub, setShowForm, setEditing)}
                  >
                    {t("editSubscription")}
                  </Button>
                </div>

                {isEditing && (
                  <div className="border-t border-border px-3 pb-4 pt-3 sm:px-4">
                    <SubscriptionForm
                      locale={locale}
                      userId={userId}
                      initial={sub}
                      onSaved={refresh}
                      onCancel={() => setEditing(null)}
                    />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
