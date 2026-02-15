create extension if not exists "pgcrypto";

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text not null,
  content text,
  thumbnail_url text,
  github_url text,
  live_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null,
  content text not null,
  cover_image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_projects_updated_at on public.projects;
create trigger trg_projects_updated_at
before update on public.projects
for each row execute function public.set_updated_at();

drop trigger if exists trg_blog_posts_updated_at on public.blog_posts;
create trigger trg_blog_posts_updated_at
before update on public.blog_posts
for each row execute function public.set_updated_at();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = auth.uid()
  );
$$;

alter table public.admin_users enable row level security;
alter table public.projects enable row level security;
alter table public.blog_posts enable row level security;
alter table public.messages enable row level security;

drop policy if exists "admin users can read admin_users" on public.admin_users;
create policy "admin users can read admin_users"
on public.admin_users
for select
using (public.is_admin());

drop policy if exists "public can read projects" on public.projects;
create policy "public can read projects"
on public.projects
for select
using (true);

drop policy if exists "admin can insert projects" on public.projects;
create policy "admin can insert projects"
on public.projects
for insert
with check (public.is_admin());

drop policy if exists "admin can update projects" on public.projects;
create policy "admin can update projects"
on public.projects
for update
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "admin can delete projects" on public.projects;
create policy "admin can delete projects"
on public.projects
for delete
using (public.is_admin());

drop policy if exists "public can read blog_posts" on public.blog_posts;
create policy "public can read blog_posts"
on public.blog_posts
for select
using (true);

drop policy if exists "admin can insert blog_posts" on public.blog_posts;
create policy "admin can insert blog_posts"
on public.blog_posts
for insert
with check (public.is_admin());

drop policy if exists "admin can update blog_posts" on public.blog_posts;
create policy "admin can update blog_posts"
on public.blog_posts
for update
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "admin can delete blog_posts" on public.blog_posts;
create policy "admin can delete blog_posts"
on public.blog_posts
for delete
using (public.is_admin());

drop policy if exists "anyone can insert messages" on public.messages;
create policy "anyone can insert messages"
on public.messages
for insert
with check (true);

drop policy if exists "admin can read messages" on public.messages;
create policy "admin can read messages"
on public.messages
for select
using (public.is_admin());

insert into storage.buckets (id, name, public)
values
  ('thumbnails', 'thumbnails', true),
  ('blog-covers', 'blog-covers', true)
on conflict (id) do nothing;

drop policy if exists "public read thumbnails and blog covers" on storage.objects;
create policy "public read thumbnails and blog covers"
on storage.objects
for select
using (bucket_id in ('thumbnails', 'blog-covers'));

drop policy if exists "authenticated upload thumbnails and blog covers" on storage.objects;
create policy "authenticated upload thumbnails and blog covers"
on storage.objects
for insert
to authenticated
with check (bucket_id in ('thumbnails', 'blog-covers'));

drop policy if exists "authenticated update thumbnails and blog covers" on storage.objects;
create policy "authenticated update thumbnails and blog covers"
on storage.objects
for update
to authenticated
using (bucket_id in ('thumbnails', 'blog-covers'))
with check (bucket_id in ('thumbnails', 'blog-covers'));

drop policy if exists "authenticated delete thumbnails and blog covers" on storage.objects;
create policy "authenticated delete thumbnails and blog covers"
on storage.objects
for delete
to authenticated
using (bucket_id in ('thumbnails', 'blog-covers'));
