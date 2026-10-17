import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Clock,
  Images,
  MapPin,
  Sparkles,
  HeartHandshake
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { templeData } from '../../data/temple';

// Exclusive High-Definition Hero Image
import mataSheetlaHeroImg from '../../assets/mata sheetla.png';

export const HeroSlideshow: React.FC = () => {
  const { t, isHindi } = useLanguage();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLElement>(null);

  // Subtle 60FPS Hardware-Accelerated Parallax on the Showcase Card
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const cardY = useTransform(scrollYProgress, [0, 1], [0, -35]);
  const cardScale = useTransform(scrollYProgress, [0, 1], [1, 0.98]);

  return (
    <section
      ref={containerRef}
      id="hero-sanctuary"
      aria-label="Temple Hero Sanctuary"
      className="relative w-full pt-28 sm:pt-32 md:pt-36 pb-14 md:pb-20 bg-[#fdfbf9] text-slate-900 overflow-hidden select-none"
    >
      {/* ── 1. ATMOSPHERIC DIVINE AMBIENT HALO IN BACKGROUND ── */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-b from-amber-400/20 via-amber-200/10 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* ── 2. EDITORIAL HERO HEADER (CLEAN IVORY CANVAS & MAJESTIC TYPOGRAPHY) ── */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
        
        {/* Sacred Devanagari Invocation Pill */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-900 text-xs font-semibold mb-5 backdrop-blur-sm shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span className="font-hindi tracking-wider">॥ ॐ श्री शीतलायै नमः ॥</span>
          <span className="text-amber-800/40">•</span>
          <span className="text-[11px] font-mono tracking-widest uppercase text-amber-800">
            {isHindi ? 'लगदेवी धाम' : 'LAGDEVI DHAM'}
          </span>
        </motion.div>

        {/* Grand Display Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 tracking-tight leading-[1.12] max-w-4xl"
        >
          {isHindi ? (
            <>
              श्री शीतला माता पावन धाम
              <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-amber-800/90 mt-2 sm:mt-2.5">
                लगदेवी, हमीरपुर • हिमाचल प्रदेश
              </span>
            </>
          ) : (
            <>
              Shree Sheetla Mata Mandir
              <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-amber-800/90 mt-2 sm:mt-2.5">
                Historic Himalayan Sanctuary • Lagdevi
              </span>
            </>
          )}
        </motion.h1>

        {/* Poetic Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.16 }}
          className="font-body text-slate-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mt-4 sm:mt-5 leading-relaxed"
        >
          {isHindi
            ? 'रोग-शोक हरने वाली, सुख-समृद्धि प्रदायिनी माँ शीतला का जागृत शक्तिपीठ। देवदार की शांत वादियों में स्थापित अपार आस्था का पावन केंद्र।'
            : 'Nestled in the serene pine valleys of Hamirpur, Himachal Pradesh — a timeless Himalayan sanctuary of healing, divine grace, and centuries of ancestral devotion.'}
        </motion.p>

        {/* Centered Action CTAs - Apple & Google Antigravity Liquid Glass */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.24 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-7 sm:mt-9"
        >
          <button
            onClick={() => navigate('/about')}
            className="btn-liquid-black group"
          >
            <span>{t.common.exploreMandir}</span>
            <ArrowRight className="w-4 h-4 text-amber-400 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={() => navigate('/visit')}
            className="btn-liquid-glass group"
          >
            <Clock className="w-4 h-4 text-amber-600 transition-transform group-hover:rotate-12" />
            <span>{t.nav.darshanCTA}</span>
          </button>

          <button
            onClick={() => navigate('/gallery')}
            className="btn-liquid-glass group"
          >
            <Images className="w-4 h-4 text-slate-600 transition-transform group-hover:scale-110" />
            <span>{t.common.viewGallery}</span>
          </button>
        </motion.div>

      </div>

      {/* ── 3. FRAMED SANCTUM SHOWCASE CARD (100% NATIVE HD SHARPNESS & ZERO BLUR) ── */}
      <motion.div
        style={{ y: cardY, scale: cardScale }}
        className="relative max-w-5xl mx-auto px-4 sm:px-6 w-full mt-10 sm:mt-14"
      >
        {/* Luxury Golden Ambient Halo behind Card */}
        <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-500/25 via-amber-300/35 to-amber-500/25 rounded-3xl sm:rounded-[36px] blur-xl opacity-60 -z-10" />

        {/* Exterior Luxury Beveled Frame */}
        <div className="relative p-2 sm:p-3 rounded-2xl sm:rounded-3xl md:rounded-[32px] bg-gradient-to-b from-amber-200/60 via-amber-100/20 to-amber-200/40 border border-amber-300/60 shadow-[0_24px_70px_rgba(217,119,6,0.2)]">
          
          {/* 16:9 Pixel-Perfect Image Container - ZERO BLUR, ZERO ZOOM CROP */}
          <div className="relative rounded-xl sm:rounded-2xl md:rounded-[24px] overflow-hidden aspect-[16/9] w-full bg-slate-950 shadow-2xl">
            <img
              src={mataSheetlaHeroImg}
              alt={isHindi ? 'श्री शीतला माता पावन धाम - लगदेवी' : 'Shree Sheetla Mata Mandir - Lagdevi'}
              className="w-full h-full object-contain sm:object-cover object-center filter brightness-[1.0] contrast-[1.02]"
              style={{
                imageRendering: '-webkit-optimize-contrast',
                transform: 'translateZ(0)',
              }}
              fetchPriority="high"
            />

            {/* Floating Live Badge Top-Left */}
            <div className="absolute top-3 left-3 sm:top-5 sm:left-5 z-10 inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-slate-950/70 backdrop-blur-xl border border-white/20 text-white text-[11px] sm:text-xs font-medium shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold text-white/95">
                {isHindi ? 'मंदिर खुला है' : 'Temple Open'}
              </span>
              <span className="text-white/30">•</span>
              <span className="text-white/80">
                {templeData.openingTime} – {templeData.closingTime}
              </span>
            </div>

            {/* Floating Location Pill Top-Right */}
            <div className="absolute top-3 right-3 sm:top-5 sm:right-5 z-10 hidden sm:inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full bg-slate-950/70 backdrop-blur-xl border border-white/20 text-white text-[11px] sm:text-xs font-medium shadow-lg">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Village Lagdevi, Hamirpur (HP)</span>
            </div>

            {/* Floating Aarti Pill Bottom-Right */}
            <div className="absolute bottom-3 right-3 sm:bottom-5 sm:right-5 z-10 hidden md:inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-slate-950/70 backdrop-blur-xl border border-white/20 text-white text-[11px] sm:text-xs font-medium shadow-lg">
              <Clock className="w-3.5 h-3.5 text-amber-300" />
              <span className="text-white/70">
                {isHindi ? 'दैनिक आरती:' : 'Daily Aarti:'}
              </span>
              <span className="font-semibold text-amber-200">
                {templeData.morningAarti} • {templeData.eveningAarti}
              </span>
            </div>

          </div>
        </div>
      </motion.div>
    </section>
  );
};
