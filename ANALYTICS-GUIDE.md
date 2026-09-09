# Medición de conversiones de Skuvia Studio

La web ya genera eventos de conversión preparados para Google Analytics 4 o Google Tag Manager. No se ha añadido ningún ID de medición porque debe pertenecer a la cuenta de Skuvia Studio.

## Eventos disponibles

- `analyze_listing`: clic en “Analizar mi listing”.
- `quote_request`: clic en “Solicitar cotización”; puede incluir el servicio elegido.
- `email_click`: clic en el correo de contacto.
- `fiverr_click`: clic en un enlace que abre el servicio de Skuvia Studio en Fiverr.
- `portfolio_project_opened`: apertura de un proyecto añadido desde el administrador; incluye únicamente su identificador.
- `pricing_view`: visita a la página de precios.
- `language_change`: cambio de idioma; incluye solo el idioma de destino.
- `service_selected`: selección de servicio; incluye el nombre de servicio, nunca los datos del cliente.
- `form_started`: primera interacción con el formulario.
- `form_submit`: clic en el botón para enviar.
- `form_submit_attempted`: formulario válido enviado al proveedor; incluye el servicio elegido.
- `form_submitted`: envío confirmado correctamente; incluye el servicio elegido.

## Activarlo en Google Analytics

1. Crea o abre la propiedad GA4 de `skuviastudio.com`.
2. Copia el ID de medición, con formato `G-XXXXXXXXXX`.
3. Añade el Google tag oficial dentro de la función `head()` de `scripts/build-site.mjs` y ejecuta `npm run build` para aplicarlo a todas las páginas.
4. En GA4, marca como eventos clave `form_submitted` y, si lo deseas, `analyze_listing`.
5. Comprueba los eventos desde la vista DebugView antes de tomar decisiones con los datos.

El código también publica cada conversión en `window.dataLayer` y emite `skuvia:conversion` en el navegador, por lo que puede utilizarse con Google Tag Manager sin modificar los botones existentes. Ningún evento incluye email, teléfono, WhatsApp, ASIN ni el contenido del formulario.
