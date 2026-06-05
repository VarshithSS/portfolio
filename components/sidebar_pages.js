// sidebar.js — shared navigation panel + theme toggle
// Usage: <script src="/components/sidebar.js"></script> (adjust path as needed)

(function () {
  /* ── Theme management ── */
  const THEME_KEY = 'portfolio-theme';

  function getTheme() {
    return localStorage.getItem(THEME_KEY) ||
      (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    // Update toggle label/icon if it exists
    const label = document.querySelector('.theme-toggle-label');
    const badge = document.querySelector('.theme-toggle-badge');
    const icon  = document.querySelector('.theme-toggle-icon');
    if (label) label.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
    if (badge) badge.textContent = theme === 'dark' ? 'off' : 'on';
    if (icon)  icon.innerHTML = theme === 'dark' ? SUN_ICON : MOON_ICON;
  }

  // Apply immediately to avoid flash
  applyTheme(getTheme());

  const SUN_ICON = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
    <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
  </svg>`;

  const MOON_ICON = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
    <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"/>
  </svg>`;

  const SIDEBAR_HTML = `
<aside class="side-panel" aria-label="Navigation">
  <div class="panel-inner">

    <div class="panel-brand">
      <span class="panel-brand-dot" aria-hidden="true"></span>
      <span class="panel-brand-name">Sri Varshith</span>
    </div>

    <div class="panel-label">Pages</div>
    <nav class="panel-nav">
      <a class="panel-link" href="../index.html" data-page="home">
        <span class="panel-link-icon" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg>
        </span>
        Home
      </a>
      <a class="panel-link" href="../pages/about.html" data-page="about">
        <span class="panel-link-icon" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
        </span>
        About
      </a>
      <a class="panel-link" href="../pages/projects.html" data-page="projects">
        <span class="panel-link-icon" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
        </span>
        Projects
      </a>
      <a class="panel-link" href="../pages/research.html" data-page="research">
        <span class="panel-link-icon" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2v-4M9 21H5a2 2 0 01-2-2v-4m0 0h18"/></svg>
        </span>
        Research
      </a>
      <a class="panel-link" href="../pages/blog.html" data-page="blog">
        <span class="panel-link-icon" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
        </span>
        Blog
      </a>
      <a class="panel-link" href="../pages/contact.html" data-page="contact">
        <span class="panel-link-icon" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        </span>
        Contact
      </a>
    </nav>

    <div class="panel-divider" aria-hidden="true"></div>

    <button class="theme-toggle" id="theme-toggle-btn" aria-label="Toggle theme">
      <span class="theme-toggle-icon" aria-hidden="true"></span>
      <span class="theme-toggle-label">Light mode</span>
      <span class="theme-toggle-badge">off</span>
    </button>

    <div class="panel-status">
      <span class="status-dot" aria-hidden="true"></span>
      <span>system online</span>
    </div>

  </div>
</aside>`;

  function inject() {
    const root = document.getElementById('sidebar-root');
    if (root) {
      root.outerHTML = SIDEBAR_HTML;
    } else {
      const layout = document.querySelector('.layout');
      if (layout) {
        layout.insertAdjacentHTML('afterbegin', SIDEBAR_HTML);
      }
    }
    markActive();
    initToggle();
  }

  function initToggle() {
    const btn = document.getElementById('theme-toggle-btn');
    if (!btn) return;
    // Sync button state with current theme
    applyTheme(getTheme());
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  function markActive() {
    const path = window.location.pathname;
    let current = 'home';
    if (path.includes('about'))    current = 'about';
    else if (path.includes('projects')) current = 'projects';
    else if (path.includes('research')) current = 'research';
    else if (path.includes('blog'))     current = 'blog';
    else if (path.includes('contact'))  current = 'contact';

    document.querySelectorAll('.panel-nav .panel-link').forEach(link => {
      link.classList.toggle('active', link.dataset.page === current);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();