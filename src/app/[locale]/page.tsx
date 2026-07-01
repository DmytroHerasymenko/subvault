import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { LandingPreview } from "@/components/landing/landing-preview";
import { Button } from "@/components/ui/button";

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("landing");
  const td = await getTranslations("dashboard");
  const tc = await getTranslations("categories");

  const features = [
    { title: t("feature1Title"), desc: t("feature1Desc") },
    { title: t("feature2Title"), desc: t("feature2Desc") },
    { title: t("feature3Title"), desc: t("feature3Desc") },
    { title: t("feature4Title"), desc: t("feature4Desc") },
  ];

  const steps = [
    { title: t("step1Title"), desc: t("step1Desc") },
    { title: t("step2Title"), desc: t("step2Desc") },
    { title: t("step3Title"), desc: t("step3Desc") },
  ];

  return (
    <div className="space-y-16 sm:space-y-20">
      <section className="grid items-center gap-10 py-6 lg:grid-cols-2 lg:gap-12 lg:py-10">
        <div className="text-center lg:text-left">
          <span className="rounded-full bg-accent px-3 py-1 text-sm font-medium text-primary">
            {t("badge")}
          </span>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">{t("hook")}</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{t("title")}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{t("subtitle")}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            <Link href={`/${locale}/signup`}>
              <Button size="lg">{t("ctaPrimary")}</Button>
            </Link>
            <Link href={`/${locale}/login`}>
              <Button size="lg" variant="outline">
                {t("ctaSecondary")}
              </Button>
            </Link>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">{t("ctaHint")}</p>
          <p className="mt-2 text-sm font-medium text-primary">{t("pricingNote")}</p>
        </div>

        <LandingPreview
          monthlyLabel={td("totalMonthly")}
          yearlyLabel={td("totalYearly")}
          activeLabel={td("activeCountLabel")}
          byCategoryLabel={td("byCategory")}
          streamingLabel={tc("streaming")}
          aiLabel={tc("ai")}
          softwareLabel={tc("software")}
        />
      </section>

      <section>
        <h2 className="mb-6 text-center text-2xl font-semibold">{t("stepsTitle")}</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.title}
              className="rounded-xl border border-border bg-card p-5 shadow-sm"
            >
              <h3 className="font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-6 text-center text-2xl font-semibold">{t("featuresTitle")}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-border bg-card p-5 shadow-sm"
            >
              <h3 className="font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
