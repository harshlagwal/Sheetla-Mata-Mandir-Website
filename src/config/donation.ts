// =====================================================
// OFFICIAL DONATION CONFIGURATION
// Enable donations ONLY after receiving authorized
// Temple / Temple Committee payment details.
//
// Never place UPI PIN, OTP, bank passwords, CVV,
// or other banking credentials here.
// =====================================================

export const DONATION_CONFIG = {
  // Phase 3 & 4 Config
  testMode: false,
  proofSubmissionEnabled: true,
  committeeEmail: 'lagwalharsh1@gmail.com',
  committeeWhatsApp: '',

  // UI Config
  // Set to true only when authorized details are provided (or during test mode)
  enabled: true,

  // Authorized payment details (to be filled by committee)
  beneficiaryName: 'MANAGING COMMITTEE SITTA TAMPLE',
  upiId: 'sittatample8577@ucobank',
  bankName: 'UCO Bank',

  // Temple details
  templeName: 'Sheetla Mata Mandir',
  location: 'Lagdevi, Hamirpur, Himachal Pradesh',

  // Suggested donation amounts (add 1 if in testMode dynamically in components, or handle there)
  suggestedAmounts: [101, 251, 501, 1100],

  // Currency
  currency: 'INR',
};
