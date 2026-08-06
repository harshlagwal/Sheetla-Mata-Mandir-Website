import React, { useState, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { DarshanModal } from '../components/common/DarshanModal';
import { darshanDeities, DarshanDeity } from '../data/darshanData';
import mandirBuildingImg from '../assets/Mandir building.webp';

export const Gallery: React.FC = () => {
  const { isHindi } = useLanguage();
  const [activeDeity, setActiveDeity] = useState<DarshanDeity | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const openModal = useCallback((deity: DarshanDeity, index: number) => {
    setActiveDeity(deity);
    setActiveIndex(index);
  }, []);

  const closeModal = useCallback(() => {
    setActiveDeity(null);
  }, []);

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
    <div className="w-full pt-28 pb-24" style={{ background: '#fdf8f0' }}>

      {/* ═══════════════════════════════════════
          PAGE HEADER
      ═══════════════════════════════════════ */}
      <section
        className="py-14 px-margin-mobile lg:px-margin-desktop text-center mb-4"
        style={{ borderBottom: '1px solid rgba(160,80,30,0.12)', background: 'linear-gradient(to bottom, #faf3e8, #fdf8f0)' }}
      >
        <div className="max-w-2xl mx-auto">
          <p
            className="font-body text-xs font-bold uppercase tracking-[0.28em] mb-3"
            style={{ color: '#a05020' }}
          >
            SACRED DARSHAN GALLERY
          </p>
          <h1
            className="font-display font-bold leading-tight"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', color: '#5a1a0a' }}
          >
            पावन दर्शन
          </h1>
          <p
            className="font-display font-semibold text-lg md:text-xl mt-1"
            style={{ color: '#8b3a1a' }}
          >
            Sacred Darshan Gallery
          </p>
          {/* Decorative rule */}
          <div className="flex items-center justify-center gap-3 mt-5 mb-4">
            <div className="h-px w-16" style={{ background: 'rgba(160,80,30,0.3)' }} />
            <span style={{ color: '#c07030', fontSize: '18px' }}>✦</span>
            <div className="h-px w-16" style={{ background: 'rgba(160,80,30,0.3)' }} />
          </div>
          <p
            className="font-body text-base leading-relaxed"
            style={{ color: '#7a5030' }}
          >
            Experience the divine presence of Sheetla Mata Mandir, Lagdevi.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          DEITY CARDS — 2×2 landscape grid
      ═══════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-margin-mobile lg:px-margin-desktop py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-8">
          {darshanDeities.map((deity, idx) => (
            <button
              key={deity.id}
              onClick={() => openModal(deity, idx)}
              className="group relative overflow-hidden text-left focus:outline-none focus-visible:ring-2"
              style={{
                aspectRatio: '16 / 10',
                borderRadius: '16px',
                boxShadow: '0 4px 24px rgba(100,30,10,0.14), 0 0 0 1px rgba(180,100,40,0.12)',
                transition: 'box-shadow 200ms ease, transform 200ms ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(100,30,10,0.22), 0 0 0 1px rgba(180,100,40,0.20)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 24px rgba(100,30,10,0.14), 0 0 0 1px rgba(180,100,40,0.12)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              aria-label={`View ${deity.name} darshan`}
            >
              {/* Deity image */}
              <img
                src={deity.image}
                alt={deity.name}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ transition: 'transform 300ms ease' }}
              />
              {/* Hover scale via CSS group hack */}
              <style>{`
                button:hover .deity-img-${deity.id} { transform: scale(1.04); }
              `}</style>

              {/* Bottom gradient */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to top, rgba(40,10,4,0.82) 0%, rgba(40,10,4,0.30) 40%, transparent 100%)',
                }}
              />

              {/* Deity label */}
              <div className="absolute bottom-0 inset-x-0 px-5 py-5">
                <p
                  className="font-display font-bold text-lg md:text-xl text-white leading-tight drop-shadow-md"
                  style={{ textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}
                >
                  {isHindi ? deity.hindiName : deity.name}
                </p>
                <p
                  className="font-hindi text-sm mt-0.5"
                  style={{ color: 'rgba(255,210,140,0.90)', textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}
                >
                  {isHindi ? deity.subtitle : deity.hindiName}
                </p>
              </div>

              {/* Hover: tap-to-darshan indicator */}
              <div
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                style={{ transition: 'opacity 200ms ease' }}
              >
                <span
                  className="font-body font-semibold text-xs uppercase tracking-widest px-5 py-2.5 rounded-full"
                  style={{
                    background: 'rgba(255,255,255,0.15)',
                    color: 'rgba(255,255,255,0.95)',
                    border: '1px solid rgba(255,255,255,0.25)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  {isHindi ? 'दर्शन करें' : 'View Darshan'}
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          TEMPLE BUILDING — wide feature image
      ═══════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-margin-mobile lg:px-margin-desktop pb-4">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-7">
          <div className="h-px flex-1" style={{ background: 'rgba(160,80,30,0.20)' }} />
          <p
            className="font-body text-xs font-bold uppercase tracking-[0.22em] text-center"
            style={{ color: '#a05020' }}
          >
            {isHindi ? 'हमारा मंदिर' : 'Our Temple'}
          </p>
          <div className="h-px flex-1" style={{ background: 'rgba(160,80,30,0.20)' }} />
        </div>

        <div
          className="relative w-full overflow-hidden"
          style={{
            borderRadius: '16px',
            aspectRatio: '16 / 7',
            boxShadow: '0 8px 40px rgba(100,30,10,0.18), 0 0 0 1px rgba(180,100,40,0.12)',
          }}
        >
          <img
            src={mandirBuildingImg}
            alt="Sheetla Mata Mandir — Lagdevi, Himachal Pradesh"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
          {/* Caption overlay */}
          <div
            className="absolute bottom-0 inset-x-0 px-6 py-5"
            style={{ background: 'linear-gradient(to top, rgba(30,8,2,0.75) 0%, transparent 100%)' }}
          >
            <p className="font-display font-bold text-white text-lg drop-shadow-md">
              {isHindi ? 'शीतला माता मंदिर, लगदेवी' : 'Sheetla Mata Mandir, Lagdevi'}
            </p>
            <p className="font-body text-sm mt-0.5" style={{ color: 'rgba(255,210,140,0.85)' }}>
              {isHindi ? 'ग्राम लगदेवी, हिमाचल प्रदेश' : 'Village Lagdevi, Himachal Pradesh'}
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          DARSHAN MODAL
      ═══════════════════════════════════════ */}
      <DarshanModal
        deity={activeDeity}
        totalCount={darshanDeities.length}
        currentIndex={activeIndex}
        onClose={closeModal}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
};
