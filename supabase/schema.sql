-- ═══════════════════════════════════════════════════════════════════
--  SNR Digital Marketing — Supabase Schema
--  Run this in: Supabase Dashboard → SQL Editor → New Query
-- ═══════════════════════════════════════════════════════════════════

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- ─────────────────────────────────────────────────────────────────
--  TABLES
-- ─────────────────────────────────────────────────────────────────

-- 1. Profiles (extends Supabase auth.users)
create table public.profiles (
  id            uuid references auth.users(id) on delete cascade primary key,
  name          text        not null,
  email         text        not null unique,
  role          text        not null default 'client'
                            check (role in ('admin', 'client')),
  business_name text,
  business_type text,
  location      text,
  created_at    timestamptz default now()
);

-- 2. Leads
create table public.leads (
  id            uuid        default uuid_generate_v4() primary key,
  name          text        not null,
  phone         text        not null,
  business_type text,
  goal          text,
  budget        text,
  status        text        not null default 'new'
                            check (status in ('new', 'contacted', 'warm', 'converted')),
  tags          text[]      default '{}',
  source        text        not null default 'smart_form'
                            check (source in ('smart_form', 'whatsapp', 'phone', 'manual', 'ai_chat')),
  client_id     uuid        references public.profiles(id) on delete set null,
  created_at    timestamptz default now()
);

-- 3. Campaigns
create table public.campaigns (
  id              uuid        default uuid_generate_v4() primary key,
  client_id       uuid        references public.profiles(id) on delete cascade not null,
  campaign_name   text        not null,
  platform        text        check (platform in ('google', 'meta', 'seo', 'website')),
  monthly_budget  numeric     default 0,
  leads_generated int         default 0,
  status          text        not null default 'active'
                              check (status in ('active', 'paused', 'completed')),
  start_date      date,
  created_at      timestamptz default now()
);

-- 4. Monthly Reports (SNR team fills in campaign data for clients)
create table public.monthly_reports (
  id                   uuid        default uuid_generate_v4() primary key,
  client_id            uuid        references public.profiles(id) on delete cascade not null,
  month                text        not null,            -- e.g. "May 25"
  organic_traffic      int         default 0,
  google_ads_leads     int         default 0,
  google_ads_spend     numeric     default 0,
  meta_ads_leads       int         default 0,
  meta_ads_spend       numeric     default 0,
  total_leads          int         default 0,
  calls                int         default 0,
  whatsapp_enquiries   int         default 0,
  notes                text,
  created_at           timestamptz default now(),
  unique (client_id, month)
);

-- ─────────────────────────────────────────────────────────────────
--  ROW LEVEL SECURITY
-- ─────────────────────────────────────────────────────────────────

alter table public.profiles       enable row level security;
alter table public.leads          enable row level security;
alter table public.campaigns      enable row level security;
alter table public.monthly_reports enable row level security;

-- Helper: is the calling user an admin?
create or replace function public.is_admin()
returns boolean language sql security definer as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- ─── Profiles ────────────────────────────────────────────────────
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

create policy "profiles_admin_all" on public.profiles
  for all using (public.is_admin());

-- ─── Leads ───────────────────────────────────────────────────────

-- Anyone (anon or authenticated) can INSERT a lead (SmartLeadForm, no login needed)
create policy "leads_insert_anon" on public.leads
  for insert with check (true);

-- Admin can do everything
create policy "leads_admin_all" on public.leads
  for all using (public.is_admin());

-- Clients can view only their own linked leads
create policy "leads_select_own_client" on public.leads
  for select using (auth.uid() = client_id);

-- Clients can update status of their own leads
create policy "leads_update_own_client" on public.leads
  for update using (auth.uid() = client_id);

-- ─── Campaigns ───────────────────────────────────────────────────
create policy "campaigns_admin_all" on public.campaigns
  for all using (public.is_admin());

create policy "campaigns_select_own" on public.campaigns
  for select using (auth.uid() = client_id);

-- ─── Monthly Reports ─────────────────────────────────────────────
create policy "reports_admin_all" on public.monthly_reports
  for all using (public.is_admin());

create policy "reports_select_own" on public.monthly_reports
  for select using (auth.uid() = client_id);

-- ─────────────────────────────────────────────────────────────────
--  FUNCTIONS & TRIGGERS
-- ─────────────────────────────────────────────────────────────────

-- Auto-create profile row when a new auth.user is created
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, name, email, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.email,
    coalesce(new.raw_user_meta_data->>'role', 'client')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ─────────────────────────────────────────────────────────────────
--  INDEXES (performance)
-- ─────────────────────────────────────────────────────────────────

create index leads_created_at_idx  on public.leads (created_at desc);
create index leads_status_idx      on public.leads (status);
create index leads_client_id_idx   on public.leads (client_id);
create index reports_client_id_idx on public.monthly_reports (client_id);

-- ─────────────────────────────────────────────────────────────────
--  ADMIN BOOTSTRAP
--  After running this schema, create your admin account via:
--    1. Supabase Dashboard → Authentication → Users → Add user
--       Email: admin@snrdigital.com   (or your real email)
--    2. Then run this UPDATE to set the role to 'admin':
-- ─────────────────────────────────────────────────────────────────

-- UPDATE public.profiles SET role = 'admin' WHERE email = 'admin@snrdigital.com';
