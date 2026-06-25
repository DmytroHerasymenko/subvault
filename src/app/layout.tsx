import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SubVault",
  description: "Track all your subscriptions in one place",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
