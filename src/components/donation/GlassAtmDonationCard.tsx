import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { DONATION_CONFIG } from '../../config/donation';
import { Button } from '../common/Button';
import {
  Sparkles,
  Copy,
  Check,
  Building2,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  Eye,
  CreditCard,
  Radio,
  Lock
} from 'lucide-react';

interface GlassAtmDonationCardProps {
  className?: string;
}

export const GlassAtmDonationCard: React.FC<GlassAtmDonationCardProps> = ({ className = '' }) => {
  const { isHindi } = useLanguage();
  const [isOpen, setIsOpen] = useState(true); // default open so devotees see the UPI ID immediately, but can toggle
  const [copied, setCopied] = useState(false);

  const handleCopyUpi = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (DONATION_CONFIG.upiId) {
      navigator.clipboard.writeText(DONATION_CONFIG.upiId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  const handleDirectUpiLaunch = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const upiUri = `upi://pay?pa=${DONATION_CONFIG.upiId}&pn=${encodeURIComponent(
      DONATION_CONFIG.beneficiaryName
    )}&cu=INR`;
    window.location.href = upiUri;
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`w-full max-w-[460px] mx-auto flex flex-col items-center ${className}`}>
      {/* ── STYLISH INTERACTIVE TOGGLE BUTTON ── */}
      <div className="w-full flex items-center justify-between px-2 mb-3">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-900 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span className="font-hindi">
            {isHindi ? 'डिजिटल दर्शन कार्ड' : 'Digital Temple Card'}
          </span>
        </div>

        <button
          type="button"
          onClick={toggleOpen}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Close Card' : 'Open Card'}
          className="group relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer overflow-hidden
            bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white shadow-[0_4px_14px_rgba(217,119,6,0.35)] hover:shadow-[0_6px_20px_rgba(217,119,6,0.45)] active:scale-95"
        >
          <span className="relative z-10 flex items-center gap-1.5">
            {isOpen ? (
              <>
                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 rotate-180" />
                <span>{isHindi ? 'कार्ड समेटें' : 'Close Sleeve'}</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5 animate-pulse" />
                <span>{isHindi ? 'कार्ड खोलें (Open)' : 'Open Card'}</span>
              </>
            )}
          </span>
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform" />
        </button>
      </div>

      {/* ── 3D GLASS FOLDER / POCKET CONTAINER ── */}
      <div
        className="relative w-full select-none"
        style={{
          perspective: '1200px',
          height: isOpen ? '360px' : '285px',
          transition: 'height 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Soft Ambient Shadow on Floor */}
        <div
          className="absolute -bottom-4 left-6 right-6 h-12 rounded-full bg-amber-950/20 blur-xl pointer-events-none transition-all duration-700"
          style={{
            opacity: isOpen ? 0.35 : 0.6,
            transform: isOpen ? 'scale(1.04) translateY(4px)' : 'scale(0.96)',
          }}
        />

        {/* ── LAYER 1: BACK PANEL (FOLDER BACK) ── */}
        <div
          className="absolute inset-x-0 bottom-0 top-12 rounded-3xl overflow-hidden border border-amber-900/10 shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-700"
          style={{
            background: 'linear-gradient(160deg, #1f1d1a 0%, #29241e 50%, #151311 100%)',
          }}
        >
          {/* Subtle Golden Sacred Radial & Lines */}
          <div
            className="absolute inset-0 pointer-events-none opacity-25"
            style={{
              backgroundImage: 'radial-gradient(circle at 50% 20%, rgba(245, 158, 11, 0.4) 0%, transparent 60%)',
            }}
          />
          <div className="absolute top-3 left-4 right-4 flex items-center justify-between text-[10px] font-mono tracking-widest text-amber-400/50 uppercase">
            <span>UCO BANK • TRUST WALLET</span>
            <span className="flex items-center gap-1">
              <Lock className="w-2.5 h-2.5" /> SECURE
            </span>
          </div>
        </div>

        {/* ── LAYER 2: ULTRA-REALISTIC GLASS ATM CARD (THE CORE OBJECT) ── */}
        <div
          onClick={() => !isOpen && setIsOpen(true)}
          className={`absolute left-3 right-3 sm:left-4 sm:right-4 z-20 rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
            border border-amber-300/40 shadow-[0_20px_50px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.7),inset_0_0_24px_rgba(245,158,11,0.12)]`}
          style={{
            height: '228px',
            bottom: isOpen ? '118px' : '48px',
            transform: isOpen
              ? 'translateY(-12px) rotateX(2deg) scale(1.01)'
              : 'translateY(0px) rotateX(-6deg) scale(0.97)',
            background:
              'linear-gradient(135deg, rgba(255, 255, 255, 0.22) 0%, rgba(245, 158, 11, 0.16) 28%, rgba(26, 21, 16, 0.88) 72%, rgba(15, 13, 11, 0.95) 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        >
          {/* Iridescent Metallic Sheen Overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.15) 35%, rgba(245,158,11,0.2) 48%, transparent 60%)',
              mixBlendMode: 'overlay',
            }}
          />

          {/* Golden Micro-Mesh Background Pattern */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(rgba(245, 158, 11, 0.8) 1px, transparent 1px)',
              backgroundSize: '12px 12px',
            }}
          />

          {/* CARD CONTENT */}
          <div className="relative h-full p-4 sm:p-5 flex flex-col justify-between text-white">
            {/* Top Row: Bank Info & Temple Trust Header */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 via-amber-600 to-amber-700 flex items-center justify-center shadow-[0_2px_8px_rgba(217,119,6,0.4)] border border-amber-200/50">
                  <Building2 className="w-4 h-4 text-slate-950 stroke-[2.5]" />
                </div>
                <div>
                  <div className="font-google font-extrabold text-xs sm:text-sm tracking-wide text-amber-200 uppercase flex items-center gap-1.5">
                    <span>{DONATION_CONFIG.bankName}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 font-mono border border-amber-400/30">
                      LAGDEVI
                    </span>
                  </div>
                  <div className="text-[10px] text-amber-100/70 font-mono tracking-wider">
                    HAMIRPUR • HIMACHAL PRADESH
                  </div>
                </div>
              </div>

              {/* Temple Crest / Holographic Badge */}
              <div className="text-right">
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-[10px] font-semibold text-amber-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>SEVA CARD</span>
                </div>
                <div className="text-[9px] font-hindi text-amber-200/80 mt-0.5">
                  ॥ श्री शीतलायै नमः ॥
                </div>
              </div>
            </div>

            {/* Middle Row: Realistic Golden EMV Microchip + Contactless Waves */}
            <div className="flex items-center justify-between my-auto py-1">
              <div className="flex items-center gap-3">
                {/* ── REALISTIC EMV GOLD CHIP ── */}
                <div
                  className="relative w-11 h-8 rounded-md overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_2px_6px_rgba(0,0,0,0.5)] border border-amber-300/60"
                  style={{
                    background: 'linear-gradient(135deg, #fce09b 0%, #d49826 40%, #fef3c7 70%, #a16207 100%)',
                  }}
                >
                  {/* Microchip internal circuit pads */}
                  <div className="absolute inset-0.5 rounded-sm border border-amber-900/30">
                    <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[0.5px] bg-amber-950/40" />
                    <div className="absolute top-0 bottom-0 left-1/3 w-[0.5px] bg-amber-950/40" />
                    <div className="absolute top-0 bottom-0 right-1/3 w-[0.5px] bg-amber-950/40" />
                    <div className="absolute inset-2 rounded-xs bg-amber-600/30 border border-amber-950/30" />
                  </div>
                </div>

                {/* Contactless Radio Wave Icon */}
                <div className="flex items-center text-amber-300/80">
                  <Radio className="w-5 h-5 -rotate-45" />
                </div>
              </div>

              {/* Instant Copy Pill on the card */}
              <button
                type="button"
                onClick={handleCopyUpi}
                className="group/btn inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-white/15 hover:bg-white/25 active:scale-95 text-amber-100 border border-amber-300/40 backdrop-blur-md transition-all shadow-[0_2px_8px_rgba(0,0,0,0.3)] cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
                    <span className="text-emerald-300 font-bold">{isHindi ? 'कॉपी हो गई!' : 'Copied!'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-amber-300 group-hover/btn:scale-110 transition-transform" />
                    <span>{isHindi ? 'UPI कॉपी' : 'Copy'}</span>
                  </>
                )}
              </button>
            </div>

            {/* Middle Lower: EMBOSSED UPI ID (THE CARD NUMBER) */}
            <div className="space-y-0.5">
              <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-amber-300/70 uppercase">
                <span>OFFICIAL UPI ID / वर्चुअल पता</span>
                <span className="text-[9px] text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> VERIFIED
                </span>
              </div>
              <div
                onClick={handleCopyUpi}
                title="Click to copy UPI ID"
                className="font-mono font-extrabold text-sm sm:text-base md:text-[17px] tracking-wider text-amber-100 select-all drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] break-all hover:text-amber-300 transition-colors cursor-pointer flex items-center gap-2"
              >
                <span>{DONATION_CONFIG.upiId}</span>
              </div>
            </div>

            {/* Bottom Row: Beneficiary Name & Hologram Logo */}
            <div className="flex items-end justify-between pt-1 border-t border-white/10 gap-2">
              <div>
                <span className="text-[8px] font-mono uppercase tracking-widest text-amber-300/60 block">
                  CARD HOLDER / खाताधारक
                </span>
                <span className="font-google font-bold text-[11px] sm:text-xs text-amber-100 tracking-wide uppercase line-clamp-1 drop-shadow-sm">
                  {DONATION_CONFIG.beneficiaryName}
                </span>
              </div>

              {/* Holographic Payment Logo */}
              <div className="shrink-0 text-right">
                <span className="text-[8px] font-mono uppercase tracking-widest text-amber-300/60 block">
                  NETWORK
                </span>
                <div className="inline-flex items-center gap-1 font-black text-xs sm:text-sm tracking-tighter bg-gradient-to-r from-teal-300 via-amber-200 to-rose-300 bg-clip-text text-transparent">
                  <span>BHARAT</span>
                  <span className="text-[10px] px-1 py-0.2 rounded bg-amber-400 text-slate-950 font-bold">
                    UPI
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── LAYER 3: FROSTED GLASS FRONT PANEL (THE HINGE) ── */}
        <div
          onClick={toggleOpen}
          className="absolute inset-x-0 bottom-0 z-30 rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
            border border-white/80 shadow-[0_20px_50px_rgba(0,0,0,0.14)]"
          style={{
            height: '185px',
            transformOrigin: '50% 100%',
            transform: isOpen ? 'perspective(900px) rotateX(-22deg) translateY(6px)' : 'perspective(900px) rotateX(0deg)',
            background:
              'linear-gradient(180deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.75) 45%, rgba(252, 252, 252, 0.95) 100%)',
            backdropFilter: 'blur(22px) saturate(1.6)',
            WebkitBackdropFilter: 'blur(22px) saturate(1.6)',
          }}
        >
          {/* Frosted Specular Sheen & Rim Highlight */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(280px 180px at 50% 20%, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0) 70%)',
            }}
          />

          {/* Front Curved Notch / Rim Edge */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-white/90 via-amber-200 to-white/90 shadow-[0_1px_3px_rgba(255,255,255,0.8)]" />

          {/* Front Panel Content */}
          <div className="relative h-full p-5 sm:p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-700">
                  <CreditCard className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-google font-bold text-xs sm:text-sm text-slate-900 leading-tight">
                    {isHindi ? 'माता का पावन दान कार्ड' : 'Mata Seva Donation Card'}
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono">
                    {isOpen
                      ? (isHindi ? 'कार्ड खुला है • UPI ID दृश्यमान' : 'Card Open • UPI ID Visible')
                      : (isHindi ? 'टैप करके खोलें • Tap to Open' : 'Tap to reveal full card')}
                  </div>
                </div>
              </div>

              {/* Verified Pill */}
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-800 bg-emerald-100/80 border border-emerald-300 px-2 py-0.5 rounded-full">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>{isHindi ? 'सत्यापित खाता' : 'Verified'}</span>
              </span>
            </div>

            {/* Bottom Row on Front Panel */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-200/70">
              <div className="text-[11px] text-slate-600 font-google">
                <span className="font-semibold text-slate-900">
                  {isHindi ? 'सीधा मंदिर खाता' : 'Direct to Temple'}
                </span>
                <span className="text-slate-400 mx-1.5">•</span>
                <span>{isHindi ? 'कोई मध्यस्थ नहीं' : 'No Middlemen'}</span>
              </div>

              <div className="inline-flex items-center gap-1 text-xs font-semibold text-amber-800 group-hover:text-amber-950">
                <span>{isOpen ? (isHindi ? 'समेटें' : 'Close') : (isHindi ? 'कार्ड खोलें' : 'View Card')}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── ACTION BUTTONS UNDERNEATH CARD ── */}
      <div className="w-full space-y-3 mt-4">
        <div className="flex flex-col sm:flex-row gap-2.5">
          <Button
            variant="primary"
            size="md"
            className="flex-1 justify-center py-2.5 text-xs sm:text-sm font-semibold shadow-[0_4px_16px_rgba(217,119,6,0.3)] hover:shadow-[0_6px_22px_rgba(217,119,6,0.45)]"
            onClick={handleCopyUpi}
            icon={copied ? <Check className="w-4 h-4 text-emerald-400 stroke-[3]" /> : <Copy className="w-4 h-4" />}
          >
            {copied ? (isHindi ? 'कॉपी हो गई!' : 'Copied!') : (isHindi ? 'UPI ID कॉपी करें' : 'Copy UPI ID')}
          </Button>

          <Button
            variant="ghost"
            size="md"
            className="flex-1 justify-center py-2.5 text-xs sm:text-sm font-semibold border-slate-300 hover:border-slate-800 bg-white/70 backdrop-blur-xs"
            onClick={handleDirectUpiLaunch}
            icon={<Smartphone className="w-4 h-4 text-amber-700" />}
          >
            {isHindi ? 'GPay / PhonePe खोलें' : 'Open UPI App'}
          </Button>
        </div>

        {/* ── VERIFIED BENEFICIARY SUMMARY PILL ── */}
        <div className="w-full bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/90 p-4 shadow-xs">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
              {isHindi ? 'आधिकारिक खाताधारक' : 'Official Beneficiary'}
            </span>
            <span className="text-[10px] font-mono text-emerald-700 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% SECURE
            </span>
          </div>

          <div className="font-google font-bold text-xs sm:text-sm text-slate-950">
            {DONATION_CONFIG.beneficiaryName}
          </div>

          <div className="text-xs text-slate-500 flex items-center gap-1 mt-1">
            <Building2 className="w-3.5 h-3.5 text-amber-700" />
            <span>{DONATION_CONFIG.bankName}</span>
            <span className="text-slate-300">•</span>
            <span>Lagdevi Branch, Hamirpur</span>
          </div>
        </div>

        {/* ── SIMPLE 3-STEP GUIDE ── */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/80 p-4 space-y-2 text-xs text-slate-600 font-google shadow-xs">
          <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>{isHindi ? 'दान करने का सरल तरीका:' : 'Simple 3 Steps:'}</span>
          </div>

          <div className="flex items-start gap-2">
            <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-900 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
              1
            </span>
            <span>
              {isHindi
                ? 'ऊपर कार्ड या बटन से UPI ID कॉपी करें।'
                : 'Copy the official UPI ID from the card above.'}
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-900 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
              2
            </span>
            <span>
              {isHindi
                ? 'Google Pay, PhonePe या Paytm में ‘Pay to UPI ID’ में पेस्ट करें।'
                : 'Paste in your UPI app under Pay to UPI ID.'}
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-900 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
              3
            </span>
            <span>
              {isHindi
                ? 'नाम MANAGING COMMITTEE SITTA TAMPLE चेक कर श्रद्धा अनुसार दान करें।'
                : 'Verify name & send any amount as per your wish.'}
            </span>
          </div>
        </div>

        {/* Reassuring Footer */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 text-center font-google pt-1">
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
