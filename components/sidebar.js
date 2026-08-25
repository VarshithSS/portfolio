// components/sidebar.js — the one shared navigation panel + theme toggle.
//
// Usage (any depth):  <script src="<path-to>/components/sidebar.js"></script>
// The script resolves the site root from its own src, so the same tag works
// from index.html, pages/*.html and pages/*/*.html without adjustment.
//
// Mark the current page with  <body data-page="projects">  — the nav highlight
// reads that attribute instead of guessing from the URL, so detail pages can
// point at their parent section explicitly.

(function () {
  'use strict';

  var THEME_KEY = 'portfolio-theme';

  var SUN_ICON = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">' +
    '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>';

  var MOON_ICON = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">' +
    '<path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"/></svg>';

  /* ── Theme ─────────────────────────────────────────────────── */

  function storedTheme() {
    try { return localStorage.getItem(THEME_KEY); } catch (e) { return null; }
  }

  function prefersLight() {
    // matchMedia is missing in some embedded/older contexts — never let the
    // theme probe take the whole sidebar down with it.
    try {
      return !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches);
    } catch (e) {
      return false;
    }
  }

  function getTheme() {
    return storedTheme() || (prefersLight() ? 'light' : 'dark');
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) { /* private mode */ }

    // The toggle advertises the theme you'd switch *to*.
    var label = document.querySelector('.theme-toggle-label');
    var badge = document.querySelector('.theme-toggle-badge');
    var icon  = document.querySelector('.theme-toggle-icon');
    var btn   = document.getElementById('theme-toggle-btn');
    var next  = theme === 'dark' ? 'light' : 'dark';

    if (label) label.textContent = next === 'light' ? 'Light mode' : 'Dark mode';
    if (badge) badge.textContent = theme;
    if (icon)  icon.innerHTML = next === 'light' ? SUN_ICON : MOON_ICON;
    if (btn)   btn.setAttribute('aria-label', 'Switch to ' + next + ' mode');
  }

  // Applied before the sidebar exists so the page never flashes the wrong theme.
  applyTheme(getTheme());

  /* ── Root resolution ───────────────────────────────────────── */

  function getRoot() {
    var src = '';
    if (document.currentScript && document.currentScript.src) {
      src = document.currentScript.src;
    } else {
      var scripts = document.getElementsByTagName('script');
      for (var i = scripts.length - 1; i >= 0; i--) {
        if (scripts[i].src && scripts[i].src.indexOf('components/sidebar.js') !== -1) {
          src = scripts[i].src;
          break;
        }
      }
    }
    if (!src) return '.';
    return src.replace(/\/components\/sidebar\.js(?:[?#].*)?$/, '');
  }

  var ROOT = getRoot();

  /* ── Markup ────────────────────────────────────────────────── */

  var NAV = [
    { page: 'home',     href: '/index.html',          label: 'Home',
      icon: '<path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path d="M9 21V12h6v9"/>' },
    { page: 'about',    href: '/pages/about.html',    label: 'About',
      icon: '<circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>' },
    { page: 'projects', href: '/pages/projects.html', label: 'Projects',
      icon: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>' },
    { page: 'research', href: '/pages/research.html', label: 'Research',
      icon: '<path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2v-4M9 21H5a2 2 0 01-2-2v-4m0 0h18"/>' },
    { page: 'blog',     href: '/pages/blog.html',     label: 'Blog',
      icon: '<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>' },
    { page: 'resume',   href: '/pages/resume.html',   label: 'Resume',
      icon: '<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>' },
    { page: 'contact',  href: '/pages/contact.html',  label: 'Contact',
      icon: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>' }
  ];

  function navHTML() {
    return NAV.map(function (item) {
      return '<a class="panel-link" href="' + ROOT + item.href + '" data-page="' + item.page + '">' +
        '<span class="panel-link-icon" aria-hidden="true">' +
        '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">' +
        item.icon + '</svg></span>' + item.label + '</a>';
    }).join('');
  }

  function sidebarHTML() {
    return '' +
      '<aside class="side-panel" aria-label="Site navigation">' +
        '<div class="panel-inner">' +
          '<a class="panel-brand" href="' + ROOT + '/index.html">' +
            '<span class="panel-brand-dot" aria-hidden="true"></span>' +
            '<span class="panel-brand-name">Sri Varshith</span>' +
          '</a>' +
          '<div class="panel-label">Pages</div>' +
          '<nav class="panel-nav">' + navHTML() + '</nav>' +
          '<div class="panel-divider" aria-hidden="true"></div>' +
          '<button class="theme-toggle" id="theme-toggle-btn" type="button" aria-label="Toggle theme">' +
            '<span class="theme-toggle-icon" aria-hidden="true"></span>' +
            '<span class="theme-toggle-label">Light mode</span>' +
            '<span class="theme-toggle-badge">dark</span>' +
          '</button>' +
          '<div class="panel-status">' +
            '<span class="status-dot" aria-hidden="true"></span>' +
            '<span>system online</span>' +
          '</div>' +
        '</div>' +
      '</aside>';
  }

  /* ── Mount ─────────────────────────────────────────────────── */

  function markActive() {
    var current = document.body.getAttribute('data-page') || 'home';
    var links = document.querySelectorAll('.panel-nav .panel-link');
    for (var i = 0; i < links.length; i++) {
      var isActive = links[i].getAttribute('data-page') === current;
      links[i].classList.toggle('active', isActive);
      if (isActive) {
        links[i].setAttribute('aria-current', 'page');
      } else {
        links[i].removeAttribute('aria-current');
      }
    }
  }

  function initToggle() {
    var btn = document.getElementById('theme-toggle-btn');
    if (!btn) return;
    applyTheme(getTheme());
    btn.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme') || 'dark';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  function inject() {
    var mount = document.getElementById('sidebar-root');
    if (mount) {
      mount.outerHTML = sidebarHTML();
    } else {
      var layout = document.querySelector('.layout');
      if (!layout) return;
      layout.insertAdjacentHTML('afterbegin', sidebarHTML());
    }
    markActive();
    initToggle();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
