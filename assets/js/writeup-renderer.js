// ============================================================
//  5t4t1cV01d Portfolio — writeup-renderer.js
//  Renderiza dinámicamente el contenido Markdown (.md)
// ============================================================

(function () {
  // 1. Obtener el parámetro 'id' de la URL
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) {
    // Si no hay ID, redirigir al baúl de writeups
    window.location.href = 'writeups.html';
    return;
  }

  // 2. Buscar la máquina en los metadatos cargados desde writeups-data.js
  const machine = typeof WRITEUPS !== 'undefined' ? WRITEUPS.find(m => m.id === id) : null;

  if (!machine) {
    document.getElementById('writeup-body').innerHTML = `
      <p style="color:var(--red); font-weight:bold; margin-top:2rem;">
        [!] Error: No metadata found for the machine "${id}".
      </p>
      <p style="color:var(--text-dim); margin-top:0.5rem;">
        Make sure it is registered in assets/js/writeups-data.js.
      </p>
    `;
    return;
  }

  // 3. Establecer el título de la pestaña dinámicamente
  document.title = `${machine.title} Writeup // 5t4t1cV01d`;

  // 4. Renderizar la cabecera dinámica de la máquina
  const headerContainer = document.getElementById('writeup-header-container');
  if (headerContainer) {
    const diffClass = `diff-${machine.difficulty}`;
    const platClass = (typeof PLAT_CLASS !== 'undefined' && PLAT_CLASS[machine.platform]) || 'plat-htb';
    const diffLabel = (typeof DIFF_MAP !== 'undefined' && DIFF_MAP[machine.difficulty]) || machine.difficulty;
    const osIcon = (typeof OS_ICONS !== 'undefined' && OS_ICONS[machine.os]) || '💻';
    const osLabel = machine.os.charAt(0).toUpperCase() + machine.os.slice(1);
    const tagsHtml = (machine.tags || []).map(t => `<span class="tag">${t}</span>`).join('\n');

    const platformLogo = (typeof PLAT_LOGOS !== 'undefined' && PLAT_LOGOS[machine.platform]) || 'Hackthebox-Logo.svg';

    headerContainer.innerHTML = `
      <div class="writeup-header">
        ${machine.avatar ? `<img src="${machine.avatar}" class="machine-avatar-large" alt="${machine.title}" />` : ''}
        <div style="flex: 1;">
          <h1>${machine.title}</h1>
          <div class="card-meta" style="margin-bottom:0.8rem">
            <img src="../assets/icon/${platformLogo}" class="writeup-platform-logo" alt="${machine.platform}" />
            <span class="diff-badge ${diffClass}">${diffLabel}</span>
            <span class="os-badge">${osIcon} ${osLabel}</span>
            ${machine.release_date || machine.completed_date ? `
              <div style="margin-left: auto; display: flex; gap: 1rem; align-items: center; font-size: 0.68rem; color: var(--text-dim); flex-wrap: wrap;">
                ${machine.release_date ? `<span>Release: ${machine.release_date}</span>` : ''}
                ${machine.completed_date ? `<span>Completed: ${machine.completed_date}</span>` : ''}
              </div>
            ` : `
              <span class="card-date">${machine.date}</span>
            `}
          </div>
          <div class="card-tags">
            ${tagsHtml}
          </div>
        </div>
      </div>
    `;
  }

  // 5. Descargar y procesar el archivo Markdown (.md)
  fetch(`../writeups/${machine.id}.md`)
    .then(r => {
      if (!r.ok) {
        throw new Error(`Código de estado HTTP: ${r.status}`);
      }
      return r.text();
    })
    .then(text => {
      // Remover Front Matter (YAML header entre '---') si está presente
      let body = text;
      if (text.startsWith('---')) {
        const parts = text.split('---');
        if (parts.length >= 3) {
          // El cuerpo del markdown empieza después del segundo divisor '---'
          body = parts.slice(2).join('---').trim();
        }
      }

      // Convertir Markdown a HTML usando la biblioteca Marked
      if (typeof marked !== 'undefined') {
        const htmlContent = marked.parse(body);
        const writeupBody = document.getElementById('writeup-body');
        writeupBody.innerHTML = htmlContent;
        highlightComments(writeupBody);
        addCopyButtons(writeupBody);
      } else {
        throw new Error('The "marked" library did not load correctly.');
      }
    })
    .catch(err => {
      console.error('Error loading the writeup:', err);
      document.getElementById('writeup-body').innerHTML = `
        <p style="color:var(--red); font-weight:bold; margin-top:2rem;">
          [!] Error loading the notes file.
        </p>
        <p style="color:var(--text-dim); margin-top:0.5rem; font-size:0.8rem;">
          Details: ${err.message}
        </p>
        <p style="color:var(--text-dim); font-size:0.8rem;">
          Path searched: writeups/${machine.id}.md
        </p>
      `;
    });

  function highlightComments(container) {
    container.querySelectorAll('pre code').forEach(codeBlock => {
      const text = codeBlock.innerHTML;
      const lines = text.split('\n');
      const highlightedLines = lines.map(line => {
        const trimmed = line.trim();
        // Detectar si la línea comienza con '#' (evitando entidades HTML) o '//'
        if ((trimmed.startsWith('#') && !trimmed.startsWith('&#')) || trimmed.startsWith('//')) {
          return `<span class="code-comment">${line}</span>`;
        }
        return line;
      });
      codeBlock.innerHTML = highlightedLines.join('\n');
    });
  }

  function addCopyButtons(container) {
    container.querySelectorAll('pre').forEach(pre => {
      const btn = document.createElement('button');
      btn.className = 'copy-code-btn';
      btn.textContent = 'Copy';
      btn.setAttribute('aria-label', 'Copy code');

      btn.addEventListener('click', () => {
        const codeElement = pre.querySelector('code');
        const textToCopy = codeElement ? codeElement.innerText : pre.innerText;

        navigator.clipboard.writeText(textToCopy)
          .then(() => {
            btn.textContent = 'Copied!';
            btn.classList.add('copied');
            setTimeout(() => {
              btn.textContent = 'Copy';
              btn.classList.remove('copied');
            }, 2000);
          })
          .catch(err => {
            console.error('Error copying:', err);
            btn.textContent = 'Error';
          });
      });

      pre.appendChild(btn);
    });
  }
})();
