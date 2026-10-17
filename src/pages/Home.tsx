import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  HeartHandshake,
  ArrowRight,
  Sparkles,
  Compass,
  Bell,
  CheckCircle2,
  Sun,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { announcementsData } from '../data/announcements';
import { templeData } from '../data/temple';
import { HeroSlideshow } from '../components/home/HeroSlideshow';
import { LatestTempleUpdate } from '../components/common/LatestTempleUpdate';
import { GallerySection } from '../components/common/GallerySection';
import { Button } from '../components/common/Button';

import lagdeviViewImg from '../assets/lagdevi view.webp';
import mandirUnderImg from '../assets/mandir under image.webp';

// Smooth staggered animation variants for Welcome Section
const welcomeContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const welcomeItemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  },
};

export const Home: React.FC = () => {
  const { t, isHindi } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="w-full bg-[#fdfbf9] text-slate-900 selection:bg-amber-500/20 selection:text-amber-900 overflow-x-hidden">
      
      {/* ══════════════════════════════════════════════════════════════
          ZONE 1: CINEMATIC HERO & REAL-TIME TEMPLE PULSE
         ══════════════════════════════════════════════════════════════ */}
      <HeroSlideshow />

      {/* Latest Notice Pill */}
      <LatestTempleUpdate />

      {/* ══════════════════════════════════════════════════════════════
          ZONE 2: DAILY DIVINE EXPERIENCE BENTO (PERFECT 3-PILLAR GRID)
         ══════════════════════════════════════════════════════════════ */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 max-w-[1240px] mx-auto w-full">
        <motion.div
          variants={welcomeContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* Section Intro with Smooth Entrance Animations */}
          <div className="flex flex-col items-start mb-8 sm:mb-10">
            <motion.div
              variants={welcomeItemVariants}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-500/25 text-amber-900 text-[11px] font-mono uppercase tracking-wider mb-2.5 bg-amber-50/70 backdrop-blur-xs shadow-2xs"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold">{isHindi ? 'दैनिक दर्शन एवं समय' : 'DAILY DARSHAN & TIMINGS'}</span>
            </motion.div>
            
            <motion.h2 
              variants={welcomeItemVariants}
              className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight"
            >
              {t.home.welcomeHeading}
            </motion.h2>

            <motion.div
              variants={welcomeItemVariants}
              className="w-14 h-1 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-200 rounded-full mt-2.5 mb-1"
            />

            <motion.p 
              variants={welcomeItemVariants}
              className="text-xs md:text-sm text-slate-600 max-w-xl mt-1 leading-relaxed"
            >
              {t.home.welcomeText}
            </motion.p>
          </div>

          {/* ── 3 ALTERNATING ZIG-ZAG SHOWCASES (LEFT-RIGHT FORMAT) ── */}
          <div className="space-y-12 sm:space-y-16 md:space-y-20">
            {/* ── ROW 1: TODAY'S AARTI & DARSHAN TIMINGS ── */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-16">
              {/* Visual Card (Left) */}
              <motion.div
                variants={welcomeItemVariants}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="w-full lg:w-1/2 flex items-center justify-center"
              >
                <div className="w-full max-w-[440px] bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-sm hover:border-amber-400/50 hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 rounded-xl border border-amber-300/80 flex items-center justify-center text-amber-800 bg-amber-50 shadow-xs">
                      <Sun className="w-5 h-5 stroke-[2]" />
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-body font-bold bg-emerald-600 text-white px-3 py-1 rounded-full shadow-xs ring-2 ring-emerald-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      <span>{isHindi ? 'नित्य दर्शन' : 'Open Daily'}</span>
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs sm:text-sm py-2 px-3 rounded-xl bg-[#fdfbf9] border border-slate-100">
                      <span className="text-slate-600 font-medium">
                        {isHindi ? 'प्रातः आरती (Morning Aarti)' : 'Morning Aarti'}
                      </span>
                      <span className="font-mono font-bold text-slate-900 text-sm sm:text-base">
                        {templeData.morningAarti}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs sm:text-sm py-2 px-3 rounded-xl bg-[#fdfbf9] border border-slate-100">
                      <span className="text-slate-600 font-medium">
                        {isHindi ? 'संध्या आरती (Evening Aarti)' : 'Evening Aarti'}
                      </span>
                      <span className="font-mono font-bold text-slate-900 text-sm sm:text-base">
                        {templeData.eveningAarti}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs sm:text-sm py-2 px-3 rounded-xl bg-[#fdfbf9] border border-slate-100">
                      <span className="text-slate-600 font-medium">
                        {isHindi ? 'दर्शन समय (Darshan Hours)' : 'Darshan Hours'}
                      </span>
                      <span className="font-mono font-bold text-amber-800 text-xs sm:text-sm">
                        {isHindi ? 'प्रातः 4:00 - रात्रि 9:00' : '4:00 AM - 9:00 PM'}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Unboxed Editorial Text (Right) */}
              <motion.div
                variants={welcomeItemVariants}
                className="w-full lg:w-1/2 flex flex-col items-start justify-center text-left"
              >
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider font-semibold bg-amber-500/10 text-amber-900 border border-amber-500/25 mb-3">
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  <span>{isHindi ? 'दैनिक आरती • DAILY AARTI' : 'DAILY AARTI & TIMINGS'}</span>
                </div>

                <h3 className="font-google text-xl sm:text-2xl md:text-3xl font-bold text-slate-950 tracking-tight leading-snug mb-2.5 sm:mb-3">
                  {isHindi ? 'दैनिक आरती एवं पावन दर्शन समय' : 'Daily Aarti & Sacred Darshan Hours'}
                </h3>

                <p className="font-google text-sm sm:text-base text-slate-600 leading-[1.7] mb-5 font-normal">
                  {isHindi
                    ? 'माता रानी की नित्य प्रातः एवं संध्या आरती में सम्मिलित होकर अखंड पावन ज्योत के दर्शन करें और दिव्य आशीर्वाद प्राप्त करें।'
                    : 'Participate in the auspicious daily morning and evening Aarti to experience the divine presence, inner peace and consecrated blessings.'}
                </p>

                <div className="space-y-2 mb-6 w-full">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-google font-medium text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{isHindi ? `प्रातः आरती: सुबह ${templeData.morningAarti} बजे` : `Morning Aarti: ${templeData.morningAarti}`}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-google font-medium text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{isHindi ? `संध्या आरती: शाम ${templeData.eveningAarti} बजे` : `Evening Aarti: ${templeData.eveningAarti}`}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-google font-medium text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{isHindi ? 'दर्शन समय: प्रातः 4:00 से रात्रि 9:00 बजे प्रतिदिन' : 'Darshan Hours: 4:00 AM to 9:00 PM daily'}</span>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="md"
                  onClick={() => navigate('/visit')}
                  icon={<ArrowRight className="w-4 h-4 text-amber-300" />}
                  className="w-full sm:w-auto"
                >
                  {isHindi ? 'विस्तृत समय सारिणी देखें' : 'View Full Darshan Schedule'}
                </Button>
              </motion.div>
            </div>

            {/* ── ROW 2: SACRED INNER SANCTUM & AKHAND JYOTI ── */}
            <div className="flex flex-col lg:flex-row-reverse items-center justify-between gap-6 sm:gap-8 lg:gap-16">
              {/* Visual Card (Right) */}
              <motion.div
                variants={welcomeItemVariants}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="w-full lg:w-1/2 flex items-center justify-center"
              >
                <div className="w-full max-w-[440px] bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:border-amber-400/50 hover:shadow-md transition-all group">
                  <div className="relative h-52 sm:h-64 overflow-hidden">
                    <img
                      src={mandirUnderImg}
                      alt="Sacred Inner Sanctum"
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                      <span className="text-[11px] font-mono tracking-widest uppercase bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                        {isHindi ? 'पावन गर्भगृह' : 'INNER SANCTUM'}
                      </span>
                      <span className="text-xs font-mono text-amber-300 font-semibold">
                        {isHindi ? 'प्राचीन सिद्ध पीठ' : 'Ancient Shrine'}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Unboxed Editorial Text (Left) */}
              <motion.div
                variants={welcomeItemVariants}
                className="w-full lg:w-1/2 flex flex-col items-start justify-center text-left"
              >
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider font-semibold bg-amber-500/10 text-amber-900 border border-amber-500/25 mb-3">
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  <span>{isHindi ? 'पावन गर्भगृह • ANCIENT SHRINE' : 'AKHAND JYOTI & DEVOTION'}</span>
                </div>

                <h3 className="font-google text-xl sm:text-2xl md:text-3xl font-bold text-slate-950 tracking-tight leading-snug mb-2.5 sm:mb-3">
                  {isHindi ? 'अखंड पावन ज्योति एवं जाग्रत स्वरूप' : 'Eternal Akhand Jyoti & Living Sanctum'}
                </h3>

                <p className="font-google text-sm sm:text-base text-slate-600 leading-[1.7] mb-5 font-normal">
                  {isHindi
                    ? 'सदियों से अनवरत प्रज्वलित अखंड ज्योति और वैदिक मंत्रोच्चार से गुंजायमान यह पावन गर्भगृह भक्तों को अपार शांति, आत्मिक ऊर्जा और अभय प्रदान करता है।'
                    : 'Centuries of living prayer, consecrated Vedic rituals and eternal peace radiate from the sanctum sanctorum where the holy flame burns continuously.'}
                </p>

                <div className="space-y-2 mb-6 w-full">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-google font-medium text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{isHindi ? 'सदियों से अनवरत प्रज्वलित अखंड पावन ज्योति' : 'Centuries-old continuously burning Akhand Jyoti'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-google font-medium text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{isHindi ? 'पारंपरिक हिमाचली काष्ठ-शिल्प से अलंकृत गर्भगृह' : 'Sacred sanctum adorned with Himachali woodwork'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-google font-medium text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{isHindi ? 'सिद्ध कुलदेवी का जाग्रत व कल्याणकारी स्वरूप' : 'Living presence of Kuldevi Mata Sheetla'}</span>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="md"
                  onClick={() => navigate('/about')}
                  icon={<ArrowRight className="w-4 h-4 text-amber-300" />}
                  className="w-full sm:w-auto"
                >
                  {isHindi ? 'मंदिर इतिहास एवं महिमा पढ़ें' : 'Read Sacred Lore & History'}
                </Button>
              </motion.div>
            </div>

            {/* ── ROW 3: TEMPLE LOCATION & ACCESSIBILITY ── */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-16">
              {/* Visual Card (Left) */}
              <motion.div
                variants={welcomeItemVariants}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="w-full lg:w-1/2 flex items-center justify-center"
              >
                <div className="w-full max-w-[440px] bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-sm hover:border-amber-400/50 hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl border border-slate-900/80 flex items-center justify-center text-slate-900 bg-[#fdfbf9]">
                      <Compass className="w-5 h-5 stroke-[1.75]" />
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                      <ShieldCheck className="w-4 h-4 text-amber-600" />
                      <span>24×7 CCTV Secured</span>
                    </div>
                  </div>

                  <div className="font-google font-bold text-base sm:text-lg text-slate-900 mb-1">
                    {templeData.name}
                  </div>
                  <div className="text-xs text-slate-500 font-mono mb-4">
                    {templeData.location}, {templeData.state} • {templeData.pincode}
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#fdfbf9] border border-slate-200/80 text-xs text-slate-700 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-slate-900">
                      <MapPin className="w-3.5 h-3.5 text-amber-600" />
                      <span>{isHindi ? 'सड़क मार्ग से सुगम पहुंच' : 'Direct Road Accessibility'}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 pl-5">
                      {isHindi ? 'टौणी देवी से मात्र 8 किमी की दूरी • पक्की सड़क' : 'Just 8 km from Tauni Devi • All-weather paved road'}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Unboxed Editorial Text (Right) */}
              <motion.div
                variants={welcomeItemVariants}
                className="w-full lg:w-1/2 flex flex-col items-start justify-center text-left"
              >
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider font-semibold bg-amber-500/10 text-amber-900 border border-amber-500/25 mb-3">
                  <MapPin className="w-3 h-3 text-amber-600" />
                  <span>{isHindi ? 'सुगम मार्ग • LOCATION & REACH' : 'LOCATION & DIRECTIONS'}</span>
                </div>

                <h3 className="font-google text-xl sm:text-2xl md:text-3xl font-bold text-slate-950 tracking-tight leading-snug mb-2.5 sm:mb-3">
                  {isHindi ? 'शीतला माता मंदिर लगदेवी (हमीरपुर)' : 'Temple Location & Sacred Reach'}
                </h3>

                <p className="font-google text-sm sm:text-base text-slate-600 leading-[1.7] mb-5 font-normal">
                  {isHindi
                    ? 'हमीरपुर जिले के तौणी देवी तहसील के अंतर्गत लगदेवी गाँव की सुरम्य प्राकृतिक वादियों में स्थित, जहाँ पक्की सड़क मार्ग द्वारा आसानी से पहुँचा जा सकता है।'
                    : 'Nestled in the serene pine-covered valleys of Hamirpur near Tauni Devi, easily accessible by road from major transit points.'}
                </p>

                <div className="space-y-2 mb-6 w-full">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-google font-medium text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{isHindi ? 'टौणी देवी (बमसन) से मात्र 8 किमी की दूरी' : 'Just 8 km from Tauni Devi (Bamsan)'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-google font-medium text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{isHindi ? 'हमीरपुर मुख्य बस स्टैंड से नियमित आवागमन' : 'Regular connectivity from Hamirpur Bus Stand'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-google font-medium text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{isHindi ? '24×7 सुरक्षित परिसर एवं सुगम वाहन पार्किंग' : '24×7 secured premises & convenient vehicle parking'}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => window.open(templeData.mapDirectionsUrl, '_blank')}
                    icon={<ExternalLink className="w-4 h-4 text-amber-300" />}
                    className="w-full sm:w-auto"
                  >
                    {t.common.getDirections}
                  </Button>

                  <Button
                    variant="ghost"
                    size="md"
                    onClick={() => navigate('/visit')}
                    className="w-full sm:w-auto border-slate-300 hover:border-slate-900"
                  >
                    {t.nav.visit}
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          ZONE 3: HERITAGE & VILLAGE LAGDEVI SHOWCASE
         ══════════════════════════════════════════════════════════════ */}
      <section className="py-12 sm:py-16 md:py-20 bg-white border-y border-slate-200/80 px-4 sm:px-6 max-w-[1240px] mx-auto w-full">
        <motion.div
          variants={welcomeContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* Section Intro */}
          <div className="flex flex-col items-start mb-8 sm:mb-12">
            <motion.div
              variants={welcomeItemVariants}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-500/25 text-amber-900 text-[11px] font-mono uppercase tracking-wider mb-2.5 bg-amber-50/70 backdrop-blur-xs shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span className="font-semibold">{isHindi ? 'गाँव की धरोहर एवं संस्कृति' : 'COMMUNITY & VILLAGE HERITAGE'}</span>
            </motion.div>
            
            <motion.h2 
              variants={welcomeItemVariants}
              className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight"
            >
              {isHindi ? 'पवित्र लगदेवी गाँव की प्राकृतिक छटा एवं आत्मीय सौहार्द' : 'Living Heritage of Scenic Village Lagdevi'}
            </motion.h2>

            <motion.div
              variants={welcomeItemVariants}
              className="w-14 h-1 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-200 rounded-full mt-2.5 mb-1"
            />

            <motion.p 
              variants={welcomeItemVariants}
              className="text-xs md:text-sm text-slate-600 max-w-xl mt-1 leading-relaxed"
            >
              {isHindi
                ? 'चीड़ के सुरम्य वनों में बसी देवभूमि की समृद्ध संस्कृति, ऐतिहासिक परंपराएं एवं निस्वार्थ ग्रामीण आतिथ्य।'
                : 'Immerse in the timeless Pahadi culture, pine-covered mountain trails, and ancient traditions nestled in the heart of Himachal.'}
            </motion.p>
          </div>

          {/* ── ROW 4: VILLAGE LAGDEVI HERITAGE (TEXT LEFT, VISUAL RIGHT) ── */}
          <div className="flex flex-col lg:flex-row-reverse items-center justify-between gap-6 sm:gap-8 lg:gap-16">
            {/* Visual Card (Right) */}
            <motion.div
              variants={welcomeItemVariants}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="w-full lg:w-1/2 flex items-center justify-center"
            >
              <div className="w-full max-w-[440px] bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:border-amber-400/50 hover:shadow-md transition-all group">
                <div className="relative h-52 sm:h-64 overflow-hidden">
                  <img
                    src={lagdeviViewImg}
                    alt="Village Lagdevi Landscape"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                    <span className="text-[11px] font-mono tracking-widest uppercase bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                      {isHindi ? '📍 सुरम्य लगदेवी घाटी' : '📍 Scenic Lagdevi Valley'}
                    </span>
                    <span className="text-xs font-mono text-amber-300 font-semibold">
                      {isHindi ? 'हमीरपुर, हि.प्र.' : 'Hamirpur, HP'}
                    </span>
                  </div>
                </div>
                <div className="p-4 sm:p-5 bg-white border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <span className="font-google font-medium text-slate-700">
                    {isHindi ? 'चीड़ के सुरम्य वन एवं शांति' : 'Pine Forests & Alpine Trails'}
                  </span>
                  <span className="font-mono text-amber-800 font-semibold">
                    ~1,100m Altitude
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Unboxed Editorial Text (Left) */}
            <motion.div
              variants={welcomeItemVariants}
              className="w-full lg:w-1/2 flex flex-col items-start justify-center text-left"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider font-semibold bg-amber-500/10 text-amber-900 border border-amber-500/25 mb-3">
                <Sparkles className="w-3 h-3 text-amber-600" />
                <span>{isHindi ? 'सामुदायिक संस्कृति • COMMUNITY & CULTURE' : 'COMMUNITY & CULTURE • VILLAGE LAGDEVI'}</span>
              </div>

              <h3 className="font-google text-xl sm:text-2xl md:text-3xl font-bold text-slate-950 tracking-tight leading-snug mb-2.5 sm:mb-3">
                {isHindi ? 'हमारा सुरम्य गाँव लगदेवी' : 'Our Village Lagdevi Heritage'}
              </h3>

              <p className="font-google text-sm sm:text-base text-slate-600 leading-[1.7] mb-5 font-normal">
                {isHindi
                  ? 'चीड़ के सुरम्य वनों और शांत हिमालयी वादियों में बसा लगदेवी गाँव—प्राचीन परंपराओं, आत्मीय सौहार्द और देवभूमि की समृद्ध पहाड़ी संस्कृति का पावन संगम है।'
                  : 'Surrounded by pine forests and scenic Himalayan valleys, Village Lagdevi is a living tapestry of ancient traditions, pure mountain air, and warm Pahadi hospitality.'}
              </p>

              <div className="space-y-2 mb-6 w-full">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-google font-medium text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{isHindi ? 'सुरम्य चीड़ के वनों व हिमालयी प्राकृतिक वादियों से आच्छादित' : 'Nestled amidst fragrant pine forests & scenic mountain valleys'}</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-google font-medium text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{isHindi ? 'शताब्दियों पुरानी जीवित पहाड़ी लोक परंपराएं, आस्था व सौहार्द' : 'Centuries-old living Pahadi folklore, deep faith & harmony'}</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-google font-medium text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{isHindi ? 'तौणी देवी से मात्र 5 किमी की दूरी पर आध्यात्मिक शांति का केंद्र' : 'Just 5 km from Tauni Devi • Peaceful spiritual atmosphere'}</span>
                </div>
              </div>

              <Button
                variant="primary"
                size="md"
                onClick={() => navigate('/village')}
                icon={<ArrowRight className="w-4 h-4 text-amber-300" />}
                className="w-full sm:w-auto"
              >
                {t.common.discoverVillage}
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          CURATED GALLERY PREVIEW
         ══════════════════════════════════════════════════════════════ */}
      <GallerySection />

      {/* ══════════════════════════════════════════════════════════════
          ZONE 4: DEVOTEE SEVA (DONATION) & REAL-TIME NOTICE SHOWCASES
         ══════════════════════════════════════════════════════════════ */}
      <section className="py-12 sm:py-16 md:py-20 bg-[#fdfbf9] px-4 sm:px-6 max-w-[1240px] mx-auto w-full">
        <motion.div
          variants={welcomeContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* Section Intro */}
          <div className="flex flex-col items-start mb-8 sm:mb-12">
            <motion.div
              variants={welcomeItemVariants}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-500/25 text-amber-900 text-[11px] font-mono uppercase tracking-wider mb-2.5 bg-amber-50/70 backdrop-blur-xs shadow-2xs"
            >
              <HeartHandshake className="w-3.5 h-3.5 text-amber-600" />
              <span className="font-semibold">{isHindi ? 'पावन सेवा एवं मंदिर सूचनाएं' : 'DEVOTEE SEVA & LIVE UPDATES'}</span>
            </motion.div>
            
            <motion.h2 
              variants={welcomeItemVariants}
              className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight"
            >
              {isHindi ? 'श्रद्धालु सेवा सहयोग एवं ताज़ा मंदिर घोषणाएं' : 'Devotee Seva & Official Mandir Updates'}
            </motion.h2>

            <motion.div
              variants={welcomeItemVariants}
              className="w-14 h-1 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-200 rounded-full mt-2.5 mb-1"
            />

            <motion.p 
              variants={welcomeItemVariants}
              className="text-xs md:text-sm text-slate-600 max-w-xl mt-1 leading-relaxed"
            >
              {isHindi
                ? 'मंदिर के विकास व नित्य लंगर सेवा में अपनी श्रद्धा अनुसार योगदान दें और मंदिर प्रबंधकारिणी समिति की आधिकारिक घोषणाओं से जुड़े रहें।'
                : 'Contribute to daily Langar prasad and temple preservation while staying informed with real-time official temple announcements.'}
            </motion.p>
          </div>

          {/* ── 2 ALTERNATING SHOWCASE ROWS (DONATION & NOTICES) ── */}
          <div className="space-y-12 sm:space-y-16 md:space-y-20">
            {/* ── ROW 8: OFFICIAL TEMPLE DONATION & SEVA (TEXT LEFT, VISUAL RIGHT) ── */}
            <div className="flex flex-col lg:flex-row-reverse items-center justify-between gap-6 sm:gap-8 lg:gap-16">
              {/* Visual Card (Right) */}
              <motion.div
                variants={welcomeItemVariants}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="w-full lg:w-1/2 flex items-center justify-center"
              >
                <div className="w-full max-w-[440px] bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-sm hover:border-amber-400/50 hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl border border-amber-300/80 flex items-center justify-center text-amber-800 bg-amber-50 shadow-xs">
                      <HeartHandshake className="w-5 h-5 stroke-[1.75]" />
                    </div>
                    <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 font-semibold inline-flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                      Official Trust Account
                    </span>
                  </div>

                  <div className="font-google font-bold text-base sm:text-lg text-slate-900 mb-0.5">
                    MANAGING COMMITTEE SITTA TAMPLE
                  </div>
                  <div className="text-xs text-slate-500 font-mono mb-4">
                    UCO Bank • Tauni Devi Branch (Hamirpur)
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#fdfbf9] border border-slate-200/80 mb-3 space-y-1">
                    <div className="text-[11px] font-mono uppercase text-slate-500 font-semibold">
                      Official Temple UPI ID
                    </div>
                    <div className="font-mono font-bold text-xs sm:text-base text-slate-900 break-all select-all">
                      sittatample8577@ucobank
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-600 px-1">
                    <span className="inline-flex items-center gap-1.5 text-emerald-700 font-medium font-google">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      100% Direct Bank Transfer
                    </span>
                    <span className="font-mono text-slate-400 text-[11px]">No Intermediary</span>
                  </div>
                </div>
              </motion.div>

              {/* Unboxed Editorial Text (Left) */}
              <motion.div
                variants={welcomeItemVariants}
                className="w-full lg:w-1/2 flex flex-col items-start justify-center text-left"
              >
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider font-semibold bg-amber-500/10 text-amber-900 border border-amber-500/25 mb-3">
                  <HeartHandshake className="w-3 h-3 text-amber-600" />
                  <span>{isHindi ? 'पावन सेवा • SACRED CONTRIBUTIONS' : 'DEVOTEE SEVA • TEMPLE DEVELOPMENT'}</span>
                </div>

                <h3 className="font-google text-xl sm:text-2xl md:text-3xl font-bold text-slate-950 tracking-tight leading-snug mb-2.5 sm:mb-3">
                  {isHindi ? 'मंदिर विकास एवं नित्य लंगर सेवा सहयोग' : 'Temple Development & Langar Seva'}
                </h3>

                <p className="font-google text-sm sm:text-base text-slate-600 leading-[1.7] mb-5 font-normal">
                  {isHindi
                    ? 'समस्त दान राशि सीधे मंदिर प्रबंधकारिणी समिति के आधिकारिक UCO बैंक खाते में जमा होती है। नित्य लंगर, गौ-सेवा व मंदिर जीर्णोद्धार में अपनी इच्छानुसार सहयोग करें।'
                    : 'All contributions directly credit the official Temple Managing Committee UCO Bank account. Support daily Langar, Gau Seva, and temple preservation as per your devotion.'}
                </p>

                <div className="space-y-2 mb-6 w-full">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-google font-medium text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{isHindi ? '100% सीधे मंदिर प्रबंधकारिणी समिति के बैंक खाते में' : '100% direct credit to Temple Managing Committee bank account'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-google font-medium text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{isHindi ? 'नित्य निःशुल्क महाप्रसाद लंगर एवं गौ-सेवा में पूर्ण सदुपयोग' : 'Dedicated to daily Langar Mahaprasad & Gau Seva'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-google font-medium text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{isHindi ? 'पारदर्शी प्रबंधन एवं तुरंत डिजिटल पावती/रसीद उपलब्ध' : 'Transparent governance with instant digital receipt acknowledgement'}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => navigate('/donate')}
                    icon={<HeartHandshake className="w-4 h-4 text-amber-300" />}
                    className="w-full sm:w-auto"
                  >
                    {t.donation.ctaHeroBtn}
                  </Button>

                  <Button
                    variant="ghost"
                    size="md"
                    onClick={() => navigate('/contact')}
                    className="w-full sm:w-auto border-slate-300 hover:border-slate-900"
                  >
                    {t.nav.contact}
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* ── ROW 9: REAL-TIME TEMPLE NOTICES & ANNOUNCEMENTS (VISUAL LEFT, TEXT RIGHT) ── */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-16">
              {/* Visual Card (Left) */}
              <motion.div
                variants={welcomeItemVariants}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="w-full lg:w-1/2 flex items-center justify-center"
              >
                <div className="w-full max-w-[440px] bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-sm hover:border-amber-400/50 hover:shadow-md transition-all">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl border border-slate-300 flex items-center justify-center text-slate-700 bg-[#fdfbf9]">
                        <Bell className="w-4 h-4 text-amber-600" />
                      </div>
                      <h4 className="font-google font-bold text-sm sm:text-base text-slate-900">
                        {isHindi ? 'ताज़ा मंदिर सूचनाएं' : 'Live Mandir Notices'}
                      </h4>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>

                  <div className="space-y-3">
                    {announcementsData.slice(1, 3).map((item) => (
                      <div
                        key={item.id}
                        className="bg-[#fdfbf9] p-3 rounded-2xl border border-slate-100 hover:border-amber-400/40 transition-colors"
                      >
                        <div className="flex justify-between items-center text-[10.5px] text-amber-800 font-semibold mb-1">
                          <span className="font-mono">{isHindi ? item.hindiDate : item.date}</span>
                          <span className="px-2 py-0.5 bg-amber-50 text-amber-900 rounded-full text-[9px] uppercase font-mono border border-amber-200/60">
                            {item.type}
                          </span>
                        </div>
                        <h5 className="font-google font-bold text-xs sm:text-sm text-slate-900">
                          {isHindi ? item.hindiTitle : item.title}
                        </h5>
                        <p className="text-[11.5px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                          {isHindi ? item.hindiDescription : item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Unboxed Editorial Text (Right) */}
              <motion.div
                variants={welcomeItemVariants}
                className="w-full lg:w-1/2 flex flex-col items-start justify-center text-left"
              >
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider font-semibold bg-amber-500/10 text-amber-900 border border-amber-500/25 mb-3">
                  <Bell className="w-3 h-3 text-amber-600" />
                  <span>{isHindi ? 'आधिकारिक सूचनाएं • OFFICIAL NOTICES' : 'OFFICIAL NOTICES • MANDIR UPDATES'}</span>
                </div>

                <h3 className="font-google text-xl sm:text-2xl md:text-3xl font-bold text-slate-950 tracking-tight leading-snug mb-2.5 sm:mb-3">
                  {isHindi ? 'आधिकारिक मंदिर सूचनाएं एवं समय परिवर्तन' : 'Official Notices & Mandir Updates'}
                </h3>

                <p className="font-google text-sm sm:text-base text-slate-600 leading-[1.7] mb-5 font-normal">
                  {isHindi
                    ? 'मंदिर प्रबंधकारिणी समिति द्वारा जारी आगामी धार्मिक अनुष्ठानों, विशेष पूजा तिथियों, विशाल भंडारा आयोजनों और आरती समय के संबंध में प्रामाणिक सूचनाएं प्राप्त करें।'
                    : 'Stay informed with authentic real-time updates regarding upcoming Vedic rituals, auspicious festive dates, community feasts, and seasonal Aarti timings.'}
                </p>

                <div className="space-y-2 mb-6 w-full">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-google font-medium text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{isHindi ? 'आगामी विशेष पूजा, अनुष्ठान व शत चंडी महायज्ञ कार्यक्रम' : 'Upcoming Vedic Pujas, Chandi Path & Yajna schedules'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-google font-medium text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{isHindi ? 'ग्रीष्म/शीतकालीन आरती समय परिवर्तन की त्वरित सूचना' : 'Real-time notifications for seasonal Aarti timing adjustments'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-google font-medium text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{isHindi ? 'समस्त ग्रामवासियों एवं श्रद्धालुओं के लिए प्रामाणिक घोषणाएं' : 'Official announcements directly from Mandir Committee'}</span>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="md"
                  onClick={() => navigate('/festivals')}
                  icon={<ArrowRight className="w-4 h-4 text-amber-300" />}
                  className="w-full sm:w-auto"
                >
                  {isHindi ? 'सभी पावन सूचनाएं देखें' : 'View All Notices & Updates'}
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

    </div>
  );
};
