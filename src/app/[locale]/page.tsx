import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("landing");

  const features = [
    { title: t("feature1Title"), desc: t("feature1Desc") },
    { title: t("feature2Title"), desc: t("feature2Desc") },
    { title: t("feature3Title"), desc: t("feature3Desc") },
    { title: t("feature4Title"), desc: t("feature4Desc") },
  ];

  return (
    <div className="space-y-16">
      <section className="py-8 text-center">
        <span className="rounded-full bg-accent px-3 py-1 text-sm font-medium text-primary">
          {t("badge")}
        </span>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          {t("title")}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          {t("subtitle")}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href={`/${locale}/signup`}>
            <Button size="lg">{t("ctaPrimary")}</Button>
          </Link>
          <Link href={`/${locale}/login`}>
            <Button size="lg" variant="outline">{t("ctaSecondary")}</Button>
          </Link>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">{t("pricingNote")}</p>
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
