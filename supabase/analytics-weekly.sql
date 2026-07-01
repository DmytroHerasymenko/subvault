-- Renulo weekly product analytics (read-only)
-- Run in Supabase SQL Editor once a week. Results are aggregated — no emails or names.
-- Tip: run one section at a time, or the whole file if your editor supports multiple result tabs.

-- =============================================================================
-- 1. SNAPSHOT — run first for a quick health check
-- =============================================================================

-- Total registered accounts
select count(*) as total_users
from public.profiles;

-- Users who added at least one tracked subscription
select count(distinct user_id) as users_with_subscriptions
from public.subscriptions;

-- Empty accounts (signed up, never added a subscription)
select count(*) as empty_accounts
from public.profiles p
where not exists (
  select 1 from public.subscriptions s where s.user_id = p.id
);

-- Activation rate (% of all users with ≥1 subscription)
select
  round(
    100.0 * count(distinct s.user_id) / nullif(count(p.id), 0),
    1
  ) as activation_rate_pct
from public.profiles p
left join public.subscriptions s on s.user_id = p.id;

-- Total tracked subscriptions (all users)
select count(*) as total_tracked_subscriptions
from public.subscriptions;

-- Average subscriptions per user who has at least one
select round(avg(cnt)::numeric, 1) as avg_subs_per_active_user
from (
  select user_id, count(*) as cnt
  from public.subscriptions
  group by user_id
) t;


-- =============================================================================
-- 2. GROWTH — signups over time
-- =============================================================================

-- Signups per day (last 30 days)
select
  date_trunc('day', created_at at time zone 'utc')::date as day,
  count(*) as signups
from public.profiles
where created_at >= now() - interval '30 days'
group by 1
order by 1 desc;

-- Signups per week (last 12 weeks)
select
  date_trunc('week', created_at at time zone 'utc')::date as week_start,
  count(*) as signups
from public.profiles
where created_at >= now() - interval '12 weeks'
group by 1
order by 1 desc;

-- New tracked subscriptions per week (last 12 weeks)
select
  date_trunc('week', created_at at time zone 'utc')::date as week_start,
  count(*) as subscriptions_added
from public.subscriptions
where created_at >= now() - interval '12 weeks'
group by 1
order by 1 desc;


-- =============================================================================
-- 3. ENGAGEMENT — how people use the product
-- =============================================================================

-- Distribution: how many subscriptions each user has
select subscriptions_per_user, users
from (
  select
    case
      when cnt = 0 then '0'
      when cnt between 1 and 3 then '1-3'
      when cnt between 4 and 9 then '4-9'
      when cnt between 10 and 19 then '10-19'
      else '20+'
    end as subscriptions_per_user,
    count(*) as users
  from (
    select p.id, coalesce(s.cnt, 0) as cnt
    from public.profiles p
    left join (
      select user_id, count(*) as cnt
      from public.subscriptions
      group by user_id
    ) s on s.user_id = p.id
  ) t
  group by 1
) distribution
order by
  case distribution.subscriptions_per_user
    when '0' then 0
    when '1-3' then 1
    when '4-9' then 2
    when '10-19' then 3
    else 4
  end;

-- Users who added their first subscription in the last 7 days (proxy for recent activation)
select count(*) as newly_activated_users_7d
from (
  select user_id, min(created_at) as first_sub_at
  from public.subscriptions
  group by user_id
) t
where first_sub_at >= now() - interval '7 days';

-- Signups in the last 7 days who still have zero subscriptions
select count(*) as recent_signups_still_empty_7d
from public.profiles p
where p.created_at >= now() - interval '7 days'
  and not exists (
    select 1 from public.subscriptions s where s.user_id = p.id
  );


-- =============================================================================
-- 4. CONTENT — what people track
-- =============================================================================

-- By category
select category, count(*) as subscriptions, count(distinct user_id) as users
from public.subscriptions
group by 1
order by 2 desc;

-- By status
select status, count(*) as subscriptions
from public.subscriptions
group by 1
order by 2 desc;

-- Monthly vs yearly billing
select billing_period, count(*) as subscriptions
from public.subscriptions
group by 1
order by 2 desc;

-- Top subscription names (anonymized aggregate — service names only)
select name, count(*) as times_tracked
from public.subscriptions
group by 1
order by 2 desc
limit 20;


-- =============================================================================
-- 5. LOCALIZATION — locales and currencies
-- =============================================================================

-- UI locale
select locale, count(*) as users
from public.profiles
group by 1
order by 2 desc;

-- Preferred display currency
select preferred_currency, count(*) as users
from public.profiles
group by 1
order by 2 desc;

-- Currency used on individual subscriptions
select currency, count(*) as subscriptions
from public.subscriptions
group by 1
order by 2 desc;


-- =============================================================================
-- 6. RETENTION PROXY — simple week-over-week activity
-- =============================================================================

-- Users with at least one subscription created or updated in the last 7 days
select count(distinct user_id) as active_users_7d
from public.subscriptions
where created_at >= now() - interval '7 days'
   or updated_at >= now() - interval '7 days';

-- Compare: signups vs activations in the last 7 days
select
  (select count(*) from public.profiles where created_at >= now() - interval '7 days') as signups_7d,
  (select count(*)
   from (
     select user_id, min(created_at) as first_sub_at
     from public.subscriptions
     group by user_id
   ) t
   where first_sub_at >= now() - interval '7 days'
  ) as first_subscription_7d;
