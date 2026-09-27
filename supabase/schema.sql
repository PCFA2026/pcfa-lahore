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

-- Prevent accidental duplicate imports and duplicate public form entries.
CREATE UNIQUE INDEX IF NOT EXISTS approved_members_email_unique
  ON approved_members (lower(email));
CREATE INDEX IF NOT EXISTS approved_members_type_name_index
  ON approved_members (application_type, full_name);

-- Public programmes managed from the admin dashboard.
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  title_zh text,
  description text,
  description_zh text,
  event_date date,
  location text,
  cover_image_url text,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS gallery_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  title_zh text,
  description text,
  description_zh text,
  event_date date,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES gallery_posts(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  alt_text text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS events_public_date_index ON events (status, event_date);
CREATE INDEX IF NOT EXISTS gallery_posts_public_date_index ON gallery_posts (status, event_date DESC);
CREATE INDEX IF NOT EXISTS gallery_images_post_sort_index ON gallery_images (post_id, sort_order);

-- Row Level Security
ALTER TABLE membership_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE approved_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_sends ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- Deny all direct access. Every operation goes through server API routes
-- using the service role key, which bypasses RLS.
-- (RLS enabled with no policies already denies everything; these explicit
--  deny policies document the intent and stay effective if policies are added.)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'membership_applications' AND policyname = 'deny_all') THEN
    CREATE POLICY "deny_all" ON membership_applications FOR ALL USING (false);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'approved_members' AND policyname = 'deny_all') THEN
    CREATE POLICY "deny_all" ON approved_members FOR ALL USING (false);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'newsletter_sends' AND policyname = 'deny_all') THEN
    CREATE POLICY "deny_all" ON newsletter_sends FOR ALL USING (false);
  END IF;
END $$;

-- Public visitors can read only published events and gallery images belonging
-- to published posts. Writes remain server-only through the service-role APIs.
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'events' AND policyname = 'public_read_published_events') THEN
    CREATE POLICY "public_read_published_events" ON events FOR SELECT USING (status = 'published');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'gallery_posts' AND policyname = 'public_read_published_gallery_posts') THEN
    CREATE POLICY "public_read_published_gallery_posts" ON gallery_posts FOR SELECT USING (status = 'published');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'gallery_images' AND policyname = 'public_read_published_gallery_images') THEN
    CREATE POLICY "public_read_published_gallery_images" ON gallery_images FOR SELECT USING (EXISTS (SELECT 1 FROM gallery_posts WHERE gallery_posts.id = gallery_images.post_id AND gallery_posts.status = 'published'));
  END IF;
END $$;
