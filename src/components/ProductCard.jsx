import React from 'react';
import { Sparkles, ShoppingBag, Check } from 'lucide-react';

export default function ProductCard({
  product,
  onSelectProduct,
  onAskStylistAboutProduct,
  onAddToCart,
  isInCart
}) {
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="group relative rounded-2xl bg-[#12121b] border border-white/10 hover:border-[#ff2a85]/50 transition-all duration-300 flex flex-col overflow-hidden shadow-lg hover:shadow-2xl">
      
      {/* Contenedor de Imagen */}
      <div 
        className="relative aspect-[4/5] w-full overflow-hidden bg-black/40 cursor-pointer"
        onClick={() => onSelectProduct(product)}
      >
        <img
          src={product.images[0]}
          alt={product.title}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Descuento si aplica */}
        {discount > 0 && (
          <div className="absolute top-3 left-3 z-10">
            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-[#ff2a85] text-white">
              -{discount}%
            </span>
          </div>
        )}

        {/* Muestra de color y estación */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-medium bg-black/75 text-gray-200 border border-white/10 backdrop-blur-md">
            <span 
              className="w-2.5 h-2.5 rounded-full border border-white/30" 
              style={{ backgroundColor: product.colorHex }}
            ></span>
            <span>{product.color}</span>
          </span>
        </div>

        {/* Talla */}
        <div className="absolute top-3 right-3 z-10">
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-black/75 text-gray-300 border border-white/10 backdrop-blur-md">
            Talla {product.size}
          </span>
        </div>

      </div>

      {/* Información del Producto */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        
        <div>
          <div className="flex items-center justify-between text-[11px] text-gray-400 mb-1">
            <span className="font-semibold uppercase tracking-wider text-amber-400">
              {product.brand}
            </span>
            <span className="text-gray-500">
              {product.style}
            </span>
          </div>

          <h3 
            className="text-sm font-bold text-white line-clamp-1 hover:text-[#ff8a00] cursor-pointer transition-colors"
            onClick={() => onSelectProduct(product)}
            title={product.title}
          >
            {product.title}
          </h3>

          <div className="mt-1 flex items-center gap-2">
            <span className="text-[10px] font-medium text-gray-300">
              {product.material}
            </span>
            <span className="text-[10px] text-gray-400">
              • {product.condition}
            </span>
          </div>
        </div>

        {/* Precios y Acciones */}
        <div className="pt-2 border-t border-white/10 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black text-white">
                Bs. {product.price}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-gray-500 line-through">
                  Bs. {product.originalPrice}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Consultar con AI Stylist */}
            <button
              onClick={() => onAskStylistAboutProduct(product)}
              className="p-2 rounded-xl bg-white/5 hover:bg-bc-gradient text-gray-300 hover:text-white border border-white/10 hover:border-transparent transition-all cursor-pointer"
              title="Preguntar al AI Stylist si me favorece esta prenda"
            >
              <Sparkles className="w-4 h-4 text-[#ff8a00] group-hover:text-white" />
            </button>

            {/* Añadir al Carrito */}
            <button
              onClick={() => onAddToCart(product)}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                isInCart 
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300' 
                  : 'bg-white/10 hover:bg-white/20 border-white/10 text-white'
              }`}
              title={isInCart ? 'En el carrito' : 'Añadir al carrito'}
            >
              {isInCart ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
