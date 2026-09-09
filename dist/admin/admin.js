const selectFolderButton = document.querySelector('#select-folder');
const connectionStatus = document.querySelector('#connection-status');
const projectForm = document.querySelector('#project-form');
const publishButton = document.querySelector('#publish-project');
const adminStatus = document.querySelector('#admin-status');
const projectList = document.querySelector('#admin-project-list');
const projectCount = document.querySelector('#project-count');

let rootHandle = null;
let projects = JSON.parse(JSON.stringify(Array.isArray(window.SKUVIA_PORTFOLIO) ? window.SKUVIA_PORTFOLIO : []));

const setStatus = (element, message, state = '') => {
  element.textContent = message;
  element.className = element === connectionStatus ? 'connection-status' : 'form-status';
  if (state) element.classList.add(`is-${state}`);
};

const localizedText = (value, language = 'es') => {
  if (typeof value === 'string') return value;
  return value?.[language] || value?.es || value?.en || '';
};

const createElement = (tag, className, text) => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
};

const renderProjects = () => {
  projectList.replaceChildren();
  projectCount.textContent = String(projects.length);

  if (!projects.length) {
    projectList.append(createElement('p', 'empty-projects', 'Aún no hay proyectos publicados.'));
    return;
  }

  [...projects]
    .sort((a, b) => String(b.createdAt || '').localeCompare(String(a.createdAt || '')))
    .forEach((project) => {
      const card = createElement('article', 'admin-project');
      const image = document.createElement('img');
      image.src = `../${project.cover}`;
      image.alt = localizedText(project.title);
      image.loading = 'lazy';

      const copy = createElement('div', 'admin-project-copy');
      copy.append(
        createElement('small', '', localizedText(project.category)),
        createElement('strong', '', localizedText(project.title))
      );

      const removeButton = createElement('button', 'delete-project', 'Eliminar proyecto');
      removeButton.type = 'button';
      removeButton.disabled = !rootHandle;
      removeButton.addEventListener('click', () => deleteProject(project));
      copy.append(removeButton);
      card.append(image, copy);
      projectList.append(card);
    });
};

const verifyWebsiteFolder = async (handle) => {
  await handle.getFileHandle('index.html');
  await handle.getFileHandle('portfolio-data.js');
};

selectFolderButton.addEventListener('click', async () => {
  if (!('showDirectoryPicker' in window)) {
    setStatus(connectionStatus, 'Este navegador no admite acceso a carpetas. Abre este panel en Google Chrome o Microsoft Edge.', 'error');
    return;
  }

  try {
    const selectedHandle = await window.showDirectoryPicker({ mode: 'readwrite' });
    await verifyWebsiteFolder(selectedHandle);
    rootHandle = selectedHandle;
    publishButton.disabled = false;
    selectFolderButton.firstChild.textContent = 'Carpeta conectada ';
    setStatus(connectionStatus, `Conectada: ${rootHandle.name}. Ya puedes publicar o eliminar proyectos.`, 'connected');
    renderProjects();
  } catch (error) {
    if (error.name === 'AbortError') return;
    rootHandle = null;
    publishButton.disabled = true;
    setStatus(connectionStatus, 'La carpeta no es válida. Selecciona la carpeta skuvia-website que contiene index.html.', 'error');
  }
});

const slugify = (value) => value
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '')
  .slice(0, 55) || 'proyecto';

const fileExtension = (file) => {
  const mimeExtensions = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' };
  return mimeExtensions[file.type] || file.name.split('.').pop().toLowerCase();
};

const validateImages = (cover, gallery) => {
  const files = [cover, ...gallery];
  const supported = ['image/jpeg', 'image/png', 'image/webp'];
  if (!cover) throw new Error('Selecciona una imagen de portada.');
  if (gallery.length > 20) throw new Error('La galería admite un máximo de 20 imágenes.');
  files.forEach((file) => {
    if (!supported.includes(file.type)) throw new Error(`Formato no permitido: ${file.name}`);
    if (file.size > 12 * 1024 * 1024) throw new Error(`${file.name} supera el límite de 12 MB.`);
  });
};

