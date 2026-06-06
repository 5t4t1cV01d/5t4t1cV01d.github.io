// ============================================================
//  5t4t1cV01d Portfolio — main.js
// ============================================================

// ── COUNT-UP ANIMATION ──────────────────────────────────────
function animateCounters() {
  document.querySelectorAll('.stat-num[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    const duration = 1200;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current);
      if (current >= target) clearInterval(timer);
    }, 16);
  });
}

// ── RENDER MACHINE CARD ──────────────────────────────────────
function renderCard(m, linkPrefix = '') {
  const diffClass = `diff-${m.difficulty}`;
  const platClass  = PLAT_CLASS[m.platform] || 'plat-htb';
  const diffLabel  = DIFF_MAP[m.difficulty] || m.difficulty;
  const osIcon     = OS_ICONS[m.os] || '💻';
  const osLabel    = m.os.charAt(0).toUpperCase() + m.os.slice(1);
  const href       = linkPrefix + `writeup.html?id=${m.id}`;
  const tags       = (m.tags || []).slice(0, 3).map(t => `<span class="tag">${t}</span>`).join('');

  return `
    <a class="machine-card" href="${href}"
       style="--diff-color: var(--${m.difficulty === 'easy' ? 'green' : m.difficulty === 'medium' ? 'orange' : 'red'})">
      <div class="card-top">
        ${m.avatar ? `<img src="${m.avatar}" class="machine-avatar-mini" alt="${m.title}" />` : ''}
        <span class="card-title" ${m.avatar ? 'style="margin-left: 0.6rem; flex: 1;"' : ''}>${m.title}</span>
        <span class="card-platform ${platClass}">${m.platform}</span>
      </div>
      <div class="card-meta">
        <span class="diff-badge ${diffClass}">${diffLabel}</span>
        <span class="os-badge">${osIcon} ${osLabel}</span>
        <span class="card-date">${m.date}</span>
      </div>
      <p class="card-desc">${m.desc}</p>
      <div class="card-tags">${tags}</div>
      <div class="card-footer">
        <span class="btn-ghost">Read writeup →</span>
      </div>
    </a>`;
}

// ── HOME PAGE: latest 3 cards ────────────────────────────────
const homeGrid = document.getElementById('homeWriteups');
if (homeGrid) {
  homeGrid.innerHTML = WRITEUPS.slice(0, 3).map(m => renderCard(m, 'pages/')).join('');
  
  const writeupsCountEl = document.getElementById('writeups-count');
  if (writeupsCountEl) {
    writeupsCountEl.setAttribute('data-count', WRITEUPS.length);
  }
  
  animateCounters();
}

// ── WRITEUPS PAGE: all cards + filters ──────────────────────
const allGrid = document.getElementById('allWriteups');
if (allGrid) {
  let activePlatform = 'all';
  let activeDiff     = 'all';
  let activeOS       = 'all';

  function renderAll() {
    const filtered = WRITEUPS.filter(m => {
      const pMatch = activePlatform === 'all' || m.platform === activePlatform;
      const dMatch = activeDiff     === 'all' || m.difficulty === activeDiff;
      const oMatch = activeOS       === 'all' || m.os === activeOS;
      return pMatch && dMatch && oMatch;
    });

    const countEl = document.getElementById('writeupCount');
    if (countEl) countEl.innerHTML = `Showing <span>${filtered.length}</span> of <span>${WRITEUPS.length}</span> machines`;

    allGrid.innerHTML = filtered.length
      ? filtered.map(m => renderCard(m)).join('')
      : `<p style="color:var(--text-dim);grid-column:1/-1;padding:2rem 0">No writeups found with those filters.</p>`;
  }

  function setFilter(type, val) {
    if (type === 'platform') activePlatform = val;
    if (type === 'diff')     activeDiff     = val;
    if (type === 'os')       activeOS       = val;

    document.querySelectorAll(`[data-filter="${type}"]`).forEach(btn => {
      btn.classList.toggle('active', btn.dataset.value === val);
    });

    renderAll();
  }

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setFilter(btn.dataset.filter, btn.dataset.value);
    });
  });

  renderAll();
}

// ── EMAIL CLICK-TO-COPY ──────────────────────────────────────
document.addEventListener('click', function (e) {
  const emailLink = e.target.closest('a[href^="mailto:5t4t1cV01d@proton.me"]');
  if (emailLink) {
    const emailText = '5t4t1cV01d@proton.me';
    navigator.clipboard.writeText(emailText).then(() => {
      showCopyTooltip(emailLink, 'Copied!');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  }
});

function showCopyTooltip(element, text) {
  let existing = element.querySelector('.tooltip-toast');
  if (existing) existing.remove();

  const tooltip = document.createElement('span');
  tooltip.className = 'tooltip-toast';
  tooltip.textContent = text;
  element.appendChild(tooltip);

  // Trigger animation reflow
  setTimeout(() => tooltip.classList.add('visible'), 10);

  // Auto remove after 1.5 seconds
  setTimeout(() => {
    tooltip.classList.remove('visible');
    setTimeout(() => tooltip.remove(), 200);
  }, 1500);
}
