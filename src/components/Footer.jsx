import React from 'react';
import { Sparkles } from 'lucide-react';
import logoImg from '../assets/best-closet-logo.jpg';

export default function Footer({ onOpenStylist }) {
  return (
    <footer className="border-t border-white/10 bg-[#07070b] text-xs text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo & Marca */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-1 rounded-xl bg-black border border-white/15">
                <img 
                  src={logoImg} 
                  alt="Best Closet" 
                  className="h-9 w-auto object-contain"
                />
              </div>
              <span className="text-xs font-semibold text-gray-300">
                Marketplace de Moda
              </span>
            </div>
            <p className="text-gray-400 text-xs max-w-md leading-relaxed">
              Descubre ropa exclusiva curada y asesoría de estilo inteligente. Encuentra piezas de streetwear, minimalistas y de diseñador combinadas con precisión según tu colorimetría.
            </p>
          </div>

          {/* Navegación y Enlaces */}
          <div className="space-y-2">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">Explorar</h4>
            <ul className="space-y-1.5 text-xs text-gray-400">
              <li><a href="#catalog" className="hover:text-white transition-colors">Catálogo de Ropa</a></li>
              <li><button onClick={onOpenStylist} className="hover:text-[#ff8a00] transition-colors text-left">Consultar Asesor</button></li>
            </ul>
          </div>

          {/* AI Stylist */}
          <div className="space-y-2">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">AI Stylist</h4>
            <ul className="space-y-1.5 text-xs text-gray-400">
              <li>
                <button onClick={onOpenStylist} className="hover:text-[#ff2a85] transition-colors flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#ff8a00]" />
                  <span>Chatbot de Imagen</span>
                </button>
              </li>
              <li><span>Diagnóstico de Colorimetría</span></li>
              <li><span>Recomendación de Materiales</span></li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500">
          <div>
            © {new Date().getFullYear()} Best Closet®. Todos los derechos reservados.
          </div>
          <div className="text-gray-400">
            Marketplace de Ropa y Asesoría Personalizada
          </div>
        </div>

      </div>
    </footer>
  );
}
