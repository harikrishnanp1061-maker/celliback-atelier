import { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { ProductSlider } from './components/sections/ProductSlider';
import { FeatureHighlights } from './components/sections/FeatureHighlights';
import { LifestyleGallery } from './components/sections/LifestyleGallery';
import { StoreLocator } from './components/sections/StoreLocator';
import { UnboxingPerks } from './components/sections/UnboxingPerks';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/layout/Footer';
import { ProductDetailModal } from './components/ui/ProductDetailModal';
import { CartDrawer, type CartItem } from './components/ui/CartDrawer';
import { RibbonScroll } from './components/ui/ribbon-scroll';
import { SiteBow } from './components/ui/site-bow';
import { PRODUCTS, type Product } from './data/products';

export function App() {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    // Pre-populate with 1 sample item for immediate tactile feel
    {
      id: 'bunny-sample-1',
      productId: 'bunny-cloud-hop',
      name: 'Cloud Bunny Hop Edition',
      image: '/images/bunny_cloud_case.jpg',
      price: 34.99,
      model: 'iPhone 16 Pro Max',
      color: 'Cloud Cream White',
      quantity: 1,
    }
  ]);

  const selectedProduct = selectedProductId
    ? PRODUCTS.find((p) => p.id === selectedProductId) || null
    : null;

  const handleAddToCart = (product: Product, model: string, color: string, quantity: number) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === product.id && item.model === model && item.color === color
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      } else {
        return [
          ...prev,
          {
            id: `${product.id}-${model}-${color}-${Date.now()}`,
            productId: product.id,
            name: product.name,
            image: product.image,
            price: product.price,
            model,
            color,
            quantity,
          }
        ];
      }
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const scrollToCollection = () => {
    const el = document.getElementById('collection');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAF4ED] text-[#1F1A1B] flex flex-col font-sans selection:bg-[#F7D6DB] selection:text-[#1F1A1B] relative overflow-x-hidden">
      {/* Persistent Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Decorative Wandering S-Curve Satin Ribbon that draws down the page background as user scrolls */}
      <RibbonScroll bow={<SiteBow />} className="flex-1">
        <main>
          {/* Hero Section: 3 fanned phone case collector edition cards */}
          <HeroSection
            onExploreClick={scrollToCollection}
            onSelectProduct={(id) => setSelectedProductId(id)}
          />

          {/* Handcrafted Editions Product Slider: Warm Sandstone & Pinstripe Texture */}
          <ProductSlider
            onSelectProduct={(id) => setSelectedProductId(id)}
          />

          {/* Engineering & Drop Armor Highlights: Porcelain Ceramic & Micro-Grid Texture */}
          <FeatureHighlights />

          {/* Community & Lifestyle Showcase: Dusty Petal Rose & Satin Ribbon Weave */}
          <LifestyleGallery />

          {/* Interactive Boutique Mini-Map: Architectural Taupe-Sandstone */}
          <StoreLocator />

          {/* Gifty Packaging & Unboxing Ceremony: Festive Silk Blush */}
          <UnboxingPerks />

          {/* Direct Studio Concierge & Contact: Chamois Linen & Ceramic Ecru */}
          <ContactSection />
        </main>
      </RibbonScroll>

      {/* Footer: Deep Velvet Ink & Rose-Cocoa */}
      <Footer />

      {/* Deep-Dive Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProductId(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
}

export default App;
