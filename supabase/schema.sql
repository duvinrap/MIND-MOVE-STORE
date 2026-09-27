-- MIND MOVE shared Supabase schema
-- Project: https://oobtnngmorzxenpttfyz.supabase.co
-- Run this entire file once in Supabase SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  product text not null default 'MIND MOVE',
  rating integer not null check (rating between 1 and 5),
  review_text text not null,
  created_at timestamptz not null default now()
);

alter table public.reviews enable row level security;

grant usage on schema public to anon, authenticated;
grant select, insert on public.reviews to anon, authenticated;

drop policy if exists "public can read reviews" on public.reviews;
create policy "public can read reviews"
on public.reviews for select
to anon, authenticated
using (true);

drop policy if exists "public can post reviews" on public.reviews;
create policy "public can post reviews"
on public.reviews for insert
to anon, authenticated
with check (
  char_length(trim(name)) between 1 and 40
  and rating between 1 and 5
  and char_length(trim(review_text)) between 1 and 500
);

create table if not exists public.article_submissions (
  id uuid primary key default gen_random_uuid(),
  artist_name text not null,
  email text not null,
  type text not null check (type in ('Poem','Story','Article')),
  title text not null,
  content text not null,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  created_at timestamptz not null default now(),
  reviewed_at timestamptz
);

alter table public.article_submissions enable row level security;
grant insert, select on public.article_submissions to anon, authenticated;

drop policy if exists "public can submit article" on public.article_submissions;
create policy "public can submit article"
on public.article_submissions for insert
to anon, authenticated
with check (status = 'pending');

drop policy if exists "public can read approved articles" on public.article_submissions;
create policy "public can read approved articles"
on public.article_submissions for select
to anon, authenticated
using (status = 'approved');
