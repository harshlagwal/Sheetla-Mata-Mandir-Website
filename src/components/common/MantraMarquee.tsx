import React from 'react';

const mantraText = "दधिहस्तां सुरभिं सुरूपाम् पीताम्बराभरणसर्वाङ्गीम् । वन्दे हांसितलारूढां देवीं शीतलां मनोरमाम् ॥";

export const MantraMarquee: React.FC = () => {
  return (
    <section 
      className="w-full px-margin-mobile lg:px-margin-desktop max-w-container-max mx-auto relative z-20 mb-8"
      aria-label="Sacred Dhyan Mantra"
    >
      <div className="flex flex-col items-center mb-2 md:mb-3">
        <span className="font-hindi text-[11px] md:text-xs text-primary font-bold tracking-[0.1em] opacity-80 uppercase">
          ॥ श्री शीतला माता ध्यान मंत्र ॥
        </span>
      </div>
      
      {/* Marquee Container */}
      <div 
        className="w-full h-[55px] md:h-[65px] rounded-[16px] border border-[#e2bfb9]/40 bg-gradient-to-r from-[#FFF9F2] via-[#FFFDF9] to-[#FFF9F2] overflow-hidden flex items-center relative group"
        style={{
          boxShadow: '0 4px 20px rgba(87, 0, 0, 0.04)'
        }}
      >
        {/* Soft edge gradients for seamless fade effect (optional, looks premium) */}
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-[#FFF9F2] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-[#FFF9F2] to-transparent z-10 pointer-events-none"></div>

        <div className="flex whitespace-nowrap items-center w-max animate-marquee group-hover:pause motion-reduce:animate-none">
          {/* We render the content block twice to enable seamless infinite scrolling */}
          {[0, 1].map((blockIdx) => (
            <div key={blockIdx} className="flex items-center">
              {/* Inside each block, we repeat the mantra multiple times */}
              {Array(4).fill(null).map((_, i) => (
                <React.Fragment key={`${blockIdx}-${i}`}>
                  <span className="mx-4 md:mx-6 text-lg md:text-xl" role="img" aria-label="lamp">🪔</span>
                  <span className="font-hindi text-[15px] md:text-[18px] font-[500] text-primary tracking-[0.03em] pb-1">
                    {mantraText}
                  </span>
                  <span className="mx-4 md:mx-6 text-[#cba72f] text-sm md:text-base opacity-80" aria-hidden="true">✦</span>
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
