"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Home, LogOut, Settings } from "lucide-react";
import { LanguageSwitcher } from "./language-switcher";
import { CurrencySelect } from "@/components/settings/currency-select";
import { useDisplayCurrency } from "./display-currency-context";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const compactSelectClass =
  "h-8 w-auto min-w-[4.25rem] max-w-[5.5rem] py-1 pl-1.5 pr-6 text-xs font-medium sm:min-w-[4.75rem]";

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
      <div className="mx-auto flex max-w-5xl items-center gap-2 px-3 py-2 sm:gap-4 sm:px-4 sm:py-3">
        <Link
          href={userEmail ? `/${locale}/dashboard` : `/${locale}`}
          className="shrink-0 text-base font-bold text-primary sm:text-lg"
        >
          {APP_NAME}
        </Link>
        <div className="flex min-w-0 flex-1 flex-nowrap items-center justify-end gap-1 sm:gap-2 md:gap-3">
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
                className="inline-flex shrink-0 items-center gap-1 text-muted-foreground hover:text-foreground"
                title={t("dashboard")}
              >
                <Home className="h-4 w-4" />
                <span className="hidden md:inline text-sm">{t("dashboard")}</span>
              </Link>
              <Link
                href={`/${locale}/settings`}
                className="inline-flex shrink-0 items-center gap-1 text-muted-foreground hover:text-foreground"
                title={t("settings")}
              >
                <Settings className="h-4 w-4" />
                <span className="hidden md:inline text-sm">{t("settings")}</span>
              </Link>
              <span className="hidden text-sm text-muted-foreground lg:inline">{userEmail}</span>
              <Button
                variant="outline"
                size="sm"
                className="h-8 shrink-0 px-2 sm:px-3"
                onClick={logout}
                title={t("logout")}
              >
                <LogOut className="h-4 w-4 sm:mr-1" />
                <span className="hidden sm:inline">{t("logout")}</span>
              </Button>
            </>
          ) : (
            <>
              <Link href={`/${locale}/login`}>
                <Button variant="ghost" size="sm" className="h-8 px-2 sm:px-3">
                  {t("login")}
                </Button>
              </Link>
              <Link href={`/${locale}/signup`}>
                <Button size="sm" className="h-8 px-2 sm:px-3">
                  {t("signup")}
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
