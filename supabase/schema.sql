create extension if not exists "uuid-ossp";

create table if not exists public.profiles (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  full_name text,
  role text default 'owner' check (role in ('owner', 'admin')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.services (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  description text not null,
  duration text not null,
  starting_price numeric(10,2) not null default 0,
  image_url text,
  active boolean default true,
  category text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.customers (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text,
  phone text,
  vehicle text,
  created_at timestamptz default now()
);

create table if not exists public.bookings (
  id uuid primary key default uuid_generate_v4(),
  customer_id uuid references public.customers(id) on delete set null,
  service_id uuid references public.services(id) on delete set null,
  customer_name text not null,
  email text not null,
  phone text not null,
  vehicle text not null,
  selected_service text not null,
  preferred_date date not null,
  preferred_time time not null,
  message text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'completed', 'cancelled', 'rejected')),
  reference text unique not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.gallery_images (
  id uuid primary key default uuid_generate_v4(),
  title text,
  category text,
  image_url text not null,
  alt_text text,
  created_at timestamptz default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  phone text not null,
  subject text not null,
  message text not null,
  read boolean default false,
  created_at timestamptz default now()
);

create table if not exists public.business_settings (
  id uuid primary key default uuid_generate_v4(),
  business_name text not null,
  logo_text text,
  currency text default 'USD' check (currency in ('USD','INR')),
  locale text default 'en-US',
  timezone text default 'America/New_York',
  email text,
  phone text,
  address text,
  opening_hours text,
  whatsapp text,
  instagram text,
  facebook text,
  theme text default 'Black Gold',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_services_active on public.services(active);
create index if not exists idx_bookings_status on public.bookings(status);
create index if not exists idx_contact_messages_read on public.contact_messages(read);

alter table public.profiles enable row level security;
alter table public.services enable row level security;
alter table public.customers enable row level security;
alter table public.bookings enable row level security;
alter table public.gallery_images enable row level security;
alter table public.contact_messages enable row level security;
alter table public.business_settings enable row level security;

create policy "Public read published services" on public.services
for select using (active = true);

create policy "Public read gallery" on public.gallery_images
for select using (true);

create policy "Public insert bookings" on public.bookings
for insert with check (true);

create policy "Public insert contact messages" on public.contact_messages
for insert with check (true);

create policy "Owner can manage services" on public.services
for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "Owner can manage bookings" on public.bookings
for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "Owner can manage customers" on public.customers
for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "Owner can manage gallery" on public.gallery_images
for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "Owner can manage messages" on public.contact_messages
for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "Owner can manage settings" on public.business_settings
for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "Owner can access profiles" on public.profiles
for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', new.email), 'owner')
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();
