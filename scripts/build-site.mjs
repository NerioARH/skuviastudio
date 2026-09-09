import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const siteUrl = 'https://skuviastudio.com';
const published = '2026-09-08';

const routes = {
  es: {
    home: '/es/',
    listing: '/es/diseno-imagenes-amazon/',
    aplus: '/es/contenido-a-plus-amazon/',
    brandStory: '/es/amazon-brand-story/',
    storefront: '/es/diseno-amazon-storefront/',
    audit: '/es/auditoria-listing-amazon/',
    pricing: '/es/precios/',
    portfolio: '/es/portfolio/',
    blog: '/es/blog/'
  },
  en: {
    home: '/en/',
    listing: '/en/amazon-listing-image-design/',
    aplus: '/en/amazon-a-plus-content-design/',
    brandStory: '/en/amazon-brand-story-design/',
    storefront: '/en/amazon-storefront-design/',
    audit: '/en/amazon-listing-audit/',
    pricing: '/en/pricing/',
    portfolio: '/en/portfolio/',
    blog: '/en/blog/'
  }
};

const ui = {
  es: {
    skip: 'Saltar al contenido',
    announcement: ['Diseño estratégico', 'Especialistas en Amazon', 'Proceso por escrito'],
    nav: { home: 'Inicio', services: 'Servicios', portfolio: 'Portfolio', pricing: 'Precios', blog: 'Recursos', audit: 'Analizar mi listing' },
    explore: 'EXPLORAR',
    contact: 'CONTACTO',
    auditLabel: 'Mini análisis de tu listing',
    auditTitle: 'Envíame tu ASIN y recibe una recomendación visual.',
    auditText: 'Revisaremos tu producto y te responderemos con oportunidades prioritarias, alcance y precio.',
    written: 'Respuesta por escrito',
    noCall: 'Sin llamada obligatoria',
    noCommitment: 'Sin compromiso',
    quote: 'Solicitar cotización',
    portfolio: 'Ver portfolio',
    case: 'Ver caso completo',
    article: 'Leer artículo',
    source: 'Fuentes oficiales',
    published: 'Publicado',
    author: 'Autor',
    rights: 'Todos los derechos reservados.',
    disclaimer: 'Amazon y sus marcas son propiedad de sus respectivos titulares. Skuvia Studio es un estudio independiente.'
  },
  en: {
    skip: 'Skip to content',
    announcement: ['Strategic design', 'Amazon specialists', 'Written-first process'],
    nav: { home: 'Home', services: 'Services', portfolio: 'Portfolio', pricing: 'Pricing', blog: 'Resources', audit: 'Analyze my listing' },
    explore: 'EXPLORE',
    contact: 'CONTACT',
    auditLabel: 'Amazon listing mini audit',
    auditTitle: 'Send your ASIN and receive a visual recommendation.',
    auditText: 'We will review your product and reply with priority opportunities, scope and a quote.',
    written: 'Written response',
    noCall: 'No required call',
    noCommitment: 'No commitment',
    quote: 'Request a quote',
    portfolio: 'View portfolio',
    case: 'View full case study',
    article: 'Read article',
    source: 'Official sources',
    published: 'Published',
    author: 'Author',
    rights: 'All rights reserved.',
    disclaimer: 'Amazon and its trademarks belong to their respective owners. Skuvia Studio is an independent studio.'
  }
};

const services = {
  listing: {
    image: '/assets/project-listing-packages-1400.webp',
    size: [1400, 2488],
    alt: {
      es: 'Secuencia y paquetes de imágenes para un listing de Amazon',
      en: 'Amazon listing image sequence and package overview'
    },
    es: {
      title: 'Diseño de Imágenes para Amazon | Skuvia Studio',
      description: 'Diseño estratégico de Amazon Listing Images: imagen principal, infografías y lifestyle con copy visual, análisis de competidores y lectura mobile-first.',
      label: 'Amazon Listing Images',
      h1: 'Diseño de imágenes para Amazon que comunica valor en segundos.',
      intro: 'Creamos secuencias visuales para listings de Amazon que ayudan al comprador a entender el producto, reconocer beneficios y resolver dudas antes de decidir.',
      problemTitle: 'Cuando las imágenes no tienen una estrategia, el comprador debe hacer demasiado esfuerzo.',
      problems: ['La imagen principal no diferencia el producto en resultados de búsqueda.', 'Las infografías mezclan demasiados mensajes sin jerarquía.', 'Los beneficios no se entienden al ver el listing desde un móvil.', 'La secuencia no responde objeciones ni construye confianza.'],
      decorative: 'Embellece una pieza aislada, pero puede repetir información y dejar preguntas sin responder.',
      strategic: 'Asigna una función a cada imagen: atención, comprensión, beneficio, uso, confianza y decisión.',
      includes: [
        ['Imagen principal', 'Composición limpia diseñada alrededor de las normas aplicables a la categoría.'],
        ['Infografías', 'Beneficios, características, dimensiones y argumentos visuales claros.'],
        ['Imágenes lifestyle', 'Contexto de uso que ayuda a imaginar el producto en la vida real.'],
        ['Copy visual', 'Titulares y textos breves pensados para lectura rápida en móvil.']
      ],
      deliverables: ['Dirección visual', 'Análisis de competidores', 'Estructura de la secuencia', 'Copy para imágenes', 'Archivos JPG o PNG', 'Rondas de ajustes según el paquete'],
      priceTitle: 'Paquetes desde $100',
      priceText: 'Visual Essential incluye imagen principal, tres infografías, una imagen lifestyle y copy. Visual Premium amplía la secuencia y añade análisis de competidores.',
      faqs: [
        ['¿Cuántas imágenes conviene diseñar?', 'Depende del producto y la categoría. La secuencia debe cubrir beneficios, uso, dimensiones, diferenciación y objeciones sin añadir imágenes que no tengan una función clara.'],
        ['¿La imagen principal puede llevar texto?', 'Por regla general, debe mostrar el producto real sobre fondo blanco puro y no incorporar textos, marcos, marcas de agua ni elementos que no estén incluidos. Las normas de cada categoría pueden añadir requisitos.'],
        ['¿Incluye el copy de las imágenes?', 'Sí. Organizamos titulares, beneficios y textos breves para que cada pieza sea clara y escaneable.'],
        ['¿Garantizan una mejora del CTR?', 'No garantizamos porcentajes. El diseño puede mejorar claridad y diferenciación, pero el CTR también depende de precio, reseñas, posicionamiento, publicidad y competencia.']
      ]
    },
    en: {
      title: 'Amazon Listing Image Design Services | Skuvia Studio',
      description: 'Strategic Amazon listing image design: main images, infographics and lifestyle visuals supported by visual copy, competitor research and mobile-first layouts.',
      label: 'Amazon Listing Images',
      h1: 'Amazon listing images that communicate value in seconds.',
      intro: 'We build Amazon image sequences that help shoppers understand the product, recognize benefits and answer key questions before deciding.',
      problemTitle: 'When listing images lack a strategy, shoppers have to work too hard.',
      problems: ['The main image does not distinguish the product in search results.', 'Infographics combine too many messages without hierarchy.', 'Benefits become difficult to read on mobile.', 'The sequence leaves important objections unanswered.'],
      decorative: 'Makes one image look polished while still repeating information or leaving questions unanswered.',
      strategic: 'Gives every image a role: attention, understanding, benefit, use, trust and decision.',
      includes: [
        ['Main image', 'A clean composition designed around requirements that apply to the category.'],
        ['Infographics', 'Benefits, features, dimensions and clear visual arguments.'],
        ['Lifestyle images', 'Use context that helps shoppers picture the product in real life.'],
        ['Visual copy', 'Headlines and concise supporting text designed for fast mobile reading.']
      ],
      deliverables: ['Visual direction', 'Competitor research', 'Image sequence plan', 'Visual copy', 'JPG or PNG files', 'Revision rounds based on the package'],
      priceTitle: 'Packages from $100',
      priceText: 'Visual Essential includes a main image, three infographics, one lifestyle image and copy. Visual Premium expands the sequence and includes competitor analysis.',
      faqs: [
        ['How many listing images should I create?', 'It depends on the product and category. The sequence should cover benefits, use, dimensions, differentiation and objections without adding images that have no clear purpose.'],
        ['Can the main image contain text?', 'As a general rule, it must show the actual product on a pure white background and should not contain text, borders, watermarks or accessories that are not included. Category rules may add requirements.'],
        ['Is image copy included?', 'Yes. We organize headlines, benefits and concise supporting text so every image remains clear and easy to scan.'],
        ['Do you guarantee a higher CTR?', 'No percentage can be guaranteed. Visual design can improve clarity and differentiation, but CTR also depends on pricing, reviews, ranking, advertising and competition.']
      ]
    }
  },
  aplus: {
    image: '/assets/project-a-plus-content-1400.webp',
    size: [1400, 2488],
    alt: { es: 'Composición vertical con varios módulos de Amazon A+ Content', en: 'Vertical composition showing multiple Amazon A+ Content modules' },
    es: {
      title: 'Diseño de Contenido A+ para Amazon | Skuvia Studio',
      description: 'Diseño de Amazon A+ Content y EBC con módulos claros, storytelling de producto, comparación, lectura móvil y coherencia visual de marca.',
      label: 'Amazon A+ Content / EBC',
      h1: 'Contenido A+ que convierte información en una experiencia de marca.',
      intro: 'Diseñamos estructuras de A+ Content para explicar mejor el producto, ampliar su propuesta de valor y construir una página de detalle coherente con la marca.',
      problemTitle: 'A+ Content no es una colección de banners; es una secuencia de información.',
      problems: ['Los módulos repiten las imágenes del listing.', 'El texto incrustado queda demasiado pequeño en móvil.', 'Beneficios, características y objeciones no tienen jerarquía.', 'La identidad visual cambia entre módulos.'],
      decorative: 'Ocupa espacio con banners atractivos sin ayudar a entender por qué elegir el producto.',
      strategic: 'Distribuye argumentos entre módulos, combina texto accesible con imágenes y guía una decisión más informada.',
      includes: [
        ['Arquitectura de módulos', 'Selección y orden según la información y el catálogo disponibles.'],
        ['Storytelling de producto', 'Narrativa que conecta problema, beneficios, uso, confianza y diferenciación.'],
        ['Diseño mobile-first', 'Jerarquías que siguen siendo legibles en pantallas pequeñas.'],
        ['Comparación y cross-sell', 'Módulos que facilitan descubrir alternativas del catálogo cuando corresponde.']
      ],
      deliverables: ['Mapa de módulos', 'Copy visual y texto recomendado', 'Diseños en medidas acordadas', 'Exportaciones listas para cargar', 'Adaptación de marca', 'Ajustes según alcance'],
      priceTitle: 'Incluido en Brand Experience',
      priceText: 'Brand Experience parte de $400 e incluye Listing Premium, A+ Content y Brand Story. El A+ también puede cotizarse por separado según módulos.',
      faqs: [
        ['¿Qué diferencia existe entre A+ estándar y Premium A+?', 'Amazon indica que Basic A+ admite hasta cinco módulos; Premium A+ amplía el espacio y puede incorporar carruseles, video y hotspots, sujeto a elegibilidad.'],
        ['¿Necesito Amazon Brand Registry?', 'Amazon reserva A+ Content para representantes y revendedores con los roles correspondientes de una marca, además de determinados programas administrados.'],
        ['¿Pueden evitar incrustar todo el texto en imágenes?', 'Sí. Siempre que el módulo lo permita, recomendamos texto nativo para mejorar legibilidad, accesibilidad y adaptación.'],
        ['¿El A+ garantiza más ventas?', 'No. Puede ayudar a explicar el producto, pero el resultado también depende de oferta, tráfico, reseñas, precio y otros factores.']
      ]
    },
    en: {
      title: 'Amazon A+ Content Design Agency | Skuvia Studio',
      description: 'Amazon A+ Content and EBC design with clear modules, product storytelling, comparisons, mobile readability and consistent brand direction.',
      label: 'Amazon A+ Content / EBC',
      h1: 'A+ Content that turns product information into a branded experience.',
      intro: 'We design A+ Content systems that explain the product, expand its value proposition and create a detail-page experience consistent with the brand.',
      problemTitle: 'A+ Content is not a collection of banners. It is an information sequence.',
      problems: ['Modules repeat the same listing claims.', 'Embedded text becomes too small on mobile.', 'Benefits, features and objections lack hierarchy.', 'The visual identity changes between modules.'],
      decorative: 'Fills space with polished banners without helping shoppers understand why the product is the right choice.',
      strategic: 'Distributes arguments across modules, combines accessible text with imagery and supports a more informed decision.',
      includes: [
        ['Module architecture', 'Module selection and order based on available information and catalog.'],
        ['Product storytelling', 'A narrative connecting problem, benefits, use, trust and differentiation.'],
        ['Mobile-first design', 'Hierarchy that remains readable on smaller screens.'],
        ['Comparison and cross-sell', 'Modules that support relevant catalog discovery.']
      ],
      deliverables: ['Module map', 'Visual copy and recommended text', 'Designs at agreed dimensions', 'Upload-ready exports', 'Brand adaptation', 'Revisions based on scope'],
      priceTitle: 'Included in Brand Experience',
      priceText: 'Brand Experience starts at $400 and includes Listing Premium, A+ Content and Brand Story. A+ can also be quoted separately by module scope.',
      faqs: [
        ['What is the difference between Basic and Premium A+?', 'Amazon states that Basic A+ can use up to five modules, while Premium A+ offers more space and can include carousels, video and hotspots, subject to eligibility.'],
        ['Do I need Amazon Brand Registry?', 'Amazon makes A+ Content available to brand representatives and resellers with the appropriate roles, as well as certain managed programs.'],
        ['Can you avoid embedding all text in images?', 'Yes. Whenever a module supports it, native text is preferable for readability, accessibility and adaptation.'],
        ['Does A+ Content guarantee more sales?', 'No. It can help explain the product, but outcomes also depend on the offer, traffic, reviews, price and other factors.']
      ]
    }
  },
  brandStory: {
    image: '/assets/project-brand-system-1400.webp',
    size: [1400, 991],
    alt: { es: 'Sistema visual de Skuvia Studio aplicado a varios puntos de contacto', en: 'Skuvia Studio visual system applied across multiple touchpoints' },
    es: {
      title: 'Diseño de Amazon Brand Story | Skuvia Studio',
      description: 'Diseño de Amazon Brand Story para comunicar origen, valores y catálogo con narrativa visual coherente y oportunidades de venta cruzada.',
      label: 'Amazon Brand Story',
      h1: 'Una Brand Story que convierte productos sueltos en una marca reconocible.',
      intro: 'Diseñamos Amazon Brand Story para explicar quién está detrás del producto, presentar valores reales y conectar el catálogo mediante una narrativa consistente.',
      problemTitle: 'Una marca difícil de recordar compite únicamente por producto, precio y reseñas.',
      problems: ['La historia se limita a una frase genérica.', 'Las tarjetas no conectan la marca con sus productos.', 'El diseño no coincide con listing o A+ Content.', 'No se aprovechan enlaces relevantes cuando están disponibles.'],
      decorative: 'Repite logotipo y eslóganes sin explicar una diferencia relevante.',
      strategic: 'Organiza origen, propósito, valores y catálogo para reforzar confianza y facilitar descubrimiento.',
      includes: [
        ['Narrativa de marca', 'Mensajes basados exclusivamente en información verificable del cliente.'],
        ['Dirección visual', 'Color, composición, tipografía e imágenes coherentes con la experiencia.'],
        ['Arquitectura de tarjetas', 'Módulos para marca, catálogo, valores o enlaces relevantes.'],
        ['Copy visual', 'Textos breves sin afirmaciones inventadas ni promesas no demostrables.']
      ],
      deliverables: ['Mapa narrativo', 'Copy recomendado', 'Diseño de tarjetas y fondo', 'Exportaciones listas para Amazon', 'Adaptación visual', 'Ajustes acordados'],
      priceTitle: 'Incluido en Brand Experience',
      priceText: 'Brand Experience parte de $400 e incluye Listing Premium, A+ Content y Brand Story.',
      faqs: [
        ['¿Brand Story sustituye al A+ Content?', 'No. Amazon la presenta como complemento: Brand Story se centra en marca y catálogo; A+ profundiza en el producto.'],
        ['¿Puede enlazar a otros productos?', 'Según las funciones disponibles, puede destacar líneas de producto y conectar con páginas de producto o la Store.'],
        ['¿Es necesario tener una historia larga?', 'No. La información específica y verificable importa más que la longitud.'],
        ['¿Pueden escribir la historia por mí?', 'Podemos estructurar el copy a partir de información real. No inventamos fechas, certificaciones ni afirmaciones.']
      ]
    },
    en: {
      title: 'Amazon Brand Story Design | Skuvia Studio',
      description: 'Amazon Brand Story design that communicates origin, values and catalog through consistent storytelling and relevant cross-selling opportunities.',
      label: 'Amazon Brand Story',
      h1: 'A Brand Story that turns separate products into a recognizable brand.',
      intro: 'We design Amazon Brand Story content that explains who is behind the product, communicates real values and connects the catalog through consistent storytelling.',
      problemTitle: 'A forgettable brand competes only through the product, price and reviews.',
      problems: ['The story relies on a generic slogan.', 'Cards fail to connect the brand with its products.', 'The design does not match listing or A+ Content.', 'Relevant links are not used with purpose.'],
      decorative: 'Repeats the logo and slogans without communicating a meaningful difference.',
      strategic: 'Organizes origin, purpose, values and catalog to build trust and support discovery.',
      includes: [
        ['Brand narrative', 'Messages based only on verifiable information supplied by the client.'],
        ['Visual direction', 'Color, composition, type and imagery aligned with the experience.'],
        ['Card architecture', 'Modules organized around brand, catalog, values or relevant links.'],
        ['Visual copy', 'Concise text without invented claims or unsupported promises.']
      ],
      deliverables: ['Narrative map', 'Recommended copy', 'Card and background design', 'Amazon-ready exports', 'Visual adaptation', 'Agreed revisions'],
      priceTitle: 'Included in Brand Experience',
      priceText: 'Brand Experience starts at $400 and includes Listing Premium, A+ Content and Brand Story.',
      faqs: [
        ['Does Brand Story replace A+ Content?', 'No. Amazon presents it as a complement: Brand Story focuses on brand and catalog while A+ explores the product.'],
        ['Can it link to other products?', 'Depending on available features, it can highlight product lines and connect to product pages or the Store.'],
        ['Do I need a long founder story?', 'No. Specific and verifiable information matters more than length.'],
        ['Can you write the story for me?', 'We can structure copy from real information. We do not invent dates, certifications or claims.']
      ]
    }
  },
  storefront: {
    image: '/assets/hero-amazon-design-1600.webp',
    size: [1440, 1019],
    alt: { es: 'Presentación de Skuvia Studio con diseño web, móvil y recursos de marca', en: 'Skuvia Studio presentation with website, mobile and brand assets' },
    es: {
      title: 'Diseño de Amazon Storefront | Skuvia Studio',
      description: 'Diseño estratégico de Amazon Storefront: arquitectura de páginas, navegación, tiles, dirección visual y adaptación móvil.',
      label: 'Amazon Storefront',
      h1: 'Una Amazon Storefront que organiza el catálogo y revela el universo de la marca.',
      intro: 'Diseñamos arquitectura y recursos visuales de Brand Stores para facilitar el descubrimiento de productos y mantener coherencia en escritorio y móvil.',
      problemTitle: 'Una Store sin arquitectura puede convertirse en un catálogo difícil de recorrer.',
      problems: ['El inicio no deja claro qué vende la marca.', 'La navegación usa categorías que el comprador no entiende.', 'Los tiles no indican adónde llevan.', 'Las imágenes importantes se cortan al adaptarse a móvil.'],
      decorative: 'Encadena banners sin jerarquía clara ni rutas de navegación útiles.',
      strategic: 'Organiza páginas y tiles según cómo el cliente descubre categorías, compara y avanza hacia un ASIN.',
      includes: [
        ['Arquitectura de páginas', 'Inicio, categorías y rutas adaptadas al catálogo.'],
        ['Wireframe de contenido', 'Orden de secciones, tiles, textos y llamadas a la acción.'],
        ['Dirección visual', 'Hero, imágenes de categoría, banners y componentes coherentes.'],
        ['Adaptación móvil', 'Composición con zonas seguras para evitar recortes problemáticos.']
      ],
      deliverables: ['Mapa de navegación', 'Wireframes', 'Copy visual', 'Diseño de tiles', 'Versiones acordadas', 'Guía de carga'],
      priceTitle: 'Cotización según catálogo',
      priceText: 'El alcance depende del número de páginas, categorías, tiles y versiones móviles. La propuesta se envía por escrito.',
      faqs: [
        ['¿Amazon Storefront y Brand Store son lo mismo?', 'Amazon utiliza Brand Store o Store para la experiencia multipágina de marca dentro de Amazon.'],
        ['¿Diseñan también la navegación?', 'Sí. Definimos una arquitectura que ayuda a descubrir productos y evita páginas sin salida.'],
        ['¿Incluye versiones para móvil?', 'El alcance puede incluir creatividades móviles. Amazon recomienda zonas seguras porque algunos héroes pueden recortarse.'],
        ['¿Publican la Store en mi cuenta?', 'El servicio principal cubre estrategia y diseño. La implementación puede definirse según acceso y necesidades.']
      ]
    },
    en: {
      title: 'Amazon Storefront Design Services | Skuvia Studio',
      description: 'Strategic Amazon Storefront design: page architecture, navigation, tiles, visual direction and mobile adaptations for branded catalogs.',
      label: 'Amazon Storefront',
      h1: 'An Amazon Storefront that organizes the catalog and reveals the full brand experience.',
      intro: 'We design Brand Store architecture and visual assets that support product discovery while keeping the experience consistent across desktop and mobile.',
      problemTitle: 'Without clear architecture, a Store can become a catalog that is difficult to navigate.',
      problems: ['The homepage does not make the offer clear.', 'Navigation uses categories shoppers may not understand.', 'Tiles do not make destinations obvious.', 'Important visual elements are cropped on mobile.'],
      decorative: 'Stacks banners without a useful hierarchy or clear routes through the catalog.',
      strategic: 'Organizes pages and tiles around how shoppers discover categories, compare and move toward an ASIN.',
      includes: [
        ['Page architecture', 'Home, categories and discovery routes adapted to the catalog.'],
        ['Content wireframes', 'Order of sections, tiles, copy and calls to action.'],
        ['Visual direction', 'Hero images, category creative and consistent components.'],
        ['Mobile adaptation', 'Safe-area compositions that avoid problematic responsive crops.']
      ],
      deliverables: ['Navigation map', 'Wireframes', 'Visual copy', 'Tile design', 'Agreed versions', 'Upload guide'],
      priceTitle: 'Quoted by catalog scope',
      priceText: 'Scope depends on pages, categories, tiles and mobile versions. The proposal is sent in writing.',
      faqs: [
        ['Are Amazon Storefront and Brand Store the same?', 'Amazon uses Brand Store or Store for a branded multipage experience within Amazon.'],
        ['Do you design the navigation too?', 'Yes. We define architecture that supports discovery and avoids dead ends.'],
        ['Are mobile versions included?', 'The scope can include custom mobile creative. Amazon recommends safe areas because some hero images may be cropped.'],
        ['Will you publish the Store in my account?', 'The core service covers strategy and design. Implementation can be defined based on access and needs.']
      ]
    }
  }
};

