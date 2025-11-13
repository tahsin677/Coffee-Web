import { useEffect, useState } from 'react';

export default function Hero() {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const fullText = 'Slash/ Your next coffee obsession.';

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    let timeout: number;

    if (!isDeleting && displayText.length < fullText.length) {
      timeout = setTimeout(() => {
        setDisplayText(fullText.slice(0, displayText.length + 1));
      }, 100);
    } else if (!isDeleting && displayText.length === fullText.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 3000);
    } else if (isDeleting && displayText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayText(displayText.slice(0, -1));
      }, 50);
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting]);

  const scrollToMenu = () => {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTraining = () => {
    document.getElementById('training')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="mb-8 min-h-[120px] flex items-center justify-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-cream">
            {displayText}
            <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>|</span>
          </h1>
        </div>

        <p className="text-lg md:text-xl text-cream/90 mb-12 max-w-3xl mx-auto leading-relaxed">
          From exceptional coffee to hands-on barista workshops, SLASH is where flavor meets craft.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={scrollToMenu}
            className="px-8 py-4 bg-amber-700 text-cream font-medium rounded-sm hover:bg-amber-600 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-amber-900/50"
          >
            View Menu
          </button>
          <button
            onClick={scrollToTraining}
            className="px-8 py-4 bg-transparent border-2 border-cream text-cream font-medium rounded-sm hover:bg-cream hover:text-black transition-all duration-300 hover:scale-105"
          >
            Join Brista Training
          </button>
        </div>
      </div>

    </section>
  );
}
