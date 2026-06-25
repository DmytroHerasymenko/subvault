"use client";

import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import type { SubscriptionFilters } from "@/lib/types";
import { CATEGORIES } from "@/lib/constants";

export function SubscriptionFiltersBar({
  filters,
  onChange,
}: {
  filters: SubscriptionFilters;
  onChange: (f: SubscriptionFilters) => void;
}) {
  const t = useTranslations("filters");
  const tc = useTranslations("categories");
  const ts = useTranslations("subscription");

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      <div>
        <Label className="mb-1 block">{t("search")}</Label>
        <Input
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          placeholder={t("search")}
        />
      </div>
      <div>
        <Label className="mb-1 block">{t("category")}</Label>
        <Select
          value={filters.category}
          onChange={(e) =>
            onChange({ ...filters, category: e.target.value as SubscriptionFilters["category"] })
          }
        >
          <option value="all">{tc("all")}</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{tc(c)}</option>
          ))}
        </Select>
      </div>
      <div>
        <Label className="mb-1 block">{t("status")}</Label>
        <Select
          value={filters.status}
          onChange={(e) =>
            onChange({ ...filters, status: e.target.value as SubscriptionFilters["status"] })
          }
        >
          <option value="all">{t("all")}</option>
          <option value="active">{ts("active")}</option>
          <option value="cancelled">{ts("cancelled")}</option>
          <option value="trial">{ts("trial")}</option>
        </Select>
      </div>
      <div>
        <Label className="mb-1 block">{t("billing")}</Label>
        <Select
          value={filters.billing_period}
          onChange={(e) =>
            onChange({
              ...filters,
              billing_period: e.target.value as SubscriptionFilters["billing_period"],
            })
          }
        >
          <option value="all">{t("all")}</option>
          <option value="monthly">{ts("monthly")}</option>
          <option value="yearly">{ts("yearly")}</option>
        </Select>
      </div>
      <div>
        <Label className="mb-1 block">{t("sortBy")}</Label>
        <Select
          value={filters.sortBy ?? "amount"}
          onChange={(e) =>
            onChange({
              ...filters,
              sortBy: e.target.value as "amount" | "name" | "date",
            })
          }
        >
          <option value="amount">{t("sortAmount")}</option>
          <option value="name">{t("sortName")}</option>
          <option value="date">{t("sortDate")}</option>
        </Select>
      </div>
    </div>
  );
}
