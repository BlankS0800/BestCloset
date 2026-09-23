export const CURRENCY = 'Bs.';

export const CATEGORIES = [
  'Todos',
  'Chaquetas & Abrigos',
  'Camisas & Tops',
  'Pantalones & Jeans',
  'Vestidos & Faldas',
  'Trajes & Sastrería',
  'Ropa Deportiva & Activewear',
  'Trajes de Baño & Playa',
  'Knitwear & Suéteres',
  'Calzado & Accesorios'
];

export const STYLES = [
  'Todos',
  'Casual Chic',
  'Deportivo / Athleisure',
  'Formal & Ejecutivo',
  'Elegante / Fiesta',
  'Streetwear',
  'Old Money',
  'Minimalist',
  'Beachwear / Resort',
  'Y2K',
  'Boho / Avant-Garde'
];

export const MATERIALS = [
  'Todos',
  '100% Lino',
  '100% Algodón Pima',
  'Seda Natural',
  'Lana Merino & Cashmere',
  'Denim Japonés',
  'Tejido Técnico & Spandex',
  'Cuero Vegano & Piel',
  'Nylon & Poliamida Reciclada',
  'Satén & Chifón'
];

export const COLOR_SEASONS = [
  'Todos',
  'Cálido (Otoño/Primavera)',
  'Frío (Invierno/Verano)',
  'Neutro Universal'
];

