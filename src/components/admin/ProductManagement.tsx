import { useState } from 'react';
import { Plus, CreditCard as Edit, Trash } from 'lucide-react';

export default function ProductManagement() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'coffee',
    description: '',
    image: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Product management coming soon! This feature will allow you to add/edit/delete menu items.');
    setShowAddForm(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-serif text-cream">Product Management</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 bg-amber-700 text-cream px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      {showAddForm && (
        <div className="bg-stone-900 border border-amber-900/20 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-serif text-cream mb-4">Add New Product</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-cream mb-2">Product Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-stone-800 text-cream border border-amber-900/30 rounded-lg p-3 focus:border-amber-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-cream mb-2">Price (Tk) *</label>
                <input
                  type="number"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full bg-stone-800 text-cream border border-amber-900/30 rounded-lg p-3 focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-cream mb-2">Category *</label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-stone-800 text-cream border border-amber-900/30 rounded-lg p-3 focus:border-amber-500 focus:outline-none"
              >
                <option value="coffee">Coffee</option>
                <option value="pasta">Pasta</option>
                <option value="burgers">Burgers</option>
                <option value="sandwiches">Sandwiches</option>
                <option value="salad">Salad</option>
                <option value="fries">Fries</option>
                <option value="platters">Platters</option>
              </select>
            </div>

            <div>
              <label className="block text-cream mb-2">Description *</label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-stone-800 text-cream border border-amber-900/30 rounded-lg p-3 focus:border-amber-500 focus:outline-none"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-cream mb-2">Image URL *</label>
              <input
                type="url"
                required
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full bg-stone-800 text-cream border border-amber-900/30 rounded-lg p-3 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Add Product
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="bg-stone-700 text-cream px-6 py-2 rounded-lg hover:bg-stone-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-stone-900 border border-amber-900/20 rounded-xl p-8 text-center">
        <p className="text-cream/60 mb-4">
          Product Management feature allows you to add, edit, and delete menu items.
        </p>
        <p className="text-cream/40 text-sm">
          This feature requires additional database setup and will be fully functional soon.
        </p>
      </div>
    </div>
  );
}
