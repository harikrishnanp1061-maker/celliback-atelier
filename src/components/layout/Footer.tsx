import React, { useState } from 'react';
import { Send, ShieldCheck, Gift, Truck, MapPin, Sparkles } from 'lucide-react';
import { sounds } from '../../lib/audio';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    sounds.playChime();
    setSubscribed(true);
  };

  return (
    <footer className="bg-[#201A1C] text-[#F4ECE3] border-t border-[#3A3033] pt-12 pb-10 relative overflow-hidden">
      
      {/* Decorative Satin Ribbon Accent at Top */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#E88998]/50 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
        
        {/* Newsletter Invitation Card with Deep Velvet & Rose Styling */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#2A2326] border border-[#3E3437] shadow-sm mb-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="max-w-md z-10 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#3D3135] text-[#E88998] text-[10px] font-semibold uppercase tracking-wider mb-2 border border-[#4E3E43]">
              <Sparkles className="w-3 h-3 text-[#E88998]" />
              <span>The Atelier Gazette</span>
            </div>
            
            <h3 className="text-xl sm:text-2xl font-light text-[#FFFDF9] font-serif tracking-tight mb-1">
              Private drop dispatches & secret hues.
            </h3>
            
            <p className="text-[11px] text-[#A6999B] leading-relaxed font-normal">
              Subscribe for invitations to boutique salon hours and 15% off your first keepsake box.
            </p>
          </div>

          <div className="w-full md:w-auto z-10">
            {subscribed ? (
              <div className="px-5 py-2.5 rounded-full bg-[#3D3135] text-[#E88998] font-semibold text-xs text-center border border-[#4E3E43]">
                ✓ Welcome to the Gazette. Your welcome dossier is en route.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-sm w-full">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address…"
                  required
                  className="px-4 py-2.5 rounded-full bg-[#1A1416] border border-[#3E3437] text-[#FFFDF9] placeholder-[#8A8182] text-xs focus:outline-none focus:ring-1.5 focus:ring-[#E88998]"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-[#E88998] hover:bg-[#D47685] text-[#1F1A1B] text-xs font-bold tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>Join</span>
                  <Send className="w-3 h-3 text-[#1F1A1B]" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 4 Brand Value Pillars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-8 mb-8 border-b border-[#3A3033] text-center md:text-left">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#2A2326] border border-[#3E3437] flex items-center justify-center text-[#E88998] shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-[#FFFDF9] uppercase tracking-wide">10FT Drop Tested</p>
              <p className="text-[10px] text-[#A6999B]">Corner airbag defense</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#2A2326] border border-[#3E3437] flex items-center justify-center text-[#E88998] shrink-0">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-[#FFFDF9] uppercase tracking-wide">Worldwide Dispatch</p>
              <p className="text-[10px] text-[#A6999B]">Complimentary over $40</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#2A2326] border border-[#3E3437] flex items-center justify-center text-[#E88998] shrink-0">
              <Gift className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-[#FFFDF9] uppercase tracking-wide">Keepsake Box</p>
              <p className="text-[10px] text-[#A6999B]">Free pearl tether included</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#2A2326] border border-[#3E3437] flex items-center justify-center text-[#E88998] shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-[#FFFDF9] uppercase tracking-wide">5 Flagships</p>
              <p className="text-[10px] text-[#A6999B]">Tokyo, Seoul, NYC, London</p>
            </div>
          </div>
        </div>

        {/* Global Boutique Locations & Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 pb-8 mb-6 border-b border-[#3A3033] text-[11px]">
          
          {/* Col 1: Brand Info */}
          <div className="md:col-span-2 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-lg font-normal text-[#FFFDF9] font-serif">Celliback Atelier</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#E88998]" />
            </div>
            <p className="text-[#A6999B] text-[11px] leading-relaxed max-w-sm font-normal">
              Design studio dedicated to the tactile intersection of playful 3D forms, non-yellowing German polymers, and 10ft impact armor.
            </p>
            <p className="text-[10px] font-mono text-[#E88998]">
              Ateliers: Shibuya-ku, Tokyo • SoHo, New York
            </p>
          </div>

          {/* Col 2: Editions */}
          <div>
            <h4 className="font-bold text-[#FFFDF9] uppercase tracking-wider mb-2 text-[10px]">
              Editions
            </h4>
            <ul className="space-y-1.5 text-[#A6999B]">
              <li><a href="#collection" className="hover:text-[#E88998] transition-colors">Cloud Bunny Hop</a></li>
              <li><a href="#collection" className="hover:text-[#E88998] transition-colors">Strawberry Milk</a></li>
              <li><a href="#collection" className="hover:text-[#E88998] transition-colors">Boba Bear Hug</a></li>
              <li><a href="#collection" className="hover:text-[#E88998] transition-colors">Velvet Bow Armor</a></li>
            </ul>
          </div>

          {/* Col 3: Flagship Boutiques */}
          <div>
            <h4 className="font-bold text-[#FFFDF9] uppercase tracking-wider mb-2 text-[10px]">
              Boutiques
            </h4>
            <ul className="space-y-1.5 text-[#A6999B]">
              <li><a href="#boutiques" className="hover:text-[#E88998] transition-colors">Tokyo • Harajuku Cat St</a></li>
              <li><a href="#boutiques" className="hover:text-[#E88998] transition-colors">Seoul • Seongsu Atelier</a></li>
              <li><a href="#boutiques" className="hover:text-[#E88998] transition-colors">New York • SoHo Greene</a></li>
              <li><a href="#boutiques" className="hover:text-[#E88998] transition-colors">London • Covent Garden</a></li>
            </ul>
          </div>

          {/* Col 4: Atelier Concierge */}
          <div>
            <h4 className="font-bold text-[#FFFDF9] uppercase tracking-wider mb-2 text-[10px]">
              Concierge
            </h4>
            <ul className="space-y-1.5 text-[#A6999B]">
              <li><a href="#contact" className="hover:text-[#E88998] transition-colors">Private Client Desk</a></li>
              <li><a href="#contact" className="hover:text-[#E88998] transition-colors">Bespoke Monogramming</a></li>
              <li><a href="#contact" className="hover:text-[#E88998] transition-colors">Press & Showroom Loans</a></li>
              <li><a href="#contact" className="hover:text-[#E88998] transition-colors">Polymer Care Guide</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Rights Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[10px] text-[#A6999B] gap-3">
          <p>© 2026 Celliback Atelier Co. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-[#FFFDF9] cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[#FFFDF9] cursor-pointer">Terms</span>
            <span className="hover:text-[#FFFDF9] cursor-pointer">Sustainability</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
