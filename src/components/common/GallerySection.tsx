import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { Button } from './Button';
import { DarshanModal } from './DarshanModal';
import { darshanDeities, DarshanDeity } from '../../data/darshanData';

interface GallerySectionProps {
  showAllButton?: boolean;
}

export const GallerySection: React.FC<GallerySectionProps> = React.memo(({ showAllButton = true }) => {
  const { t, isHindi } = useLanguage();
  const navigate = useNavigate();
  const [activeDeity, setActiveDeity] = useState<DarshanDeity | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const openModal = useCallback((deity: DarshanDeity, index: number) => {
    setActiveDeity(deity);
    setActiveIndex(index);
  }, []);

  const closeModal = useCallback(() => setActiveDeity(null), []);

  const handlePrev = useCallback(() => {
    const prev = (activeIndex - 1 + darshanDeities.length) % darshanDeities.length;
    setActiveIndex(prev);
    setActiveDeity(darshanDeities[prev]);
  }, [activeIndex]);

  const handleNext = useCallback(() => {
    const next = (activeIndex + 1) % darshanDeities.length;
    setActiveIndex(next);
    setActiveDeity(darshanDeities[next]);
  }, [activeIndex]);

  return (
    <section className="py-20" style={{ background: 'linear-gradient(to bottom, #fdf8f0, #faf3e8)' }}>
      <div className="max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop">

        {/* Section heading */}
        <div className="text-center mb-12">
          <p
            className="font-body text-xs font-bold uppercase tracking-[0.25em] mb-3"
            style={{ color: '#a05020' }}
          >
            DIVINE DARSHAN
          </p>
          <h2
            className="font-display font-bold text-3xl md:text-4xl lg:text-5xl leading-tight"
            style={{ color: '#5a1a0a' }}
          >
            {t.home?.darshanHeading || 'Sacred Gallery'}
          </h2>
          <p
            className="font-hindi text-xl text-tertiary font-semibold mt-1"
            style={{ color: '#8b3a1a' }}
          >
            {t.home?.darshanHindiHeading || 'पावन दर्शन'}
          </p>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="h-px w-14" style={{ background: 'rgba(160,80,30,0.3)' }} />
            <span style={{ color: '#c07030', fontSize: '16px' }}>✦</span>
            <div className="h-px w-14" style={{ background: 'rgba(160,80,30,0.3)' }} />
          </div>

          <p
            className="font-body text-base mt-4 max-w-xl mx-auto leading-relaxed"
            style={{ color: '#7a5030' }}
          >
            {t.home?.darshanSub || 'Immerse yourself in the sacred presence of Sheetla Mata Mandir, Lagdevi.'}
          </p>
        </div>

        {/* 2×2 deity card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7 max-w-4xl mx-auto">
          {darshanDeities.map((deity, idx) => (
            <button
              key={deity.id}
              onClick={() => openModal(deity, idx)}
              className="group relative overflow-hidden text-left focus:outline-none focus-visible:ring-2"
              style={{
                aspectRatio: '16 / 10',
                borderRadius: '14px',
                boxShadow: '0 4px 20px rgba(100,30,10,0.13), 0 0 0 1px rgba(180,100,40,0.10)',
                transition: 'box-shadow 200ms ease, transform 200ms ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 10px 36px rgba(100,30,10,0.20), 0 0 0 1px rgba(180,100,40,0.18)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(100,30,10,0.13), 0 0 0 1px rgba(180,100,40,0.10)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              aria-label={`View ${deity.name} darshan`}
            >
              <img
                src={deity.image}
                alt={deity.name}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ transition: 'transform 300ms ease' }}
              />

              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(35,8,2,0.80) 0%, rgba(35,8,2,0.20) 45%, transparent 100%)' }}
              />

              {/* Label */}
              <div className="absolute bottom-0 inset-x-0 px-5 py-4">
                <p
                  className="font-display font-bold text-base md:text-lg text-white leading-tight"
                  style={{ textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}
                >
                  {isHindi ? deity.hindiName : deity.name}
                </p>
                <p
                  className="font-hindi text-xs mt-0.5"
                  style={{ color: 'rgba(255,210,130,0.88)', textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}
                >
                  {isHindi ? deity.subtitle : deity.hindiName}
                </p>
              </div>

              {/* Hover cue */}
              <div
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100"
                style={{ transition: 'opacity 200ms ease' }}
              >
                <span
                  className="font-body font-semibold text-xs uppercase tracking-widest px-4 py-2 rounded-full"
                  style={{
                    background: 'rgba(255,255,255,0.14)',
                    color: 'rgba(255,255,255,0.95)',
                    border: '1px solid rgba(255,255,255,0.22)',
                    backdropFilter: 'blur(6px)',
                  }}
                >
                  {isHindi ? 'दर्शन करें' : 'View Darshan'}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* View All button */}
        {showAllButton && (
          <div className="mt-12 flex justify-center">
            <Button
              variant="secondary"
              onClick={() => navigate('/gallery')}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              {t.common?.viewGallery || 'View Full Gallery'}
            </Button>
          </div>
        )}
      </div>

      <DarshanModal
        deity={activeDeity}
        totalCount={darshanDeities.length}
        currentIndex={activeIndex}
        onClose={closeModal}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </section>
  );
});
