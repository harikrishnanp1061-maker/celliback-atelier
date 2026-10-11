# 🌐 Website Project Memory & Architecture Matrix

> **Last Updated**: 2026-10-11  
> **Status**: Sectional Theming, Rear Case Mockups & Animated Ribbon Complete (`http://localhost:5173/`)  
> **Single Source of Truth**: This document preserves all brand decisions, design tokens, component manifests, sitemaps, and technical roadmap milestones across sessions.

---

## 1. Project Profile & Vision
- **Brand Name**: **Celliback Atelier**
- **Archetype**: Editorial Luxury D2C Tactile Phone Case Showcase & Global Flagship Brand Hub
- **Product Category**: Tactile, Matte Ceramic & Sculpted 3D Designer Phone Cases (Bunnies, artisan charms, organic textures)
- **Aesthetic Direction**: Warm Linen / Ceramic Sand infused with Petal Pink & Velvet Charcoal. Clear distinct atmospheric theming across each section. Zero generic AI template tropes.
- **Scale Discipline**: Compact, refined, and organized layout hierarchy with balanced typography and tighter card aspect ratios.

---

## 2. Design System & Brand Identity

### A. Section-by-Section Atmospheric Theming & Textures
Each section is differentiated with its own unique background hue, tactile texture, and ribbon dividing lines:
1. **Hero Section (`#hero`)**:
   - Palette: Warm Linen Canvas & Petal Glow (`#FAF4ED` via `#FDF2F4`)
   - Texture: Wavy SVG Satin Ribbon Curves (`.animate-ribbon-wave`) + Ambient pink radial glow
2. **Product Gallery (`#collection`)**:
   - Palette: Textured Warm Rose Sandstone (`#F4ECE3`)
   - Texture: Subtle diagonal pinstripe lines (`.texture-pinstripe`)
   - Visual Separation: 1px top ribbon dividing bar, compact cards (`w-[240px] sm:w-[270px]`)
3. **Engineering & Armor (`#features`)**:
   - Palette: Crisp Technical Porcelain Ceramic (`#F9F7F4`)
   - Texture: Micro-grid dot matrix (`.texture-dots`)
4. **Community In The Wild (`#lifestyle`)**:
   - Palette: Dusty Petal Rose & Satin Linen (`#F8EDEF`)
   - Texture: Subtle woven ribbon texture (`.texture-ribbon-weave`)
5. **Store Locator Mini-Map (`#boutiques`)**:
   - Palette: Architectural Warm Taupe-Sandstone (`#EBE2D5`)
   - Texture: Cartographic coordinates and topography
6. **Unboxing Ritual (`#unboxing`)**:
   - Palette: Festive Silk Blush & Ivory Ceramic (`#FAF0F2`)
   - Texture: Subtle rose ribbon highlight lines
7. **Concierge Desk (`#contact`)**:
   - Palette: Warm Chamois Linen & Ceramic Ecru (`#F4ECE3`)
   - Texture: Crisp ceramic panel dossier
8. **Footer & Gazette**:
   - Palette: Deep Velvet Ink Charcoal & Rose-Cocoa (`#201A1C` with `#F4ECE3` type and `#E88998` accents)

### B. Interactive Handcrafted 3D Phone Cases (Hero)
- **Authentic User Packshot Integration**:
  - Processed and integrated high-resolution transparent cutouts of the 3 user-provided phone cases:
    - `bunny_case_hero.png`: Cloud Bunny Hop Flagship with 3D sculpted ears, camera cutout, and pearl wristlet.
    - `strawberry_case_hero.png`: Strawberry Milkshake Edition with 3D strawberry charm and acrylic wristlet.
    - `boba_bear_hero.png`: Boba Bear Hug Edition with 3D boba bear figurine and caramel pearl strap.
- **Cards-in-a-Hand Staging**:
  - The 3 phone cases float directly on the warm ceramic canvas without boxy card borders, with multi-layer drop shadows (`drop-shadow-2xl`) hugging the curves of the bunny ears and hanging pearls.
  - Fanned out like 3 cards held in hand (Left: -9°, Center: 0° elevated flagship, Right: +9°).
  - **Entrance Rise-on-Load**: On initial page start, the 3 phones smoothly rise up sequentially from below into their fanned positions (`transition: transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)`).
  - **Hover-Lift & Un-Tilt Interaction**: Hovering over any phone case lifts it gracefully higher (`-40px` to `-50px`), un-tilts it towards 0°, deepens the ambient drop shadow with a soft rose bloom, and highlights a floating frosted ceramic inspect capsule pill.
  - Clicking any phone case opens the detailed product modal with model selectors, specs, and confetti add-to-bag.

