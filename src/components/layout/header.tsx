"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./language-switcher";
import { CurrencySelect } from "@/components/settings/currency-select";
import { useDisplayCurrency } from "./display-currency-context";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const compactSelectClass = "h-8 w-auto min-w-[4.75rem] py-1 pl-2 pr-6 text-xs font-medium";

export function Header({
  locale,
  userEmail,
  userId,
}: {
  locale: string;
  userEmail?: string | null;
  userId?: string | null;
}) {
  const t = useTranslations("nav");
  const tSettings = useTranslations("settings");
  const router = useRouter();
  const { currency, setCurrency } = useDisplayCurrency();

  async function logout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push(`/${locale}/login`);
    router.refresh();
  }

  return (
    <header className="border-b border-border bg-card/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link
          href={userEmail ? `/${locale}/dashboard` : `/${locale}`}
          className="text-lg font-bold text-primary"
        >
          {APP_NAME}
        </Link>
        <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
          <LanguageSwitcher />
          {userId && (
            <CurrencySelect
              value={currency}
              onChange={setCurrency}
              className={compactSelectClass}
              aria-label={tSettings("displayCurrency")}
            />
          )}
          {userEmail ? (
            <>
              <Link
                href={`/${locale}/dashboard`}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {t("dashboard")}
              </Link>
              <Link
                href={`/${locale}/settings`}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {t("settings")}
              </Link>
              <span className="hidden text-sm text-muted-foreground lg:inline">{userEmail}</span>
              <Button variant="outline" size="sm" onClick={logout}>
                {t("logout")}
              </Button>
            </>
          ) : (
            <>
              <Link href={`/${locale}/login`}>
                <Button variant="ghost" size="sm">{t("login")}</Button>
              </Link>
              <Link href={`/${locale}/signup`}>
                <Button size="sm">{t("signup")}</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
