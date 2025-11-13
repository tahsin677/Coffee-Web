import { useEffect, useState } from 'react';
import {
  ShoppingBag,
  DollarSign,
  Users as UsersIcon,
  Package,
  LogOut,
  TrendingUp,
  Calendar,
  Clock
} from 'lucide-react';
import OrderManagement from '../components/admin/OrderManagement';
import SalesAnalytics from '../components/admin/SalesAnalytics';
import EnrollmentManagement from '../components/admin/EnrollmentManagement';
import ProductManagement from '../components/admin/ProductManagement';
import AttendanceManagement from '../components/admin/AttendanceManagement';

type Tab = 'overview' | 'orders' | 'sales' | 'enrollments' | 'products' | 'attendance';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalSales: 0,
    pendingOrders: 0,
    enrollments: 0,
  });

  useEffect(() => {
    // Check authentication
    const isAuth = localStorage.getItem('adminAuth');
    if (!isAuth) {
      window.location.href = '/admin/login';
      return;
    }

    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const { supabase } = await import('../lib/supabase');

      const [ordersRes, enrollmentsRes] = await Promise.all([
        supabase.from('orders').select('total_amount, status'),
        supabase.from('training_enrollments').select('id'),
      ]);

      const orders = ordersRes.data || [];
      const totalSales = orders.reduce((sum, order) => sum + Number(order.total_amount), 0);
      const pendingOrders = orders.filter(o => o.status === 'pending').length;

      setStats({
        totalOrders: orders.length,
        totalSales: totalSales,
        pendingOrders: pendingOrders,
        enrollments: enrollmentsRes.data?.length || 0,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminEmail');
    window.location.href = '/admin/login';
  };

  return (
    <div className="min-h-screen bg-stone-950">
      <nav className="bg-stone-900 border-b border-amber-900/30 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-serif text-cream">SLASH COFFEE</h1>
            <p className="text-cream/60 text-sm">Admin Dashboard</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-cream/70 hover:text-cream transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </nav>

      <div className="flex">
        <aside className="w-64 bg-stone-900 border-r border-amber-900/30 min-h-screen p-4">
          <nav className="space-y-2">
            {[
              { id: 'overview', label: 'Overview', icon: TrendingUp },
              { id: 'orders', label: 'Orders', icon: ShoppingBag },
              { id: 'sales', label: 'Sales Analytics', icon: DollarSign },
              { id: 'enrollments', label: 'Enrollments', icon: UsersIcon },
              { id: 'products', label: 'Products', icon: Package },
              { id: 'attendance', label: 'Attendance', icon: Clock },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as Tab)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-amber-700 text-cream'
                      : 'text-cream/70 hover:bg-stone-800 hover:text-cream'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 p-8">
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-3xl font-serif text-cream mb-8">Overview</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-stone-900 border border-amber-900/20 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <ShoppingBag className="w-8 h-8 text-amber-500" />
                    <span className="text-amber-500 text-sm font-medium">ORDERS</span>
                  </div>
                  <p className="text-3xl font-bold text-cream">{stats.totalOrders}</p>
                  <p className="text-cream/60 text-sm mt-1">Total orders</p>
                </div>

                <div className="bg-stone-900 border border-amber-900/20 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <DollarSign className="w-8 h-8 text-green-500" />
                    <span className="text-green-500 text-sm font-medium">SALES</span>
                  </div>
                  <p className="text-3xl font-bold text-cream">Tk {stats.totalSales.toLocaleString()}</p>
                  <p className="text-cream/60 text-sm mt-1">Total revenue</p>
                </div>

                <div className="bg-stone-900 border border-amber-900/20 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Clock className="w-8 h-8 text-yellow-500" />
                    <span className="text-yellow-500 text-sm font-medium">PENDING</span>
                  </div>
                  <p className="text-3xl font-bold text-cream">{stats.pendingOrders}</p>
                  <p className="text-cream/60 text-sm mt-1">Pending orders</p>
                </div>

                <div className="bg-stone-900 border border-amber-900/20 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <UsersIcon className="w-8 h-8 text-blue-500" />
                    <span className="text-blue-500 text-sm font-medium">ENROLLMENTS</span>
                  </div>
                  <p className="text-3xl font-bold text-cream">{stats.enrollments}</p>
                  <p className="text-cream/60 text-sm mt-1">Training enrollments</p>
                </div>
              </div>

              <div className="bg-stone-900 border border-amber-900/20 rounded-xl p-6">
                <h3 className="text-xl font-serif text-cream mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="bg-stone-800 hover:bg-amber-700 text-cream p-4 rounded-lg transition-colors"
                  >
                    Manage Orders
                  </button>
                  <button
                    onClick={() => setActiveTab('sales')}
                    className="bg-stone-800 hover:bg-amber-700 text-cream p-4 rounded-lg transition-colors"
                  >
                    View Analytics
                  </button>
                  <button
                    onClick={() => setActiveTab('products')}
                    className="bg-stone-800 hover:bg-amber-700 text-cream p-4 rounded-lg transition-colors"
                  >
                    Add Product
                  </button>
                  <button
                    onClick={() => setActiveTab('attendance')}
                    className="bg-stone-800 hover:bg-amber-700 text-cream p-4 rounded-lg transition-colors"
                  >
                    Mark Attendance
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && <OrderManagement />}
          {activeTab === 'sales' && <SalesAnalytics />}
          {activeTab === 'enrollments' && <EnrollmentManagement />}
          {activeTab === 'products' && <ProductManagement />}
          {activeTab === 'attendance' && <AttendanceManagement />}
        </main>
      </div>
    </div>
  );
}
