import navratriImg from '../assets/Home section sharad navratre.webp';
import bhandaraImg from '../assets/hero bhandare.webp';
import jagranImg from '../assets/Home mata jagran.webp';

export interface EventItem {
  id: string;
  title: string;
  hindiTitle: string;
  date: string;
  hindiDate: string;
  description: string;
  hindiDescription: string;
  image: string;
  status: 'upcoming' | 'annual' | 'completed';
  category: string;
}

export const eventsData: EventItem[] = [
  {
    id: "navratri-2026",
    title: "Sharad Navratri Mahotsav",
    hindiTitle: "शरद नवरात्रि महोत्सव",
    date: "Annual Sacred Celebration",
    hindiDate: "वार्षिक पावन नवरात्रि उत्सव",
    description: "Nine holy days of special Pujas, Akhand Jyoti, evening Bhajan Sandhya, and divine Mata Rani Darshan.",
    hindiDescription: "विशेष पूजा, अखंड ज्योति, संध्या भजन संध्या एवं माता रानी के अलौकिक दर्शन के नौ पवित्र दिन।",
    image: navratriImg,
    status: "upcoming",
    category: "Festival",
  },
  {
    id: "annual-bhandara",
    title: "Maha Bhandara & Kanya Pujan",
    hindiTitle: "महा भंडारा एवं कन्या पूजन",
    date: "Community Prasad Feast",
    hindiDate: "सामूहिक महाप्रसाद वितरण",
    description: "Community feast offering pure Himachali Dham prasad to all devotees and villagers of Lagdevi.",
    hindiDescription: "ग्राम लगदेवी के समस्त श्रद्धालुओं और ग्रामीणों को पारंपरिक हिमाचली धाम महाप्रसाद अर्पण।",
    image: bhandaraImg,
    status: "annual",
    category: "Bhandara",
  },
  {
    id: "jagran-night",
    title: "Mata Ki Chauki & Devotional Jagran",
    hindiTitle: "माता की चौकी एवं दिव्य जागरण",
    date: "Holy Night Devotion",
    hindiDate: "रात भर भक्ति एवं संकीर्तन",
    description: "Night-long devotional singing, Himachali folk bhajans, and Aarti worshipping Mata Sheetla Devi.",
    hindiDescription: "रात्रि कालीन भजन, हिमाचली लोक भजन एवं माँ शीतला देवी की विशेष आरती।",
    image: jagranImg,
    status: "upcoming",
    category: "Jagran",
  },
];
