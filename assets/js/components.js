// ============================================================
//  5t4t1cV01d Portfolio — components.js
//  Dynamic Loader for Navbar, Footer and Overlays
// ============================================================

(function () {
  // 1. Determine the path prefix (../ or ./)
  const currentScript = document.currentScript;
  let prefix = '';
  if (currentScript) {
    const relativeSrc = currentScript.getAttribute('src') || '';
    prefix = relativeSrc.replace('assets/js/components.js', '');
  } else {
    // Fallback in case document.currentScript is not available
    if (window.location.pathname.includes('/pages/')) {
      prefix = '../';
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    // 2. Inject aesthetic effects (scanlines and noise) if they do not exist in the DOM
    if (!document.querySelector('.scanlines')) {
      const scanlines = document.createElement('div');
      scanlines.className = 'scanlines';
      document.body.insertBefore(scanlines, document.body.firstChild);
    }
    if (!document.querySelector('.noise')) {
      const noise = document.createElement('div');
      noise.className = 'noise';
      document.body.insertBefore(noise, document.body.firstChild);
    }

    // 3. Load Navbar
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    if (navbarPlaceholder) {
      fetch(`${prefix}components/navbar.html`)
        .then(r => {
          if (!r.ok) throw new Error(`HTTP Error: ${r.status}`);
          return r.text();
        })
        .then(html => {
          navbarPlaceholder.innerHTML = html;

          // Adjust relative paths based on the depth level of the page
          if (prefix) {
            navbarPlaceholder.querySelectorAll('a').forEach(a => {
              const href = a.getAttribute('href');
              if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto:')) {
                a.setAttribute('href', prefix + href);
              }
            });
          }

          // Highlight the active tab according to the data-active defined in the placeholder
          const activeNav = navbarPlaceholder.getAttribute('data-active');
          if (activeNav) {
            navbarPlaceholder.querySelectorAll('[data-nav]').forEach(a => {
              if (a.getAttribute('data-nav') === activeNav) {
                a.classList.add('active');
              } else {
                a.classList.remove('active');
              }
            });
          }
        })
        .catch(err => console.error('Error loading navigation bar:', err));
    }

    // 4. Load Footer
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
      fetch(`${prefix}components/footer.html`)
        .then(r => {
          if (!r.ok) throw new Error(`HTTP Error: ${r.status}`);
          return r.text();
        })
        .then(html => {
          footerPlaceholder.innerHTML = html;
        })
        .catch(err => console.error('Error loading footer:', err));
    }
  });
})();
