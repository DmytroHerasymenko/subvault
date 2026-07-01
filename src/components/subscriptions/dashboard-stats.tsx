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
  const statCardClass = "p-2.5 sm:p-5";

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        <Card className={statCardClass}>
          <CardTitle className="text-[10px] leading-tight sm:text-sm">
            {t("totalMonthly")}
          </CardTitle>
          <CardValue className="mt-0.5 text-sm leading-tight sm:mt-1 sm:text-2xl">
            {formatMoney(totalMonthly, currency, intlLocale)}
          </CardValue>
        </Card>
        <Card className={statCardClass}>
          <CardTitle className="text-[10px] leading-tight sm:text-sm">
            {t("totalYearly")}
          </CardTitle>
          <CardValue className="mt-0.5 text-sm leading-tight sm:mt-1 sm:text-2xl">
            {formatMoney(totalYearly, currency, intlLocale)}
          </CardValue>
        </Card>
        <Card className={statCardClass}>
          <CardTitle className="text-[10px] leading-tight sm:text-sm">
            {t("activeCountLabel")}
          </CardTitle>
          <CardValue className="mt-0.5 text-sm leading-tight sm:mt-1 sm:text-2xl">
            {activeCount}
          </CardValue>
        </Card>
      </div>

      <Card className="p-3 sm:p-5">
        <CardTitle className="mb-3 text-xs sm:mb-4 sm:text-sm">{t("byCategory")}</CardTitle>
        <div className="space-y-2.5 sm:space-y-3">
          {CATEGORIES.map((cat) => {
            const amount = byCategory[cat] ?? 0;
            if (amount <= 0) return null;
            const pct = (amount / maxCategory) * 100;
            return (
              <div key={cat}>
                <div className="mb-1 flex justify-between gap-2 text-xs sm:text-sm">
                  <span className="truncate">{tc(cat)}</span>
                  <span className="shrink-0 font-medium">
                    {formatMoney(amount, currency, intlLocale)}
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-muted sm:h-2">
                  <div
                    className="h-1.5 rounded-full bg-primary transition-all sm:h-2"
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
