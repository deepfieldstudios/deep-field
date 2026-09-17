/* Deep Field — presence layer.
   Three small things, no library:
   1. calm reveal on scroll
   2. count-up on the proof metrics (the content is performance, so animate it)
   3. a fallback for browsers without CSS scroll-driven animations
   Everything degrades to the static, fully-legible page. */
(function () {
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasIO = 'IntersectionObserver' in window;

  /* ---- 1. reveal ---- */
  var els = document.querySelectorAll('.reveal');
  if (!hasIO || reduce) {
    Array.prototype.forEach.call(els, function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    Array.prototype.forEach.call(els, function (el, i) {
      el.style.transitionDelay = Math.min(i % 4, 3) * 70 + 'ms';
      io.observe(el);
    });
  }

  /* ---- 2. count-up: "from|to|suffix" ---- */
  function countUp(el) {
    var spec = el.getAttribute('data-count').split('|');
    var from = parseFloat(spec[0]), to = parseFloat(spec[1]), suffix = spec[2] || '';
    var dec = (spec[1].indexOf('.') > -1) ? 1 : 0;
    var out = el.querySelector('em');
    if (!out || isNaN(from) || isNaN(to)) return;
    var start = null, dur = 1100;
    function step(ts) {
      if (start === null) start = ts;
      var t = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - t, 3);           // matches the calm ease-out
      out.textContent = (from + (to - from) * eased).toFixed(dec) + suffix;
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length && hasIO && !reduce) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { countUp(e.target); cio.unobserve(e.target); }
      });
    }, { threshold: 0.6 });
    Array.prototype.forEach.call(counters, function (el) { cio.observe(el); });
  }

  /* ---- 3. scroll-driven fallback (Firefox, older Safari) ---- */
  var native = CSS && CSS.supports && CSS.supports('animation-timeline', 'view()');
  if (native || reduce) return;
  var tracked = [].slice.call(document.querySelectorAll('.fill, .sec-head'));
  if (!tracked.length) return;
  var ticking = false;
  function frame() {
    ticking = false;
    var vh = window.innerHeight;
    for (var i = 0; i < tracked.length; i++) {
      var el = tracked[i], r = el.getBoundingClientRect();
      var p = (vh - r.top) / (vh * 0.75 + r.height * 0.4);
      p = Math.max(0, Math.min(1, p));
      el.style.setProperty(el.classList.contains('fill') ? '--p' : '--seen', (p * 100).toFixed(1) + '%');
    }
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll, { passive: true });
  frame();
})();