const packages = {
  es: [
    { name: 'Visual Essential', label: 'STARTER', price: '$100', description: 'Para mejorar un listing que ya cuenta con fotografía y necesita comunicar mejor.', items: ['1 imagen principal optimizada', '3 imágenes infográficas', '1 imagen lifestyle', 'Copy para imágenes', '2 rondas de ajustes'], service: 'Listing Essential' },
    { name: 'Visual Premium', label: 'MÁS ELEGIDO', price: '$125', description: 'Un set completo para elevar percepción, claridad y potencial de conversión.', items: ['1 imagen principal optimizada', '4 imágenes infográficas', '2 imágenes lifestyle', 'Estrategia y copy visual', 'Análisis de competidores', '3 rondas de ajustes'], service: 'Listing Premium', featured: true },
    { name: 'Brand Experience', label: 'SCALE', price: '$400', description: 'Una experiencia conectada para listings que quieren escalar con coherencia.', items: ['Todo Listing Premium', 'A+ Content completo', 'Amazon Brand Story', 'Adaptación a identidad', 'Dirección estratégica global', 'Soporte prioritario'], service: 'Brand Experience' }
  ],
  en: [
    { name: 'Visual Essential', label: 'STARTER', price: '$100', description: 'For a listing that already has photography and needs to communicate more clearly.', items: ['1 optimized main image', '3 infographic images', '1 lifestyle image', 'Visual copy', '2 revision rounds'], service: 'Listing Essential' },
    { name: 'Visual Premium', label: 'MOST POPULAR', price: '$125', description: 'A complete set designed to elevate perception, clarity and conversion potential.', items: ['1 optimized main image', '4 infographic images', '2 lifestyle images', 'Strategy and visual copy', 'Competitor analysis', '3 revision rounds'], service: 'Listing Premium', featured: true },
    { name: 'Brand Experience', label: 'SCALE', price: '$400', description: 'A connected brand experience for listings that need to scale consistently.', items: ['Everything in Listing Premium', 'Complete A+ Content', 'Amazon Brand Story', 'Brand adaptation', 'Global visual direction', 'Priority support'], service: 'Brand Experience' }
  ]
};

const reviews = [
  ['flowbundantmama', 'Estados Unidos', 'United States', '5/5', 'Señala que sus indicaciones fueron comprendidas y que las imágenes y el A+ Content quedaron alineados con su visión.', 'Says the brief was understood and the listing images and A+ Content matched the intended vision.'],
  ['thesil22', 'España', 'Spain', '5/5', 'Valora la creatividad, la comunicación constante y la rapidez de respuesta durante el proyecto.', 'Values the creativity, consistent communication and quick responses throughout the project.'],
  ['gptradex', 'España', 'Spain', '5/5', 'Cliente recurrente que vuelve a valorar positivamente el trabajo realizado.', 'A returning client who once again rates the completed work positively.'],
  ['anto_perez27', 'Suiza', 'Switzerland', '5/5', 'Tras alinear la visión de la marca, destaca que trabajar juntos fue fácil y recomienda la colaboración.', 'After aligning on the brand vision, says the collaboration became easy and recommends working together.'],
  ['go_angel09', 'Estados Unidos', 'United States', '5/5', 'Destaca que el trabajo superó sus expectativas por su profesionalidad, creatividad y calidad.', 'Says the work exceeded expectations through professionalism, creativity and quality.'],
  ['desidriguez', 'Panamá', 'Panama', '5/5', 'Describe una colaboración rápida, precisa y de excelente calidad, con comprensión clara de sus necesidades.', 'Describes a fast, precise and high-quality collaboration with a clear understanding of the brief.'],
  ['jordicastellcol', 'España', 'Spain', '5/5', 'Destaca la creatividad y la capacidad de construir imágenes atractivas incluso para un producto complejo.', 'Highlights the creativity and ability to build compelling visuals even for a complex product.'],
  ['nisemm', 'Estados Unidos', 'United States', '5/5', 'Valora la profesionalidad, la atención al detalle y la disposición para responder sus preguntas.', 'Values the professionalism, attention to detail and willingness to answer every question.'],
  ['argondu', 'España', 'Spain', '4.7/5', 'Lo describe como un excelente profesional y expresa su intención de volver a trabajar con él.', 'Describes him as an excellent professional and intends to work with him again.']
];

