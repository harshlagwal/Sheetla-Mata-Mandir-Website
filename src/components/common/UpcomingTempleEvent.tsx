import React from 'react';
import { Calendar, MapPin, Navigation, Info, Clock, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { templeEvents } from '../../data/templeEvents';
import { templeData } from '../../data/temple';
import { Button } from './Button';

export const UpcomingTempleEvent: React.FC = () => {
  const { isHindi } = useLanguage();

  // Find the featured event (priority: ongoing > upcoming > date-pending)
  const activeEvent = templeEvents.find(e => e.featured && ['ongoing', 'upcoming', 'date-pending'].includes(e.status));

  if (!activeEvent) return null;

  const renderStatusAndDate = () => {
    if (activeEvent.status === 'ongoing') {
      return (
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-red-50 border border-red-200 rounded-full">
            <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            <span className="font-body text-xs font-bold text-red-700 uppercase tracking-wider">
              {isHindi ? 'कार्यक्रम जारी है' : 'ONGOING NOW'}
            </span>
          </div>
          {activeEvent.date && (
            <span className="font-body text-sm font-semibold text-secondary">
              {activeEvent.date} {activeEvent.endDate && `- ${activeEvent.endDate}`}
            </span>
          )}
        </div>
      );
    }
    
    if (activeEvent.status === 'date-pending') {
      return (
        <div className="flex items-center gap-2 mb-4">
          <div className="px-3 py-1 bg-[#faf3e8] border border-[#c8880a]/40 rounded-full shadow-sm">
            <span className="font-body text-xs font-bold text-[#a05020] uppercase tracking-wider">
              {isHindi ? 'तिथि शीघ्र घोषित होगी' : 'Date to be announced'}
            </span>
          </div>
        </div>
      );
    }
    
    if (activeEvent.status === 'upcoming') {
      return (
        <div className="flex items-center gap-2 mb-4">
          <div className="px-3 py-1 bg-surface-container border border-outline-variant/40 rounded-full">
            <span className="font-body text-xs font-bold text-secondary uppercase tracking-wider">
              {isHindi ? 'आगामी' : 'UPCOMING'}
            </span>
          </div>
          {activeEvent.date && (
            <div className="flex items-center gap-1.5 font-body text-sm font-bold text-[#5a1a0a]">
              <Calendar className="w-4 h-4 text-[#c8880a]" />
              <span>{activeEvent.date} {activeEvent.endDate && `- ${activeEvent.endDate}`}</span>
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  const getEventBadge = () => {
    const typeMap = {
      katha: isHindi ? 'धार्मिक कथा' : 'Sacred Katha',
      jagran: isHindi ? 'भव्य जागरण' : 'Bhavya Jagran',
      bhandara: isHindi ? 'भंडारा' : 'Bhandara',
      mela: isHindi ? 'वार्षिक मेला' : 'Lagdevi Mela',
      festival: isHindi ? 'धार्मिक कार्यक्रम' : 'Religious Programme',
      notice: isHindi ? 'सूचना' : 'Notice'
    };
    return typeMap[activeEvent.type] || typeMap.festival;
  };

  return (
    <div className="mb-20">
      <div className="flex flex-col items-center text-center mb-10">
        <h2 className="font-display font-bold text-3xl md:text-4xl text-[#5a1a0a]">
          {isHindi ? 'आगामी कार्यक्रम' : 'Upcoming Programme'}
        </h2>
        <div className="h-1 w-16 bg-[#c8880a] mt-4 rounded-full" />
      </div>

      <section className="bg-[#faf3e8] rounded-3xl p-6 md:p-8 border border-[#c8880a]/20 shadow-md hover:shadow-xl transition-shadow duration-500 relative overflow-hidden">
        {/* Decorative background accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#c8880a]/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
      
      <div className="relative z-10 flex flex-col lg:flex-row gap-8 lg:gap-12">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-body text-[11px] font-bold uppercase tracking-[0.25em] text-[#a05020] bg-white/50 px-3 py-1 rounded-full border border-[#c8880a]/20">
              {getEventBadge()}
            </span>
            {activeEvent.isNew && (
              <span className="font-body text-[10px] font-bold uppercase tracking-wider text-white bg-[#5a1a0a] px-2 py-1 rounded shadow-sm">
                {isHindi ? 'नई सूचना' : 'NEW'}
              </span>
            )}
          </div>
          
          <h2 className="font-display font-bold text-3xl md:text-4xl text-[#3d0f06] leading-tight mb-3">
            {isHindi ? activeEvent.titleHi : activeEvent.titleEn}
          </h2>
          
          {renderStatusAndDate()}
          
          <p className="font-body text-base text-[#4a2010] leading-relaxed mb-6 max-w-2xl">
            {isHindi ? activeEvent.descriptionHi : activeEvent.descriptionEn}
            {activeEvent.status === 'date-pending' && (
              <span className="block mt-2 font-medium italic text-[#a05020]/80">
                {isHindi ? 'कार्यक्रम की तिथि एवं समय शीघ्र घोषित किया जाएगा।' : 'Programme schedule will be announced soon.'}
              </span>
            )}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-[#a05020]/15">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#c8880a] shrink-0 mt-0.5" />
              <span className="font-body text-sm font-semibold text-[#4a2010]">
                {isHindi ? activeEvent.locationHi : activeEvent.locationEn}
              </span>
            </div>
            {activeEvent.time && (
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#c8880a] shrink-0 mt-0.5" />
                <span className="font-body text-sm font-semibold text-[#4a2010]">
                  {activeEvent.time}
                </span>
              </div>
            )}
          </div>
        </div>
        
        <div className="lg:w-72 flex flex-col justify-center gap-3 shrink-0">
          <a
            href={templeData.mapDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full block"
          >
            <Button 
              variant="primary" 
              className="w-full justify-center py-3 bg-[#5a1a0a] hover:bg-[#3d0f06] text-white shadow-md hover:shadow-lg transition-all"
              icon={<Navigation className="w-4 h-4" />}
            >
              {isHindi ? 'दिशा-निर्देश प्राप्त करें' : 'Get Directions'}
            </Button>
          </a>
          
          <Button 
            variant="ghost" 
            className="w-full justify-center py-3 border-2 border-[#5a1a0a]/10 text-[#5a1a0a] bg-white/50 hover:bg-white hover:border-[#5a1a0a]/30 transition-all"
            icon={<Info className="w-4 h-4" />}
            onClick={() => {
              // Smooth scroll if an anchor is needed, but otherwise it acts as a decorative element since we are already on Festivals page
              window.scrollTo({ top: document.body.scrollHeight / 3, behavior: 'smooth' });
            }}
          >
            {isHindi ? 'उत्सव विवरण' : 'Festival Details'}
          </Button>
        </div>
      </div>
    </section>
    </div>
  );
};
