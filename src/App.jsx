import React, { useState, useEffect } from 'react';
import SurpriseOpening from './components/SurpriseOpening';
import AudioPlayer from './components/AudioPlayer';
import HeroSection from './components/HeroSection';
import MemoryLane from './components/MemoryLane';
import VideoModal from './components/VideoModal';
import CinematicThrowback from './components/CinematicThrowback';
import TheLetter from './components/TheLetter';
import BirthdayWishes from './components/BirthdayWishes';
import { Menu, X, Compass, Film, Mail, Heart } from 'lucide-react';
import { MEMORIES } from './data/memoriesData';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [selectedModalMemory, setSelectedModalMemory] = useState(null);
  const [isVideoAudioActive, setIsVideoAudioActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleEnterMemories = () => {
    setHasEntered(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenVideoModal = (memory) => {
    setSelectedModalMemory(memory);
    setIsVideoAudioActive(true);
  };

  const handleCloseVideoModal = () => {
    setSelectedModalMemory(null);
    setIsVideoAudioActive(false);
  };

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#183B32] text-[#F5F0E6] font-sans overflow-x-hidden relative selection:bg-[#D8C7A5]/30 selection:text-[#F5F0E6]">
      {/* Opening Full-Screen Surprise Slipcase */}
      {!hasEntered && (
        <SurpriseOpening onEnter={handleEnterMemories} />
      )}

      {/* Persistent Audio Controller */}
      <AudioPlayer
        isAutoPlayRequested={hasEntered}
        isVideoPlaying={isVideoAudioActive}
      />

      {/* Editorial Navigation Header in Forest Green with Clean Sans Navigation */}
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#183B32]/95 backdrop-blur-md border-b border-[#D8C7A5]/25 py-3 shadow-editorial text-[#F5F0E6]'
            : 'bg-[#183B32] border-b border-[#D8C7A5]/20 py-4 sm:py-5 text-[#F5F0E6]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 flex items-center justify-between">
          {/* Logo / Personal Dedication */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="cursor-pointer group flex items-center gap-2.5"
          >
            <span className="w-2.5 h-2.5 bg-[#D8C7A5] inline-block" />
            <div>
              <span className="font-serif text-base sm:text-lg tracking-wide text-[#F5F0E6] block group-hover:text-[#D8C7A5] transition-colors">
                Cheky Check2 Gangmei
              </span>
              <span className="font-sans text-[9px] uppercase tracking-wide-label text-[#A7B5A0] block font-medium">
                Celebrating 24 Years • Big Sis
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links in Clean Sans Font (NOT monospace) */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-sans tracking-wide-label uppercase text-[#D8C7A5] font-medium">
            <button
              onClick={() => scrollToSection('memory-lane')}
              className="hover:text-[#F5F0E6] transition-colors"
            >
              Archive ({MEMORIES.length})
            </button>
            <button
              onClick={() => scrollToSection('cinematic-throwback')}
              className="hover:text-[#F5F0E6] transition-colors"
            >
              Cinema Reel
            </button>
            <button
              onClick={() => scrollToSection('the-letter')}
              className="hover:text-[#F5F0E6] transition-colors"
            >
              The Letter
            </button>
            <button
              onClick={() => scrollToSection('birthday-wishes')}
              className="hover:text-[#F5F0E6] transition-colors"
            >
              The Wish
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 text-[#F5F0E6] hover:text-[#D8C7A5] touch-target flex items-center justify-center border border-[#D8C7A5]/35 bg-[#1F4238]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#183B32] border-b border-[#D8C7A5]/30 px-6 py-6 animate-fadeIn">
            <nav className="flex flex-col gap-4 font-sans text-xs uppercase tracking-wide-label text-[#D8C7A5] font-medium">
              <button
                onClick={() => scrollToSection('memory-lane')}
                className="text-left py-2 hover:text-[#F5F0E6] flex items-center justify-between border-b border-[#D8C7A5]/15"
              >
                <span>The Archive (All 8 Memories)</span>
                <Compass className="w-4 h-4 text-[#D8C7A5]" />
              </button>
              <button
                onClick={() => scrollToSection('cinematic-throwback')}
                className="text-left py-2 hover:text-[#F5F0E6] flex items-center justify-between border-b border-[#D8C7A5]/15"
              >
                <span>Cinema Reel Documentary</span>
                <Film className="w-4 h-4 text-[#D8C7A5]" />
              </button>
              <button
                onClick={() => scrollToSection('the-letter')}
                className="text-left py-2 hover:text-[#F5F0E6] flex items-center justify-between border-b border-[#D8C7A5]/15"
              >
                <span>The Handwritten Letter</span>
                <Mail className="w-4 h-4 text-[#D8C7A5]" />
              </button>
              <button
                onClick={() => scrollToSection('birthday-wishes')}
                className="text-left py-2 hover:text-[#F5F0E6] flex items-center justify-between"
              >
                <span>The Birthday Wish</span>
                <Heart className="w-4 h-4 text-[#E07A5F]" />
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content Sections on Rich Forest Green #183B32 */}
      <main className="bg-[#183B32]">
        <HeroSection
          onOpenVideo={handleOpenVideoModal}
          onExploreClick={() => scrollToSection('memory-lane')}
        />

        <div className="editorial-rule my-8" />

        <MemoryLane
          onOpenVideo={handleOpenVideoModal}
        />

        <CinematicThrowback
          onVideoActive={(active) => setIsVideoAudioActive(active)}
        />

        <TheLetter />

        <BirthdayWishes
          onReplayMemories={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setHasEntered(false);
          }}
          onOpenVideo={handleOpenVideoModal}
        />
      </main>

      {/* Video Modal Player */}
      {selectedModalMemory && (
        <VideoModal
          memory={selectedModalMemory}
          onClose={handleCloseVideoModal}
          onSelectMemory={(m) => setSelectedModalMemory(m)}
        />
      )}

      {/* Editorial Colophon / Footer */}
      <footer className="py-12 px-4 text-center font-sans text-[11px] text-[#A7B5A0] bg-[#142D26] border-t border-[#D8C7A5]/20">
        <p className="tracking-wide-label uppercase mb-1 font-medium">
          A Timeless Birthday • Dedicated to Cheky Check2 Gangmei (Chapter 24)
        </p>
        <p className="text-[#D8C7A5]/70 font-light">
          Crafted with love, patience, and gratitude for my big sister.
        </p>
      </footer>
    </div>
  );
}