const portfolio = {
  'amazon-a-plus-content': {
    image: '/assets/project-a-plus-content-1400.webp',
    images: ['/assets/project-a-plus-content-1400.webp'],
    es: { category: 'Amazon A+ Content', title: 'A+ Content que explica y convierte', summary: 'Una experiencia modular para presentar beneficios, resolver objeciones y elevar la percepción de marca.', challenge: 'La información técnica debía transformarse en una estructura fácil de recorrer sin perder coherencia visual ni saturar cada módulo.', objective: 'Crear una narrativa que organizara beneficios, uso y diferenciación para apoyar una decisión más informada.', sequence: ['Apertura y propuesta de valor', 'Beneficios principales', 'Detalles y características', 'Uso y contexto', 'Cierre y confianza'], alt: 'Composición vertical con módulos de Amazon A+ Content' },
    en: { category: 'Amazon A+ Content', title: 'A+ Content that explains and converts', summary: 'A modular experience built to present benefits, answer objections and elevate brand perception.', challenge: 'Technical information needed to become an easy-to-follow structure without losing consistency or overloading each module.', objective: 'Create a narrative organizing benefits, use and differentiation to support a more informed decision.', sequence: ['Opening value proposition', 'Primary benefits', 'Details and features', 'Use context', 'Trust-focused closing'], alt: 'Vertical composition showing Amazon A+ Content modules' }
  },
  'amazon-listing-visuals': {
    image: '/assets/project-listing-packages-1400.webp',
    images: ['/assets/project-listing-packages-1400.webp', '/assets/hero-amazon-design-1600.webp'],
    es: { category: 'Amazon Listing Images', title: 'Sistema visual para un listing premium', summary: 'Imagen principal, infografías y lifestyle organizadas para captar atención y comunicar valor.', challenge: 'La secuencia necesitaba presentar el producto, explicar beneficios y responder preguntas sin repetir el mismo mensaje.', objective: 'Asignar una función concreta a cada imagen y mantener dirección visual consistente.', sequence: ['Imagen principal', 'Beneficio prioritario', 'Infografías', 'Escena lifestyle', 'Dimensiones y uso', 'Confianza y cierre'], alt: 'Diseño de secuencia visual para un listing de Amazon' },
    en: { category: 'Amazon Listing Images', title: 'Visual system for a premium listing', summary: 'Main image, infographics and lifestyle visuals organized to earn attention and communicate value.', challenge: 'The sequence needed to introduce the product, explain benefits and answer questions without repeating the same message.', objective: 'Give every image a clear role while maintaining consistent art direction.', sequence: ['Main image', 'Priority benefit', 'Infographics', 'Lifestyle context', 'Dimensions and use', 'Trust-focused closing'], alt: 'Visual sequence design for an Amazon listing' }
  },
  'skuvia-brand-system': {
    image: '/assets/project-brand-system-1400.webp',
    images: ['/assets/project-brand-system-1400.webp', '/assets/project-brand-guide-1200.webp', '/assets/project-brand-guide2-1200.webp'],
    es: { category: 'Proyecto propio · Dirección de marca', title: 'Una identidad coherente en cada punto de contacto', summary: 'El sistema propio de Skuvia Studio aplicado a web, propuestas, redes y ecommerce.', challenge: 'El estudio necesitaba un lenguaje flexible y reconocible en formatos muy distintos.', objective: 'Construir un sistema modular de tipografía, color, iconografía y acentos con carácter premium.', sequence: ['Identidad principal', 'Paleta y tipografía', 'Sistema de iconos', 'Componentes web', 'Aplicaciones sociales', 'Material comercial'], alt: 'Sistema de identidad visual de Skuvia Studio' },
    en: { category: 'In-house project · Brand direction', title: 'A consistent identity at every touchpoint', summary: 'Skuvia Studio’s own system applied to web, proposals, social media and ecommerce.', challenge: 'The studio needed a flexible language that remained recognizable across different formats.', objective: 'Build a modular system of typography, color, iconography and accents with a premium character.', sequence: ['Primary identity', 'Color and typography', 'Icon system', 'Web components', 'Social applications', 'Commercial material'], alt: 'Skuvia Studio visual identity system' }
  }
};

const caseRoutes = {
  es: { 'amazon-a-plus-content': '/es/portfolio/contenido-a-plus-amazon/', 'amazon-listing-visuals': '/es/portfolio/diseno-listing-amazon/', 'skuvia-brand-system': '/es/portfolio/sistema-visual-skuvia/' },
  en: { 'amazon-a-plus-content': '/en/portfolio/amazon-a-plus-content/', 'amazon-listing-visuals': '/en/portfolio/amazon-listing-image-system/', 'skuvia-brand-system': '/en/portfolio/skuvia-visual-system/' }
};

