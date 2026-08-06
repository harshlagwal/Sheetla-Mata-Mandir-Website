import React from 'react';
import { NavLink } from 'react-router-dom';
import { MapPin, Clock, Cctv } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { templeData } from '../../data/temple';


export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="relative bg-surface-container-low pt-20 pb-10 border-t border-outline-variant/30 overflow-hidden">
      {/* Background Subtle Mountain Motif SVG */}
      <div className="absolute inset-x-0 top-0 h-12 opacity-10 pointer-events-none overflow-hidden" aria-hidden="true">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full fill-primary">
          <path d="M0,0 C150,90 350,-40 500,60 C650,160 900,10 1200,40 L1200,0 L0,0 Z"></path>
        </svg>
      </div>

      <div className="max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10 mb-12">
        {/* Column 1: Quick Links */}
        <div className="flex flex-col gap-3">
          <h4 className="font-display font-semibold text-base text-primary uppercase tracking-wider border-b border-outline-variant/30 pb-2">
            {t.nav.home} & {t.nav.about}
          </h4>
          <nav className="flex flex-col gap-2 font-body text-sm text-on-surface-variant">
            <NavLink to="/" className="hover:text-primary transition-colors">{t.nav.home}</NavLink>
            <NavLink to="/about" className="hover:text-primary transition-colors">{t.nav.about}</NavLink>
            <NavLink to="/gallery" className="hover:text-primary transition-colors">{t.nav.gallery}</NavLink>
            <NavLink to="/mata-sheetla" className="hover:text-primary transition-colors">{t.nav.mataSheetla}</NavLink>
          </nav>
        </div>

        {/* Column 2: Village & Events */}
        <div className="flex flex-col gap-3">
          <h4 className="font-display font-semibold text-base text-primary uppercase tracking-wider border-b border-outline-variant/30 pb-2">
            {t.nav.festivals} & {t.nav.village}
          </h4>
          <nav className="flex flex-col gap-2 font-body text-sm text-on-surface-variant">
            <NavLink to="/festivals" className="hover:text-primary transition-colors">{t.nav.festivals}</NavLink>
            <NavLink to="/village" className="hover:text-primary transition-colors">{t.nav.village}</NavLink>
            <NavLink to="/visit" className="hover:text-primary transition-colors">{t.nav.visit}</NavLink>
            <NavLink to="/contact" className="hover:text-primary transition-colors">{t.nav.contact}</NavLink>
            <NavLink to="/donate" className="hover:text-primary transition-colors">{t.nav.daan}</NavLink>
          </nav>
        </div>

        {/* Column 3: Visit & Timings Summary */}
        <div className="flex flex-col gap-3">
          <h4 className="font-display font-semibold text-base text-primary uppercase tracking-wider border-b border-outline-variant/30 pb-2">
            {t.nav.visit}
          </h4>
          <div className="flex flex-col gap-2 font-body text-sm text-on-surface-variant">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
              <span>{templeData.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
              <span>{t.visitPage.morningAarti}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
              <span>{t.visitPage.eveningAarti}</span>
            </div>
            
            {/* CCTV Security Block */}
            <div className="flex items-start gap-2 mt-3 pt-4 border-t border-outline-variant/30">
              <Cctv className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
              <div className="flex flex-col gap-2">
                <span className="font-semibold text-primary">CCTV Surveillance</span>
                <span className="leading-relaxed">
                  For the safety and security of all devotees, the entire temple premises are monitored through 24×7 CCTV surveillance.
                </span>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary bg-secondary-fixed/50 px-3 py-1.5 rounded-full w-fit mt-1">
                  <span aria-hidden="true">✓</span>
                  <span>24×7 Security Monitoring</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Devotional Center Mantra */}
      <div className="flex flex-col items-center gap-4 my-8 relative z-10" aria-hidden="true">

        <div className="flex items-center gap-4">
          <div className="h-px w-24 md:w-32 bg-outline-variant/40"></div>
          <p className="font-hindi text-2xl md:text-3xl text-secondary font-semibold drop-shadow-sm">
            {t.jaiMataDi}
          </p>
          <div className="h-px w-24 md:w-32 bg-outline-variant/40"></div>
        </div>
      </div>

      {/* Bottom Rights */}
      <div className="max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop flex flex-col md:flex-row justify-between items-center text-xs text-on-surface-variant border-t border-outline-variant/20 pt-6 relative z-10">
        <p>{t.footer.rights}</p>
        <p className="mt-2 md:mt-0 opacity-80 font-hindi">
          {t.brandSubtitle} • देवभूमि हिमाचल प्रदेश
        </p>
      </div>
    </footer>
  );
};
