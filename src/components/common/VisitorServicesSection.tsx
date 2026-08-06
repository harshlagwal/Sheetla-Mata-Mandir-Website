import React from 'react';
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
  Building2
} from 'lucide-react';

export const VisitorServicesSection: React.FC = () => {
  const { isHindi } = useLanguage();

  const getServiceIcon = (iconType: ServiceItem['iconType']) => {
    switch (iconType) {
      case 'hospital':
        return <HeartPulse className="w-6 h-6" />;
      case 'pharmacy':
        return <Pill className="w-6 h-6" />;
      case 'ambulance':
        return <PhoneCall className="w-6 h-6" />;
      case 'atm':
        return <Landmark className="w-6 h-6" />;
      case 'stay':
        return <BedDouble className="w-6 h-6" />;
      case 'police':
        return <ShieldAlert className="w-6 h-6" />;
      default:
        return <Building2 className="w-6 h-6" />;
    }
  };

  const scrollToCategory = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const medicalCategory = visitorServicesData.find(c => c.id === 'medical-services');

  return (
    <section className="space-y-10 lg:space-y-12" id="visitor-assistance-section">
      {/* Quick Action Chips Bar */}
      <div className="flex flex-wrap justify-center items-center gap-3 max-w-3xl mx-auto">
        <button
          onClick={() => scrollToCategory('medical-services')}
          className="inline-flex items-center gap-2 px-4 py-2 bg-surface-container-lowest hover:bg-surface-container-low border border-outline-variant/30 rounded-full text-xs font-bold font-body text-primary shadow-sm hover:shadow transition-all duration-200"
        >
          <span>🏥</span>
          <span>{isHindi ? 'चिकित्सा' : 'Medical'}</span>
        </button>
        <button
          onClick={() => scrollToCategory('essentials-emergency')}
          className="inline-flex items-center gap-2 px-4 py-2 bg-surface-container-lowest hover:bg-surface-container-low border border-outline-variant/30 rounded-full text-xs font-bold font-body text-primary shadow-sm hover:shadow transition-all duration-200"
        >
          <span>🚑</span>
          <span>{isHindi ? 'आपातकाल' : 'Emergency'}</span>
        </button>
        <button
          onClick={() => scrollToCategory('essentials-atm')}
          className="inline-flex items-center gap-2 px-4 py-2 bg-surface-container-lowest hover:bg-surface-container-low border border-outline-variant/30 rounded-full text-xs font-bold font-body text-primary shadow-sm hover:shadow transition-all duration-200"
        >
          <span>🏧</span>
          <span>{isHindi ? 'एटीएम' : 'ATM'}</span>
        </button>
        <button
          onClick={() => scrollToCategory('essentials-stay')}
          className="inline-flex items-center gap-2 px-4 py-2 bg-surface-container-lowest hover:bg-surface-container-low border border-outline-variant/30 rounded-full text-xs font-bold font-body text-primary shadow-sm hover:shadow transition-all duration-200"
        >
          <span>🛏</span>
          <span>{isHindi ? 'ठहरना' : 'Stay'}</span>
        </button>
        <button
          onClick={() => scrollToCategory('essentials-police')}
          className="inline-flex items-center gap-2 px-4 py-2 bg-surface-container-lowest hover:bg-surface-container-low border border-outline-variant/30 rounded-full text-xs font-bold font-body text-primary shadow-sm hover:shadow transition-all duration-200"
        >
          <span>👮</span>
          <span>{isHindi ? 'पुलिस' : 'Police'}</span>
        </button>
      </div>

      {/* 1. Medical & Health Assistance */}
      {medicalCategory && (
        <div id={medicalCategory.id} className="space-y-6 scroll-mt-28">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="font-body text-xs font-bold text-secondary uppercase tracking-[0.2em]">
              {isHindi ? 'चिकित्सा सहायता' : 'MEDICAL ASSISTANCE'}
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-primary">
              {isHindi ? medicalCategory.hindiTitle : medicalCategory.title}
            </h2>
          </div>

          {/* Category Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {medicalCategory.items.map((item) => (
              <div
                key={item.id}
                className="bg-surface-container-lowest p-6 rounded-[1.5rem] transition-all duration-300 space-y-5 flex flex-col justify-between border border-outline-variant/30 shadow-md hover:shadow-lg"
              >
                <div className="space-y-4">
                  {/* Header & Icon */}
                  <div className="flex items-start justify-between gap-3 border-b border-outline-variant/20 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-2xl bg-surface-container-low text-primary">
                        {getServiceIcon(item.iconType)}
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-lg text-primary leading-snug">
                          {isHindi ? item.hindiName : item.name}
                        </h4>
                        <p className="font-body text-xs text-on-surface-variant font-medium mt-0.5">
                          {isHindi ? item.hindiType : item.type}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                    {isHindi ? item.hindiDescription : item.description}
                  </p>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-outline-variant/20 flex flex-col sm:flex-row gap-3">
                  {item.destinationUrl && (
                    <a
                      href={item.destinationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      <Button
                        variant="primary"
                        size="md"
                        className="w-full"
                        icon={<Navigation className="w-4 h-4" />}
                      >
                        {isHindi ? 'दिशा-निर्देश' : 'Get Directions'}
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Visitor Essentials Compact Grid */}
      <div className="space-y-6 scroll-mt-28" id="visitor-essentials-section">
        {/* Eyebrow and Heading */}
        <div className="text-center space-y-2">
          <span className="font-body text-xs font-bold text-secondary uppercase tracking-[0.2em]">
            {isHindi ? 'त्वरित सहायता' : 'QUICK ASSISTANCE'}
          </span>
          <h3 className="font-display font-bold text-3xl text-primary">
            {isHindi ? 'यात्री आवश्यक सेवाएँ' : 'Visitor Essentials'}
          </h3>
          <p className="font-body text-sm text-on-surface-variant">
            {isHindi ? 'आपातकालीन, नकद, ठहरने एवं पुलिस सहायता की जानकारी एक ही स्थान पर।' : 'Emergency, cash, stay and police assistance at a glance.'}
          </p>
        </div>

        {/* 4-column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Emergency */}
          <div id="essentials-emergency" className="bg-surface-container-lowest p-5 md:p-6 rounded-[1.25rem] border-2 border-primary/20 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-[240px]">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-primary">
                <HeartPulse className="w-5 h-5" />
                <span className="font-body text-xs font-bold uppercase tracking-wider">{isHindi ? 'आपातकाल' : 'EMERGENCY'}</span>
              </div>
              <h4 className="font-display font-bold text-lg text-primary leading-tight">
                {isHindi ? 'आपातकालीन सहायता' : 'Emergency Help'}
              </h4>
              <p className="font-body text-xs text-on-surface-variant line-clamp-1">
                {isHindi ? 'तत्काल चिकित्सा या सुरक्षा सहायता के लिए।' : 'For urgent medical or safety assistance.'}
              </p>
              
              <div className="flex justify-between items-center bg-surface-container-low px-3 py-2 rounded-xl mt-2">
                <div className="text-center flex-1 border-r border-outline-variant/30 last:border-0">
                  <span className="block text-[10px] text-on-surface-variant font-medium uppercase">Ambulance</span>
                  <span className="font-bold text-primary">108</span>
                </div>
                <div className="text-center flex-1">
                  <span className="block text-[10px] text-on-surface-variant font-medium uppercase">Emergency</span>
                  <span className="font-bold text-primary">112</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2 mt-4 pt-3 border-t border-outline-variant/20">
              <a href="tel:108" className="flex-1">
                <Button variant="primary" size="sm" className="w-full text-xs px-1" icon={<Phone className="w-3 h-3" />}>
                  {isHindi ? 'कॉल 108' : 'Call 108'}
                </Button>
              </a>
              <a href="tel:112" className="flex-1">
                <Button variant="primary" size="sm" className="w-full text-xs px-1" icon={<Phone className="w-3 h-3" />}>
                  {isHindi ? 'कॉल 112' : 'Call 112'}
                </Button>
              </a>
            </div>
          </div>

          {/* Card 2: ATM */}
          <div id="essentials-atm" className="bg-surface-container-lowest p-5 md:p-6 rounded-[1.25rem] border border-outline-variant/30 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-[240px]">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-primary">
                <Landmark className="w-5 h-5" />
                <span className="font-body text-xs font-bold uppercase tracking-wider">{isHindi ? 'एटीएम एवं नकद' : 'ATM & CASH'}</span>
              </div>
              <h4 className="font-display font-bold text-lg text-primary leading-tight">
                {isHindi ? 'यूको बैंक एटीएम — उहल' : 'UCO Bank ATM — Uhal'}
              </h4>
              <p className="font-body text-xs text-on-surface-variant line-clamp-2">
                {isHindi ? 'नज़दीकी नकद निकासी सुविधा।' : 'Nearby cash withdrawal facility.'}
              </p>
            </div>
            
            <div className="mt-4 pt-3 border-t border-outline-variant/20">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=31.75642686213751,76.60983723635212"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
              >
                <Button variant="ghost" size="sm" className="w-full text-xs" icon={<Navigation className="w-3 h-3" />}>
                  {isHindi ? 'दिशा-निर्देश' : 'Get Directions'}
                </Button>
              </a>
            </div>
          </div>

          {/* Card 3: Nearby Stay */}
          <div id="essentials-stay" className="bg-surface-container-lowest p-5 md:p-6 rounded-[1.25rem] border border-outline-variant/30 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-[240px]">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-primary">
                <BedDouble className="w-5 h-5" />
                <span className="font-body text-xs font-bold uppercase tracking-wider">{isHindi ? 'ठहरने की जगह' : 'NEARBY STAY'}</span>
              </div>
              <h4 className="font-display font-bold text-lg text-primary leading-tight">
                {isHindi ? 'लगवाल मैरिज पैलेस — उहल' : 'Lagwal Marriage Palace — Uhal'}
              </h4>
              <p className="font-body text-xs text-on-surface-variant line-clamp-2">
                {isHindi ? 'नज़दीकी ठहरने / स्थल की जानकारी।' : 'Nearby venue / stay reference.'}
              </p>
              <p className="font-body text-[10px] text-on-surface-variant/70 italic leading-tight">
                {isHindi ? 'कृपया उपलब्धता की पुष्टि सीधे करें।' : 'Please confirm availability directly.'}
              </p>
            </div>
            
            <div className="mt-4 pt-3 border-t border-outline-variant/20">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=31.753225075867924,76.60938059675532"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
              >
                <Button variant="ghost" size="sm" className="w-full text-xs" icon={<Navigation className="w-3 h-3" />}>
                  {isHindi ? 'दिशा-निर्देश' : 'Get Directions'}
                </Button>
              </a>
            </div>
          </div>

          {/* Card 4: Police */}
          <div id="essentials-police" className="bg-surface-container-lowest p-5 md:p-6 rounded-[1.25rem] border border-outline-variant/30 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-[240px]">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-primary">
                <ShieldAlert className="w-5 h-5" />
                <span className="font-body text-xs font-bold uppercase tracking-wider">{isHindi ? 'पुलिस सहायता' : 'POLICE HELP'}</span>
              </div>
              <h4 className="font-display font-bold text-lg text-primary leading-tight">
                {isHindi ? 'पुलिस सहायता — टौणी देवी' : 'Police Assistance — Tauni Devi'}
              </h4>
              <p className="font-body text-xs text-on-surface-variant line-clamp-2">
                {isHindi ? 'पुलिस सहायता के लिए टौणी देवी की ओर संपर्क करें।' : 'Police assistance towards Tauni Devi.'}
              </p>
            </div>
            
            <div className="mt-4 pt-3 border-t border-outline-variant/20">
              <a href="tel:100" className="block w-full">
                <Button variant="ghost" size="sm" className="w-full text-xs" icon={<Phone className="w-3 h-3" />}>
                  {isHindi ? 'कॉल 100' : 'Call 100'}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Visitor Information Strip */}
      <div className="bg-surface-container-low px-6 py-4 rounded-xl border border-outline-variant/30 shadow-sm flex flex-col md:flex-row items-center gap-4">
        <Info className="w-5 h-5 text-secondary shrink-0 hidden md:block" />
        <p className="font-body text-[13px] md:text-sm text-on-surface-variant leading-relaxed italic text-center md:text-left">
          {isHindi
            ? 'यह जानकारी श्रद्धालुओं को नज़दीकी आवश्यक सेवाएँ खोजने में सहायता के लिए दी गई है। सेवाओं का समय, दवाइयों की उपलब्धता, एटीएम में नकद एवं ठहरने की व्यवस्था में परिवर्तन हो सकता है।'
            : 'The locations listed here are provided to help devotees find nearby essential services. Service availability, opening hours, medicine availability, ATM cash and accommodation arrangements may change.'}
        </p>
      </div>
    </section>
  );
};
