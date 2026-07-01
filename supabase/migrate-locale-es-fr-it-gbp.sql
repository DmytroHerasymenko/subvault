-- Add Spanish/French/Italian locales and GBP currency (run once in Supabase SQL Editor)

alter table public.profiles drop constraint if exists profiles_locale_check;
alter table public.profiles
  add constraint profiles_locale_check check (locale in ('ua', 'en', 'pl', 'de', 'cs', 'es', 'fr', 'it'));

alter table public.profiles drop constraint if exists profiles_preferred_currency_check;
alter table public.profiles
  add constraint profiles_preferred_currency_check
  check (preferred_currency in ('UAH', 'USD', 'EUR', 'PLN', 'CZK', 'CHF', 'GBP'));

alter table public.subscriptions drop constraint if exists subscriptions_currency_check;
alter table public.subscriptions
  add constraint subscriptions_currency_check
  check (currency in ('UAH', 'USD', 'EUR', 'PLN', 'CZK', 'CHF', 'GBP'));
