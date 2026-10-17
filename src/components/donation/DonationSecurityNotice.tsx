import React from 'react';
import { ShieldCheck, Lock, FileCheck2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const DonationSecurityNotice: React.FC = () => {
  const { isHindi } = useLanguage();

  const trustPoints = [
    {
      icon: ShieldCheck,
      title: isHindi ? '100% आधिकारिक खाता' : '100% Official Account',
      desc: isHindi 
        ? 'समस्त दान राशि सीधे मंदिर प्रबंधकारिणी समिति के UCO बैंक खाते में जाती है।'
        : 'Direct settlement to Managing Committee bank account with zero middleman.',
    },
    {
      icon: Lock,
      title: isHindi ? 'पूर्णतः सुरक्षित' : 'Safe & Secure',
      desc: isHindi
        ? 'यह वेबसाइट कभी भी आपका UPI PIN, पासवर्ड या बैंक विवरण नहीं मांगती।'
        : 'Never share your UPI PIN or banking passwords anywhere on web pages.',
    },
    {
      icon: FileCheck2,
      title: isHindi ? 'त्वरित पावन रसीद' : 'Instant Holy Receipt',
      desc: isHindi
        ? 'दान के पश्चात मंदिर की डिजिटल दान पर्ची तुरंत डाउनलोड करें।'
        : 'Get official downloadable digital donation receipt with temple seal.',
    },
  ];

  return (
    <div className="mt-8 p-5 bg-[#fcf9f5] border border-[#d4af37]/35 rounded-2xl shadow-xs">
      <div className="text-xs font-bold text-[#5c1616] uppercase tracking-wider mb-3 flex items-center gap-1.5">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span>{isHindi ? 'सुरक्षा एवं पारदर्शिता प्रतिज्ञा' : 'Security & Transparency Pledge'}</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {trustPoints.map(({ icon: Icon, title, desc }, index) => (
          <div key={index} className="flex flex-col items-start gap-1 p-2.5 rounded-xl bg-white/70 border border-outline-variant/30">
            <div className="flex items-center gap-1.5 font-bold text-xs text-on-surface">
              <Icon className="w-3.5 h-3.5 text-[#5c1616]" />
              <span>{title}</span>
            </div>
            <p className="text-[11px] text-on-surface-variant/80 leading-relaxed">
              {desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
