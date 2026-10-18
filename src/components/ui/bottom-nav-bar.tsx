import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home,
  Sparkles,
  Landmark,
  Calendar,
  Clock,
  HeartHandshake,
  LucideIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "../../context/LanguageContext";

export interface BottomNavItem {
  label: string;
  hindiLabel?: string;
  icon: LucideIcon;
  href?: string;
  onClick?: () => void;
}

const DEFAULT_TEMPLE_NAV_ITEMS: BottomNavItem[] = [
  { label: "Home", hindiLabel: "मुख्य पृष्ठ", icon: Home, href: "/" },
  { label: "Darshan", hindiLabel: "दर्शन", icon: Sparkles, href: "/gallery" },
  { label: "About", hindiLabel: "इतिहास", icon: Landmark, href: "/about" },
  { label: "Festivals", hindiLabel: "उत्सव", icon: Calendar, href: "/festivals" },
  { label: "Visit", hindiLabel: "समय", icon: Clock, href: "/visit" },
  { label: "Seva", hindiLabel: "दान", icon: HeartHandshake, href: "/donate" },
];

const MOBILE_LABEL_WIDTH = 76;

export type BottomNavBarProps = {
  className?: string;
  defaultIndex?: number;
  stickyBottom?: boolean;
  items?: BottomNavItem[];
};

export function BottomNavBar({
  className,
  defaultIndex = 0,
  stickyBottom = true,
  items = DEFAULT_TEMPLE_NAV_ITEMS,
}: BottomNavBarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { isHindi } = useLanguage();

  // Find initial index matching current route
  const getInitialIndex = () => {
    const routeIndex = items.findIndex((item) => item.href === location.pathname);
    return routeIndex;
  };

  const [activeIndex, setActiveIndex] = useState<number>(getInitialIndex);

  // Sync active index with router navigation
  useEffect(() => {
    const routeIndex = items.findIndex((item) => item.href === location.pathname);
    setActiveIndex(routeIndex);
  }, [location.pathname, items]);

  const handleSelect = (idx: number, item: BottomNavItem) => {
    setActiveIndex(idx);
    if (item.onClick) {
      item.onClick();
    } else if (item.href) {
      navigate(item.href);
    }
  };

  return (
    <motion.nav
      initial={{ scale: 0.92, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 320, damping: 28 }}
      role="navigation"
      aria-label="Temple Quick Navigation"
      className={cn(
        // Ultra-premium frosted glassmorphism styling
        "relative flex items-center p-1.5 rounded-full space-x-1 h-[56px]",
        "bg-slate-950/75 dark:bg-slate-950/80",
        "backdrop-blur-2xl backdrop-saturate-150",
        "border border-white/20 dark:border-white/15",
        "shadow-[0_12px_40px_rgba(0,0,0,0.45),0_0_0_1px_rgba(245,158,11,0.12)]",
        stickyBottom && "fixed inset-x-0 bottom-4 sm:bottom-6 mx-auto z-40 w-fit max-w-[95vw]",
        className
      )}
      style={{
        WebkitBackdropFilter: "blur(20px) saturate(160%)",
      }}
    >
      {/* Ambient sacred glow under current pill */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none opacity-40"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.15) 0%, transparent 70%)"
        }}
      />

      {items.map((item, idx) => {
        const Icon = item.icon;
        const isActive = activeIndex === idx;
        const displayLabel = isHindi && item.hindiLabel ? item.hindiLabel : item.label;

        return (
          <motion.button
            key={item.label}
            whileTap={{ scale: 0.94 }}
            className={cn(
              "flex items-center gap-0 px-2 sm:px-3 py-2 rounded-full transition-all duration-300 relative h-10 min-w-[38px] sm:min-w-[42px] min-h-[40px] max-h-[42px] select-none",
              isActive
                ? "bg-gradient-to-r from-amber-500/25 to-amber-600/20 text-amber-300 font-semibold border border-amber-400/40 shadow-[0_2px_12px_rgba(245,158,11,0.25)] gap-1.5 sm:gap-2"
                : "bg-transparent text-slate-300/80 hover:text-white hover:bg-white/10 border border-transparent",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50"
            )}
            onClick={() => handleSelect(idx, item)}
            aria-label={displayLabel}
            type="button"
          >
            <Icon
              size={19}
              strokeWidth={isActive ? 2.25 : 1.85}
              aria-hidden
              className={cn(
                "transition-all duration-300 shrink-0",
                isActive ? "text-amber-300 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]" : "text-slate-300/90"
              )}
            />

            <motion.div
              initial={false}
              animate={{
                width: isActive ? `${MOBILE_LABEL_WIDTH}px` : "0px",
                opacity: isActive ? 1 : 0,
                marginLeft: isActive ? "5px" : "0px",
              }}
              transition={{
                width: { type: "spring", stiffness: 360, damping: 30 },
                opacity: { duration: 0.2 },
                marginLeft: { duration: 0.2 },
              }}
              className="overflow-hidden flex items-center max-w-[80px]"
            >
              <span
                className={cn(
                  "font-medium text-xs whitespace-nowrap overflow-hidden text-ellipsis leading-tight tracking-tight",
                  isActive ? "text-amber-200 drop-shadow-sm" : "opacity-0"
                )}
                title={displayLabel}
              >
                {displayLabel}
              </span>
            </motion.div>
          </motion.button>
        );
      })}
    </motion.nav>
  );
}

export default BottomNavBar;
