import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Utensils, Building2, Flower2, Flame, HeartHandshake, Sparkles, Check } from 'lucide-react';

export type DonationPurpose = 'general' | 'bhandara' | 'katha' | 'jagran' | 'maintenance' | 'other';

interface DonationPurposeSelectorProps {
  selectedPurpose: DonationPurpose;
  onPurposeSelect: (purpose: DonationPurpose) => void;
}

export const DonationPurposeSelector: React.FC<DonationPurposeSelectorProps> = ({
  selectedPurpose,
  onPurposeSelect,
}) => {
  const { isHindi } = useLanguage();

  const purposes: {
    id: DonationPurpose;
    title: string;
    desc: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    {
      id: 'bhandara',
      title: isHindi ? 'भंडारा एवं लंगर' : 'Bhandara & Langar',
      desc: isHindi ? 'श्रद्धालुओं के लिए महाप्रसाद' : 'Community holy feast',
      icon: Utensils,
    },
    {
      id: 'maintenance',
      title: isHindi ? 'मंदिर विकास व निर्माण' : 'Mandir Renovation',
      desc: isHindi ? 'परिसर सुंदरीकरण व व्यवस्था' : 'Temple preservation & facilities',
      icon: Building2,
    },
    {
      id: 'general',
      title: isHindi ? 'नित्य पूजा व श्रृंगार' : 'Daily Pooja & Shringar',
      desc: isHindi ? 'माता रानी की आरती व सेवा' : 'Sacred daily offerings',
      icon: Flower2,
    },
    {
      id: 'jagran',
      title: isHindi ? 'वार्षिक भव्य जागरण' : 'Annual Jagran Seva',
      desc: isHindi ? 'माता का पावन जागरण उत्सव' : 'Holy festival & kirtan',
      icon: Flame,
    },
    {
      id: 'katha',
      title: isHindi ? 'धार्मिक अनुष्ठान / कथा' : 'Religious Katha & Havan',
      desc: isHindi ? 'हवन, पाठ एवं यज्ञ सेवा' : 'Vedic rituals & chanting',
      icon: Sparkles,
    },
    {
      id: 'other',
      title: isHindi ? 'सामान्य दान (General)' : 'General Fund',
      desc: isHindi ? 'समिति के विवेकानुसार सेवा' : 'Wherever need is highest',
      icon: HeartHandshake,
    },
  ];

  return (
    <div className="w-full mb-6">
      <div className="flex items-center justify-between mb-3">
        <label className="font-display font-bold text-base md:text-lg text-primary flex items-center gap-2">
          <span>{isHindi ? 'दान का पावन उद्देश्य' : 'Select Purpose of Donation'}</span>
        </label>
        <span className="text-[11px] text-on-surface-variant/70 italic">
          {isHindi ? 'संकल्प अनुसार' : 'According to Sankalp'}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {purposes.map(({ id, title, desc, icon: Icon }) => {
          const isSelected = selectedPurpose === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onPurposeSelect(id)}
              className={`relative flex items-start gap-3 p-3.5 rounded-2xl text-left font-body transition-all duration-200 border ${
                isSelected
                  ? 'bg-[#5c1616]/5 border-[#5c1616] ring-1 ring-[#5c1616]/30 shadow-xs'
                  : 'bg-surface-container-lowest border-outline-variant/40 hover:border-[#5c1616]/30 hover:bg-surface-container-low'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-[#5c1616] text-[#ffdf79]'
                    : 'bg-surface-container text-primary'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>

              <div className="flex-1 min-w-0 pr-4">
                <div className="font-bold text-sm text-on-surface truncate">
                  {title}
                </div>
                <div className="text-[11px] text-on-surface-variant/75 truncate mt-0.5">
                  {desc}
                </div>
              </div>

              {isSelected && (
                <div className="absolute right-3 top-3.5 w-5 h-5 rounded-full bg-[#5c1616] text-white flex items-center justify-center">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

