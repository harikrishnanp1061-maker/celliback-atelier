import React, { useState, useEffect } from 'react';
import { X, Star, ShieldCheck, Check, Plus, Minus, ShoppingBag, Box } from 'lucide-react';
import confetti from 'canvas-confetti';
import { type Product } from '../../data/products';
import { sounds } from '../../lib/audio';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, model: string, color: string, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [selectedModel, setSelectedModel] = useState<string>(product.supportedModels[0] || 'iPhone 16 Pro Max');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || 'Sakura Pink');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'details' | 'specs'>('details');
  const [isAdded, setIsAdded] = useState<boolean>(false);

  useEffect(() => {
    if (product) {
      setSelectedModel(product.supportedModels[0] || 'iPhone 16 Pro Max');
      setSelectedColor(product.colors[0]?.name || 'Sakura Pink');
      setQuantity(1);
      setIsAdded(false);
    }
  }, [product]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleAdd = () => {
    sounds.playChime();
    
    // Champagne & Rose Gold Confetti Burst
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#C86D7A', '#DFD5C6', '#1F1A1B', '#F6F2EC', '#E5DBD0']
    });

    onAddToCart(product, selectedModel, selectedColor, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Matte Dark Frosted Overlay */}
      <div
        className="fixed inset-0 bg-[#1F1A1B]/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Dialog Window */}
      <div className="relative w-full max-w-4xl bg-[#FFFDF9] rounded-[2rem] shadow-2xl border-2 border-[#E5DBD0] overflow-hidden z-10 my-auto max-h-[92vh] flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button
          onClick={() => {
            sounds.playPop();
            onClose();
          }}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/90 text-[#5C5455] hover:text-[#1F1A1B] hover:bg-white transition-colors shadow-xs border border-[#E5DBD0] cursor-pointer focus:outline-none"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left Column: Media Showcase */}
        <div className="md:w-1/2 p-6 sm:p-8 bg-[#F6F2EC] flex flex-col items-center justify-center relative border-b md:border-b-0 md:border-r border-[#E5DBD0]">
          
          {/* Badge */}
          {product.badge && (
            <div className="absolute top-6 left-6 px-3.5 py-1 rounded-full bg-[#1F1A1B] text-[#FFFDF9] text-[10px] font-mono tracking-wider uppercase shadow-xs">
              {product.badge}
            </div>
          )}

          {/* Main Visual with Blurred Depth Shadow */}
          <div className="relative aspect-square w-full max-w-sm rounded-3xl overflow-hidden inner-case-well flex items-center justify-center p-5 shadow-[inset_0_4px_16px_rgba(31,26,27,0.10),0_8px_24px_-4px_rgba(31,26,27,0.08)]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain drop-shadow-[0_16px_28px_rgba(31,26,27,0.25)] transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Value callout underneath */}
          <div className="mt-5 flex items-center gap-2 text-xs font-mono text-[#5C5455]">
            <Box className="w-3.5 h-3.5 text-[#C86D7A]" />
            <span>Includes collector keepsake box + pearl wristlet tether</span>
          </div>
        </div>

        {/* Right Column: Customizer & Details */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[85vh]">
          <div>
            
            {/* Rating & Drop Spec */}
            <div className="flex items-center gap-2 mb-2 text-xs">
              <div className="flex text-amber-500">
                <Star className="w-3.5 h-3.5 fill-amber-500" />
              </div>
              <span className="font-semibold text-[#1F1A1B]">{product.rating.toFixed(1)}</span>
              <span className="text-[#8A8182]">({product.reviewsCount} reviews)</span>
              <span className="mx-1 text-[#DFD5C6]">•</span>
              <span className="font-mono text-[#C86D7A] font-semibold text-xs">{product.dropRating}</span>
            </div>

            {/* Product Title */}
            <h2 className="text-2xl sm:text-3xl font-light text-[#1F1A1B] font-serif tracking-tight mb-1">
              {product.name}
            </h2>

            {/* Price Line */}
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-2xl font-bold text-[#1F1A1B] font-display">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-[#8A8182] line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              <span className="text-xs font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                In Stock • Dispatches Today
              </span>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-[#E5DBD0] mb-5 text-xs font-semibold uppercase tracking-wider">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-2.5 px-3 border-b-2 cursor-pointer transition-colors ${
                  activeTab === 'details'
                    ? 'border-[#1F1A1B] text-[#1F1A1B]'
                    : 'border-transparent text-[#8A8182] hover:text-[#1F1A1B]'
                }`}
              >
                Customizer
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-2.5 px-3 border-b-2 cursor-pointer transition-colors ${
                  activeTab === 'specs'
                    ? 'border-[#1F1A1B] text-[#1F1A1B]'
                    : 'border-transparent text-[#8A8182] hover:text-[#1F1A1B]'
                }`}
              >
                Anatomy & Specs
              </button>
            </div>

            {activeTab === 'details' ? (
              <div className="space-y-4">
                {/* Device Model Selector */}
                <div>
                  <label className="block text-xs font-semibold text-[#1F1A1B] mb-1.5 uppercase tracking-wider">
                    Select Device Model
                  </label>
                  <select
                    value={selectedModel}
                    onChange={(e) => {
                      sounds.playPop();
                      setSelectedModel(e.target.value);
                    }}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F6F2EC] border border-[#E5DBD0] text-xs sm:text-sm text-[#1F1A1B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C86D7A]/40 shadow-[inset_0_2px_6px_rgba(31,26,27,0.06),0_1px_2px_rgba(255,255,255,0.7)] transition-all cursor-pointer"
                  >
                    {product.supportedModels.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Color Swatch Picker */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-semibold text-[#1F1A1B] uppercase tracking-wider">
                      Selected Hue
                    </label>
                    <span className="text-xs text-[#C86D7A] font-semibold font-mono">
                      {selectedColor}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    {product.colors.map((c) => {
                      const isSelected = selectedColor === c.name;
                      return (
                        <button
                          key={c.name}
                          onClick={() => {
                            sounds.playPop();
                            setSelectedColor(c.name);
                          }}
                          className={`w-8 h-8 rounded-full border-2 transition-all duration-200 cursor-pointer flex items-center justify-center ${
                            isSelected
                              ? 'border-[#1F1A1B] ring-2 ring-[#C86D7A]/40 scale-110 shadow-xs'
                              : 'border-white hover:scale-105'
                          }`}
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 text-white drop-shadow" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Quantity Counter */}
                <div>
                  <label className="block text-xs font-semibold text-[#1F1A1B] mb-1.5 uppercase tracking-wider">
                    Quantity
                  </label>
                  <div className="inline-flex items-center gap-3 ceramic-pill px-3 py-1.5 rounded-full">
                    <button
                      onClick={() => {
                        sounds.playPop();
                        setQuantity((q) => Math.max(1, q - 1));
                      }}
                      className="p-1 hover:text-[#C86D7A] cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-bold text-xs w-4 text-center">{quantity}</span>
                    <button
                      onClick={() => {
                        sounds.playPop();
                        setQuantity((q) => q + 1);
                      }}
                      className="p-1 hover:text-[#C86D7A] cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                <div>
                  <p className="font-bold text-[#1F1A1B] uppercase tracking-wider mb-2 text-[11px]">
                    Engineering Materials
                  </p>
                  <ul className="space-y-1.5 text-[#5C5455]">
                    {product.materials.map((m, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C86D7A] shrink-0 mt-1.5" />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-[#E5DBD0]">
                  <p className="font-bold text-[#1F1A1B] uppercase tracking-wider mb-2 text-[11px]">
                    Key Characteristics
                  </p>
                  <ul className="space-y-1.5 text-[#5C5455]">
                    {product.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#C86D7A] shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

          </div>

          {/* Action Row */}
          <div className="pt-6 mt-6 border-t border-[#E5DBD0]">
            <button
              onClick={handleAdd}
              className={`w-full py-3.5 rounded-full font-semibold text-xs tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                isAdded
                  ? 'bg-emerald-700 text-white'
                  : 'bg-[#1F1A1B] hover:bg-[#342D2F] text-[#FFFDF9] hover:scale-[1.01]'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Shopping Bag ✓</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 text-[#DFD5C6]" />
                  <span>Add to Bag • ${(product.price * quantity).toFixed(2)}</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
