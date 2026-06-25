import { AuthForm } from "@/components/auth/auth-form";

export default async function LoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <AuthForm locale={locale} mode="login" />;
}
