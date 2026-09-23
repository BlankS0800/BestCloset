import React from 'react';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function HeroBanner({ onOpenStylist, onExploreCatalog }) {
  return (
    <div className="relative overflow-hidden pt-10 pb-16 lg:py-20">
      
      {/* Background ambient lighting effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#ff2a85]/15 via-[#ff8a00]/10 to-transparent blur-3xl -z-10 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Columna Izquierda: Mensaje y Propuesta de Valor */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Moda curada que te favorece con tu{' '}
              <span className="text-bc-gradient">AI Stylist</span> personal
            </h1>

            <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              En <strong className="text-white">Best Closet</strong> descubrirás prendas seleccionadas de diseñador, streetwear y vintage. Sube tu foto al chatbot y obtén recomendaciones basadas en tu colorimetría, estilo y materiales textiles preferidos.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={onOpenStylist}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-white bg-bc-gradient shadow-bc-glow hover:opacity-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5"
              >
                <Sparkles className="w-5 h-5" />
                <span>Consultar al AI Stylist</span>
              </button>

              <button
                onClick={onExploreCatalog}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-gray-200 bg-white/5 hover:bg-white/10 border border-white/10 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explorar Catálogo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Columna Derecha: Tarjeta Visual Interactiva del AI Stylist */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md rounded-2xl bg-gradient-to-b from-white/10 to-white/5 p-1 border border-white/15 shadow-2xl backdrop-blur-xl">
              <div className="rounded-[14px] bg-[#0d0d14] p-5 space-y-4">
                
                {/* Header de la tarjeta */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-bc-gradient flex items-center justify-center text-white font-bold text-sm">
                      BC
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1">
                        Best Closet AI Stylist
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      </div>
                      <div className="text-[10px] text-gray-400">Análisis de Colorimetría y Estilo</div>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-gray-400">
                    Asesor Activo
                  </span>
                </div>

                {/* Vista previa de simulación */}
                <div className="space-y-3 text-xs">
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5 flex gap-3 items-center">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-tr from-amber-600 to-rose-400 flex items-center justify-center text-xl shadow-inner">
                      📸
                    </div>
                    <div className="space-y-1">
                      <p className="font-semibold text-white">Sube una foto de tu rostro o prenda</p>
                      <p className="text-[11px] text-gray-400">
                        La IA detectará tu subtono (cálido/frío) y seleccionará prendas del marketplace.
                      </p>
                    </div>
                  </div>

                  {/* Ejemplo de recomendación */}
                  <div className="bg-[#151520] p-3 rounded-xl border border-white/10 space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-amber-400 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Recomendación de Paleta
                      </span>
                      <span className="text-gray-400">Otoño Cálido</span>
                    </div>
                    <p className="text-gray-200 text-xs leading-relaxed">
                      "Para resaltar tu subtono cálido con textura relajada, te sugerimos prendas en tonos arena, terracota y lino puro."
                    </p>
                    <div className="flex items-center gap-1.5 pt-1">
                      <span className="w-4 h-4 rounded-full bg-[#D7C4A5] border border-white/20" title="Beige Arena"></span>
                      <span className="w-4 h-4 rounded-full bg-[#B85D38] border border-white/20" title="Terracota Rust"></span>
                      <span className="w-4 h-4 rounded-full bg-[#556B2F] border border-white/20" title="Verde Oliva"></span>
                      <span className="text-[10px] text-gray-400 ml-1">Colores armónicos</span>
                    </div>
                  </div>

                </div>

                <button
                  onClick={onOpenStylist}
                  className="w-full py-2.5 rounded-lg text-xs font-bold text-white bg-bc-gradient hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Consultar al Chatbot Ahora</span>
                </button>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
