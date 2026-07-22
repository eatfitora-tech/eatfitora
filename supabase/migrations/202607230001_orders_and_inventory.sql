-- Persistent orders, atomic inventory reservation, and server-authoritative pricing.
-- Run after the existing production hardening migrations.

alter table public.products
  add column if not exists sku text,
  add column if not exists stock_quantity integer not null default 100,
  add column if not exists low_stock_threshold integer not null default 5,
  add column if not exists is_active boolean not null default true;

update public.products
set sku = 'FIT-' || upper(left(id::text, 8))
where sku is null or btrim(sku) = '';

alter table public.products alter column sku set not null;
alter table public.products alter column stock_quantity set default 0;
alter table public.products
  drop constraint if exists products_stock_quantity_check,
  add constraint products_stock_quantity_check check (stock_quantity >= 0),
  drop constraint if exists products_low_stock_threshold_check,
  add constraint products_low_stock_threshold_check check (low_stock_threshold >= 0);

create unique index if not exists products_sku_unique_idx on public.products (lower(sku));
create index if not exists products_stock_idx on public.products (stock_quantity, low_stock_threshold);

create sequence if not exists public.order_number_seq start with 1001;

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  user_id uuid not null references auth.users(id) on delete restrict,
  address_id uuid references public.addresses(id) on delete set null,
  address_snapshot jsonb not null,
  subtotal numeric(12,2) not null check (subtotal >= 0),
  delivery numeric(12,2) not null check (delivery >= 0),
  total numeric(12,2) not null check (total >= 0),
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'packed', 'shipped', 'delivered', 'cancelled')),
  payment_status text not null default 'pending'
    check (payment_status in ('pending', 'paid', 'failed', 'refunded')),
  payment_method text not null default 'whatsapp',
  whatsapp_opened_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  product_name text not null,
  product_image text,
  sku text not null,
  selected_weight text,
  unit_price numeric(12,2) not null check (unit_price >= 0),
  quantity integer not null check (quantity > 0),
  line_total numeric(12,2) not null check (line_total >= 0),
  created_at timestamptz not null default now()
);

create index if not exists orders_user_created_idx on public.orders (user_id, created_at desc);
create index if not exists orders_status_created_idx on public.orders (status, created_at desc);
create index if not exists order_items_order_idx on public.order_items (order_id);

alter table public.orders enable row level security;
alter table public.order_items enable row level security;

drop policy if exists "Public can read products" on public.products;
create policy "Customers can read active products" on public.products
for select to anon, authenticated
using (
  is_active = true
  or coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin'
);

drop policy if exists "Customers can read their orders" on public.orders;
create policy "Customers can read their orders" on public.orders
for select to authenticated using (auth.uid() = user_id);

