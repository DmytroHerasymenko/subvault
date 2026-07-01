import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { SUPPORT_EMAIL } from "@/lib/constants";
import { PAGE_CONTAINER } from "@/lib/layout";
import { cn } from "@/lib/utils";

export async function Footer({ locale }: { locale: string }) {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-border py-8">
      <div
        className={cn(
          PAGE_CONTAINER,
          "flex flex-col items-center gap-3 py-8 text-sm text-muted-foreground sm:flex-row sm:flex-wrap sm:items-center sm:justify-between",
        )}
      >
        <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 sm:justify-start">
          <span>{t("rights", { year })}</span>
          <span aria-hidden className="text-border">
            ·
          </span>
          <span>
            {t("contact")}{" "}
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="text-foreground underline-offset-4 hover:underline"
            >
              {SUPPORT_EMAIL}
            </a>
          </span>
        </p>
        <nav className="flex shrink-0 flex-wrap justify-center gap-4 sm:justify-end">
          <Link href={`/${locale}/donations`} className="hover:text-foreground">
            {t("donations")}
          </Link>
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
