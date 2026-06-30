import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { resolveDefaultLocale } from "@/lib/locale-preferences";

export default async function RootPage() {
  const headerStore = await headers();
  const locale = resolveDefaultLocale(headerStore.get("accept-language"));
  redirect(`/${locale}`);
}
