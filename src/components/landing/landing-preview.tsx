import { Card, CardTitle, CardValue } from "@/components/ui/card";

const DEMO_SUBS = [
  { name: "Netflix", meta: "Streaming · Active", amount: "15 USD/mo" },
  { name: "ChatGPT Plus", meta: "AI · Active", amount: "20 USD/mo" },
  { name: "Spotify", meta: "Streaming · Active", amount: "13 USD/mo" },
];

export function LandingPreview({
  monthlyLabel,
  yearlyLabel,
  activeLabel,
  byCategoryLabel,
  streamingLabel,
  aiLabel,
  softwareLabel,
}: {
  monthlyLabel: string;
  yearlyLabel: string;
  activeLabel: string;
  byCategoryLabel: string;
  streamingLabel: string;
  aiLabel: string;
  softwareLabel: string;
}) {
  return (
    <div
      className="mx-auto w-full max-w-md rounded-2xl border border-border bg-card p-4 shadow-lg sm:p-5"
      aria-hidden
    >
      <div className="grid grid-cols-3 gap-2">
        <Card className="p-2.5">
          <CardTitle className="text-[10px] leading-tight">{monthlyLabel}</CardTitle>
          <CardValue className="mt-1 text-sm leading-tight">42,25 USD</CardValue>
        </Card>
        <Card className="p-2.5">
          <CardTitle className="text-[10px] leading-tight">{yearlyLabel}</CardTitle>
          <CardValue className="mt-1 text-sm leading-tight">507 USD</CardValue>
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
            { label: streamingLabel, width: "72%", amount: "28 USD" },
            { label: aiLabel, width: "55%", amount: "20 USD" },
            { label: softwareLabel, width: "30%", amount: "10 USD" },
          ].map((row) => (
            <div key={row.label}>
              <div className="mb-1 flex justify-between text-xs">
                <span>{row.label}</span>
                <span className="font-medium">{row.amount}</span>
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
            <span className="shrink-0 text-xs font-semibold">{sub.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
