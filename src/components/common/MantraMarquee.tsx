import React from 'react';

const mantraText = "दधिहस्तां सुरभिं सुरूपाम् पीताम्बराभरणसर्वाङ्गीम् । वन्दे हांसितलारूढां देवीं शीतलां मनोरमाम् ॥";

export const MantraMarquee: React.FC = () => {
  return (
    <section 
      className="w-full px-6 max-w-[1240px] mx-auto relative z-20 my-4"
      aria-label="Sacred Dhyan Mantra"
    >
      <div className="flex flex-col items-center mb-1.5">
        <span className="font-hindi text-[10px] md:text-[11px] text-amber-800 font-bold tracking-[0.15em] opacity-90 uppercase">
          ॥ श्री शीतला माता ध्यान मंत्र ॥
        </span>
      </div>
      
      {/* Marquee Container - Sleek & Compact */}
      <div 
        className="w-full h-[46px] md:h-[50px] rounded-xl border border-slate-200/90 bg-white/80 backdrop-blur-md overflow-hidden flex items-center relative group shadow-2xs"
      >
        {/* Soft edge gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

        <div className="flex whitespace-nowrap items-center w-max animate-marquee group-hover:pause motion-reduce:animate-none">
          {[0, 1].map((blockIdx) => (
            <div key={blockIdx} className="flex items-center">
              {Array(4).fill(null).map((_, i) => (
                <React.Fragment key={`${blockIdx}-${i}`}>
                  <span className="mx-3 md:mx-4 text-sm md:text-base select-none" role="img" aria-label="lamp">🪔</span>
                  <span className="font-hindi text-[13px] md:text-[14px] font-medium text-slate-800 tracking-wide">
                    {mantraText}
                  </span>
                  <span className="mx-3 md:mx-4 text-amber-500 text-xs opacity-70 select-none" aria-hidden="true">✦</span>
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