const articles = [
  {
    lang: 'es',
    slug: 'cuantas-imagenes-debe-tener-listing-amazon',
    title: 'Cuántas imágenes debe tener un listing de Amazon',
    seoTitle: 'Cuántas Imágenes Debe Tener un Listing de Amazon | Skuvia',
    description: 'Descubre cuántas imágenes conviene preparar para un listing de Amazon y cómo asignar una función estratégica a cada espacio disponible.',
    intro: 'La pregunta no se resuelve solo con un número. Un listing necesita suficientes imágenes para presentar el producto, explicar por qué importa y reducir las dudas que frenan la compra.',
    image: '/assets/project-listing-packages-1400.webp',
    imageAlt: 'Ejemplo de secuencia de imágenes para un listing de Amazon',
    sections: [
      ['La respuesta corta', `<p>Amazon permite una imagen principal y varias imágenes secundarias, pero la cantidad visible puede variar por categoría, dispositivo y experiencia de compra. En la práctica, conviene planificar una secuencia completa y priorizar las piezas esenciales para que el mensaje funcione incluso cuando no todas aparezcan de inmediato.</p><p>Una secuencia sólida suele cubrir presentación, beneficios, escala, uso, detalles y confianza. No se trata de llenar espacios: cada imagen debe resolver una pregunta distinta.</p>`],
      ['Qué función cumple cada imagen', `<ol><li><strong>Imagen principal:</strong> identifica el producto con claridad y cumple las políticas aplicables.</li><li><strong>Beneficio prioritario:</strong> traduce la característica más importante a una ventaja comprensible.</li><li><strong>Uso o lifestyle:</strong> ayuda a imaginar el producto en contexto.</li><li><strong>Infografía:</strong> explica materiales, compatibilidad, funciones o diferencias.</li><li><strong>Escala y dimensiones:</strong> reduce expectativas incorrectas.</li><li><strong>Objeciones:</strong> responde dudas frecuentes antes de que el usuario abandone.</li><li><strong>Cierre:</strong> refuerza calidad, contenido del paquete o propuesta de marca.</li></ol>`],
      ['Cómo decidir si necesitas menos o más', `<p>Un producto sencillo puede explicarse con una secuencia breve; uno técnico, compatible con varios dispositivos o con instrucciones de uso necesita más contexto. Revisa reseñas, preguntas de clientes y listings competidores para detectar qué información debe mostrarse visualmente.</p><p>También importa la lectura en móvil. Si una pieza intenta explicar cinco beneficios con texto pequeño, no está aprovechando bien el espacio aunque el listing tenga muchas imágenes.</p>`],
      ['Errores frecuentes', `<ul><li>Repetir el mismo beneficio con composiciones distintas.</li><li>Usar todas las imágenes como anuncios sin explicar el producto.</li><li>Dejar las dimensiones para el final cuando son decisivas.</li><li>Diseñar solo para escritorio.</li><li>Confundir cantidad con cobertura estratégica.</li></ul>`],
      ['Una secuencia pensada para decidir', `<p>Antes de diseñar, escribe en una línea la pregunta que responderá cada imagen. Si dos piezas responden lo mismo, una de ellas puede transformarse para cubrir una objeción pendiente. Nuestro servicio de <a href="/es/diseno-imagenes-amazon/">diseño de imágenes para Amazon</a> parte de esa arquitectura y después construye la dirección visual.</p>`]
    ],
    sources: [['Amazon Seller Forums: requisitos y recomendaciones de imágenes', 'https://sellercentral.amazon.com/seller-forums/discussions/t/4b3c4c39-6f8c-4312-aa0e-99982eb8f5e1/']]
  },
  {
    lang: 'es',
    slug: 'requisitos-imagen-principal-amazon',
    title: 'Requisitos de la imagen principal de Amazon',
    seoTitle: 'Requisitos de la Imagen Principal de Amazon | Guía Visual',
    description: 'Guía práctica sobre fondo, encuadre, resolución y contenido de la imagen principal de Amazon, con criterios para combinar cumplimiento y claridad.',
    intro: 'La imagen principal es la primera prueba de claridad del listing. Debe representar con precisión lo que el cliente recibirá y respetar las normas de la categoría.',
    image: '/assets/project-listing-packages-1400.webp',
    imageAlt: 'Diseño de imágenes principales y secundarias para Amazon',
    sections: [
      ['Principios básicos de cumplimiento', `<p>Como regla general, la imagen principal debe mostrar el producto real sobre fondo blanco puro, sin texto promocional, bordes, marcas de agua ni accesorios que no estén incluidos. El producto tiene que verse completo, bien iluminado y ocupar una proporción útil del encuadre.</p><p>Amazon puede aplicar requisitos adicionales según la categoría. Antes de producir la fotografía o el render final, revisa siempre la guía vigente de tu categoría en Seller Central.</p>`],
      ['Resolución y encuadre', `<p>Trabaja con un archivo suficientemente grande para habilitar el zoom y conservar detalle. Amazon admite formatos comunes como JPEG, TIFF, PNG y GIF no animado; para publicación suele ser práctico preparar un JPEG en espacio de color compatible y revisar que no haya compresión visible.</p><p>El encuadre debe dejar respirar el producto sin hacerlo parecer pequeño. Si vendes un paquete, muestra exactamente las unidades incluidas y evita incorporar elementos que puedan interpretarse como parte de la compra.</p>`],
      ['Cumplimiento no significa una imagen genérica', `<p>Dos imágenes pueden cumplir las reglas y producir una impresión muy distinta. El ángulo, la iluminación, la limpieza del recorte, la escala visual y la fidelidad del color influyen en la capacidad de detener el scroll. La estrategia consiste en destacar atributos reales sin añadir claims o recursos prohibidos.</p><p>En búsquedas saturadas, conviene comparar miniaturas a tamaño móvil. Busca una silueta reconocible, contraste interno claro y una composición que no dependa de detalles minúsculos.</p>`],
      ['Lista de comprobación antes de subirla', `<ul><li>El archivo representa exactamente el producto y su cantidad.</li><li>El fondo y los elementos cumplen la regla de la categoría.</li><li>No hay texto, insignias, marcos ni gráficos no permitidos.</li><li>La forma se entiende en miniatura.</li><li>El color coincide con el producto.</li><li>La resolución conserva detalle al ampliar.</li></ul>`],
      ['Qué hacer si la imagen recibe una incidencia', `<p>No intentes ocultar el problema con otra versión casi idéntica. Compara la notificación con la guía aplicable, revisa el archivo fuente y corrige la causa. Si quieres evaluar claridad y jerarquía además del cumplimiento, solicita una <a href="/es/auditoria-listing-amazon/">auditoría visual del listing</a>.</p>`]
    ],
    sources: [['Amazon Seller Forums: product image requirements', 'https://sellercentral.amazon.com/seller-forums/discussions/t/13af96ea-6b07-4bf9-8dbe-a13292c2e3b1']]
  },
  {
    lang: 'es',
    slug: 'contenido-a-plus-amazon-medidas-modulos-ejemplos',
    title: 'Contenido A+ de Amazon: medidas, módulos y ejemplos',
    seoTitle: 'Contenido A+ de Amazon: Medidas, Módulos y Estrategia',
    description: 'Conoce cómo planificar módulos de Amazon A+ Content, qué medidas considerar y cómo crear una historia visual coherente para tu producto.',
    intro: 'El A+ Content amplía la página de detalle con módulos visuales. Su valor no está en añadir banners: está en ordenar información para comparar, comprender y confiar.',
    image: '/assets/project-a-plus-content-1400.webp',
    imageAlt: 'Ejemplo completo de módulos de Amazon A+ Content',
    sections: [
      ['Qué es A+ Content', `<p>A+ Content permite a marcas elegibles incorporar módulos con imágenes, texto, comparaciones y otros formatos en la página de producto. Basic A+ y Premium A+ ofrecen posibilidades distintas, y la disponibilidad depende de la cuenta y de los requisitos de Amazon.</p><p>El contenido debe complementar las imágenes del listing. Si ambas zonas repiten los mismos titulares, se pierde la oportunidad de profundizar en uso, materiales, historia o comparación.</p>`],
      ['Medidas y áreas seguras', `<p>Amazon indica tamaños de referencia que dependen del módulo. En sus recursos actuales, Basic A+ trabaja con recursos de hasta 970 × 300 px en determinados módulos, mientras Premium A+ contempla formatos más amplios, como 1464 × 600 px. La interfaz muestra la especificación exacta al seleccionar cada módulo.</p><p>Diseña considerando recortes y lectura en móvil. Mantén texto importante alejado de bordes, comprueba la legibilidad a escala reducida y no conviertas párrafos completos en una imagen.</p>`],
      ['Cómo organizar los módulos', `<ol><li>Abre con una propuesta de valor clara.</li><li>Desarrolla beneficios con evidencia visual del producto.</li><li>Explica materiales, funcionamiento o compatibilidad.</li><li>Muestra situaciones de uso relevantes.</li><li>Responde objeciones que no caben en la galería superior.</li><li>Cierra con comparación o ecosistema de marca cuando sea útil.</li></ol>`],
      ['Ejemplos de lógica visual', `<p>Un organizador puede dedicar un módulo a capacidad, otro a medidas y otro a escenarios de uso. Un accesorio electrónico puede priorizar compatibilidad, controles y contenido del paquete. Un producto infantil necesita jerarquía simple, tono adecuado y una lectura comprensible para quien decide la compra.</p><p>Observa en nuestro <a href="/es/portfolio/contenido-a-plus-amazon/">caso de A+ Content</a> cómo una composición vertical asigna una función a cada bloque sin depender de resultados inventados.</p>`],
      ['Errores que reducen claridad', `<ul><li>Usar una sola pieza larga sin adaptar a módulos.</li><li>Texto demasiado pequeño dentro de las imágenes.</li><li>Claims no respaldados o lenguaje promocional incompatible con las políticas.</li><li>Repetir la galería en lugar de ampliar el argumento.</li><li>Ignorar la versión móvil.</li></ul><p>Si necesitas una estructura completa, revisa el servicio de <a href="/es/contenido-a-plus-amazon/">diseño de Contenido A+ para Amazon</a>.</p>`]
    ],
    sources: [['Amazon Seller Central: A+ Content', 'https://sellercentral.amazon.com/help/hub/reference/external/G202102930?path=66&route=product%2Fcategory']]
  },
  {
    lang: 'es',
    slug: 'como-mejorar-ctr-imagen-principal-amazon',
    title: 'Cómo mejorar el CTR de la imagen principal en Amazon',
    seoTitle: 'Cómo Mejorar el CTR de la Imagen Principal en Amazon',
    description: 'Criterios visuales para hacer una imagen principal más clara y competitiva en resultados de búsqueda, sin prometer resultados ni incumplir normas.',
    intro: 'La imagen principal compite en segundos. Mejorarla significa reducir ambigüedad, presentar el producto con precisión y aprovechar las decisiones visuales permitidas por Amazon.',
    image: '/assets/project-listing-packages-1400.webp',
    imageAlt: 'Comparación visual de recursos para imágenes de listing de Amazon',
    sections: [
      ['Qué puede influir en el clic', `<p>El CTR no depende únicamente de la imagen: precio, reseñas, título, entrega, competencia y relevancia también participan. Por eso ningún diseño responsable puede garantizar un aumento. La imagen sí puede mejorar la primera comprensión del producto y evitar que una miniatura confusa pierda atención.</p>`],
      ['Evalúa la miniatura, no solo el archivo grande', `<p>Reduce la imagen al tamaño aproximado de un resultado móvil. ¿Se reconoce el producto? ¿La variante y cantidad son evidentes? ¿El ángulo muestra la característica que lo diferencia? Una fotografía impecable a pantalla completa puede quedar débil al competir en una cuadrícula.</p>`],
      ['Optimiza dentro de las reglas', `<ul><li>Elige un ángulo que explique forma y profundidad.</li><li>Conserva bordes limpios y color fiel.</li><li>Equilibra ocupación del encuadre y espacio de seguridad.</li><li>Representa correctamente unidades y accesorios incluidos.</li><li>Evita texto, badges y recursos que no estén permitidos.</li></ul><p>Compara opciones antes de publicar, pero valida siempre las políticas de la categoría.</p>`],
      ['Aprende de la competencia sin copiarla', `<p>Reúne las miniaturas principales de la primera página para identificar patrones: encuadres, fondos internos del producto, color dominante, cantidad y accesorios. El objetivo no es imitar una composición, sino descubrir qué señales se confunden y qué atributo real puede mostrarse con mayor claridad.</p>`],
      ['Mide cambios con contexto', `<p>Documenta la fecha del cambio y evita modificar al mismo tiempo título, precio y campañas si quieres interpretar la señal. Considera estacionalidad, posición orgánica y publicidad. Si la cuenta permite experimentos aplicables, úsalos con una hipótesis concreta.</p><p>Podemos revisar la miniatura, secuencia y coherencia del A+ en una <a href="/es/auditoria-listing-amazon/">recomendación visual por escrito</a>.</p>`]
    ],
    sources: [['Amazon Seller Forums: product image requirements', 'https://sellercentral.amazon.com/seller-forums/discussions/t/13af96ea-6b07-4bf9-8dbe-a13292c2e3b1']]
  },
  {
    lang: 'es',
    slug: 'listing-recibe-visitas-no-genera-ventas',
    title: 'Por qué un listing recibe visitas pero no genera ventas',
    seoTitle: 'Por Qué un Listing Recibe Visitas pero No Genera Ventas',
    description: 'Una guía para diagnosticar claridad, oferta, confianza, objeciones y coherencia visual cuando un listing de Amazon recibe tráfico pero no convierte.',
    intro: 'Las visitas confirman que el producto está siendo descubierto, no que la página responda todo lo necesario para comprar. El diagnóstico debe separar tráfico, oferta y presentación.',
    image: '/assets/hero-amazon-design-1600.webp',
    imageAlt: 'Sistema visual de Skuvia Studio aplicado a una página de producto',
    sections: [
      ['Primero valida la calidad del tráfico', `<p>Comprueba términos de búsqueda, campañas, países, dispositivos y ASIN de destino. Tráfico poco relevante puede inflar visitas sin representar compradores potenciales. No conviene atribuir todo el problema al diseño antes de revisar esa base.</p>`],
      ['Revisa la oferta y las expectativas', `<p>Precio, plazo de entrega, reseñas, variaciones, disponibilidad y condiciones competitivas afectan la decisión. El diseño no compensa una oferta que el cliente percibe como incoherente. Sí puede explicar mejor por qué el producto cuesta lo que cuesta y para quién es adecuado.</p>`],
      ['Busca fricciones visuales', `<ul><li>La imagen principal no deja claro producto, tamaño o cantidad.</li><li>La secuencia enumera características sin explicar beneficios.</li><li>Faltan dimensiones, compatibilidad o instrucciones.</li><li>El texto es ilegible en móvil.</li><li>Listing y A+ cuentan historias distintas.</li><li>No se responden objeciones presentes en reseñas y preguntas.</li></ul>`],
      ['Convierte información en recorrido', `<p>Una secuencia útil guía desde atención hasta decisión: identifica el producto, presenta el beneficio prioritario, aporta contexto, responde dudas y refuerza confianza. El A+ puede profundizar en comparación, materiales, sistema de uso y marca sin repetir cada pieza de la galería.</p>`],
      ['Prioriza antes de rediseñar todo', `<p>Haz una lista de problemas observables y ordénalos por impacto probable y facilidad de validación. A veces corregir una escala confusa o la compatibilidad es más urgente que reconstruir toda la identidad. La <a href="/es/auditoria-listing-amazon/">auditoría de listing</a> está diseñada para entregar prioridades, alcance y precio por escrito, sin llamada obligatoria.</p>`]
    ],
    sources: []
  },
  {
    lang: 'es',
    slug: 'cuanto-cuesta-diseno-imagenes-amazon',
    title: 'Cuánto cuesta el diseño de imágenes para Amazon',
    seoTitle: 'Cuánto Cuesta el Diseño de Imágenes para Amazon',
    description: 'Qué factores influyen en el precio del diseño de imágenes para Amazon y cómo comparar alcance, entregables, revisiones y dirección visual.',
    intro: 'El precio depende menos del número de archivos que del trabajo necesario para convertir información del producto en una secuencia clara, coherente y lista para publicar.',
    image: '/assets/project-listing-packages-1400.webp',
    imageAlt: 'Presentación de paquetes de diseño para listings de Amazon',
    sections: [
      ['Qué suele incluir el precio', `<p>Un servicio completo puede combinar análisis de competidores, arquitectura de mensajes, copy visual, retoque, composición, dirección de arte, adaptación de recursos y revisiones. La fotografía, el render 3D, la compra de licencias o la traducción especializada pueden cotizarse aparte según el proyecto.</p>`],
      ['Factores que cambian el alcance', `<ul><li>Cantidad y calidad del material de producto disponible.</li><li>Número de imágenes o módulos.</li><li>Complejidad técnica y necesidad de explicar compatibilidad.</li><li>Cantidad de variantes o marketplaces.</li><li>Necesidad de crear renders, escenas o recursos adicionales.</li><li>Número de revisiones y entrega de editables.</li></ul>`],
      ['Cómo comparar propuestas', `<p>Pregunta qué recibes, en qué resolución, cuántas revisiones incluye y qué debes aportar. Una oferta con muchas piezas puede no cubrir investigación ni estrategia; una propuesta más acotada puede ser suficiente si el listing ya tiene una dirección clara.</p><p>Evita evaluar solo el precio por imagen. Revisa si existe una lógica entre piezas y si el diseñador entiende las restricciones de Amazon y la lectura móvil.</p>`],
      ['Precios orientativos de Skuvia Studio', `<p>Los paquetes actuales parten de <strong>USD 100</strong> para Listing Images, <strong>USD 125</strong> para A+ Content y <strong>USD 400</strong> para una solución Full Brand. Son referencias visibles y el alcance definitivo depende del material y las necesidades del producto.</p><p>Puedes consultar qué incluye cada opción en la página de <a href="/es/precios/">precios de diseño para Amazon</a>.</p>`],
      ['Qué enviar para recibir una cotización útil', `<p>Comparte el ASIN o enlace, servicio que buscas, marketplace, material disponible y cualquier fecha realmente necesaria. Con esa base podemos responder por escrito con recomendación, alcance y precio, sin obligarte a agendar una llamada.</p>`]
    ],
    sources: []
  },
  {
    lang: 'en',
    slug: 'how-to-plan-amazon-listing-images-that-convert',
    title: 'How to Plan Amazon Listing Images That Convert',
    seoTitle: 'How to Plan Amazon Listing Images That Convert | Skuvia',
    description: 'A practical framework for planning Amazon listing images around attention, benefits, objections, trust and mobile readability.',
    intro: 'Effective listing images are not a collection of attractive graphics. They are a visual decision path that helps shoppers identify the product, understand its value and resolve uncertainty.',
    image: '/assets/project-listing-packages-1400.webp',
    imageAlt: 'Amazon listing image sequence presented as a complete visual system',
    sections: [
      ['Start with the buying questions', `<p>Collect questions from reviews, customer messages, competitor listings and product documentation. Group them into value, fit, use, dimensions, compatibility, quality and package contents. This turns research into a brief instead of asking design to guess what matters.</p>`],
      ['Assign one primary job to each image', `<ol><li><strong>Main image:</strong> make the product accurate and recognizable.</li><li><strong>Priority benefit:</strong> translate the strongest feature into useful value.</li><li><strong>How it works:</strong> simplify the mechanism or setup.</li><li><strong>Lifestyle:</strong> show a credible use context.</li><li><strong>Scale and fit:</strong> prevent expectation gaps.</li><li><strong>Objection:</strong> answer a decision-blocking concern.</li><li><strong>Trust:</strong> close with materials, contents or relevant brand proof.</li></ol>`],
      ['Design for mobile comprehension', `<p>Test every concept at a reduced size. Use short copy, visible hierarchy and enough contrast for the information to survive a mobile screen. If a customer needs to zoom into embedded text, move part of that explanation into supporting copy or a different visual.</p>`],
      ['Coordinate the gallery and A+ Content', `<p>The top gallery should support a quick decision; A+ Content can expand on materials, comparison, brand context and use. Repeating the exact same claims wastes space. Plan both areas as one system with different depths.</p>`],
      ['Validate without making guarantees', `<p>Image changes can improve clarity, but CTR and conversion are also affected by relevance, price, reviews, availability, advertising and competition. Document the hypothesis and the date of each change. For a written priority review, request an <a href="/en/amazon-listing-audit/">Amazon listing audit</a>.</p>`]
    ],
    sources: [['Amazon Seller Forums: product image guidance', 'https://sellercentral.amazon.com/seller-forums/discussions/t/13af96ea-6b07-4bf9-8dbe-a13292c2e3b1']]
  },
  {
    lang: 'en',
    slug: 'amazon-a-plus-content-design-modules-strategy-examples',
    title: 'Amazon A+ Content Design: Modules, Strategy and Examples',
    seoTitle: 'Amazon A+ Content Design: Modules, Strategy & Examples',
    description: 'Plan Amazon A+ Content with the right module roles, image specifications, mobile hierarchy and a strategy that complements listing images.',
    intro: 'A+ Content becomes useful when each module adds a new layer of understanding. The goal is not to decorate the detail page—it is to organize evidence and context.',
    image: '/assets/project-a-plus-content-1400.webp',
    imageAlt: 'Long-form example of Amazon A+ Content modules',
    sections: [
      ['What A+ Content can do', `<p>Eligible brands can combine images, text and comparison modules below the main product information. Basic and Premium A+ provide different module options. Access and submission requirements depend on the seller account and Amazon program rules.</p>`],
      ['Plan around module specifications', `<p>Amazon lists specifications for each module inside the content manager. Current documentation references formats such as 970 × 300 px for certain Basic A+ assets and 1464 × 600 px for wider Premium A+ modules. Treat these as production constraints, then verify the exact module selected in your account.</p><p>Keep critical text within safe areas, protect legibility on mobile and avoid embedding long paragraphs into images.</p>`],
      ['Give the page a narrative', `<ol><li>Open with product value and visual context.</li><li>Develop primary benefits with product evidence.</li><li>Explain materials, fit, compatibility or operation.</li><li>Answer objections that the top gallery cannot cover.</li><li>Use comparison when it helps shoppers choose responsibly.</li><li>Close with relevant brand or product-system context.</li></ol>`],
      ['Avoid duplication', `<p>The listing gallery works under time pressure; A+ gives the shopper more room to investigate. Reusing the same headline and visual in both places does not add confidence. Coordinate them so the gallery communicates quickly and A+ provides depth.</p>`],
      ['Use examples as logic, not templates', `<p>A technical accessory, a home organizer and a children’s product need different information and pacing. Start with the product’s decision barriers and build the module sequence around them. See our <a href="/en/portfolio/amazon-a-plus-content/">A+ Content case study</a> or explore the <a href="/en/amazon-a-plus-content-design/">A+ Content design service</a>.</p>`]
    ],
    sources: [['Amazon Seller Central: A+ Content', 'https://sellercentral.amazon.com/help/hub/reference/external/G202102930?path=66&route=product%2Fcategory']]
  }
];

const fiverrUrl = 'https://es.fiverr.com/nerio_ramirez/create-captivating-amazon-listing-images-and-a-content-that-boost-your-sales';

