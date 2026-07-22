# Fitora Supabase production setup

The app reads Supabase settings from `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.

1. Confirm the Supabase project is active and copy its Project URL and public anon key from **Project Settings → API**.
2. Set both variables in `.env.local` for development and in **Netlify → Site configuration → Environment variables** for production.
3. Run [202607220001_production_hardening.sql](supabase/migrations/202607220001_production_hardening.sql) in the Supabase SQL editor.
4. Run [202607230001_orders_and_inventory.sql](supabase/migrations/202607230001_orders_and_inventory.sql) to add persistent orders, SKU and stock fields, atomic checkout, and order administration.
5. Create the admin through Supabase Authentication. Then, using the SQL editor with the email changed to the real admin email, assign the protected app-metadata role:

```sql
update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role":"admin"}'::jsonb
where email = 'ADMIN_EMAIL_HERE';
```

6. Sign out and sign in again so Supabase issues a new token containing the admin role.

The inventory migration assigns existing products an initial stock quantity of 100 so the current catalog remains purchasable. Review every SKU, stock quantity, and low-stock threshold in the admin dashboard before launch. Newly created products default to zero stock until an administrator sets the real quantity.

## Category permission repair

If adding a category reports `new row violates row-level security policy for table "categories"`, run [202607220002_fix_category_admin_policy.sql](supabase/migrations/202607220002_fix_category_admin_policy.sql) in the Supabase SQL editor. Then sign out of Fitora and sign in again so the browser receives the latest admin role.

Never place the service-role key in frontend code or a `VITE_` environment variable.
