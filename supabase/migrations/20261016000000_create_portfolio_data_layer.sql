create extension if not exists pgcrypto;

create table if not exists public.anonymous_sessions (
  id uuid primary key default gen_random_uuid(),
  session_key text not null unique,
  first_seen_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  consent_analytics boolean not null default false,
  user_agent_family text,
  locale text,
  timezone text
);

create table if not exists public.consent_events (
  id bigint generated always as identity primary key,
  session_key text not null,
  decision text not null check (decision in ('accepted','rejected','updated')),
  analytics_allowed boolean not null default false,
  functional_allowed boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.analytics_events (
  id bigint generated always as identity primary key,
  session_key text not null,
  event_name text not null check (event_name ~ '^[a-z][a-z0-9_.-]{1,63}$'),
  page_path text check (page_path is null or length(page_path) <= 512),
  app_id text check (app_id is null or app_id ~ '^[a-z0-9][a-z0-9-]{0,63}$'),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.contact_submissions (
  id bigint generated always as identity primary key,
  name text not null check (length(trim(name)) between 1 and 120),
  email text check (email is null or length(trim(email)) <= 320),
  subject text check (subject is null or length(trim(subject)) <= 200),
  message text not null check (length(trim(message)) between 1 and 5000),
  source text not null default 'portfolio' check (source in ('portfolio','resume','other')),
  status text not null default 'new' check (status in ('new','read','replied','archived')),
  created_at timestamptz not null default now()
);

create table if not exists public.portfolio_projects (
  id bigint generated always as identity primary key,
  slug text not null unique check (slug ~ '^[a-z0-9][a-z0-9-]{1,80}$'),
  name text not null,
  summary text not null,
  url text,
  repository_url text,
  technologies text[] not null default '{}',
  featured boolean not null default false,
  is_published boolean not null default true,
  sort_order integer not null default 0,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

alter table public.anonymous_sessions enable row level security;
alter table public.consent_events enable row level security;
alter table public.analytics_events enable row level security;
alter table public.contact_submissions enable row level security;
alter table public.portfolio_projects enable row level security;

drop policy if exists "public can insert consent events" on public.consent_events;
create policy "public can insert consent events" on public.consent_events for insert to anon, authenticated with check (decision in ('accepted','rejected','updated') and length(session_key) between 16 and 128);

drop policy if exists "public can insert analytics events" on public.analytics_events;
create policy "public can insert analytics events" on public.analytics_events for insert to anon, authenticated with check (length(session_key) between 16 and 128 and jsonb_typeof(metadata) = 'object');

drop policy if exists "public can read published projects" on public.portfolio_projects;
create policy "public can read published projects" on public.portfolio_projects for select to anon, authenticated using (is_published = true);

drop policy if exists "service role manages sessions" on public.anonymous_sessions;
create policy "service role manages sessions" on public.anonymous_sessions for all to service_role using (true) with check (true);
drop policy if exists "service role manages contacts" on public.contact_submissions;
create policy "service role manages contacts" on public.contact_submissions for all to service_role using (true) with check (true);
drop policy if exists "service role manages projects" on public.portfolio_projects;
create policy "service role manages projects" on public.portfolio_projects for all to service_role using (true) with check (true);

grant insert on public.consent_events to anon, authenticated;
grant insert on public.analytics_events to anon, authenticated;
grant select on public.portfolio_projects to anon, authenticated;
grant all on all tables in schema public to service_role;

create index if not exists analytics_events_session_created_idx on public.analytics_events (session_key, created_at desc);
create index if not exists analytics_events_name_created_idx on public.analytics_events (event_name, created_at desc);
create index if not exists consent_events_session_created_idx on public.consent_events (session_key, created_at desc);
create index if not exists contact_submissions_status_created_idx on public.contact_submissions (status, created_at desc);
