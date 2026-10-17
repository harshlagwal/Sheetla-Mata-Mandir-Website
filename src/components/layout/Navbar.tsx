import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  Globe,
  HeartHandshake,
  Home,
  Landmark,
  Sparkles,
  Calendar,
  Mountain,
  Clock,
  Phone,
  LucideIcon,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import brandLogo from '../../assets/sheetla mata logo.webp';

export const NAVBAR_HEIGHT = 62;

export const Navbar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [navbarMode, setNavbarMode] = useState<'hero' | 'scrolled'>('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Use the website's signature light glassmorphic UI across all pages
  const isHeroMode = false;

  const navLinks: { path: string; label: string; icon: LucideIcon }[] = [
    { path: '/',          label: t.nav.home,      icon: Home },
    { path: '/about',     label: t.nav.about,     icon: Landmark },
    { path: '/gallery',   label: t.nav.gallery,   icon: Sparkles },
    { path: '/festivals', label: t.nav.festivals, icon: Calendar },
    { path: '/village',   label: t.nav.village,   icon: Mountain },
    { path: '/visit',     label: t.nav.visit,     icon: Clock },
    { path: '/contact',   label: t.nav.contact,   icon: Phone },
    { path: '/donate',    label: t.nav.daan,      icon: HeartHandshake },
  ];

  const brandColor = isHeroMode
    ? 'text-white'
    : 'text-slate-900';

  const subtitleColor = isHeroMode
    ? 'text-amber-200/90'
    : 'text-amber-700/90';

  return (
    <header
      id="main-header"
      className="fixed top-3 left-0 right-0 z-50 flex justify-center px-3 sm:px-4 pointer-events-none transition-all duration-300"
    >
      <div
        className={`pointer-events-auto transition-all duration-300 ${
          mobileMenuOpen
            ? 'w-[95%] max-w-md rounded-2xl p-3.5'
            : 'w-fit max-w-[96vw] rounded-full px-2.5 py-1.5'
        } ${
          isHeroMode
            ? 'bg-slate-950/70 border border-white/20 shadow-[0_12px_40px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] text-white'
            : 'bg-white/80 border border-slate-200/90 shadow-[0_12px_36px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.9)] text-slate-900'
        }`}
        style={{
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        }}
      >
        {/* Main Dock Row */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 h-9 sm:h-10">
          {/* Brand */}
          <NavLink
            to="/"
            aria-label="Sheetla Mata Mandir — Home"
            className="flex items-center gap-2 pl-1 pr-2 py-0.5 group shrink-0"
            onClick={() => setMobileMenuOpen(false)}
          >
            <img
              src={brandLogo}
              alt="Sheetla Mata Mandir Official Logo"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-contain shrink-0 ring-1 ring-amber-400/40 shadow-xs group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col text-left">
              <span
                className={`font-display font-bold leading-none tracking-tight text-[13px] sm:text-[14px] ${brandColor}`}
              >
                {t.brandName}
              </span>
              <span
                className={`font-body uppercase tracking-wider mt-0.5 text-[7.5px] sm:text-[8px] font-semibold ${subtitleColor}`}
              >
                {t.brandSubtitle}
              </span>
            </div>
          </NavLink>

          {/* Slim Divider Before Nav */}
          <div
            className={`hidden lg:block h-4.5 w-[1px] ${
              isHeroMode ? 'bg-white/15' : 'bg-slate-300/70'
            }`}
          />

          {/* Center Navlinks: Sleek Icon Dock with Spring Reveal on Hover/Active */}
          <nav
            className="hidden lg:flex items-center gap-0.5"
            aria-label="Main navigation"
            onMouseLeave={() => setHoveredPath(null)}
          >
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              const isExpanded =
                hoveredPath === link.path || (hoveredPath === null && isActive);

              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onMouseEnter={() => setHoveredPath(link.path)}
                  className={`relative flex items-center h-8 px-2.5 rounded-full text-[12px] font-medium transition-all duration-200 select-none ${
                    isActive
                      ? isHeroMode
                        ? 'bg-white/20 text-white font-semibold border border-white/25 shadow-xs'
                        : 'bg-amber-500/15 text-amber-950 font-semibold border border-amber-500/30 shadow-xs'
                      : isExpanded
                      ? isHeroMode
                        ? 'bg-white/10 text-white'
                        : 'bg-amber-500/10 text-amber-900'
                      : isHeroMode
                      ? 'text-white/80 hover:text-white hover:bg-white/10'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                  title={link.label}
                >
                  <Icon
                    className={`w-3.5 h-3.5 shrink-0 transition-all duration-200 ${
                      isActive
                        ? 'scale-110 text-amber-300'
                        : isExpanded
                        ? 'text-amber-500 scale-105'
                        : 'opacity-85'
                    }`}
                  />

                  <motion.div
                    initial={false}
                    animate={{
                      width: isExpanded ? 'auto' : 0,
                      opacity: isExpanded ? 1 : 0,
                      marginLeft: isExpanded ? 6 : 0,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 30,
                      mass: 0.8,
                    }}
                    className="overflow-hidden flex items-center whitespace-nowrap"
                  >
                    <span className="leading-none text-[12px] font-medium">
                      {link.label}
                    </span>
                  </motion.div>
                </NavLink>
              );
            })}
          </nav>

          {/* Slim Divider Before Right Actions */}
          <div
            className={`hidden lg:block h-4.5 w-[1px] ${
              isHeroMode ? 'bg-white/15' : 'bg-slate-300/70'
            }`}
          />

          {/* Right Actions: Language Switcher & Darshan CTA */}
          <div className="hidden lg:flex items-center gap-2 shrink-0 pl-0.5 pr-1">
            <LanguageSwitcher
              language={language}
              setLanguage={setLanguage}
              isHeroMode={isHeroMode}
            />

            <button
              onClick={() => navigate('/visit')}
              className="btn-liquid-black !py-1.5 !px-3.5 text-[11px] tracking-wide uppercase shrink-0"
            >
              <HeartHandshake className="w-3 h-3 text-amber-400" />
              <span>{t.nav.darshanCTA}</span>
            </button>
          </div>

          {/* Mobile Right Controls: Language & Hamburger */}
          <div className="flex lg:hidden items-center gap-1.5 pl-1">
            <div className="hidden sm:block">
              <LanguageSwitcher
                language={language}
                setLanguage={setLanguage}
                isHeroMode={isHeroMode}
              />
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              className={`p-1.5 rounded-full transition-all active:scale-90 ${
                isHeroMode
                  ? 'bg-white/10 text-white border border-white/20'
                  : 'bg-slate-100 text-slate-800 border border-slate-200'
              }`}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="mt-3 pt-3 border-t border-white/15 flex flex-col gap-3">
            <div className="flex items-center justify-between pb-1">
              <span className="font-hindi text-xs font-semibold text-amber-400">
                {t.jaiMataDi}
              </span>
              <div className="flex sm:hidden">
                <LanguageSwitcher
                  language={language}
                  setLanguage={setLanguage}
                  isHeroMode={isHeroMode}
                />
              </div>
            </div>

            <nav className="grid grid-cols-2 gap-1.5" aria-label="Mobile navigation links">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-center gap-2 transition-colors ${
                        isActive
                          ? 'bg-amber-500 text-white font-semibold shadow-xs'
                          : isHeroMode
                          ? 'bg-white/5 hover:bg-white/10 text-white/90'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`
                    }
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0 opacity-90" />
                    <span>{link.label}</span>
                  </NavLink>
                );
              })}
            </nav>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/visit');
              }}
              className="btn-liquid-black w-full !py-2.5 text-xs tracking-wider uppercase flex items-center justify-center gap-2"
            >
              <HeartHandshake className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.nav.darshanCTA}</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

const LanguageSwitcher: React.FC<{
  language: string;
  setLanguage: (lang: 'en' | 'hi') => void;
  isHeroMode: boolean;
}> = ({ language, setLanguage, isHeroMode }) => (
  <div
    className={`inline-flex items-center gap-0.5 p-0.5 rounded-full border text-[11px] font-medium transition-all ${
      isHeroMode
        ? 'border-white/20 bg-black/40 text-white'
        : 'border-slate-200 bg-slate-50 text-slate-800'
    }`}
  >
    <div className="pl-1.5 pr-0.5 opacity-50">
      <Globe className="w-3 h-3" />
    </div>
    <button
      onClick={() => setLanguage('en')}
      className={`px-2 py-0.5 rounded-full transition-all ${
        language === 'en'
          ? 'bg-amber-500 text-white font-semibold shadow-xs'
          : 'hover:text-amber-500'
      }`}
    >
      EN
    </button>
    <button
      onClick={() => setLanguage('hi')}
      className={`px-2 py-0.5 rounded-full font-hindi transition-all ${
        language === 'hi'
          ? 'bg-amber-500 text-white font-semibold shadow-xs'
          : 'hover:text-amber-500'
      }`}
    >
      हिंदी
    </button>
  </div>
);
