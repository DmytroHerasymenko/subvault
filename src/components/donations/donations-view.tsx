import { useTranslations } from "next-intl";
import {
  donationUrl,
  orderedDonationMethods,
  type DonationMethod,
} from "@/lib/donations";
import { cn } from "@/lib/utils";

const buttonClass =
  "inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-indigo-600";

function DonationCard({ method }: { method: DonationMethod }) {
  const t = useTranslations("donations");
  const titleKey = `${method}Title` as "monobankTitle" | "revolutTitle";
  const descKey = `${method}Desc` as "monobankDesc" | "revolutDesc";
  const buttonKey = `${method}Button` as "monobankButton" | "revolutButton";

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h2 className="text-lg font-semibold">{t(titleKey)}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{t(descKey)}</p>
      <a
        href={donationUrl(method)}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(buttonClass, "mt-4")}
      >
        {t(buttonKey)}
      </a>
    </div>
  );
}

export function DonationsView({
  locale,
  className,
}: {
  locale: string;
  className?: string;
}) {
  const t = useTranslations("donations");
  const methods = orderedDonationMethods(locale);

  return (
    <div className={cn("max-w-lg space-y-6", className)}>
      <div>
        <h1 className="text-xl font-bold">{t("title")}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t("intro")}</p>
        <p className="mt-2 text-sm text-muted-foreground">{t("note")}</p>
      </div>

      <div className="space-y-4">
        {methods.map((method) => (
          <DonationCard key={method} method={method} />
        ))}
      </div>
    </div>
  );
}
