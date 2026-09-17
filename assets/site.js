/* Deep Field — presence layer.
   Three small things, no library:
   1. calm reveal on scroll
   2. count-up on the proof metrics (the content is performance, so animate it)
   3. a fallback for browsers without CSS scroll-driven animations
   Everything degrades to the static, fully-legible page. */
(function () {
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasIO = 'IntersectionObserver' in window;

  /* ---- 0. navbar: transparent over the hero, solid once scrolled ---- */
  var header = document.querySelector('header.site');
  if (header && !document.body.classList.contains('lightnav')) {
    var stuck = false;
    var onNav = function () {
      var should = (window.scrollY || document.documentElement.scrollTop) > 40;
      if (should !== stuck) { stuck = should; header.classList.toggle('stuck', stuck); }
    };
    addEventListener('scroll', onNav, { passive: true });
    onNav();
  }

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

  /* ---- 2b. carousels: real scroll containers, so touch and keys work free ---- */
  Array.prototype.forEach.call(document.querySelectorAll('.car'), function (car) {
    var track = car.querySelector('.car-track');
    var slides = [].slice.call(track.children);
    var prev = car.querySelector('[data-car="prev"]');
    var next = car.querySelector('[data-car="next"]');
    var dots = [].slice.call(car.querySelectorAll('.car-dot'));
    var countEl = car.querySelector('.car-count');
    if (!slides.length) return;

    function index() {
      var mid = track.scrollLeft + track.clientWidth / 2;
      var best = 0, bestD = Infinity;
      slides.forEach(function (s, i) {
        var c = s.offsetLeft + s.offsetWidth / 2;
        var d = Math.abs(c - mid);
        if (d < bestD) { bestD = d; best = i; }
      });
      return best;
    }
    function sync() {
      var i = index();
      dots.forEach(function (d, j) { d.setAttribute('aria-current', j === i ? 'true' : 'false'); });
      if (countEl) countEl.textContent = (i + 1) + ' / ' + slides.length;
      if (prev) prev.disabled = i === 0;
      if (next) next.disabled = i === slides.length - 1;
    }
    function go(i) {
      i = Math.max(0, Math.min(slides.length - 1, i));
      track.scrollTo({ left: slides[i].offsetLeft - (track.clientWidth - slides[i].offsetWidth) / 2, behavior: reduce ? 'auto' : 'smooth' });
    }
    if (prev) prev.addEventListener('click', function () { go(index() - 1); });
    if (next) next.addEventListener('click', function () { go(index() + 1); });
    dots.forEach(function (d, j) { d.addEventListener('click', function () { go(j); }); });
    track.addEventListener('scroll', function () {
      clearTimeout(track._t); track._t = setTimeout(sync, 90);
    }, { passive: true });
    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(index() + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(index() - 1); }
    });
    sync();
  });

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
