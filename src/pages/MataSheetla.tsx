import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SectionHeading } from '../components/common/SectionHeading';
import { Sparkles, Heart, ChevronDown } from 'lucide-react';
import newSheetlaImg from '../assets/new-sheetla.webp';
import shivjiImg     from '../assets/Shivji New.webp';
import hanumanImg    from '../assets/Hanuman.webp';
import ramDarbaarImg from '../assets/Shree Ram Darbaar.webp';
import guggaBabaImg  from '../assets/Gugga baba.webp';

export const MataSheetla: React.FC = () => {
  const { t, isHindi } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const deities = [
    {
      id: 'sheetla-mata',
      name: 'Sheetla Mata',
      hindiName: 'माँ शीतला देवी',
      subtitle: 'Divine Mother of Peace, Healing & Protection',
      hindiSubtitle: 'आरोग्य, शांति और सुरक्षा की अधिष्ठात्री देवी',
      image: newSheetlaImg,
      isAvailable: true,
      description: 'Primary deity of Sheetla Mata Mandir Lagdevi. Devotees offer prayers for good health, family peace, and spiritual harmony.',
      hindiDescription: 'शीतला माता मंदिर लगदेवी की मुख्य अधिष्ठात्री देवी। श्रद्धालु उत्तम स्वास्थ्य, पारिवारिक शांति और आरोग्य के लिए माँ रानी की पूजा-अर्चना करते हैं।',
      bottomText: '॥ जय माता दी ॥',
    },
    {
      id: 'shiv-ji',
      name: 'Lord Shiva',
      hindiName: 'भगवान शिव',
      subtitle: 'Mahadev — The Supreme Destroyer & Transformer',
      hindiSubtitle: 'महादेव — परम शक्ति के स्वामी',
      image: shivjiImg,
      isAvailable: true,
      description: 'Mahadev, the supreme deity of transformation, cosmic power, and eternal consciousness.',
      hindiDescription: 'महादेव — ब्रह्मांडीय शक्ति, परिवर्तन और अनंत चेतना के परम स्वामी।',
      bottomText: '॥ ॐ नमः शिवाय ॥',
    },
    {
      id: 'hanuman-ji',
      name: 'Bajrang Bali',
      hindiName: 'श्री हनुमान जी',
      subtitle: 'Sankat Mochan — Remover of All Obstacles',
      hindiSubtitle: 'संकट मोचन महाबली बजरंगबली',
      image: hanumanImg,
      isAvailable: true,
      description: 'Shri Hanuman Ji — the epitome of strength, devotion, and loyalty. His grace removes all obstacles.',
      hindiDescription: 'श्री हनुमान जी — शक्ति, भक्ति और निष्ठा के प्रतीक। उनकी कृपा से सभी संकट दूर होते हैं।',
      bottomText: '॥ जय बजरंगबली ॥',
    },
    {
      id: 'ram-darbar',
      name: 'Shree Ram Darbaar',
      hindiName: 'श्री राम दरबार',
      subtitle: 'Shri Ram, Mata Sita, Lakshman Ji & Hanuman Ji',
      hindiSubtitle: 'भगवान श्री राम, माता सीता एवं लक्ष्मण जी',
      image: ramDarbaarImg,
      isAvailable: true,
      description: 'The divine court of Shri Ram — an eternal symbol of dharma, truth, and righteousness.',
      hindiDescription: 'श्री राम दरबार — धर्म, सत्य और मर्यादा का दिव्य प्रतीक।',
      bottomText: '॥ जय श्री राम ॥',
    },
  ];


  const faqs = [
    {
      q: "What is the spiritual significance of Mata Sheetla?",
      hindiQ: "माता शीतला की पूजा का क्या आध्यात्मिक महत्व है?",
      a: "Mata Sheetla is worshipped as the divine mother of healing, peace, and protection. Devotees seek her blessings for family health, protection from illnesses, and inner tranquility.",
      hindiA: "माता शीतला को आरोग्य, शांति और सुरक्षा प्रदान करने वाली देवी के रूप में पूजा जाता है। श्रद्धालु परिवार के स्वास्थ्य और सुख-शांति के लिए माता रानी की आराधना करते हैं।",
    },
    {
      q: "What offerings are brought during Puja?",
      hindiQ: "पूजा के समय क्या सामग्री अर्पण की जाती है?",
      a: "Fresh flowers, haldi (turmeric), kumkum, sweet prasad, lotus blooms, and pure spring water are traditionally offered with devotion.",
      hindiA: "ताजे पुष्प, हल्दी, कुमकुम, मीठा प्रसाद, कमल का फूल और पवित्र जल अर्पण किया जाता है।",
    },
    {
      q: "When are special pujas conducted at Lagdevi Mandir?",
      hindiQ: "लगदेवी मंदिर में विशेष पूजा कब आयोजित होती है?",
      a: "Special Chandi Path, Akhand Jyoti, and Havans take place during Navratri festival periods and on auspicious lunar days.",
      hindiA: "नवरात्रि उत्सव और विशेष पर्वों पर अखंड ज्योति, चंडी पाठ और हवन यज्ञ का आयोजन होता है।",
    },
  ];

  return (
    <div className="w-full pt-28 pb-20">
      {/* Hero */}
      <section className="bg-surface-container py-16 px-margin-mobile lg:px-margin-desktop mb-16 border-b border-outline-variant/30 text-center">
        <div className="max-w-3xl mx-auto space-y-3">
          <span className="font-hindi text-3xl text-tertiary font-bold tracking-widest block">
            {isHindi ? '॥ माँ रानी ॥' : '॥ Mata Rani ॥'}
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-primary">
            {isHindi ? 'पावन माँ रानी धाम' : 'Mata Rani'}
          </h1>
          <p className="font-body text-base md:text-lg text-on-surface-variant leading-relaxed">
            {t.mataSheetlaPage.heroSub}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop space-y-20">
        
        {/* Deities Section */}
        <div>
          <SectionHeading
            tag="SACRED DEITIES"
            title={isHindi ? 'पवित्र देव दर्शन' : 'Divine Deities'}
            subtitle={isHindi ? 'लगदेवी मंदिर परिसर के पावन देव स्वरूप' : 'Sacred deities housed within Sheetla Mata Mandir.'}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {deities.map((deity) => (
              <div
                key={deity.id}
                className="bg-surface-container-lowest rounded-3xl overflow-hidden border border-outline-variant/30 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[4/3] relative overflow-hidden bg-surface-container-high flex items-center justify-center">
                    <img
                      src={deity.image}
                      alt={deity.name}
                      loading="lazy"
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="font-display font-bold text-xl text-primary">
                      {isHindi ? deity.hindiName : deity.name}
                    </h3>
                    <p className="font-body text-xs font-semibold text-secondary">
                      {isHindi ? deity.hindiSubtitle : deity.subtitle}
                    </p>
                    <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                      {isHindi ? deity.hindiDescription : deity.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <div className="h-px bg-outline-variant/20 mb-3" />
                  <span className="font-hindi text-sm text-tertiary font-semibold block text-center">
                    {deity.bottomText}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* Spiritual Significance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/30 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-xl text-primary">
              {t.mataSheetlaPage.significanceTitle}
            </h3>
            <p className="font-body text-sm text-on-surface-variant leading-relaxed">
              {t.mataSheetlaPage.significanceText}
            </p>
          </div>

          <div className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/30 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-xl text-primary">
              {t.mataSheetlaPage.localTraditionsTitle}
            </h3>
            <p className="font-body text-sm text-on-surface-variant leading-relaxed">
              {t.mataSheetlaPage.localTraditionsText}
            </p>
          </div>
        </div>

        {/* Associated Sacred Shrine - Gugga Devta */}
        <div className="bg-surface-container-lowest rounded-3xl overflow-hidden border border-outline-variant/30 shadow-sm">
          <div className="flex flex-col lg:flex-row">
            {/* Image (45%) */}
            <div className="lg:w-[45%] flex">
              <img
                src={guggaBabaImg}
                alt={isHindi ? "शीतला माता मंदिर लगदेवी में गुग्गा देवता का देवस्थल" : "Gugga Devta shrine at Sheetla Mata Mandir, Lagdevi"}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center aspect-[4/3] lg:aspect-auto min-h-[300px] lg:min-h-[400px]"
              />
            </div>
            {/* Content (55%) */}
            <div className="lg:w-[55%] p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              <span className="font-body text-xs font-bold text-secondary uppercase tracking-widest mb-3 block">
                {isHindi ? 'संबंधित पवित्र देवस्थल' : 'ASSOCIATED SACRED SHRINE'}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-6">
                {isHindi ? 'गुग्गा देवता' : 'Gugga Devta'}
              </h2>
              
              <div className="flex items-center gap-3 opacity-60 mb-8">
                <div className="h-px w-12 bg-outline-variant/50"></div>
                <div className="text-secondary text-lg">❖</div>
                <div className="h-px w-12 bg-outline-variant/50"></div>
              </div>
              
              <p className="font-body text-base md:text-lg text-on-surface-variant leading-relaxed mb-8">
                {isHindi 
                  ? "माता शीतला की पवित्र परंपरा के साथ मंदिर परिसर में गुग्गा देवता का देवस्थल भी श्रद्धा का केंद्र है। मंदिर के ऐतिहासिक विवरण के अनुसार, माता शीतला की मूर्ति के साथ गुग्गा देवता की मूर्ति भी लाई गई थी और मंदिर से जुड़े अलग देवस्थल में उनकी पूजा-अर्चना की जाती है।"
                  : "Alongside the sacred tradition of Mata Sheetla, the temple complex also preserves the revered presence of Gugga Devta. According to the temple's historical account, the idol of Gugga Devta was brought along with Mata Sheetla and is worshipped in a separate shrine associated with the mandir."}
              </p>
              
              <p className="font-hindi text-lg text-tertiary font-semibold italic">
                {isHindi 
                  ? "लगदेवी की धार्मिक एवं लोक-आस्था परंपरा का एक पवित्र अंग।"
                  : "A living part of the spiritual heritage of Lagdevi."}
              </p>
            </div>
          </div>
        </div>

        {/* Devotional FAQ Accordion */}
        <div className="max-w-3xl mx-auto space-y-6">
          <SectionHeading
            tag="DEVOTIONAL FAQS"
            title="Common Questions"
            subtitle="Guidance for pilgrims and worshippers visiting Sheetla Mata Mandir."
          />

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex justify-between items-center font-display font-bold text-base md:text-lg text-primary hover:text-secondary transition-colors"
                >
                  <span>{isHindi ? faq.hindiQ : faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 ${
                      openFaq === idx ? 'rotate-180 text-secondary' : 'text-on-surface-variant'
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="p-5 pt-0 font-body text-sm text-on-surface-variant leading-relaxed border-t border-outline-variant/20 bg-surface-container-low/30">
                    {isHindi ? faq.hindiA : faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
