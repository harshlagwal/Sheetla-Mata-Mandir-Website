import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { DONATION_CONFIG } from '../../config/donation';
import { Sparkles } from 'lucide-react';

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
  const { isHindi } = useLanguage();

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '' || /^\d+(\.\d{0,2})?$/.test(val)) {
      const numericVal = parseFloat(val);
      if (val === '' || numericVal <= 500000) {
        onCustomAmountChange(val);
      }
    }
  };

  // Preset sacred amounts with devotional tags
  const presetAmounts = [
    { amount: 101, tag: isHindi ? 'शगुन' : 'Shagun' },
    { amount: 251, tag: isHindi ? 'प्रसाद' : 'Prasad' },
    { amount: 501, tag: isHindi ? 'विशेष पूजा' : 'Pooja' },
    { amount: 1100, tag: isHindi ? 'सेवा' : 'Seva' },
    { amount: 2100, tag: isHindi ? 'भंडारा' : 'Bhandara' },
  ];

  const suggestedList = DONATION_CONFIG.testMode
    ? [{ amount: 1, tag: 'Test' }, ...presetAmounts]
    : presetAmounts;

  return (
    <div className="w-full mb-6">
      <div className="flex items-center justify-between mb-3">
        <label className="font-display font-bold text-base md:text-lg text-primary flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#d4af37]" />
          <span>{isHindi ? 'दान राशि चुनें' : 'Select Donation Amount'}</span>
        </label>
        <span className="text-[11px] font-medium text-on-surface-variant/70 uppercase tracking-wider bg-surface-container px-2.5 py-0.5 rounded-full">
          {isHindi ? 'स्वैच्छिक योगदान' : 'Voluntary'}
        </span>
      </div>

      {/* Preset Amount Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5 mb-4">
        {suggestedList.map(({ amount, tag }) => {
          const isSelected = selectedAmount === amount;
          return (
            <button
              key={amount}
              type="button"
              onClick={() => onAmountSelect(amount)}
              className={`relative flex flex-col items-center justify-center py-3 px-2 rounded-2xl font-body transition-all duration-200 border ${
                isSelected
                  ? 'bg-gradient-to-b from-[#7a1c1c] to-[#5c1616] text-white border-[#d4af37] shadow-md shadow-[#5c1616]/20 scale-[1.02]'
                  : 'bg-surface-container-lowest text-on-surface hover:border-[#5c1616]/40 hover:bg-surface-container-low border-outline-variant/40 shadow-xs'
              }`}
            >
              <span className={`text-xs font-medium mb-0.5 ${isSelected ? 'text-[#ffdf79]' : 'text-on-surface-variant/80'}`}>
                {tag}
              </span>
              <span className="font-bold text-base md:text-lg tracking-tight">
                ₹{amount.toLocaleString('en-IN')}
              </span>
              {isSelected && (
                <div className="w-1.5 h-1.5 rounded-full bg-[#ffdf79] mt-1" />
              )}
            </button>
          );
        })}
      </div>

      {/* Custom Amount Input */}
      <div>
        <label className="block text-xs font-semibold text-on-surface-variant mb-1.5">
          {isHindi ? 'या अपनी इच्छानुसार राशि दर्ज करें:' : 'Or enter custom amount:'}
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-lg text-primary">
            ₹
          </span>
          <input
            type="text"
            inputMode="numeric"
            placeholder={isHindi ? 'उदा. 5100' : 'e.g. 5100'}
            value={customAmount}
            onChange={handleCustomChange}
            onFocus={() => onAmountSelect(null)}
            className={`w-full bg-surface-container-lowest border rounded-2xl py-3 pl-9 pr-4 font-body font-bold text-lg text-on-surface transition-all focus:outline-none ${
              customAmount
                ? 'border-[#5c1616] ring-2 ring-[#5c1616]/20 bg-white'
                : 'border-outline-variant/50 focus:border-primary focus:ring-2 focus:ring-primary/20'
            }`}
          />
          {customAmount && (
            <button
              type="button"
              onClick={() => onCustomAmountChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-on-surface-variant hover:text-primary px-2 py-1 rounded-md"
            >
              {isHindi ? 'हटाएं' : 'Clear'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

