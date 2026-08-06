export interface AnnouncementItem {
  id: string;
  date: string;
  hindiDate: string;
  title: string;
  hindiTitle: string;
  description: string;
  hindiDescription: string;
  type: 'Festival' | 'Puja' | 'Bhandara' | 'Notice';
}

export const announcementsData: AnnouncementItem[] = [
  {
    id: "a1",
    date: "Upcoming Ritual",
    hindiDate: "आगामी पूजा",
    title: "Special Chaitra Navratri Pujas",
    hindiTitle: "विशेष चैत्र नवरात्रि पूजा",
    description: "Daily morning Chandi Path and Shat Chandi Yajna will be solemnized. All villagers and visiting devotees are cordially invited.",
    hindiDescription: "प्रतिदिन प्रातः चंडी पाठ एवं शत चंडी महायज्ञ संपन्न होगा। समस्त ग्रामवासी एवं श्रद्धालु आमंत्रित हैं।",
    type: "Puja",
  },
  {
    id: "a2",
    date: "Annual Feast",
    hindiDate: "वार्षिक भंडारा",
    title: "Grand Community Bhandara",
    hindiTitle: "विशाल जन भंडारा",
    description: "Maha Prasad distribution starting after 12:00 PM in the mandir courtyard following Kanya Pujan.",
    hindiDescription: "कन्या पूजन के पश्चात दोपहर 12 बजे से मंदिर प्रांगण में महाप्रसाद वितरण।",
    type: "Bhandara",
  },
  {
    id: "a3",
    date: "Mandir Notice",
    hindiDate: "मंदिर सूचना",
    title: "Summer Aarti Timing Update",
    hindiTitle: "ग्रीष्मकालीन आरती समय परिवर्तन",
    description: "Evening Aarti will be solemnized at 7:00 PM instead of 6:30 PM due to extended daylight hours.",
    hindiDescription: "संध्या आरती का समय शाम 6:30 की जगह 7:00 बजे रहेगा।",
    type: "Notice",
  },
];
