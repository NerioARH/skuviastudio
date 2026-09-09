const testimonialTrack = document.querySelector('[data-testimonial-track]');
const testimonialSet = testimonialTrack?.querySelector('.testimonial-set');

if (testimonialTrack && testimonialSet && !testimonialTrack.querySelector('.testimonial-set[aria-hidden="true"]')) {
  const testimonialClone = testimonialSet.cloneNode(true);
  testimonialClone.setAttribute('aria-hidden', 'true');
  testimonialTrack.appendChild(testimonialClone);
}

const englishTranslations = Object.freeze({
  'Saltar al contenido': 'Skip to content',
  'Diseño estratégico': 'Strategic design',
  'Marcas más fuertes': 'Stronger brands',
  'Mayor conversión': 'Higher conversion',
  'Servicios': 'Services',
  'Proyectos': 'Projects',
  'Proceso': 'Process',
  'Paquetes': 'Packages',
  'Solicitar asesoría': 'Request a consultation',
  'Diseño para Amazon que convierte': 'Amazon design that turns',
  'atención': 'attention',
  'en ventas.': 'into sales.',
  'Creamos y optimizamos tus': 'We create and optimize your',
  'Amazon listing images, A+ Content, Brand Story y Storefront': 'Amazon listing images, A+ Content, Brand Story and Storefront',
  'para comunicar mejor, generar confianza y ayudar a convertir más visitas en clientes.': 'to communicate clearly, build trust and help turn more visits into customers.',
  'Ver proyectos': 'View projects',
  'Explorar servicios': 'Explore services',
  'Claridad visual': 'Visual clarity',
  'Mayor confianza': 'Greater trust',
  'Diseño que vende': 'Design that sells',
  'Enfoque': 'Focus',
  'Conversión': 'Conversion',
  'puntos de contacto': 'touchpoints',
  'optimizados': 'optimized',
  'Especialistas en': 'Specialists in',
  'Servicios para marcas que quieren crecer': 'Services for brands ready to grow',
  'Tu producto merece una presencia visual a su altura.': 'Your product deserves a visual presence that matches its potential.',
  'No diseñamos solo para que se vea bien. Organizamos el mensaje, priorizamos beneficios y construimos una experiencia visual pensada para que el comprador entienda y confíe.': 'We do more than make things look good. We organize the message, prioritize benefits and build a visual experience designed to help shoppers understand and trust your offer.',
  'Imagen principal, infografías, comparativas, beneficios, lifestyle y storytelling visual para destacar en los resultados de búsqueda y mejorar el CTR.': 'Main images, infographics, comparisons, benefits, lifestyle images and visual storytelling designed to stand out in search results and improve CTR.',
  'Dirección estratégica': 'Strategic direction',
  'Copy visual persuasivo': 'Persuasive visual copy',
  'Diseño mobile-first': 'Mobile-first design',
  'Módulos de A+ Content que amplían la propuesta de valor, explican el producto y responden objeciones dentro de la página de detalle.': 'A+ Content modules that expand the value proposition, explain the product and answer objections directly on the product detail page.',
  'Estructura de módulos': 'Module structure',
  'Storytelling de producto': 'Product storytelling',
  'Diseño responsive': 'Responsive design',
  'Una historia de marca coherente que refuerza diferenciación, valores y conexión emocional para convertir productos sueltos en una marca memorable.': 'A cohesive brand story that reinforces differentiation, values and emotional connection, turning individual products into a memorable brand.',
  'Narrativa de marca': 'Brand narrative',
  'Consistencia visual': 'Visual consistency',
  'Venta cruzada': 'Cross-selling',
  'Brand Store organizada para facilitar el descubrimiento del catálogo, comunicar el universo de la marca y guiar a cada visitante hacia el producto ideal.': 'A Brand Store organized to improve catalog discovery, communicate your brand world and guide every visitor toward the right product.',
  'Arquitectura de contenido': 'Content architecture',
  'Diseño de páginas': 'Page design',
  'Navegación estratégica': 'Strategic navigation',
  'Trabajo seleccionado': 'Selected work',
  'Visuales pensados para hacer que tu producto se sienta como la mejor opción.': 'Visuals designed to make your product feel like the best choice.',
  'Cada proyecto combina estrategia, jerarquía de información y diseño premium para construir una experiencia de compra más clara y convincente.': 'Every project combines strategy, information hierarchy and premium design to create a clearer, more convincing shopping experience.',
  'Una identidad que vende en cada punto de contacto.': 'An identity that sells at every touchpoint.',
  'Ver proyecto ↗': 'View project ↗',
  'Información clara. Decisiones más fáciles.': 'Clear information. Easier decisions.',
  'Contenido que informa, diferencia y convierte.': 'Content that informs, differentiates and converts.',
  'Consistencia que construye confianza.': 'Consistency that builds trust.',
  'Cómo trabajamos': 'How we work',
  'Un proceso simple. Una estrategia con intención.': 'A simple process. A strategy with purpose.',
  'Antes de diseñar, entendemos el producto, el mercado y las objeciones del comprador. Así cada imagen tiene una función concreta dentro de la decisión de compra.': 'Before designing, we understand the product, the market and the shopper’s objections. This gives every image a specific role in the buying decision.',
  'Cuéntanos sobre tu producto': 'Tell us about your product',
  'Auditoría': 'Audit',
  'Revisamos tu listing actual, competidores, posicionamiento, reseñas y oportunidades visuales.': 'We review your current listing, competitors, positioning, reviews and visual opportunities.',
  'Estrategia': 'Strategy',
  'Definimos jerarquía, mensajes, beneficios, objeciones y el recorrido visual de cada pieza.': 'We define the hierarchy, messages, benefits, objections and visual journey for every asset.',
  'Diseño': 'Design',
  'Construimos visuales claros, modernos y consistentes con tu identidad de marca.': 'We build clear, modern visuals that remain consistent with your brand identity.',
  'Optimización': 'Optimization',
  'Ajustamos con tu feedback y entregamos los archivos preparados para Amazon.': 'We refine the work with your feedback and deliver files prepared for Amazon.',
  'Paquetes y precios': 'Packages and pricing',
  'Elige el nivel de impulso que necesita tu producto.': 'Choose the level of support your product needs.',
  'Precios orientativos por un ASIN. Podemos preparar una propuesta personalizada para catálogos, variaciones o lanzamientos completos.': 'Indicative pricing for one ASIN. We can prepare a custom proposal for catalogs, variations or full launches.',
  'Visual Essential': 'Visual Essential',
  'desde': 'from',
  '$124,99': '$124.99',
  'Para mejorar un listing que ya cuenta con fotografía y necesita comunicar mejor.': 'For improving a listing that already has photography but needs to communicate more clearly.',
  '1 imagen principal optimizada': '1 optimized main image',
  '3 imágenes infográficas': '3 infographic images',
  '1 imagen lifestyle': '1 lifestyle image',
  'Copy para las imágenes': 'Copy for all images',
  '2 rondas de ajustes': '2 revision rounds',
  'Solicitar este paquete': 'Request this package',
  'MÁS ELEGIDO': 'MOST POPULAR',
  'Visual Premium': 'Visual Premium',
  '$199,99': '$199.99',
  'Un set visual completo para elevar percepción, claridad y potencial de conversión.': 'A complete visual set designed to elevate perception, clarity and conversion potential.',
  '4 imágenes infográficas': '4 infographic images',
  '2 imágenes lifestyle': '2 lifestyle images',
  'Estrategia y copy visual': 'Strategy and visual copy',
  'Análisis de competidores': 'Competitor analysis',
  '3 rondas de ajustes': '3 revision rounds',
  '$499,99': '$499.99',
  'Una experiencia de marca conectada para listings que quieren escalar con coherencia.': 'A connected brand experience for listings that want to scale consistently.',
  'Todo Listing Premium': 'Everything in Visual Premium',
  'A+ Content completo': 'Complete A+ Content',
  'Adaptación a tu identidad': 'Adapted to your brand identity',
  'Dirección estratégica global': 'Complete strategic direction',
  'Soporte prioritario': 'Priority support',
  'También diseñamos': 'We also design',
  'Amazon Storefront, Premium A+ Content, variaciones de producto y proyectos personalizados.': 'Amazon Storefronts, Premium A+ Content, product variations and custom projects.',
  'Escríbenos para recibir una propuesta adaptada.': 'Contact us for a tailored proposal.',
  'Más que diseño': 'More than design',
  'Optimización visual de Amazon basada en cómo compra la gente.': 'Amazon visual optimization based on how people shop.',
  'En Amazon, el comprador compara opciones en segundos. Las': 'On Amazon, shoppers compare options in seconds. Your',
  'imágenes del listing': 'listing images',
  'deben explicar qué es el producto, por qué es diferente y cómo mejora la vida del cliente sin obligarlo a buscar respuestas. Una buena secuencia visual reduce dudas, hace el contenido más escaneable y ayuda a que la oferta se perciba con mayor valor.': 'must explain what the product is, why it is different and how it improves the customer’s life without forcing them to search for answers. A strong visual sequence reduces uncertainty, makes content easier to scan and helps the offer feel more valuable.',
  'Nuestro servicio de': 'Our',
  'optimización de Amazon listings': 'Amazon listing optimization service',
  'une diseño gráfico, copy visual, investigación de competencia y jerarquía de información. Trabajamos la imagen principal para ganar atención en los resultados, las infografías para presentar beneficios y características, y las imágenes lifestyle para contextualizar el producto y conectar con el público.': 'combines graphic design, visual copy, competitor research and information hierarchy. We optimize the main image to earn attention in search results, infographics to present benefits and features, and lifestyle images to contextualize the product and connect with the audience.',
  'Extendemos esa misma estrategia al': 'We extend the same strategy to',
  'Amazon A+ Content, Brand Story y Amazon Brand Store': 'Amazon A+ Content, Brand Story and Amazon Brand Store',
  '. El resultado es una presencia consistente, profesional y preparada para acompañar campañas de PPC, lanzamientos, crecimiento orgánico y expansión del catálogo.': '. The result is a consistent, professional presence prepared to support PPC campaigns, launches, organic growth and catalog expansion.',
  'Preguntas frecuentes': 'Frequently asked questions',
  'Todo lo que necesitas saber antes de empezar.': 'Everything you need to know before getting started.',
  'Si tu proyecto tiene requisitos especiales, podemos preparar un alcance a medida.': 'If your project has special requirements, we can prepare a custom scope.',
  '¿Qué necesito entregar para comenzar?': 'What do I need to provide to get started?',
  'Necesitamos información del producto, enlaces de referencia, logotipo, guía de marca si existe, fotografías o renders disponibles y los mensajes clave que deseas comunicar. También podemos ayudarte a ordenar esa información durante la auditoría.': 'We need product information, reference links, your logo, brand guidelines if available, existing photography or renders, and the key messages you want to communicate. We can also help you organize this information during the audit.',
  '¿El servicio incluye el copy de las imágenes?': 'Does the service include copy for the images?',
  'Sí. Los paquetes incluyen copy visual: titulares, beneficios y textos breves para cada pieza. El contenido se redacta pensando en claridad, diferenciación y lectura rápida, especialmente en dispositivos móviles.': 'Yes. Packages include visual copy: headlines, benefits and concise text for every asset. Content is written for clarity, differentiation and quick reading, especially on mobile devices.',
  '¿Pueden rediseñar un listing que ya está publicado?': 'Can you redesign a listing that is already live?',
  'Sí. Auditamos el listing actual, detectamos oportunidades en la imagen principal, las infografías, el A+ Content o la Brand Story, y proponemos una nueva estructura sin necesidad de rehacer lo que todavía funciona.': 'Yes. We audit the current listing, identify opportunities in the main image, infographics, A+ Content or Brand Story, and propose a new structure without rebuilding what already works.',
  '¿Garantizan un aumento de conversión o CTR?': 'Do you guarantee an increase in conversion or CTR?',
  'El diseño estratégico puede mejorar claridad, diferenciación y percepción de valor, factores que influyen en CTR y conversión. Sin embargo, ningún estudio serio puede garantizar un porcentaje porque también intervienen precio, reseñas, posicionamiento, publicidad, competencia y demanda.': 'Strategic design can improve clarity, differentiation and perceived value—factors that influence CTR and conversion. However, no serious studio can guarantee a percentage because price, reviews, ranking, advertising, competition and demand also play a role.',
  '¿Trabajan con vendedores fuera de España o Latinoamérica?': 'Do you work with sellers outside Spain or Latin America?',
  'Sí. Skuvia Studio puede trabajar de forma remota con vendedores y marcas de Amazon en distintos marketplaces. Adaptamos el diseño al idioma y al público objetivo de cada proyecto.': 'Yes. Skuvia Studio works remotely with Amazon sellers and brands across different marketplaces. We adapt the design to the language and target audience of each project.',
  'Hablemos de tu producto': 'Let’s talk about your product',
  'Tu próximo listing puede empezar a verse como una marca líder.': 'Your next listing can start looking like a category-leading brand.',
  'Solicita una asesoría y cuéntanos qué quieres mejorar. Revisaremos tu caso y te responderemos con el enfoque más adecuado para tu producto.': 'Request a consultation and tell us what you want to improve. We will review your case and respond with the best approach for your product.',
  'Respuesta en 1–2 días laborables': 'Response within 1–2 business days',
  'Propuesta según tu proyecto': 'Proposal tailored to your project',
  'Trabajo remoto internacional': 'International remote service',
  'Nombre': 'Name',
  'Marca o producto': 'Brand or product',
  '¿Qué necesitas?': 'What do you need?',
  'Selecciona un servicio': 'Select a service',
  'Proyecto personalizado': 'Custom project',
  'Cuéntanos brevemente sobre el proyecto': 'Tell us briefly about the project',
  'Solicitar una asesoría': 'Request a consultation',
  'Esta asesoría te ayudará a definir con claridad lo que necesitas, resolver tus dudas y cotizar el proyecto antes de comenzar.': 'This consultation will help you clarify what you need, resolve questions and receive a project quote before getting started.',
  'Tus datos se enviarán a contact@skuviastudio.com exclusivamente para responder tu solicitud.': 'Your information will be sent to contact@skuviastudio.com solely to respond to your request.',
  'EXPLORAR': 'EXPLORE',
  'CONTACTO': 'CONTACT',
  'Skuvia Studio. Todos los derechos reservados.': 'Skuvia Studio. All rights reserved.',
  'Amazon y sus marcas son propiedad de sus respectivos titulares. Skuvia Studio es un estudio independiente.': 'Amazon and its trademarks belong to their respective owners. Skuvia Studio is an independent studio.',
  'PROYECTO SELECCIONADO': 'SELECTED PROJECT',
  'Navegación principal': 'Main navigation',
  'Skuvia Studio, inicio': 'Skuvia Studio, home',
  'Abrir menú': 'Open menu',
  'Beneficios principales': 'Main benefits',
  'Ejemplo de diseño de listing de Amazon para un sérum natural': 'Example of an Amazon listing design for a natural serum',
  'Sistema visual para ecommerce': 'Visual system for ecommerce',
  'Dirección visual completa para una marca moderna: website, social media, identidad y piezas de conversión.': 'Complete visual direction for a modern brand: website, social media, identity and conversion assets.',
  'Sistema visual de Skuvia aplicado a web, redes sociales y papelería': 'Skuvia visual system applied to web, social media and stationery',
  'Sistema modular de paquetes para imágenes de listing, desde una optimización puntual hasta un set premium completo.': 'A modular package system for listing images, from focused optimization to a complete premium set.',
  'Presentación visual de paquetes de diseño para listings de Amazon': 'Visual presentation of Amazon listing design packages',
  'Diseño estratégico de módulos A+ Content para explicar beneficios, responder objeciones y reforzar la percepción de marca dentro del listing.': 'Strategic A+ Content module design to explain benefits, answer objections and strengthen brand perception within the listing.',
  'Muestra de proyectos de Amazon A+ Content diseñados por Skuvia Studio': 'Selection of Amazon A+ Content projects designed by Skuvia Studio',
  'Lenguaje visual con tipografía geométrica, paleta de alto contraste, iconografía lineal y recursos modulares.': 'A visual language featuring geometric typography, a high-contrast palette, linear iconography and modular assets.',
  'Guía de identidad visual de Skuvia Studio': 'Skuvia Studio visual identity guide',
  'Servicios relacionados': 'Related services',
  'Nueva solicitud de asesoría — Skuvia Studio': 'New consultation request — Skuvia Studio',
  'Web de Skuvia Studio': 'Skuvia Studio website',
  'Español': 'English',
  'Tu nombre': 'Your name',
  'tu@marca.com': 'you@brand.com',
  'Nombre de tu marca o enlace del listing': 'Your brand name or listing link',
  '¿Qué vendes y qué quieres mejorar?': 'What do you sell and what would you like to improve?',
  'Cerrar proyecto': 'Close project',
  'Portfolio completo': 'Full portfolio',
  'Explora cada proyecto en detalle.': 'Explore every project in detail.',
  'Abre cualquier proyecto para conocer el enfoque, ver todas sus imágenes y descubrir cómo transformamos información de producto en una experiencia visual preparada para Amazon.': 'Open any project to learn about the approach, view every image and discover how we turn product information into a visual experience built for Amazon.',
  'Próximamente añadiremos nuevos proyectos.': 'New projects will be added soon.',
  'Descripción del proyecto': 'Project description',
  'Imágenes del proyecto': 'Project images',
  'Cerrar galería': 'Close gallery',
  'Ver portfolio': 'View portfolio',
  'Inicio': 'Home',
  '← Volver a la página principal': '← Back to the main page',
  'Portfolio para marcas de Amazon': 'Portfolio for Amazon brands',
  'Proyectos que convierten información en una': 'Projects that turn information into a',
  'experiencia de compra.': 'shopping experience.',
  'Una selección de Amazon Listing Images, A+ Content, Brand Story, Storefront y sistemas visuales construidos para comunicar con claridad, diferenciar productos y elevar su percepción.': 'A selection of Amazon Listing Images, A+ Content, Brand Story, Storefront and visual systems built to communicate clearly, differentiate products and elevate perception.',
  'Áreas del portfolio': 'Portfolio areas',
  '¿Tienes un proyecto en mente?': 'Have a project in mind?',
  'Hagamos que tu producto se sienta como la mejor opción.': 'Let’s make your product feel like the best choice.',
  'Cuéntanos qué vendes, qué quieres mejorar y qué necesita tu marca. Te ayudaremos a definir el alcance correcto antes de comenzar.': 'Tell us what you sell, what you want to improve and what your brand needs. We will help you define the right scope before getting started.',
  'Analizar mi listing': 'Analyze my listing',
  'Respuesta por escrito': 'Written response',
  'Sin llamada': 'No call',
  'Sin compromiso': 'No commitment',
  'Cómo trabaja Skuvia Studio': 'How Skuvia Studio works',
  'Especialización en Amazon': 'Amazon specialization',
  'Atención internacional': 'International service',
  'Proceso claro por escrito': 'Clear written process',
  'Servicio en español e inglés': 'Service in Spanish and English',
  '$100': '$100',
  '$125': '$125',
  '$400': '$400',
  'Entrega: JPG/PNG': 'Delivery: JPG/PNG',
  'Editables: consultar': 'Editable files: ask us',
  'Fotografía o 3D: aparte': 'Photography or 3D: separate quote',
  'Plazo definido en la propuesta': 'Timeline defined in the proposal',
  'Elegir Visual Essential': 'Choose Visual Essential',
  'Elegir Visual Premium': 'Choose Visual Premium',
  'Elegir Brand Experience': 'Choose Brand Experience',
  'Mini análisis de tu listing': 'Mini listing analysis',
  'Envíame tu ASIN y recibe una recomendación visual.': 'Send me your ASIN and receive a visual recommendation.',
  'Revisaremos tu producto y te indicaremos las tres oportunidades visuales más importantes, junto con una propuesta clara para desarrollar el proyecto.': 'We will review your product and identify the three most important visual opportunities, together with a clear proposal to develop the project.',
  'Sin llamada obligatoria': 'No mandatory call',
  'Recomendación, alcance y precio': 'Recommendation, scope and price',
  'WhatsApp (opcional)': 'WhatsApp (optional)',
  'Enlace del listing o ASIN': 'Listing link or ASIN',
  'Marca o producto (opcional)': 'Brand or product (optional)',
  'Comentario (opcional)': 'Comment (optional)',
  'Recibir análisis y cotización': 'Receive analysis and quote',
  'Te responderemos por escrito con una recomendación, alcance y precio. No necesitas agendar una llamada.': 'We will reply in writing with a recommendation, scope and price. You do not need to schedule a call.',
  'Nueva solicitud de análisis de listing — Skuvia Studio': 'New listing analysis request — Skuvia Studio',
  '+34 600 000 000': '+1 555 000 0000',
  'URL de Amazon o ASIN': 'Amazon URL or ASIN',
  'Nombre de tu marca o producto': 'Your brand or product name',
  '¿Hay algo específico que quieras mejorar?': 'Is there anything specific you would like to improve?',
  'Reseñas verificadas en Fiverr': 'Verified Fiverr reviews',
  'Confianza construida proyecto a proyecto.': 'Trust built one project at a time.',
  'Opiniones de clientes que contrataron servicios de Amazon Listing Images y A+ Content con Nerio Ramirez a través de Fiverr.': 'Feedback from clients who hired Nerio Ramirez for Amazon Listing Images and A+ Content services through Fiverr.',
  'Valoración del servicio en Fiverr': 'Fiverr service rating',
  '5 estrellas': '5 stars',
  '343 reseñas en este servicio · Seller Level 2': '343 reviews on this service · Level 2 Seller',
  'Ver servicio en Fiverr': 'View service on Fiverr',
  'Estados Unidos · 5/5': 'United States · 5/5',
  'Panamá · 5/5': 'Panama · 5/5',
  'España · 5/5': 'Spain · 5/5',
  'Suiza · 5/5': 'Switzerland · 5/5',
  'España · 4.7/5': 'Spain · 4.7/5',
  '5 de 5 estrellas': '5 out of 5 stars',
  '4.7 de 5 estrellas': '4.7 out of 5 stars',
  'Carrusel automático de reseñas de clientes': 'Automatic client review carousel',
  'Tras alinear la visión de la marca, destaca que trabajar juntos fue fácil y recomienda la colaboración.': 'After aligning on the brand vision, highlights that working together was easy and recommends the collaboration.',
  'Destaca que el trabajo superó sus expectativas por su profesionalidad, creatividad y calidad.': 'Highlights that the work exceeded expectations through its professionalism, creativity and quality.',
  'Describe una colaboración rápida, precisa y de excelente calidad, con una comprensión clara de sus necesidades.': 'Describes a fast, precise and high-quality collaboration, with a clear understanding of their needs.',
  'Destaca la creatividad y la capacidad de construir imágenes atractivas incluso para un producto complejo.': 'Highlights the creativity and ability to build compelling visuals even for a complex product.',
  'Valora la profesionalidad, la atención al detalle y la disposición para responder todas sus preguntas.': 'Values the professionalism, attention to detail and willingness to answer every question.',
  'Señala que sus indicaciones fueron comprendidas y que las imágenes y el A+ Content quedaron alineados con su visión.': 'Says the instructions were understood and that the images and A+ Content aligned with the intended vision.',
  'Valora la creatividad, la comunicación constante y la rapidez de respuesta durante el proyecto.': 'Values the creativity, consistent communication and fast responses throughout the project.',
  'Lo describe como un excelente profesional y expresa su intención de volver a trabajar con él.': 'Describes him as an excellent professional and expresses an intention to work with him again.',
  'Cliente recurrente que vuelve a valorar positivamente el trabajo realizado.': 'A returning client who once again rates the completed work positively.',
  'Reseña resumida desde Fiverr': 'Review summarized from Fiverr',
  '¿Prefieres contratar dentro de una plataforma conocida?': 'Would you rather hire through a familiar platform?',
  'Revisa el servicio completo, los paquetes y todas las opiniones directamente en Fiverr.': 'Review the full service, packages and all client feedback directly on Fiverr.',
  'Contratar de forma segura en Fiverr': 'Hire securely through Fiverr',
  'Valoración y número de reseñas visibles en Fiverr al momento de verificar esta página.': 'Rating and review count shown on Fiverr when this page was verified.'
});

