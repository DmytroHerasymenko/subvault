"use client";

import { useTranslations } from "next-intl";
import { Card, CardTitle, CardValue } from "@/components/ui/card";
import { formatMoney } from "@/lib/utils";
import { toIntlLocale } from "@/lib/intl-locale";
import type { Category, Currency } from "@/lib/types";
import { CATEGORIES } from "@/lib/constants";

export function DashboardStats({
  totalMonthly,
  totalYearly,
  byCategory,
  currency,
  locale,
  activeCount,
}: {
  totalMonthly: number;
  totalYearly: number;
  byCategory: Record<Category, number>;
  currency: Currency;
  locale: string;
  activeCount: number;
}) {
  const t = useTranslations("dashboard");
  const tc = useTranslations("categories");
  const intlLocale = toIntlLocale(locale);

  const maxCategory = Math.max(...Object.values(byCategory), 1);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardTitle>{t("totalMonthly")}</CardTitle>
          <CardValue>{formatMoney(totalMonthly, currency, intlLocale)}</CardValue>
        </Card>
        <Card>
          <CardTitle>{t("totalYearly")}</CardTitle>
          <CardValue>{formatMoney(totalYearly, currency, intlLocale)}</CardValue>
        </Card>
        <Card>
          <CardTitle>{t("activeCount", { count: activeCount })}</CardTitle>
          <CardValue>{activeCount}</CardValue>
        </Card>
      </div>

      <Card>
        <CardTitle className="mb-4">{t("byCategory")}</CardTitle>
        <div className="space-y-3">
          {CATEGORIES.map((cat) => {
            const amount = byCategory[cat] ?? 0;
            if (amount <= 0) return null;
            const pct = (amount / maxCategory) * 100;
            return (
              <div key={cat}>
                <div className="mb-1 flex justify-between text-sm">
                  <span>{tc(cat)}</span>
                  <span className="font-medium">
                    {formatMoney(amount, currency, intlLocale)}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full bg-primary transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
