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
          "flex flex-col items-center gap-4 py-8 text-sm text-muted-foreground sm:flex-row sm:justify-between",
        )}
      >
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <p>{t("rights", { year })}</p>
          <p>
            {t("contact")}{" "}
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="text-foreground underline-offset-4 hover:underline"
            >
              {SUPPORT_EMAIL}
            </a>
          </p>
        </div>
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
