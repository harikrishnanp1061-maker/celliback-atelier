import React, { useState } from 'react';
import { MapPin, Clock, Phone, Navigation, Sparkles, Compass, CheckCircle2 } from 'lucide-react';
import { sounds } from '../../lib/audio';

interface Boutique {
  id: string;
  city: string;
  country: string;
  code: string;
  name: string;
  address: string;
  district: string;
  hours: string;
  phone: string;
  status: string;
  timezone: string;
  timeOffset: number;
  highlights: string[];
  coordinates: { x: number; y: number };
  note: string;
}

const BOUTIQUES: Boutique[] = [
  {
    id: 'tokyo',
    city: 'Tokyo',
    country: 'Japan',
    code: 'TYO',
    name: 'Harajuku Cat Street Flagship',
    address: '4-28-16 Jingumae, Shibuya-ku',
    district: 'Omotesando Design District',
    hours: '11:00 AM – 8:30 PM JST (Daily)',
    phone: '+81 3-5412-8920',
    status: 'Open Today',
    timezone: 'JST (UTC+9)',
    timeOffset: 9,
    highlights: [
      'Full 3D Bunny & Bear relief tactile fitting station',
      'Live pearl wristlet custom assembly bar',
      'Exclusive Tokyo Sakura matte blossom edition',
    ],
    coordinates: { x: 74, y: 38 },
    note: '2 min walk from Meiji-Jingumae Harajuku Station Exit 7.',
  },
  {
    id: 'seoul',
    city: 'Seoul',
    country: 'South Korea',
    code: 'SEL',
    name: 'Seongsu-dong Concept Atelier',
    address: '38 Yeonmujang-gil, Seongdong-gu',
    district: 'Seongsu Creative District',
    hours: '11:30 AM – 9:00 PM KST (Daily)',
    phone: '+82 2-468-1904',
    status: 'Open Today',
    timezone: 'KST (UTC+9)',
    timeOffset: 9,
    highlights: [
      'Interactive drop-testing acrylic chamber',
      'Limited edition K-pop artist charm collaboration',
      'Complimentary cold brew & matcha station',
    ],
    coordinates: { x: 68, y: 40 },
    note: 'Seongsu Station Exit 3, adjacent to Onion Seongsu.',
  },
  {
    id: 'nyc',
    city: 'New York',
    country: 'United States',
    code: 'NYC',
    name: 'SoHo Greene Street Atelier',
    address: '92 Greene Street, New York, NY 10012',
    district: 'SoHo Cast-Iron Historic Quarter',
    hours: '10:00 AM – 7:30 PM EST (Mon–Sun)',
    phone: '+1 (212) 584-9021',
    status: 'Open Today',
    timezone: 'EST (UTC-5)',
    timeOffset: -5,
    highlights: [
      'Custom gold leaf foil initial stamping',
      'MagSafe wireless power accessory testing station',
      'Exclusive NYC Strawberry Milkshake case colorway',
    ],
    coordinates: { x: 28, y: 35 },
    note: 'Between Spring & Prince Street, cobblestone block.',
  },
  {
    id: 'london',
    city: 'London',
    country: 'United Kingdom',
    code: 'LDN',
    name: 'Covent Garden Floral Studio',
    address: '18 Floral Street, London WC2E 9DS',
    district: 'Covent Garden Piazza',
    hours: '10:30 AM – 7:00 PM GMT (Mon–Sat) • 12–6 Sun',
    phone: '+44 20 7836 4410',
    status: 'Open Today',
    timezone: 'GMT (UTC+0)',
    timeOffset: 0,
    highlights: [
      'Bespoke velvet ribbon binding service',
      'Old case trade-in exchange (£10 eco-credit)',
      'Curated artisan tea tasting lounge',
    ],
    coordinates: { x: 48, y: 28 },
    note: 'Near the Royal Opera House, opposite Paul Smith.',
  },
  {
    id: 'paris',
    city: 'Paris',
    country: 'France',
    code: 'PAR',
    name: 'Le Marais Seasonal Salon',
    address: '26 Rue Vieille-du-Temple, 75004 Paris',
    district: '4th Arrondissement',
    hours: '11:00 AM – 7:30 PM CET (Tue–Sun)',
    phone: '+33 1 42 78 60 11',
    status: 'Open Today',
    timezone: 'CET (UTC+1)',
    timeOffset: 1,
    highlights: [
      'Hand-crafted coquette satin gift wrapping',
      'Paris Autumn Fashion Week showcase pieces',
      'Exclusive lavender glaze case finish',
    ],
    coordinates: { x: 50, y: 32 },
    note: 'Steps from Place des Vosges and Saint-Paul Metro.',
  },
];

