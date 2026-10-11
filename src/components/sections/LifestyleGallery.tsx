import React from 'react';
import { Heart, Camera, MessageCircle, ArrowUpRight } from 'lucide-react';
import { LIFESTYLE_STORIES } from '../../data/products';
import { sounds } from '../../lib/audio';

export const LifestyleGallery: React.FC = () => {
  return (
    <section id="lifestyle" className="py-14 lg:py-18 relative bg-[#F8EDEF] texture-ribbon-weave border-b border-[#E8DDD2]">
      
      {/* Decorative Ribbon Accent Line at Top */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#E88998]/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#F7D6DB] text-xs font-semibold tracking-wider uppercase text-[#C86D7A] mb-2.5">
              <Camera className="w-3 h-3 text-[#C86D7A]" />
              <span>Patron Community & Real Life</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-[#1F1A1B] tracking-tight leading-snug font-serif">
              Styled across the globe.{' '}
              <span className="italic text-[#C86D7A] font-normal">
                Everyday carry in the wild.
              </span>
            </h2>
            
            <p className="text-xs sm:text-sm text-[#5C5455] mt-1.5 font-normal leading-relaxed">
              From Shibuya Cat Street cafe dates to Seongsu-dong studios and SoHo lofts—see how patrons carry Celliback in real life.
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-start md:self-auto">
            <span className="text-[11px] font-mono text-[#8A8182] uppercase">120k+ Community</span>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              onClick={() => sounds.playPop()}
              className="px-4 py-1.5 rounded-full bg-white hover:bg-[#FAF4ED] text-[#1F1A1B] text-xs font-semibold tracking-wide transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-xs border border-[#E8DDD2]"
            >
              <span>@celliback</span>
              <ArrowUpRight className="w-3 h-3 text-[#C86D7A]" />
            </a>
          </div>
        </div>

        {/* Stories Grid (Compact & Proportionate) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {LIFESTYLE_STORIES.map((story, i) => (
            <div
              key={i}
              className="group ceramic-panel rounded-2xl overflow-hidden p-3.5 border border-[#E8DDD2] transition-all duration-300 hover:shadow-md hover:border-[#E88998] hover:-translate-y-1 flex flex-col justify-between"
            >
              {/* Photo Frame with Blurred Depth Shadow */}
              <div className="relative aspect-4/3 rounded-xl overflow-hidden mb-3 inner-case-well shadow-[inset_0_3px_10px_rgba(31,26,27,0.12),0_4px_12px_rgba(31,26,27,0.06)]">
                <img
                  src={story.image}
                  alt={story.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Tag pill on photo */}
                <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-sm text-[#1F1A1B] text-[10px] font-mono tracking-wider uppercase shadow-xs">
                  {story.tag}
                </div>

                {/* Likes count */}
                <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-full bg-[#1F1A1B]/80 backdrop-blur-sm text-[#FFFDF9] text-[10px] font-mono flex items-center gap-1">
                  <Heart className="w-2.5 h-2.5 fill-[#C86D7A] text-[#C86D7A]" />
                  <span>{story.likes}</span>
                </div>
              </div>

              {/* Story Details */}
              <div className="px-1">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#C86D7A] mb-1">
                  <span className="font-semibold">{story.author}</span>
                  <span className="text-[#8A8182] flex items-center gap-1 text-[10px]">
                    <MessageCircle className="w-2.5 h-2.5" /> Verified Patron
                  </span>
                </div>
                
                <h3 className="text-sm font-light text-[#1F1A1B] font-serif mb-1 leading-snug">
                  {story.title}
                </h3>
                
                <p className="text-[11px] text-[#5C5455] leading-relaxed font-normal">
                  "{story.caption}"
                </p>
              </div>

              <div className="pt-2.5 mt-3 border-t border-[#E8DDD2]/70 flex items-center justify-between text-[10px] text-[#8A8182] font-mono">
                <span>Dispatch Verified</span>
                <span className="text-[#C86D7A]">Tokyo / Seoul / NYC</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
