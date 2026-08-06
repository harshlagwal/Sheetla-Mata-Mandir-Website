import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { kathaSection, jagranSection, melaSection, bhandaraTimeslots } from '../data/festivalsData';
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

const Eyebrow: React.FC<{ label: string; hindiLabel: string }> = ({ label, hindiLabel }) => {
  const { isHindi } = useLanguage();
  return (
    <div className="flex items-center gap-2 mb-3">
      <span style={{ color: C.saffronLight, fontSize: '14px' }}>✦</span>
      <span
        className="font-body text-xs font-bold uppercase tracking-[0.25em]"
        style={{ color: C.saffron }}
      >
        {isHindi ? hindiLabel : label}
      </span>
    </div>
  );
};

export const Festivals: React.FC = () => {
  const { isHindi } = useLanguage();

  return (
    <div className="w-full pt-28 pb-24" style={{ background: C.ivory }}>
      {/* Hero Header */}
      <section
        className="py-16 md:py-20 px-margin-mobile lg:px-margin-desktop text-center border-b"
        style={{
          background: `linear-gradient(to bottom, ${C.ivoryDeep}, ${C.ivory})`,
          borderColor: C.mutedBorder,
        }}
      >
        <div className="max-w-3xl mx-auto">
          <p
            className="font-hindi text-base font-semibold tracking-wider mb-3"
            style={{ color: C.saffron }}
          >
            उत्सव • परंपरा • आस्था
          </p>

          <h1
            className="font-display font-bold leading-tight"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', color: C.maroon }}
          >
            {isHindi ? 'हमारे वार्षिक उत्सव एवं धार्मिक परंपराएँ' : 'Annual Festivals & Sacred Traditions'}
          </h1>

          <div className="flex items-center justify-center gap-4 my-5">
            <div className="h-px w-16" style={{ background: C.mutedBorder2 }} />
            <span style={{ color: C.saffronLight, fontSize: '18px' }}>✦</span>
            <div className="h-px w-16" style={{ background: C.mutedBorder2 }} />
          </div>

          <p
            className="font-body text-base md:text-lg leading-relaxed"
            style={{ color: C.earthBrown }}
          >
            {isHindi
              ? 'शीतला माता मंदिर, लगदेवी में वर्ष भर आयोजित होने वाले धार्मिक अनुष्ठान, कथा, भंडारे, माता जागरण और वार्षिक मेले हमारी आस्था के साथ-साथ गांव की सामूहिक संस्कृति और परंपराओं का महत्वपूर्ण हिस्सा हैं।'
              : 'The annual celebrations of Sheetla Mata Mandir, Lagdevi are deeply rooted in faith, community service and Himachali tradition. Sacred Kathas, daily Bhandaras, the grand Mata Jagran and the annual village fair bring generations of devotees together in worship, seva and celebration.'}
          </p>
        </div>
      </section>

      {/* Main Storytelling Sections Container */}
      <div className="max-w-6xl mx-auto px-margin-mobile lg:px-margin-desktop pt-12 space-y-20 md:space-y-28">
        
        {/* UPCOMING PROGRAMME */}
        <UpcomingTempleEvent />

        {/* =========================================================================
            SECTION 01 — Sacred Katha & Bhagwat Mahotsav (Image LEFT / Content RIGHT)
            Note: Image is PORTRAIT (vertical), so container uses portrait aspect-ratio
            with object-contain to ensure the ENTIRE Bhagwat Geeta photo is displayed completely!
        ========================================================================= */}
        <section className="scroll-mt-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Image (Portrait — FULL IMAGE DISPLAY, NO CROPPING) */}
            <div className="lg:col-span-6 order-1 flex justify-center">
              {kathaSection.image && (
                <div
                  className="group relative w-full max-w-md overflow-hidden rounded-2xl md:rounded-3xl border shadow-lg transition-all duration-500"
                  style={{
                    aspectRatio: '3 / 4',
                    borderColor: C.mutedBorder2,
                    boxShadow: '0 12px 36px rgba(90, 26, 10, 0.16)',
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
                </div>
              )}
            </div>

            {/* Content */}
            <div className="lg:col-span-6 order-2">
              <Eyebrow label={kathaSection.eyebrow} hindiLabel={kathaSection.hindiEyebrow} />
              
              <h2
                className="font-display font-bold leading-tight text-2xl md:text-3xl lg:text-4xl mb-1"
                style={{ color: C.maroon }}
              >
                {isHindi ? kathaSection.hindiTitle : kathaSection.title}
              </h2>
              <p className="font-hindi text-base md:text-lg font-semibold mb-4" style={{ color: C.maroonLight }}>
                {isHindi ? kathaSection.title : kathaSection.hindiTitle}
              </p>

              <div className="h-px w-full my-4" style={{ background: C.mutedBorder2 }} />

              <p
                className="font-body text-sm md:text-base leading-relaxed whitespace-pre-line mb-6"
                style={{ color: C.textBody, lineHeight: '1.85' }}
              >
                {isHindi ? kathaSection.hindiBody : kathaSection.body}
              </p>

              {/* Information Chips */}
              <div className="flex flex-wrap gap-2.5 mb-6">
                {kathaSection.chips.map((chip, idx) => (
                  <span
                    key={idx}
                    className="font-body text-xs font-semibold px-3.5 py-1.5 rounded-full border shadow-sm"
                    style={{
                      background: C.ivoryDeep,
                      borderColor: C.mutedBorder2,
                      color: C.maroonMid,
                    }}
                  >
                    {isHindi ? chip.hindiLabel : chip.label}
                  </span>
                ))}
              </div>

              {/* Highlight Metadata Grid */}
              <div
                className="grid grid-cols-2 gap-4 p-4 rounded-xl border"
                style={{ background: 'rgba(250,243,232,0.6)', borderColor: C.mutedBorder }}
              >
                {kathaSection.metadata.map((meta, idx) => (
                  <div key={idx} className="border-l-2 pl-3" style={{ borderColor: C.saffron }}>
                    <p className="font-body text-[11px] font-bold uppercase tracking-wider" style={{ color: C.saffron }}>
                      {isHindi ? meta.hindiLabel : meta.label}
                    </p>
                    <p className="font-body text-xs md:text-sm font-semibold mt-0.5" style={{ color: C.maroon }}>
                      {isHindi ? meta.hindiValue : meta.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bhandara Timeline Mini-Feature */}
          <div
            className="mt-12 p-6 md:p-8 rounded-2xl border"
            style={{
              background: `linear-gradient(135deg, ${C.ivoryDeep} 0%, #f5ece0 100%)`,
              borderColor: C.mutedBorder2,
            }}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className="font-body text-xs font-bold uppercase tracking-widest" style={{ color: C.saffron }}>
                  {isHindi ? 'कथा के दौरान दैनिक सेवा' : 'Daily Seva During Katha'}
                </span>
                <h3 className="font-display font-bold text-xl md:text-2xl mt-1" style={{ color: C.maroon }}>
                  {isHindi ? 'प्रतिदिन भंडारा एवं हिमाचली धाम' : 'Daily Bhandara & Himachali Dham'}
                </h3>
                <p className="font-body text-sm mt-1 max-w-xl" style={{ color: C.earthBrown }}>
                  {isHindi
                    ? 'कथा के दिनों में मंदिर परिसर में श्रद्धालुओं को प्रतिदिन दोपहर 2:00 बजे प्रसाद और शाम 5:00 बजे हिमाचली धाम परोसी जाती है।'
                    : 'Throughout the Katha, blessed Prasad is served daily at 2:00 PM followed by a traditional Himachali Dham community meal at 5:00 PM.'}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                {bhandaraTimeslots.map((slot, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl border bg-white/70 shadow-sm"
                    style={{ borderColor: C.mutedBorder2 }}
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-xs text-white shrink-0 shadow-sm"
                      style={{
                        background: idx === 0 ? C.saffron : C.maroon,
                      }}
                    >
                      {isHindi ? slot.hindiTime.split(' ')[1] : slot.time.split(' ')[0]}
                    </div>
                    <div>
                      <p className="font-display font-bold text-xs uppercase tracking-wider" style={{ color: C.maroon }}>
                        {isHindi ? slot.hindiTime : slot.time}
                      </p>
                      <p className="font-hindi font-bold text-sm" style={{ color: C.maroonMid }}>
                        {isHindi ? slot.hindiLabel : slot.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 02 — Grand Mata Jagran & Mata Ki Chowki (Content LEFT / Image RIGHT)
            Note: Image is PORTRAIT (vertical), so container uses portrait aspect-ratio
            with object-contain to ensure the ENTIRE Jagran photo is displayed completely!
        ========================================================================= */}
        <section className="scroll-mt-32 pt-6 border-t" style={{ borderColor: C.mutedBorder }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Content */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <Eyebrow label={jagranSection.eyebrow} hindiLabel={jagranSection.hindiEyebrow} />

              <h2
                className="font-display font-bold leading-tight text-2xl md:text-3xl lg:text-4xl mb-1"
                style={{ color: C.maroon }}
              >
                {isHindi ? jagranSection.hindiTitle : jagranSection.title}
              </h2>
              <p className="font-hindi text-base md:text-lg font-semibold mb-4" style={{ color: C.maroonLight }}>
                {isHindi ? jagranSection.title : jagranSection.hindiTitle}
              </p>

              <div className="h-px w-full my-4" style={{ background: C.mutedBorder2 }} />

              <p
                className="font-body text-sm md:text-base leading-relaxed whitespace-pre-line mb-6"
                style={{ color: C.textBody, lineHeight: '1.85' }}
              >
                {isHindi ? jagranSection.hindiBody : jagranSection.body}
              </p>

              {/* Information Chips */}
              <div className="flex flex-wrap gap-2.5 mb-6">
                {jagranSection.chips.map((chip, idx) => (
                  <span
                    key={idx}
                    className="font-body text-xs font-semibold px-3.5 py-1.5 rounded-full border shadow-sm"
                    style={{
                      background: C.ivoryDeep,
                      borderColor: C.mutedBorder2,
                      color: C.maroonMid,
                    }}
                  >
                    {isHindi ? chip.hindiLabel : chip.label}
                  </span>
                ))}
              </div>

              {/* Highlight Metadata Grid */}
              <div
                className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl border"
                style={{ background: 'rgba(250,243,232,0.6)', borderColor: C.mutedBorder }}
              >
                {jagranSection.metadata.map((meta, idx) => (
                  <div key={idx} className="border-l-2 pl-3" style={{ borderColor: C.saffron }}>
                    <p className="font-body text-[11px] font-bold uppercase tracking-wider" style={{ color: C.saffron }}>
                      {isHindi ? meta.hindiLabel : meta.label}
                    </p>
                    <p className="font-body text-xs md:text-sm font-semibold mt-0.5" style={{ color: C.maroon }}>
                      {isHindi ? meta.hindiValue : meta.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Image (Portrait — FULL IMAGE DISPLAY, NO CROPPING) */}
            <div className="lg:col-span-6 order-1 lg:order-2 flex justify-center">
              {jagranSection.image && (
                <div
                  className="group relative w-full max-w-md overflow-hidden rounded-2xl md:rounded-3xl border shadow-lg transition-all duration-500"
                  style={{
                    aspectRatio: '3 / 4',
                    borderColor: C.mutedBorder2,
                    boxShadow: '0 12px 36px rgba(90, 26, 10, 0.16)',
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
                </div>
              )}
            </div>

          </div>

          <JagranPerformers />
        </section>

        {/* =========================================================================
            SECTION 03 — Annual Lagdevi Mata Mela — 22 May
            Reverted to wide feature section (NO IMAGE) as requested
        ========================================================================= */}
        <section className="scroll-mt-32 pt-6 border-t" style={{ borderColor: C.mutedBorder }}>
          <div
            className="relative rounded-3xl overflow-hidden shadow-2xl border"
            style={{
              background: `linear-gradient(135deg, ${C.maroonDark} 0%, ${C.maroon} 50%, ${C.maroonMid} 100%)`,
              borderColor: C.mutedBorder2,
              boxShadow: `0 16px 64px rgba(60,10,2,0.28)`,
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">

              {/* Left Column: Big 22 MAY Date Badge */}
              <div
                className="lg:col-span-4 flex flex-col items-center justify-center py-12 px-8 text-center"
                style={{ borderRight: '1px solid rgba(255,255,255,0.12)' }}
              >
                <div
                  className="flex flex-col items-center justify-center rounded-2xl px-10 py-6 mb-4"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '2px solid rgba(255,200,100,0.30)',
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  <span
                    className="font-display font-bold leading-none"
                    style={{ fontSize: 'clamp(3.5rem, 8vw, 5.5rem)', color: '#ffe082', lineHeight: 1 }}
                  >
                    22
                  </span>
                  <span
                    className="font-display font-bold tracking-wider mt-1 uppercase"
                    style={{ fontSize: 'clamp(1.2rem, 3vw, 1.75rem)', color: 'rgba(255,220,140,0.9)' }}
                  >
                    {isHindi ? 'मई' : 'May'}
                  </span>
                </div>

                <p
                  className="font-body text-xs font-bold uppercase tracking-[0.22em] mb-1"
                  style={{ color: 'rgba(255,220,140,0.75)' }}
                >
                  {isHindi ? 'निश्चित वार्षिक तिथि' : 'Fixed Annual Date'}
                </p>
                <p
                  className="font-hindi text-sm font-semibold"
                  style={{ color: 'rgba(255,255,255,0.65)' }}
                >
                  {isHindi ? 'प्रत्येक वर्ष आयोजन' : 'Annual Festival'}
                </p>
              </div>

              {/* Right Column: Details & Content */}
              <div className="lg:col-span-8 p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-3">
                  <span style={{ color: '#ffe082', fontSize: '14px' }}>✦</span>
                  <span
                    className="font-body text-xs font-bold uppercase tracking-[0.22em]"
                    style={{ color: 'rgba(255,220,140,0.85)' }}
                  >
                    {isHindi ? melaSection.hindiEyebrow : melaSection.eyebrow}
                  </span>
                </div>

                <h2
                  className="font-display font-bold leading-tight text-2xl md:text-3xl lg:text-4xl text-white mb-1"
                >
                  {isHindi ? melaSection.hindiTitle : melaSection.title}
                </h2>
                <p
                  className="font-hindi text-base md:text-lg font-semibold mb-4"
                  style={{ color: 'rgba(255,220,140,0.85)' }}
                >
                  {isHindi ? melaSection.title : melaSection.hindiTitle}
                </p>

                <div className="h-px w-full my-4" style={{ background: 'rgba(255,255,255,0.15)' }} />

                <p
                  className="font-body text-sm md:text-base leading-relaxed whitespace-pre-line mb-6"
                  style={{ color: 'rgba(255,255,255,0.85)', lineHeight: '1.85' }}
                >
                  {isHindi ? melaSection.hindiBody : melaSection.body}
                </p>

                {/* Timing & Attraction Highlights Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div
                    className="rounded-xl p-4 text-center border"
                    style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,200,100,0.2)' }}
                  >
                    <p className="font-display font-bold text-lg text-white">2:00 PM</p>
                    <p className="font-body text-xs mt-0.5" style={{ color: 'rgba(255,220,140,0.8)' }}>
                      {isHindi ? 'मेला प्रारंभ' : 'Fair Begins'}
                    </p>
                  </div>

                  <div
                    className="rounded-xl p-4 text-center border"
                    style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,200,100,0.2)' }}
                  >
                    <p className="font-display font-bold text-lg text-white">8:00 PM</p>
                    <p className="font-body text-xs mt-0.5" style={{ color: 'rgba(255,220,140,0.8)' }}>
                      {isHindi ? 'समापन' : 'Conclusion'}
                    </p>
                  </div>

                  <div
                    className="rounded-xl p-4 text-center border"
                    style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,200,100,0.2)' }}
                  >
                    <p className="font-hindi font-bold text-sm text-amber-200">
                      {isHindi ? 'पारंपरिक कुश्ती दंगल' : 'Kushti / Dangal'}
                    </p>
                    <p className="font-body text-[10px] uppercase font-semibold mt-0.5" style={{ color: 'rgba(255,220,140,0.7)' }}>
                      {isHindi ? 'प्रमुख आकर्षण' : 'Major Attraction'}
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* Generational Seva Footer Card */}
        <section className="pt-4">
          <div
            className="p-8 md:p-12 rounded-3xl border text-center relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${C.maroon} 0%, ${C.maroonMid} 100%)`,
              borderColor: C.mutedBorder2,
              boxShadow: '0 12px 40px rgba(90, 26, 10, 0.25)',
            }}
          >
            <span className="font-body text-xs font-bold uppercase tracking-[0.25em] text-amber-200/80">
              {isHindi ? 'सामूहिक सेवा एवं परंपरा' : 'Community Seva & Heritage'}
            </span>
            
            <h3 className="font-hindi text-xl md:text-2xl lg:text-3xl font-bold text-white mt-3 mb-2">
              "परंपरा वरिष्ठों से मिली, सेवा युवाओं ने आगे बढ़ाई।"
            </h3>
            <p className="font-body text-sm md:text-base text-amber-100/90 max-w-2xl mx-auto leading-relaxed">
              {isHindi
                ? 'लगदेवी के वरिष्ठजनों के आशीर्वाद और युवा गोल्डन क्लब के समर्पित प्रयासों से मंदिर के समस्त धार्मिक उत्सव भव्यता और श्रद्धा के साथ आयोजित होते हैं।'
                : 'Guided by the wisdom of village elders and energized by the devotion of Yuva Golden Club, the sacred traditions of Sheetla Mata Mandir continue to thrive across generations.'}
            </p>
          </div>
        </section>

      </div>
    </div>
  );
};
