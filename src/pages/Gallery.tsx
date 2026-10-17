import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { GallerySection } from '../components/common/GallerySection';
import { Sparkles } from 'lucide-react';

export const Gallery: React.FC = () => {
  const { isHindi } = useLanguage();

  return (
    <div className="w-full pt-24 pb-20 bg-[#fdfbf9] min-h-screen">
      {/* ═══════════════════════════════════════
          PAGE HEADER
      ═══════════════════════════════════════ */}
      <section className="py-12 px-6 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-800 text-[10.5px] font-mono tracking-widest uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>VIRTUAL SANCTUM • दिव्य दर्शन</span>
        </div>

        <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-slate-900 leading-tight tracking-tight">
          {isHindi ? 'पावन दर्शन गैलरी' : 'Sacred Darshan Gallery'}
        </h1>

        <p className="font-display text-base md:text-lg text-amber-800 font-semibold mt-1">
          {isHindi
            ? 'श्री शीतला माता मंदिर, लगदेवी • दिव्य दर्शन व आरती संग्रह'
            : 'Shri Sheetla Mata Mandir, Lagdevi • Complete Glimpse Collection'}
        </p>

        <p className="font-body text-xs sm:text-sm text-slate-500 max-w-lg mx-auto mt-2 leading-relaxed">
          {isHindi
            ? 'देवी-देवताओं के जागृत स्वरूप, मंदिर परिसर, अखंड ज्योति, वार्षिक उत्सव व लंगर सेवा के दर्शन करें एवं ऑनलाइन पुष्प अर्पण करें।'
            : 'Explore high-resolution glimpses of holy shrines, temple architecture, annual festivals, and offer virtual flowers.'}
        </p>
      </section>

      {/* ═══════════════════════════════════════
          DYNAMIC CATEGORY FILTERED GALLERY
      ═══════════════════════════════════════ */}
      <GallerySection showAllButton={false} showHeader={false} />
    </div>
  );
};
