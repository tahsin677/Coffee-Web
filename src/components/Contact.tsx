import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-stone-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-cream mb-4">
            Visit Us
          </h2>
          <p className="text-cream/70 text-lg">
            We'd love to serve you
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="bg-stone-900 border border-amber-900/20 rounded-lg p-6 hover:border-amber-700/50 transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-amber-700 rounded-full p-3">
                  <MapPin className="w-6 h-6 text-cream" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-cream mb-2">Location</h3>
                  <p className="text-cream/70">
                    Jamuna Future Park<br />
                    Kuril, Progoti Sarani<br />
                    Dhaka 1229, Bangladesh
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-stone-900 border border-amber-900/20 rounded-lg p-6 hover:border-amber-700/50 transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-amber-700 rounded-full p-3">
                  <Phone className="w-6 h-6 text-cream" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-cream mb-2">Phone</h3>
                  <p className="text-cream/70">
                    +880 1725-375647<br />
                    Mon-Fri: 7AM - 8PM<br />
                    Sat-Sun: 8AM - 9PM
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-stone-900 border border-amber-900/20 rounded-lg p-6 hover:border-amber-700/50 transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-amber-700 rounded-full p-3">
                  <Mail className="w-6 h-6 text-cream" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-cream mb-2">Email</h3>
                  <p className="text-cream/70">
                    slashcoffeeroastingco@gmail.com<br />
                    training@slashcoffeeroastingco.com
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-900 to-amber-950 rounded-lg p-8">
              <h3 className="text-xl font-serif text-cream mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="bg-black/40 p-3 rounded-full hover:bg-amber-700 transition-colors duration-300">
                  <Instagram className="w-6 h-6 text-cream" />
                </a>
                <a href="#" className="bg-black/40 p-3 rounded-full hover:bg-amber-700 transition-colors duration-300">
                  <Facebook className="w-6 h-6 text-cream" />
                </a>
                <a href="#" className="bg-black/40 p-3 rounded-full hover:bg-amber-700 transition-colors duration-300">
                  <Twitter className="w-6 h-6 text-cream" />
                </a>
              </div>
            </div>
          </div>

          <div className="h-[600px] rounded-lg overflow-hidden shadow-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14601.795029260877!2d90.40489506500084!3d23.802636340760365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7af0957feb5%3A0x40555b88c20e3d72!2sSLASH%20Coffee%20Roasting%20Co.!5e0!3m2!1sen!2sbd!4v1759586429070!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="SLASH Coffee Location"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