### C. Wandering Background Ribbon & Bow Animation (`ribbon-scroll.tsx` & `site-bow.tsx`)
- **Framer Motion Scroll-Linked Architecture**:
  - Encapsulated in `<RibbonScroll bow={<SiteBow />}>` wrapping the main sections in `App.tsx`.
  - Positioned at `pointer-events-none absolute inset-0 z-0` so the ribbon floats gracefully behind content while section elements remain interactive at `relative z-10`.
  - Driven by `useScroll`, `useSpring` (stiffness: 70, damping: 20), and `useTransform` with real-pixel SVG path generation (`buildPath(w, h)`).
- **Theme Token Strictness**:
  - `ACCENT = "var(--primary)"` (`#C86D7A`).
  - `TRAIL = color-mix(in srgb, var(--primary) 35%, transparent)`.
  - `SHEEN = color-mix(in srgb, var(--primary) 35%, white)`.
  - `SHADOW = color-mix(in srgb, var(--primary) 30%, transparent)`.
- **Bespoke Atelier Coquette Bow (`SiteBow.tsx`)**:
  - Passed via the `bow` prop to replace the default fallback bow.
  - Sits at the tip of the drawn ribbon path via `getPointAtLength()` coordinates (`tipX`, `tipY`), rotating to align with travel direction (`tilt`).
  - Built with luxury French coquette satin ribbon knot, dual loops, and swallowtail draped tails styled via `currentColor`.
- **Intro & Scroll Lifecycle**:
  - **Intro**: On mount, draws `INTRO_SHARE = 0.1` diagonally across the hero over 1.8s (`easeOut`).
  - **Scroll**: As user scrolls down, path continues unwinding; scrolling back up smoothly retracts the trail.
  - Respects `prefers-reduced-motion` (instant intro, no idle sway).

### D. Interactive Hover Button (`interactive-hover-button.tsx`)
- Standard shadcn component structure in `src/components/ui/interactive-hover-button.tsx`.
- Powered by Tailwind utility classes, `cn` helper, and Celliback Atelier theme tokens (`bg-background`, `border-border`, `bg-primary`, `text-primary-foreground`).
- Features smooth circle expansion on hover from bottom-left dot to full fill with sliding text and `ArrowRight` reveal.
- Integrated into Hero CTA ("Explore Collection") with audio feedback.

---

## 3. Component Architecture & Page Blueprint

| Section / Component | File Path | Status | Key Features |
| :--- | :--- | :--- | :--- |
| **Ribbon Scroll** | `src/components/ui/ribbon-scroll.tsx` | ✅ Live | Framer Motion scroll-drawn satin ribbon, theme color-mix tokens, 18px stroke, 3px sheen |
| **Site Bow** | `src/components/ui/site-bow.tsx` | ✅ Live | Bespoke vector French coquette satin bow taking `currentColor` from theme accent |
| **Interactive Hover Button** | `src/components/ui/interactive-hover-button.tsx` | ✅ Live | shadcn-compliant expanding dot hover button with theme tokens and ArrowRight reveal |
| **Interactive Button Demo** | `src/components/ui/interactive-hover-button-demo.tsx` | ✅ Live | Standalone demo component for the interactive hover button |
| **Global Navigation** | `src/components/layout/Navbar.tsx` | ✅ Live | Editorial linen top bar, C monogram logo, boutique links, audio toggle, bag counter |
| **Fanned Case Hero** | `src/components/sections/HeroSection.tsx` | ✅ Live | 3 rising rear phone cases with realistic camera modules, InteractiveHoverButton CTA |
| **Product Slider** | `src/components/sections/ProductSlider.tsx` | ✅ Live | Sandstone pinstripe theme, compact cards, color swatches, drop ratings, wishlist |
| **Armor Engineering** | `src/components/sections/FeatureHighlights.tsx` | ✅ Live | Porcelain dot matrix theme, 10ft kinetic airbag rails, flush N52 MagSafe |
| **Lifestyle Community** | `src/components/sections/LifestyleGallery.tsx` | ✅ Live | Dusty rose ribbon weave theme, verified patron photo frames |
| **Store Locator** | `src/components/sections/StoreLocator.tsx` | ✅ Live | Architectural taupe theme, interactive vector map, 5 flagships, appointment booking |
| **Unboxing Perks** | `src/components/sections/UnboxingPerks.tsx` | ✅ Live | Festive silk blush theme, linen drawer box, pearl wristlet tether, $50 screen pledge |
| **Concierge Contact** | `src/components/sections/ContactSection.tsx` | ✅ Live | Chamois linen theme, VIP studio desk, phone lines, interactive note form |
| **Footer & Gazette** | `src/components/layout/Footer.tsx` | ✅ Live | Deep velvet ink & rose theme, newsletter card, 4 value pillars, boutique directory |
| **Detail Modal** | `src/components/ui/ProductDetailModal.tsx` | ✅ Live | Model dropdown, hue swatches, anatomy specs, champagne confetti add-to-bag |
| **Cart Drawer** | `src/components/ui/CartDrawer.tsx` | ✅ Live | Free worldwide shipping progress bar, quantity controls, gift packaging reminder |

