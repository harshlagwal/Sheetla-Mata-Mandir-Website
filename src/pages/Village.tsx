import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import {
  FileText,
  Landmark,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Search,
  BookOpen,
  Info,
  MapPin,
  Sparkles,
  Users,
  Heart,
  Shield
} from 'lucide-react';
import { LotusWatermark } from '../components/common/LotusWatermark';

interface Milestone {
  year: string;
  hindi: string | React.ReactNode;
  english: string | React.ReactNode;
  tag?: { hi: string; en: string };
}

const TIMELINE_EVENTS: Milestone[] = [
  {
    year: '1700-1740 AD',
    hindi: 'राजा हमीर चंद ने हमीरपुर का नामकरण किया (कामरूप बादशाह)',
    english: 'Raja Hamir Chand founded and named Hamirpur (Katoch Dynasty)',
  },
  {
    year: '1972',
    hindi: (
      <>
        हमीरपुर जिला बना
        <br />
        (कांगड़ा से अलग)
      </>
    ),
    english: (
      <>
        Hamirpur constituted as an independent District
        <br />
        (carved from Kangra)
      </>
    ),
  },
  {
    year: '2011',
    hindi: 'जनगणना – लग (बमसन) गाँव की आबादी 320 दर्ज',
    english: 'Census 2011 – Village Lag (Bamsan) recorded 320 population',
    tag: { hi: 'जनगणना', en: 'CENSUS' },
  },
  {
    year: '2026',
    hindi: 'स्थानीय खबरों में लगदेवी में सड़क/निकासी समस्याएँ रिपोर्ट हुई',
    english: 'Regional news reports highlight local road drainage development',
    tag: { hi: 'विकास', en: 'CIVIC' },
  },
];

