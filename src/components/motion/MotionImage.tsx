import React, { memo } from 'react';
import { motion, useReducedMotion, HTMLMotionProps } from 'framer-motion';

interface MotionImageProps extends HTMLMotionProps<"img"> {
  className?: string;
}

export const MotionImage = memo(({ className = '', ...props }: MotionImageProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.img
      className={`will-change-[opacity,transform] ${className}`}
      initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      {...props}
    />
  );
});

MotionImage.displayName = 'MotionImage';