drop policy if exists "Admins can manage orders" on public.orders;
create policy "Admins can manage orders" on public.orders
for all to authenticated
using (coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin')
with check (coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin');

drop policy if exists "Customers can read their order items" on public.order_items;
create policy "Customers can read their order items" on public.order_items
for select to authenticated
using (
  exists (
    select 1 from public.orders
    where orders.id = order_items.order_id and orders.user_id = auth.uid()
  )
);

drop policy if exists "Admins can read order items" on public.order_items;
create policy "Admins can read order items" on public.order_items
for select to authenticated
using (coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin');

create or replace function public.create_order(p_address_id uuid, p_items jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_user_id uuid := auth.uid();
  v_address public.addresses%rowtype;
  v_product public.products%rowtype;
  v_item jsonb;
  v_option jsonb;
  v_selected_weight text;
  v_unit_price numeric(12,2);
  v_quantity integer;
  v_subtotal numeric(12,2) := 0;
  v_delivery numeric(12,2) := 0;
  v_order_id uuid;
  v_order_number text;
begin
  if v_user_id is null then
    raise exception 'You must be signed in to place an order';
  end if;

  select * into v_address
  from public.addresses
  where id = p_address_id and user_id = v_user_id;

  if not found then
    raise exception 'The selected delivery address is invalid';
  end if;

  if p_items is null or jsonb_typeof(p_items) <> 'array' or jsonb_array_length(p_items) = 0 then
    raise exception 'Your cart is empty';
  end if;

  if jsonb_array_length(p_items) > 50 then
    raise exception 'Too many different products in one order';
  end if;

  v_order_number := 'FTR-' || lpad(nextval('public.order_number_seq')::text, 6, '0');

  insert into public.orders (
    order_number, user_id, address_id, address_snapshot, subtotal, delivery, total
  ) values (
    v_order_number,
    v_user_id,
    p_address_id,
    jsonb_build_object(
      'fullName', v_address.full_name,
      'phone', v_address.phone,
      'house', v_address.house,
      'street', v_address.street,
      'area', v_address.area,
      'landmark', v_address.landmark,
      'city', v_address.city,
      'state', v_address.state,
      'pincode', v_address.pincode,
      'notes', v_address.notes
    ),
    0, 0, 0
  ) returning id into v_order_id;

  for v_item in select value from jsonb_array_elements(p_items)
  loop
    begin
      v_quantity := (v_item ->> 'quantity')::integer;
    exception when others then
      raise exception 'An item has an invalid quantity';
    end;

    if v_quantity < 1 or v_quantity > 100 then
      raise exception 'Item quantities must be between 1 and 100';
    end if;

    begin
      select * into v_product
      from public.products
      where id = (v_item ->> 'product_id')::uuid
      for update;
    exception when invalid_text_representation then
      raise exception 'A product in your cart is not available from the live catalog';
    end;

    if not found or not v_product.is_active then
      raise exception 'A product in your cart is no longer available';
    end if;

    if v_product.stock_quantity < v_quantity then
      raise exception '% only has % unit(s) left', v_product.name, v_product.stock_quantity;
    end if;

    v_selected_weight := nullif(btrim(v_item ->> 'selected_weight'), '');
    v_unit_price := v_product.price;

    if jsonb_typeof(v_product.specifications -> '__weightOptions') = 'array'
       and jsonb_array_length(v_product.specifications -> '__weightOptions') > 0 then
      select option into v_option
      from jsonb_array_elements(v_product.specifications -> '__weightOptions') option
      where option ->> 'weight' = v_selected_weight
      limit 1;

      if v_option is null then
        raise exception 'Select an available pack size for %', v_product.name;
      end if;

      v_unit_price := (v_option ->> 'price')::numeric(12,2);
    end if;

    insert into public.order_items (
      order_id, product_id, product_name, product_image, sku, selected_weight,
      unit_price, quantity, line_total
    ) values (
      v_order_id, v_product.id, v_product.name, v_product.image, v_product.sku,
      v_selected_weight, v_unit_price, v_quantity, v_unit_price * v_quantity
    );

    update public.products
    set stock_quantity = stock_quantity - v_quantity
    where id = v_product.id;

    v_subtotal := v_subtotal + (v_unit_price * v_quantity);
  end loop;

  v_delivery := case when v_subtotal >= 1500 then 0 else 50 end;

  update public.orders
  set subtotal = v_subtotal,
      delivery = v_delivery,
      total = v_subtotal + v_delivery,
      updated_at = now()
  where id = v_order_id;

  return jsonb_build_object(
    'id', v_order_id,
    'order_number', v_order_number,
    'subtotal', v_subtotal,
    'delivery', v_delivery,
    'total', v_subtotal + v_delivery
  );
end;
$$;

revoke all on function public.create_order(uuid, jsonb) from public;
grant execute on function public.create_order(uuid, jsonb) to authenticated;

create or replace function public.mark_order_whatsapp_opened(p_order_id uuid)
returns void
language sql
security definer
set search_path = public, pg_temp
as $$
  update public.orders
  set whatsapp_opened_at = coalesce(whatsapp_opened_at, now()), updated_at = now()
  where id = p_order_id and user_id = auth.uid();
$$;

revoke all on function public.mark_order_whatsapp_opened(uuid) from public;
grant execute on function public.mark_order_whatsapp_opened(uuid) to authenticated;

create or replace function public.admin_update_order(
  p_order_id uuid,
  p_status text,
  p_payment_status text
)
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_previous_status text;
  v_item record;
  v_stock integer;
begin
  if coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') <> 'admin' then
    raise exception 'Administrator access is required';
  end if;

  if p_status not in ('pending', 'confirmed', 'packed', 'shipped', 'delivered', 'cancelled') then
    raise exception 'Invalid order status';
  end if;

  if p_payment_status not in ('pending', 'paid', 'failed', 'refunded') then
    raise exception 'Invalid payment status';
  end if;

  select status into v_previous_status
  from public.orders
  where id = p_order_id
  for update;

  if not found then
    raise exception 'Order not found';
  end if;

  if v_previous_status <> 'cancelled' and p_status = 'cancelled' then
    update public.products p
    set stock_quantity = p.stock_quantity + restored.quantity
    from (
      select product_id, sum(quantity)::integer as quantity
      from public.order_items
      where order_id = p_order_id and product_id is not null
      group by product_id
    ) restored
    where restored.product_id = p.id;
  elsif v_previous_status = 'cancelled' and p_status <> 'cancelled' then
    for v_item in
      select product_id, product_name, quantity
      from public.order_items
      where order_id = p_order_id
    loop
      if v_item.product_id is null then
        raise exception 'Cannot reopen the order because % no longer exists', v_item.product_name;
      end if;

      select stock_quantity into v_stock
      from public.products
      where id = v_item.product_id
      for update;

      if not found or v_stock < v_item.quantity then
        raise exception 'Not enough stock to reopen %', v_item.product_name;
      end if;

      update public.products
      set stock_quantity = stock_quantity - v_item.quantity
      where id = v_item.product_id;
    end loop;
  end if;

  update public.orders
  set status = p_status, payment_status = p_payment_status, updated_at = now()
  where id = p_order_id;
end;
$$;

revoke all on function public.admin_update_order(uuid, text, text) from public;
grant execute on function public.admin_update_order(uuid, text, text) to authenticated;
