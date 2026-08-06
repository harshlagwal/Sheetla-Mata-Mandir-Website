import React, { useRef, useState } from 'react';
import { Download, Printer, Share2, Edit2, PlusCircle, Loader2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { DonationAcknowledgement } from '../../utils/acknowledgement';
import { ReceiptDocument } from './ReceiptDocument';
import { Button } from '../common/Button';

interface DonationAcknowledgementPreviewProps {
  acknowledgement: DonationAcknowledgement;
  onEdit: () => void;
  onStartNew: () => void;
}

export const DonationAcknowledgementPreview: React.FC<DonationAcknowledgementPreviewProps> = ({
  acknowledgement,
  onEdit,
  onStartNew,
}) => {
  const { t } = useLanguage();
  const receiptRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const handleDownloadPdf = async () => {
    if (!receiptRef.current) return;
    setIsGeneratingPdf(true);
    try {
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');

      const canvas = await html2canvas(receiptRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      
      // A4 dimensions in mm: 210 x 297
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
      
      const filename = `Sheetla-Mata-Mandir-Daan-Acknowledgement-${acknowledgement.acknowledgementNumber}.pdf`;
      pdf.save(filename);
    } catch (error) {
      console.error('Error generating PDF', error);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: t.donation.ackTitle,
          text: `${t.donation.ackTitle} - ${acknowledgement.acknowledgementNumber}`,
        });
      } catch (error) {
        // User cancelled or share failed, ignore
      }
    }
  };

  const canShare = typeof navigator !== 'undefined' && !!navigator.share;

  return (
    <div className="w-full flex flex-col lg:flex-row gap-8 bg-surface">
      {/* Left: Actions Panel */}
      <div className="lg:w-1/3 flex flex-col gap-4">
        <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm border border-outline-variant/30 sticky top-24">
          <h3 className="font-display font-bold text-xl text-primary mb-6">
            {t.donation.generateAckTitle}
          </h3>
          
          <div className="flex flex-col gap-3">
            <Button 
              variant="primary" 
              className="w-full justify-center gap-2 py-3"
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
            >
              {isGeneratingPdf ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
              {t.donation.downloadPdf}
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full justify-center gap-2 py-3"
              onClick={handlePrint}
            >
              <Printer className="w-5 h-5" />
              {t.donation.printBtn}
            </Button>
            
            {canShare && (
              <Button 
                variant="ghost" 
                className="w-full justify-center gap-2 py-3"
                onClick={handleShare}
              >
                <Share2 className="w-5 h-5" />
                {t.donation.shareBtn}
              </Button>
            )}

            <hr className="my-4 border-outline-variant/30" />

            <div className="flex gap-3">
              <Button 
                variant="secondary" 
                className="flex-1 justify-center gap-2"
                onClick={onEdit}
              >
                <Edit2 className="w-4 h-4" />
                {t.donation.editDetails}
              </Button>
              
              <Button 
                variant="secondary" 
                className="flex-1 justify-center gap-2"
                onClick={onStartNew}
              >
                <PlusCircle className="w-4 h-4" />
                {t.donation.startNew}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Document Preview */}
      <div className="lg:w-2/3 flex justify-center bg-surface-container/30 p-4 md:p-8 rounded-3xl border border-outline-variant/20 overflow-x-auto print:p-0 print:border-none print:m-0 print:bg-white print:overflow-visible">
        {/* We use a scaling container so the A4 document fits on smaller screens */}
        <div className="origin-top flex justify-center min-w-[210mm] print:min-w-0" 
             style={{ transform: 'scale(var(--receipt-scale, 1))', transformOrigin: 'top center' }}>
          
          <style dangerouslySetInnerHTML={{__html: `
            @media (max-width: 1024px) { .origin-top { --receipt-scale: 0.8; } }
            @media (max-width: 768px) { .origin-top { --receipt-scale: 0.6; } }
            @media (max-width: 480px) { .origin-top { --receipt-scale: 0.45; } }
            @media print {
              body * { visibility: hidden; }
              .print-section, .print-section * { visibility: visible; }
              .print-section { position: absolute; left: 0; top: 0; margin: 0; padding: 0; width: 100%; transform: none !important; }
              @page { size: A4 portrait; margin: 0; }
            }
          `}} />

          <div ref={receiptRef} className="print-section bg-white shadow-xl">
            <ReceiptDocument acknowledgement={acknowledgement} />
          </div>
        </div>
      </div>
    </div>
  );
};