export const StoreLocator: React.FC = () => {
  const [activeCityId, setActiveCityId] = useState<string>('tokyo');
  const [reservedBooking, setReservedBooking] = useState<boolean>(false);

  const activeBoutique = BOUTIQUES.find((b) => b.id === activeCityId) || BOUTIQUES[0];

  const handleSelectCity = (id: string) => {
    sounds.playPop();
    setActiveCityId(id);
    setReservedBooking(false);
  };

  const handleBookAppointment = () => {
    sounds.playChime();
    setReservedBooking(true);
    setTimeout(() => setReservedBooking(false), 4000);
  };

  return (
    <section id="boutiques" className="py-14 lg:py-18 relative overflow-hidden bg-[#EBE2D5] border-b border-[#DFD5C6]">
      
      {/* Decorative Ribbon Dividing Line at Top */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#E88998]/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#DFD5C6] text-xs font-semibold tracking-wider uppercase text-[#5C5455] mb-2.5">
              <Compass className="w-3 h-3 text-[#C86D7A]" />
              <span>Physical Boutiques & Ateliers</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-[#1F1A1B] tracking-tight leading-snug font-serif">
              Experience the tactility{' '}
              <span className="italic text-[#C86D7A] font-normal">
                in physical space.
              </span>
            </h2>
            
            <p className="text-xs sm:text-sm text-[#5C5455] mt-1.5 font-normal leading-relaxed">
              Step into our light-flooded boutiques in Tokyo, Seoul, London, and New York. Feel the sculpted 3D curves in person and assemble a bespoke charm wristlet.
            </p>
          </div>

          {/* Quick Stat Pill */}
          <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-[#DFD5C6] self-start md:self-auto shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-[#FAF4ED] border border-[#DFD5C6] flex items-center justify-center text-[#C86D7A]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#1F1A1B]">5 Global Flagships</p>
              <p className="text-[10px] text-[#8A8182]">Live Custom Charm Bars</p>
            </div>
          </div>
        </div>

        {/* City Switcher Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
          {BOUTIQUES.map((boutique) => {
            const isActive = boutique.id === activeCityId;
            return (
              <button
                key={boutique.id}
                onClick={() => handleSelectCity(boutique.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#1F1A1B] text-[#FFFDF9] shadow-xs scale-[1.02]'
                    : 'bg-white text-[#5C5455] border border-[#DFD5C6] hover:text-[#1F1A1B] hover:border-[#C86D7A]'
                }`}
              >
                <span className="text-[10px] opacity-75 font-mono">{boutique.code}</span>
                <span>{boutique.city}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#C86D7A]" />}
              </button>
            );
          })}
        </div>

        {/* Interactive Mini-Map Window & Atelier Spec Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column: Stylized Minimalist Map Canvas (7 cols) */}
          <div className="lg:col-span-7 ceramic-panel rounded-2xl p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden min-h-[360px] sm:min-h-[420px]">
            
            {/* Map Top Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E8DDD2]/70 z-10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C86D7A] animate-ping" />
                <span className="text-xs font-semibold text-[#1F1A1B]">
                  Live World Atelier Map
                </span>
                <span className="text-[11px] text-[#8A8182] hidden sm:inline">• Cartography Window</span>
              </div>
              <span className="text-[10px] font-mono uppercase text-[#8A8182] bg-[#ECE5DC] px-2 py-0.5 rounded">
                WGS-84 Grid
              </span>
            </div>

            {/* Architectural Stylized Vector Map Surface with Blurred Depth Shadow */}
            <div className="relative w-full flex-1 my-3 flex items-center justify-center select-none overflow-hidden rounded-xl bg-[#FAF4ED] border border-[#DFD5C6] shadow-[inset_0_4px_16px_rgba(31,26,27,0.10),0_2px_8px_rgba(31,26,27,0.04)]">
              
              {/* Topographic Geometric Grid Lines */}
              <svg
                className="absolute inset-0 w-full h-full text-[#DFD5C6]/60"
                viewBox="0 0 800 450"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line x1="0" y1="90" x2="800" y2="90" stroke="currentColor" strokeDasharray="4 4" strokeWidth="1" />
                <line x1="0" y1="180" x2="800" y2="180" stroke="currentColor" strokeDasharray="4 4" strokeWidth="1" />
                <line x1="0" y1="270" x2="800" y2="270" stroke="currentColor" strokeDasharray="4 4" strokeWidth="1" />
                <line x1="0" y1="360" x2="800" y2="360" stroke="currentColor" strokeDasharray="4 4" strokeWidth="1" />
                
                <line x1="160" y1="0" x2="160" y2="450" stroke="currentColor" strokeDasharray="4 4" strokeWidth="1" />
                <line x1="320" y1="0" x2="320" y2="450" stroke="currentColor" strokeDasharray="4 4" strokeWidth="1" />
                <line x1="480" y1="0" x2="480" y2="450" stroke="currentColor" strokeDasharray="4 4" strokeWidth="1" />
                <line x1="640" y1="0" x2="640" y2="450" stroke="currentColor" strokeDasharray="4 4" strokeWidth="1" />

                {/* Continents */}
                <path
                  d="M140 110 C 180 90, 260 100, 270 150 C 280 200, 220 230, 210 270 C 180 250, 160 210, 140 180 Z"
                  fill="#F4ECE3"
                  stroke="#DFD5C6"
                  strokeWidth="1.5"
                />
                <path
                  d="M390 120 C 440 110, 480 130, 470 170 C 450 190, 420 180, 400 170 C 380 150, 380 130, 390 120 Z"
                  fill="#F4ECE3"
                  stroke="#DFD5C6"
                  strokeWidth="1.5"
                />
                <path
                  d="M480 110 C 560 90, 680 120, 700 180 C 710 240, 640 280, 560 250 C 510 220, 470 180, 480 110 Z"
                  fill="#F4ECE3"
                  stroke="#DFD5C6"
                  strokeWidth="1.5"
                />

                {/* Connecting Transit Vectors */}
                <path
                  d="M 230 155 Q 380 100 480 130"
                  stroke="#E88998"
                  strokeWidth="1.2"
                  strokeDasharray="4 4"
                  opacity="0.6"
                  fill="none"
                />
                <path
                  d="M 480 130 Q 580 120 680 170"
                  stroke="#E88998"
                  strokeWidth="1.2"
                  strokeDasharray="4 4"
                  opacity="0.6"
                  fill="none"
                />
              </svg>

              {/* Interactive City Pins */}
              {BOUTIQUES.map((boutique) => {
                const isSelected = boutique.id === activeCityId;
                return (
                  <button
                    key={boutique.id}
                    onClick={() => handleSelectCity(boutique.id)}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer focus:outline-none transition-all duration-300"
                    style={{
                      left: `${boutique.coordinates.x}%`,
                      top: `${boutique.coordinates.y}%`,
                    }}
                    title={`${boutique.name} (${boutique.city})`}
                  >
                    {isSelected && (
                      <span className="absolute -inset-2 rounded-full bg-[#E88998]/30 animate-ping pointer-events-none" />
                    )}

                    <div
                      className={`relative flex items-center justify-center rounded-full transition-all duration-200 ${
                        isSelected
                          ? 'w-8 h-8 bg-[#1F1A1B] text-[#FFFDF9] ring-3 ring-[#E88998]/40 shadow-md scale-110'
                          : 'w-6 h-6 bg-white text-[#5C5455] border border-[#DFD5C6] hover:scale-110 shadow-2xs'
                      }`}
                    >
                      <MapPin className={`w-3 h-3 ${isSelected ? 'text-[#C86D7A]' : 'text-[#8A8182]'}`} />
                    </div>

                    <div
                      className={`absolute left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 rounded text-[9px] font-bold tracking-wider uppercase transition-all duration-200 whitespace-nowrap shadow-xs pointer-events-none ${
                        isSelected
                          ? 'bg-[#1F1A1B] text-white opacity-100'
                          : 'bg-white text-[#5C5455] opacity-0 group-hover:opacity-100'
                      }`}
                    >
                      {boutique.city}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Map Bottom Strip */}
            <div className="flex flex-wrap items-center justify-between pt-2.5 border-t border-[#E8DDD2]/70 text-[11px] text-[#5C5455] gap-2">
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                All 5 boutiques open today
              </span>
              <span className="text-[#8A8182] font-mono text-[10px]">
                Selected: {activeBoutique.city} ({activeBoutique.code})
              </span>
            </div>

          </div>

          {/* Right Column: Active Flagship Dossier (5 cols) */}
          <div className="lg:col-span-5 ceramic-panel rounded-2xl p-5 sm:p-6 flex flex-col justify-between border border-[#DFD5C6] relative">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-[#ECE5DC] text-[#1F1A1B] text-[10px] font-bold uppercase tracking-wider font-mono">
                  {activeBoutique.country} • {activeBoutique.code}
                </span>

                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  {activeBoutique.status}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-light text-[#1F1A1B] font-serif tracking-tight mb-0.5">
                {activeBoutique.name}
              </h3>
              
              <p className="text-[11px] text-[#C86D7A] font-semibold tracking-wide uppercase mb-4">
                {activeBoutique.district}
              </p>

              {/* Physical Details with Inset Blurred Shadow */}
              <div className="space-y-2.5 py-3 px-3.5 rounded-xl bg-[#FAF4ED] border border-[#E8DDD2] shadow-[inset_0_2px_8px_rgba(31,26,27,0.06),0_2px_6px_rgba(31,26,27,0.03)] mb-4 text-xs">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-3.5 h-3.5 text-[#8A8182] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#1F1A1B]">{activeBoutique.address}</p>
                    <p className="text-[#8A8182] text-[11px]">{activeBoutique.note}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-3.5 h-3.5 text-[#8A8182] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#1F1A1B]">{activeBoutique.hours}</p>
                    <p className="text-[#8A8182] text-[11px]">Timezone: {activeBoutique.timezone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className="w-3.5 h-3.5 text-[#8A8182] shrink-0" />
                  <a
                    href={`tel:${activeBoutique.phone}`}
                    className="font-semibold text-[#1F1A1B] hover:text-[#C86D7A] transition-colors"
                  >
                    {activeBoutique.phone}
                  </a>
                </div>
              </div>

              {/* In-Store Services */}
              <div className="mb-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#5C5455] mb-2">
                  Boutique Amenities & Services
                </p>
                <ul className="space-y-1.5">
                  {activeBoutique.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-[11px] text-[#5C5455]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C86D7A] shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-[#E8DDD2] flex flex-col sm:flex-row gap-2">
              <button
                onClick={handleBookAppointment}
                className="flex-1 px-4 py-2.5 rounded-full bg-[#1F1A1B] hover:bg-[#342D2F] text-[#FFFDF9] text-xs font-semibold tracking-wide transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                {reservedBooking ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C86D7A]" />
                    <span>Appointment Requested</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3 h-3 text-[#DFD5C6]" />
                    <span>Reserve Fitting</span>
                  </>
                )}
              </button>

              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(activeBoutique.address + ' ' + activeBoutique.city)}`}
                target="_blank"
                rel="noreferrer"
                onClick={() => sounds.playPop()}
                className="px-4 py-2.5 rounded-full bg-white hover:bg-[#FAF4ED] text-[#1F1A1B] text-xs font-semibold tracking-wide transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer border border-[#DFD5C6]"
              >
                <Navigation className="w-3 h-3 text-[#C86D7A]" />
                <span>Directions</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
