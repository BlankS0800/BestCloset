import React from 'react';
import { X, Sparkles, ShoppingBag, Check, Star } from 'lucide-react';

export default function ProductModal({
  product,
  onClose,
  onAddToCart,
  isInCart,
  onAskStylist
}) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0f0f18] border border-white/15 shadow-2xl p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón Cerrar */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Columna de Imágenes */}
          <div className="space-y-3">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-black border border-white/10">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images[1] && (
              <div className="aspect-[16/9] rounded-xl overflow-hidden bg-black border border-white/10">
                <img
                  src={product.images[1]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Columna de Detalles */}
          <div className="flex flex-col justify-between space-y-6">
            
            <div className="space-y-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#ff8a00]">
                  {product.brand}
                </span>
                <h2 className="text-2xl font-black text-white leading-snug mt-1">
                  {product.title}
                </h2>
              </div>

              {/* Precios */}
              <div className="flex items-baseline gap-3 pt-1">
                <span className="text-3xl font-black text-white">
                  Bs. {product.price}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-sm text-gray-500 line-through">
                    Bs. {product.originalPrice}
                  </span>
                )}
              </div>

              {/* Atributos Clave */}
              <div className="grid grid-cols-2 gap-2 text-xs pt-2">
                <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Material</span>
                  <span className="text-white font-semibold">{product.material}</span>
                </div>
                <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Talla & Calce</span>
                  <span className="text-white font-semibold">{product.size}</span>
                </div>
                <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Condición</span>
                  <span className="text-white font-semibold">{product.condition}</span>
                </div>
                <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Colorimetría</span>
                  <span className="text-amber-300 font-semibold">{product.colorSeason}</span>
                </div>
              </div>

              {/* Descripción */}
              <div className="space-y-1 pt-2">
                <h4 className="text-xs font-bold text-gray-300">Detalles de la Prenda</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {product.description}
                </p>
                {product.measurements && (
                  <p className="text-[11px] text-gray-500 pt-1">
                    📐 Medidas: {product.measurements}
                  </p>
                )}
              </div>

              {/* Info del Vendedor */}
              <div className="rounded-xl bg-white/[0.03] border border-white/10 p-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#ff2a85] to-[#ff8a00] flex items-center justify-center text-white font-bold text-sm">
                    {product.seller.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-white">
                      {product.seller.name}
                    </div>
                    <div className="text-[10px] text-gray-400 flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span>{product.seller.rating} ({product.seller.salesCount} ventas)</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Botones de Acción */}
            <div className="space-y-2 pt-3 border-t border-white/10">
              <button
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                className={`w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  isInCart
                    ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                    : 'bg-bc-gradient text-white shadow-bc-glow hover:opacity-95'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{isInCart ? 'Prenda en el Carrito' : 'Añadir al Carrito'}</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onAskStylist(product);
                }}
                className="w-full py-3 rounded-xl font-semibold text-xs text-gray-200 bg-white/5 hover:bg-white/10 border border-white/10 hover:text-white flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#ff8a00]" />
                <span>Consultar al AI Stylist cómo combinarla</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