const writeFile = async (directoryHandle, fileName, content) => {
  const fileHandle = await directoryHandle.getFileHandle(fileName, { create: true });
  const writable = await fileHandle.createWritable();
  await writable.write(content);
  await writable.close();
};

const writePortfolioData = async () => {
  const serialized = JSON.stringify(projects, null, 2)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
  await writeFile(rootHandle, 'portfolio-data.js', `window.SKUVIA_PORTFOLIO = ${serialized};\n`);
};

const uniqueProjectId = (title) => {
  const base = slugify(title);
  let candidate = base;
  let suffix = 2;
  while (projects.some((project) => project.id === candidate)) {
    candidate = `${base}-${suffix}`;
    suffix += 1;
  }
  return candidate;
};

projectForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!rootHandle) {
    setStatus(adminStatus, 'Primero selecciona la carpeta de la web.', 'error');
    return;
  }

  const data = new FormData(projectForm);
  const cover = data.get('cover');
  const gallery = data.getAll('gallery').filter((file) => file.size > 0);
  let insertedProjectId = null;

  try {
    validateImages(cover, gallery);
    publishButton.disabled = true;
    setStatus(adminStatus, 'Guardando imágenes y actualizando el portfolio…', 'working');

    const id = uniqueProjectId(data.get('titleEs'));
    const assetsHandle = await rootHandle.getDirectoryHandle('assets', { create: true });
    const portfolioHandle = await assetsHandle.getDirectoryHandle('portfolio', { create: true });
    const projectHandle = await portfolioHandle.getDirectoryHandle(id, { create: true });

    const coverName = `cover.${fileExtension(cover)}`;
    await writeFile(projectHandle, coverName, cover);

    const galleryPaths = [];
    for (let index = 0; index < gallery.length; index += 1) {
      const file = gallery[index];
      const imageName = `image-${String(index + 1).padStart(2, '0')}.${fileExtension(file)}`;
      await writeFile(projectHandle, imageName, file);
      galleryPaths.push(`assets/portfolio/${id}/${imageName}`);
    }

    const newProject = {
      id,
      createdAt: new Date().toISOString(),
      category: { es: data.get('categoryEs').trim(), en: data.get('categoryEn').trim() },
      title: { es: data.get('titleEs').trim(), en: data.get('titleEn').trim() },
      summary: { es: data.get('summaryEs').trim(), en: data.get('summaryEn').trim() },
      description: { es: data.get('descriptionEs').trim(), en: data.get('descriptionEn').trim() },
      cover: `assets/portfolio/${id}/${coverName}`,
      images: galleryPaths.length ? galleryPaths : [`assets/portfolio/${id}/${coverName}`]
    };
    projects.push(newProject);
    insertedProjectId = id;

    await writePortfolioData();
    insertedProjectId = null;
    projectForm.reset();
    renderProjects();
    setStatus(adminStatus, 'Proyecto publicado. Abre o actualiza portfolio.html para verlo en la galería.', 'success');
  } catch (error) {
    if (insertedProjectId) projects = projects.filter((project) => project.id !== insertedProjectId);
    setStatus(adminStatus, error.message || 'No se pudo guardar el proyecto.', 'error');
  } finally {
    publishButton.disabled = !rootHandle;
  }
});

async function deleteProject(project) {
  if (!rootHandle) return;
  const confirmed = window.confirm(`¿Eliminar “${localizedText(project.title)}” del portfolio?`);
  if (!confirmed) return;

  try {
    setStatus(adminStatus, 'Eliminando proyecto…', 'working');
    const projectPathPrefix = `assets/portfolio/${project.id}/`;
    const ownsUploadedAssets = String(project.cover || '').startsWith(projectPathPrefix);

    if (ownsUploadedAssets) {
      const assetsHandle = await rootHandle.getDirectoryHandle('assets');
      const portfolioHandle = await assetsHandle.getDirectoryHandle('portfolio');
      await portfolioHandle.removeEntry(project.id, { recursive: true });
    }

    projects = projects.filter((item) => item.id !== project.id);
    await writePortfolioData();
    renderProjects();
    setStatus(adminStatus, 'Proyecto eliminado del portfolio.', 'success');
  } catch (error) {
    setStatus(adminStatus, error.message || 'No se pudo eliminar el proyecto.', 'error');
  }
}

renderProjects();
