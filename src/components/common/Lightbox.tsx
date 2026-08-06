import React, { useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryImage } from '../../data/gallery';
import { useLanguage } from '../../context/LanguageContext';

interface LightboxProps {
  image: GalleryImage | null;
  imagesCount?: number;
  currentIndex?: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  image,
  imagesCount = 0,
  currentIndex = 0,
  onClose,
  onPrev,
  onNext,
}) => {
  const { isHindi } = useLanguage();

  // Touch / swipe state
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    if (image) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [image, handleKeyDown]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    // Only trigger horizontal swipe if horizontal movement dominates
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 48) {
      if (dx < 0) onNext();
      else onPrev();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <AnimatePresence>
      {image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between p-4 md:p-8"
          style={{ background: 'rgba(10,6,4,0.95)', backdropFilter: 'blur(18px)' }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top bar — title + counter + close */}
          <div className="w-full max-w-5xl flex justify-between items-start text-white z-10">
            <div className="flex flex-col">
              <h3 className="font-display font-bold text-base md:text-xl text-amber-200/90 drop-shadow-md leading-tight">
                {isHindi ? image.hindiTitle : image.title}
              </h3>
              {imagesCount > 0 && (
                <span className="font-body text-xs text-white/50 font-medium tracking-widest uppercase mt-1">
                  {currentIndex + 1} / {imagesCount}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors shadow-lg shrink-0 ml-4"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main image + prev/next navigation */}
          <div className="relative flex-1 w-full max-w-5xl flex items-center justify-center my-4 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={image.id}
                src={image.url}
                alt={image.title}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="max-h-[72vh] max-w-full object-contain rounded-2xl shadow-2xl select-none"
                draggable={false}
              />
            </AnimatePresence>

            {/* Prev button */}
            <button
              onClick={onPrev}
              className="absolute left-2 md:left-4 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors shadow-xl backdrop-blur-sm border border-white/10"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next button */}
            <button
              onClick={onNext}
              className="absolute right-2 md:right-4 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors shadow-xl backdrop-blur-sm border border-white/10"
              aria-label="Next Image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Caption + dot indicators */}
          <div className="w-full max-w-2xl flex flex-col items-center gap-4 z-10">
            <div className="bg-white/8 backdrop-blur-md px-6 py-4 rounded-2xl text-center border border-white/10 shadow-xl">
              <p className="font-body text-sm md:text-base text-white/90">
                {isHindi ? image.hindiCaption : image.caption}
              </p>
            </div>

            {/* Dot indicators */}
            {imagesCount > 1 && (
              <div className="flex items-center gap-1.5">
                {Array.from({ length: imagesCount }).map((_, i) => (
                  <span
                    key={i}
                    className={`rounded-full transition-all duration-300 ${
                      i === currentIndex
                        ? 'w-5 h-1.5 bg-amber-300'
                        : 'w-1.5 h-1.5 bg-white/30'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
