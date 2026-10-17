import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Phone,
  MapPin,
  Clock,
  Instagram,
  MessageCircle,
  Share2,
  Mail,
  ArrowUp
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { templeData } from '../../data/temple';
import brandLogo from '../../assets/sheetla mata logo.webp';

export const Footer: React.FC = () => {
  const { t, isHindi } = useLanguage();

  return (
    <footer className="relative bg-[#86272c] text-white pt-10 pb-28 sm:pb-32 xl:pb-8 overflow-hidden select-none selection:bg-amber-400/30 selection:text-white border-t border-[#6d1d21]">
      
      {/* ── DESKTOP: SACRED LOTUS WATERMARKS (LEFT & RIGHT) ── */}
      {/* Desktop Left Lotus (Symmetrically mirrored) */}
      <div className="hidden md:block absolute -bottom-10 -left-10 lg:-left-6 w-[280px] sm:w-[360px] md:w-[420px] lg:w-[480px] aspect-square pointer-events-none select-none z-0 opacity-[0.20] filter drop-shadow-[0_0_35px_rgba(251,191,36,0.22)] transform -scale-x-100">
        <img
          src="/sacred-lotus.png"
          alt="Sacred Blooming Lotus Flower - Left"
          className="w-full h-full object-contain pointer-events-none"
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Desktop Right Lotus */}
      <div className="hidden md:block absolute -bottom-10 -right-10 lg:-right-6 w-[280px] sm:w-[360px] md:w-[420px] lg:w-[480px] aspect-square pointer-events-none select-none z-0 opacity-[0.20] filter drop-shadow-[0_0_35px_rgba(251,191,36,0.22)]">
        <img
          src="/sacred-lotus.png"
          alt="Sacred Blooming Lotus Flower - Right"
          className="w-full h-full object-contain pointer-events-none"
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* ── MOBILE UI: SINGLE SACRED LOTUS WATERMARK (CENTER ONLY) ── */}
      <div className="block md:hidden absolute -bottom-6 left-1/2 -translate-x-1/2 w-[240px] aspect-square pointer-events-none select-none z-0 opacity-[0.16] filter drop-shadow-[0_0_25px_rgba(251,191,36,0.20)]">
        <img
          src="/sacred-lotus.png"
          alt="Sacred Blooming Lotus Flower - Center"
          className="w-full h-full object-contain pointer-events-none"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* ── MAIN COMPACT GRID: 3 BALANCED COLUMNS (PRO FOOTER SIZE) ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 pb-8">
          
          {/* Column 1 (5 Cols): Official Logo + Lotus + Tagline + Social Icons */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              {/* Official Temple Logo + Lotus Emblem Header */}
              <div className="flex items-center gap-3.5 mb-3">
                <img
                  src={brandLogo}
                  alt="Sheetla Mata Mandir Official Logo"
                  className="w-11 h-11 rounded-full object-contain ring-2 ring-amber-300/50 shrink-0 bg-white/10"
                />
                <div className="flex flex-col">
                  <span className="font-display font-bold text-lg md:text-xl text-white tracking-wide leading-tight">
                    {templeData.hindiName}
                  </span>
                  <span className="text-[10.5px] font-mono tracking-widest text-amber-200/80 uppercase">
                    {templeData.name} • {templeData.location}
                  </span>
                </div>
              </div>

              {/* Devotional Tagline (Exact matching reference style) */}
              <p className="text-white/90 text-xs md:text-[13px] font-display font-medium leading-relaxed max-w-sm mt-1">
                {isHindi
                  ? 'आपकी श्रद्धा, हमारी सेवा एवं अखंड परंपरा।'
                  : 'Aapki shraddha, Hamari Jimmedari.'}
              </p>
              <p className="text-white/60 text-[11px] leading-relaxed max-w-xs mt-0.5 font-normal">
                {isHindi
                  ? 'देवभूमि हिमाचल प्रदेश की पावन कुलदेवी शक्तिपीठ।'
                  : 'Sacred Kuldevi Shaktipeeth in Devbhoomi Himachal.'}
              </p>

              {/* Clean White Outline Social / Helpline Icons */}
              <div className="flex items-center gap-3 mt-4">
                {/* Email Feedback */}
                <a
                  href="mailto:lagwalharsh1@gmail.com"
                  aria-label="Email Feedback"
                  className="w-8 h-8 rounded-full border border-white/30 hover:border-white hover:bg-white/15 flex items-center justify-center text-white transition-all active:scale-95"
                >
                  <Mail className="w-4 h-4" />
                </a>

                {/* Google Maps Pin */}
                <a
                  href={templeData.mapDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Temple Location on Maps"
                  className="w-8 h-8 rounded-full border border-white/30 hover:border-white hover:bg-white/15 flex items-center justify-center text-white transition-all active:scale-95"
                >
                  <MapPin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2 (3 Cols): QUICK LINKS */}
          <div className="md:col-span-3">
            <h4 className="text-[11px] font-mono tracking-widest text-white/75 uppercase font-bold mb-3">
              QUICK LINKS
            </h4>
            <nav className="flex flex-col space-y-1.5 text-xs text-white/85">
              <NavLink
                to="/visit"
                className="hover:text-amber-200 transition-colors w-fit"
              >
                {isHindi ? 'दैनिक दर्शन व आरती समय' : 'Daily Darshan & Aarti'}
              </NavLink>
              <NavLink
                to="/about"
                className="hover:text-amber-200 transition-colors w-fit"
              >
                {isHindi ? 'मंदिर का पावन इतिहास' : 'Temple Lore & History'}
              </NavLink>
              <NavLink
                to="/festivals"
                className="hover:text-amber-200 transition-colors w-fit"
              >
                {isHindi ? 'वार्षिक उत्सव व मेले' : 'Festivals & Navratri'}
              </NavLink>
              <NavLink
                to="/donate"
                className="hover:text-amber-200 transition-colors w-fit font-semibold text-amber-200"
              >
                {isHindi ? 'ऑनलाइन सेवा व दान' : 'Online Seva & Daan'}
              </NavLink>
            </nav>
          </div>

          {/* Column 3 (4 Cols): CONTACT US */}
          <div className="md:col-span-4">
            <h4 className="text-[11px] font-mono tracking-widest text-white/75 uppercase font-bold mb-3">
              CONTACT US
            </h4>
            <div className="space-y-2.5 text-xs text-white/85">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                <a
                  href="mailto:lagwalharsh1@gmail.com"
                  className="font-mono text-xs font-bold text-white hover:text-amber-200 transition-colors tracking-wide break-all"
                >
                  lagwalharsh1@gmail.com
                </a>
              </div>

              <div className="flex items-start gap-1.5 text-[11.5px] text-white/80 leading-snug">
                <MapPin className="w-3.5 h-3.5 text-amber-300 shrink-0 mt-0.5" />
                <span>
                  {templeData.address}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-white/70 pt-0.5">
                <Clock className="w-3 h-3 text-amber-300 shrink-0" />
                <span>
                  {isHindi ? 'प्रातः आरती 6:00 AM • संध्या आरती 7:00 PM' : 'Aarti: 6:00 AM • 7:00 PM'}
                </span>
              </div>

              <p className="text-[10.5px] text-white/60 pt-1 leading-relaxed">
                {isHindi ? 'वेबसाइट सुधार / त्रुटि सुझाव: lagwalharsh1@gmail.com' : 'Website corrections / feedback: lagwalharsh1@gmail.com'}
              </p>
            </div>
          </div>

        </div>

        {/* ── THIN DIVIDER & COPYRIGHT BOTTOM ROW ── */}
        <div className="pt-5 border-t border-white/15 flex flex-col md:flex-row items-center justify-between gap-3 text-[11.5px] text-white/70 text-center md:text-left">
          <p className="order-2 md:order-1 leading-relaxed">
            © {new Date().getFullYear()} {isHindi ? 'श्री शीतला माता मंदिर ट्रस्ट, लगदेवी। सर्वाधिकार सुरक्षित।' : 'All Rights Reserved by Shri Sheetla Mata Mandir, Lagdevi.'}
          </p>

          <div className="order-1 md:order-2 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-white/85 font-medium">
            <NavLink to="/privacy-policy" className="hover:text-amber-200 transition-colors py-1 px-1.5 underline-offset-4 hover:underline">
              {isHindi ? 'गोपनीयता नीति' : 'Privacy Policy'}
            </NavLink>
            <span className="text-white/40">•</span>
            <NavLink to="/terms-of-service" className="hover:text-amber-200 transition-colors py-1 px-1.5 underline-offset-4 hover:underline">
              {isHindi ? 'सेवा की शर्तें' : 'Terms of Service'}
            </NavLink>
            <span className="text-white/40">•</span>
            <span className="font-hindi text-amber-200 font-semibold tracking-wide">
              ॥ ॐ श्री शीतलायै नमः ॥
            </span>
            <span className="text-white/40">•</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-1 text-amber-300 hover:text-amber-100 transition-colors py-1 px-2 rounded-md hover:bg-white/10 font-medium cursor-pointer"
              aria-label={isHindi ? 'वापस ऊपर जाएं' : 'Back to top'}
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>{isHindi ? 'वापस ऊपर जाएं' : 'Back to Top'}</span>
            </button>
          </div>
        </div>

        {/* Dedicated Devotional Credit Line */}
        <div className="pt-3 text-center text-[10.5px] text-white/50 font-google leading-relaxed max-w-xl mx-auto">
          {isHindi
            ? 'पावन ग्राम लगदेवी एवं कुलदेवी श्री शीतला माता मंदिर को सप्रेम समर्पित • डिजिटल निर्माण: हर्ष लगवाल'
            : 'Dedicated to Village Lagdevi & Shri Sheetla Mata Mandir • Conceived & Built by Harsh Lagwal'}
        </div>

      </div>
    </footer>
  );
};
