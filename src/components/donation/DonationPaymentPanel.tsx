import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  ShieldCheck, 
  Copy, 
  Check, 
  QrCode, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Building2, 
  ArrowRight,
  Lock,
  Smartphone
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { DONATION_CONFIG } from '../../config/donation';
import { generateUpiUri } from '../../utils/donation';
import { DonationPurpose } from './DonationPurposeSelector';

interface DonationPaymentPanelProps {
  amount: number | null;
  purpose: DonationPurpose;
  donationReference?: string;
  onProceedToReceipt?: () => void;
}

export const DonationPaymentPanel: React.FC<DonationPaymentPanelProps> = ({ 
  amount, 
  purpose, 
  donationReference,
  onProceedToReceipt 
}) => {
  const { isHindi } = useLanguage();
  const [upiCopied, setUpiCopied] = useState(false);
  const [refCopied, setRefCopied] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);

  const displayAmount = amount || 0;
  const isEnabled = DONATION_CONFIG.enabled && DONATION_CONFIG.upiId;
  const isValidAmount = displayAmount > 0;

  const handleCopyUpi = () => {
    if (DONATION_CONFIG.upiId) {
      navigator.clipboard.writeText(DONATION_CONFIG.upiId);
      setUpiCopied(true);
      setTimeout(() => setUpiCopied(false), 2200);
    }
  };

  const handleCopyRef = () => {
    if (donationReference) {
      navigator.clipboard.writeText(donationReference);
      setRefCopied(true);
      setTimeout(() => setRefCopied(false), 2200);
    }
  };

  // Human-readable purpose label
  const purposeLabels: Record<DonationPurpose, { hi: string; en: string }> = {
    general: { hi: 'नित्य पूजा व श्रृंगार', en: 'Daily Pooja & Shringar' },
    bhandara: { hi: 'भंडारा एवं लंगर सेवा', en: 'Bhandara & Langar' },
    katha: { hi: 'धार्मिक अनुष्ठान / कथा', en: 'Religious Katha' },
    jagran: { hi: 'वार्षिक भव्य जागरण', en: 'Annual Jagran' },
    maintenance: { hi: 'मंदिर विकास व निर्माण', en: 'Mandir Renovation' },
    other: { hi: 'सामान्य दान', en: 'General Donation' },
  };

  const currentPurposeLabel = isHindi 
    ? purposeLabels[purpose]?.hi || 'मंदिर सेवा' 
    : purposeLabels[purpose]?.en || 'Temple Seva';

  // Generate UPI URI
  const upiUri = isValidAmount
    ? generateUpiUri(displayAmount, currentPurposeLabel, donationReference)
    : `upi://pay?pa=${DONATION_CONFIG.upiId}&pn=${encodeURIComponent(DONATION_CONFIG.beneficiaryName)}&cu=INR`;

  const handleDirectUpiLaunch = () => {
    window.location.href = upiUri;
  };

  if (!isEnabled) {
    return (
      <div className="w-full p-8 bg-surface-container-lowest border border-outline-variant/30 rounded-3xl shadow-sm text-center">
        <div className="w-16 h-16 bg-surface-container mx-auto mb-4 rounded-full flex items-center justify-center">
          <Building2 className="w-8 h-8 text-on-surface-variant opacity-60" />
        </div>
        <h3 className="font-display font-bold text-xl text-primary mb-2">
          {isHindi ? 'ऑनलाइन दान सेवा' : 'Online Donation Service'}
        </h3>
        <p className="font-body text-sm text-on-surface-variant max-w-sm mx-auto leading-relaxed">
          {isHindi 
            ? 'आधिकारिक ऑनलाइन दान सुविधा शीघ्र उपलब्ध होगी। कृपया बाद में प्रयास करें।' 
            : 'Official online donation facility is being updated. Please check back later.'}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-surface-container-lowest border border-outline-variant/40 rounded-3xl shadow-lg overflow-hidden flex flex-col transition-all">
      {/* 1. TOP HEADER: GOOGLE-PAY STYLE VERIFIED BANNER */}
      <div className="bg-gradient-to-r from-[#5c1616] via-[#701b1b] to-[#5c1616] text-white p-5 border-b border-[#d4af37]/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
              <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 block">
                {isHindi ? 'सत्यापित मंदिर खाता' : 'Verified Temple Account'}
              </span>
              <span className="text-[11px] text-white/70">
                NPCI UPI • Direct Settlement
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-black/20 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/10 text-[11px] text-[#ffdf79] font-medium">
            <Sparkles className="w-3 h-3 text-[#ffdf79]" />
            <span>0% शुल्क (Zero Fees)</span>
          </div>
        </div>

        {/* Beneficiary & Amount Summary */}
        <div className="mt-4 pt-3 border-t border-white/10 flex items-end justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-white/60 block font-medium">
              {isHindi ? 'प्राप्तकर्ता (Beneficiary):' : 'Beneficiary Name:'}
            </span>
            <div className="font-display font-bold text-base text-white tracking-wide">
              {DONATION_CONFIG.beneficiaryName}
            </div>
            <div className="text-xs text-[#ffdf79] flex items-center gap-1 mt-0.5">
              <Building2 className="w-3.5 h-3.5" />
              <span>{DONATION_CONFIG.bankName}</span>
              <span className="text-white/40">•</span>
              <span className="text-white/80">{currentPurposeLabel}</span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[11px] uppercase tracking-wider text-white/60 block font-medium">
              {isHindi ? 'कुल राशि' : 'Amount'}
            </span>
            <div className="font-display font-black text-2xl text-[#ffdf79]">
              ₹{displayAmount > 0 ? displayAmount.toLocaleString('en-IN') : '—'}
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 md:p-6 flex flex-col gap-5">
        
        {/* 2. PROMINENT UPI ID CARD (GOOGLE PAY / APPLE CLEAN STYLE) */}
        <div className="bg-[#fcf9f5] border border-[#d4af37]/40 rounded-2xl p-4 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#5c1616] uppercase tracking-wider flex items-center gap-1.5">
              <span>{isHindi ? 'आधिकारिक UPI ID' : 'Official Temple UPI ID'}</span>
            </span>
            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
              {isHindi ? 'सत्यापित' : 'Active'}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white border border-outline-variant/40 rounded-xl p-3">
            <div className="font-mono font-bold text-base md:text-lg text-[#3b1212] select-all break-all">
              {DONATION_CONFIG.upiId}
            </div>

            <button
              type="button"
              onClick={handleCopyUpi}
              className={`shrink-0 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-body font-bold text-xs transition-all duration-200 cursor-pointer ${
                upiCopied
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-[#5c1616] text-white hover:bg-[#7a1c1c] shadow-xs active:scale-95'
              }`}
            >
              {upiCopied ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>{isHindi ? 'कॉपी हो गई!' : 'Copied!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>{isHindi ? 'UPI ID कॉपी करें' : 'Copy UPI ID'}</span>
                </>
              )}
            </button>
          </div>
          <p className="text-[11px] text-on-surface-variant/80 mt-2 italic">
            {isHindi 
              ? 'आप किसी भी UPI ऐप (GPay, PhonePe, Paytm, BHIM) में यह ID डालकर दान भेज सकते हैं।'
              : 'You can paste this UPI ID in any payment app to complete your donation.'}
          </p>
        </div>

        {/* 3. 1-TAP OPEN IN UPI APPS (MOBILE QUICK ACTION) */}
        <div>
          <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <Smartphone className="w-3.5 h-3.5 text-primary" />
            <span>{isHindi ? 'सीधे UPI ऐप से भुगतान करें (1-Tap)' : 'Pay Directly via UPI App'}</span>
          </label>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {/* Google Pay */}
            <button
              type="button"
              onClick={handleDirectUpiLaunch}
              className="flex items-center justify-center gap-2 py-3 px-2 rounded-xl bg-surface-container-lowest border border-outline-variant/50 hover:border-blue-500 hover:bg-blue-50/40 transition-all font-body font-semibold text-xs text-on-surface shadow-xs active:scale-95"
            >
              <div className="w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center text-[9px] font-black">
                G
              </div>
              <span>Google Pay</span>
            </button>

            {/* PhonePe */}
            <button
              type="button"
              onClick={handleDirectUpiLaunch}
              className="flex items-center justify-center gap-2 py-3 px-2 rounded-xl bg-surface-container-lowest border border-outline-variant/50 hover:border-purple-500 hover:bg-purple-50/40 transition-all font-body font-semibold text-xs text-on-surface shadow-xs active:scale-95"
            >
              <div className="w-4 h-4 rounded-full bg-purple-600 text-white flex items-center justify-center text-[9px] font-black">
                पे
              </div>
              <span>PhonePe</span>
            </button>

            {/* Paytm */}
            <button
              type="button"
              onClick={handleDirectUpiLaunch}
              className="flex items-center justify-center gap-2 py-3 px-2 rounded-xl bg-surface-container-lowest border border-outline-variant/50 hover:border-sky-500 hover:bg-sky-50/40 transition-all font-body font-semibold text-xs text-on-surface shadow-xs active:scale-95"
            >
              <div className="w-4 h-4 rounded-full bg-sky-500 text-white flex items-center justify-center text-[9px] font-black">
                P
              </div>
              <span>Paytm</span>
            </button>

            {/* BHIM / Other */}
            <button
              type="button"
              onClick={handleDirectUpiLaunch}
              className="flex items-center justify-center gap-2 py-3 px-2 rounded-xl bg-surface-container-lowest border border-outline-variant/50 hover:border-emerald-600 hover:bg-emerald-50/40 transition-all font-body font-semibold text-xs text-on-surface shadow-xs active:scale-95"
            >
              <div className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[9px] font-black">
                B
              </div>
              <span>BHIM / All UPI</span>
            </button>
          </div>
        </div>

        {/* 4. CLEAN QR CODE ACCORDION (FOR SCANNING FROM PHONE) */}
        <div className="border border-outline-variant/40 rounded-2xl overflow-hidden bg-surface-container-low/50">
          <button
            type="button"
            onClick={() => setShowQrCode(!showQrCode)}
            className="w-full flex items-center justify-between p-3.5 hover:bg-surface-container transition-colors font-body text-xs md:text-sm font-bold text-primary"
          >
            <div className="flex items-center gap-2">
              <QrCode className="w-4 h-4 text-[#d4af37]" />
              <span>
                {showQrCode 
                  ? (isHindi ? 'QR कोड छुपाएं' : 'Hide QR Code')
                  : (isHindi ? 'या QR कोड स्कैन करके भुगतान करें (QR देखें)' : 'Or Scan Official QR Code (Click to view)')}
              </span>
            </div>
            {showQrCode ? (
              <ChevronUp className="w-4 h-4 text-on-surface-variant" />
            ) : (
              <ChevronDown className="w-4 h-4 text-on-surface-variant" />
            )}
          </button>

          {showQrCode && (
            <div className="p-5 pt-1 border-t border-outline-variant/30 flex flex-col items-center bg-white">
              <div className="p-3 bg-white border border-[#d4af37]/40 rounded-2xl shadow-sm my-3 flex flex-col items-center">
                <QRCodeSVG
                  value={upiUri}
                  size={190}
                  bgColor="#ffffff"
                  fgColor="#422a26"
                  level="M"
                  includeMargin={false}
                />
                <div className="mt-2 text-center">
                  <span className="text-[11px] font-bold text-[#5c1616] tracking-wide block">
                    {DONATION_CONFIG.beneficiaryName}
                  </span>
                  <span className="text-[10px] text-on-surface-variant/75 font-mono">
                    {DONATION_CONFIG.upiId}
                  </span>
                </div>
              </div>
              <p className="text-xs text-on-surface-variant text-center max-w-xs leading-relaxed">
                {isHindi 
                  ? 'अपने मोबाइल के किसी भी UPI ऐप (GPay, PhonePe, Paytm आदि) से स्कैन करें।' 
                  : 'Scan this official QR with any UPI app on your smartphone.'}
              </p>
            </div>
          )}
        </div>

        {/* 5. DONATION REFERENCE PILL (FOR RECEIPT TRACKING) */}
        {donationReference && (
          <div className="flex items-center justify-between bg-surface-container/60 border border-outline-variant/30 rounded-xl px-3.5 py-2 text-xs">
            <div className="flex items-center gap-1.5 text-on-surface-variant">
              <span className="font-semibold">{isHindi ? 'दान संदर्भ कोड:' : 'Reference Code:'}</span>
              <span className="font-mono font-bold text-primary">{donationReference}</span>
            </div>
            <button
              type="button"
              onClick={handleCopyRef}
              className="text-primary hover:text-[#5c1616] p-1 rounded transition-colors"
              title="Copy Reference"
            >
              {refCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        )}

        {/* 6. PRIMARY CTA: PROCEED TO RECEIPT / ACKNOWLEDGEMENT */}
        {onProceedToReceipt && (
          <button
            type="button"
            onClick={onProceedToReceipt}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#5c1616] via-[#7a1c1c] to-[#5c1616] text-white font-body font-bold text-sm md:text-base shadow-md hover:shadow-lg transition-all transform active:scale-[0.98] border border-[#d4af37]/40 cursor-pointer"
          >
            <span>{isHindi ? 'भुगतान पूर्ण होने के बाद डिजिटल रसीद प्राप्त करें' : 'Completed Payment? Get Digital Receipt'}</span>
            <ArrowRight className="w-4 h-4 text-[#ffdf79]" />
          </button>
        )}

        {/* 7. TRUST & SAFETY NOTICE */}
        <div className="pt-2 border-t border-outline-variant/30 flex items-center justify-center gap-2 text-center text-[11px] text-on-surface-variant/75">
          <Lock className="w-3 h-3 text-emerald-600 shrink-0" />
          <span>
            {isHindi 
              ? '100% दान राशि सीधे मंदिर समिति के UCO बैंक खाते में सुरक्षित पहुंचती है।' 
              : '100% of donation directly settles into the Temple Committee UCO Bank account.'}
          </span>
        </div>

      </div>
    </div>
  );
};
