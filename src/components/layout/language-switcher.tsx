"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { Select } from "@/components/ui/select";
import { createClient } from "@/lib/supabase/client";
import { locales, type AppLocale } from "@/i18n/config";
import { formatLocaleOption } from "@/i18n/locale-meta";

const compactSelectClass =
  "h-8 w-auto min-w-[9.5rem] py-1 pl-2 pr-7 text-xs font-medium";

export function LanguageSwitcher() {
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const router = useRouter();

  async function switchLocale(next: string) {
    if (next === locale) return;

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      await supabase.from("profiles").update({ locale: next }).eq("id", user.id);
    }

    const segments = pathname.split("/");
    if (locales.includes(segments[1] as AppLocale)) {
      segments[1] = next;
    } else {
      segments.splice(1, 0, next);
    }
    router.push(segments.join("/") || "/");
    router.refresh();
  }

  return (
    <Select
      value={locale}
      onChange={(e) => void switchLocale(e.target.value)}
      className={compactSelectClass}
      aria-label="Language"
    >
      {locales.map((l) => (
        <option key={l} value={l}>
          {formatLocaleOption(l)}
        </option>
      ))}
    </Select>
  );
}
