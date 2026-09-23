import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, CheckCircle2 } from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onRemoveFromCart,
  onClearCart,
  onOpenStylist
}) {
  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart', 'processing', 'completed'

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const shipping = cartItems.length > 0 ? 25.00 : 0;
  const total = subtotal + shipping;

  const handleSimulateCheckout = () => {
    setCheckoutStep('processing');
    setTimeout(() => {
      setCheckoutStep('completed');
    }, 1200);
  };

  const handleFinish = () => {
    onClearCart();
    setCheckoutStep('cart');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm animate-fadeIn flex justify-end">
      <div 
        className="relative w-full max-w-md h-full bg-[#0e0e16] border-l border-white/15 flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#12121d]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#ff8a00]" />
            <h3 className="text-base font-bold text-white">Carrito de Compras</h3>
            <span className="text-xs text-gray-400">({cartItems.length} prendas)</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido según paso */}
        {checkoutStep === 'cart' && (
          <>
            {cartItems.length > 0 ? (
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
                  >
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-16 h-20 object-cover rounded-xl border border-white/10 shrink-0"
                    />
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="text-xs font-bold text-white truncate">
                            {item.title}
                          </h4>
                          <button
                            onClick={() => onRemoveFromCart(item.id)}
                            className="text-gray-500 hover:text-rose-400 p-0.5 cursor-pointer"
                            title="Eliminar"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="text-[10px] text-gray-400 mt-0.5">
                          {item.brand} • Talla {item.size}
                        </div>
                        <div className="text-[10px] text-gray-300">
                          {item.material} • {item.condition}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-sm font-extrabold text-white">
                          Bs. {item.price}
                        </span>
                        <span className="text-[10px] text-gray-400">
                          Vendedor: {item.seller.name}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-3xl">
                  🛍️
                </div>
                <h4 className="text-base font-bold text-white">Tu carrito está vacío</h4>
                <p className="text-xs text-gray-400 max-w-xs">
                  Explora el catálogo o pregúntale al AI Stylist qué prendas favorecen tu colorimetría.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onOpenStylist();
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-bc-gradient shadow-bc-glow hover:opacity-90 transition-all cursor-pointer"
                >
                  Abrir AI Stylist
                </button>
              </div>
            )}

            {/* Resumen y Botón de Pago */}
            {cartItems.length > 0 && (
              <div className="p-4 border-t border-white/10 bg-[#12121d] space-y-3">
                <div className="space-y-1.5 text-xs text-gray-300">
                  <div className="flex justify-between">
                    <span>Subtotal de prendas</span>
                    <span className="text-white font-medium">Bs. {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Envío</span>
                    <span className="text-white font-medium">Bs. {shipping.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-white/10 pt-2 flex justify-between text-base font-bold text-white">
                    <span>Total a pagar</span>
                    <span className="text-xl text-bc-gradient">Bs. {total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleSimulateCheckout}
                  className="w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-bc-gradient shadow-bc-glow hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Proceder al Pago</span>
                </button>
              </div>
            )}
          </>
        )}

        {/* Paso de Procesamiento */}
        {checkoutStep === 'processing' && (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4">
            <div className="w-14 h-14 rounded-full border-4 border-[#ff2a85] border-t-transparent animate-spin"></div>
            <h4 className="text-base font-bold text-white">Procesando orden...</h4>
            <p className="text-xs text-gray-400 max-w-xs">
              Confirmando detalles con el vendedor.
            </p>
          </div>
        )}

        {/* Paso Completado */}
        {checkoutStep === 'completed' && (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-5 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">¡Compra Realizada con Éxito!</h4>
              <p className="text-xs text-gray-400 mt-1">
                Orden #BC-{Math.floor(100000 + Math.random() * 900000)}
              </p>
            </div>

            <div className="text-left rounded-xl bg-white/5 border border-white/10 p-4 space-y-2 text-xs text-gray-300 w-full">
              <div className="font-semibold text-white">Estado del pedido:</div>
              <p className="text-[11px] text-gray-400">
                El vendedor ha recibido tu compra y preparará el envío en las próximas 24-48 horas. Recibirás una notificación cuando el paquete esté en camino.
              </p>
            </div>

            <button
              onClick={handleFinish}
              className="w-full py-3 rounded-xl font-bold text-xs text-white bg-bc-gradient hover:opacity-90 transition-all cursor-pointer"
            >
              Volver a Best Closet
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
