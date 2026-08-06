import { DONATION_CONFIG } from '../config/donation';

/**
 * Safely generates a UPI Intent URI based on the configured beneficiary and UPI ID.
 * @param amount The donation amount in INR
 * @param purpose Optional purpose string
 * @param donationReference The unique donation reference
 * @returns The UPI URI string, or an empty string if configuration is missing/disabled
 */
export const generateUpiUri = (amount: number, purpose?: string, donationReference?: string): string => {
  if (!DONATION_CONFIG.enabled || !DONATION_CONFIG.upiId) {
    return '';
  }

  const baseUrl = 'upi://pay';
  const params = new URLSearchParams();

  params.append('pa', DONATION_CONFIG.upiId);
  if (DONATION_CONFIG.beneficiaryName) {
    params.append('pn', DONATION_CONFIG.beneficiaryName);
  }
  params.append('am', amount.toFixed(2));
  params.append('cu', DONATION_CONFIG.currency);
  
  const purposeText = purpose ? purpose : 'Temple Donation';
  
  if (donationReference) {
    params.append('tn', `${donationReference} | ${purposeText}`);
  } else {
    params.append('tn', purposeText);
  }

  return `${baseUrl}?${params.toString()}`;
};
