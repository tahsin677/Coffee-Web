import { useEffect, useState } from 'react';
import { Tag, Clock, Gift } from 'lucide-react';

const offers = [
  {
    title: 'Buy 1 Get 1 Free',
    subtitle: 'Select Specialty Coffees',
    description: 'Every weekday from 2-4 PM',
    icon: Gift,
  },
  {
    title: 'Happy Hour',
    subtitle: '50% Off Pastries',
    description: 'Daily from 5-7 PM',
    icon: Clock,
  },
  {
    title: 'Student Discount',
    subtitle: '20% Off Everything',
    description: 'Valid student ID required',
    icon: Tag,
  },
];

export default function Offers() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % offers.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="offers" className="py-20 bg-gradient-to-br from-amber-900 to-amber-950 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-cream rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-cream rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-cream mb-4">
            Special Offers
          </h2>
          <p className="text-cream/80 text-lg">
            Exclusive deals for our valued customers
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {offers.map((offer, index) => {
            const Icon = offer.icon;
            return (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`bg-black/40 backdrop-blur-sm border-2 rounded-lg p-8 text-center transition-all duration-500 cursor-pointer ${
                  currentIndex === index
                    ? 'border-cream scale-105 shadow-2xl'
                    : 'border-amber-800/30 hover:border-amber-700/50 hover:scale-102'
                }`}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-700 rounded-full mb-6">
                  <Icon className="w-8 h-8 text-cream" />
                </div>
                <h3 className="text-2xl font-serif text-cream mb-2">
                  {offer.title}
                </h3>
                <p className="text-xl text-amber-300 mb-3">{offer.subtitle}</p>
                <p className="text-cream/70">{offer.description}</p>
              </button>
            );
          })}
        </div>

        <div className="flex justify-center mt-8 gap-2">
          {offers.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === index ? 'bg-cream w-8' : 'bg-cream/30'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
