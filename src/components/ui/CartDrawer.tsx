import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { sounds } from '../../lib/audio';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  price: number;
  model: string;
  color: string;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const freeShippingThreshold = 50.00;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-60 overflow-hidden">
      {/* Matte Frosted Backdrop */}
      <div
        className="fixed inset-0 bg-[#1F1A1B]/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFDF9] shadow-2xl flex flex-col justify-between border-l border-[#E5DBD0]">
          
          {/* Header */}
          <div className="p-5 border-b border-[#E5DBD0] flex items-center justify-between bg-[#F6F2EC]">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-4 h-4 text-[#1F1A1B]" />
              <h2 className="text-base font-light text-[#1F1A1B] font-serif">
                Your Atelier Bag
              </h2>
              <span className="px-2 py-0.5 rounded-full ceramic-pill text-[11px] font-mono text-[#1F1A1B]">
                {items.length} {items.length === 1 ? 'item' : 'items'}
              </span>
            </div>

            <button
              onClick={() => {
                sounds.playPop();
                onClose();
              }}
              className="p-1.5 rounded-full hover:bg-white text-[#5C5455] hover:text-[#1F1A1B] transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-5 py-3 bg-[#ECE5DC]/60 border-b border-[#E5DBD0] text-xs">
            <div className="flex items-center justify-between text-[11px] font-medium text-[#5C5455] mb-1.5">
              <span>
                {amountToFreeShipping > 0 ? (
                  <>Add <strong className="text-[#1F1A1B]">${amountToFreeShipping.toFixed(2)}</strong> for free worldwide shipping</>
                ) : (
                  <span className="text-emerald-800 font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#C86D7A]" /> Qualified for Complimentary Global Shipping!
                  </span>
                )}
              </span>
              <span className="font-mono text-[10px] text-[#8A8182]">{progressPercent.toFixed(0)}%</span>
            </div>
            
            <div className="w-full h-1.5 bg-[#DFD5C6] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#C86D7A] transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="py-20 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-3xl bg-[#F6F2EC] border border-[#E5DBD0] flex items-center justify-center text-[#8A8182] mb-3">
                  <ShoppingBag className="w-7 h-7 stroke-1" />
                </div>
                <p className="text-base font-light text-[#1F1A1B] font-serif">Your bag is currently empty</p>
                <p className="text-xs text-[#8A8182] mt-1 max-w-xs">
                  Explore our Autumn 2026 editions to discover sculpted 3D cases and pearl wristlet charms.
                </p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl ceramic-panel border border-[#E5DBD0] flex gap-3.5 items-center relative group"
                >
                  {/* Thumbnail with Inner Depth Well */}
                  <div className="w-18 h-18 rounded-xl inner-case-well overflow-hidden shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-[#1F1A1B] truncate">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-[#8A8182] font-mono mt-0.5">
                      {item.model}
                    </p>
                    <p className="text-[11px] text-[#C86D7A] font-mono">
                      {item.color}
                    </p>

                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs font-bold text-[#1F1A1B]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>

                      {/* Quantity Selector */}
                      <div className="flex items-center gap-2 ceramic-pill px-2 py-0.5 rounded-full">
                        <button
                          onClick={() => {
                            sounds.playPop();
                            onUpdateQuantity(item.id, -1);
                          }}
                          className="text-[#5C5455] hover:text-[#1F1A1B] cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-mono font-semibold w-3 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => {
                            sounds.playPop();
                            onUpdateQuantity(item.id, 1);
                          }}
                          className="text-[#5C5455] hover:text-[#1F1A1B] cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Delete Item */}
                  <button
                    onClick={() => {
                      sounds.playPop();
                      onRemoveItem(item.id);
                    }}
                    className="p-1.5 text-[#8A8182] hover:text-[#C86D7A] transition-colors cursor-pointer self-start"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Gifting Inclusion Strip */}
          <div className="px-5 py-3 bg-[#F6F2EC] border-t border-[#E5DBD0] text-[11px] text-[#5C5455] flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C86D7A] shrink-0" />
            <span>Complimentary keepsake drawer box & pearl charm included.</span>
          </div>

          {/* Checkout Footer */}
          <div className="p-5 border-t border-[#E5DBD0] bg-[#FFFDF9] space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#5C5455]">
                <span>Subtotal</span>
                <span className="font-semibold text-[#1F1A1B]">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#5C5455]">
                <span>Estimated Packaging & Dispatch</span>
                <span className="font-semibold text-emerald-800">
                  {amountToFreeShipping === 0 ? 'Complimentary' : '$4.95'}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#1F1A1B] pt-2 border-t border-[#E5DBD0]">
                <span>Estimated Total</span>
                <span>
                  ${(subtotal + (amountToFreeShipping === 0 ? 0 : 4.95)).toFixed(2)}
                </span>
              </div>
            </div>

            <button
              disabled={items.length === 0}
              onClick={() => {
                sounds.playChime();
                alert('Thank you for selecting Celliback Atelier! Secure checkout simulation active.');
              }}
              className="w-full py-3.5 rounded-full bg-[#1F1A1B] hover:bg-[#342D2F] text-[#FFFDF9] text-xs font-semibold tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:scale-[1.01] disabled:opacity-50"
            >
              <span>Proceed to Atelier Checkout</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#DFD5C6]" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#8A8182] font-mono">
              <ShieldCheck className="w-3 h-3 text-[#C86D7A]" />
              <span>Encrypted 256-Bit SSL Checkout • 30-Day Atelier Return</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
