# Cómo administrar el portfolio de Skuvia Studio

La página pública toma los proyectos de `portfolio-data.js`. El panel incluido en `admin/index.html` permite actualizar ese archivo y guardar imágenes dentro de `assets/portfolio` sin editar código.

## Añadir un proyecto

1. Abre `admin/index.html` con **Google Chrome** o **Microsoft Edge**.
2. Pulsa **Seleccionar carpeta**.
3. Selecciona la carpeta completa `skuvia-website`, donde están `index.html`, `portfolio-data.js`, `site.css` y `site.js`.
4. Completa el título, la categoría, el resumen y la descripción en español e inglés.
5. Selecciona una portada y, si quieres, hasta 20 imágenes para la vista completa del proyecto.
6. Pulsa **Publicar proyecto**.
7. Ejecuta `npm run build` y abre o actualiza `/es/portfolio/` o `/en/portfolio/` para comprobar la galería pública.

El panel crea automáticamente una carpeta para cada proyecto dentro de `assets/portfolio` y registra sus rutas en `portfolio-data.js`.

## Eliminar un proyecto

1. Conecta primero la carpeta `skuvia-website`.
2. En la columna **Proyectos**, pulsa **Eliminar proyecto**.
3. Confirma la acción.

Los proyectos añadidos desde el panel eliminan también su carpeta de imágenes. En los proyectos de demostración originales solo se elimina la entrada de la galería para no borrar recursos que usa otra parte de la página.

## Publicar los cambios en internet

Este administrador modifica la copia local de la web. Para reflejar los cambios en un hosting, ejecuta `npm run build` y publica nuevamente la carpeta **`dist`**. El build incluye `portfolio-data.js` y cualquier imagen añadida dentro de `assets/portfolio`.

El panel no necesita contraseña porque no está conectado a un servidor y solo puede modificar una carpeta que selecciones manualmente en tu propio equipo. Si en el futuro necesitas publicar desde cualquier dispositivo directamente en la web, será necesario añadir autenticación, base de datos y almacenamiento de imágenes.

## Recomendaciones para las imágenes

- Usa JPG o WebP para fotografías y PNG cuando necesites máxima nitidez en gráficos.
- Procura que cada archivo pese menos de 2–3 MB para que la web cargue rápido, aunque el panel permite hasta 12 MB.
- Usa la misma proporción visual en las portadas para que la galería se vea más consistente.
- Ordena los archivos antes de seleccionarlos; el panel conserva el orden recibido por el navegador.
