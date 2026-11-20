import React, { useState, useRef, useEffect } from 'react';
import { Play, Clock } from 'lucide-react';
import { MEMORIES } from '../data/memoriesData';

function MemoryCard({ item, onOpenVideo }) {
  const videoRef = useRef(null);
  const cardRef = useRef(null);
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && videoRef.current) {
          videoRef.current
            .play()
            .then(() => setIsPlayingPreview(true))
            .catch(() => {});
        } else if (videoRef.current) {
          videoRef.current.pause();
          setIsPlayingPreview(false);
        }
      },
      { threshold: 0.4 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current
        .play()
        .then(() => setIsPlayingPreview(true))
        .catch(() => {});
    }
  };

  return (
    <article
      ref={cardRef}
      onClick={() => onOpenVideo(item)}
      onMouseEnter={handleMouseEnter}
      className="group flex flex-col justify-between border border-[#D9CBB2] bg-[#FFFFFF] hover:border-[#183B32] hover:shadow-xl transition-all duration-300 cursor-pointer p-3.5 shadow-sm"
    >
      {/* Visual Container */}
      <div className="relative aspect-[9/14] sm:aspect-[9/15] overflow-hidden bg-black mb-3.5">
        <video
          ref={videoRef}
          src={item.src}
          poster={item.poster}
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
        />

        {/* Minimal Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10" />

        {/* Top Meta Bar */}
        <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between text-[10px] font-sans z-10">
          <span className="px-2 py-0.5 bg-[#183B32] text-[#FFFFFF] border border-[#D8C7A5]/40 tracking-wider uppercase font-semibold">
            No. 0{item.id}
          </span>
          <span className="flex items-center gap-1 text-[#FFFFFF] bg-black/60 px-2 py-0.5 font-medium">
            <Clock className="w-3 h-3 text-[#D8C7A5]" />
            {item.duration}
          </span>
        </div>

        {/* Play Badge Overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div
            className={`w-11 h-11 rounded-full border border-[#D8C7A5] bg-[#183B32]/90 text-[#FFFFFF] flex items-center justify-center group-hover:bg-[#183B32] group-hover:scale-105 transition-all duration-300 shadow-md ${
              isPlayingPreview ? 'opacity-90 scale-95' : 'opacity-100 scale-100'
            }`}
          >
            <Play className="w-4 h-4 fill-current ml-0.5" />
          </div>
        </div>

        {/* Quote Stamp */}
        <div className="absolute bottom-2.5 inset-x-2.5 text-left z-10">
          <p className="font-serif italic text-xs text-[#FFFFFF] line-clamp-2 drop-shadow">
            "{item.highlight}"
          </p>
        </div>
      </div>

      {/* Typography & Editorial Details on Crisp White Card */}
      <div className="text-left pt-1 flex flex-col justify-between flex-1">
        <div>
          <span className="font-sans text-[10px] uppercase tracking-wide-label text-[#526659] block mb-1 font-semibold">
            {item.category}
          </span>
          <h3 className="font-serif text-lg text-[#183B32] font-semibold leading-snug group-hover:text-[#34483A] transition-colors">
            {item.title}
          </h3>
          <p className="font-sans text-xs text-[#292D27]/80 font-light mt-1.5 line-clamp-2 leading-relaxed">
            {item.caption}
          </p>
        </div>

        <div className="mt-3.5 pt-2 border-t border-[#E5DEC9] flex items-center justify-between text-[10px] font-sans text-[#526659]">
          <span className="font-medium">RAW RECORDING</span>
          <span className="truncate max-w-[130px] font-mono text-[9px] text-[#8C734B]">{item.originalFile}</span>
        </div>
      </div>
    </article>
  );
}

export default function MemoryLane({ onOpenVideo }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    'All',
    'The Beautiful Moments',
    'The Random Adventures',
    'The Laughs & Chaos',
    'The Memories We\'ll Never Forget',
  ];

  const filtered =
    activeCategory === 'All'
      ? MEMORIES
      : MEMORIES.filter((m) => m.category === activeCategory);

  return (
    <section id="memory-lane" className="py-24 sm:py-32 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto bg-[#FAF8F5]">
      {/* Section Header on Gallery White Backdrop */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#D9CBB2] pb-8 mb-12">
        <div>
          <span className="font-sans text-[11px] sm:text-xs uppercase tracking-wide-label text-[#526659] block mb-3 font-semibold">
            Section 02 • The Archive
          </span>
          <h2 className="font-serif clamp-heading text-[#183B32] font-normal tracking-tight">
            Little Moments, <br />
            <span className="italic text-[#8C734B] font-light">
              Forever Memories.
            </span>
          </h2>
        </div>

        <p className="font-sans text-xs sm:text-sm text-[#292D27]/80 font-light max-w-md mt-4 md:mt-0 leading-relaxed">
          Every laugh, every journey, every spontaneous smile captured in time. 
          All eight original video recordings auto-play as you arrive at each memory.
        </p>
      </div>

      {/* Category Text Filters in Clean Dark Forest Green */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-12 border-b border-[#D9CBB2] pb-4">
        {categories.map((cat) => {
          const isSelected = activeCategory === cat;
          const count =
            cat === 'All'
              ? MEMORIES.length
              : MEMORIES.filter((m) => m.category === cat).length;

          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-sans text-xs sm:text-sm uppercase tracking-wide-label transition-all relative py-1 ${
                isSelected
                  ? 'text-[#183B32] font-bold'
                  : 'text-[#526659] hover:text-[#183B32]'
              }`}
            >
              <span>{cat}</span>
              <span className="text-[10px] ml-1 text-[#8C734B]">
                ({count})
              </span>
              {isSelected && (
                <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#183B32]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Editorial Grid with Autoplay when Reached */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {filtered.map((item) => (
          <MemoryCard
            key={item.id}
            item={item}
            onOpenVideo={onOpenVideo}
          />
        ))}
      </div>
    </section>
  );
}
