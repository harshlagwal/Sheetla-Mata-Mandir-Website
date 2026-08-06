import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { templeHistoryData } from '../../data/templeHistory';
import { Pause, Play } from 'lucide-react';

export const TempleHistoryStone: React.FC = () => {
  const { isHindi } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  const content = isHindi ? templeHistoryData.hi : templeHistoryData.en;
  
  const requestRef = useRef<number>();
  const isUserScrolling = useRef(false);
  const userScrollTimeout = useRef<NodeJS.Timeout>();
  const exactScrollTop = useRef(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    setIsPaused(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches) setIsPaused(true);
    };
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const animateScroll = useCallback(() => {
    if (isPaused || isUserScrolling.current || !scrollRef.current) {
      requestRef.current = requestAnimationFrame(animateScroll);
      return;
    }

    const element = scrollRef.current;
    
    // Sync exactScrollTop with actual scrollTop if user scrolled manually
    if (Math.abs(element.scrollTop - exactScrollTop.current) > 2) {
      exactScrollTop.current = element.scrollTop;
    }

    // Smooth, slow scrolling
    exactScrollTop.current += 0.5;
    element.scrollTop = exactScrollTop.current;

    // Check if reached the bottom
    if (Math.ceil(element.scrollTop + element.clientHeight) >= element.scrollHeight) {
      // Pause briefly at the bottom
      setIsPaused(true);
      setTimeout(() => {
        if (scrollRef.current) {
          exactScrollTop.current = 0;
          scrollRef.current.scrollTop = 0;
          setIsPaused(false);
        }
      }, 2000); // 2 second pause
    }

    requestRef.current = requestAnimationFrame(animateScroll);
  }, [isPaused]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animateScroll);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [animateScroll]);

  const handleUserScroll = () => {
    isUserScrolling.current = true;
    if (userScrollTimeout.current) clearTimeout(userScrollTimeout.current);
    userScrollTimeout.current = setTimeout(() => {
      isUserScrolling.current = false;
    }, 1500); // Resume auto-scroll after 1.5s of no manual scrolling
  };

  const handleMouseEnter = () => !prefersReducedMotion && setIsPaused(true);
  const handleMouseLeave = () => !prefersReducedMotion && setIsPaused(false);
  const handleTouchStart = () => {
    isUserScrolling.current = true;
  };
  const handleTouchEnd = () => {
    handleUserScroll();
  };

  // Reset scroll on language change
  useEffect(() => {
    if (scrollRef.current) {
      exactScrollTop.current = 0;
      scrollRef.current.scrollTop = 0;
    }
  }, [isHindi]);

  return (
    <div className="w-full max-w-4xl mx-auto my-12">
      <div 
        className="relative bg-[#1c1a18] rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden border border-[#3a352a] flex flex-col"
        style={{
          boxShadow: '0 20px 50px -12px rgba(0, 0, 0, 0.7), inset 0 0 40px rgba(0,0,0,0.8)',
          backgroundImage: 'radial-gradient(circle at 50% 50%, #2a261f 0%, #151310 100%)',
        }}
      >
        {/* Subtle stone texture overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
        />

        {/* Header */}
        <div className="relative z-10 pt-10 pb-6 px-6 md:px-12 text-center shrink-0 border-b border-[#cca354]/20 bg-gradient-to-b from-[#151310] to-transparent">
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-[#e6c77a] mb-2 tracking-wide" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
            {isHindi ? 'शीतला माता मंदिर का इतिहास' : 'HISTORY OF SHEETLA MATA MANDIR'}
          </h2>
          <p className="font-body text-sm md:text-base text-[#cca354]/80 tracking-widest uppercase">
            {isHindi ? 'स्थान — लगदेवी' : 'LAGDEVI, HIMACHAL PRADESH'}
          </p>
          <div className="flex justify-center items-center mt-6 gap-3 opacity-60">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#cca354]"></div>
            <div className="text-[#cca354] text-xl">❖</div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#cca354]"></div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div 
          ref={scrollRef}
          className="relative z-10 flex-grow h-[50vh] md:h-[60vh] overflow-y-auto px-6 md:px-12 lg:px-20 py-8 history-scroll"
          onWheel={handleUserScroll}
          onTouchMove={handleUserScroll}
          onKeyDown={handleUserScroll}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          tabIndex={0}
          aria-label={isHindi ? 'मंदिर का इतिहास स्क्रॉल करें' : 'Scroll Temple History'}
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#cca354 #151310',
          }}
        >
          {/* Custom Webkit Scrollbar styles can be added to global CSS if needed, using inline style for basic support */}
          <div className="space-y-6 max-w-3xl mx-auto">
            {content.map((paragraph, index) => (
              <p 
                key={index}
                className={`font-body leading-[1.9] text-[#d4c3a3] ${isHindi ? 'text-[16px] md:text-[18px]' : 'text-[15px] md:text-[17px]'}`}
                style={{
                  textShadow: '0 1px 2px rgba(0,0,0,0.8)'
                }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Footer & Controls */}
        <div className="relative z-10 pt-4 pb-8 px-6 text-center shrink-0 border-t border-[#cca354]/20 bg-gradient-to-t from-[#151310] to-transparent flex flex-col items-center">
          
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="mb-6 flex items-center gap-2 text-xs md:text-sm text-[#cca354]/70 hover:text-[#cca354] transition-colors focus:outline-none focus:ring-1 focus:ring-[#cca354] rounded-full px-3 py-1.5 bg-[#cca354]/5"
            aria-label={isPaused ? (isHindi ? 'स्वतः स्क्रॉल चलाएं' : 'Resume Auto Scroll') : (isHindi ? 'स्वतः स्क्रॉल रोकें' : 'Pause Auto Scroll')}
          >
            {isPaused ? <Play size={14} /> : <Pause size={14} />}
            <span>
              {isPaused 
                ? (isHindi ? 'स्वतः स्क्रॉल चलाएं' : 'Resume Auto Scroll') 
                : (isHindi ? 'स्वतः स्क्रॉल रोकें' : 'Pause Auto Scroll')}
            </span>
          </button>

          <div className="flex justify-center items-center gap-4 text-[#e6c77a] font-display text-lg md:text-xl tracking-wider">
            <span className="opacity-50">॥</span>
            <span>{isHindi ? 'जय शीतला माता जी' : 'Jai Sheetla Mata Ji'}</span>
            <span className="opacity-50">॥</span>
          </div>
        </div>
      </div>
      
      {/* Custom styles for webkit scrollbar specifically for this component */}
      <style dangerouslySetInnerHTML={{__html: `
        .history-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .history-scroll::-webkit-scrollbar-track {
          background: #151310;
          border-radius: 4px;
        }
        .history-scroll::-webkit-scrollbar-thumb {
          background: #cca354;
          border-radius: 4px;
        }
        .history-scroll::-webkit-scrollbar-thumb:hover {
          background: #e6c77a;
        }
      `}} />
    </div>
  );
};
