"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { AuthError } from "@supabase/supabase-js";

function isAlreadyRegistered(error: AuthError) {
  const msg = error.message.toLowerCase();
  return (
    error.code === "user_already_exists" ||
    msg.includes("already registered") ||
    msg.includes("already exists") ||
    msg.includes("user already")
  );
}

function isEmailRateLimit(error: AuthError) {
  const msg = error.message.toLowerCase();
  return (
    error.status === 429 ||
    msg.includes("rate limit") ||
    msg.includes("too many requests")
  );
}

function authErrorMessage(
  error: AuthError,
  t: ReturnType<typeof useTranslations<"auth">>,
  mode: "login" | "signup",
) {
  if (isAlreadyRegistered(error)) return t("emailAlreadyRegistered");
  if (isEmailRateLimit(error)) {
    return mode === "signup" ? t("errorEmailRateLimitSignup") : t("errorEmailRateLimit");
  }
  return error.message;
}

function isExistingSignupUser(data: {
  user: { identities?: unknown[] } | null;
  session: unknown;
}) {
  return Boolean(data.user?.identities && data.user.identities.length === 0);
}

export function AuthForm({ locale, mode }: { locale: string; mode: "login" | "signup" }) {
  const t = useTranslations("auth");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  function siteUrl() {
    return process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;
  }

  async function handleEmailAuth(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    if (mode === "signup" && !acceptedTerms) {
      setError(t("acceptTermsRequired"));
      setLoading(false);
      return;
    }

    try {
      const supabase = createClient();

      if (mode === "login") {
        const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
        if (authError) setError(authErrorMessage(authError, t, mode));
        else window.location.href = `/${locale}/dashboard`;
      } else {
        const { data, error: authError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${siteUrl()}/auth/callback`,
          },
        });
        if (authError) {
          setError(authErrorMessage(authError, t, mode));
        } else if (isExistingSignupUser(data)) {
          setError(t("emailAlreadyRegistered"));
        } else if (data.session) {
          window.location.href = `/${locale}/dashboard`;
        } else {
          setMessage(t("checkEmail"));
        }
      }
    } catch {
      setError(t("errorNetwork"));
    }
    setLoading(false);
  }

  async function handleGoogle() {
    setError(null);
    if (mode === "signup" && !acceptedTerms) {
      setError(t("acceptTermsRequired"));
      return;
    }
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${siteUrl()}/auth/callback`,
        },
      });
      if (error) {
        if (error.message.toLowerCase().includes("not enabled")) {
          setError(t("googleNotEnabled"));
        } else if (isEmailRateLimit(error)) {
          setError(mode === "signup" ? t("errorEmailRateLimitSignup") : t("errorEmailRateLimit"));
        } else {
          setError(error.message);
        }
      }
    } catch {
      setError(t("errorNetwork"));
    }
    setLoading(false);
  }

  return (
    <div className="mx-auto w-full max-w-sm space-y-6">
      <h1 className="text-2xl font-bold">
        {mode === "login" ? t("loginTitle") : t("signupTitle")}
      </h1>

      <Button type="button" variant="outline" className="w-full" onClick={handleGoogle} disabled={loading}>
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
        {mode === "signup" && (
          <label className="flex items-start gap-2 text-sm text-muted-foreground">
            <input
              type="checkbox"
              className="mt-1"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
            />
            <span>
              {t("acceptTermsPrefix")}{" "}
              <Link href={`/${locale}/terms`} className="text-primary hover:underline">
                {t("termsLink")}
              </Link>{" "}
              {t("acceptTermsAnd")}{" "}
              <Link href={`/${locale}/privacy`} className="text-primary hover:underline">
                {t("privacyLink")}
              </Link>
            </span>
          </label>
        )}
        {error && <p className="text-sm text-destructive">{error}</p>}
        {message && (
          <div className="space-y-1">
            <p className="text-sm text-success">{message}</p>
            <p className="text-xs text-muted-foreground">{t("checkEmailHint")}</p>
          </div>
        )}
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