const pageMetadata = {
  es: {
    title: 'Diseño y optimización de listings de Amazon | Skuvia Studio',
    description: 'Skuvia Studio crea y optimiza imágenes para listings de Amazon, A+ Content, Brand Story y Amazon Storefront con estrategia visual enfocada en mejorar CTR, conversión y percepción de marca.',
    keywords: 'Amazon listing images, diseño listing Amazon, A+ Content Amazon, Amazon Brand Story, Amazon Storefront, optimización Amazon listing, imágenes infográficas Amazon, diseño ecommerce',
    ogTitle: 'Skuvia Studio | Diseño estratégico para marcas de Amazon',
    ogDescription: 'Visuales premium y estrategia para listings, A+ Content, Brand Story y Amazon Storefront.'
  },
  en: {
    title: 'Amazon Listing Design & Optimization | Skuvia Studio',
    description: 'Skuvia Studio creates and optimizes Amazon listing images, A+ Content, Brand Story and Amazon Storefronts with a conversion-focused visual strategy.',
    keywords: 'Amazon listing images, Amazon listing design, Amazon A+ Content, Amazon Brand Story, Amazon Storefront, Amazon listing optimization, ecommerce design',
    ogTitle: 'Skuvia Studio | Strategic Design for Amazon Brands',
    ogDescription: 'Premium visuals and strategy for Amazon listings, A+ Content, Brand Story and Storefronts.'
  }
};

