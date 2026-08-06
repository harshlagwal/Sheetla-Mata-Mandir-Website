// ─────────────────────────────────────────────────────────────────────────────
// src/data/festivalsData.ts
//
// Real festival data for Sheetla Mata Mandir, Lagdevi.
// Uses actual local assets from src/assets/.
// ─────────────────────────────────────────────────────────────────────────────

import bhagwatGeetaImage from '../assets/Bhagwat geeta.webp';
import jagranImage       from '../assets/Bhavya jagran.webp';

export interface BhandaraTimeslot {
  time: string;
  hindiTime: string;
  label: string;
  hindiLabel: string;
  sublabel: string;
  hindiSublabel: string;
}

export interface FestivalSection {
  id: 'katha' | 'jagran' | 'mela';
  image?: string;        // imported local asset
  eyebrow: string;
  hindiEyebrow: string;
  title: string;
  hindiTitle: string;
  body: string;
  hindiBody: string;
  chips: { label: string; hindiLabel: string }[];
  metadata: { label: string; hindiLabel: string; value: string; hindiValue: string }[];
}

// ─── 1. Sacred Katha / Bhagwat Mahotsav ─────────────────────────────────────
export const kathaSection: FestivalSection = {
  id: 'katha',
  image: bhagwatGeetaImage,
  eyebrow: 'SACRED TRADITION',
  hindiEyebrow: 'पवित्र परंपरा',
  title: 'Sacred Katha & Bhagwat Mahotsav',
  hindiTitle: 'पवित्र कथा एवं भागवत महोत्सव',
  body: `Every year, during the sacred period of Navratri or around Mahashivratri, the village community organizes a grand religious Katha at Sheetla Mata Mandir, Lagdevi.\n\nDepending upon the religious occasion, sacred recitations such as Shrimad Bhagwat Katha, Shiv Puran or Vishnu Puran are organized.\n\nThe programme generally continues for approximately nine sacred days. During the Katha, Himachali Dham / Bhandara is organized every day — Prasad is served around 2:00 PM and traditional Himachali Dham / Bhojan is served around 5:00 PM.\n\nOrganized with the devotion and support of senior villagers and the local community.`,
  hindiBody: `प्रत्येक वर्ष नवरात्रि अथवा महाशिवरात्रि के पावन अवसर के आसपास ग्रामवासियों द्वारा शीतला माता मंदिर, लगदेवी में भव्य धार्मिक कथा का आयोजन किया जाता है।\n\nधार्मिक कार्यक्रम के अनुसार श्रीमद्भागवत कथा, शिव पुराण अथवा विष्णु पुराण जैसी पावन कथाओं का आयोजन होता है।\n\nकार्यक्रम सामान्यतः लगभग नौ पावन दिनों तक चलता है। कथा के दौरान प्रतिदिन भंडारा / हिमाचली धाम का आयोजन होता है — दोपहर लगभग 2:00 बजे प्रसाद वितरण और शाम लगभग 5:00 बजे पारंपरिक हिमाचली धाम / भोजन परोसा जाता है।\n\nगांव के वरिष्ठजनों एवं स्थानीय समुदाय के सहयोग और श्रद्धा से यह आयोजन संपन्न होता है।`,
  chips: [
    { label: '~9 Sacred Days',      hindiLabel: 'लगभग 9 पावन दिन'   },
    { label: 'Daily Bhandara',      hindiLabel: 'प्रतिदिन भंडारा'     },
    { label: 'Prasad at 2:00 PM',   hindiLabel: 'प्रसाद: दोपहर 2 बजे' },
    { label: 'Himachali Dham 5 PM', hindiLabel: 'हिमाचली धाम: 5 बजे' },
  ],
  metadata: [
    { label: 'Duration',  hindiLabel: 'अवधि',    value: 'Approx. 9 Days',            hindiValue: 'लगभग 9 दिन'              },
    { label: 'Occasion',  hindiLabel: 'अवसर',    value: 'Navratri / Mahashivratri',  hindiValue: 'नवरात्रि / महाशिवरात्रि' },
    { label: 'Prasad',    hindiLabel: 'प्रसाद',   value: '2:00 PM Daily',             hindiValue: 'प्रतिदिन दोपहर 2:00 बजे' },
    { label: 'Dham',      hindiLabel: 'धाम',     value: '5:00 PM Daily',             hindiValue: 'प्रतिदिन शाम 5:00 बजे'  },
  ],
};

