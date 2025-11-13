import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { CartIcon } from '../context/CartContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-stone-950/95 backdrop-blur-sm border-b border-amber-900/30 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-3">
            <img
              src="https://i.postimg.cc/ZKs3p72R/Facebook-Post-Hoppy-Happy-Hour-Cheers-Black-Illustrated.png"
              alt="SLASH Coffee Roasting Co."
              className="h-16 w-auto brightness-0 invert"
            />
            <span className="text-2xl font-serif text-cream">SLASH COFFEE</span>
          </div>

          <div className="hidden md:flex space-x-8 items-center">
            {['home', 'menu', 'offers', 'training', 'about', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-cream hover:text-amber-500 transition-colors duration-300 capitalize font-medium text-sm tracking-wider"
              >
                {item === 'training' ? 'Barista Training' : item}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <CartIcon />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-cream"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-black/98 border-t border-amber-900/20">
          <div className="px-4 pt-2 pb-4 space-y-3">
            {['home', 'menu', 'offers', 'training', 'about', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="block w-full text-left text-cream hover:text-amber-500 transition-colors duration-300 capitalize py-2 font-medium"
              >
                {item === 'training' ? 'Barista Training' : item}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
