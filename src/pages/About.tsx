import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SectionHeading } from '../components/common/SectionHeading';
import { Compass, Shield, Users, Landmark, Clock } from 'lucide-react';
import { TempleHistoryStone } from '../components/about/TempleHistoryStone';
import { SectionReveal } from '../components/motion/SectionReveal';
import { MotionCard } from '../components/motion/MotionCard';

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
    <div className="w-full pt-28 pb-20">
      {/* Hero */}
      <SectionReveal className="bg-surface-container py-16 px-margin-mobile lg:px-margin-desktop mb-16 border-b border-outline-variant/30">
        <div className="max-w-container-max mx-auto text-center max-w-3xl">
          <span className="font-body text-xs font-bold text-secondary uppercase tracking-[0.2em]">
            TEMPLE HERITAGE
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mt-2">
            {t.about.heroTitle}
          </h1>
          <p className="font-body text-base md:text-lg text-on-surface-variant mt-4 leading-relaxed">
            {t.about.heroSubtitle}
          </p>
        </div>
      </SectionReveal>

      {/* Main Content Grid */}
      <section className="max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop space-y-20">
        {/* Section 1: History */}
        <TempleHistoryStone />
        {/* Section 2: Four Pillars */}
        <SectionReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MotionCard className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-sm space-y-3">
            <Landmark className="w-8 h-8 text-primary" />
            <h3 className="font-display font-bold text-lg text-primary">{t.about.archTitle}</h3>
            <p className="font-body text-sm text-on-surface-variant leading-relaxed">{t.about.archDesc}</p>
          </MotionCard>
          <MotionCard className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-sm space-y-3">
            <Compass className="w-8 h-8 text-primary" />
            <h3 className="font-display font-bold text-lg text-primary">{t.about.traditionTitle}</h3>
            <p className="font-body text-sm text-on-surface-variant leading-relaxed">{t.about.traditionDesc}</p>
          </MotionCard>
          <MotionCard className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-sm space-y-3">
            <Users className="w-8 h-8 text-primary" />
            <h3 className="font-display font-bold text-lg text-primary">{t.about.communityTitle}</h3>
            <p className="font-body text-sm text-on-surface-variant leading-relaxed">{t.about.communityDesc}</p>
          </MotionCard>
          <MotionCard className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-sm space-y-3">
            <Shield className="w-8 h-8 text-primary" />
            <h3 className="font-display font-bold text-lg text-primary">Spiritual Sanctuary</h3>
            <p className="font-body text-sm text-on-surface-variant leading-relaxed">Offering peace, strength, and refuge for devotees seeking Mata Rani's grace.</p>
          </MotionCard>
        </SectionReveal>

        {/* Section 3: Timeline */}
        <SectionReveal className="bg-surface-container-lowest p-8 md:p-12 rounded-3xl border border-outline-variant/30 shadow-sm">
          <SectionHeading
            tag="HERITAGE TIMELINE"
            title="Preserving Traditions Through Time"
            subtitle="Key milestones in the spiritual journey of Sheetla Mata Mandir Lagdevi."
          />

          <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 md:before:left-1/2 before:w-0.5 before:bg-outline-variant/40">
            {timelineItems.map((item, idx) => (
              <MotionCard
                key={idx}
                className={`relative flex flex-col md:flex-row items-start ${
                  idx % 2 === 0 ? 'md:flex-row-reverse' : ''
                } gap-8`}
              >
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-secondary border-4 border-surface shadow" />
                <div className="ml-10 md:ml-0 md:w-1/2 p-6 bg-surface-container-low rounded-2xl border border-outline-variant/20 shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-bold text-secondary mb-1">
                    <Clock className="w-4 h-4" />
                    <span>{isHindi ? item.hindiYear : item.year}</span>
                  </div>
                  <h4 className="font-display font-bold text-lg text-primary">
                    {isHindi ? item.hindiTitle : item.title}
                  </h4>
                  <p className="font-body text-sm text-on-surface-variant mt-2">
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