const pageTitles = {
  es: {
    home: 'Diseño Estratégico para Amazon | Skuvia Studio',
    audit: 'Auditoría de Listing de Amazon | Skuvia Studio',
    pricing: 'Precios de Diseño para Amazon | Skuvia Studio',
    portfolio: 'Portfolio de Diseño para Amazon | Skuvia Studio',
    blog: 'Recursos de Diseño para Amazon | Skuvia Studio'
  },
  en: {
    home: 'Strategic Amazon Design Studio | Skuvia Studio',
    audit: 'Amazon Listing Audit | Skuvia Studio',
    pricing: 'Amazon Design Pricing | Skuvia Studio',
    portfolio: 'Amazon Design Portfolio | Skuvia Studio',
    blog: 'Amazon Design Resources | Skuvia Studio'
  }
};

const pageDescriptions = {
  es: {
    home: 'Diseño estratégico para Amazon: listing images, A+ Content, Brand Story y Storefront para marcas que necesitan comunicar con claridad y confianza.',
    audit: 'Solicita una revisión escrita de la imagen principal, secuencia, beneficios, lectura móvil, diferenciación y coherencia de tu listing de Amazon.',
    pricing: 'Consulta paquetes orientativos de imágenes para Amazon, A+ Content y experiencia de marca. Recibe recomendación, alcance y precio por escrito.',
    portfolio: 'Explora casos reales de Amazon Listing Images, A+ Content y dirección visual creados por Skuvia Studio.',
    blog: 'Guías prácticas sobre imágenes para Amazon, A+ Content, CTR, conversión visual y planificación de listings.'
  },
  en: {
    home: 'Strategic Amazon design for listing images, A+ Content, Brand Story and Storefronts, built for brands that need clarity and trust.',
    audit: 'Request a written review of your Amazon main image, visual sequence, benefits, mobile readability, differentiation and A+ consistency.',
    pricing: 'Explore starting packages for Amazon listing images, A+ Content and brand experiences. Receive written scope and pricing.',
    portfolio: 'Explore real Amazon listing image, A+ Content and visual-direction work created by Skuvia Studio.',
    blog: 'Practical resources on Amazon listing images, A+ Content, visual CTR, conversion clarity and listing planning.'
  }
};

const pairMap = new Map();
for (const key of Object.keys(routes.es)) {
  pairMap.set(routes.es[key], routes.en[key]);
  pairMap.set(routes.en[key], routes.es[key]);
}
for (const slug of Object.keys(portfolio)) {
  pairMap.set(caseRoutes.es[slug], caseRoutes.en[slug]);
  pairMap.set(caseRoutes.en[slug], caseRoutes.es[slug]);
}

function e(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function abs(path) {
  return new URL(path, siteUrl).href;
}

function jsonLd(value) {
  return `<script type="application/ld+json">${JSON.stringify(value).replaceAll('<', '\\u003c')}</script>`;
}

function routeForArticle(article) {
  return `/${article.lang}/blog/${article.slug}/`;
}

for (const article of articles) {
  const path = routeForArticle(article);
  const paired = articles.find((candidate) =>
    candidate.lang !== article.lang &&
    ((candidate.slug.includes('a-plus') && article.slug.includes('a-plus')) ||
      (candidate.slug.includes('listing-images') && article.slug.includes('imagenes-debe-tener')))
  );
  pairMap.set(path, paired ? routeForArticle(paired) : routes[article.lang === 'es' ? 'en' : 'es'].blog);
}

function head({ lang, path, title, description, type = 'website', schema = [] }) {
  const alternate = pairMap.get(path) || routes[lang === 'es' ? 'en' : 'es'].home;
  const esPath = lang === 'es' ? path : alternate;
  const enPath = lang === 'en' ? path : alternate;
  return `
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${e(title)}</title>
  <meta name="description" content="${e(description)}">
  <meta name="robots" content="index,follow,max-image-preview:large">
  <link rel="canonical" href="${abs(path)}">
  <link rel="alternate" hreflang="es" href="${abs(esPath)}">
  <link rel="alternate" hreflang="en" href="${abs(enPath)}">
  <link rel="alternate" hreflang="x-default" href="${siteUrl}/">
  <meta property="og:type" content="${type}">
  <meta property="og:site_name" content="Skuvia Studio">
  <meta property="og:locale" content="${lang === 'es' ? 'es_ES' : 'en_US'}">
  <meta property="og:title" content="${e(title)}">
  <meta property="og:description" content="${e(description)}">
  <meta property="og:url" content="${abs(path)}">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="${e(title)}">
  <meta name="twitter:description" content="${e(description)}">
  <meta name="theme-color" content="#0f241d">
  <link rel="icon" type="image/webp" href="/assets/favicon-192.webp">
  <link rel="stylesheet" href="/site.css">
  ${schema.map(jsonLd).join('\n')}`;
}

function organizationSchema(lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: 'Skuvia Studio',
    url: siteUrl,
    logo: abs('/assets/logo-480.webp'),
    email: 'contact@skuviastudio.com',
    sameAs: [fiverrUrl],
    description: pageDescriptions[lang].home
  };
}

function websiteSchema(lang, path) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${abs(path)}#website`,
    url: abs(path),
    name: 'Skuvia Studio',
    inLanguage: lang,
    publisher: { '@id': `${siteUrl}/#organization` }
  };
}

function breadcrumbsSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item[0],
      item: abs(item[1])
    }))
  };
}

function faqSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(([question, answer]) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer }
    }))
  };
}

function languageLabel(lang) {
  return lang === 'es' ? 'EN' : 'ES';
}

function header(lang, path) {
  const t = ui[lang];
  const other = lang === 'es' ? 'en' : 'es';
  const otherPath = pairMap.get(path) || routes[other].home;
  return `
  <a class="skip-link" href="#contenido">${t.skip}</a>
  <div class="announcement" aria-label="${lang === 'es' ? 'Características del servicio' : 'Service highlights'}">
    ${t.announcement.map((item) => `<span>${e(item)}</span>`).join('')}
  </div>
  <header class="site-header" data-header>
    <div class="container nav-shell">
      <a class="brand" href="${routes[lang].home}" aria-label="Skuvia Studio — ${t.nav.home}">
        <img src="/assets/logo-480.webp" alt="Skuvia Studio" width="160" height="90">
      </a>
      <button class="menu-toggle" type="button" data-menu-toggle aria-expanded="false" aria-controls="primary-nav">
        <span></span><span></span><span></span><span class="sr-only">${lang === 'es' ? 'Abrir menú' : 'Open menu'}</span>
      </button>
      <nav class="primary-nav" id="primary-nav" data-nav aria-label="${lang === 'es' ? 'Navegación principal' : 'Primary navigation'}">
        <a href="${routes[lang].listing}">${lang === 'es' ? 'Listing Images' : 'Listing Images'}</a>
        <a href="${routes[lang].aplus}">A+ Content</a>
        <a href="${routes[lang].brandStory}">Brand Story</a>
        <a href="${routes[lang].storefront}">Storefront</a>
        <a href="${routes[lang].portfolio}">${t.nav.portfolio}</a>
        <a href="${routes[lang].pricing}">${t.nav.pricing}</a>
        <a href="${routes[lang].blog}">${t.nav.blog}</a>
      </nav>
      <div class="nav-actions">
        <a class="lang-switch" href="${otherPath}" hreflang="${other}" lang="${other}" data-language-switch data-track="language_change" aria-label="${languageLabel(lang)} — ${lang === 'es' ? 'Cambiar a inglés' : 'Switch to Spanish'}">${languageLabel(lang)}</a>
        <a class="button button-primary button-small" href="${routes[lang].audit}" data-track="analyze_listing">${t.nav.audit}</a>
      </div>
    </div>
  </header>`;
}

function footer(lang) {
  const t = ui[lang];
  return `
  <footer class="site-footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        <img src="/assets/logo-480.webp" alt="Skuvia Studio" width="180" height="101" loading="lazy">
        <p>${lang === 'es' ? 'Diseño estratégico para marcas y vendedores de Amazon.' : 'Strategic design for Amazon brands and sellers.'}</p>
      </div>
      <div>
        <span class="footer-label">${t.explore}</span>
        <a href="${routes[lang].listing}">Amazon Listing Images</a>
        <a href="${routes[lang].aplus}">Amazon A+ Content</a>
        <a href="${routes[lang].brandStory}">Amazon Brand Story</a>
        <a href="${routes[lang].storefront}">Amazon Storefront</a>
      </div>
      <div>
        <span class="footer-label">${lang === 'es' ? 'RECURSOS' : 'RESOURCES'}</span>
        <a href="${routes[lang].portfolio}">${t.nav.portfolio}</a>
        <a href="${routes[lang].pricing}">${t.nav.pricing}</a>
        <a href="${routes[lang].blog}">${t.nav.blog}</a>
        <a href="${routes[lang].audit}">${t.nav.audit}</a>
      </div>
      <div>
        <span class="footer-label">${t.contact}</span>
        <a href="mailto:contact@skuviastudio.com" data-track="email_click">contact@skuviastudio.com</a>
        <a href="${fiverrUrl}" target="_blank" rel="noopener noreferrer" data-track="fiverr_click">Fiverr ↗</a>
      </div>
    </div>
    <div class="container footer-bottom">
      <span>© <span data-year></span> Skuvia Studio. ${t.rights}</span>
      <span>${t.disclaimer}</span>
    </div>
  </footer>`;
}

function page({ lang, path, title, description, content, schema = [], type = 'website', bodyClass = '' }) {
  return `<!doctype html>
<html lang="${lang}">
<head>${head({ lang, path, title, description, type, schema })}</head>
<body class="${bodyClass}">
  ${header(lang, path)}
  <main id="contenido">${content}</main>
  ${footer(lang)}
  <script src="/portfolio-data.js" defer></script>
  <script src="/site.js" defer></script>
</body>
</html>`;
}

function breadcrumbs(lang, items) {
  const home = [lang === 'es' ? 'Inicio' : 'Home', routes[lang].home];
  const all = [home, ...items];
  return `<nav class="breadcrumbs container" aria-label="${lang === 'es' ? 'Migas de pan' : 'Breadcrumb'}">${all.map(([label, href], index) => index === all.length - 1 ? `<span aria-current="page">${e(label)}</span>` : `<a href="${href}">${e(label)}</a><span aria-hidden="true">/</span>`).join('')}</nav>`;
}

function serviceCards(lang) {
  const icons = { listing: 'listing', aplus: 'content', brandStory: 'brand', storefront: 'store' };
  return `<div class="service-grid">${Object.entries(services).map(([key, service]) => {
    const data = service[lang];
    return `<article class="service-card reveal">
      <img src="/assets/icon-${icons[key]}-256.webp" width="72" height="72" loading="lazy" alt="">
      <p class="eyebrow">${e(data.label)}</p>
      <h3>${e(data.h1)}</h3>
      <p>${e(data.intro)}</p>
      <a class="text-link" href="${routes[lang][key]}">${lang === 'es' ? 'Conocer el servicio' : 'Explore the service'} <span aria-hidden="true">↗</span></a>
    </article>`;
  }).join('')}</div>`;
}

function portfolioCards(lang, limit = 3) {
  return `<div class="portfolio-grid" data-portfolio-grid>${Object.entries(portfolio).slice(0, limit).map(([slug, project]) => {
    const data = project[lang];
    const responsive = slug === 'skuvia-brand-system'
      ? `srcset="/assets/project-brand-system-900.webp 900w, /assets/project-brand-system-1400.webp 1400w"`
      : `srcset="${project.image.replace('-1400.webp', '-700.webp')} 700w, ${project.image} 1400w"`;
    const dims = slug === 'skuvia-brand-system' ? 'width="1400" height="991"' : 'width="1400" height="2488"';
    return `<article class="portfolio-card reveal">
      <a class="portfolio-media" href="${caseRoutes[lang][slug]}" aria-label="${e(data.title)}">
        <img src="${project.image}" ${responsive} sizes="(max-width: 760px) 92vw, 42vw" ${dims} loading="lazy" alt="${e(data.alt)}">
      </a>
      <div class="portfolio-copy"><p class="eyebrow">${e(data.category)}</p><h3><a href="${caseRoutes[lang][slug]}">${e(data.title)}</a></h3><p>${e(data.summary)}</p><a class="text-link" href="${caseRoutes[lang][slug]}">${ui[lang].case} <span aria-hidden="true">↗</span></a></div>
    </article>`;
  }).join('')}</div>`;
}

function reviewsSection(lang) {
  return `<section class="section reviews-section" aria-labelledby="reviews-title">
    <div class="container section-heading">
      <div><p class="eyebrow">Fiverr · ${lang === 'es' ? 'Reseñas verificadas' : 'Verified reviews'}</p><h2 id="reviews-title">${lang === 'es' ? 'Opiniones de clientes que confiaron en el proceso.' : 'Feedback from clients who trusted the process.'}</h2></div>
      <a class="text-link" href="${fiverrUrl}" target="_blank" rel="noopener noreferrer" data-track="fiverr_click">${lang === 'es' ? 'Ver el gig en Fiverr' : 'View the Fiverr gig'} ↗</a>
    </div>
    <div class="review-summary container"><strong>4.8 / 5</strong><span>343 ${lang === 'es' ? 'reseñas en Fiverr' : 'reviews on Fiverr'}</span></div>
    <div class="review-viewport" aria-label="${lang === 'es' ? 'Reseñas de Fiverr' : 'Fiverr reviews'}">
      <div class="review-track" data-review-track>${reviews.map((review) => `<article class="review-card">
        <div class="review-head"><strong>@${e(review[0])}</strong><span>${e(review[3])}</span></div>
        <p>“${e(lang === 'es' ? review[4] : review[5])}”</p>
        <small>${e(lang === 'es' ? review[1] : review[2])} · Fiverr</small>
      </article>`).join('')}</div>
    </div>
  </section>`;
}

