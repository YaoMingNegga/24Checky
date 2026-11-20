import React, { useState, useEffect } from 'react';
import { Sparkles, Volume2 } from 'lucide-react';

export default function SurpriseOpening({ onEnter }) {
  const [step, setStep] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 1400);
    const t2 = setTimeout(() => setStep(2), 2800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handleEnterClick = () => {
    setIsExiting(true);
    setTimeout(() => {
      onEnter();
    }, 800);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#183B32] px-4 sm:px-8 transition-opacity duration-700 ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Editorial Hairline Frame in warm beige */}
      <div className="absolute inset-4 sm:inset-8 border border-[#D8C7A5]/25 pointer-events-none" />

      <div className="relative z-10 max-w-xl w-full mx-auto text-center flex flex-col items-center py-12">
        {/* Subtle Editorial Monogram */}
        <div className="mb-6">
          <span className="font-sans text-[11px] sm:text-xs uppercase tracking-wide-label text-[#A7B5A0] font-medium">
            Dedicated to Cheky Check2 Gangmei • 24 Years
          </span>
        </div>

        {/* First Line in Cormorant Garamond */}
        <p
          className={`font-serif italic text-2xl sm:text-3xl text-[#D8C7A5] tracking-wide mb-3 transition-all duration-700 ${
            step >= 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          To My Favourite Person...
        </p>

        {/* Main Title Reveal */}
        <h1
          className={`font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-[#F5F0E6] tracking-tight leading-tight mb-4 transition-all duration-700 ${
            step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Happy Birthday, <br />
          <span className="italic font-light text-[#D8C7A5]">Big Sis</span>{' '}
          <span className="text-[#E07A5F] text-3xl sm:text-5xl inline-block align-middle">
            ❤️
          </span>
        </h1>

        {/* Name Stamp */}
        <div
          className={`mb-6 transition-all duration-700 ${
            step >= 1 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span className="font-sans text-xs uppercase tracking-wide-label text-[#A7B5A0] bg-[#1F4238] px-3.5 py-1 border border-[#D8C7A5]/30">
            Cheky Gangmei • Chapter 24
          </span>
        </div>

        {/* Subtitle */}
        <p
          className={`font-sans text-sm sm:text-base text-[#F5F0E6]/85 font-light max-w-md mx-auto leading-relaxed mb-10 transition-all duration-700 ${
            step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          "Some memories never fade. Some people make life beautiful. You're both."
        </p>

        {/* Action Button: Warm Beige with Forest Green text */}
        <div
          className={`transition-all duration-700 ${
            step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <button
            onClick={handleEnterClick}
            className="group inline-flex items-center gap-3 px-8 py-3.5 bg-[#D8C7A5] hover:bg-[#F5F0E6] text-[#183B32] font-sans text-xs sm:text-sm uppercase tracking-wide-label font-semibold transition-all duration-300 shadow-editorial active:scale-98"
          >
            <span>ENTER YOUR MEMORIES</span>
            <Sparkles className="w-4 h-4 text-[#183B32] group-hover:rotate-12 transition-transform" />
          </button>

          <p className="mt-4 text-[11px] text-[#A7B5A0] tracking-wide font-sans flex items-center justify-center gap-1.5">
            <Volume2 className="w-3.5 h-3.5 text-[#D8C7A5]" />
            Includes background soundtrack (turn sound on)
          </p>
        </div>
      </div>
    </div>
  );
}
