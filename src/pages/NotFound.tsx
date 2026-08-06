import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Home as HomeIcon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const NotFound: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="min-h-[75vh] pt-32 pb-20 flex items-center justify-center px-margin-mobile text-center">
      <div className="max-w-md mx-auto space-y-6 bg-surface-container-lowest p-10 rounded-3xl border border-outline-variant/30 shadow-xl">
        <span className="font-hindi text-3xl text-secondary font-bold tracking-widest block">
          {t.jaiMataDi}
        </span>

        <h1 className="font-display text-6xl font-bold text-primary">404</h1>

        <h2 className="font-display font-bold text-2xl text-on-surface">Page Not Found</h2>

        <p className="font-body text-sm text-on-surface-variant leading-relaxed">
          The requested page or sacred path could not be found. Please return to the homepage.
        </p>

        <div className="pt-4">
          <Button
            variant="primary"
            size="md"
            onClick={() => navigate('/')}
            icon={<HomeIcon className="w-4 h-4" />}
          >
            Return to Main Page
          </Button>
        </div>
      </div>
    </div>
  );
};
