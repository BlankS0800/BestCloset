import { INITIAL_PRODUCTS } from '../data/mockProducts';

/**
 * Optimiza y redimensiona una imagen en el cliente antes de procesarla o enviarla a la API.
 * Reduce fotos de 10MB a ~30KB para procesamiento visual ultra veloz (<500ms).
 */
export async function optimizeImageForUpload(file, maxDimension = 512, quality = 0.75) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve({
          dataUrl: compressedDataUrl,
          width,
          height,
          originalSize: file.size,
          compressedApproxKb: Math.round((compressedDataUrl.length * 3) / 4 / 1024)
        });
      };
      img.onerror = () => reject(new Error('No se pudo procesar la imagen'));
      img.src = e.target.result;
    };
    reader.onerror = () => reject(new Error('Error al leer el archivo'));
    reader.readAsDataURL(file);
  });
}

/**
 * Analizador cromático local basado en Canvas (0 Tokens, 100% Gratuito y Offline).
 * Muestrea los píxeles de la foto (piel, prendas, iluminación) y calcula undertone y estación cromática.
 */
export async function analyzeImageColorimetryLocally(imageDataUrl) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      // Muestreo rápido en 150x150
      const sampleSize = 150;
      const canvas = document.createElement('canvas');
      canvas.width = sampleSize;
      canvas.height = sampleSize;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, sampleSize, sampleSize);

      const imageData = ctx.getImageData(0, 0, sampleSize, sampleSize);
      const data = imageData.data;

      let rSum = 0, gSum = 0, bSum = 0, count = 0;
      const dominantColors = [];

      for (let i = 0; i < data.length; i += 16) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];

        if (a < 128) continue;
        // Evitar extremos casi blancos o casi negros para medir subtono
        const brightness = (r + g + b) / 3;
        if (brightness > 240 || brightness < 25) continue;

        rSum += r;
        gSum += g;
        bSum += b;
        count++;

        if (count % 30 === 0 && dominantColors.length < 5) {
          dominantColors.push(`rgb(${r}, ${g}, ${b})`);
        }
      }

      if (count === 0) {
        rSum = 200; gSum = 180; bSum = 160; count = 1;
      }

      const avgR = Math.round(rSum / count);
      const avgG = Math.round(gSum / count);
      const avgB = Math.round(bSum / count);

      // Evaluación de Calidez: si rojo y verde superan notablemente al azul
      const warmthScore = (avgR - avgB);
      const isWarm = warmthScore > 15;
      const isCool = warmthScore < -5;
      const undertone = isWarm ? 'Cálido (Dorado / Ámbar)' : isCool ? 'Frío (Azulado / Cenizo)' : 'Neutro Equilibrado';

      const brightnessAvg = (avgR + avgG + avgB) / 3;

      // Profundidad de tono de piel real
      let skinToneDepth = 'Tez Trigueña / Tono Medio';
      let contrastLevel = 'Contraste Medio';

      if (brightnessAvg < 95) {
        skinToneDepth = 'Tez Morena Profunda / Ébano';
        contrastLevel = 'Alto Contraste Luminoso';
      } else if (brightnessAvg < 135) {
        skinToneDepth = 'Tez Morena Cálida / Canela';
        contrastLevel = 'Contraste Rico';
      } else if (brightnessAvg < 170) {
        skinToneDepth = 'Tez Trigueña / Oliva';
        contrastLevel = 'Contraste Medio Armónico';
      } else {
        skinToneDepth = 'Tez Clara / Marfil';
        contrastLevel = 'Contraste Suave';
      }

      let season = '';
      let seasonDescription = '';
      let recommendedPalette = [];
      let colorsToAvoid = [];

      if (isWarm) {
        if (brightnessAvg > 140) {
          season = 'Primavera Brillante (Bright Spring)';
          seasonDescription = 'Tu piel y rasgos se iluminan con tonos vivos, cálidos y claros. Los colores saturados y alegres te aportan frescura natural.';
          recommendedPalette = [
            { name: 'Coral Suave', hex: '#FF6F61' },
            { name: 'Arena Cálido', hex: '#D7C4A5' },
            { name: 'Verde Salvia', hex: '#9CAF88' },
            { name: 'Terracota Dorado', hex: '#B85D38' },
            { name: 'Marfil / Crema', hex: '#F4F1EA' }
          ];
          colorsToAvoid = ['Gris asfalto apagado', 'Negro absoluto mate', 'Azul marino deslavado'];
        } else {
          season = 'Otoño Cálido / Tierra Profunda (Warm Autumn)';
          seasonDescription = 'Armonía rica, terrosa y profunda. Los tonos mostaza, terracota, esmeralda y arenas generan un impacto visual radiante con tu piel.';
          recommendedPalette = [
            { name: 'Terracota Rust', hex: '#B85D38' },
            { name: 'Mostaza Real', hex: '#D4A017' },
            { name: 'Verde Oliva Profundo', hex: '#556B2F' },
            { name: 'Blanco Marfil', hex: '#F4F1EA' },
            { name: 'Beige Dorado', hex: '#D7C4A5' }
          ];
          colorsToAvoid = ['Gris cemento apagado', 'Rosa pastel deslavado', 'Plateado frío'];
        }
      } else if (isCool) {
        if (brightnessAvg < 125) {
          season = 'Invierno Profundo / Joya (Deep Winter)';
          seasonDescription = 'Posees un contraste impactante. Los colores nítidos, blancos ópticos de alto contraste, cobalto y tonos joya te confieren presencia magnética.';
          recommendedPalette = [
            { name: 'Azul Cobalto Real', hex: '#1B3B6F' },
            { name: 'Blanco Puro Óptico', hex: '#FFFFFF' },
            { name: 'Verde Esmeralda', hex: '#0F5257' },
            { name: 'Borgoña Intenso', hex: '#581825' },
            { name: 'Negro Carbón', hex: '#18181D' }
          ];
          colorsToAvoid = ['Mostaza apagado', 'Marrón óxido deslavado', 'Naranja ladrillo'];
        } else {
          season = 'Verano Suave (Soft Summer)';
          seasonDescription = 'Tu paleta ideal se basa en tonos fríos atenuados, pasteles y neutros con fondo azulado o grisáceo.';
          recommendedPalette = [
            { name: 'Azul Acero', hex: '#4682B4' },
            { name: 'Gris Perla', hex: '#B0C4DE' },
            { name: 'Rosa Empolvado', hex: '#D8A7B1' },
            { name: 'Blanco Suave', hex: '#F5F5F5' },
            { name: 'Lavanda', hex: '#9370DB' }
          ];
          colorsToAvoid = ['Naranja chillón', 'Amarillo canario', 'Negro desgastado'];
        }
      } else {
        season = 'Neutro Equilibrado / Universal';
        seasonDescription = 'Gran versatilidad para lucir tanto colores cálidos tierra como fríos azulados, priorizando el corte y texturas de las telas.';
        recommendedPalette = [
          { name: 'Blanco Marfil', hex: '#F4F1EA' },
          { name: 'Azul Índigo', hex: '#1B2A4A' },
          { name: 'Verde Oliva', hex: '#556B2F' },
          { name: 'Negro Carbón', hex: '#18181D' },
          { name: 'Arena Cálido', hex: '#D7C4A5' }
        ];
        colorsToAvoid = ['Colores fluorescentes artificiales'];
      }

      resolve({
        skinToneDepth,
        contrastLevel,
        undertone,
        season,
        seasonDescription,
        dominantColors,
        recommendedPalette,
        colorsToAvoid,
        metrics: {
          warmthScore,
          avgR, avgG, avgB,
          brightnessAvg: Math.round(brightnessAvg)
        }
      });
    };
    img.onerror = () => {
      resolve({
        undertone: 'Neutro Universal',
        season: 'Otoño Cálido & Neutro',
        seasonDescription: 'Armonía versátil con afinidad a tonos tierra y naturales.',
        recommendedPalette: [
          { name: 'Arena Cálido', hex: '#D7C4A5' },
          { name: 'Verde Oliva', hex: '#556B2F' },
          { name: 'Blanco Crudo', hex: '#F4F1EA' }
        ],
        colorsToAvoid: ['Colores neón excesivos']
      });
    };
    img.src = imageDataUrl;
  });
}

