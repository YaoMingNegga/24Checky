import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Tv
} from 'lucide-react';
import { MEMORIES } from '../data/memoriesData';

export default function CinematicThrowback({ onVideoActive }) {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isCinemaMode, setIsCinemaMode] = useState(true);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [transitioning, setTransitioning] = useState(false);

  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const currentChapter = MEMORIES[currentChapterIndex];

  // Notify parent if video is currently playing with sound (ducks bg music)
  useEffect(() => {
    if (onVideoActive) {
      onVideoActive(isPlaying && !isMuted);
    }
  }, [isPlaying, isMuted, onVideoActive]);

  // Autoplay video when user reaches this section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && videoRef.current) {
          videoRef.current
            .play()
            .then(() => setIsPlaying(true))
            .catch((err) => console.log('Documentary autoplay error:', err));
        } else if (videoRef.current && !entry.isIntersecting) {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [currentChapterIndex]);

  const changeChapter = (index) => {
    if (index < 0 || index >= MEMORIES.length) return;
    setTransitioning(true);
    setTimeout(() => {
      setCurrentChapterIndex(index);
      setTransitioning(false);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }, 300);
  };

  const handleEnded = () => {
    if (autoAdvance) {
      if (currentChapterIndex < MEMORIES.length - 1) {
        changeChapter(currentChapterIndex + 1);
      } else {
        changeChapter(0);
      }
    } else {
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  return (
    <section
      id="cinematic-throwback"
      ref={sectionRef}
      className="py-24 sm:py-32 px-4 sm:px-8 md:px-12 bg-[#142D26] border-y border-[#D8C7A5]/20"
    >
      <div className="max-w-6xl mx-auto">
        {/* Editorial Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-sans text-[11px] sm:text-xs uppercase tracking-wide-label text-[#A7B5A0] block mb-3 font-medium">
            Section 03 • Screening Room
          </span>
          <h2 className="font-serif clamp-heading text-[#F5F0E6] font-normal tracking-tight mb-4">
            Can We Go Back <br />
            <span className="italic text-[#D8C7A5] font-light">
              For A Moment?
            </span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#A7B5A0] font-light leading-relaxed">
            A curated documentary sequence celebrating the journey, frame by frame. Plays automatically as you arrive.
          </p>
        </div>

        {/* Screening Box: Deep Forest Green with Warm Beige details */}
        <div className="border border-[#D8C7A5]/30 bg-[#183B32] p-2.5 sm:p-4 shadow-editorial">
          {/* Cinema Frame */}
          <div
            className={`relative w-full overflow-hidden bg-black transition-all duration-500 flex items-center justify-center ${
              isCinemaMode ? 'aspect-[2.2/1] sm:aspect-[2.35/1]' : 'aspect-[16/9]'
            }`}
          >
            {/* Ambient Blurred Video Background */}
            <video
              src={currentChapter.src}
              poster={currentChapter.poster}
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover filter blur-lg opacity-25 scale-105 pointer-events-none"
            />

            {/* Main Video Viewport (Autoplays on scroll) */}
            <video
              ref={videoRef}
              key={currentChapter.id}
              src={currentChapter.src}
              poster={currentChapter.poster}
              playsInline
              muted={isMuted}
              onEnded={handleEnded}
              onClick={togglePlay}
              className={`relative z-10 max-h-full max-w-full object-contain cursor-pointer transition-opacity duration-300 ${
                transitioning ? 'opacity-0' : 'opacity-100'
              }`}
            />

            {/* Optional Cinema Bars */}
            {isCinemaMode && (
              <>
                <div className="absolute top-0 inset-x-0 h-4 sm:h-8 bg-black/95 z-20 pointer-events-none border-b border-[#D8C7A5]/20" />
                <div className="absolute bottom-0 inset-x-0 h-4 sm:h-8 bg-black/95 z-20 pointer-events-none border-t border-[#D8C7A5]/20" />
              </>
            )}

            {/* Play Overlay if explicitly paused */}
            {!isPlaying && (
              <div
                onClick={togglePlay}
                className="absolute inset-0 z-30 flex items-center justify-center bg-black/25 cursor-pointer"
              >
                <div className="w-14 h-14 rounded-full border border-[#D8C7A5] bg-[#183B32]/90 text-[#F5F0E6] flex items-center justify-center hover:bg-[#D8C7A5] hover:text-[#183B32] transition-colors">
                  <Play className="w-6 h-6 fill-current ml-0.5" />
                </div>
              </div>
            )}

            {/* Chapter Stamp */}
            <div className="absolute top-3 sm:top-10 left-4 sm:left-6 z-20 pointer-events-none">
              <span className="font-sans text-[10px] uppercase tracking-wide-label text-[#D8C7A5] font-semibold">
                Chapter 0{currentChapterIndex + 1} / 0{MEMORIES.length}
              </span>
              <h4 className="font-serif text-sm sm:text-2xl text-[#F5F0E6] font-normal drop-shadow">
                {currentChapter.title}
              </h4>
            </div>

            {/* One-Tap Sound Pill on Video */}
            <div className="absolute top-3 sm:top-10 right-4 sm:right-6 z-30">
              <button
                onClick={toggleMute}
                className="flex items-center gap-1.5 px-3 py-1 bg-black/75 hover:bg-[#D8C7A5] text-[#D8C7A5] hover:text-[#183B32] border border-[#D8C7A5]/50 font-sans text-[11px] font-medium tracking-wider uppercase transition-colors shadow-sm"
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-[#E07A5F]" />
                    <span>Unmute Video</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Video Sound On</span>
                  </>
                )}
              </button>
            </div>

            {/* Quote Plate */}
            <div className="absolute bottom-3 sm:bottom-10 right-4 sm:right-6 z-20 pointer-events-none text-right">
              <p className="font-serif italic text-xs sm:text-base text-[#F5F0E6]/95 drop-shadow">
                "{currentChapter.highlight}"
              </p>
            </div>
          </div>

          {/* Transport Controls in Clean Sans */}
          <div className="mt-3 px-3 py-2.5 bg-[#1F4238] border border-[#D8C7A5]/25 flex flex-wrap items-center justify-between gap-3 text-[#F5F0E6]">
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => changeChapter(currentChapterIndex - 1)}
                disabled={currentChapterIndex === 0}
                className="p-1.5 text-[#D8C7A5]/70 hover:text-[#F5F0E6] disabled:opacity-30 transition-colors"
                title="Previous Chapter"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                onClick={togglePlay}
                className="w-8 h-8 rounded-full border border-[#D8C7A5] bg-[#183B32] text-[#D8C7A5] flex items-center justify-center hover:bg-[#D8C7A5] hover:text-[#183B32] transition-colors"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
              </button>

              <button
                onClick={() => changeChapter(currentChapterIndex + 1)}
                disabled={currentChapterIndex === MEMORIES.length - 1}
                className="p-1.5 text-[#D8C7A5]/70 hover:text-[#F5F0E6] disabled:opacity-30 transition-colors"
                title="Next Chapter"
              >
                <SkipForward className="w-4 h-4" />
              </button>

              <button
                onClick={toggleMute}
                className="p-1.5 text-[#D8C7A5]/80 hover:text-[#F5F0E6] transition-colors ml-1"
                title={isMuted ? 'Unmute Video Audio' : 'Mute Video Audio'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-[#E07A5F]" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <span className="font-sans text-xs text-[#D8C7A5]/80 hidden sm:inline">
                {currentChapter.duration}
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs font-sans tracking-wider uppercase">
              <button
                onClick={() => setAutoAdvance(!autoAdvance)}
                className={`transition-colors ${autoAdvance ? 'text-[#D8C7A5] font-semibold' : 'text-[#A7B5A0]'}`}
              >
                Auto-Advance: {autoAdvance ? 'ON' : 'OFF'}
              </button>

              <button
                onClick={() => setIsCinemaMode(!isCinemaMode)}
                className="flex items-center gap-1 text-[#A7B5A0] hover:text-[#F5F0E6] transition-colors"
              >
                <Tv className="w-3.5 h-3.5" />
                <span>{isCinemaMode ? '2.35:1' : '16:9'}</span>
              </button>
            </div>
          </div>

          {/* Chapter Strip */}
          <div className="mt-3 pt-3 border-t border-[#D8C7A5]/20">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {MEMORIES.map((m, idx) => {
                const isActive = idx === currentChapterIndex;
                return (
                  <button
                    key={m.id}
                    onClick={() => changeChapter(idx)}
                    className={`relative shrink-0 w-24 sm:w-28 aspect-[16/10] overflow-hidden border transition-all ${
                      isActive
                        ? 'border-[#D8C7A5] ring-1 ring-[#D8C7A5]'
                        : 'border-[#D8C7A5]/20 opacity-50 hover:opacity-90'
                    }`}
                  >
                    <img
                      src={m.poster}
                      alt={m.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-1 right-1 px-1 bg-black/80 font-sans text-[9px] text-[#D8C7A5] font-semibold">
                      0{idx + 1}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