const portfolioPageMetadata = {
  es: {
    title: 'Portfolio de diseño para Amazon | Skuvia Studio',
    description: 'Explora proyectos de Amazon Listing Images, A+ Content, Brand Story, Storefront y dirección visual creados por Skuvia Studio.',
    keywords: 'portfolio Amazon listing images, proyectos A+ Content, diseño Amazon Storefront, Brand Story Amazon, diseño ecommerce',
    ogTitle: 'Portfolio de Skuvia Studio | Diseño estratégico para Amazon',
    ogDescription: 'Casos de diseño visual para listings, A+ Content, Brand Story y Amazon Storefront.'
  },
  en: {
    title: 'Amazon Design Portfolio | Skuvia Studio',
    description: 'Explore Amazon Listing Images, A+ Content, Brand Story, Storefront and visual direction projects created by Skuvia Studio.',
    keywords: 'Amazon listing images portfolio, A+ Content projects, Amazon Storefront design, Amazon Brand Story, ecommerce design',
    ogTitle: 'Skuvia Studio Portfolio | Strategic Design for Amazon',
    ogDescription: 'Visual design case studies for listings, A+ Content, Brand Story and Amazon Storefront.'
  }
};

const formMessages = {
  es: {
    button: 'Recibir análisis y cotización <span>↗</span>',
    sendingButton: 'Enviando…',
    sending: 'Estamos enviando tu listing para revisión.',
    success: '¡Solicitud enviada! Revisaremos tu listing y te responderemos por escrito.',
    successButton: 'Solicitud enviada <span>✓</span>',
    failure: 'No pudimos enviar la solicitud desde esta red. <a href="mailto:contact@skuviastudio.com">Escríbenos directamente</a>.',
    genericError: 'No se pudo enviar la solicitud.'
  },
  en: {
    button: 'Receive analysis and quote <span>↗</span>',
    sendingButton: 'Sending…',
    sending: 'We are sending your listing for review.',
    success: 'Request sent! We will review your listing and reply in writing.',
    successButton: 'Request sent <span>✓</span>',
    failure: 'We could not send the request from this network. <a href="mailto:contact@skuviastudio.com">Email us directly</a>.',
    genericError: 'The request could not be sent.'
  }
};

