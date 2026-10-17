import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import {
  ArrowLeft,
  ShieldCheck,
  Heart,
  Lock,
  EyeOff,
  MapPin,
  FileCheck,
  Mail,
  Sparkles,
  Landmark
} from 'lucide-react';
import { templeData } from '../data/temple';

export const PrivacyPolicy: React.FC = () => {
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
    <div className="w-full bg-[#fdfbf9] text-slate-900 selection:bg-amber-500/20 selection:text-amber-900 pt-28 sm:pt-32 pb-24 overflow-x-hidden min-h-screen">
      
      {/* Ambient Decorative Halo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[340px] bg-gradient-to-b from-amber-400/12 via-amber-200/5 to-transparent blur-3xl pointer-events-none -z-10" />

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
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="font-hindi tracking-wider">॥ ॐ श्री शीतलायै नमः ॥</span>
            <span className="text-amber-800/40">•</span>
            <span className="text-[11px] font-mono tracking-widest uppercase text-amber-800">
              {isHindi ? 'डिजिटल सुरक्षा एवं गोपनीयता' : 'DEVOTIONAL DIGITAL PRIVACY'}
            </span>
          </div>

          <h1 className="font-google text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-[-0.02em] leading-tight">
            {isHindi ? 'गोपनीयता नीति (Privacy Policy)' : 'Privacy Policy & Devotee Trust'}
          </h1>

          <p className="font-google text-xs sm:text-sm text-slate-500 mt-2 font-normal">
            {isHindi
              ? 'अंतिम अद्यतन: अक्टूबर 2026 • श्री शीतला माता मंदिर धाम, लगदेवी (हमीरपुर, हि.प्र.)'
              : 'Last Updated: October 2026 • Shri Sheetla Mata Mandir, Village Lagdevi, Himachal Pradesh'}
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
                DEVOTIONAL DEDICATION & INITIATIVE • निष्काम सेवा संकल्प
              </span>
              <h2 className="font-google text-lg sm:text-xl font-bold text-slate-950 tracking-tight">
                {isHindi
                  ? 'मातृभूमि लगदेवी एवं माता के चरणों में समर्पित डिजिटल पहल'
                  : 'A Sacred Digital Initiative Dedicated by Harsh Lagwal'}
              </h2>
            </div>
          </div>

          <div className="space-y-3 font-google text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
            <p>
              {isHindi ? (
                <>
                  यह आधिकारिक डिजिटल मंच <strong>हर्ष लगवाल (Harsh Lagwal)</strong> द्वारा अपनी जन्मभूमि — पावन ग्राम <strong>लगदेवी (Lagdevi, Hamirpur, Himachal Pradesh)</strong> एवं कुलदेवी <strong>श्री शीतला माता मंदिर</strong> के प्रति अनन्य आस्था, सांस्कृतिक धरोहर के संरक्षण तथा देश-विदेश में बसे श्रद्धालुओं की निस्वार्थ सेवा हेतु एक पवित्र भेंट के रूप में विकसित किया गया है।
                </>
              ) : (
                <>
                  This official digital portal was conceptualized, architected, and dedicated by <strong>Harsh Lagwal</strong> as a heartfelt, non-commercial devotional contribution (*Nishkam Seva*) for his ancestral home — the serene Himalayan village of <strong>Lagdevi (Hamirpur, Himachal Pradesh)</strong> — and the consecrated sanctuary of <strong>Shri Sheetla Mata Mandir</strong>.
                </>
              )}
            </p>
            <p className="text-slate-600">
              {isHindi ? (
                <>
                  इस पहल का एकमात्र उद्देश्य लगदेवी धाम के ऐतिहासिक महत्व, सदियों पुराने शिलालेख, दैनिक आरती समय, उत्सवों व दर्शन मार्गों को श्रद्धालुओं तक सहज, आधुनिक और विश्वसनीय रूप में पहुंचाना है।
                </>
              ) : (
                <>
                  The sole mission of this endeavor is to preserve divine village traditions, authenticate sacred Shilalekh history, and empower pilgrims worldwide with verified aarti timings, direct approach routes, and peaceful pilgrimage guidance.
                </>
              )}
            </p>
          </div>
        </section>

        {/* ── 2. POLICY SECTIONS ── */}
        <div className="space-y-10 font-google text-slate-700 text-xs sm:text-sm leading-relaxed">
          
          {/* Section: Devotee Data */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
            <div className="flex items-center gap-2.5 text-slate-900">
              <EyeOff className="w-5 h-5 text-amber-600 shrink-0" />
              <h3 className="text-base sm:text-lg font-bold tracking-tight">
                {isHindi ? '1. श्रद्धालुओं की जानकारी एवं डेटा सुरक्षा' : '1. Devotee Information & Pure Intent'}
              </h3>
            </div>
            <p>
              {isHindi
                ? 'हम श्रद्धालुओं की निजता को सर्वोपरि मानते हैं। वेबसाइट पर केवल वही न्यूनतम जानकारी (जैसे संपर्क फ़ॉर्म में नाम, ईमेल अथवा फ़ोन नंबर) स्वीकार की जाती है जो श्रद्धालु स्वेच्छा से मंदिर प्रबंधन अथवा सेवा जानकारी हेतु साझा करते हैं।'
                : 'We treat the trust of every devotee with the highest degree of sanctity. The website only processes minimal personal details (such as your name, email, or telephone number provided voluntarily in contact inquiries) exclusively to address your devotional assistance.'}
            </p>
          </div>

          {/* Section: No Commercial Use */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
            <div className="flex items-center gap-2.5 text-slate-900">
              <Lock className="w-5 h-5 text-amber-600 shrink-0" />
              <h3 className="text-base sm:text-lg font-bold tracking-tight">
                {isHindi ? '2. शून्य व्यावसायिक मुद्रीकरण (No Commercial Misuse)' : '2. Zero Commercial Monetization'}
              </h3>
            </div>
            <p>
              {isHindi
                ? 'यह वेबसाइट पूर्णतः गैर-व्यावसायिक एवं सेवाभावी है। श्रद्धालुओं का कोई भी डेटा किसी तीसरे पक्ष (Third-party) को बेचा, साझा अथवा विज्ञापन मुद्रीकरण (Ad tracking) के लिए उपयोग नहीं किया जाता है।'
                : 'This platform is 100% devotional, non-commercial, and free of advertisements. Devotee records are never sold, rented, monetized, or shared with commercial marketing agencies or ad trackers under any circumstance.'}
            </p>
          </div>

          {/* Section: Maps & Navigation */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
            <div className="flex items-center gap-2.5 text-slate-900">
              <MapPin className="w-5 h-5 text-amber-600 shrink-0" />
              <h3 className="text-base sm:text-lg font-bold tracking-tight">
                {isHindi ? '3. मानचित्र एवं मार्ग दर्शन निर्देश (Google Maps Navigation)' : '3. Maps & Geolocation Navigation'}
              </h3>
            </div>
            <p>
              {isHindi
                ? 'मंदिर आगमन हेतु प्रदान किए गए गूगल मैप्स लिंक केवल श्रद्धालुओं की मार्ग-सुविधा हेतु हैं। वेबसाइट आपके उपकरण (Device) की कोई भी पृष्ठभूमि जीपीएस लोकेशन (Background tracking) संग्रहीत नहीं करती।'
                : 'Interactive routes to Lagdevi Mandir operate via official Google Maps embed and redirect links for pilgrimage convenience. This website does not log, harvest, or track background GPS locations from your device.'}
            </p>
          </div>

          {/* Section: Direct Seva & Trust Account */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
            <div className="flex items-center gap-2.5 text-slate-900">
              <FileCheck className="w-5 h-5 text-amber-600 shrink-0" />
              <h3 className="text-base sm:text-lg font-bold tracking-tight">
                {isHindi ? '4. पारदर्शी सेवा व दान व्यवस्था (Donation & Seva Integrity)' : '4. Transparent Seva & Direct Temple Trust'}
              </h3>
            </div>
            <p>
              {isHindi
                ? 'दान एवं सेवा की समस्त प्रक्रियाएं सीधे अधिकृत मंदिर ट्रस्ट के बैंक खाते / यूपीआई के माध्यम से संपन्न होती हैं। यह वेबसाइट किसी भी प्रकार का मध्यस्थ कमीशन अथवा भुगतान डेटा अपने सर्वर पर सुरक्षित नहीं करती।'
                : 'All voluntary offerings and religious seva donations are processed directly through the authorized Shri Sheetla Mata Mandir Trust bank account / official UPI. This portal functions strictly as an information gateway and retains zero financial card or banking credentials.'}
            </p>
          </div>

          {/* Section: Devotee Support & Contact */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
            <div className="flex items-center gap-2.5 text-slate-900">
              <Mail className="w-5 h-5 text-amber-600 shrink-0" />
              <h3 className="text-base sm:text-lg font-bold tracking-tight">
                {isHindi ? '5. सहायता एवं सेवादल संपर्क' : '5. Pilgrimage Queries & Sevadar Contact'}
              </h3>
            </div>
            <p>
              {isHindi
                ? 'यदि आपकी गोपनीयता अथवा दर्शन व्यवस्था के संबंध में कोई जिज्ञासा या सुझाव है, तो आप मंदिर कार्यालय अथवा स्थानीय सेवादल से सीधे संपर्क कर सकते हैं:'
                : 'For any inquiries regarding data protection, village heritage documentation, or pilgrimage assistance, devotees may contact the temple office directly:'}
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-slate-900">
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
            ॥ जय माँ शीतला ॥
          </span>
        </div>

      </div>
    </div>
  );
};
