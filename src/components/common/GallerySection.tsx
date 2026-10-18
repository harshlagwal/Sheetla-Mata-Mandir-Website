import React, { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Clock,
  Calendar,
  Landmark,
  HeartHandshake,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { DarshanModal } from './DarshanModal';
import { darshanDeities, DarshanDeity } from '../../data/darshanData';
import { AnimatedHikeCard, Stat } from '../ui/card-25';
import { Button } from '../common/Button';

// Asset imports for the 3 curated albums
import mandirBuildingImg from '../../assets/Mandir building.webp';
import mandirUnderImg from '../../assets/mandir under image.webp';
import lagdeviViewImg from '../../assets/lagdevi view.webp';
import newSheetlaImg from '../../assets/new-sheetla.webp';
import shivjiImg from '../../assets/Shivji New.webp';
import hanumanImg from '../../assets/Hanuman.webp';
import ramDarbaarImg from '../../assets/Shree Ram Darbaar.webp';
import guggaBabaImg from '../../assets/Gugga baba.webp';
import bhandaraImg from '../../assets/hero bhandare.webp';
import bhavyaJagranImg from '../../assets/Bhavya jagran.webp';
import navratriImg from '../../assets/Home section sharad navratre.webp';
import melaImg from '../../assets/Lagdevir Mela.webp';

interface GallerySectionProps {
  showAllButton?: boolean;
  showHeader?: boolean;
}

interface CuratedAlbum {
  id: string;
  title: string;
  hindiTitle: string;
  badge: string;
  hindiBadge: string;
  shortDesc: string;
  hindiShortDesc: string;
  highlights: { hi: string; en: string }[];
  ctaLabel: { hi: string; en: string };
  ctaRoute?: string;
  images: string[];
  items: DarshanDeity[];
  stats: (isHindi: boolean) => Stat[];
}

export const GallerySection: React.FC<GallerySectionProps> = React.memo(
  ({ showAllButton = true, showHeader = true }) => {
    const { t, isHindi } = useLanguage();
    const navigate = useNavigate();

    const [modalList, setModalList] = useState<DarshanDeity[]>([]);
    const [activeDeity, setActiveDeity] = useState<DarshanDeity | null>(null);
    const [activeIndex, setActiveIndex] = useState<number>(0);

    // ── THE 3 SIGNATURE ALBUMS (CURATED STORIES) ──
    const albums: CuratedAlbum[] = useMemo(
      () => [
        {
          id: 'divine-deities',
          title: 'Divine Murtis & Shrines',
          hindiTitle: 'माता शीतला एवं 5 पावन देव स्वरूप',
          badge: '5 Sacred Deities',
          hindiBadge: '5 पावन विग्रह',
          shortDesc:
            'The sanctum sanctorum enshrines Kuldevi Mata Sheetla alongside Mahadev, Hanuman Ji, Ram Darbar, and Gugga Jaharpeer, blessed with an eternal Akhand Jyoti.',
          hindiShortDesc:
            'गर्भगृह में कुलदेवी माँ शीतला के साथ महादेव, संकट मोचन हनुमान, श्री राम दरबार व गुग्गा जाहरपीर के जाग्रत विग्रह प्रतिष्ठित हैं। सदियों से यहाँ जल रही अखंड पावन ज्योत भक्तों के समस्त कष्ट हरती है।',
          highlights: [
            { hi: 'कुलदेवी माता शीतला का जाग्रत पावन विग्रह', en: 'Sacred Presiding Murti of Mata Sheetla' },
            { hi: '5 प्राचीन सिद्ध देव विग्रह (महादेव, हनुमान, राम दरबार, गुग्गा पीर)', en: '5 Consecrated Shrines (Mahadev, Hanuman, Ram Darbar, Gugga Ji)' },
            { hi: 'सदियों पुरानी वैदिक प्राण-प्रतिष्ठा व पूजन परंपरा', en: 'Centuries-old Vedic consecration and Puja rituals' },
          ],
          ctaLabel: {
            hi: 'पावन दर्शन स्लाइड-शो देखें',
            en: 'View Divine Darshan Slideshow',
          },
          images: [newSheetlaImg, shivjiImg, hanumanImg, ramDarbaarImg, guggaBabaImg],
          items: darshanDeities.filter((d) => d.category === 'deities'),
          stats: (hi: boolean) => [
            {
              icon: <Sparkles className="w-3.5 h-3.5 text-amber-700" />,
              label: hi ? '5 दिव्य विग्रह' : '5 Divine Murtis',
            },
            {
              icon: <Clock className="w-3.5 h-3.5 text-amber-700" />,
              label: hi ? 'नित्य आरती दर्शन' : 'Daily Darshan',
            },
          ],
        },
        {
          id: 'festivals-mela',
          title: 'Festivals, Mela & Jagran',
          hindiTitle: 'ऐतिहासिक लगदेवी मेला व वार्षिक भव्य जागरण',
          badge: 'Annual Celebrations',
          hindiBadge: 'सांस्कृतिक पर्व',
          shortDesc:
            'Sharad and Chaitra Navratri prayers, the night-long Bhavya Mata Jagran, and the centuries-old historic Lagdevi Mela celebrate living Devbhoomi heritage and communal harmony.',
          hindiShortDesc:
            'चैत्र व शरद नवरात्रि की दिव्य रातें, युवाओं द्वारा आयोजित वार्षिक भव्य जागरण और सदियों पुराना ऐतिहासिक लगदेवी मेला—गाँव की अटूट आस्था और सांस्कृतिक एकता का जीवंत उत्सव है।',
          highlights: [
            { hi: 'चैत्र व शरद नवरात्रि महापर्व', en: 'Chaitra & Sharad Navratri Festival' },
            { hi: 'रात भर माता का पावन जागरण', en: 'Night-long Holy Mata Jagran' },
            { hi: 'सदियों पुराना ऐतिहासिक ग्रामीण मेला', en: 'Centuries-old Historic Fair' },
          ],
          ctaLabel: {
            hi: 'उत्सव व मेले का इतिहास देखें',
            en: 'Explore Festivals & Mela',
          },
          ctaRoute: '/festivals',
          images: [bhavyaJagranImg, navratriImg, melaImg, lagdeviViewImg],
          items: darshanDeities.filter((d) => d.category === 'festivals'),
          stats: (hi: boolean) => [
            {
              icon: <Calendar className="w-3.5 h-3.5 text-amber-700" />,
              label: hi ? 'पर्व एवं मेले' : 'Festivals & Melas',
            },
            {
              icon: <Sparkles className="w-3.5 h-3.5 text-amber-700" />,
              label: hi ? 'अलौकिक जागरण' : 'Divine Gatherings',
            },
          ],
        },
        {
          id: 'sanctuary-seva',
          title: 'Sanctuary & Langar Seva',
          hindiTitle: 'हिमाचली काष्ठ-शिल्प गर्भगृह व महाप्रसाद लंगर',
          badge: 'Sanctuary & Seva',
          hindiBadge: 'धरोहर व सेवा',
          shortDesc:
            'Built with traditional slate stone and indigenous woodwork, the serene sanctum welcomes all with daily Mahaprasad Langar, sustained by selfless community seva.',
          hindiShortDesc:
            'हिमाचली काष्ठ-शिल्प और स्लेट पत्थरों से निर्मित प्राचीन मंदिर परिसर में नित्य महाप्रसाद लंगर चलता है, जहाँ गाँववासियों का निस्वार्थ सेवा-भाव हर श्रद्धालु को तृप्त करता है।',
          highlights: [
            { hi: 'पारंपरिक स्लेट व काष्ठ स्थापत्य', en: 'Traditional Slate & Wood Craft' },
            { hi: 'नित्य निःशुल्क महाप्रसाद लंगर', en: 'Daily Free Mahaprasad Langar' },
            { hi: 'शांत हिमालयी देवभूमि वातावरण', en: 'Serene Himalayan Devbhoomi' },
          ],
          ctaLabel: {
            hi: 'मंदिर परिसर व दर्शन समय',
            en: 'Temple Timings & Sanctuary',
          },
          ctaRoute: '/visit',
          images: [mandirUnderImg, mandirBuildingImg, bhandaraImg, lagdeviViewImg],
          items: darshanDeities.filter(
            (d) => d.category === 'sanctuary' || d.category === 'seva'
          ),
          stats: (hi: boolean) => [
            {
              icon: <Landmark className="w-3.5 h-3.5 text-amber-700" />,
              label: hi ? 'अखंड गर्भगृह' : 'Ancient Sanctum',
            },
            {
              icon: <HeartHandshake className="w-3.5 h-3.5 text-amber-700" />,
              label: hi ? 'महाप्रसाद लंगर' : 'Langar Seva',
            },
          ],
        },
      ],
      []
    );

    const openAlbumSlideshow = useCallback((album: CuratedAlbum) => {
      if (album.items.length > 0) {
        setModalList(album.items);
        setActiveDeity(album.items[0]);
        setActiveIndex(0);
      }
    }, []);

    const closeModal = useCallback(() => {
      setActiveDeity(null);
      setModalList([]);
    }, []);

    const handlePrev = useCallback(() => {
      if (modalList.length === 0) return;
      const prev = (activeIndex - 1 + modalList.length) % modalList.length;
      setActiveIndex(prev);
      setActiveDeity(modalList[prev]);
    }, [activeIndex, modalList]);

    const handleNext = useCallback(() => {
      if (modalList.length === 0) return;
      const next = (activeIndex + 1) % modalList.length;
      setActiveIndex(next);
      setActiveDeity(modalList[next]);
    }, [activeIndex, modalList]);

    return (
      <section
        className={`${
          showHeader ? 'py-12 sm:py-20 md:py-24' : 'pt-4 pb-14 sm:pb-20'
        } bg-[#fdfbf9] border-y border-slate-200/80`}
      >
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          {/* ── SECTION HEADER ── */}
          {showHeader && (
            <div className="flex flex-col items-center text-center mb-10 sm:mb-16 md:mb-20">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-800 text-[10.5px] font-mono tracking-widest uppercase mb-3 backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>॥ ॐ श्री शीतलायै नमः ॥ • SACRED DARSHAN</span>
              </div>

              <h2 className="font-display font-bold text-xl sm:text-3xl md:text-4xl text-slate-950 tracking-tight leading-tight">
                {isHindi ? 'पावन दर्शन एवं सांस्कृतिक धरोहर' : 'Experience the Divine Darshan'}
              </h2>

              <p className="font-google text-xs sm:text-sm text-slate-600 max-w-xl mt-2 leading-relaxed">
                {isHindi
                  ? 'माता रानी के जाग्रत स्वरूप, सदियों पुराने ऐतिहासिक उत्सव और मंदिर परिसर की पावन झलकियां।'
                  : 'Sacred glimpses of Mata Sheetla, living community traditions, and centuries of blessed devotion.'}
              </p>
            </div>
          )}

          {/* ── ZIG-ZAG (ALTERNATING LEFT-RIGHT) SHOWCASE ROWS ── */}
          <div className="space-y-12 sm:space-y-16 md:space-y-24">
            {albums.map((album, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={album.id}
                  className={`flex flex-col lg:items-center justify-between gap-6 sm:gap-8 lg:gap-16 ${
                    isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* 1. VISUAL CARD COLUMN (50%) */}
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: 0.05 }}
                    className="w-full lg:w-1/2 flex items-center justify-center"
                  >
                    <div className="w-full max-w-[460px]">
                      <AnimatedHikeCard
                        title={album.title}
                        hindiTitle={isHindi ? album.hindiTitle : album.title}
                        images={album.images}
                        stats={album.stats(isHindi)}
                        badge={isHindi ? album.hindiBadge : album.badge}
                        onClick={() => openAlbumSlideshow(album)}
                        className="shadow-md hover:shadow-xl transition-all"
                      />
                    </div>
                  </motion.div>

                  {/* 2. UNBOXED EDITORIAL TEXT COLUMN (50% - SHARP GOOGLE SANS) */}
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="w-full lg:w-1/2 flex flex-col items-start justify-center text-left"
                  >
                    {/* Eyebrow Pill */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider font-semibold bg-amber-500/10 text-amber-900 border border-amber-500/25 mb-2.5 sm:mb-3">
                      <Sparkles className="w-3 h-3 text-amber-600" />
                      <span>{isHindi ? album.hindiBadge : album.badge}</span>
                    </div>

                    {/* Bold Title */}
                    <h3 className="font-google text-lg sm:text-2xl md:text-3xl font-bold text-slate-950 tracking-tight leading-snug mb-2.5 sm:mb-3">
                      {isHindi ? album.hindiTitle : album.title}
                    </h3>

                    {/* Sharp Short Description (2 Lines) */}
                    <p className="font-google text-xs sm:text-sm md:text-base text-slate-600 leading-[1.7] mb-4 sm:mb-5 font-normal">
                      {isHindi ? album.hindiShortDesc : album.shortDesc}
                    </p>

                    {/* 3 Crisp Highlight Checkmarks */}
                    <div className="space-y-2 mb-5 sm:mb-6 w-full">
                      {album.highlights.map((h, hIdx) => (
                        <div
                          key={hIdx}
                          className="flex items-center gap-2 text-xs sm:text-sm font-google font-medium text-slate-700"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{isHindi ? h.hi : h.en}</span>
                        </div>
                      ))}
                    </div>

                    {/* Official Website Button */}
                    <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
                      <Button
                        variant="primary"
                        size="md"
                        onClick={() => {
                          if (album.ctaRoute) {
                            navigate(album.ctaRoute);
                          } else {
                            openAlbumSlideshow(album);
                          }
                        }}
                        icon={<ArrowRight className="w-4 h-4 text-amber-300" />}
                        className="w-full sm:w-auto"
                      >
                        {isHindi ? album.ctaLabel.hi : album.ctaLabel.en}
                      </Button>

                      {album.ctaRoute && (
                        <Button
                          variant="ghost"
                          size="md"
                          onClick={() => openAlbumSlideshow(album)}
                          icon={<Sparkles className="w-3.5 h-3.5 text-amber-700" />}
                          className="w-full sm:w-auto border-slate-300 hover:border-slate-900"
                        >
                          {isHindi ? 'फोटो देखें' : 'View Photos'}
                        </Button>
                      )}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* ── FOOTER LINK TO GALLERY PAGE ── */}
          {showAllButton && (
            <div className="mt-16 md:mt-20 flex justify-center">
              <Button
                variant="ghost"
                size="lg"
                onClick={() => navigate('/gallery')}
                icon={<ArrowRight className="w-4 h-4 text-amber-700" />}
                className="border-slate-300 hover:border-slate-900 font-bold"
              >
                <span>
                  {isHindi ? 'समस्त पावन दर्शन गैलरी देखें' : 'View Complete Sacred Gallery'}
                </span>
              </Button>
            </div>
          )}
        </div>

        {/* ── SLIDESHOW LIGHTBOX MODAL ── */}
        {activeDeity && modalList.length > 0 && (
          <DarshanModal
            deity={activeDeity}
            onClose={closeModal}
            onPrev={handlePrev}
            onNext={handleNext}
            totalCount={modalList.length}
            currentIndex={activeIndex}
          />
        )}
      </section>
    );
  }
);

export default GallerySection;
