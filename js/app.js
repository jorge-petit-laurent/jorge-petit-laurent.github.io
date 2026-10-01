(function(){
  'use strict';

  var doc = document.documentElement;
  var reduceMotion = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasGsap = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';
  var isEn = doc.lang === 'en';

  I18N_EN['bot.hint'] = 'Scroll to continue';
  I18N_EN['bot.cv'] = 'Download CV (PDF)';
  I18N_EN['bot.atlas'] = 'Atlas of the physical and political history of Chile';
  I18N_EN['bot.plate1'] = 'Pl. I';
  I18N_EN['bot.plate2'] = 'Pl. II';
  I18N_EN['bot.s1'] = 'Pl. 58';
  I18N_EN['bot.s2'] = 'Pl. 68';
  I18N_EN['bot.s3'] = 'Pl. 71';

  /* ---------- i18n: Spanish is the HTML, English comes from I18N_EN ---------- */
  var i18nNodes = document.querySelectorAll('[data-i18n]');
  i18nNodes.forEach(function(el){ el.setAttribute('data-es', el.innerHTML); });
  var ariaNodes = document.querySelectorAll('[data-i18n-aria]');
  ariaNodes.forEach(function(el){ el.setAttribute('data-es-aria', el.getAttribute('aria-label') || ''); });

  function applyLang(lang){
    doc.lang = lang;
    i18nNodes.forEach(function(el){
      var k = el.getAttribute('data-i18n');
      el.innerHTML = (lang === 'en' && I18N_EN[k] !== undefined) ? I18N_EN[k] : el.getAttribute('data-es');
    });
    ariaNodes.forEach(function(el){
      var k = el.getAttribute('data-i18n-aria');
      el.setAttribute('aria-label', (lang === 'en' && I18N_EN[k] !== undefined) ? I18N_EN[k] : el.getAttribute('data-es-aria'));
    });
    document.querySelectorAll('[data-cv]').forEach(function(l){ l.href = 'assets/cv/Jorge_Petit-Laurent_CV_' + (lang === 'en' ? 'EN' : 'ES') + '.pdf'; });
    renderArchive();
    renderTrail();
    if (overlay.classList.contains('is-open') && currentId) renderModal(currentId);
  }

  var langToggle = document.getElementById('langToggle');
  langToggle.addEventListener('click', function(){
    isEn = !isEn;
    langToggle.classList.toggle('is-en', isEn);
    langToggle.setAttribute('aria-pressed', isEn ? 'true' : 'false');
    applyLang(isEn ? 'en' : 'es');
    try { localStorage.setItem('jpl-lang', isEn ? 'en' : 'es'); } catch(e){}
  });

  /* ---------- archive index ---------- */
  var archiveList = document.getElementById('archiveList');
  var activeFilter = 'all';

  function renderArchive(){
    var lang = isEn ? 'en' : 'es';
    archiveList.innerHTML = '';
    ARCHIVE_ORDER.forEach(function(id){
      var d = CARD_DATA[id], c = d[lang];
      var li = document.createElement('li');
      li.className = 'ix';
      li.setAttribute('data-cats', d.cats);
      li.style.setProperty('--c1', d.c1);
      li.style.setProperty('--c2', d.c2);
      li.hidden = !(activeFilter === 'all' || d.cats.indexOf(activeFilter) !== -1);
      li.innerHTML =
        '<button type="button" class="ix-btn" data-open="' + id + '">' +
          '<span class="ix-y mono">' + d.year + '</span>' +
          '<svg class="ix-icon" aria-hidden="true"><use href="#icon-' + d.icon + '"></use></svg>' +
          '<span class="ix-t">' + c.title + '</span>' +
          '<span class="ix-tag">' + c.tag + '</span>' +
        '</button>';
      archiveList.appendChild(li);
    });
  }

  document.querySelectorAll('.filter').forEach(function(btn){
    btn.addEventListener('click', function(){
      activeFilter = btn.getAttribute('data-filter');
      document.querySelectorAll('.filter').forEach(function(b){ b.classList.toggle('is-active', b === btn); });
      var n = 0;
      archiveList.querySelectorAll('.ix').forEach(function(li){
        li.hidden = !(activeFilter === 'all' || li.getAttribute('data-cats').indexOf(activeFilter) !== -1);
        if (!li.hidden) li.style.setProperty('--i', Math.min(n++, 14));
      });
      archiveList.classList.remove('is-refresh'); void archiveList.offsetWidth; archiveList.classList.add('is-refresh');
    });
  });

  /* ---------- the route: an elevation profile of the last five years ---------- */
  var TRAIL = [
    { y:'2021', alt:.05, open:'admission', es:'Ingreso a la UAI', en:'Start at UAI' },
    { y:'2022', alt:.14, open:'tid', es:'Premio TID e intercambio en México', en:'TID award, exchange in Mexico' },
    { y:'2023', alt:.10, open:'docongress', es:'Primer póster, Data Observatory', en:'First poster, Data Observatory' },
    { y:'2024', alt:.24, open:'acciona', es:'Las Campanas y ACCIONA', en:'Las Campanas and ACCIONA' },
    { y:'2024', alt:.30, open:'upenn', es:'Beca Santander, Pensilvania', en:'Santander scholarship, Pennsylvania' },
    { y:'2024', alt:.27, open:'atamostec', es:'Póster y Ruta del Sol', en:'Poster and Ruta del Sol' },
    { y:'2025', alt:.44, open:'thesis', es:'Magíster y fondo FEI', en:'MSc and FEI grant' },
    { y:'2025', alt:.56, open:'sherpas', es:'Sherpas', en:'Sherpas' },
    { y:'2025', alt:.50, open:'conference', es:'SICyR, CEES y beca de tesis', en:'SICyR, CEES and thesis grant' },
    { y:'2026', alt:.66, open:'calabria', es:'Calabria, Italia', en:'Calabria, Italy' },
    { y:'2026', alt:.82, open:'eeeic', es:'Lisboa, EEEIC', en:'Lisbon, EEEIC' },
    { y:'2026', alt:.96, open:'defense', es:'Titulación y paper publicado', en:'Graduation and published paper' }
  ];
  var trail = document.getElementById('trail');
  var trailBuilt = false;
  var W = 1200, H = 420, PADX = 56, TOP = 120, BOTTOM = 40;

  function trailPoints(){
    return TRAIL.map(function(p, i){
      return { x: PADX + i * (W - 2 * PADX) / (TRAIL.length - 1), y: H - BOTTOM - p.alt * (H - TOP - BOTTOM) };
    });
  }
  function smoothPath(pts){
    var d = 'M' + pts[0].x + ' ' + pts[0].y;
    for (var i = 0; i < pts.length - 1; i++) {
      var p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
      var c1x = p1.x + (p2.x - p0.x) / 6, c1y = p1.y + (p2.y - p0.y) / 6;
      var c2x = p2.x - (p3.x - p1.x) / 6, c2y = p2.y - (p3.y - p1.y) / 6;
      d += ' C' + c1x.toFixed(1) + ' ' + c1y.toFixed(1) + ',' + c2x.toFixed(1) + ' ' + c2y.toFixed(1) + ',' + p2.x.toFixed(1) + ' ' + p2.y.toFixed(1);
    }
    return d;
  }

  var STOPS = [[92,168,133],[237,176,72],[219,36,66]];
  function bloom(t){
    var k = t < 0.5 ? 0 : 1, f = t < 0.5 ? t * 2 : (t - 0.5) * 2, a = STOPS[k], b = STOPS[k + 1];
    return 'rgb(' + a.map(function(v, j){ return Math.round(v + (b[j] - v) * f); }).join(',') + ')';
  }
  function renderTrail(){
    var lang = isEn ? 'en' : 'es';
    var pts = trailPoints();
    var d = smoothPath(pts);
    var area = d + ' L' + pts[pts.length - 1].x + ' ' + (H - BOTTOM + 14) + ' L' + pts[0].x + ' ' + (H - BOTTOM + 14) + ' Z';
    var marks = '';
    for (var g = 0; g < 6; g++) {
      var gy = H - BOTTOM - g * (H - TOP - BOTTOM) / 5;
      marks += '<line x1="0" x2="' + W + '" y1="' + gy + '" y2="' + gy + '" class="trail-grid' + (g % 5 === 0 ? ' major' : '') + '"/>';
    }
    var dots = TRAIL.map(function(p, i){
      var pt = pts[i];
      return '<button type="button" class="wp" data-open="' + p.open + '" style="--fc:' + bloom(i / (TRAIL.length - 1)) + ';left:' + (pt.x / W * 100).toFixed(2) + '%;top:' + (pt.y / H * 100).toFixed(2) + '%">' +
        '<span class="wp-dot"></span><span class="wp-label"><span class="wp-y mono">' + p.y + '</span>' + p[lang] + '</span></button>';
    }).join('');
    var list = TRAIL.map(function(p, i){
      return '<li style="--fc:' + bloom(i / (TRAIL.length - 1)) + '"><button type="button" data-open="' + p.open + '"><span class="mono">' + p.y + '</span> ' + p[lang] + '</button></li>';
    }).join('');

    trail.innerHTML =
      '<svg class="trail-svg" viewBox="0 0 ' + W + ' ' + H + '" aria-hidden="true"><defs><linearGradient id="tg" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="' + W + '" y2="0"><stop offset="0" stop-color="#5CA885"/><stop offset=".5" stop-color="#EDB048"/><stop offset="1" stop-color="#DB2442"/></linearGradient></defs>' +
        marks + '<clipPath id="tc"><rect id="tcr" x="0" y="0" width="0" height="' + H + '"/></clipPath><path class="trail-area" clip-path="url(#tc)" d="' + area + '"/><path class="trail-line-bg" d="' + d + '"/><path class="trail-line" id="trailLine" d="' + d + '"/></svg>' +
      '<div class="wps">' + dots + '</div>' +
      '<ol class="trail-list">' + list + '</ol>';

    var line = document.getElementById('trailLine');
    var len = line.getTotalLength();
    line.style.strokeDasharray = len;
    var wps = trail.querySelectorAll('.wp');
    var clipR = document.getElementById('tcr');
    if (!hasGsap || reduceMotion) {
      line.style.strokeDashoffset = 0; clipR.setAttribute('width', W);
      wps.forEach(function(w){ w.classList.add('is-on'); });
      trail.classList.add('is-drawn');
      return;
    }
    line.style.strokeDashoffset = trailBuilt ? 0 : len;
    if (trailBuilt) { wps.forEach(function(w){ w.classList.add('is-on'); }); clipR.setAttribute('width', W); trail.classList.add('is-drawn'); return; }
    trailBuilt = true;
    ScrollTrigger.create({
      trigger: trail, start: 'top 78%', end: 'bottom 55%', scrub: 0.6,
      onUpdate: function(self){
        var l = document.getElementById('trailLine');
        l.style.strokeDashoffset = len * (1 - self.progress);
        document.getElementById('tcr').setAttribute('width', W * self.progress);
        trail.querySelectorAll('.wp').forEach(function(w, i){
          w.classList.toggle('is-on', self.progress >= i / (TRAIL.length - 1) - 0.02);
        });
        trail.classList.toggle('is-drawn', self.progress > 0.98);
      }
    });
  }

  /* ---------- modal ---------- */
  var overlay = document.getElementById('modalOverlay');
  var panel = overlay.querySelector('.modal-panel');
  var carousel = document.getElementById('modalCarousel');
  var track = document.getElementById('modalCarouselTrack');
  var prevBtn = document.getElementById('modalCarouselPrev');
  var nextBtn = document.getElementById('modalCarouselNext');
  var dots = document.getElementById('modalCarouselDots');
  var mTag = document.getElementById('modalTag');
  var mTitle = document.getElementById('modalTitle');
  var mBody = document.getElementById('modalBody');
  var mLinks = document.getElementById('modalLinks');
  var mEmbed = document.getElementById('modalEmbed');
  var mClose = document.getElementById('modalClose');
  var lastFocus = null, currentId = null, lastRendered = null, slideCount = 0;

  function slideIndex(){
    var kids = track.children; if (!kids.length) return 0;
    var best = 0, min = Infinity;
    for (var i = 0; i < kids.length; i++) { var diff = Math.abs(kids[i].offsetLeft - track.scrollLeft); if (diff < min) { min = diff; best = i; } }
    return best;
  }
  function goTo(i, smooth){
    if (!slideCount) return;
    var n = ((i % slideCount) + slideCount) % slideCount;
    track.scrollTo({ left: track.children[n].offsetLeft, behavior: smooth === false ? 'auto' : 'smooth' });
  }
  prevBtn.addEventListener('click', function(){ goTo(slideIndex() - 1); });
  nextBtn.addEventListener('click', function(){ goTo(slideIndex() + 1); });
  track.addEventListener('scroll', function(){
    var i = slideIndex();
    Array.prototype.forEach.call(dots.children, function(d, k){ d.classList.toggle('is-active', k === i); });
  });

  function renderModal(id){
    var data = CARD_DATA[id]; if (!data) return;
    var c = data[isEn ? 'en' : 'es'];
    var photos = data.photos || [];
    var same = id === lastRendered;
    var keep = same && slideCount ? slideIndex() : 0;
    track.innerHTML = ''; dots.innerHTML = ''; slideCount = photos.length;
    photos.forEach(function(src, i){
      var img = document.createElement('img');
      img.src = src; img.alt = c.title + (photos.length > 1 ? ' (' + (i + 1) + '/' + photos.length + ')' : ''); img.loading = 'lazy';
      track.appendChild(img);
      if (photos.length > 1) {
        var dot = document.createElement('button');
        dot.type = 'button'; dot.className = 'modal-carousel-dot' + (i === 0 ? ' is-active' : '');
        dot.setAttribute('aria-label', (isEn ? 'Photo ' : 'Foto ') + (i + 1));
        dot.addEventListener('click', function(){ goTo(i); });
        dots.appendChild(dot);
      }
    });
    carousel.hidden = !photos.length;
    prevBtn.hidden = nextBtn.hidden = dots.hidden = photos.length < 2;
    if (photos.length) goTo(keep, false);
    lastRendered = id;

    mTag.textContent = c.tag; mTitle.textContent = c.title; mBody.textContent = c.body;
    mLinks.innerHTML = '';
    (c.links || []).forEach(function(l){
      var a = document.createElement('a');
      a.href = l.url; a.target = '_blank'; a.rel = 'noopener noreferrer'; a.textContent = l.label;
      mLinks.appendChild(a);
    });
    if (data.embed_html) { mEmbed.innerHTML = data.embed_html; mEmbed.hidden = false; }
    else { mEmbed.innerHTML = ''; mEmbed.hidden = true; }
    panel.scrollTop = 0;
  }

  function openModal(id){
    if (!CARD_DATA[id]) return;
    currentId = id; lastFocus = document.activeElement;
    renderModal(id);
    if (window.Botanico && Botanico.dress) Botanico.dress();
    overlay.classList.add('is-open');
    doc.classList.add('modal-open');
    if (window.lenis) window.lenis.stop();
    mClose.focus();
  }
  function closeModal(){
    overlay.classList.remove('is-open');
    doc.classList.remove('modal-open');
    if (window.lenis) window.lenis.start();
    currentId = null; lastRendered = null;
    mEmbed.innerHTML = '';
    if (lastFocus) lastFocus.focus();
  }
  document.addEventListener('click', function(e){
    var t = e.target.closest('[data-open]');
    if (t) { e.preventDefault(); openModal(t.getAttribute('data-open')); }
  });
  mClose.addEventListener('click', closeModal);
  overlay.addEventListener('click', function(e){ if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', function(e){
    if (!overlay.classList.contains('is-open')) return;
    if (e.key === 'Escape') { closeModal(); return; }
    if (slideCount > 1 && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) { goTo(slideIndex() + (e.key === 'ArrowRight' ? 1 : -1)); return; }
    if (e.key === 'Tab') {
      var f = Array.prototype.slice.call(panel.querySelectorAll('a[href], button:not([hidden])')).filter(function(el){ return el.offsetParent !== null; });
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ---------- inline expanders (extended abstract, thesis details) ---------- */
  document.querySelectorAll('[data-toggle]').forEach(function(btn){
    btn.addEventListener('click', function(){
      var panel = document.getElementById(btn.getAttribute('data-toggle'));
      var open = panel.hidden;
      panel.hidden = !open;
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (window.ScrollTrigger) setTimeout(function(){ ScrollTrigger.refresh(); }, 60);
    });
  });

  /* ---------- initial render ---------- */
  if (isEn) { langToggle.classList.add('is-en'); langToggle.setAttribute('aria-pressed', 'true'); }
  applyLang(isEn ? 'en' : 'es');

  /* ---------- header state + progress ---------- */
  var bar = document.getElementById('bar');
  var progress = document.getElementById('barProgress');
  function onScroll(){
    var y = window.scrollY || doc.scrollTop;
    bar.classList.add('is-stuck');
    var max = doc.scrollHeight - window.innerHeight;
    progress.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, y / max) : 0) + ')';
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();


  /* ---------- motion: smooth scroll + botanical curtains ---------- */
  if (hasGsap && !reduceMotion) {
    gsap.registerPlugin(ScrollTrigger);
    if (typeof Lenis !== 'undefined' && matchMedia('(hover: hover) and (pointer: fine)').matches) {
      var lenis = new Lenis({ lerp: 0.12, wheelMultiplier: 0.9 });
      window.lenis = lenis;
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(function(t){ lenis.raf(t * 1000); });
      gsap.ticker.lagSmoothing(0);
      document.querySelectorAll('a[href^="#"]').forEach(function(a){
        a.addEventListener('click', function(e){
          var id = a.getAttribute('href');
          var target = id.length > 1 ? document.querySelector(id) : null;
          if (id === '#top') { e.preventDefault(); lenis.scrollTo(0); }
          else if (target) { e.preventDefault(); lenis.scrollTo(target, { offset: id === '#contacto' ? 0 : -60 }); history.replaceState(null, '', id); }
        });
      });
    }
  } else {
    document.querySelectorAll('a[href^="#"]').forEach(function(a){
      a.addEventListener('click', function(e){
        var id = a.getAttribute('href'), target = id.length > 1 ? document.querySelector(id) : null;
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'auto' }); }
      });
    });
  }
  if (window.Botanico) Botanico.init();
})();
