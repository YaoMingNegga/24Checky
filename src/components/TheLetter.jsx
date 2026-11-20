import React, { useState, useEffect, useRef } from 'react';
import { RefreshCw, Heart } from 'lucide-react';

export default function TheLetter() {
  const [revealedChars, setRevealedChars] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const sectionRef = useRef(null);

  const letterLines = [
    "Happy Birthday, Big Sis!",
    "",
    "I don't think I say it enough, but I'm genuinely lucky to have you in my life.",
    "",
    "From all the random moments and silly memories to the little things that somehow become unforgettable, every moment with you means something special.",
    "",
    "No matter how much time passes or how much life changes, you'll always be someone incredibly important to me.",
    "",
    "I hope this new chapter brings you happiness, peace, success and everything your heart wishes for.",
    "",
    "Keep smiling, keep being yourself, and never forget how special you are.",
    "",
    "Love you, Big Sis. ❤️"
  ];

  const fullLetterText = letterLines.join('\n');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasTriggered) {
          setHasTriggered(true);
          startTyping();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasTriggered]);

  const startTyping = () => {
    setIsTyping(true);
    setRevealedChars(0);
    let index = 0;
    const interval = setInterval(() => {
      index += 3;
      if (index >= fullLetterText.length) {
        setRevealedChars(fullLetterText.length);
        setIsTyping(false);
        clearInterval(interval);
      } else {
        setRevealedChars(index);
      }
    }, 18);
  };

  const displayedText = fullLetterText.slice(0, revealedChars);

  return (
    <section
      id="the-letter"
      ref={sectionRef}
      className="py-24 sm:py-32 px-4 sm:px-8 md:px-12 relative bg-[#F7F4EC] border-y border-[#D9CBB2]"
    >
      <div className="max-w-3xl mx-auto text-left">
        {/* Editorial Eyebrow in Clean Sans */}
        <div className="flex items-center justify-between border-b border-[#D8C7A5] pb-4 mb-10">
          <span className="font-sans text-[11px] sm:text-xs uppercase tracking-wide-label text-[#526659] font-semibold">
            Section 04 • Archival Letter
          </span>
          <span className="font-sans text-xs text-[#183B32] font-semibold tracking-wider">
            To Cheky Check2 Gangmei • Chapter 24
          </span>
        </div>

        {/* Section Heading in Cormorant Garamond */}
        <h2 className="font-serif clamp-heading text-[#183B32] font-normal tracking-tight mb-8">
          A Little Something <br />
          <span className="italic font-light text-[#8C734B]">From Me...</span>
        </h2>

        {/* Letter Body on Luxury Crisp Ivory Archival Parchment with #292D27 Ink */}
        <div className="bg-[#FFFFFF] border border-[#D9CBB2] p-6 sm:p-12 md:p-14 shadow-md relative">
          {/* Subtle corner registration ticks */}
          <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-[#8C734B]" />
          <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-[#8C734B]" />
          <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-[#8C734B]" />
          <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-[#8C734B]" />

          {/* Letter Content in Cormorant Garamond */}
          <div className="font-serif text-lg sm:text-2xl text-[#292D27] leading-relaxed whitespace-pre-line tracking-wide font-normal">
            {displayedText}
            {isTyping && (
              <span className="inline-block w-2 h-5 bg-[#183B32] animate-pulse ml-1 align-middle" />
            )}
          </div>

          {/* Bottom Note & Replay in Clean Sans */}
          <div className="mt-12 pt-6 border-t border-[#E5DEC9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-sans text-xs text-[#292D27]/80">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#B85D43] fill-current" />
              <span className="italic font-serif text-base text-[#183B32] font-medium">
                Forever your biggest cheerleader, Cheky.
              </span>
            </div>

            <button
              onClick={startTyping}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#183B32] hover:bg-[#264E43] text-[#FFFFFF] text-xs font-sans tracking-wide-label uppercase font-semibold transition-colors shadow-sm"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#D8C7A5]" />
              <span>Replay Typing Effect</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
