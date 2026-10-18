import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  MapPin,
  Mail,
  Navigation,
  Compass,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Info
} from 'lucide-react';
import { templeData, TEMPLE_LOCATION } from '../data/temple';

export const Contact: React.FC = () => {
  const { isHindi } = useLanguage();

  return (
    <div className="relative w-full max-w-full bg-[#f8f6f2] text-slate-900 selection:bg-amber-500/20 selection:text-amber-900 pt-28 sm:pt-32 pb-24 overflow-x-hidden min-h-screen">
      
      {/* ── 1. CENTERED EDITORIAL HERO (NO HEAVY CARDS) ── */}
      <section className="relative px-4 sm:px-6 max-w-[1240px] mx-auto text-center flex flex-col items-center mb-12 sm:mb-16 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[300px] bg-gradient-to-b from-amber-400/15 via-amber-200/5 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-900 text-xs font-semibold mb-3 backdrop-blur-xs shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span className="font-hindi tracking-wider">॥ ॐ श्री शीतलायै नमः ॥</span>
          <span className="text-amber-800/40">•</span>
          <span className="text-[11px] font-mono tracking-widest uppercase text-amber-800">
            {isHindi ? 'स्थान एवं संपर्क' : 'LOCATION & CONTACT'}
          </span>
        </div>

        <h1 className="font-google text-[1.5rem] xs:text-[1.85rem] sm:text-[2.8rem] md:text-[3.2rem] font-bold text-slate-950 tracking-[-0.02em] leading-[1.18] max-w-3xl">
          {isHindi ? 'मंदिर का पता एवं संपर्क' : 'Temple Address & Contact'}
        </h1>

        <p className="font-google text-slate-600 text-sm sm:text-base max-w-xl mx-auto mt-3 leading-[1.7] font-normal">
          {isHindi
            ? 'पावन लगदेवी धाम पहुँचने के लिए आधिकारिक पता, गूगल मैप्स दिशा-निर्देश और वेबसाइट सुझाव संपर्क।'
            : 'Official shrine address, Google Maps directions, and direct feedback channel for the website.'}
        </p>
      </section>

      {/* ── 2. MINIMALIST EDITORIAL CONTENT (WITHOUT BULKY CARDS) ── */}
      <div className="max-w-[860px] mx-auto px-4 sm:px-6 space-y-12 sm:space-y-16">

        {/* ── SECTION A: MANDIR ADDRESS & GET DIRECTIONS ── */}
        <section className="border-b border-slate-200/80 pb-12 sm:pb-16 space-y-6">
          <div className="flex items-center gap-2 text-amber-900 font-mono text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-4 h-4 text-amber-700 shrink-0" />
            <span>{isHindi ? 'पवित्र धाम स्थान' : 'Sacred Shrine Location'}</span>
          </div>

          <div className="space-y-3 font-google">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
              {isHindi ? 'श्री शीतला माता मंदिर' : 'Shri Sheetla Mata Mandir'}
            </h2>
            
            <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-normal">
              {isHindi ? (
                <>
                  गाँव लगदेवी, डाकघर लगदेवी<br />
                  तहसील बमसन (तौणी देवी), जिला हमीरपुर<br />
                  हिमाचल प्रदेश – 177022, भारत
                </>
              ) : (
                <>
                  Village Lagdevi, Post Office Lagdevi<br />
                  Tehsil Bamsan (Tauni Devi), District Hamirpur<br />
                  Himachal Pradesh – 177022, India
                </>
              )}
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-slate-600 pt-1">
              <span>{isHindi ? 'पिनकोड: 177022' : 'Pincode: 177022'}</span>
              <span>•</span>
              <span>{isHindi ? 'तहसील: बमसन' : 'Tehsil: Bamsan'}</span>
              <span>•</span>
              <span>{isHindi ? 'जिला: हमीरपुर (हि.प्र.)' : 'District: Hamirpur (H.P.)'}</span>
            </div>
          </div>

          {/* Action Buttons for Directions */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <a
              href={templeData.mapDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-liquid-black inline-flex items-center gap-2 text-xs font-semibold py-2.5 px-5 shadow-sm group"
            >
              <Navigation className="w-4 h-4 text-amber-400 transition-transform group-hover:scale-110" />
              <span>{isHindi ? 'गूगल मैप्स पर दिशा-निर्देश प्राप्त करें' : 'Get Directions on Google Maps'}</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70 ml-0.5" />
            </a>

            <a
              href="/visit"
              className="inline-flex items-center gap-2 text-xs font-google font-semibold py-2.5 px-4 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 transition-colors shadow-2xs"
            >
              <Compass className="w-3.5 h-3.5 text-slate-600" />
              <span>{isHindi ? 'विस्तृत यात्रा व आरती गाइड' : 'View Pilgrimage & Timings'}</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>
        </section>

        {/* ── SECTION B: WEBSITE FEEDBACK & ERROR REPORTING (lagwalharsh1@gmail.com) ── */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 text-amber-900 font-mono text-xs font-bold uppercase tracking-wider">
            <Mail className="w-4 h-4 text-amber-700 shrink-0" />
            <span>{isHindi ? 'वेबसाइट सुधार एवं त्रुटि सुझाव' : 'Website Feedback & Corrections'}</span>
          </div>

          <div className="space-y-3 font-google">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-950 tracking-tight">
              {isHindi ? 'वेबसाइट में किसी भी त्रुटि या सुझाव के लिए' : 'Report Any Mistake or Share Suggestions'}
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl font-normal">
              {isHindi
                ? 'यदि आपको वेबसाइट में किसी जानकारी, ऐतिहासिक तथ्य, वर्तनी (spelling) अथवा व्यवस्था में कोई त्रुटि या कमी लगे, तो कृपया सीधे ईमेल द्वारा सूचित करें ताकि उसे तुरंत ठीक किया जा सके।'
                : 'If you notice any factual mistake, typo, outdated timing, or have suggestions to improve this portal, please reach out directly via email:'}
            </p>
          </div>

          {/* Email Contact Direct Link */}
          <div className="pt-1 flex flex-wrap items-center gap-4">
            <a
              href="mailto:lagwalharsh1@gmail.com?subject=Sheetla%20Mata%20Mandir%20Website%20Feedback"
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white border border-slate-300 hover:border-slate-400 text-slate-950 font-mono text-xs sm:text-sm font-semibold transition-all shadow-2xs group"
            >
              <Mail className="w-4 h-4 text-amber-600 group-hover:scale-110 transition-transform" />
              <span>lagwalharsh1@gmail.com</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </a>

            <span className="text-xs text-slate-500 font-mono">
              {isHindi ? 'त्वरित प्रतिक्रिया एवं सुधार' : 'Direct creator response'}
            </span>
          </div>

          {/* Clean Editorial Note about Harsh Lagwal */}
          <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/70 text-xs text-amber-950 flex items-start gap-2.5 leading-relaxed font-google">
            <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p>
              {isHindi ? (
                <>
                  यह डिजिटल सेवा <strong>हर्ष लगवाल (Harsh Lagwal)</strong> द्वारा अपने गाँव लगदेवी और श्री शीतला माता मंदिर के पावन इतिहास को सहेजने के लिए पूर्णतः निःस्वार्थ भाव से बनाई गई है।
                </>
              ) : (
                <>
                  This digital portal was thoughtfully created by <strong>Harsh Lagwal</strong> to preserve the living heritage and history of Village Lagdevi and Shri Sheetla Mata Mandir.
                </>
              )}
            </p>
          </div>
        </section>

      </div>

    </div>
  );
};
