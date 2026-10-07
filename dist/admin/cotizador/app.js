/* ==========================================================================
   SKUVIA STUDIO · QUOTE & BULK PRICING ENGINE (PRIVATE ADMIN EDITION)
   State Management & Reactive Engine with PIN Security
   ========================================================================== */

(() => {
  'use strict';

  // Default system configuration & price list
  const DEFAULT_CONFIG = {
    currency: 'USD',
    pin: '2026', // Default access PIN
    rates: {
      listing_essential: 100, // Visual Essential: 5 images
      listing_premium: 125,   // Visual Premium: 7 images
      aplus_standard: 100,    // A+ Content standard (5 imágenes / módulos)
      aplus_premium: 240,     // A+ Content premium (6-7 modules)
      brand_story: 120,       // Amazon Brand Story
      storefront: 320,        // Amazon Storefront
      brand_experience: 400,  // Full Pack: Premium + A+ + Brand Story
      variant_addon: 35,      // Cost per additional child variant
      translation_rate: 25,   // Cost per language per ASIN
      source_files_pct: 0,    // Archivos editables incluidos ($0)
      rush_delivery_pct: 25   // % surcharge for rush turnaround
    },
    volumeTiers: [
      { min: 1, max: 1, discount: 0, label: "1 ASIN (Precio estándar)" },
      { min: 2, max: 3, discount: 10, label: "2 - 3 ASINs (10% OFF)" },
      { min: 4, max: 6, discount: 15, label: "4 - 6 ASINs (15% OFF)" },
      { min: 7, max: 9, discount: 20, label: "7 - 9 ASINs (20% OFF)" },
      { min: 10, max: 999, discount: 25, label: "10+ ASINs (25% OFF)" }
    ]
  };

  // Load saved configuration or use default
  let config = JSON.parse(localStorage.getItem('skuvia_config')) || JSON.parse(JSON.stringify(DEFAULT_CONFIG));
  if (config.rates.aplus_standard === 180) config.rates.aplus_standard = 100;
  config.rates.source_files_pct = 0;
  localStorage.setItem('skuvia_config', JSON.stringify(config));

  // Current Working State
  let state = {
    client: {
      name: '',
      brand: '',
      marketplace: 'Amazon US',
      email: '',
      date: new Date().toISOString().split('T')[0],
      validityDays: 15,
      notes: ''
    },
    items: [],
    addons: {
      multilingualCount: 0,
      includeSourceFiles: false,
      isRushDelivery: false,
      manualDiscountActive: false,
      manualDiscountType: 'percent',
      manualDiscountValue: 0,
      customNotes: ''
    }
  };

  // Security: Check PIN Authentication
  function checkAuthentication() {
    const isAuth = localStorage.getItem('skuvia_auth') === 'true' || sessionStorage.getItem('skuvia_auth') === 'true';
    const lockOverlay = document.getElementById('lock-screen-overlay');
    if (!lockOverlay) return;

    if (isAuth) {
      lockOverlay.style.display = 'none';
    } else {
      lockOverlay.style.display = 'flex';
      document.getElementById('lock-pin-input')?.focus();
    }
  }

  function handleUnlock() {
    const pinInput = document.getElementById('lock-pin-input');
    const errorMsg = document.getElementById('lock-error-msg');
    const rememberMe = document.getElementById('lock-remember-check');
    if (!pinInput) return;

    const enteredPin = pinInput.value.trim();
    const correctPin = config.pin || '2026';

    if (enteredPin === correctPin) {
      if (rememberMe && rememberMe.checked) {
        localStorage.setItem('skuvia_auth', 'true');
      } else {
        sessionStorage.setItem('skuvia_auth', 'true');
      }
      document.getElementById('lock-screen-overlay').style.display = 'none';
      if (errorMsg) errorMsg.style.display = 'none';
      pinInput.value = '';
      showToast('Acceso autorizado · Cotizador desbloqueado');
    } else {
      if (errorMsg) {
        errorMsg.style.display = 'block';
        errorMsg.textContent = 'PIN incorrecto. Intenta nuevamente.';
      }
      pinInput.value = '';
      pinInput.focus();
    }
  }

  function handleLockApp() {
    localStorage.removeItem('skuvia_auth');
    sessionStorage.removeItem('skuvia_auth');
    checkAuthentication();
    showToast('Aplicación bloqueada');
  }

  // Unique ID generator
  const createId = () => 'asin_' + Math.random().toString(36).substring(2, 9);

  // Initial demo item if empty
  const createDefaultItem = (index = 1, name = '') => ({
    id: createId(),
    name: name || `Producto / ASIN #${index}`,
    sku: '',
    packageType: 'none',
    services: {
      listing: 'premium',
      aplus: 'none',
      brandStory: false,
      storefront: false
    },
    variants: 0
  });

  // Calculate pricing for an individual ASIN
  function calculateItemCost(item) {
    let base = 0;
    let deliverablesCount = 0;

    if (item.packageType === 'brand_experience') {
      base += config.rates.brand_experience;
      deliverablesCount += 7;
      deliverablesCount += 5;
      deliverablesCount += 3;
    } else {
      if (item.services.listing === 'essential') {
        base += config.rates.listing_essential;
        deliverablesCount += 5;
      } else if (item.services.listing === 'premium') {
        base += config.rates.listing_premium;
        deliverablesCount += 7;
      }

      if (item.services.aplus === 'standard') {
        base += config.rates.aplus_standard;
        deliverablesCount += 5;
      } else if (item.services.aplus === 'premium') {
        base += config.rates.aplus_premium;
        deliverablesCount += 7;
      }

      if (item.services.brandStory) {
        base += config.rates.brand_story;
        deliverablesCount += 3;
      }
    }

    if (item.services.storefront) {
      base += config.rates.storefront;
      deliverablesCount += 4;
    }

    const variantsCost = (item.variants || 0) * config.rates.variant_addon;
    base += variantsCost;

    return {
      subtotal: base,
      deliverables: deliverablesCount,
      variantsCost
    };
  }

  // Calculate overall quote breakdown
  function calculateOverall() {
    const totalItems = state.items.length;
    let itemsSubtotal = 0;
    let totalDeliverables = 0;
    let totalVariants = 0;

    state.items.forEach(item => {
      const calc = calculateItemCost(item);
      itemsSubtotal += calc.subtotal;
      totalDeliverables += calc.deliverables;
      totalVariants += (item.variants || 0);
    });

    let volumeDiscountPct = 0;
    let currentTier = null;

    if (!state.addons.manualDiscountActive) {
      currentTier = config.volumeTiers.find(tier => totalItems >= tier.min && totalItems <= tier.max);
      if (currentTier) {
        volumeDiscountPct = currentTier.discount;
      }
    }

    let discountAmount = 0;
    if (state.addons.manualDiscountActive) {
      if (state.addons.manualDiscountType === 'percent') {
        discountAmount = (itemsSubtotal * (state.addons.manualDiscountValue || 0)) / 100;
        volumeDiscountPct = state.addons.manualDiscountValue || 0;
      } else {
        discountAmount = Math.min(itemsSubtotal, state.addons.manualDiscountValue || 0);
        volumeDiscountPct = itemsSubtotal > 0 ? Math.round((discountAmount / itemsSubtotal) * 100) : 0;
      }
    } else {
      discountAmount = (itemsSubtotal * volumeDiscountPct) / 100;
    }

    const discountedSubtotal = Math.max(0, itemsSubtotal - discountAmount);

    let addonsTotal = 0;
    const translationTotal = state.addons.multilingualCount * config.rates.translation_rate * totalItems;
    addonsTotal += translationTotal;

    let sourceFilesCost = 0;
    if (state.addons.includeSourceFiles) {
      sourceFilesCost = (itemsSubtotal * config.rates.source_files_pct) / 100;
      addonsTotal += sourceFilesCost;
    }

    let rushDeliveryCost = 0;
    if (state.addons.isRushDelivery) {
      rushDeliveryCost = (discountedSubtotal * config.rates.rush_delivery_pct) / 100;
      addonsTotal += rushDeliveryCost;
    }

    const grandTotal = discountedSubtotal + addonsTotal;

    let estimatedDays = Math.max(4, Math.round(4 + totalItems * 1.8 + totalVariants * 0.4));
    if (state.addons.isRushDelivery) {
      estimatedDays = Math.max(3, Math.round(estimatedDays * 0.6));
    }

    return {
      totalItems,
      totalVariants,
      totalDeliverables,
      itemsSubtotal,
      volumeDiscountPct,
      discountAmount,
      discountedSubtotal,
      translationTotal,
      sourceFilesCost,
      rushDeliveryCost,
      addonsTotal,
      grandTotal,
      currentTier,
      estimatedDays
    };
  }

  // Toast Notification System
  function showToast(message, icon = '✓') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i>${icon}</i><span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(15px)';
      toast.style.transition = 'all 0.25s ease';
      setTimeout(() => toast.remove(), 250);
    }, 2800);
  }

  // Render DOM elements
  function render() {
    renderClientFields();
    renderAsinItems();
    renderDiscountTiers();
    renderSummary();
  }

  function renderClientFields() {
    const clientNameInput = document.getElementById('client-name');
    const brandNameInput = document.getElementById('brand-name');
    const marketplaceSelect = document.getElementById('marketplace-select');
    const quoteDateInput = document.getElementById('quote-date');
    const quoteValidityInput = document.getElementById('quote-validity');
    const clientNotesInput = document.getElementById('client-notes');

    if (clientNameInput && document.activeElement !== clientNameInput) clientNameInput.value = state.client.name;
    if (brandNameInput && document.activeElement !== brandNameInput) brandNameInput.value = state.client.brand;
    if (marketplaceSelect) marketplaceSelect.value = state.client.marketplace;
    if (quoteDateInput) quoteDateInput.value = state.client.date;
    if (quoteValidityInput) quoteValidityInput.value = state.client.validityDays;
    if (clientNotesInput && document.activeElement !== clientNotesInput) clientNotesInput.value = state.client.notes;

    const sourceFilesCheck = document.getElementById('addon-source-files');
    const rushDeliveryCheck = document.getElementById('addon-rush-delivery');
    const translationSelect = document.getElementById('addon-languages');

    if (sourceFilesCheck) sourceFilesCheck.checked = state.addons.includeSourceFiles;
    if (rushDeliveryCheck) rushDeliveryCheck.checked = state.addons.isRushDelivery;
    if (translationSelect) translationSelect.value = state.addons.multilingualCount;
  }

  function renderAsinItems() {
    const container = document.getElementById('asin-list-container');
    if (!container) return;

    if (state.items.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 48px 20px; background: var(--white); border: 2px dashed var(--line); border-radius: var(--radius);">
          <img src="../../assets/icon-listing-256.webp" alt="Listing" style="width: 56px; height: 56px; margin: 0 auto 16px; opacity: 0.6;">
          <h3 style="margin-bottom: 6px;">No hay productos agregados todavía</h3>
          <p style="color: var(--muted); font-size: 14px; max-width: 400px; margin: 0 auto 20px;">
            Comienza añadiendo el primer ASIN o utiliza la opción de carga por lote para presupuestar un catálogo completo.
          </p>
          <button class="btn btn-primary" id="btn-empty-add-asin">+ Añadir Primer Producto</button>
        </div>
      `;
      document.getElementById('btn-empty-add-asin')?.addEventListener('click', () => addItem());
      return;
    }

    container.innerHTML = state.items.map((item, index) => {
      const calc = calculateItemCost(item);
      const isBrandExp = item.packageType === 'brand_experience';

      return `
        <article class="asin-card ${isBrandExp ? 'is-packaged' : ''}" data-id="${item.id}">
          <div class="asin-header">
            <div class="asin-title-group">
              <span class="asin-badge">#${index + 1}</span>
              <input type="text" class="asin-name-input" data-action="rename-asin" data-id="${item.id}" value="${escapeHtml(item.name)}" placeholder="Nombre del producto o ASIN">
            </div>
            <div class="asin-header-actions">
              <div class="asin-price-pill">
                <span>$${calc.subtotal}</span> <small>USD</small>
              </div>
              <button class="btn btn-icon btn-secondary" title="Duplicar este ASIN" data-action="clone-asin" data-id="${item.id}">
                ⧉
              </button>
              <button class="btn btn-icon btn-secondary" style="color: #b3261e;" title="Eliminar este ASIN" data-action="delete-asin" data-id="${item.id}">
                ✕
              </button>
            </div>
          </div>

          <div class="asin-body">
            <!-- Brand Experience All-In-One Ribbon Banner -->
            <div class="brand-exp-banner ${isBrandExp ? 'is-active' : ''}" data-action="toggle-brand-exp" data-id="${item.id}">
              <div class="brand-exp-info">
                <span class="brand-exp-tag">⭐ Paquete Todo-en-Uno</span>
                <div class="brand-exp-text">
                  <h4>Pack Brand Experience ($${config.rates.brand_experience} USD)</h4>
                  <p>Listing Premium (7 imágenes) + A+ Content completo + Brand Story + Identidad conectada</p>
                </div>
              </div>
              <div class="brand-exp-price">
                ${isBrandExp ? '✓ SELECCIONADO' : '+ APLICAR PACK'}
              </div>
            </div>

            ${!isBrandExp ? `
              <!-- Individual Services Grid -->
              <div class="services-selector-grid">
                <div class="service-tile ${item.services.listing === 'essential' ? 'is-active' : ''}" data-action="select-service" data-id="${item.id}" data-category="listing" data-value="${item.services.listing === 'essential' ? 'none' : 'essential'}">
                  <div>
                    <div class="service-tile-top">
                      <img src="../../assets/icon-listing-256.webp" class="service-tile-icon" alt="Listing">
                      <div>
                        <div class="service-tile-label">Visual Essential</div>
                        <div class="service-tile-desc">5 imágenes estratégicas</div>
                      </div>
                    </div>
                  </div>
                  <div class="service-tile-footer">
                    <span class="service-tile-desc">1 main + 3 info + 1 life</span>
                    <span class="service-tile-price">$${config.rates.listing_essential} <small>USD</small></span>
                  </div>
                </div>

                <div class="service-tile ${item.services.listing === 'premium' ? 'is-active' : ''}" data-action="select-service" data-id="${item.id}" data-category="listing" data-value="${item.services.listing === 'premium' ? 'none' : 'premium'}">
                  <div>
                    <div class="service-tile-top">
                      <img src="../../assets/icon-listing-256.webp" class="service-tile-icon" alt="Listing">
                      <div>
                        <div class="service-tile-label">Visual Premium</div>
                        <div class="service-tile-desc">7 imágenes completas</div>
                      </div>
                    </div>
                  </div>
                  <div class="service-tile-footer">
                    <span class="service-tile-desc">Estrategia + Copy + 7 imgs</span>
                    <span class="service-tile-price">$${config.rates.listing_premium} <small>USD</small></span>
                  </div>
                </div>

                <div class="service-tile ${item.services.aplus === 'standard' ? 'is-active' : ''}" data-action="select-service" data-id="${item.id}" data-category="aplus" data-value="${item.services.aplus === 'standard' ? 'none' : 'standard'}">
                  <div>
                    <div class="service-tile-top">
                      <img src="../../assets/icon-content-256.webp" class="service-tile-icon" alt="A+">
                      <div>
                        <div class="service-tile-label">A+ Content Estándar</div>
                        <div class="service-tile-desc">5 imágenes / módulos</div>
                      </div>
                    </div>
                  </div>
                  <div class="service-tile-footer">
                    <span class="service-tile-desc">5 imágenes para móvil</span>
                    <span class="service-tile-price">$${config.rates.aplus_standard} <small>USD</small></span>
                  </div>
                </div>

                <div class="service-tile ${item.services.brandStory ? 'is-active' : ''}" data-action="toggle-service-bool" data-id="${item.id}" data-service="brandStory">
                  <div>
                    <div class="service-tile-top">
                      <img src="../../assets/icon-brand-256.webp" class="service-tile-icon" alt="Brand Story">
                      <div>
                        <div class="service-tile-label">Brand Story</div>
                        <div class="service-tile-desc">Carrusel de marca</div>
                      </div>
                    </div>
                  </div>
                  <div class="service-tile-footer">
                    <span class="service-tile-desc">Narrativa y catálogo</span>
                    <span class="service-tile-price">$${config.rates.brand_story} <small>USD</small></span>
                  </div>
                </div>
              </div>
            ` : ''}

            <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; background: var(--paper); border: 1px solid var(--line); border-radius: 12px;">
              <div style="display: flex; align-items: center; gap: 12px;">
                <img src="../../assets/icon-store-256.webp" style="width: 28px; height: 28px; border-radius: 6px;" alt="Storefront">
                <div>
                  <strong style="font-size: 13px; font-family: var(--display);">Amazon Storefront para este producto/línea</strong>
                  <div style="font-size: 11px; color: var(--muted);">Diseño de página principal de Brand Store o subpágina</div>
                </div>
              </div>
              <div style="display: flex; align-items: center; gap: 12px;">
                <span style="font-weight: 700; font-size: 13px;">+$${config.rates.storefront} USD</span>
                <input type="checkbox" class="addon-checkbox" data-action="toggle-service-bool" data-id="${item.id}" data-service="storefront" ${item.services.storefront ? 'checked' : ''}>
              </div>
            </div>

            <div class="variants-row">
              <div class="variants-left">
                <span style="font-size: 18px;">🎨</span>
                <div>
                  <div class="variants-title">Variantes adicionales de este ASIN (Color / Talla / Sabor)</div>
                  <div class="variants-sub">Mismo layout gráfico pero adaptado a la variante (+$${config.rates.variant_addon} USD c/u)</div>
                </div>
              </div>
              <div class="variants-controls">
                <div class="counter-stepper">
                  <button type="button" data-action="variant-step" data-id="${item.id}" data-delta="-1">−</button>
                  <span id="variant-count-${item.id}">${item.variants || 0}</span>
                  <button type="button" data-action="variant-step" data-id="${item.id}" data-delta="1">+</button>
                </div>
                <div class="variant-price-tag">
                  = $${(item.variants || 0) * config.rates.variant_addon} USD
                </div>
              </div>
            </div>

          </div>
        </article>
      `;
    }).join('');

    attachAsinListeners();
  }

  function attachAsinListeners() {
    const container = document.getElementById('asin-list-container');
    if (!container) return;

    container.querySelectorAll('[data-action="rename-asin"]').forEach(input => {
      input.addEventListener('change', (e) => {
        const id = e.target.dataset.id;
        const item = state.items.find(i => i.id === id);
        if (item) {
          item.name = e.target.value.trim() || 'Producto sin nombre';
        }
      });
    });

    container.querySelectorAll('[data-action="clone-asin"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const item = state.items.find(i => i.id === id);
        if (item) {
          const cloned = JSON.parse(JSON.stringify(item));
          cloned.id = createId();
          cloned.name = `${cloned.name} (Copia)`;
          state.items.push(cloned);
          render();
          showToast(`Copia de "${item.name}" creada.`);
        }
      });
    });

    container.querySelectorAll('[data-action="delete-asin"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        state.items = state.items.filter(i => i.id !== id);
        render();
        showToast('Producto eliminado del presupuesto.');
      });
    });

    container.querySelectorAll('[data-action="toggle-brand-exp"]').forEach(banner => {
      banner.addEventListener('click', () => {
        const id = banner.dataset.id;
        const item = state.items.find(i => i.id === id);
        if (item) {
          item.packageType = item.packageType === 'brand_experience' ? 'none' : 'brand_experience';
          render();
        }
      });
    });

    container.querySelectorAll('[data-action="select-service"]').forEach(tile => {
      tile.addEventListener('click', () => {
        const id = tile.dataset.id;
        const category = tile.dataset.category;
        const value = tile.dataset.value;
        const item = state.items.find(i => i.id === id);
        if (item) {
          item.services[category] = value;
          render();
        }
      });
    });

    container.querySelectorAll('[data-action="toggle-service-bool"]').forEach(el => {
      el.addEventListener('click', () => {
        const id = el.dataset.id;
        const service = el.dataset.service;
        const item = state.items.find(i => i.id === id);
        if (item) {
          if (el.tagName === 'INPUT') {
            item.services[service] = el.checked;
          } else {
            item.services[service] = !item.services[service];
          }
          render();
        }
      });
    });

    container.querySelectorAll('[data-action="variant-step"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const delta = parseInt(btn.dataset.delta, 10);
        const item = state.items.find(i => i.id === id);
        if (item) {
          item.variants = Math.max(0, (item.variants || 0) + delta);
          render();
        }
      });
    });
  }

  function renderDiscountTiers() {
    const container = document.getElementById('discount-tiers-display');
    if (!container) return;

    const calc = calculateOverall();

    container.innerHTML = config.volumeTiers.map(tier => {
      const isActive = !state.addons.manualDiscountActive && (calc.totalItems >= tier.min && calc.totalItems <= tier.max);
      return `
        <div class="tier-pill ${isActive ? 'is-active' : ''}">
          <div class="tier-range">${tier.label.split('(')[0].trim()}</div>
          <div class="tier-discount">${tier.discount}% OFF</div>
        </div>
      `;
    }).join('');

    const manualCheck = document.getElementById('toggle-manual-discount');
    const manualInputsWrapper = document.getElementById('manual-discount-inputs');
    const manualValInput = document.getElementById('manual-discount-val');
    const manualTypeSelect = document.getElementById('manual-discount-type');

    if (manualCheck) manualCheck.checked = state.addons.manualDiscountActive;
    if (manualInputsWrapper) manualInputsWrapper.style.display = state.addons.manualDiscountActive ? 'flex' : 'none';
    if (manualValInput && document.activeElement !== manualValInput) manualValInput.value = state.addons.manualDiscountValue;
    if (manualTypeSelect) manualTypeSelect.value = state.addons.manualDiscountType;
  }

  function renderSummary() {
    const calc = calculateOverall();

    const elAsinCount = document.getElementById('summary-asin-count');
    const elVariantsCount = document.getElementById('summary-variants-count');
    const elDeliverablesCount = document.getElementById('summary-deliverables-count');

    if (elAsinCount) elAsinCount.textContent = calc.totalItems;
    if (elVariantsCount) elVariantsCount.textContent = calc.totalVariants;
    if (elDeliverablesCount) elDeliverablesCount.textContent = calc.totalDeliverables;

    const elSubtotal = document.getElementById('summary-subtotal');
    const elDiscountRow = document.getElementById('summary-discount-row');
    const elDiscountVal = document.getElementById('summary-discount-val');
    const elDiscountPct = document.getElementById('summary-discount-pct');
    const elAddonsRow = document.getElementById('summary-addons-row');
    const elAddonsVal = document.getElementById('summary-addons-val');
    const elGrandTotal = document.getElementById('summary-grand-total');
    const elSavingsPill = document.getElementById('summary-savings-pill');
    const elEstimatedDays = document.getElementById('summary-estimated-days');

    if (elSubtotal) elSubtotal.textContent = `$${Math.round(calc.itemsSubtotal)} USD`;

    if (elDiscountRow) {
      if (calc.discountAmount > 0) {
        elDiscountRow.style.display = 'flex';
        if (elDiscountVal) elDiscountVal.textContent = `-$${Math.round(calc.discountAmount)} USD`;
        if (elDiscountPct) elDiscountPct.textContent = `(${calc.volumeDiscountPct}%)`;
      } else {
        elDiscountRow.style.display = 'none';
      }
    }

    if (elAddonsRow) {
      if (calc.addonsTotal > 0) {
        elAddonsRow.style.display = 'flex';
        if (elAddonsVal) elAddonsVal.textContent = `+$${Math.round(calc.addonsTotal)} USD`;
      } else {
        elAddonsRow.style.display = 'none';
      }
    }

    if (elGrandTotal) elGrandTotal.innerHTML = `$${Math.round(calc.grandTotal)} <span>USD</span>`;

    if (elSavingsPill) {
      if (calc.discountAmount > 0) {
        elSavingsPill.style.display = 'block';
        elSavingsPill.textContent = `🎉 Ahorro por pedido grande: $${Math.round(calc.discountAmount)} USD (${calc.volumeDiscountPct}% descuento)`;
      } else {
        elSavingsPill.style.display = 'none';
      }
    }

    if (elEstimatedDays) {
      elEstimatedDays.textContent = `${calc.estimatedDays} a ${calc.estimatedDays + 4} días laborables`;
    }

    // Update floating mobile bottom bar
    const elMobileTotal = document.getElementById('mobile-bar-total');
    const elMobileSub = document.getElementById('mobile-bar-sub');
    if (elMobileTotal) {
      elMobileTotal.innerHTML = `$${Math.round(calc.grandTotal)} <small>USD</small>`;
    }
    if (elMobileSub) {
      const discountLabel = calc.discountAmount > 0 ? ` · ${calc.volumeDiscountPct}% OFF` : '';
      elMobileSub.textContent = `${calc.totalItems} ASIN${calc.totalItems > 1 ? 's' : ''}${discountLabel}`;
    }
  }

  function addItem(name = '') {
    const nextIndex = state.items.length + 1;
    const newItem = createDefaultItem(nextIndex, name);
    state.items.push(newItem);
    render();
    showToast(`ASIN #${nextIndex} añadido`);
  }

  function addBatch(count = 3, servicePreset = 'premium') {
    const startIndex = state.items.length;
    for (let i = 1; i <= count; i++) {
      const item = createDefaultItem(startIndex + i);
      if (servicePreset === 'brand_experience') {
        item.packageType = 'brand_experience';
      } else if (servicePreset === 'essential') {
        item.services.listing = 'essential';
      } else if (servicePreset === 'premium') {
        item.services.listing = 'premium';
      }
      state.items.push(item);
    }
    render();
    showToast(`Se agregaron ${count} productos en lote.`);
  }

  function applyPreset(presetType) {
    if (state.items.length > 0) {
      if (!confirm('¿Deseas reemplazar el presupuesto actual con esta plantilla de pedido grande?')) {
        return;
      }
    }

    state.items = [];

    if (presetType === '3_pack_brand_exp') {
      state.client.notes = 'Rebranding integral de 3 listings top de catálogo con Brand Experience.';
      for (let i = 1; i <= 3; i++) {
        const item = createDefaultItem(i, `Producto Principal ${i}`);
        item.packageType = 'brand_experience';
        item.variants = i === 1 ? 2 : 0;
        state.items.push(item);
      }
    } else if (presetType === '5_listing_premium') {
      state.client.notes = 'Lanzamiento de 5 nuevos productos con Visual Premium + infografías de conversión.';
      for (let i = 1; i <= 5; i++) {
        const item = createDefaultItem(i, `ASIN ${i}`);
        item.services.listing = 'premium';
        item.variants = 1;
        state.items.push(item);
      }
    } else if (presetType === '10_catalog_scale') {
      state.client.notes = 'Optimización a gran escala para catálogo completo de 10 productos.';
      for (let i = 1; i <= 10; i++) {
        const item = createDefaultItem(i, `Catálogo ASIN ${i}`);
        item.services.listing = 'premium';
        item.services.aplus = 'standard';
        state.items.push(item);
      }
    }

    render();
    showToast('Plantilla aplicada correctamente.');
  }

  function generateWhatsAppText() {
    const calc = calculateOverall();
    const brand = state.client.brand ? `*Marca:* ${state.client.brand}\n` : '';
    const client = state.client.name ? `*Cliente:* ${state.client.name}\n` : '';
    const marketplace = `*Marketplace:* ${state.client.marketplace}\n`;

    let text = `🟢 *COTIZACIÓN ESTRATÉGICA · SKUVIA STUDIO*\n`;
    text += `_Diseño estratégico para Amazon · Proceso por escrito_\n\n`;
    text += client + brand + marketplace;
    text += `*Fecha:* ${state.client.date} (Válida por ${state.client.validityDays} días)\n\n`;

    text += `📦 *ALCANCE DEL PEDIDO GRANDE:*\n`;
    text += `• Total de productos / ASINs: *${calc.totalItems}*\n`;
    if (calc.totalVariants > 0) {
      text += `• Variantes de producto adicionales: *${calc.totalVariants}*\n`;
    }
    text += `• Piezas visuales estimadas: *${calc.totalDeliverables} entregables*\n\n`;

    text += `📋 *DESGLOSE POR PRODUCTO:*\n`;
    state.items.forEach((item, idx) => {
      const c = calculateItemCost(item);
      text += `${idx + 1}. *${item.name}*: `;
      if (item.packageType === 'brand_experience') {
        text += `Pack Brand Experience (Listing 7 imgs + A+ Content + Brand Story)`;
      } else {
        const s = [];
        if (item.services.listing !== 'none') s.push(`Listing (${item.services.listing})`);
        if (item.services.aplus !== 'none') s.push(`A+ Content (${item.services.aplus})`);
        if (item.services.brandStory) s.push(`Brand Story`);
        if (item.services.storefront) s.push(`Storefront`);
        text += s.length > 0 ? s.join(' + ') : 'Sin servicio base';
      }
      if (item.variants > 0) text += ` [+${item.variants} variantes]`;
      text += ` → $${c.subtotal} USD\n`;
    });

    const hasAddons = calc.addonsTotal > 0 || state.addons.includeSourceFiles;
    if (hasAddons) {
      text += `\n➕ *SERVICIOS GLOBALES / EXTRAS:*\n`;
      if (state.addons.multilingualCount > 0) {
        text += `• Adaptación a ${state.addons.multilingualCount} idiomas adicionales: +$${Math.round(calc.translationTotal)} USD\n`;
      }
      if (state.addons.includeSourceFiles) {
        text += `• Archivos editables fuente (.AI/.PSD): Incluidos (sin costo adicional)\n`;
      }
      if (state.addons.isRushDelivery) {
        text += `• Entrega Prioritaria / Express: +$${Math.round(calc.rushDeliveryCost)} USD\n`;
      }
    }

    text += `\n💰 *RESUMEN DE INVERSIÓN:*\n`;
    text += `• Subtotal regular: $${Math.round(calc.itemsSubtotal)} USD\n`;
    if (calc.discountAmount > 0) {
      text += `• *Descuento por volumen (${calc.volumeDiscountPct}%):* -$${Math.round(calc.discountAmount)} USD\n`;
    }
    text += `• *INVERSIÓN TOTAL OPTIMIZADA: $${Math.round(calc.grandTotal)} USD*\n\n`;

    text += `⏱️ *TIEMPO Y METODOLOGÍA:*\n`;
    text += `• Plazo estimado: ${calc.estimatedDays} a ${calc.estimatedDays + 4} días laborables\n`;
    text += `• Proceso 100% por escrito (sin llamada obligatoria)\n`;
    text += `• Rondas de ajustes incluidas para alinear dirección visual\n`;
    text += `• Entregables en alta resolución listos para publicar en Amazon Seller Central\n\n`;
    text += `¿Te parece bien el alcance para comenzar con la fase de contexto y estrategia?`;

    return text;
  }

  function generateEmailText() {
    const calc = calculateOverall();
    const clientGreeting = state.client.name ? `Hola ${state.client.name},` : 'Hola,';

    let text = `Asunto: Propuesta y Cotización por Volumen · Skuvia Studio (${state.client.brand || 'Amazon Visuals'})\n\n`;
    text += `${clientGreeting}\n\n`;
    text += `Gracias por compartir los detalles de tu proyecto. En Skuvia Studio diseñamos con una función clara: convertir información en confianza para impulsar la tasa de conversión en Amazon.\n\n`;
    text += `Dado el volumen de catálogo solicitado (${calc.totalItems} ASINs / productos), hemos aplicado nuestro escalado de precio preferencial por volumen.\n\n`;
    text += `--------------------------------------------------\n`;
    text += `RESUMEN DE LA PROPUESTA\n`;
    text += `--------------------------------------------------\n`;
    text += `• Marca / Proyecto: ${state.client.brand || 'Catálogo Amazon'}\n`;
    text += `• Marketplace: ${state.client.marketplace}\n`;
    text += `• Total productos a diseñar: ${calc.totalItems} ASINs\n`;
    if (calc.totalVariants > 0) text += `• Variantes de producto: ${calc.totalVariants} unidades\n`;
    text += `• Entregables visuales aproximados: ${calc.totalDeliverables} piezas de diseño\n\n`;

    text += `DESGLOSE ECONÓMICO:\n`;
    text += `• Subtotal precio regular: $${Math.round(calc.itemsSubtotal)} USD\n`;
    if (calc.discountAmount > 0) {
      text += `• Descuento por volumen (${calc.volumeDiscountPct}%): -$${Math.round(calc.discountAmount)} USD\n`;
    }
    if (state.addons.includeSourceFiles) {
      text += `• Archivos editables fuente (.AI/.PSD): Incluidos sin costo adicional\n`;
    }
    if (calc.addonsTotal > 0) {
      text += `• Extras / Servicios globales: +$${Math.round(calc.addonsTotal)} USD\n`;
    }
    text += `• INVERSIÓN TOTAL DEFINITIVA: $${Math.round(calc.grandTotal)} USD\n\n`;

    text += `METODOLOGÍA SKUVIAPROCESO:\n`;
    text += `1. Contexto: Nos compartes ASINs, imágenes base, recursos de marca y objeciones de clientes.\n`;
    text += `2. Estrategia: Analizamos la competencia y definimos el recorrido visual y copy de cada imagen.\n`;
    text += `3. Diseño: Creamos la dirección gráfica, maquetación y adaptaciones.\n`;
    text += `4. Entrega: Rondas de ajustes incluidas y entrega final lista para subir a Seller Central.\n\n`;

    text += `• Tiempo estimado de entrega: ${calc.estimatedDays} a ${calc.estimatedDays + 4} días laborables.\n`;
    text += `• Validez de la oferta: ${state.client.validityDays} días.\n\n`;
    text += `Quedo a tu disposición si deseas ajustar algún detalle del alcance antes de dar luz verde.\n\n`;
    text += `Atentamente,\nSkuvia Studio\ncontact@skuviastudio.com · https://skuviastudio.com`;

    return text;
  }

  function generateFiverrText() {
    const calc = calculateOverall();
    return `Hi ${state.client.name || 'there'}! Here is the custom bulk offer for ${state.client.brand || 'your Amazon catalog'}:\n\n` +
      `SCOPE OF WORK:\n` +
      `- Full strategic visual design for ${calc.totalItems} ASIN(s) & ${calc.totalVariants} variation(s)\n` +
      `- High-converting Listing Images sequence & A+ Content layout\n` +
      `- Competitor research, visual copy, and objection-handling design\n` +
      `- Estimated ${calc.totalDeliverables}+ total visual deliverables ready to upload\n\n` +
      `INVESTMENT:\n` +
      `- Regular Price: $${Math.round(calc.itemsSubtotal)} USD\n` +
      `- Volume Savings (${calc.volumeDiscountPct}% OFF): -$${Math.round(calc.discountAmount)} USD\n` +
      `- Total Price: $${Math.round(calc.grandTotal)} USD\n` +
      `- Delivery: ${calc.estimatedDays} business days with revisions included.\n\n` +
      `Feel free to accept or let me know if you need any adjustments!`;
  }

  function openProposalModal() {
    const modal = document.getElementById('proposal-modal');
    const container = document.getElementById('proposal-sheet-container');
    if (!modal || !container) return;

    const calc = calculateOverall();

    container.innerHTML = `
      <div class="proposal-sheet">
        <header class="proposal-letterhead">
          <div class="proposal-brand">
            <img src="../../assets/logo-480.webp" alt="Skuvia Studio">
            <p>Diseño Estratégico para Marcas y Vendedores de Amazon</p>
            <p>contact@skuviastudio.com · skuviastudio.com</p>
          </div>
          <div class="proposal-meta-box">
            <strong>PRESUPUESTO FORMAL</strong>
            <p style="margin-top: 4px; color: var(--muted);">REF: SKV-${Date.now().toString().slice(-6)}</p>
            <p>Fecha de emisión: <strong>${state.client.date}</strong></p>
            <p>Válido durante: <strong>${state.client.validityDays} días</strong></p>
          </div>
        </header>

        <div class="proposal-client-row">
          <div>
            <span class="eyebrow" style="margin-bottom: 4px;">Información del Cliente</span>
            <h3 style="font-size: 16px;">${state.client.name || 'Cliente'}</h3>
            <p style="margin: 0; color: var(--muted); font-size: 13px;">Marca: <strong>${state.client.brand || 'No especificada'}</strong></p>
            <p style="margin: 0; color: var(--muted); font-size: 13px;">Marketplace: <strong>${state.client.marketplace}</strong></p>
          </div>
          <div>
            <span class="eyebrow" style="margin-bottom: 4px;">Parámetros del Proyecto</span>
            <p style="margin: 0; font-size: 13px;">Volumen: <strong>${calc.totalItems} ASINs / ${calc.totalVariants} Variantes</strong></p>
            <p style="margin: 0; font-size: 13px;">Entregables: <strong>~${calc.totalDeliverables} piezas gráficas</strong></p>
            <p style="margin: 0; font-size: 13px;">Tiempo estimado: <strong>${calc.estimatedDays} - ${calc.estimatedDays + 4} días laborables</strong></p>
          </div>
        </div>

        ${state.client.notes ? `
          <div style="background: var(--paper-2); padding: 14px 18px; border-radius: 8px; margin-bottom: 24px; font-size: 12px;">
            <strong>Objetivo / Indicaciones del proyecto:</strong>
            <p style="margin: 4px 0 0; color: var(--slate);">${escapeHtml(state.client.notes)}</p>
          </div>
        ` : ''}

        <div class="proposal-table-wrapper">
          <table class="proposal-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Producto / ASIN</th>
                <th>Servicios y Entregables Incluidos</th>
                <th>Variantes</th>
                <th style="text-align: right;">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${state.items.map((item, i) => {
                const c = calculateItemCost(item);
                let desc = '';
                if (item.packageType === 'brand_experience') {
                  desc = '<strong>Pack Brand Experience:</strong> Listing Premium (7 imgs) + A+ Content Modular + Amazon Brand Story';
                } else {
                  const parts = [];
                  if (item.services.listing === 'essential') parts.push('Listing Essential (5 imgs: 1 main, 3 info, 1 life)');
                  if (item.services.listing === 'premium') parts.push('Listing Premium (7 imgs: 1 main, 4 info, 2 life + estrategia)');
                  if (item.services.aplus === 'standard') parts.push('Amazon A+ Content Estándar (5 imágenes / módulos)');
                  if (item.services.aplus === 'premium') parts.push('Amazon A+ Content Premium (6-7 módulos)');
                  if (item.services.brandStory) parts.push('Amazon Brand Story (Carrusel narrativo)');
                  if (item.services.storefront) parts.push('Amazon Storefront');
                  desc = parts.join('<br>') || 'Servicio personalizado';
                }

                return `
                  <tr>
                    <td>${i + 1}</td>
                    <td><strong>${escapeHtml(item.name)}</strong></td>
                    <td>${desc}</td>
                    <td>${item.variants > 0 ? `${item.variants} var. (+${item.variants * config.rates.variant_addon}$)` : '—'}</td>
                    <td>$${c.subtotal} USD</td>
                  </tr>
                `;
              }).join('')}

              ${state.addons.multilingualCount > 0 ? `
                <tr>
                  <td>+</td>
                  <td><strong>Adaptación Multilingüe</strong></td>
                  <td>Traducción y diagramación visual para ${state.addons.multilingualCount} idioma(s) / marketplaces adicionales</td>
                  <td>—</td>
                  <td>+$${Math.round(calc.translationTotal)} USD</td>
                </tr>
              ` : ''}

              ${state.addons.includeSourceFiles ? `
                <tr>
                  <td>+</td>
                  <td><strong>Archivos Fuente Editables</strong></td>
                  <td>Archivos maestros vectoriales y de capas organizadas (.AI / .PSD / .FIGMA)</td>
                  <td>—</td>
                  <td style="color: var(--lime-dark); font-weight: 700;">Incluido ($0 USD)</td>
                </tr>
              ` : ''}

              ${state.addons.isRushDelivery ? `
                <tr>
                  <td>+</td>
                  <td><strong>Entrega Prioritaria (Rush)</strong></td>
                  <td>Plazo de producción y entrega acelerado con dedicación prioritaria de estudio</td>
                  <td>—</td>
                  <td>+$${Math.round(calc.rushDeliveryCost)} USD</td>
                </tr>
              ` : ''}
            </tbody>
          </table>
        </div>

        <div class="proposal-summary-block">
          <div style="display: flex; justify-content: space-between; font-size: 13px;">
            <span>Subtotal PVP Regular:</span>
            <strong>$${Math.round(calc.itemsSubtotal)} USD</strong>
          </div>
          ${calc.discountAmount > 0 ? `
            <div style="display: flex; justify-content: space-between; font-size: 13px; color: var(--lime-dark); font-weight: 700;">
              <span>Descuento por Volumen (${calc.volumeDiscountPct}%):</span>
              <span>-$${Math.round(calc.discountAmount)} USD</span>
            </div>
          ` : ''}
          ${calc.addonsTotal > 0 ? `
            <div style="display: flex; justify-content: space-between; font-size: 13px;">
              <span>Servicios globales / Add-ons:</span>
              <strong>+$${Math.round(calc.addonsTotal)} USD</strong>
            </div>
          ` : ''}
          <div style="height: 1px; background: var(--line); margin: 6px 0;"></div>
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <span style="font-family: var(--display); font-weight: 700; font-size: 14px;">TOTAL NETO:</span>
            <span style="font-family: var(--display); font-weight: 700; font-size: 24px; color: var(--ink);">$${Math.round(calc.grandTotal)} USD</span>
          </div>
        </div>

        <div class="proposal-terms">
          <h4>TÉRMINOS Y METODOLOGÍA DEL SERVICIO</h4>
          <ol style="padding-left: 18px; margin-bottom: 16px; display: grid; gap: 4px;">
            <li><strong>Proceso por escrito:</strong> La coordinación y presentación de propuestas se realiza por escrito con entregables claros para optimizar tiempos.</li>
            <li><strong>Rondas de ajustes:</strong> Se incluyen revisiones para calibrar textos, composiciones y jerarquías visuales antes de la entrega final.</li>
            <li><strong>Requisitos de Amazon:</strong> Todo el contenido se diseña cumpliendo estrictamente con los lineamientos técnicos y normativas de Amazon Seller Central.</li>
            <li><strong>Condiciones de inicio:</strong> 50% al aprobar el presupuesto para inicio de labores y 50% previo a la entrega de archivos finales en alta resolución, o mediante orden protegida en plataforma acordada.</li>
          </ol>
          <div style="display: flex; justify-content: space-between; margin-top: 30px; padding-top: 15px; border-top: 1px dashed var(--line); font-size: 11px;">
            <span>Skuvia Studio · Amazon Visual Strategy</span>
            <span>Aceptado por el cliente: ___________________________</span>
          </div>
        </div>
      </div>
    `;

    modal.classList.add('is-open');
  }

  function openSettingsModal() {
    const modal = document.getElementById('settings-modal');
    if (!modal) return;

    document.getElementById('cfg-listing-essential').value = config.rates.listing_essential;
    document.getElementById('cfg-listing-premium').value = config.rates.listing_premium;
    document.getElementById('cfg-aplus-std').value = config.rates.aplus_standard;
    document.getElementById('cfg-aplus-prem').value = config.rates.aplus_premium;
    document.getElementById('cfg-brand-story').value = config.rates.brand_story;
    document.getElementById('cfg-storefront').value = config.rates.storefront;
    document.getElementById('cfg-brand-exp').value = config.rates.brand_experience;
    document.getElementById('cfg-variant-addon').value = config.rates.variant_addon;
    document.getElementById('cfg-pin-code').value = config.pin || '2026';

    modal.classList.add('is-open');
  }

  function saveSettingsFromModal() {
    config.rates.listing_essential = Number(document.getElementById('cfg-listing-essential').value) || 100;
    config.rates.listing_premium = Number(document.getElementById('cfg-listing-premium').value) || 125;
    config.rates.aplus_standard = Number(document.getElementById('cfg-aplus-std').value) || 100;
    config.rates.aplus_premium = Number(document.getElementById('cfg-aplus-prem').value) || 240;
    config.rates.brand_story = Number(document.getElementById('cfg-brand-story').value) || 120;
    config.rates.storefront = Number(document.getElementById('cfg-storefront').value) || 320;
    config.rates.brand_experience = Number(document.getElementById('cfg-brand-exp').value) || 400;
    config.rates.variant_addon = Number(document.getElementById('cfg-variant-addon').value) || 35;
    config.pin = document.getElementById('cfg-pin-code').value.trim() || '2026';

    localStorage.setItem('skuvia_config', JSON.stringify(config));
    document.getElementById('settings-modal')?.classList.remove('is-open');
    render();
    showToast('Tarifas y PIN actualizados.');
  }

  function saveCurrentQuote() {
    const quotes = JSON.parse(localStorage.getItem('skuvia_saved_quotes') || '[]');
    const calc = calculateOverall();
    const quoteName = state.client.brand || state.client.name || `Presupuesto ${state.items.length} ASINs`;

    const newQuoteRecord = {
      id: 'quote_' + Date.now(),
      savedAt: new Date().toLocaleString(),
      name: quoteName,
      totalAmount: Math.round(calc.grandTotal),
      itemsCount: calc.totalItems,
      stateSnapshot: JSON.parse(JSON.stringify(state))
    };

    quotes.unshift(newQuoteRecord);
    localStorage.setItem('skuvia_saved_quotes', JSON.stringify(quotes));
    showToast(`Presupuesto "${quoteName}" guardado.`);
  }

  function openHistoryModal() {
    const modal = document.getElementById('history-modal');
    const container = document.getElementById('history-list-container');
    if (!modal || !container) return;

    const quotes = JSON.parse(localStorage.getItem('skuvia_saved_quotes') || '[]');

    if (quotes.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 32px; color: var(--muted);">
          <p>No tienes presupuestos guardados todavía.</p>
        </div>
      `;
    } else {
      container.innerHTML = quotes.map(q => `
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; border: 1px solid var(--line); border-radius: 10px; background: var(--white); margin-bottom: 10px;">
          <div>
            <h4 style="font-size: 14px; margin-bottom: 2px;">${escapeHtml(q.name)}</h4>
            <div style="font-size: 11px; color: var(--muted);">Guardado: ${q.savedAt} · ${q.itemsCount} productos</div>
          </div>
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-weight: 700; font-family: var(--display); font-size: 16px;">$${q.totalAmount} USD</span>
            <button class="btn btn-small btn-secondary" data-action="load-quote" data-id="${q.id}">Cargar</button>
            <button class="btn btn-small btn-secondary" style="color: #b3261e;" data-action="delete-quote" data-id="${q.id}">✕</button>
          </div>
        </div>
      `).join('');

      container.querySelectorAll('[data-action="load-quote"]').forEach(btn => {
        btn.addEventListener('click', () => {
          const qId = btn.dataset.id;
          const found = quotes.find(q => q.id === qId);
          if (found) {
            state = JSON.parse(JSON.stringify(found.stateSnapshot));
            render();
            modal.classList.remove('is-open');
            showToast(`Presupuesto cargado: ${found.name}`);
          }
        });
      });

      container.querySelectorAll('[data-action="delete-quote"]').forEach(btn => {
        btn.addEventListener('click', () => {
          const qId = btn.dataset.id;
          const filtered = quotes.filter(q => q.id !== qId);
          localStorage.setItem('skuvia_saved_quotes', JSON.stringify(filtered));
          openHistoryModal();
          showToast('Presupuesto eliminado del historial.');
        });
      });
    }

    modal.classList.add('is-open');
  }

  function copyToClipboard(text, successMsg) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(successMsg);
      }).catch(() => {
        fallbackCopy(text, successMsg);
      });
    } else {
      fallbackCopy(text, successMsg);
    }
  }

  function fallbackCopy(text, successMsg) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast(successMsg);
    } catch (err) {
      alert('Por favor selecciona y copia el texto manualmente.');
    }
    textArea.remove();
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Setup Global Event Listeners
  function init() {
    // Initial Item
    state.items = [createDefaultItem(1, 'Producto Principal (Listing + A+)')];
    state.items[0].services.listing = 'premium';
    state.items[0].services.aplus = 'standard';

    // Check PIN Authentication
    checkAuthentication();

    // Lock Screen Submit
    document.getElementById('lock-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      handleUnlock();
    });
    document.getElementById('btn-lock-submit')?.addEventListener('click', handleUnlock);
    document.getElementById('btn-lock-app')?.addEventListener('click', handleLockApp);

    // Header buttons
    document.getElementById('btn-add-asin')?.addEventListener('click', () => addItem());
    document.getElementById('btn-batch-add-3')?.addEventListener('click', () => addBatch(3));
    document.getElementById('btn-batch-add-5')?.addEventListener('click', () => addBatch(5));
    document.getElementById('btn-batch-add-10')?.addEventListener('click', () => addBatch(10));

    // Preset buttons
    document.getElementById('preset-brand-exp')?.addEventListener('click', () => applyPreset('3_pack_brand_exp'));
    document.getElementById('preset-5-premium')?.addEventListener('click', () => applyPreset('5_listing_premium'));
    document.getElementById('preset-10-catalog')?.addEventListener('click', () => applyPreset('10_catalog_scale'));

    // Client form inputs
    document.getElementById('client-name')?.addEventListener('input', (e) => {
      state.client.name = e.target.value;
    });
    document.getElementById('brand-name')?.addEventListener('input', (e) => {
      state.client.brand = e.target.value;
    });
    document.getElementById('marketplace-select')?.addEventListener('change', (e) => {
      state.client.marketplace = e.target.value;
    });
    document.getElementById('quote-date')?.addEventListener('change', (e) => {
      state.client.date = e.target.value;
    });
    document.getElementById('quote-validity')?.addEventListener('input', (e) => {
      state.client.validityDays = Number(e.target.value) || 15;
    });
    document.getElementById('client-notes')?.addEventListener('input', (e) => {
      state.client.notes = e.target.value;
    });

    // Global Addons
    document.getElementById('addon-source-files')?.addEventListener('change', (e) => {
      state.addons.includeSourceFiles = e.target.checked;
      render();
    });
    document.getElementById('addon-rush-delivery')?.addEventListener('change', (e) => {
      state.addons.isRushDelivery = e.target.checked;
      render();
    });
    document.getElementById('addon-languages')?.addEventListener('change', (e) => {
      state.addons.multilingualCount = parseInt(e.target.value, 10) || 0;
      render();
    });

    // Manual Discount toggle
    document.getElementById('toggle-manual-discount')?.addEventListener('change', (e) => {
      state.addons.manualDiscountActive = e.target.checked;
      render();
    });
    document.getElementById('manual-discount-val')?.addEventListener('input', (e) => {
      state.addons.manualDiscountValue = Number(e.target.value) || 0;
      render();
    });
    document.getElementById('manual-discount-type')?.addEventListener('change', (e) => {
      state.addons.manualDiscountType = e.target.value;
      render();
    });

    // Export & Sharing actions
    document.getElementById('btn-copy-whatsapp')?.addEventListener('click', () => {
      copyToClipboard(generateWhatsAppText(), '✓ ¡Mensaje para WhatsApp copiado al portapapeles!');
    });
    document.getElementById('btn-copy-email')?.addEventListener('click', () => {
      copyToClipboard(generateEmailText(), '✓ ¡Propuesta por escrito copiada para Email!');
    });
    document.getElementById('btn-copy-fiverr')?.addEventListener('click', () => {
      copyToClipboard(generateFiverrText(), '✓ ¡Oferta personalizada copiada para Fiverr!');
    });
    document.getElementById('btn-view-proposal')?.addEventListener('click', openProposalModal);
    document.getElementById('btn-print-proposal')?.addEventListener('click', () => window.print());

    // Mobile Bottom Bar actions
    document.getElementById('btn-mobile-whatsapp')?.addEventListener('click', () => {
      copyToClipboard(generateWhatsAppText(), '✓ ¡Mensaje para WhatsApp copiado al portapapeles!');
    });
    document.getElementById('btn-mobile-proposal')?.addEventListener('click', openProposalModal);
    document.getElementById('mobile-bar-trigger')?.addEventListener('click', () => {
      document.getElementById('summary-card')?.scrollIntoView({ behavior: 'smooth' });
    });

    // History and Settings modal triggers
    document.getElementById('btn-open-settings')?.addEventListener('click', openSettingsModal);
    document.getElementById('btn-save-settings')?.addEventListener('click', saveSettingsFromModal);
    document.getElementById('btn-reset-settings')?.addEventListener('click', () => {
      if (confirm('¿Restablecer las tarifas de Skuvia Studio a los valores predeterminados?')) {
        config = JSON.parse(JSON.stringify(DEFAULT_CONFIG));
        localStorage.removeItem('skuvia_config');
        openSettingsModal();
        render();
        showToast('Valores predeterminados restaurados.');
      }
    });

    document.getElementById('btn-save-quote')?.addEventListener('click', saveCurrentQuote);
    document.getElementById('btn-open-history')?.addEventListener('click', openHistoryModal);

    // Reset current quote button
    document.getElementById('btn-new-quote')?.addEventListener('click', () => {
      if (confirm('¿Deseas iniciar un presupuesto nuevo desde cero?')) {
        state.client = {
          name: '',
          brand: '',
          marketplace: 'Amazon US',
          email: '',
          date: new Date().toISOString().split('T')[0],
          validityDays: 15,
          notes: ''
        };
        state.items = [createDefaultItem(1, 'Producto #1')];
        state.addons = {
          multilingualCount: 0,
          includeSourceFiles: false,
          isRushDelivery: false,
          manualDiscountActive: false,
          manualDiscountType: 'percent',
          manualDiscountValue: 0,
          customNotes: ''
        };
        render();
        showToast('Nuevo presupuesto iniciado.');
      }
    });

    // Close modal triggers
    document.querySelectorAll('[data-action="close-modal"]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('is-open'));
      });
    });

    document.querySelectorAll('.modal-overlay').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('is-open');
        }
      });
    });

    // Initial render
    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
