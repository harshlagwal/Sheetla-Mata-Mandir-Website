import React, { memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface MotionCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const MotionCard = memo(({ children, className = '', onClick }: MotionCardProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      onClick={onClick}
      whileHover={
        !shouldReduceMotion
          ? {
              y: -5,
              scale: 1.01,
              boxShadow: '0 20px 35px -12px rgba(87, 0, 0, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.05)',
            }
          : undefined
      }
      whileTap={
        !shouldReduceMotion
          ? {
              scale: 0.985,
            }
          : undefined
      }
      transition={{
        type: 'spring',
        stiffness: 380,
        damping: 26,
        mass: 0.7,
      }}
    >
      {children}
    </motion.div>
  );
});

MotionCard.displayName = 'MotionCard';

