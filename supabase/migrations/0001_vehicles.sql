-- Vehicles table: single source of truth for AutoTrader stock.
-- The full Vehicle object is stored in `data` (jsonb); `id` is the AutoTrader
-- vehicle id. The sync job upserts present vehicles (is_active = true) and
-- deactivates ones no longer returned by the API (is_active = false), so the
-- site always reflects the latest API state without losing history.

create table if not exists public.vehicles (
  id            text primary key,
  is_active     boolean      not null default true,
  data          jsonb        not null,
  last_seen_at  timestamptz  not null default now(),
  created_at    timestamptz  not null default now(),
  updated_at    timestamptz  not null default now()
);

create index if not exists vehicles_is_active_idx on public.vehicles (is_active);

-- Enable RLS with no anon policies: the app and sync connect with the postgres
-- role (RLS bypassed), so the public/anon key cannot read or write this table
-- via PostgREST. Data access is server-side only.
alter table public.vehicles enable row level security;
