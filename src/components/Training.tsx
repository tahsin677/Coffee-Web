import { GraduationCap, Award, UserCheck, CalendarClock } from 'lucide-react';

export default function Training() {
  const features = [
    { icon: GraduationCap, title: 'Comprehensive Curriculum', description: 'From basic techniques to advanced latte art', color: 'text-blue-500' },
    { icon: Award, title: 'Certification', description: 'Industry-recognized barista certificates', color: 'text-yellow-500' },
    { icon: UserCheck, title: 'Expert Instructors', description: 'Learn from award-winning baristas', color: 'text-green-500' },
    { icon: CalendarClock, title: 'Flexible Schedule', description: 'Weekend and evening classes available', color: 'text-purple-500' },
  ];

  return (
    <section id="training" className="py-20 bg-stone-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-cream mb-4">
            Barista Training Program
          </h2>
          <p className="text-cream/70 text-lg max-w-2xl mx-auto">
            Master the art of coffee making with our hands-on workshops, from beginner to advanced levels
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-stone-900 to-stone-800 border border-amber-900/20 rounded-xl p-6 hover:border-amber-700/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-900/20"
                  >
                    <div className="bg-stone-800/50 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                      <Icon className={`w-8 h-8 ${feature.color}`} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg font-semibold text-cream mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-cream/60 text-sm">{feature.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="bg-gradient-to-br from-amber-900 to-amber-950 rounded-lg p-8">
              <h3 className="text-2xl font-serif text-cream mb-4">Course Levels</h3>
              <ul className="space-y-3">
                {['Beginner: Coffee basics and espresso fundamentals',
                  'Intermediate: Milk techniques and drink recipes',
                  'Advanced: Latte art mastery and competition prep',
                  'Professional: Coffee roasting and business skills'].map((level, index) => (
                  <li key={index} className="flex items-start text-cream/90">
                    <span className="text-amber-400 mr-3 mt-1">•</span>
                    <span>{level}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="/enroll"
              className="block w-full bg-amber-700 text-cream font-medium py-4 rounded-sm hover:bg-amber-600 transition-all duration-300 hover:scale-105 hover:shadow-xl text-center"
            >
              Enroll Now
            </a>
          </div>

          <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl bg-black">
            <iframe
              title="Barista Training Video"
              src="https://streamable.com/e/wgi6br?autoplay=0&nocontrols=0"
              allowFullScreen
              allow="autoplay; fullscreen"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 'none',
              }}
            />
          </div>



        </div>
      </div>
    </section>
  );
}
