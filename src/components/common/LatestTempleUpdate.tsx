import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { templeEvents } from '../../data/templeEvents';

export const LatestTempleUpdate: React.FC = React.memo(() => {
  const { isHindi } = useLanguage();
  const navigate = useNavigate();

  const activeEvent = templeEvents.find(e => e.featured && ['ongoing', 'upcoming', 'date-pending'].includes(e.status));

  if (!activeEvent) return null;

  const renderStatusPill = () => {
    if (activeEvent.status === 'ongoing') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-50 text-red-700 text-[10.5px] font-mono border border-red-200">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
          <span>{isHindi ? 'कार्यक्रम जारी है' : 'ONGOING NOW'}</span>
        </span>
      );
    }
    
    if (activeEvent.status === 'date-pending') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[10.5px] font-mono border border-amber-200">
          {isHindi ? 'तिथि शीघ्र घोषित' : 'Date Announced Soon'}
        </span>
      );
    }
    
    if (activeEvent.status === 'upcoming' && activeEvent.date) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 text-[10.5px] font-mono border border-slate-200">
          {isHindi ? 'आगामी: ' : 'UPCOMING: '} {activeEvent.date}
        </span>
      );
    }

    return null;
  };

  return (
    <section className="bg-white border-y border-slate-200/80">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-2.5 sm:py-3.5 flex flex-col md:flex-row items-start md:items-center justify-between gap-2.5 sm:gap-3">
        
        {/* Left: Boxed Icon & Announcement Title */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-7 h-7 rounded-lg border border-slate-300 flex items-center justify-center text-slate-700 shrink-0 bg-[#fdfbf9]">
            <Bell className="w-3.5 h-3.5 text-amber-600" />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs">
            <span className="text-[10px] font-mono uppercase font-bold text-slate-400">
              {isHindi ? 'सूचना' : 'UPDATE'}:
            </span>
            <span className="font-semibold text-slate-900">
              {isHindi ? activeEvent.titleHi : activeEvent.titleEn}
            </span>
            <span className="hidden sm:inline text-slate-500 font-normal">
              — {isHindi ? activeEvent.descriptionHi : activeEvent.descriptionEn}
            </span>
          </div>
        </div>

        {/* Right: Status Pill & View Link */}
        <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 w-full md:w-auto pt-1 md:pt-0 border-t md:border-t-0 border-slate-100">
          {renderStatusPill()}
          <button
            onClick={() => navigate('/festivals')}
            className="text-xs font-medium text-amber-800 hover:text-amber-900 inline-flex items-center gap-1 transition-colors"
          >
            <span>{isHindi ? 'विवरण' : 'Details'}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

      </div>
    </section>
  );
});
