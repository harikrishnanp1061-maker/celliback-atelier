import React from 'react';
import { Gift, Sparkles, Box, Shield, Heart } from 'lucide-react';
import { sounds } from '../../lib/audio';

export const UnboxingPerks: React.FC = () => {
  const perks = [
    {
      icon: <Box className="w-5 h-5 text-[#C86D7A]" />,
      title: 'Embossed Linen Drawer Box',
      desc: 'No generic bubble envelopes. Each case is nestled in a rigid drawer box bound in textured linen with ribbon pull.'
    },
    {
      icon: <Heart className="w-5 h-5 text-[#C86D7A]" />,
      title: 'Free Pearl Wristlet Strap',
      desc: 'Includes an artisan glass pearl tether ($18 value) featuring surgical steel clasps engineered for corner eyelets.'
    },
    {
      icon: <Sparkles className="w-5 h-5 text-[#C86D7A]" />,
      title: 'Holographic Art Decal Sheet',
      desc: 'Curated sheet of waterproof foil decals (bunnies, bows, treats) to customize your case or stationery.'
    },
    {
      icon: <Shield className="w-5 h-5 text-[#C86D7A]" />,
      title: '1-Year Screen Armor Pledge',
      desc: 'Should your phone display break while inside Celliback within 12 months, we replace the case and contribute $50.'
    }
  ];

  return (
    <section id="unboxing" className="py-14 lg:py-18 bg-[#FAF0F2] relative overflow-hidden border-b border-[#E8DDD2]">
      
      {/* Decorative Ribbon Accent Line */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#E88998]/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
        
        {/* Main Gifting Presentation Card */}
        <div className="ceramic-panel p-6 sm:p-8 lg:p-10 rounded-3xl border border-[#F7D6DB] relative overflow-hidden shadow-sm bg-gradient-to-br from-[#FFFDF9] via-[#FFF8F9] to-[#FFFDF9]">
          
          <div className="relative z-10 max-w-xl mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FCECEF] text-[#C86D7A] text-xs font-semibold uppercase tracking-wider mb-2.5 border border-[#F7D6DB]">
              <Gift className="w-3 h-3 text-[#C86D7A]" />
              <span>The Atelier Gifting Ritual</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-[#1F1A1B] tracking-tight leading-snug font-serif mb-2">
              Unboxing should feel like an{' '}
              <span className="italic text-[#C86D7A] font-normal">
                intimate ceremony.
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-[#5C5455] leading-relaxed font-normal">
              Every Celliback parcel is assembled by hand in our workshops with over $25 in complimentary collectible accessories.
            </p>
          </div>

          {/* Perks 4-Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
            {perks.map((p, i) => (
              <div
                key={i}
                onMouseEnter={() => sounds.playPop()}
                className="p-4 rounded-xl bg-[#FAF4ED] border border-[#E8DDD2] shadow-[inset_0_2px_8px_rgba(31,26,27,0.05),0_4px_14px_-2px_rgba(31,26,27,0.06)] hover:border-[#E88998] hover:bg-white hover:scale-[1.01] hover:shadow-[0_10px_24px_-4px_rgba(200,109,122,0.18)] transition-all duration-300 cursor-default flex flex-col justify-between"
              >
                <div>
                  <div className="w-9 h-9 rounded-lg bg-white border border-[#E8DDD2] flex items-center justify-center mb-3 shadow-[0_2px_8px_rgba(31,26,27,0.06)]">
                    {p.icon}
                  </div>
                  <h3 className="text-sm font-light text-[#1F1A1B] mb-1 font-serif">
                    {p.title}
                  </h3>
                  <p className="text-[11px] text-[#5C5455] leading-relaxed font-normal">
                    {p.desc}
                  </p>
                </div>

                <div className="pt-2.5 mt-3 border-t border-[#E8DDD2]/60 text-[9px] font-mono text-[#C86D7A] uppercase">
                  Free In Every Box
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
