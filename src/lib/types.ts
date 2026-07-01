export type Currency = "UAH" | "USD" | "EUR" | "PLN" | "CZK" | "CHF" | "GBP";
export type Locale = "ua" | "en" | "pl" | "de" | "cs" | "es" | "fr" | "it";
export type Category =
  | "streaming"
  | "internet"
  | "ai"
  | "software"
  | "games"
  | "other";
export type BillingPeriod = "monthly" | "yearly";
export type SubscriptionStatus = "active" | "cancelled" | "trial";

export interface Profile {
  id: string;
  display_name: string | null;
  preferred_currency: Currency;
  locale: Locale;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  name: string;
  amount: number;
  currency: Currency;
  billing_period: BillingPeriod;
  category: Category;
  status: SubscriptionStatus;
  next_billing_date: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface SubscriptionFormData {
  name: string;
  amount: number;
  currency: Currency;
  billing_period: BillingPeriod;
  category: Category;
  status: SubscriptionStatus;
  next_billing_date: string | null;
  notes: string | null;
}

export interface CategoryTotal {
  category: Category;
  monthlyAmount: number;
}

export interface SubscriptionFilters {
  category: Category | "all";
  status: SubscriptionStatus | "all";
  billing_period: BillingPeriod | "all";
  search: string;
  sortBy: "amount" | "name" | "date";
}
