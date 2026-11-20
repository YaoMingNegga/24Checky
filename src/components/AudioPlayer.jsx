import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react';
import { AUDIO_TRACKS } from '../data/memoriesData';

export default function AudioPlayer({ isAutoPlayRequested, isVideoPlaying }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.65);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [needsGesturePrompt, setNeedsGesturePrompt] = useState(false);

  const audioRef = useRef(null);
  const track = AUDIO_TRACKS[0];

  // Duck audio smoothly when video plays
  useEffect(() => {
    if (!audioRef.current) return;
    if (isVideoPlaying) {
      audioRef.current.volume = 0.12;
    } else {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [isVideoPlaying, isMuted, volume]);

  // Attempt play after opening slipcase
  useEffect(() => {
    if (isAutoPlayRequested && audioRef.current && !hasUserInteracted) {
      setHasUserInteracted(true);
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setNeedsGesturePrompt(false);
          })
          .catch((err) => {
            console.log('Autoplay blocked by browser policy:', err);
            setIsPlaying(false);
            setNeedsGesturePrompt(true);
          });
      }
    }
  }, [isAutoPlayRequested, hasUserInteracted]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setNeedsGesturePrompt(false);
        })
        .catch((e) => console.log('Audio play error:', e));
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.muted = false;
      setIsMuted(false);
      audioRef.current.volume = volume;
    } else {
      audioRef.current.muted = true;
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
      setIsMuted(newVol === 0);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={track.src}
        loop
        preload="auto"
        onEnded={() => setIsPlaying(false)}
      />

      {/* One-tap fallback toast if browser blocked initial sound */}
      {needsGesturePrompt && (
        <div className="fixed top-20 inset-x-4 max-w-sm mx-auto z-50">
          <button
            onClick={togglePlay}
            className="w-full flex items-center justify-between px-4 py-3 bg-[#1F4238] border border-[#D8C7A5] text-[#F5F0E6] text-xs font-sans tracking-wide-label uppercase font-medium shadow-editorial"
          >
            <div className="flex items-center gap-2">
              <Music className="w-4 h-4 text-[#D8C7A5]" />
              <span>Tap to enable background soundtrack</span>
            </div>
            <span className="text-[#D8C7A5] uppercase font-bold text-[10px]">Play 🎵</span>
          </button>
        </div>
      )}

      {/* Persistent Floating Music Controller in Forest Green & Warm Beige */}
      <aside aria-label="Background Soundtrack" className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
        <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 bg-[#183B32]/95 backdrop-blur-md border border-[#D8C7A5]/35 text-[#F5F0E6] shadow-card">
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="w-8 h-8 rounded-full border border-[#D8C7A5]/50 flex items-center justify-center text-[#D8C7A5] hover:bg-[#1F4238] transition-colors"
            title={isPlaying ? 'Pause Soundtrack' : 'Play Soundtrack'}
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 fill-[#D8C7A5]" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-[#D8C7A5] ml-0.5" />
            )}
          </button>

          {/* Song Details in Cormorant Garamond / Sans */}
          <div
            className="cursor-pointer max-w-[120px] sm:max-w-[160px]"
            onClick={() => setShowVolumeSlider(!showVolumeSlider)}
          >
            <p className="text-[12px] sm:text-[13px] font-serif text-[#F5F0E6] truncate font-medium">
              {track.title}
            </p>
            <p className="text-[10px] text-[#D8C7A5] font-sans tracking-wide truncate">
              {track.artist}
            </p>
          </div>

          {/* Sound Bars Indicator */}
          <div className="flex items-end gap-0.5 h-3 mx-1">
            {[45, 90, 60, 100, 50].map((h, i) => (
              <span
                key={i}
                className={`w-0.5 bg-[#D8C7A5] transition-all duration-300 ${
                  isPlaying ? 'opacity-90' : 'opacity-30'
                }`}
                style={{
                  height: isPlaying ? `${h}%` : '25%',
                }}
              />
            ))}
          </div>

          {/* Mute Button */}
          <button
            onClick={toggleMute}
            className="p-1 text-[#D8C7A5]/80 hover:text-[#F5F0E6] transition-colors"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-[#E07A5F]" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Expandable volume slider */}
          {showVolumeSlider && (
            <div className="flex items-center pl-2 border-l border-[#D8C7A5]/30">
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-16 h-1 bg-[#1F4238] rounded appearance-none cursor-pointer accent-[#D8C7A5]"
              />
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
