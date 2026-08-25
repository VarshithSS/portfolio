// main.js — home page boot sequence.
//
// Nav highlighting lives in components/sidebar.js (it owns the markup it
// highlights); this file is only the terminal animation on index.html.

'use strict';

var BOOT_LINES = [
  { text: 'Initializing server...',  cls: 't-cyan',  delay: 200 },
  { text: 'Loading modules...',      cls: 't-dim',   delay: 200 },
  { text: 'System online.',          cls: 't-green', delay: 200 }
];

function runBootSequence() {
  var term   = document.getElementById('term');
  var cursor = document.getElementById('cur');
  if (!term || !cursor) return;

  var elapsed = 0;

  BOOT_LINES.forEach(function (line, index) {
    elapsed += line.delay;

    setTimeout(function () {
      var el = document.createElement('div');
      el.className = 't-line ' + line.cls + ' fadein';
      el.textContent = line.text;
      term.insertBefore(el, cursor);

      if (index === BOOT_LINES.length - 1) {
        setTimeout(function () { cursor.style.display = 'none'; }, 400);
      }
    }, elapsed);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', runBootSequence);
} else {
  runBootSequence();
}