const languageGate = document.querySelector('#language-gate');
const languageKey = 'skuvia-language';
const ignoredForTranslation = (element) => element?.closest('[data-i18n-ignore], script, style, noscript');
const textRecords = [];
const textWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
  acceptNode(node) {
    if (!node.nodeValue.trim() || ignoredForTranslation(node.parentElement)) return NodeFilter.FILTER_REJECT;
    return NodeFilter.FILTER_ACCEPT;
  }
});

while (textWalker.nextNode()) {
  textRecords.push({ node: textWalker.currentNode, es: textWalker.currentNode.nodeValue });
}

const attributeRecords = [];
const translatedAttributes = ['alt', 'aria-label', 'placeholder', 'data-title', 'data-description', 'value'];
document.querySelectorAll(translatedAttributes.map((attribute) => `[${attribute}]`).join(',')).forEach((element) => {
  if (ignoredForTranslation(element)) return;
  translatedAttributes.forEach((attribute) => {
    if (element.hasAttribute(attribute)) attributeRecords.push({ element, attribute, es: element.getAttribute(attribute) });
  });
});

let currentLanguage = 'es';

const translateTextRecord = (record, language) => {
  if (language === 'es') return record.es;
  const trimmed = record.es.trim();
  const translated = englishTranslations[trimmed];
  if (!translated) return record.es;
  const leading = record.es.match(/^\s*/)?.[0] || '';
  const trailing = record.es.match(/\s*$/)?.[0] || '';
  return `${leading}${translated}${trailing}`;
};

