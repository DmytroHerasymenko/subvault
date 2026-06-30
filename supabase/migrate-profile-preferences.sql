-- Profile defaults: locale + currency from signup metadata (run once in Supabase SQL Editor)

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name, locale, preferred_currency)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.email),
    coalesce(nullif(new.raw_user_meta_data->>'locale', ''), 'en'),
    coalesce(nullif(new.raw_user_meta_data->>'preferred_currency', ''), 'EUR')
  );
  return new;
end;
$$;

alter table public.profiles alter column locale set default 'en';
alter table public.profiles alter column preferred_currency set default 'EUR';
