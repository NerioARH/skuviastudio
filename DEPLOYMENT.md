# Despliegue de Skuvia Studio en Cloudflare Pages

El sitio es estático y no requiere migrar a otro framework. Los archivos `_redirects` y `_headers` deben permanecer en la raíz publicada.

## Configuración recomendada

- Directorio raíz del proyecto: `outputs/skuvia-website`
- Framework preset: `None`
- Comando de build: `npm run build`
- Directorio de salida: `dist`
- Versión de Node.js: 20 o superior

Para una carga directa, publica únicamente la carpeta `outputs/skuvia-website/dist` que genera el comando de build.

## Dominio y redirecciones

- Host canónico: `https://skuviastudio.com`
- `https://www.skuviastudio.com/*` redirige al dominio raíz con estado 301.
- `/` redirige a `/es/` con estado 301.
- Las rutas sin barra final redirigen a la versión con barra final.
- `portfolio.html` redirige al portfolio español nuevo.

Antes de desplegar, confirma en Cloudflare que tanto el dominio raíz como `www` están asociados al mismo proyecto de Pages. No cambies DNS si ya están correctamente conectados.

## Verificación previa

Desde la raíz del sitio:

```bash
npm run build
npm run check
```

## Verificación posterior al despliegue

1. Abre `/es/`, `/en/`, una página de servicio, un caso, un artículo, `/robots.txt` y `/sitemap.xml`.
2. Comprueba que `www` y `/` respondan con redirección permanente.
3. Envía una solicitud de prueba claramente identificada y confirma que llega a `contact@skuviastudio.com`.
4. Comprueba el selector de idioma en una página interior.
5. Revisa la consola del navegador y los eventos existentes de analytics.

## Google Search Console

1. Envía `https://skuviastudio.com/sitemap.xml`.
2. Solicita indexación para `/es/`, `/en/`, los servicios, precios, auditoría y los dos artículos prioritarios.
3. Revisa el canonical seleccionado por Google y confirma que usa el dominio raíz.
4. Vigila páginas indexadas, excluidas y errores de rastreo.
5. Separa consultas en español e inglés al analizar rendimiento.
6. Controla impresiones, clics, CTR orgánico y solicitudes recibidas; no atribuyas conversiones solo a una métrica aislada.
