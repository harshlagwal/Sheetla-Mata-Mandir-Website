import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { DONATION_CONFIG } from '../config/donation';
import { Button } from '../components/common/Button';
import {
  Sparkles,
  Copy,
  Check,
  Building2,
  Smartphone,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const Donate: React.FC = () => {
  const { isHindi } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopyUpi = () => {
    if (DONATION_CONFIG.upiId) {
      navigator.clipboard.writeText(DONATION_CONFIG.upiId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const handleDirectUpiLaunch = () => {
    const upiUri = `upi://pay?pa=${DONATION_CONFIG.upiId}&pn=${encodeURIComponent(
      DONATION_CONFIG.beneficiaryName
    )}&cu=INR`;
    window.location.href = upiUri;
  };

  return (
    <div className="w-full bg-[#f8f6f2] text-slate-900 selection:bg-amber-500/20 selection:text-amber-900 pt-32 sm:pt-36 pb-24 min-h-screen flex flex-col items-center justify-start px-4">
      {/* ── COMPACT HEADER (GOOGLE / ANTIGRAVITY STYLE) ── */}
      <div className="text-center max-w-md mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-900 text-xs font-semibold mb-2.5 backdrop-blur-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span className="font-hindi tracking-wider">॥ ॐ श्री शीतलायै नमः ॥</span>
        </div>

        <h1 className="font-google text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
          {isHindi ? 'पावन दान एवं सेवा' : 'Temple Donation'}
        </h1>

        <p className="font-google text-slate-600 text-xs sm:text-sm mt-1.5 leading-relaxed">
          {isHindi
            ? 'अपनी श्रद्धा अनुसार सीधे मंदिर के आधिकारिक खाते में दान करें।'
            : 'Contribute as per your devotion directly to the official temple account.'}
        </p>
      </div>

      {/* ── MEDIUM, ULTRA-CLEAN WHITE CARD ── */}
      <div className="w-full max-w-[480px] bg-white rounded-3xl border border-slate-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-6 sm:p-7 space-y-5">
        
        {/* Verified Beneficiary Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold block">
              {isHindi ? 'आधिकारिक खाताधारक' : 'Official Beneficiary'}
            </span>
            <div className="font-google font-bold text-sm text-slate-900 mt-0.5">
              {DONATION_CONFIG.beneficiaryName}
            </div>
            <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
              <Building2 className="w-3.5 h-3.5 text-amber-700" />
              <span>{DONATION_CONFIG.bankName}</span>
              <span className="text-slate-300">•</span>
              <span>Lagdevi</span>
            </div>
          </div>

          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full shrink-0">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isHindi ? 'सत्यापित' : 'Verified'}</span>
          </span>
        </div>

        {/* UPI ID Display Box */}
        <div className="bg-[#fcfbf9] border border-amber-300/60 rounded-2xl p-4 text-center space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-amber-900 font-semibold block">
            {isHindi ? 'आधिकारिक UPI ID' : 'Official UPI ID'}
          </span>
          <div className="font-mono font-bold text-lg sm:text-xl text-slate-950 select-all tracking-tight break-all">
            {DONATION_CONFIG.upiId}
          </div>
          <p className="text-[11px] text-slate-500 leading-snug">
            {isHindi
              ? 'अपनी श्रद्धा अनुसार कोई भी राशि सीधे भेजें (कोई तय राशि नहीं)।'
              : 'Donate any amount as per your wish (No fixed amount).'}
          </p>
        </div>

        {/* Action Buttons using Official Website <Button> Component */}
        <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
          <Button
            variant="primary"
            size="md"
            className="flex-1 justify-center py-2.5 text-xs sm:text-sm font-semibold"
            onClick={handleCopyUpi}
            icon={copied ? <Check className="w-4 h-4 text-emerald-400 stroke-[3]" /> : <Copy className="w-4 h-4" />}
          >
            {copied ? (isHindi ? 'कॉपी हो गई!' : 'Copied!') : (isHindi ? 'UPI ID कॉपी करें' : 'Copy UPI ID')}
          </Button>

          <Button
            variant="ghost"
            size="md"
            className="flex-1 justify-center py-2.5 text-xs sm:text-sm font-semibold border-slate-300 hover:border-slate-800"
            onClick={handleDirectUpiLaunch}
            icon={<Smartphone className="w-4 h-4 text-amber-700" />}
          >
            {isHindi ? 'GPay / PhonePe खोलें' : 'Open UPI App'}
          </Button>
        </div>

        {/* Simple 3-Step Guide (Clean & Compact) */}
        <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600 font-google">
          <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5 mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>{isHindi ? 'दान करने का सरल तरीका:' : 'Simple 3 Steps:'}</span>
          </div>

          <div className="flex items-start gap-2">
            <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
              1
            </span>
            <span>
              {isHindi ? 'ऊपर बटन से UPI ID कॉपी करें।' : 'Copy the official UPI ID above.'}
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
              2
            </span>
            <span>
              {isHindi
                ? 'Google Pay, PhonePe या Paytm में ‘Pay to UPI ID’ में पेस्ट करें।'
                : 'Paste in your UPI app under Pay to UPI ID.'}
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
              3
            </span>
            <span>
              {isHindi
                ? 'नाम MANAGING COMMITTEE SITTA TAMPLE चेक कर श्रद्धा अनुसार दान करें।'
                : 'Verify name & send any amount as per your wish.'}
            </span>
          </div>
        </div>

        {/* Small Reassuring Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[11px] text-slate-500 text-center font-google">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>
            {isHindi
              ? 'दान पूर्णतः स्वैच्छिक है • 100% राशि सीधे मंदिर खाते में'
              : '100% Direct to Temple Trust • Voluntary'}
          </span>
        </div>

      </div>
    </div>
  );
};
