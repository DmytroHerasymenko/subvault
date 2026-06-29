import Link from "next/link";
import { getTranslations } from "next-intl/server";

export async function Footer({ locale }: { locale: string }) {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-border py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-4 text-sm text-muted-foreground sm:flex-row sm:justify-between">
        <p>{t("rights", { year })}</p>
        <nav className="flex gap-4">
          <Link href={`/${locale}/privacy`} className="hover:text-foreground">
            {t("privacy")}
          </Link>
          <Link href={`/${locale}/terms`} className="hover:text-foreground">
            {t("terms")}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
