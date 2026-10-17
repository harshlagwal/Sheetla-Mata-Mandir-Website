import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { templeData, TEMPLE_LOCATION } from '../data/temple';
import { visitorServicesData, ServiceItem } from '../data/visitorServices';
import { 
  Clock, 
  MapPin, 
  Navigation, 
  ShieldCheck, 
  ShoppingBag, 
  User, 
  Phone, 
  Store, 
  Compass,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Car,
  Sun,
  Flame,
  Landmark,
  VolumeX,
  Footprints,
  Shirt,
  Info,
  X,
  HeartPulse,
  Pill,
  PhoneCall,
  BedDouble,
  ShieldAlert,
  Building2,
  ExternalLink,
  Layers,
  Map as MapIcon
} from 'lucide-react';

type RouteType = 'uhal' | 'jandru';
type MapViewMode = 'normal' | 'satellite';
type ModalType = 'none' | 'route' | 'etiquette' | 'services';
type FilterCategory = 'all' | 'medical' | 'emergency' | 'atm' | 'stay' | 'police';

export const Visit: React.FC = () => {
  const { t, isHindi } = useLanguage();
  const [mapMode, setMapMode] = useState<MapViewMode>('normal');
  const [selectedRoute, setSelectedRoute] = useState<RouteType>('uhal');
  const [activeModal, setActiveModal] = useState<ModalType>('none');
  const [servicesFilter, setServicesFilter] = useState<FilterCategory>('all');

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModal('none');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent background scroll when modal is active
  useEffect(() => {
    if (activeModal !== 'none') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeModal]);

  // Dynamic Google Map Embed URL
  const mapEmbedUrl = `https://maps.google.com/maps?q=${TEMPLE_LOCATION.lat},${TEMPLE_LOCATION.lng}&t=${mapMode === 'satellite' ? 'k' : 'm'}&z=${mapMode === 'satellite' ? 18 : 17}&output=embed`;

  // Get icon for visitor services items
  const getServiceIcon = (iconType: ServiceItem['iconType']) => {
    switch (iconType) {
      case 'hospital':
        return (
          <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-700 border border-rose-200/80 flex items-center justify-center shrink-0 shadow-2xs">
            <HeartPulse className="w-4 h-4" />
          </div>
        );
      case 'pharmacy':
        return (
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200/80 flex items-center justify-center shrink-0 shadow-2xs">
            <Pill className="w-4 h-4" />
          </div>
        );
      case 'ambulance':
        return (
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-800 border border-amber-200/80 flex items-center justify-center shrink-0 shadow-2xs">
            <PhoneCall className="w-4 h-4" />
          </div>
        );
      case 'atm':
        return (
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 border border-blue-200/80 flex items-center justify-center shrink-0 shadow-2xs">
            <Landmark className="w-4 h-4" />
          </div>
        );
      case 'stay':
        return (
          <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 border border-purple-200/80 flex items-center justify-center shrink-0 shadow-2xs">
            <BedDouble className="w-4 h-4" />
          </div>
        );
      case 'police':
        return (
          <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200/80 flex items-center justify-center shrink-0 shadow-2xs">
            <ShieldAlert className="w-4 h-4" />
          </div>
        );
      default:
        return (
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-800 border border-amber-200/80 flex items-center justify-center shrink-0 shadow-2xs">
            <Building2 className="w-4 h-4" />
          </div>
        );
    }
  };

  // Filtered services list
  const allServiceItems = visitorServicesData.flatMap(c => c.items);
  const filteredServices = allServiceItems.filter(item => {
    if (servicesFilter === 'all') return true;
    if (servicesFilter === 'medical') return item.iconType === 'hospital' || item.iconType === 'pharmacy';
    if (servicesFilter === 'emergency') return item.isEmergencyCard || item.iconType === 'ambulance';
    if (servicesFilter === 'atm') return item.iconType === 'atm';
    if (servicesFilter === 'stay') return item.iconType === 'stay';
    if (servicesFilter === 'police') return item.iconType === 'police';
    return true;
  });

  return (
    <div className="w-full bg-[#fdfbf9] text-slate-900 selection:bg-amber-500/20 selection:text-amber-900 pt-28 sm:pt-32 pb-24 overflow-x-hidden">
      
      {/* ── 1. CLEAN EDITORIAL HERO (GOOGLE-LIKE MINIMAL) ── */}
      <section className="relative px-4 sm:px-6 max-w-[1240px] mx-auto text-center flex flex-col items-center mb-8 sm:mb-12">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[320px] bg-gradient-to-b from-amber-400/15 via-amber-200/5 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-900 text-xs font-semibold mb-3 backdrop-blur-xs shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span className="font-hindi tracking-wider">॥ ॐ श्री शीतलायै नमः ॥</span>
          <span className="text-amber-800/40">•</span>
          <span className="text-[11px] font-mono tracking-widest uppercase text-amber-800">
            {isHindi ? 'तीर्थयात्रा निर्देशिका' : 'PILGRIMAGE GUIDE'}
          </span>
        </div>

        <h1 className="font-google text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-bold text-slate-900 tracking-[-0.02em] leading-[1.15] max-w-3xl">
          {isHindi ? 'पावन लगदेवी धाम दर्शन निर्देशिका' : 'Plan Your Sacred Visit to Lagdevi'}
        </h1>

        <p className="font-google text-slate-500 text-sm sm:text-base max-w-lg mx-auto mt-4 leading-[1.7] font-normal">
          {isHindi
            ? 'दैनिक आरती समय, लगदेवी का लाइव मैप, आने का सरल मार्ग और स्थानीय जनसुविधाओं की संपूर्ण जानकारी।'
            : 'Sacred timings, interactive Lagdevi map, route guidelines, and local amenities for devotees.'}
        </p>
      </section>

      {/* ── 2. EDITORIAL COLUMNS & MAP SECTION (CONTAINER ALIGNED) ── */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-12">
        {/* ── 3 EDITORIAL COLUMNS (ANTIGRAVITY WITH LIQUID GLASS BUTTONS) ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 items-start">
            
            {/* ── COLUMN 1: SACRED TIMINGS & DARSHAN ── */}
            <div className="flex flex-col items-start text-left">
              {/* Standalone Icon without cards/boxes */}
              <Clock className="w-7 h-7 text-slate-400 stroke-[1.6] mb-5" />

              <h2 className="font-google text-base sm:text-[1.1rem] font-semibold text-slate-900 tracking-[-0.01em] leading-snug mb-2.5">
                {isHindi ? 'दैनिक आरती एवं पावन दर्शन समय' : 'Sacred Aarti & Daily Darshan Schedule'}
              </h2>

              <p className="font-google text-slate-500 text-sm leading-[1.75] mb-7 font-normal">
                {isHindi
                  ? 'माता शीतला के कपाट नित्य प्रातः 4:00 बजे से रात्रि 9:00 बजे तक खुले रहते हैं। प्रातःकालीन दिव्य आरती 6:00 AM तथा संध्या आरती 7:00 PM पर संपन्न होती है।'
                  : 'Lagdevi Dham welcomes devotees daily from 4:00 AM to 9:00 PM. Experience divine peace during the Morning Aarti at 6:00 AM and Evening Sandhya Aarti at 7:00 PM.'}
              </p>

              {/* Liquid Glass Button */}
              <button
                type="button"
                onClick={() => setActiveModal('etiquette')}
                className="group relative inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 hover:from-slate-700 hover:to-slate-900 backdrop-blur-xl border border-slate-700/60 shadow-[0_4px_16px_rgba(15,23,42,0.22),inset_0_1.5px_1px_rgba(255,255,255,0.12),inset_0_-1px_1px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_28px_rgba(15,23,42,0.38),inset_0_1.5px_1px_rgba(255,255,255,0.15)] text-white hover:text-amber-200 font-google text-xs sm:text-sm font-semibold tracking-tight transition-all duration-300 cursor-pointer active:scale-95"
              >
                <span>{isHindi ? 'पवित्र मर्यादा एवं नियम देखें' : 'View Temple Etiquette & Rules'}</span>
                <ArrowRight className="w-4 h-4 text-amber-400 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* ── COLUMN 2: DIRECT ROUTES & VERIFIED STORES ── */}
            <div className="flex flex-col items-start text-left">
              {/* Standalone Icon without cards/boxes */}
              <Compass className="w-7 h-7 text-slate-400 stroke-[1.6] mb-5" />

              <h2 className="font-google text-base sm:text-[1.1rem] font-semibold text-slate-900 tracking-[-0.01em] leading-snug mb-2.5">
                {isHindi ? 'सरल आगमन मार्ग एवं प्रमाणित पूजा भंडार' : 'Approach Routes & Verified Puja Stores'}
              </h2>

              <p className="font-google text-slate-500 text-sm leading-[1.75] mb-7 font-normal">
                {isHindi
                  ? 'उहल व चौरी (4.2 km) अथवा जंदरू व कढ़ियार (3.8 km) के सुगम मार्ग से मंदिर पहुंचे। मार्ग में कश्मीर जनरल स्टोर (~300m) व ठाकुर जनरल स्टोर (~100m) पर शुद्ध प्रसाद व पूजा सामग्री उपलब्ध है।'
                  : 'Reach Lagdevi smoothly via scenic Uhal Road (4.2 km) or the paved Jandru route (3.8 km). Certified stores including Kashmir General Store (~300m) and Thakur Store (~100m) provide fresh prasad.'}
              </p>

              {/* Liquid Glass Button */}
              <button
                type="button"
                onClick={() => setActiveModal('route')}
                className="group relative inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 hover:from-slate-700 hover:to-slate-900 backdrop-blur-xl border border-slate-700/60 shadow-[0_4px_16px_rgba(15,23,42,0.22),inset_0_1.5px_1px_rgba(255,255,255,0.12),inset_0_-1px_1px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_28px_rgba(15,23,42,0.38),inset_0_1.5px_1px_rgba(255,255,255,0.15)] text-white hover:text-amber-200 font-google text-xs sm:text-sm font-semibold tracking-tight transition-all duration-300 cursor-pointer active:scale-95"
              >
                <span>{isHindi ? 'विस्तृत मार्ग व स्टोर विवरण खोलें' : 'Open Route Guide & Stores'}</span>
                <ArrowRight className="w-4 h-4 text-amber-400 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* ── COLUMN 3: 24×7 EMERGENCY & PILGRIM CARE ── */}
            <div className="flex flex-col items-start text-left">
              {/* Standalone Icon without cards/boxes */}
              <PhoneCall className="w-7 h-7 text-slate-400 stroke-[1.6] mb-5" />

              <h2 className="font-google text-base sm:text-[1.1rem] font-semibold text-slate-900 tracking-[-0.01em] leading-snug mb-2.5">
                {isHindi ? '24×7 आपातकालीन सहायता एवं जनसुविधाएँ' : '24×7 Emergency Helplines & Pilgrim Care'}
              </h2>

              <p className="font-google text-slate-500 text-sm leading-[1.75] mb-7 font-normal">
                {isHindi
                  ? 'तीर्थयात्रियों की सुविधा व सुरक्षा हेतु एम्बुलेंस (108) तथा पुलिस (112) सहायता 24 घंटे उपलब्ध है। कढ़ियार व उहल में प्राथमिक स्वास्थ्य केंद्र, यूको बैंक एटीएम व विश्राम व्यवस्था उपलब्ध है।'
                  : 'Immediate assistance is available round-the-clock via Ambulance (108) and Police (112). Primary medical centers, UCO Bank ATM, and verified resting stays are located nearby in Kadhiyar & Uhal.'}
              </p>

              {/* Liquid Glass Button */}
              <button
                type="button"
                onClick={() => setActiveModal('services')}
                className="group relative inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 hover:from-slate-700 hover:to-slate-900 backdrop-blur-xl border border-slate-700/60 shadow-[0_4px_16px_rgba(15,23,42,0.22),inset_0_1.5px_1px_rgba(255,255,255,0.12),inset_0_-1px_1px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_28px_rgba(15,23,42,0.38),inset_0_1.5px_1px_rgba(255,255,255,0.15)] text-white hover:text-amber-200 font-google text-xs sm:text-sm font-semibold tracking-tight transition-all duration-300 cursor-pointer active:scale-95"
              >
                <span>{isHindi ? 'सभी जनसुविधाएँ व संपर्क देखें' : 'View Facilities & Contacts'}</span>
                <ArrowRight className="w-4 h-4 text-amber-400 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

          </div>

          {/* ── SUBTLE DIVIDER ── */}
          <div className="border-t border-slate-200/80 pt-8" />

          {/* ── GOOGLE MAPS SECTION (INTEGRATED SEAMLESSLY) ── */}
          <div className="space-y-4">
            
            {/* Map Header with Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2">
              
              {/* Location Pin & Coordinates without box */}
              <div className="flex items-center gap-3">
                <MapPin className="w-7 h-7 text-amber-600 stroke-[2.2] shrink-0" />
                <div>
                  <h3 className="font-google font-bold text-base sm:text-lg text-slate-950 tracking-tight">
                    Sheetla Mata Mandir, Lagdevi
                  </h3>
                  <span className="text-xs font-google font-normal text-slate-500 block">
                    Hamirpur, HP • 31.7565° N, 76.5997° E
                  </span>
                </div>
              </div>

              {/* Switcher & Directions Button */}
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                
                {/* Normal vs Satellite Toggle in Liquid Glass Container */}
                <div className="inline-flex p-1 rounded-full bg-gradient-to-b from-white/80 via-white/40 to-white/60 backdrop-blur-xl border border-white/90 shadow-[0_4px_16px_rgba(0,0,0,0.05),inset_0_1.5px_1px_white]">
                  <button
                    type="button"
                    onClick={() => setMapMode('normal')}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-google text-xs font-semibold transition-all cursor-pointer ${
                      mapMode === 'normal'
                        ? 'bg-gradient-to-b from-white to-slate-50 text-slate-950 shadow-[0_2px_8px_rgba(0,0,0,0.1),inset_0_1px_1px_white] border border-slate-200/80'
                        : 'text-slate-600 hover:text-slate-950'
                    }`}
                  >
                    <MapIcon className="w-3.5 h-3.5 text-amber-700" />
                    <span>{isHindi ? 'मानचित्र' : 'Road Map'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMapMode('satellite')}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-google text-xs font-semibold transition-all cursor-pointer ${
                      mapMode === 'satellite'
                        ? 'bg-gradient-to-b from-slate-900 to-slate-950 text-white shadow-[0_2px_8px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.25)] border border-slate-900'
                        : 'text-slate-600 hover:text-slate-950'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5 text-amber-300" />
                    <span>{isHindi ? 'सैटेलाइट 3D' : 'Satellite 3D'}</span>
                  </button>
                </div>

                {/* Direct Google Maps Direction CTA - Liquid Glass Styled */}
                <a
                  href={TEMPLE_LOCATION.mapDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 hover:from-slate-800 hover:to-slate-900 text-white text-xs font-google font-semibold tracking-tight shadow-[0_4px_16px_rgba(15,23,42,0.18),inset_0_1.5px_1px_rgba(255,255,255,0.25)] hover:shadow-[0_8px_24px_rgba(15,23,42,0.28)] border border-slate-800 active:scale-95 transition-all duration-300"
                >
                  <Navigation className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isHindi ? 'दिशा-निर्देश प्राप्त करें' : 'Get Directions'}</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>

              </div>
            </div>

            {/* Responsive Map Embed */}
            <div className="relative w-full rounded-2xl overflow-hidden border border-slate-200/90 shadow-inner h-[380px] sm:h-[460px] md:h-[500px] bg-slate-100">
              <iframe
                key={mapMode}
                title="Sheetla Mata Mandir Lagdevi Map"
                src={mapEmbedUrl}
                className="w-full h-full border-0"
                loading="lazy"
              />

              {/* Live GPS Badge */}
              <div className="absolute top-3.5 left-3.5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-white/90 text-xs font-google font-semibold text-slate-900 shadow-sm pointer-events-none">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{mapMode === 'satellite' ? 'Lagdevi Satellite GPS Live' : 'Lagdevi Road Map Live'}</span>
              </div>
            </div>

          </div>

      </section>

      {/* ── 4. FRAMER MOTION ON-DEMAND MODAL SYSTEM (CLEAN & EXPANDABLE) ── */}
      <AnimatePresence>
        {activeModal !== 'none' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal('none')}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-3xl bg-white rounded-2xl md:rounded-3xl border border-slate-200 shadow-2xl overflow-hidden z-10 my-auto max-h-[90vh] flex flex-col"
            >
              
              {/* Modal Header */}
              <div className="px-5 sm:px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-[#fdfbf9] shrink-0">
                <div className="flex items-center gap-2.5">
                  {activeModal === 'route' && <Compass className="w-5 h-5 text-amber-600" />}
                  {activeModal === 'etiquette' && <ShieldCheck className="w-5 h-5 text-amber-600" />}
                  {activeModal === 'services' && <Building2 className="w-5 h-5 text-amber-600" />}
                  <div>
                    <h3 className="font-display font-bold text-base sm:text-lg text-slate-900">
                      {activeModal === 'route' && (isHindi ? 'मार्ग गाइड एवं पूजा स्टोर विवरण' : 'Approach Routes & Nearby Puja Stores')}
                      {activeModal === 'etiquette' && (isHindi ? 'पवित्र मर्यादा एवं दर्शन नियम' : 'Sacred Etiquette & Pilgrim Decorum')}
                      {activeModal === 'services' && (isHindi ? 'नज़दीकी जनसुविधाएँ एवं आपातकालीन नंबर' : 'Nearby Facilities & Emergency Helplines')}
                    </h3>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveModal('none')}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body - Scrollable */}
              <div className="p-5 sm:p-6 overflow-y-auto space-y-6">

                {/* ── MODAL 1: ROUTE & PUJA STORES ── */}
                {activeModal === 'route' && (
                  <div className="space-y-6">
                    {/* Segmented Switcher */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-xl bg-[#fdfbf9] border border-slate-200/80">
                      <span className="text-xs font-semibold text-slate-700">
                        {isHindi ? 'आने का मार्ग चुनें:' : 'Select Your Approach Route:'}
                      </span>
                      <div className="inline-flex p-1 bg-white rounded-xl border border-slate-200 shadow-2xs w-full sm:w-auto">
                        <button
                          type="button"
                          onClick={() => setSelectedRoute('uhal')}
                          className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-google font-semibold transition-all ${
                            selectedRoute === 'uhal'
                              ? 'bg-gradient-to-b from-slate-800 to-slate-950 text-white shadow-[0_2px_8px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.12)] border border-slate-700'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          <Car className="w-3.5 h-3.5" />
                          <span>{isHindi ? 'उहल / चौरी मार्ग से' : 'Via Uhal / Chauri'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setSelectedRoute('jandru')}
                          className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-google font-semibold transition-all ${
                            selectedRoute === 'jandru'
                              ? 'bg-gradient-to-b from-slate-800 to-slate-950 text-white shadow-[0_2px_8px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.12)] border border-slate-700'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          <Car className="w-3.5 h-3.5" />
                          <span>{isHindi ? 'जंदरू / कढ़ियार मार्ग से' : 'Via Jandru / Kadhiyar'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Dynamic Stepper Sequence */}
                    <div className="p-4 rounded-xl bg-[#fdfbf9] border border-slate-200/80">
                      <div className="text-xs font-bold text-slate-900 mb-2.5 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>
                          {selectedRoute === 'uhal'
                            ? (isHindi ? 'मार्ग क्रम: उहल / चौरी ➔ कश्मीर स्टोर ➔ ठाकुर स्टोर ➔ मंदिर' : 'Route Sequence: Uhal ➔ Kashmir Store ➔ Thakur Store ➔ Mandir')
                            : (isHindi ? 'मार्ग क्रम: जंदरू / कढ़ियार ➔ मंदिर दर्शन ➔ आगे ठाकुर व कश्मीर स्टोर' : 'Route Sequence: Jandru ➔ Mandir ➔ Ahead Thakur & Kashmir Stores')}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                        {selectedRoute === 'uhal'
                          ? (isHindi ? 'यदि आप उहल या चौरी की तरफ से आ रहे हैं, तो दोनों स्टोर मंदिर से पहले सड़क किनारे मिलेंगे।' : 'Both certified puja stores appear along your road before reaching the sacred temple.')
                          : (isHindi ? 'यदि आप जंदरू या कढ़ियार की तरफ से आ रहे हैं, तो पहले मंदिर मिलेगा, आगे उहल की ओर स्टोर स्थित हैं।' : 'Temple appears first; stores are located right ahead along the road towards Uhal.')}
                      </p>

                      {/* Store 1 & Store 2 Cards in Modal */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Kashmir Store */}
                        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <span className="text-[10px] font-google uppercase text-blue-800 font-semibold bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">Verified Store</span>
                              <h4 className="font-google font-semibold text-sm text-slate-950 mt-1">Kashmir General Store</h4>
                              <p className="text-xs font-semibold text-slate-700 mt-0.5">Manish Kumar • 8:00 AM - 5:00 PM</p>
                            </div>
                            <span className="text-xs font-google font-bold bg-amber-100 text-amber-950 border border-amber-300 px-2 py-0.5 rounded">
                              ~300 m
                            </span>
                          </div>
                          <div className="flex gap-2 pt-1 border-t border-slate-100">
                            <a
                              href="https://www.google.com/maps/dir/?api=1&destination=31.755483394691502,76.60101804299899"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 text-center py-2 px-3 rounded-lg bg-gradient-to-b from-slate-800 to-slate-950 hover:from-slate-700 hover:to-slate-900 text-white text-xs font-google font-semibold shadow-[0_2px_8px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.1)] border border-slate-700 transition-all active:scale-95"
                            >
                              Maps
                            </a>
                            <a
                              href="tel:7876635677"
                              className="flex-1 text-center py-2 px-3 rounded-lg bg-white/90 backdrop-blur-sm border border-slate-200 text-slate-800 text-xs font-google font-semibold hover:bg-white hover:border-slate-300 transition-all shadow-2xs active:scale-95"
                            >
                              Call: 7876635677
                            </a>
                          </div>
                        </div>

                        {/* Thakur Store */}
                        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <span className="text-[10px] font-google uppercase text-blue-800 font-semibold bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">Verified Store</span>
                              <h4 className="font-google font-semibold text-sm text-slate-950 mt-1">Thakur General Store</h4>
                              <p className="text-xs font-semibold text-slate-700 mt-0.5">Rahul Thakur • 7:00 AM - 7:00 PM</p>
                            </div>
                            <span className="text-xs font-google font-bold bg-amber-100 text-amber-950 border border-amber-300 px-2 py-0.5 rounded">
                              ~100 m
                            </span>
                          </div>
                          <div className="flex gap-2 pt-1 border-t border-slate-100">
                            <a
                              href="https://www.google.com/maps/dir/?api=1&destination=31.755489512684075,76.59955024601709"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 text-center py-2 px-3 rounded-lg bg-gradient-to-b from-slate-800 to-slate-950 hover:from-slate-700 hover:to-slate-900 text-white text-xs font-google font-semibold shadow-[0_2px_8px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.1)] border border-slate-700 transition-all active:scale-95"
                            >
                              Maps
                            </a>
                            <a
                              href="tel:8627001182"
                              className="flex-1 text-center py-2 px-3 rounded-lg bg-white/90 backdrop-blur-sm border border-slate-200 text-slate-800 text-xs font-google font-semibold hover:bg-white hover:border-slate-300 transition-all shadow-2xs active:scale-95"
                            >
                              Call: 8627001182
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-700 font-medium italic">
                      <Info className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>{isHindi ? 'प्रसाद एवं पूजा सामग्री की उपलब्धता के अनुसार समय में परिवर्तन हो सकता है।' : 'Prasad items and opening timings are subject to availability.'}</span>
                    </div>
                  </div>
                )}

                {/* ── MODAL 2: SACRED ETIQUETTE ── */}
                {activeModal === 'etiquette' && (
                  <div className="space-y-4">
                    <p className="text-xs text-slate-800 font-medium leading-relaxed">
                      {isHindi
                        ? 'माँ शीतला के पावन धाम की पवित्रता और शांति बनाए रखने के लिए सभी श्रद्धालुओं से इन नियमों का पालन करने की विनम्र प्रार्थना है:'
                        : 'To preserve the spiritual grace and sanctity of Sheetla Mata Mandir, devotees are kindly requested to follow these guidelines:'}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 shadow-2xs">
                        <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-900 border border-amber-500/30 flex items-center justify-center">
                          <Footprints className="w-4 h-4" />
                        </div>
                        <h4 className="font-google font-semibold text-xs sm:text-sm text-slate-900 uppercase tracking-wide">{isHindi ? 'चरण पादुका' : 'Footwear'}</h4>
                        <p className="text-xs text-slate-700 font-medium leading-relaxed">{t.visitPage.etiquette1}</p>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 shadow-2xs">
                        <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-900 border border-amber-500/30 flex items-center justify-center">
                          <VolumeX className="w-4 h-4" />
                        </div>
                        <h4 className="font-google font-semibold text-xs sm:text-sm text-slate-900 uppercase tracking-wide">{isHindi ? 'शांति व ध्यान' : 'Silence'}</h4>
                        <p className="text-xs text-slate-700 font-medium leading-relaxed">{t.visitPage.etiquette2}</p>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 shadow-2xs">
                        <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-900 border border-amber-500/30 flex items-center justify-center">
                          <Shirt className="w-4 h-4" />
                        </div>
                        <h4 className="font-google font-semibold text-xs sm:text-sm text-slate-900 uppercase tracking-wide">{isHindi ? 'मर्यादित वेशभूषा' : 'Modest Attire'}</h4>
                        <p className="text-xs text-slate-700 font-medium leading-relaxed">{t.visitPage.etiquette3}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── MODAL 3: EMERGENCY & NEARBY FACILITIES ── */}
                {activeModal === 'services' && (
                  <div className="space-y-4">
                    {/* Emergency Toll-Free Bar */}
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-red-600 text-white flex items-center justify-center shadow-xs">
                          <PhoneCall className="w-4 h-4 animate-pulse" />
                        </div>
                        <div>
                          <span className="font-google font-bold text-xs sm:text-sm text-red-950 block">
                            {isHindi ? '24×7 आपातकालीन नंबर' : 'National 24×7 Helplines'}
                          </span>
                          <span className="text-xs font-semibold text-red-800">Toll-free emergency response services for HP</span>
                        </div>
                      </div>
                      <div className="flex gap-2 w-full sm:w-auto">
                        <a href="tel:108" className="flex-1 sm:flex-initial px-4 py-2 rounded-lg bg-gradient-to-b from-red-500 to-red-700 hover:from-red-400 hover:to-red-600 text-white text-xs font-google font-bold text-center shadow-[0_2px_8px_rgba(220,38,38,0.3),inset_0_1px_1px_rgba(255,255,255,0.15)] border border-red-600 transition-all active:scale-95">
                          108 (Ambulance)
                        </a>
                        <a href="tel:112" className="flex-1 sm:flex-initial px-4 py-2 rounded-lg bg-gradient-to-b from-slate-800 to-slate-950 hover:from-slate-700 hover:to-slate-900 text-amber-300 text-xs font-google font-bold text-center shadow-[0_2px_8px_rgba(15,23,42,0.25),inset_0_1px_1px_rgba(255,255,255,0.12)] border border-slate-700 transition-all active:scale-95">
                          112 (Police)
                        </a>
                      </div>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex flex-wrap gap-1.5 border-b border-slate-200 pb-2.5">
                      {[
                        { id: 'all', label: isHindi ? 'सभी' : 'All' },
                        { id: 'medical', label: isHindi ? 'चिकित्सा' : 'Medical' },
                        { id: 'emergency', label: isHindi ? 'आपातकाल' : 'Emergency' },
                        { id: 'atm', label: isHindi ? 'एटीएम' : 'ATM' },
                        { id: 'stay', label: isHindi ? 'ठहरने की व्यवस्था' : 'Stay' },
                        { id: 'police', label: isHindi ? 'पुलिस' : 'Police' },
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setServicesFilter(tab.id as FilterCategory)}
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-google font-semibold transition-all cursor-pointer ${
                            servicesFilter === tab.id
                              ? 'bg-gradient-to-b from-slate-800 to-slate-950 text-white shadow-[0_2px_8px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.1)] border border-slate-700'
                              : 'bg-slate-50 text-slate-700 hover:text-slate-950 border border-slate-200 hover:border-slate-300 hover:bg-white'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    {/* Clean Service Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[48vh] overflow-y-auto pr-1">
                      {filteredServices.map((item) => (
                        <div
                          key={item.id}
                          className="p-4 rounded-xl bg-slate-50/90 border border-slate-200 hover:border-amber-400/80 hover:bg-white transition-all flex flex-col justify-between space-y-3 shadow-2xs"
                        >
                          <div className="flex items-start gap-3">
                            {getServiceIcon(item.iconType)}
                            <div>
                              <span className="text-[10px] font-google font-semibold text-amber-900 uppercase block tracking-wide">
                                {isHindi ? item.hindiType : item.type}
                              </span>
                              <h5 className="font-google font-semibold text-xs sm:text-sm text-slate-900 leading-snug mt-0.5">
                                {isHindi ? item.hindiName : item.name}
                              </h5>
                              <p className="text-xs text-slate-700 font-medium mt-1 leading-relaxed">
                                {isHindi ? item.hindiDescription : item.description}
                              </p>
                            </div>
                          </div>

                          <div className="pt-2.5 border-t border-slate-200 flex items-center justify-between">
                            {item.destinationUrl && (
                              <a
                                href={item.destinationUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-950 hover:text-amber-800 transition-colors"
                              >
                                <Navigation className="w-3.5 h-3.5 text-amber-600" />
                                <span>{isHindi ? 'मैप्स पर देखें' : 'View on Maps'}</span>
                              </a>
                            )}

                            {item.callButtons && item.callButtons.length > 0 && (
                              <a
                                href={`tel:${item.callButtons[0].number}`}
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 hover:text-amber-950 bg-amber-100/80 px-2 py-0.5 rounded border border-amber-300/80 transition-colors"
                              >
                                <Phone className="w-3 h-3 text-amber-700" />
                                <span>{item.callButtons[0].number}</span>
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
