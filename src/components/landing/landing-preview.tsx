import { MoneyAmount } from "@/components/money-amount";
import { formatMoneyCompact, formatMoneyStandard } from "@/lib/currency-format";
import { Card, CardTitle, CardValue } from "@/components/ui/card";
import type { Currency } from "@/lib/types";

const DEMO_CURRENCY: Currency = "USD";

const DEMO_SUBS = [
  { name: "Netflix", meta: "Streaming · Active", amount: 15 },
  { name: "ChatGPT Plus", meta: "AI · Active", amount: 20 },
  { name: "Spotify", meta: "Streaming · Active", amount: 13 },
];

export function LandingPreview({
  locale,
  monthlyLabel,
  yearlyLabel,
  activeLabel,
  byCategoryLabel,
  streamingLabel,
  aiLabel,
  softwareLabel,
  perMonthLabel,
}: {
  locale: string;
  monthlyLabel: string;
  yearlyLabel: string;
  activeLabel: string;
  byCategoryLabel: string;
  streamingLabel: string;
  aiLabel: string;
  softwareLabel: string;
  perMonthLabel: string;
}) {
  return (
    <div
      className="mx-auto w-full max-w-md rounded-2xl border border-border bg-card p-4 shadow-lg sm:p-5"
      aria-hidden
    >
      <div className="grid grid-cols-3 gap-2">
        <Card className="p-2.5">
          <CardTitle className="text-[10px] leading-tight">{monthlyLabel}</CardTitle>
          <CardValue className="mt-1 text-sm leading-tight">
            <MoneyAmount amount={42.25} currency={DEMO_CURRENCY} locale={locale} />
          </CardValue>
        </Card>
        <Card className="p-2.5">
          <CardTitle className="text-[10px] leading-tight">{yearlyLabel}</CardTitle>
          <CardValue className="mt-1 text-sm leading-tight">
            <MoneyAmount amount={507} currency={DEMO_CURRENCY} locale={locale} />
          </CardValue>
        </Card>
        <Card className="p-2.5">
          <CardTitle className="text-[10px] leading-tight">{activeLabel}</CardTitle>
          <CardValue className="mt-1 text-sm leading-tight">4</CardValue>
        </Card>
      </div>

      <Card className="mt-3 p-3">
        <CardTitle className="mb-2 text-xs">{byCategoryLabel}</CardTitle>
        <div className="space-y-2">
          {[
            { label: streamingLabel, width: "72%", amount: 28 },
            { label: aiLabel, width: "55%", amount: 20 },
            { label: softwareLabel, width: "30%", amount: 10 },
          ].map((row) => (
            <div key={row.label}>
              <div className="mb-1 flex justify-between text-xs">
                <span>{row.label}</span>
                <span className="font-medium sm:hidden">
                  {formatMoneyCompact(row.amount, DEMO_CURRENCY, locale)}
                </span>
                <span className="hidden font-medium sm:inline">
                  {formatMoneyStandard(row.amount, DEMO_CURRENCY, locale)}
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-muted">
                <div className="h-1.5 rounded-full bg-primary" style={{ width: row.width }} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <ul className="mt-3 divide-y divide-border rounded-xl border border-border">
        {DEMO_SUBS.map((sub) => (
          <li key={sub.name} className="flex items-center justify-between gap-2 px-3 py-2.5">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{sub.name}</p>
              <p className="truncate text-xs text-muted-foreground">{sub.meta}</p>
            </div>
            <span className="shrink-0 text-xs font-semibold tabular-nums">
              <span className="sm:hidden">
                {formatMoneyCompact(sub.amount, DEMO_CURRENCY, locale)}
                {perMonthLabel}
              </span>
              <span className="hidden sm:inline">
                {formatMoneyStandard(sub.amount, DEMO_CURRENCY, locale)}
                {perMonthLabel}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
