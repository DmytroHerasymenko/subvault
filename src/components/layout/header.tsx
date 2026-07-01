"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Home, LogOut, Settings } from "lucide-react";
import { LanguageSwitcher } from "./language-switcher";
import { CurrencySelect } from "@/components/settings/currency-select";
import { useDisplayCurrency } from "./display-currency-context";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";
import { PAGE_CONTAINER } from "@/lib/layout";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const navIconClass =
  "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground";

const touchSelectClass =
  "h-11 min-h-11 shrink-0 py-2 text-sm font-medium sm:pl-2.5 sm:pr-8";

const mobileSelectClass =
  "h-11 w-10 min-w-10 max-w-10 shrink-0 px-0.5 py-2 pr-6 text-center text-xs sm:w-auto sm:min-w-0 sm:max-w-none sm:text-sm";

function NavIconLink({
  href,
  label,
  children,
  className,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} title={label} aria-label={label} className={cn(navIconClass, className)}>
      {children}
    </Link>
  );
}

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
    <header className="overflow-x-hidden border-b border-border bg-card/80 backdrop-blur">
      <div
        className={cn(
          PAGE_CONTAINER,
          "flex items-center gap-1 py-2 sm:gap-2 sm:py-2.5",
        )}
      >
        <Link
          href={userEmail ? `/${locale}/dashboard` : `/${locale}`}
          className="shrink-0 text-sm font-bold text-primary sm:text-lg"
        >
          {APP_NAME}
        </Link>

        {userEmail ? (
          <div className="flex min-w-0 flex-1 flex-nowrap items-center justify-end gap-0.5 sm:gap-2 md:gap-3">
            <NavIconLink href={`/${locale}/dashboard`} label={t("dashboard")}>
              <Home className="h-5 w-5" />
            </NavIconLink>

            <LanguageSwitcher
              selectClassName={cn(touchSelectClass, mobileSelectClass)}
            />

            {userId && (
              <CurrencySelect
                value={currency}
                onChange={setCurrency}
                className={cn(
                  touchSelectClass,
                  mobileSelectClass,
                  "sm:min-w-[4.5rem] sm:max-w-[5.5rem]",
                )}
                aria-label={tSettings("displayCurrency")}
              />
            )}

            <NavIconLink href={`/${locale}/settings`} label={t("settings")}>
              <Settings className="h-5 w-5" />
            </NavIconLink>

            <span className="hidden shrink-0 text-sm text-muted-foreground lg:inline">
              {userEmail}
            </span>

            <Button
              variant="outline"
              size="sm"
              className="h-11 min-w-11 shrink-0 px-0 sm:px-3"
              onClick={logout}
              title={t("logout")}
              aria-label={t("logout")}
            >
              <LogOut className="h-5 w-5 sm:mr-1.5" />
              <span className="hidden sm:inline">{t("logout")}</span>
            </Button>
          </div>
        ) : (
          <div className="flex min-w-0 flex-1 flex-nowrap items-center justify-end gap-1 sm:gap-2">
            <LanguageSwitcher
              selectClassName={cn(touchSelectClass, mobileSelectClass)}
            />
            <Link href={`/${locale}/login`}>
              <Button variant="ghost" size="sm" className="h-11 shrink-0 px-2 sm:px-3">
                {t("login")}
              </Button>
            </Link>
            <Link href={`/${locale}/signup`}>
              <Button size="sm" className="h-11 shrink-0 px-2 sm:px-3">
                {t("signup")}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
