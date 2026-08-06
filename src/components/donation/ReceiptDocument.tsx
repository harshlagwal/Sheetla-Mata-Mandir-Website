import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { DONATION_CONFIG } from '../../config/donation';
import { DonationAcknowledgement } from '../../utils/acknowledgement';
import {
  FileText,
  Calendar,
  User,
  MapPin,
  Banknote,
  CreditCard,
  BookOpen,
  ShieldCheck,
  Receipt,
  Landmark
} from 'lucide-react';

interface ReceiptDocumentProps {
  acknowledgement: DonationAcknowledgement;
}

export const ReceiptDocument: React.FC<ReceiptDocumentProps> = ({ acknowledgement }) => {
  const { t } = useLanguage();

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div
      className="bg-[#faf8f5] w-[210mm] min-h-[297mm] mx-auto p-[12mm] text-[#422a26] font-body relative shadow-sm flex flex-col"
      style={{
        boxSizing: 'border-box'
      }}
    >
      {/* Outer Border */}
      <div className="absolute inset-[8mm] border border-[#5c1616] pointer-events-none rounded-sm">
        {/* Corner Ornaments (Simple CSS-based) */}
        <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-[#5c1616]" />
        <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-[#5c1616]" />
        <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-[#5c1616]" />
        <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-[#5c1616]" />
      </div>
      
      {/* Inner Border */}
      <div className="absolute inset-[10mm] border border-[#d4af37]/40 pointer-events-none rounded-sm" />

      {/* Header */}
      <div className="text-center mb-8 mt-6 relative z-10">
        <div className="text-[28px] text-[#5c1616] font-display mb-2">ॐ</div>
        <h1 className="text-[26px] font-display font-bold text-[#5c1616] mb-1">
          श्री शीतला माता मंदिर
        </h1>
        <h2 className="text-[17px] font-display font-semibold text-[#5c1616] mb-2 tracking-[0.15em]">
          {DONATION_CONFIG.templeName.toUpperCase()}
        </h2>
        <p className="text-[10px] font-medium opacity-80 mb-6">
          {DONATION_CONFIG.location}
        </p>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center gap-4 mb-8 opacity-70">
          <div className="h-[1px] bg-[#d4af37] w-24"></div>
          <div className="w-1.5 h-1.5 rotate-45 border border-[#d4af37]"></div>
          <div className="h-[1px] bg-[#d4af37] w-24"></div>
        </div>

        <h3 className="text-[19px] font-bold tracking-[0.1em] text-[#5c1616] uppercase mb-1">
          {t.donation.ackTitle}
        </h3>
        
        {/* Verification Status Badge */}
        {acknowledgement.verificationStatus === 'awaiting-committee-verification' ? (
          <div className="inline-block mt-3 bg-[#fff9c4] text-[#855e00] border border-[#d4af37]/60 px-4 py-1.5 rounded-sm text-[9px] font-bold tracking-[0.15em] uppercase">
            {t.donation.statusAwaitingVerification}
          </div>
        ) : (
          <div className="inline-block mt-3 bg-[#f3eae1] text-[#5c1616] border border-[#d4af37]/40 px-4 py-1.5 rounded-sm text-[9px] font-bold tracking-[0.15em] uppercase">
            {t.donation.selfDeclaredAck}
          </div>
        )}
        
        {DONATION_CONFIG.testMode && (
          <div className="mt-5 mx-auto max-w-[80%] flex items-center justify-center gap-2 text-[#5c1616] border border-dashed border-[#5c1616]/40 bg-[#fff5f5] px-4 py-2 text-[9px] font-bold uppercase tracking-wider rounded-sm">
            <ShieldCheck className="w-4 h-4 opacity-70" />
            <span>{t.donation.testAckText} - {t.donation.testAckNotice}</span>
          </div>
        )}
      </div>

      {/* Structured Details Panel */}
      <div className="relative z-10 bg-white border border-[#5c1616]/15 rounded-md mx-4 mb-8">
        
        <div className="grid grid-cols-2">
          
          {/* Row 1 - Donation Reference and Ack No */}
          {acknowledgement.donationReference && (
            <div className="col-span-1 p-5 border-b border-r border-[#5c1616]/10 flex gap-4 bg-[#fcf9f5]">
              <FileText className="w-5 h-5 text-[#5c1616]/40 shrink-0 mt-0.5" strokeWidth={1.5} />
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.08em] text-[#5c1616] mb-1">{t.donation.donationReferenceLabel}</p>
                <p className="font-bold text-[13px] text-[#422a26]">{acknowledgement.donationReference}</p>
              </div>
            </div>
          )}
          
          <div className={`col-span-1 p-5 border-b ${!acknowledgement.donationReference ? 'border-r' : ''} border-[#5c1616]/10 flex gap-4`}>
            <Receipt className="w-5 h-5 text-[#5c1616]/40 shrink-0 mt-0.5" strokeWidth={1.5} />
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.08em] text-[#5c1616]/70 mb-1">{t.donation.ackNumber}</p>
              <p className="font-medium text-[12px] text-[#422a26]">{acknowledgement.acknowledgementNumber}</p>
            </div>
          </div>
          
          {/* Row 2 */}
          <div className={`col-span-1 p-5 border-b border-r border-[#5c1616]/10 flex gap-4 ${!acknowledgement.donationReference ? '' : 'col-span-2'}`}>
            <Calendar className="w-5 h-5 text-[#5c1616]/40 shrink-0 mt-0.5" strokeWidth={1.5} />
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.08em] text-[#5c1616]/70 mb-1">{t.donation.dateText}</p>
              <p className="font-medium text-[12px] text-[#422a26]">{formatDate(acknowledgement.donationDate)}</p>
            </div>
          </div>

          {/* Row 2 */}
          <div className="col-span-1 p-5 border-b border-r border-[#5c1616]/10 flex gap-4">
            <User className="w-5 h-5 text-[#5c1616]/40 shrink-0 mt-0.5" strokeWidth={1.5} />
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.08em] text-[#5c1616]/70 mb-1">{t.donation.devoteeText}</p>
              <p className="font-medium text-[12px] text-[#422a26]">{acknowledgement.donorName || t.donation.notProvided}</p>
            </div>
          </div>

          <div className="col-span-1 p-5 border-b border-[#5c1616]/10 flex gap-4">
            <MapPin className="w-5 h-5 text-[#5c1616]/40 shrink-0 mt-0.5" strokeWidth={1.5} />
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.08em] text-[#5c1616]/70 mb-1">{t.donation.locationText}</p>
              <p className="font-medium text-[12px] text-[#422a26]">{acknowledgement.donorLocation || t.donation.notProvided}</p>
            </div>
          </div>

          {/* Row 3 */}
          <div className="col-span-1 p-5 border-b border-r border-[#5c1616]/10 flex gap-4 items-center">
            <div className="w-5 h-5 shrink-0 flex items-center justify-center border border-[#5c1616]/40 rounded-full text-[#5c1616]/40 text-[10px] font-bold">₹</div>
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.08em] text-[#5c1616]/70 mb-1">{t.donation.amountText}</p>
              <p className="font-bold text-[17px] text-[#5c1616]">₹{acknowledgement.amount.toLocaleString('en-IN')}</p>
            </div>
          </div>

          <div className="col-span-1 p-5 border-b border-[#5c1616]/10 flex gap-4 items-center">
            <CreditCard className="w-5 h-5 text-[#5c1616]/40 shrink-0" strokeWidth={1.5} />
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.08em] text-[#5c1616]/70 mb-1">{t.donation.paymentModeText}</p>
              <p className="font-medium text-[12px] text-[#422a26]">{acknowledgement.paymentMode}</p>
            </div>
          </div>
          
          {/* Row 4 - Full Width */}
          <div className="col-span-2 p-5 border-b border-[#5c1616]/10 flex gap-4 bg-[#fcf9f5]">
            <BookOpen className="w-5 h-5 text-[#5c1616]/40 shrink-0 mt-0.5" strokeWidth={1.5} />
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.08em] text-[#5c1616]/70 mb-1">{t.donation.amountWordsText}</p>
              <p className="font-medium text-[13px] italic text-[#422a26]">{acknowledgement.amountInWords}</p>
            </div>
          </div>

          {/* Row 5 */}
          <div className="col-span-1 p-5 border-r border-[#5c1616]/10 flex gap-4">
            <Landmark className="w-5 h-5 text-[#5c1616]/40 shrink-0 mt-0.5" strokeWidth={1.5} />
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.08em] text-[#5c1616]/70 mb-1">{t.donation.purposeText}</p>
              <p className="font-medium text-[12px] text-[#422a26]">{t.donation.purposes[acknowledgement.purpose as keyof typeof t.donation.purposes] || acknowledgement.purpose}</p>
            </div>
          </div>

          <div className="col-span-1 p-5 flex gap-4">
            <FileText className="w-5 h-5 text-[#5c1616]/40 shrink-0 mt-0.5" strokeWidth={1.5} />
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.08em] text-[#5c1616]/70 mb-1">{t.donation.utrLabel}</p>
              <p className="font-medium text-[12px] text-[#422a26] break-all">{acknowledgement.transactionReference}</p>
            </div>
          </div>

        </div>
      </div>

      {/* Disclaimers & Footer */}
      <div className="mt-auto px-4 relative z-10 flex flex-col gap-6">
        
        {/* Important Disclaimer Panel */}
        <div className="bg-[#fcfaf5] border border-[#d4af37]/30 rounded-md p-5 flex gap-4 items-start">
          <ShieldCheck className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" strokeWidth={1.5} />
          <div>
            <h4 className="text-[10px] font-bold text-[#5c1616] uppercase tracking-[0.05em] mb-1">Important</h4>
            <p className="text-[9px] text-[#422a26]/80 leading-relaxed text-justify">
              {t.donation.whatsappDisclaimer || t.donation.ackDisclaimer}
            </p>
          </div>
        </div>

        {/* Tax Notice */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="text-[#d4af37]/60">✿</span>
            <span className="text-[9px] text-[#5c1616]/80 font-bold uppercase tracking-[0.08em]">
              {t.donation.notTaxClaim}
            </span>
            <span className="text-[#d4af37]/60">✿</span>
          </div>
        </div>

        {/* Footer Greetings */}
        <div className="text-center mt-2 mb-2">
          <p className="font-display text-[#d4af37] text-[18px] mb-2 tracking-wide">🙏 जय माता दी 🙏</p>
          <p className="text-[10px] font-medium text-[#422a26]/70">{t.donation.thankYouClose}</p>
        </div>
      </div>
      
    </div>
  );
};