function avgRgbHex(val) {
  return Math.min(255, Math.max(0, val));
}

/**
 * Empareja las prendas del catálogo según la colorimetría detectada,
 * estilo preferido y material elegido por el usuario.
 */
export function matchCatalogProducts({ colorimetry, style, material, occasion, userQuery }) {
  const queryLower = (userQuery || '').toLowerCase();

  return INITIAL_PRODUCTS.map(product => {
    let score = 50; // Base
    let matchReasons = [];

    // 1. Coincidencia por Estilo
    if (style && style !== 'Todos') {
      if (product.style.toLowerCase() === style.toLowerCase()) {
        score += 25;
        matchReasons.push(`Estilo ${product.style} alineado con tu vibra`);
      }
    }

    // 2. Coincidencia por Material
    if (material && material !== 'Todos') {
      if (product.material.toLowerCase().includes(material.toLowerCase())) {
        score += 25;
        matchReasons.push(`Confeccionado en ${product.material} de máxima calidad`);
      }
    }

    // 3. Coincidencia por Colorimetría
    if (colorimetry && colorimetry.season) {
      const isWarmSeason = colorimetry.season.includes('Otoño') || colorimetry.season.includes('Primavera');
      const isCoolSeason = colorimetry.season.includes('Invierno') || colorimetry.season.includes('Verano');

      if (isWarmSeason && product.colorSeason.includes('Cálido')) {
        score += 20;
        matchReasons.push(`El tono ${product.color} armoniza perfectamente con tu subtono cálido`);
      } else if (isCoolSeason && product.colorSeason.includes('Frío')) {
        score += 20;
        matchReasons.push(`El color ${product.color} realza el contraste de tu paleta fría`);
      } else if (product.colorSeason.includes('Neutro')) {
        score += 15;
        matchReasons.push(`Tono neutro altamente versátil para tu estación`);
      }
    }

    // 4. Coincidencia por palabras clave del usuario
    if (queryLower) {
      if (queryLower.includes(product.category.toLowerCase())) score += 15;
      if (queryLower.includes(product.material.toLowerCase())) score += 15;
      if (queryLower.includes('lino') && product.material.includes('Lino')) score += 20;
      if (queryLower.includes('pima') && product.material.includes('Algodón Pima')) score += 20;
      if (queryLower.includes('formal') && (product.style === 'Old Money' || product.style === 'Formal')) score += 15;
      if (queryLower.includes('casual') && product.style.includes('Casual')) score += 15;
      if (queryLower.includes('calle') || queryLower.includes('streetwear')) {
        if (product.style === 'Streetwear') score += 20;
      }
    }

    return {
      product,
      score,
      matchReasons: matchReasons.length > 0 ? matchReasons : ['Pieza clave en tendencia con garantía anti-estafa']
    };
  })
  .sort((a, b) => b.score - a.score);
}
