-- ============================================================
--  SNR AI Marketing OS — Multi-Tenant Schema
--  Run this AFTER the base schema.sql
--  Adds white-label SaaS support
-- ============================================================

-- Tenants table (one row per agency)
CREATE TABLE IF NOT EXISTS tenants (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_name     TEXT NOT NULL,
  tagline         TEXT,
  brand_color     TEXT DEFAULT '#3B82F6',
  logo_url        TEXT,
  contact_email   TEXT,
  contact_phone   TEXT,
  website         TEXT,
  plan            TEXT DEFAULT 'growth' CHECK (plan IN ('starter', 'growth', 'pro')),
  status          TEXT DEFAULT 'trial'  CHECK (status IN ('active', 'trial', 'suspended')),
  admin_user_id   UUID REFERENCES auth.users(id),
  custom_domain   TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Add tenant_id to all core tables
ALTER TABLE leads        ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES tenants(id);
ALTER TABLE campaigns    ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES tenants(id);
ALTER TABLE profiles     ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES tenants(id);
ALTER TABLE monthly_reports ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES tenants(id);

-- Indexes
CREATE INDEX IF NOT EXISTS leads_tenant_id_idx        ON leads(tenant_id);
CREATE INDEX IF NOT EXISTS campaigns_tenant_id_idx    ON campaigns(tenant_id);
CREATE INDEX IF NOT EXISTS profiles_tenant_id_idx     ON profiles(tenant_id);

-- ── RLS policies ────────────────────────────────────────────

ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;

-- Tenant admins can view/edit their own tenant
CREATE POLICY "Tenant admin access" ON tenants
  FOR ALL USING (
    admin_user_id = auth.uid()
    OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
        AND profiles.role = 'admin'
        AND profiles.tenant_id IS NULL -- SNR master admin
    )
  );

-- Leads: tenant-scoped access
DROP POLICY IF EXISTS "Users see own leads" ON leads;
CREATE POLICY "Tenant scoped leads" ON leads
  FOR ALL USING (
    tenant_id = (SELECT tenant_id FROM profiles WHERE id = auth.uid())
    OR
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin' AND tenant_id IS NULL)
  );

-- ── Helper function ──────────────────────────────────────────

CREATE OR REPLACE FUNCTION get_current_tenant_id()
RETURNS UUID AS $$
  SELECT tenant_id FROM profiles WHERE id = auth.uid() LIMIT 1;
$$ LANGUAGE SQL SECURITY DEFINER;

-- ── Usage tracking ───────────────────────────────────────────

CREATE TABLE IF NOT EXISTS tenant_usage (
  tenant_id       UUID PRIMARY KEY REFERENCES tenants(id),
  lead_count      INTEGER DEFAULT 0,
  client_count    INTEGER DEFAULT 0,
  campaign_count  INTEGER DEFAULT 0,
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-update lead count on insert
CREATE OR REPLACE FUNCTION increment_tenant_lead_count()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO tenant_usage (tenant_id, lead_count)
    VALUES (NEW.tenant_id, 1)
  ON CONFLICT (tenant_id)
    DO UPDATE SET lead_count = tenant_usage.lead_count + 1, updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_lead_insert ON leads;
CREATE TRIGGER on_lead_insert
  AFTER INSERT ON leads
  FOR EACH ROW WHEN (NEW.tenant_id IS NOT NULL)
  EXECUTE FUNCTION increment_tenant_lead_count();

-- ── Seed SNR master tenant ───────────────────────────────────

-- Run after creating your Supabase user:
-- UPDATE tenants SET admin_user_id = auth.uid()
--   WHERE agency_name = 'SNR Digital Marketing';
