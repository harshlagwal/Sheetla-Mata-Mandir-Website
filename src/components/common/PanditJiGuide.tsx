import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, ChevronUp } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useLenis } from 'lenis/react';

interface GuideDialogue {
  topicHi: string;
  topicEn: string;
  hinglish: string;
}

export const PanditJiGuide: React.FC = () => {
  const { pathname } = useLocation();
  const { isHindi } = useLanguage();

  // 'meditating' (eyes closed, continuous Om chant) vs 'explaining' (eyes open, speaking in Hinglish)
  const [mode, setMode] = useState<'meditating' | 'explaining'>('meditating');
  const [dialogue, setDialogue] = useState<GuideDialogue>({
    topicHi: 'पावन दर्शन',
    topicEn: 'Sacred Darshan',
    hinglish: 'Mata Rani ke paavan darbar me aapka hardik swagat hai beta! Jai Mata Di 🙏',
  });
  const [isBlessing, setIsBlessing] = useState(false);

  const lastScrollY = useRef(window.scrollY);
  const autoRevertTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Keep route changes scrolling smoothly to top and preset relevant dialogue
  useEffect(() => {
    window.scrollTo(0, 0);
    setMode('meditating');

    if (pathname.includes('/privacy-policy')) {
      setDialogue({
        topicHi: 'गोपनीयता नीति',
        topicEn: 'Privacy Policy',
        hinglish: 'Privacy Policy me mandir trust aapke daan aur personal details ko 100% surakshit rakhta hai beta, nishchint rahiye!',
      });
    } else if (pathname.includes('/terms-of-service')) {
      setDialogue({
        topicHi: 'सेवा की शर्तें',
        topicEn: 'Terms of Service',
        hinglish: 'Ye mandir website ke niyam hain beta, taaki sabhi bhakt maryada aur pavitrata ke sath darshan ka labh le sakein.',
      });
    } else if (pathname.includes('/donate')) {
      setDialogue({
        topicHi: 'धर्म सेवा व दान',
        topicEn: 'Devotional Seva & Daan',
        hinglish: 'Mandir nirman aur nitya bhandare ke liye daan dena maha-punya hai! Yahan aap QR code se sahyog karke instant pavitra receipt le sakte hain.',
      });
    } else if (pathname.includes('/festivals')) {
      setDialogue({
        topicHi: 'मेले व पावन उत्सव',
        topicEn: 'Festivals & Melas',
        hinglish: 'Lagdevi mela aur Navratri yahan ke aitihasik tyohar hain! Hazaaron bhakt dur-dur se Mata ka aashirwad lene aate hain.',
      });
    } else if (pathname.includes('/village')) {
      setDialogue({
        topicHi: 'पवित्र लगदेवी गाँव',
        topicEn: 'Village Lagdevi Heritage',
        hinglish: 'Lagdevi gaon Hamirpur ki pahaadiyon aur cheed ke pedon ke beech basa ek shant, pavitra aur swarg jaisa gaon hai beta.',
      });
    } else if (pathname.includes('/mata-sheetla')) {
      setDialogue({
        topicHi: 'माता का पावन इतिहास',
        topicEn: 'Sacred Temple History',
        hinglish: 'Shri Sheetla Mata hamari kuldevi hain jo sheetalta aur arogya pradan karti hain. Inka itihas sadiyon purana aur chamatkari hai.',
      });
    } else if (pathname.includes('/about')) {
      setDialogue({
        topicHi: 'मंदिर का पावन इतिहास',
        topicEn: 'Sacred Temple History',
        hinglish: 'Ye mandir sadiyon purana aur chamatkari hai beta! Lagdevi ke bujurgon ke anusar Mata yahan swayam prakat hui theen.',
      });
    } else if (pathname.includes('/gallery')) {
      setDialogue({
        topicHi: 'मंदिर पावन दर्शन',
        topicEn: 'Sacred Photo Gallery',
        hinglish: 'Mata Rani ke aloukik darshan aur mandir parisar ki sundar tasveerein dekhiye. Ghar baithe darshan ka punya kamaiye!',
      });
    } else if (pathname.includes('/visit')) {
      setDialogue({
        topicHi: 'यात्री सुविधाएं व नियम',
        topicEn: 'Visitor Guidelines & Care',
        hinglish: 'Yathriyon ke liye nishulk vahan parking, joota-ghar aur shuddh peyajal ki suvidha hai. Parisar me shanti banaye rakhein.',
      });
    } else if (pathname.includes('/contact')) {
      setDialogue({
        topicHi: 'मंदिर का सुगम मार्ग (8 किमी)',
        topicEn: 'Temple Route & Directions (8 KM)',
        hinglish: 'Tauni Devi se matra 8 km door hai Lagdevi mandir. Paved pakki sadak seedhe mandir dwar tak aati hai.',
      });
    }
  }, [pathname]);

  // Helper to transition back to meditation
  const backToMeditation = useCallback(() => {
    if (autoRevertTimer.current) {
      clearTimeout(autoRevertTimer.current);
    }
    setMode('meditating');
  }, []);

  const lenis = useLenis();

  // Lenis smooth scroll listener: instantly return to meditation on scroll
  useLenis((lenisInstance) => {
    const currentScrollY = lenisInstance.scroll;
    const delta = Math.abs(currentScrollY - lastScrollY.current);
    if (delta > 8 && mode === 'explaining') {
      backToMeditation();
    }
    lastScrollY.current = currentScrollY;
  });

  // Native scroll fallback
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const delta = Math.abs(currentScrollY - lastScrollY.current);

          // If scrolled while in explaining mode, return to meditation
          if (delta > 8 && mode === 'explaining') {
            backToMeditation();
          }

          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mode, backToMeditation]);

  // Precision Context Matcher: Identifies EXACT card or word clicked (never bleeds to entire section)
  const getContextualDialogue = (element: HTMLElement): GuideDialogue | null => {
    // 1. Target the specific clicked element or its closest small card/button (NOT full sections)
    const cardEl = element.closest('button, a, [role="button"], li, tr, h1, h2, h3, h4, p, [data-card], span, td') || element;
    
    // Extract concise, targeted text snippet (limited to clicked item)
    const directText = (element.innerText || '').trim().toLowerCase();
    const cardText = (cardEl !== element ? (cardEl as HTMLElement).innerText || '' : '').trim().toLowerCase();
    const ariaText = (element.getAttribute('aria-label') || cardEl?.getAttribute('aria-label') || '').toLowerCase();
    const hrefText = (element.getAttribute('href') || cardEl?.getAttribute('href') || '').toLowerCase();

    const text = (directText + ' ' + cardText + ' ' + ariaText + ' ' + hrefText).slice(0, 350);

    // ── 1. UPI ID Copy & Online Daan ──
    if (text.includes('sittatample') || text.includes('8577') || text.includes('copy upi') || text.includes('upi id') || text.includes('कॉपी करें') || text.includes('copied') || text.includes('gpay') || text.includes('phonepe') || text.includes('paytm') || text.includes('pay to upi')) {
      return {
        topicHi: 'UPI ID कॉपी व दान',
        topicEn: 'Copy UPI ID & Donate',
        hinglish: "Official UPI ID 'sittatample8577@ucobank' ko copy karke Google Pay, PhonePe ya Paytm me 'Pay to UPI ID' me paste karein aur shraddhanusar daan bhej dein beta!",
      };
    }

    // ── 2. Official Bank Account & Beneficiary (UCO Bank) ──
    if (text.includes('managing committee') || text.includes('sitta tample') || text.includes('uco bank') || text.includes('खाताधारक') || text.includes('beneficiary') || text.includes('सत्यापित') || text.includes('verified')) {
      return {
        topicHi: 'आधिकारिक बैंक खाता',
        topicEn: 'Official Bank Account',
        hinglish: "Mandir ka official khata 'MANAGING COMMITTEE SITTA TAMPLE' (UCO Bank, Lagdevi) hai beta. Yahan diya gaya daan 100% seedhe mandir vikas me lagta hai.",
      };
    }

    // ── 3. Distance from Tauni Devi (8 KM) ──
    if (text.includes('tauni devi') || text.includes('तौणी देवी') || text.includes('8 km') || text.includes('8 किमी') || text.includes('दूरी') || text.includes('distance') || text.includes('सड़क मार्ग') || text.includes('दिशा-निर्देश') || text.includes('directions')) {
      return {
        topicHi: 'मंदिर का सुगम मार्ग (8 किमी)',
        topicEn: 'Distance: 8 KM from Tauni Devi',
        hinglish: 'Tauni Devi (Bamson) se Lagdevi Mandir lagbhag 8 km door hai beta! Paved all-weather pakki sadak seedhe mandir ke dwar tak aati hai.',
      };
    }

    // ── 4. Harsh Lagwal / Website Feedback & Creator ──
    if (text.includes('harsh') || text.includes('lagwal') || text.includes('lagwalharsh1') || text.includes('त्रुटि') || text.includes('सुझाव') || text.includes('feedback') || text.includes('corrections') || text.includes('निर्माण')) {
      return {
        topicHi: 'सुझाव व संपर्क',
        topicEn: 'Website Feedback',
        hinglish: 'Website me kisi bhi jankari ya sujhav ke liye Harsh Lagwal ji ko lagwalharsh1@gmail.com par email karein, trust aapke har sujhav ka samman karta hai.',
      };
    }

    // ── 5. Annual Lagdevi Mela (22 May & Kushti Dangal) ──
    if (text.includes('22 may') || text.includes('22 मई') || text.includes('dangal') || text.includes('दंगल') || text.includes('kushti') || text.includes('कुश्ती') || text.includes('mela') || text.includes('मेला')) {
      return {
        topicHi: 'वार्षिक लगदेवी मेला (22 मई)',
        topicEn: 'Lagdevi Mela & Dangal (22 May)',
        hinglish: 'Har saal 22 May ko Lagdevi Mela lagta hai beta! Dopahar 2:00 se shaam 8:00 baje tak gaon me utsav aur vishal Kushti-Dangal aayojit hota hai.',
      };
    }

    // ── 6. Bhavya Jagran & Yuva Golden Club ──
    if (text.includes('jagran') || text.includes('जागरण') || text.includes('chowki') || text.includes('चौकी') || text.includes('yuva golden club') || text.includes('गोल्डन क्लब') || text.includes('ansla') || text.includes('sharma musical') || text.includes('भजन')) {
      return {
        topicHi: 'भव्य जागरण व माता की चौकी',
        topicEn: 'Bhavya Jagran & Chowki',
        hinglish: 'Lagdevi ka Yuva Golden Club har saal bhavya Mata Jagran karwata hai, jisme prasiddha gayak aate hain aur raat bhar bhajan-kirtan hota hai.',
      };
    }

    // ── 7. Sacred Katha, Shrimad Bhagwat & Dham (2 PM & 5 PM) ──
    if (text.includes('katha') || text.includes('कथा') || text.includes('bhagwat') || text.includes('भागवत') || text.includes('dham') || text.includes('धाम') || text.includes('2:00') || text.includes('5:00') || text.includes('bhandara') || text.includes('भंडारा')) {
      return {
        topicHi: 'भागवत कथा व हिमाचली धाम',
        topicEn: 'Bhagwat Katha & Dham',
        hinglish: 'Katha ke dauran 9 din roz bhandara hota hai beta. Dopahar 2:00 baje pavitra prasad aur shaam 5:00 baje swadisht Himachali Dham parosi jati hai.',
      };
    }

    // ── 8. Aarti Timings (6:00 AM & 7:00 PM) ──
    if (text.includes('aarti') || text.includes('आरती') || text.includes('morning aarti') || text.includes('evening aarti') || text.includes('6:00') || text.includes('7:00') || text.includes('pratah') || text.includes('sandhya')) {
      return {
        topicHi: 'दैनिक आरती समय',
        topicEn: 'Daily Aarti Timings',
        hinglish: 'Pratah aarti subah 6:00 AM aur sandhya aarti shaam 7:00 PM hoti hai beta. Is pavitra aarti me shamil hona atyant shubh hota hai.',
      };
    }

    // ── 9. Darshan Hours (4:00 AM to 9:00 PM) ──
    if (text.includes('darshan hours') || text.includes('दर्शन समय') || text.includes('opening') || text.includes('closing') || text.includes('नित्य दर्शन') || text.includes('open daily') || text.includes('4:00') || text.includes('9:00')) {
      return {
        topicHi: 'दर्शन समय (4 AM - 9 PM)',
        topicEn: 'Darshan Hours',
        hinglish: 'Mata Rani ke darshan subah 4:00 AM se raat 9:00 PM tak nitya khule rehte hain beta. Kisi bhi samay aakar darshan karein.',
      };
    }

    // ── 10. Inner Sanctum & Akhand Jyoti ──
    if (text.includes('garbhagriha') || text.includes('गर्भगृह') || text.includes('akhand jyoti') || text.includes('अखंड ज्योति') || text.includes('jyoti') || text.includes('sanctum')) {
      return {
        topicHi: 'पावन गर्भगृह व अखंड ज्योति',
        topicEn: 'Inner Sanctum & Jyoti',
        hinglish: 'Ye Mata Rani ka jaagrat garbhagriha hai! Yahan saalon se akhand pavitra jyoti nitya prajwalit hai, jisse apar shanti milti hai.',
      };
    }

    // ── 11. History & Origin (1850 & Raja Ami Chand) ──
    if (text.includes('ami chand') || text.includes('अमी चन्द') || text.includes('1850') || text.includes('jai chand') || text.includes('parnali') || text.includes('bhojki') || text.includes('vidya sagar') || text.includes('history') || text.includes('इतिहास')) {
      return {
        topicHi: 'राजा अमी चन्द व मंदिर इतिहास',
        topicEn: 'History & Origin (1850)',
        hinglish: '1850 ke aaspas Raja Ami Chand Rana ji Poonch-Rajouri se Mata Sheetla ki murti laye the aur Lagdevi me mandir banwaya tha.',
      };
    }

    // ── 12. Kuldevi Sheetla Mata (Cooling & Health) ──
    if (text.includes('sheetla') || text.includes('शीतला') || text.includes('kuldevi') || text.includes('कुलदेवी') || text.includes('lagwal') || text.includes('लगवाल')) {
      return {
        topicHi: 'कुलदेवी माता शीतला',
        topicEn: 'Kuldevi Sheetla Mata',
        hinglish: 'Shri Sheetla Mata Lagwal vanshajon aur 15-20 aas-paas ke gaon ki kuldevi hain. Mata sabhi bhakton ko arogya aur sheetalta deti hain.',
      };
    }

    // ── 13. Shree Ram Darbaar ──
    if (text.includes('ram') || text.includes('राम') || text.includes('darbar') || text.includes('दरबार') || text.includes('sita') || text.includes('lakshman') || text.includes('shyam')) {
      return {
        topicHi: 'श्री राम दरबार',
        topicEn: 'Shree Ram Darbar',
        hinglish: 'Mandir parisar me Prabhu Shri Ram, Mata Sita aur Lakshman ji ka darbar hai beta. Inke darshan se parivar me prem aur maryada aati hai.',
      };
    }

    // ── 14. Lord Shiva Shrine (By Smt. Heera Devi) ──
    if (text.includes('shiv') || text.includes('शिव') || text.includes('bhole') || text.includes('भोले') || text.includes('heera devi') || text.includes('shivalaya')) {
      return {
        topicHi: 'पावन शिवालय',
        topicEn: 'Lord Shiva Shrine',
        hinglish: 'Shivalaya ka nirman Shrimati Heera Devi ji ne apne pati Shri Jaichand ji ki smriti me karwaya tha. Har Somwar yahan jalabhishek hota hai.',
      };
    }

    // ── 15. Maharana Gugga Devta Mandir ──
    if (text.includes('gugga') || text.includes('गुग्गा') || text.includes('jaharpeer') || text.includes('जाहरपीर')) {
      return {
        topicHi: 'महाराणा गुग्गा देवता',
        topicEn: 'Maharana Gugga Devta',
        hinglish: 'Mata ke mandir ke paas Maharana Gugga Devta ji ka alag mandir hai. Raja Ami Chand ji inki murti bhi sath laye the, ye raksha karte hain.',
      };
    }

    // ── 16. Hanuman Ji ──
    if (text.includes('hanuman') || text.includes('हनुमान') || text.includes('bajrangbali') || text.includes('maruti')) {
      return {
        topicHi: 'संकटमोचन हनुमान',
        topicEn: 'Hanuman Ji',
        hinglish: 'Sankat Mochan Hanuman ji sabhi dukh aur bhay dur karte hain beta. Bolo Jai Bajrangbali!',
      };
    }

    // ── 17. Drone View & Village Lagdevi ──
    if (text.includes('drone') || text.includes('aerial') || text.includes('video') || text.includes('valley') || text.includes('cheed') || text.includes('pine') || text.includes('lagdevi view')) {
      return {
        topicHi: 'ड्रोन विहंगम दृश्य',
        topicEn: 'Lagdevi Valley & Drone',
        hinglish: 'Dekhiye hamare sundar gaon Lagdevi aur mandir ka aerial view! Pahadiyon aur cheed ke vanon ke beech kitna shant drishya hai.',
      };
    }

    // ── 18. Medical Services (Hospital & Pharmacy at Kadhiyar) ──
    if (text.includes('hospital') || text.includes('kadhiyar') || text.includes('कढ़ियार') || text.includes('medical') || text.includes('दवा') || text.includes('doctor') || text.includes('ambulance') || text.includes('ayurvedic') || text.includes('uhal')) {
      return {
        topicHi: 'चिकित्सा सहायता (कढ़ियार)',
        topicEn: 'Medical Help at Kadhiyar',
        hinglish: 'Chikitsa sahayata ke liye Kadhiyar me Government Ayurvedic Hospital aur medical store bilkul paas me uplabdh hain beta.',
      };
    }

    // ── 19. Visitor Facilities (Free Parking, Shoes, Drinking Water) ──
    if (text.includes('parking') || text.includes('shoes') || text.includes('joota') || text.includes('जूता') || text.includes('water') || text.includes('पेयजल') || text.includes('सुविधा') || text.includes('guidelines') || text.includes('नियम')) {
      return {
        topicHi: 'यात्री सुविधाएं',
        topicEn: 'Visitor Facilities',
        hinglish: 'Mandir me nishulk vahan parking, surakshit joota-ghar aur shuddh peyajal ki 24 ghante vyavastha hai beta. Swachhata banaye rakhein.',
      };
    }

    // ── 20. Privacy Policy ──
    if (text.includes('privacy') || text.includes('गोपनीयता')) {
      return {
        topicHi: 'गोपनीयता नीति',
        topicEn: 'Privacy Policy',
        hinglish: 'Privacy Policy me mandir trust aapke daan aur kisi bhi jankari ko 100% surakshit aur confidential rakhta hai beta, nishchint rahiye!',
      };
    }

    // ── 21. Terms of Service ──
    if (text.includes('terms') || text.includes('शर्तें') || text.includes('conditions') || text.includes('service')) {
      return {
        topicHi: 'सेवा की शर्तें',
        topicEn: 'Terms of Service',
        hinglish: 'Ye mandir website ke niyam hain beta, taaki sabhi bhakt maryada, pavitrata aur aadar ke sath darshan ka labh le sakein.',
      };
    }

    // ── 22. General Daan / Seva / Contribution ──
    if (text.includes('दान') || text.includes('donate') || text.includes('donation') || text.includes('सहयोग') || text.includes('seva')) {
      return {
        topicHi: 'धर्म सेवा व दान',
        topicEn: 'Devotional Seva & Daan',
        hinglish: 'Mandir nirman aur nitya bhandare ke liye daan dena maha-punya hai! Shraddhanusar sahyog karke pavitra receipt prapt karein.',
      };
    }

    // ── 23. Photo Gallery ──
    if (text.includes('गैलरी') || text.includes('gallery') || text.includes('photo') || text.includes('तस्वीर') || text.includes('दर्शन')) {
      return {
        topicHi: 'मंदिर पावन दर्शन गैलरी',
        topicEn: 'Sacred Photo Gallery',
        hinglish: 'Mata Rani ke aloukik darshan aur mandir parisar ki sundar tasveerein dekhiye. Ghar baithe darshan ka punya kamaiye!',
      };
    }

    // ── 24. Smart Fallback by Current Page (If clicked word had no special keyword) ──
    if (pathname.includes('/donate')) {
      return {
        topicHi: 'पावन दान व सेवा',
        topicEn: 'Donation & Seva',
        hinglish: "Official UPI ID 'sittatample8577@ucobank' se seedhe mandir trust ke khate me daan bhej sakte hain beta!",
      };
    }
    if (pathname.includes('/contact')) {
      return {
        topicHi: 'मंदिर संपर्क व सुगम मार्ग',
        topicEn: 'Contact & Route',
        hinglish: 'Mandir gaon Lagdevi (Hamirpur) me Tauni Devi se 8 km door hai beta. Sujhav ke liye lagwalharsh1@gmail.com par likhein.',
      };
    }
    if (pathname.includes('/festivals')) {
      return {
        topicHi: 'वार्षिक मेले व उत्सव',
        topicEn: 'Festivals & Mela',
        hinglish: 'Lagdevi me 22 May ka aitihasik mela, 9 din ki Bhagwat Katha aur Yuva Golden Club ka Bhavya Jagran mukhya aayojan hain beta!',
      };
    }
    if (pathname.includes('/about')) {
      return {
        topicHi: 'मंदिर का पावन इतिहास',
        topicEn: 'Temple History (1850)',
        hinglish: '1850 me Raja Ami Chand Rana ji ne Poonch-Rajouri se aakar Mata Sheetla aur Gugga Baba ki murti sthapit karwayi thi beta.',
      };
    }
    if (pathname.includes('/visit')) {
      return {
        topicHi: 'यात्री सुविधाएं व मार्ग',
        topicEn: 'Visitor Guidelines',
        hinglish: 'Mandir Tauni Devi se 8 km door hai. Yahan nishulk parking, joota-ghar aur 4 AM se 9 PM tak darshan uplabdh hain.',
      };
    }
    if (pathname.includes('/privacy-policy')) {
      return {
        topicHi: 'गोपनीयता नीति',
        topicEn: 'Privacy Policy',
        hinglish: 'Mandir trust aapke daan aur kisi bhi jankari ko 100% surakshit aur confidential rakhta hai beta.',
      };
    }
    if (pathname.includes('/terms-of-service')) {
      return {
        topicHi: 'सेवा की शर्तें',
        topicEn: 'Terms of Service',
        hinglish: 'Website aur mandir parisar me pavitrata aur maryada banaye rakhna sabhi bhakton ka dharm hai beta.',
      };
    }

    return null;
  };

  // Global click listener to intercept clicks on website cards / sections
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Ignore if user clicked directly inside Pandit Ji widget
      if (target.closest('[data-pandit-widget]')) {
        return;
      }

      const match = getContextualDialogue(target);
      if (match) {
        // Open eyes, switch to explaining mode
        setDialogue(match);
        setMode('explaining');

        // Reset auto revert timer (revert after 12 seconds of inactivity)
        if (autoRevertTimer.current) {
          clearTimeout(autoRevertTimer.current);
        }
        autoRevertTimer.current = setTimeout(() => {
          setMode('meditating');
        }, 12000);
      }
    };

    document.addEventListener('click', handleGlobalClick, true);
    return () => {
      document.removeEventListener('click', handleGlobalClick, true);
      if (autoRevertTimer.current) {
        clearTimeout(autoRevertTimer.current);
      }
    };
  }, []);

  // Click directly on Pandit Ji
  const handlePanditJiClick = () => {
    setIsBlessing(true);

    // If meditating, wake up with a warm blessing and scroll to top
    setDialogue({
      topicHi: 'कल्याणमस्तु',
      topicEn: 'Divine Blessings',
      hinglish: 'Kalyanamastu beta! Mata Rani ka aashirwad sada aapke parivar par bana rahe. Chalo aapko shikhara/top par le chalta hoon 🙏',
    });
    setMode('explaining');

    if (lenis) {
      lenis.scrollTo(0, {
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }

    setTimeout(() => {
      setIsBlessing(false);
    }, 1800);

    // Auto revert after blessing
    if (autoRevertTimer.current) {
      clearTimeout(autoRevertTimer.current);
    }
    autoRevertTimer.current = setTimeout(() => {
      setMode('meditating');
    }, 9000);
  };

  return (
    <aside
      data-pandit-widget
      aria-label="Pandit Ji Virtual Temple Guide"
      className="fixed bottom-[74px] right-2.5 sm:bottom-24 sm:right-6 xl:bottom-6 xl:right-6 z-50 flex flex-col items-end select-none pointer-events-none touch-manipulation max-w-[calc(100vw-20px)]"
    >
      {/* ── SPEECH BUBBLE (ONLY WHEN EXPLAINING A SECTION) ── */}
      <AnimatePresence>
        {mode === 'explaining' && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.88 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.88 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className="mb-2 pointer-events-auto"
          >
            <div className="relative bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 text-white rounded-2xl p-2.5 sm:p-3.5 shadow-2xl border-2 border-amber-300/50 backdrop-blur-md max-w-[215px] sm:max-w-[260px]">
              
              {/* Header with Pandit Ji tag and Close button */}
              <div className="flex items-center justify-between gap-1.5 pb-1 border-b border-white/25">
                <span className="font-hindi text-[10.5px] sm:text-xs font-bold text-amber-100 flex items-center gap-1">
                  🚩 {isBlessing ? '॥ कल्याणमस्तु ॥' : '॥ पंडित जी ॥'}
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-[9px] sm:text-[9.5px] font-mono text-amber-100/90 bg-black/25 px-1.5 py-0.5 rounded-full truncate max-w-[95px] sm:max-w-[120px]">
                    {isHindi ? dialogue.topicHi : dialogue.topicEn}
                  </span>
                  <button
                    onClick={backToMeditation}
                    className="text-white/80 hover:text-white p-1 rounded-md hover:bg-black/20 transition-colors cursor-pointer min-w-[22px] min-h-[22px] flex items-center justify-center"
                    aria-label="Close and return to meditation"
                    title="ध्यान में लौटें"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Hinglish Guidance Text */}
              <p className="text-[10.5px] sm:text-[12px] font-google font-medium text-white pt-1.5 leading-snug">
                {dialogue.hinglish}
              </p>

              {/* Small Action Hint */}
              <div className="mt-1.5 pt-1 border-t border-white/15 flex items-center justify-between text-[9.5px] sm:text-[10px] text-amber-200">
                <span className="flex items-center gap-0.5 opacity-90">
                  <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                  <span>Scroll to meditate</span>
                </span>
                <button
                  onClick={handlePanditJiClick}
                  className="inline-flex items-center gap-0.5 text-amber-100 hover:text-white font-semibold cursor-pointer underline-offset-2 hover:underline p-0.5"
                >
                  <ChevronUp className="w-3 h-3" />
                  <span>Top</span>
                </button>
              </div>

              {/* Speech Bubble Tail pointing down towards Pandit Ji */}
              <div className="absolute -bottom-1.5 right-5 sm:right-7 w-3 h-3 bg-amber-600 rotate-45 border-r border-b border-amber-300/50" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 2D PANDIT JI AVATAR CONTAINER ── */}
      <div className="relative pointer-events-auto flex flex-col items-center">
        
        {/* CONTINUOUS FLOATING 'ॐ' CHANTING PARTICLES (DURING MEDITATION) */}
        {mode === 'meditating' && (
          <div className="absolute -top-11 sm:-top-14 inset-x-0 h-16 sm:h-20 flex justify-center items-center pointer-events-none overflow-visible z-20">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8, scale: 0.7 }}
                animate={{
                  y: [2, -44],
                  x: [0, i === 0 ? -9 : i === 1 ? 9 : 0, 0],
                  opacity: [0, 1, 1, 0],
                  scale: [0.8, 1.35, 1],
                }}
                transition={{
                  duration: 3.2,
                  repeat: Infinity,
                  delay: i * 1.05,
                  ease: 'easeOut',
                }}
                className="absolute font-hindi font-black text-xl sm:text-2xl md:text-3xl select-none"
                style={{
                  color: '#ea580c',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.25)) drop-shadow(0 0 12px rgba(234, 88, 12, 0.85))',
                }}
              >
                ॐ
              </motion.div>
            ))}
          </div>
        )}

        {/* Clickable Pandit Ji Character */}
        <motion.div
          onClick={handlePanditJiClick}
          role="button"
          tabIndex={0}
          aria-label={
            mode === 'meditating'
              ? 'पंडित जी ध्यान में हैं - बात करने या ऊपर जाने के लिए क्लिक करें'
              : 'पंडित जी - ऊपर जाने के लिए क्लिक करें'
          }
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handlePanditJiClick();
            }
          }}
          className="relative cursor-pointer group active:scale-95 transition-transform"
        >
          {/* Celestial Aura Glow Behind Pandit Ji */}
          <motion.div
            animate={{
              scale: mode === 'meditating' ? [1, 1.12, 1] : [1.05, 1.2, 1.05],
              opacity: mode === 'meditating' ? [0.45, 0.75, 0.45] : [0.7, 0.95, 0.7],
            }}
            transition={{
              duration: mode === 'meditating' ? 3.6 : 2.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute inset-0 -m-2 sm:-m-4 rounded-full bg-gradient-to-tr from-amber-500/40 via-orange-400/30 to-amber-200/50 blur-md pointer-events-none"
          />

          {/* Pandit Ji Character Frame with Mobile-Optimized Width & Breathing Animation */}
          <motion.div
            animate={
              isBlessing
                ? { y: [-3, -12, 0], scale: [1, 1.1, 1] }
                : mode === 'meditating'
                ? { y: [0, -4, 0], scale: [1, 1.02, 1] }
                : { y: [0, -6, 0], scale: [1, 1.03, 1] }
            }
            transition={
              isBlessing
                ? { duration: 0.6, ease: 'easeOut' }
                : { duration: 3.2, repeat: Infinity, ease: 'easeInOut' }
            }
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.93 }}
            className="relative w-16 sm:w-22 md:w-24 drop-shadow-[0_10px_16px_rgba(180,83,9,0.38)] filter transition-all"
          >
            {/* Seamless Cross-fade between Meditating and Awake/Explaining Posture */}
            <img
              src={mode === 'meditating' ? '/pandit-ji-meditating.png' : '/pandit-ji.png'}
              alt={mode === 'meditating' ? 'Pandit Ji Meditating' : 'Pandit Ji Guiding'}
              className="w-full h-auto object-contain select-none pointer-events-none transition-opacity duration-300"
              loading="eager"
              decoding="async"
            />
          </motion.div>
        </motion.div>
      </div>
    </aside>
  );
};
