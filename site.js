(() => {
  'use strict';

  const language = document.documentElement.lang === 'en' ? 'en' : 'es';
  const page = document.body.dataset.page || window.location.pathname;

  const trackConversion = (eventName, parameters = {}) => {
    const eventData = { event: eventName, language, page, path: window.location.pathname, ...parameters };
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, eventData);
    } else {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(eventData);
    }
    window.dispatchEvent(new CustomEvent('skuvia:conversion', { detail: eventData }));
  };

  window.SkuviaTracking = Object.freeze({ track: trackConversion });

  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('[data-nav]');

  const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 80);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  menuButton?.addEventListener('click', () => {
    const open = !navLinks?.classList.contains('is-open');
    navLinks?.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
  });

  navLinks?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      document.body.classList.remove('menu-open');
      menuButton?.setAttribute('aria-expanded', 'false');
    });
  });

  const reveals = [...document.querySelectorAll('.reveal')];
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: .12, rootMargin: '0px 0px -40px' });
    reveals.forEach((element) => observer.observe(element));
  } else {
    reveals.forEach((element) => element.classList.add('is-visible'));
  }

  const testimonialTrack = document.querySelector('[data-review-track]');
  if (testimonialTrack && !testimonialTrack.dataset.cloned) {
    [...testimonialTrack.children].forEach((card) => {
      const clone = card.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      testimonialTrack.append(clone);
    });
    testimonialTrack.dataset.cloned = 'true';
  }

  document.querySelectorAll('[data-track]').forEach((element) => {
    element.addEventListener('click', () => {
      if (element.matches('[data-language-switch]')) return;
      const parameters = {};
      if (element.dataset.service) parameters.service = element.dataset.service;
      if (element.dataset.package) parameters.package_name = element.dataset.package;
      trackConversion(element.dataset.track, parameters);
    });
  });

  document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
    if (link.dataset.track) return;
    link.addEventListener('click', () => trackConversion('email_click'));
  });

  document.querySelectorAll('[data-language-switch]').forEach((link) => {
    link.addEventListener('click', () => trackConversion('language_change', { target_language: link.getAttribute('hreflang') }));
  });

  if (/\/(precios|pricing)\/$/.test(window.location.pathname)) trackConversion('pricing_view');

  const serviceSelect = document.querySelector('#service-select');
  const requestedService = new URLSearchParams(window.location.search).get('service');
  if (serviceSelect && requestedService && [...serviceSelect.options].some((option) => option.value === requestedService)) {
    serviceSelect.value = requestedService;
  }
  serviceSelect?.addEventListener('change', () => {
    if (serviceSelect.value) trackConversion('service_selected', { service: serviceSelect.value });
  });

  const messages = {
    es: {
      sendingButton: 'Enviando…',
      sending: 'Estamos enviando tu listing para revisión.',
      success: '¡Solicitud enviada! Revisaremos tu listing y te responderemos por escrito.',
      successButton: 'Solicitud enviada ✓',
      button: 'Recibir análisis y cotización ↗',
      failure: 'No pudimos enviar la solicitud desde esta red. <a href="mailto:contact@skuviastudio.com">Escríbenos directamente</a>.',
      genericError: 'No se pudo enviar la solicitud.'
    },
    en: {
      sendingButton: 'Sending…',
      sending: 'We are sending your listing for review.',
      success: 'Request sent! We will review your listing and reply in writing.',
      successButton: 'Request sent ✓',
      button: 'Receive analysis and quote ↗',
      failure: 'We could not send the request from this network. <a href="mailto:contact@skuviastudio.com">Email us directly</a>.',
      genericError: 'The request could not be sent.'
    }
  };

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
    const copy = messages[language];
    const service = form.elements.service?.value || '';
    trackConversion('form_submit_attempted', { service });

    button.disabled = true;
    button.textContent = copy.sendingButton;
    status.textContent = copy.sending;
    status.className = 'form-status is-sending';

    try {
      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || copy.genericError);

      form.reset();
      trackConversion('form_submitted', { service });
      status.textContent = copy.success;
      status.className = 'form-status is-success';
      button.textContent = copy.successButton;
      window.setTimeout(() => { button.textContent = copy.button; }, 6000);
    } catch (error) {
      status.innerHTML = copy.failure;
      status.className = 'form-status is-error';
      button.textContent = copy.button;
    } finally {
      button.disabled = false;
    }
  });

  const portfolioGrid = document.querySelector('[data-dynamic-portfolio]');
  const knownProjects = new Set(['amazon-a-plus-content', 'amazon-listing-visuals', 'skuvia-brand-system']);
  const dialog = document.querySelector('#portfolio-dialog');

  const localized = (value) => typeof value === 'string' ? value : (value?.[language] || value?.es || value?.en || '');

  const openProject = (project) => {
    if (!dialog) return;
    const title = localized(project.title);
    const content = dialog.querySelector('[data-dialog-content]');
    content.replaceChildren();
    const header = document.createElement('header');
    header.className = 'portfolio-copy';
    const category = document.createElement('p');
    category.className = 'eyebrow';
    category.textContent = localized(project.category);
    const heading = document.createElement('h2');
    heading.textContent = title;
    const description = document.createElement('p');
    description.textContent = localized(project.description);
    header.append(category, heading, description);
    const gallery = document.createElement('div');
    gallery.className = 'dialog-gallery';
    const images = Array.isArray(project.images) && project.images.length ? project.images : [project.cover];
    images.filter(Boolean).forEach((src, index) => {
      const image = document.createElement('img');
      image.src = `/${String(src).replace(/^\//, '')}`;
      image.alt = `${title} — ${language === 'en' ? 'project image' : 'imagen del proyecto'} ${index + 1}`;
      image.loading = index === 0 ? 'eager' : 'lazy';
      gallery.append(image);
    });
    content.append(header, gallery);
    dialog.showModal();
    trackConversion('portfolio_project_opened', { project_id: project.id });
  };

  if (portfolioGrid && Array.isArray(window.SKUVIA_PORTFOLIO)) {
    window.SKUVIA_PORTFOLIO
      .filter((project) => !knownProjects.has(project.id))
      .sort((a, b) => String(b.createdAt || '').localeCompare(String(a.createdAt || '')))
      .forEach((project) => {
        const card = document.createElement('article');
        card.className = 'portfolio-card';
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'portfolio-card-button';
        button.setAttribute('aria-label', `${language === 'en' ? 'Open project' : 'Abrir proyecto'}: ${localized(project.title)}`);
        const image = document.createElement('img');
        image.src = `/${String(project.cover || '').replace(/^\//, '')}`;
        image.alt = localized(project.title);
        image.loading = 'lazy';
        const copy = document.createElement('span');
        copy.className = 'portfolio-copy';
        const category = document.createElement('small');
        category.textContent = localized(project.category);
        const title = document.createElement('strong');
        title.textContent = localized(project.title);
        const action = document.createElement('span');
        action.textContent = language === 'en' ? 'Open project →' : 'Abrir proyecto →';
        copy.append(category, title, action);
        button.append(image, copy);
        button.addEventListener('click', () => openProject(project));
        card.append(button);
        portfolioGrid.append(card);
      });
  }

  dialog?.querySelector('[data-dialog-close]')?.addEventListener('click', () => dialog.close());
  dialog?.addEventListener('click', (event) => {
    const rect = dialog.getBoundingClientRect();
    const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
    if (outside) dialog.close();
  });

  document.querySelectorAll('[data-year]').forEach((element) => { element.textContent = new Date().getFullYear(); });
})();
