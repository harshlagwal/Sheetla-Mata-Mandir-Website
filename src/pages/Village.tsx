import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Mountain, Sparkles, Users } from 'lucide-react';
import lagdeviViewImg from '../assets/lagdevi view.webp';
import { VillageDroneVideo } from '../components/village/VillageDroneVideo';

export const Village: React.FC = () => {
  const { isHindi } = useLanguage();

  return (
    <div className="w-full pt-20 pb-20">
      {/* 1. VILLAGE HERO */}
      <section className="px-margin-mobile lg:px-margin-desktop max-w-container-max mx-auto mb-16 pt-6 md:pt-10 lg:pt-14">
        <VillageDroneVideo
          className="w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl shadow-2xl border border-outline-variant/30"
          poster={lagdeviViewImg}
          showDefaultOverlay={false}
        >
          {/* Subtle Dark Gradient Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col justify-end p-6 sm:p-10 md:p-14 pointer-events-none">
            <div className="max-w-3xl space-y-2 md:space-y-3 animate-fade-in">
              {/* Location Label */}
              <div className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-white/90 text-xs font-body tracking-wider uppercase shadow-lg">
                <MapPin className="w-3.5 h-3.5 text-secondary" />
                <span>{isHindi ? 'हमीरपुर, हिमाचल प्रदेश' : 'Hamirpur, Himachal Pradesh'}</span>
              </div>

              {/* Hero Title */}
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-wide drop-shadow-md">
                {isHindi ? 'लगदेवी' : 'LAGDEVI'}
              </h1>

              {/* Subtitle */}
              <p className="font-body text-lg sm:text-xl md:text-2xl text-amber-100/90 font-medium leading-relaxed drop-shadow">
                {isHindi ? 'हिमाचल की पहाड़ियों में बसा एक सुंदर गाँव' : 'A Serene Himalayan Village'}
              </p>
            </div>
          </div>
        </VillageDroneVideo>
      </section>

      {/* 2. INTRODUCTION SECTION */}
      <section className="max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop space-y-16">
        <div className="max-w-4xl mx-auto bg-surface-container-lowest p-8 sm:p-12 rounded-3xl border border-outline-variant/30 shadow-md space-y-6 text-center md:text-left">
          <span className="font-body text-xs font-bold text-secondary uppercase tracking-[0.2em] block">
            {isHindi ? 'पवित्र धाम शीतला माता मंदिर का गाँव' : 'HOME OF SHEETLA MATA MANDIR'}
          </span>

          <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary">
            {isHindi ? 'लगदेवी में आपका स्वागत है' : 'Welcome to Lagdevi'}
          </h2>

          <div className="space-y-4 font-body text-base sm:text-lg text-on-surface-variant leading-relaxed">
            <p>
              {isHindi
                ? 'हिमाचल प्रदेश के हमीरपुर जिले की सुंदर हरी-भरी पहाड़ियों के बीच बसा लगदेवी एक शांत और सुंदर गाँव है। यहाँ का प्राकृतिक वातावरण, पारंपरिक ग्रामीण जीवन और धार्मिक आस्था इसकी विशेष पहचान है।'
                : 'Nestled among the peaceful green hills of Himachal Pradesh, Lagdevi is a beautiful village in District Hamirpur known for its natural surroundings, traditional village life and spiritual heritage.'}
            </p>
            <p>
              {isHindi
                ? 'गाँव के धार्मिक जीवन के केंद्र में स्थित शीतला माता मंदिर स्थानीय लोगों की आस्था और श्रद्धा का प्रमुख स्थान है।'
                : 'At the heart of the village stands Sheetla Mata Mandir, a sacred place of faith and devotion for the local community. The temple and village remain closely connected through generations of traditions, festivals and community gatherings.'}
            </p>
          </div>
        </div>

        {/* 5. OPTIONAL VILLAGE DETAILS (SMALL INFORMATION CARDS) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-container-max mx-auto">
          {/* Card 1 */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-sm space-y-3 hover:border-secondary/40 transition-colors">
            <div className="p-3 bg-surface-container-low w-fit rounded-xl">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display font-bold text-lg text-primary">
              {isHindi ? 'स्थान' : 'Location'}
            </h3>
            <p className="font-body text-sm text-on-surface-variant leading-relaxed">
              {isHindi ? 'जिला हमीरपुर, हिमाचल प्रदेश' : 'District Hamirpur, Himachal Pradesh'}
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-sm space-y-3 hover:border-secondary/40 transition-colors">
            <div className="p-3 bg-surface-container-low w-fit rounded-xl">
              <Mountain className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display font-bold text-lg text-primary">
              {isHindi ? 'प्राकृतिक सौंदर्य' : 'Landscape'}
            </h3>
            <p className="font-body text-sm text-on-surface-variant leading-relaxed">
              {isHindi ? 'हिमालयी पहाड़ियाँ और हरी-भरी वादियाँ' : 'Himalayan Hills & Green Countryside'}
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-sm space-y-3 hover:border-secondary/40 transition-colors">
            <div className="p-3 bg-surface-container-low w-fit rounded-xl">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display font-bold text-lg text-primary">
              {isHindi ? 'धार्मिक केंद्र' : 'Spiritual Landmark'}
            </h3>
            <p className="font-body text-sm text-on-surface-variant leading-relaxed">
              {isHindi ? 'शीतला माता मंदिर' : 'Sheetla Mata Mandir'}
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-sm space-y-3 hover:border-secondary/40 transition-colors">
            <div className="p-3 bg-surface-container-low w-fit rounded-xl">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display font-bold text-lg text-primary">
              {isHindi ? 'ग्रामीण जीवन' : 'Village Life'}
            </h3>
            <p className="font-body text-sm text-on-surface-variant leading-relaxed">
              {isHindi ? 'पारंपरिक हिमाचली संस्कृति' : 'Traditional Himachali Community'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

