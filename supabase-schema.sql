-- ============================================================
-- Wujood Platform — Database Schema v1.0
-- افتح Supabase SQL Editor وشغّل هذا الملف كاملاً
-- ============================================================

-- ======================================
-- ADMINS (must come first — referenced by is_admin)
-- ======================================
CREATE TABLE IF NOT EXISTS admins (
  id    UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name  TEXT NOT NULL DEFAULT 'أدمن',
  email TEXT
);

-- ======================================
-- IS_ADMIN helper
-- ======================================
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN LANGUAGE sql SECURITY DEFINER STABLE AS $$
  SELECT EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid())
$$;

-- ======================================
-- TENANTS
-- ======================================
CREATE TABLE IF NOT EXISTS tenants (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug             TEXT UNIQUE NOT NULL,
  name_ar          TEXT NOT NULL DEFAULT '',
  name_en          TEXT DEFAULT '',
  short_ar         TEXT DEFAULT '',
  sector           TEXT DEFAULT 'architecture',
  about_ar         TEXT DEFAULT '',
  about_en         TEXT DEFAULT '',
  phone            TEXT DEFAULT '',
  whatsapp         TEXT DEFAULT '',
  email            TEXT DEFAULT '',
  address_ar       TEXT DEFAULT '',
  maps_url         TEXT DEFAULT '',
  social           JSONB DEFAULT '{"instagram":"","twitter":"","linkedin":"","snapchat":"","tiktok":""}',
  plan             TEXT DEFAULT 'basic' CHECK (plan IN ('basic','pro','premium')),
  active           BOOLEAN DEFAULT true,
  starts_at        DATE,
  ends_at          DATE,
  current_template TEXT DEFAULT 'modern',
  custom_domain    TEXT,
  subdomain        TEXT UNIQUE,
  logo_url         TEXT DEFAULT '',
  cover_url        TEXT DEFAULT '',
  video_url        TEXT DEFAULT '',
  whatsapp_note    TEXT DEFAULT '',
  owner_id         UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_active"    ON tenants FOR SELECT USING (active = true);
CREATE POLICY "owner_select"     ON tenants FOR SELECT USING (owner_id = auth.uid());
CREATE POLICY "owner_update"     ON tenants FOR UPDATE USING (owner_id = auth.uid());
CREATE POLICY "admin_all"        ON tenants FOR ALL    USING (is_admin());

-- ======================================
-- PROJECTS
-- ======================================
CREATE TABLE IF NOT EXISTS projects (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id   UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  title_ar    TEXT NOT NULL DEFAULT '',
  title_en    TEXT DEFAULT '',
  category    TEXT DEFAULT 'سكني',
  location    TEXT DEFAULT '',
  year        INTEGER DEFAULT EXTRACT(year FROM NOW())::INTEGER,
  description TEXT DEFAULT '',
  featured    BOOLEAN DEFAULT false,
  status      TEXT DEFAULT 'مكتمل',
  area        NUMERIC,
  rooms       INTEGER,
  baths       INTEGER,
  tags        TEXT[] DEFAULT '{}',
  images      TEXT[] DEFAULT '{}',
  cover_url   TEXT DEFAULT '',
  cover_seed  INTEGER DEFAULT 1,
  order_idx   INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_projects"  ON projects FOR SELECT USING (EXISTS (SELECT 1 FROM tenants WHERE id = tenant_id AND active = true));
CREATE POLICY "owner_all_proj"   ON projects FOR ALL    USING (is_admin() OR EXISTS (SELECT 1 FROM tenants WHERE id = tenant_id AND owner_id = auth.uid()));

-- ======================================
-- SERVICES  (type = 'service' | 'feature')
-- ======================================
CREATE TABLE IF NOT EXISTS services (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id   UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  type        TEXT DEFAULT 'service' CHECK (type IN ('service','feature')),
  title       TEXT NOT NULL DEFAULT '',
  description TEXT DEFAULT '',
  icon        TEXT DEFAULT 'cube',
  published   BOOLEAN DEFAULT true,
  order_idx   INTEGER DEFAULT 0
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_services"  ON services FOR SELECT USING (published = true AND EXISTS (SELECT 1 FROM tenants WHERE id = tenant_id AND active = true));
CREATE POLICY "owner_all_srv"    ON services FOR ALL    USING (is_admin() OR EXISTS (SELECT 1 FROM tenants WHERE id = tenant_id AND owner_id = auth.uid()));

-- ======================================
-- STATS
-- ======================================
CREATE TABLE IF NOT EXISTS stats (
  id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  value     NUMERIC NOT NULL DEFAULT 0,
  suffix    TEXT DEFAULT '',
  label     TEXT NOT NULL DEFAULT '',
  order_idx INTEGER DEFAULT 0
);

ALTER TABLE stats ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_stats"    ON stats FOR SELECT USING (EXISTS (SELECT 1 FROM tenants WHERE id = tenant_id AND active = true));
CREATE POLICY "owner_all_stats" ON stats FOR ALL    USING (is_admin() OR EXISTS (SELECT 1 FROM tenants WHERE id = tenant_id AND owner_id = auth.uid()));

-- ======================================
-- TESTIMONIALS
-- ======================================
CREATE TABLE IF NOT EXISTS testimonials (
  id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name      TEXT NOT NULL DEFAULT '',
  role      TEXT DEFAULT '',
  body      TEXT DEFAULT '',
  rating    INTEGER DEFAULT 5,
  published BOOLEAN DEFAULT true,
  order_idx INTEGER DEFAULT 0
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_testi"   ON testimonials FOR SELECT USING (published = true AND EXISTS (SELECT 1 FROM tenants WHERE id = tenant_id AND active = true));
CREATE POLICY "owner_all_testi"ON testimonials FOR ALL    USING (is_admin() OR EXISTS (SELECT 1 FROM tenants WHERE id = tenant_id AND owner_id = auth.uid()));

-- ======================================
-- FAQS
-- ======================================
CREATE TABLE IF NOT EXISTS faqs (
  id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  question  TEXT NOT NULL DEFAULT '',
  answer    TEXT DEFAULT '',
  published BOOLEAN DEFAULT true,
  order_idx INTEGER DEFAULT 0
);

ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_faqs"    ON faqs FOR SELECT USING (published = true AND EXISTS (SELECT 1 FROM tenants WHERE id = tenant_id AND active = true));
CREATE POLICY "owner_all_faqs" ON faqs FOR ALL    USING (is_admin() OR EXISTS (SELECT 1 FROM tenants WHERE id = tenant_id AND owner_id = auth.uid()));

-- ======================================
-- SUBSCRIPTION LOGS
-- ======================================
CREATE TABLE IF NOT EXISTS subscription_logs (
  id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  action    TEXT NOT NULL,
  plan      TEXT DEFAULT 'basic',
  amount    NUMERIC DEFAULT 0,
  note      TEXT DEFAULT '',
  by_user   TEXT DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE subscription_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_select_logs" ON subscription_logs FOR SELECT USING (is_admin() OR EXISTS (SELECT 1 FROM tenants WHERE id = tenant_id AND owner_id = auth.uid()));
CREATE POLICY "admin_all_logs"    ON subscription_logs FOR ALL    USING (is_admin());

-- ======================================
-- PLATFORM SETTINGS
-- ======================================
CREATE TABLE IF NOT EXISTS platform_settings (
  id       INTEGER PRIMARY KEY DEFAULT 1,
  name     TEXT DEFAULT 'وجود',
  domain   TEXT DEFAULT 'wujood.sa',
  whatsapp TEXT DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE platform_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admin_settings" ON platform_settings FOR ALL USING (is_admin());

INSERT INTO platform_settings (id, name, domain, whatsapp)
VALUES (1, 'وجود', 'wujood.sa', '+966500000000')
ON CONFLICT (id) DO NOTHING;

-- ======================================
-- STORAGE BUCKETS
-- ======================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  ('logos',    'logos',    true, 2097152,  ARRAY['image/png','image/jpeg','image/svg+xml','image/webp']),
  ('covers',   'covers',   true, 5242880,  ARRAY['image/jpeg','image/webp','image/png']),
  ('projects', 'projects', true, 10485760, ARRAY['image/jpeg','image/webp','image/png'])
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "pub_read_logos"    ON storage.objects FOR SELECT  USING (bucket_id = 'logos');
CREATE POLICY "auth_write_logos"  ON storage.objects FOR INSERT  WITH CHECK (bucket_id = 'logos'    AND auth.uid() IS NOT NULL);
CREATE POLICY "auth_update_logos" ON storage.objects FOR UPDATE  USING (bucket_id = 'logos'         AND auth.uid() IS NOT NULL);
CREATE POLICY "auth_delete_logos" ON storage.objects FOR DELETE  USING (bucket_id = 'logos'         AND auth.uid() IS NOT NULL);

CREATE POLICY "pub_read_covers"    ON storage.objects FOR SELECT  USING (bucket_id = 'covers');
CREATE POLICY "auth_write_covers"  ON storage.objects FOR INSERT  WITH CHECK (bucket_id = 'covers'  AND auth.uid() IS NOT NULL);
CREATE POLICY "auth_update_covers" ON storage.objects FOR UPDATE  USING (bucket_id = 'covers'       AND auth.uid() IS NOT NULL);
CREATE POLICY "auth_delete_covers" ON storage.objects FOR DELETE  USING (bucket_id = 'covers'       AND auth.uid() IS NOT NULL);

CREATE POLICY "pub_read_projects"    ON storage.objects FOR SELECT  USING (bucket_id = 'projects');
CREATE POLICY "auth_write_projects"  ON storage.objects FOR INSERT  WITH CHECK (bucket_id = 'projects' AND auth.uid() IS NOT NULL);
CREATE POLICY "auth_update_projects" ON storage.objects FOR UPDATE  USING (bucket_id = 'projects'    AND auth.uid() IS NOT NULL);
CREATE POLICY "auth_delete_projects" ON storage.objects FOR DELETE  USING (bucket_id = 'projects'    AND auth.uid() IS NOT NULL);

-- ======================================
-- AUTO updated_at
-- ======================================
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$;
CREATE TRIGGER tenants_updated_at BEFORE UPDATE ON tenants FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ======================================
-- HOW TO ADD FIRST ADMIN USER
-- ======================================
-- 1. Go to Supabase → Authentication → Users → "Invite user"
--    (or Add User) with email admin@wujood.sa and a password.
-- 2. Copy the user's UUID from the Users list.
-- 3. Run:  INSERT INTO admins (id, name, email) VALUES ('<UUID>', 'مالك المنصة', 'admin@wujood.sa');
-- 4. Log in with that email/password via the /login page and select "أدمن المنصة".
