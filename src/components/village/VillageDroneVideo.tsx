import React, { useRef, useEffect, useState } from 'react';
import { MapPin, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { motion, useInView } from 'framer-motion';
// @ts-ignore
import droneVideo from '../../assets/Lagdevi Village Drone shoot .mp4';

interface VillageDroneVideoProps {
  className?: string;
  poster?: string;
  showDefaultOverlay?: boolean;
  children?: React.ReactNode;
}

export const VillageDroneVideo: React.FC<VillageDroneVideoProps> = React.memo(({
  className = "",
  poster,
  showDefaultOverlay = true,
  children,
}) => {
  const { isHindi } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  
  // Use Framer Motion's useInView for scroll animation (only once)
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setIsReducedMotion(prefersReducedMotion);

    const video = videoRef.current;
    if (!video || prefersReducedMotion) return;

    // Intersection Observer for play/pause
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!document.hidden && !autoplayBlocked) {
            video.play().catch(() => setAutoplayBlocked(true));
          }
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(video);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
      } else {
        // Resume if intersecting
        const rect = video.getBoundingClientRect();
        const inViewport = (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
        if (inViewport && !autoplayBlocked) {
          video.play().catch(() => setAutoplayBlocked(true));
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [autoplayBlocked]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`relative group bg-surface-container overflow-hidden ${className}`}
    >
      {/* Loading Skeleton */}
      {!isVideoLoaded && !isReducedMotion && (
        <div className="absolute inset-0 bg-surface-variant animate-pulse z-0" />
      )}

      {/* Video */}
      <video
        ref={videoRef}
        src={droneVideo}
        poster={poster}
        className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.02] ${isVideoLoaded || isReducedMotion ? 'opacity-100' : 'opacity-0'}`}
        muted
        loop
        playsInline
        preload="metadata"
        onLoadedData={() => setIsVideoLoaded(true)}
        aria-label="Lagdevi Village cinematic drone view"
        controls={isReducedMotion}
      />

      {/* Default Overlay */}
      {showDefaultOverlay && (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
          
          <div className="absolute bottom-0 left-0 p-4 md:p-6 lg:p-8 flex flex-col justify-end pointer-events-none">
            <div className="inline-flex items-center gap-1.5 md:gap-2 bg-black/40 backdrop-blur-md px-2.5 py-1 md:px-3.5 md:py-1.5 rounded-full border border-white/20 text-white/90 text-[10px] md:text-xs font-body tracking-wider uppercase mb-2 md:mb-3 w-fit shadow-lg">
              <Sparkles className="w-3 h-3 md:w-3.5 md:h-3.5 text-secondary" />
              <span>{isHindi ? 'ड्रोन दृश्य' : 'Drone View'}</span>
            </div>
            
            <h3 className="font-display text-white text-xl md:text-2xl lg:text-3xl font-bold drop-shadow-md mb-0.5 md:mb-1 flex items-center gap-2">
              <MapPin className="w-5 h-5 md:w-6 md:h-6 text-secondary" />
              {isHindi ? 'लगदेवी' : 'Lagdevi Village'}
            </h3>
            
            <p className="font-body text-white/90 text-sm md:text-base font-medium drop-shadow ml-7 md:ml-8">
              {isHindi ? 'हमीरपुर • हिमाचल प्रदेश' : 'Hamirpur • Himachal Pradesh'}
            </p>
          </div>
        </>
      )}

      {/* Custom Children */}
      {children}
    </motion.div>
  );
});
