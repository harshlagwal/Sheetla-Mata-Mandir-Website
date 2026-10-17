import React from 'react';
import { motion, useReducedMotion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'liquid-black';
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
  
  const baseStyle =
    'inline-flex items-center justify-center font-google font-semibold rounded-full transition-all duration-300 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

  const sizeStyles = {
    sm: 'px-4 py-1.5 text-xs gap-1.5',
    md: 'px-6 py-2.5 text-sm gap-2',
    lg: 'px-8 py-3.5 text-base gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 hover:from-slate-700 hover:to-slate-900 text-white backdrop-blur-xl border border-slate-700/60 shadow-[0_4px_16px_rgba(15,23,42,0.22),inset_0_1.5px_1px_rgba(255,255,255,0.12),inset_0_-1px_1px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_28px_rgba(15,23,42,0.38),inset_0_1.5px_1px_rgba(255,255,255,0.15)] hover:text-amber-200',
    'liquid-black':
      'bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 hover:from-slate-700 hover:to-slate-900 text-white backdrop-blur-xl border border-slate-700/60 shadow-[0_4px_16px_rgba(15,23,42,0.22),inset_0_1.5px_1px_rgba(255,255,255,0.12),inset_0_-1px_1px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_28px_rgba(15,23,42,0.38),inset_0_1.5px_1px_rgba(255,255,255,0.15)] hover:text-amber-200',
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