const setMetaContent = (selector, content) => document.querySelector(selector)?.setAttribute('content', content);

const renderLanguage = (language) => {
  currentLanguage = language === 'en' ? 'en' : 'es';
  document.documentElement.lang = currentLanguage;

  textRecords.forEach((record) => {
    record.node.nodeValue = translateTextRecord(record, currentLanguage);
  });

  attributeRecords.forEach((record) => {
    const value = currentLanguage === 'en' ? (englishTranslations[record.es] || record.es) : record.es;
    record.element.setAttribute(record.attribute, value);
  });

  const metadataCollection = document.body.dataset.page === 'portfolio' ? portfolioPageMetadata : pageMetadata;
  const metadata = metadataCollection[currentLanguage];
  document.title = metadata.title;
  setMetaContent('meta[name="description"]', metadata.description);
  setMetaContent('meta[name="keywords"]', metadata.keywords);
  setMetaContent('meta[property="og:title"]', metadata.ogTitle);
  setMetaContent('meta[property="og:description"]', metadata.ogDescription);
  setMetaContent('meta[property="og:locale"]', currentLanguage === 'en' ? 'en_US' : 'es_ES');
  setMetaContent('meta[property="og:locale:alternate"]', currentLanguage === 'en' ? 'es_ES' : 'en_US');

  document.querySelectorAll('[data-set-language]').forEach((button) => {
    const active = button.dataset.setLanguage === currentLanguage;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });

  const status = document.querySelector('#form-status');
  if (status) {
    status.textContent = '';
    status.className = 'form-status';
  }

  const submitButton = document.querySelector('#contact-form button[type="submit"]');
  if (submitButton && !submitButton.disabled) submitButton.innerHTML = formMessages[currentLanguage].button;

  window.dispatchEvent(new CustomEvent('skuvia:languagechange', {
    detail: { language: currentLanguage }
  }));
};

