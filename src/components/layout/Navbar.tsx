import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Globe, HeartHandshake } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import brandLogo from '../../assets/sheetla mata logo.webp';

// Navbar height: exported so Home.tsx can use the exact same offset value
const NAVBAR_HEIGHT = 76;

export const Navbar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [navbarMode, setNavbarMode] = useState<'hero' | 'scrolled'>('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();

  // ── Adaptive glassmorphism: transparent dark on hero, warm frosted on scroll ──
  useEffect(() => {
    if (location.pathname !== '/') {
      setNavbarMode('scrolled');
      return;
    }
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 50) {
            setNavbarMode('scrolled');
          } else {
            setNavbarMode('hero');
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial check (don't need throttle here)
    if (window.scrollY > 50) {
      setNavbarMode('scrolled');
    } else {
      setNavbarMode('hero');
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const isHeroMode = navbarMode === 'hero';

  const navLinks = [
    { path: '/',             label: t.nav.home },
    { path: '/about',        label: t.nav.about },
    { path: '/gallery',      label: t.nav.gallery },
    { path: '/festivals',    label: t.nav.festivals },
    { path: '/village',      label: t.nav.village },
    { path: '/visit',        label: t.nav.visit },
    { path: '/contact',      label: t.nav.contact },
    { path: '/mata-sheetla', label: t.nav.mataSheetla },
    { path: '/donate',       label: t.nav.daan },
  ];

  // ── Style tokens (mode-aware) ─────────────────────────────────────────────
  const brandColor     = isHeroMode ? 'text-surface-container-lowest' : 'text-primary';
  const subtitleColor  = isHeroMode ? 'text-surface-container-low opacity-90' : 'text-on-surface-variant';
  const navColor       = isHeroMode
    ? 'text-surface-container-lowest/90 hover:text-secondary-container'
    : 'text-on-surface-variant hover:text-primary';
  const navActiveColor = isHeroMode ? 'text-tertiary-fixed' : 'text-primary';

  // ── Active underline (pseudo-element trick via box-shadow keeps layout stable) ──
  const navItemClass = ({ isActive }: { isActive: boolean }) =>
    `font-body font-semibold transition-colors duration-300 whitespace-nowrap
     relative pb-[4px]
     after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-center after:rounded-full after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.4,0,0.2,1)] after:content-['']
     ${isActive
       ? `${navActiveColor} after:scale-x-100 after:bg-secondary`
       : `${navColor} after:scale-x-0 hover:after:scale-x-100 after:bg-primary/50`
     }`;

  // ── Route Prefetching ──
  const prefetchRoute = (path: string) => {
    switch (path) {
      case '/': import('../../pages/Home'); break;
      case '/about': import('../../pages/About'); break;
      case '/gallery': import('../../pages/Gallery'); break;
      case '/festivals': import('../../pages/Festivals'); break;
      case '/village': import('../../pages/Village'); break;
      case '/visit': import('../../pages/Visit'); break;
      case '/contact': import('../../pages/Contact'); break;
      case '/mata-sheetla': import('../../pages/MataSheetla'); break;
      case '/donate': import('../../pages/Donate'); break;
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-3 left-0 right-0 mx-auto z-50 transition-all duration-300 w-[94%] max-w-[1650px] ${
        mobileMenuOpen ? 'rounded-t-[28px] rounded-b-none' : 'rounded-[28px]'
      } ${
        isHeroMode
          ? 'bg-inverse-surface/20 border border-surface/10 backdrop-blur-md shadow-sm'
          : 'bg-surface-container-lowest/90 border border-outline-variant/30 backdrop-blur-xl shadow-md ring-1 ring-outline-variant/10'
      }`}
      style={{ height: `${NAVBAR_HEIGHT}px` }}
    >

      {/* ═══════════ INNER WRAPPER — wide, centred ═══════════ */}
      <div
        className="h-full mx-auto flex items-center w-full"
        style={{
          padding: '0 clamp(24px, 2vw, 28px)',
        }}
      >

        {/* ════ FULL 3-ZONE GRID — ≥ 1440px (nav-full breakpoint) ════ */}
        <div
          className="hidden nav-full:grid w-full h-full items-center"
          style={{
            gridTemplateColumns: 'minmax(220px, auto) minmax(0, 1fr) auto',
            columnGap: 'clamp(24px, 2vw, 56px)',
          }}
        >
          {/* LEFT — Brand */}
          <NavLink to="/" aria-label="Sheetla Mata Mandir — Home" style={{ textDecoration: 'none' }}
            className="flex items-center gap-2 md:gap-3 group"
          >
            <img 
              src={brandLogo} 
              alt="Sheetla Mata Mandir Official Logo" 
              className="w-[38px] h-[38px] md:w-[44px] md:h-[44px] rounded-full object-contain shrink-0" 
            />
            <div className="flex flex-col justify-center">
              <span
                className={`font-display font-bold leading-tight transition-colors duration-300 group-hover:opacity-90 ${brandColor}`}
                style={{ fontSize: 'clamp(18px, 1.4vw, 26px)', whiteSpace: 'nowrap' }}
              >
                {t.brandName}
              </span>
              <span
                className={`font-body uppercase tracking-widest mt-0.5 transition-colors duration-300 ${subtitleColor}`}
                style={{ fontSize: '10px', whiteSpace: 'nowrap' }}
              >
                {t.brandSubtitle}
              </span>
            </div>
          </NavLink>

          {/* CENTER — Navigation */}
          <nav
            className="flex items-center justify-center"
            aria-label="Main navigation"
            style={{ gap: 'clamp(14px, 1.4vw, 28px)' }}
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={navItemClass}
                style={{ fontSize: 'clamp(12px, 0.9vw, 15px)' }}
                onMouseEnter={() => prefetchRoute(link.path)}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* RIGHT — Language + Darshan */}
          <div className="flex items-center shrink-0" style={{ gap: 'clamp(12px, 1vw, 20px)' }}>
            <LanguageSwitcher language={language} setLanguage={setLanguage} isHeroMode={isHeroMode} />
            <DarshanButton navigate={navigate} label={t.nav.darshanCTA} />
          </div>
        </div>

        {/* ════ COMPACT FLEX — 1200px–1439px (nav-compact, below nav-full) ════ */}
        <div className="hidden nav-compact:flex nav-full:hidden w-full h-full items-center justify-between">
          {/* Brand */}
          <NavLink to="/" aria-label="Sheetla Mata Mandir — Home" style={{ textDecoration: 'none' }}
            className="flex items-center gap-2 shrink-0 group"
          >
            <img 
              src={brandLogo} 
              alt="Sheetla Mata Mandir Official Logo" 
              className="w-[38px] h-[38px] md:w-[44px] md:h-[44px] rounded-full object-contain shrink-0" 
            />
            <div className="flex flex-col justify-center">
              <span
                className={`font-display font-bold leading-tight transition-colors duration-300 group-hover:opacity-90 ${brandColor}`}
                style={{ fontSize: '17px', whiteSpace: 'nowrap' }}
              >
                {t.brandName}
              </span>
              <span
                className={`font-body uppercase tracking-wider mt-0.5 transition-colors duration-300 ${subtitleColor}`}
                style={{ fontSize: '9px', whiteSpace: 'nowrap' }}
              >
                {t.brandSubtitle}
              </span>
            </div>
          </NavLink>

          {/* Center Nav */}
          <nav
            className="flex items-center justify-center flex-1"
            aria-label="Main navigation"
            style={{ gap: 'clamp(10px, 1vw, 18px)', padding: '0 clamp(10px, 1.2vw, 20px)' }}
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={navItemClass}
                style={{ fontSize: '12.5px' }}
                onMouseEnter={() => prefetchRoute(link.path)}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center shrink-0" style={{ gap: '12px' }}>
            <LanguageSwitcher language={language} setLanguage={setLanguage} isHeroMode={isHeroMode} />
            <DarshanButton navigate={navigate} label={t.nav.darshanCTA} compact />
          </div>
        </div>

        {/* ════ HAMBURGER MODE — below 1200px (nav-compact) ════ */}
        <div className="flex nav-compact:hidden w-full items-center justify-between">
          {/* Brand */}
          <NavLink to="/" aria-label="Sheetla Mata Mandir — Home" style={{ textDecoration: 'none' }}
            className="flex items-center gap-2 group"
          >
            <img 
              src={brandLogo} 
              alt="Sheetla Mata Mandir Official Logo" 
              className="w-[38px] h-[38px] md:w-[44px] md:h-[44px] rounded-full object-contain shrink-0" 
            />
            <div className="flex flex-col justify-center">
              <span
                className={`font-display font-bold leading-tight transition-colors duration-300 group-hover:opacity-90 ${brandColor}`}
                style={{ fontSize: 'clamp(14px, 3.5vw, 18px)', whiteSpace: 'nowrap' }}
              >
                {t.brandName}
              </span>
              <span
                className={`font-body uppercase tracking-wider mt-0.5 transition-colors duration-300 ${subtitleColor}`}
                style={{ fontSize: '9px', whiteSpace: 'nowrap' }}
              >
                {t.brandSubtitle}
              </span>
            </div>
          </NavLink>

          {/* Right: Language (tablet+) + Hamburger */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <LanguageSwitcher language={language} setLanguage={setLanguage} isHeroMode={isHeroMode} />
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              className={`p-2 rounded-lg transition-colors ${
                isHeroMode
                  ? 'text-surface-container-lowest hover:bg-surface/20'
                  : 'text-primary hover:bg-surface-container-low'
              }`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

      </div>{/* /inner wrapper */}

      {/* ═══════════════════════════════════════════════════════════
          MOBILE / TABLET DRAWER  (below 1200px, nav-compact)
         ═══════════════════════════════════════════════════════════ */}
      {mobileMenuOpen && (
        <div
          className={`nav-compact:hidden border-t backdrop-blur-2xl shadow-2xl overflow-hidden rounded-b-[20px] ${
            isHeroMode
              ? 'bg-inverse-surface/92 border-surface/15'
              : 'bg-surface/97 border-outline-variant/30'
          }`}
        >
          <div
            style={{
              width: 'min(96%, 1680px)',
              margin: '0 auto',
              padding: 'clamp(16px, 4vw, 24px) clamp(20px, 2.5vw, 40px)',
            }}
          >
            {/* Header row: Jai Mata Di + Language toggle */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-outline-variant/20">
              <span
                className={`font-hindi font-semibold ${
                  isHeroMode ? 'text-tertiary-fixed' : 'text-secondary'
                }`}
                style={{ fontSize: '16px' }}
              >
                {t.jaiMataDi}
              </span>
              {/* Language shown inline in drawer header on phones */}
              <div className="flex items-center gap-2 text-xs">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1.5 rounded-lg font-body font-semibold transition-colors ${
                    language === 'en'
                      ? 'bg-primary text-on-primary'
                      : isHeroMode
                      ? 'text-surface-container-lowest opacity-80 hover:opacity-100'
                      : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setLanguage('hi')}
                  className={`px-3 py-1.5 rounded-lg font-hindi font-semibold transition-colors ${
                    language === 'hi'
                      ? 'bg-primary text-on-primary'
                      : isHeroMode
                      ? 'text-surface-container-lowest opacity-80 hover:opacity-100'
                      : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  हिंदी
                </button>
              </div>
            </div>

            {/* Navigation grid — 2 columns on wider phones/tablets, 1 on tiny phones */}
            <nav
              className="grid gap-1 mb-5"
              aria-label="Mobile navigation"
              style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))' }}
            >
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl font-body text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-primary text-on-primary shadow-sm'
                        : isHeroMode
                        ? 'text-surface-container-lowest hover:bg-surface/15'
                        : 'text-on-surface hover:bg-surface-container-high'
                    }`
                  }
                  onMouseEnter={() => prefetchRoute(link.path)}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Darshan CTA — full-width inside mobile menu */}
            <div className="pt-3 border-t border-outline-variant/20">
              <button
                onClick={() => navigate('/visit')}
                className="w-full flex items-center justify-center gap-2 bg-secondary hover:bg-secondary-container text-on-secondary font-body font-semibold text-sm tracking-wider uppercase rounded-xl py-3.5 transition-all shadow-md active:scale-[0.98]"
              >
                <HeartHandshake className="w-4 h-4 text-tertiary-fixed" />
                {t.nav.darshanCTA}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

// ─── Shared sub-components ────────────────────────────────────────────────────

interface LanguageSwitcherProps {
  language: string;
  setLanguage: (lang: 'en' | 'hi') => void;
  isHeroMode: boolean;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ language, setLanguage, isHeroMode }) => (
  <div
    className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full border text-xs font-semibold transition-all duration-300 whitespace-nowrap ${
      isHeroMode
        ? 'border-surface/30 bg-surface/15 text-surface-container-lowest backdrop-blur-sm'
        : 'border-outline-variant/50 bg-surface-container-lowest/90 text-on-surface shadow-sm'
    }`}
  >
    <Globe className="w-3.5 h-3.5 text-secondary shrink-0" />
    <button
      onClick={() => setLanguage('en')}
      className={`px-1.5 py-0.5 rounded font-body transition-colors ${
        language === 'en'
          ? 'text-primary font-bold bg-secondary-fixed/80'
          : isHeroMode
          ? 'text-surface-container-lowest opacity-80 hover:opacity-100'
          : 'text-on-surface-variant hover:text-primary'
      }`}
    >
      EN
    </button>
    <span className="opacity-30 select-none">|</span>
    <button
      onClick={() => setLanguage('hi')}
      className={`px-1.5 py-0.5 rounded font-hindi transition-colors ${
        language === 'hi'
          ? 'text-primary font-bold bg-secondary-fixed/80'
          : isHeroMode
          ? 'text-surface-container-lowest opacity-80 hover:opacity-100'
          : 'text-on-surface-variant hover:text-primary'
      }`}
    >
      हिंदी
    </button>
  </div>
);

interface DarshanButtonProps {
  navigate: (path: string) => void;
  label: string;
  compact?: boolean;
}

const DarshanButton: React.FC<DarshanButtonProps> = ({ navigate, label, compact = false }) => (
  <button
    onClick={() => navigate('/visit')}
    className={`bg-secondary hover:bg-secondary-container text-on-secondary font-body font-semibold tracking-wider uppercase flex items-center gap-2 transition-all shadow-md active:scale-95 hover:shadow-lg rounded-full whitespace-nowrap ${
      compact ? 'px-4 py-2 text-[11px]' : 'px-5 py-2.5 text-xs'
    }`}
  >
    <HeartHandshake
      className={`text-tertiary-fixed shrink-0 ${compact ? 'w-3.5 h-3.5' : 'w-4 h-4'}`}
    />
    <span>{label}</span>
  </button>
);
