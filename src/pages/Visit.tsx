import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { templeData, TEMPLE_LOCATION } from '../data/temple';
import { Clock, MapPin, Navigation, Info, ShieldCheck, ShoppingBag, User, Phone, Store, Compass } from 'lucide-react';
import { VisitorServicesSection } from '../components/common/VisitorServicesSection';

export const Visit: React.FC = () => {
  const { t, isHindi } = useLanguage();

  return (
    <div className="w-full pt-28 pb-20">
      {/* Hero */}
      <section className="bg-surface-container py-16 px-margin-mobile lg:px-margin-desktop mb-16 border-b border-outline-variant/30 text-center">
        <div className="max-w-3xl mx-auto space-y-3">
          <span className="font-body text-xs font-bold text-secondary uppercase tracking-[0.2em]">
            PILGRIMAGE GUIDE
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary">
            {t.visitPage.heroTitle}
          </h1>
          <p className="font-body text-base md:text-lg text-on-surface-variant">
            {t.visitPage.heroSub}
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop space-y-16">
        {/* Timings & Location Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Timings Box */}
          <div className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/30 shadow-md space-y-6">
            <div className="flex items-center gap-3 text-primary border-b border-outline-variant/20 pb-4">
              <Clock className="w-6 h-6 text-secondary" />
              <h2 className="font-display font-bold text-2xl">{t.visitPage.timingsTitle}</h2>
            </div>

            <div className="space-y-4 font-body text-base text-on-surface">
              <div className="p-4 bg-surface-container-low rounded-2xl flex justify-between items-center">
                <span className="font-semibold">{t.visitPage.morningAarti}</span>
                <span className="text-xs bg-secondary-fixed text-on-secondary-fixed px-2.5 py-1 rounded-full font-bold">Daily</span>
              </div>
              <div className="p-4 bg-surface-container-low rounded-2xl flex justify-between items-center">
                <span className="font-semibold">{t.visitPage.eveningAarti}</span>
                <span className="text-xs bg-secondary-fixed text-on-secondary-fixed px-2.5 py-1 rounded-full font-bold">Daily</span>
              </div>
              <div className="p-4 bg-surface-container-low rounded-2xl flex justify-between items-center">
                <span className="font-semibold">{t.visitPage.darshanHours}</span>
                <span className="text-xs bg-primary-fixed text-on-primary-fixed px-2.5 py-1 rounded-full font-bold">Open</span>
              </div>
            </div>
          </div>

          {/* Location & Directions Box */}
          <div className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/30 shadow-md space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-primary border-b border-outline-variant/20 pb-4">
                <MapPin className="w-6 h-6 text-secondary" />
                <h2 className="font-display font-bold text-2xl">{t.visitPage.howToReach}</h2>
              </div>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                {t.visitPage.reachText}
              </p>
              <div className="bg-surface-container p-4 rounded-xl text-xs font-body text-on-surface-variant">
                📍 <strong>Address:</strong> {templeData.address}
              </div>
            </div>

            <div className="pt-4">
              <a
                href={TEMPLE_LOCATION.mapDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-block"
              >
                <Button variant="primary" size="lg" className="w-full" icon={<Navigation className="w-5 h-5" />}>
                  {t.common.getDirections} (Google Maps)
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Embedded Map Simulation */}
        <div className="bg-surface-container-lowest rounded-3xl p-4 border border-outline-variant/30 shadow-sm overflow-hidden h-80">
          <iframe
            title="Sheetla Mata Mandir Location Map"
            src={TEMPLE_LOCATION.mapEmbedUrl}
            className="w-full h-full rounded-2xl border-0"
            loading="lazy"
          />
        </div>

        {/* Prasad & Puja Essentials Nearby */}
        <div className="space-y-8 pt-4">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="font-body text-xs font-bold text-secondary uppercase tracking-[0.2em]">
              {isHindi ? 'स्थानीय सुविधा' : 'LOCAL CONVENIENCE'}
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-primary">
              {isHindi ? 'प्रसाद एवं पूजा सामग्री की नज़दीकी दुकानें' : 'Prasad & Puja Essentials Nearby'}
            </h2>
            <p className="font-body text-sm md:text-base text-on-surface-variant leading-relaxed">
              {isHindi
                ? 'शीतला माता मंदिर जाने से पहले श्रद्धालु नज़दीकी स्थानीय दुकानों से प्रसाद एवं बुनियादी पूजा सामग्री प्राप्त कर सकते हैं।'
                : 'Devotees may purchase prasad and basic puja essentials from nearby local stores before proceeding to Sheetla Mata Mandir.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1: Kashmir General Store */}
            <div className="bg-surface-container-lowest p-6 md:p-8 rounded-3xl border border-outline-variant/30 shadow-md hover:shadow-lg transition-all duration-300 space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                {/* Header & Badge */}
                <div className="flex items-start justify-between gap-3 border-b border-outline-variant/20 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-surface-container-low rounded-2xl text-primary">
                      <ShoppingBag className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-xl text-primary">
                        Kashmir General Store
                      </h3>
                      <p className="font-body text-xs text-on-surface-variant font-medium">
                        {isHindi ? 'कश्मीर जनरल स्टोर' : 'General & Puja Store'}
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 bg-secondary-fixed text-on-secondary-fixed text-xs px-3 py-1 rounded-full font-bold font-body whitespace-nowrap shadow-sm">
                    <Navigation className="w-3 h-3 text-secondary" />
                    ~300 m from Temple
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-3 font-body text-sm text-on-surface-variant">
                  <div className="flex items-start gap-3">
                    <Compass className="w-4 h-4 text-primary shrink-0 mt-1" />
                    <span>
                      <strong>{isHindi ? 'मार्ग विवरण:' : 'Route Guidance:'}</strong>{' '}
                      {isHindi
                        ? 'यदि आप उहल की ओर से आ रहे हैं, तो शीतला माता मंदिर पहुँचने से पहले आपको Kashmir General Store मिलेगा। दुकान के बाद आगे जाने पर मंदिर आएगा।'
                        : 'If you are coming via Uhal, you will reach Kashmir General Store before reaching Sheetla Mata Mandir. The shop will appear along your route, followed by the temple.'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-primary shrink-0" />
                    <span>
                      <strong>{isHindi ? 'समय:' : 'Timing:'}</strong> 8:00 AM - 5:00 PM
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-primary shrink-0" />
                    <span>
                      <strong>{isHindi ? 'संचालक:' : 'Owner:'}</strong> Manish Kumar
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-primary shrink-0" />
                    <span>
                      <strong>{isHindi ? 'संपर्क:' : 'Contact:'}</strong>{' '}
                      <a href="tel:7876635677" className="hover:text-primary underline font-medium">
                        7876635677
                      </a>
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-outline-variant/20 flex flex-col sm:flex-row gap-3">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=31.755483394691502,76.60101804299899"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button variant="primary" size="md" className="w-full" icon={<Navigation className="w-4 h-4" />}>
                    {isHindi ? 'दिशा-निर्देश (Google Maps)' : 'Get Directions'}
                  </Button>
                </a>
                <a href="tel:7876635677" className="flex-1">
                  <Button variant="secondary" size="md" className="w-full" icon={<Phone className="w-4 h-4" />}>
                    {isHindi ? 'कॉल करें' : 'Call Store'}
                  </Button>
                </a>
              </div>
            </div>

            {/* Card 2: Thakur General Store */}
            <div className="bg-surface-container-lowest p-6 md:p-8 rounded-3xl border border-outline-variant/30 shadow-md hover:shadow-lg transition-all duration-300 space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                {/* Header & Badge */}
                <div className="flex items-start justify-between gap-3 border-b border-outline-variant/20 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-surface-container-low rounded-2xl text-primary">
                      <Store className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-xl text-primary">
                        Thakur General Store
                      </h3>
                      <p className="font-body text-xs text-on-surface-variant font-medium">
                        {isHindi ? 'ठाकुर जनरल स्टोर' : 'General & Puja Store'}
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 bg-secondary-fixed text-on-secondary-fixed text-xs px-3 py-1 rounded-full font-bold font-body whitespace-nowrap shadow-sm">
                    <Navigation className="w-3 h-3 text-secondary" />
                    ~100 m from Temple
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-3 font-body text-sm text-on-surface-variant">
                  <div className="flex items-start gap-3">
                    <Compass className="w-4 h-4 text-primary shrink-0 mt-1" />
                    <span>
                      <strong>{isHindi ? 'मार्ग विवरण:' : 'Route Guidance:'}</strong>{' '}
                      {isHindi
                        ? 'यदि आप उहल या चौरी की ओर से आ रहे हैं, तो शीतला माता मंदिर पहुँचने से पहले आपको Thakur General Store मिलेगा।'
                        : 'If you are coming via Uhal or Chauri, you will reach Thakur General Store before reaching Sheetla Mata Mandir.'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-primary shrink-0" />
                    <span>
                      <strong>{isHindi ? 'समय:' : 'Timing:'}</strong> 7:00 AM - 7:00 PM
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-primary shrink-0" />
                    <span>
                      <strong>{isHindi ? 'संचालक:' : 'Owner:'}</strong> Rahul Thakur
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-primary shrink-0" />
                    <span>
                      <strong>{isHindi ? 'संपर्क:' : 'Contact:'}</strong>{' '}
                      <a href="tel:8627001182" className="hover:text-primary underline font-medium">
                        8627001182
                      </a>
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-outline-variant/20 flex flex-col sm:flex-row gap-3">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=31.755489512684075,76.59955024601709"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button variant="primary" size="md" className="w-full" icon={<Navigation className="w-4 h-4" />}>
                    {isHindi ? 'दिशा-निर्देश (Google Maps)' : 'Get Directions'}
                  </Button>
                </a>
                <a href="tel:8627001182" className="flex-1">
                  <Button variant="secondary" size="md" className="w-full" icon={<Phone className="w-4 h-4" />}>
                    {isHindi ? 'कॉल करें' : 'Call Store'}
                  </Button>
                </a>
              </div>
            </div>
          </div>

          {/* Important Route Guidance Box */}
          <div className="bg-surface-container-low p-6 md:p-8 rounded-3xl border border-outline-variant/30 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-outline-variant/20 pb-4">
              <Compass className="w-6 h-6 text-secondary shrink-0" />
              <h3 className="font-display font-bold text-xl md:text-2xl text-primary">
                {isHindi ? 'जंदरू / कढ़ियार की ओर से आ रहे हैं?' : 'Coming from Jandru / Kadhiyar Side?'}
              </h3>
            </div>

            <p className="font-body text-sm md:text-base text-on-surface-variant leading-relaxed">
              {isHindi
                ? 'यदि आप जंदरू या कढ़ियार की ओर से आ रहे हैं, तो मार्ग का क्रम अलग होगा। आपको सबसे पहले शीतला माता मंदिर मिलेगा, उसके बाद Thakur General Store आएगा। उहल की ओर आगे बढ़ने पर Kashmir General Store मिलेगा।'
                : 'If you are approaching from the Jandru or Kadhiyar side, the order is different. You will first reach Sheetla Mata Mandir, followed by Thakur General Store. Continue further towards Uhal to reach Kashmir General Store.'}
            </p>

            {/* Visual Route Sequence Chips */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
              {/* Route 1: From Uhal / Chauri Side */}
              <div className="p-4 bg-surface-container-lowest rounded-2xl border border-outline-variant/20 space-y-3">
                <span className="text-xs font-body font-bold text-secondary uppercase tracking-wider block">
                  {isHindi ? 'मार्ग 1: उहल / चौरी की ओर से' : 'Route 1: Via Uhal / Chauri'}
                </span>
                <div className="flex flex-wrap items-center gap-2 text-xs font-body font-semibold text-on-surface">
                  <span className="px-3 py-1.5 bg-surface-container rounded-xl border border-outline-variant/30">
                    {isHindi ? 'उहल / चौरी' : 'Uhal / Chauri'}
                  </span>
                  <span className="text-secondary font-bold">↓</span>
                  <span className="px-3 py-1.5 bg-primary-fixed text-on-primary-fixed rounded-xl font-bold">
                    Kashmir General Store
                  </span>
                  <span className="text-secondary font-bold">↓</span>
                  <span className="px-3 py-1.5 bg-primary-fixed text-on-primary-fixed rounded-xl font-bold">
                    Thakur General Store
                  </span>
                  <span className="text-secondary font-bold">↓</span>
                  <span className="px-3 py-1.5 bg-secondary-fixed text-on-secondary-fixed rounded-xl font-bold">
                    {isHindi ? 'शीतला माता मंदिर' : 'Sheetla Mata Mandir'}
                  </span>
                </div>
              </div>

              {/* Route 2: From Jandru / Kadhiyar Side */}
              <div className="p-4 bg-surface-container-lowest rounded-2xl border border-outline-variant/20 space-y-3">
                <span className="text-xs font-body font-bold text-secondary uppercase tracking-wider block">
                  {isHindi ? 'मार्ग 2: जंदरू / कढ़ियार की ओर से' : 'Route 2: Via Jandru / Kadhiyar'}
                </span>
                <div className="flex flex-wrap items-center gap-2 text-xs font-body font-semibold text-on-surface">
                  <span className="px-3 py-1.5 bg-surface-container rounded-xl border border-outline-variant/30">
                    {isHindi ? 'जंदरू / कढ़ियार' : 'Jandru / Kadhiyar'}
                  </span>
                  <span className="text-secondary font-bold">↓</span>
                  <span className="px-3 py-1.5 bg-secondary-fixed text-on-secondary-fixed rounded-xl font-bold">
                    {isHindi ? 'शीतला माता मंदिर' : 'Sheetla Mata Mandir'}
                  </span>
                  <span className="text-secondary font-bold">↓</span>
                  <span className="px-3 py-1.5 bg-primary-fixed text-on-primary-fixed rounded-xl font-bold">
                    Thakur General Store
                  </span>
                  <span className="text-secondary font-bold">↓</span>
                  <span className="px-3 py-1.5 bg-surface-container rounded-xl border border-outline-variant/30">
                    {isHindi ? 'उहल की ओर' : 'Towards Uhal'}
                  </span>
                  <span className="text-secondary font-bold">↓</span>
                  <span className="px-3 py-1.5 bg-primary-fixed text-on-primary-fixed rounded-xl font-bold">
                    Kashmir General Store
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Convenience Note */}
          <p className="text-center font-body text-xs text-on-surface-variant/80 italic max-w-2xl mx-auto pt-2">
            {isHindi
              ? 'श्रद्धालुओं की सुविधा के लिए इन नज़दीकी दुकानों की जानकारी दी गई है। प्रसाद, पूजा सामग्री एवं दुकान खुलने का समय उपलब्धता के अनुसार बदल सकता है।'
              : 'These nearby stores are listed for the convenience of devotees. Prasad, puja-item availability and opening hours may vary.'}
          </p>
        </div>

        {/* Grouping Visitor Assistance and Etiquette with smaller gap */}
        <div className="space-y-10">
          {/* Visitor Assistance & Essential Services */}
          <VisitorServicesSection />

          {/* Visitor Etiquette Rules */}
          <div className="bg-surface-container-low p-8 md:p-12 rounded-3xl border border-outline-variant/30 space-y-6">
            <div className="flex items-center gap-3 text-primary">
              <ShieldCheck className="w-6 h-6 text-secondary" />
              <h3 className="font-display font-bold text-2xl">{t.visitPage.etiquetteTitle}</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-body text-sm text-on-surface-variant">
              <div className="p-4 bg-surface-container-lowest rounded-2xl border border-outline-variant/20 flex gap-3 items-start">
                <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>{t.visitPage.etiquette1}</span>
              </div>
              <div className="p-4 bg-surface-container-lowest rounded-2xl border border-outline-variant/20 flex gap-3 items-start">
                <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>{t.visitPage.etiquette2}</span>
              </div>
              <div className="p-4 bg-surface-container-lowest rounded-2xl border border-outline-variant/20 flex gap-3 items-start">
                <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>{t.visitPage.etiquette3}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

