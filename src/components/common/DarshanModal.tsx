import React, { useEffect, useCallback, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Play, Pause, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DarshanDeity } from '../../data/darshanData';

interface DarshanModalProps {
  deity: DarshanDeity | null;
  totalCount: number;
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

interface FloatingPetal {
  id: number;
  x: number;
  sway: number;
  duration: number;
  delay: number;
  rotation: number;
  emoji: string;
}

export const DarshanModal: React.FC<DarshanModalProps> = ({
  deity,
  totalCount,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}) => {
  const touchStartX = useRef<number | null>(null);

  // Auto-scroll state & refs (with subpixel accumulator for Windows/Chrome accuracy)
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isAutoSlide, setIsAutoSlide] = useState<boolean>(false);
  const aartiScrollRef = useRef<HTMLDivElement | null>(null);
  const animFrameId = useRef<number | null>(null);
  const isAutoScrolling = useRef<boolean>(false);
  const scrollPosRef = useRef<number>(0);

  // Automatic slide-show interval timer (cycles every 3.8 seconds when active)
  useEffect(() => {
    if (!isAutoSlide) return;
    const timer = setInterval(() => {
      onNext();
    }, 3800);
    return () => clearInterval(timer);
  }, [isAutoSlide, onNext]);

  const toggleAutoSlide = () => {
    setIsAutoSlide((prev) => !prev);
  };

  // Virtual Flower Offering state
  const [petals, setPetals] = useState<FloatingPetal[]>([]);
  const [showBlessedToast, setShowBlessedToast] = useState<boolean>(false);

