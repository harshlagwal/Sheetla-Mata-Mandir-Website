import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Compass, Shield, Users, Landmark, Clock, Sparkles } from 'lucide-react';
import { TempleHistoryStone } from '../components/about/TempleHistoryStone';
import { SectionReveal } from '../components/motion/SectionReveal';
import { MotionCard } from '../components/motion/MotionCard';
import { LotusWatermark } from '../components/common/LotusWatermark';

export const About: React.FC = () => {
  const { t, isHindi } = useLanguage();

  const timelineItems = [
    {
      year: "Ancestral Era",
      hindiYear: "प्राचीन काल",
      title: "Consecration of Sacred Shrine",
      hindiTitle: "पवित्र स्थान की स्थापना",
      desc: "Sacred shrine sanctified in Village Lagdevi as a place of refuge and divine grace.",
      hindiDesc: "ग्राम लगदेवी में भक्ति, सुरक्षा और कृपा का पावन धाम स्थापित।",
    },
    {
      year: "Architectural Tradition",
      hindiYear: "वास्तुकला परंपरा",
      title: "Himachali Wood & Stone Work",
      hindiTitle: "हिमाचली काष्ठ एवं पाषाण निर्माण",
      desc: "Local artisans constructed the slate roof structure and hand-carved cedar wooden eaves.",
      hindiDesc: "स्थानीय कारीगरों द्वारा देवदार की नक्काशीदार लकड़ी और स्लेट छत का निर्माण।",
    },
    {
      year: "Community Bhandara",
      hindiYear: "सामूहिक भंडारा",
      title: "Preservation of Village Feasts",
      hindiTitle: "सामूहिक महाप्रसाद परंपरा",
      desc: "Annual Bhandara celebrations established uniting families from surrounding hill settlements.",
      hindiDesc: "आस-पास की पहाड़ियों के श्रद्धालुओं के लिए वार्षिक भंडारे की शुरुआत।",
    },
    {
      year: "Present Day",
      hindiYear: "वर्तमान काल",
      title: "Digital Mandir Home",
      hindiTitle: "डिजिटल मंदिर परिसर",
      desc: "Preserving authentic heritage while connecting devotees globally through official digital presence.",
      hindiDesc: "प्रामाणिक विरासत को संजोते हुए दुनिया भर के श्रद्धालुओं के लिए डिजिटल धाम।",
    },
  ];

  return (
    <div className="relative w-full max-w-full pt-28 pb-20 bg-[#fdfbf9] text-slate-900 overflow-x-hidden">
      {/* ── HERO BANNER ── */}
      <SectionReveal className="relative py-12 md:py-16 px-6 max-w-[1240px] mx-auto text-center border-b border-slate-200/80 mb-12 overflow-hidden">
        <LotusWatermark position="top-right" size="lg" opacity={0.05} />
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded border border-slate-300 text-slate-700 text-[10.5px] font-mono uppercase tracking-wider mb-3 bg-white">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>TEMPLE HERITAGE & ORIGINS</span>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
          {t.about.heroTitle}
        </h1>
        <p className="font-body text-xs sm:text-sm md:text-base text-slate-600 max-w-2xl mx-auto mt-3 leading-relaxed">
          {t.about.heroSubtitle}
        </p>
      </SectionReveal>

      {/* ── MAIN CONTENT GRID ── */}
      <section className="max-w-[1240px] mx-auto px-6 space-y-20">
        
        {/* Section 1: The Authentic Ancient Shilalekh Stone Inscription (Exact Screenshot Look) */}
        <div className="w-full bg-[#0b0c0b] text-[#f1ece1] rounded-3xl py-12 px-4 sm:px-8 border border-[#282b28] relative overflow-hidden shadow-2xl">
          <LotusWatermark position="bottom-right" size="lg" opacity={0.16} />
          <LotusWatermark position="bottom-left" size="lg" opacity={0.16} mirrored />
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              background: 'radial-gradient(circle at 50% 15%, rgba(223, 190, 125, 0.08) 0%, rgba(23, 24, 23, 0) 70%)',
            }}
          />
          <div className="relative z-10">
            <TempleHistoryStone />
          </div>
        </div>

        {/* Section 2: Four Pillars (Antigravity Sharp Boxed Icon Style) */}
        <SectionReveal>
          <div className="mb-8 text-left">
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-800 font-bold block mb-1">
              SACRED FOUNDATION
            </span>
            <h3 className="font-display text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
              {isHindi ? 'मंदिर की चतुर्विध आधारशिला' : 'The Four Pillars of the Sacred Shrine'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Pillar 1 */}
            <MotionCard className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-amber-400/50 hover:shadow-xs transition-all flex flex-col items-start group">
              <div className="w-8 h-8 rounded-md border border-slate-900/80 flex items-center justify-center text-slate-900 mb-3.5 bg-[#fdfbf9] group-hover:border-amber-600 group-hover:text-amber-700 transition-colors">
                <Landmark className="w-4 h-4" />
              </div>
              <h4 className="font-display font-bold text-sm md:text-base text-slate-900 mb-1.5">
                {t.about.archTitle}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                {t.about.archDesc}
              </p>
            </MotionCard>

            {/* Pillar 2 */}
            <MotionCard className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-amber-400/50 hover:shadow-xs transition-all flex flex-col items-start group">
              <div className="w-8 h-8 rounded-md border border-slate-900/80 flex items-center justify-center text-slate-900 mb-3.5 bg-[#fdfbf9] group-hover:border-amber-600 group-hover:text-amber-700 transition-colors">
                <Compass className="w-4 h-4" />
              </div>
              <h4 className="font-display font-bold text-sm md:text-base text-slate-900 mb-1.5">
                {t.about.traditionTitle}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                {t.about.traditionDesc}
              </p>
            </MotionCard>

            {/* Pillar 3 */}
            <MotionCard className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-amber-400/50 hover:shadow-xs transition-all flex flex-col items-start group">
              <div className="w-8 h-8 rounded-md border border-slate-900/80 flex items-center justify-center text-slate-900 mb-3.5 bg-[#fdfbf9] group-hover:border-amber-600 group-hover:text-amber-700 transition-colors">
                <Users className="w-4 h-4" />
              </div>
              <h4 className="font-display font-bold text-sm md:text-base text-slate-900 mb-1.5">
                {t.about.communityTitle}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                {t.about.communityDesc}
              </p>
            </MotionCard>

            {/* Pillar 4 */}
            <MotionCard className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-amber-400/50 hover:shadow-xs transition-all flex flex-col items-start group">
              <div className="w-8 h-8 rounded-md border border-slate-900/80 flex items-center justify-center text-slate-900 mb-3.5 bg-[#fdfbf9] group-hover:border-amber-600 group-hover:text-amber-700 transition-colors">
                <Shield className="w-4 h-4" />
              </div>
              <h4 className="font-display font-bold text-sm md:text-base text-slate-900 mb-1.5">
                {isHindi ? 'आध्यात्मिक शरण' : 'Spiritual Sanctuary'}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                {isHindi
                  ? 'रोग-शोक निवारण और माता रानी की असीम कृपा प्राप्त करने का पावन केंद्र।'
                  : 'Offering peace, strength, and solace for devotees seeking divine grace.'}
              </p>
            </MotionCard>
          </div>
        </SectionReveal>

        {/* Section 3: Heritage Timeline */}
        <SectionReveal className="relative bg-white p-6 sm:p-10 rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <LotusWatermark position="bottom-right" size="md" opacity={0.05} />
          <div className="mb-8 text-center max-w-xl mx-auto">
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-800 font-bold block mb-1">
              CHRONICLE OF FAITH
            </span>
            <h3 className="font-display text-lg sm:text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              {isHindi ? 'परंपराओं का कालक्रमानुसार इतिहास' : 'Preserving Traditions Through Time'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {isHindi
                ? 'श्री शीतला माता मंदिर लगदेवी के पावन इतिहास के प्रमुख सोपान'
                : 'Key milestones in the spiritual journey of Sheetla Mata Mandir Lagdevi.'}
            </p>
          </div>

          <div className="space-y-6 relative before:absolute before:inset-0 before:left-3 md:before:left-1/2 before:w-px before:bg-slate-200">
            {timelineItems.map((item, idx) => (
              <MotionCard
                key={idx}
                className={`relative flex flex-col md:flex-row items-start ${
                  idx % 2 === 0 ? 'md:flex-row-reverse' : ''
                } gap-6`}
              >
                <div className="absolute left-3 md:left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-amber-600 border-2 border-white shadow-xs" />
                <div className="ml-8 md:ml-0 md:w-1/2 p-4 sm:p-5 bg-[#fdfbf9] rounded-xl border border-slate-200/80 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-amber-800 font-bold mb-1">
                    <Clock className="w-3 h-3" />
                    <span>{isHindi ? item.hindiYear : item.year}</span>
                  </div>
                  <h4 className="font-display font-bold text-sm md:text-base text-slate-900">
                    {isHindi ? item.hindiTitle : item.title}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed font-normal">
                    {isHindi ? item.hindiDesc : item.desc}
                  </p>
                </div>
              </MotionCard>
            ))}
          </div>
        </SectionReveal>

      </section>
    </div>
  );
};
