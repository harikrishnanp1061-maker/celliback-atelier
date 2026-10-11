import React from 'react';
import { ShieldCheck, Zap, Sparkles, HeartHandshake, Layers } from 'lucide-react';
import { sounds } from '../../lib/audio';

export const FeatureHighlights: React.FC = () => {
  const features = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#C86D7A]" />,
      title: '10FT Kinetic Airbag Rails',
      subtitle: 'Corner Impact Dispersion',
      description: 'Hidden beneath the sculpted 3D curves are 4 kinetic air chambers that dissipate 98% of blunt drop shock on hard marble and concrete.',
      tag: 'MIL-STD-810H Tested',
    },
    {
      icon: <Zap className="w-5 h-5 text-[#C86D7A]" />,
      title: 'Neodymium N52 MagSafe Ring',
      subtitle: 'Flush Magnetic Alignment',
      description: '38 precision-arranged neodymium magnets sit flush in the case backplate. High-speed 15W inductive charge transfer with zero slip.',
      tag: 'Flush Magnet Array',
    },
    {
      icon: <Sparkles className="w-5 h-5 text-[#C86D7A]" />,
      title: 'Bayer Oleophobic Glaze',
      subtitle: 'Zero Yellowing German Spec',
      description: 'Infused with UV-blocking ceramic resin that prevents yellowing over years of sun exposure. Resists cosmetic oils and coffee stains.',
      tag: 'German Polymer Spec',
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-[#C86D7A]" />,
      title: 'Bespoke Keepsake Suite',
      subtitle: 'Complimentary Collector Box',
      description: 'Every casing arrives in our signature linen drawer casket, accompanied by an artisan detachable pearl wristlet tether and art decals.',
      tag: 'Complimentary Keepsake',
    },
  ];

  return (
    <section id="features" className="py-14 lg:py-18 bg-[#F9F7F4] texture-dots relative overflow-hidden border-b border-[#E8DDD2]">
      
      {/* Decorative Ribbon Dividing Line */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#E88998]/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FCECEF] border border-[#F7D6DB] text-xs font-semibold tracking-wider uppercase text-[#C86D7A] mb-3">
            <Layers className="w-3 h-3 text-[#C86D7A]" />
            <span>Engineering & Materiality</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-[#1F1A1B] tracking-tight leading-snug font-serif mb-2.5">
            Playful exterior form.{' '}
            <span className="italic text-[#C86D7A] font-normal">
              Architectural armor within.
            </span>
          </h2>
          
          <p className="text-xs sm:text-sm text-[#5C5455] font-normal max-w-lg mx-auto leading-relaxed">
            Never compromise distinctive character for structural drop resilience. Precision molded from high-density polymers tested against real-world impacts.
          </p>
        </div>

        {/* Feature Cards Grid (Compact & Organized) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feat, idx) => (
            <div
              key={idx}
              onMouseEnter={() => sounds.playPop()}
              className="p-5 rounded-2xl ceramic-panel border border-[#E8DDD2] hover:border-[#E88998] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group cursor-default"
            >
              <div>
                {/* Icon Tile with Blurred Depth Shadow */}
                <div className="w-9 h-9 rounded-xl bg-[#FCECEF] border border-[#F7D6DB] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200 shadow-[inset_0_2px_6px_rgba(200,109,122,0.22),0_3px_8px_rgba(31,26,27,0.05)]">
                  {feat.icon}
                </div>

                {/* Tag Pill */}
                <div className="inline-block px-2 py-0.5 rounded bg-[#ECE5DC] text-[#1F1A1B] text-[9px] font-mono uppercase tracking-wider mb-2">
                  {feat.tag}
                </div>

                {/* Title */}
                <h3 className="text-sm font-light text-[#1F1A1B] mb-0.5 font-serif">
                  {feat.title}
                </h3>

                {/* Subtitle */}
                <p className="text-[11px] font-semibold text-[#C86D7A] mb-1.5 font-sans uppercase tracking-wider">
                  {feat.subtitle}
                </p>

                {/* Description */}
                <p className="text-[11px] text-[#5C5455] leading-relaxed font-normal">
                  {feat.description}
                </p>
              </div>

              {/* Bottom Subtle Indicator */}
              <div className="pt-3 mt-4 border-t border-[#E8DDD2]/70 flex items-center justify-between text-[10px] text-[#8A8182] font-mono">
                <span>Spec #{String(idx + 1).padStart(2, '0')}</span>
                <span className="text-[#C86D7A]">Verified ✓</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
