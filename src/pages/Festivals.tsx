import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  BookOpen,
  Flame,
  CalendarDays,
  UtensilsCrossed,
  Clock,
  Trophy,
  HeartHandshake,
  Sparkles,
  Users,
  CheckCircle2,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import {
  kathaSection,
  jagranSection,
  melaSection,
  bhandaraTimeslots,
} from '../data/festivalsData';
import { UpcomingTempleEvent } from '../components/common/UpcomingTempleEvent';
import { JagranPerformers } from '../components/festivals/JagranPerformers';

const C = {
  ivory: '#fdf8f0',
  ivoryDeep: '#faf3e8',
  maroon: '#5a1a0a',
  maroonDark: '#3d0f06',
  maroonMid: '#7a2c18',
  maroonLight: '#8b3a1a',
  saffron: '#a05020',
  saffronLight: '#c07030',
  gold: '#c8880a',
  earthBrown: '#7a5030',
  mutedBorder: 'rgba(160,80,30,0.15)',
  mutedBorder2: 'rgba(160,80,30,0.25)',
  textBody: '#4a2010',
};

const SectionHeaderTag: React.FC<{
  number: string;
  label: string;
  hindiLabel: string;
  icon: React.ReactNode;
}> = ({ number, label, hindiLabel, icon }) => {
  const { isHindi } = useLanguage();
  return (
    <div className="flex items-center gap-2 mb-2.5">
      <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-800 shadow-2xs">
        <span className="font-mono text-[11px] font-bold text-amber-700">{number}</span>
        <span className="text-amber-600 text-[10px]">✦</span>
        <span className="font-body text-[11px] font-bold uppercase tracking-wider text-amber-900">
          {isHindi ? hindiLabel : label}
        </span>
      </div>
      <div className="w-5 h-5 rounded-full bg-white/80 border border-amber-500/20 flex items-center justify-center text-amber-700 shadow-2xs">
        {icon}
      </div>
    </div>
  );
};

