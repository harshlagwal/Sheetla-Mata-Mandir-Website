// ─────────────────────────────────────────────────────────────
// src/data/darshanData.ts
//
// Complete authentic collection of Temple Murtis, Shrines,
// Architecture, Celebrations, and Seva for the Darshan Gallery.
// ─────────────────────────────────────────────────────────────

import newSheetlaImg from '../assets/new-sheetla.webp';
import shivjiImg from '../assets/Shivji New.webp';
import hanumanImg from '../assets/Hanuman.webp';
import ramDarbaarImg from '../assets/Shree Ram Darbaar.webp';
import guggaBabaImg from '../assets/Gugga baba.webp';
import mandirBuildingImg from '../assets/Mandir building.webp';
import mandirUnderImg from '../assets/mandir under image.webp';
import lagdeviViewImg from '../assets/lagdevi view.webp';
import bhandaraImg from '../assets/hero bhandare.webp';
import bhavyaJagranImg from '../assets/Bhavya jagran.webp';
import navratriImg from '../assets/Home section sharad navratre.webp';
import melaImg from '../assets/Lagdevir Mela.webp';

export type GalleryCategory = 'all' | 'deities' | 'sanctuary' | 'festivals' | 'seva';

export interface DarshanDeity {
  id: string;
  category: 'deities' | 'sanctuary' | 'festivals' | 'seva';
  name: string;
  hindiName: string;
  subtitle: string;
  hindiSubtitle: string;
  badge?: string;
  hindiBadge?: string;
  image: string;
  aartiTitle: string;
  aarti: string;
  aartiHindi: string;
}

export const galleryCategories: { id: GalleryCategory; label: string; hindiLabel: string; icon: string }[] = [
  { id: 'all', label: 'All Glimpses', hindiLabel: 'समस्त दर्शन', icon: '🌸' },
  { id: 'deities', label: 'Divine Murtis', hindiLabel: 'दिव्य विग्रह', icon: '🔱' },
  { id: 'sanctuary', label: 'Sanctuary & Jyoti', hindiLabel: 'मंदिर परिसर', icon: '🛕' },
  { id: 'festivals', label: 'Celebrations', hindiLabel: 'उत्सव व जागरण', icon: '🪔' },
  { id: 'seva', label: 'Langar Seva', hindiLabel: 'लंगर व भंडारा', icon: '🍲' },
];