export const Village: React.FC = () => {
  const { isHindi } = useLanguage();
  const navigate = useNavigate();
  const timelineRef = useRef<HTMLDivElement>(null);
  const isTimelineInView = useInView(timelineRef, { once: false, amount: 0.25 });

  return (
    <div className="relative w-full max-w-full bg-[#f8f6f2] text-slate-900 selection:bg-amber-500/20 selection:text-amber-900 pt-28 sm:pt-32 pb-24 overflow-x-hidden min-h-screen">
      
      {/* ── 1. CENTERED EDITORIAL HERO (ABOUT OUR VILLAGE) ── */}
      <section className="relative px-4 sm:px-6 max-w-[1240px] mx-auto text-center flex flex-col items-center mb-10 sm:mb-12 overflow-hidden">
        <LotusWatermark position="top-right" size="lg" opacity={0.06} />
        <LotusWatermark position="bottom-left" size="lg" opacity={0.06} mirrored />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[300px] bg-gradient-to-b from-amber-400/15 via-amber-200/5 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-4 sm:px-3.5 py-1.5 sm:py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-900 text-xs font-semibold mb-3 backdrop-blur-xs shadow-2xs text-center max-w-full">
          <div className="inline-flex items-center gap-1.5 whitespace-nowrap">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="font-hindi tracking-wider text-[11px] sm:text-xs">॥ ॐ श्री शीतलायै नमः ॥</span>
          </div>
          <span className="hidden sm:inline text-amber-800/40 shrink-0">•</span>
          <span className="text-[10px] sm:text-[11px] font-mono tracking-wider sm:tracking-widest uppercase text-amber-800 whitespace-nowrap">
            {isHindi ? 'ग्राम पुरातात्विक अभिलेख' : 'VILLAGE ARCHIVAL RECORD'}
          </span>
        </div>

        <h1 className="font-google text-[1.55rem] xs:text-[1.85rem] sm:text-[2.8rem] md:text-[3.2rem] font-bold text-slate-950 tracking-[-0.02em] leading-[1.18] max-w-3xl">
          {isHindi ? 'हमारे गाँव के बारे में' : 'About Our Village'}
        </h1>

        <p className="font-google text-slate-600 text-sm sm:text-base max-w-xl mx-auto mt-3 leading-[1.7] font-normal">
          {isHindi
            ? 'पावन ग्राम लगदेवी — इतिहास, सत्यापित जनसांख्यिकी तथ्य, कालक्रम और प्रशासनिक अभिलेख।'
            : 'Sacred Village Lagdevi — Historical timeline, verified census demographics, and administrative archives.'}
        </p>
      </section>

      {/* ── MAX-WIDTH CONTAINER FOR DOSSIER REPORT ── */}
      <div className="max-w-[980px] mx-auto px-4 sm:px-6">

        {/* ── REPORT METADATA STRIP ── */}
        <div className="mb-4 flex items-center justify-between text-xs text-slate-500 font-mono">
          <span className="font-semibold text-slate-600">{isHindi ? 'आधिकारिक ग्राम रिपोर्ट' : 'OFFICIAL VILLAGE REPORT'}</span>
          <span className="text-[11px] uppercase tracking-widest">
            DOC REF: LGD-2026-REPORT
          </span>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            THE FORMAL WHITE REPORT CARD (APPLE / GOOGLE DOSSIER STYLE)
           ══════════════════════════════════════════════════════════════ */}
        <article className="relative bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-[0_4px_30px_rgba(0,0,0,0.04)] p-6 sm:p-10 md:p-14 space-y-10 sm:space-y-12 overflow-hidden">
          <LotusWatermark position="bottom-right" size="lg" opacity={0.04} />
          
          {/* ── DOCUMENT HEADER ── */}
          <header className="border-b border-slate-200 pb-8 space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-mono text-[10.5px] uppercase font-bold tracking-widest text-amber-900 bg-amber-50 border border-amber-200/80 px-2.5 py-0.5 rounded">
                {isHindi ? 'OFFICIAL REPORT • ग्राम विवरण रिपोर्ट' : 'OFFICIAL ARCHIVE • VILLAGE DOSSIER'}
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-500 text-xs">
                {isHindi ? 'हमीरपुर, हिमाचल प्रदेश' : 'Hamirpur, Himachal Pradesh'}
              </span>
            </div>

            <h2 className="font-google text-lg xs:text-xl sm:text-3xl md:text-4xl font-bold text-slate-950 tracking-[-0.02em] leading-tight">
              {isHindi ? 'लगदेवी गाँव रिपोर्ट' : 'Village Lagdevi Comprehensive Report'}
            </h2>

            <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-5 gap-y-1 text-xs text-slate-600 pt-1 font-mono">
              <span>{isHindi ? 'तहसील: बमसन (तौणी देवी)' : 'Tehsil: Bamsan (Tauni Devi)'}</span>
              <span className="text-slate-300 hidden xs:inline">•</span>
              <span>{isHindi ? 'पंचायत: लाग (काडियार)' : 'Panchayat: Lag (Kadhiyar)'}</span>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <span>{isHindi ? 'पिनकोड: 177022' : 'Pincode: 177022'}</span>
              <span className="text-slate-300 hidden xs:inline">•</span>
              <span>{isHindi ? 'जनगणना कोड: 62/19' : 'Census Code: 62/19'}</span>
            </div>
          </header>

          {/* ── 1.0 EXECUTIVE SUMMARY (कार्यकारी सारांश) ── */}
          <section className="space-y-3">
            <h3 className="font-google text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-700 shrink-0" />
              <span>{isHindi ? '1.0 कार्यकारी सारांश' : '1.0 Executive Summary'}</span>
            </h3>

            <div className="p-5 sm:p-6 rounded-2xl bg-slate-50/80 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3 font-google">
              <p>
                {isHindi
                  ? 'लगदेवी गाँव हमीरपुर ज़िले के बमसन (तौणी देवी) तहसील में स्थित है। 2011 की जनगणना में इस गाँव की कुल जनसंख्या 320 पाई गई, जिसमें 150 पुरुष और 170 महिला हैं। ग्राम पंचायती अभिलेखों के अनुसार लगदेवी ग्राम पंचायत लाग (काडियार) के अंतर्गत आता है और पिनकोड 177022 है। प्रमुख स्थानीय स्थल है शीतला माता मंदिर (स्थानीय कुलदेवी), जिसका निर्माण काल तथा वास्तु-विशेष की प्रामाणिक जानकारी मंदिर अभिलेखों में संकलित है।'
                  : 'Lagdevi village is situated in Bamsan (Tauni Devi) Tehsil of Hamirpur District, Himachal Pradesh. In the 2011 Census of India, the village recorded a resident population of 320 (150 males and 170 females). As per Panchayati Raj administrative records, Lagdevi falls under Gram Panchayat Lag (Kadhiyar) with Postal Pincode 177022. The primary sacred landmark is Shri Sheetla Mata Mandir.'}
              </p>
              <p>
                {isHindi
                  ? 'मुख्य आर्थिक गतिविधियाँ कृषि एवं कृषि-आधारित हैं। हाल की खबरों के अनुसार गाँव में सड़क की ड्रेनेज व्यवस्था और खेल मैदान संबंधी आवश्यकताएं सामने आई हैं। इस रिपोर्ट में सरकारी आँकड़ों (जैसे जनगणना, राजस्व अभिलेख, जिला सूचना) पर आधारित पुष्टि किए गए तथ्य और स्थानीय श्रुति/परंपराओं को निष्पक्ष रूप से प्रस्तुत किया गया है।'
                  : 'Primary economic livelihoods center upon traditional Himalayan organic agriculture and allied pastoral activities. Recent regional news highlights road stormwater drainage enhancement and sports ground completion as active community priorities. This report synthesizes verified official government records alongside living oral folklore.'}
              </p>
            </div>
          </section>

          {/* ── 2.0 सत्यापित तथ्य (STRUCTURED DEMOGRAPHIC STATS & CIVIC DATA) ── */}
          <section className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-google text-base sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                <span>{isHindi ? '2.0 सत्यापित जनसांख्यिकी तथ्य' : '2.0 Verified Demographic & Administrative Facts'}</span>
              </h3>
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded font-semibold">
                {isHindi ? 'जनगणना 2011 अभिलेख' : 'CENSUS 2011 ARCHIVES'}
              </span>
            </div>

            {/* ── 6 ANIMATED STRUCTURED STAT CARDS (POPULATION, SC/ST, LITERACY, ETC.) ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              
              {/* Card 1: Total Population */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
                      {isHindi ? 'कुल आबादी' : 'Total Population'}
                    </span>
                    <span className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center">
                      <Users className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <div className="font-google text-2xl sm:text-3xl font-bold text-slate-950 mb-1">
                    320
                  </div>
                  <p className="text-xs text-slate-600 leading-snug">
                    {isHindi ? 'ग्राम कोड: 62/19 • आधिकारिक जनगणना' : 'Village Code: 62/19 • Official Census'}
                  </p>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-700 font-mono">
                  <span>{isHindi ? 'पुरुष: 150 (46.9%)' : 'Male: 150 (46.9%)'}</span>
                  <span>•</span>
                  <span>{isHindi ? 'महिला: 170 (53.1%)' : 'Female: 170 (53.1%)'}</span>
                </div>
              </motion.div>

              {/* Card 2: Sex Ratio */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
                      {isHindi ? 'लिंगानुपात' : 'Gender Sex Ratio'}
                    </span>
                    <span className="w-7 h-7 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 flex items-center justify-center">
                      <Heart className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <div className="font-google text-2xl sm:text-3xl font-bold text-slate-950 mb-1">
                    1133
                  </div>
                  <p className="text-xs text-slate-600 leading-snug">
                    {isHindi ? 'महिला प्रति 1,000 पुरुष' : 'Females per 1,000 Males'}
                  </p>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-emerald-800 font-medium">
                  {isHindi ? '✓ उत्कृष्ट संतुलित स्तर (राष्ट्रीय औसत से श्रेष्ठ)' : '✓ Outstanding balanced demographic ratio'}
                </div>
              </motion.div>

              {/* Card 3: Literacy Rate */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
                      {isHindi ? 'कुल साक्षरता दर' : 'Literacy Rate'}
                    </span>
                    <span className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center">
                      <BookOpen className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <div className="font-google text-2xl sm:text-3xl font-bold text-slate-950 mb-1">
                    88.53%
                  </div>
                  <p className="text-xs text-slate-600 leading-snug">
                    {isHindi ? 'गाँव में उच्च शिक्षा व साक्षरता दर' : 'High regional educational attainment'}
                  </p>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-700 font-mono">
                  <span>{isHindi ? 'पुरुष: 95.22%' : 'Male: 95.22%'}</span>
                  <span>•</span>
                  <span>{isHindi ? 'महिला: 82.98%' : 'Female: 82.98%'}</span>
                </div>
              </motion.div>

              {/* Card 4: Social Demographics (SC & ST Communities) */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
                      {isHindi ? 'सामाजिक संरचना (SC / ST)' : 'Social Demographics (SC/ST)'}
                    </span>
                    <span className="w-7 h-7 rounded-lg bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center">
                      <Shield className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <div className="font-google text-xl sm:text-2xl font-bold text-slate-950 mb-1">
                    SC 24.7% • ST 2.8%
                  </div>
                  <p className="text-xs text-slate-600 leading-snug">
                    {isHindi ? 'सद्भावपूर्ण सामाजिक संरचना' : 'Harmonious integrated community'}
                  </p>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-700 font-mono">
                  <span>{isHindi ? 'अनुसूचित जाति: 79 (24.7%)' : 'SC: 79 residents'}</span>
                  <span>•</span>
                  <span>{isHindi ? 'अनुसूचित जनजाति: 9 (2.8%)' : 'ST: 9 residents'}</span>
                </div>
              </motion.div>

              {/* Card 5: Administrative Jurisdiction & Pin */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.25 }}
                className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
                      {isHindi ? 'प्रशासनिक पहचान' : 'Administrative Jurisdiction'}
                    </span>
                    <span className="w-7 h-7 rounded-lg bg-sky-50 border border-sky-200 text-sky-700 flex items-center justify-center">
                      <MapPin className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <div className="font-google text-xl sm:text-2xl font-bold text-slate-950 mb-1 font-mono">
                    PIN: 177022
                  </div>
                  <p className="text-xs text-slate-600 leading-snug">
                    {isHindi ? 'पंचायत: लाग (298561) • ब्लॉक: बमसन (732)' : 'GP: Lag (298561) • Block: Bamsan (732)'}
                  </p>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-700 font-mono">
                  {isHindi ? 'उपमंडल / तहसील: बमसन (तौणी देवी)' : 'Sub-Division/Tehsil: Bamsan (Tauni Devi)'}
                </div>
              </motion.div>

              {/* Card 6: Sacred Landmark (Mata Mandir with Action Button) */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="bg-amber-50/50 rounded-xl p-4 sm:p-5 border border-amber-200 shadow-sm hover:shadow-md hover:border-amber-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-amber-900 font-semibold">
                      {isHindi ? 'प्रमुख कुलदेवी शक्तिपीठ' : 'Primary Sacred Shrine'}
                    </span>
                    <span className="w-7 h-7 rounded-lg bg-amber-100 border border-amber-300 text-amber-800 flex items-center justify-center">
                      <Landmark className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <div className="font-google text-lg sm:text-xl font-bold text-amber-950 mb-1">
                    {isHindi ? 'श्री शीतला माता मंदिर' : 'Shri Sheetla Mata Mandir'}
                  </div>
                  <p className="text-xs text-amber-900/80 leading-snug">
                    {isHindi ? 'गाँव का पावन व जागृत कुलदेवी धाम' : 'Sacred ancestral Kuldevi shrine of the village'}
                  </p>
                </div>
                <div className="mt-3 pt-3 border-t border-amber-200/80 flex items-center justify-between">
                  <span className="text-[11px] font-hindi text-amber-900 font-semibold">
                    ॥ ॐ श्री शीतलायै नमः ॥
                  </span>
                  <button
                    type="button"
                    onClick={() => navigate('/about')}
                    className="btn-liquid-black !py-1 !px-3 text-xs group shrink-0"
                  >
                    <span>{isHindi ? 'मंदिर इतिहास' : 'View Lore'}</span>
                    <ArrowRight className="w-3 h-3 text-amber-400 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </motion.div>

            </div>

            {/* ── ADDITIONAL VERIFIED CIVIC & GEOGRAPHIC DETAILS ── */}
            <div className="rounded-xl border border-slate-200 overflow-hidden text-xs sm:text-sm font-google bg-white shadow-2xs">
              <div className="divide-y divide-slate-100">
                {/* Land & Geography */}
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 bg-white hover:bg-slate-50/50 transition-colors gap-1 sm:gap-4">
                  <span className="font-bold text-slate-900">
                    {isHindi ? 'भूमि क्षेत्र एवं भूगोल' : 'Land Classification & Geography'}
                  </span>
                  <div className="sm:col-span-2 text-slate-700 leading-relaxed">
                    {isHindi
                      ? 'उत्तर-पश्चिम से व्यास नदी घाटी तक विस्तृत हिमालयी पठारी ढलान। हिम भूमि (eHimbhoomi) रिकॉर्ड में जमाबंदी प्रपत्र प्रक्रियाधीन हैं।'
                      : 'Extends across the Himalayan hill plateau towards the Beas river basin. Land classification and cadastral Jamabandi on e-Himbhoomi are undergoing archival verification.'}
                  </div>
                </div>

                {/* Infrastructure */}
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 bg-white hover:bg-slate-50/50 transition-colors gap-1 sm:gap-4">
                  <span className="font-bold text-slate-900">
                    {isHindi ? 'संस्थान एवं आधारभूत संरचना' : 'Institutions & Infrastructure'}
                  </span>
                  <div className="sm:col-span-2 text-slate-700 leading-relaxed">
                    {isHindi
                      ? 'प्राथमिक सरकारी स्कूल, ग्राम पंचायत कार्यालय। निकटवर्ती प्राथमिक स्वास्थ्य केंद्र: उतपुरा। मुख्य सड़क: बमसन–ऊहल संपर्क मार्ग। सड़क किनारे जल निकासी नाली एवं खेल मैदान अर्द्धनिर्मित होने की समस्या हालिया समाचारों में रेखांकित की गई है।'
                      : 'Primary Govt School, Gram Panchayat administrative office. Nearest Primary Health Centre: Utpur. Main connectivity: Bamsan–Uhal link road. Roadside stormwater drainage and playground development remain active community priorities.'}
                  </div>
                </div>

                {/* Livelihood */}
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 bg-white hover:bg-slate-50/50 transition-colors gap-1 sm:gap-4">
                  <span className="font-bold text-slate-900">
                    {isHindi ? 'आर्थिक गतिविधियाँ' : 'Economic Livelihood'}
                  </span>
                  <div className="sm:col-span-2 text-slate-700 leading-relaxed">
                    {isHindi
                      ? 'मुख्यतः पारंपरिक हिमालयी जैविक कृषि एवं सीमांत पशुपालन। युवा वर्ग भारतीय सेना, रक्षा सेवाओं, ठेकेदारी, तकनीकी व सरकारी रोजगार से संबद्ध हैं।'
                      : 'Primarily traditional Himalayan terraced organic farming and livestock husbandry. Local youth actively serve in the Indian Armed Forces, government administration, and technical professions.'}
                  </div>
                </div>
              </div>
            </div>

          </section>

          {/* ── 3.0 प्रमुख घटनाएँ (ANIMATED WHITE UI TIMELINE WITH BLACK OUTLINE CARDS) ── */}
          <section className="space-y-4">
            <h2 className="font-google text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-700 shrink-0" />
              <span>{isHindi ? '3.0 ऐतिहासिक घटनाक्रम' : '3.0 Historical Timeline'}</span>
            </h2>

            {/* Clean White Mode Canvas with Black Outline Cards & Scroll Animation */}
            <div
              ref={timelineRef}
              className="w-full bg-slate-50/70 rounded-2xl p-5 sm:p-8 border border-slate-200/90 shadow-sm font-google overflow-hidden"
            >
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <h3 className="font-google font-bold text-lg sm:text-xl text-slate-900 tracking-tight">
                  {isHindi ? 'प्रमुख घटनाएँ' : 'Key Historical Milestones'}
                </h3>
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-600 bg-white border border-slate-200 px-2.5 py-1 rounded-md shadow-2xs font-semibold">
                  {isHindi ? 'समयरेखा • 1700 - 2026' : 'Timeline • 1700 - 2026'}
                </span>
              </div>

              {/* Desktop Horizontal View with Moving Arrow, Black Outline Cards & Downward Arrows */}
              <div className="hidden md:block relative w-full pt-2 pb-4">
                
                {/* 4 Year Top Pills with Sharp Black Outline */}
                <div className="grid grid-cols-4 gap-5 items-end mb-4 relative z-10">
                  {TIMELINE_EVENTS.map((item, idx) => (
                    <motion.div
                      key={item.year}
                      initial={{ opacity: 0, y: -20, scale: 0.92 }}
                      animate={isTimelineInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -20, scale: 0.92 }}
                      transition={{ duration: 0.45, delay: 0.12 + idx * 0.16, ease: [0.16, 1, 0.3, 1] }}
                      className="text-center py-2.5 px-3 rounded-lg bg-white border-2 border-slate-900 text-slate-950 font-mono text-xs font-bold shadow-sm flex items-center justify-center gap-1.5"
                    >
                      <span>{item.year}</span>
                      {item.tag && (
                        <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-slate-100 border border-slate-300 text-slate-800 font-sans font-bold">
                          {isHindi ? item.tag.hi : item.tag.en}
                        </span>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Vertical dashed connectors from top pills to horizontal line */}
                <div className="grid grid-cols-4 gap-5 mb-1.5 relative z-10">
                  {TIMELINE_EVENTS.map((item, idx) => (
                    <div key={`pill-conn-${item.year}`} className="flex justify-center">
                      <motion.div
                        initial={{ scaleY: 0 }}
                        animate={isTimelineInView ? { scaleY: 1 } : { scaleY: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 + idx * 0.14 }}
                        className="origin-top w-0 h-4 border-l-2 border-dashed border-slate-900"
                      />
                    </div>
                  ))}
                </div>

                {/* Animated Horizontal Axis Line with Moving Arrow */}
                <div className="relative w-full mb-2 flex items-center">
                  {/* Subtle track line */}
                  <div className="absolute inset-x-0 h-[2.5px] bg-slate-200 rounded-full" />
                  
                  {/* Progress Line */}
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={isTimelineInView ? { width: '100%' } : { width: '0%' }}
                    transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                    className="h-[2.5px] bg-slate-900 relative z-10 flex items-center"
                  >
                    {/* Dynamic Moving Arrow Head at the tip */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.4 }}
                      animate={isTimelineInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 }}
                      transition={{ duration: 0.25, delay: 0.9 }}
                      className="absolute -right-2 w-0 h-0 border-y-[6px] border-y-transparent border-l-[12px] border-l-slate-900 shrink-0"
                      aria-hidden="true"
                    />
                  </motion.div>
                </div>

                {/* 4 Description Cards with Black Outline + DOWNWARD ARROWS (as in user diagram) */}
                <div className="grid grid-cols-4 gap-5 items-start relative z-10">
                  {TIMELINE_EVENTS.map((item, idx) => (
                    <div key={item.year} className="flex flex-col items-center">
                      {/* Top dashed connector with downward arrowhead pointing into card */}
                      <div className="flex flex-col items-center mb-1">
                        <motion.div
                          initial={{ scaleY: 0 }}
                          animate={isTimelineInView ? { scaleY: 1 } : { scaleY: 0 }}
                          transition={{ duration: 0.35, delay: 0.25 + idx * 0.16, ease: 'easeOut' }}
                          className="origin-top w-0 h-6 border-l-2 border-dashed border-slate-900"
                        />
                        <motion.div
                          initial={{ opacity: 0, scale: 0.3 }}
                          animate={isTimelineInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.3 }}
                          transition={{ duration: 0.2, delay: 0.4 + idx * 0.16 }}
                          className="w-0 h-0 border-x-[5px] border-x-transparent border-t-[8px] border-t-slate-900"
                          aria-hidden="true"
                        />
                      </div>
                      
                      {/* Black Outline Card */}
                      <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.94 }}
                        animate={isTimelineInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.94 }}
                        transition={{ duration: 0.5, delay: 0.35 + idx * 0.16, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full p-4 rounded-xl bg-white border-2 border-slate-900 text-center min-h-[105px] flex items-center justify-center shadow-sm hover:-translate-y-1 transition-transform relative z-10"
                      >
                        <p className="font-google text-xs text-slate-950 font-medium leading-snug">
                          {isHindi ? item.hindi : item.english}
                        </p>
                      </motion.div>

                      {/* Bottom vertical dashed tail line with downward arrowhead (as drawn in screenshot!) */}
                      <div className="flex flex-col items-center mt-1.5">
                        <motion.div
                          initial={{ scaleY: 0 }}
                          animate={isTimelineInView ? { scaleY: 1 } : { scaleY: 0 }}
                          transition={{ duration: 0.35, delay: 0.55 + idx * 0.16, ease: 'easeOut' }}
                          className="origin-top w-0 h-7 border-l-2 border-dashed border-slate-900"
                        />
                        <motion.div
                          initial={{ opacity: 0, scale: 0.3 }}
                          animate={isTimelineInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.3 }}
                          transition={{ duration: 0.2, delay: 0.7 + idx * 0.16 }}
                          className="w-0 h-0 border-x-[5px] border-x-transparent border-t-[9px] border-t-slate-900 -mt-0.5"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  ))}
                </div>

              </div>

              {/* Mobile Vertical View with Animated Drawing Line and Black Outline Cards */}
              <div className="block md:hidden relative pl-6 ml-2 my-2">
                {/* Background vertical track */}
                <div className="absolute left-[7px] top-3 bottom-6 w-[2.5px] bg-slate-200 rounded-full" />
                
                {/* Animated growing vertical line */}
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={isTimelineInView ? { scaleY: 1 } : { scaleY: 0 }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                  className="origin-top absolute left-[7px] top-3 bottom-6 w-[2.5px] bg-slate-900"
                />

                {/* Arrow pointing down at bottom */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isTimelineInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.95, duration: 0.25 }}
                  className="absolute left-[2px] bottom-3 w-0 h-0 border-x-[6px] border-x-transparent border-t-[11px] border-t-slate-900"
                  aria-hidden="true"
                />

                <div className="space-y-6">
                  {TIMELINE_EVENTS.map((item, idx) => (
                    <motion.div
                      key={item.year}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isTimelineInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.45, delay: 0.18 + idx * 0.18, ease: 'easeOut' }}
                      className="relative"
                    >
                      {/* Node Bullet */}
                      <div className="absolute -left-[23px] top-2.5 w-3.5 h-3.5 rounded-full bg-slate-900 border-2 border-white ring-2 ring-slate-900" />
                      
                      {/* Year Badge */}
                      <div className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-md bg-white border-2 border-slate-900 font-mono text-xs font-bold text-slate-950 shadow-xs mb-2">
                        <span>{item.year}</span>
                        {item.tag && (
                          <span className="text-[9px] uppercase px-1 rounded bg-slate-100 border border-slate-300 text-slate-800 font-sans font-bold">
                            {isHindi ? item.tag.hi : item.tag.en}
                          </span>
                        )}
                      </div>

                      {/* Black Outline Card */}
                      <div className="p-3.5 rounded-xl bg-white border-2 border-slate-900 text-xs text-slate-950 font-google leading-relaxed shadow-sm">
                        {isHindi ? item.hindi : item.english}
                      </div>

                      {/* Downward indicator arrow below card on mobile */}
                      <div className="flex items-center gap-1 mt-2 text-[10px] font-mono text-slate-500 pl-1">
                        <span className="w-0 h-0 border-x-[4px] border-x-transparent border-t-[6px] border-t-slate-700" />
                        <span>{isHindi ? 'घटनाक्रम' : 'Milestone'}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

            </div>
          </section>

          {/* ── 4.0 अनसत्यापित स्थानीय कथाएँ (ORAL TRADITIONS) ── */}
          <section className="space-y-4">
            <h2 className="font-google text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-700 shrink-0" />
              <span>{isHindi ? '4.0 अनसत्यापित स्थानीय कथाएँ' : '4.0 Oral Lore & Village Traditions'}</span>
            </h2>

            <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed font-google">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-950 block">
                  {isHindi ? 'नाम की उत्पत्ति:' : 'Origin of the Name "Lagdevi":'}
                </span>
                <p>
                  {isHindi
                    ? 'कुछ बुजुर्गों की मौखिक कथा के अनुसार गाँव का नाम “लगदेवी” क्षेत्र की देवी (शीतला माता) के नाम पर पड़ा है। कहा जाता है कि प्राचीन समय में देवी की पावन मूर्ति गाँव के समीप “लग” (पहाड़ी ढलान या टीलों जैसा स्थल) पर मिली थी और वहीं से उनका पूजन आरंभ हुआ।'
                    : 'According to oral folklore recounted by village elders, the village was named "Lagdevi" after the sacred deity (Mata Sheetla). Legend recalls that in antiquity, the holy murti was discovered on the "Lag" (sloping highland terrace) where worship first began.'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-950 block">
                  {isHindi ? 'मंदिर का इतिहास:' : 'Shrine Lore & Ancient Forest:'}
                </span>
                <p>
                  {isHindi
                    ? 'स्थानीय लोककथाओं में बताया जाता है कि शीतला माता का यह मंदिर कई सौ वर्ष पुराना है और पहले किसी वनस्थली में स्थापित था। ग्रामीणों के अनुसार देवी ने स्वयं संकेत देकर इस स्थल को चुना था।'
                    : 'Regional folklore narrates that the shrine of Mata Sheetla dates back several centuries, originally consecrated within a peaceful pine grove. Tradition holds that the divine Mother herself revealed this sanctuary.'}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-amber-50/70 border border-amber-200 text-xs text-amber-900 italic flex items-start gap-2">
                <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>
                  {isHindi
                    ? '*नोट: उपर्युक्त कथाएँ स्थानीय लोगों की स्मृति/कहानियों पर आधारित हैं और इनके प्रमाण के लिए अतिरिक्त क्षेत्रीय शोध की आवश्यकता है।*'
                    : '*Note: The accounts above reflect local oral memory and require additional field and archival verification.*'}
                </span>
              </div>
            </div>
          </section>

          {/* ── 5.0 जांच के सुझाव (INVESTIGATION ROADMAP) ── */}
          <section className="space-y-4">
            <h2 className="font-google text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Search className="w-5 h-5 text-amber-700 shrink-0" />
              <span>{isHindi ? '5.0 जांच के सुझाव' : '5.0 Archival Investigation Roadmap'}</span>
            </h2>

            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 list-disc list-inside leading-relaxed pl-1 font-google">
              <li>
                <strong>{isHindi ? 'राजस्व अभिलेख:' : 'Revenue Records:'}</strong>{' '}
                {isHindi
                  ? 'e-Himbhoomi पोर्टल पर जमाबंदी व नक्शा (शजराबनी) देखें। पटवारी रिकॉर्ड या जिला राजस्व कार्यालय में पुराने दस्तावेज़ (‘मौजा’ एवं ‘उपमौजा’ नाम) खंगाले।'
                  : 'Examine Jamabandi and cadastral revenue maps on e-Himbhoomi. Cross-reference Patwari registers and the District Revenue Office for Mauza and Up-Mauza titles.'}
              </li>
              <li>
                <strong>{isHindi ? 'जनगणना एवं सरकारी रिकॉर्ड:' : 'Census & Govt Archives:'}</strong>{' '}
                {isHindi
                  ? '2001 तथा उससे पूर्व की जनगणना तालिका प्राप्त करें। जिला/राज्य अभिलेखागार (Shimla) या कलेक्टर कार्यालय में गाँव से संबंधित रिपोर्ट/गजट देखें।'
                  : 'Retrieve 2001 and pre-independence census tables. Consult historic district reports and gazetteers at the State Archives in Shimla or DC Office Hamirpur.'}
              </li>
              <li>
                <strong>{isHindi ? 'मंदिर अभिलेख:' : 'Shrine Records:'}</strong>{' '}
                {isHindi
                  ? 'स्थानीय मंदिर समिति या पुजारियों से पूछताछ करें; पंचांग/झंडा रिकॉर्ड चेक करें।'
                  : 'Consult temple committee elders and hereditary priests; examine archival Panchang calendars and sacred flag-raising records.'}
              </li>
              <li>
                <strong>{isHindi ? 'लोककथा संग्रह:' : 'Oral Folklore Documentation:'}</strong>{' '}
                {isHindi
                  ? 'गाँव के बुजुर्गों से साक्षात्कार करें (जैसे ब्रम्हदास, विजय आदि संवाद से संकेत मिलते हैं) – पूछें कि मंदिर कब बना, देवी का नाम कैसे जुड़ा, पूर्वज किस क्षेत्र से आए थे आदि।'
                  : 'Conduct structured oral interviews with village elders to document ancestral migration lineages, folk songs, and the historical circumstances of the shrine.'}
              </li>
              <li>
                <strong>{isHindi ? 'स्थानीय प्रशासन:' : 'Local Administration:'}</strong>{' '}
                {isHindi
                  ? 'तहसील कार्यालय, ग्राम पंचायत की बैठक नोट्स, लोक निर्माण, शिक्षा विभाग से साइट-विशेष रिपोर्ट लें।'
                  : 'Obtain official meeting proceedings, Gram Sabha resolutions, and PWD/Education department project logs from the Tehsil and Panchayat offices.'}
              </li>
            </ul>
          </section>

          {/* ── 6.0 प्रमुख स्रोत एवं संदर्भ (REFERENCES) ── */}
          <section className="space-y-4 border-t border-slate-200 pt-8 font-google">
            <h2 className="font-google text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-700 shrink-0" />
              <span>{isHindi ? '6.0 प्रमुख स्रोत एवं संदर्भ' : '6.0 Primary Sources & References'}</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 font-mono">
              <div className="p-2.5 rounded bg-slate-50 border border-slate-200/80 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                <span>{isHindi ? 'भारत 2011 की जनगणना (विलेज लेवल डेटा — ग्राम लेग 62/19)' : 'Census of India 2011 (Village Directory — Village Lag 62/19)'}</span>
              </div>
              <div className="p-2.5 rounded bg-slate-50 border border-slate-200/80 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                <span>{isHindi ? 'जिला हमीरपुर (वीरभूमि) आधिकारिक पोर्टल' : 'District Hamirpur Official Portal (hamirpur.hp.gov.in)'}</span>
              </div>
              <div className="p-2.5 rounded bg-slate-50 border border-slate-200/80 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                <span>{isHindi ? 'भारत सरकार ग्राम पंचायत/ब्लॉक प्रशासकीय निर्देशावली' : 'Panchayati Raj & MGNREGA Directory, Govt of India'}</span>
              </div>
              <div className="p-2.5 rounded bg-slate-50 border border-slate-200/80 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                <span>{isHindi ? 'हिंदुस्तान समाचारपत्र अमर उजाला (हमीरपुर संस्करण)' : 'Amar Ujala Newspaper (Hamirpur Regional Edition Archives)'}</span>
              </div>
              <div className="p-2.5 rounded bg-slate-50 border border-slate-200/80 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                <span>Census2011.co.in & VillageInfo.org</span>
              </div>
              <div className="p-2.5 rounded bg-slate-50 border border-slate-200/80 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                <span>{isHindi ? 'लोककथा-संग्रह (क्षेत्रीय जनश्रुति साक्षात्कार)' : 'Local Folklore Archives (Oral Interviews)'}</span>
              </div>
              <div className="p-2.5 rounded bg-slate-50 border border-slate-200/80 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                <span>{isHindi ? 'HP भू अभिलेख पोर्टल (eHimbhoomi)' : 'HP Land Records Portal (eHimbhoomi Revenue Registry)'}</span>
              </div>
              <div className="p-2.5 rounded bg-slate-50 border border-slate-200/80 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                <span>{isHindi ? 'District Gazetteer तथा स्थानीय पुस्तकें' : 'District Gazetteer Series & Historical Publications'}</span>
              </div>
            </div>
          </section>

          {/* ── CARD FOOTER ── */}
          <footer className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-mono">
            <span>
              {isHindi ? 'रिपोर्ट संकलन: लगदेवी पुरातात्विक व जनसांख्यिकी अभिलेख' : 'Document Compilation: Lagdevi Demographic & Archival Record'}
            </span>
            <span className="font-hindi text-amber-900 font-semibold text-xs">
              ॥ ॐ श्री शीतलायै नमः ॥
            </span>
          </footer>

        </article>

      </div>

    </div>
  );
};
