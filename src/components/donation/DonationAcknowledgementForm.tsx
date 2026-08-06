import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { DonationAcknowledgement, generateAcknowledgementNumber } from '../../utils/acknowledgement';
import { amountToWords } from '../../utils/amountToWords';
import { Button } from '../common/Button';
import { Loader2 } from 'lucide-react';

interface DonationAcknowledgementFormProps {
  amount: number;
  purpose: string;
  initialData?: Partial<DonationAcknowledgement>;
  prefilledUtr: string;
  prefilledName: string;
  donationReference: string;
  onGenerate: (acknowledgement: DonationAcknowledgement) => void;
}

export const DonationAcknowledgementForm: React.FC<DonationAcknowledgementFormProps> = ({
  amount,
  purpose,
  initialData,
  prefilledUtr,
  prefilledName,
  donationReference,
  onGenerate
}) => {
  const { t } = useLanguage();
  const [isGenerating, setIsGenerating] = useState(false);

  // Form State
  const [location, setLocation] = useState(initialData?.donorLocation || '');
  const [date, setDate] = useState(initialData?.donationDate || new Date().toISOString().split('T')[0]);
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedUtr = prefilledUtr.trim();

    if (!trimmedUtr) {
      setError('UTR is missing from previous step.');
      return;
    }

    if (!confirmed) {
      setError('You must confirm the details are correct.');
      return;
    }

    setIsGenerating(true);

    // Prevent double generation
    setTimeout(() => {
      const ackNumber = initialData?.acknowledgementNumber || generateAcknowledgementNumber();
      
      const newAcknowledgement: DonationAcknowledgement = {
        acknowledgementNumber: ackNumber,
        generatedAt: initialData?.generatedAt || new Date().toISOString(),
        donationDate: date,
        donorName: prefilledName.trim() || undefined,
        donorLocation: location.trim() || undefined,
        amount,
        amountInWords: amountToWords(amount),
        purpose,
        paymentMode: 'UPI',
        transactionReference: trimmedUtr,
        verificationStatus: 'awaiting-committee-verification',
        proofSubmissionStatus: 'declared-sent',
        donationReference: donationReference
      };

      onGenerate(newAcknowledgement);
      setIsGenerating(false);
    }, 400); // slight delay for visual feedback
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-surface-container-lowest p-6 md:p-8 rounded-3xl shadow-sm border border-outline-variant/30">
      <h3 className="font-display font-bold text-2xl text-primary mb-6">
        {t.donation.generateAckTitle}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Read-Only Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-surface-container rounded-xl border border-outline-variant/20 mb-6">
          <div>
            <span className="block font-body text-xs text-on-surface-variant uppercase tracking-wider mb-1">
              {t.donation.amountText}
            </span>
            <span className="font-body font-bold text-lg text-primary">
              ₹{amount.toLocaleString('en-IN')}
            </span>
          </div>
          <div>
            <span className="block font-body text-xs text-on-surface-variant uppercase tracking-wider mb-1">
              {t.donation.purposeText}
            </span>
            <span className="font-body font-bold text-lg text-on-surface">
              {t.donation.purposes[purpose as keyof typeof t.donation.purposes] || purpose}
            </span>
          </div>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-body text-sm font-semibold text-on-surface mb-1">
                {t.donation.dateLabel} <span className="text-secondary">*</span>
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 bg-surface border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body text-on-surface"
                required
              />
            </div>
            <div>
              <label className="block font-body text-sm font-semibold text-on-surface mb-1">
                {t.donation.locationLabel} <span className="text-on-surface-variant font-normal">{t.donation.optionalLabel}</span>
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder={t.donation.locationPlaceholder}
                className="w-full px-4 py-3 bg-surface border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body text-on-surface"
                maxLength={100}
              />
            </div>
          </div>
        </div>

        {/* Confirmation Checkbox */}
        <div className="mt-8 p-4 bg-secondary-container/20 border border-secondary/20 rounded-xl">
          <label className="flex items-start gap-3 cursor-pointer">
            <div className="pt-0.5">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary"
              />
            </div>
            <span className="font-body text-sm font-semibold text-on-surface">
              {t.donation.confirmDetails}
            </span>
          </label>
        </div>

        {error && (
          <div className="text-secondary text-sm font-semibold bg-secondary/10 p-3 rounded-lg border border-secondary/20">
            {error}
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full py-4 justify-center"
          disabled={!confirmed || !prefilledUtr.trim() || isGenerating}
        >
          {isGenerating ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
          {t.donation.generateBtn}
        </Button>
      </form>
    </div>
  );
};