const saveLanguage = (language) => {
  try { window.localStorage.setItem(languageKey, language); } catch (error) { /* Storage may be unavailable locally. */ }
};

const chooseLanguage = (language) => {
  renderLanguage(language);
  saveLanguage(currentLanguage);
  if (languageGate) languageGate.hidden = true;
  document.body.classList.remove('language-pending');
  document.body.classList.remove('menu-open');
  document.querySelector('.nav-links')?.classList.remove('is-open');
  document.querySelector('.menu-toggle')?.setAttribute('aria-expanded', 'false');
  const openDialog = document.querySelector('#project-dialog[open]');
  if (openDialog) openDialog.close();
  const openPortfolioDialog = document.querySelector('#portfolio-detail-dialog[open]');
  if (openPortfolioDialog) openPortfolioDialog.close();
};

document.querySelectorAll('[data-set-language]').forEach((button) => {
  button.addEventListener('click', () => chooseLanguage(button.dataset.setLanguage));
});

let savedLanguage = null;
try { savedLanguage = window.localStorage.getItem(languageKey); } catch (error) { /* Use the browser language. */ }

if (savedLanguage === 'es' || savedLanguage === 'en') {
  chooseLanguage(savedLanguage);
} else {
  const browserLanguages = Array.isArray(navigator.languages) && navigator.languages.length
    ? navigator.languages
    : [navigator.language || 'en'];
  const browserLanguage = browserLanguages.some((language) => language.toLowerCase().startsWith('es')) ? 'es' : 'en';
  chooseLanguage(browserLanguage);
}

