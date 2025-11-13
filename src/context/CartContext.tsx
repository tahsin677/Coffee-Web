import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { ShoppingCart, X } from 'lucide-react';

// --------------------
// Types
// --------------------

export type CartItem = {
  name: string;
  price: number;
  quantity: number;
  category: string;
  image: string;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (itemName: string) => void;
  updateQuantity: (itemName: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
};

// --------------------
// Context Setup
// --------------------

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.name === item.name);
      if (existing) {
        return prev.map((i) =>
          i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemName: string) => {
    setCart((prev) => prev.filter((i) => i.name !== itemName));
  };

  const updateQuantity = (itemName: string, quantity: number) => {
    if (quantity <= 0) return removeFromCart(itemName);
    setCart((prev) =>
      prev.map((i) => (i.name === itemName ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => setCart([]);

  const getCartTotal = () =>
    cart.reduce((t, item) => t + item.price * item.quantity, 0);

  const getCartCount = () =>
    cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}

// --------------------
// Modal Portal Helper
// --------------------

function CartModalPortal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [portalEl] = useState(() => {
    const el = document.createElement('div');
    el.className = 'cart-modal-portal';
    return el;
  });

  useEffect(() => {
    document.body.appendChild(portalEl);
    setMounted(true);
    return () => {
      document.body.removeChild(portalEl);
    };
  }, [portalEl]);

  return mounted ? createPortal(children, portalEl) : null;
}

// --------------------
// Cart UI
// --------------------

export function CartIcon() {
  const { getCartCount } = useCart();
  const [showCart, setShowCart] = useState(false);
  const count = getCartCount();

  return (
    <>
      <button
        onClick={() => setShowCart(true)}
        className="relative text-cream hover:text-amber-500 transition-colors"
      >
        <ShoppingCart className="w-6 h-6" />
        {count > 0 && (
          <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
            {count}
          </span>
        )}
      </button>

      {showCart && (
        <CartModalPortal>
          <CartModal onClose={() => setShowCart(false)} />
        </CartModalPortal>
      )}
    </>
  );
}

// --------------------
// Cart Modal
// --------------------

function CartModal({ onClose }: { onClose: () => void }) {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } =
    useCart();

  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const [formData, setFormData] = useState({
    customer_name: '',
    customer_phone: '',
    customer_email: '',
    order_type: 'pickup' as 'pickup' | 'delivery',
    delivery_address: '',
    notes: '',
  });

  useEffect(() => {
    // Prevent background scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const { supabase } = await import('../lib/supabase');
      const { error } = await supabase.from('orders').insert({
        customer_name: formData.customer_name,
        customer_phone: formData.customer_phone,
        customer_email: formData.customer_email || null,
        items: cart.map((item) => ({
          name: item.name,
          price: `Tk ${item.price}`,
          quantity: item.quantity,
          category: item.category,
        })),
        total_amount: getCartTotal(),
        order_type: formData.order_type,
        delivery_address:
          formData.order_type === 'delivery'
            ? formData.delivery_address
            : null,
        notes: formData.notes || null,
        status: 'pending',
      });

      if (error) throw error;

      setSubmitMessage('Order placed successfully!');
      clearCart();
      setTimeout(() => onClose(), 2000);
    } catch (err) {
      console.error(err);
      setSubmitMessage('Error placing order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-[9999]">
      <div className="bg-stone-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
        <div className="sticky top-0 bg-stone-900 border-b border-amber-900/30 p-3 flex justify-between items-center z-10">
          <h2 className="text-2xl font-serif text-cream">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="text-cream hover:text-amber-500 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {cart.length === 0 ? (
            <p className="text-cream/60 text-center py-8">
              Your cart is empty
            </p>
          ) : !isCheckout ? (
            <>
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div
                    key={item.name}
                    className="flex gap-4 bg-stone-800 p-4 rounded-lg"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="text-cream font-semibold">{item.name}</h3>
                      <p className="text-amber-400">Tk {item.price}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.name, item.quantity - 1)
                          }
                          className="bg-stone-700 text-cream px-2 py-1 rounded"
                        >
                          -
                        </button>
                        <span className="text-cream">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.name, item.quantity + 1)
                          }
                          className="bg-stone-700 text-cream px-2 py-1 rounded"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.name)}
                          className="ml-auto text-red-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-amber-900/30 pt-4 mb-4">
                <div className="flex justify-between text-cream text-xl font-bold">
                  <span>Total:</span>
                  <span>Tk {getCartTotal()}</span>
                </div>
              </div>

              <button
                onClick={() => setIsCheckout(true)}
                className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-cream py-3 rounded-lg font-semibold"
              >
                Proceed to Checkout
              </button>
            </>
          ) : (
            <form onSubmit={handleCheckout} className="space-y-4">
              <input
                type="text"
                placeholder="Your Name *"
                required
                value={formData.customer_name}
                onChange={(e) =>
                  setFormData({ ...formData, customer_name: e.target.value })
                }
                className="w-full bg-stone-800 text-cream border border-amber-900/30 rounded p-3 focus:border-amber-500 focus:outline-none"
              />
              <input
                type="tel"
                placeholder="Phone Number *"
                required
                value={formData.customer_phone}
                onChange={(e) =>
                  setFormData({ ...formData, customer_phone: e.target.value })
                }
                className="w-full bg-stone-800 text-cream border border-amber-900/30 rounded p-3 focus:border-amber-500 focus:outline-none"
              />
              <input
                type="email"
                placeholder="Email (optional)"
                value={formData.customer_email}
                onChange={(e) =>
                  setFormData({ ...formData, customer_email: e.target.value })
                }
                className="w-full bg-stone-800 text-cream border border-amber-900/30 rounded p-3 focus:border-amber-500 focus:outline-none"
              />

              <div className="flex gap-4">
                <label className="flex items-center text-cream cursor-pointer">
                  <input
                    type="radio"
                    name="order_type"
                    value="pickup"
                    checked={formData.order_type === 'pickup'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        order_type: e.target.value as 'pickup' | 'delivery',
                      })
                    }
                    className="mr-2"
                  />
                  Pickup
                </label>
                <label className="flex items-center text-cream cursor-pointer">
                  <input
                    type="radio"
                    name="order_type"
                    value="delivery"
                    checked={formData.order_type === 'delivery'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        order_type: e.target.value as 'pickup' | 'delivery',
                      })
                    }
                    className="mr-2"
                  />
                  Delivery
                </label>
              </div>

              {formData.order_type === 'delivery' && (
                <textarea
                  placeholder="Delivery Address *"
                  required
                  value={formData.delivery_address}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      delivery_address: e.target.value,
                    })
                  }
                  className="w-full bg-stone-800 text-cream border border-amber-900/30 rounded p-3 focus:border-amber-500 focus:outline-none"
                  rows={2}
                />
              )}

              <textarea
                placeholder="Special Instructions (optional)"
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                className="w-full bg-stone-800 text-cream border border-amber-900/30 rounded p-3 focus:border-amber-500 focus:outline-none"
                rows={2}
              />

              <div className="border-t border-amber-900/30 pt-4 mb-4">
                <div className="flex justify-between text-cream text-xl font-bold">
                  <span>Total:</span>
                  <span>Tk {getCartTotal()}</span>
                </div>
              </div>

              {submitMessage && (
                <p
                  className={`text-center ${
                    submitMessage.includes('success')
                      ? 'text-green-500'
                      : 'text-red-500'
                  }`}
                >
                  {submitMessage}
                </p>
              )}

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setIsCheckout(false)}
                  className="flex-1 bg-stone-700 text-cream py-3 rounded-lg font-semibold"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-amber-600 to-amber-700 text-cream py-3 rounded-lg font-semibold disabled:opacity-50"
                >
                  {isSubmitting ? 'Placing Order...' : 'Place Order'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
