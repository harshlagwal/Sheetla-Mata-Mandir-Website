import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface Stat {
  icon: React.ReactNode;
  label: string;
}

export interface AnimatedHikeCardProps {
  title: string;
  hindiTitle?: string;
  images: string[];
  stats: Stat[];
  description?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  badge?: string;
}

export const AnimatedHikeCard = React.forwardRef<
  HTMLDivElement,
  AnimatedHikeCardProps
>(({ title, hindiTitle, images, stats, description, href, onClick, className, badge }, ref) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  // Limit fanning preview to 3 images to match reference design perfectly
  const displayImages = images.slice(0, 3);

  return (
    <div
      ref={ref}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role={onClick || href ? "button" : undefined}
      tabIndex={onClick || href ? 0 : undefined}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && onClick) {
          e.preventDefault();
          onClick();
        }
      }}
      className={cn(
        "group relative block w-full cursor-pointer rounded-2xl border p-4 sm:p-6 transition-all duration-300 ease-out select-none",
        "bg-white/95 backdrop-blur-md border-slate-200/90 text-slate-900 shadow-sm",
        "hover:-translate-y-1.5 hover:shadow-xl hover:border-amber-400/60",
        className
      )}
      aria-label={`View details of ${title}`}
    >
      <div className="flex flex-col">
        {/* Card Header: Title & Action Arrow */}
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            {badge && (
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold bg-amber-500/10 text-amber-800 border border-amber-500/20 mb-1.5">
                {badge}
              </span>
            )}
            <h3 className="text-lg sm:text-2xl font-display font-bold text-slate-900 tracking-tight leading-snug group-hover:text-amber-800 transition-colors">
              {hindiTitle || title}
            </h3>
            {hindiTitle && hindiTitle !== title && (
              <span className="text-xs font-mono text-slate-500 font-medium block mt-0.5">
                {title}
              </span>
            )}
          </div>

          <div className="w-8 h-8 rounded-full border border-slate-200 bg-[#fdfbf9] flex items-center justify-center text-slate-600 group-hover:border-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-all shrink-0 mt-0.5 shadow-2xs">
            <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
          </div>
        </div>

        {/* Stacked Images: Gracefully fanned on mobile, wide interactive fan on desktop hover */}
        <div className="relative mb-6 h-36 sm:h-40 w-full">
          {displayImages.map((src, index) => {
            const targetX = isHovered ? index * 74 : index * 36;
            const targetRotate = isHovered
              ? (index === 0 ? -4 : index * 5 - 2)
              : (index === 0 ? -2 : index * 3 - 1);

            return (
              <motion.div
                key={index}
                initial={false}
                animate={{
                  x: targetX,
                  rotate: targetRotate,
                }}
                transition={{
                  type: "spring",
                  stiffness: 280,
                  damping: 24,
                  mass: 0.8,
                }}
                style={{
                  zIndex: displayImages.length - index,
                }}
                className={cn(
                  "absolute top-0 left-0 h-full w-[44%] sm:w-[42%] overflow-hidden rounded-xl border-2 border-white shadow-md",
                  isHovered && "shadow-xl"
                )}
              >
                <img
                  src={src}
                  alt={`${title} glimpse ${index + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            );
          })}
        </div>

        {/* Stats / Sacred Features Row */}
        <div className="mb-3.5 flex flex-wrap items-center gap-3 text-xs text-slate-600">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center gap-1.5 font-medium bg-[#fdfbf9] px-2.5 py-1 rounded-lg border border-slate-100">
              <span className="text-amber-700">{stat.icon}</span>
              <span className="font-sans text-[11.5px]">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Description */}
        {description && (
          <p className="text-xs sm:text-[13px] leading-relaxed text-slate-600 line-clamp-2">
            {description}
          </p>
        )}
      </div>
    </div>
  );
});

AnimatedHikeCard.displayName = "AnimatedHikeCard";

export default AnimatedHikeCard;
