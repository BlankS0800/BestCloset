import { INITIAL_PRODUCTS } from '../data/mockProducts';

/**
 * Motor Inteligente Local de Razonamiento de Moda y Diálogo.
 * Proporciona respuestas orgánicas, empáticas y de alta costura según la intención real del usuario.
 */
export function generateAuthenticFashionAdvice({
  userMessage = '',
  colorimetry = null,
  hasPhoto = false
}) {
  const query = (userMessage || '').trim().toLowerCase();

  // 1. Detección de Saludos Simples
  const isGreeting = /^(hola|buenas|buenos d[ií]as|buenas tardes|buenas noches|hey|que tal|qu[eé] tal|c[oó]mo est[aá]s|alo|saludos)[\s!.]*$/i.test(query);

  // 2. Detección de Agradecimientos o Despedidas
  const isFarewell = /^(gracias|muchas gracias|mil gracias|chau|adi[oó]s|hasta luego|bye|perfecto gracias)[\s!.]*$/i.test(query);

  // 3. Detección de Pregunta de Colorimetría
  const isColorimetryQuestion = query.includes('colorimetr') || 
    query.includes('subtono') || 
    query.includes('tono de piel') || 
    query.includes('qu[eé] color') || 
    query.includes('qu[eé] colores') || 
    query.includes('me favorece') || 
    query.includes('paleta');

  // 4. Detección de Ocasiones
  const occasions = [
    { key: 'boda', labels: ['boda', 'matrimonio', 'casamiento'], advice: 'Para una boda, la clave está en respetar el código y jugar con la textura. Si es de día o en jardín, los trajes o vestidos fluidos en lino o seda en tonos salvia, arena o lavanda lucen impecables. Para la noche, las telas con estructura en azul medianoche, esmeralda o borgoña aportan máxima distinción.' },
    { key: 'fiesta', labels: ['fiesta', 'boliche', 'discoteca', 'noche', 'cumplea[ñn]os', 'party'], advice: 'Para una salida nocturna o fiesta, combina texturas mates con toques satinados o metálicos. Un pantalón de corte sastre amplio con un blazer entallado o un top con caída atractiva crea un look magnético y contemporáneo.' },
    { key: 'trabajo', labels: ['trabajo', 'oficina', 'entrevista', 'reuni[oó]n', 'laboral', 'formal'], advice: 'Para el entorno profesional, buscamos proyectar autoridad sin perder frescura. Opta por una camisa de algodón pima peinado o blusas con buena estructura, combinadas con pantalones de pinzas en tonos neutros (marfil, topo, azul marino).' },
    { key: 'cita', labels: ['cita', 'cena', 'rom[aá]ntica', 'pareja'], advice: 'Para una cita, el objetivo es verte sofisticado sin esfuerzo ("effortless chic"). Una prenda en lino de corte relajado, un cárdigan de punto suave o un vestido midi satinado transmiten calidez, buen gusto y cercanía.' },
    { key: 'calor', labels: ['calor', 'verano', 'playa', 'santa cruz', 'sol', 'c[aá]lido'], advice: 'En climas cálidos y soleados, las fibras naturales son indispensables. El 100% lino y el algodón pima transpiran de maravilla y mantienen una caída limpia y fresca todo el día.' },
    { key: 'frio', labels: ['fr[ií]o', 'invierno', 'la paz', 'oto[ñn]o', 'abrigo'], advice: 'Para climas fríos, el layering (superposición de capas) es un arte: una camiseta base de gramaje alto, un suéter o cárdigan de punto y un blazer o abrigo estructurado te darán porte y confort térmico.' },
    { key: 'casual', labels: ['universidad', 'diario', 'casual', 'calle', 'streetwear', 'domingo'], advice: 'Para el día a día, el balance entre comodidad y presencia es la clave: prendas holgadas con estructura (estilo boxy o wide-leg) combinadas con básicos de alta calidad nunca fallan.' }
  ];
  const matchedOccasion = occasions.find(o => o.labels.some(l => new RegExp(l, 'i').test(query)));

  // 5. Detección de Prendas
  const garments = [
    { key: 'camisa', labels: ['camisa', 'camisas', 'top'], tip: 'las camisas con corte relajado son súper versátiles: abotonadas para un evento formal o abiertas sobre un básico para un aire desenfadado.' },
    { key: 'pantalon', labels: ['pantal[oó]n', 'pantalones', 'chino', 'jeans', 'denim'], tip: 'los pantalones de tiro medio-alto y pierna recta o ancha alargan la silueta y equilibran proporciones con total elegancia.' },
    { key: 'blazer', labels: ['blazer', 'chaqueta', 'abrigo', 'saco'], tip: 'un blazer estructurado enmarca los hombros y eleva automáticamente cualquier prenda básica que lleves debajo.' },
    { key: 'hoodie', labels: ['hoodie', 'sudadera', 'polera'], tip: 'un hoodie pesado de buen gramaje y corte boxy otorga una presencia streetwear limpia y muy actual.' },
    { key: 'vestido', labels: ['vestido', 'falda'], tip: 'los cortes al bies o fluidos acompañan el movimiento natural del cuerpo y son facilísimos de adaptar de día a noche.' }
  ];
  const matchedGarment = garments.find(g => g.labels.some(l => new RegExp(l, 'i').test(query)));

  // CASO 1: Saludo simple sin foto
  if (isGreeting && !hasPhoto) {
    return {
      text: `¡Hola! Qué gusto saludarte. Soy tu estilista personal en **Best Closet**.\n\nEstoy aquí para ayudarte a encontrar el outfit perfecto, combinar tus prendas o asesorarte según la ocasión.\n\n✨ **¿Cómo puedo ayudarte hoy?**\n- Puedes contarme qué evento o estilo buscas (ej. *"Tengo un matrimonio de noche"*, *"Quiero un look casual con lino"*).\n- O puedes subir una **foto de tu rostro con el botón de cámara** para que diagnostique tu subtono de piel y paleta de colorimetría estacional.\n\n¿Qué tienes en mente para tu próximo look?`,
      recommendedProducts: []
    };
  }

  // CASO 2: Agradecimiento o despedida
  if (isFarewell && !hasPhoto) {
    return {
      text: `¡Ha sido un verdadero placer ayudarte! Si necesitas inspiración para otro look o tienes dudas combinando prendas de tu clóset, aquí estaré siempre disponible.\n\n¡Que tengas un día lleno de estilo y autenticidad! ✨`,
      recommendedProducts: []
    };
  }

  // CASO 3: Pregunta de Colorimetría sin foto
  if (isColorimetryQuestion && !hasPhoto) {
    return {
      text: `¡Qué gran tema! La **colorimetría** es fundamental porque los tonos adecuados iluminan tu rostro, suavizan líneas de expresión y aportan una presencia radiante.\n\nPara descubrir tu paleta exacta necesitamos evaluar:\n- **Subtono Cálido**: La piel tiene matices dorados, durazno o cetrinos. Favorecen los tonos tierra, oliva, mostaza suave, coral y terracota.\n- **Subtono Frío**: La piel tiene matices rosados, azulados o porcelana. Favorecen los tonos índigo, esmeralda frío, borgoña, gris carbón y blanco puro.\n- **Subtono Neutro**: Gran balance entre tonos cálidos y fríos.\n\n📸 **Para un diagnóstico preciso**: Haz clic en el **ícono de cámara** aquí abajo y sube una foto con buena luz natural. ¡Analizaré tus matices al instante!`,
      recommendedProducts: []
    };
  }

  // CASO 4: Se subió una foto (Diagnóstico Cromático y de Tono de Piel)
  if (hasPhoto && colorimetry) {
    const isWarm = colorimetry.undertone.includes('Cálido');
    const isCool = colorimetry.undertone.includes('Frío');
    const skinTone = colorimetry.skinToneDepth || 'Tez Morena / Trigueña';
    const contrast = colorimetry.contrastLevel || 'Contraste Rico';

    let diagnosisDetail = '';
    if (skinTone.includes('Morena') || skinTone.includes('Ébano')) {
      if (isWarm) {
        diagnosisDetail = `He evaluado con atención tu imagen: observo una **${skinTone}** con matices cálidos dorados y un **${contrast}**. Esta tonalidad tiene la ventaja de lucir radiante con tonos contrastantes luminosos (como marfil, crema y arena) y tonos tierra ricos como terracota, mostaza real y verde oliva profundo. Te sugiero evitar grises deslavados que apagan tu luminosidad natural.`;
      } else {
        diagnosisDetail = `He evaluado con atención tu imagen: observo una **${skinTone}** con subtono frío y un **${contrast}**. Los colores joya de alto impacto como el azul cobalto, blanco óptico puro, verde esmeralda y borgoña intenso generan un contraste sofisticado y magnético con tu piel.`;
      }
    } else if (skinTone.includes('Trigueña') || skinTone.includes('Oliva')) {
      diagnosisDetail = `He evaluado con atención tu imagen: observo una **${skinTone}** con un **${contrast}**. Tu paleta ideal armoniza con tonos tierra medios, azul marino, verde salvia y blanco suave, equilibrando frescura y elegancia.`;
    } else {
      diagnosisDetail = `He evaluado con atención tu imagen: observo una **${skinTone}** con un **${contrast}**. Los contrastes limpios y tonos armónicos con tu subtono resaltan tus facciones con gran nitidez.`;
    }

    // Filtrar prendas afines a la colorimetría
    const recommended = INITIAL_PRODUCTS.filter(p => {
      if (isWarm) return p.colorSeason.includes('Cálido') || p.colorSeason.includes('Primavera') || p.colorSeason.includes('Otoño');
      if (isCool) return p.colorSeason.includes('Frío') || p.colorSeason.includes('Invierno') || p.colorSeason.includes('Verano');
      return true;
    }).slice(0, 2).map(p => ({
      product: p,
      score: 95,
      matchReasons: [`Armoniza con tu ${skinTone} y subtono ${colorimetry.undertone} (${p.color})`]
    }));

    return {
      text: `¡Excelente foto! He analizado con detalle tus rasgos visuales:\n\n### 🎨 Diagnóstico de Imagen y Colorimetría\n- **Tono de Piel**: **${skinTone}**\n- **Nivel de Contraste**: **${contrast}**\n- **Subtono**: **${colorimetry.undertone}**\n- **Estación**: **${colorimetry.season}**\n\n${diagnosisDetail}\n\nAquí tienes algunas opciones publicadas en el marketplace que pueden elevar tu look:`,
      recommendedProducts: recommended
    };
  }

  // CASO 5: Consulta general de estilo, ocasión o prendas
  let adviceIntro = '';
  if (matchedOccasion) {
    adviceIntro = `¡Gran elección! Para **${matchedOccasion.labels[0]}**, ${matchedOccasion.advice}`;
  } else if (matchedGarment) {
    adviceIntro = `Respecto a **${matchedGarment.labels[0]}**, un tip fundamental de asesoría: ${matchedGarment.tip}`;
  } else {
    adviceIntro = `Para lograr un look equilibrado y con estilo, la clave está en cuidar la caída de los textiles, la proporción entre prendas superiores e inferiores y los acentos de color.`;
  }

  // Selección inteligente de productos del catálogo según la búsqueda
  const candidateMatches = INITIAL_PRODUCTS.map(p => {
    let score = 50;
    let matchReason = '';

    if (query) {
      if (query.includes(p.category.toLowerCase()) || query.includes(p.title.toLowerCase()) || query.includes(p.material.toLowerCase()) || query.includes(p.style.toLowerCase())) {
        score += 40;
        matchReason = `Coincide con tu búsqueda de ${p.title}`;
      }
    }

    return {
      product: p,
      score,
      reason: matchReason || `Pieza versátil en ${p.material} (${p.style})`
    };
  }).sort((a, b) => b.score - a.score);

  const topItems = candidateMatches.slice(0, 2);

  return {
    text: `${adviceIntro}\n\nEncontré estas piezas disponibles en el marketplace de **Best Closet** que encajan muy bien con lo que buscas:`,
    recommendedProducts: topItems.map(item => ({
      product: item.product,
      score: item.score,
      matchReasons: [item.reason]
    }))
  };
}

