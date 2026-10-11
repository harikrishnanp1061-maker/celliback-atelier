import React, { useState, useEffect } from 'react';
import { ShoppingBag, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { sounds } from '../../lib/audio';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart }) => {
  const [isBgmPlaying, setIsBgmPlaying] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    sounds.enableAudioAutoStart(setIsBgmPlaying);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleBgm = () => {
    const newState = sounds.toggleBgm(setIsBgmPlaying);
    setIsBgmPlaying(newState);
    sounds.playPop();
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Refined Atelier Announcement Banner */}
      <div className="bg-[#ECE5DC] text-[#1F1A1B] text-xs font-medium py-1.5 px-4 text-center tracking-wide flex items-center justify-center gap-2 border-b border-[#E5DBD0]">
        <Sparkles className="w-3.5 h-3.5 text-[#C86D7A]" />
        <span>Complimentary bespoke charm wristlet & tactile sticker kit with every autumn order</span>
        <span className="hidden md:inline text-[#8A8182]">• Worldwide Atelier Dispatch</span>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F6F2EC]/95 backdrop-blur-md shadow-sm border-b border-[#E5DBD0] py-3'
            : 'bg-[#F6F2EC]/80 backdrop-blur-sm border-b border-[#E5DBD0]/70 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo & Atelier Signet */}
          <a
            href="#"
            onClick={() => sounds.playPop()}
            className="flex items-center gap-2.5 group cursor-pointer focus:outline-none"
          >
            <div className="w-8 h-8 rounded-xl bg-[#1F1A1B] flex items-center justify-center text-[#FFFDF9] font-serif text-base shadow-xs group-hover:scale-105 transition-transform duration-200">
              <span>C</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-normal tracking-tight text-[#1F1A1B] flex items-center gap-1 font-serif">
                Celliback
                <span className="w-1.5 h-1.5 rounded-full bg-[#C86D7A] inline-block" />
              </span>
              <span className="text-[9px] font-semibold tracking-widest text-[#8A8182] uppercase -mt-0.5 font-mono">
                Atelier • Tokyo / NYC
              </span>
            </div>
          </a>

          {/* Center Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-[#5C5455]">
            <a
              href="#collection"
              onClick={() => sounds.playPop()}
              className="hover:text-[#1F1A1B] transition-colors py-1 flex items-center gap-1.5"
            >
              <span>Editions</span>
              <span className="text-[10px] text-[#C86D7A] font-mono">03</span>
            </a>
            <a
              href="#features"
              onClick={() => sounds.playPop()}
              className="hover:text-[#1F1A1B] transition-colors py-1"
            >
              Armor Engineering
            </a>
            <a
              href="#lifestyle"
              onClick={() => sounds.playPop()}
              className="hover:text-[#1F1A1B] transition-colors py-1"
            >
              In The Wild
            </a>
            <a
              href="#boutiques"
              onClick={() => sounds.playPop()}
              className="hover:text-[#1F1A1B] transition-colors py-1 flex items-center gap-1.5"
            >
              <span>Boutiques</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </a>
            <a
              href="#contact"
              onClick={() => sounds.playPop()}
              className="hover:text-[#1F1A1B] transition-colors py-1"
            >
              Concierge
            </a>
          </div>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-3">
            
            {/* Music Radio Toggle Pill */}
            <button
              onClick={handleToggleBgm}
              className={`flex items-center gap-2 text-xs font-medium px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer focus:outline-none ${
                isBgmPlaying
                  ? 'bg-[#1F1A1B] text-[#FFFDF9] shadow-xs'
                  : 'ceramic-pill text-[#5C5455] hover:text-[#1F1A1B] hover:bg-white'
              }`}
              title={isBgmPlaying ? 'Pause Ambient Sound' : 'Play Ambient Lo-fi Chime'}
            >
              {isBgmPlaying ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#C86D7A]" />
                  <span className="hidden sm:inline text-xs">Atelier Sound</span>
                  <div className="flex items-end gap-0.5 h-2.5">
                    <span className="w-0.5 bg-[#C86D7A] h-2 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-0.5 bg-[#C86D7A] h-2.5 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-0.5 bg-[#C86D7A] h-1.5 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-[#8A8182]" />
                  <span className="hidden sm:inline text-xs">Sound Off</span>
                </>
              )}
            </button>

            {/* Shopping Bag Trigger Button */}
            <button
              onClick={() => {
                sounds.playPop();
                onOpenCart();
              }}
              className="relative p-2.5 rounded-full ceramic-pill hover:bg-white text-[#1F1A1B] transition-all duration-200 cursor-pointer shadow-xs hover:scale-105 focus:outline-none"
              aria-label="View Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 text-[#1F1A1B]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-[#C86D7A] text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

          </div>
        </div>
      </nav>
    </header>
  );
};
