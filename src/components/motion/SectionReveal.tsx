import React, { memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
}

export const SectionReveal = memo(({ children, className = '', id, delay = 0 }: SectionRevealProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1, margin: '0px 0px -40px 0px' }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.section>
  );
});

SectionReveal.displayName = 'SectionReveal';

