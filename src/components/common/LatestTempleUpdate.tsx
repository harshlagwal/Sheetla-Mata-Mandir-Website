import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { templeEvents } from '../../data/templeEvents';
import { Button } from './Button';

export const LatestTempleUpdate: React.FC = React.memo(() => {
  const { isHindi } = useLanguage();
  const navigate = useNavigate();

  // Find the featured event (priority: ongoing > upcoming > date-pending)
  const activeEvent = templeEvents.find(e => e.featured && ['ongoing', 'upcoming', 'date-pending'].includes(e.status));

  if (!activeEvent) return null;

  const renderStatusPill = () => {
    if (activeEvent.status === 'ongoing') {
      return (
        <div className="flex items-center gap-1.5 px-3 py-1 bg-red-50 border border-red-200 rounded-full">
          <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
          <span className="font-body text-xs font-bold text-red-700 uppercase tracking-wider">
            {isHindi ? 'कार्यक्रम जारी है' : 'ONGOING NOW'}
          </span>
        </div>
      );
    }
    
    if (activeEvent.status === 'date-pending') {
      return (
        <div className="px-3 py-1 bg-[#faf3e8] border border-[#c8880a]/30 rounded-full">
          <span className="font-body text-xs font-bold text-[#a05020] uppercase tracking-wider">
            {isHindi ? 'तिथि शीघ्र घोषित होगी' : 'Date to be announced'}
          </span>
        </div>
      );
    }
    
    if (activeEvent.status === 'upcoming' && activeEvent.date) {
      return (
        <div className="px-3 py-1 bg-surface-container-low border border-outline-variant/30 rounded-full">
          <span className="font-body text-xs font-bold text-secondary uppercase tracking-wider">
            {isHindi ? 'आगामी: ' : 'UPCOMING: '} {activeEvent.date}
          </span>
        </div>
      );
    }

    return null;
  };

  return (
    <section className="bg-surface-container-lowest border-y border-outline-variant/20 shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop py-4 md:py-6">
        
        {/* Mobile Layout: Stacked */}
        <div className="flex flex-col md:hidden gap-4">
          <div className="flex items-center gap-2">
            <span className="font-body text-[10px] font-bold text-[#c8880a] uppercase tracking-widest">
              {isHindi ? 'नवीनतम मंदिर सूचना' : 'LATEST TEMPLE UPDATE'}
            </span>
            {activeEvent.isNew && (
              <span className="px-1.5 py-0.5 bg-[#5a1a0a] text-white text-[9px] font-bold rounded uppercase">
                {isHindi ? 'नई सूचना' : 'NEW'}
              </span>
            )}
          </div>
          
          <div>
            <h3 className="font-display font-bold text-lg text-[#5a1a0a] leading-tight flex items-start gap-2">
              <Bell className="w-5 h-5 text-[#c8880a] shrink-0 mt-0.5 animate-pulse" style={{ animationDuration: '3s' }} />
              {isHindi ? activeEvent.titleHi : activeEvent.titleEn}
            </h3>
            <p className="font-body text-sm text-[#4a2010] mt-1.5 line-clamp-2">
              {isHindi ? activeEvent.descriptionHi : activeEvent.descriptionEn}
            </p>
          </div>
          
          <div className="flex items-center justify-between mt-2">
            {renderStatusPill()}
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full justify-center text-[#5a1a0a] border border-[#5a1a0a]/10 hover:bg-[#faf3e8]"
            onClick={() => navigate('/festivals')}
            icon={<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
          >
            {isHindi ? 'विवरण देखें' : 'View Details'}
          </Button>
        </div>

        {/* Desktop & Tablet Layout: Horizontal Strip */}
        <div className="hidden md:flex items-center justify-between gap-6">
          <div className="flex items-start gap-5 flex-1">
            <div className="p-3 bg-[#faf3e8] rounded-2xl border border-[#c8880a]/15 shadow-sm shrink-0">
              <Bell className="w-6 h-6 text-[#c8880a] animate-pulse" style={{ animationDuration: '3s' }} />
            </div>
            
            <div className="flex flex-col flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-body text-[11px] font-bold text-[#c8880a] uppercase tracking-widest">
                  {isHindi ? 'नवीनतम मंदिर सूचना' : 'LATEST TEMPLE UPDATE'}
                </span>
                {activeEvent.isNew && (
                  <span className="px-2 py-0.5 bg-[#5a1a0a] text-white text-[10px] font-bold rounded uppercase">
                    {isHindi ? 'नई सूचना' : 'NEW'}
                  </span>
                )}
              </div>
              
              <h3 className="font-display font-bold text-xl text-[#5a1a0a] leading-tight">
                {isHindi ? activeEvent.titleHi : activeEvent.titleEn}
              </h3>
              <p className="font-body text-sm text-[#4a2010] mt-1 line-clamp-1 max-w-2xl">
                {isHindi ? activeEvent.descriptionHi : activeEvent.descriptionEn}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-6 shrink-0">
            {renderStatusPill()}
            <div className="w-px h-8 bg-outline-variant/30" />
            <Button 
              variant="ghost" 
              onClick={() => navigate('/festivals')}
              className="group text-[#5a1a0a] hover:bg-[#faf3e8]"
              icon={<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
            >
              {isHindi ? 'विवरण देखें' : 'View Details'}
            </Button>
          </div>
        </div>
        
      </div>
    </section>
  );
});
