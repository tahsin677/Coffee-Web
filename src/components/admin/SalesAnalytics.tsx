import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Calendar, TrendingUp } from 'lucide-react';

export default function SalesAnalytics() {
  const [salesData, setSalesData] = useState<any[]>([]);
  const [filter, setFilter] = useState('all');
  const [customDate, setCustomDate] = useState('');
  const [stats, setStats] = useState({
    totalSales: 0,
    orderCount: 0,
    avgOrderValue: 0,
  });

  useEffect(() => {
    loadSalesData();
  }, [filter, customDate]);

  const loadSalesData = async () => {
    try {
      let query = supabase.from('orders').select('*').eq('status', 'completed');

      const now = new Date();
      if (filter === 'today') {
        const today = now.toISOString().split('T')[0];
        query = query.gte('created_at', `${today}T00:00:00`);
      } else if (filter === 'month') {
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
        query = query.gte('created_at', firstDay);
      } else if (filter === 'year') {
        const firstDay = new Date(now.getFullYear(), 0, 1).toISOString();
        query = query.gte('created_at', firstDay);
      } else if (filter === 'custom' && customDate) {
        query = query.gte('created_at', `${customDate}T00:00:00`).lte('created_at', `${customDate}T23:59:59`);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;

      const orders = data || [];
      const totalSales = orders.reduce((sum, order) => sum + Number(order.total_amount), 0);
      const avgOrderValue = orders.length > 0 ? totalSales / orders.length : 0;

      setSalesData(orders);
      setStats({
        totalSales,
        orderCount: orders.length,
        avgOrderValue,
      });
    } catch (error) {
      console.error('Error loading sales data:', error);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-serif text-cream mb-8">Sales Analytics</h2>

      <div className="flex flex-wrap gap-3 mb-6">
        {['all', 'today', 'month', 'year', 'custom'].map((filterOption) => (
          <button
            key={filterOption}
            onClick={() => setFilter(filterOption)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === filterOption
                ? 'bg-amber-700 text-cream'
                : 'bg-stone-800 text-cream/70 hover:bg-stone-700'
            }`}
          >
            {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
          </button>
        ))}
      </div>

      {filter === 'custom' && (
        <div className="mb-6">
          <label className="block text-cream mb-2">Select Date:</label>
          <input
            type="date"
            value={customDate}
            onChange={(e) => setCustomDate(e.target.value)}
            className="bg-stone-800 text-cream border border-amber-900/30 rounded-lg p-3 focus:border-amber-500 focus:outline-none"
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-green-900/30 to-green-950/30 border border-green-700/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-6 h-6 text-green-500" />
            <h3 className="text-cream/70">Total Sales</h3>
          </div>
          <p className="text-3xl font-bold text-cream">Tk {stats.totalSales.toLocaleString()}</p>
        </div>

        <div className="bg-gradient-to-br from-blue-900/30 to-blue-950/30 border border-blue-700/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-6 h-6 text-blue-500" />
            <h3 className="text-cream/70">Total Orders</h3>
          </div>
          <p className="text-3xl font-bold text-cream">{stats.orderCount}</p>
        </div>

        <div className="bg-gradient-to-br from-purple-900/30 to-purple-950/30 border border-purple-700/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-6 h-6 text-purple-500" />
            <h3 className="text-cream/70">Avg Order Value</h3>
          </div>
          <p className="text-3xl font-bold text-cream">Tk {Math.round(stats.avgOrderValue)}</p>
        </div>
      </div>

      <div className="bg-stone-900 border border-amber-900/20 rounded-xl overflow-hidden">
        <div className="p-6">
          <h3 className="text-xl font-serif text-cream mb-4">Recent Completed Orders</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-stone-800">
              <tr>
                <th className="text-left text-cream p-4">Date</th>
                <th className="text-left text-cream p-4">Customer</th>
                <th className="text-left text-cream p-4">Items</th>
                <th className="text-right text-cream p-4">Amount</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map((order) => (
                <tr key={order.id} className="border-t border-amber-900/20">
                  <td className="text-cream/80 p-4">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                  <td className="text-cream/80 p-4">{order.customer_name}</td>
                  <td className="text-cream/60 p-4 text-sm">
                    {order.items.length} item(s)
                  </td>
                  <td className="text-cream/80 p-4 text-right font-semibold">
                    Tk {order.total_amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {salesData.length === 0 && (
            <div className="text-cream/60 text-center py-8">
              No sales data for selected period
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
