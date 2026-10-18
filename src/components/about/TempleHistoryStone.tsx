import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { templeHistoryData } from '../../data/templeHistory';
import { templeData } from '../../data/temple';
import { MapPin, Clock, ShieldCheck, ChevronUp } from 'lucide-react';

export const TempleHistoryStone: React.FC = () => {
  const { isHindi } = useLanguage();
  const viewportRef = useRef<HTMLDivElement>(null);

  // Auto-scroll state (autonomous, NO resume/pause button)
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isTabHidden, setIsTabHidden] = useState(false);
  const [isBottomResting, setIsBottomResting] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const animationFrameId = useRef<number | null>(null);
  const lastTimestamp = useRef<number>(0);
  const exactScrollTop = useRef<number>(0);

  // Smooth autonomous scroll configuration
  const SCROLL_SPEED_PX_PER_SEC = 15; // ~15px/sec
  const BOTTOM_PAUSE_DURATION_MS = 2500; // 2.5s pause at end before smooth reset

  // The authentic temple history text
  const paragraphs = isHindi ? templeHistoryData.hi : templeHistoryData.en;

  // OS prefers-reduced-motion listener
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Document tab visibility listener
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabHidden(document.hidden);
      if (!document.hidden) {
        lastTimestamp.current = performance.now();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Can scroll condition
  const canScroll = useCallback(() => {
    if (prefersReducedMotion) return false;
    if (isHovered) return false;
    if (isFocused) return false;
    if (isTabHidden) return false;
    if (isBottomResting) return false;
    if (!viewportRef.current) return false;

    const scrollableDistance = viewportRef.current.scrollHeight - viewportRef.current.clientHeight;
    return scrollableDistance > 10;
  }, [prefersReducedMotion, isHovered, isFocused, isTabHidden, isBottomResting]);

  // Autonomous animation loop
  useEffect(() => {
    const step = (timestamp: number) => {
      if (!lastTimestamp.current) lastTimestamp.current = timestamp;
      const deltaSec = (timestamp - lastTimestamp.current) / 1000;
      lastTimestamp.current = timestamp;

      if (canScroll() && viewportRef.current) {
        const viewport = viewportRef.current;
        const maxScroll = viewport.scrollHeight - viewport.clientHeight;

        if (viewport.scrollTop >= maxScroll - 1.5) {
          setIsBottomResting(true);

          setTimeout(() => {
            if (viewportRef.current) {
              viewportRef.current.scrollTo({
                top: 0,
                behavior: 'smooth',
              });
              exactScrollTop.current = 0;

              setTimeout(() => {
                setIsBottomResting(false);
              }, 800);
            }
          }, BOTTOM_PAUSE_DURATION_MS);
        } else {
          exactScrollTop.current += SCROLL_SPEED_PX_PER_SEC * deltaSec;
          viewport.scrollTop = exactScrollTop.current;
        }
      }

      animationFrameId.current = requestAnimationFrame(step);
    };

    animationFrameId.current = requestAnimationFrame(step);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [canScroll]);

  // Sync scroll on manual wheel/touch
  const handleManualScroll = () => {
    if (viewportRef.current) {
      exactScrollTop.current = viewportRef.current.scrollTop;
    }
  };

  // Reset scroll on language switch
  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTop = 0;
      exactScrollTop.current = 0;
    }
  }, [isHindi]);

  return (
    <div className="w-full max-w-4xl mx-auto my-12 relative z-10 font-devanagari">
      
      {/* ── SECTION INTRO HEADER (MATCHING EXACT SCREENSHOT) ── */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center space-x-2 text-[#c5a059] text-xs tracking-widest uppercase mb-2">
          <span className="w-8 h-px bg-gradient-to-r from-transparent to-[#8a6f3b]" />
          <span>{isHindi ? 'प्राचीन पाषाण अभिलेख' : 'ANCIENT STONE EPIGRAPH'}</span>
          <span className="w-8 h-px bg-gradient-to-l from-transparent to-[#8a6f3b]" />
        </div>
        <h2 className="text-lg xs:text-xl sm:text-3xl md:text-4xl font-rozha text-[#f1ece1] tracking-wide font-normal mb-2.5">
          {isHindi ? 'देवभूमि का ऐतिहासिक पाषाण स्मृति-फलक' : 'Historical Stone Epigraph of Devbhoomi'}
        </h2>
        <p className="text-xs sm:text-sm text-[#a8a090] max-w-xl mx-auto leading-relaxed">
          {isHindi
            ? 'लगदेवी (हिमाचल प्रदेश) स्थित माँ शीतला के इस पावन धाम का प्रामाणिक इतिहास सदियों पुराने प्रस्तर अभिलेखों के आधार पर संजोया गया है।'
            : 'Authentic chronicle of Maa Sheetla Holy Shrine, Village Lagdevi (Himachal Pradesh), preserved from ancient stone inscriptions.'}
        </p>
      </div>

      {/* ── THE ANCIENT TEMPLE STONE INSCRIPTION PLAQUE (SHILALEKH) ── */}
      <div
        id="temple-stone-plaque"
        className="stone-basalt-bg plaque-outer-bevel rounded-2xl p-4 sm:p-7 md:p-8 w-full max-w-[760px] mx-auto relative border border-[#343834] transition-all duration-300 select-none shadow-2xl"
      >
        {/* Antiqued Brass Corner Hardware / Carved Corner Brackets */}
        <div className="absolute top-2.5 left-2.5 w-6 h-6 border-t-2 border-l-2 border-[#c5a059]/70 rounded-tl pointer-events-none" />
        <div className="absolute top-2.5 right-2.5 w-6 h-6 border-t-2 border-r-2 border-[#c5a059]/70 rounded-tr pointer-events-none" />
        <div className="absolute bottom-2.5 left-2.5 w-6 h-6 border-b-2 border-l-2 border-[#c5a059]/70 rounded-bl pointer-events-none" />
        <div className="absolute bottom-2.5 right-2.5 w-6 h-6 border-b-2 border-r-2 border-[#c5a059]/70 rounded-br pointer-events-none" />

        {/* Subtle Corner Brass Studs / Rivets */}
        <div className="absolute top-4 left-4 w-1.5 h-1.5 rounded-full bg-[#8a6f3b] shadow-sm" />
        <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-[#8a6f3b] shadow-sm" />
        <div className="absolute bottom-4 left-4 w-1.5 h-1.5 rounded-full bg-[#8a6f3b] shadow-sm" />
        <div className="absolute bottom-4 right-4 w-1.5 h-1.5 rounded-full bg-[#8a6f3b] shadow-sm" />

        {/* Inset Stele Internal Frame */}
        <div className="stele-inset-frame rounded-xl p-4 sm:p-6 bg-[#141514]/95 border border-[#282b28] relative">
          
          {/* Weathered Basalt Grain Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_0.5px,transparent_0.5px)] opacity-[0.03] pointer-events-none rounded-xl" />

          {/* Plaque Top Ornament: Sacred Himalayan Motifs (Trishul & Kalash Relief Glyph) */}
          <div className="flex flex-col items-center justify-center mb-3 text-center">
            <div className="inline-flex items-center justify-center text-[#dfbe7d] opacity-95">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#dfbe7d] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                <path d="M50 8 C48 16, 44 22, 38 28 C34 32, 28 35, 25 36 C32 38, 42 40, 48 44 L48 68 C44 70, 36 74, 34 82 L66 82 C64 74, 56 70, 52 68 L52 44 C58 40, 68 38, 75 36 C72 35, 66 32, 62 28 C56 22, 52 16, 50 8 Z" fill="rgba(197, 160, 89, 0.25)" stroke="#dfbe7d" strokeWidth="1.8" strokeLinejoin="round"/>
                <circle cx="50" cy="18" r="3" fill="#dfbe7d"/>
                <line x1="50" y1="8" x2="50" y2="86" stroke="#c5a059" strokeWidth="1.5"/>
                <circle cx="34" cy="82" r="2.5" fill="#c5a059"/>
                <circle cx="66" cy="82" r="2.5" fill="#c5a059"/>
              </svg>
            </div>

            {/* Auspicious Shloka Header */}
            <span className="text-[11px] sm:text-xs text-[#c5a059] tracking-widest mt-1 font-semibold uppercase font-mono">
              ॥ ॐ श्री शीतलायै नमः ॥
            </span>
          </div>

          {/* Temple Name & Subtitle Hierarchy */}
          <div className="text-center mb-3">
            <h3 className="carved-heading text-xl sm:text-2xl md:text-3xl font-rozha tracking-wide font-normal leading-tight">
              {isHindi ? 'श्री शीतला माता मंदिर' : 'Shree Sheetla Mata Mandir'}
            </h3>
            <div className="carved-subtitle text-[11px] sm:text-sm font-medium mt-1 tracking-wider text-[#c5a059] flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 text-center">
              <span>{isHindi ? 'लगदेवी (हिमाचल प्रदेश)' : 'Village Lagdevi, Himachal Pradesh'}</span>
              <span className="text-[#5a4622] hidden xs:inline">•</span>
              <span>{isHindi ? 'ऐतिहासिक परिचय' : 'Historical Chronicle'}</span>
            </div>
          </div>

          {/* Engraved Ornamental Divider */}
          <div className="relative flex items-center justify-center my-3 w-full max-w-md mx-auto">
            <div className="flex-grow h-px bg-gradient-to-r from-transparent via-[#8a6f3b]/70 to-[#dfbe7d]" />
            <div className="px-3 flex items-center space-x-1.5 text-[#dfbe7d]">
              <span className="w-1.5 h-1.5 rotate-45 border border-[#c5a059] bg-[#1c1e1c]" />
              <span className="w-2.5 h-2.5 rotate-45 bg-[#c5a059] shadow-sm" />
              <span className="w-1.5 h-1.5 rotate-45 border border-[#c5a059] bg-[#1c1e1c]" />
            </div>
            <div className="flex-grow h-px bg-gradient-to-l from-transparent via-[#8a6f3b]/70 to-[#dfbe7d]" />
          </div>

          {/* ── AUTONOMOUS AUTO-SCROLLING VIEWPORT (NO RESUME/PAUSE BUTTON) ── */}
          <div className="relative pt-1">
            <div
              ref={viewportRef}
              tabIndex={0}
              role="region"
              aria-label="Temple Stone Inscription Viewport"
              onScroll={handleManualScroll}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => {
                setIsHovered(false);
                lastTimestamp.current = performance.now();
              }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                setIsFocused(false);
                lastTimestamp.current = performance.now();
              }}
              onTouchStart={() => setIsHovered(true)}
              onTouchEnd={() => {
                setIsHovered(false);
                lastTimestamp.current = performance.now();
              }}
              className="stone-scroll viewport-fade-mask overflow-y-auto overflow-x-hidden h-[360px] sm:h-[400px] md:h-[420px] px-2.5 sm:px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#c5a059]/40 rounded-lg transition-colors"
            >
              <div className="space-y-4 text-xs sm:text-sm md:text-[14px] leading-relaxed text-[#ede6d8] font-devanagari">
                {/* ── AUTHENTIC ORIGINAL TEMPLE HISTORY PARAGRAPHS ── */}
                {paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className={`carved-text text-justify ${
                      index === 0
                        ? 'first-letter:text-2xl first-letter:font-rozha first-letter:text-[#dfbe7d] first-letter:mr-1'
                        : ''
                    }`}
                  >
                    {paragraph}
                  </p>
                ))}

                {/* Concluding Sacred Shloka */}
                <div className="pt-5 pb-2 text-center border-t border-[#282b28]">
                  <p className="font-rozha text-sm sm:text-base text-[#dfbe7d] leading-relaxed">
                    वन्देऽहं शीतलां देवीं रासभस्थां दिगम्बराम्।<br />
                    मार्जनीकलशोपेतं शूर्पालंकृतमस्तकाम्॥
                  </p>
                  <span className="text-[11px] text-[#a8a090] block mt-1.5 tracking-widest font-mono">
                    — {isHindi ? 'परम् पावन शक्ति पीठ लगदेवी, हिमाचल प्रदेश' : 'Sacred Shrine of Lagdevi, Himachal Pradesh'}
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* ── CONTEXTUAL INFORMATIONAL CARDS (ACCURATE TEMPLE DATA) ── */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-[#ede6d8]">
        
        {/* Card 1: Geographic Sanctuary */}
        <div className="bg-[#141514] p-5 rounded-xl border border-[#2a2d2a] hover:border-[#dfbe7d]/40 transition-colors shadow-sm flex flex-col justify-between h-full">
          <div>
            <div className="text-[#dfbe7d] font-semibold text-xs mb-3 flex items-center gap-2 font-mono tracking-wider">
              <MapPin className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
              <span>{isHindi ? 'भौगोलिक स्थिति' : 'GEOGRAPHIC LOCATION'}</span>
            </div>
            <div className="space-y-1.5 text-xs text-[#cfc7b8] leading-relaxed">
              <p className="font-medium text-[#ede6d8]">
                {isHindi
                  ? 'गांव लगदेवी, तहसील बम्हसन (टौणी देवी)'
                  : 'Village Lagdevi, Tehsil Bamson (Tauni Devi)'}
              </p>
              <p className="text-[#9e9688]">
                {isHindi
                  ? 'जिला हमीरपुर, हिमाचल प्रदेश — 177022'
                  : 'Dist. Hamirpur, Himachal Pradesh — 177022'}
              </p>
            </div>
          </div>
        </div>

        {/* Card 2: Darshan Timings */}
        <div className="bg-[#141514] p-5 rounded-xl border border-[#2a2d2a] hover:border-[#dfbe7d]/40 transition-colors shadow-sm flex flex-col justify-between h-full">
          <div>
            <div className="text-[#dfbe7d] font-semibold text-xs mb-3 flex items-center gap-2 font-mono tracking-wider">
              <Clock className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
              <span>{isHindi ? 'दर्शन एवं आरती समय' : 'DARSHAN & AARTI TIMINGS'}</span>
            </div>
            <div className="space-y-1.5 text-xs text-[#cfc7b8] leading-relaxed">
              <p className="font-medium text-[#ede6d8]">
                {isHindi
                  ? `दर्शन: ${templeData.openingTime} से ${templeData.closingTime}`
                  : `Darshan: ${templeData.openingTime} to ${templeData.closingTime}`}
              </p>
              <p className="text-[#9e9688]">
                {isHindi
                  ? `प्रातः आरती: ${templeData.morningAarti} • संध्या आरती: ${templeData.eveningAarti}`
                  : `Morning Aarti: ${templeData.morningAarti} • Evening Aarti: ${templeData.eveningAarti}`}
              </p>
            </div>
          </div>
        </div>

        {/* Card 3: Tradition & Kuldevi */}
        <div className="bg-[#141514] p-5 rounded-xl border border-[#2a2d2a] hover:border-[#dfbe7d]/40 transition-colors shadow-sm flex flex-col justify-between h-full">
          <div>
            <div className="text-[#dfbe7d] font-semibold text-xs mb-3 flex items-center gap-2 font-mono tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
              <span>{isHindi ? 'कुलदेवी एवं पावन परंपरा' : 'PATRON KULDEVI & TRADITION'}</span>
            </div>
            <div className="space-y-1.5 text-xs text-[#cfc7b8] leading-relaxed">
              <p className="font-medium text-[#ede6d8]">
                {isHindi
                  ? 'लगवाल वंशज एवं 15-20 गांवों की कुलदेवी'
                  : 'Patron Kuldevi of Lagwal descendants & 15-20 villages'}
              </p>
              <p className="text-[#9e9688]">
                {isHindi
                  ? 'चैत्र व शारदीय नवरात्रि उत्सव एवं विशाल भंडारा'
                  : 'Annual Navratri celebrations & community bhandara'}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* ── EMBEDDED SCOPED STYLES (MATCHING USER HTML MOCKUP EXACTLY) ── */}
      <style dangerouslySetInnerHTML={{__html: `
        .stone-basalt-bg {
          background-color: #171817;
          background-image: 
            radial-gradient(ellipse at 50% 0%, rgba(223, 190, 125, 0.05) 0%, transparent 60%),
            radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.02) 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(0, 0, 0, 0.4) 0%, transparent 50%),
            repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.006) 0px, rgba(255, 255, 255, 0.006) 1px, transparent 1px, transparent 4px),
            radial-gradient(rgba(255,255,255,0.03) 1px, transparent 0);
          background-size: 100% 100%, 100% 100%, 100% 100%, 8px 8px, 14px 14px;
        }

        .plaque-outer-bevel {
          box-shadow: 
            0 30px 60px -15px rgba(0, 0, 0, 0.95),
            0 10px 25px -5px rgba(0, 0, 0, 0.8),
            inset 1px 1px 2px rgba(255, 255, 255, 0.12),
            inset -1px -1px 3px rgba(0, 0, 0, 0.9),
            inset 0 0 40px rgba(0, 0, 0, 0.8);
        }

        .stele-inset-frame {
          box-shadow:
            inset 2px 2px 5px rgba(0, 0, 0, 0.9),
            inset -1px -1px 3px rgba(223, 190, 125, 0.15),
            0 0 0 1px rgba(90, 70, 34, 0.5),
            0 0 0 3px rgba(19, 20, 19, 0.9);
        }

        .carved-text {
          color: #ede6d8;
          text-shadow: 
            0px -1px 1px rgba(0, 0, 0, 0.95),
            0px 1px 1px rgba(255, 255, 255, 0.12);
        }

        .carved-heading {
          color: #dfbe7d;
          text-shadow: 
            0px -1px 2px rgba(0, 0, 0, 0.9),
            0px 1px 1px rgba(255, 240, 200, 0.25),
            0 0 15px rgba(197, 160, 89, 0.15);
        }

        .carved-subtitle {
          color: #c5a059;
          text-shadow: 
            0px -1px 1px rgba(0, 0, 0, 0.9),
            0px 1px 1px rgba(255, 255, 255, 0.08);
        }

        .stone-scroll::-webkit-scrollbar {
          width: 5px;
        }
        .stone-scroll::-webkit-scrollbar-track {
          background: rgba(13, 14, 13, 0.6);
          border-radius: 4px;
          border: 1px solid rgba(138, 111, 59, 0.15);
        }
        .stone-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #5a4622 0%, #3a3e39 100%);
          border-radius: 4px;
          border: 1px solid rgba(223, 190, 125, 0.25);
        }
        .stone-scroll::-webkit-scrollbar-thumb:hover {
          background: #8a6f3b;
        }

        .viewport-fade-mask {
          mask-image: linear-gradient(to bottom, transparent 0%, black 6%, black 94%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 6%, black 94%, transparent 100%);
        }
      `}} />
    </div>
  );
};
