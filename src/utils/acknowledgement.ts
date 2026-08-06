export interface DonationAcknowledgement {
  acknowledgementNumber: string;
  generatedAt: string; // ISO string
  donationDate: string;
  donorName?: string;
  donorLocation?: string;
  amount: number;
  amountInWords: string;
  purpose: string;
  paymentMode: 'UPI';
  transactionReference: string;
  verificationStatus: 'donor-declared' | 'awaiting-committee-verification';
  proofSubmissionStatus?: 'declared-sent';
  donationReference?: string;
}

export const generateDonationReference = (): string => {
  const date = new Date();
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  
  const array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  const randomPart = array[0].toString(36).substring(0, 6).toUpperCase().padStart(6, '0');

  return `SMM-DN-${yyyy}${mm}${dd}-${randomPart}`;
};

export const generateAcknowledgementNumber = (): string => {
  const date = new Date();
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  
  // Use crypto API for a secure random string
  const array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  const randomPart = array[0].toString(36).substring(0, 6).toUpperCase().padStart(6, '0');

  return `SMM-ACK-${yyyy}${mm}${dd}-${randomPart}`;
};
