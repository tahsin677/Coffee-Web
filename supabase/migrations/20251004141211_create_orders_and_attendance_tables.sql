/*
  # Create Orders and Employee Attendance Tables

  ## Overview
  This migration creates the database structure for online ordering and employee attendance tracking systems for SLASH Coffee Roasting Co.

  ## New Tables

  ### `orders`
  Stores customer orders placed through the website
  - `id` (uuid, primary key) - Unique identifier for each order
  - `customer_name` (text) - Name of the customer
  - `customer_phone` (text) - Customer phone number
  - `customer_email` (text, optional) - Customer email address
  - `items` (jsonb) - Array of ordered items with quantities and prices
  - `total_amount` (decimal) - Total order amount in BDT
  - `delivery_address` (text, optional) - Delivery address if applicable
  - `order_type` (text) - Type: 'pickup' or 'delivery'
  - `status` (text) - Order status: 'pending', 'preparing', 'ready', 'completed', 'cancelled'
  - `notes` (text, optional) - Special instructions or notes
  - `created_at` (timestamptz) - When the order was placed
  - `updated_at` (timestamptz) - Last update timestamp

  ### `employees`
  Stores employee information for attendance tracking
  - `id` (uuid, primary key) - Unique identifier for each employee
  - `name` (text) - Employee full name
  - `email` (text, unique) - Employee email address
  - `phone` (text) - Employee phone number
  - `position` (text) - Job position (e.g., 'Barista', 'Manager', 'Chef')
  - `hire_date` (date) - Date employee was hired
  - `is_active` (boolean) - Whether employee is currently active
  - `created_at` (timestamptz) - When record was created

  ### `attendance`
  Tracks daily employee attendance
  - `id` (uuid, primary key) - Unique identifier for each attendance record
  - `employee_id` (uuid, foreign key) - References employees table
  - `date` (date) - Date of attendance
  - `check_in` (timestamptz, optional) - Check-in timestamp
  - `check_out` (timestamptz, optional) - Check-out timestamp
  - `status` (text) - Attendance status: 'present', 'absent', 'late', 'half_day', 'leave'
  - `notes` (text, optional) - Additional notes about attendance
  - `created_at` (timestamptz) - When record was created

  ## Security
  - Enable Row Level Security (RLS) on all tables
  - Orders: Allow public to create orders, authenticated users to view/manage
  - Employees: Only authenticated users can view/manage
  - Attendance: Only authenticated users can view/manage

  ## Notes
  - JSONB format for order items allows flexible menu item storage
  - Attendance system tracks both check-in/out times and overall status
  - Foreign key constraint ensures data integrity between attendance and employees
*/

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_phone text NOT NULL,
  customer_email text,
  items jsonb NOT NULL,
  total_amount decimal(10,2) NOT NULL,
  delivery_address text,
  order_type text NOT NULL DEFAULT 'pickup' CHECK (order_type IN ('pickup', 'delivery')),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'preparing', 'ready', 'completed', 'cancelled')),
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS employees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text NOT NULL,
  position text NOT NULL,
  hire_date date NOT NULL DEFAULT CURRENT_DATE,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS attendance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  date date NOT NULL DEFAULT CURRENT_DATE,
  check_in timestamptz,
  check_out timestamptz,
  status text NOT NULL DEFAULT 'present' CHECK (status IN ('present', 'absent', 'late', 'half_day', 'leave')),
  notes text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(employee_id, date)
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create orders"
  ON orders FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all orders"
  ON orders FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update orders"
  ON orders FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete orders"
  ON orders FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can view employees"
  ON employees FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert employees"
  ON employees FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update employees"
  ON employees FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete employees"
  ON employees FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can view attendance"
  ON attendance FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert attendance"
  ON attendance FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update attendance"
  ON attendance FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete attendance"
  ON attendance FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_attendance_employee_date ON attendance(employee_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_employees_is_active ON employees(is_active);
