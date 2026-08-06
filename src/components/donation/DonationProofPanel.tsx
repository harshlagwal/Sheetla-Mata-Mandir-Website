import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { DONATION_CONFIG } from '../../config/donation';
import { DonationPurpose } from './DonationPurposeSelector';
import { Button } from '../common/Button';
import { MessageCircle, ExternalLink, AlertCircle } from 'lucide-react';

interface DonationProofPanelProps {
  amount: number | null;
  purpose: DonationPurpose;
  donationReference: string;
  utr: string;
  setUtr: (utr: string) => void;
  devoteeName: string;
  setDevoteeName: (name: string) => void;
  onProofSent: () => void;
}

export const DonationProofPanel: React.FC<DonationProofPanelProps> = ({
  amount,
  purpose,
  donationReference,
  utr,
  setUtr,
  devoteeName,
  setDevoteeName,
  onProofSent
}) => {
  const { t } = useLanguage();
  const [whatsappOpened, setWhatsappOpened] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Format the date to something simple
  const currentDate = new Date().toLocaleDateString('en-GB');
  
  const purposeLabel = t.donation.purposes[purpose] || purpose;
  
  const isUtrValid = () => {
    const trimmed = utr.trim();
    return trimmed.length >= 6 && trimmed.length <= 24 && /^[a-zA-Z0-9]+$/.test(trimmed);
  };

  const handleOpenWhatsApp = () => {
    setError(null);
    if (!isUtrValid()) {
      setError("Please enter a valid UPI Transaction Reference (UTR) before sending proof.");
      return;
    }
    
    const message = `🙏 Jai Mata Di\n\n*PAYMENT PROOF — SHEETLA MATA MANDIR*\n\nDonation Reference:\n${donationReference}\n\nAmount:\n₹${amount}\n\nPurpose:\n${purposeLabel}\n\nUPI Transaction Reference / UTR:\n${utr.trim()}\n\nDevotee:\n${devoteeName.trim() || "Not Provided"}\n\nDate:\n${currentDate}\n\nI have completed the UPI payment.\n\n📎 I am attaching my UPI transaction screenshot with this message for manual verification by the Temple Committee.\n\nPlease verify this payment against the receiving account using the Donation Reference, amount and UTR above.\n\n🙏 Jai Mata Di`;
    
    // Remove '+' and spaces for the WA link format
    const waNumber = DONATION_CONFIG.committeeWhatsApp.replace(/\D/g, '');
    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${waNumber}?text=${encodedMessage}`;
    
    try {
      window.open(waUrl, '_blank');
      setWhatsappOpened(true);
    } catch (e) {
      setError(t.donation.whatsappFailMessage || "Unable to open WhatsApp automatically.");
    }
  };

  const handleContinue = () => {
    if (isUtrValid() && whatsappOpened && confirmed) {
      onProofSent();
    }
  };

  return (
    <div className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-3xl shadow-lg overflow-hidden flex flex-col">
      <div className="bg-[#5c1616] p-6 text-center border-b border-outline-variant/20">
        <h3 className="font-display font-bold text-xl text-white mb-2">
          {t.donation.sendProofHeading}
        </h3>
        <p className="font-body text-sm text-white/80 max-w-sm mx-auto leading-relaxed">
          {t.donation.sendProofDesc}
        </p>
      </div>

      <div className="p-6 md:p-8 flex-grow flex flex-col gap-6">
        
        {/* Donation Reference Display */}
        <div className="w-full bg-[#fcf9f5] border border-[#d4af37]/30 rounded-xl p-4 flex flex-col items-center text-center shadow-sm">
          <span className="font-body text-xs text-[#5c1616] font-bold uppercase tracking-wider mb-1">
            {t.donation.donationReferenceLabel}
          </span>
          <span className="font-mono font-bold text-lg text-[#422a26]">
            {donationReference}
          </span>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block font-body text-sm font-semibold text-on-surface mb-1">
              {t.donation.utrLabel} <span className="text-secondary">*</span>
            </label>
            <input
              type="text"
              value={utr}
              onChange={(e) => setUtr(e.target.value)}
              placeholder="Enter 12-digit UTR"
              className="w-full px-4 py-3 bg-surface border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-mono text-on-surface uppercase"
              maxLength={24}
              required
            />
            <p className="mt-1 text-xs text-on-surface-variant">
              {t.donation.utrHelper}
            </p>
          </div>

          <div>
            <label className="block font-body text-sm font-semibold text-on-surface mb-1">
              {t.donation.devoteeNameLabel} <span className="text-on-surface-variant font-normal">{t.donation.optionalLabel}</span>
            </label>
            <input
              type="text"
              value={devoteeName}
              onChange={(e) => setDevoteeName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 bg-surface border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body text-on-surface"
              maxLength={100}
            />
          </div>
        </div>

        {/* WhatsApp Action */}
        <div className="bg-[#e8f5e9] border border-[#a5d6a7] p-5 rounded-2xl flex flex-col gap-4 mt-2">
          <p className="text-sm text-[#2e7d32] font-medium leading-relaxed">
            <span className="font-bold uppercase tracking-wider block mb-1 text-xs">Note:</span>
            {t.donation.whatsappNotice}
          </p>
          
          <Button
            variant="primary"
            className="w-full justify-center bg-[#25D366] hover:bg-[#128C7E] text-white py-3 font-semibold shadow-md gap-2"
            onClick={handleOpenWhatsApp}
          >
            <MessageCircle className="w-5 h-5" />
            {t.donation.sendWhatsAppBtn}
            <ExternalLink className="w-4 h-4 opacity-70" />
          </Button>
          
          {error && (
            <div className="bg-red-50 text-red-700 text-sm p-3 rounded-lg border border-red-200 mt-2 flex gap-2">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Confirmation State */}
        {whatsappOpened && (
          <div className="mt-4 p-5 bg-secondary-container/20 border border-secondary/20 rounded-xl animate-fade-in">
            <p className="text-sm font-bold text-secondary mb-4">
              {t.donation.beforeContinuingInstruction}
            </p>
            
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
                {t.donation.proofSentConfirm}
              </span>
            </label>
          </div>
        )}

      </div>
        
      <div className="p-6 bg-surface-container-low border-t border-outline-variant/20">
        <Button
          variant="primary"
          className="w-full justify-center py-4"
          disabled={!isUtrValid() || !whatsappOpened || !confirmed}
          onClick={handleContinue}
        >
          {t.donation.continueToAckBtn}
        </Button>
        {/* 
          // This is a UX safeguard only.
          // The frontend cannot technically confirm that the WhatsApp 
          // message or screenshot was actually sent.
        */}
      </div>
    </div>
  );
};
