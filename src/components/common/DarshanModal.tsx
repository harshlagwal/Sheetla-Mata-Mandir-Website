import React, { useEffect, useCallback, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Play, Pause, RotateCcw } from 'lucide-react';
import { DarshanDeity } from '../../data/darshanData';

interface DarshanModalProps {
  deity: DarshanDeity | null;
  totalCount: number;
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const DarshanModal: React.FC<DarshanModalProps> = ({
  deity,
  totalCount,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}) => {
  // Touch swipe support on backdrop/deity image
  const touchStartX = useRef<number | null>(null);

  // Auto-scroll state & refs
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const aartiScrollRef = useRef<HTMLDivElement | null>(null);
  const animFrameId = useRef<number | null>(null);
  const isAutoScrolling = useRef<boolean>(false);

  // Accessibility check for prefers-reduced-motion
  const prefersReducedMotion = useRef<boolean>(false);
  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Stop auto-scroll cleanly
  const stopAutoScroll = useCallback(() => {
    if (animFrameId.current !== null) {
      cancelAnimationFrame(animFrameId.current);
      animFrameId.current = null;
    }
    isAutoScrolling.current = false;
    setIsPlaying(false);
  }, []);

  // Reset auto-scroll whenever deity changes or modal opens/closes
  useEffect(() => {
    stopAutoScroll();
    if (aartiScrollRef.current) {
      aartiScrollRef.current.scrollTop = 0;
    }
  }, [deity?.id, stopAutoScroll]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAutoScroll();
    };
  }, [stopAutoScroll]);

  // Smooth continuous auto-scroll loop via requestAnimationFrame
  const startAutoScroll = useCallback(() => {
    if (prefersReducedMotion.current) return;
    if (!aartiScrollRef.current) return;

    // Reset if already at the very bottom
    const el = aartiScrollRef.current;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 5) {
      el.scrollTop = 0;
    }

    isAutoScrolling.current = true;
    setIsPlaying(true);

    let lastTime: number | null = null;
    const scrollSpeedPixelsPerSecond = 42; // Slightly faster smooth reading speed (~42px/sec)

    const step = (time: number) => {
      if (!isAutoScrolling.current || !aartiScrollRef.current) return;

      if (lastTime !== null) {
        const delta = (time - lastTime) / 1000;
        aartiScrollRef.current.scrollTop += scrollSpeedPixelsPerSecond * delta;

        // Check if reached bottom
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
    if (aartiScrollRef.current) {
      aartiScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Detect manual user interaction to pause auto-scroll instantly
  const handleUserInteraction = () => {
    if (isPlaying) {
      stopAutoScroll();
    }
  };

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
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 lg:p-8 animate-fade-in"
      style={{ background: 'rgba(18,6,3,0.90)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}
      onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(dx) > 50) { dx < 0 ? onNext() : onPrev(); }
        touchStartX.current = null;
      }}
    >
      {/* Modal Container */}
      <div
        className="relative w-full max-w-5xl h-[88vh] max-h-[820px] rounded-3xl overflow-hidden flex flex-col lg:flex-row shadow-2xl border border-amber-900/20"
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
          className="absolute top-3.5 right-3.5 z-30 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 shadow-md"
          style={{ background: 'rgba(90,26,10,0.12)', color: '#5a1a0a' }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(90,26,10,0.22)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(90,26,10,0.12)')}
        >
          <X className="w-5 h-5" />
        </button>

        {/* ── LEFT: Deity Image ── */}
        <div
          className="relative flex-shrink-0 flex items-center justify-center lg:w-[50%] h-[38vh] lg:h-full w-full overflow-hidden"
          style={{ background: 'linear-gradient(160deg, #240b04 0%, #3a1608 60%, #150502 100%)' }}
        >
          <img
            src={deity.image}
            alt={deity.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain p-4 select-none drop-shadow-2xl"
            draggable={false}
          />

          {/* Deity Name Overlay on Image */}
          <div
            className="absolute bottom-0 inset-x-0 px-6 py-5"
            style={{ background: 'linear-gradient(to top, rgba(15,4,1,0.85) 0%, transparent 100%)' }}
          >
            <p className="font-display font-bold text-xl md:text-2xl text-white drop-shadow-md">
              {deity.name}
            </p>
            <p className="font-hindi text-base text-amber-200/90 mt-0.5 font-semibold">
              {deity.hindiName}
            </p>
          </div>

          {/* Prev / Next Nav */}
          {totalCount > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                aria-label="Previous Deity"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg"
                style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', backdropFilter: 'blur(4px)' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.28)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onNext(); }}
                aria-label="Next Deity"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg"
                style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', backdropFilter: 'blur(4px)' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.28)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Deity Counter */}
          {totalCount > 1 && (
            <div className="absolute top-4 left-4 text-xs font-body font-bold tracking-widest text-amber-200/60 uppercase">
              {currentIndex + 1} / {totalCount}
            </div>
          )}
        </div>

        {/* ── RIGHT: Aarti Reader ── */}
        <div className="flex flex-col lg:w-[50%] w-full h-[50vh] lg:h-full overflow-hidden bg-[#fdf9f3]">
          {/* Header Bar */}
          <div
            className="px-6 py-5 flex-shrink-0 bg-[#faf3e8] border-b border-amber-900/15"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-body font-bold uppercase tracking-[0.25em] text-[#a05020] block mb-1">
                  DEVOTIONAL AARTI
                </span>
                <h2 className="font-display font-bold text-xl sm:text-2xl text-[#5a1a0a] leading-snug">
                  {deity.aartiTitle}
                </h2>
              </div>

              {/* Controls: Auto Scroll / Pause & Start Again */}
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleAutoScroll}
                  aria-label={isPlaying ? 'Pause Auto Scroll' : 'Start Auto Scroll'}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-body font-bold transition-all duration-200 shadow-sm border"
                  style={{
                    background: isPlaying ? '#5a1a0a' : 'rgba(90,26,10,0.08)',
                    color: isPlaying ? '#fff' : '#5a1a0a',
                    borderColor: 'rgba(90,26,10,0.2)',
                  }}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5 fill-current" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Auto Scroll</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleStartAgain}
                  aria-label="Start Again"
                  title="Return to beginning"
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-body font-semibold transition-all duration-200 border border-amber-900/20 text-[#5a1a0a] hover:bg-amber-900/10"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Start Again</span>
                </button>
              </div>
            </div>
          </div>

          {/* Scrollable Aarti Panel */}
          <div
            ref={aartiScrollRef}
            onWheel={handleUserInteraction}
            onTouchMove={handleUserInteraction}
            onPointerDown={handleUserInteraction}
            className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 space-y-4"
            style={{
              scrollBehavior: 'smooth',
              scrollbarWidth: 'thin',
              scrollbarColor: '#c07030 rgba(160,80,30,0.1)',
            }}
          >
            {/* Decorative Top Divider */}
            <div className="flex items-center justify-center gap-3 py-1">
              <div className="h-px w-12 bg-amber-900/20" />
              <span className="text-amber-700 text-sm">॥</span>
              <div className="h-px w-12 bg-amber-900/20" />
            </div>

            {/* Complete Verses */}
            <div
              className="font-hindi text-base sm:text-lg whitespace-pre-line text-center sm:text-left tracking-wide"
              style={{
                color: '#3d160b',
                lineHeight: '1.9',
              }}
            >
              {deity.aartiHindi}
            </div>

            {/* Decorative Bottom Divider */}
            <div className="flex items-center justify-center gap-3 pt-6 pb-2">
              <div className="h-px w-16 bg-amber-900/20" />
              <span className="text-amber-700 text-xs font-body font-bold">॥ ॐ ॥</span>
              <div className="h-px w-16 bg-amber-900/20" />
            </div>
          </div>

          {/* Bottom Dot indicators for pagination */}
          {totalCount > 1 && (
            <div className="flex items-center justify-center gap-2 py-3 bg-[#faf3e8] border-t border-amber-900/10 flex-shrink-0">
              {Array.from({ length: totalCount }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (i > currentIndex) onNext();
                    if (i < currentIndex) onPrev();
                  }}
                  aria-label={`Go to deity ${i + 1}`}
                  className="rounded-full transition-all duration-200"
                  style={{
                    width: i === currentIndex ? '20px' : '6px',
                    height: '6px',
                    background: i === currentIndex ? '#a05020' : 'rgba(160,80,30,0.25)',
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
