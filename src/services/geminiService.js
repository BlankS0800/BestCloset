import { INITIAL_PRODUCTS } from '../data/mockProducts';
import { analyzeImageColorimetryLocally, matchCatalogProducts } from './colorimetryEngine';
import { generateAuthenticFashionAdvice } from './fashionReasoningEngine';

export function getStoredApiKey() {
  const envKey = import.meta.env?.VITE_GEMINI_API_KEY;
  if (!envKey) return '';
  // Remover comillas envolventes si las tiene
  return envKey.trim().replace(/^["']|["']$/g, '');
}

export function getStoredModel() {
  return import.meta.env?.VITE_GEMINI_MODEL || 'gemini-flash-lite-latest';
}

/**
 * Limpia y normaliza el texto generado por la IA para evitar que se muestren
 * códigos de producto (bc-XX), referencias técnicas, paréntesis vacíos o signos residuales.
 */
export function cleanStylistText(rawText) {
  if (!rawText) return '';

  let text = rawText;

  // 1. Eliminar la etiqueta técnica [RECOMMENDED_PRODUCTS: ...]
  text = text.replace(/\[RECOMMENDED_PRODUCTS:\s*[^\]]*\]/gi, '');

  // 2. Eliminar referencias a códigos de producto entre paréntesis o corchetes con o sin comillas o backticks
  // Ejemplos: (bc-25), (`bc-25`), ( `bc-25` ), (ID: bc-01), [bc-06], etc.
  text = text.replace(/\s*\(\s*[`'"]*\s*(?:id|código|codigo|ref|producto)?\s*:?\s*bc-?\d+\s*[`'"]*\s*\)/gi, '');
  text = text.replace(/\s*\[\s*[`'"]*\s*(?:id|código|codigo|ref|producto)?\s*:?\s*bc-?\d+\s*[`'"]*\s*\]/gi, '');

  // 3. Eliminar menciones sueltas de ID / código / bc-XX
  text = text.replace(/\s*\b(?:id|código|codigo|ref|producto)\s*:?\s*[`'"]*bc-?\d+[`'"]*/gi, '');
  text = text.replace(/\s*[`'"]*bc-\d+[`'"]*/gi, '');

  // 4. Eliminar cualquier paréntesis o corchete que haya quedado vacío o solo con signos/backticks/espacios
  // Ejemplos: (), (``), (`), ( ), [], [``], ( ` )
  text = text.replace(/\s*\(\s*[`'"]*\s*\)/gi, '');
  text = text.replace(/\s*\[\s*[`'"]*\s*\]/gi, '');
  text = text.replace(/`\s*`/g, '');
  text = text.replace(/\(\s*`/g, '(');
  text = text.replace(/`\s*\)/g, ')');
  text = text.replace(/\s*\(\s*\)/gi, '');
  text = text.replace(/\s*\[\s*\]/gi, '');

  // 5. Corregir posibles signos de puntuación huérfanos antes de comas, puntos o guiones largos
  text = text.replace(/\s+([,.;:!?])/g, '$1');
  text = text.replace(/—\s*—/g, '—');
  text = text.replace(/\s+—/g, ' —');
  text = text.replace(/—\s+/g, '— ');

  // 6. Normalizar espacios múltiples
  text = text.replace(/[ \t]{2,}/g, ' ').trim();

  return text;
}

/**
 * Prepara el resumen ultra-compacto del catálogo para grounding (solo IDs, nombres y estilos).
 */
function getCompactCatalogIndex() {
  return INITIAL_PRODUCTS.map(p => ({
    id: p.id,
    title: p.title,
    brand: p.brand,
    category: p.category,
    style: p.style,
    material: p.material,
    color: p.color,
    price: `Bs. ${p.price}`,
    season: p.colorSeason
  }));
}

/**
 * Consulta principal al AI Stylist.
 * Admite conversación continua (historial), texto libre y análisis multimodal de fotos si se proporcionan.
 */
export async function consultAIStylist({
  imageOptimizationResult = null,
  userMessage = '',
  chatHistory = []
}) {
  const apiKey = getStoredApiKey();
  const configuredModel = getStoredModel();
  const hasImage = Boolean(imageOptimizationResult?.dataUrl);

  // Si hay foto, realizamos el análisis cromático local en canvas
  let localColorimetry = null;
  if (hasImage) {
    try {
      localColorimetry = await analyzeImageColorimetryLocally(imageOptimizationResult.dataUrl);
    } catch (e) {
      console.warn('Error en análisis local de colorimetría:', e);
    }
  }

  // Si no hay API Key, usamos el motor conversacional inteligente local
  if (!apiKey) {
    const dynamicAnalysis = generateAuthenticFashionAdvice({
      userMessage,
      colorimetry: localColorimetry,
      hasPhoto: hasImage
    });

    return {
      text: dynamicAnalysis.text,
      colorimetry: localColorimetry,
      recommendedProducts: dynamicAnalysis.recommendedProducts,
      engineUsed: 'motor-inteligente-local',
      tokensUsed: 0,
      savingsNote: 'Procesamiento conversacional dinámico offline.'
    };
  }

  // Lista de modelos optimizados por velocidad de respuesta (Lite models responden en <700ms)
  const modelsToTry = [
    configuredModel,
    'gemini-3.5-flash-lite',
    'gemini-3.1-flash-lite'
  ].filter((v, i, a) => a.indexOf(v) === i);

  for (const model of modelsToTry) {
    try {
      const compactCatalog = getCompactCatalogIndex();

      const systemPrompt = `Eres MAX, asesora de imagen y estilista personal en "Best Closet" (un marketplace de moda donde usuarios y creadores compran y venden prendas y accesorios).

TU ROL Y ENFOQUE (FUNDAMENTAL):
1. **Eres una asesora de estilo e imagen personal independiente**, NO una vendedora tradicional de tienda ni representante de una marca única:
   - NUNCA hables de los productos en primera persona de propiedad (NO digas "nuestro lino", "nuestras prendas", "nosotros confeccionamos", "nos especializamos solo en...").
   - Habla en cambio de "piezas publicadas en el marketplace", "opciones disponibles en Best Closet" o "prendas que puedes encontrar en la comunidad".
   - Utiliza emojis para acompañar y enriquecer tus respuestas, por lo menos en cada punto importante.
2. **Versatilidad y apertura de estilos**:
   - Asesora con total naturalidad para cualquier estilo que busque el usuario: casual, deportivo/sport, urbano/streetwear, fiesta, formal, minimalista, etc. Valora la comodidad, el confort y la autenticidad.
   - Da consejos prácticos de combinaciones, proporciones, texturas y ocasiones tanto para su propio clóset como para piezas que busque adquirir.
3. **Tono**: Cercano, empático, culto, fresco y con criterio estético impecable.
4. **Si el usuario NO ha adjuntado foto (solo texto)**: Respóndele a su consulta con criterio de estilista, sugiere combinaciones o invítalo a subir una foto para diagnóstico cromático si lo desea.
5. **CUANDO EL USUARIO SUBE UNA FOTO (ANÁLISIS VISUAL PROFUNDO)**:
   - **Tono de Piel y Profundidad**: Identifica y describe el tono visible de su piel (ej. morena profunda/ébano, morena cálida/canela, trigueña, oliva, tono medio, tez clara, etc.) y su subtono (cálido, frío o neutro).
   - **Contraste Natural**: Analiza la relación de contraste entre su piel, cabello, ojos y facciones.
   - **Prenda o Look en la foto**: Si se aprecia ropa o accesorios en la imagen, comenta constructivamente cómo complementarlo o elevar la combinación.
   - **Razonamiento Cromático**: Explica POR QUÉ ciertos colores y contrastes favorecen su tono de piel específico (ej. para pieles morenas/oscuras: luminosidad de blancos marfil, mostazas, terracotas y tonos joya; para subtonos fríos: azules índigo, esmeralda, borgoña; para subtonos cálidos: tonos tierra, oliva, arenas).
   - **Prendas Sugeridas del Marketplace**: Si corresponde, recomienda piezas publicadas en Best Closet que potencien su paleta y silueta.
   - Para vincular prendas interactivas del marketplace en la interfaz, incluye al final de tu mensaje la etiqueta:
     [RECOMMENDED_PRODUCTS: id1, id2] (ej. [RECOMMENDED_PRODUCTS: bc-01, bc-04]).
6. **REGLA ESTRICTA DE REDACCIÓN (PROHIBIDO INCLUIR CÓDIGOS O IDs EN EL TEXTO)**:
   - JAMÁS escribas IDs de producto, códigos internos ni numeraciones de catálogo (como "(bc-01)", "(bc-25)", "bc-06", "código:", "ID:", etc.) dentro de las oraciones de tu respuesta.
   - Refiérete a las prendas siempre por su nombre comercial y atributos naturales (ej. "el vestido de seda esmeralda", "el blazer borgoña", "la sudadera lavanda").
   - Los identificadores "bc-XX" son EXCLUSIVAMENTE para la etiqueta invisible al final [RECOMMENDED_PRODUCTS: ...], NUNCA deben aparecer en tu texto visible.

Catálogo de prendas actualmente publicadas en el marketplace de Best Closet:
${JSON.stringify(compactCatalog)}`;

      // Construir los contenidos de la conversación (máximo últimos 4 turnos para balance velocidad/contexto)
      const contents = [];
      const recentHistory = chatHistory.slice(-4);
      recentHistory.forEach(msg => {
        if (msg.sender === 'user' && msg.text) {
          contents.push({ role: 'user', parts: [{ text: msg.text }] });
        } else if (msg.sender === 'bot' && msg.text) {
          contents.push({ role: 'model', parts: [{ text: msg.text }] });
        }
      });

      const userParts = [];
      const promptText = userMessage.trim() || (hasImage
        ? 'Por favor analiza mi foto con detalle: describe mi tono de piel, subtono, rasgos de contraste y recomiéndame qué colores y prendas de Best Closet me favorecen más.'
        : 'Hola, ¿qué me recomiendas para mi estilo?');

      userParts.push({ text: promptText });

      // Si hay foto adjunta, añadirla en formato inline data
      if (hasImage) {
        const cleanBase64 = imageOptimizationResult.dataUrl.replace(/^data:image\/[a-z]+;base64,/, '');
        userParts.push({
          inline_data: {
            mime_type: 'image/jpeg',
            data: cleanBase64
          }
        });
      }

      contents.push({
        role: 'user',
        parts: userParts
      });

      const requestBody = {
        system_instruction: {
          parts: [{ text: systemPrompt }]
        },
        contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 750
        }
      };

      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.warn(`Error en modelo ${model}:`, errorData?.error?.message || response.statusText);
        continue;
      }

      const data = await response.json();
      let replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

      // Extraer IDs de productos recomendados de la etiqueta [RECOMMENDED_PRODUCTS: id1, id2]
      const productMatch = replyText.match(/\[RECOMMENDED_PRODUCTS:\s*([a-zA-Z0-9_,\s-]+)\]/i);
      let recommendedProducts = [];

      if (productMatch) {
        const rawIds = productMatch[1].split(',').map(s => s.trim().toLowerCase());
        recommendedProducts = INITIAL_PRODUCTS
          .filter(p => rawIds.includes(p.id.toLowerCase()))
          .map(product => ({
            product,
            score: 95,
            matchReasons: ['Seleccionado por tu AI Stylist para este look']
          }));

        // Limpiar la etiqueta del texto para que no sea visible al usuario
        replyText = replyText.replace(/\[RECOMMENDED_PRODUCTS:\s*([a-zA-Z0-9_,\s-]+)\]/gi, '').trim();
      }

      // Sanitizar texto para que nunca tenga códigos residuales, paréntesis vacíos o comillas sueltas
      replyText = cleanStylistText(replyText);

      // Si el usuario subió foto y preguntó por prendas pero no se detectaron IDs en la etiqueta, buscar por colorimetría
      if (hasImage && recommendedProducts.length === 0 && localColorimetry) {
        const fallbackMatches = matchCatalogProducts({
          colorimetry: localColorimetry,
          userQuery: userMessage
        });
        recommendedProducts = fallbackMatches.slice(0, 2);
      }

      return {
        text: replyText,
        colorimetry: localColorimetry,
        recommendedProducts,
        engineUsed: `Gemini (${model})`,
        tokensUsed: data.usageMetadata?.totalTokenCount || '~280 tokens',
        savingsNote: hasImage ? 'Foto comprimida a 512px (<35KB).' : 'Modo texto conversacional ultra ligero.'
      };
    } catch (err) {
      console.warn(`Excepción llamando a modelo ${model}:`, err);
    }
  }

  // Fallback si todos los modelos remotos fallaron o hubo problema de red
  console.warn('Fallo la conexión con Gemini API en los modelos disponibles, usando motor dinámico local.');
  const dynamicAnalysis = generateAuthenticFashionAdvice({
    userMessage,
    colorimetry: localColorimetry,
    hasPhoto: hasImage
  });

  return {
    text: dynamicAnalysis.text,
    colorimetry: localColorimetry,
    recommendedProducts: dynamicAnalysis.recommendedProducts,
    engineUsed: 'motor-inteligente-local (fallback)',
    tokensUsed: 0,
    savingsNote: 'Respuesta dinámica local asistida.'
  };
}


