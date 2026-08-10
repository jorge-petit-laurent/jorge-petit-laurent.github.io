(function(){
  'use strict';

  var HTML_KEYS = { 
    bio: true, 
    filterAll: true, 
    filterClimate: true, 
    filterData: true, 
    filterAwards: true, 
    filterCommunity: true 
  };

  /* ---------- Theme Switcher (Discreet Footer Toggle) ---------- */
  var themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function(){
      var isDark = document.documentElement.classList.toggle('theme-dark');
      try {
        localStorage.setItem('jpl-theme', isDark ? 'dark' : 'light');
      } catch(e){}
    });
  }

  /* ---------- Language Switcher (data-i18n) ---------- */
  var langToggle = document.getElementById('langToggle');

  // Cache Spanish default text before any English swap
  document.querySelectorAll('[data-i18n]').forEach(function(el){
    el.setAttribute('data-i18n-es-cache', el.innerHTML);
  });

  function applyLang(lang){
    document.documentElement.lang = lang;
    var nodes = document.querySelectorAll('[data-i18n]');
    nodes.forEach(function(el){
      var key = el.getAttribute('data-i18n');
      var value = (lang === 'en' && typeof I18N_EN !== 'undefined' && I18N_EN[key] !== undefined)
        ? I18N_EN[key]
        : el.getAttribute('data-i18n-es-cache');
      if (HTML_KEYS[key]) { 
        el.innerHTML = value; 
      } else { 
        el.textContent = value; 
      }
    });
  }

  var isEn = document.documentElement.lang === 'en';
  if (isEn && langToggle) {
    langToggle.classList.add('is-en');
    langToggle.setAttribute('aria-pressed', 'true');
    applyLang('en');
  }
  document.body.style.visibility = 'visible';

  if (langToggle) {
    langToggle.addEventListener('click', function(){
      isEn = !isEn;
      langToggle.classList.toggle('is-en', isEn);
      langToggle.setAttribute('aria-pressed', isEn ? 'true' : 'false');
      var lang = isEn ? 'en' : 'es';
      applyLang(lang);
      try { localStorage.setItem('jpl-lang', lang); } catch(e){}
      if (overlay.classList.contains('is-open') && currentCardId) {
        renderModal(currentCardId);
      }
    });
  }

  /* ---------- Identity 3D Flip Card ---------- */
  var identity = document.getElementById('identity');
  if (identity) {
    function toggleIdentity(e){
      var flipped = identity.classList.toggle('is-flipped');
      identity.setAttribute('aria-pressed', flipped ? 'true' : 'false');
    }
    identity.addEventListener('click', toggleIdentity);
    identity.addEventListener('keydown', function(e){
      if (e.key === 'Enter' || e.key === ' ') { 
        e.preventDefault(); 
        toggleIdentity(); 
      }
    });
  }

  /* ---------- Category Filter Pills ---------- */
  var filterBtns = document.querySelectorAll('.filter-btn');
  var bentoCards = document.querySelectorAll('.card');

  filterBtns.forEach(function(btn){
    btn.addEventListener('click', function(){
      var filter = btn.getAttribute('data-filter');

      filterBtns.forEach(function(b){ b.classList.remove('is-active'); });
      btn.classList.add('is-active');

      bentoCards.forEach(function(card){
        var categories = card.getAttribute('data-category') || '';
        if (filter === 'all' || categories.indexOf(filter) !== -1) {
          card.classList.remove('is-hidden');
          // Re-trigger scroll reveal animation
          setTimeout(function(){ card.classList.add('is-visible'); }, 50);
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });

  /* ---------- Mouse Position Tracker for Sheen Effect ---------- */
  bentoCards.forEach(function(card){
    card.addEventListener('mousemove', function(e){
      var rect = card.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', x + 'px');
      card.style.setProperty('--mouse-y', y + 'px');
    });
  });

  /* ---------- Scroll Reveal Observer ---------- */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(entries, obs){
      entries.forEach(function(entry){
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
    bentoCards.forEach(function(c){ io.observe(c); });
  } else {
    bentoCards.forEach(function(c){ c.classList.add('is-visible'); });
  }

  /* ---------- Modal Drawer Overlay & Carousel ---------- */
  var overlay = document.getElementById('modalOverlay');
  var modalPanel = overlay ? overlay.querySelector('.modal-panel') : null;
  var modalCarousel = document.getElementById('modalCarousel');
  var modalCarouselTrack = document.getElementById('modalCarouselTrack');
  var modalCarouselPrev = document.getElementById('modalCarouselPrev');
  var modalCarouselNext = document.getElementById('modalCarouselNext');
  var modalCarouselDots = document.getElementById('modalCarouselDots');
  var modalTag = document.getElementById('modalTag');
  var modalTitle = document.getElementById('modalTitle');
  var modalBody = document.getElementById('modalBody');
  var modalLinks = document.getElementById('modalLinks');
  var modalEmbed = document.getElementById('modalEmbed');
  var modalClose = document.getElementById('modalClose');

  var lastFocused = null;
  var currentCardId = null;
  var lastRenderedId = null;
  var carouselCount = 0;

  function currentSlideIndex(){
    var slides = modalCarouselTrack ? modalCarouselTrack.children : [];
    if (!slides || !slides.length) return 0;
    var scrollLeft = modalCarouselTrack.scrollLeft;
    var closestIndex = 0;
    var minDiff = Infinity;
    for (var i = 0; i < slides.length; i++) {
      var diff = Math.abs(slides[i].offsetLeft - scrollLeft);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = i;
      }
    }
    return closestIndex;
  }
  function goToSlide(index, smooth){
    if (!carouselCount || !modalCarouselTrack || !modalCarouselTrack.children.length) return;
    var i = ((index % carouselCount) + carouselCount) % carouselCount;
    var targetSlide = modalCarouselTrack.children[i];
    if (targetSlide) {
      modalCarouselTrack.scrollTo({ 
        left: targetSlide.offsetLeft, 
        behavior: smooth === false ? 'auto' : 'smooth' 
      });
    }
  }
  function updateActiveDot(){
    var i = currentSlideIndex();
    if (modalCarouselDots) {
      Array.prototype.forEach.call(modalCarouselDots.children, function(dot, idx){
        dot.classList.toggle('is-active', idx === i);
      });
    }
  }

  if (modalCarouselPrev && modalCarouselNext) {
    modalCarouselPrev.addEventListener('click', function(){ goToSlide(currentSlideIndex() - 1); });
    modalCarouselNext.addEventListener('click', function(){ goToSlide(currentSlideIndex() + 1); });
  }
  if (modalCarouselTrack) {
    modalCarouselTrack.addEventListener('scroll', updateActiveDot);
  }

  function renderModal(id){
    if (typeof CARD_DATA === 'undefined') return;
    var data = CARD_DATA[id];
    if (!data) return;
    var lang = isEn ? 'en' : 'es';
    var content = data[lang];
    var photos = data.photos || [];
    var sameCard = id === lastRenderedId;
    var prevIndex = (sameCard && carouselCount) ? currentSlideIndex() : 0;

    modalCarouselTrack.innerHTML = '';
    modalCarouselDots.innerHTML = '';
    carouselCount = photos.length;

    photos.forEach(function(src, i){
      var img = document.createElement('img');
      img.src = src;
      img.alt = photos.length > 1 ? content.title + ' — ' + (i + 1) + '/' + photos.length : content.title;
      modalCarouselTrack.appendChild(img);

      if (photos.length > 1) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'modal-carousel-dot' + (i === 0 ? ' is-active' : '');
        dot.setAttribute('aria-label', (isEn ? 'Go to photo ' : 'Ir a la foto ') + (i + 1));
        dot.addEventListener('click', function(){ goToSlide(i); });
        modalCarouselDots.appendChild(dot);
      }
    });

    modalCarousel.hidden = photos.length === 0;
    if (modalCarouselPrev && modalCarouselNext) {
      modalCarouselPrev.hidden = modalCarouselNext.hidden = modalCarouselDots.hidden = photos.length < 2;
    }
    if (photos.length) { 
      goToSlide(sameCard ? prevIndex : 0, false); 
    }
    lastRenderedId = id;

    modalTag.textContent = content.tag;
    modalTitle.textContent = content.title;
    modalBody.textContent = content.body;

    modalLinks.innerHTML = '';
    (content.links || []).forEach(function(link){
      var a = document.createElement('a');
      a.href = link.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = '→ ' + link.label;
      modalLinks.appendChild(a);
    });

    if (data.embed_html) {
      modalEmbed.innerHTML = data.embed_html;
      modalEmbed.hidden = false;
    } else {
      modalEmbed.innerHTML = '';
      modalEmbed.hidden = true;
    }
  }

  function getModalFocusable(){
    if (!modalPanel) return [];
    return Array.prototype.slice.call(
      modalPanel.querySelectorAll('a[href], button:not([hidden])')
    ).filter(function(el){ return el.offsetParent !== null; });
  }

  function trapTabKey(e){
    if (e.key !== 'Tab') return;
    var focusable = getModalFocusable();
    if (!focusable.length) return;
    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  }

  function openModal(id){
    currentCardId = id;
    lastFocused = document.activeElement;
    renderModal(id);
    overlay.classList.add('is-open');
    if (modalClose) modalClose.focus();
  }

  function closeModal(){
    overlay.classList.remove('is-open');
    currentCardId = null;
    if (lastFocused) { lastFocused.focus(); }
  }

  bentoCards.forEach(function(card){
    card.addEventListener('click', function(){ 
      openModal(card.getAttribute('data-id')); 
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (overlay) {
    overlay.addEventListener('click', function(e){ 
      if (e.target === overlay) closeModal(); 
    });
  }

  document.addEventListener('keydown', function(e){
    if (!overlay || !overlay.classList.contains('is-open')) return;
    if (e.key === 'Escape') { closeModal(); return; }
    if (carouselCount > 1 && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
      goToSlide(currentSlideIndex() + (e.key === 'ArrowRight' ? 1 : -1));
      return;
    }
    trapTabKey(e);
  });
})();