  // Trigger Flower Offering with realistic cascading flow from top to bottom
  const handleOfferFlowers = () => {
    const flowerEmojis = ['🌸', '🌺', '🌼', '🪷', '🏵️', '✨'];
    const newPetals: FloatingPetal[] = Array.from({ length: 18 }).map((_, i) => ({
      id: Date.now() + i + Math.random(),
      x: Math.random() * 84 + 6,
      sway: (Math.random() - 0.5) * 40,
      duration: 2.4 + Math.random() * 1.2,
      delay: Math.random() * 0.6,
      rotation: Math.random() * 360,
      emoji: flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)],
    }));

    setPetals(newPetals);
    setShowBlessedToast(true);

    setTimeout(() => {
      setShowBlessedToast(false);
    }, 2800);

    setTimeout(() => {
      setPetals([]);
    }, 4200);
  };

  // Stop auto-scroll cleanly
  const stopAutoScroll = useCallback(() => {
    if (animFrameId.current !== null) {
      cancelAnimationFrame(animFrameId.current);
      animFrameId.current = null;
    }
    isAutoScrolling.current = false;
    setIsPlaying(false);
  }, []);

  // Smooth continuous auto-scroll loop via requestAnimationFrame with float accumulator
  const startAutoScroll = useCallback(() => {
    if (!aartiScrollRef.current) return;

    const el = aartiScrollRef.current;

    // If already at or near bottom, restart from beginning
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10) {
      el.scrollTop = 0;
      scrollPosRef.current = 0;
    } else {
      scrollPosRef.current = el.scrollTop;
    }

    isAutoScrolling.current = true;
    setIsPlaying(true);

    let lastTime: number | null = null;
    const scrollSpeedPixelsPerSecond = 46;

    const step = (time: number) => {
      if (!isAutoScrolling.current || !aartiScrollRef.current) return;

      if (lastTime !== null) {
        const delta = (time - lastTime) / 1000;
        scrollPosRef.current += scrollSpeedPixelsPerSecond * delta;
        aartiScrollRef.current.scrollTop = Math.round(scrollPosRef.current);

        const { scrollTop, clientHeight, scrollHeight } = aartiScrollRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 3) {
          stopAutoScroll();
          return;
        }
      }

      lastTime = time;
      animFrameId.current = requestAnimationFrame(step);
    };

    if (animFrameId.current !== null) {
      cancelAnimationFrame(animFrameId.current);
    }
    animFrameId.current = requestAnimationFrame(step);
  }, [stopAutoScroll]);

  const toggleAutoScroll = () => {
    if (isPlaying) {
      stopAutoScroll();
    } else {
      startAutoScroll();
    }
  };

  const handleStartAgain = () => {
    stopAutoScroll();
    scrollPosRef.current = 0;
    if (aartiScrollRef.current) {
      aartiScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Reset auto-scroll whenever deity changes or modal opens/closes
  useEffect(() => {
    stopAutoScroll();
    scrollPosRef.current = 0;
    if (aartiScrollRef.current) {
      aartiScrollRef.current.scrollTop = 0;
    }
    setPetals([]);
    setShowBlessedToast(false);
  }, [deity?.id, stopAutoScroll]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAutoScroll();
    };
  }, [stopAutoScroll]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    if (!deity) return;
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [deity, handleKeyDown]);

  if (!deity) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 lg:p-8 animate-fade-in"
      style={{ background: 'rgba(12, 4, 3, 0.92)', backdropFilter: 'blur(16px)' }}
      onClick={onClose}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(dx) > 50) {
          dx < 0 ? onNext() : onPrev();
        }
        touchStartX.current = null;
      }}
    >
      {/* Modal Container */}
      <div
        className="relative w-full max-w-5xl h-[88vh] max-h-[820px] rounded-3xl overflow-hidden flex flex-col lg:flex-row shadow-2xl border border-amber-500/20"
        style={{
          background: 'linear-gradient(135deg, #fdf9f3 0%, #faf3e8 100%)',
          boxShadow: '0 32px 80px rgba(80,20,5,0.4), 0 0 0 1px rgba(180,120,60,0.2)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3.5 right-3.5 z-40 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 shadow-md bg-white/80 hover:bg-white text-slate-800 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ── LEFT: Deity/Shrine Visual View with Flower Offering ── */}
        <div className="relative flex-shrink-0 flex items-center justify-center lg:w-[50%] h-[38vh] lg:h-full w-full overflow-hidden bg-slate-950">
          <img
            src={deity.image}
            alt={deity.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain p-2 md:p-4 select-none drop-shadow-2xl"
            draggable={false}
          />

          {/* ── SMOOTH FALLING FLOWER PETALS (पुष्प वर्षा) ── */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
            <AnimatePresence>
              {petals.map((petal) => (
                <motion.span
                  key={petal.id}
                  initial={{
                    y: -40,
                    x: 0,
                    opacity: 0,
                    scale: 0.6,
                    rotate: petal.rotation,
                  }}
                  animate={{
                    y: [0, 160, 320, 520],
                    x: [0, petal.sway, -petal.sway, petal.sway * 0.6],
                    opacity: [0, 1, 1, 0.8, 0],
                    rotate: petal.rotation + 320,
                    scale: [0.6, 1.2, 1, 0.85],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: petal.duration,
                    delay: petal.delay,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  style={{
                    left: `${petal.x}%`,
                    position: 'absolute',
                    top: 0,
                  }}
                  className="pointer-events-none select-none text-2xl sm:text-3xl filter drop-shadow-md"
                >
                  {petal.emoji}
                </motion.span>
              ))}
            </AnimatePresence>
          </div>

          {/* Blessed Offering Confirmation Toast */}
          <AnimatePresence>
            {showBlessedToast && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-14 inset-x-6 z-40 flex items-center justify-center pointer-events-none"
              >
                <div className="bg-amber-950/90 text-amber-200 px-4 py-2 rounded-full border border-amber-400/40 shadow-xl backdrop-blur-md text-xs font-semibold flex items-center gap-2">
                  <span>🌸</span>
                  <span>पुष्प अर्पण स्वीकार हुआ • जय माता दी!</span>
                  <span>🙏</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom Caption & Virtual Seva Actions */}
          <div
            className="absolute bottom-0 inset-x-0 p-5 md:p-6 flex flex-col gap-2 z-20"
            style={{
              background:
                'linear-gradient(to top, rgba(10,3,2,0.92) 0%, rgba(10,3,2,0.4) 70%, transparent 100%)',
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-display font-bold text-lg md:text-2xl text-white drop-shadow-md">
                  {deity.hindiName}
                </p>
                <p className="text-xs font-mono text-amber-300/90 tracking-wide">{deity.name}</p>
              </div>

              {/* Virtual Flower Offering Action Button */}
              <button
                onClick={handleOfferFlowers}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition-all shadow-md active:scale-95 shrink-0 cursor-pointer"
              >
                <span>🌸</span>
                <span>पुष्प अर्पण</span>
              </button>
            </div>
          </div>

          {/* Prev / Next Nav */}
          {totalCount > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPrev();
                }}
                aria-label="Previous Glimpse (बाएं)"
                title="Previous Slide"
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 shadow-2xl bg-black/60 hover:bg-amber-500 hover:text-slate-950 text-white border border-white/30 hover:border-amber-400 backdrop-blur-md z-30 cursor-pointer active:scale-95 group"
              >
                <ChevronLeft className="w-6 h-6 stroke-[2.5] transition-transform group-hover:-translate-x-0.5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNext();
                }}
                aria-label="Next Glimpse (दाएं)"
                title="Next Slide"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 shadow-2xl bg-black/60 hover:bg-amber-500 hover:text-slate-950 text-white border border-white/30 hover:border-amber-400 backdrop-blur-md z-30 cursor-pointer active:scale-95 group"
              >
                <ChevronRight className="w-6 h-6 stroke-[2.5] transition-transform group-hover:translate-x-0.5" />
              </button>
            </>
          )}

          {/* Counter Badge */}
          {totalCount > 1 && (
            <div className="absolute top-4 left-4 text-[10.5px] font-mono font-bold tracking-widest text-amber-200/90 bg-black/55 px-2.5 py-1 rounded-full border border-white/15 backdrop-blur-md z-20 flex items-center gap-1.5">
              <span>{currentIndex + 1}</span>
              <span className="opacity-50">/</span>
              <span>{totalCount}</span>
            </div>
          )}
        </div>

        {/* ── RIGHT: Devotional Text / Aarti Reader ── */}
        <div className="flex flex-col lg:w-[50%] w-full h-[50vh] lg:h-full overflow-hidden bg-[#fdf9f3]">
          {/* Header Bar */}
          <div className="px-6 py-4 flex-shrink-0 bg-[#faf3e8] border-b border-amber-900/15">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#a05020] block mb-0.5">
                  SACRED DARSHAN & LORE
                </span>
                <h2 className="font-display font-bold text-lg sm:text-xl text-[#5a1a0a] leading-tight">
                  {deity.aartiTitle}
                </h2>
              </div>

              {/* Controls: Auto Slide + Auto Scroll for Verses */}
              <div className="flex items-center gap-2">
                {/* Auto Slide Toggle */}
                {totalCount > 1 && (
                  <button
                    onClick={toggleAutoSlide}
                    aria-label={isAutoSlide ? 'Pause Slideshow' : 'Start Auto Slideshow'}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 shadow-xs border cursor-pointer active:scale-95 select-none ${
                      isAutoSlide
                        ? 'bg-amber-600 text-white border-amber-500 shadow-md ring-2 ring-amber-400/30'
                        : 'bg-amber-500/10 text-amber-900 border-amber-500/30 hover:bg-amber-500/20'
                    }`}
                  >
                    {isAutoSlide ? (
                      <>
                        <Pause className="w-3.5 h-3.5 fill-current" />
                        <span>Auto Slide ON</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Auto Slide</span>
                      </>
                    )}
                  </button>
                )}

                {/* Text Auto Scroll */}
                <button
                  onClick={toggleAutoScroll}
                  aria-label={isPlaying ? 'Pause Verse Scroll' : 'Scroll Verses'}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 shadow-xs border cursor-pointer active:scale-95 select-none"
                  style={{
                    background: isPlaying ? '#5a1a0a' : 'rgba(90,26,10,0.08)',
                    color: isPlaying ? '#fff' : '#5a1a0a',
                    borderColor: 'rgba(90,26,10,0.2)',
                  }}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5 fill-current" />
                      <span>Reading...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span className="hidden sm:inline">Text</span> Scroll
                    </>
                  )}
                </button>

                <button
                  onClick={handleStartAgain}
                  aria-label="Start Again"
                  title="Return to beginning"
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border border-amber-900/20 text-[#5a1a0a] hover:bg-amber-900/10 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              </div>
            </div>
          </div>

          {/* Scrollable Aarti / Lore Panel (Native rAF Driven) */}
          <div
            ref={aartiScrollRef}
            onWheel={() => {
              if (aartiScrollRef.current) {
                scrollPosRef.current = aartiScrollRef.current.scrollTop;
              }
              stopAutoScroll();
            }}
            onTouchMove={() => {
              if (aartiScrollRef.current) {
                scrollPosRef.current = aartiScrollRef.current.scrollTop;
              }
              stopAutoScroll();
            }}
            className="flex-1 overflow-y-auto px-6 sm:px-8 py-5 space-y-4"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#c07030 rgba(160,80,30,0.1)',
            }}
          >
            {/* Subtitle / Context */}
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 font-medium">
              <p className="font-semibold text-slate-900">{deity.hindiSubtitle}</p>
              <p className="text-[11px] text-slate-600 mt-0.5">{deity.subtitle}</p>
            </div>

            {/* Decorative Divider */}
            <div className="flex items-center justify-center gap-3 py-1">
              <div className="h-px w-12 bg-amber-900/20" />
              <span className="text-amber-700 text-sm">॥ ॐ ॥</span>
              <div className="h-px w-12 bg-amber-900/20" />
            </div>

            {/* Verses / Narrative */}
            <div className="font-hindi text-sm sm:text-base whitespace-pre-line text-slate-800 leading-relaxed font-normal select-text">
              {deity.aartiHindi}
            </div>

            {/* Decorative Bottom Divider */}
            <div className="flex items-center justify-center gap-3 pt-6 pb-2">
              <div className="h-px w-16 bg-amber-900/20" />
              <span className="text-amber-700 text-xs font-hindi font-bold">॥ इति शुभम् ॥</span>
              <div className="h-px w-16 bg-amber-900/20" />
            </div>
          </div>

          {/* Bottom Navigation & Dot indicators for pagination */}
          {totalCount > 1 && (
            <div className="flex items-center justify-between px-6 py-2.5 bg-[#faf3e8] border-t border-amber-900/10 flex-shrink-0">
              <button
                onClick={onPrev}
                aria-label="Previous Slide (बाएं)"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium text-amber-900 hover:bg-amber-900/10 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">पिछला</span>
              </button>

              <div className="flex items-center justify-center gap-1.5">
                {Array.from({ length: totalCount }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (i > currentIndex) onNext();
                      if (i < currentIndex) onPrev();
                    }}
                    aria-label={`Go to item ${i + 1}`}
                    className="rounded-full transition-all duration-200 cursor-pointer"
                    style={{
                      width: i === currentIndex ? '18px' : '6px',
                      height: '6px',
                      background: i === currentIndex ? '#a05020' : 'rgba(160,80,30,0.25)',
                    }}
                  />
                ))}
              </div>

              <button
                onClick={onNext}
                aria-label="Next Slide (दाएं)"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium text-amber-900 hover:bg-amber-900/10 transition-colors cursor-pointer"
              >
                <span className="hidden sm:inline">अगला</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
