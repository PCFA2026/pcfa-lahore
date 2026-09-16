-- PCFA Lahore — Supabase schema
-- Run this in the Supabase SQL Editor.

-- Membership applications (public form submissions)
CREATE TABLE IF NOT EXISTS membership_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  country text,
  city text,
  organization text,
  designation text,
  education text,
  reason text,
  application_type text NOT NULL DEFAULT 'honorary' CHECK (application_type IN ('honorary', 'alumni')),
  father_husband_name text,
  residential_address text,
  office_address text,
  chinese_institution_city text,
  qualification text,
  qualification_year text,
  honorary_membership boolean,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Approved members (copied here when an application is approved)
CREATE TABLE IF NOT EXISTS approved_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  country text,
  city text,
  organization text,
  designation text,
  education text,
  reason text,
  application_type text NOT NULL DEFAULT 'honorary' CHECK (application_type IN ('honorary', 'alumni')),
  father_husband_name text,
  residential_address text,
  office_address text,
  chinese_institution_city text,
  qualification text,
  qualification_year text,
  honorary_membership boolean,
  approved_at timestamptz NOT NULL DEFAULT now()
);

-- Safely add the new fields when upgrading an existing project.
ALTER TABLE membership_applications ADD COLUMN IF NOT EXISTS application_type text NOT NULL DEFAULT 'honorary' CHECK (application_type IN ('honorary', 'alumni'));
ALTER TABLE membership_applications ADD COLUMN IF NOT EXISTS father_husband_name text;
ALTER TABLE membership_applications ADD COLUMN IF NOT EXISTS residential_address text;
ALTER TABLE membership_applications ADD COLUMN IF NOT EXISTS office_address text;
ALTER TABLE membership_applications ADD COLUMN IF NOT EXISTS chinese_institution_city text;
ALTER TABLE membership_applications ADD COLUMN IF NOT EXISTS qualification text;
ALTER TABLE membership_applications ADD COLUMN IF NOT EXISTS qualification_year text;
ALTER TABLE membership_applications ADD COLUMN IF NOT EXISTS honorary_membership boolean;
ALTER TABLE approved_members ADD COLUMN IF NOT EXISTS application_type text NOT NULL DEFAULT 'honorary' CHECK (application_type IN ('honorary', 'alumni'));
ALTER TABLE approved_members ADD COLUMN IF NOT EXISTS father_husband_name text;
ALTER TABLE approved_members ADD COLUMN IF NOT EXISTS residential_address text;
ALTER TABLE approved_members ADD COLUMN IF NOT EXISTS office_address text;
ALTER TABLE approved_members ADD COLUMN IF NOT EXISTS chinese_institution_city text;
ALTER TABLE approved_members ADD COLUMN IF NOT EXISTS qualification text;
ALTER TABLE approved_members ADD COLUMN IF NOT EXISTS qualification_year text;
ALTER TABLE approved_members ADD COLUMN IF NOT EXISTS honorary_membership boolean;

-- Newsletter send log
CREATE TABLE IF NOT EXISTS newsletter_sends (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject text NOT NULL,
  message text NOT NULL,
  recipient_count int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Row Level Security
ALTER TABLE membership_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE approved_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_sends ENABLE ROW LEVEL SECURITY;

-- Deny all direct access. Every operation goes through server API routes
-- using the service role key, which bypasses RLS.
-- (RLS enabled with no policies already denies everything; these explicit
--  deny policies document the intent and stay effective if policies are added.)
CREATE POLICY "deny_all" ON membership_applications FOR ALL USING (false);
CREATE POLICY "deny_all" ON approved_members FOR ALL USING (false);
CREATE POLICY "deny_all" ON newsletter_sends FOR ALL USING (false);