const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const closeMenu = () => {
  menuButton?.setAttribute('aria-expanded', 'false');
  navLinks?.classList.remove('is-open');
  document.body.classList.remove('menu-open');
};

menuButton?.addEventListener('click', () => {
  const willOpen = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(willOpen));
  navLinks.classList.toggle('is-open', willOpen);
  document.body.classList.toggle('menu-open', willOpen);
});

navLinks?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 126);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

const revealItems = document.querySelectorAll('.reveal');
revealItems.forEach((item) => {
  const delay = item.dataset.delay || 0;
  item.style.setProperty('--delay', `${delay}ms`);
});

if (!reducedMotion && 'IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px' });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const visual = document.querySelector('.hero-visual');
if (visual && !reducedMotion && window.matchMedia('(pointer: fine)').matches) {
  visual.addEventListener('pointermove', (event) => {
    const bounds = visual.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    visual.style.transform = `perspective(900px) rotateY(${x * 2.5}deg) rotateX(${y * -2.5}deg)`;
  });
  visual.addEventListener('pointerleave', () => { visual.style.transform = ''; });
}

const dialog = document.querySelector('#project-dialog');
const dialogImage = dialog?.querySelector('.dialog-image img');
const dialogTitle = dialog?.querySelector('#dialog-title');
const dialogDescription = dialog?.querySelector('#dialog-description');

document.querySelectorAll('.project').forEach((project) => {
  project.addEventListener('click', () => {
    if (!dialog || !dialogImage || !dialogTitle || !dialogDescription) return;
    dialogImage.src = project.dataset.image;
    dialogImage.alt = project.dataset.title;
    dialogTitle.textContent = project.dataset.title;
    dialogDescription.textContent = project.dataset.description;
    dialog.showModal();
  });
});

dialog?.querySelector('.dialog-close')?.addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', (event) => {
  const rect = dialog.getBoundingClientRect();
  const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
  if (outside) dialog.close();
});

const portfolioGallery = document.querySelector('#portfolio-gallery');
const portfolioEmpty = document.querySelector('#portfolio-empty');
const portfolioDialog = document.querySelector('#portfolio-detail-dialog');
const portfolioDetailCover = document.querySelector('#portfolio-detail-cover');
const portfolioDetailCategory = document.querySelector('#portfolio-detail-category');
const portfolioDetailTitle = document.querySelector('#portfolio-detail-title');
const portfolioDetailSummary = document.querySelector('#portfolio-detail-summary');
const portfolioDetailDescription = document.querySelector('#portfolio-detail-description');
const portfolioDetailImages = document.querySelector('#portfolio-detail-images');

const portfolioProjects = Array.isArray(window.SKUVIA_PORTFOLIO)
  ? [...window.SKUVIA_PORTFOLIO].sort((a, b) => String(b.createdAt || '').localeCompare(String(a.createdAt || '')))
  : [];

const portfolioText = (value) => {
  if (typeof value === 'string') return value;
  if (!value || typeof value !== 'object') return '';
  return value[currentLanguage] || value.es || value.en || '';
};

const trackConversion = (eventName, parameters = {}) => {
  const eventData = {
    event: eventName,
    language: currentLanguage,
    page: document.body.dataset.page || 'home',
    ...parameters
  };

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, eventData);
  } else {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(eventData);
  }

  window.dispatchEvent(new CustomEvent('skuvia:conversion', { detail: eventData }));
};

