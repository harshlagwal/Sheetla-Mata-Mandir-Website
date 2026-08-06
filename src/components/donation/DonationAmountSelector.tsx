import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { DONATION_CONFIG } from '../../config/donation';

interface DonationAmountSelectorProps {
  selectedAmount: number | null;
  onAmountSelect: (amount: number | null) => void;
  customAmount: string;
  onCustomAmountChange: (value: string) => void;
}

export const DonationAmountSelector: React.FC<DonationAmountSelectorProps> = ({
  selectedAmount,
  onAmountSelect,
  customAmount,
  onCustomAmountChange,
}) => {
  const { t } = useLanguage();

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Allow empty or numbers (optional decimal up to 2 places)
    if (val === '' || /^\d+(\.\d{0,2})?$/.test(val)) {
      const numericVal = parseFloat(val);
      // Limit to 1 Lakh (1,00,000)
      if (val === '' || numericVal <= 100000) {
        onCustomAmountChange(val);
      }
    }
  };

  const suggestedAmounts = DONATION_CONFIG.testMode 
    ? [1, ...DONATION_CONFIG.suggestedAmounts]
    : DONATION_CONFIG.suggestedAmounts;

  return (
    <div className="w-full mb-6">
      <h3 className="font-display font-semibold text-lg text-primary mb-3">
        {t.donation.amountLabel}
      </h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
        {suggestedAmounts.map((amount) => (
          <button
            key={amount}
            type="button"
            onClick={() => {
              onAmountSelect(amount);
            }}
            className={`py-3 px-4 rounded-xl font-body font-semibold text-sm transition-all border ${
              selectedAmount === amount
                ? 'bg-primary text-on-primary border-primary shadow-md'
                : 'bg-surface-container-lowest text-on-surface hover:border-primary hover:bg-surface-container-low border-outline-variant/50'
            }`}
          >
            ₹{amount} {DONATION_CONFIG.testMode && amount === 1 ? 'Test' : ''}
          </button>
        ))}
      </div>

      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-body font-semibold text-on-surface-variant">
          ₹
        </span>
        <input
          type="text"
          inputMode="decimal"
          placeholder={t.donation.customAmount}
          value={customAmount}
          onChange={handleCustomChange}
          onFocus={() => onAmountSelect(null)}
          className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl py-3 pl-8 pr-4 font-body font-semibold text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
        />
      </div>
    </div>
  );
};
