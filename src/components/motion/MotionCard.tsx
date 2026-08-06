import React, { memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface MotionCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const MotionCard = memo(({ children, className = '', onClick }: MotionCardProps) => {
  const shouldReduceMotion = useReducedMotion();

  // On mobile, hover doesn't apply well, and we want to disable this specific scale/shadow on mobile anyway.
  // Framer Motion's whileHover triggers on desktop hover.
  return (
    <motion.div
      className={className}
      onClick={onClick}
      whileHover={
        !shouldReduceMotion
          ? {
              y: -6,
              scale: 1.01,
              boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)',
            }
          : undefined
      }
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
});

MotionCard.displayName = 'MotionCard';
