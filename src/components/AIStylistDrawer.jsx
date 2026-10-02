import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles, X, Image as ImageIcon, Send, Loader2,
  ShoppingBag, Trash2, Lock, Unlock, QrCode, CreditCard,
  CheckCircle2, ShieldCheck, ArrowLeft, RefreshCw, Smartphone
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
  // Estado de desbloqueo del chatbot (Persistido en localStorage)
  const [isUnlocked, setIsUnlocked] = useState(() => {
    return localStorage.getItem('bc_ai_stylist_unlocked') === 'true';
  });

  // Flujo de pago: 'paywall' | 'select_payment' | 'processing' | 'success'
  const [payStep, setPayStep] = useState('paywall');
  const [paymentMethod, setPaymentMethod] = useState('qr'); // 'qr' o 'card'

  // Datos del formulario de tarjeta
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

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
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  // Si se abre el drawer con un producto específico consultado desde el catálogo
  useEffect(() => {
    if (initialQueryProduct && isOpen) {
      setInputText(`¿Cómo puedo combinar la ${initialQueryProduct.title} (${initialQueryProduct.material})?`);
    }
  }, [initialQueryProduct, isOpen]);

  // Scroll automático al último mensaje
  useEffect(() => {
    if (isOpen && isUnlocked) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isAnalyzing, isOpen, isUnlocked]);

  // Confirmar pago y desbloquear chatbot
  const handleConfirmPayment = () => {
    setPayStep('processing');
    setTimeout(() => {
      setPayStep('success');
      setTimeout(() => {
        setIsUnlocked(true);
        localStorage.setItem('bc_ai_stylist_unlocked', 'true');
        setPayStep('paywall');

        // Notificación de bienvenida tras el pago
        setMessages((prev) => [
          ...prev,
          {
            id: 'unlocked-' + Date.now(),
            sender: 'bot',
            text: `🎉 **¡Pago de 25 Bs. confirmado con éxito!**\n\nTu acceso completo a **MAX** ha sido desbloqueado. Ya puedes consultarme cualquier outfit, combinación de moda o subir una foto para diagnosticar tu colorimetría. ¿En qué te gustaría que te asesore hoy?`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }, 900);
    }, 1200);
  };

  // Función para re-bloquear y probar el flujo de nuevo
  const handleResetLock = () => {
    localStorage.removeItem('bc_ai_stylist_unlocked');
    setIsUnlocked(false);
    setPayStep('paywall');
  };

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
                {isUnlocked ? (
                  <span className="text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Desbloqueado
                  </span>
                ) : (
                  <span className="text-[10px] font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Bloqueado • 25 Bs.
                  </span>
                )}
              </div>
              <p className="text-[11px] text-gray-400">
                Colorimetría estacional, asesoría de imagen y catálogo en tiempo real
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isUnlocked && (
              <button
                onClick={handleResetLock}
                title="Volver a bloquear para probar el flujo de pago"
                className="text-[11px] text-gray-400 hover:text-rose-400 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Lock className="w-3 h-3" />
                <span className="hidden sm:inline">Probar bloqueo</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CONTENIDO: BLOQUEO / PAGO O CHAT ACTIVO */}
        {!isUnlocked ? (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col justify-center items-center">

            {/* VISTA 1: PANTALLA DE BLOQUEO (SE REQUIEREN 25 BS) */}
            {payStep === 'paywall' && (
              <div className="w-full max-w-md bg-[#131320] border border-white/10 rounded-3xl p-6 sm:p-8 text-center space-y-6 shadow-2xl relative overflow-hidden">
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#ff2a85]/15 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#ff8a00]/15 rounded-full blur-3xl pointer-events-none"></div>

                {/* Ícono de candado llamativo */}
                <div className="relative mx-auto w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#ff2a85] to-[#ff8a00] p-[2px] shadow-[0_0_30px_rgba(255,42,133,0.35)] flex items-center justify-center">
                  <div className="w-full h-full bg-[#12121c] rounded-[22px] flex items-center justify-center">
                    <Lock className="w-9 h-9 text-[#ff8a00]" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    Acceso Bloqueado al AI Stylist
                  </h3>
                  <div className="inline-block px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-semibold">
                    🔒 Se necesita pagar 25 Bs. para usarlo
                  </div>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed pt-2">
                    Para interactuar con <strong className="text-white">MAX</strong>, acceder al diagnóstico de colorimetría en tiempo real y recibir combinaciones exclusivas de prendas, se requiere abonar la tarifa única de acceso.
                  </p>
                </div>

                {/* Lista de beneficios incluidos */}
                <div className="rounded-2xl bg-white/5 border border-white/10 p-4 text-left space-y-2.5 text-xs text-gray-300">
                  <div className="flex items-center gap-2.5 text-white font-medium">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[11px] font-bold">✓</span>
                    <span>Diagnóstico de subtono de piel y colorimetría estacional</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-white font-medium">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[11px] font-bold">✓</span>
                    <span>Recomendación de prendas y outfits del catálogo</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-white font-medium">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[11px] font-bold">✓</span>
                    <span>Consultas de estilo y ocasiones ilimitadas</span>
                  </div>
                </div>

                {/* Tarifa y Botón de Pago */}
                <div className="pt-2 space-y-3">
                  <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-xs text-gray-400">Total a pagar:</span>
                    <span className="text-xl font-black bg-gradient-to-r from-[#ff2a85] to-[#ff8a00] bg-clip-text text-transparent">
                      25.00 Bs.
                    </span>
                  </div>

                  <button
                    onClick={() => setPayStep('select_payment')}
                    className="w-full py-3.5 px-6 rounded-2xl bg-bc-gradient shadow-bc-glow text-white font-bold text-sm hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Pagar 25 Bs. y Desbloquear</span>
                  </button>

                  <p className="text-[11px] text-gray-500 flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Opciones de pago disponibles: Tarjetas y QR</span>
                  </p>
                </div>
              </div>
            )}

            {/* VISTA 2: OPCIONES DE PAGO (TARJETAS Y QR) */}
            {payStep === 'select_payment' && (
              <div className="w-full max-w-md bg-[#131320] border border-white/10 rounded-3xl p-5 sm:p-7 space-y-5 shadow-2xl animate-fadeIn">

                {/* Cabecera de pago */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <button
                    onClick={() => setPayStep('paywall')}
                    className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Volver</span>
                  </button>
                  <div className="text-right">
                    <div className="text-[10px] text-gray-400">Desbloqueo AI Stylist</div>
                    <div className="text-sm font-extrabold text-white">Bs. 25.00</div>
                  </div>
                </div>

                <div className="text-center space-y-1">
                  <h4 className="text-base font-bold text-white">Selecciona tu método de pago</h4>
                  <p className="text-xs text-gray-400">Elige la opción que prefieras para pagar los 25 Bs.</p>
                </div>

                {/* Tabs de Selección: QR vs Tarjeta */}
                <div className="grid grid-cols-2 gap-2 p-1 bg-black/40 rounded-2xl border border-white/10">
                  <button
                    onClick={() => setPaymentMethod('qr')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${paymentMethod === 'qr'
                      ? 'bg-bc-gradient text-white shadow-md'
                      : 'text-gray-400 hover:text-white'
                      }`}
                  >
                    <QrCode className="w-4 h-4" />
                    <span>Pago con QR</span>
                  </button>
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${paymentMethod === 'card'
                      ? 'bg-bc-gradient text-white shadow-md'
                      : 'text-gray-400 hover:text-white'
                      }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Tarjetas</span>
                  </button>
                </div>

                {/* OPCIÓN A: PAGO CON QR */}
                {paymentMethod === 'qr' && (
                  <div className="space-y-4 text-center">
                    <div className="bg-white p-3.5 rounded-2xl inline-block shadow-lg mx-auto">
                      <svg viewBox="0 0 160 160" className="w-44 h-44 mx-auto">
                        <rect width="160" height="160" fill="#ffffff" rx="8" />

                        {/* Finder Patterns */}
                        <rect x="12" y="12" width="40" height="40" rx="4" fill="#0f0f18" />
                        <rect x="18" y="18" width="28" height="28" rx="2" fill="#ffffff" />
                        <rect x="24" y="24" width="16" height="16" rx="2" fill="#0f0f18" />

                        <rect x="108" y="12" width="40" height="40" rx="4" fill="#0f0f18" />
                        <rect x="114" y="18" width="28" height="28" rx="2" fill="#ffffff" />
                        <rect x="120" y="24" width="16" height="16" rx="2" fill="#0f0f18" />

                        <rect x="12" y="108" width="40" height="40" rx="4" fill="#0f0f18" />
                        <rect x="18" y="114" width="28" height="28" rx="2" fill="#ffffff" />
                        <rect x="24" y="120" width="16" height="16" rx="2" fill="#0f0f18" />

                        {/* Alignment and Timing */}
                        <rect x="114" y="114" width="26" height="26" rx="3" fill="#0f0f18" />
                        <rect x="119" y="119" width="16" height="16" rx="1" fill="#ffffff" />
                        <rect x="124" y="124" width="6" height="6" rx="1" fill="#0f0f18" />

                        <g fill="#0f0f18">
                          <rect x="56" y="26" width="6" height="6" rx="1" />
                          <rect x="68" y="26" width="6" height="6" rx="1" />
                          <rect x="80" y="26" width="6" height="6" rx="1" />
                          <rect x="92" y="26" width="6" height="6" rx="1" />

                          <rect x="26" y="56" width="6" height="6" rx="1" />
                          <rect x="26" y="68" width="6" height="6" rx="1" />
                          <rect x="26" y="80" width="6" height="6" rx="1" />
                          <rect x="26" y="92" width="6" height="6" rx="1" />

                          <rect x="60" y="14" width="6" height="6" rx="1" />
                          <rect x="74" y="14" width="6" height="6" rx="1" />
                          <rect x="88" y="14" width="6" height="6" rx="1" />

                          <rect x="42" y="60" width="6" height="6" rx="1" />
                          <rect x="54" y="60" width="6" height="6" rx="1" />
                          <rect x="70" y="60" width="6" height="6" rx="1" />
                          <rect x="84" y="60" width="6" height="6" rx="1" />
                          <rect x="98" y="60" width="6" height="6" rx="1" />

                          <rect x="42" y="74" width="6" height="6" rx="1" />
                          <rect x="100" y="74" width="6" height="6" rx="1" />
                          <rect x="112" y="74" width="6" height="6" rx="1" />

                          <rect x="42" y="88" width="6" height="6" rx="1" />
                          <rect x="60" y="88" width="6" height="6" rx="1" />
                          <rect x="94" y="88" width="6" height="6" rx="1" />
                          <rect x="108" y="88" width="6" height="6" rx="1" />

                          <rect x="60" y="104" width="6" height="6" rx="1" />
                          <rect x="76" y="104" width="6" height="6" rx="1" />
                          <rect x="92" y="104" width="6" height="6" rx="1" />

                          <rect x="60" y="118" width="6" height="6" rx="1" />
                          <rect x="74" y="118" width="6" height="6" rx="1" />
                          <rect x="88" y="118" width="6" height="6" rx="1" />
                          <rect x="102" y="118" width="6" height="6" rx="1" />

                          <rect x="60" y="132" width="6" height="6" rx="1" />
                          <rect x="72" y="132" width="6" height="6" rx="1" />
                          <rect x="86" y="132" width="6" height="6" rx="1" />
                          <rect x="100" y="132" width="6" height="6" rx="1" />

                          <rect x="14" y="60" width="6" height="6" rx="1" />
                          <rect x="14" y="76" width="6" height="6" rx="1" />
                          <rect x="14" y="92" width="6" height="6" rx="1" />
                          <rect x="44" y="140" width="6" height="6" rx="1" />
                        </g>

                        {/* Centro Badge */}
                        <rect x="52" y="64" width="56" height="32" rx="8" fill="#ff2a85" />
                        <text x="80" y="84" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold" fontFamily="sans-serif">25 Bs.</text>
                      </svg>
                    </div>

                    <div className="space-y-1">
                      <div className="text-xs font-semibold text-emerald-400 flex items-center justify-center gap-1.5">
                        <Smartphone className="w-3.5 h-3.5" />
                        <span>QR Simple • Pago Rápido Bolivia</span>
                      </div>
                      <p className="text-[11px] text-gray-400 max-w-xs mx-auto">
                        Escanea desde tu app bancaria (BCP, BNB, Banco Unión, Mercantil, Bisa, Fie, GanaMóvil, Soli, etc.) y confirma el pago abajo.
                      </p>
                    </div>
                  </div>
                )}

                {/* OPCIÓN B: PAGO CON TARJETA */}
                {paymentMethod === 'card' && (
                  <div className="space-y-3.5 text-left">
                    {/* Tarjeta visual */}
                    <div className="p-4 rounded-2xl bg-gradient-to-tr from-[#1b1026] via-[#2d1238] to-[#ff2a85]/40 border border-white/15 shadow-md space-y-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold tracking-widest text-amber-400">DEBIT / CREDIT</span>
                        <span className="text-[10px] text-gray-300 font-mono">VISA / MASTERCARD</span>
                      </div>
                      <div className="font-mono text-sm tracking-widest text-white py-1">
                        {cardNumber || '•••• •••• •••• ••••'}
                      </div>
                      <div className="flex justify-between text-[10px] text-gray-300 font-mono uppercase">
                        <div>
                          <div className="text-[8px] text-gray-400">TITULAR</div>
                          <div className="font-semibold text-white truncate max-w-[150px]">{cardHolder || 'NOMBRE TITULAR'}</div>
                        </div>
                        <div>
                          <div className="text-[8px] text-gray-400">VENCE</div>
                          <div className="font-semibold text-white">{cardExpiry || 'MM/AA'}</div>
                        </div>
                      </div>
                    </div>

                    {/* Inputs de la tarjeta */}
                    <div className="space-y-2 text-xs">
                      <div>
                        <label className="text-[10px] text-gray-400 block mb-1">Número de Tarjeta</label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="4532 8921 7734 5091"
                          maxLength={19}
                          className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-[#ff2a85]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-400 block mb-1">Nombre en la Tarjeta</label>
                        <input
                          type="text"
                          value={cardHolder}
                          onChange={(e) => setCardHolder(e.target.value)}
                          placeholder="MANUEL MEDINA"
                          className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-[#ff2a85]"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-gray-400 block mb-1">Vencimiento</label>
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            placeholder="MM/AA"
                            maxLength={5}
                            className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-[#ff2a85]"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-gray-400 block mb-1">CVV</label>
                          <input
                            type="password"
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            placeholder="123"
                            maxLength={4}
                            className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-[#ff2a85]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* BOTÓN OBLIGATORIO: CONFIRMAR PAGO */}
                <div className="pt-2 space-y-2">
                  <button
                    onClick={handleConfirmPayment}
                    className="w-full py-3.5 rounded-2xl bg-bc-gradient shadow-bc-glow text-white font-extrabold text-sm sm:text-base hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Confirmar pago</span>
                  </button>
                  <p className="text-center text-[10px] text-gray-500">
                    Al confirmar, el chatbot se desbloqueará de inmediato por 25 Bs.
                  </p>
                </div>

              </div>
            )}

            {/* VISTA 3: PROCESANDO PAGO */}
            {payStep === 'processing' && (
              <div className="w-full max-w-sm bg-[#131320] border border-white/10 rounded-3xl p-8 text-center space-y-4 shadow-2xl animate-pulse">
                <div className="w-14 h-14 rounded-full border-4 border-[#ff2a85] border-t-transparent animate-spin mx-auto"></div>
                <h4 className="text-base font-bold text-white">Procesando pago de 25 Bs...</h4>
                <p className="text-xs text-gray-400">
                  Verificando comprobante y desbloqueando tu acceso a MAX AI Stylist.
                </p>
              </div>
            )}

            {/* VISTA 4: PAGO EXITOSO */}
            {payStep === 'success' && (
              <div className="w-full max-w-sm bg-[#131320] border border-emerald-500/30 rounded-3xl p-8 text-center space-y-4 shadow-2xl animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-lg font-bold text-white">¡Pago Confirmado!</h4>
                <p className="text-xs text-gray-300">
                  El pago de <strong>25 Bs.</strong> ha sido verificado con éxito. El chatbot ha sido desbloqueado.
                </p>
              </div>
            )}

          </div>
        ) : (
          /* CHATBOT DESBLOQUEADO (CHAT ACTIVO) */
          <>
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
          </>
        )}

      </div>
    </div>
  );
}
