import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type OrderItem = {
  name: string;
  price: string;
  quantity: number;
  category: string;
};

export type Order = {
  id?: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  items: OrderItem[];
  total_amount: number;
  delivery_address?: string;
  order_type: 'pickup' | 'delivery';
  status?: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  notes?: string;
  created_at?: string;
  updated_at?: string;
};

export type Employee = {
  id?: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  hire_date: string;
  is_active?: boolean;
  created_at?: string;
};

export type Attendance = {
  id?: string;
  employee_id: string;
  date: string;
  check_in?: string;
  check_out?: string;
  status: 'present' | 'absent' | 'late' | 'half_day' | 'leave';
  notes?: string;
  created_at?: string;
};
