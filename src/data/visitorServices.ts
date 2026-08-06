export interface ServiceItem {
  id: string;
  name: string;
  hindiName: string;
  type: string;
  hindiType: string;
  description: string;
  hindiDescription: string;
  iconType: 'hospital' | 'pharmacy' | 'ambulance' | 'atm' | 'stay' | 'police';
  destinationUrl?: string;
  callButtons?: { label: string; hindiLabel: string; number: string; primary?: boolean }[];
  note?: string;
  hindiNote?: string;
  isEmergencyCard?: boolean;
}

export interface ServiceCategory {
  id: string;
  title: string;
  hindiTitle: string;
  chipLabel: string;
  hindiChipLabel: string;
  chipIcon: string;
  items: ServiceItem[];
}

export const visitorServicesData: ServiceCategory[] = [
  {
    id: "medical-services",
    title: "Medical & Health Assistance",
    hindiTitle: "चिकित्सा एवं स्वास्थ्य सहायता",
    chipLabel: "Medical Help",
    hindiChipLabel: "चिकित्सा सहायता",
    chipIcon: "🏥",
    items: [
      {
        id: "ayurvedic-hospital-kadhiyar",
        name: "Government Ayurvedic Hospital, Kadhiyar",
        hindiName: "राजकीय आयुर्वेदिक अस्पताल, कढ़ियार",
        type: "Government Health Facility",
        hindiType: "राजकीय स्वास्थ्य सुविधा",
        description: "A nearby government Ayurvedic health facility at Kadhiyar for visitors requiring medical assistance.",
        hindiDescription: "चिकित्सा सहायता की आवश्यकता होने पर कढ़ियार स्थित नज़दीकी राजकीय आयुर्वेदिक स्वास्थ्य सुविधा।",
        iconType: "hospital",
        destinationUrl: "https://www.google.com/maps/dir/?api=1&destination=31.761218835320367,76.59723342909919"
      },
      {
        id: "medical-store-kadhiyar",
        name: "Medical Store — Kadhiyar",
        hindiName: "मेडिकल स्टोर — कढ़ियार",
        type: "Medicine / Pharmacy Assistance",
        hindiType: "दवा एवं औषधि सेवा",
        description: "A nearby medical store at Kadhiyar for medicines and basic medical requirements.",
        hindiDescription: "दवाइयों एवं सामान्य चिकित्सा आवश्यकताओं के लिए कढ़ियार में नज़दीकी मेडिकल स्टोर।",
        iconType: "pharmacy",
        destinationUrl: "https://www.google.com/maps/dir/?api=1&destination=31.761090365345577,76.59700318644809"
      },
      {
        id: "government-hospital-uhal",
        name: "Government Hospital / Health Facility — Uhal",
        hindiName: "सरकारी अस्पताल / स्वास्थ्य सुविधा — उहल",
        type: "Government Health Facility",
        hindiType: "राजकीय स्वास्थ्य सुविधा",
        description: "An additional government health facility available towards Uhal for visitors requiring medical assistance.",
        hindiDescription: "चिकित्सा सहायता की आवश्यकता होने पर उहल की ओर उपलब्ध अतिरिक्त सरकारी स्वास्थ्य सुविधा।",
        iconType: "hospital",
        destinationUrl: "https://www.google.com/maps/dir/?api=1&destination=31.757557253780448,76.61032469109263"
      }
    ]
  },
  {
    id: "emergency-services",
    title: "Emergency Assistance",
    hindiTitle: "आपातकालीन सहायता",
    chipLabel: "Emergency",
    hindiChipLabel: "आपातकाल",
    chipIcon: "🚑",
    items: [
      {
        id: "emergency-ambulance",
        name: "Ambulance & Emergency Response",
        hindiName: "एम्बुलेंस एवं आपातकालीन सहायता",
        type: "National Emergency Helpline",
        hindiType: "राष्ट्रीय आपातकालीन हेल्पलाइन",
        description: "In a serious medical or safety emergency, contact emergency services immediately.",
        hindiDescription: "गंभीर चिकित्सा या सुरक्षा संबंधी आपातस्थिति में तुरंत आपातकालीन सेवा से संपर्क करें।",
        iconType: "ambulance",
        isEmergencyCard: true,
        callButtons: [
          { label: "Call Ambulance — 108", hindiLabel: "Call 108 (एम्बुलेंस)", number: "108", primary: true },
          { label: "Call Emergency — 112", hindiLabel: "Call 112 (आपातकाल)", number: "112", primary: true }
        ]
      }
    ]
  },
  {
    id: "atm-services",
    title: "ATM & Banking",
    hindiTitle: "एटीएम एवं बैंकिंग",
    chipLabel: "ATM & Cash",
    hindiChipLabel: "एटीएम एवं नकद",
    chipIcon: "🏧",
    items: [
      {
        id: "uco-bank-atm-uhal",
        name: "UCO Bank ATM — Uhal",
        hindiName: "यूको बैंक एटीएम — उहल",
        type: "ATM / Cash Withdrawal",
        hindiType: "एटीएम / नकद निकासी",
        description: "For visitors who need to withdraw cash, a UCO Bank ATM is available at Uhal.",
        hindiDescription: "नकद राशि की आवश्यकता होने पर श्रद्धालुओं के लिए उहल में UCO Bank ATM उपलब्ध है।",
        iconType: "atm",
        destinationUrl: "https://www.google.com/maps/dir/?api=1&destination=31.75642686213751,76.60983723635212",
        note: "ATM service and cash availability may vary.",
        hindiNote: "एटीएम सेवा एवं नकद उपलब्धता में परिवर्तन हो सकता है।"
      }
    ]
  },
  {
    id: "stay-services",
    title: "Nearby Stay",
    hindiTitle: "नज़दीकी ठहरने की सुविधा",
    chipLabel: "Nearby Stay",
    hindiChipLabel: "ठहरने की जगह",
    chipIcon: "🛏",
    items: [
      {
        id: "lagwal-marriage-palace-uhal",
        name: "Lagwal Marriage Palace — Uhal",
        hindiName: "लगवाल मैरिज पैलेस — उहल",
        type: "Nearby Stay / Venue Reference",
        hindiType: "नज़दीकी ठहरने का संदर्भ",
        description: "A nearby venue at Uhal that visitors may contact or check for suitable stay-related arrangements when required.",
        hindiDescription: "आवश्यकता पड़ने पर ठहरने या संबंधित व्यवस्था की जानकारी के लिए उहल स्थित नज़दीकी स्थल।",
        iconType: "stay",
        destinationUrl: "https://www.google.com/maps/dir/?api=1&destination=31.753225075867924,76.60938059675532",
        note: "Please confirm stay availability directly before planning accommodation.",
        hindiNote: "ठहरने की योजना बनाने से पहले उपलब्धता की पुष्टि अवश्य करें।"
      }
    ]
  },
  {
    id: "police-services",
    title: "Police Assistance",
    hindiTitle: "पुलिस सहायता",
    chipLabel: "Police",
    hindiChipLabel: "पुलिस सहायता",
    chipIcon: "👮",
    items: [
      {
        id: "police-assistance-tauni-devi",
        name: "Police Assistance — Tauni Devi",
        hindiName: "पुलिस सहायता — टौणी देवी",
        type: "Police Station Area (~8 km)",
        hindiType: "पुलिस स्टेशन क्षेत्र (लगभग 8 किमी)",
        description: "For police assistance, the nearest relevant assistance is towards Tauni Devi.",
        hindiDescription: "पुलिस सहायता की आवश्यकता होने पर टौणी देवी की ओर नज़दीकी सहायता उपलब्ध है।",
        iconType: "police",
        callButtons: [
          { label: "Call 112", hindiLabel: "Call 112 (पुलिस सहायता)", number: "112", primary: false }
        ]
      }
    ]
  }
];
