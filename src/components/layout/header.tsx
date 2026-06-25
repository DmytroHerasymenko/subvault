"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./language-switcher";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function Header({
  locale,
  userEmail,
}: {
  locale: string;
  userEmail?: string | null;
}) {
  const t = useTranslations("nav");
  const router = useRouter();

  async function logout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push(`/${locale}/login`);
    router.refresh();
  }

  return (
    <header className="border-b border-border bg-card/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link href={`/${locale}`} className="text-lg font-bold text-primary">
          SubVault
        </Link>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
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
              <span className="hidden text-sm text-muted-foreground sm:inline">{userEmail}</span>
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
