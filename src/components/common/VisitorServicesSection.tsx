import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Button } from './Button';
import { visitorServicesData, ServiceItem } from '../../data/visitorServices';
import {
  HeartPulse,
  Pill,
  PhoneCall,
  Landmark,
  BedDouble,
  ShieldAlert,
  Navigation,
  Phone,
  Info,
  Building2,
  ExternalLink,
  Shield,
  Clock,
  MapPin
} from 'lucide-react';

type FilterCategory = 'all' | 'medical' | 'emergency' | 'atm' | 'stay' | 'police';

export const VisitorServicesSection: React.FC = () => {
  const { isHindi } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

  const getServiceIcon = (iconType: ServiceItem['iconType']) => {
    switch (iconType) {
      case 'hospital':
        return (
          <div className="p-2.5 rounded-xl bg-rose-100 text-rose-700 border border-rose-200/90 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800 shrink-0 shadow-xs">
            <HeartPulse className="w-5 h-5" />
          </div>
        );
      case 'pharmacy':
        return (
          <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700 border border-emerald-200/90 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800 shrink-0 shadow-xs">
            <Pill className="w-5 h-5" />
          </div>
        );
      case 'ambulance':
        return (
          <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800 border border-amber-200/90 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800 shrink-0 shadow-xs">
            <PhoneCall className="w-5 h-5" />
          </div>
        );
      case 'atm':
        return (
          <div className="p-2.5 rounded-xl bg-blue-100 text-blue-700 border border-blue-200/90 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800 shrink-0 shadow-xs">
            <Landmark className="w-5 h-5" />
          </div>
        );
      case 'stay':
        return (
          <div className="p-2.5 rounded-xl bg-purple-100 text-purple-700 border border-purple-200/90 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800 shrink-0 shadow-xs">
            <BedDouble className="w-5 h-5" />
          </div>
        );
      case 'police':
        return (
          <div className="p-2.5 rounded-xl bg-indigo-100 text-indigo-700 border border-indigo-200/90 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800 shrink-0 shadow-xs">
            <ShieldAlert className="w-5 h-5" />
          </div>
        );
      default:
        return (
          <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800 border border-amber-200/90 shrink-0 shadow-xs">
            <Building2 className="w-5 h-5" />
          </div>
        );
    }
  };

  const medicalCategory = visitorServicesData.find(c => c.id === 'medical-services');

  // Filter tabs
  const tabs = [
    { id: 'all', label: isHindi ? 'सभी सेवाएँ' : 'All Services', icon: Building2 },
    { id: 'medical', label: isHindi ? 'चिकित्सा' : 'Medical', icon: HeartPulse },
    { id: 'emergency', label: isHindi ? 'आपातकाल (108/112)' : 'Emergency', icon: PhoneCall },
    { id: 'atm', label: isHindi ? 'एटीएम व नकद' : 'ATM & Cash', icon: Landmark },
    { id: 'stay', label: isHindi ? 'ठहरने की व्यवस्था' : 'Stay & Venue', icon: BedDouble },
    { id: 'police', label: isHindi ? 'पुलिस सहायता' : 'Police', icon: ShieldAlert },
  ];

  return (
    <section className="space-y-8" id="visitor-assistance-section">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="font-body text-xs font-bold text-amber-800 dark:text-amber-400 bg-amber-100/80 dark:bg-amber-950/50 px-3 py-1 rounded-full border border-amber-300/60 uppercase tracking-[0.2em] inline-block shadow-xs">
          {isHindi ? 'तीर्थयात्री सुविधा व आपातकाल' : 'ESSENTIAL SERVICES & ASSISTANCE'}
        </span>
        <h2 className="font-display font-bold text-3xl md:text-4xl text-slate-900 dark:text-white">
          {isHindi ? 'नज़दीकी जनसुविधाएँ एवं आपातकालीन नंबर' : 'Nearby Facilities & Emergency Services'}
        </h2>
        <p className="font-body text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
          {isHindi
            ? 'शीतला माता मंदिर एवं आसपास के क्षेत्रों (कढ़ियार, उहल, टौणी देवी) में उपलब्ध स्वास्थ्य, आपातकालीन व नकद निकासी सुविधाएँ।'
            : 'Essential healthcare, emergency helplines, ATM and accommodation references near Lagdevi, Kadhiyar & Uhal.'}
        </p>
      </div>

      {/* Emergency Quick Dial Bar (Govt. Standard Strip) */}
      <div className="bg-white dark:bg-slate-900 border-2 border-red-500/40 dark:border-red-600/50 rounded-2xl p-4 md:p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-full bg-red-600" />
        <div className="flex items-center gap-3.5 text-center md:text-left pl-1 sm:pl-2">
          <div className="w-11 h-11 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-sm ring-4 ring-red-100 dark:ring-red-950/60">
            <PhoneCall className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="font-display font-bold text-sm md:text-base text-slate-900 dark:text-white">
                {isHindi ? '24×7 आपातकालीन हेल्पलाइन' : '24×7 Emergency Helplines'}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-red-600 text-white px-2.5 py-0.5 rounded-full shadow-xs">
                Toll Free
              </span>
            </div>
            <p className="font-body text-xs text-slate-600 dark:text-slate-300 font-medium">
              {isHindi
                ? 'चिकित्सा, दुर्घटना या सुरक्षा संबंधी तत्काल सहायता हेतु'
                : 'National emergency response services for Himachal Pradesh'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <a href="tel:108" className="flex-1 md:flex-initial">
            <button
              type="button"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-body text-xs font-bold rounded-xl shadow-sm hover:shadow transition-all border border-red-700/60"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>108 (Ambulance)</span>
            </button>
          </a>
          <a href="tel:112" className="flex-1 md:flex-initial">
            <button
              type="button"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white dark:bg-slate-800 dark:hover:bg-slate-700 font-body text-xs font-bold rounded-xl shadow-sm hover:shadow transition-all border border-slate-900"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>112 (Police / Emergency)</span>
            </button>
          </a>
        </div>
      </div>

      {/* Professional Segmented Navigation Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as FilterCategory)}
              type="button"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-body font-bold transition-all duration-200 ${
                isActive
                  ? 'bg-primary text-white shadow-sm ring-2 ring-primary/20'
                  : 'bg-white dark:bg-slate-900 hover:bg-amber-50/70 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:border-amber-500 shadow-xs'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-300' : 'text-amber-800 dark:text-amber-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Filtered Grid */}
      <div className="space-y-6">
        
        {/* Medical Facilities */}
        {(activeFilter === 'all' || activeFilter === 'medical') && medicalCategory && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-amber-400 uppercase tracking-wider">
              <HeartPulse className="w-4 h-4 text-rose-600" />
              <span>{isHindi ? 'स्वास्थ्य एवं चिकित्सा सेवाएँ (कढ़ियार व उहल)' : 'Medical Facilities & Pharmacies'}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {medicalCategory.items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 hover:border-amber-400/90 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      {getServiceIcon(item.iconType)}
                      <div>
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-900 bg-amber-100/80 dark:bg-amber-950/60 dark:text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-200/80 inline-block">
                          {isHindi ? item.hindiType : item.type}
                        </span>
                        <h4 className="font-display font-bold text-base text-slate-900 dark:text-white leading-snug mt-1">
                          {isHindi ? item.hindiName : item.name}
                        </h4>
                      </div>
                    </div>
                    <p className="font-body text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                      {isHindi ? item.hindiDescription : item.description}
                    </p>
                  </div>

                  {item.destinationUrl && (
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                      <a
                        href={item.destinationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full"
                      >
                        <button
                          type="button"
                          className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-900 hover:bg-primary text-white text-xs font-bold font-body transition-colors shadow-xs"
                        >
                          <Navigation className="w-3.5 h-3.5 text-amber-400" />
                          <span>{isHindi ? 'Google Maps पर देखें' : 'View on Maps'}</span>
                        </button>
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ATM, Stay & Police Directory */}
        {(activeFilter === 'all' || activeFilter === 'atm' || activeFilter === 'stay' || activeFilter === 'police') && (
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-amber-400 uppercase tracking-wider">
              <Building2 className="w-4 h-4 text-amber-700" />
              <span>{isHindi ? 'बैंकिंग, ठहरने की जगह व सुरक्षा' : 'ATM, Stay Reference & Police Safety'}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              {/* ATM */}
              {(activeFilter === 'all' || activeFilter === 'atm') && (
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 hover:border-amber-400/90 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-xl bg-blue-100 text-blue-700 border border-blue-200/90 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800 shrink-0 shadow-xs">
                        <Landmark className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-900 bg-amber-100/80 dark:bg-amber-950/60 dark:text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-200/80 inline-block">
                          {isHindi ? 'एटीएम / नकद निकासी' : 'ATM & Cash Withdrawal'}
                        </span>
                        <h4 className="font-display font-bold text-base text-slate-900 dark:text-white leading-snug mt-1">
                          {isHindi ? 'यूको बैंक एटीएम — उहल' : 'UCO Bank ATM — Uhal'}
                        </h4>
                      </div>
                    </div>
                    <p className="font-body text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                      {isHindi
                        ? 'उहल बाजार में नकद निकासी हेतु 24 घंटे उपलब्ध एटीएम सुविधा। (दूरी: लगभग 2.5 किमी)'
                        : 'UCO Bank ATM located in Uhal market for cash withdrawal (~2.5 km from temple).'}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=31.75642686213751,76.60983723635212"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full"
                    >
                      <button
                        type="button"
                        className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-900 hover:bg-primary text-white text-xs font-bold font-body transition-colors shadow-xs"
                      >
                        <Navigation className="w-3.5 h-3.5 text-amber-400" />
                        <span>{isHindi ? 'Google Maps पर देखें' : 'View on Maps'}</span>
                      </button>
                    </a>
                  </div>
                </div>
              )}

              {/* Stay Reference */}
              {(activeFilter === 'all' || activeFilter === 'stay') && (
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 hover:border-amber-400/90 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-xl bg-purple-100 text-purple-700 border border-purple-200/90 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800 shrink-0 shadow-xs">
                        <BedDouble className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-900 bg-amber-100/80 dark:bg-amber-950/60 dark:text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-200/80 inline-block">
                          {isHindi ? 'ठहरने का संदर्भ' : 'Accommodation Reference'}
                        </span>
                        <h4 className="font-display font-bold text-base text-slate-900 dark:text-white leading-snug mt-1">
                          {isHindi ? 'लगवाल मैरिज पैलेस — उहल' : 'Lagwal Palace — Uhal'}
                        </h4>
                      </div>
                    </div>
                    <p className="font-body text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                      {isHindi
                        ? 'आवश्यकता पड़ने पर उहल स्थित नज़दीकी परिसर का संदर्भ। कृपया उपलब्धता की पुष्टि सीधे करें।'
                        : 'Nearby venue at Uhal for visitor stay reference. Please check availability directly.'}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=31.753225075867924,76.60938059675532"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full"
                    >
                      <button
                        type="button"
                        className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-900 hover:bg-primary text-white text-xs font-bold font-body transition-colors shadow-xs"
                      >
                        <Navigation className="w-3.5 h-3.5 text-amber-400" />
                        <span>{isHindi ? 'Google Maps पर देखें' : 'View on Maps'}</span>
                      </button>
                    </a>
                  </div>
                </div>
              )}

              {/* Police */}
              {(activeFilter === 'all' || activeFilter === 'police') && (
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 hover:border-amber-400/90 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-xl bg-indigo-100 text-indigo-700 border border-indigo-200/90 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800 shrink-0 shadow-xs">
                        <ShieldAlert className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-900 bg-amber-100/80 dark:bg-amber-950/60 dark:text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-200/80 inline-block">
                          {isHindi ? 'कानून एवं सुरक्षा' : 'Police Station (~8 km)'}
                        </span>
                        <h4 className="font-display font-bold text-base text-slate-900 dark:text-white leading-snug mt-1">
                          {isHindi ? 'पुलिस सहायता — टौणी देवी' : 'Police Post — Tauni Devi'}
                        </h4>
                      </div>
                    </div>
                    <p className="font-body text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                      {isHindi
                        ? 'किसी भी सुरक्षा या प्रशासनिक सहायता के लिए टौणी देवी थाना क्षेत्र से संपर्क किया जा सकता है।'
                        : 'Nearest administrative police jurisdiction is towards Tauni Devi.'}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                    <a href="tel:112" className="block w-full">
                      <button
                        type="button"
                        className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-900 hover:bg-primary text-white text-xs font-bold font-body transition-colors shadow-xs"
                      >
                        <Phone className="w-3.5 h-3.5 text-amber-400" />
                        <span>{isHindi ? 'कॉल 112 (पुलिस सहायता)' : 'Call 112 (Police)'}</span>
                      </button>
                    </a>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>

      {/* Professional Information Footnote */}
      <div className="bg-amber-50/70 dark:bg-slate-900 px-5 py-3.5 rounded-2xl border border-amber-200/70 dark:border-slate-800 flex items-center gap-3 shadow-xs">
        <Info className="w-4 h-4 text-amber-800 dark:text-amber-400 shrink-0" />
        <p className="font-body text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
          {isHindi
            ? 'यह जानकारी श्रद्धालुओं की सुविधा हेतु संकलित है। चिकित्सालयों, एटीएम में नकद और ठहरने के स्थलों की समय-सारणी व उपलब्धता में परिवर्तन हो सकता है।'
            : 'Information provided for pilgrim facilitation. Service timings, hospital OPD hours and ATM cash availability are subject to local operations.'}
        </p>
      </div>
    </section>
  );
};
