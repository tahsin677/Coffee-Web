export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-stone-950 border-t border-amber-900/30 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="https://i.postimg.cc/ZKs3p72R/Facebook-Post-Hoppy-Happy-Hour-Cheers-Black-Illustrated.png"
                alt="SLASH Coffee Roasting Co."
                className="h-20 w-auto brightness-0 invert"
              />
              <span className="text-2xl font-serif text-cream">SLASH COFFEE</span>
            </div>
            <p className="text-cream/60 text-sm">
              Where exceptional coffee meets culinary excellence and professional barista education.
            </p>
          </div>

          <div>
            <h3 className="text-cream font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: 'Menu', id: 'menu' },
                { name: 'Barista Training', id: 'training' },
                { name: 'Special Offers', id: 'offers' },
                { name: 'Contact Us', id: 'contact' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-cream/60 hover:text-amber-500 transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
              <li>
                <a
                  href="/admin/login"
                  className="text-cream/60 hover:text-amber-500 transition-colors duration-300 text-sm"
                >
                  Admin Panel
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-cream font-semibold mb-4">Opening Hours</h3>
            <ul className="space-y-2 text-cream/60 text-sm">
              <li>Monday - Friday: 7:00 AM - 8:00 PM</li>
              <li>Saturday - Sunday: 8:00 AM - 9:00 PM</li>
              <li className="pt-2 text-amber-500">Coffee served all day!</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-amber-900/20 pt-8 text-center">
          <p className="text-cream/60 text-sm">
            © {new Date().getFullYear()} SLASH Coffee Roasting Co. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
