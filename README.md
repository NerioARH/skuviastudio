# Skuvia Studio website

Sitio estático bilingüe y multipágina preparado para Cloudflare Pages.

## Comandos

- `npm run build`: regenera las páginas públicas, sitemap, robots, headers y redirecciones.
- `npm run check`: valida rutas, metadatos, un único H1, hreflang, canonical, enlaces, imágenes, JSON-LD y la integración del formulario.

El contenido público se genera desde `scripts/build-site.mjs`. Los estilos e interacciones compartidos están en `site.css` y `site.js`. Los recursos optimizados se conservan en `assets/` junto a los originales.

La carpeta `admin/` y `portfolio-data.js` mantienen la herramienta existente para añadir proyectos de galería. Los tres casos editoriales principales tienen páginas HTML indexables independientes.

Consulta `DEPLOYMENT.md` antes de publicar.
