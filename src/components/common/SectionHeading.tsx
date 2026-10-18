import React from 'react';

interface SectionHeadingProps {
  tag?: string;
  title: string;
  hindiTitle?: string;
  subtitle?: string;
  centered?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  tag,
  title,
  hindiTitle,
  subtitle,
  centered = true,
}) => {
  return (
    <div className={`flex flex-col mb-12 ${centered ? 'items-center text-center' : 'items-start text-left'}`}>
      {tag && (
        <span className="font-body text-xs font-bold text-secondary tracking-[0.2em] uppercase mb-2">
          {tag}
        </span>
      )}
      <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary leading-tight">
        {title}
      </h2>
      {hindiTitle && (
        <span className="font-hindi text-xl md:text-2xl text-tertiary font-semibold mt-1">
          {hindiTitle}
        </span>
      )}
      
      {/* Decorative Divider */}
      <div className={`flex items-center gap-3 my-4 ${centered ? 'justify-center' : 'justify-start'} opacity-80 w-full max-w-xs`}>
        <div className="h-px bg-outline-variant flex-1"></div>
        <div className="w-2.5 h-2.5 rotate-45 bg-secondary shrink-0"></div>
        <div className="h-px bg-outline-variant flex-1"></div>
      </div>

      {subtitle && (
        <p className="font-body text-base md:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
