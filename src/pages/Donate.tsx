import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { LotusWatermark } from '../components/common/LotusWatermark';
import { GlassAtmDonationCard } from '../components/donation/GlassAtmDonationCard';
import { Sparkles } from 'lucide-react';

export const Donate: React.FC = () => {
  const { isHindi } = useLanguage();

  return (
    <div className="relative w-full max-w-full bg-[#f8f6f2] text-slate-900 selection:bg-amber-500/20 selection:text-amber-900 pt-32 sm:pt-36 pb-24 min-h-screen flex flex-col items-center justify-start px-4 overflow-x-hidden">
      {/* Sacred Temple Floral Watermarks */}
      <LotusWatermark position="top-right" size="lg" opacity={0.05} />
      <LotusWatermark position="bottom-left" size="lg" opacity={0.05} mirrored />

      {/* ── COMPACT HEADER (GOOGLE / ANTIGRAVITY STYLE) ── */}
      <div className="relative z-10 text-center max-w-md mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-900 text-xs font-semibold mb-2.5 backdrop-blur-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span className="font-hindi tracking-wider">॥ ॐ श्री शीतलायै नमः ॥</span>
        </div>

        <h1 className="font-google text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
          {isHindi ? 'पावन दान एवं सेवा' : 'Temple Donation'}
        </h1>

        <p className="font-google text-slate-600 text-xs sm:text-sm mt-1.5 leading-relaxed">
          {isHindi
            ? 'अपनी श्रद्धा अनुसार सीधे मंदिर के आधिकारिक खाते में दान करें।'
            : 'Contribute as per your devotion directly to the official temple account.'}
        </p>
      </div>

      {/* ── ULTRA-REALISTIC GLASSMORPHIC ATM / FOLDER DONATION CARD ── */}
      <div className="relative z-10 w-full flex justify-center">
        <GlassAtmDonationCard />
      </div>
    </div>
  );
};

