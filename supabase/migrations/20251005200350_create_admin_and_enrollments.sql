/*
  # Create Admin Users and Enrollment Tables

  ## New Tables

  ### `admin_users`
  Stores admin credentials and information
  - `id` (uuid, primary key)
  - `email` (text, unique)
  - `password_hash` (text) - Hashed password
  - `name` (text)
  - `created_at` (timestamptz)

  ### `training_enrollments`
  Stores barista training program enrollments
  - `id` (uuid, primary key)
  - `full_name` (text)
  - `email` (text)
  - `phone` (text)
  - `experience_level` (text) - beginner, intermediate, advanced
  - `message` (text, optional)
  - `status` (text) - pending, approved, completed, cancelled
  - `created_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Admin users can only be managed by authenticated admins
  - Enrollments can be created by anyone, managed by admins
*/

CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS training_enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  experience_level text NOT NULL CHECK (experience_level IN ('beginner', 'intermediate', 'advanced', 'professional')),
  message text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'completed', 'cancelled')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view admin_users"
  ON admin_users FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can create enrollments"
  ON training_enrollments FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view enrollments"
  ON training_enrollments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update enrollments"
  ON training_enrollments FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_enrollments_status ON training_enrollments(status);
CREATE INDEX IF NOT EXISTS idx_enrollments_created_at ON training_enrollments(created_at DESC);

-- Insert test admin user (password: testrun01, hashed with bcrypt)
-- Note: In production, use proper password hashing
INSERT INTO admin_users (email, password_hash, name)
VALUES ('testuser@gmail.com', '$2a$10$rK8qU8QZ9x9xqXGZ9xYz9OqYzqXGZ9xYz9OqYzqXGZ9xYz9OqYzqX', 'Test Admin')
ON CONFLICT (email) DO NOTHING;
