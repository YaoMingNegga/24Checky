import React, { useRef, useEffect } from 'react';
import { Play, Compass, Sparkles } from 'lucide-react';
import { MEMORIES } from '../data/memoriesData';

export default function HeroSection({ onOpenVideo, onExploreClick }) {
  const featured = MEMORIES.find((m) => m.id === 7) || MEMORIES[0];
  const videoRef = useRef(null);
  const sectionRef = useRef(null);

  // Auto-play video when hero section reaches viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && videoRef.current) {
          videoRef.current
            .play()
            .catch((err) => console.log('Hero video autoplay error:', err));
        } else if (videoRef.current) {
          videoRef.current.pause();
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[90vh] flex items-center pt-24 sm:pt-28 pb-16 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto overflow-hidden bg-[#183B32]"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Editorial Typography in Cormorant Garamond */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Issue Eyebrow with Crisp White & Beige Contrast */}
          <div className="flex items-center gap-3 mb-6">
            <span className="font-sans text-[11px] sm:text-xs uppercase tracking-wide-label text-[#E9E0D0] font-medium bg-[#22483D] px-3 py-1 border border-[#D8C7A5]/30">
              Monograph No. 24 • Cheky Check2 Gangmei
            </span>
            <span className="w-8 h-px bg-[#D8C7A5]" />
            <span className="font-sans text-[11px] text-[#D8C7A5] font-semibold tracking-wider">24 Years</span>
          </div>

          {/* Headline in Cormorant Garamond with Crisp White & Gold */}
          <h1 className="font-serif clamp-title text-[#FFFFFF] font-normal tracking-tight mb-6">
            Another Year, <br />
            <span className="italic text-[#D8C7A5] font-light">
              A Thousand Memories.
            </span>
          </h1>

          {/* Subheading */}
          <p className="font-serif clamp-subtitle italic text-[#F5F0E6]/90 font-light max-w-xl leading-relaxed mb-6">
            "To the girl who made ordinary moments unforgettable."
          </p>

          <p className="font-sans text-xs sm:text-sm text-[#E9E0D0]/85 font-light max-w-lg leading-relaxed mb-10">
            Celebrating 24 years of quiet strength, boundless laughter, and unshakeable grace. A personal archive dedicated to Cheky, preserving all eight original recordings in their timeless, unedited beauty.
          </p>

          {/* Editorial Actions: Balanced Warm Beige & Crisp White */}
          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
            <button
              onClick={() => onOpenVideo(featured)}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-3 px-7 py-3.5 bg-[#D8C7A5] hover:bg-[#FFFFFF] text-[#183B32] font-sans text-xs uppercase tracking-wide-label font-semibold transition-colors shadow-editorial"
            >
              <Play className="w-3.5 h-3.5 fill-[#183B32]" />
              <span>Watch Featured Reel</span>
            </button>

            <button
              onClick={onExploreClick}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2.5 px-6 py-3.5 border border-[#FFFFFF]/40 text-[#FFFFFF] hover:border-[#D8C7A5] hover:text-[#D8C7A5] bg-[#22483D]/50 font-sans text-xs uppercase tracking-wide-label font-medium transition-colors"
            >
              <Compass className="w-3.5 h-3.5 text-[#D8C7A5]" />
              <span>Browse Archive</span>
            </button>
          </div>
        </div>

        {/* Right Column: Featured Video Frame with Crisp White Matted Border */}
        <div className="lg:col-span-5 w-full">
          <div
            onClick={() => onOpenVideo(featured)}
            className="group relative bg-[#FFFFFF] p-3 sm:p-3.5 border border-[#D8C7A5] cursor-pointer transition-all duration-300 hover:shadow-2xl shadow-card"
          >
            {/* Aspect container with autoplays video */}
            <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-black">
              <video
                ref={videoRef}
                src={featured.src}
                poster={featured.poster}
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 filter contrast-[1.02]"
              />

              {/* Minimal Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />

              {/* Play Badge */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border border-[#D8C7A5] bg-[#183B32]/90 text-[#FFFFFF] flex items-center justify-center group-hover:bg-[#183B32] group-hover:scale-105 transition-all shadow-md">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
              </div>

              {/* Tag Stamp */}
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-0.5 bg-[#183B32] text-[#FFFFFF] text-[10px] font-sans uppercase tracking-wide-label font-medium border border-[#D8C7A5]/40">
                  Featured Memory
                </span>
              </div>
            </div>

            {/* Museum Label Plate in Crisp White Paper Styling */}
            <div className="pt-3 pb-1 px-1 flex items-start justify-between text-left bg-white">
              <div>
                <p className="font-serif text-base sm:text-lg text-[#183B32] font-semibold leading-snug">
                  {featured.title}
                </p>
                <p className="font-sans text-xs text-[#526659] mt-0.5 font-medium">
                  {featured.category} • {featured.tag}
                </p>
              </div>
              <span className="font-sans text-xs text-[#183B32] font-bold shrink-0 ml-4">
                {featured.duration}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
