// main.js

'use strict';

/* ── Boot Sequence ── */

const BOOT_LINES = [

  { text: 'Initializing Server..', cls: 't-cyan',  delay: 200 },

  { text: 'Loading modules...',                     cls: 't-dim',   delay: 200 },

  { text: 'System online.',                         cls: 't-green', delay: 200},

];

function runBootSequence() {

const term   = document.getElementById('term');

const cursor = document.getElementById('cur');

if (!term || !cursor) return;

let elapsed = 0;

BOOT_LINES.forEach((line, index) => {

elapsed += line.delay;

setTimeout(() => {

const el = document.createElement('div');

el.className = `t-line ${line.cls} fadein`;

el.textContent = line.text;

term.insertBefore(el, cursor);

if (index === BOOT_LINES.length - 1)

setTimeout(() => { cursor.style.display = 'none'; }, 200);

    }, elapsed);

  });

}

/* ── Highlight active nav link ── */

function highlightActiveNav() {

const path = window.location.pathname;

document.querySelectorAll('.panel-link').forEach(link => {

const href = link.getAttribute('href') || '';

const segment = href.replace(/\//g, '');

if (segment && path.includes(segment)) link.classList.add('active');

  });

}

document.addEventListener('DOMContentLoaded', () => {

runBootSequence();

highlightActiveNav();

});