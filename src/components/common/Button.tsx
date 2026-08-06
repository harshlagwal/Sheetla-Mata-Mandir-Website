import React from 'react';
import { motion, useReducedMotion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  ...props
}) => {
  const shouldReduceMotion = useReducedMotion();
  
  // Removed active:scale-95 from baseStyle because framer-motion handles it via whileTap
  const baseStyle =
    'inline-flex items-center justify-center font-body font-semibold rounded-full transition-colors duration-300 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeStyles = {
    sm: 'px-4 py-1.5 text-xs gap-1.5',
    md: 'px-6 py-2.5 text-sm gap-2',
    lg: 'px-8 py-3.5 text-base gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-secondary text-on-secondary hover:bg-secondary-container hover:text-on-secondary-container',
    secondary:
      'bg-primary-container text-on-primary hover:bg-primary hover:text-on-primary',
    accent:
      'bg-tertiary-container text-on-tertiary-container hover:bg-tertiary hover:text-on-tertiary',
    ghost:
      'border border-outline-variant text-on-surface hover:bg-surface-container-high hover:border-primary',
  };

  return (
    <motion.button
      className={`${baseStyle} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
      whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </motion.button>
  );
};
