import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import {
  ArrowLeft,
  Scroll,
  ShieldCheck,
  Landmark,
  Compass,
  HeartHandshake,
  BookOpen,
  Scale,
  Mail
} from 'lucide-react';
import { templeData } from '../data/temple';

export const TermsOfService: React.FC = () => {
  const { isHindi } = useLanguage();
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="relative w-full max-w-full bg-[#fdfbf9] text-slate-900 selection:bg-amber-500/20 selection:text-amber-900 pt-28 sm:pt-32 pb-24 overflow-x-hidden min-h-screen">
      
      {/* Ambient Decorative Halo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[340px] bg-gradient-to-b from-amber-400/12 via-amber-200/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
        
        {/* ── TOP NAV: BACK ARROW BUTTON ── */}
        <div className="mb-8">
          <button
            type="button"
            onClick={handleBack}
            className="btn-liquid-black group inline-flex items-center gap-2.5"
            aria-label="Go back to previous page"
          >
            <ArrowLeft className="w-4 h-4 text-amber-400 transition-transform group-hover:-translate-x-1" />
            <span>{isHindi ? 'मुख्य पृष्ठ पर वापस जाएं' : 'Back to Previous'}</span>
          </button>
        </div>

        {/* ── HEADER TITLE BLOCK ── */}
        <header className="mb-10 sm:mb-12 border-b border-slate-200/80 pb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-900 text-xs font-semibold mb-3 backdrop-blur-xs shadow-2xs">
            <Scroll className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="font-hindi tracking-wider">॥ ॐ श्री शीतलायै नमः ॥</span>
            <span className="text-amber-800/40">•</span>
            <span className="text-[11px] font-mono tracking-widest uppercase text-amber-800">
              {isHindi ? 'नियम व सेवा शर्तें' : 'TERMS OF DEVOTIONAL SERVICE'}
            </span>
          </div>

          <h1 className="font-google text-xl sm:text-2xl md:text-4xl font-bold text-slate-900 tracking-[-0.02em] leading-tight">
            {isHindi ? 'सेवा की शर्तें (Terms of Service)' : 'Terms of Service & Pilgrimage Guidelines'}
          </h1>

          <p className="font-google text-xs sm:text-sm text-slate-500 mt-2 font-normal">
            {isHindi
              ? 'अंतिम अद्यतन: अक्टूबर 2026 • श्री शीतला माता मंदिर धाम, लगदेवी (हमीरपुर, हि.प्र.)'
              : 'Last Updated: October 2026 • Shri Sheetla Mata Mandir Trust, Lagdevi, Himachal Pradesh'}
          </p>
        </header>

        {/* ── 1. DEDICATED DEVOTIONAL INITIATIVE (HARSH LAGWAL CONTRIBUTION) ── */}
        <section className="mb-12 p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-amber-500/10 via-white to-amber-50/60 border border-amber-400/40 shadow-[0_8px_30px_rgba(217,119,6,0.08)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/10 rounded-full blur-2xl pointer-events-none -z-10" />
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-b from-slate-800 to-slate-950 text-amber-300 flex items-center justify-center shadow-md border border-slate-700 shrink-0">
              <Landmark className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-800 font-bold bg-amber-100/80 px-2.5 py-0.5 rounded-full border border-amber-300/60 inline-block mb-1">
                DEVOTIONAL DEDICATION • पावन सेवा संकल्प
              </span>
              <h2 className="font-google text-lg sm:text-xl font-bold text-slate-950 tracking-tight">
                {isHindi
                  ? 'हर्ष लगवाल द्वारा ग्राम लगदेवी एवं मंदिर हेतु सादर समर्पित'
                  : 'Platform Dedicated by Harsh Lagwal to Village Lagdevi & Mandir'}
              </h2>
            </div>
          </div>

          <div className="space-y-3 font-google text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
            <p>
              {isHindi ? (
                <>
                  यह डिजिटल तीर्थस्थल <strong>हर्ष लगवाल (Harsh Lagwal)</strong> द्वारा अपनी जन्मभूमि ग्राम <strong>लगदेवी (Lagdevi)</strong> और पावन <strong>श्री शीतला माता मंदिर</strong> के प्रति परम श्रद्धा और निःस्वार्थ सेवा के उद्देश्य से बनाया गया है।
                </>
              ) : (
                <>
                  This digital pilgrimage portal was crafted and dedicated in its entirety by <strong>Harsh Lagwal</strong> as a sacred devotional tribute to his native village <strong>Lagdevi (Hamirpur, Himachal Pradesh)</strong> and the holy shrine of <strong>Shri Sheetla Mata Mandir</strong>.
                </>
              )}
            </p>
            <p className="text-slate-600">
              {isHindi ? (
                <>
                  इस मंच का मुख्य प्रयोजन देवभूमि हिमाचल की पावन परम्परा, ऐतिहासिक शिलालेख की प्रामाणिकता और दूर-दराज के श्रद्धालुओं के लिए सुगम दर्शन व मार्ग निर्देशिका उपलब्ध कराना है। इस वेबसाइट का उपयोग कर श्रद्धालु इन पावन मर्यादाओं और सेवा शर्तों का सम्मान करने की सहमति व्यक्त करते हैं।
                </>
              ) : (
                <>
                  Its noble objective is to preserve ancient Himalayan shrine heritage, authenticate historic Shilalekh inscriptions, and provide accurate, verified pilgrimage guidance. By accessing this platform, devotees honor these shared spiritual values and devotional guidelines.
                </>
              )}
            </p>
          </div>
        </section>

        {/* ── 2. TERMS ARTICLES ── */}
        <div className="space-y-10 font-google text-slate-700 text-xs sm:text-sm leading-relaxed">
          
          {/* Article 1: Decorum & Spiritual Conduct */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
            <div className="flex items-center gap-2.5 text-slate-900">
              <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
              <h3 className="text-base sm:text-lg font-bold tracking-tight">
                {isHindi ? '1. मंदिर परिसर मर्यादा एवं आचरण' : '1. Temple Decorum & Pilgrim Conduct'}
              </h3>
            </div>
            <p>
              {isHindi
                ? 'श्रद्धालुओं से अपेक्षा की जाती है कि वे मंदिर परिसर में दर्शन के समय पवित्रता, शांति, मर्यादित वेशभूषा और अनुशासनात्मक नियमों (जैसे मुख्य गर्भगृह के समक्ष चरण-पादुका उतारना, शांत वातावरण बनाए रखना) का आदरपूर्वक पालन करें।'
                : 'All visitors and pilgrims agree to preserve the divine sanctity of the sacred shrine by observing quiet reverence, appropriate modest attire, removing footwear before entering holy sanctum precincts, and cooperating with temple sevadars.'}
            </p>
          </div>

          {/* Article 2: Information Accuracy */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
            <div className="flex items-center gap-2.5 text-slate-900">
              <Compass className="w-5 h-5 text-amber-600 shrink-0" />
              <h3 className="text-base sm:text-lg font-bold tracking-tight">
                {isHindi ? '2. आरती समय एवं मार्ग विवरण की प्रामाणिकता' : '2. Timings, Route Guides & Local Stores'}
              </h3>
            </div>
            <p>
              {isHindi
                ? 'वेबसाइट पर प्रकाशित दैनिक आरती समय (प्रातः 6:00 AM, संध्या 7:00 PM), लाइव गूगल मैप्स तथा नज़दीकी सत्यापित पूजा भंडार (जैसे कश्मीर व ठाकुर जनरल स्टोर) की जानकारी पूर्ण निष्ठा से दी गई है। विशेष पर्वों, मौसम अथवा अपरिहार्य परिस्थितियों में स्थानीय समय में सूक्ष्म परिवर्तन संभव है।'
                : 'Daily Darshan hours, aarti schedules (Morning Aarti 6:00 AM, Sandhya Aarti 7:00 PM), and local verified stores (Kashmir General Store, Thakur Store) are published in good faith for pilgrimage assistance. Timings may adapt moderately during major Navratri festivals or Himalayan weather variations.'}
            </p>
          </div>

          {/* Article 3: Voluntary Seva & Daan */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
            <div className="flex items-center gap-2.5 text-slate-900">
              <HeartHandshake className="w-5 h-5 text-amber-600 shrink-0" />
              <h3 className="text-base sm:text-lg font-bold tracking-tight">
                {isHindi ? '3. स्वैच्छिक दान व सेवा (Voluntary Daan & Offerings)' : '3. Voluntary Devotion & Daan Principles'}
              </h3>
            </div>
            <p>
              {isHindi
                ? 'मंदिर के विकास, लंगर सेवा एवं अनुष्ठानों हेतु दान पूर्णतः स्वैच्छिक है। समस्त दान सीधे अधिकृत ट्रस्ट खाते में जाता है और डिजिटल पावती (Instant receipt) प्रदान की जाती है। किसी भी श्रद्धालु पर किसी प्रकार का आर्थिक दायित्व नहीं है।'
                : 'Devotional contributions towards daily langar seva, gaushala support, and shrine upkeep are entirely voluntary. Contributions are credited directly to the official Shri Sheetla Mata Mandir Trust bank account with instant devotional receipt issuance.'}
            </p>
          </div>

          {/* Article 4: Cultural Heritage & Shilalekh Intellectual Property */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
            <div className="flex items-center gap-2.5 text-slate-900">
              <BookOpen className="w-5 h-5 text-amber-600 shrink-0" />
              <h3 className="text-base sm:text-lg font-bold tracking-tight">
                {isHindi ? '4. सांस्कृतिक धरोहर एवं पावन सामग्री का सम्मान' : '4. Cultural Heritage & Sacred Imagery'}
              </h3>
            </div>
            <p>
              {isHindi
                ? 'वेबसाइट पर प्रदर्शित माता रानी के स्वरूप, ऐतिहासिक शिलालेख, आरती भजन एवं लगदेवी ग्राम की ड्रोन फुटेज सांस्कृतिक धरोहर का अंग हैं। इनका उपयोग केवल व्यक्तिगत श्रद्धा और धार्मिक अध्ययन हेतु ही मान्य है, किसी भी व्यावसायिक दुरुपयोग की अनुमति नहीं है।'
                : 'Sacred deity photographs, authentic stone inscription (Shilalekh) documentation, devotional audio tracks, and aerial footage of Lagdevi valley are consecrated cultural assets. Devotees may share them for religious reverence, but any unauthorized commercial reproduction is strictly prohibited.'}
            </p>
          </div>

          {/* Article 5: Goodwill & Jurisdiction */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
            <div className="flex items-center gap-2.5 text-slate-900">
              <Scale className="w-5 h-5 text-amber-600 shrink-0" />
              <h3 className="text-base sm:text-lg font-bold tracking-tight">
                {isHindi ? '5. सौहार्द एवं क्षेत्राधिकार (Goodwill & Jurisdiction)' : '5. Good Faith, Resolution & Jurisdiction'}
              </h3>
            </div>
            <p>
              {isHindi
                ? 'यह डिजिटल सेवा पूर्णतः धार्मिक सौहार्द और ग्राम उत्थान के पवित्र संकल्प पर आधारित है। किसी भी सुझाव अथवा विषय पर विचार विमर्श हेतु मंदिर समिति व सेवादल सदैव तत्पर हैं। किसी भी विधिक संदर्भ में हमीरपुर, हिमाचल प्रदेश का क्षेत्राधिकार मान्य होगा।'
                : 'This platform operates on foundational principles of mutual goodwill, village welfare, and sacred trust. In the improbable event of legal clarification, disputes are subject to the territorial jurisdiction of courts in Hamirpur, Himachal Pradesh, India.'}
            </p>
          </div>

          {/* Contact Details */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
            <div className="flex items-center gap-2.5 text-slate-900">
              <Mail className="w-5 h-5 text-amber-600 shrink-0" />
              <h3 className="text-base sm:text-lg font-bold tracking-tight">
                {isHindi ? '6. संपर्क व मंदिर कार्यालय' : '6. Temple Office Contact'}
              </h3>
            </div>
            <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-900 pt-1">
              <a href="mailto:lagwalharsh1@gmail.com" className="inline-flex items-center gap-1.5 hover:text-amber-700">
                <Mail className="w-3.5 h-3.5 text-amber-600" />
                <span>lagwalharsh1@gmail.com</span>
              </a>
              <span className="text-slate-300">•</span>
              <span className="text-slate-600">{templeData.address}</span>
            </div>
          </div>

        </div>

        {/* ── BOTTOM BACK BUTTON ── */}
        <div className="mt-12 pt-8 border-t border-slate-200/80 flex items-center justify-between">
          <button
            type="button"
            onClick={handleBack}
            className="btn-liquid-black group inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4 text-amber-400 transition-transform group-hover:-translate-x-1" />
            <span>{isHindi ? 'वापस जाएं' : 'Back'}</span>
          </button>

          <span className="text-xs font-hindi text-amber-800 font-semibold">
            ॥ सर्वमंगल मांगल्ये शिवे सर्वार्थ साधिके ॥
          </span>
        </div>

      </div>
    </div>
  );
};
