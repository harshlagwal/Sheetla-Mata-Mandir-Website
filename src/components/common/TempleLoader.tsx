import React, { useEffect, useState } from 'react';

interface TempleLoaderProps {
  onFinish: () => void;
}

export const TempleLoader: React.FC<TempleLoaderProps> = ({ onFinish }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Prevent scrolling while loader is active
    document.body.style.overflow = 'hidden';

    // Sequence animations slightly
    const contentTimer = setTimeout(() => setShowContent(true), 150);

    const checkReadyState = () => {
      // Minimum display time 800ms
      const minDisplayTime = new Promise((resolve) => setTimeout(resolve, 800));
      
      // Document complete
      const documentReady = new Promise((resolve) => {
        if (document.readyState === 'complete') {
          resolve(true);
        } else {
          window.addEventListener('load', () => resolve(true), { once: true });
        }
      });

      Promise.all([minDisplayTime, documentReady]).then(() => {
        setIsFadingOut(true);
        // Wait for fade out animation (500ms) before signaling finish
        setTimeout(() => {
          document.body.style.overflow = '';
          onFinish();
        }, 500);
      });
    };

    checkReadyState();

    return () => {
      clearTimeout(contentTimer);
      document.body.style.overflow = '';
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-surface flex flex-col items-center justify-center transition-opacity duration-500 ease-in-out ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-label="Loading application"
      role="status"
    >
      <div className="flex flex-col items-center max-w-sm px-6 text-center">
        
        {/* Divine Diya Illustration */}
        <div className={`relative mb-8 transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
          {/* Subtle Glow Behind */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-[#fe9832]/20 rounded-full blur-xl animate-flame-flicker pointer-events-none" />
          
          <div className="animate-flame-sway">
            <div className="animate-flame-flicker">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Flame Outer */}
                <path d="M32 10C32 10 24 24 24 34C24 38.4183 27.5817 42 32 42C36.4183 42 40 38.4183 40 34C40 24 32 10 32 10Z" fill="#ffb77a" opacity="0.6"/>
                {/* Flame Inner */}
                <path d="M32 16C32 16 27 26 27 33C27 35.7614 29.2386 38 32 38C34.7614 38 37 35.7614 37 33C37 26 32 16 32 16Z" fill="#fe9832"/>
                {/* Flame Core */}
                <path d="M32 22C32 22 29 28 29 33C29 34.6569 30.3431 36 32 36C33.6569 36 35 34.6569 35 33C35 28 32 22 32 22Z" fill="#ffffff" opacity="0.8"/>
                
                {/* Diya Base */}
                <path d="M12 40C12 40 20 48 32 48C44 48 52 40 52 40L32 43L12 40Z" fill="#d4af37"/>
                <path d="M14 42C14 47.5228 22.0589 52 32 52C41.9411 52 50 47.5228 50 42C50 42 42 48 32 48C22 48 14 42 14 42Z" fill="#8f4e00"/>
                {/* Stand */}
                <path d="M26 52H38V54H26V52Z" fill="#8f4e00"/>
                <path d="M22 54H42V56H22V54Z" fill="#d4af37"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Text Sequence */}
        {showContent && (
          <div className="flex flex-col items-center">
            <h1 
              className="text-2xl md:text-3xl text-primary font-display font-bold mb-2 animate-fade-up-stagger" 
              style={{ animationDelay: '200ms' }}
            >
              श्री शीतला माता मंदिर
            </h1>
            <h2 
              className="text-sm md:text-base text-primary font-display font-semibold tracking-[0.15em] uppercase mb-4 animate-fade-up-stagger"
              style={{ animationDelay: '400ms' }}
            >
              Sheetla Mata Mandir
            </h2>
            <p 
              className="text-xs md:text-sm text-on-surface-variant font-medium animate-fade-up-stagger mb-8"
              style={{ animationDelay: '600ms' }}
            >
              Lagdevi, Himachal Pradesh
            </p>
            <p 
              className="text-lg text-secondary font-display tracking-widest animate-fade-up-stagger"
              style={{ animationDelay: '800ms' }}
            >
              🙏 जय माता दी 🙏
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
