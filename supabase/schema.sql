create extension if not exists "pgcrypto";

create table if not exists public.receitas (
  id         uuid primary key default gen_random_uuid(),
  descricao  text not null check (char_length(descricao) between 3 and 120),
  valor      numeric(12,2) not null check (valor > 0),
  categoria  text not null,
  data       date not null,
  user_id    uuid not null default auth.uid() references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.despesas (
  id         uuid primary key default gen_random_uuid(),
  descricao  text not null check (char_length(descricao) between 3 and 120),
  valor      numeric(12,2) not null check (valor > 0),
  categoria  text not null,
  data       date not null,
  user_id    uuid not null default auth.uid() references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

-- Segurança: cada usuário só vê e altera os próprios dados (RLS)
alter table public.receitas enable row level security;
alter table public.despesas enable row level security;

create policy "receitas do proprio usuario" on public.receitas
  for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "despesas do proprio usuario" on public.despesas
  for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());
