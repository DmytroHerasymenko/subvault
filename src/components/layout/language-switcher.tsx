"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { Select } from "@/components/ui/select";
import { createClient } from "@/lib/supabase/client";
import { locales, type AppLocale } from "@/i18n/config";
import {
  formatLocaleOption,
  formatLocaleOptionShort,
} from "@/i18n/locale-meta";
import { cn } from "@/lib/utils";

const defaultSelectClass =
  "h-11 min-h-11 w-auto shrink-0 py-2 pl-2.5 pr-8 text-sm font-medium";

export function LanguageSwitcher({ selectClassName }: { selectClassName?: string }) {
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const router = useRouter();
  const selectClass = cn(defaultSelectClass, selectClassName);

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
    <>
      <Select
        value={locale}
        onChange={(e) => void switchLocale(e.target.value)}
        className={cn(selectClass, "md:hidden")}
        aria-label="Language"
      >
        {locales.map((l) => (
          <option key={l} value={l}>
            {formatLocaleOptionShort(l)}
          </option>
        ))}
      </Select>
      <Select
        value={locale}
        onChange={(e) => void switchLocale(e.target.value)}
        className={cn(selectClass, "hidden min-w-[9.5rem] md:block")}
        aria-label="Language"
      >
        {locales.map((l) => (
          <option key={l} value={l}>
            {formatLocaleOption(l)}
          </option>
        ))}
      </Select>
    </>
  );
}
