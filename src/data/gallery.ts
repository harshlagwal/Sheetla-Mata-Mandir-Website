import guggaBabaImg from '../assets/Gugga baba.webp';

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  hindiTitle: string;
  category: 'mandir' | 'festivals' | 'village' | 'community';
  caption: string;
  hindiCaption: string;
}

export const galleryImages: GalleryImage[] = [
  {
    id: "g1",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVNDxtrGt8ZMlDwxkXsJQbBXveDoE5vPLDDEJwk6sYN6c-Xi79jbueQyKDGtM-kQtdZkHm2MH_Z5sJjIaM0F_0Dt4T0AOcqJukIzeshPyxpk109hkV8sdgyPQ9-RmWnYQOY8OutS6wqUCpGlnNXh4vhN19_6nnuz-UMKQeL_256zi1WLeNcYKekF_uTnJIxT3fIneFkUMTa0mMUxNctN480Z6ZCbYw6J8QGHx68qpYObN27u7hYq2J5JN0gnNdn0RqjTMzMVmX-DM",
    title: "Sheetla Mata Mandir Panoramic View",
    hindiTitle: "शीतला माता मंदिर का विहंगम दृश्य",
    category: "mandir",
    caption: "The majestic temple complex in Village Lagdevi amidst mist-shrouded Himalayan peaks at morning sunrise.",
    hindiCaption: "प्रातःकालीन सूर्योदय में हिमालय की पहाड़ियों के बीच ग्राम लगदेवी का भव्य मंदिर परिसर।",
  },
  {
    id: "g2",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDAF8ocL0fAhRBI4zpJQXUr75abaqPp4LzWUXY0CmSd1Jy_N-kKUVdNrp14CBQRYUWyuWcuxT47kiEKDqw_g6EXpvIhKEk34hOkGYECbLD_ECKGKkuEdyU8i99_VUWb4si12NHguFPWjlZfXfn_hKqlg9DhUmxIcRUXPThnrz6l2q8AZYRTk-O8ZYpL9pHATfRWXkF-5yCwN4XOBTFFIp9jLZDSjYQwf5cXg0EXPrHjVcvHJAJ5m31d7_YU9wcGDZ2Ot9H9MRji8KA",
    title: "Traditional Wood Carvings",
    hindiTitle: "पारंपरिक हिमाचली काष्ठ कला",
    category: "mandir",
    caption: "Intricate cedar wood carvings on the sacred temple doorways handcrafted by ancestral craftsmen.",
    hindiCaption: "मंदिर के द्वार पर देवदार की लकड़ी पर उकेरी गई सूक्ष्म धार्मिक नक्काशी।",
  },
  {
    id: "g3",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDYz7x97HRfLGQveu48v2R_FMBwQHoc-tCSky5BHBbCk4D00nh8xGLmhBd-7831IM-cvTIiQ9vGvL-Kdyey2BDjB8M5RnrX5mERKAQqtrqN9bvRPEe42z_Sihhjt87ilaubWOsk116AxI1Q5XD6gGYjCBOBNypLEvN4_xn4NER_3kSaYbqKaH_DCbhNCg1NvQNwgSRniGxUpgAVa2bYkL0OHn2C_BMg0R0cK3ktrLaHSXUHgdrsjshn_9dEdvQAGvZ6PCN57U8QcY4",
    title: "Sunset Over Lagdevi Valley",
    hindiTitle: "लगदेवी घाटी का संध्या दृश्य",
    category: "village",
    caption: "Golden twilight over pine forests and mountain slopes surrounding the holy temple courtyard.",
    hindiCaption: "मंदिर प्रांगण से देवदार के वनों और हिमाचली पहाड़ियों पर संध्या का स्वर्णिम दृश्य।",
  },
  {
    id: "g4",
    url: "https://images.unsplash.com/photo-1627894483216-2138af692e32?q=80&w=1200&auto=format&fit=crop",
    title: "Navratri Celebration Decorations",
    hindiTitle: "नवरात्रि उत्सव श्रृंगार",
    category: "festivals",
    caption: "Vibrant flower garlands and saffron flags welcoming pilgrims during Navratri.",
    hindiCaption: "नवरात्रि में मंदिर का भव्य पुष्प श्रृंगार और भगवा ध्वज।",
  },
  {
    id: "g5",
    url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop",
    title: "Terraced Fields of Lagdevi",
    hindiTitle: "लगदेवी गाँव के सीढ़ीदार खेत",
    category: "village",
    caption: "Lush green agricultural terraces reflecting serene Himachali village life.",
    hindiCaption: "लगदेवी गाँव के हरे-भरे सीढ़ीदार खेत और शुद्ध पहाड़ी वातावरण।",
  },
  {
    id: "g6",
    url: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1200&auto=format&fit=crop",
    title: "Community Bhandara Feast",
    hindiTitle: "सामूहिक भंडारा एवं महाप्रसाद",
    category: "community",
    caption: "Devotees partaking in traditional community meals during auspicious mandir celebrations.",
    hindiCaption: "मंदिर उत्सव के दौरान पंक्तिबद्ध होकर महाप्रसाद ग्रहण करते श्रद्धालु।",
  },
  {
    id: "g7",
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
    title: "Sacred Temple Pathway & Pine Ridge",
    hindiTitle: "पवित्र मंदिर मार्ग एवं देवदार मार्ग",
    category: "mandir",
    caption: "Peaceful stone pathways leading pilgrims through serene pine forests toward the mandir.",
    hindiCaption: "देवदार के जंगलों से होकर मंदिर की ओर जाने वाला शांत पथ।",
  },
  {
    id: "g8",
    url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop",
    title: "Morning Mist Over Himachali Slopes",
    hindiTitle: "हिमाचली वादियों में प्रातःकालीन कुहासा",
    category: "village",
    caption: "Soft morning mist hovering over the peaceful hills and rooftops of Lagdevi village.",
    hindiCaption: "लगदेवी गाँव की पहाड़ियों और स्लेट छतों पर प्रातःकालीन शांत धुंध.",
  },
  {
    id: "g9",
    url: guggaBabaImg,
    title: "Gugga Devta Shrine",
    hindiTitle: "गुग्गा देवता मंदिर",
    category: "mandir",
    caption: "The sacred Gugga Devta shrine associated with Sheetla Mata Mandir, Lagdevi, reflecting the temple's longstanding devotional traditions.",
    hindiCaption: "शीतला माता मंदिर, लगदेवी से जुड़ा पवित्र गुग्गा देवता देवस्थल, जो मंदिर की प्राचीन धार्मिक एवं लोक-आस्था परंपरा का हिस्सा है।",
  },
];