export const darshanDeities: DarshanDeity[] = [
  {
    id: 'sheetla-mata',
    category: 'deities',
    name: 'Mata Sheetla Devi',
    hindiName: 'माँ शीतला देवी',
    subtitle: 'Presiding Divine Mother of Healing, Peace & Protection',
    hindiSubtitle: 'आरोग्य, शांति और सर्वकल्याण की अधिष्ठात्री कुलदेवी',
    badge: 'Mata Sheetla Shrine',
    hindiBadge: 'मुख्य गर्भगृह दर्शन',
    image: newSheetlaImg,
    aartiTitle: 'शीतला माता आरती',
    aarti: 'शीतला माता आरती',
    aartiHindi: `जय शीतला माता, मैया जय शीतला माता,
आदि ज्योति महारानी सब फल की दाता। जय शीतला माता...

रतन सिंहासन शोभित, श्वेत छत्र भ्राता,
ऋद्धि-सिद्धि चंवर ढुलावें, जगमग छवि छाता। जय शीतला माता...

विष्णु सेवत ठाढ़े, सेवें शिव धाता,
वेद पुराण बरणत पार नहीं पाता । जय शीतला माता...

इन्द्र मृदंग बजावत चन्द्र वीणा हाथा,
सूरज ताल बजाते नारद मुनि गाता। जय शीतला माता...

घंटा शंख शहनाई बाजै मन भाता,
करै भक्त जन आरति लखि लखि हरहाता। जय शीतला माता...

ब्रह्म रूप वरदानी तुही तीन काल ज्ञाता,
भक्तन को सुख देनौ मातु पिता भ्राता। जय शीतला माता...

जो भी ध्यान लगावें प्रेम भक्ति लाता,
सकल मनोरथ पावे भवनिधि तर जाता। जय शीतला माता...

रोगन से जो पीड़ित कोई शरण तेरी आता,
कोढ़ी पावे निर्मल काया अन्ध नेत्र पाता। जय शीतला माता...

बांझ पुत्र को पावे दारिद कट जाता,
ताको भजै जो नाहीं सिर धुनि पछिताता। जय शीतला माता...

शीतल करती जननी तू ही है जग त्राता,
उत्पत्ति व्याधि विनाशत तू सब की घाता। जय शीतला माता...

दास विचित्र कर जोड़े सुन मेरी माता,
भक्ति आपनी दीजे और न कुछ भाता।

जय शीतला माता...।`,
  },

  {
    id: 'shiv-ji',
    category: 'deities',
    name: 'Lord Shiva',
    hindiName: 'भगवान शिव',
    subtitle: 'Mahadev — The Supreme Destroyer & Transformer',
    hindiSubtitle: 'महादेव — कैलासपति भगवान शिव शंकर',
    badge: 'Shiva Sanctum',
    hindiBadge: 'शिव दरबार',
    image: shivjiImg,
    aartiTitle: 'शिव जी की आरती',
    aarti: 'शिव जी की आरती',
    aartiHindi: `ॐ जय शिव ओंकारा, स्वामी जय शिव ओंकारा।
ब्रह्मा, विष्णु, सदाशिव, अर्द्धांगी धारा॥

ओम जय शिव ओंकारा॥

एकानन चतुरानन पञ्चानन राजे।
हंसासन गरूड़ासन वृषवाहन साजे॥

ओम जय शिव ओंकारा॥

दो भुज चार चतुर्भुज दसभुज अति सोहे।
त्रिगुण रूप निरखत त्रिभुवन जन मोहे॥

ओम जय शिव ओंकारा॥

अक्षमाला वनमाला मुण्डमालाधारी।
त्रिपुरारी कंसारी कर माला धारी॥

ओम जय शिव ओंकारा॥

श्वेताम्बर पीताम्बर बाघंबर अंगे।
सनकादिक गरुड़ादिक भूतादिक संगे॥

ओम जय शिव ओंकारा॥

कर के मध्य कमण्डल चक्र त्रिशूलधारी।
जगकर्ता जगभर्ता जगसंहारकर्ता॥

ओम जय शिव ओंकारा॥

ब्रह्मा विष्णु सदाशिव जानत अविवेका।
प्रणवाक्षर के मध्ये ये तीनों एका॥

ओम जय शिव ओंकारा॥

पर्वत सोहैं पार्वती, शंकर कैलासा।
भांग धतूरे का भोजन, भस्मी में वासा॥

ओम जय शिव ओंकारा॥

जटा में गंग बहत है, गल मुण्डन माला।
शेष नाग लिपटावत, ओढ़त मृगछाला॥

ओम जय शिव ओंकारा॥

काशी में विराजे विश्वनाथ, नन्दी ब्रह्मचारी।
नित उठ दर्शन पावत, महिमा अति भारी॥

ओम जय शिव ओंकारा॥

त्रिगुणस्वामी जी की आरति जो कोइ नर गावे।
कहत शिवानन्द स्वामी, मनवान्छित फल पावे॥

ओम जय शिव ओंकारा॥ स्वामी ओम जय शिव ओंकारा॥`,
  },

  {
    id: 'hanuman-ji',
    category: 'deities',
    name: 'Bajrang Bali',
    hindiName: 'श्री हनुमान जी',
    subtitle: 'Sankat Mochan — Remover of All Obstacles',
    hindiSubtitle: 'संकट मोचन महाबली बजरंगबली जी',
    badge: 'Hanuman Shrine',
    hindiBadge: 'पवनपुत्र हनुमान',
    image: hanumanImg,
    aartiTitle: 'श्री हनुमान जी की आरती',
    aarti: 'श्री हनुमान जी की आरती',
    aartiHindi: `आरती कीजै हनुमान लला की।
दुष्ट दलन रघुनाथ कला की।।

जाके बल से गिरिवर कांपे।
रोग दोष जाके निकट न झांके।।

अंजनि पुत्र महाबलदायी।
संतान के प्रभु सदा सहाई।।

दे बीरा रघुनाथ पठाए।
लंका जारी सिया सुध लाए।।

लंका सो कोट समुद्र सी खाई।
जात पवनसुत बार न लाई।।

लंका जारी असुर संहारे।
सियारामजी के काज संवारे।।

लक्ष्मण मूर्छित पड़े सकारे।
आणि संजीवन प्राण उबारे।।

पैठी पताल तोरि जमकारे।
अहिरावण की भुजा उखाड़े।।

बाएं भुजा असुर दल मारे।
दाहिने भुजा संतजन तारे।।

सुर-नर-मुनि जन आरती उतारे।
जै जै जै हनुमान उचारे।।

कंचन थार कपूर लौ छाई।
आरती करत अंजना माई।।

लंकविध्वंस कीन्ह रघुराई।
तुलसीदास प्रभु कीरति गाई।।

जो हनुमानजी की आरती गावै।
बसी बैकुंठ परमपद पावै।।`,
  },

  {
    id: 'ram-darbaar',
    category: 'deities',
    name: 'Shree Ram Darbaar',
    hindiName: 'श्री राम दरबार',
    subtitle: 'Shri Ram, Mata Sita, Lakshman Ji & Hanuman Ji',
    hindiSubtitle: 'मर्यादा पुरुषोत्तम श्री राम, माता सीता, लक्ष्मण जी एवं हनुमान जी',
    badge: 'Ram Darbaar',
    hindiBadge: 'श्री राम दरबार',
    image: ramDarbaarImg,
    aartiTitle: 'श्री राम आरती',
    aarti: 'श्री राम आरती',
    aartiHindi: `श्री रामचन्द्र कृपालु भजु मन,हरण भवभय दारुणम्।

नव कंज लोचन, कंज मुख करकंज पद कंजारुणम्॥

श्री रामचन्द्र कृपालु भजु मन...॥

कन्दर्प अगणित अमित छवि,नव नील नीरद सुन्दरम्।

पट पीत मानहुं तड़ित रूचि-शुचिनौमि जनक सुतावरम्॥

श्री रामचन्द्र कृपालु भजु मन...॥

भजु दीनबंधु दिनेशदानव दैत्य वंश निकन्दनम्।

रघुनन्द आनन्द कन्द कौशलचन्द्र दशरथ नन्द्नम्॥

श्री रामचन्द्र कृपालु भजु मन...॥

सिर मुकुट कुंडल तिलकचारू उदारु अंग विभूषणम्।

आजानुभुज शर चाप-धर,संग्राम जित खरदूषणम्॥

श्री रामचन्द्र कृपालु भजु मन...॥

इति वदति तुलसीदास,शंकर शेष मुनि मन रंजनम्।

मम हृदय कंज निवास कुरु,कामादि खल दल गंजनम्॥

श्री रामचन्द्र कृपालु भजु मन...॥

मन जाहि राचेऊ मिलहिसो वर सहज सुन्दर सांवरो।

करुणा निधान सुजानशील सनेह जानत रावरो॥

श्री रामचन्द्र कृपालु भजु मन...॥

एहि भाँति गौरी असीससुन सिय हित हिय हरषित अली।

तुलसी भवानिहि पूजी पुनि-पुनिमुदित मन मन्दिर चली॥

श्री रामचन्द्र कृपालु भजु मन...॥`,
  },

  {
    id: 'gugga-devta',
    category: 'deities',
    name: 'Gugga Devta Shrine',
    hindiName: 'गुग्गा जाहरपीर जी',
    subtitle: 'Sacred Protector Deity Associated with Mandir Heritage',
    hindiSubtitle: 'लोक आस्था एवं सुरक्षा के रक्षक देव गुग्गा जाहरपीर',
    badge: 'Folk Lore Shrine',
    hindiBadge: 'गुग्गा जाहरपीर',
    image: guggaBabaImg,
    aartiTitle: 'गुग्गा देवता स्तुति',
    aarti: "The sacred Gugga Devta shrine associated with Sheetla Mata Mandir, Lagdevi, reflecting the temple's longstanding devotional traditions.",
    aartiHindi: `जय गुग्गा जाहरपीर जी महाराज,
सब संकट हरण करो, राखो भक्तन की लाज।
घोड़ा नील असवार, हाथ में भाला सोहे,
दर्शन कर नर-नार, सकल जग मन मोहे।

शीतला माता के पावन सानिध्य में विराजे गुग्गा महाराज की कृपा से सब भक्तों के कष्ट दूर होते हैं।`,
  },

  // ── SANCTUARY & ARCHITECTURE ──
  {
    id: 'mandir-building',
    category: 'sanctuary',
    name: 'Mandir Shikhar & Architecture',
    hindiName: 'भव्य मंदिर शिखर व परिसर',
    subtitle: 'Sacred Hilltop Temple Architecture in Hamirpur',
    hindiSubtitle: 'देवभूमि की पहाड़ियों पर स्थित ऐतिहासिक मंदिर शिखर',
    badge: 'Sanctuary View',
    hindiBadge: 'मंदिर शिखर',
    image: mandirBuildingImg,
    aartiTitle: 'मंदिर शिखर महिमा',
    aarti: "Rising amidst the scenic Hamirpur hills, Sheetla Mata Mandir Lagdevi represents centuries of devotion, architectural serenity, and divine tranquility.",
    aartiHindi: 'सुरम्य पहाड़ियों के मध्य स्थित श्री शीतला माता मंदिर का भव्य शिखर, जो सदियों से आस्था, शांति और आध्यात्मिक ऊर्जा का केंद्र है। मंदिर परिसर में 24×7 सुरक्षा एवं श्रद्धालुओं के लिए सुगम दर्शन की व्यवस्था है।',
  },

  {
    id: 'mandir-akhand-jyoti',
    category: 'sanctuary',
    name: 'Akhand Jyoti & Inner Sanctum',
    hindiName: 'अखंड ज्योति व गर्भगृह',
    subtitle: 'The Eternal Holy Flame Burning Since Ancient Times',
    hindiSubtitle: 'सदियों से प्रज्वलित पावन अखंड ज्योति का आलौकिक स्वरूप',
    badge: 'Eternal Flame',
    hindiBadge: 'अखंड ज्योति',
    image: mandirUnderImg,
    aartiTitle: 'अखंड ज्योति महात्म्य',
    aarti: "The sacred inner sanctum where the eternal flame has illuminated the prayers of generations of devotees, bringing peace, healing, and prosperity.",
    aartiHindi: 'माता के गर्भगृह में जलती अखंड ज्योति साक्षात माँ भगवती के जागृत स्वरूप का प्रमाण है। यहाँ की गई हर सच्ची प्रार्थना निष्फल नहीं जाती।',
  },

  {
    id: 'lagdevi-valley',
    category: 'sanctuary',
    name: 'Scenic Lagdevi Valley',
    hindiName: 'सुरम्य लगदेवी घाटी',
    subtitle: 'Pristine Natural Beauty Surrounding the Mandir',
    hindiSubtitle: 'मंदिर के चारों ओर फैली प्राकृतिक शांति एवं देवभूमि की छटा',
    badge: 'Devbhoomi Nature',
    hindiBadge: 'सुरम्य लगदेवी घाटी',
    image: lagdeviViewImg,
    aartiTitle: 'प्राकृतिक छटा',
    aarti: "Nestled in the lush hills of Himachal Pradesh, Lagdevi offers peace to every traveling pilgrim and nature lover.",
    aartiHindi: 'हिमाचल प्रदेश की शांत वादियों में बसा ग्राम लगदेवी, जहाँ शुद्ध वातावरण, पक्षियों की चहचहाहट और मंदिर की घंटियों की गूँज मन को असीम शांति देती है।',
  },

  // ── FESTIVALS & CELEBRATIONS ──
  {
    id: 'bhavya-jagran',
    category: 'festivals',
    name: 'Bhavya Jagran & Aarti',
    hindiName: 'भव्य माता का जागरण',
    subtitle: 'All-Night Divine Vigil with Devotional Kirtan',
    hindiSubtitle: 'माता की भेंटों व भजनों से गूँजती भक्तिमय रात',
    badge: 'Annual Jagran',
    hindiBadge: 'भव्य जागरण',
    image: bhavyaJagranImg,
    aartiTitle: 'माता की पावन भेंटें',
    aarti: "Devotees gather through the night in communal praise, lighting lamps and singing sacred hymns under the divine gaze of Sheetla Mata.",
    aartiHindi: 'वार्षिक उत्सवों में आयोजित भव्य जागरण, जहाँ हज़ारों श्रद्धालु पूरी रात माता की ज्योति के सम्मुख भजन, कीर्तन और जयकारों से मंदिर प्रांगण को भक्तिमय बनाते हैं।',
  },

  {
    id: 'sharad-navratri',
    category: 'festivals',
    name: 'Sharad Navratri Mahotsav',
    hindiName: 'शारदीय नवरात्र महोत्सव',
    subtitle: 'Nine Days of Grand Rituals, Hawan & Blessings',
    hindiSubtitle: 'नवरात्रों में नौ दिनों का विशेष महापूजन, हवन व अनुष्ठान',
    badge: 'Navratri Utsav',
    hindiBadge: 'नवरात्र महोत्सव',
    image: navratriImg,
    aartiTitle: 'नवरात्र महात्म्य',
    aarti: "During the holy Navratras, the mandir vibrates with Vedic chanting, continuous hawan offerings, and thousands receiving Mata's sacred blessings.",
    aartiHindi: 'चैत्र एवं शारदीय नवरात्रों में मंदिर में विशेष घट-स्थापना, नित्य चंडी पाठ, यज्ञ एवं कन्या पूजन का भव्य आयोजन किया जाता है।',
  },

  {
    id: 'lagdevi-mela',
    category: 'festivals',
    name: 'Annual Lagdevi Mela',
    hindiName: 'पारंपरिक लगदेवी मेला',
    subtitle: 'Vibrant Cultural & Religious Fair of Devbhoomi',
    hindiSubtitle: 'क्षेत्र की समृद्ध सांस्कृतिक विरासत व ऐतिहासिक मेला',
    badge: 'Cultural Fair',
    hindiBadge: 'वार्षिक मेला',
    image: melaImg,
    aartiTitle: 'लगदेवी मेला परंपरा',
    aarti: "A cherished regional tradition where cultural folk music, traditional stalls, and devotion blend into a celebratory pilgrimage.",
    aartiHindi: 'वर्षों पुरानी परंपरा के अनुसार लगने वाला ऐतिहासिक लगदेवी मेला, जहाँ दूर-दराज से ग्रामीण और श्रद्धालु आकर माता का आशीर्वाद लेते हैं और संस्कृति का उत्सव मनाते हैं।',
  },

  // ── COMMUNITY & LANGAR SEVA ──
  {
    id: 'vishal-bhandara',
    category: 'seva',
    name: 'Vishal Bhandara & Langar Seva',
    hindiName: 'विशाल लंगर व भंडारा सेवा',
    subtitle: 'Community Feast Serving Sacred Prasad to All Devotees',
    hindiSubtitle: 'बिना किसी भेदभाव के सभी को शुद्ध सात्विक महाप्रसाद वितरण',
    badge: 'Community Seva',
    hindiBadge: 'महाप्रसाद भंडारा',
    image: bhandaraImg,
    aartiTitle: 'अन्नपूर्णा सेवा',
    aarti: "The temple regularly organizes large-scale Bhandaras, feeding thousands of pilgrims with blessed, freshly prepared sattvic prasadam.",
    aartiHindi: 'माता के दरबार में कोई भूखा नहीं रहता। मंदिर समिति द्वारा नियमित रूप से विशाल भंडारे का आयोजन किया जाता है, जहाँ सभी श्रद्धालु प्रेमपूर्वक प्रसाद ग्रहण करते हैं।',
  },
];
