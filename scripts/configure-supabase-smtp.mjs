/**
 * Configure Supabase Auth custom SMTP (Resend or Gmail) via Management API.
 *
 * Usage:
 *   SUPABASE_ACCESS_TOKEN=... RESEND_API_KEY=re_... node scripts/configure-supabase-smtp.mjs
 *
 * Get token: https://supabase.com/dashboard/account/tokens
 */

const PROJECT_REF =
  process.env.SUPABASE_PROJECT_REF?.trim() ||
  process.env.NEXT_PUBLIC_SUPABASE_URL?.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1];

const ACCESS_TOKEN = process.env.SUPABASE_ACCESS_TOKEN?.trim();
const PROVIDER = (process.env.SMTP_PROVIDER || "resend").toLowerCase();
const SENDER_NAME = process.env.SMTP_SENDER_NAME?.trim() || "Renulo";
const FROM_EMAIL = process.env.SMTP_FROM_EMAIL?.trim() || "renulo.app@gmail.com";
const RATE_LIMIT_EMAIL =
  Number.parseInt(process.env.SMTP_RATE_LIMIT_EMAIL_SENT || "100", 10);

function smtpConfig() {
  if (PROVIDER === "resend") {
    const apiKey = process.env.RESEND_API_KEY?.trim();
    if (!apiKey) throw new Error("Missing RESEND_API_KEY");
    return {
      smtp_host: "smtp.resend.com",
      smtp_port: 587,
      smtp_user: "resend",
      smtp_pass: apiKey,
      smtp_admin_email: FROM_EMAIL,
      smtp_sender_name: SENDER_NAME,
    };
  }

  if (PROVIDER === "gmail") {
    const appPassword = process.env.GMAIL_APP_PASSWORD?.trim();
    if (!appPassword) throw new Error("Missing GMAIL_APP_PASSWORD");
    return {
      smtp_host: "smtp.gmail.com",
      smtp_port: 587,
      smtp_user: FROM_EMAIL,
      smtp_pass: appPassword,
      smtp_admin_email: FROM_EMAIL,
      smtp_sender_name: SENDER_NAME,
    };
  }

  throw new Error(`Unknown SMTP_PROVIDER: ${PROVIDER}. Use "resend" or "gmail".`);
}

async function main() {
  if (!PROJECT_REF) throw new Error("Set SUPABASE_PROJECT_REF or NEXT_PUBLIC_SUPABASE_URL");
  if (!ACCESS_TOKEN) throw new Error("Missing SUPABASE_ACCESS_TOKEN");

  const body = {
    external_email_enabled: true,
    mailer_autoconfirm: false,
    ...smtpConfig(),
    rate_limit_email_sent: RATE_LIMIT_EMAIL,
  };

  const res = await fetch(
    `https://api.supabase.com/v1/projects/${PROJECT_REF}/config/auth`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );

  const text = await res.text();
  if (!res.ok) {
    console.error("Supabase API error:", res.status, text);
    process.exit(1);
  }

  console.log("SMTP configured for project:", PROJECT_REF);
  console.log("Provider:", PROVIDER);
  console.log("From:", FROM_EMAIL);
  console.log("Email rate limit (per hour):", RATE_LIMIT_EMAIL);
  if (PROVIDER === "resend" && FROM_EMAIL.includes("gmail.com")) {
    console.log(
      "\nNote: Resend requires a verified domain to send to any recipient.",
      "Verify renulo.app on resend.com/domains and set SMTP_FROM_EMAIL=no-reply@renulo.app",
    );
  }
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
