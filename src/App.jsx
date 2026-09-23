import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import ProductCatalog from './components/ProductCatalog';
import ProductModal from './components/ProductModal';
import AIStylistDrawer from './components/AIStylistDrawer';
import CartDrawer from './components/CartDrawer';
import SellModal from './components/SellModal';
import Footer from './components/Footer';
import { INITIAL_PRODUCTS } from './data/mockProducts';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [cartItems, setCartItems] = useState([]);
  
  // Modales y Drawers
  const [isStylistOpen, setIsStylistOpen] = useState(false);
  const [stylistInitialProduct, setStylistInitialProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);

  // Manejadores del Carrito
  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) return prev;
      return [...prev, product];
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Agregar prenda vendida por el usuario
  const handleAddProduct = (newProduct) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  // Preguntar al AI Stylist sobre un producto específico
  const handleAskStylistAboutProduct = (product) => {
    setStylistInitialProduct(product);
    setIsStylistOpen(true);
  };

  // Navegación suave a secciones
  const handleScrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#09090d] text-gray-100 selection:bg-[#ff2a85] selection:text-white">
      
      {/* Navbar Superior */}
      <Navbar
        cartCount={cartItems.length}
        onOpenStylist={() => {
          setStylistInitialProduct(null);
          setIsStylistOpen(true);
        }}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSellModal={() => setIsSellModalOpen(true)}
        onScrollToSection={handleScrollToSection}
      />

      {/* Contenido Principal */}
      <main className="flex-1">
        
        {/* Banner Hero */}
        <HeroBanner
          onOpenStylist={() => {
            setStylistInitialProduct(null);
            setIsStylistOpen(true);
          }}
          onExploreCatalog={() => handleScrollToSection('catalog')}
        />

        {/* Catálogo de Ropa Curada con Filtros */}
        <ProductCatalog
          products={products}
          cartItems={cartItems}
          onSelectProduct={(product) => setSelectedProduct(product)}
          onAskStylistAboutProduct={handleAskStylistAboutProduct}
          onAddToCart={handleAddToCart}
          onOpenStylist={() => {
            setStylistInitialProduct(null);
            setIsStylistOpen(true);
          }}
        />

      </main>

      {/* Footer */}
      <Footer
        onOpenStylist={() => {
          setStylistInitialProduct(null);
          setIsStylistOpen(true);
        }}
      />

      {/* Botón Flotante Permanente para abrir el AI Stylist */}
      <div className="fixed bottom-6 right-6 z-30">
        <button
          onClick={() => {
            setStylistInitialProduct(null);
            setIsStylistOpen(true);
          }}
          className="group relative flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-bc-gradient text-white font-bold text-sm shadow-bc-glow hover:scale-105 active:scale-95 transition-all cursor-pointer"
          title="Abrir Asesor de Imagen por IA"
        >
          <Sparkles className="w-5 h-5 text-white animate-spin" style={{ animationDuration: '8s' }} />
          <span>AI Stylist</span>
        </button>
      </div>

      {/* Modal de Detalle de Producto */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        isInCart={selectedProduct ? cartItems.some((i) => i.id === selectedProduct.id) : false}
        onAskStylist={handleAskStylistAboutProduct}
      />

      {/* Drawer del Chatbot AI Stylist */}
      <AIStylistDrawer
        isOpen={isStylistOpen}
        onClose={() => setIsStylistOpen(false)}
        onSelectProduct={(product) => setSelectedProduct(product)}
        onAddToCart={handleAddToCart}
        initialQueryProduct={stylistInitialProduct}
      />

      {/* Drawer del Carrito */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveFromCart={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onOpenStylist={() => {
          setStylistInitialProduct(null);
          setIsStylistOpen(true);
        }}
      />

      {/* Modal de Publicar Prenda para Vender */}
      <SellModal
        isOpen={isSellModalOpen}
        onClose={() => setIsSellModalOpen(false)}
        onAddProduct={handleAddProduct}
      />

    </div>
  );
}