function packageCards(lang) {
  return `<div class="package-grid">${packages[lang].map((item) => `<article class="package-card${item.featured ? ' featured' : ''}">
    <span class="package-label">${e(item.label)}</span>
    <h3>${e(item.name)}</h3>
    <p class="package-price">${e(item.price)} <small>USD</small></p>
    <p>${e(item.description)}</p>
    <ul class="check-list">${item.items.map((entry) => `<li>${e(entry)}</li>`).join('')}</ul>
    <a class="button ${item.featured ? 'button-primary' : 'button-secondary'} button-full" href="${routes[lang].audit}?service=${encodeURIComponent(item.service)}" data-track="quote_request" data-service="${e(item.service)}">${ui[lang].quote}</a>
  </article>`).join('')}</div>`;
}

function trustStrip(lang) {
  const data = lang === 'es'
    ? [['4.8/5', 'Valoración en Fiverr'], ['343', 'Reseñas en Fiverr'], ['ES + EN', 'Servicio internacional'], ['100%', 'Proceso por escrito']]
    : [['4.8/5', 'Fiverr rating'], ['343', 'Fiverr reviews'], ['ES + EN', 'International service'], ['100%', 'Written-first process']];
  return `<div class="trust-strip"><div class="container trust-grid">${data.map(([value, label]) => `<div><strong>${value}</strong><span>${label}</span></div>`).join('')}</div></div>`;
}

function auditForm(lang) {
  const es = lang === 'es';
  return `<form class="contact-form glass-card" id="contact-form" action="https://api.web3forms.com/submit" method="POST">
    <input type="hidden" name="access_key" value="f9408505-a131-4de8-a765-a092c8f940ac">
    <input type="hidden" name="subject" value="${es ? 'Nueva solicitud de análisis de listing — Skuvia Studio' : 'New Amazon listing analysis request — Skuvia Studio'}">
    <input type="hidden" name="from_name" value="Skuvia Studio Website">
    <input type="hidden" name="language" value="${es ? 'Español' : 'English'}">
    <input class="honeypot" type="checkbox" name="botcheck" tabindex="-1" autocomplete="off" aria-hidden="true">
    <div class="form-row">
      <label>${es ? 'Nombre' : 'Name'}<input type="text" name="name" autocomplete="name" placeholder="${es ? 'Tu nombre' : 'Your name'}" required></label>
      <label>Email<input type="email" name="email" autocomplete="email" placeholder="you@brand.com" required></label>
    </div>
    <div class="form-row">
      <label>WhatsApp (${es ? 'opcional' : 'optional'})<input type="tel" name="whatsapp" autocomplete="tel" placeholder="+1 000 000 0000"></label>
      <label>${es ? 'Enlace del listing o ASIN' : 'Listing link or ASIN'}<input type="text" name="listing" placeholder="${es ? 'URL de Amazon o ASIN' : 'Amazon URL or ASIN'}" required></label>
    </div>
    <label>${es ? 'Marca o producto (opcional)' : 'Brand or product (optional)'}<input type="text" name="brand" placeholder="${es ? 'Nombre de tu marca o producto' : 'Brand or product name'}"></label>
    <label>${es ? '¿Qué necesitas?' : 'What do you need?'}
      <select name="service" id="service-select" required>
        <option value="">${es ? 'Selecciona un servicio' : 'Select a service'}</option>
        <option>Listing Essential</option><option>Listing Premium</option><option>Brand Experience</option><option>A+ Content</option><option>Brand Story</option><option>Amazon Storefront</option><option>${es ? 'Proyecto personalizado' : 'Custom project'}</option>
      </select>
    </label>
    <label>${es ? 'Comentario (opcional)' : 'Comment (optional)'}<textarea name="message" rows="4" placeholder="${es ? '¿Hay algo específico que quieras mejorar?' : 'Is there anything specific you want to improve?'}"></textarea></label>
    <button class="button button-primary button-full" type="submit" data-track="form_submit">${es ? 'Recibir análisis y cotización' : 'Receive analysis and quote'} <span aria-hidden="true">↗</span></button>
    <p class="form-status" id="form-status" role="status" aria-live="polite"></p>
    <p class="advice-note">${es ? 'Te responderemos por escrito con una recomendación, alcance y precio. No necesitas agendar una llamada.' : 'We will reply in writing with a recommendation, scope and price. You do not need to schedule a call.'}</p>
    <p class="form-note">${es ? 'Tus datos se enviarán a contact@skuviastudio.com exclusivamente para responder tu solicitud.' : 'Your details will be sent to contact@skuviastudio.com only to respond to your request.'}</p>
  </form>`;
}

function auditCta(lang, withForm = false) {
  const t = ui[lang];
  return `<section class="section audit-cta" aria-labelledby="audit-cta-title">
    <div class="container ${withForm ? 'audit-grid' : ''}">
      <div class="audit-copy">
        <p class="eyebrow">${t.auditLabel}</p>
        <h2 id="audit-cta-title">${t.auditTitle}</h2>
        <p>${t.auditText}</p>
        <ul class="inline-points"><li>${t.written}</li><li>${t.noCall}</li><li>${t.noCommitment}</li></ul>
        ${withForm ? '<a class="email-link" href="mailto:contact@skuviastudio.com" data-track="email_click">contact@skuviastudio.com ↗</a>' : `<a class="button button-primary" href="${routes[lang].audit}" data-track="analyze_listing">${t.nav.audit}</a>`}
      </div>
      ${withForm ? auditForm(lang) : ''}
    </div>
  </section>`;
}

function homePage(lang) {
  const es = lang === 'es';
  const path = routes[lang].home;
  const content = `
    <section class="home-hero">
      <div class="container hero-grid">
        <div class="hero-copy">
          <p class="eyebrow">Skuvia Studio · Amazon Visual Strategy</p>
          <h1>${es ? 'Diseño estratégico para Amazon que convierte información en confianza.' : 'Strategic Amazon design that turns product information into trust.'}</h1>
          <p class="hero-lead">${es ? 'Creamos Listing Images, A+ Content, Brand Story y Storefronts con una función clara: ayudar al comprador a entender el producto y avanzar hacia una decisión informada.' : 'We create Listing Images, A+ Content, Brand Story and Storefronts with one clear purpose: helping shoppers understand the product and move toward an informed decision.'}</p>
          <div class="button-row"><a class="button button-primary" href="${routes[lang].audit}" data-track="analyze_listing">${es ? 'Analizar mi listing' : 'Analyze my listing'}</a><a class="button button-secondary" href="${routes[lang].portfolio}">${ui[lang].portfolio}</a></div>
          <p class="hero-note">${ui[lang].written} · ${ui[lang].noCall} · ${ui[lang].noCommitment}</p>
        </div>
        <figure class="hero-visual">
          <img src="/assets/hero-amazon-design-1600.webp" width="1440" height="1019" fetchpriority="high" alt="${es ? 'Presentación de dirección visual y diseño ecommerce de Skuvia Studio' : 'Skuvia Studio ecommerce design and visual direction presentation'}">
          <figcaption>${es ? 'Estrategia, diseño y copy visual conectados.' : 'Connected strategy, design and visual copy.'}</figcaption>
        </figure>
      </div>
    </section>
    ${trustStrip(lang)}
    <section class="section" aria-labelledby="services-title"><div class="container section-heading"><div><p class="eyebrow">${es ? 'Especialización Amazon' : 'Amazon specialization'}</p><h2 id="services-title">${es ? 'Cada superficie necesita una función distinta.' : 'Every Amazon surface needs a distinct role.'}</h2></div><p>${es ? 'La imagen principal capta atención, la secuencia explica, el A+ profundiza y la Store organiza el catálogo.' : 'The main image earns attention, the sequence explains, A+ adds depth and the Store organizes the catalog.'}</p></div><div class="container">${serviceCards(lang)}</div></section>
    <section class="section section-contrast"><div class="container split-grid"><div><p class="eyebrow">${es ? 'Diseño con intención' : 'Design with intent'}</p><h2>${es ? 'No diseñamos piezas aisladas. Construimos un recorrido visual.' : 'We do not design isolated assets. We build a visual decision path.'}</h2></div><div class="prose"><p>${es ? 'Partimos del producto, la competencia y las preguntas del comprador. Después asignamos un trabajo concreto a cada imagen o módulo: atraer, explicar, demostrar, resolver una objeción o reforzar confianza.' : 'We start with the product, competition and shopper questions. Then we give every image or module a specific job: attract, explain, demonstrate, answer an objection or reinforce trust.'}</p><p>${es ? 'El resultado mantiene la identidad de la marca sin sacrificar claridad, lectura móvil ni requisitos de Amazon.' : 'The result keeps the brand recognizable without sacrificing clarity, mobile readability or Amazon requirements.'}</p></div></div></section>
    <section class="section" aria-labelledby="portfolio-title"><div class="container section-heading"><div><p class="eyebrow">Portfolio</p><h2 id="portfolio-title">${es ? 'Proyectos completos, no muestras desconectadas.' : 'Complete projects, not disconnected samples.'}</h2></div><a class="text-link" href="${routes[lang].portfolio}">${es ? 'Ver todos los casos' : 'View all case studies'} ↗</a></div><div class="container">${portfolioCards(lang)}</div></section>
    ${reviewsSection(lang)}
    <section class="section" aria-labelledby="process-title"><div class="container section-heading"><div><p class="eyebrow">${es ? 'Proceso' : 'Process'}</p><h2 id="process-title">${es ? 'Una colaboración clara, de principio a fin.' : 'A clear collaboration from start to finish.'}</h2></div></div><div class="container process-grid">${(es ? [['01','Contexto','Compartes ASIN, recursos, objetivos y necesidades.'],['02','Estrategia','Revisamos producto, competencia y recorrido visual.'],['03','Diseño','Desarrollamos dirección, copy y composiciones.'],['04','Entrega','Ajustamos y entregamos archivos listos para publicar.']] : [['01','Context','You share the ASIN, assets, goals and requirements.'],['02','Strategy','We review the product, competition and visual journey.'],['03','Design','We develop direction, copy and compositions.'],['04','Delivery','We refine and deliver publication-ready assets.']]).map(([n,h,p]) => `<article><span>${n}</span><h3>${h}</h3><p>${p}</p></article>`).join('')}</div></section>
    <section class="section packages-section" aria-labelledby="packages-title"><div class="container section-heading"><div><p class="eyebrow">${es ? 'Paquetes orientativos' : 'Starting packages'}</p><h2 id="packages-title">${es ? 'Un punto de partida claro para cada etapa.' : 'A clear starting point for every stage.'}</h2></div><a class="text-link" href="${routes[lang].pricing}">${es ? 'Comparar paquetes' : 'Compare packages'} ↗</a></div><div class="container">${packageCards(lang)}</div></section>
    <section class="section" aria-labelledby="resources-title"><div class="container section-heading"><div><p class="eyebrow">${es ? 'Recursos' : 'Resources'}</p><h2 id="resources-title">${es ? 'Decisiones visuales explicadas con claridad.' : 'Visual decisions explained clearly.'}</h2></div></div><div class="container blog-grid">${articles.filter((item) => item.lang === lang).slice(0, 3).map((article) => articleCard(article)).join('')}</div></section>
    ${auditCta(lang, true)}
  `;
  return page({
    lang,
    path,
    title: pageTitles[lang].home,
    description: pageDescriptions[lang].home,
    content,
    schema: [organizationSchema(lang), websiteSchema(lang, path)]
  });
}

