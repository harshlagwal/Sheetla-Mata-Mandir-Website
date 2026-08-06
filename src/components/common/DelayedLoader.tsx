import React, { useState, useEffect } from 'react';
import { TempleLoader } from './TempleLoader';

interface DelayedLoaderProps {
  delay?: number;
}

export const DelayedLoader: React.FC<DelayedLoaderProps> = ({ delay = 150 }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!show) return null;

  return <TempleLoader onFinish={() => {}} />;
};