export const Festivals: React.FC = () => {
  const { isHindi } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string>('katha');

  // Smooth scroll progress for the sacred vertical golden thread
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 40%', 'end 80%'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  // Track active section for floating quick-jump pills
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['katha', 'bhandara', 'jagran', 'mela'];
      const scrollPosition = window.scrollY + 250;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 90;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const jumpTabs = [
    {
      id: 'katha',
      label: isHindi ? 'श्रीमद् भागवत कथा' : 'Bhagwat Katha',
      icon: <BookOpen className="w-3.5 h-3.5" />,
    },
    {
      id: 'bhandara',
      label: isHindi ? 'दैनिक भंडारा' : 'Daily Bhandara',
      icon: <UtensilsCrossed className="w-3.5 h-3.5" />,
    },
    {
      id: 'jagran',
      label: isHindi ? 'भव्य माता जागरण' : 'Mata Jagran',
      icon: <Flame className="w-3.5 h-3.5" />,
    },
    {
      id: 'mela',
      label: isHindi ? '22 मई मेला' : '22 May Mela',
      icon: <CalendarDays className="w-3.5 h-3.5" />,
    },
  ];

  return (
    <div className="w-full pt-24 md:pt-28 pb-24" style={{ background: C.ivory }}>
      {/* ─── Hero Header ────────────────────────────────────────── */}
      <section
        className="py-12 md:py-16 px-4 md:px-8 text-center border-b relative overflow-hidden"
        style={{
          background: `linear-gradient(180deg, ${C.ivoryDeep} 0%, ${C.ivory} 100%)`,
          borderColor: C.mutedBorder,
        }}
      >
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 mb-3"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span
              className="font-hindi text-xs md:text-sm font-semibold tracking-wider"
              style={{ color: C.saffron }}
            >
              उत्सव • परंपरा • आस्था
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display font-bold leading-tight"
            style={{ fontSize: 'clamp(1.85rem, 4.5vw, 2.85rem)', color: C.maroon }}
          >
            {isHindi
              ? 'हमारे वार्षिक उत्सव एवं धार्मिक परंपराएँ'
              : 'Annual Festivals & Sacred Traditions'}
          </motion.h1>

          <div className="flex items-center justify-center gap-4 my-4">
            <div className="h-px w-14" style={{ background: C.mutedBorder2 }} />
            <span style={{ color: C.saffronLight, fontSize: '16px' }}>✦</span>
            <div className="h-px w-14" style={{ background: C.mutedBorder2 }} />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-body text-sm md:text-base leading-relaxed max-w-2xl mx-auto"
            style={{ color: C.earthBrown }}
          >
            {isHindi
              ? 'शीतला माता मंदिर, लगदेवी में वर्ष भर आयोजित होने वाले धार्मिक अनुष्ठान, कथा, भंडारे, माता जागरण और वार्षिक मेले हमारी आस्था के साथ-साथ गांव की सामूहिक संस्कृति और परंपराओं का महत्वपूर्ण हिस्सा हैं।'
              : 'The annual celebrations of Sheetla Mata Mandir, Lagdevi are deeply rooted in faith, community service and Himachali tradition. Sacred Kathas, daily Bhandaras, the grand Mata Jagran and the annual village fair bring generations of devotees together in worship, seva and celebration.'}
          </motion.p>
        </div>
      </section>

      {/* ─── Floating Quick-Jump Dock Bar ──────────────────────── */}
      <div className="sticky top-18 z-40 w-full flex justify-center px-3 py-2.5 pointer-events-none">
        <div
          className="pointer-events-auto flex items-center gap-1 sm:gap-1.5 p-1.5 rounded-full bg-white/90 backdrop-blur-2xl border border-amber-900/15 shadow-[0_8px_30px_rgba(90,26,10,0.12)] max-w-full overflow-x-auto hide-scrollbar"
          style={{
            WebkitBackdropFilter: 'blur(20px)',
          }}
        >
          {jumpTabs.map((tab) => {
            const isActive = activeSection === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-google font-semibold transition-all duration-200 whitespace-nowrap active:scale-95 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-b from-slate-800 to-slate-950 text-white shadow-[0_2px_8px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.12)] border border-slate-700'
                    : 'text-stone-700 hover:text-slate-950 hover:bg-slate-100 border border-transparent'
                }`}
              >
                <span className={isActive ? 'text-amber-300' : 'text-amber-700 opacity-80'}>
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── Main Storytelling Container With Dedicated Timeline Track ─── */}
      <div
        ref={containerRef}
        className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pt-6 relative"
      >
        {/* Sacred Golden Thread Track: Positioned cleanly on left edge */}
        <div className="hidden lg:block absolute left-3 xl:left-2 top-12 bottom-28 w-[2px] bg-amber-900/15 rounded-full">
          <motion.div
            style={{ scaleY, transformOrigin: 'top' }}
            className="w-full h-full bg-gradient-to-b from-amber-500 via-amber-600 to-amber-700 shadow-[0_0_10px_rgba(200,136,10,0.6)]"
          />
        </div>

        {/* Inner Content Wrapper: Comfortably Indented to the right of the line */}
        <div className="space-y-14 md:space-y-20 lg:pl-10 xl:pl-12">
          {/* UPCOMING PROGRAMME BANNER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
          >
            <UpcomingTempleEvent />
          </motion.div>

          {/* =========================================================================
              SECTION 01 — Sacred Katha & Bhagwat Mahotsav
          ========================================================================= */}
          <motion.section
            id="katha"
            className="scroll-mt-32 relative"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Timeline Milestone Dot on the Golden Line */}
            <div className="hidden lg:flex absolute -left-10 xl:-left-12 top-1.5 w-6 h-6 rounded-full bg-amber-50 border-2 border-amber-600 items-center justify-center text-amber-700 shadow-sm z-10">
              <span className="w-2 h-2 rounded-full bg-amber-600" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              {/* Image (Compact Portrait — Sized Neatly) */}
              <div className="lg:col-span-5 order-1 flex justify-center">
                {kathaSection.image && (
                  <div
                    className="group relative w-full max-w-[270px] sm:max-w-[290px] md:max-w-[310px] overflow-hidden rounded-2xl border shadow-md transition-all duration-500 hover:shadow-xl hover:border-amber-500/40"
                    style={{
                      aspectRatio: '3 / 4',
                      borderColor: C.mutedBorder2,
                      boxShadow: '0 8px 24px rgba(90, 26, 10, 0.12)',
                      background: 'linear-gradient(160deg, #2a0e06 0%, #3d1a0a 100%)',
                    }}
                  >
                    <img
                      src={kathaSection.image}
                      alt={isHindi ? kathaSection.hindiTitle : kathaSection.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-contain object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                    <div className="absolute bottom-2.5 left-3.5 right-3.5 flex items-center justify-between text-white/90 text-[11px] font-medium">
                      <span className="flex items-center gap-1 font-hindi text-amber-200">
                        <BookOpen className="w-3 h-3 text-amber-300" />
                        श्रीमद्भागवत कथा
                      </span>
                      <span className="text-[10px] font-mono opacity-80 uppercase tracking-widest">
                        Lagdevi Mandir
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="lg:col-span-7 order-2">
                <SectionHeaderTag
                  number="01"
                  label={kathaSection.eyebrow}
                  hindiLabel={kathaSection.hindiEyebrow}
                  icon={<BookOpen className="w-3 h-3" />}
                />

                <h2
                  className="font-display font-bold leading-tight text-xl md:text-2xl lg:text-3xl mb-1"
                  style={{ color: C.maroon }}
                >
                  {isHindi ? kathaSection.hindiTitle : kathaSection.title}
                </h2>
                <p
                  className="font-hindi text-sm md:text-base font-semibold mb-3"
                  style={{ color: C.maroonLight }}
                >
                  {isHindi ? kathaSection.title : kathaSection.hindiTitle}
                </p>

                <div className="h-px w-full my-3" style={{ background: C.mutedBorder2 }} />

                <p
                  className="font-body text-xs md:text-sm leading-relaxed whitespace-pre-line mb-4"
                  style={{ color: C.textBody, lineHeight: '1.75' }}
                >
                  {isHindi ? kathaSection.hindiBody : kathaSection.body}
                </p>

                {/* Information Chips */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {kathaSection.chips.map((chip, idx) => (
                    <span
                      key={idx}
                      className="font-body text-[11px] font-semibold px-2.5 py-1 rounded-full border shadow-2xs flex items-center gap-1 transition-transform hover:-translate-y-0.5"
                      style={{
                        background: C.ivoryDeep,
                        borderColor: C.mutedBorder2,
                        color: C.maroonMid,
                      }}
                    >
                      <CheckCircle2 className="w-3 h-3 text-amber-600 shrink-0" />
                      <span>{isHindi ? chip.hindiLabel : chip.label}</span>
                    </span>
                  ))}
                </div>

                {/* Highlight Metadata Grid (Compact) */}
                <div
                  className="grid grid-cols-2 gap-3 p-3.5 rounded-xl border shadow-2xs"
                  style={{ background: 'rgba(250,243,232,0.7)', borderColor: C.mutedBorder }}
                >
                  {kathaSection.metadata.map((meta, idx) => (
                    <div key={idx} className="border-l-2 pl-2.5" style={{ borderColor: C.saffron }}>
                      <p
                        className="font-body text-[10px] font-bold uppercase tracking-wider flex items-center gap-1"
                        style={{ color: C.saffron }}
                      >
                        <Clock className="w-2.5 h-2.5 text-amber-700" />
                        {isHindi ? meta.hindiLabel : meta.label}
                      </p>
                      <p
                        className="font-body text-xs font-semibold mt-0.5"
                        style={{ color: C.maroon }}
                      >
                        {isHindi ? meta.hindiValue : meta.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          {/* =========================================================================
              Bhandara Daily Seva Section (Compact Feature)
          ========================================================================= */}
          <motion.section
            id="bhandara"
            className="scroll-mt-32 relative"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Timeline Milestone Dot on the Golden Line */}
            <div className="hidden lg:flex absolute -left-10 xl:-left-12 top-1.5 w-6 h-6 rounded-full bg-amber-50 border-2 border-amber-600 items-center justify-center text-amber-700 shadow-sm z-10">
              <span className="w-2 h-2 rounded-full bg-amber-600" />
            </div>

            <div
              className="p-5 md:p-6 rounded-2xl border shadow-sm relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${C.ivoryDeep} 0%, #f4eae0 100%)`,
                borderColor: C.mutedBorder2,
              }}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 relative z-10">
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div className="p-1 rounded bg-amber-500/15 text-amber-800">
                      <UtensilsCrossed className="w-3.5 h-3.5" />
                    </div>
                    <span
                      className="font-body text-[11px] font-bold uppercase tracking-widest"
                      style={{ color: C.saffron }}
                    >
                      {isHindi ? 'कथा के दौरान दैनिक सेवा' : 'Daily Seva During Katha'}
                    </span>
                  </div>
                  <h3
                    className="font-display font-bold text-lg md:text-xl mt-0.5"
                    style={{ color: C.maroon }}
                  >
                    {isHindi ? 'प्रतिदिन भंडारा एवं हिमाचली धाम' : 'Daily Bhandara & Himachali Dham'}
                  </h3>
                  <p className="font-body text-xs md:text-sm mt-1 max-w-lg leading-relaxed" style={{ color: C.earthBrown }}>
                    {isHindi
                      ? 'कथा के दिनों में मंदिर परिसर में श्रद्धालुओं को प्रतिदिन दोपहर 2:00 बजे प्रसाद और शाम 5:00 बजे हिमाचली धाम परोसी जाती है।'
                      : 'Throughout the Katha, blessed Prasad is served daily at 2:00 PM followed by a traditional Himachali Dham community meal at 5:00 PM.'}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                  {bhandaraTimeslots.map((slot, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -2 }}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl border bg-white/80 backdrop-blur-md shadow-2xs transition-all"
                      style={{ borderColor: C.mutedBorder2 }}
                    >
                      <div
                        className="w-9 h-9 rounded-lg flex flex-col items-center justify-center font-display font-bold text-xs text-white shrink-0 shadow-2xs"
                        style={{
                          background: idx === 0 ? C.saffron : C.maroon,
                        }}
                      >
                        <Clock className="w-3 h-3 mb-0.5 opacity-90" />
                        <span className="text-[9px] leading-none">
                          {isHindi ? slot.hindiTime.split(' ')[1] : slot.time.split(' ')[0]}
                        </span>
                      </div>
                      <div>
                        <p
                          className="font-display font-bold text-xs uppercase tracking-wider"
                          style={{ color: C.maroon }}
                        >
                          {isHindi ? slot.hindiTime : slot.time}
                        </p>
                        <p className="font-hindi font-bold text-xs md:text-sm" style={{ color: C.maroonMid }}>
                          {isHindi ? slot.hindiLabel : slot.label}
                        </p>
                        <p className="text-[10.5px] text-stone-500 mt-0.5 max-w-[170px] leading-snug">
                          {isHindi ? slot.hindiSublabel : slot.sublabel}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          {/* =========================================================================
              SECTION 02 — Grand Mata Jagran & Mata Ki Chowki
          ========================================================================= */}
          <motion.section
            id="jagran"
            className="scroll-mt-32 pt-6 border-t relative"
            style={{ borderColor: C.mutedBorder }}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Timeline Milestone Dot on the Golden Line */}
            <div className="hidden lg:flex absolute -left-10 xl:-left-12 top-7 w-6 h-6 rounded-full bg-amber-50 border-2 border-amber-600 items-center justify-center text-amber-700 shadow-sm z-10">
              <span className="w-2 h-2 rounded-full bg-amber-600" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              {/* Content */}
              <div className="lg:col-span-7 order-2 lg:order-1">
                <SectionHeaderTag
                  number="02"
                  label={jagranSection.eyebrow}
                  hindiLabel={jagranSection.hindiEyebrow}
                  icon={<Flame className="w-3 h-3" />}
                />

                <h2
                  className="font-display font-bold leading-tight text-xl md:text-2xl lg:text-3xl mb-1"
                  style={{ color: C.maroon }}
                >
                  {isHindi ? jagranSection.hindiTitle : jagranSection.title}
                </h2>
                <p
                  className="font-hindi text-sm md:text-base font-semibold mb-3"
                  style={{ color: C.maroonLight }}
                >
                  {isHindi ? jagranSection.title : jagranSection.hindiTitle}
                </p>

                <div className="h-px w-full my-3" style={{ background: C.mutedBorder2 }} />

                <p
                  className="font-body text-xs md:text-sm leading-relaxed whitespace-pre-line mb-4"
                  style={{ color: C.textBody, lineHeight: '1.75' }}
                >
                  {isHindi ? jagranSection.hindiBody : jagranSection.body}
                </p>

                {/* Information Chips */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {jagranSection.chips.map((chip, idx) => (
                    <span
                      key={idx}
                      className="font-body text-[11px] font-semibold px-2.5 py-1 rounded-full border shadow-2xs flex items-center gap-1 transition-transform hover:-translate-y-0.5"
                      style={{
                        background: C.ivoryDeep,
                        borderColor: C.mutedBorder2,
                        color: C.maroonMid,
                      }}
                    >
                      <CheckCircle2 className="w-3 h-3 text-amber-600 shrink-0" />
                      <span>{isHindi ? chip.hindiLabel : chip.label}</span>
                    </span>
                  ))}
                </div>

                {/* Highlight Metadata Grid (Compact) */}
                <div
                  className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3.5 rounded-xl border shadow-2xs"
                  style={{ background: 'rgba(250,243,232,0.7)', borderColor: C.mutedBorder }}
                >
                  {jagranSection.metadata.map((meta, idx) => (
                    <div key={idx} className="border-l-2 pl-2.5" style={{ borderColor: C.saffron }}>
                      <p
                        className="font-body text-[10px] font-bold uppercase tracking-wider flex items-center gap-1"
                        style={{ color: C.saffron }}
                      >
                        <Sparkles className="w-2.5 h-2.5 text-amber-700" />
                        {isHindi ? meta.hindiLabel : meta.label}
                      </p>
                      <p
                        className="font-body text-xs font-semibold mt-0.5"
                        style={{ color: C.maroon }}
                      >
                        {isHindi ? meta.hindiValue : meta.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image (Compact Portrait — Sized Neatly) */}
              <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center">
                {jagranSection.image && (
                  <div
                    className="group relative w-full max-w-[270px] sm:max-w-[290px] md:max-w-[310px] overflow-hidden rounded-2xl border shadow-md transition-all duration-500 hover:shadow-xl hover:border-amber-500/40"
                    style={{
                      aspectRatio: '3 / 4',
                      borderColor: C.mutedBorder2,
                      boxShadow: '0 8px 24px rgba(90, 26, 10, 0.12)',
                      background: 'linear-gradient(160deg, #2a0e06 0%, #3d1a0a 100%)',
                    }}
                  >
                    <img
                      src={jagranSection.image}
                      alt={isHindi ? jagranSection.hindiTitle : jagranSection.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-contain object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                    <div className="absolute bottom-2.5 left-3.5 right-3.5 flex items-center justify-between text-white/90 text-[11px] font-medium">
                      <span className="flex items-center gap-1 font-hindi text-amber-200">
                        <Flame className="w-3 h-3 text-amber-400" />
                        भव्य जागरण व चौकी
                      </span>
                      <span className="text-[10px] font-mono opacity-80 uppercase tracking-widest">
                        Yuva Golden Club
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Devotional Jagran Performers Component */}
            <div className="mt-6">
              <JagranPerformers />
            </div>
          </motion.section>

          {/* =========================================================================
              SECTION 03 — Annual Lagdevi Mata Mela — 22 May
          ========================================================================= */}
          <motion.section
            id="mela"
            className="scroll-mt-32 pt-6 border-t relative"
            style={{ borderColor: C.mutedBorder }}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Timeline Milestone Dot on the Golden Line */}
            <div className="hidden lg:flex absolute -left-10 xl:-left-12 top-7 w-6 h-6 rounded-full bg-amber-50 border-2 border-amber-600 items-center justify-center text-amber-700 shadow-sm z-10">
              <span className="w-2 h-2 rounded-full bg-amber-600" />
            </div>

            <div
              className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-lg border"
              style={{
                background: `linear-gradient(135deg, ${C.maroonDark} 0%, ${C.maroon} 50%, ${C.maroonMid} 100%)`,
                borderColor: C.mutedBorder2,
                boxShadow: `0 12px 48px rgba(60,10,2,0.22)`,
              }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                {/* Left Column: Compact 22 MAY Date Badge */}
                <div
                  className="lg:col-span-4 flex flex-col items-center justify-center py-8 px-6 text-center"
                  style={{ borderRight: '1px solid rgba(255,255,255,0.12)' }}
                >
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="flex flex-col items-center justify-center rounded-xl px-7 py-4 mb-3 shadow-inner"
                    style={{
                      background: 'rgba(255,255,255,0.08)',
                      border: '2px solid rgba(255,200,100,0.35)',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    <span
                      className="font-display font-bold leading-none"
                      style={{
                        fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
                        color: '#ffe082',
                        lineHeight: 1,
                      }}
                    >
                      22
                    </span>
                    <span
                      className="font-display font-bold tracking-wider mt-1 uppercase"
                      style={{
                        fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
                        color: 'rgba(255,220,140,0.95)',
                      }}
                    >
                      {isHindi ? 'मई' : 'May'}
                    </span>
                  </motion.div>

                  <p
                    className="font-body text-[11px] font-bold uppercase tracking-[0.2em] mb-0.5 flex items-center gap-1"
                    style={{ color: 'rgba(255,220,140,0.85)' }}
                  >
                    <CalendarDays className="w-3 h-3 text-amber-300" />
                    {isHindi ? 'निश्चित वार्षिक तिथि' : 'Fixed Annual Date'}
                  </p>
                  <p
                    className="font-hindi text-xs font-semibold"
                    style={{ color: 'rgba(255,255,255,0.75)' }}
                  >
                    {isHindi ? 'प्रत्येक वर्ष भव्य आयोजन' : 'Annual Sacred Celebration'}
                  </p>
                </div>

                {/* Right Column: Details & Content */}
                <div className="lg:col-span-8 p-6 md:p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-2">
                    <span style={{ color: '#ffe082', fontSize: '13px' }}>✦</span>
                    <span
                      className="font-body text-[11px] font-bold uppercase tracking-[0.2em]"
                      style={{ color: 'rgba(255,220,140,0.9)' }}
                    >
                      {isHindi ? melaSection.hindiEyebrow : melaSection.eyebrow}
                    </span>
                  </div>

                  <h2 className="font-display font-bold leading-tight text-xl md:text-2xl lg:text-3xl text-white mb-1">
                    {isHindi ? melaSection.hindiTitle : melaSection.title}
                  </h2>
                  <p
                    className="font-hindi text-sm md:text-base font-semibold mb-3"
                    style={{ color: 'rgba(255,220,140,0.85)' }}
                  >
                    {isHindi ? melaSection.title : melaSection.hindiTitle}
                  </p>

                  <div
                    className="h-px w-full my-3"
                    style={{ background: 'rgba(255,255,255,0.15)' }}
                  />

                  <p
                    className="font-body text-xs md:text-sm leading-relaxed whitespace-pre-line mb-5"
                    style={{ color: 'rgba(255,255,255,0.85)', lineHeight: '1.75' }}
                  >
                    {isHindi ? melaSection.hindiBody : melaSection.body}
                  </p>

                  {/* Timing & Attraction Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <div
                      className="rounded-lg p-3 text-center border backdrop-blur-sm"
                      style={{
                        background: 'rgba(255,255,255,0.08)',
                        borderColor: 'rgba(255,200,100,0.25)',
                      }}
                    >
                      <div className="flex items-center justify-center gap-1 mb-0.5 text-white">
                        <Clock className="w-3.5 h-3.5 text-amber-300" />
                        <p className="font-display font-bold text-base">2:00 PM</p>
                      </div>
                      <p
                        className="font-body text-[11px]"
                        style={{ color: 'rgba(255,220,140,0.85)' }}
                      >
                        {isHindi ? 'मेला प्रारंभ' : 'Fair Begins'}
                      </p>
                    </div>

                    <div
                      className="rounded-lg p-3 text-center border backdrop-blur-sm"
                      style={{
                        background: 'rgba(255,255,255,0.08)',
                        borderColor: 'rgba(255,200,100,0.25)',
                      }}
                    >
                      <div className="flex items-center justify-center gap-1 mb-0.5 text-white">
                        <Clock className="w-3.5 h-3.5 text-amber-300" />
                        <p className="font-display font-bold text-base">8:00 PM</p>
                      </div>
                      <p
                        className="font-body text-[11px]"
                        style={{ color: 'rgba(255,220,140,0.85)' }}
                      >
                        {isHindi ? 'समापन' : 'Conclusion'}
                      </p>
                    </div>

                    <div
                      className="rounded-lg p-3 text-center border backdrop-blur-sm"
                      style={{
                        background: 'rgba(255,255,255,0.08)',
                        borderColor: 'rgba(255,200,100,0.25)',
                      }}
                    >
                      <div className="flex items-center justify-center gap-1 mb-0.5 text-amber-200">
                        <Trophy className="w-3.5 h-3.5 text-amber-300" />
                        <p className="font-hindi font-bold text-xs md:text-sm">
                          {isHindi ? 'पारंपरिक कुश्ती दंगल' : 'Kushti / Dangal'}
                        </p>
                      </div>
                      <p
                        className="font-body text-[10px] uppercase font-semibold"
                        style={{ color: 'rgba(255,220,140,0.75)' }}
                      >
                        {isHindi ? 'प्रमुख आकर्षण' : 'Major Attraction'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* =========================================================================
              Generational Seva Footer Card
          ========================================================================= */}
          <motion.section
            id="seva"
            className="pt-2"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="p-6 md:p-8 rounded-2xl md:rounded-3xl border text-center relative overflow-hidden shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${C.maroon} 0%, ${C.maroonMid} 100%)`,
                borderColor: C.mutedBorder2,
                boxShadow: '0 8px 32px rgba(90, 26, 10, 0.22)',
              }}
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 border border-white/20 mb-2.5">
                <Users className="w-3 h-3 text-amber-300" />
                <span className="font-body text-[11px] font-bold uppercase tracking-[0.2em] text-amber-200/90">
                  {isHindi ? 'सामूहिक सेवा एवं परंपरा' : 'Community Seva & Heritage'}
                </span>
              </div>

              <h3 className="font-hindi text-lg md:text-xl lg:text-2xl font-bold text-white mt-1 mb-2">
                "परंपरा वरिष्ठों से मिली, सेवा युवाओं ने आगे बढ़ाई।"
              </h3>
              <p className="font-body text-xs md:text-sm text-amber-100/90 max-w-xl mx-auto leading-relaxed">
                {isHindi
                  ? 'लगदेवी के वरिष्ठजनों के आशीर्वाद और युवा गोल्डन क्लब के समर्पित प्रयासों से मंदिर के समस्त धार्मिक उत्सव भव्यता और श्रद्धा के साथ आयोजित होते हैं।'
                  : 'Guided by the wisdom of village elders and energized by the devotion of Yuva Golden Club, the sacred traditions of Sheetla Mata Mandir continue to thrive across generations.'}
              </p>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};
