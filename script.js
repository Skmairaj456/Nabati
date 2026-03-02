/**
 * NABATI ORIGINALS — Editorial e‑commerce
 * Reveals, product CTA, no flashy motion.
 */

(function () {
  'use strict';

  var ease = 'cubic-bezier(0.4, 0, 0.2, 1)';
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ----- Opening: slow reveal (line → title → CTA)
  function initOpening() {
    var openLine = document.querySelector('.open-line');
    var openTitle = document.querySelector('.open-title');
    var openCta = document.querySelector('.open-cta');
    if (!openLine && !openTitle) return;

    var delay = reducedMotion ? 0 : 600;
    window.setTimeout(function () {
      if (openLine) openLine.classList.add('revealed');
    }, delay);
    window.setTimeout(function () {
      if (openTitle) openTitle.classList.add('revealed');
    }, delay + (reducedMotion ? 200 : 900));
    window.setTimeout(function () {
      var openTagline = document.querySelector('.open-tagline');
      if (openTagline) openTagline.classList.add('revealed');
    }, delay + (reducedMotion ? 300 : 1100));
    window.setTimeout(function () {
      if (openCta) openCta.classList.add('revealed');
    }, delay + (reducedMotion ? 400 : 1400));
  }

  // ----- Scroll reveals
  function initReveals() {
    var els = document.querySelectorAll('[data-reveal]');
    if (!els.length) return;

    var delayAttr = 'data-delay';
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var ms = parseInt(el.getAttribute(delayAttr), 10) * 1000 || 0;
        if (ms) {
          setTimeout(function () { el.classList.add('revealed'); }, ms);
        } else {
          el.classList.add('revealed');
        }
      });
    }, { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0 });

    els.forEach(function (el) {
      observer.observe(el);
    });
  }

  // ----- Product CTA bar: visible only after scroll
  function initProductCta() {
    var bar = document.getElementById('product-cta-bar');
    var btn = document.getElementById('product-cta-btn');
    if (!bar) return;

    var trigger = 0.4; // show after 40% of viewport scrolled
    function update() {
      var y = window.scrollY;
      var h = window.innerHeight;
      if (y >= h * trigger) {
        bar.classList.add('visible');
      } else {
        bar.classList.remove('visible');
      }
    }

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();

    // Product page owns Add to Cart (addItem + redirect); no duplicate handler here.
  }

  // ----- Run
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }

  // ----- Cart count in masthead
  function initCartCount() {
    var el = document.getElementById('masthead-cart-count');
    if (!el || !window.NabatiCart) return;
    function update() { el.textContent = window.NabatiCart.getCount(); }
    update();
    window.addEventListener('storage', update);
  }

  // ----- Add to bag (Featured + Collection grid)
  function initAddToBag() {
    if (!window.NabatiCart) return;
    document.querySelectorAll('[data-add]').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        var id = btn.getAttribute('data-add');
        if (id) {
          window.NabatiCart.addItem(id, 1);
          var countEl = document.getElementById('masthead-cart-count');
          if (countEl) countEl.textContent = window.NabatiCart.getCount();
          btn.textContent = 'Added';
          btn.disabled = true;
          setTimeout(function() { btn.textContent = 'Add to bag'; btn.disabled = false; }, 1500);
        }
      });
    });
  }

  function run() {
    initOpening();
    initReveals();
    initProductCta();
    initCartCount();
    initAddToBag();
  }
})();
