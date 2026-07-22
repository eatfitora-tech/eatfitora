-- Run this migration against the Fitora Supabase project before production launch.
-- Admin users must receive {"role":"admin"} in auth.users.raw_app_meta_data.

alter table public.products enable row level security;
alter table public.categories enable row level security;
alter table public.addresses enable row level security;

drop policy if exists "Public can read products" on public.products;
create policy "Public can read products" on public.products
for select to anon, authenticated using (true);

drop policy if exists "Admins can manage products" on public.products;
create policy "Admins can manage products" on public.products
for all to authenticated
using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Public can read categories" on public.categories;
create policy "Public can read categories" on public.categories
for select to anon, authenticated using (true);

drop policy if exists "Admins can manage categories" on public.categories;
create policy "Admins can manage categories" on public.categories
for all to authenticated
using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Users can read their addresses" on public.addresses;
create policy "Users can read their addresses" on public.addresses
for select to authenticated using (auth.uid() = user_id);

drop policy if exists "Users can create their addresses" on public.addresses;
create policy "Users can create their addresses" on public.addresses
for insert to authenticated with check (auth.uid() = user_id);

drop policy if exists "Users can update their addresses" on public.addresses;
create policy "Users can update their addresses" on public.addresses
for update to authenticated
using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "Users can delete their addresses" on public.addresses;
create policy "Users can delete their addresses" on public.addresses
for delete to authenticated using (auth.uid() = user_id);

create index if not exists addresses_user_id_idx on public.addresses (user_id);
