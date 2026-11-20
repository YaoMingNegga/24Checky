import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  Info
} from 'lucide-react';
import { MEMORIES } from '../data/memoriesData';

export default function VideoModal({ memory, onClose, onSelectMemory }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const videoRef = useRef(null);
  const containerRef = useRef(null);

  if (!memory) return null;

  const currentIndex = MEMORIES.findIndex((m) => m.id === memory.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < MEMORIES.length - 1;

  const handlePrev = (e) => {
    e.stopPropagation();
    if (hasPrev) onSelectMemory(MEMORIES[currentIndex - 1]);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    if (hasNext) onSelectMemory(MEMORIES[currentIndex + 1]);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onSelectMemory(MEMORIES[currentIndex - 1]);
      if (e.key === 'ArrowRight' && hasNext) onSelectMemory(MEMORIES[currentIndex + 1]);
      if (e.key === ' ') {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, hasPrev, hasNext]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [memory.id]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration || 0);
    }
  };

  const handleSeek = (e) => {
    const seekTo = parseFloat(e.target.value);
    setCurrentTime(seekTo);
    if (videoRef.current) {
      videoRef.current.currentTime = seekTo;
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => console.log(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        ref={containerRef}
        className="relative w-full max-w-4xl max-h-[94vh] flex flex-col border border-[#D8C7A5] bg-[#183B32] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-[#D8C7A5]/30 bg-[#1F4238] text-[#F5F0E6]">
          <div className="flex items-center gap-3">
            <span className="font-sans text-xs text-[#D8C7A5] uppercase tracking-wide-label font-semibold">
              Memory 0{currentIndex + 1} / 0{MEMORIES.length}
            </span>
            <span className="text-[#D8C7A5]/40">|</span>
            <h3 className="font-serif text-lg text-[#F5F0E6] truncate max-w-xs sm:max-w-md font-normal">
              {memory.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#D8C7A5] hover:text-[#F5F0E6] transition-colors"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Canvas Area */}
        <div className="relative flex-1 flex items-center justify-center bg-black min-h-[300px] max-h-[65vh]">
          <video
            ref={videoRef}
            src={memory.src}
            poster={memory.poster}
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
            onClick={togglePlay}
            className="max-h-[63vh] max-w-full object-contain cursor-pointer"
          />

          {/* Previous Video Nav */}
          {hasPrev && (
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-[#183B32]/90 hover:bg-[#D8C7A5] text-[#D8C7A5] hover:text-[#183B32] border border-[#D8C7A5]/40 transition-colors z-20"
              title="Previous Memory"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          )}

          {/* Next Video Nav */}
          {hasNext && (
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-[#183B32]/90 hover:bg-[#D8C7A5] text-[#D8C7A5] hover:text-[#183B32] border border-[#D8C7A5]/40 transition-colors z-20"
              title="Next Memory"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          )}

          {/* Center Play Overlay */}
          {!isPlaying && (
            <div
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
            >
              <div className="w-14 h-14 rounded-full border border-[#D8C7A5] bg-[#183B32]/90 text-[#F5F0E6] flex items-center justify-center">
                <Play className="w-6 h-6 fill-current ml-0.5" />
              </div>
            </div>
          )}
        </div>

        {/* Scrub & Controls Bar */}
        <div className="px-4 sm:px-6 py-3 bg-[#1F4238] border-t border-[#D8C7A5]/30 text-[#F5F0E6]">
          <div className="flex items-center gap-3 mb-2">
            <span className="font-sans text-xs text-[#D8C7A5]">
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              min="0"
              max={duration || 100}
              step="0.05"
              value={currentTime}
              onChange={handleSeek}
              className="flex-1 h-1 bg-[#183B32] rounded appearance-none cursor-pointer accent-[#D8C7A5]"
            />
            <span className="font-sans text-xs text-[#D8C7A5]">
              {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="p-1.5 text-[#D8C7A5] hover:text-[#F5F0E6] transition-colors"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
              </button>

              <button
                onClick={toggleMute}
                className="p-1.5 text-[#D8C7A5] hover:text-[#F5F0E6] transition-colors"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-[#E07A5F]" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <span className="text-xs font-sans text-[#D8C7A5]/80 hidden sm:inline">
                {memory.tag}
              </span>
            </div>

            <button
              onClick={toggleFullscreen}
              className="p-1.5 text-[#D8C7A5] hover:text-[#F5F0E6] transition-colors"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Details Footer */}
        <div className="px-4 sm:px-6 py-3 bg-[#183B32] border-t border-[#D8C7A5]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#D8C7A5]">
          <p className="font-serif italic text-sm text-[#F5F0E6]">
            "{memory.caption}"
          </p>
          <div className="flex items-center gap-1.5 font-sans text-[10px] text-[#D8C7A5]/80 shrink-0">
            <Info className="w-3.5 h-3.5 text-[#D8C7A5]" />
            <span>File: {memory.originalFile}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
