import { AuthForm } from "@/components/auth/auth-form";

export default async function SignupPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <AuthForm locale={locale} mode="signup" />;
}