export const INITIAL_PRODUCTS = [
  // --- COLECCIÓN ORIGINAL (bc-01 a bc-09) ---
  {
    id: 'bc-01',
    title: 'Camisa Oversize de Lino Puro Italiano',
    brand: 'Sartoria Studio',
    category: 'Camisas & Tops',
    style: 'Old Money',
    material: '100% Lino',
    price: 280,
    originalPrice: 420,
    size: 'M / L',
    condition: 'Nuevo con etiqueta',
    color: 'Arena / Beige Cálido',
    colorHex: '#D7C4A5',
    colorSeason: 'Cálido (Otoño/Primavera)',
    seller: {
      name: 'Valeria M.',
      verified: true,
      rating: 4.9,
      salesCount: 42
    },
    images: [
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Camisa relajada en lino italiano prelavado de alta densidad. Suave al tacto, transpirable y con una caída impecable para climas templados o cálidos.',
    measurements: 'Pecho: 58cm, Largo: 74cm, Manga: 63cm',
    authenticityVerified: true,
    inspectionCertificateId: 'BC-AUTH-9821'
  },
  {
    id: 'bc-02',
    title: 'Blazer Sastrado Minimalista en Lana Merino',
    brand: 'Atelier Noir',
    category: 'Chaquetas & Abrigos',
    style: 'Minimalist',
    material: 'Lana Merino & Cashmere',
    price: 580,
    originalPrice: 850,
    size: 'M',
    condition: 'Como nuevo',
    color: 'Negro Carbón',
    colorHex: '#18181D',
    colorSeason: 'Frío (Invierno/Verano)',
    seller: {
      name: 'Carlos B.',
      verified: true,
      rating: 5.0,
      salesCount: 68
    },
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Estructura semidesestructurada en fina lana merino virgen. Líneas limpias y silueta recta contemporánea que eleva cualquier outfit diario o formal.',
    measurements: 'Hombros: 46cm, Pecho: 52cm, Largo: 76cm',
    authenticityVerified: true,
    inspectionCertificateId: 'BC-AUTH-7734'
  },
  {
    id: 'bc-03',
    title: 'Hoodie Boxy Fit Heavyweight Streetwear',
    brand: 'Subway Archive',
    category: 'Chaquetas & Abrigos',
    style: 'Streetwear',
    material: '100% Algodón Pima',
    price: 320,
    originalPrice: 460,
    size: 'L',
    condition: 'Nuevo con etiqueta',
    color: 'Terracota Rust',
    colorHex: '#B85D38',
    colorSeason: 'Cálido (Otoño/Primavera)',
    seller: {
      name: 'Nico Street',
      verified: true,
      rating: 4.8,
      salesCount: 89
    },
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Sudadera pesada de 480 GSM en algodón peruano pima peinado. Silueta boxy moderna sin cordones con hombros caídos y capucha envolvente.',
    measurements: 'Pecho: 64cm, Largo: 68cm, Hombro caído: 62cm',
    authenticityVerified: true,
    inspectionCertificateId: 'BC-AUTH-6541'
  },
  {
    id: 'bc-04',
    title: 'Pantalón Wide Leg Denim Selvedge Japonés',
    brand: 'Kurabo Mill Works',
    category: 'Pantalones & Jeans',
    style: 'Streetwear',
    material: 'Denim Japonés',
    price: 450,
    originalPrice: 650,
    size: '32 (W32 L32)',
    condition: 'Como nuevo',
    color: 'Azul Índigo Profundo',
    colorHex: '#1B2A4A',
    colorSeason: 'Frío (Invierno/Verano)',
    seller: {
      name: 'Elena K.',
      verified: true,
      rating: 4.95,
      salesCount: 114
    },
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Denim japonés selvedge con orillo rojo de 14oz. Lavado suave que resalta la textura irregular del hilo. Corte amplio moderno con caída pesada.',
    measurements: 'Cintura: 82cm, Tiro: 33cm, Largo total: 106cm, Bota: 24cm',
    authenticityVerified: true,
    inspectionCertificateId: 'BC-AUTH-4319'
  },
  {
    id: 'bc-05',
    title: 'Vestido Slip Dress de Seda Natural Mulberry',
    brand: 'Maison Ethereal',
    category: 'Vestidos & Faldas',
    style: 'Casual Chic',
    material: 'Seda Natural',
    price: 490,
    originalPrice: 720,
    size: 'S',
    condition: 'Nuevo con etiqueta',
    color: 'Verde Salvia Suave',
    colorHex: '#9CAF88',
    colorSeason: 'Cálido (Otoño/Primavera)',
    seller: {
      name: 'Camila P.',
      verified: true,
      rating: 4.9,
      salesCount: 31
    },
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Vestido al bies confeccionado en 100% seda Mulberry de 19 momme. Brillo sutil y ajuste fluido que se adapta a la silueta con tirantes regulables.',
    measurements: 'Busto: 86cm, Cintura: 70cm, Largo: 122cm',
    authenticityVerified: true,
    inspectionCertificateId: 'BC-AUTH-8890'
  },
  {
    id: 'bc-06',
    title: 'Chaqueta Biker de Cuero Vegano Estructurado',
    brand: 'NeoRebel Studio',
    category: 'Chaquetas & Abrigos',
    style: 'Y2K',
    material: 'Cuero Vegano & Piel',
    price: 420,
    originalPrice: 600,
    size: 'M',
    condition: 'Excelente estado vintage',
    color: 'Borgoña / Vino Tinto',
    colorHex: '#581825',
    colorSeason: 'Frío (Invierno/Verano)',
    seller: {
      name: 'Lucas V.',
      verified: true,
      rating: 4.85,
      salesCount: 53
    },
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Chaqueta estilo motera con detalles metálicos envejecidos, forro interior satinado y silueta cropped noventera en eco-cuero de alta durabilidad.',
    measurements: 'Hombros: 42cm, Pecho: 49cm, Largo: 52cm',
    authenticityVerified: true,
    inspectionCertificateId: 'BC-AUTH-3278'
  },
  {
    id: 'bc-07',
    title: 'Cardigan Chunky Tejido en Lana Merino y Alpaca',
    brand: 'Andean Heritage',
    category: 'Knitwear & Suéteres',
    style: 'Old Money',
    material: 'Lana Merino & Cashmere',
    price: 380,
    originalPrice: 550,
    size: 'M / L',
    condition: 'Como nuevo',
    color: 'Blanco Crudo / Marfil',
    colorHex: '#F4F1EA',
    colorSeason: 'Neutro Universal',
    seller: {
      name: 'Sofia G.',
      verified: true,
      rating: 5.0,
      salesCount: 77
    },
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Cardigan de punto grueso trenzado con botones de cuerno natural. Calidez superior, fibra no irritante y estilo atemporal fácil de superponer.',
    measurements: 'Pecho: 56cm, Largo: 66cm, Manga raglán: 72cm',
    authenticityVerified: true,
    inspectionCertificateId: 'BC-AUTH-5542'
  },
  {
    id: 'bc-08',
    title: 'Pantalón Pleated Chino en Lino y Algodón',
    brand: 'Minimalist Riviera',
    category: 'Pantalones & Jeans',
    style: 'Minimalist',
    material: '100% Lino',
    price: 310,
    originalPrice: 450,
    size: '31 (W31 L30)',
    condition: 'Nuevo con etiqueta',
    color: 'Verde Oliva Militar',
    colorHex: '#556B2F',
    colorSeason: 'Cálido (Otoño/Primavera)',
    seller: {
      name: 'Andrés T.',
      verified: true,
      rating: 4.9,
      salesCount: 39
    },
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Pantalón de pinzas con cintura limpia y tiro medio-alto. Mezcla prémium de lino y algodón orgánico que resiste arrugas manteniendo frescura total.',
    measurements: 'Cintura: 80cm, Tiro: 31cm, Largo: 98cm',
    authenticityVerified: true,
    inspectionCertificateId: 'BC-AUTH-9112'
  },
  {
    id: 'bc-09',
    title: 'Camiseta Básica Heavyweight Algodón Pima 280g',
    brand: 'Pure Essentials',
    category: 'Camisas & Tops',
    style: 'Minimalist',
    material: '100% Algodón Pima',
    price: 160,
    originalPrice: 240,
    size: 'M',
    condition: 'Nuevo con etiqueta',
    color: 'Blanco Óptico',
    colorHex: '#FFFFFF',
    colorSeason: 'Frío (Invierno/Verano)',
    seller: {
      name: 'Valeria M.',
      verified: true,
      rating: 4.9,
      salesCount: 42
    },
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'El básico definitivo: cuello acanalado reforzado de 2.5cm que no se deforma tras los lavados, algodón pima de fibra extralarga y caída impecable.',
    measurements: 'Pecho: 54cm, Largo: 71cm',
    authenticityVerified: true,
    inspectionCertificateId: 'BC-AUTH-1049'
  },

  // --- SECCIÓN 1: DEPORTIVO / ACTIVEWEAR / ATHLEISURE (bc-10 a bc-17) ---
  {
    id: 'bc-10',
    title: 'Set Deportivo Seamless de Top y Calza Moldeadora',
    brand: 'Aura Studio Fit',
    category: 'Ropa Deportiva & Activewear',
    style: 'Deportivo / Athleisure',
    material: 'Tejido Técnico & Spandex',
    price: 260,
    originalPrice: 380,
    size: 'S / M',
    condition: 'Nuevo con etiqueta',
    color: 'Lavanda Suave',
    colorHex: '#B5A9C9',
    colorSeason: 'Frío (Invierno/Verano)',
    seller: {
      name: 'Paula Fitness',
      verified: true,
      rating: 4.95,
      salesCount: 64
    },
    images: [
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Conjunto deportivo confeccionado en punto tubular seamless sin costuras laterales. Efecto moldeador, soporte medio-alto y absorción antibacteriana.',
    measurements: 'Top Busto: 75-88cm, Calza Cintura: 62-76cm, Tiro: Alto',
    authenticityVerified: true,
    inspectionCertificateId: 'BC-AUTH-2010'
  },
  {
    id: 'bc-11',
    title: 'Chaqueta Cortavientos Ultraligera con Reflectivos',
    brand: 'Peak Performance Lab',
    category: 'Ropa Deportiva & Activewear',
    style: 'Deportivo / Athleisure',
    material: 'Nylon & Poliamida Reciclada',
    price: 290,
    originalPrice: 420,
    size: 'L',
    condition: 'Como nuevo',
    color: 'Amarillo Lima Flúor',
    colorHex: '#D4E157',
    colorSeason: 'Cálido (Otoño/Primavera)',
    seller: {
      name: 'Mateo Runner',
      verified: true,
      rating: 4.88,
      salesCount: 37
    },
    images: [
      'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Cortavientos técnico de 90g con tratamiento DWR repelente al agua. Plegable en su propio bolsillo con microperforaciones de ventilación en axilas y espalda.',
    measurements: 'Pecho: 59cm, Largo: 72cm, Manga: 66cm',
    authenticityVerified: true,
    inspectionCertificateId: 'BC-AUTH-2011'
  },
  {
    id: 'bc-12',
    title: 'Leggings Compresivos Térmicos de Alto Rendimiento',
    brand: 'Kore Active',
    category: 'Ropa Deportiva & Activewear',
    style: 'Deportivo / Athleisure',
    material: 'Tejido Técnico & Spandex',
    price: 210,
    originalPrice: 310,
    size: 'M',
    condition: 'Nuevo con etiqueta',
    color: 'Negro Mate Carbón',
    colorHex: '#212121',
    colorSeason: 'Neutro Universal',
    seller: {
      name: 'Mariana Z.',
      verified: true,
      rating: 5.0,
      salesCount: 82
    },
    images: [
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Pantalón deportivo con compresión graduada y forro interior microtérmico. Bolsillo lateral para smartphone y cintura reforzada antideslizamiento.',
    measurements: 'Cintura: 68-80cm, Largo Pierna: 94cm',
    authenticityVerified: true,
    inspectionCertificateId: 'BC-AUTH-2012'
  },
  {
    id: 'bc-13',
    title: 'Zapatillas Running Pro Cushioning Placa de Carbono',
    brand: 'Veloce Athletics',
    category: 'Calzado & Accesorios',
    style: 'Deportivo / Athleisure',
    material: 'Tejido Técnico & Spandex',
    price: 620,
    originalPrice: 890,
    size: '41 EU (8.5 US)',
    condition: 'Como nuevo (1 uso de prueba)',
    color: 'Blanco / Naranja Eléctrico',
    colorHex: '#FF6F00',
    colorSeason: 'Cálido (Otoño/Primavera)',
    seller: {
      name: 'Jorge S.',
      verified: true,
      rating: 4.92,
      salesCount: 45
    },
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Zapatillas de maratón con entresuela de espuma reactiva supercritical y placa integral de fibra de carbono para máximo retorno de energía.',
    measurements: 'Plantilla interior: 26.5cm',
    authenticityVerified: true,
    inspectionCertificateId: 'BC-AUTH-2013'
  },
  {
    id: 'bc-14',
    title: 'Sudadera Técnica Half-Zip Transpirable',
    brand: 'Nórdic Train',
    category: 'Ropa Deportiva & Activewear',
    style: 'Deportivo / Athleisure',
    material: 'Tejido Técnico & Spandex',
    price: 240,
    originalPrice: 350,
    size: 'L',
    condition: 'Nuevo con etiqueta',
    color: 'Azul Marino Profundo',
    colorHex: '#102A43',
    colorSeason: 'Frío (Invierno/Verano)',
    seller: {
      name: 'Gabriel F.',
      verified: true,
      rating: 4.85,
      salesCount: 29
    },
    images: [
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Prenda intermedia térmica con cremallera YKK invertida hasta el pecho y orificios para pulgares en los puños. Secado rápido y textura aterciopelada interior.',
    measurements: 'Pecho: 57cm, Largo: 70cm, Manga: 65cm',
    authenticityVerified: true,
    inspectionCertificateId: 'BC-AUTH-2014'
  },
  {
    id: 'bc-15',
    title: 'Shorts 2-en-1 de Entrenamiento con Malla Interior',
    brand: 'Endure Lab',
    category: 'Ropa Deportiva & Activewear',
    style: 'Deportivo / Athleisure',
    material: 'Nylon & Poliamida Reciclada',
    price: 180,
    originalPrice: 260,
    size: 'M',
    condition: 'Nuevo con etiqueta',
    color: 'Verde Botella Oscuro',
    colorHex: '#1B4D3E',
    colorSeason: 'Frío (Invierno/Verano)',
    seller: {
      name: 'Esteban R.',
      verified: true,
      rating: 4.9,
      salesCount: 51
    },
    images: [
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Pantalón corto de 5 pulgadas con malla de compresión integrada que previene rozaduras. Cintura elástica con cordón interior y bolsillo impermeable para llaves.',
    measurements: 'Cintura: 76-88cm, Largo: 41cm',
    authenticityVerified: true,
    inspectionCertificateId: 'BC-AUTH-2015'
  },
  {
    id: 'bc-16',
    title: 'Top Deportivo Alto Impacto Cruzado en Espalda',
    brand: 'Zenith Athletics',
    category: 'Ropa Deportiva & Activewear',
    style: 'Deportivo / Athleisure',
    material: 'Tejido Técnico & Spandex',
    price: 150,
    originalPrice: 220,
    size: 'M',
    condition: 'Nuevo con etiqueta',
    color: 'Rosa Palo Deportivo',
    colorHex: '#DDA7A5',
    colorSeason: 'Cálido (Otoño/Primavera)',
    seller: {
      name: 'Lucía V.',
      verified: true,
      rating: 4.96,
      salesCount: 73
    },
    images: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Sujetador deportivo estructurado con copas extraíbles y tirantes multidireccionales que distribuyen el peso equitativamente en trapecios y hombros.',
    measurements: 'Contorno de bajo busto: 72-82cm',
    authenticityVerified: true,
    inspectionCertificateId: 'BC-AUTH-2016'
  },
  {
    id: 'bc-17',
    title: 'Mochila Técnica Impermeable Roll-Top 25L',
    brand: 'Kletter & Co.',
    category: 'Calzado & Accesorios',
    style: 'Deportivo / Athleisure',
    material: 'Nylon & Poliamida Reciclada',
    price: 340,
    originalPrice: 480,
    size: 'Única (25 Litros)',
    condition: 'Como nuevo',
    color: 'Gris Grafito Asfalto',
    colorHex: '#37474F',
    colorSeason: 'Neutro Universal',
    seller: {
      name: 'Carlos B.',
      verified: true,
      rating: 5.0,
      salesCount: 68
    },
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Mochila de cierre enrollable con sellado hermético por alta frecuencia. Compartimento acolchado para laptop de 16" y correas ergonómicas transpirables.',
    measurements: 'Alto: 48cm (extensible a 60cm), Ancho: 30cm, Fondo: 15cm',
    authenticityVerified: true,
    inspectionCertificateId: 'BC-AUTH-2017'
  },

  // --- SECCIÓN 2: TRAJES DE BAÑO & RESORT / PLAYA (bc-18 a bc-23) ---
  {
    id: 'bc-18',
    title: 'Bañador Entero Asimétrico Escote Cut-Out',
    brand: 'Costa Dorada Resort',
    category: 'Trajes de Baño & Playa',
    style: 'Beachwear / Resort',
    material: 'Nylon & Poliamida Reciclada',
    price: 260,
    originalPrice: 390,
    size: 'M',
    condition: 'Nuevo con etiqueta',
    color: 'Terracota Bronce',
    colorHex: '#A0522D',
    colorSeason: 'Cálido (Otoño/Primavera)',
    seller: {
      name: 'Valentina Mar',
      verified: true,
      rating: 4.97,
      salesCount: 92
    },
    images: [
      'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Traje de baño de una pieza con diseño asimétrico de un solo hombro y abertura lateral arquitectónica. Tejido italiano Econyl con protección solar UPF 50+.',
    measurements: 'Busto: 84-92cm, Cadera: 90-98cm',
    authenticityVerified: true,
    inspectionCertificateId: 'BC-AUTH-3018'
  },
  {
    id: 'bc-19',
    title: 'Bikini Retro Tiro Alto con Top Halter de Aros',
    brand: 'Riviera Vintage Swim',
    category: 'Trajes de Baño & Playa',
    style: 'Beachwear / Resort',
    material: 'Nylon & Poliamida Reciclada',
    price: 230,
    originalPrice: 340,
    size: 'S',
    condition: 'Nuevo con etiqueta',
    color: 'Azul Cobalto Real',
    colorHex: '#0047AB',
    colorSeason: 'Frío (Invierno/Verano)',
    seller: {
      name: 'Sofia G.',
      verified: true,
      rating: 5.0,
      salesCount: 77
    },
    images: [
      'https://images.unsplash.com/photo-1582639510494-c80b5de9f148?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Conjunto bikini de dos piezas con braguita de cintura ultra alta moldeadora y top con aros ocultos que realzan el escote de forma natural.',
    measurements: 'Top: Copa B (80-88cm), Braguita Cadera: 86-94cm',
    authenticityVerified: true,
    inspectionCertificateId: 'BC-AUTH-3019'
  },
  {
    id: 'bc-20',
    title: 'Bermuda de Baño de Secado Rápido Print Botánico',
    brand: 'Tulum Atelier',
    category: 'Trajes de Baño & Playa',
    style: 'Beachwear / Resort',
    material: 'Nylon & Poliamida Reciclada',
    price: 190,
    originalPrice: 280,
    size: 'M (32)',
    condition: 'Nuevo con etiqueta',
    color: 'Verde Salvia & Palmeras',
    colorHex: '#526E5B',
    colorSeason: 'Cálido (Otoño/Primavera)',
    seller: {
      name: 'Santiago M.',
      verified: true,
      rating: 4.9,
      salesCount: 40
    },
    images: [
      'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Bañador masculino de corte medio (6") en microfibra hidrofóbica con tacto piel de melocotón. Forro interior de malla elástica suave y cordón con terminales grabados.',
    measurements: 'Cintura: 80-86cm, Largo exterior: 39cm',
    authenticityVerified: true,
    inspectionCertificateId: 'BC-AUTH-3020'
  },
  {
    id: 'bc-21',
    title: 'Vestido Kimono Salida de Playa en Lino y Encaje Crochet',
    brand: 'Isla Blanca Artisan',
    category: 'Vestidos & Faldas',
    style: 'Beachwear / Resort',
    material: '100% Lino',
    price: 340,
    originalPrice: 480,
    size: 'M / L (Oversize)',
    condition: 'Nuevo con etiqueta',
    color: 'Blanco Arena Cálido',
    colorHex: '#ECE7DE',
    colorSeason: 'Neutro Universal',
    seller: {
      name: 'Camila P.',
      verified: true,
      rating: 4.9,
      salesCount: 31
    },
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Kaftán abierto largo en lino puro con inserciones artesanales de crochet en mangas y dobladillo. Acompaña el movimiento con ligereza y sofisticación marina.',
    measurements: 'Largo total: 128cm, Caída hombros: 60cm',
    authenticityVerified: true,
    inspectionCertificateId: 'BC-AUTH-3021'
  },
  {
    id: 'bc-22',
    title: 'Camisa Resort Cuello Campamento en Seda y Viscosa',
    brand: 'Havana Nights',
    category: 'Camisas & Tops',
    style: 'Beachwear / Resort',
    material: 'Seda Natural',
    price: 280,
    originalPrice: 400,
    size: 'L',
    condition: 'Como nuevo',
    color: 'Mostaza Cálido / Ocre',
    colorHex: '#C68B2C',
    colorSeason: 'Cálido (Otoño/Primavera)',
    seller: {
      name: 'Andrés T.',
      verified: true,
      rating: 4.9,
      salesCount: 39
    },
    images: [
      'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Camisa relajada con cuello abierto estilo cubano. Mezcla liviana de seda y viscosa con caída suntuosa y tacto frío ideal para veladas al atardecer.',
    measurements: 'Pecho: 58cm, Largo: 73cm',
    authenticityVerified: true,
    inspectionCertificateId: 'BC-AUTH-3022'
  },
  {
    id: 'bc-23',
    title: 'Sombrero Fedora Artesanal en Paja Toquilla Fina Grado 8',
    brand: 'Montecristi Heritage',
    category: 'Calzado & Accesorios',
    style: 'Beachwear / Resort',
    material: '100% Lino',
    price: 360,
    originalPrice: 520,
    size: '58cm (M)',
    condition: 'Nuevo con estuche de viaje',
    color: 'Paja Natural con Cinta Negra',
    colorHex: '#E5D3B3',
    colorSeason: 'Neutro Universal',
    seller: {
      name: 'Valeria M.',
      verified: true,
      rating: 4.9,
      salesCount: 42
    },
    images: [
      'https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Genuino sombrero de paja toquilla tejido a mano por maestros artesanos. Ala media de 6.5cm, badana interior de piel suave y cinta grosgrain negra.',
    measurements: 'Circunferencia interna: 58cm',
    authenticityVerified: true,
    inspectionCertificateId: 'BC-AUTH-3023'
  },

  // --- SECCIÓN 3: TRAJES & SASTRERÍA EJECUTIVA / FORMAL (bc-24 a bc-31) ---
  {
    id: 'bc-24',
    title: 'Traje Dos Piezas Cruzado Slim Fit en Lana Fría 130s',
    brand: 'Savile Row Tailors',
    category: 'Trajes & Sastrería',
    style: 'Formal & Ejecutivo',
    material: 'Lana Merino & Cashmere',
    price: 890,
    originalPrice: 1350,
    size: '50 IT (M / L)',
    condition: 'Como nuevo (puesto 1 vez)',
    color: 'Azul Medianoche Profundo',
    colorHex: '#0B192C',
    colorSeason: 'Frío (Invierno/Verano)',
    seller: {
      name: 'Carlos B.',
      verified: true,
      rating: 5.0,
      salesCount: 68
    },
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Conjunto de chaqueta cruzada 6x2 con solapa en pico amplia y pantalón con pretina corrida y ajustadores laterales metálicos. Confección artesanal entera.',
    measurements: 'Chaqueta Pecho: 53cm, Hombros: 46cm | Pantalón Cintura: 84cm, Tiro: 31cm, Largo: 102cm',
    authenticityVerified: true,
    inspectionCertificateId: 'BC-AUTH-4024'
  },
  {
    id: 'bc-25',
    title: 'Blazer Smoking de Terciopelo de Seda con Solapa de Raso',
    brand: 'Maison D’Or',
    category: 'Trajes & Sastrería',
    style: 'Elegante / Fiesta',
    material: 'Seda Natural',
    price: 680,
    originalPrice: 990,
    size: '48 IT (M)',
    condition: 'Excelente estado',
    color: 'Verde Esmeralda Imperial',
    colorHex: '#043927',
    colorSeason: 'Frío (Invierno/Verano)',
    seller: {
      name: 'Gabriel F.',
      verified: true,
      rating: 4.85,
      salesCount: 29
    },
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Chaqueta de esmoquin en terciopelo de seda alemán con brillo profundo y solapa redonda shawl en raso de seda negra. Cierre con botón forrado.',
    measurements: 'Hombros: 45cm, Pecho: 51cm, Largo: 75cm',
    authenticityVerified: true,
    inspectionCertificateId: 'BC-AUTH-4025'
  },
  {
    id: 'bc-26',
    title: 'Pantalón Sastre de Pinzas Dobles en Lana Virgen',
    brand: 'Atelier Sartoriale',
    category: 'Pantalones & Jeans',
    style: 'Formal & Ejecutivo',
    material: 'Lana Merino & Cashmere',
    price: 340,
    originalPrice: 490,
    size: '32 (W32 L32)',
    condition: 'Nuevo con etiqueta',
    color: 'Gris Marengo Carbón',
    colorHex: '#3A3F47',
    colorSeason: 'Frío (Invierno/Verano)',
    seller: {
      name: 'Elena K.',
      verified: true,
      rating: 4.95,
      salesCount: 114
    },
    images: [
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Pantalón clásico de corte sastre italiano con pinzas invertidas profundas, dobladillo vuelto de 4cm y bolsillos de ojal traseros.',
    measurements: 'Cintura: 82cm, Tiro: 32cm, Largo: 104cm, Bota: 21cm',
    authenticityVerified: true,
    inspectionCertificateId: 'BC-AUTH-4026'
  },
  {
    id: 'bc-27',
    title: 'Smoking Clásico Black Tie Solapa en Pico y Raso',
    brand: 'Black Label Bespoke',
    category: 'Trajes & Sastrería',
    style: 'Formal & Ejecutivo',
    material: 'Lana Merino & Cashmere',
    price: 940,
    originalPrice: 1450,
    size: '52 IT (L)',
    condition: 'Como nuevo',
    color: 'Negro Azabache Puro',
    colorHex: '#111113',
    colorSeason: 'Frío (Invierno/Verano)',
    seller: {
      name: 'Carlos B.',
      verified: true,
      rating: 5.0,
      salesCount: 68
    },
    images: [
      'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'El traje de etiqueta definitivo: lana fría Super 140s de Loro Piana, solapas en pico recubiertas en grogrén de seda y galón lateral a juego en pantalón.',
    measurements: 'Chaqueta Pecho: 56cm, Hombro: 48cm | Pantalón Cintura: 88cm, Largo: 106cm',
    authenticityVerified: true,
    inspectionCertificateId: 'BC-AUTH-4027'
  },
  {
    id: 'bc-28',
    title: 'Camisa Formal Cuello Francés en Algodón Egipcio Giza 87',
    brand: 'Camiceria Milano',
    category: 'Camisas & Tops',
    style: 'Formal & Ejecutivo',
    material: '100% Algodón Pima',
    price: 240,
    originalPrice: 360,
    size: '40 (M / 15.75")',
    condition: 'Nuevo con etiqueta',
    color: 'Celeste Cielo Suave',
    colorHex: '#C5D7E8',
    colorSeason: 'Frío (Invierno/Verano)',
    seller: {
      name: 'Andrés T.',
      verified: true,
      rating: 4.9,
      salesCount: 39
    },
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Camisa de vestir de dos cabos (120/2) tejida en hilado de algodón egipcio de fibra extralarga. Botones de nácar australiano cosidos con pata de gallo.',
    measurements: 'Cuello: 40cm, Pecho: 54cm, Manga: 65cm',
    authenticityVerified: true,
    inspectionCertificateId: 'BC-AUTH-4028'
  },
  {
    id: 'bc-29',
    title: 'Chaleco Sastre de Lana y Seda Ajustable Cuatro Botones',
    brand: 'Sartoria Studio',
    category: 'Trajes & Sastrería',
    style: 'Old Money',
    material: 'Lana Merino & Cashmere',
    price: 270,
    originalPrice: 390,
    size: 'M',
    condition: 'Excelente estado',
    color: 'Beige Tostado / Arena',
    colorHex: '#C9B596',
    colorSeason: 'Cálido (Otoño/Primavera)',
    seller: {
      name: 'Valeria M.',
      verified: true,
      rating: 4.9,
      salesCount: 42
    },
    images: [
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Chaleco sastre entallado con espalda en satén transpirable y trabilla de ajuste con hebilla metálica. Aporta estructura a cualquier traje de dos o tres piezas.',
    measurements: 'Pecho: 51cm, Largo frontal: 61cm',
    authenticityVerified: true,
    inspectionCertificateId: 'BC-AUTH-4029'
  },
  {
    id: 'bc-30',
    title: 'Falda Lápiz Midi Sastrada con Abertura Posterior',
    brand: 'Atelier Noir',
    category: 'Vestidos & Faldas',
    style: 'Formal & Ejecutivo',
    material: 'Lana Merino & Cashmere',
    price: 290,
    originalPrice: 420,
    size: 'S / 36 EU',
    condition: 'Nuevo con etiqueta',
    color: 'Azul Marino Corporativo',
    colorHex: '#192841',
    colorSeason: 'Frío (Invierno/Verano)',
    seller: {
      name: 'Camila P.',
      verified: true,
      rating: 4.9,
      salesCount: 31
    },
    images: [
      'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Falda de oficina en crepé de lana italiana de estructura firme. Cintura alta definida, forro de cupro sedoso y abertura trasera para libertad de paso.',
    measurements: 'Cintura: 68cm, Cadera: 92cm, Largo: 74cm',
    authenticityVerified: true,
    inspectionCertificateId: 'BC-AUTH-4030'
  },
  {
    id: 'bc-31',
    title: 'Zapatos Oxford Cap-Toe Piel Flor con Cosido Goodyear',
    brand: 'Cobbler & Craft',
    category: 'Calzado & Accesorios',
    style: 'Formal & Ejecutivo',
    material: 'Cuero Vegano & Piel',
    price: 640,
    originalPrice: 920,
    size: '42 EU (9 US)',
    condition: 'Como nuevo',
    color: 'Marrón Coñac / Tabaco',
    colorHex: '#6F432A',
    colorSeason: 'Cálido (Otoño/Primavera)',
    seller: {
      name: 'Carlos B.',
      verified: true,
      rating: 5.0,
      salesCount: 68
    },
    images: [
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Zapatos de vestir Oxford hechos a mano en piel de becerro francesa plena flor. Construcción Goodyear Welt que garantiza décadas de durabilidad y fácil resolado.',
    measurements: 'Plantilla interior: 27.5cm',
    authenticityVerified: true,
    inspectionCertificateId: 'BC-AUTH-4031'
  },

  // --- SECCIÓN 4: ELEGANTE / FIESTA & GALA (bc-32 a bc-39) ---
  {
    id: 'bc-32',
    title: 'Vestido de Gala Largo en Satén con Espalda Descubierta',
    brand: 'Maison Ethereal',
    category: 'Vestidos & Faldas',
    style: 'Elegante / Fiesta',
    material: 'Satén & Chifón',
    price: 740,
    originalPrice: 1100,
    size: 'M',
    condition: 'Nuevo con etiqueta',
    color: 'Rojo Rubí Borgoña',
    colorHex: '#8B0000',
    colorSeason: 'Frío (Invierno/Verano)',
    seller: {
      name: 'Sofia G.',
      verified: true,
      rating: 5.0,
      salesCount: 77
    },
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Vestido de alfombra roja cortado al bies en satén duquesa de peso sustancial. Caída escultural líquida, tirantes ultrafinos cruzados y discreta cola posterior.',
    measurements: 'Busto: 88cm, Cintura: 72cm, Largo frontal: 152cm',
    authenticityVerified: true,
    inspectionCertificateId: 'BC-AUTH-5032'
  },
  {
    id: 'bc-33',
    title: 'Vestido Midi Cocktail con Lentejuelas Degradé Champagne',
    brand: 'Lumière Paris',
    category: 'Vestidos & Faldas',
    style: 'Elegante / Fiesta',
    material: 'Satén & Chifón',
    price: 520,
    originalPrice: 780,
    size: 'S',
    condition: 'Como nuevo',
    color: 'Dorado Champagne',
    colorHex: '#D4AF37',
    colorSeason: 'Cálido (Otoño/Primavera)',
    seller: {
      name: 'Paula Fitness',
      verified: true,
      rating: 4.95,
      salesCount: 64
    },
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Vestido de noche confeccionado en malla elástica bordada con micro-lentejuelas mates que capturan la luz de manera sofisticada sin deslumbrar.',
    measurements: 'Busto: 84cm, Cintura: 68cm, Largo: 115cm',
    authenticityVerified: true,
    inspectionCertificateId: 'BC-AUTH-5033'
  },
  {
    id: 'bc-34',
    title: 'Jumpsuit Halterneck Fluido con Abertura Frontal',
    brand: 'Monochrome Luxe',
    category: 'Vestidos & Faldas',
    style: 'Elegante / Fiesta',
    material: 'Satén & Chifón',
    price: 460,
    originalPrice: 650,
    size: 'M',
    condition: 'Nuevo con etiqueta',
    color: 'Negro Azabache',
    colorHex: '#121214',
    colorSeason: 'Neutro Universal',
    seller: {
      name: 'Elena K.',
      verified: true,
      rating: 4.95,
      salesCount: 114
    },
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Mono entero de fiesta en crepé fluido de alta caída con escote halter cruzado al cuello y pantalón palazzo de pierna ultra ancha que simula un vestido en reposo.',
    measurements: 'Busto: 88cm, Cintura: 72cm, Largo total: 148cm',
    authenticityVerified: true,
    inspectionCertificateId: 'BC-AUTH-5034'
  },
  {
    id: 'bc-35',
    title: 'Top Corsetero Estructurado en Raso con Ballenas Flexibles',
    brand: 'Corset Atelier',
    category: 'Camisas & Tops',
    style: 'Elegante / Fiesta',
    material: 'Satén & Chifón',
    price: 270,
    originalPrice: 380,
    size: 'S / 36 EU',
    condition: 'Nuevo con etiqueta',
    color: 'Blanco Perla / Marfil',
    colorHex: '#FDFBF7',
    colorSeason: 'Neutro Universal',
    seller: {
      name: 'Camila P.',
      verified: true,
      rating: 4.9,
      salesCount: 31
    },
    images: [
      'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Corsé moderno con escote corazón marcado y costuras con varillas flexibles que ciñen la cintura cómodamente. Cierre de cremallera metálica trasera.',
    measurements: 'Busto: 82-86cm, Cintura: 64-68cm',
    authenticityVerified: true,
    inspectionCertificateId: 'BC-AUTH-5035'
  },
  {
    id: 'bc-36',
    title: 'Sandalias de Tacón Alto con Tiras Finas Metalizadas',
    brand: 'Stiletto Studio',
    category: 'Calzado & Accesorios',
    style: 'Elegante / Fiesta',
    material: 'Cuero Vegano & Piel',
    price: 380,
    originalPrice: 550,
    size: '38 EU (7.5 US)',
    condition: 'Como nuevo',
    color: 'Oro Rosa Metalizado',
    colorHex: '#B76E79',
    colorSeason: 'Cálido (Otoño/Primavera)',
    seller: {
      name: 'Valentina Mar',
      verified: true,
      rating: 4.97,
      salesCount: 92
    },
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Sandalias minimalistas con tiras tubulares de 3mm en piel metalizada flexible. Tacón aguja de 9cm equilibrado con almohadilla de gel en metatarso.',
    measurements: 'Altura tacón: 9cm, Plantilla: 24.5cm',
    authenticityVerified: true,
    inspectionCertificateId: 'BC-AUTH-5036'
  },
  {
    id: 'bc-37',
    title: 'Clutch Rígido de Fiesta con Cierre Joya y Cadena Oculta',
    brand: 'Maison D’Or',
    category: 'Calzado & Accesorios',
    style: 'Elegante / Fiesta',
    material: 'Satén & Chifón',
    price: 240,
    originalPrice: 350,
    size: 'Única',
    condition: 'Nuevo con estuche guardapolvo',
    color: 'Negro con Cierre Dorado',
    colorHex: '#1E1E1E',
    colorSeason: 'Neutro Universal',
    seller: {
      name: 'Sofia G.',
      verified: true,
      rating: 5.0,
      salesCount: 77
    },
    images: [
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Bolso de mano estilo minaudière forrado en raso de seda con herrajes dorados pulidos. Incluye cadena fina para llevar al hombro o esconder al interior.',
    measurements: 'Largo: 20cm, Alto: 12cm, Profundidad: 5cm',
    authenticityVerified: true,
    inspectionCertificateId: 'BC-AUTH-5037'
  },
  {
    id: 'bc-38',
    title: 'Falda Maxi Plisada Soleil en Tejido Tornasol',
    brand: 'Plissé Atelier',
    category: 'Vestidos & Faldas',
    style: 'Elegante / Fiesta',
    material: 'Satén & Chifón',
    price: 330,
    originalPrice: 470,
    size: 'M',
    condition: 'Nuevo con etiqueta',
    color: 'Verde Esmeralda Profundo',
    colorHex: '#0B5345',
    colorSeason: 'Frío (Invierno/Verano)',
    seller: {
      name: 'Valeria M.',
      verified: true,
      rating: 4.9,
      salesCount: 42
    },
    images: [
      'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Falda larga con plisado permanente en acordeón que abre en vuelo amplio tipo soleil al caminar. Cinturilla elástica con brillo satinado sutil.',
    measurements: 'Cintura: 68-78cm, Largo: 98cm',
    authenticityVerified: true,
    inspectionCertificateId: 'BC-AUTH-5038'
  },
  {
    id: 'bc-39',
    title: 'Capa Corta de Noche en Mezcla de Lana y Seda',
    brand: 'Nocturne Haute',
    category: 'Chaquetas & Abrigos',
    style: 'Elegante / Fiesta',
    material: 'Lana Merino & Cashmere',
    price: 490,
    originalPrice: 720,
    size: 'Única (S a L)',
    condition: 'Excelente estado',
    color: 'Negro Medianoche',
    colorHex: '#141416',
    colorSeason: 'Neutro Universal',
    seller: {
      name: 'Carlos B.',
      verified: true,
      rating: 5.0,
      salesCount: 68
    },
    images: [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Prenda exterior de fiesta que abriga hombros y escotes sin arrugar mangas. Cuello alto envolvente y cierre con broche joya metálico envejecido.',
    measurements: 'Largo espalda: 55cm, Caída hombro: 42cm',
    authenticityVerified: true,
    inspectionCertificateId: 'BC-AUTH-5039'
  },

  // --- SECCIÓN 5: CASUAL & STREETWEAR (bc-40 a bc-49) ---
  {
    id: 'bc-40',
    title: 'Pantalón Cargo Táctico Utility con Bolsillos 3D',
    brand: 'Subway Archive',
    category: 'Pantalones & Jeans',
    style: 'Streetwear',
    material: '100% Algodón Pima',
    price: 360,
    originalPrice: 510,
    size: '32 (M)',
    condition: 'Nuevo con etiqueta',
    color: 'Verde Caqui Militar',
    colorHex: '#4B5320',
    colorSeason: 'Cálido (Otoño/Primavera)',
    seller: {
      name: 'Nico Street',
      verified: true,
      rating: 4.8,
      salesCount: 89
    },
    images: [
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Pantalón cargo en sarga de algodón pesada con 8 bolsillos funcionales, tiradores ajustables con tanca en los tobillos y refuerzo en rodillas.',
    measurements: 'Cintura: 82cm, Tiro: 33cm, Largo: 105cm',
    authenticityVerified: true,
    inspectionCertificateId: 'BC-AUTH-6040'
  },
  {
    id: 'bc-41',
    title: 'Campera Bomber Reversible MA-1 Oversize',
    brand: 'NeoRebel Studio',
    category: 'Chaquetas & Abrigos',
    style: 'Streetwear',
    material: 'Nylon & Poliamida Reciclada',
    price: 410,
    originalPrice: 590,
    size: 'L',
    condition: 'Como nuevo',
    color: 'Verde Oliva / Interior Naranja',
    colorHex: '#556B2F',
    colorSeason: 'Cálido (Otoño/Primavera)',
    seller: {
      name: 'Lucas V.',
      verified: true,
      rating: 4.85,
      salesCount: 53
    },
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Cazadora bomber clásica de corte holgado en nailon brillante hidrófugo con forro interior naranja de rescate. Cremallera metálica bidireccional gruesa.',
    measurements: 'Pecho: 63cm, Hombros: 52cm, Largo: 68cm',
    authenticityVerified: true,
    inspectionCertificateId: 'BC-AUTH-6041'
  },
  {
    id: 'bc-42',
    title: 'Camiseta Gráfica Oversize Heavy Cotton 300g',
    brand: 'Subway Archive',
    category: 'Camisas & Tops',
    style: 'Streetwear',
    material: '100% Algodón Pima',
    price: 180,
    originalPrice: 260,
    size: 'XL (Boxy Fit)',
    condition: 'Nuevo con etiqueta',
    color: 'Gris Grafito Desgastado',
    colorHex: '#383838',
    colorSeason: 'Frío (Invierno/Verano)',
    seller: {
      name: 'Nico Street',
      verified: true,
      rating: 4.8,
      salesCount: 89
    },
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Remera de corte cuadrado en algodón peinado con lavado ácido vintage y estampado serigráfico de alta densidad en espalda y pecho.',
    measurements: 'Pecho: 62cm, Largo: 74cm, Caída hombro: 58cm',
    authenticityVerified: true,
    inspectionCertificateId: 'BC-AUTH-6042'
  },
  {
    id: 'bc-43',
    title: 'Jeans Straight Fit Tiro Medio Lavado Vintage 90s',
    brand: 'Kurabo Mill Works',
    category: 'Pantalones & Jeans',
    style: 'Casual Chic',
    material: 'Denim Japonés',
    price: 390,
    originalPrice: 560,
    size: '30 (W30 L32)',
    condition: 'Excelente estado vintage',
    color: 'Azul Celeste Deslavado',
    colorHex: '#7AA3CC',
    colorSeason: 'Frío (Invierno/Verano)',
    seller: {
      name: 'Elena K.',
      verified: true,
      rating: 4.95,
      salesCount: 114
    },
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Pantalón vaquero 100% algodón sin elastano que mantiene su forma estructurada. Bigotes naturales y remaches de cobre genuino.',
    measurements: 'Cintura: 78cm, Tiro: 29cm, Largo: 103cm',
    authenticityVerified: true,
    inspectionCertificateId: 'BC-AUTH-6043'
  },
  {
    id: 'bc-44',
    title: 'Sobrecamisa de Pana Gruesa Oversize con Bolsillos',
    brand: 'Pure Essentials',
    category: 'Camisas & Tops',
    style: 'Casual Chic',
    material: '100% Algodón Pima',
    price: 290,
    originalPrice: 420,
    size: 'L',
    condition: 'Nuevo con etiqueta',
    color: 'Marrón Caramelo Tostado',
    colorHex: '#8C5331',
    colorSeason: 'Cálido (Otoño/Primavera)',
    seller: {
      name: 'Valeria M.',
      verified: true,
      rating: 4.9,
      salesCount: 42
    },
    images: [
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Camisa pesada en pana de 8 canutillos de algodón suave. Ideal como chaqueta ligera en entretiempo sobre camisetas o suéteres finos.',
    measurements: 'Pecho: 60cm, Largo: 75cm, Manga: 64cm',
    authenticityVerified: true,
    inspectionCertificateId: 'BC-AUTH-6044'
  },
  {
    id: 'bc-45',
    title: 'Sneakers Chunky Retro de Cuero y Gamuza Natural',
    brand: 'NeoRebel Studio',
    category: 'Calzado & Accesorios',
    style: 'Streetwear',
    material: 'Cuero Vegano & Piel',
    price: 440,
    originalPrice: 630,
    size: '41 EU (8 US)',
    condition: 'Nuevo con caja original',
    color: 'Blanco Hueso con Detalles Grises',
    colorHex: '#EAE6DF',
    colorSeason: 'Neutro Universal',
    seller: {
      name: 'Lucas V.',
      verified: true,
      rating: 4.85,
      salesCount: 53
    },
    images: [
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Zapatillas urbanas de inspiración noventera combinando paneles de piel vacuna y serraje suave. Suela de goma vulcanizada con gran tracción y comodidad.',
    measurements: 'Plantilla interior: 26.5cm',
    authenticityVerified: true,
    inspectionCertificateId: 'BC-AUTH-6045'
  },
  {
    id: 'bc-46',
    title: 'Gorra Dad Cap Bordada en Sarga de Algodón Lavado',
    brand: 'Minimalist Riviera',
    category: 'Calzado & Accesorios',
    style: 'Casual Chic',
    material: '100% Algodón Pima',
    price: 110,
    originalPrice: 160,
    size: 'Ajustable',
    condition: 'Nuevo con etiqueta',
    color: 'Azul Marino Deslavado',
    colorHex: '#253858',
    colorSeason: 'Neutro Universal',
    seller: {
      name: 'Nico Street',
      verified: true,
      rating: 4.8,
      salesCount: 89
    },
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Gorra desestructurada de 6 paneles con visera curvada y cierre trasero metálico con hebilla grabada. Acabado lavado que añade carácter instantáneo.',
    measurements: 'Circunferencia: 55-61cm ajustable',
    authenticityVerified: true,
    inspectionCertificateId: 'BC-AUTH-6046'
  },
  {
    id: 'bc-47',
    title: 'Bolso Cruzado Crossbody de Nylon Ripstop y Cordura',
    brand: 'Subway Archive',
    category: 'Calzado & Accesorios',
    style: 'Streetwear',
    material: 'Nylon & Poliamida Reciclada',
    price: 160,
    originalPrice: 240,
    size: 'Única',
    condition: 'Nuevo con etiqueta',
    color: 'Negro Mate',
    colorHex: '#1F1F1F',
    colorSeason: 'Neutro Universal',
    seller: {
      name: 'Lucas V.',
      verified: true,
      rating: 4.85,
      salesCount: 53
    },
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Riñonera / bolso cruzado resistente a rasgaduras con cremalleras estancas YKK y correa de cinta militar regulable con hebilla rápida de liberación.',
    measurements: 'Ancho: 28cm, Alto: 17cm, Profundidad: 8cm',
    authenticityVerified: true,
    inspectionCertificateId: 'BC-AUTH-6047'
  },
  {
    id: 'bc-48',
    title: 'Polo Rugby Oversize a Rayas con Cuello de Lona',
    brand: 'Andean Heritage',
    category: 'Camisas & Tops',
    style: 'Old Money',
    material: '100% Algodón Pima',
    price: 260,
    originalPrice: 370,
    size: 'M / L',
    condition: 'Como nuevo',
    color: 'Verde Bosque & Blanco Marfil',
    colorHex: '#1E4620',
    colorSeason: 'Cálido (Otoño/Primavera)',
    seller: {
      name: 'Santiago M.',
      verified: true,
      rating: 4.9,
      salesCount: 40
    },
    images: [
      'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Chomba polo pesada de 320 GSM en jersey grueso con botones de goma ocultos tradicionales y cuello en drill de algodón blanco contrastante.',
    measurements: 'Pecho: 58cm, Largo: 72cm',
    authenticityVerified: true,
    inspectionCertificateId: 'BC-AUTH-6048'
  },
  {
    id: 'bc-49',
    title: 'Chaleco Acolchado Puffer Sin Mangas Relleno Térmico',
    brand: 'Kore Active',
    category: 'Chaquetas & Abrigos',
    style: 'Casual Chic',
    material: 'Nylon & Poliamida Reciclada',
    price: 310,
    originalPrice: 440,
    size: 'L',
    condition: 'Nuevo con etiqueta',
    color: 'Ocre Mostaza Profundo',
    colorHex: '#B5781E',
    colorSeason: 'Cálido (Otoño/Primavera)',
    seller: {
      name: 'Esteban R.',
      verified: true,
      rating: 4.9,
      salesCount: 51
    },
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Chaleco acolchado con micro-cámaras horizontales de aislamiento térmico ecológico. Cuello subido con protector de barbilla y bolsillos térmicos para manos.',
    measurements: 'Pecho: 58cm, Largo: 69cm',
    authenticityVerified: true,
    inspectionCertificateId: 'BC-AUTH-6049'
  },

  // --- SECCIÓN 6: MODA DE AUTOR, KNITWEAR & VANGUARDIA / BOHO (bc-50 a bc-59) ---
  {
    id: 'bc-50',
    title: 'Trench Coat Clásico Doble Botonadura en Gabardina Impermeable',
    brand: 'Maison Ethereal',
    category: 'Chaquetas & Abrigos',
    style: 'Old Money',
    material: '100% Algodón Pima',
    price: 720,
    originalPrice: 1050,
    size: 'M',
    condition: 'Como nuevo',
    color: 'Camel / Beige Británico',
    colorHex: '#C19A6B',
    colorSeason: 'Cálido (Otoño/Primavera)',
    seller: {
      name: 'Valeria M.',
      verified: true,
      rating: 4.9,
      salesCount: 42
    },
    images: [
      'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'La gabardina icónica: solapas con protector de lluvia, charreteras en hombros, cinturón con anillas D metálicas y forro tartán clásico.',
    measurements: 'Pecho: 54cm, Hombros: 44cm, Largo: 112cm',
    authenticityVerified: true,
    inspectionCertificateId: 'BC-AUTH-7050'
  },
  {
    id: 'bc-51',
    title: 'Jersey Cuello Cisne de Cashmere Mongol 100% Puro',
    brand: 'Andean Heritage',
    category: 'Knitwear & Suéteres',
    style: 'Old Money',
    material: 'Lana Merino & Cashmere',
    price: 540,
    originalPrice: 790,
    size: 'M',
    condition: 'Nuevo con etiqueta',
    color: 'Gris Avena Melange',
    colorHex: '#D6D1CA',
    colorSeason: 'Neutro Universal',
    seller: {
      name: 'Sofia G.',
      verified: true,
      rating: 5.0,
      salesCount: 77
    },
    images: [
      'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Suéter de cuello alto elaborado con la capa más fina del cashmere de Mongolia (grosor 15.5 micras). Suavidad insuperable sobre la piel sin picazón.',
    measurements: 'Pecho: 53cm, Largo: 67cm, Manga: 63cm',
    authenticityVerified: true,
    inspectionCertificateId: 'BC-AUTH-7051'
  },
  {
    id: 'bc-52',
    title: 'Kimono Samurai Contemporáneo en Lino Pesado Prelavado',
    brand: 'Kurabo Mill Works',
    category: 'Chaquetas & Abrigos',
    style: 'Boho / Avant-Garde',
    material: '100% Lino',
    price: 430,
    originalPrice: 620,
    size: 'L (Corte Holgado)',
    condition: 'Nuevo con etiqueta',
    color: 'Azul Índigo Wabi-Sabi',
    colorHex: '#2C3E50',
    colorSeason: 'Frío (Invierno/Verano)',
    seller: {
      name: 'Nico Street',
      verified: true,
      rating: 4.8,
      salesCount: 89
    },
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Chaqueta cruzada de inspiración oriental tipo Haori con mangas anchas y cinturón lazo extraíble. Lino de 380 GSM con teñido botánico artesanal.',
    measurements: 'Ancho pecho: 66cm, Largo total: 80cm',
    authenticityVerified: true,
    inspectionCertificateId: 'BC-AUTH-7052'
  },
  {
    id: 'bc-53',
    title: 'Falda Maxi Bohemio Escalonada con Estampado Paisley',
    brand: 'Isla Blanca Artisan',
    category: 'Vestidos & Faldas',
    style: 'Boho / Avant-Garde',
    material: 'Seda Natural',
    price: 320,
    originalPrice: 460,
    size: 'M',
    condition: 'Como nuevo',
    color: 'Teja y Mostaza Cálido',
    colorHex: '#A85A32',
    colorSeason: 'Cálido (Otoño/Primavera)',
    seller: {
      name: 'Camila P.',
      verified: true,
      rating: 4.9,
      salesCount: 31
    },
    images: [
      'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Falda con volantes en caída escalonada confeccionada en seda liviana. Estampado de cachemira en tonos cálidos y cintura con nido de abeja elástico.',
    measurements: 'Cintura: 64-78cm, Largo: 100cm',
    authenticityVerified: true,
    inspectionCertificateId: 'BC-AUTH-7053'
  },
  {
    id: 'bc-54',
    title: 'Poncho Manta en Baby Alpaca y Lana Merino con Flecos',
    brand: 'Andean Heritage',
    category: 'Knitwear & Suéteres',
    style: 'Boho / Avant-Garde',
    material: 'Lana Merino & Cashmere',
    price: 410,
    originalPrice: 580,
    size: 'Única',
    condition: 'Nuevo con etiqueta',
    color: 'Gris Perla & Marfil',
    colorHex: '#E2DFD2',
    colorSeason: 'Neutro Universal',
    seller: {
      name: 'Sofia G.',
      verified: true,
      rating: 5.0,
      salesCount: 77
    },
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Capa envolvente tejida en telar tradicional con hilado de primera esquila de alpaca. Abrigo ligero como una pluma y flecos rematados a mano.',
    measurements: 'Dimensiones abierto: 140cm x 160cm',
    authenticityVerified: true,
    inspectionCertificateId: 'BC-AUTH-7054'
  },
  {
    id: 'bc-55',
    title: 'Bolso Tote Bag de Cuero Vacuno Curtido al Vegetal',
    brand: 'Atelier Sartoriale',
    category: 'Calzado & Accesorios',
    style: 'Minimalist',
    material: 'Cuero Vegano & Piel',
    price: 490,
    originalPrice: 700,
    size: 'Grande (A4 / Laptop 15")',
    condition: 'Nuevo con estuche de lona',
    color: 'Cuero Natural Envejecido',
    colorHex: '#8B5A2B',
    colorSeason: 'Cálido (Otoño/Primavera)',
    seller: {
      name: 'Carlos B.',
      verified: true,
      rating: 5.0,
      salesCount: 68
    },
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Bolso de estructura limpia en cuero italiano de 2.2mm sin forro artificial, que desarrollará una pátina única con el uso. Asas reforzadas con remaches.',
    measurements: 'Ancho: 42cm, Alto: 34cm, Fuelle: 14cm',
    authenticityVerified: true,
    inspectionCertificateId: 'BC-AUTH-7055'
  },
  {
    id: 'bc-56',
    title: 'Botines Chelsea Suela Track de Cuero Encerado',
    brand: 'Cobbler & Craft',
    category: 'Calzado & Accesorios',
    style: 'Casual Chic',
    material: 'Cuero Vegano & Piel',
    price: 520,
    originalPrice: 750,
    size: '39 EU (8.5 US mujer / 7 US hombre)',
    condition: 'Como nuevo',
    color: 'Negro Ébano Profundo',
    colorHex: '#1B1B1E',
    colorSeason: 'Frío (Invierno/Verano)',
    seller: {
      name: 'Elena K.',
      verified: true,
      rating: 4.95,
      salesCount: 114
    },
    images: [
      'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Botas estilo Chelsea con elásticos laterales anchos y suela de goma dentada extrusionada de 4.5cm. Piel hidrofugada resistente al barro y lluvia.',
    measurements: 'Altura caña: 16cm, Plantilla: 25.5cm',
    authenticityVerified: true,
    inspectionCertificateId: 'BC-AUTH-7056'
  },
  {
    id: 'bc-57',
    title: 'Gafas de Sol Cuadradas en Acetato Italiano Mazzucchelli',
    brand: 'Monochrome Luxe',
    category: 'Calzado & Accesorios',
    style: 'Old Money',
    material: 'Cuero Vegano & Piel',
    price: 310,
    originalPrice: 450,
    size: 'Calibre 52-20-145',
    condition: 'Nuevo con estuche de cuero y paño',
    color: 'Carey Ámbar Habana',
    colorHex: '#6E4720',
    colorSeason: 'Cálido (Otoño/Primavera)',
    seller: {
      name: 'Valeria M.',
      verified: true,
      rating: 4.9,
      salesCount: 42
    },
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Montura gruesa pulida a mano con bisagras de 5 dientes en acero inoxidable y lentes polarizadas Carl Zeiss categoría 3 con 100% protección UV.',
    measurements: 'Frente: 145mm, Puente: 20mm, Varilla: 145mm',
    authenticityVerified: true,
    inspectionCertificateId: 'BC-AUTH-7057'
  },
  {
    id: 'bc-58',
    title: 'Blusa Romántica con Mangas Abullonadas y Cuello Victoriano',
    brand: 'Maison Ethereal',
    category: 'Camisas & Tops',
    style: 'Casual Chic',
    material: '100% Algodón Pima',
    price: 260,
    originalPrice: 380,
    size: 'S',
    condition: 'Nuevo con etiqueta',
    color: 'Rosa Empolvado Vintage',
    colorHex: '#E8CCD7',
    colorSeason: 'Frío (Invierno/Verano)',
    seller: {
      name: 'Sofia G.',
      verified: true,
      rating: 5.0,
      salesCount: 77
    },
    images: [
      'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Blusa femenina en batista de algodón de tacto sedoso con pliegues en pechera, pequeños botones forrados y puños elásticos fruncidos.',
    measurements: 'Busto: 88cm, Largo: 60cm, Manga: 61cm',
    authenticityVerified: true,
    inspectionCertificateId: 'BC-AUTH-7058'
  },
  {
    id: 'bc-59',
    title: 'Cinturón Ancho de Cuero con Hebilla Escultural en Latón',
    brand: 'Atelier Noir',
    category: 'Calzado & Accesorios',
    style: 'Boho / Avant-Garde',
    material: 'Cuero Vegano & Piel',
    price: 190,
    originalPrice: 280,
    size: '85cm (Ajustable de 75 a 90cm)',
    condition: 'Nuevo con etiqueta',
    color: 'Marrón Chocolate Oscuro',
    colorHex: '#3D2314',
    colorSeason: 'Cálido (Otoño/Primavera)',
    seller: {
      name: 'Carlos B.',
      verified: true,
      rating: 5.0,
      salesCount: 68
    },
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Cinturón de 4cm de ancho en cuero vacuno plena flor con hebilla de fundición artística en latón macizo cepillado mate. Enmarca la cintura en vestidos o blazers.',
    measurements: 'Largo total: 100cm, Ancho: 4cm',
    authenticityVerified: true,
    inspectionCertificateId: 'BC-AUTH-7059'
  }
];
