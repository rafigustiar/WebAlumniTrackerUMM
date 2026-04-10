-- Supabase / PostgreSQL schema for Alumni Tracker UMM
-- Jalankan ini di SQL Editor Supabase untuk membuat tabel alumni.

CREATE TABLE IF NOT EXISTS alumni (
  id text PRIMARY KEY,
  nim text UNIQUE NOT NULL,
  name text NOT NULL,
  email text,
  phone text,
  graduation_year integer,
  department text,
  gender text,
  current_position text,
  company text,
  linkedin text,
  instagram text,
  facebook text,
  tiktok text,
  tempat_bekerja text,
  alamat_bekerja text,
  posisi text,
  jenis_pekerjaan text,
  sosial_media_tempat_kerja text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_alumni_nim ON alumni(nim);
CREATE INDEX IF NOT EXISTS idx_alumni_department ON alumni(department);
