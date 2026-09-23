import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles, X, Image as ImageIcon, Send, Loader2,
  ShoppingBag, Trash2
} from 'lucide-react';
import { optimizeImageForUpload } from '../services/colorimetryEngine';
import { consultAIStylist, getStoredApiKey } from '../services/geminiService';
import MarkdownMessage from './MarkdownMessage';

export default function AIStylistDrawer({
  isOpen,
  onClose,
  onSelectProduct,
  onAddToCart,
  initialQueryProduct = null
}) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      text: `👋 ¡Hola! Soy **MAX**.\n\nEstoy aquí para asesorarte con combinaciones de moda, outfits para cualquier ocasión o resolver tus dudas de estilo.\n\n💡 **¿Cómo podemos empezar?**\n- Escríbeme qué ocasión o look buscas (ej. *"Tengo un matrimonio de noche"*, *"¿Cómo combinar un pantalón beige?"*).\n- O sube una **foto con el ícono de cámara 📸** para que diagnostique tu subtono de piel y **colorimetría** en tiempo real.`,
      colorimetry: null,
      recommendedProducts: [],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputText, setInputText] = useState('');

  // Estado de la imagen subida
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageOptimizationInfo, setImageOptimizationInfo] = useState(null);
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const fileInputRef = useRef(null);
  const chatBottomRef = useRef(null);

  const hasApiKey = Boolean(getStoredApiKey());

  // Si se abre el drawer con un producto específico consultado desde el catálogo
  useEffect(() => {
    if (initialQueryProduct && isOpen) {
      setInputText(`¿Cómo puedo combinar la ${initialQueryProduct.title} (${initialQueryProduct.material})?`);
    }
  }, [initialQueryProduct, isOpen]);

  // Scroll automático al último mensaje
  useEffect(() => {
    if (isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isAnalyzing, isOpen]);

  if (!isOpen) return null;

  // Manejador de subida de fotos con optimización cliente ultrarrápida
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsProcessingImage(true);
      // Redimensiona y comprime en el navegador a max 512px para respuesta instantánea (<30KB)
      const optimized = await optimizeImageForUpload(file, 512, 0.75);
      setUploadedImage(optimized.dataUrl);
      setImageOptimizationInfo(optimized);
    } catch (err) {
      alert('Error al procesar la foto: ' + err.message);
    } finally {
      setIsProcessingImage(false);
    }
  };

  const removeUploadedImage = () => {
    setUploadedImage(null);
    setImageOptimizationInfo(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Envío del mensaje al AI Stylist
  const handleSendMessage = async (customPromptText = null) => {
    const messageToSend = customPromptText || inputText;
    if (!messageToSend.trim() && !uploadedImage) return;

    const currentImageToSend = uploadedImage;
    const currentImageOpt = imageOptimizationInfo;

    const userMsgId = 'user-' + Date.now();
    const newUserMessage = {
      id: userMsgId,
      sender: 'user',
      text: messageToSend || '¿Qué recomendaciones y análisis de colorimetría tienes con esta foto?',
      image: currentImageToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputText('');
    setUploadedImage(null);
    setImageOptimizationInfo(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setIsAnalyzing(true);

    try {
      const imageToAnalyze = currentImageOpt || (currentImageToSend ? { dataUrl: currentImageToSend } : null);

      const stylistResponse = await consultAIStylist({
        imageOptimizationResult: imageToAnalyze,
        userMessage: messageToSend,
        chatHistory: messages
      });

      const botMsgId = 'bot-' + Date.now();
      const newBotMessage = {
        id: botMsgId,
        sender: 'bot',
        text: stylistResponse.text,
        colorimetry: stylistResponse.colorimetry,
        recommendedProducts: stylistResponse.recommendedProducts,
        engineUsed: stylistResponse.engineUsed,
        tokensUsed: stylistResponse.tokensUsed,
        savingsNote: stylistResponse.savingsNote,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, newBotMessage]);
    } catch (err) {
      console.error('Error al consultar AI Stylist:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: 'error-' + Date.now(),
          sender: 'bot',
          text: `Hubo un inconveniente al generar la recomendación. Por favor intenta de nuevo.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const quickPrompts = [
    'Hola, ¿cómo me puedes asesorar?',
    'Tengo un matrimonio de noche, ¿qué me pongo?',
    '¿Cómo saber qué colores favorecen mi tono de piel?',
    'Ideas de outfit para clima cálido con lino',
    'Cómo combinar una camisa relajada'
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm animate-fadeIn flex justify-end">
      <div
        className="relative w-full max-w-2xl h-full bg-[#0d0d14] border-l border-white/15 flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Header del Chatbot */}
        <div className="p-4 border-b border-white/10 bg-[#12121c] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative p-2 rounded-xl bg-bc-gradient text-white shadow-bc-glow">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">Best Closet AI Stylist</h3>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
              <p className="text-[11px] text-gray-400">
                Colorimetría estacional, asesoría de imagen y catálogo en tiempo real
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>



        {/* Área de Mensajes del Chat */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 text-sm">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              {/* Burbuja de Mensaje */}
              <div
                className={`max-w-[88%] rounded-2xl p-4 shadow-lg space-y-3 ${msg.sender === 'user'
                  ? 'bg-gradient-to-br from-[#ff2a85]/90 to-[#ff8a00]/90 text-white rounded-tr-none'
                  : 'bg-[#151522] border border-white/10 text-gray-200 rounded-tl-none'
                  }`}
              >
                {/* Si el usuario adjuntó foto */}
                {msg.image && (
                  <div className="rounded-xl overflow-hidden border border-white/20 max-w-[200px] mb-2 bg-black/40">
                    <img
                      src={msg.image}
                      alt="Foto subida"
                      className="w-full h-auto object-cover max-h-48"
                    />
                  </div>
                )}

                {/* Texto del mensaje con formato limpio */}
                <div className="leading-relaxed text-xs sm:text-sm">
                  <MarkdownMessage content={msg.text} />
                </div>

                {/* Widget de Colorimetría si el bot lo diagnosticó */}
                {msg.colorimetry && (
                  <div className="rounded-xl bg-black/40 border border-white/10 p-3 space-y-2 mt-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-amber-400 flex items-center gap-1">
                        🎨 Paleta Armónica Recomendada
                      </span>
                      <span className="text-[10px] text-gray-400">
                        Subtono: {msg.colorimetry.undertone}
                      </span>
                    </div>

                    {/* Muestras de colores */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      {msg.colorimetry.recommendedPalette?.map((col, idx) => (
                        <div key={idx} className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-md border border-white/5">
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-white/30"
                            style={{ backgroundColor: col.hex }}
                          ></span>
                          <span className="text-[10px] text-gray-300">{col.name}</span>
                        </div>
                      ))}
                    </div>

                    {msg.colorimetry.colorsToAvoid?.length > 0 && (
                      <div className="text-[10px] text-rose-400/90 pt-1">
                        <span className="font-semibold">⚠️ Evitar:</span> {msg.colorimetry.colorsToAvoid.join(', ')}
                      </div>
                    )}
                  </div>
                )}

                {/* Prendas Recomendadas del Catálogo dentro del Chat */}
                {msg.recommendedProducts && msg.recommendedProducts.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <div className="text-xs font-bold text-white">
                      Prendas recomendadas del catálogo:
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {msg.recommendedProducts.map(({ product }) => (
                        <div
                          key={product.id}
                          className="rounded-xl bg-[#0d0d14] border border-white/10 p-2.5 flex gap-2.5 hover:border-[#ff2a85]/50 transition-colors group cursor-pointer"
                          onClick={() => onSelectProduct(product)}
                        >
                          <img
                            src={product.images[0]}
                            alt={product.title}
                            className="w-16 h-20 object-cover rounded-lg shrink-0 border border-white/10"
                          />
                          <div className="flex-1 flex flex-col justify-between text-left min-w-0">
                            <div>
                              <div className="text-[10px] text-amber-400 font-bold uppercase truncate">
                                {product.brand}
                              </div>
                              <h4 className="text-xs font-bold text-white truncate group-hover:text-[#ff8a00]">
                                {product.title}
                              </h4>
                              <div className="text-[10px] text-gray-400 truncate">
                                {product.material} • Talla {product.size}
                              </div>
                            </div>

                            <div className="flex items-center justify-between pt-1">
                              <span className="text-xs font-black text-white">
                                Bs. {product.price}
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onAddToCart(product);
                                }}
                                className="px-2 py-1 rounded bg-white/10 hover:bg-emerald-600 text-white text-[10px] font-bold transition-colors flex items-center gap-1 cursor-pointer"
                              >
                                <ShoppingBag className="w-3 h-3" />
                                <span>Comprar</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/*
                {msg.engineUsed && (
                  <div className="flex items-center justify-between text-[10px] text-gray-400/80 pt-1 border-t border-white/5">
                    <span>⚙️ {msg.engineUsed}</span>
                    <span>Tokens: {msg.tokensUsed}</span>
                  </div>
                )}
                */}
              </div>

              <span className="text-[10px] text-gray-500 mt-1 px-1">
                {msg.timestamp}
              </span>
            </div>
          ))}

          {/* Loader mientras la IA analiza */}
          {isAnalyzing && (
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#151522] border border-white/10 max-w-[70%] animate-pulse">
              <Loader2 className="w-5 h-5 text-[#ff8a00] animate-spin" />
              <div className="text-xs text-gray-300">
                <p className="font-semibold text-white">MAX está preparando tu respuesta...</p>
                <p className="text-[11px] text-gray-400">Consultando catálogo y estilo.</p>
              </div>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Panel de Preguntas Rápidas */}
        <div className="px-4 py-2 border-t border-white/5 bg-[#101018] flex items-center gap-2 overflow-x-auto scrollbar-none">
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(prompt)}
              className="text-[11px] whitespace-nowrap px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 hover:border-[#ff2a85]/50 transition-colors cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Barra de Input & Botón de Subir Foto */}
        <div className="px-4 py-3 bg-[#0d0d14] border-t border-white/10 space-y-2">

          {/* Vista previa de imagen seleccionada */}
          {uploadedImage && (
            <div className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2">
                <img
                  src={uploadedImage}
                  alt="Vista previa"
                  className="w-10 h-10 rounded-lg object-cover border border-white/20"
                />
                <div className="text-[11px]">
                  <span className="font-bold text-emerald-400">Foto lista para analizar</span>
                  <div className="text-gray-400 text-[10px]">
                    Optimizada a {imageOptimizationInfo?.compressedApproxKb || '30'} KB
                  </div>
                </div>
              </div>
              <button
                onClick={removeUploadedImage}
                className="p-1 rounded-lg text-gray-400 hover:text-rose-400 hover:bg-rose-500/10 cursor-pointer"
                title="Eliminar foto"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}

          <div className="flex items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isProcessingImage || isAnalyzing}
              className={`p-2.5 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${uploadedImage
                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                : 'bg-white/5 hover:bg-white/10 border-white/15 text-gray-300 hover:text-white'
                }`}
              title="Subir foto para análisis de colorimetría"
            >
              {isProcessingImage ? (
                <Loader2 className="w-5 h-5 animate-spin text-[#ff8a00]" />
              ) : (
                <ImageIcon className="w-5 h-5 text-[#ff8a00]" />
              )}
            </button>

            <div className="relative flex-1">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder={uploadedImage ? "Pregúntame sobre esta foto o presiona Enviar..." : "Escribe qué buscas o sube una foto..."}
                className="w-full pl-4 pr-10 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff2a85] transition-colors"
              />
            </div>

            <button
              onClick={() => handleSendMessage()}
              disabled={isAnalyzing || (!inputText.trim() && !uploadedImage)}
              className="p-2.5 rounded-xl bg-bc-gradient shadow-bc-glow text-white hover:opacity-90 disabled:opacity-40 disabled:hover:opacity-40 transition-all cursor-pointer"
              title="Enviar al AI Stylist"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
