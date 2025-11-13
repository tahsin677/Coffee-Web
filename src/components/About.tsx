import { Coffee, Users, Award } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-20 bg-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-serif text-cream">
              About SLASH Coffee
            </h2>
            <p className="text-cream/80 leading-relaxed text-lg">
              At SLASH Coffee Roasting Co., we're more than just a café. We're a community hub where passion for exceptional coffee meets culinary excellence and professional education.
            </p>
            <p className="text-cream/80 leading-relaxed text-lg">
              Every bean is carefully selected and roasted to perfection in-house. Our menu extends beyond coffee to include artisanal food that complements your beverage experience. Whether you're here for a quick espresso or a full meal, we ensure every visit is memorable.
            </p>
            <p className="text-cream/80 leading-relaxed text-lg">
              Our passion for coffee roasting began with a simple belief: every cup should be an experience. From sourcing the finest beans to perfecting our roasting techniques, we ensure that every sip tells a story of quality and craftsmanship.
            </p>
            <p className="text-cream/80 leading-relaxed text-lg">
              Whether you're here for our handcrafted beverages, gourmet food offerings, or to master the art of espresso, SLASH is where your coffee journey truly begins.
            </p>
            

            
          </div>

          <div className="relative">
            <div className="aspect-square rounded-lg overflow-hidden shadow-2xl">
              <img
                src="https://i.postimg.cc/C14MWpry/Untitled-design.png"
                alt="Coffee roasting"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-amber-700/20 rounded-lg -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
