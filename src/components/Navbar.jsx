import React, { useState } from 'react';
import { Sparkles, ShoppingBag, PlusCircle, Menu, X } from 'lucide-react';
import logoImg from '../assets/best-closet-logo.jpg';

export default function Navbar({
  cartCount,
  onOpenStylist,
  onOpenCart,
  onOpenSellModal,
  onScrollToSection
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#09090d]/90 border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo Oficial Best Closet */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="relative overflow-hidden rounded-xl border border-white/15 bg-black p-1 shadow-lg hover:border-[#ff2a85] transition-colors">
              <img
                src={logoImg}
                alt="Best Closet Logo"
                className="h-10 w-auto object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <span className="text-xs font-semibold uppercase tracking-widest text-gray-300">
                Marketplace de Moda
              </span>
            </div>
          </div>

          {/* Navegación Desktop */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
            <button
              onClick={() => onScrollToSection('catalog')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Catálogo
            </button>
            <button
              onClick={onOpenStylist}
              className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-[#ff8a00]" />
              AI Stylist
            </button>
            <button
              onClick={onOpenSellModal}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Vender Prenda
            </button>
          </nav>

          {/* Acciones principales */}
          <div className="flex items-center gap-3">

            {/* Botón Destacado AI Stylist */}
            <button
              onClick={onOpenStylist}
              className="relative group p-0.5 rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95 cursor-pointer"
              title="Abrir Chatbot Asesor de Imagen por IA"
            >
              <span className="absolute inset-0 bg-bc-gradient animate-pulse opacity-85 group-hover:opacity-100 transition-opacity"></span>
              <span className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-[#0d0d14] text-xs sm:text-sm font-semibold text-white">
                <Sparkles className="w-4 h-4 text-[#ff8a00]" />
                <span>AI Stylist</span>
              </span>
            </button>

            {/* Vender Prenda */}
            <button
              onClick={onOpenSellModal}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-[#ff2a85]" />
              <span>Vender</span>
            </button>

            {/* Carrito */}
            <button
              onClick={onOpenCart}
              className="relative p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors cursor-pointer"
              title="Ver Carrito"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-[#ff2a85] to-[#ff8a00] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#09090d]">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Menú Mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white bg-white/5 border border-white/10 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10 space-y-3">
            <button
              onClick={() => { onScrollToSection('catalog'); setMobileMenuOpen(false); }}
              className="block w-full text-left px-3 py-2 rounded text-sm text-gray-200 hover:bg-white/5 cursor-pointer"
            >
              Catálogo
            </button>
            <button
              onClick={() => { onOpenStylist(); setMobileMenuOpen(false); }}
              className="flex items-center gap-2 w-full text-left px-3 py-2 rounded text-sm text-gray-200 hover:bg-white/5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#ff8a00]" />
              AI Stylist Chatbot
            </button>
            <button
              onClick={() => { onOpenSellModal(); setMobileMenuOpen(false); }}
              className="flex items-center gap-2 w-full text-left px-3 py-2 rounded text-sm font-semibold text-[#ff8a00] hover:bg-white/5 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              Vender Prenda
            </button>
          </div>
        )}

      </div>
    </header>
  );
}
