import React, { useState } from 'react';
import { X, PlusCircle } from 'lucide-react';
import { CATEGORIES, STYLES, MATERIALS } from '../data/mockProducts';

export default function SellModal({ isOpen, onClose, onAddProduct }) {
  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState(CATEGORIES[1]);
  const [style, setStyle] = useState(STYLES[1]);
  const [material, setMaterial] = useState(MATERIALS[1]);
  const [size, setSize] = useState('M');
  const [condition, setCondition] = useState('Nuevo con etiqueta');
  const [price, setPrice] = useState(80);
  const [description, setDescription] = useState('');
  const [imagePreview, setImagePreview] = useState('https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&auto=format&fit=crop&q=80');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || price <= 0) return;

    const newProduct = {
      id: 'bc-seller-' + Date.now(),
      title: title.trim(),
      brand: brand.trim() || 'Marca Independiente',
      category,
      style,
      material,
      size,
      condition,
      price: Number(price),
      originalPrice: Math.round(price * 1.3),
      color: 'Neutro Elegante',
      colorHex: '#8C857B',
      colorSeason: 'Neutro Universal',
      seller: {
        name: 'Tú',
        verified: true,
        rating: 5.0,
        salesCount: 1
      },
      images: [imagePreview],
      description: description.trim() || 'Prenda en excelente estado, revisada minuciosamente.',
      measurements: 'Medidas estándar de fabricante',
      authenticityVerified: true,
      inspectionCertificateId: 'BC-AUTH-NEW'
    };

    onAddProduct(newProduct);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0f0f18] border border-white/15 shadow-2xl p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-[#ff2a85]/15 text-[#ff2a85]">
                <PlusCircle className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Publicar Prenda</h3>
            </div>
            <p className="text-xs text-gray-400">
              Añade una prenda a la venta en Best Closet.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 font-semibold mb-1">Título de la prenda *</label>
              <input
                type="text"
                required
                placeholder="Ej: Camisa de Lino Manga Larga"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#ff2a85]"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-semibold mb-1">Marca / Diseñador</label>
              <input
                type="text"
                placeholder="Ej: Massimo Dutti, Zara, Vintage..."
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#ff2a85]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-gray-400 mb-1">Categoría</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 rounded-lg bg-[#181824] border border-white/15 text-white"
              >
                {CATEGORIES.filter(c => c !== 'Todos').map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-400 mb-1">Material Principal</label>
              <select
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                className="w-full p-2 rounded-lg bg-[#181824] border border-white/15 text-white"
              >
                {MATERIALS.filter(m => m !== 'Todos').map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-400 mb-1">Estilo</label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full p-2 rounded-lg bg-[#181824] border border-white/15 text-white"
              >
                {STYLES.filter(s => s !== 'Todos').map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-400 mb-1">Talla</label>
              <input
                type="text"
                placeholder="Ej: S, M, L, 32, 40..."
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full p-2 rounded-lg bg-white/5 border border-white/10 text-white"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-1">Condición</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full p-2 rounded-lg bg-[#181824] border border-white/15 text-white"
              >
                <option value="Nuevo con etiqueta">Nuevo con etiqueta</option>
                <option value="Como nuevo (1 uso)">Como nuevo (1 uso)</option>
                <option value="Excelente estado vintage">Excelente estado vintage</option>
                <option value="Buen estado">Buen estado</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-1">Descripción y Detalles</label>
            <textarea
              rows="2"
              placeholder="Describe corte, caída de la tela y cuidados..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#ff2a85]"
            ></textarea>
          </div>

          {/* Precio de venta */}
          <div className="rounded-2xl bg-white/5 border border-white/10 p-4 flex items-center justify-between">
            <label className="font-bold text-white text-sm">
              Precio de venta (Bs.) *
            </label>
            <div className="relative w-36">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xs">Bs.</span>
              <input
                type="number"
                min="10"
                max="5000"
                required
                value={price}
                onChange={(e) => setPrice(Math.max(1, Number(e.target.value)))}
                className="w-full pl-7 pr-3 py-2 rounded-lg bg-black/50 border border-white/20 text-white font-bold text-base focus:outline-none focus:border-[#ff2a85]"
              />
            </div>
          </div>

          {/* Botones */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl font-bold text-white bg-bc-gradient shadow-bc-glow hover:opacity-90 transition-all cursor-pointer"
            >
              Publicar Prenda
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
