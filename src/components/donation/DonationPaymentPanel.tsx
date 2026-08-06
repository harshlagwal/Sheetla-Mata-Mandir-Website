import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { AlertCircle, CheckCircle2, Copy, Check } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { DONATION_CONFIG } from '../../config/donation';
import { generateUpiUri } from '../../utils/donation';
import { DonationPurpose } from './DonationPurposeSelector';
import { Button } from '../common/Button';

interface DonationPaymentPanelProps {
  amount: number | null;
  purpose: DonationPurpose;
  donationReference?: string;
}

export const DonationPaymentPanel: React.FC<DonationPaymentPanelProps> = ({ amount, purpose, donationReference }) => {
  const { t, isHindi } = useLanguage();
  const [upiClicked, setUpiClicked] = useState(false);
  const [upiCopied, setUpiCopied] = useState(false);

  const displayAmount = amount || 0;
  const isEnabled = DONATION_CONFIG.enabled && DONATION_CONFIG.upiId;
  const isValidAmount = displayAmount > 0;

  const handleUpiClick = (uri: string) => {
    setUpiClicked(true);
    window.location.href = uri;
  };

  const handleCopyUpi = () => {
    if (DONATION_CONFIG.upiId) {
      navigator.clipboard.writeText(DONATION_CONFIG.upiId);
      setUpiCopied(true);
      setTimeout(() => setUpiCopied(false), 2000);
    }
  };

  if (!isEnabled) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center p-8 bg-surface-container-lowest border border-outline-variant/30 rounded-3xl shadow-sm text-center min-h-[400px]">
        <div className="w-16 h-16 bg-surface-container mb-4 rounded-full flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-on-surface-variant opacity-50" />
        </div>
        <h3 className="font-display font-bold text-2xl text-primary mb-2">
          {t.donation.panelTitle}
        </h3>
        <span className="inline-block bg-secondary-fixed text-on-secondary-fixed text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
          {t.donation.comingSoon}
        </span>
        <p className="font-body text-sm text-on-surface-variant max-w-xs leading-relaxed">
          {t.donation.comingSoonText}
        </p>
      </div>
    );
  }

  if (!isValidAmount) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center p-8 bg-surface-container-lowest border border-outline-variant/30 rounded-3xl shadow-sm text-center min-h-[400px]">
        <p className="font-body text-sm text-on-surface-variant">
          {t.donation.amountLabel}
        </p>
      </div>
    );
  }

  // Generate UPI Intent and Purpose Label
  const purposeLabel = t.donation.purposes[purpose] || purpose;
  const upiUri = generateUpiUri(displayAmount, purposeLabel, donationReference);

  return (
    <div className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-3xl shadow-lg overflow-hidden flex flex-col">
      <div className="bg-primary/5 p-6 text-center border-b border-outline-variant/20">
        <h3 className="font-display font-bold text-xl text-primary mb-1">
          {t.donation.panelTitle}
        </h3>
        <p className="font-body text-2xl font-semibold text-secondary">
          ₹{displayAmount.toFixed(2)}
        </p>
        
        {DONATION_CONFIG.testMode && (
          <div className="mt-4 p-3 bg-secondary/10 border border-secondary/20 rounded-xl flex flex-col items-center">
            <span className="inline-block bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-widest mb-1">
              {t.donation.testModeBadge}
            </span>
            <p className="font-body text-xs text-secondary font-medium">
              {t.donation.testModeNotice}
            </p>
          </div>
        )}
      </div>

      <div className="p-6 md:p-8 flex-grow flex flex-col items-center">
        {/* Donation Reference Display */}
        {donationReference && (
          <div className="w-full bg-[#fcf9f5] border border-[#d4af37]/30 rounded-xl p-4 mb-6 flex flex-col items-center text-center shadow-sm">
            <span className="font-body text-xs text-[#5c1616] font-bold uppercase tracking-wider mb-1">
              {t.donation.donationReferenceLabel}
            </span>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-lg text-[#422a26]">
                {donationReference}
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(donationReference);
                  setUpiCopied(true);
                  setTimeout(() => setUpiCopied(false), 2000);
                }}
                className="p-1.5 hover:bg-[#5c1616]/5 rounded-md transition-colors text-[#5c1616] relative flex items-center"
                title={t.donation.copyReferenceText}
              >
                {upiCopied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                {upiCopied && <span className="absolute -top-6 -right-2 text-[10px] font-bold text-green-600 bg-white shadow-sm border px-1 rounded whitespace-nowrap">{t.donation.referenceCopied}</span>}
              </button>
            </div>
            <p className="font-body text-xs text-on-surface-variant mt-2 max-w-xs">
              {t.donation.keepReferenceInstruction}
            </p>
          </div>
        )}

        {/* Desktop QR Code */}
        <div className="hidden md:flex flex-col items-center w-full">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-outline-variant/30 mb-6 inline-block">
            {upiUri ? (
              <>
                <QRCodeSVG
                  value={upiUri}
                  size={200}
                  bgColor="#ffffff"
                  fgColor="#422a26"
                  level="M"
                  includeMargin={false}
                />
                <div className="mt-4 text-center">
                  <p className="font-body text-sm font-semibold text-primary">
                    {t.donation.scanToDonate || "Scan with any compatible UPI app"}
                  </p>
                  <p className="font-body text-xs text-on-surface-variant mt-1">
                    {t.donation.supportedApps || "Google Pay • PhonePe • BHIM • Other UPI Apps"}
                  </p>
                </div>
              </>
            ) : (
              <div className="w-[200px] h-[200px] flex items-center justify-center bg-surface-container text-on-surface-variant text-sm text-center p-4 rounded-xl">
                {t.donation.unavailableFallback}
              </div>
            )}
          </div>
        </div>

        {/* Payment Details */}
        <div className="w-full space-y-3 mb-6 bg-surface-container p-4 rounded-xl border border-outline-variant/30">
          <div className="pb-3 mb-1 text-center">
            <span className="font-body text-sm font-bold text-primary uppercase tracking-wider">
              {isHindi ? "आधिकारिक मंदिर UPI" : "Official Temple UPI"}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm pt-2 border-t border-outline-variant/30">
            <span className="font-body text-on-surface-variant">{t.donation.upiIdLabel}</span>
            <div className="flex items-center gap-2">
              <span className="font-body font-semibold text-on-surface text-right">
                {DONATION_CONFIG.upiId}
              </span>
              <button
                onClick={handleCopyUpi}
                className="p-1.5 hover:bg-surface-container-highest rounded-md transition-colors text-primary flex items-center gap-1"
                title={t.donation.copyUpiId}
              >
                {upiCopied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                {upiCopied && <span className="text-[10px] font-bold text-green-600 absolute -top-4 right-0 bg-white shadow-sm border px-1 rounded">{t.donation.upiIdCopied}</span>}
              </button>
            </div>
          </div>
          <div className="flex justify-between items-start text-sm pt-2 border-t border-outline-variant/30">
            <span className="font-body text-on-surface-variant">{t.donation.beneficiaryLabel}</span>
            <span className="font-body font-semibold text-on-surface text-right max-w-[60%]">
              {DONATION_CONFIG.beneficiaryName}
            </span>
          </div>
          <div className="flex justify-between items-start text-sm pt-2 border-t border-outline-variant/30">
            <span className="font-body text-on-surface-variant">{isHindi ? "बैंक:" : "Bank:"}</span>
            <span className="font-body font-semibold text-on-surface text-right max-w-[60%]">
              {DONATION_CONFIG.bankName}
            </span>
          </div>
          <div className="flex justify-between items-start text-sm pt-2 border-t border-outline-variant/30">
            <span className="font-body text-on-surface-variant">{t.donation.purposeText}</span>
            <span className="font-body font-semibold text-on-surface text-right max-w-[60%]">
              {purposeLabel}
            </span>
          </div>
          <div className="mt-4 pt-3 border-t border-outline-variant/30">
            <p className="font-body text-[11px] text-on-surface-variant/80 leading-relaxed text-center italic">
              {isHindi
                ? "भुगतान पूर्ण करने से पहले कृपया अपने UPI ऐप में मंदिर के आधिकारिक प्राप्तकर्ता विवरण की पुष्टि अवश्य करें।"
                : "Before completing payment, please verify that your UPI application shows the official temple beneficiary details."}
            </p>
          </div>
        </div>

        {/* Warning Notice */}
        <div className="w-full p-4 mb-6 bg-secondary/10 border border-secondary/20 rounded-xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
          <div>
            <span className="block font-body text-xs font-bold text-secondary mb-1">
              {t.donation.verifyBeforePaying}
            </span>
            <span className="block font-body text-xs text-on-surface-variant">
              {t.donation.verifyText}
            </span>
          </div>
        </div>

        {/* Mobile UPI Button */}
        <div className="md:hidden w-full flex flex-col items-center">
          {upiUri ? (
            <Button
              variant="primary"
              size="lg"
              className="w-full py-4 text-lg shadow-md mb-4"
              onClick={() => handleUpiClick(upiUri)}
            >
              {t.donation.payViaUpi}
            </Button>
          ) : (
            <div className="w-full p-4 bg-surface-container text-on-surface-variant text-sm text-center rounded-xl mb-4">
              {t.donation.unavailableFallback}
            </div>
          )}

          {upiClicked && (
            <div className="flex items-center gap-2 text-xs font-semibold text-tertiary-fixed animate-fade-in bg-tertiary-container/30 px-4 py-2 rounded-lg mb-4">
              <CheckCircle2 className="w-4 h-4" />
              <span>{t.donation.upiRedirectNotice}</span>
            </div>
          )}
        </div>

        {/* Global Payment Status Disclaimer */}
        <div className="w-full text-center px-4">
          <p className="font-body text-xs text-on-surface-variant leading-relaxed">
            {t.donation.completePayment || "Complete payment in your UPI app. Payment status is confirmed by your UPI/bank application. This website does not automatically verify transactions."}
          </p>
        </div>
      </div>
    </div>
  );
};
