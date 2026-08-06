import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const DonationSecurityNotice: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="flex items-start gap-3 mt-8 p-4 bg-tertiary-container/30 border border-tertiary-fixed/50 rounded-xl">
      <ShieldCheck className="w-5 h-5 text-tertiary-fixed shrink-0 mt-0.5" />
      <p className="font-body text-xs text-on-surface-variant leading-relaxed">
        {t.donation.securityNotice}
      </p>
    </div>
  );
};
