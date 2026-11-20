import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, RotateCcw, Cake, Heart } from 'lucide-react';
import { MEMORIES } from '../data/memoriesData';

export default function BirthdayWishes({ onReplayMemories, onOpenVideo }) {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [wishCount, setWishCount] = useState(0);

  const triggerEditorialConfetti = () => {
    // Rich celebratory palette matching Image 2: gold, champagne, beige, cream, white, forest green
    const count = 170;
    const defaults = {
      origin: { y: 0.75 },
      zIndex: 9999,
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
        colors: ['#D8C7A5', '#FFFFFF', '#F5F0E6', '#A7B5A0', '#183B32', '#F3E5AB'],
      });
    }

    fire(0.25, {
      spread: 30,
      startVelocity: 50,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.1,
    });
  };

  const handleBlowCandle = () => {
    setCandlesBlown(true);
    setWishCount((prev) => prev + 1);
    triggerEditorialConfetti();
  };

  return (
    <section id="birthday-wishes" className="py-24 sm:py-32 px-4 sm:px-8 md:px-12 bg-[#183B32]">
      <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Section Marker */}
        <span className="font-sans text-[11px] sm:text-xs uppercase tracking-wide-label text-[#A7B5A0] block mb-4 font-semibold">
          Section 05 • The Grand Finale
        </span>

        {/* Heading Exactly in Cormorant Garamond from Image 2 */}
        <h2 className="font-serif clamp-title text-[#FFFFFF] font-normal tracking-tight mb-4">
          And This Is Just <br />
          <span className="italic text-[#D8C7A5] font-light">
            Another Chapter...
          </span>
        </h2>

        {/* Subtitle Message Exactly as in Image 2 */}
        <p className="font-sans clamp-subtitle text-[#F5F0E6]/90 font-light max-w-2xl leading-relaxed mb-12">
          "Happy Birthday, Big Sis. Here's to more laughter, more adventures, more memories and countless beautiful moments ahead."
        </p>

        {/* Interactive Candle / Wish Module: EXACTLY matching Image 2, but with polished sans font */}
        <div className="w-full max-w-lg border border-[#D8C7A5]/40 bg-[#1F4238] p-6 sm:p-8 mb-16 shadow-card">
          <div className="flex items-center justify-center gap-2.5 mb-3">
            <Cake className="w-5 h-5 text-[#D8C7A5]" />
            <h3 className="font-serif text-xl sm:text-2xl text-[#FFFFFF] font-normal">
              Make A Birthday Wish
            </h3>
          </div>

          <p className="font-sans text-xs sm:text-sm text-[#A7B5A0] font-light mb-6">
            Close your eyes, make a wish for this beautiful year ahead, and tap to celebrate Cheky.
          </p>

          {/* Button matching Image 2: Warm Beige background with Dark Forest Green text, Clean Sans typography */}
          <button
            onClick={handleBlowCandle}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#D8C7A5] hover:bg-[#FFFFFF] text-[#183B32] font-sans text-xs uppercase tracking-wide-label font-semibold transition-colors shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-[#183B32]" />
            <span>{candlesBlown ? 'Send Another Golden Wish 🎆' : 'Blow Candles & Celebrate ✨'}</span>
          </button>

          {wishCount > 0 && (
            <p className="mt-4 font-sans text-xs text-[#D8C7A5] font-semibold tracking-wide">
              ✨ {wishCount} wish{wishCount > 1 ? 'es' : ''} sent to the stars!
            </p>
          )}
        </div>

        {/* Memory Mosaic with Crisp White Matted Photographic Frames */}
        <div className="w-full mb-16">
          <div className="flex items-center justify-between border-b border-[#D8C7A5]/30 pb-3 mb-6 text-left">
            <div>
              <span className="font-sans text-[10px] uppercase tracking-wide-label text-[#A7B5A0] font-semibold">
                Contact Sheet
              </span>
              <h4 className="font-serif text-lg sm:text-xl text-[#FFFFFF]">
                Every Chapter In Sequence
              </h4>
            </div>
            <span className="font-sans text-xs text-[#D8C7A5] font-semibold tracking-wider">
              All 8 Recordings
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {MEMORIES.map((m) => (
              <div
                key={m.id}
                onClick={() => onOpenVideo(m)}
                className="group relative aspect-[3/4] overflow-hidden bg-[#FFFFFF] p-1.5 border border-[#D8C7A5]/40 cursor-pointer hover:border-[#D8C7A5] hover:scale-102 transition-all shadow-md"
              >
                <div className="relative w-full h-full overflow-hidden bg-black">
                  <img
                    src={m.poster}
                    alt={m.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                  <div className="absolute bottom-2 inset-x-2 text-left">
                    <span className="font-sans text-[9px] text-[#D8C7A5] block font-semibold">
                      No. 0{m.id}
                    </span>
                    <p className="font-serif text-xs text-[#FFFFFF] truncate">
                      {m.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Replay Action */}
        <div className="flex flex-col items-center gap-6">
          <button
            onClick={onReplayMemories}
            className="inline-flex items-center gap-2.5 px-6 py-3 border border-[#D8C7A5] hover:bg-[#D8C7A5] text-[#D8C7A5] hover:text-[#183B32] font-sans text-xs uppercase tracking-wide-label font-semibold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Replay Tribute From Start</span>
          </button>

          <div className="flex flex-col items-center gap-1.5 mt-4 text-[#A7B5A0]">
            <Heart className="w-5 h-5 text-[#E07A5F]" />
            <p className="font-serif italic text-base text-[#FFFFFF]">
              Made with all my heart, for Cheky Check2 Gangmei.
            </p>
            <span className="font-sans text-[10px] text-[#D8C7A5] tracking-wide-label uppercase font-semibold">
              Happy 24th Birthday • Forever & Always
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
