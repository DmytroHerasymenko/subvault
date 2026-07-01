"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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
  const [expanded, setExpanded] = useState(false);

  const hasActiveFilters =
    filters.category !== "all" ||
    filters.status !== "all" ||
    filters.billing_period !== "all" ||
    filters.sortBy !== "amount";

  return (
    <div className="space-y-2">
      <div className="flex gap-2 lg:hidden">
        <Input
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          placeholder={t("search")}
          className="min-w-0 flex-1"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="relative shrink-0 gap-1 lg:hidden"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
        >
          {t("toggle")}
          {hasActiveFilters && (
            <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-primary" />
          )}
          <ChevronDown className={cn("h-4 w-4 transition-transform", expanded && "rotate-180")} />
        </Button>
      </div>

      <div
        className={cn(
          "grid grid-cols-2 gap-2 sm:grid-cols-2 lg:grid-cols-5 lg:gap-3",
          !expanded && "hidden lg:grid",
        )}
      >
        <div className="col-span-2 hidden lg:col-span-1 lg:block">
          <Label className="mb-1 block">{t("search")}</Label>
          <Input
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            placeholder={t("search")}
          />
        </div>
        <div>
          <Label className="mb-1 block text-xs lg:text-sm">{t("category")}</Label>
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
          <Label className="mb-1 block text-xs lg:text-sm">{t("status")}</Label>
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
          <Label className="mb-1 block text-xs lg:text-sm">{t("billing")}</Label>
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
          <Label className="mb-1 block text-xs lg:text-sm">{t("sortBy")}</Label>
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
    </div>
  );
}
