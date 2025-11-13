import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Coffee Enthusiast',
    text: 'The best coffee in town! The atmosphere is perfect for working, and the staff really knows their craft.',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Certified Barista',
    text: 'Completed the advanced barista course here. The instructors are incredible and the hands-on experience is invaluable.',
    rating: 5,
  },
  {
    name: 'Emma Rodriguez',
    role: 'Regular Customer',
    text: 'Their pasta is amazing! Who knew a coffee shop could serve such delicious food. The carbonara is to die for.',
    rating: 5,
  },
  {
    name: 'David Park',
    role: 'Food Blogger',
    text: 'From coffee to cuisine, SLASH delivers excellence. Their attention to detail in every dish is remarkable.',
    rating: 5,
  },
  {
    name: 'Lisa Thompson',
    role: 'Local Business Owner',
    text: 'My go-to spot for meetings and caffeine. The ambiance is professional yet welcoming.',
    rating: 5,
  },
  {
    name: 'James Wilson',
    role: 'Training Graduate',
    text: 'Thanks to SLASH, I landed my dream job as a professional barista. The certification opened so many doors.',
    rating: 5,
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visible.push(testimonials[index]);
    }
    return visible;
  };

  return (
    <section className="py-20 bg-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-cream mb-4">
            What Our Customers Say
          </h2>
          <p className="text-cream/70 text-lg">
            Real experiences from our community
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {getVisibleTestimonials().map((testimonial, index) => (
            <div
              key={index}
              className="bg-stone-950 border border-amber-900/20 rounded-lg p-8 hover:border-amber-700/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <p className="text-cream/80 mb-6 leading-relaxed italic">
                "{testimonial.text}"
              </p>
              <div>
                <p className="text-cream font-semibold">{testimonial.name}</p>
                <p className="text-cream/60 text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8 gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index >= currentIndex && index < currentIndex + 3
                  ? 'bg-amber-500'
                  : 'bg-cream/30'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