---

### E. Tangible Depth & Inner Panel Blurred Shadow System
- **Recessed Inner Well (`.inner-case-well`)**:
  - Implemented multi-layer blurred depth shadows across all product case containers, modal previews, and cart drawers:
    - Inset ambient blur: `inset 0 4px 14px 0 rgba(31, 26, 27, 0.10)`
    - Inset hairline contour: `inset 0 1px 4px 0 rgba(31, 26, 27, 0.06)`
    - Bottom highlight rim: `0 2px 8px 0 rgba(255, 255, 255, 0.85)`
    - Soft diffuse shadow: `0 4px 12px -2px rgba(31, 26, 27, 0.04)`
  - Elevated phone case packshot drop-shadows: `drop-shadow-[0_12px_20px_rgba(31,26,27,0.22)]` rising on hover to `drop-shadow-[0_16px_26px_rgba(200,109,122,0.32)]`.
- **Card & Surface Elevation (`.ceramic-panel`)**:
  - Upgraded cards with soft diffused blurred drop shadows (`0 12px 32px -8px rgba(31, 26, 27, 0.09), 0 4px 14px -2px rgba(31, 26, 27, 0.05)`).
- **Applied Systemwide**:
  - Product Slider packshot wells (`ProductSlider.tsx`)
  - Engineering & Armor icon tiles (`FeatureHighlights.tsx`)
  - Community photo frames (`LifestyleGallery.tsx`)
  - Stylized world vector map canvas and boutique dossier wells (`StoreLocator.tsx`)
  - Atelier gifting ritual perk tiles and casket packaging (`UnboxingPerks.tsx`)
  - Concierge channel tiles, form input fields, and select menus (`ContactSection.tsx`)
  - Deep-dive product preview showcase and device selectors (`ProductDetailModal.tsx`)
  - Cart drawer item containers and thumbnail wells (`CartDrawer.tsx`)

---

## 3. Component Architecture & Page Blueprint