function servicePage(lang, key) {
  const path = routes[lang][key];
  const data = services[key][lang];
  const es = lang === 'es';
  const related = Object.keys(services).filter((item) => item !== key).slice(0, 3);
  const caseSlug = key === 'aplus' ? 'amazon-a-plus-content' : key === 'listing' ? 'amazon-listing-visuals' : 'skuvia-brand-system';
  const crumbs = [[data.label, path]];
  const schema = [
    breadcrumbsSchema([[es ? 'Inicio' : 'Home', routes[lang].home], ...crumbs]),
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: data.label,
      description: data.description,
      url: abs(path),
      provider: { '@id': `${siteUrl}/#organization` },
      areaServed: 'Worldwide',
      availableLanguage: ['Spanish', 'English']
    },
    faqSchema(data.faqs)
  ];
  const content = `
    ${breadcrumbs(lang, crumbs)}
    <section class="page-hero"><div class="container page-hero-grid"><div><p class="eyebrow">${e(data.label)}</p><h1>${e(data.h1)}</h1><p class="hero-lead">${e(data.intro)}</p><div class="button-row"><a class="button button-primary" href="${routes[lang].audit}?service=${encodeURIComponent(data.label)}" data-track="quote_request" data-service="${e(data.label)}">${ui[lang].quote}</a><a class="button button-secondary" href="${routes[lang].portfolio}">${ui[lang].portfolio}</a></div><p class="hero-note">${ui[lang].written} · ${ui[lang].noCall} · ${ui[lang].noCommitment}</p></div><img src="${services[key].image}" width="${services[key].size[0]}" height="${services[key].size[1]}" fetchpriority="high" alt="${e(services[key].alt[lang])}"></div></section>
    <section class="section"><div class="container split-grid"><div><p class="eyebrow">${es ? 'Problemas que resuelve' : 'Problems this solves'}</p><h2>${e(data.problemTitle)}</h2></div><ul class="problem-list">${data.problems.map((item) => `<li>${e(item)}</li>`).join('')}</ul></div></section>
    <section class="section section-contrast"><div class="container"><div class="section-heading"><div><p class="eyebrow">${es ? 'Decoración vs. estrategia' : 'Decoration vs. strategy'}</p><h2>${es ? 'Una imagen atractiva no siempre es una imagen útil.' : 'An attractive image is not always a useful image.'}</h2></div></div><div class="comparison-grid"><article><span>01</span><h3>${es ? 'Diseño decorativo' : 'Decorative design'}</h3><p>${e(data.decorative)}</p></article><article class="accent"><span>02</span><h3>${es ? 'Estrategia visual' : 'Visual strategy'}</h3><p>${e(data.strategic)}</p></article></div></div></section>
    <section class="section" aria-labelledby="includes-title"><div class="container section-heading"><div><p class="eyebrow">${es ? 'Qué incluye' : 'What is included'}</p><h2 id="includes-title">${es ? 'Entregables organizados alrededor de una decisión.' : 'Deliverables organized around the decision.'}</h2></div></div><div class="container feature-grid">${data.includes.map(([title, copy]) => `<article><h3>${e(title)}</h3><p>${e(copy)}</p></article>`).join('')}</div><div class="container deliverable-list"><h3>${es ? 'Entregables' : 'Deliverables'}</h3><ul>${data.deliverables.map((item) => `<li>${e(item)}</li>`).join('')}</ul></div></section>
    <section class="section section-soft" aria-labelledby="service-process-title"><div class="container section-heading"><div><p class="eyebrow">${es ? 'Proceso de trabajo' : 'Working process'}</p><h2 id="service-process-title">${es ? 'Del análisis a los archivos finales.' : 'From analysis to final assets.'}</h2></div><p>${es ? 'El proceso puede completarse por escrito y se adapta al material disponible, el alcance y el marketplace confirmado.' : 'The process can be completed in writing and adapts to the available assets, scope and confirmed marketplace.'}</p></div><div class="container process-grid">${(es ? [['01','Contexto','Recibimos ASIN, recursos, objetivos y preguntas prioritarias.'],['02','Arquitectura','Definimos mensajes, secuencia y función de cada entrega.'],['03','Dirección visual','Desarrollamos copy, diseño y coherencia con la marca.'],['04','Ajustes y entrega','Aplicamos las revisiones acordadas y exportamos los archivos.']] : [['01','Context','We receive the ASIN, assets, goals and priority questions.'],['02','Architecture','We define messages, sequence and the role of each deliverable.'],['03','Visual direction','We develop copy, design and brand consistency.'],['04','Refinement and delivery','We apply agreed revisions and export the final assets.']]).map(([n,h,p]) => `<article><span>${n}</span><h3>${h}</h3><p>${p}</p></article>`).join('')}</div></section>
    <section class="section"><div class="container case-highlight"><img src="${portfolio[caseSlug].image}" width="1400" height="${caseSlug === 'skuvia-brand-system' ? '991' : '2488'}" loading="lazy" alt="${e(portfolio[caseSlug][lang].alt)}"><div><p class="eyebrow">${es ? 'Caso relacionado' : 'Related case study'}</p><h2>${e(portfolio[caseSlug][lang].title)}</h2><p>${e(portfolio[caseSlug][lang].summary)}</p><a class="button button-secondary" href="${caseRoutes[lang][caseSlug]}">${ui[lang].case}</a></div></div></section>
    <section class="section"><div class="container price-callout"><div><p class="eyebrow">${es ? 'Precio orientativo' : 'Starting price'}</p><h2>${e(data.priceTitle)}</h2><p>${e(data.priceText)}</p></div><a class="button button-primary" href="${routes[lang].pricing}">${es ? 'Ver precios y alcance' : 'View pricing and scope'}</a></div></section>
    <section class="section faq-section"><div class="container narrow"><p class="eyebrow">FAQ</p><h2>${es ? 'Preguntas sobre este servicio' : 'Questions about this service'}</h2><div class="faq-list">${data.faqs.map(([question, answer]) => `<details><summary>${e(question)}</summary><p>${e(answer)}</p></details>`).join('')}</div></div></section>
    <section class="section related-section"><div class="container"><p class="eyebrow">${es ? 'Servicios relacionados' : 'Related services'}</p><div class="related-links">${related.map((item) => `<a href="${routes[lang][item]}"><span>${e(services[item][lang].label)}</span><b aria-hidden="true">↗</b></a>`).join('')}</div></div></section>
    ${auditCta(lang)}
  `;
  return page({ lang, path, title: data.title, description: data.description, content, schema });
}

function pricingPage(lang) {
  const es = lang === 'es';
  const path = routes[lang].pricing;
  const crumbs = [[es ? 'Precios' : 'Pricing', path]];
  const content = `
    ${breadcrumbs(lang, crumbs)}
    <section class="page-hero compact"><div class="container narrow"><p class="eyebrow">${es ? 'Paquetes orientativos' : 'Starting packages'}</p><h1>${es ? 'Precios claros para comenzar con el alcance correcto.' : 'Clear pricing to start with the right scope.'}</h1><p class="hero-lead">${es ? 'Elige un punto de partida y recibe por escrito una recomendación, alcance definitivo y precio. No necesitas agendar una llamada.' : 'Choose a starting point and receive a written recommendation, final scope and price. No call is required.'}</p></div></section>
    <section class="section packages-section"><div class="container">${packageCards(lang)}</div></section>
    <section class="section section-contrast"><div class="container split-grid"><div><p class="eyebrow">${es ? 'Antes de cotizar' : 'Before we quote'}</p><h2>${es ? 'El material y la complejidad cambian el alcance.' : 'Available assets and complexity shape the scope.'}</h2></div><div class="prose"><p>${es ? 'Fotografía, renders 3D, licencias, traducciones, número de variantes, marketplaces y cantidad de módulos pueden requerir una cotización diferente.' : 'Photography, 3D renders, licenses, translations, variation count, marketplaces and module count may require a different quote.'}</p><p>${es ? 'Confirmamos formatos, resolución, recursos necesarios, revisiones y editables antes de comenzar.' : 'We confirm formats, resolution, required assets, revisions and editable files before starting.'}</p></div></div></section>
    <section class="section"><div class="container feature-grid"><article><h2>${es ? 'Qué debes proporcionar' : 'What you provide'}</h2><p>${es ? 'ASIN o enlace, fotografías o renders disponibles, información del producto, logo y guía de marca si existe.' : 'ASIN or link, available photography or renders, product information, logo and brand guidelines when available.'}</p></article><article><h2>${es ? 'Qué confirmamos' : 'What we confirm'}</h2><p>${es ? 'Alcance, entregables, plazo, revisiones, formato final y cualquier recurso adicional.' : 'Scope, deliverables, timing, revisions, final format and any additional assets.'}</p></article><article><h2>${es ? 'Cómo trabajamos' : 'How we work'}</h2><p>${es ? 'El proceso puede completarse por escrito para facilitar la colaboración entre países y zonas horarias.' : 'The process can be completed in writing to support collaboration across countries and time zones.'}</p></article></div></section>
    ${auditCta(lang, true)}
  `;
  return page({
    lang, path, title: pageTitles[lang].pricing, description: pageDescriptions[lang].pricing, content,
    schema: [breadcrumbsSchema([[es ? 'Inicio' : 'Home', routes[lang].home], ...crumbs])]
  });
}

function auditPage(lang) {
  const es = lang === 'es';
  const path = routes[lang].audit;
  const crumbs = [[es ? 'Auditoría de listing' : 'Listing audit', path]];
  const checks = es
    ? [['Imagen principal','Claridad, encuadre, diferenciación y posibles fricciones visuales.'],['Secuencia visual','Función de cada imagen y preguntas que todavía quedan abiertas.'],['Beneficios','Jerarquía, copy y traducción de características a valor.'],['Lectura en móvil','Tamaño de texto, contraste y comprensión a escala reducida.'],['Diferenciación','Señales que ayudan a entender por qué elegir el producto.'],['Objeciones','Dimensiones, compatibilidad, uso o confianza sin resolver.'],['Coherencia con A+','Continuidad entre galería, módulos y dirección de marca.']]
    : [['Main image','Clarity, framing, differentiation and potential visual friction.'],['Visual sequence','The role of each image and questions that remain unanswered.'],['Benefits','Hierarchy, copy and translation of features into value.'],['Mobile reading','Text size, contrast and comprehension at reduced scale.'],['Differentiation','Signals that help shoppers understand why this product fits.'],['Objections','Unresolved questions about dimensions, compatibility, use or trust.'],['A+ consistency','Continuity across the gallery, modules and brand direction.']];
  const faqs = es
    ? [['¿Necesito hacer una llamada?','No. La revisión y la respuesta pueden completarse por escrito.'],['¿Qué recibiré?','Una recomendación priorizada, el alcance sugerido y un precio para desarrollar el proyecto.'],['¿Debo tener el ASIN publicado?','Puedes compartir un ASIN, una URL o información suficiente del producto si todavía no está publicado.'],['¿El análisis garantiza resultados?','No. Identifica oportunidades visuales; ventas y conversión también dependen de oferta, tráfico, reseñas, precio y competencia.']]
    : [['Do I need to join a call?','No. The review and response can be completed in writing.'],['What will I receive?','A prioritized recommendation, suggested scope and a quote to develop the project.'],['Does the ASIN need to be live?','You can share an ASIN, URL or enough product information if it is not live yet.'],['Does the audit guarantee results?','No. It identifies visual opportunities; sales and conversion also depend on offer, traffic, reviews, price and competition.']];
  const content = `
    ${breadcrumbs(lang, crumbs)}
    <section class="page-hero compact"><div class="container narrow"><p class="eyebrow">${ui[lang].auditLabel}</p><h1>${es ? 'Recibe una auditoría visual de tu listing de Amazon.' : 'Receive a visual audit of your Amazon listing.'}</h1><p class="hero-lead">${es ? 'Comparte tu ASIN y revisaremos las oportunidades más importantes para mejorar claridad, jerarquía y coherencia. La respuesta será escrita e incluirá recomendación, alcance y precio.' : 'Share your ASIN and we will review the strongest opportunities to improve clarity, hierarchy and consistency. Your written response will include a recommendation, scope and price.'}</p><ul class="inline-points"><li>${ui[lang].written}</li><li>${ui[lang].noCall}</li><li>${ui[lang].noCommitment}</li></ul></div></section>
    <section class="section"><div class="container"><div class="section-heading"><div><p class="eyebrow">${es ? 'Qué revisaremos' : 'What we review'}</p><h2>${es ? 'Los puntos visuales que más influyen en la comprensión.' : 'The visual areas that most affect understanding.'}</h2></div></div><div class="feature-grid audit-features">${checks.map(([title, copy]) => `<article><h3>${e(title)}</h3><p>${e(copy)}</p></article>`).join('')}</div></div></section>
    <section class="section section-contrast"><div class="container split-grid"><div><p class="eyebrow">${es ? 'Qué recibirás' : 'What you receive'}</p><h2>${es ? 'Prioridades claras para decidir el siguiente paso.' : 'Clear priorities for deciding the next step.'}</h2></div><ul class="check-list large"><li>${es ? 'Observaciones sobre los principales puntos visuales.' : 'Observations on the main visual issues.'}</li><li>${es ? 'Recomendación de qué conviene mejorar primero.' : 'A recommendation on what to improve first.'}</li><li>${es ? 'Alcance sugerido para listing, A+ u otros entregables.' : 'Suggested scope for listing images, A+ or other deliverables.'}</li><li>${es ? 'Precio orientativo o propuesta según el proyecto.' : 'Starting price or project-specific proposal.'}</li></ul></div></section>
    <section class="section"><div class="container audit-grid"><div class="audit-copy"><p class="eyebrow">${es ? 'Envía tu listing' : 'Send your listing'}</p><h2>${es ? 'Cuéntanos qué quieres mejorar.' : 'Tell us what you want to improve.'}</h2><p>${es ? 'No necesitas preparar un brief perfecto. El ASIN, tus datos de contacto y una breve nota son suficientes para comenzar.' : 'You do not need a perfect brief. Your ASIN, contact details and a short note are enough to begin.'}</p><a class="email-link" href="mailto:contact@skuviastudio.com" data-track="email_click">contact@skuviastudio.com ↗</a></div>${auditForm(lang)}</div></section>
    <section class="section faq-section"><div class="container narrow"><p class="eyebrow">FAQ</p><h2>${es ? 'Antes de enviar tu solicitud' : 'Before sending your request'}</h2><div class="faq-list">${faqs.map(([q,a]) => `<details><summary>${e(q)}</summary><p>${e(a)}</p></details>`).join('')}</div></div></section>
  `;
  return page({
    lang, path, title: pageTitles[lang].audit, description: pageDescriptions[lang].audit, content,
    schema: [breadcrumbsSchema([[es ? 'Inicio' : 'Home', routes[lang].home], ...crumbs]), faqSchema(faqs)]
  });
}

function portfolioPage(lang) {
  const es = lang === 'es';
  const path = routes[lang].portfolio;
  const crumbs = [['Portfolio', path]];
  const content = `
    ${breadcrumbs(lang, crumbs)}
    <section class="page-hero compact"><div class="container narrow"><p class="eyebrow">Amazon Design Portfolio</p><h1>${es ? 'Portfolio de diseño estratégico para Amazon.' : 'Strategic Amazon design portfolio.'}</h1><p class="hero-lead">${es ? 'Explora proyectos completos y la lógica visual detrás de cada sistema. Cuando no existen resultados cuantificados confirmados, mostramos el proceso sin inventarlos.' : 'Explore complete projects and the visual logic behind each system. When verified quantitative results are unavailable, we show the process without inventing them.'}</p></div></section>
    <section class="section"><div class="container">${portfolioCards(lang)}</div></section>
    <section class="section section-soft"><div class="container split-grid"><div><p class="eyebrow">${es ? 'Más proyectos' : 'More projects'}</p><h2>${es ? 'La galería puede crecer sin perder estructura.' : 'The gallery can grow without losing structure.'}</h2></div><p>${es ? 'Los proyectos añadidos desde la herramienta de administración aparecen como tarjetas adicionales. Los casos editoriales principales conservan páginas indexables propias.' : 'Projects added through the administration tool appear as additional cards. The primary editorial cases retain their own indexable pages.'}</p></div><div class="container dynamic-portfolio" data-dynamic-portfolio></div></section>
    ${auditCta(lang)}
    <dialog class="portfolio-dialog" id="portfolio-dialog"><button class="dialog-close" type="button" data-dialog-close aria-label="${es ? 'Cerrar proyecto' : 'Close project'}">×</button><div data-dialog-content></div></dialog>
  `;
  return page({
    lang, path, title: pageTitles[lang].portfolio, description: pageDescriptions[lang].portfolio, content,
    schema: [breadcrumbsSchema([[es ? 'Inicio' : 'Home', routes[lang].home], ...crumbs])]
  });
}

