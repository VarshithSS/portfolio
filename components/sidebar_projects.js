// sidebar.js — shared navigation panel

(function () {

  function getRootPrefix() {
    // Works for both file:// and http:// protocols.
    // Get the full href of the current page, strip the filename,
    // then navigate up to the root by counting directory segments
    // relative to where components/sidebar.js sits.

    // Find this script's own src attribute to locate the root
    let scriptSrc = '';
    const scripts = document.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; i++) {
      if (scripts[i].src && scripts[i].src.indexOf('sidebar.js') !== -1) {
        scriptSrc = scripts[i].src;
        break;
      }
    }

    if (!scriptSrc) return '.';

    // scriptSrc is like: file:///C:/path/to/portfolio/components/sidebar.js
    // We want:           file:///C:/path/to/portfolio
    // Strip "/components/sidebar_projects.js" from the end
    const root = scriptSrc.replace(/\/components\/sidebar_projects\.js.*$/, '');
    return root;
  }

  function buildSidebarHTML(root) {
    return `
<aside class="side-panel" aria-label="Navigation">
  <div class="panel-inner">

    <div class="panel-brand">
      <span class="panel-brand-dot" aria-hidden="true"></span>
      <span class="panel-brand-name">Sri Varshith</span>
    </div>

    <div class="panel-label">Pages</div>
    <nav class="panel-nav">
      <a class="panel-link" href="${root}/index.html" data-page="home">
        <span class="panel-link-icon" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg>
        </span>
        Home
      </a>
      <a class="panel-link" href="${root}/pages/about.html" data-page="about">
        <span class="panel-link-icon" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
        </span>
        About
      </a>
      <a class="panel-link" href="${root}/pages/projects.html" data-page="projects">
        <span class="panel-link-icon" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
        </span>
        Projects
      </a>
      <a class="panel-link" href="${root}/pages/research.html" data-page="research">
        <span class="panel-link-icon" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2v-4M9 21H5a2 2 0 01-2-2v-4m0 0h18"/></svg>
        </span>
        Research
      </a>
      <a class="panel-link" href="${root}/pages/blog.html" data-page="blog">
        <span class="panel-link-icon" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
        </span>
        Blog
      </a>
      <a class="panel-link" href="${root}/pages/contact.html" data-page="contact">
        <span class="panel-link-icon" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        </span>
        Contact
      </a>
    </nav>

    <div class="panel-divider" aria-hidden="true"></div>

    <div class="panel-status">
      <span class="status-dot" aria-hidden="true"></span>
      <span>system online</span>
    </div>

  </div>
</aside>`;
  }

  function inject() {
    const root = getRootPrefix();
    const SIDEBAR_HTML = buildSidebarHTML(root);

    const mountPoint = document.getElementById('sidebar-root');
    if (mountPoint) {
      mountPoint.outerHTML = SIDEBAR_HTML;
    } else {
      const layout = document.querySelector('.layout');
      if (layout) {
        layout.insertAdjacentHTML('afterbegin', SIDEBAR_HTML);
      }
    }
    markActive();
  }

  function markActive() {
    const path = window.location.pathname;

    let current = 'home';
    if (path.includes('about'))         current = 'about';
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