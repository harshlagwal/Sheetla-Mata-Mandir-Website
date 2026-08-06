import React, { useState } from 'react';
import { X } from 'lucide-react';
import { DonationAcknowledgementForm } from './DonationAcknowledgementForm';
import { DonationAcknowledgementPreview } from './DonationAcknowledgementPreview';
import { DonationAcknowledgement } from '../../utils/acknowledgement';
import { DonationPurpose } from './DonationPurposeSelector';

interface DonationAcknowledgementModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  purpose: DonationPurpose;
  donationReference: string;
  prefilledUtr: string;
  prefilledName: string;
  onNewDonation: () => void;
}

export const DonationAcknowledgementModal: React.FC<DonationAcknowledgementModalProps> = ({
  isOpen,
  onClose,
  amount,
  purpose,
  donationReference,
  prefilledUtr,
  prefilledName,
  onNewDonation
}) => {
  const [acknowledgement, setAcknowledgement] = useState<DonationAcknowledgement | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div 
        className={`bg-surface w-full max-w-6xl rounded-3xl shadow-2xl overflow-hidden flex flex-col relative my-auto ${acknowledgement ? 'min-h-[90vh]' : ''}`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 p-2 bg-surface-container hover:bg-surface-container-high rounded-full transition-colors z-10"
        >
          <X className="w-6 h-6 text-on-surface" />
        </button>
        
        <div className="p-4 md:p-8 overflow-y-auto max-h-[90vh]">
          {!acknowledgement || isEditing ? (
              <DonationAcknowledgementForm
                amount={amount}
                purpose={purpose}
                initialData={acknowledgement || undefined}
                prefilledUtr={prefilledUtr}
                prefilledName={prefilledName}
                donationReference={donationReference}
                onGenerate={(ack) => {
                setAcknowledgement(ack);
                setIsEditing(false);
              }}
            />
          ) : (
            <DonationAcknowledgementPreview
              acknowledgement={acknowledgement}
              onEdit={() => setIsEditing(true)}
                onStartNew={() => {
                  setAcknowledgement(null);
                  setIsEditing(false);
                  onNewDonation();
                }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