function casePage(lang, slug) {
  const es = lang === 'es';
  const path = caseRoutes[lang][slug];
  const project = portfolio[slug];
  const data = project[lang];
  const crumbs = [['Portfolio', routes[lang].portfolio], [data.title, path]];
  const dimensions = slug === 'skuvia-brand-system' ? ['1400','991'] : ['1400','2488'];
  const content = `
    ${breadcrumbs(lang, crumbs)}
    <article class="case-study">
      <header class="case-hero container"><p class="eyebrow">${e(data.category)}</p><h1>${e(data.title)}</h1><p class="hero-lead">${e(data.summary)}</p><div class="case-meta"><span>${es ? 'Proyecto' : 'Project'}: ${e(data.category)}</span><span>${es ? 'Enfoque' : 'Focus'}: ${es ? 'Estrategia y sistema visual' : 'Strategy and visual system'}</span></div></header>
      <figure class="case-cover container"><img src="${project.image}" width="${dimensions[0]}" height="${dimensions[1]}" fetchpriority="high" alt="${e(data.alt)}"></figure>
      <section class="section"><div class="container case-narrative"><div><p class="eyebrow">${es ? 'Necesidad inicial' : 'Initial need'}</p><h2>${e(data.challenge)}</h2></div><div><p class="eyebrow">${es ? 'Objetivo estratégico' : 'Strategic objective'}</p><p class="large-copy">${e(data.objective)}</p></div></div></section>
      <section class="section section-contrast"><div class="container"><p class="eyebrow">${es ? 'Organización visual' : 'Visual organization'}</p><h2>${es ? 'Cada parte del proyecto cumple una función.' : 'Every part of the project has a job.'}</h2><ol class="sequence-grid">${data.sequence.map((item,index) => `<li><span>0${index+1}</span><strong>${e(item)}</strong></li>`).join('')}</ol></div></section>
      <section class="section"><div class="container case-gallery">${project.images.map((image,index) => {
        const guide = image.includes('guide');
        const brand = image.includes('brand-system') || image.includes('hero-amazon');
        const w = guide ? '1100' : brand ? (image.includes('hero') ? '1440' : '1400') : '1400';
        const h = guide ? '1375' : brand ? (image.includes('hero') ? '1019' : '991') : '2488';
        return `<figure><img src="${image}" width="${w}" height="${h}" loading="lazy" alt="${e(data.alt)} — ${es ? 'vista' : 'view'} ${index + 1}"><figcaption>${data.sequence[Math.min(index, data.sequence.length - 1)]}</figcaption></figure>`;
      }).join('')}</div></section>
      <section class="section section-soft"><div class="container narrow prose"><p class="eyebrow">${es ? 'Resultado visual final' : 'Final visual result'}</p><h2>${es ? 'Un sistema coherente, explicado sin resultados inventados.' : 'A coherent system, described without invented results.'}</h2><p>${es ? 'El resultado reúne las piezas disponibles dentro de una dirección consistente. No se atribuyen cifras de ventas, CTR o conversión porque no existe información verificada asociada públicamente a este proyecto.' : 'The result brings the available assets into one consistent direction. We do not attribute sales, CTR or conversion figures because no verified public data is associated with this project.'}</p></div></section>
    </article>
    ${auditCta(lang)}
  `;
  return page({
    lang, path, title: `${data.title} | Skuvia Studio`, description: data.summary, content,
    schema: [breadcrumbsSchema([[es ? 'Inicio' : 'Home', routes[lang].home], ...crumbs])]
  });
}

function articleCard(article) {
  return `<article class="article-card"><p class="eyebrow">Amazon Design</p><h3><a href="${routeForArticle(article)}">${e(article.title)}</a></h3><p>${e(article.intro)}</p><div class="article-meta"><time datetime="${published}">${published}</time><span>Skuvia Studio</span></div><a class="text-link" href="${routeForArticle(article)}">${ui[article.lang].article} ↗</a></article>`;
}

function blogPage(lang) {
  const es = lang === 'es';
  const path = routes[lang].blog;
  const crumbs = [[es ? 'Recursos' : 'Resources', path]];
  const posts = articles.filter((item) => item.lang === lang);
  const content = `
    ${breadcrumbs(lang, crumbs)}
    <section class="page-hero compact"><div class="container narrow"><p class="eyebrow">Skuvia Studio Journal</p><h1>${es ? 'Recursos sobre diseño y estrategia visual para Amazon.' : 'Amazon visual design and strategy resources.'}</h1><p class="hero-lead">${es ? 'Guías prácticas para planificar imágenes, comprender A+ Content y diagnosticar fricciones sin promesas vacías.' : 'Practical guidance for planning images, understanding A+ Content and diagnosing friction without empty promises.'}</p></div></section>
    <section class="section"><div class="container blog-grid">${posts.map(articleCard).join('')}</div></section>
    ${auditCta(lang)}
  `;
  return page({
    lang, path, title: pageTitles[lang].blog, description: pageDescriptions[lang].blog, content,
    schema: [breadcrumbsSchema([[es ? 'Inicio' : 'Home', routes[lang].home], ...crumbs])]
  });
}

function articlePage(article) {
  const { lang } = article;
  const es = lang === 'es';
  const path = routeForArticle(article);
  const crumbs = [[es ? 'Recursos' : 'Resources', routes[lang].blog], [article.title, path]];
  const tocLabel = es ? 'Contenido' : 'Contents';
  const sectionHtml = article.sections.map(([heading, body], index) => `<section id="section-${index + 1}"><h2>${e(heading)}</h2>${body}</section>`).join('');
  const content = `
    ${breadcrumbs(lang, crumbs)}
    <article class="blog-post">
      <header class="article-header container narrow"><p class="eyebrow">Amazon Design Journal</p><h1>${e(article.title)}</h1><p class="hero-lead">${e(article.intro)}</p><div class="article-meta"><span>${ui[lang].published}: <time datetime="${published}">${published}</time></span><span>${ui[lang].author}: Skuvia Studio</span></div></header>
      <figure class="article-cover container"><img src="${article.image}" width="1400" height="${article.image.includes('brand') || article.image.includes('hero') ? (article.image.includes('hero') ? '1019' : '991') : '2488'}" fetchpriority="high" alt="${e(article.imageAlt)}"></figure>
      <div class="container article-layout">
        <aside class="toc" aria-label="${tocLabel}"><strong>${tocLabel}</strong><ol>${article.sections.map(([heading], index) => `<li><a href="#section-${index + 1}">${e(heading)}</a></li>`).join('')}</ol></aside>
        <div class="article-body prose">${sectionHtml}
          ${article.sources.length ? `<section class="sources"><h2>${ui[lang].source}</h2><ul>${article.sources.map(([label,url]) => `<li><a href="${url}" target="_blank" rel="noopener noreferrer">${e(label)} ↗</a></li>`).join('')}</ul></section>` : ''}
        </div>
      </div>
    </article>
    ${auditCta(lang)}
  `;
  return page({
    lang, path, title: article.seoTitle, description: article.description, content, type: 'article',
    schema: [
      breadcrumbsSchema([[es ? 'Inicio' : 'Home', routes[lang].home], ...crumbs]),
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: article.title,
        description: article.description,
        datePublished: published,
        dateModified: published,
        inLanguage: lang,
        mainEntityOfPage: abs(path),
        author: { '@type': 'Organization', name: 'Skuvia Studio', url: siteUrl },
        publisher: { '@id': `${siteUrl}/#organization` },
        image: abs(article.image)
      }
    ]
  });
}

function rootPage() {
  return `<!doctype html><html lang="es"><head>
    <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Skuvia Studio — Choose language / Elige idioma</title>
    <meta name="description" content="Choose the Spanish or English version of Skuvia Studio. Elige la versión en español o inglés.">
    <meta name="robots" content="noindex,follow"><link rel="canonical" href="${siteUrl}/">
    <link rel="alternate" hreflang="es" href="${abs(routes.es.home)}"><link rel="alternate" hreflang="en" href="${abs(routes.en.home)}"><link rel="alternate" hreflang="x-default" href="${siteUrl}/">
    <link rel="icon" type="image/webp" href="/assets/favicon-192.webp"><link rel="stylesheet" href="/site.css">
  </head><body class="language-page"><main><div class="language-card"><img src="/assets/logo-480.webp" width="240" height="135" alt="Skuvia Studio"><p class="eyebrow">Amazon Visual Strategy</p><h1>Choose your language<br><span>Elige tu idioma</span></h1><div class="button-row"><a class="button button-primary" href="/es/" hreflang="es">Español</a><a class="button button-secondary" href="/en/" hreflang="en">English</a></div></div></main></body></html>`;
}

function notFoundPage() {
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Página no encontrada | Skuvia Studio</title><meta name="robots" content="noindex,follow"><link rel="stylesheet" href="/site.css"><link rel="icon" type="image/webp" href="/assets/favicon-192.webp"></head><body class="language-page"><main><div class="language-card"><p class="eyebrow">404</p><h1>Esta página no existe.<br><span>This page does not exist.</span></h1><p>Vuelve al inicio o explora el portfolio. Return home or explore the portfolio.</p><div class="button-row"><a class="button button-primary" href="/es/">Inicio</a><a class="button button-secondary" href="/en/">Home</a><a class="text-link" href="/es/portfolio/">Portfolio ↗</a></div></div></main></body></html>`;
}

async function writeRoute(path, html) {
  const output = path === '/' ? join(root, 'index.html') : join(root, path.replace(/^\//, ''), 'index.html');
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, html, 'utf8');
}

async function build() {
  const rendered = [];
  await writeRoute('/', rootPage());
  for (const lang of ['es', 'en']) {
    await writeRoute(routes[lang].home, homePage(lang)); rendered.push(routes[lang].home);
    for (const key of Object.keys(services)) {
      await writeRoute(routes[lang][key], servicePage(lang, key)); rendered.push(routes[lang][key]);
    }
    await writeRoute(routes[lang].audit, auditPage(lang)); rendered.push(routes[lang].audit);
    await writeRoute(routes[lang].pricing, pricingPage(lang)); rendered.push(routes[lang].pricing);
    await writeRoute(routes[lang].portfolio, portfolioPage(lang)); rendered.push(routes[lang].portfolio);
    await writeRoute(routes[lang].blog, blogPage(lang)); rendered.push(routes[lang].blog);
    for (const slug of Object.keys(portfolio)) {
      await writeRoute(caseRoutes[lang][slug], casePage(lang, slug)); rendered.push(caseRoutes[lang][slug]);
    }
  }
  for (const article of articles) {
    const path = routeForArticle(article);
    await writeRoute(path, articlePage(article));
    rendered.push(path);
  }

  await writeFile(join(root, '404.html'), notFoundPage(), 'utf8');
  await writeFile(join(root, 'portfolio.html'), '<!doctype html><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=/es/portfolio/"><link rel="canonical" href="https://skuviastudio.com/es/portfolio/"><title>Redirecting…</title><a href="/es/portfolio/">Portfolio</a>', 'utf8');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${rendered.map((path) => {
    const lang = path.startsWith('/es/') ? 'es' : 'en';
    const other = lang === 'es' ? 'en' : 'es';
    const alternate = pairMap.get(path) || routes[other].home;
    const esPath = lang === 'es' ? path : alternate;
    const enPath = lang === 'en' ? path : alternate;
    return `  <url><loc>${abs(path)}</loc><lastmod>${published}</lastmod><xhtml:link rel="alternate" hreflang="es" href="${abs(esPath)}"/><xhtml:link rel="alternate" hreflang="en" href="${abs(enPath)}"/><xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}/"/></url>`;
  }).join('\n')}\n</urlset>\n`;
  await writeFile(join(root, 'sitemap.xml'), sitemap, 'utf8');
  await writeFile(join(root, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /admin/\n\nSitemap: ${siteUrl}/sitemap.xml\n`, 'utf8');

  const noSlash = rendered.map((path) => `${path.slice(0, -1)} ${path} 301`);
  const redirects = [
    'https://www.skuviastudio.com/* https://skuviastudio.com/:splat 301!',
    '/ /es/ 301',
    '/index.html /es/ 301',
    '/portfolio.html /es/portfolio/ 301',
    ...noSlash
  ].join('\n') + '\n';
  await writeFile(join(root, '_redirects'), redirects, 'utf8');
  await writeFile(join(root, '_headers'), `/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  X-Frame-Options: SAMEORIGIN

/assets/*
  Cache-Control: public, max-age=31536000, immutable

/*.css
  Cache-Control: public, max-age=604800

/*.js
  Cache-Control: public, max-age=604800
`, 'utf8');

  const dist = join(root, 'dist');
  await rm(dist, { recursive: true, force: true });
  await mkdir(dist, { recursive: true });
  for (const directory of ['admin', 'es', 'en']) {
    await cp(join(root, directory), join(dist, directory), { recursive: true });
  }
  const publicAssets = [
    'favicon-192.webp', 'isotipo-512.webp', 'logo-480.webp',
    'hero-amazon-design-1600.webp',
    'icon-listing-256.webp', 'icon-content-256.webp', 'icon-brand-256.webp', 'icon-store-256.webp',
    'project-listing-packages-700.webp', 'project-listing-packages-1400.webp',
    'project-a-plus-content-700.webp', 'project-a-plus-content-1400.webp',
    'project-brand-system-900.webp', 'project-brand-system-1400.webp',
    'project-brand-guide-1200.webp', 'project-brand-guide2-1200.webp'
  ];
  await mkdir(join(dist, 'assets'), { recursive: true });
  for (const asset of publicAssets) await cp(join(root, 'assets', asset), join(dist, 'assets', asset));
  await cp(join(root, 'assets', 'portfolio'), join(dist, 'assets', 'portfolio'), { recursive: true }).catch((error) => {
    if (error.code !== 'ENOENT') throw error;
  });
  for (const file of ['index.html', 'portfolio.html', '404.html', 'site.css', 'site.js', 'portfolio-data.js', 'robots.txt', 'sitemap.xml', '_redirects', '_headers']) {
    await cp(join(root, file), join(dist, file));
  }

  console.log(`Generated ${rendered.length} indexable pages and Cloudflare-ready dist output.`);
}

await build();
