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
import { cn } from "@/lib/utils";

/** Min 44×44px touch target (Apple HIG). */
const navIconClass =
  "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground";

const touchSelectClass =
  "h-11 min-h-11 shrink-0 py-2 pl-2.5 pr-8 text-sm font-medium";

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
    <header className="border-b border-border bg-card/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-nowrap items-center gap-3 px-3 py-2 sm:px-4 sm:py-2.5">
        <Link
          href={userEmail ? `/${locale}/dashboard` : `/${locale}`}
          className="shrink-0 pr-1 text-base font-bold text-primary sm:text-lg"
        >
          {APP_NAME}
        </Link>

        {userEmail ? (
          <>
            <NavIconLink href={`/${locale}/dashboard`} label={t("dashboard")}>
              <Home className="h-5 w-5" />
            </NavIconLink>

            <LanguageSwitcher selectClassName={touchSelectClass} />

            {userId && (
              <CurrencySelect
                value={currency}
                onChange={setCurrency}
                className={`${touchSelectClass} min-w-[4.75rem] max-w-[6rem]`}
                aria-label={tSettings("displayCurrency")}
              />
            )}

            <NavIconLink href={`/${locale}/settings`} label={t("settings")}>
              <Settings className="h-5 w-5" />
            </NavIconLink>

            <span className="hidden shrink-0 text-sm text-muted-foreground lg:inline">{userEmail}</span>

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
          </>
        ) : (
          <>
            <div className="flex-1" />
            <LanguageSwitcher selectClassName={touchSelectClass} />
            <Link href={`/${locale}/login`}>
              <Button variant="ghost" size="sm" className="h-11 min-w-11 px-3">
                {t("login")}
              </Button>
            </Link>
            <Link href={`/${locale}/signup`}>
              <Button size="sm" className="h-11 min-w-11 px-3">
                {t("signup")}
              </Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
