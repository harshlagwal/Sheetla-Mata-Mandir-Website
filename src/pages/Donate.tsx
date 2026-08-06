import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SectionHeading } from '../components/common/SectionHeading';
import { DonationAmountSelector } from '../components/donation/DonationAmountSelector';
import { DonationPurposeSelector, DonationPurpose } from '../components/donation/DonationPurposeSelector';
import { DonationPaymentPanel } from '../components/donation/DonationPaymentPanel';
import { DonationProofPanel } from '../components/donation/DonationProofPanel';
import { DonationSecurityNotice } from '../components/donation/DonationSecurityNotice';
import { DonationAcknowledgementModal } from '../components/donation/DonationAcknowledgementModal';
import { generateDonationReference } from '../utils/acknowledgement';
import { Button } from '../components/common/Button';
import { HeartHandshake } from 'lucide-react';

export const Donate: React.FC = () => {
  const { t } = useLanguage();

  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [selectedPurpose, setSelectedPurpose] = useState<DonationPurpose>('general');
  const [showAcknowledgement, setShowAcknowledgement] = useState(false);

  // Phase 4 State
  const [donationReference, setDonationReference] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [utr, setUtr] = useState<string>('');
  const [devoteeName, setDevoteeName] = useState<string>('');

  const parsedCustomAmount = parseFloat(customAmount);
  const activeAmount = selectedAmount !== null ? selectedAmount : (isNaN(parsedCustomAmount) ? null : parsedCustomAmount);

  // Initialize Donation Reference on interaction
  if (activeAmount !== null && activeAmount > 0 && !donationReference) {
    setDonationReference(generateDonationReference());
  }

  const handleStartNewDonation = (newAmount: number | null = null, newCustomAmount: string = '') => {
    const newRef = (newAmount !== null || newCustomAmount !== '') ? generateDonationReference() : '';
    
    setSelectedAmount(newAmount);
    setCustomAmount(newCustomAmount);
    if (newAmount === null && newCustomAmount === '') {
      setSelectedPurpose('general');
    }
    setDonationReference(newRef);
    setCurrentStep(1);
    setUtr('');
    setDevoteeName('');
    setShowAcknowledgement(false);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAmountSelect = (amount: number | null) => {
    if (currentStep === 3) {
      handleStartNewDonation(amount, '');
    } else {
      setSelectedAmount(amount);
      if (amount !== null) {
        setCustomAmount('');
      }
      if (currentStep === 2) {
        setCurrentStep(1);
      }
    }
  };

  const handleCustomAmountChange = (val: string) => {
    if (currentStep === 3) {
      handleStartNewDonation(null, val);
    } else {
      setCustomAmount(val);
      setSelectedAmount(null);
      if (currentStep === 2) {
        setCurrentStep(1);
      }
    }
  };

  return (
    <div className="w-full bg-surface pt-28 pb-20">
      {/* 1. HERO SECTION */}
      <section className="py-16 px-margin-mobile lg:px-margin-desktop bg-surface-container-low border-b border-outline-variant/30 relative overflow-hidden">
        {/* Subtle decorative background pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, var(--color-primary) 2px, transparent 2px)', backgroundSize: '32px 32px' }} />
        
        <div className="max-w-container-max mx-auto relative z-10 flex flex-col items-center text-center">
          <SectionHeading
            tag={t.donation.heroEyebrow}
            title={t.donation.heroTitle}
            subtitle={t.donation.heroText}
          />
        </div>
      </section>

      {/* 2. DONATION CONTENT */}
      <section className="py-12 md:py-20 px-margin-mobile lg:px-margin-desktop relative">
        <div className="max-w-container-max mx-auto">
          
          {/* Voluntary Notice */}
          <div className="max-w-4xl mx-auto mb-12 text-center bg-surface-container/50 border border-outline-variant/30 rounded-2xl p-6 shadow-sm">
            <HeartHandshake className="w-8 h-8 text-secondary mx-auto mb-3" />
            <h2 className="font-display text-xl md:text-2xl font-bold text-primary mb-2">
              {t.donation.voluntaryNotice}
            </h2>
            <p className="font-body text-sm md:text-base text-on-surface-variant font-medium">
              {t.donation.noPaymentForDarshan}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 max-w-5xl mx-auto">
            {/* Left Column: Selection */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="bg-surface-container-lowest p-6 md:p-8 rounded-3xl shadow-sm border border-outline-variant/30 flex-grow">
                <DonationAmountSelector
                  selectedAmount={selectedAmount}
                  onAmountSelect={handleAmountSelect}
                  customAmount={customAmount}
                  onCustomAmountChange={handleCustomAmountChange}
                />
                
                <hr className="border-outline-variant/30 my-8" />
                
                <DonationPurposeSelector
                  selectedPurpose={selectedPurpose}
                  onPurposeSelect={setSelectedPurpose}
                />

                <DonationSecurityNotice />
              </div>
            </div>

            {/* Right Column: Payment / Proof */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              
              {/* Step Indicator */}
              {activeAmount !== null && activeAmount > 0 && donationReference && (
                <div className="flex justify-between items-center mb-2 px-2 text-xs font-bold font-body tracking-wider">
                  <span className={`pb-1 border-b-2 transition-colors ${currentStep >= 1 ? 'text-[#5c1616] border-[#5c1616]' : 'text-on-surface-variant border-transparent opacity-50'}`}>
                    {t.donation.step1Payment}
                  </span>
                  <div className={`flex-grow h-px mx-2 transition-colors ${currentStep >= 2 ? 'bg-[#5c1616]' : 'bg-outline-variant/30'}`} />
                  <span className={`pb-1 border-b-2 transition-colors ${currentStep >= 2 ? 'text-[#5c1616] border-[#5c1616]' : 'text-on-surface-variant border-transparent opacity-50'}`}>
                    {t.donation.step2Proof}
                  </span>
                  <div className={`flex-grow h-px mx-2 transition-colors ${currentStep >= 3 ? 'bg-[#5c1616]' : 'bg-outline-variant/30'}`} />
                  <span className={`pb-1 border-b-2 transition-colors ${currentStep >= 3 ? 'text-[#5c1616] border-[#5c1616]' : 'text-on-surface-variant border-transparent opacity-50'}`}>
                    {t.donation.step3Ack}
                  </span>
                </div>
              )}

              {currentStep === 1 && (
                <>
                  <DonationPaymentPanel
                    amount={activeAmount}
                    purpose={selectedPurpose}
                    donationReference={donationReference}
                  />

                  {activeAmount !== null && activeAmount > 0 && (
                    <div className="mt-4">
                      <Button 
                        variant="ghost"
                        className="w-full justify-center py-3 border-primary/30 hover:bg-primary/5 hover:border-primary/50 text-primary font-semibold"
                        onClick={() => setCurrentStep(2)}
                      >
                        {t.donation.completedPaymentBtn}
                      </Button>
                    </div>
                  )}
                </>
              )}

              {currentStep === 2 && (
                <DonationProofPanel
                  amount={activeAmount}
                  purpose={selectedPurpose}
                  donationReference={donationReference}
                  utr={utr}
                  setUtr={setUtr}
                  devoteeName={devoteeName}
                  setDevoteeName={setDevoteeName}
                  onProofSent={() => {
                    setCurrentStep(3);
                    setShowAcknowledgement(true);
                  }}
                />
              )}
            </div>
          </div>

          <DonationAcknowledgementModal
            isOpen={showAcknowledgement}
            onClose={() => {
              setShowAcknowledgement(false);
              // Option to stay on step 2 or 3, we stay on 3 if closed
            }}
            amount={activeAmount || 0}
            purpose={selectedPurpose}
            onNewDonation={() => handleStartNewDonation(null, '')}
            donationReference={donationReference}
            prefilledUtr={utr}
            prefilledName={devoteeName}
          />

        </div>
      </section>
    </div>
  );
};