const openPortfolioProject = (project) => {
  if (!portfolioDialog || !portfolioDetailCover || !portfolioDetailTitle || !portfolioDetailImages) return;

  const title = portfolioText(project.title);
  portfolioDetailCover.src = project.cover || '';
  portfolioDetailCover.alt = title;
  portfolioDetailCategory.textContent = portfolioText(project.category);
  portfolioDetailTitle.textContent = title;
  portfolioDetailSummary.textContent = portfolioText(project.summary);
  portfolioDetailDescription.textContent = portfolioText(project.description);
  portfolioDetailImages.replaceChildren();

  const projectImages = Array.isArray(project.images) ? project.images.filter(Boolean) : [];
  const imagesToRender = projectImages.length ? projectImages : [project.cover].filter(Boolean);

  imagesToRender.forEach((source, index) => {
    const frame = document.createElement('figure');
    frame.className = 'portfolio-detail-image';
    const image = document.createElement('img');
    image.src = source;
    image.alt = `${title} — ${currentLanguage === 'en' ? 'project image' : 'imagen del proyecto'} ${index + 1}`;
    image.loading = index === 0 ? 'eager' : 'lazy';
    frame.append(image);
    portfolioDetailImages.append(frame);
  });

  portfolioDialog.showModal();
  portfolioDialog.scrollTop = 0;
  trackConversion('portfolio_project_opened', { project_id: project.id, project_title: title });
};

const renderPortfolioGallery = () => {
  if (!portfolioGallery || !portfolioEmpty) return;
  portfolioGallery.replaceChildren();
  portfolioEmpty.hidden = portfolioProjects.length > 0;

  portfolioProjects.forEach((project) => {
    const title = portfolioText(project.title);
    const card = document.createElement('button');
    card.className = 'portfolio-gallery-card';
    card.type = 'button';
    card.setAttribute('aria-label', `${currentLanguage === 'en' ? 'Open project' : 'Abrir proyecto'}: ${title}`);

    const cover = document.createElement('span');
    cover.className = 'portfolio-gallery-cover';
    const image = document.createElement('img');
    image.src = project.cover || '';
    image.alt = title;
    image.loading = 'lazy';
    cover.append(image);

    const copy = document.createElement('div');
    copy.className = 'portfolio-gallery-copy';
    const category = document.createElement('small');
    category.textContent = portfolioText(project.category);
    const heading = document.createElement('strong');
    heading.textContent = title;
    const summary = document.createElement('p');
    summary.textContent = portfolioText(project.summary);
    const action = document.createElement('span');
    action.textContent = currentLanguage === 'en' ? 'Open project' : 'Abrir proyecto';
    copy.append(category, heading, summary, action);
    card.append(cover, copy);
    card.addEventListener('click', () => openPortfolioProject(project));
    portfolioGallery.append(card);
  });
};

portfolioDialog?.querySelector('.portfolio-detail-close')?.addEventListener('click', () => portfolioDialog.close());
portfolioDialog?.addEventListener('click', (event) => {
  const rect = portfolioDialog.getBoundingClientRect();
  const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
  if (outside) portfolioDialog.close();
});

window.addEventListener('skuvia:languagechange', renderPortfolioGallery);
renderPortfolioGallery();

document.querySelectorAll('[data-track]').forEach((element) => {
  element.addEventListener('click', () => trackConversion(element.dataset.track));
});

document.querySelectorAll('a[href="portfolio.html"]').forEach((link) => {
  if (link.dataset.track) return;
  link.addEventListener('click', () => trackConversion('portfolio_open'));
});

const serviceSelect = document.querySelector('#service-select');
document.querySelectorAll('[data-package]').forEach((link) => {
  link.addEventListener('click', () => {
    if (serviceSelect) serviceSelect.value = link.dataset.package;
    trackConversion('package_clicked', { package_name: link.dataset.package });
  });
});

const contactForm = document.querySelector('#contact-form');
let contactFormStarted = false;

contactForm?.addEventListener('focusin', () => {
  if (contactFormStarted) return;
  contactFormStarted = true;
  trackConversion('form_started');
}, { once: true });

contactForm?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const form = event.currentTarget;
  const button = form.querySelector('button[type="submit"]');
  const status = form.querySelector('#form-status');
  const messages = formMessages[currentLanguage];
  trackConversion('form_submit_attempted', { service: form.elements.service?.value || '' });

  button.disabled = true;
  button.textContent = messages.sendingButton;
  status.textContent = messages.sending;
  status.className = 'form-status is-sending';

  try {
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    const response = await fetch(form.action, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(payload)
    });
    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || messages.genericError);
    }

    form.reset();
    trackConversion('form_submitted', { service: payload.service || '' });
    status.textContent = messages.success;
    status.className = 'form-status is-success';
    button.innerHTML = messages.successButton;

    window.setTimeout(() => {
      button.innerHTML = formMessages[currentLanguage].button;
    }, 6000);
  } catch (error) {
    status.innerHTML = messages.failure;
    status.className = 'form-status is-error';
    button.innerHTML = formMessages[currentLanguage].button;
  } finally {
    button.disabled = false;
  }
});

document.querySelector('#year').textContent = new Date().getFullYear();
