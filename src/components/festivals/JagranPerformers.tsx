import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Music, Star, ChevronRight } from 'lucide-react';

const C = {
  maroon: '#5c1616',
  maroonMid: '#7a1d1d',
  maroonLight: '#992424',
  saffron: '#d4af37',
  goldBorder: 'rgba(212, 175, 55, 0.4)',
  ivoryDeep: '#fdfbf7',
  mutedBorder: 'rgba(92, 22, 22, 0.15)',
  mutedBorder2: 'rgba(92, 22, 22, 0.08)',
  textBody: '#422a26',
  earthBrown: '#594a42',
};

export const JagranPerformers: React.FC = () => {
  const { isHindi } = useLanguage();

  return (
    <div className="mt-8 mb-8 w-full overflow-hidden">
      {/* Decorative Divider */}
      <div className="flex items-center justify-center gap-3 mb-6 opacity-80">
        <div className="h-[1px] w-12" style={{ background: `linear-gradient(to right, transparent, ${C.saffron})` }} />
        <span style={{ color: C.saffron }} className="text-[10px]">✦</span>
        <Music size={12} style={{ color: C.maroon }} className="opacity-70" />
        <span style={{ color: C.saffron }} className="text-[10px]">✦</span>
        <div className="h-[1px] w-12" style={{ background: `linear-gradient(to left, transparent, ${C.saffron})` }} />
      </div>

      {/* Header */}
      <div className="text-center mb-8 px-4 md:px-0">
        <span className="font-body text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 block" style={{ color: C.saffron }}>
          {isHindi ? 'भक्ति संगीत परंपरा' : 'DEVOTIONAL MUSICAL HERITAGE'}
        </span>
        <h3 className="font-display font-bold text-xl md:text-2xl mb-3" style={{ color: C.maroon }}>
          {isHindi ? 'भव्य जागरण के कलाकार' : 'Bhavya Jagran Performers'}
        </h3>
        <p className="font-body text-sm md:text-[15px] max-w-2xl mx-auto leading-relaxed" style={{ color: C.earthBrown }}>
          {isHindi 
            ? 'वर्षों से विभिन्न भजन गायक एवं जागरण मंडलियां शीतला माता मंदिर, लगदेवी की पवित्र माता जागरण परंपरा को अपने भक्ति संगीत से समृद्ध करती आई हैं। इन कार्यक्रमों के आयोजन में युवा गोल्डन क्लब की सक्रिय भागीदारी रही है।'
            : 'Over the years, devotional singers and musical groups have enriched the sacred Mata Jagran tradition at Sheetla Mata Mandir, Lagdevi, through programmes organized with the involvement of Yuva Golden Club.'}
        </p>
      </div>

      {/* Cards Container - Mobile Swipe Carousel, Desktop Flex/Grid */}
      <div className="relative w-full">
        <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-6 gap-4 px-4 md:px-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:pb-0">
          
          {/* Card 1: Ansla Jagran Party */}
          <div className="shrink-0 w-[85vw] md:w-auto snap-center flex flex-col justify-center items-center text-center p-5 md:p-6 rounded-2xl border transition-transform hover:-translate-y-1 bg-white shadow-xs" style={{ borderColor: C.mutedBorder2 }}>
            <div className="w-10 h-10 rounded-full mb-3 flex items-center justify-center bg-[#fdfbf7] border border-[#5c1616]/10">
              <Music className="w-4 h-4 opacity-70" style={{ color: C.maroon }} />
            </div>
            <h4 className="font-display font-bold text-base md:text-lg mb-1" style={{ color: C.maroon }}>
              {isHindi ? 'अंसला जागरण पार्टी' : 'Ansla Jagran Party'}
            </h4>
            <p className="font-body text-xs md:text-sm font-medium" style={{ color: C.maroonLight }}>
              {isHindi ? 'माता जागरण मंडली' : 'Mata Jagran Party'}
            </p>
          </div>

          {/* Card 2: Sharma Musical Group (Featured) */}
          <div className="shrink-0 w-[85vw] md:w-auto snap-center flex flex-col justify-center items-center text-center p-5 md:p-6 rounded-2xl border-2 relative transition-transform hover:-translate-y-1 shadow-md mt-3 md:mt-0" style={{ background: C.ivoryDeep, borderColor: C.goldBorder }}>
            <div className="absolute -top-3 bg-white border border-[#d4af37] px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
              <Star className="w-2.5 h-2.5 fill-[#d4af37] text-[#d4af37]" />
              <span className="font-body text-[8.5px] font-bold uppercase tracking-widest text-[#d4af37]">
                {isHindi ? 'प्रमुख जागरण मंडली' : 'FREQUENT PERFORMER'}
              </span>
            </div>
            <div className="w-11 h-11 rounded-full mb-3 flex items-center justify-center bg-white border border-[#d4af37]/30 shadow-xs">
              <Music className="w-5 h-5" style={{ color: C.saffron }} />
            </div>
            <h4 className="font-display font-bold text-lg md:text-xl mb-0.5" style={{ color: C.maroon }}>
              {isHindi ? 'शर्मा म्यूजिकल ग्रुप' : 'Sharma Musical Group'}
            </h4>
            <p className="font-body text-[11px] md:text-xs font-bold uppercase tracking-wider mb-4" style={{ color: C.saffron }}>
              {isHindi ? 'सोलन' : 'SOLAN'}
            </p>
            <div className="w-full pt-3 border-t" style={{ borderColor: C.mutedBorder2 }}>
              <span className="font-body text-[9.5px] font-bold uppercase tracking-widest mb-1.5 block" style={{ color: C.earthBrown }}>
                {isHindi ? 'गायक:' : 'Singers:'}
              </span>
              <p className="font-body text-xs md:text-sm font-semibold" style={{ color: C.maroonMid }}>
                {isHindi ? 'सौरव शर्मा' : 'Saurav Sharma'}
              </p>
              <p className="font-body text-xs md:text-sm font-semibold mt-0.5" style={{ color: C.maroonMid }}>
                {isHindi ? 'गौरव शर्मा' : 'Gaurav Sharma'}
              </p>
            </div>
          </div>

          {/* Card 3: Pammi Thakur */}
          <div className="shrink-0 w-[85vw] md:w-auto snap-center flex flex-col justify-center items-center text-center p-5 md:p-6 rounded-2xl border transition-transform hover:-translate-y-1 bg-white shadow-xs" style={{ borderColor: C.mutedBorder2 }}>
            <div className="w-10 h-10 rounded-full mb-3 flex items-center justify-center bg-[#fdfbf7] border border-[#5c1616]/10">
              <Music className="w-4 h-4 opacity-70" style={{ color: C.maroon }} />
            </div>
            <h4 className="font-display font-bold text-base md:text-lg mb-1" style={{ color: C.maroon }}>
              {isHindi ? 'पम्मी ठाकुर' : 'Pammi Thakur'}
            </h4>
            <p className="font-body text-xs md:text-sm font-medium" style={{ color: C.maroonLight }}>
              {isHindi ? 'ठाकुर म्यूजिकल ग्रुप' : 'Thakur Musical Group'}
            </p>
          </div>

        </div>

        {/* Mobile Swipe Hint */}
        <div className="md:hidden flex items-center justify-center gap-2 mt-2 pb-4 text-[#5c1616]/70">
          <span className="font-body text-[11px] font-medium tracking-wide">
            {isHindi ? 'अन्य कलाकार देखने के लिए स्वाइप करें' : 'Swipe to explore'}
          </span>
          <ChevronRight size={14} />
        </div>
      </div>
      
      {/* Hide Scrollbar Style */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};
