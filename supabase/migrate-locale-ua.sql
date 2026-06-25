-- Migrate locale code from uk to ua (run once in Supabase SQL Editor)

alter table public.profiles drop constraint if exists profiles_locale_check;

update public.profiles set locale = 'ua' where locale = 'uk';

alter table public.profiles
  alter column locale set default 'ua';

alter table public.profiles
  add constraint profiles_locale_check check (locale in ('ua', 'en'));
