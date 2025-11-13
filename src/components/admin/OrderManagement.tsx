import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Package, Clock, Truck, CheckCircle, XCircle } from 'lucide-react';

type Order = {
  id: string;
  customer_name: string;
  customer_phone: string;
  items: any[];
  total_amount: number;
  order_type: string;
  status: string;
  created_at: string;
  delivery_address?: string;
  notes?: string;
};

export default function OrderManagement() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;
      await loadOrders();
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'preparing':
        return <Package className="w-5 h-5 text-blue-500" />;
      case 'ready':
        return <Truck className="w-5 h-5 text-purple-500" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const filteredOrders = filter === 'all'
    ? orders
    : orders.filter(o => o.status === filter);

  return (
    <div>
      <h2 className="text-3xl font-serif text-cream mb-8">Order Management</h2>

      <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
        {['all', 'pending', 'preparing', 'ready', 'completed', 'cancelled'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              filter === status
                ? 'bg-amber-700 text-cream'
                : 'bg-stone-800 text-cream/70 hover:bg-stone-700'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
            {status !== 'all' && (
              <span className="ml-2 bg-stone-900/50 px-2 py-0.5 rounded-full text-xs">
                {orders.filter(o => o.status === status).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-cream/60 text-center py-8">Loading orders...</div>
      ) : filteredOrders.length === 0 ? (
        <div className="bg-stone-900 border border-amber-900/20 rounded-xl p-8 text-center">
          <p className="text-cream/60">No orders found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-stone-900 border border-amber-900/20 rounded-xl p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-cream mb-1">
                    {order.customer_name}
                  </h3>
                  <p className="text-cream/60 text-sm">{order.customer_phone}</p>
                  <p className="text-cream/60 text-sm">
                    {new Date(order.created_at).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(order.status)}
                  <span className="font-medium text-cream capitalize">{order.status}</span>
                </div>
              </div>

              <div className="border-t border-amber-900/20 pt-4 mb-4">
                <h4 className="text-cream font-medium mb-2">Items:</h4>
                <div className="space-y-2">
                  {order.items.map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between text-cream/80">
                      <span>
                        {item.name} x {item.quantity}
                      </span>
                      <span>{item.price}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-cream font-bold mt-3 pt-3 border-t border-amber-900/20">
                  <span>Total:</span>
                  <span>Tk {order.total_amount}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <span className="text-cream/70 text-sm">Type:</span>
                <span className="bg-stone-800 px-3 py-1 rounded-full text-cream text-sm capitalize">
                  {order.order_type}
                </span>
                {order.delivery_address && (
                  <span className="text-cream/60 text-sm">
                    → {order.delivery_address}
                  </span>
                )}
              </div>

              {order.notes && (
                <div className="bg-stone-800 rounded p-3 mb-4">
                  <p className="text-cream/70 text-sm">
                    <strong>Notes:</strong> {order.notes}
                  </p>
                </div>
              )}

              <div className="flex gap-2 flex-wrap">
                {order.status === 'pending' && (
                  <>
                    <button
                      onClick={() => updateOrderStatus(order.id, 'preparing')}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Start Preparing
                    </button>
                    <button
                      onClick={() => updateOrderStatus(order.id, 'cancelled')}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </>
                )}
                {order.status === 'preparing' && (
                  <button
                    onClick={() => updateOrderStatus(order.id, 'ready')}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Mark as Ready
                  </button>
                )}
                {order.status === 'ready' && (
                  <button
                    onClick={() => updateOrderStatus(order.id, 'completed')}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Complete Order
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
