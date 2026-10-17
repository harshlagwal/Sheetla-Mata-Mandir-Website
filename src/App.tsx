import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/common/ScrollToTop';
import { TempleLoader } from './components/common/TempleLoader';
import { PageTransition } from './components/motion/PageTransition';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { BottomNavBar } from './components/ui/bottom-nav-bar';

import { lazy, Suspense } from 'react';
import { DelayedLoader } from './components/common/DelayedLoader';

const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const MataSheetla = lazy(() => import('./pages/MataSheetla').then(m => ({ default: m.MataSheetla })));
const Gallery = lazy(() => import('./pages/Gallery').then(m => ({ default: m.Gallery })));
const Festivals = lazy(() => import('./pages/Festivals').then(m => ({ default: m.Festivals })));
const Village = lazy(() => import('./pages/Village').then(m => ({ default: m.Village })));
const Visit = lazy(() => import('./pages/Visit').then(m => ({ default: m.Visit })));
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));
const Donate = lazy(() => import('./pages/Donate').then(m => ({ default: m.Donate })));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy').then(m => ({ default: m.PrivacyPolicy })));
const TermsOfService = lazy(() => import('./pages/TermsOfService').then(m => ({ default: m.TermsOfService })));
const NotFound = lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound })));

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<DelayedLoader delay={150} />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/mata-sheetla" element={<PageTransition><MataSheetla /></PageTransition>} />
          <Route path="/gallery" element={<PageTransition><Gallery /></PageTransition>} />
          <Route path="/festivals" element={<PageTransition><Festivals /></PageTransition>} />
          <Route path="/village" element={<PageTransition><Village /></PageTransition>} />
          <Route path="/visit" element={<PageTransition><Visit /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          <Route path="/donate" element={<PageTransition><Donate /></PageTransition>} />
          <Route path="/privacy-policy" element={<PageTransition><PrivacyPolicy /></PageTransition>} />
          <Route path="/terms-of-service" element={<PageTransition><TermsOfService /></PageTransition>} />
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export function App() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  return (
    <LanguageProvider>
      {isInitialLoading && (
        <TempleLoader onFinish={() => setIsInitialLoading(false)} />
      )}
      <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col justify-between bg-surface font-body text-on-surface">
          <Navbar />
          <main className="flex-grow flex flex-col pb-6 xl:pb-0">
            <AnimatedRoutes />
          </main>
          <BottomNavBar stickyBottom className="flex xl:hidden" />
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
