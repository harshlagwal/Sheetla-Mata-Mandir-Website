import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { DONATION_CONFIG } from '../../config/donation';
import { DonationPurpose } from './DonationPurposeSelector';
import { Button } from '../common/Button';
import { MessageCircle, ExternalLink, AlertCircle, FileText, CheckCircle2, ArrowLeft } from 'lucide-react';

interface DonationProofPanelProps {
  amount: number | null;
  purpose: DonationPurpose;
  donationReference: string;
  utr: string;
  setUtr: (utr: string) => void;
  devoteeName: string;
  setDevoteeName: (name: string) => void;
  onProofSent: () => void;
  onBack?: () => void;
}

export const DonationProofPanel: React.FC<DonationProofPanelProps> = ({
  amount,
  purpose,
  donationReference,
  utr,
  setUtr,
  devoteeName,
  setDevoteeName,
  onProofSent,
  onBack
}) => {
  const { isHindi } = useLanguage();
  const [error, setError] = useState<string | null>(null);
  const [waSent, setWaSent] = useState(false);

  const currentDate = new Date().toLocaleDateString('en-GB');

  const purposeLabels: Record<DonationPurpose, string> = {
    general: isHindi ? 'नित्य पूजा व श्रृंगार' : 'Daily Pooja & Shringar',
    bhandara: isHindi ? 'भंडारा एवं लंगर' : 'Bhandara & Langar',
    katha: isHindi ? 'धार्मिक अनुष्ठान' : 'Religious Katha',
    jagran: isHindi ? 'वार्षिक जागरण' : 'Annual Jagran',
    maintenance: isHindi ? 'मंदिर विकास व निर्माण' : 'Mandir Renovation',
    other: isHindi ? 'सामान्य दान' : 'General Donation',
  };

  const isUtrValid = () => {
    const trimmed = utr.trim();
    return trimmed.length >= 6 && trimmed.length <= 25 && /^[a-zA-Z0-9]+$/.test(trimmed);
  };

  const handleOpenWhatsApp = () => {
    setError(null);
    if (!isUtrValid()) {
      setError(
        isHindi 
          ? "कृपया पहले 12-अंकों का UPI UTR / Reference नंबर दर्ज करें।"
          : "Please enter your UPI UTR reference number before notifying via WhatsApp."
      );
      return;
    }

    const message = `🙏 जय माता दी\n\n*दान विवरण — शीतला माता मंदिर लगदेवी*\n\nसंदर्भ कोड: ${donationReference}\nराशि: ₹${amount}\nउद्देश्य: ${purposeLabels[purpose]}\nUPI UTR / Ref No: ${utr.trim()}\nश्रद्धालु: ${devoteeName.trim() || 'नाम उपलब्ध नहीं'}\nदिनांक: ${currentDate}\n\nमैंने शीतला माता मंदिर के आधिकारिक खाते में UPI द्वारा दान कर दिया है।\n\n🙏 जय माता दी`;

    const waNumber = DONATION_CONFIG.committeeWhatsApp ? DONATION_CONFIG.committeeWhatsApp.replace(/\D/g, '') : '';

    try {
      if (waNumber) {
        window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`, '_blank');
      } else {
        const mailUrl = `mailto:${(DONATION_CONFIG as any).committeeEmail || 'lagwalharsh1@gmail.com'}?subject=${encodeURIComponent(`Donation Reference: ${donationReference}`)}&body=${encodeURIComponent(message)}`;
        window.open(mailUrl, '_blank');
      }
      setWaSent(true);
    } catch {
      setError(isHindi ? "WhatsApp लिंक खोलने में समस्या आई।" : "Unable to launch WhatsApp.");
    }
  };

  const handleGenerateReceipt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isUtrValid()) {
      setError(
        isHindi
          ? "कृपया 12-अंकों का UPI लेन-देन संदर्भ संख्या (UTR) अवश्य भरें।"
          : "Please enter your valid UPI Transaction Reference (UTR) to generate receipt."
      );
      return;
    }
    setError(null);
    onProofSent();
  };

  return (
    <div className="w-full bg-surface-container-lowest border border-outline-variant/40 rounded-3xl shadow-lg overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#5c1616] via-[#701b1b] to-[#5c1616] text-white p-5 border-b border-[#d4af37]/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="p-1 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors"
                title="Back"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <div>
              <h3 className="font-display font-bold text-lg text-white">
                {isHindi ? 'दान विवरण एवं पावन रसीद' : 'Donation Details & E-Receipt'}
              </h3>
              <p className="text-xs text-white/75">
                {isHindi ? 'अपनी आधिकारिक डिजिटल दान पर्ची प्राप्त करें' : 'Generate your official blessed donation slip'}
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-white/60 block font-bold uppercase">
              {isHindi ? 'राशि' : 'Amount'}
            </span>
            <span className="font-display font-black text-xl text-[#ffdf79]">
              ₹{amount?.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>

      <form onSubmit={handleGenerateReceipt} className="p-5 md:p-6 flex flex-col gap-5">
        {/* Reference Code Badge */}
        <div className="bg-[#fcf9f5] border border-[#d4af37]/40 rounded-2xl p-3.5 flex items-center justify-between text-xs">
          <span className="font-semibold text-on-surface-variant">
            {isHindi ? 'दान संदर्भ संख्या (Reference ID):' : 'Donation Reference ID:'}
          </span>
          <span className="font-mono font-bold text-[#5c1616] text-sm bg-white px-2.5 py-0.5 rounded-lg border border-[#d4af37]/40">
            {donationReference}
          </span>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1.5">
              <span>{isHindi ? 'श्रद्धालु का शुभ नाम (Devotee Name)' : 'Devotee Name'}</span>
              <span className="text-on-surface-variant font-normal text-[11px] ml-1">
                ({isHindi ? 'रसीद पर मुद्रित होगा' : 'Printed on receipt'})
              </span>
            </label>
            <input
              type="text"
              value={devoteeName}
              onChange={(e) => setDevoteeName(e.target.value)}
              placeholder={isHindi ? 'उदा. राकेश कुमार शर्मा' : 'e.g. Rakesh Kumar Sharma'}
              className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/60 rounded-xl focus:ring-2 focus:ring-[#5c1616]/20 focus:border-[#5c1616] transition-all font-body text-sm text-on-surface font-medium"
              maxLength={80}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1.5 flex items-center justify-between">
              <span>
                {isHindi ? 'UPI UTR / Reference No.' : 'UPI Transaction UTR'}
                <span className="text-[#5c1616] ml-1">*</span>
              </span>
              <span className="text-[10px] text-on-surface-variant font-normal">
                {isHindi ? 'GPay/PhonePe में 12-अंक' : '12-digit Ref No'}
              </span>
            </label>
            <input
              type="text"
              value={utr}
              onChange={(e) => setUtr(e.target.value)}
              placeholder={isHindi ? 'उदा. 428901234567' : 'e.g. 428901234567'}
              className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/60 rounded-xl focus:ring-2 focus:ring-[#5c1616]/20 focus:border-[#5c1616] transition-all font-mono font-bold text-sm text-on-surface uppercase tracking-wider"
              maxLength={25}
              required
            />
            <p className="mt-1.5 text-[11px] text-on-surface-variant/80 italic">
              {isHindi 
                ? 'यह 12 अंकों का नंबर आपके UPI पेमेंट (GPay/PhonePe/Paytm) की रसीद पर "UPI Ref No / UTR" नाम से मिलता है।'
                : 'Found in your payment app under "UPI Ref No" or "UTR" on the transaction screen.'}
            </p>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 text-xs p-3 rounded-xl border border-red-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Action 1: Instant Receipt Generation */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full justify-center py-3.5 bg-gradient-to-r from-[#5c1616] to-[#7a1c1c] text-white shadow-md hover:shadow-lg font-bold gap-2 text-sm md:text-base border border-[#d4af37]/40 cursor-pointer"
        >
          <FileText className="w-4 h-4 text-[#ffdf79]" />
          <span>{isHindi ? 'माता रानी की डिजिटल रसीद देखें' : 'Generate Blessed E-Receipt'}</span>
        </Button>

        {/* Action 2: WhatsApp Notification (Optional) */}
        <div className="pt-2 border-t border-outline-variant/30">
          <button
            type="button"
            onClick={handleOpenWhatsApp}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-body font-semibold text-xs transition-colors cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>
              {waSent 
                ? (isHindi ? 'WhatsApp विवरण भेजा गया (पुनः भेजें)' : 'WhatsApp notification sent (Resend)')
                : (isHindi ? 'समिति को WhatsApp पर सूचित करें (वैकल्पिक)' : 'Notify Committee on WhatsApp (Optional)')}
            </span>
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </button>
        </div>

        {/* Back Link */}
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="text-center text-xs text-on-surface-variant hover:text-primary transition-colors cursor-pointer py-1"
          >
            ← {isHindi ? 'वापस भुगतान विवरण पर जाएं' : 'Back to Payment Details'}
          </button>
        )}
      </form>
    </div>
  );
};
