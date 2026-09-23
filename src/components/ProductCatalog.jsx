import React, { useState, useMemo } from 'react';
import { Search, Filter, RotateCcw, Sparkles } from 'lucide-react';
import ProductCard from './ProductCard';
import { CATEGORIES, STYLES, MATERIALS, COLOR_SEASONS } from '../data/mockProducts';

export default function ProductCatalog({
  products,
  cartItems,
  onSelectProduct,
  onAskStylistAboutProduct,
  onAddToCart,
  onOpenStylist
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedStyle, setSelectedStyle] = useState('Todos');
  const [selectedMaterial, setSelectedMaterial] = useState('Todos');
  const [selectedSeason, setSelectedSeason] = useState('Todos');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Filtrado reactivo de productos
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Búsqueda por texto
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchBrand = item.brand.toLowerCase().includes(q);
        const matchMaterial = item.material.toLowerCase().includes(q);
        const matchColor = item.color.toLowerCase().includes(q);
        if (!matchTitle && !matchBrand && !matchMaterial && !matchColor) return false;
      }

      // Filtro Categoría
      if (selectedCategory !== 'Todos' && item.category !== selectedCategory) {
        return false;
      }

      // Filtro Estilo
      if (selectedStyle !== 'Todos' && item.style !== selectedStyle) {
        return false;
      }

      // Filtro Material
      if (selectedMaterial !== 'Todos' && !item.material.includes(selectedMaterial)) {
        return false;
      }

      // Filtro Estación de Color
      if (selectedSeason !== 'Todos' && item.colorSeason !== selectedSeason) {
        return false;
      }

      return true;
    });
  }, [products, searchQuery, selectedCategory, selectedStyle, selectedMaterial, selectedSeason]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Todos');
    setSelectedStyle('Todos');
    setSelectedMaterial('Todos');
    setSelectedSeason('Todos');
  };

  const hasActiveFilters = 
    searchQuery || 
    selectedCategory !== 'Todos' || 
    selectedStyle !== 'Todos' || 
    selectedMaterial !== 'Todos' || 
    selectedSeason !== 'Todos';

  return (
    <section id="catalog" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Encabezado del Catálogo */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Colección Disponible
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Prendas seleccionadas por materiales nobles, cortes y paletas cromáticas analizadas por nuestro AI Stylist.
          </p>
        </div>

        {/* Buscador Rápido y Toggle Filtros */}
        <div className="flex items-center gap-2.5">
          <div className="relative flex-1 sm:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por lino, seda, estilo, marca..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff2a85] transition-colors"
            />
          </div>

          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className={`px-3 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              showAdvancedFilters || hasActiveFilters
                ? 'bg-bc-gradient text-white border-transparent'
                : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filtros</span>
          </button>
        </div>
      </div>

      {/* Barra de Categorías Rápidas */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-white text-black font-bold shadow-md'
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Filtros Avanzados Desplegables (Estilo, Material, Colorimetría) */}
      {showAdvancedFilters && (
        <div className="mb-8 p-5 rounded-2xl bg-[#12121b] border border-white/10 space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-300">
              Filtros Avanzados de Moda
            </span>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-xs font-semibold text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Limpiar Filtros
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            
            {/* Filtro Estilo */}
            <div>
              <label className="block text-gray-400 font-semibold mb-1.5">Estilo de Ropa</label>
              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-black/40 border border-white/15 text-white focus:outline-none focus:border-[#ff8a00]"
              >
                {STYLES.map((st) => (
                  <option key={st} value={st} className="bg-[#12121b]">{st}</option>
                ))}
              </select>
            </div>

            {/* Filtro Material */}
            <div>
              <label className="block text-gray-400 font-semibold mb-1.5">Material Textil</label>
              <select
                value={selectedMaterial}
                onChange={(e) => setSelectedMaterial(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-black/40 border border-white/15 text-white focus:outline-none focus:border-[#ff8a00]"
              >
                {MATERIALS.map((mat) => (
                  <option key={mat} value={mat} className="bg-[#12121b]">{mat}</option>
                ))}
              </select>
            </div>

            {/* Filtro Colorimetría Estacional */}
            <div>
              <label className="block text-gray-400 font-semibold mb-1.5">Colorimetría Recomendada</label>
              <select
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-black/40 border border-white/15 text-white focus:outline-none focus:border-[#ff8a00]"
              >
                {COLOR_SEASONS.map((sn) => (
                  <option key={sn} value={sn} className="bg-[#12121b]">{sn}</option>
                ))}
              </select>
            </div>

          </div>
        </div>
      )}

      {/* Grid de Productos */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const inCart = cartItems.some((item) => item.id === product.id);
            return (
              <ProductCard
                key={product.id}
                product={product}
                isInCart={inCart}
                onSelectProduct={onSelectProduct}
                onAskStylistAboutProduct={onAskStylistAboutProduct}
                onAddToCart={onAddToCart}
              />
            );
          })}
        </div>
      ) : (
        /* Estado vacío si no hay coincidencias */
        <div className="py-16 text-center rounded-2xl bg-white/5 border border-white/10 space-y-4">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto text-2xl">
            👕
          </div>
          <h3 className="text-lg font-bold text-white">No encontramos prendas con esos filtros</h3>
          <p className="text-xs text-gray-400 max-w-sm mx-auto">
            Prueba ajustando la búsqueda o pregúntale al AI Stylist qué prendas similares te favorecen según tu foto.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={resetFilters}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
            >
              Restablecer Filtros
            </button>
            <button
              onClick={onOpenStylist}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-bc-gradient shadow-bc-glow hover:opacity-90 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Consultar al AI Stylist</span>
            </button>
          </div>
        </div>
      )}

    </section>
  );
}
