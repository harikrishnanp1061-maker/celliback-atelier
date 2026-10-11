export interface ProductColor {
  name: string;
  hex: string;
  class: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: 'All' | 'Bunnies' | 'Sweet Treats' | 'Ribbons & Bows' | 'Floral';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  badge?: string;
  description: string;
  materials: string[];
  features: string[];
  dropRating: string;
  magsafe: boolean;
  colors: ProductColor[];
  supportedModels: string[];
  inStock: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: 'bunny-cloud-hop',
    name: 'Cloud Bunny Hop Edition',
    tagline: '3D Sculpted Bunny Ears with Detachable Pearl Tassel Strap',
    category: 'Bunnies',
    price: 34.99,
    originalPrice: 42.00,
    rating: 4.9,
    reviewsCount: 1420,
    image: '/images/bunny_case_hero.png',
    badge: 'BESTSELLER 🐰',
    description: 'The viral star of the season! Sculpted with soft-touch 3D bunny ears that double as an ergonomic grip, reinforced with military-grade corner airbags, and topped with our signature detachable pearl charm strap.',
    materials: [
      'Flexible Anti-Yellowing German Bayer TPU',
      'High-Gloss Liquid Ceramic Coating',
      'Surgical-Grade Aluminum Camera Protection Ring',
      'Hypoallergenic Glass Pearl Wristlet'
    ],
    features: [
      'Sculpted 3D bunny ear contouring (comfortable pocket slip)',
      '10ft drop tested with honeycomb impact dispersion',
      'Integrated N52 Neodymium MagSafe magnetic charging array',
      'Free collector charm strap + sticker pack included'
    ],
    dropRating: '10 FT / 3 METERS',
    magsafe: true,
    colors: [
      { name: 'Sakura Petal Pink', hex: '#FFB8D2', class: 'bg-[#FFB8D2]' },
      { name: 'Cloud Cream White', hex: '#FFF8EA', class: 'bg-[#FFF8EA]' },
      { name: 'Lilac Mist', hex: '#E8D5F5', class: 'bg-[#E8D5F5]' },
    ],
    supportedModels: [
      'iPhone 16 Pro Max',
      'iPhone 16 Pro',
      'iPhone 16 Plus',
      'iPhone 16',
      'iPhone 15 Pro Max',
      'iPhone 15 Pro',
      'iPhone 15',
      'Samsung Galaxy S24 Ultra',
      'Samsung Galaxy S24+'
    ],
    inStock: true
  },
  {
    id: 'strawberry-milk-gloss',
    name: 'Strawberry Milkshake Gloss',
    tagline: 'Kawaii 3D Milk Carton Charm & Holographic Wave Accents',
    category: 'Sweet Treats',
    price: 32.99,
    originalPrice: 38.00,
    rating: 5.0,
    reviewsCount: 890,
    image: '/images/strawberry_case_hero.png',
    badge: 'STAFF PICK 🍓',
    description: 'Sweet, creamy, and undeniably protective. Featuring 3D tactile strawberry and mini milk carton charms, custom pastel ripple waves, and our non-stick anti-fingerprint diamond gloss.',
    materials: [
      'Dual-Layer Polycarbonate + Cushion TPU',
      'Anti-Fingerprint Nano Oleophobic Layer',
      'Custom Acrylic Beaded Wristlet with Strawberry Jewel'
    ],
    features: [
      'Playful 3D embossed strawberry charms with gentle tactile bounce',
      '2.5mm raised camera bezel protection',
      'Ultra-clicky tactile metallic button covers',
      'MagSafe & wireless charging compatible'
    ],
    dropRating: '8.5 FT / 2.6 METERS',
    magsafe: true,
    colors: [
      { name: 'Strawberry Cream', hex: '#FF94B9', class: 'bg-[#FF94B9]' },
      { name: 'Vanilla Swirl', hex: '#FFF2DB', class: 'bg-[#FFF2DB]' },
      { name: 'Berry Sorbet', hex: '#FF5C8A', class: 'bg-[#FF5C8A]' },
    ],
    supportedModels: [
      'iPhone 16 Pro Max',
      'iPhone 16 Pro',
      'iPhone 16',
      'iPhone 15 Pro Max',
      'iPhone 15 Pro',
      'iPhone 15',
      'Samsung Galaxy S24 Ultra'
    ],
    inStock: true
  },
  {
    id: 'boba-bear-hug',
    name: 'Boba Bear Hug Edition',
    tagline: 'Tactile 3D Bear Figurine with Floating Boba Pearl Drops',
    category: 'Sweet Treats',
    price: 36.99,
    originalPrice: 45.00,
    rating: 4.9,
    reviewsCount: 1054,
    image: '/images/boba_bear_hero.png',
    badge: 'LIMITED EDITION 🧸',
    description: 'The coziest companion for your daily scrolls. Designed with a hand-sculpted 3D teddy bear enjoying brown sugar boba, accompanied by a luxury caramel and cream pearl wristlet chain.',
    materials: [
      'Shatter-Proof High Polymer Backplate',
      'Impact Absorbing Amber Tinted TPU Rails',
      'Custom Gold Clasp Caramel Pearl Strap'
    ],
    features: [
      'Sculpted 3D Boba Bear center badge',
      'High-traction ribbed side rails for zero slip',
      'Raised screen edges protect glass during face-down placement',
      'Zero bulk profile fits effortlessly in clutches and bags'
    ],
    dropRating: '10 FT / 3 METERS',
    magsafe: true,
    colors: [
      { name: 'Caramel Milk', hex: '#DEB887', class: 'bg-[#DEB887]' },
      { name: 'Warm Cream', hex: '#FFF4E0', class: 'bg-[#FFF4E0]' },
      { name: 'Toffee Brown', hex: '#8B5A2B', class: 'bg-[#8B5A2B]' },
    ],
    supportedModels: [
      'iPhone 16 Pro Max',
      'iPhone 16 Pro',
      'iPhone 16',
      'iPhone 15 Pro Max',
      'iPhone 15 Pro',
      'iPhone 15',
      'Samsung Galaxy S24 Ultra'
    ],
    inStock: true
  },
  {
    id: 'coquette-velvet-bow',
    name: 'Coquette Velvet Ribbon',
    tagline: 'Sculpted Satin Bows, Crystal Jewels & Pearl Edge Borders',
    category: 'Ribbons & Bows',
    price: 34.99,
    originalPrice: 40.00,
    rating: 4.8,
    reviewsCount: 630,
    image: '/images/bunny_cloud_case.jpg',
    badge: 'NEW ARRIVAL 🎀',
    description: 'Elegance meets everyday armor. Dressed in soft 3D sculpted bows with delicate crystal dewdrops and pearl chains, creating a romantic aesthetic without sacrificing impact protection.',
    materials: [
      'Crystal-Clear Non-Yellowing Polycarbonate',
      'Sculpted Acrylic Ribbon Appliques',
      'Silky Microfiber Inner Protective Pad'
    ],
    features: [
      'Subtle 3D ribbon contours that rest comfortably in hand',
      'Air-cushioned corners disperse 98% of drop impact',
      'Full MagSafe magnetic charging alignment',
      'Signature Celliback pastel keepsake gift packaging'
    ],
    dropRating: '8.5 FT / 2.6 METERS',
    magsafe: true,
    colors: [
      { name: 'Ballet Slippers', hex: '#FFCCD5', class: 'bg-[#FFCCD5]' },
      { name: 'Silk Ivory', hex: '#FFFDF9', class: 'bg-[#FFFDF9]' },
      { name: 'Rose Petal', hex: '#FF8FAB', class: 'bg-[#FF8FAB]' },
    ],
    supportedModels: [
      'iPhone 16 Pro Max',
      'iPhone 16 Pro',
      'iPhone 16',
      'iPhone 15 Pro Max',
      'iPhone 15 Pro',
      'iPhone 15'
    ],
    inStock: true
  },
  {
    id: 'sakura-blossom-armor',
    name: 'Sakura Blossom Armor',
    tagline: 'Floating Cherry Petals with Subtle Iridescent Stardust',
    category: 'Floral',
    price: 31.99,
    originalPrice: 36.00,
    rating: 4.9,
    reviewsCount: 780,
    image: '/images/strawberry_case.jpg',
    badge: 'SEASONAL 🌸',
    description: 'Springtime encapsulated in crystal clarity. Real suspended sakura petal graphics infused with iridescent stardust flakes that catch the light from every angle, bound by aerospace impact rails.',
    materials: [
      'Optical Grade Scratch-Resistant Clear Resin',
      'UV-Blocking Anti-Yellowing Shield',
      'Corner Bumper Air Cavities'
    ],
    features: [
      'Iridescent shimmer reflects rainbow pastel highlights in daylight',
      'Reinforced corner bumpers prevent screen cracks',
      'Slim 1.8mm profile retains original phone hand-feel',
      'Integrated high-speed wireless charging ring'
    ],
    dropRating: '10 FT / 3 METERS',
    magsafe: true,
    colors: [
      { name: 'Cherry Blossom Pink', hex: '#FFAFCC', class: 'bg-[#FFAFCC]' },
      { name: 'Clear Diamond', hex: '#F0F8FF', class: 'bg-[#F0F8FF]' },
      { name: 'Sunset Peach', hex: '#FFD1BA', class: 'bg-[#FFD1BA]' },
    ],
    supportedModels: [
      'iPhone 16 Pro Max',
      'iPhone 16 Pro',
      'iPhone 16',
      'iPhone 15 Pro Max',
      'iPhone 15 Pro',
      'iPhone 15',
      'Samsung Galaxy S24 Ultra'
    ],
    inStock: true
  }
];

export const LIFESTYLE_STORIES = [
  {
    title: 'Cafe Date with Cloud Bunny',
    caption: 'Match your iced strawberry latte with your phone case. Tag @celliback for 10% off your next gift set!',
    author: '@sophia_kawaii',
    likes: '14.2k',
    tag: 'Cafe Moments ☕',
    image: '/images/strawberry_case.jpg'
  },
  {
    title: 'Desk Setup Glow Up',
    caption: 'Why have a boring black phone case when your desk setup looks like cotton candy heaven?',
    author: '@pastel_desk',
    likes: '28.9k',
    tag: 'Desk Inspo 🌸',
    image: '/images/bunny_cloud_case.jpg'
  },
  {
    title: 'The Unboxing Joy',
    caption: 'Opening a Celliback box feels like Christmas morning. Every box includes collectible stickers and wristlet charms!',
    author: '@unboxing_gems',
    likes: '35.1k',
    tag: 'Unboxing 🎁',
    image: '/images/boba_bear_case.jpg'
  }
];
