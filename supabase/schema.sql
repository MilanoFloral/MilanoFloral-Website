-- MilanoFloral website schema
-- Run in Supabase SQL Editor.

create extension if not exists "pgcrypto";

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  event_date date,
  event_type text not null,
  budget text,
  message text not null,
  source text not null default 'website',
  status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'booked', 'closed')),
  created_at timestamptz not null default now()
);

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.portfolio_projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  category text not null,
  description text,
  cloudinary_public_id text not null,
  image_alt text not null,
  featured boolean not null default false,
  sort_order integer not null default 0,
  published boolean not null default false,
  event_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.enquiries enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.portfolio_projects enable row level security;

-- The website uses the service role key only in server-side Route Handlers.
-- No public insert policy is required for enquiries or subscribers.

create policy "Published portfolio projects are public"
on public.portfolio_projects
for select
to anon, authenticated
using (published = true);

create index if not exists enquiries_created_at_idx on public.enquiries (created_at desc);
create index if not exists portfolio_published_sort_idx on public.portfolio_projects (published, sort_order, created_at desc);
