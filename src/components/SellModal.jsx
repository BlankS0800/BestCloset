import React, { useState, useRef } from 'react';
import { X, PlusCircle, Upload, Trash2, Camera, CheckCircle2, AlertCircle, Link2 } from 'lucide-react';
import { CATEGORIES, STYLES, MATERIALS } from '../data/mockProducts';

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&auto=format&fit=crop&q=80';

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

  // Estados de Imagen
  const [imagePreview, setImagePreview] = useState('');
  const [fileName, setFileName] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [useUrlInput, setUseUrlInput] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleFileProcess = (file) => {
    setUploadError('');
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Por favor selecciona un archivo de imagen válido (JPG, PNG, WebP).');
      return;
    }

    // 10 MB límite
    if (file.size > 10 * 1024 * 1024) {
      setUploadError('La imagen es demasiado pesada. El tamaño máximo permitido es 10MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setImagePreview(event.target.result);
      setFileName(file.name);
      setUploadError('');
    };
    reader.onerror = () => {
      setUploadError('Ocurrió un error al leer la imagen.');
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview('');
    setFileName('');
    setImageUrl('');
    setUploadError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleApplyUrl = (e) => {
    e.preventDefault();
    if (!imageUrl.trim()) return;
    setImagePreview(imageUrl.trim());
    setFileName('Imagen por URL');
    setUploadError('');
  };

  const resetForm = () => {
    setTitle('');
    setBrand('');
    setCategory(CATEGORIES[1]);
    setStyle(STYLES[1]);
    setMaterial(MATERIALS[1]);
    setSize('M');
    setCondition('Nuevo con etiqueta');
    setPrice(80);
    setDescription('');
    setImagePreview('');
    setFileName('');
    setImageUrl('');
    setUploadError('');
    setUseUrlInput(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || price <= 0) return;

    const finalImage = imagePreview || DEFAULT_IMAGE;

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
      images: [finalImage],
      description: description.trim() || 'Prenda en excelente estado, revisada minuciosamente.',
      measurements: 'Medidas estándar de fabricante',
      authenticityVerified: true,
      inspectionCertificateId: 'BC-AUTH-NEW'
    };

    onAddProduct(newProduct);
    resetForm();
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
            onClick={handleClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* Subir Imagen de la Prenda */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-gray-300 font-semibold">
                Fotografía de la prenda <span className="text-[#ff2a85]">*</span>
              </label>
              <button
                type="button"
                onClick={() => setUseUrlInput(!useUrlInput)}
                className="text-[11px] text-[#ff8a00] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Link2 className="w-3 h-3" />
                {useUrlInput ? 'Subir archivo de mi equipo' : 'Usar URL externa'}
              </button>
            </div>

            {useUrlInput && (
              <div className="flex gap-2 mb-2">
                <input
                  type="url"
                  placeholder="https://ejemplo.com/foto-de-tu-ropa.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="flex-1 p-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#ff2a85]"
                />
                <button
                  type="button"
                  onClick={handleApplyUrl}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition cursor-pointer"
                >
                  Cargar
                </button>
              </div>
            )}

            {/* Input nativo oculto */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileInputChange}
              accept="image/*"
              className="hidden"
            />

            {!imagePreview ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-2xl p-6 transition-all duration-200 cursor-pointer flex flex-col items-center justify-center text-center group ${
                  isDragging
                    ? 'border-[#ff2a85] bg-[#ff2a85]/10 scale-[1.01]'
                    : 'border-white/15 bg-white/[0.02] hover:border-[#ff2a85]/60 hover:bg-white/[0.04]'
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#ff2a85] group-hover:scale-110 group-hover:bg-[#ff2a85]/10 transition-transform mb-3">
                  <Upload className="w-6 h-6" />
                </div>
                <p className="text-white font-medium text-sm">
                  Haz clic para subir o arrastra tu foto aquí
                </p>
                <p className="text-gray-400 text-[11px] mt-1">
                  Formatos soportados: JPG, PNG, WEBP (hasta 10MB)
                </p>
                <div className="mt-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 text-[11px] text-gray-300 border border-white/10">
                  <Camera className="w-3.5 h-3.5 text-[#ff8a00]" />
                  <span>Se mostrará como foto principal en el catálogo</span>
                </div>
              </div>
            ) : (
              /* Vista previa de la imagen cargada */
              <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-[#141420] p-3 flex items-center gap-4">
                <div className="relative w-24 h-28 rounded-xl overflow-hidden bg-black flex-shrink-0 border border-white/10 shadow-md">
                  <img
                    src={imagePreview}
                    alt="Vista previa de la prenda"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-1 right-1 bg-black/80 p-1 rounded-full text-emerald-400 shadow">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-xs">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Foto lista para publicar</span>
                  </div>
                  <p className="text-gray-300 text-xs truncate font-mono bg-white/5 px-2 py-1 rounded-md border border-white/5">
                    {fileName || 'Foto de prenda seleccionada'}
                  </p>
                  <p className="text-gray-400 text-[11px]">
                    Esta foto se mostrará con alta calidad en el catálogo.
                  </p>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-medium transition cursor-pointer flex items-center gap-1.5"
                    >
                      <Upload className="w-3 h-3" />
                      Cambiar foto
                    </button>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="px-3 py-1.5 rounded-lg bg-red-500/15 hover:bg-red-500/25 text-red-300 text-[11px] font-medium transition cursor-pointer flex items-center gap-1.5"
                    >
                      <Trash2 className="w-3 h-3" />
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            )}

            {uploadError && (
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{uploadError}</span>
              </div>
            )}
          </div>

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
              onClick={handleClose}
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
