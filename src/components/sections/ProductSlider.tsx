import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, Sparkles, Heart } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { sounds } from '../../lib/audio';

interface ProductSliderProps {
  onSelectProduct: (productId: string) => void;
}

export const ProductSlider: React.FC<ProductSliderProps> = ({ onSelectProduct }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [wishlist, setWishlist] = useState<string[]>([]);
  const sliderRef = useRef<HTMLDivElement>(null);

  const categories = ['All', 'Bunnies', 'Sweet Treats', 'Ribbons & Bows', 'Floral'];

  const filteredProducts = selectedCategory === 'All'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === selectedCategory);

  const scroll = (direction: 'left' | 'right') => {
    sounds.playPop();
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playPop();
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="collection" className="py-14 lg:py-18 relative overflow-hidden bg-[#F4ECE3] texture-pinstripe border-b border-[#E5DBD0]">
      
      {/* Decorative Ribbon Accent Line at Top of Section */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#E88998]/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FCECEF] border border-[#F7D6DB] text-xs font-semibold tracking-wider uppercase text-[#C86D7A] mb-2.5">
              <Sparkles className="w-3 h-3 text-[#C86D7A]" />
              <span>Autumn 2026 Editions</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-[#1F1A1B] tracking-tight leading-snug font-serif">
              The Celliback Gallery.{' '}
              <span className="italic text-[#C86D7A] font-normal">
                Sculpted phone case backs.
              </span>
            </h2>
            
            <p className="text-xs sm:text-sm text-[#5C5455] mt-1.5 max-w-lg font-normal leading-relaxed">
              Tap any piece to inspect 3D relief thickness, corner shock airbags, and select your phone model.
            </p>
          </div>

          {/* Slider Arrow Controls */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={() => scroll('left')}
              className="p-2.5 rounded-full ceramic-pill hover:bg-white text-[#1F1A1B] transition-all duration-200 cursor-pointer shadow-xs hover:scale-105 focus:outline-none"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2.5 rounded-full ceramic-pill hover:bg-white text-[#1F1A1B] transition-all duration-200 cursor-pointer shadow-xs hover:scale-105 focus:outline-none"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  sounds.playPop();
                  setSelectedCategory(cat);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 whitespace-nowrap cursor-pointer focus:outline-none ${
                  isActive
                    ? 'bg-[#1F1A1B] text-[#FFFDF9] shadow-xs scale-[1.02]'
                    : 'bg-[#FFFDF9] text-[#5C5455] border border-[#E8DDD2] hover:border-[#E88998] hover:text-[#C86D7A]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Horizontal Carousel Slider with Compact Proportions */}
        <div
          ref={sliderRef}
          className="flex items-stretch gap-5 overflow-x-auto pb-6 pt-1 scroll-smooth no-scrollbar snap-x snap-mandatory"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
            overscrollBehaviorX: 'contain',
          }}
        >
          {filteredProducts.map((product) => {
            const isWishlisted = wishlist.includes(product.id);
            return (
              <div
                key={product.id}
                onClick={() => {
                  sounds.playPop();
                  onSelectProduct(product.id);
                }}
                className="snap-start shrink-0 w-[240px] sm:w-[270px] ceramic-panel rounded-2xl p-4 flex flex-col justify-between group cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:border-[#E88998] hover:shadow-lg relative"
              >
                {/* Product Badge */}
                {product.badge && (
                  <div className="absolute top-3 left-3 z-10 px-2.5 py-0.5 rounded-full bg-[#1F1A1B] text-[#FFFDF9] text-[9px] font-mono tracking-wider uppercase shadow-xs">
                    {product.badge}
                  </div>
                )}

                {/* Wishlist Heart Icon */}
                <button
                  onClick={(e) => toggleWishlist(product.id, e)}
                  className={`absolute top-3 right-3 z-10 p-1.5 rounded-full ceramic-pill transition-colors shadow-xs ${
                    isWishlisted ? 'text-[#C86D7A]' : 'text-[#8A8182] hover:text-[#C86D7A]'
                  }`}
                  aria-label="Save to wishlist"
                >
                  <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-[#C86D7A]' : ''}`} />
                </button>

                {/* Packshot Image Container showing the Back of Case with Blurred Depth Shadow */}
                <div className="relative aspect-square rounded-xl overflow-hidden inner-case-well flex items-center justify-center p-2.5 mb-3 group-hover:border-[#E88998]/60 transition-colors duration-300">
                  <img
                    src={product.image}
                    alt={`${product.name} Case Back`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain drop-shadow-[0_12px_20px_rgba(31,26,27,0.22)] group-hover:drop-shadow-[0_16px_26px_rgba(200,109,122,0.32)] group-hover:scale-105 transition-all duration-500"
                  />
                </div>

                {/* Content Block */}
                <div>
                  {/* Rating & Drop Spec */}
                  <div className="flex items-center gap-1.5 mb-1.5 text-[11px]">
                    <div className="flex text-amber-500">
                      <Star className="w-3 h-3 fill-amber-500" />
                    </div>
                    <span className="font-semibold text-[#1F1A1B]">{product.rating.toFixed(1)}</span>
                    <span className="text-[#8A8182]">({product.reviewsCount})</span>
                    <span className="mx-0.5 text-[#DFD5C6]">•</span>
                    <span className="font-mono text-[#C86D7A] font-medium text-[10px]">
                      {product.dropRating}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-normal text-[#1F1A1B] group-hover:text-[#C86D7A] transition-colors font-serif line-clamp-1">
                    {product.name}
                  </h3>

                  {/* Tagline */}
                  <p className="text-[11px] text-[#5C5455] line-clamp-1 mt-0.5 mb-2 font-normal leading-relaxed">
                    {product.tagline}
                  </p>

                  {/* Color Swatch Dots */}
                  <div className="flex items-center gap-1 mb-3">
                    {product.colors.map((c, i) => (
                      <span
                        key={i}
                        className="w-3 h-3 rounded-full border border-white ring-1 ring-[#DFD5C6] shadow-xs"
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                    <span className="text-[10px] text-[#8A8182] font-mono ml-1">
                      {product.colors.length} hues
                    </span>
                  </div>
                </div>

                {/* Bottom Price & View Details */}
                <div className="pt-2.5 border-t border-[#E8DDD2] flex items-center justify-between mt-auto">
                  <div>
                    <span className="text-sm font-semibold text-[#1F1A1B] font-display">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-[10px] text-[#8A8182] line-through ml-1">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      sounds.playPop();
                      onSelectProduct(product.id);
                    }}
                    className="px-3 py-1 rounded-full ceramic-pill group-hover:bg-[#1F1A1B] group-hover:text-[#FFFDF9] text-[11px] font-semibold tracking-wide text-[#1F1A1B] transition-all duration-200 cursor-pointer shadow-xs"
                  >
                    Inspect
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
