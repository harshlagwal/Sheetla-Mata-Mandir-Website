import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Compass, HeartHandshake, ArrowRight, Calendar, Clock, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { GallerySection } from '../components/common/GallerySection';
import { eventsData } from '../data/events';
import { announcementsData } from '../data/announcements';
import { templeData } from '../data/temple';
import heroVideo from '../assets/View.mp4';
import lagdeviViewImg from '../assets/lagdevi view.webp';
import mandirUnderImg from '../assets/mandir under image.webp';
import { LatestTempleUpdate } from '../components/common/LatestTempleUpdate';
import { VillageDroneVideo } from '../components/village/VillageDroneVideo';
import { SectionReveal } from '../components/motion/SectionReveal';
import { MotionCard } from '../components/motion/MotionCard';
import { MotionImage } from '../components/motion/MotionImage';
import { MantraMarquee } from '../components/common/MantraMarquee';

export const Home: React.FC = () => {
  const { t, isHindi } = useLanguage();
  const navigate = useNavigate();

  const heroRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const isIntersectingRef = useRef<boolean>(true);
  const [videoReady, setVideoReady] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  // Viewport-aware video playback & Tab visibility handling
  useEffect(() => {
    const video = videoRef.current;
    const hero = heroRef.current;

    // Check prefers-reduced-motion user preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion && video) {
      video.pause();
      return;
    }

    if (!video || !hero) return;

    // 1. Intersection Observer for smart play/pause based on Hero visibility
    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersectingRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          if (!document.hidden && !autoplayBlocked) {
            video.play().catch(() => {
              setAutoplayBlocked(true);
            });
          }
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(hero);

    // 2. Page Visibility API handling (browser tab switch)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
      } else {
        // Resume playback only if hero is currently in viewport
        if (isIntersectingRef.current && !prefersReducedMotion && !autoplayBlocked) {
          video.play().catch(() => {
            setAutoplayBlocked(true);
          });
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [autoplayBlocked]);

  const handleVideoCanPlay = () => {
    setVideoReady(true);
  };

  const handleVideoError = () => {
    setAutoplayBlocked(true);
  };

  return (
    <div className="w-full">
      {/* 1. HERO SECTION WITH DRONE VIDEO BACKGROUND */}
      <section
        id="hero-section"
        ref={heroRef}
        className="relative w-full flex flex-col overflow-hidden -mt-[92px]"
        style={{ minHeight: 'max(100svh, 660px)' }}
      >
        {/* Background Video Layer */}
        <div className="absolute inset-0 z-0 bg-inverse-surface">
          {/* Video Layer - mounted always, opacity transitions from 0 to 1 when browser can paint frames */}
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
            style={{
              filter: 'brightness(0.82) contrast(1.05)',
              opacity: videoReady ? 1 : 0,
              transition: 'opacity 600ms ease-out',
              willChange: 'opacity',
            }}
            onLoadedData={handleVideoCanPlay}
            onError={handleVideoError}
          >
            <source src={heroVideo} type="video/mp4" />
          </video>

          {/*
            Gradient layers — deliberately lighter in the centre (where video
            cinematic text sits) and darker only at the very top (behind navbar)
            and at the bottom (behind the temple content + info panel).
          */}
          {/* Top vignette — only covers the navbar area */}
          <div
            className="absolute inset-x-0 top-0 pointer-events-none"
            style={{
              height: '22%',
              background: 'linear-gradient(to bottom, rgba(66,42,38,0.72) 0%, transparent 100%)',
            }}
          />
          {/* Bottom vignette — covers temple content + info panel area */}
          <div
            className="absolute inset-x-0 bottom-0 pointer-events-none"
            style={{
              height: '55%',
              background: 'linear-gradient(to top, rgba(66,42,38,0.88) 0%, rgba(66,42,38,0.55) 40%, transparent 100%)',
            }}
          />
          {/* Subtle left/right edge darkening for cinematic look */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.25)_100%)] pointer-events-none" />
        </div>

        {/*
          VERTICAL LAYOUT STRATEGY
          ─────────────────────────
          [spacer — top 45%]   ← video title (LAGDEVI / HIMACHAL PRADESH) breathes here
          [temple content]     ← ॥ Jai Mata Di ॥, heading, desc, CTAs
          [info panel]         ← anchored near bottom
        */}

        {/* Spacer: pushes content below video's embedded cinematic title */}
        <div className="flex-1" style={{ minHeight: 'clamp(180px, 42svh, 380px)' }} />

        {/* Hero Content — lower 55% zone */}
        <div className="relative z-10 max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop w-full flex flex-col items-center text-center pb-6 md:pb-8">

          <span className="font-hindi text-xl md:text-2xl text-tertiary-fixed tracking-widest drop-shadow-lg block mb-3">
            {t.jaiMataDi}
          </span>

          <h1
            className="font-display font-bold text-surface-container-lowest mx-auto drop-shadow-2xl leading-tight"
            style={{ fontSize: 'clamp(2.25rem, 5.5vw, 5.5rem)', maxWidth: '820px' }}
          >
            {t.brandName}
          </h1>

          <p
            className="font-body text-surface-container-low mx-auto mt-3 drop-shadow-md font-medium"
            style={{ fontSize: 'clamp(0.875rem, 1.6vw, 1.1rem)', maxWidth: '850px' }}
          >
            {t.home.heroSub}
          </p>

          <p className="font-hindi text-base md:text-lg text-tertiary-fixed mt-2 font-medium drop-shadow-sm">
            {t.home.heroHindiText}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mt-6 md:mt-7">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/about')}
              icon={<ArrowRight className="w-5 h-5" />}
            >
              {t.common.exploreMandir}
            </Button>

            <Button
              variant="ghost"
              size="lg"
              onClick={() => navigate('/gallery')}
              className="text-surface-container-lowest border-surface/40 hover:bg-surface/20"
            >
              {t.common.viewGallery}
            </Button>
          </div>

          {/* Information Glass Bar — anchored at bottom */}
          <div className="mt-6 md:mt-8 bg-surface/15 backdrop-blur-md border border-surface/25 rounded-2xl p-3 md:p-5 max-w-3xl w-full shadow-2xl flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
            <div className="flex items-center gap-3 text-surface-container-lowest">
              <MapPin className="w-5 h-5 md:w-6 md:h-6 text-secondary-container shrink-0" />
              <div className="flex flex-col text-left">
                <span className="font-body text-[10px] md:text-[11px] uppercase tracking-wider text-surface-variant font-semibold">
                  {t.common.location}
                </span>
                <span className="font-body text-xs md:text-sm font-semibold">
                  {templeData.location}, {templeData.state}
                </span>
              </div>
            </div>

            <div className="hidden md:block w-px h-9 bg-surface/20" />

            <div className="flex items-center gap-3 text-surface-container-lowest">
              <Compass className="w-5 h-5 md:w-6 md:h-6 text-secondary-container shrink-0" />
              <div className="flex flex-col text-left">
                <span className="font-body text-[10px] md:text-[11px] uppercase tracking-wider text-surface-variant font-semibold">
                  {t.common.sanctuary}
                </span>
                <span className="font-body text-xs md:text-sm font-semibold">{templeData.name}</span>
              </div>
            </div>

            <div className="hidden md:block w-px h-9 bg-surface/20" />

            <div className="flex items-center gap-3 text-surface-container-lowest">
              <HeartHandshake className="w-5 h-5 md:w-6 md:h-6 text-secondary-container shrink-0" />
              <div className="flex flex-col text-left">
                <span className="font-body text-[10px] md:text-[11px] uppercase tracking-wider text-surface-variant font-semibold">
                  {t.common.blessings}
                </span>
                <span className="font-hindi text-sm md:text-base">{t.jaiMataDiShort}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom breathing room */}
        <div className="h-5 md:h-6 shrink-0 relative z-10" />
      </section>

      {/* SACRED DHYAN MANTRA */}
      <MantraMarquee />

      {/* LATEST TEMPLE UPDATE */}
      <LatestTempleUpdate />

      {/* 2. WELCOME SECTION */}
      <SectionReveal className="py-24 px-margin-mobile lg:px-margin-desktop max-w-container-max mx-auto w-full flex flex-col items-center">
        <SectionHeading
          tag={t.home.welcomeTag}
          title={t.home.welcomeHeading}
          hindiTitle={t.jaiMataDi}
          subtitle={t.home.welcomeText}
        />

        <div className="mt-4">
          <Button
            variant="secondary"
            size="md"
            onClick={() => navigate('/about')}
            icon={<ArrowRight className="w-4 h-4" />}
          >
            {t.common.discoverMandir}
          </Button>
        </div>
      </SectionReveal>

      {/* 3. TEMPLE STORY SECTION */}
      <SectionReveal className="py-20 bg-surface-container-lowest border-y border-outline-variant/30">
        <div className="max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 flex flex-col items-start space-y-6">
            <span className="font-body text-xs font-bold text-secondary uppercase tracking-[0.2em]">
              OUR SACRED HERITAGE
            </span>
            <h3 className="font-display text-3xl md:text-4xl font-bold text-primary">
              {t.home.sacredMandirHeading}
            </h3>
            <p className="font-body text-base md:text-lg text-on-surface-variant leading-relaxed">
              {t.home.sacredMandirText}
            </p>

            <div className="pl-6 border-l-4 border-secondary py-2 my-2 bg-surface-container-low/50 rounded-r-xl w-full">
              <p className="font-hindi text-2xl text-tertiary font-bold">
                {t.home.shradhaQuote}
              </p>
              <span className="font-body text-xs text-on-surface-variant uppercase tracking-widest mt-1 block font-semibold">
                {t.home.shradhaQuoteSub}
              </span>
            </div>

            <div className="pt-2">
              <Button
                variant="ghost"
                onClick={() => navigate('/about')}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                {t.common.readMore}
              </Button>
            </div>
          </div>

          <div className="lg:col-span-6 w-full h-80 md:h-[420px] rounded-2xl overflow-hidden shadow-2xl border-4 border-surface group">
            <MotionImage
              src={mandirUnderImg}
              alt="Sheetla Mata Mandir"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
        </div>
      </SectionReveal>

      {/* 4. GALLERY SECTION */}
      <GallerySection />

      {/* 6. FESTIVAL PREVIEW SECTION */}
      <SectionReveal className="py-24 bg-surface px-margin-mobile lg:px-margin-desktop">
        <div className="max-w-container-max mx-auto">
          <SectionHeading
            tag="CELEBRATIONS"
            title={t.home.eventsHeading}
            subtitle={t.home.eventsSub}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {eventsData.map((event) => (
              <MotionCard
                key={event.id}
                className="bg-surface-container-lowest rounded-2xl overflow-hidden border border-outline-variant/30 shadow-md flex flex-col"
              >
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={event.image}
                    alt={event.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-zoom-img"
                  />
                  <span className="absolute top-3 right-3 bg-secondary text-on-secondary px-3 py-1 rounded-full text-xs font-bold font-body uppercase shadow">
                    {event.category}
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-secondary mb-2">
                      <Calendar className="w-4 h-4" />
                      <span>{isHindi ? event.hindiDate : event.date}</span>
                    </div>
                    <h3 className="font-display text-xl font-bold text-primary">
                      {isHindi ? event.hindiTitle : event.title}
                    </h3>
                    <p className="font-body text-sm text-on-surface-variant mt-2 leading-relaxed">
                      {isHindi ? event.hindiDescription : event.description}
                    </p>
                  </div>
                </div>
              </MotionCard>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Button
              variant="secondary"
              onClick={() => navigate('/festivals')}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              {t.common.viewAllEvents}
            </Button>
          </div>
        </div>
      </SectionReveal>

      {/* 7. VILLAGE LAGDEVI SHOWCASE */}
      <SectionReveal className="py-20 bg-surface-container-low border-y border-outline-variant/30">
        <div className="max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="font-body text-xs font-bold text-secondary uppercase tracking-[0.2em]">
              COMMUNITY & CULTURE
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-primary mt-2">
              {t.home.villageHeading}
            </h2>
            <span className="font-hindi text-xl text-tertiary font-semibold block mb-4">
              {t.home.villageHindiHeading}
            </span>
            <p className="font-body text-base text-on-surface-variant leading-relaxed mb-6">
              {t.home.villageText}
            </p>
            <Button
              variant="primary"
              onClick={() => navigate('/village')}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              {t.common.discoverVillage}
            </Button>
          </div>

          <VillageDroneVideo 
            className="h-80 md:h-96 rounded-2xl shadow-xl border-4 border-surface" 
            poster={lagdeviViewImg} 
          />
        </div>
      </SectionReveal>



      {/* 8. DONATION CTA */}
      <SectionReveal className="py-20 bg-surface px-margin-mobile lg:px-margin-desktop">
        <div className="max-w-4xl mx-auto bg-surface-container-low border border-outline-variant/30 rounded-3xl p-8 md:p-12 text-center shadow-sm">
          <SectionHeading
            tag={t.donation.ctaHeroTitle}
            title={t.donation.ctaHeroText}
            subtitle=""
          />
          <div className="mt-6">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/donate')}
              icon={<HeartHandshake className="w-5 h-5" />}
            >
              {t.donation.ctaHeroBtn}
            </Button>
          </div>
        </div>
      </SectionReveal>

      {/* 9. VISIT PREVIEW & TIMINGS */}
      <SectionReveal className="py-24 bg-surface px-margin-mobile lg:px-margin-desktop max-w-container-max mx-auto">
        <div className="bg-surface-container-lowest rounded-3xl p-8 md:p-12 border border-outline-variant/30 shadow-lg grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <SectionHeading
              tag="VISITOR INFORMATION"
              title={t.home.visitHeading}
              subtitle={t.home.visitText}
              centered={false}
            />

            <div className="space-y-4 font-body text-sm text-on-surface">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-secondary shrink-0" />
                <span>{t.visitPage.darshanHours}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-secondary shrink-0" />
                <span>{t.visitPage.morningAarti}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-secondary shrink-0" />
                <span>{t.visitPage.eveningAarti}</span>
              </div>
            </div>

            <div className="mt-8">
              <a
                href={templeData.mapDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="secondary" icon={<MapPin className="w-4 h-4" />}>
                  {t.common.getDirections}
                </Button>
              </a>
            </div>
          </div>

          <div className="bg-surface-container rounded-2xl p-6 border border-outline-variant/40 space-y-4">
            <h3 className="font-display font-bold text-xl text-primary">
              {t.home.announcementsHeading}
            </h3>
            <p className="font-body text-xs text-on-surface-variant">
              {t.home.announcementsSub}
            </p>

            <div className="space-y-3 pt-2">
              {announcementsData.map((item) => (
                <div
                  key={item.id}
                  className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/20"
                >
                  <div className="flex justify-between items-center text-xs text-secondary font-bold mb-1">
                    <span>{isHindi ? item.hindiDate : item.date}</span>
                    <span className="px-2 py-0.5 bg-secondary-fixed text-on-secondary-fixed rounded text-[10px] uppercase">
                      {item.type}
                    </span>
                  </div>
                  <h4 className="font-display font-bold text-sm text-primary">
                    {isHindi ? item.hindiTitle : item.title}
                  </h4>
                  <p className="font-body text-xs text-on-surface-variant mt-1">
                    {isHindi ? item.hindiDescription : item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionReveal>
    </div>
  );
};
