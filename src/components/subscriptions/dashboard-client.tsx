"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { useDisplayCurrency } from "@/components/layout/display-currency-context";
import { SubscriptionForm } from "./subscription-form";
import { SubscriptionFiltersBar } from "./filters";
import { DashboardStats } from "./dashboard-stats";
import { FREE_TIER_LIMIT } from "@/lib/constants";
import { convertAmount } from "@/lib/exchange";
import { formatMoney, monthlyAmount } from "@/lib/utils";
import { toIntlLocale } from "@/lib/intl-locale";
import type { Category, Currency, Subscription, SubscriptionFilters } from "@/lib/types";
import { CATEGORIES } from "@/lib/constants";

const defaultFilters: SubscriptionFilters & { sortBy: "amount" | "name" | "date" } = {
  category: "all",
  status: "all",
  billing_period: "all",
  search: "",
  sortBy: "amount",
};

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
        const da = a.next_billing_date ?? "";
        const db = b.next_billing_date ?? "";
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
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    const { data } = await supabase
      .from("subscriptions")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setSubscriptions(data as Subscription[]);
    setShowForm(false);
    setEditing(null);
  }

  const atLimit = subscriptions.length >= FREE_TIER_LIMIT;
  const hasFilters =
    filters.search !== "" ||
    filters.category !== "all" ||
    filters.status !== "all" ||
    filters.billing_period !== "all";

  return (
    <div className="space-y-6">
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

      {atLimit && (
        <p className="text-sm text-muted-foreground">
          {t("limitWarning", { limit: FREE_TIER_LIMIT })}
        </p>
      )}

      <p className="text-xs text-muted-foreground">
        {t("conversionNote", { currency: displayCurrency })}
      </p>

      <SubscriptionFiltersBar filters={filters} onChange={setFilters} />

      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold">{t("title")}</h2>
        {!showForm && !editing && (
          <Button
            onClick={() => setShowForm(true)}
            disabled={atLimit}
          >
            {t("addSubscription")}
          </Button>
        )}
      </div>

      {(showForm || editing) && (
        <SubscriptionForm
          locale={locale}
          userId={userId}
          initial={editing ?? undefined}
          onSaved={refresh}
          onCancel={() => {
            setShowForm(false);
            setEditing(null);
          }}
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
          {filtered.map((sub) => (
              <li
                key={sub.id}
                className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 hover:bg-muted/50"
              >
                <div>
                  <p className="font-medium">{sub.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {tc(sub.category)} · {ts(sub.status)}
                    {sub.next_billing_date && ` · ${sub.next_billing_date}`}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold">
                    {formatMoney(Number(sub.amount), sub.currency, intlLocale)}
                    <span className="text-sm font-normal text-muted-foreground">
                      {sub.billing_period === "monthly" ? ts("perMonth") : ts("perYear")}
                    </span>
                  </span>
                  {rates?.convertedById[sub.id] != null &&
                    sub.currency !== displayCurrency && (
                    <span className="text-sm text-muted-foreground">
                      ≈ {formatMoney(rates.convertedById[sub.id], displayCurrency, intlLocale)}
                      {ts("perMonth")}
                    </span>
                  )}
                  <Button variant="outline" size="sm" onClick={() => setEditing(sub)}>
                    {t("editSubscription")}
                  </Button>
                </div>
              </li>
          ))}
        </ul>
      )}

    </div>
  );
}
