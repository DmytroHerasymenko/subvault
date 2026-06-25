"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AuthForm({ locale, mode }: { locale: string; mode: "login" | "signup" }) {
  const t = useTranslations("auth");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleEmailAuth(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const supabase = createClient();

      if (mode === "login") {
        const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
        if (authError) setError(authError.message);
        else window.location.href = `/${locale}/dashboard`;
      } else {
        const { error: authError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
          },
        });
        if (authError) setError(authError.message);
        else setMessage(t("checkEmail"));
      }
    } catch {
      setError(t("errorNetwork"));
    }
    setLoading(false);
  }

  async function handleGoogle() {
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
        },
      });
      if (error) setError(error.message);
    } catch {
      setError(t("errorNetwork"));
    }
  }

  return (
    <div className="mx-auto w-full max-w-sm space-y-6">
      <h1 className="text-2xl font-bold">
        {mode === "login" ? t("loginTitle") : t("signupTitle")}
      </h1>

      <Button type="button" variant="outline" className="w-full" onClick={handleGoogle}>
        {t("googleButton")}
      </Button>

      <form onSubmit={handleEmailAuth} className="space-y-4">
        <div>
          <Label className="mb-1 block">{t("email")}</Label>
          <Input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <Label className="mb-1 block">{t("password")}</Label>
          <Input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        {message && <p className="text-sm text-success">{message}</p>}
        <Button type="submit" className="w-full" disabled={loading}>
          {mode === "login" ? t("loginButton") : t("signupButton")}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        {mode === "login" ? t("noAccount") : t("hasAccount")}
        {" "}
        <Link
          href={`/${locale}/${mode === "login" ? "signup" : "login"}`}
          className="font-medium text-primary hover:underline"
        >
          {mode === "login" ? t("signupLink") : t("loginLink")}
        </Link>
      </p>
    </div>
  );
}
