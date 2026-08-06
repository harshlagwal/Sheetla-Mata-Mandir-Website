import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export type DonationPurpose = 'general' | 'bhandara' | 'katha' | 'jagran' | 'maintenance' | 'other';

interface DonationPurposeSelectorProps {
  selectedPurpose: DonationPurpose;
  onPurposeSelect: (purpose: DonationPurpose) => void;
}

export const DonationPurposeSelector: React.FC<DonationPurposeSelectorProps> = ({
  selectedPurpose,
  onPurposeSelect,
}) => {
  const { t } = useLanguage();

  const purposes: { id: DonationPurpose; label: string }[] = [
    { id: 'general', label: t.donation.purposes.general },
    { id: 'bhandara', label: t.donation.purposes.bhandara },
    { id: 'katha', label: t.donation.purposes.katha },
    { id: 'jagran', label: t.donation.purposes.jagran },
    { id: 'maintenance', label: t.donation.purposes.maintenance },
    { id: 'other', label: t.donation.purposes.other },
  ];

  return (
    <div className="w-full mb-6">
      <h3 className="font-display font-semibold text-lg text-primary mb-1">
        {t.donation.purposeLabel}
      </h3>
      <p className="font-body text-xs text-on-surface-variant mb-3 italic">
        {t.donation.purposeNotice}
      </p>

      <div className="relative">
        <select
          value={selectedPurpose}
          onChange={(e) => onPurposeSelect(e.target.value as DonationPurpose)}
          className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl py-3 px-4 font-body text-sm text-on-surface appearance-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all cursor-pointer"
        >
          {purposes.map((p) => (
            <option key={p.id} value={p.id}>
              {p.label}
            </option>
          ))}
        </select>
        {/* Custom dropdown arrow */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-on-surface-variant">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
  );
};
