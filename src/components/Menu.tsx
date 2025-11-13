import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const menuData = {
  coffee: [
    {
      name: 'Espresso',
      price: 250,
      description: 'Rich, bold, and perfectly extracted',
      image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Cappuccino',
      price: 320,
      description: 'Velvety foam meets intense espresso',
      image: 'https://images.pexels.com/photos/1549196/pexels-photo-1549196.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Latte',
      price: 350,
      description: 'Smooth espresso with steamed milk',
      image: 'https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Cold Brew',
      price: 380,
      description: 'Smooth and refreshing, steeped for 24 hours',
      image: 'https://images.pexels.com/photos/1755785/pexels-photo-1755785.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Pour Over',
      price: 420,
      description: 'Hand-crafted single origin perfection',
      image: 'https://images.pexels.com/photos/3879495/pexels-photo-3879495.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Flat White',
      price: 360,
      description: 'Australian classic with microfoam',
      image: 'https://images.pexels.com/photos/1458695/pexels-photo-1458695.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
  ],
  pasta: [
    {
      name: 'Carbonara',
      price: 650,
      description: 'Creamy, authentic Italian pasta',
      image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Aglio e Olio',
      price: 550,
      description: 'Garlic, olive oil, and chili flakes',
      image: 'https://images.pexels.com/photos/1438672/pexels-photo-1438672.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Pesto Penne',
      price: 600,
      description: 'Fresh basil pesto with pine nuts',
      image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Arrabbiata',
      price: 580,
      description: 'Spicy tomato sauce perfection',
      image: 'https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
  ],
  platters: [
    {
      name: 'Charcuterie Board',
      price: 850,
      description: 'Artisan cheeses and cured meats',
      image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Veggie Platter',
      price: 700,
      description: 'Fresh vegetables with hummus',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Breakfast Platter',
      price: 750,
      description: 'Eggs, bacon, toast, and sides',
      image: 'https://images.pexels.com/photos/103124/pexels-photo-103124.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
  ],
  salad: [
    {
      name: 'Caesar Salad',
      price: 480,
      description: 'Classic with house-made dressing',
      image: 'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Greek Salad',
      price: 500,
      description: 'Feta, olives, and fresh vegetables',
      image: 'https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Quinoa Bowl',
      price: 550,
      description: 'Superfood salad with tahini dressing',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
  ],
  fries: [
    {
      name: 'Classic Fries',
      price: 250,
      description: 'Crispy golden perfection',
      image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Sweet Potato Fries',
      price: 300,
      description: 'With chipotle mayo',
      image: 'https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Loaded Fries',
      price: 400,
      description: 'Cheese, bacon, and sour cream',
      image: 'https://images.pexels.com/photos/2062665/pexels-photo-2062665.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
  ],
  burgers: [
    {
      name: 'Slash Burger',
      price: 680,
      description: 'Our signature beef burger',
      image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Chicken Burger',
      price: 620,
      description: 'Grilled chicken with special sauce',
      image: 'https://images.pexels.com/photos/1556698/pexels-photo-1556698.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Veggie Burger',
      price: 580,
      description: 'House-made veggie patty',
      image: 'https://images.pexels.com/photos/1199960/pexels-photo-1199960.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
  ],
  sandwiches: [
    {
      name: 'Club Sandwich',
      price: 550,
      description: 'Triple decker classic',
      image: 'https://images.pexels.com/photos/6605214/pexels-photo-6605214.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'BLT',
      price: 480,
      description: 'Bacon, lettuce, tomato on sourdough',
      image: 'https://images.pexels.com/photos/1603901/pexels-photo-1603901.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Grilled Cheese',
      price: 420,
      description: 'Three cheese blend, perfectly toasted',
      image: 'https://images.pexels.com/photos/7613568/pexels-photo-7613568.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
  ],
};

const categories = [
  { id: 'coffee', name: 'Coffee', icon: '☕' },
  { id: 'pasta', name: 'Pasta', icon: '🍝' },
  { id: 'platters', name: 'Platters', icon: '🧀' },
  { id: 'salad', name: 'Salad', icon: '🥗' },
  { id: 'fries', name: 'Fries', icon: '🍟' },
  { id: 'burgers', name: 'Burgers', icon: '🍔' },
  { id: 'sandwiches', name: 'Sandwiches', icon: '🥪' },
];

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('coffee');
  const { addToCart } = useCart();
  const [addedItem, setAddedItem] = useState<string | null>(null);

  const handleAddToCart = (item: { name: string; price: number; image: string }) => {
    addToCart({
      name: item.name,
      price: item.price,
      category: activeCategory,
      image: item.image,
    });
    setAddedItem(item.name);
    setTimeout(() => setAddedItem(null), 1500);
  };

  return (
    <section id="menu" className="py-20 bg-stone-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-cream mb-4">
            Our Menu
          </h2>
          <p className="text-cream/70 text-lg">
            Crafted with passion, served with care
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 transform ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-cream shadow-lg scale-105'
                  : 'bg-stone-800 text-cream/70 hover:bg-stone-700 hover:scale-105'
              }`}
            >
              <span className="mr-2 text-xl">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuData[activeCategory as keyof typeof menuData].map((item, index) => (
            <div
              key={index}
              className="bg-stone-900 border border-amber-900/20 rounded-xl overflow-hidden hover:border-amber-700/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-900/30 hover:-translate-y-2 group"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-serif text-cream">{item.name}</h3>
                  <span className="text-amber-400 font-bold text-lg">Tk {item.price}</span>
                </div>
                <p className="text-cream/60 leading-relaxed mb-4">{item.description}</p>
                <button
                  onClick={() => handleAddToCart(item)}
                  className={`w-full py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                    addedItem === item.name
                      ? 'bg-green-600 text-white'
                      : 'bg-amber-700 text-cream hover:bg-amber-600'
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  {addedItem === item.name ? 'Added to Cart!' : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
