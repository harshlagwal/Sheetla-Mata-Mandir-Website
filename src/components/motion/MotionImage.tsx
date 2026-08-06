import React, { memo } from 'react';
import { motion, useReducedMotion, HTMLMotionProps } from 'framer-motion';

interface MotionImageProps extends HTMLMotionProps<"img"> {
  className?: string;
}

export const MotionImage = memo(({ className = '', ...props }: MotionImageProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.img
      className={className}
      initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '0px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      {...props}
    />
  );
});

MotionImage.displayName = 'MotionImage';