| Section / Component | File Path | Status | Key Features |
| :--- | :--- | :--- | :--- |
| **Ribbon Scroll** | `src/components/ui/ribbon-scroll.tsx` | ✅ Live | Framer Motion scroll-drawn satin ribbon, theme color-mix tokens, 18px stroke, 3px sheen |
| **Site Bow** | `src/components/ui/site-bow.tsx` | ✅ Live | Bespoke vector French coquette satin bow taking `currentColor` from theme accent |
| **Interactive Hover Button** | `src/components/ui/interactive-hover-button.tsx` | ✅ Live | shadcn-compliant expanding dot hover button with theme tokens and ArrowRight reveal |
| **Interactive Button Demo** | `src/components/ui/interactive-hover-button-demo.tsx` | ✅ Live | Standalone demo component for the interactive hover button |
| **Global Navigation** | `src/components/layout/Navbar.tsx` | ✅ Live | Editorial linen top bar, C monogram logo, boutique links, audio toggle, bag counter |
| **Fanned Case Hero** | `src/components/sections/HeroSection.tsx` | ✅ Live | 3 rising rear phone cases with realistic camera modules, InteractiveHoverButton CTA |
| **Product Slider** | `src/components/sections/ProductSlider.tsx` | ✅ Live | Sandstone pinstripe theme, `.inner-case-well` recessed depth shadows, color swatches |
| **Armor Engineering** | `src/components/sections/FeatureHighlights.tsx` | ✅ Live | Porcelain dot matrix theme, depth-shadowed icon tiles, 10ft kinetic airbag rails |
| **Lifestyle Community** | `src/components/sections/LifestyleGallery.tsx` | ✅ Live | Dusty rose ribbon weave theme, depth-shadowed photo frames, verified patron stories |
| **Store Locator** | `src/components/sections/StoreLocator.tsx` | ✅ Live | Architectural taupe theme, depth-shadowed vector map & boutique dossier wells |
| **Unboxing Perks** | `src/components/sections/UnboxingPerks.tsx` | ✅ Live | Festive silk blush theme, depth-shadowed perk tiles, linen drawer box |
| **Concierge Contact** | `src/components/sections/ContactSection.tsx` | ✅ Live | Chamois linen theme, depth-shadowed inputs & VIP concierge desk tiles |
| **Footer & Gazette** | `src/components/layout/Footer.tsx` | ✅ Live | Deep velvet ink & rose theme, newsletter card, 4 value pillars, boutique directory |
| **Detail Modal** | `src/components/ui/ProductDetailModal.tsx` | ✅ Live | Depth-shadowed product showcase well, anatomy specs, champagne confetti add-to-bag |
| **Cart Drawer** | `src/components/ui/CartDrawer.tsx` | ✅ Live | Depth-shadowed thumbnail wells, free shipping progress bar, quantity controls |

### F. Mobile & Android / iOS Performance Architecture
- **Interactive Phone Elevation on Touchscreen**:
  - Attached native non-passive DOM listeners (`touchstart`, `touchmove`, `touchend`, `touchcancel`) to `deckRef` to bypass mobile passive-scroll restrictions.
  - Mathematical center-offset algorithm (`getCardIndexAtX`) dynamically tracks horizontal finger coordinates across the 3 phones without relying on fragile DOM hit-testing over transparent layers.
  - Horizontal swipe detection locks custom scrubbing while allowing natural vertical page scrolls (`touch-action: pan-y`).
  - Elevated phone transforms (`currentY = -52px` to `-44px`, `scale = 1.08x`, un-tilting to near 0°) with 3.5s linger on `touchend` so mobile users can admire the phone details.
  - Integrated a 3-chip mobile edition switcher (`[ Strawberry ] [ Cloud Bunny ] [ Boba Bear ]`) directly below the phones for 1-tap mobile selection.
- **Scroll & GPU Lag Elimination**:
  - Removed full-document Gaussian blur SVG filter rasterization on the 5000px ribbon canvas; replaced with hardware-accelerated vector shadow path.
  - Disabled continuous translation sway on mobile screens (`size.w < 640`) to prevent composite layer re-paints during rapid mobile scrolling.
  - Eliminated noise texture re-rasterization by anchoring it to a fixed `body::after` compositor layer (`transform: translateZ(0)`).
  - Added `-webkit-tap-highlight-color: transparent` and `touch-action: manipulation` across all buttons, inputs, and links to eliminate the mobile 300ms tap delay.
- **Audio Node Memory Management**:
  - Added `osc.onended` automatic node disconnection on both `playChime()` and `playNextNote()` in `src/lib/audio.ts` to prevent Web Audio oscillator accumulation on iOS Safari.

---

## 4. Verification Checkpoints
- **Dev Server Local**: **`http://localhost:5173/`**
- **Dev Server Wi-Fi (Mobile Access)**: **`http://192.168.1.73:5173/`**
- **Mobile Touch Testing**: Verified touch scrubbing & 1-tap phone elevation across Android & iOS touchscreens.
- **Atelier Sound**: Enabled ON by default with Web Audio auto-start, visualizer equalizer, and node cleanup.
- **Ribbon Animation**: Pure vector-rendered 60-120fps background satin ribbon with coquette bow tip.
- **TypeScript Build**: `npm run build` compiled cleanly with 0 errors.
