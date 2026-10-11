import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Shield, Star, Compass, ArrowUpRight } from 'lucide-react';
import { sounds } from '../../lib/audio';
import { InteractiveHoverButton } from '../ui/interactive-hover-button';

interface HeroSectionProps {
  onExploreClick: () => void;
  onSelectProduct: (productId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick, onSelectProduct }) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth < 640 : false
  );

  const deckRef = useRef<HTMLDivElement>(null);
  const touchTimeoutRef = useRef<any>(null);
  const dragMovedRef = useRef<boolean>(false);
  const hoveredCardRef = useRef<number | null>(null);

  // Keep ref in sync for native event handlers
  useEffect(() => {
    hoveredCardRef.current = hoveredCard;
  }, [hoveredCard]);

  const heroCards = [
    {
      id: 'strawberry-milk-gloss',
      name: 'Strawberry Milk Edition',
      edition: 'EDITION 01',
      tag: '3D Strawberry & Milk Charms',
      image: '/images/strawberry_case_hero.png',
      price: '$32.99',
      badge: 'Sweet Treats',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
    },
    {
      id: 'bunny-cloud-hop',
      name: 'Cloud Bunny Hop Flagship',
      edition: 'EDITION 02 • FLAGSHIP',
      tag: 'Sculpted Bunny Ears + Pearl Wristlet',
      image: '/images/bunny_case_hero.png',
      price: '$34.99',
      badge: '★ Atelier Star',
      badgeColor: 'bg-[#1F1A1B] text-[#FFFDF9] border-[#3A3033]',
    },
    {
      id: 'boba-bear-hug',
      name: 'Boba Bear Hug Edition',
      edition: 'EDITION 03',
      tag: 'Honeycomb Rails + Boba Drops',
      image: '/images/boba_bear_hero.png',
      price: '$36.99',
      badge: 'Limited Run',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    },
  ];

  // Mathematical card selector based on touch coordinate relative to deck center
  const getCardIndexAtX = (clientX: number): number => {
    if (deckRef.current) {
      const rect = deckRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const xFromCenter = clientX - centerX;

      const spacing = isMobile ? 70 : 125;
      const threshold = spacing * 0.52;

      if (xFromCenter < -threshold) return 0;
      if (xFromCenter > threshold) return 2;
      return 1;
    }
    return 1;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 100);

    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', checkMobile);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
      if (touchTimeoutRef.current) clearTimeout(touchTimeoutRef.current);
    };
  }, []);

  // Native non-passive touch listeners for mobile screens to eliminate touch lag
  useEffect(() => {
    const deck = deckRef.current;
    if (!deck) return;

    let startX = 0;
    let startY = 0;
    let isHorizontalGesture = false;

    const onTouchStart = (e: TouchEvent) => {
      if (!e.touches || e.touches.length === 0) return;
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
      isHorizontalGesture = false;
      dragMovedRef.current = false;

      if (touchTimeoutRef.current) clearTimeout(touchTimeoutRef.current);

      const targetIdx = getCardIndexAtX(touch.clientX);
      if (hoveredCardRef.current !== targetIdx) {
        sounds.playPop();
      }
      setHoveredCard(targetIdx);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!e.touches || e.touches.length === 0) return;
      const touch = e.touches[0];
      const dx = Math.abs(touch.clientX - startX);
      const dy = Math.abs(touch.clientY - startY);

      if (dx > 7 || dy > 7) {
        dragMovedRef.current = true;
      }

      // If user is scrubbing horizontally across the phones, lock to prevent jarring vertical scrolls
      if (dx > dy && dx > 8) {
        isHorizontalGesture = true;
      }

      if (isHorizontalGesture && e.cancelable) {
        e.preventDefault();
      }

      const targetIdx = getCardIndexAtX(touch.clientX);
      if (hoveredCardRef.current !== targetIdx) {
        sounds.playPop();
        setHoveredCard(targetIdx);
      }
    };

    const onTouchEnd = () => {
      if (touchTimeoutRef.current) clearTimeout(touchTimeoutRef.current);
      // Keep the card proudly raised for 3.5 seconds so mobile user can inspect it
      touchTimeoutRef.current = setTimeout(() => {
        setHoveredCard(null);
      }, 3500);

      setTimeout(() => {
        dragMovedRef.current = false;
      }, 60);
    };

    deck.addEventListener('touchstart', onTouchStart, { passive: true });
    deck.addEventListener('touchmove', onTouchMove, { passive: false });
    deck.addEventListener('touchend', onTouchEnd, { passive: true });
    deck.addEventListener('touchcancel', onTouchEnd, { passive: true });

    return () => {
      deck.removeEventListener('touchstart', onTouchStart);
      deck.removeEventListener('touchmove', onTouchMove);
      deck.removeEventListener('touchend', onTouchEnd);
      deck.removeEventListener('touchcancel', onTouchEnd);
    };
  }, [isMobile]);

  return (
    <section id="hero" className="relative overflow-hidden pt-6 pb-14 lg:pt-10 lg:pb-18 bg-gradient-to-b from-[#FAF4ED] via-[#FDF2F4] to-[#FAF4ED] border-b border-[#E8DDD2]">
      
      {/* Ambient Petal Pink Radial Warmth Blurs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-[#F7D6DB]/40 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
        
        {/* Header Content Block */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          
          {/* Atelier Brand Tag Pill with Pink Accent */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full ceramic-pill text-[11px] font-semibold tracking-wider uppercase text-[#5C5455] mb-3.5 shadow-xs border border-[#E8DDD2]">
            <span className="w-2 h-2 rounded-full bg-[#C86D7A] animate-pulse" />
            <span className="text-[#1F1A1B]">Celliback Atelier</span>
            <span className="text-[#8A8182]">•</span>
            <span className="text-[#C86D7A] font-medium">Autumn 2026 Collection</span>
          </div>

          {/* High-Character Scaled Editorial Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#1F1A1B] tracking-tight leading-[1.12] mb-3 font-serif">
            Playful 3D forms meet{' '}
            <span className="italic font-serif text-[#C86D7A] font-normal">
              10ft protective armor.
            </span>
          </h1>

          {/* Neutral Body Description */}
          <p className="text-xs sm:text-sm text-[#5C5455] font-normal max-w-lg mx-auto leading-relaxed mb-5 font-sans">
            Molded from German Bayer polymers and finished with handcrafted 3D charms. Each protective case arrives with a complimentary pearl wristlet tether.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <InteractiveHoverButton
              text="Explore Collection"
              onClick={() => {
                sounds.playPop();
                onExploreClick();
              }}
              className="w-48 py-2.5 text-xs tracking-wide shadow-sm"
            />

            <a
              href="#boutiques"
              onClick={() => sounds.playPop()}
              className="px-5 py-2.5 rounded-full ceramic-pill hover:bg-white text-[#1F1A1B] font-medium text-xs tracking-wide transition-all duration-200 flex items-center gap-1.5 cursor-pointer border border-[#E8DDD2]"
            >
              <Compass className="w-3.5 h-3.5 text-[#C86D7A]" />
              <span>Flagship Shops</span>
            </a>
          </div>

          {/* Quality Proof Indicators */}
          <div className="flex items-center justify-center gap-5 mt-4 text-[11px] text-[#8A8182] font-medium">
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#C86D7A]" />
              <span>10ft Drop Certified</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>4.9 / 5.0 (4,200+ Reviews)</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C86D7A]" />
              <span>Free Keepsake Box</span>
            </span>
          </div>

        </div>

        {/* =========================================================================
            THE FANNED ATELIER EDITION PHONES (Staged Like 3 Cards in Hand)
            - Rises up smoothly on page start/load
            - Slightly rises up & un-tilts when hovered
            - Direct cutout packshots with realistic depth shadows
           ========================================================================= */}
        <div className="relative pt-4 pb-8 flex flex-col items-center justify-center">
          
          {/* Soft Grounding Ambient Light & Shadow */}
          <div className="absolute bottom-6 w-[80%] max-w-lg h-20 bg-gradient-to-t from-[#E88998]/30 via-[#F7D6DB]/40 to-transparent rounded-full blur-2xl -z-10 pointer-events-none" />

          {/* Fanned Deck Container with Native Touch Gesture Tracking */}
          <div
            ref={deckRef}
            onMouseMove={(e) => {
              const targetIdx = getCardIndexAtX(e.clientX);
              if (hoveredCard !== targetIdx) {
                sounds.playPop();
                setHoveredCard(targetIdx);
              }
            }}
            onMouseLeave={() => setHoveredCard(null)}
            style={{ touchAction: 'pan-y' }}
            className="relative h-[430px] sm:h-[490px] w-full max-w-2xl flex items-center justify-center select-none"
          >
            
            {heroCards.map((card, idx) => {
              const isHovered = hoveredCard === idx;
              const hasHoverOther = hoveredCard !== null && !isHovered;

              // Fan offsets calculation:
              // Left: idx === 0, Center: idx === 1, Right: idx === 2
              const xOffset = isMobile
                ? (idx === 0 ? -70 : idx === 1 ? 0 : 70)
                : (idx === 0 ? -125 : idx === 1 ? 0 : 125);

              const restingY = idx === 1 ? -14 : 14;
              const restingRotate = idx === 0 ? -8 : idx === 1 ? 0 : 8;
              const restingScale = idx === 1 ? 1.04 : 0.96;

              // Staggered entrance timing
              const entranceDelay = idx === 1 ? 40 : idx === 0 ? 120 : 200;

              // Calculate transforms:
              // When NOT mounted: start translated down by +80px with opacity 0
              // When hovered: rise up (-44px to -52px), straighten rotation, scale up
              // When another card hovered: settle back slightly (+8px), scale down (0.93)
              let currentX = xOffset;
              let currentY = restingY;
              let currentRotate = restingRotate;
              let currentScale = restingScale;
              let currentOpacity = 1;
              let zIndexClass = idx === 1 ? 'z-20' : 'z-10';

              if (!isMounted) {
                currentY = restingY + 80;
                currentScale = 0.9;
                currentOpacity = 0;
              } else if (isHovered) {
                zIndexClass = 'z-40';
                currentY = idx === 1 ? -52 : -44;
                currentRotate = idx === 0 ? -1.5 : idx === 1 ? 0 : 1.5;
                currentScale = isMobile ? 1.08 : (idx === 1 ? 1.12 : 1.08);
                currentX = idx === 0 ? xOffset - 12 : idx === 2 ? xOffset + 12 : xOffset;
              } else if (hasHoverOther) {
                currentY = restingY + 8;
                currentScale = restingScale * 0.93;
                currentOpacity = 0.85;
              }

              return (
                <div
                  key={card.id}
                  onClick={() => {
                    if (dragMovedRef.current) return;
                    sounds.playPop();
                    onSelectProduct(card.id);
                  }}
                  style={{
                    transform: `translate(${currentX}px, ${currentY}px) rotate(${currentRotate}deg) scale(${currentScale})`,
                    opacity: currentOpacity,
                    willChange: 'transform, opacity, filter',
                    transition: isMounted
                      ? 'transform 0.38s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease, filter 0.35s ease'
                      : `transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${entranceDelay}ms, opacity 0.75s ease-out ${entranceDelay}ms`,
                  }}
                  className={`absolute flex flex-col items-center cursor-pointer group ${zIndexClass}`}
                >
                  {/* Floating 3D Phone Case Cutout (Free-floating with Real Dropshadows) */}
                  <div className="relative flex items-center justify-center">
                    <img
                      src={card.image}
                      alt={`${card.name} Case Back`}
                      decoding="async"
                      draggable={false}
                      className="h-[290px] sm:h-[350px] md:h-[385px] w-auto max-w-none object-contain select-none pointer-events-none transition-all duration-300"
                      style={{
                        filter: isHovered
                          ? 'drop-shadow(0 24px 30px rgba(31, 26, 27, 0.24)) drop-shadow(0 0 24px rgba(232, 137, 152, 0.40))'
                          : 'drop-shadow(0 14px 18px rgba(31, 26, 27, 0.14)) drop-shadow(0 4px 8px rgba(200, 109, 122, 0.10))',
                        willChange: 'filter',
                      }}
                    />

                    {/* Floating Badge Tag on Phone Top (Appears cleanly on hover) */}
                    <div className={`absolute top-2 px-2.5 py-0.5 rounded-full text-[9px] font-mono tracking-wider uppercase border shadow-md transition-all duration-300 pointer-events-none ${
                      isHovered
                        ? 'opacity-100 translate-y-0 scale-100'
                        : 'opacity-0 -translate-y-2 scale-90'
                    } ${card.badgeColor}`}>
                      {card.badge}
                    </div>
                  </div>

                  {/* Interactive Frosted Ceramic Capsule Pill Beneath Phone Case */}
                  <div className={`mt-2 px-3 py-1.5 rounded-full backdrop-blur-md border transition-all duration-300 flex items-center justify-between gap-2.5 max-w-[200px] shadow-sm ${
                    isHovered
                      ? 'bg-white border-[#C86D7A] ring-2 ring-[#C86D7A]/30 scale-105 shadow-xl'
                      : 'bg-[#FFFDF9]/95 border-[#E8DDD2] group-hover:border-[#E88998]'
                  }`}>
                    <div className="flex flex-col text-left overflow-hidden">
                      <span className="text-[11px] font-semibold text-[#1F1A1B] font-display truncate leading-tight">
                        {card.name}
                      </span>
                      <span className="text-[10px] font-mono font-medium text-[#C86D7A]">
                        {card.price}
                      </span>
                    </div>

                    <span className={`text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-0.5 shrink-0 transition-colors ${
                      isHovered
                        ? 'bg-[#1F1A1B] text-[#FFFDF9]'
                        : 'bg-[#FDF2F4] text-[#C86D7A]'
                    }`}>
                      <span>Inspect</span>
                      <ArrowUpRight className="w-2.5 h-2.5" />
                    </span>
                  </div>

                </div>
              );
            })}

          </div>

          {/* Mobile Tactile Edition Selector Chips (Allows 1-Tap Switching on Phones) */}
          <div className="flex sm:hidden items-center justify-center gap-2 mt-4 relative z-30">
            {heroCards.map((card, idx) => {
              const isSelected = hoveredCard === idx;
              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    sounds.playPop();
                    setHoveredCard(idx);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#1F1A1B] text-[#FFFDF9] border-[#1F1A1B] shadow-md scale-105'
                      : 'bg-white/90 text-[#5C5455] border-[#E8DDD2] hover:border-[#E88998]'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-[#E88998]' : 'bg-[#C86D7A]/50'}`} />
                  <span>{idx === 0 ? 'Strawberry' : idx === 1 ? 'Cloud Bunny' : 'Boba Bear'}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Guidance Underneath Staging */}
          <p className="text-[11px] font-mono text-[#8A8182] mt-3 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C86D7A] animate-pulse" />
            <span className="hidden sm:inline">Interactive Handcrafted Editions • Hover phones to inspect • Click to customize</span>
            <span className="sm:hidden">Swipe or tap editions to inspect 3D relief • Tap to customize</span>
          </p>

        </div>

      </div>
    </section>
  );
};