// ─── 2. Grand Mata Jagran ─────────────────────────────────────────────────────
export const jagranSection: FestivalSection = {
  id: 'jagran',
  image: jagranImage,
  eyebrow: 'DEVOTIONAL NIGHT',
  hindiEyebrow: 'भक्ति संध्या',
  title: 'Grand Mata Jagran & Mata Ki Chowki',
  hindiTitle: 'भव्य माता जागरण एवं माता की चौकी',
  body: `Every year, Sheetla Mata Mandir hosts a grand Mata Jagran / Mata Ki Chowki, bringing devotees together for an evening and night filled with Mata Rani bhajans, devotional music and collective worship.\n\nThe Bhavya Jagran is organized with the active involvement of Yuva Golden Club, the youth committee associated with temple and community activities in Lagdevi.\n\nOver the years, devotional singers and musical groups including Ansla Jagran Party, Sharma Musical Group, and Pammi Thakur have performed during celebrations at the temple.\n\nThe occasion is usually around Navratri, Mahashivratri or another selected auspicious period.`,
  hindiBody: `प्रत्येक वर्ष शीतला माता मंदिर में भव्य माता जागरण एवं माता की चौकी का आयोजन होता है, जिसमें श्रद्धालु माता रानी के भजनों, भक्ति संगीत और सामूहिक उपासना में रात भर सहभागी होते हैं।\n\nभव्य जागरण का आयोजन युवा गोल्डन क्लब द्वारा किया जाता है, जो लगदेवी में मंदिर एवं सामुदायिक गतिविधियों से जुड़ी युवा समिति है।\n\nवर्षों में अंसला जागरण पार्टी, शर्मा म्यूजिकल ग्रुप और पम्मी ठाकुर जैसे भक्ति गायकों और संगीत मंडलियों ने मंदिर के उत्सवों में प्रस्तुतियाँ दी हैं।\n\nयह आयोजन सामान्यतः नवरात्रि, महाशिवरात्रि अथवा किसी अन्य शुभ अवसर पर आयोजित होता है।`,
  chips: [
    { label: 'Annual Celebration',  hindiLabel: 'वार्षिक आयोजन'     },
    { label: 'Yuva Golden Club',    hindiLabel: 'युवा गोल्डन क्लब'   },
    { label: 'Mata Ki Chowki',     hindiLabel: 'माता की चौकी'       },
    { label: 'Devotional Bhajans', hindiLabel: 'भक्ति भजन'          },
  ],
  metadata: [
    { label: 'Event',      hindiLabel: 'आयोजन',    value: 'Bhavya Mata Jagran',              hindiValue: 'भव्य माता जागरण'         },
    { label: 'Organizer',  hindiLabel: 'आयोजक',    value: 'Yuva Golden Club',                hindiValue: 'युवा गोल्डन क्लब'         },
    { label: 'Tradition',  hindiLabel: 'परंपरा',   value: 'Mata Rani Bhajans • Mata Ki Chowki', hindiValue: 'माता रानी भजन • माता की चौकी' },
  ],
};

// ─── 3. Annual Mela — 22 May ──────────────────────────────────────────────────
export const melaSection: FestivalSection = {
  id: 'mela',
  eyebrow: 'ANNUAL VILLAGE TRADITION',
  hindiEyebrow: 'वार्षिक ग्राम परंपरा',
  title: 'Annual Lagdevi Mata Mela',
  hindiTitle: 'वार्षिक लगदेवी माता मेला',
  body: `Every year on 22 May, a traditional one-day village fair is organized at Lagdevi Mata Mandir.\n\nThe mela brings together devotees, villagers, families and visitors for a celebration of faith, local tradition and Himachali community culture.\n\nThe celebration generally takes place from approximately 2:00 PM to 8:00 PM.\n\nOne of the major attractions of the mela is the traditional Kushti competition (Dangal), where wrestlers participate in competitive bouts and winners receive prizes and rewards.`,
  hindiBody: `प्रत्येक वर्ष 22 मई को लगदेवी माता मंदिर में पारंपरिक एक दिवसीय ग्राम मेले का आयोजन किया जाता है।\n\nमेले में श्रद्धालु, ग्रामवासी, परिवार और दूर-दूर से आए अतिथि आस्था, परंपरा और हिमाचली सामुदायिक संस्कृति के उत्सव में सम्मिलित होते हैं।\n\nयह उत्सव सामान्यतः दोपहर लगभग 2:00 बजे से शाम 8:00 बजे तक आयोजित होता है।\n\nमेले का प्रमुख आकर्षण पारंपरिक कुश्ती प्रतियोगिता (दंगल) है, जिसमें पहलवान विभिन्न मुकाबलों में भाग लेते हैं और विजेताओं को पुरस्कार एवं सम्मान प्रदान किया जाता है।`,
  chips: [
    { label: '22 May — Every Year',       hindiLabel: '22 मई — प्रत्येक वर्ष'  },
    { label: '2:00 PM – 8:00 PM',         hindiLabel: 'दोपहर 2 – शाम 8 बजे'   },
    { label: 'Kushti / Dangal',           hindiLabel: 'कुश्ती / दंगल'           },
    { label: 'Annual Tradition',          hindiLabel: 'वार्षिक परंपरा'           },
  ],
  metadata: [
    { label: 'Date',       hindiLabel: 'तिथि',       value: '22 May — Every Year',  hindiValue: '22 मई — प्रत्येक वर्ष'        },
    { label: 'Timings',    hindiLabel: 'समय',        value: '2:00 PM – 8:00 PM',    hindiValue: 'दोपहर 2:00 – शाम 8:00 बजे'   },
    { label: 'Highlight',  hindiLabel: 'आकर्षण',     value: 'Traditional Kushti / Dangal', hindiValue: 'पारंपरिक कुश्ती / दंगल' },
    { label: 'Location',   hindiLabel: 'स्थान',      value: 'Lagdevi Mata Mandir',  hindiValue: 'लगदेवी माता मंदिर'           },
  ],
};

// ─── Bhandara daily timeslots ─────────────────────────────────────────────────
export const bhandaraTimeslots: BhandaraTimeslot[] = [
  {
    time: '2:00 PM',
    hindiTime: 'दोपहर 2:00 बजे',
    label: 'Prasad Distribution',
    hindiLabel: 'प्रसाद वितरण',
    sublabel: 'Devotees receive blessed prasad at the temple.',
    hindiSublabel: 'श्रद्धालुओं को मंदिर में प्रसाद वितरित किया जाता है।',
  },
  {
    time: '5:00 PM',
    hindiTime: 'शाम 5:00 बजे',
    label: 'Himachali Dham',
    hindiLabel: 'हिमाचली धाम',
    sublabel: 'Traditional community meal served to all.',
    hindiSublabel: 'सभी श्रद्धालुओं को पारंपरिक सामूहिक भोजन।',
  },
];
