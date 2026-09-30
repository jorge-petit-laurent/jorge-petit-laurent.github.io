/* Telón botánico: láminas de Claudio Gay que nacen desde el marco, se abren como un telón al bajar y se cierran en el contacto. */
(function(){
'use strict';
// [archivo, ancho, alto, margen inferior de sombra, capa 0 fondo·1 media·2 frente, lámina, serie F|C]
var PLANTS = [["f00",398,514,0.0331,0,68,"F"],["f01",362,514,0.0331,0,59,"F"],["f02",352,514,0.0331,0,61,"F"],["f03",385,514,0.0331,0,62,"F"],["f04",321,514,0.0331,0,34,"F"],["f05",288,514,0.0331,0,67,"F"],["f06",375,514,0.0331,0,8,"F"],["f07",316,514,0.0331,0,63,"F"],["f08",397,514,0.0331,0,25,"F"],["f09",312,514,0.0331,0,11,"F"],["f10",370,514,0.0331,0,47,"F"],["f11",362,514,0.0331,0,45,"F"],["f12",365,514,0.0331,1,58,"F"],["f13",361,514,0.0331,1,71,"F"],["f14",402,514,0.0331,1,35,"F"],["f15",370,514,0.0331,1,7,"F"],["f16",469,514,0.0331,1,17,"F"],["f17",394,514,0.0331,1,43,"F"],["f18",316,514,0.0331,1,57,"F"],["f19",165,514,0.0331,1,20,"F"],["f20",185,514,0.0331,1,67,"F"],["f21",186,514,0.0331,1,66,"F"],["f22",326,514,0.0331,1,19,"F"],["f23",383,514,0.0331,1,56,"F"],["f24",389,514,0.0331,1,27,"F"],["f25",514,392,0.0434,1,28,"F"],["f26",253,514,0.0331,1,10,"F"],["f27",442,514,0.0331,1,5,"F"],["f28",269,514,0.0331,1,3,"F"],["f29",305,514,0.0331,1,16,"F"],["f30",336,514,0.0331,1,41,"F"],["f31",274,514,0.0331,1,15,"F"],["f32",269,514,0.0331,1,32,"F"],["f33",330,514,0.0331,1,30,"F"],["f34",332,514,0.0331,1,24,"F"],["f35",321,514,0.0331,1,70,"F"],["f36",352,514,0.0331,1,48,"F"],["f37",289,514,0.0331,1,18,"F"],["f38",386,514,0.0331,1,2,"C"],["f39",315,514,0.0331,1,79,"F"],["f40",322,514,0.0331,2,39,"F"],["f41",253,452,0.0332,2,35,"F"],["f42",467,514,0.0331,2,1,"F"],["f43",365,507,0.0335,2,22,"F"],["f44",225,514,0.0331,2,5,"F"],["f45",514,447,0.038,2,14,"F"],["f46",451,514,0.0331,2,44,"F"],["f47",228,514,0.0331,2,76,"F"],["f48",341,514,0.0331,2,23,"F"],["f49",241,514,0.0331,2,75,"F"]];
var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
var fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
var lowEnd = !fine || (navigator.hardwareConcurrency || 8) <= 4 || (navigator.deviceMemory || 8) <= 4;
var dprCap = Math.min(window.devicePixelRatio || 1, fine ? 2 : 1.5);
var doc = document.documentElement;
var curtains = [], tip = null;

function rng(seed){ return function(){ seed |= 0; seed = seed + 0x6D2B79F5 | 0; var t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function wrap180(a){ return ((a + 180) % 360 + 360) % 360 - 180; }
function ang(ux, uy){ return Math.atan2(ux, -uy) * 180 / Math.PI; }   // rotación que lleva el "arriba" de la lámina hacia (ux, uy)
function norm(x, y){ var l = Math.hypot(x, y) || 1; return [x / l, y / l]; }
function origin(p){ return '50% ' + ((1 - p[3]) * 100).toFixed(2) + '%'; }   // base del tallo, sin el margen de la sombra

/* recorrido del marco: devuelve punto, normal hacia adentro, tangente y posición relativa al centro del lado (-1…1) */
function edgeAt(t, W, H){
  var P = 2 * (W + H); t = ((t % P) + P) % P;
  if (t < W) return { x: t, y: 0, nx: 0, ny: 1, tx: 1, ty: 0, o: (t - W / 2) / (W / 2) };
  t -= W; if (t < H) return { x: W, y: t, nx: -1, ny: 0, tx: 0, ty: 1, o: (t - H / 2) / (H / 2) };
  t -= H; if (t < W) return { x: W - t, y: H, nx: 0, ny: -1, tx: -1, ty: 0, o: (t - W / 2) / (W / 2) };
  t -= W; return { x: 0, y: H - t, nx: 1, ny: 0, tx: 0, ty: -1, o: (t - H / 2) / (H / 2) };
}

function pick(cls, n, closing){
  var list = PLANTS.filter(function(p){ return p[4] === cls; });
  if (closing) list = list.slice().reverse();
  return list.slice(0, Math.min(n, list.length));
}

function setup(el){
  var c = { el: el, plate: el.querySelector('.plate'), box: el.querySelector('.plants'), mode: el.getAttribute('data-curtain'),
            tl: null, items: [], groups: [], visible: el.getAttribute('data-curtain') === 'open' };
  for (var g = 0; g < 3; g++) { var d = document.createElement('div'); d.className = 'pg pg' + g; c.box.appendChild(d); c.groups.push(d); }
  if (fine && !reduce) {
    c.qx = c.groups.map(function(g){ return gsap.quickTo(g, 'x', { duration: 1.4, ease: 'power3.out' }); });
    c.qy = c.groups.map(function(g){ return gsap.quickTo(g, 'y', { duration: 1.4, ease: 'power3.out' }); });
  }
  c.box.addEventListener('pointerover', function(e){ var it = e.target._it; if (!it) return; wiggle(it.gr); showTip(it.p, e); });
  c.box.addEventListener('pointermove', moveTip, { passive: true });
  c.box.addEventListener('pointerout', function(e){ if (e.target._it) hideTip(); });
  return c;
}

function populate(c, counts){
  c.groups.forEach(function(g){ g.textContent = ''; });
  c.items = [];
  var closing = c.mode === 'close';
  [0, 1, 2].forEach(function(cls){
    pick(cls, counts[cls], closing).forEach(function(p){
      var pl = document.createElement('div'); pl.className = 'pl';
      var gr = document.createElement('div'); gr.className = 'gr';
      var im = new Image(); im.alt = ''; im.decoding = 'async'; im.draggable = false;
      gr.appendChild(im); pl.appendChild(gr); c.groups[cls].appendChild(pl);
      var it = { p: p, pl: pl, gr: gr, im: im, cls: cls };
      im._it = it; c.items.push(it);
    });
  });
}

function load(c){
  c.items.forEach(function(it){
    var big = it.h * dprCap > 520 ? '-l' : '-s';
    if (it.src === big) return;
    if (it.src === '-l') return;      // nunca bajar de resolución
    it.src = big; it.im.src = 'lam/' + it.p[0] + big + '.webp';
  });
}

function wiggle(el){
  if (reduce || el._w) return;
  var s = Math.random() < 0.5 ? -1 : 1;
  el._w = gsap.timeline({ onComplete: function(){ el._w = null; } })
    .to(el, { rotation: s * 3.2, duration: 0.2, ease: 'sine.out' })
    .to(el, { rotation: 0, duration: 1.2, ease: 'elastic.out(1.1, 0.32)' });
}

/* leyenda de lámina que sigue al puntero */
function showTip(p, e){
  if (!fine) return;
  if (!tip) { tip = document.createElement('div'); tip.className = 'lam-tip'; tip.setAttribute('aria-hidden', 'true'); document.body.appendChild(tip); }
  var en = doc.lang === 'en';
  var series = p[6] === 'C' ? (en ? 'Cryptogamia' : 'Criptogamia') : (en ? 'Phanerogamia' : 'Fanerogamia');
  tip.innerHTML = '<em>' + series + ', ' + (en ? 'pl. ' : 'lám. ') + p[5] + '</em><span>Claudio Gay</span>';
  tip.classList.add('is-on'); moveTip(e);
}
function moveTip(e){ if (tip && tip.classList.contains('is-on')) tip.style.transform = 'translate3d(' + (e.clientX + 16) + 'px,' + (e.clientY + 18) + 'px,0)'; }
function hideTip(){ if (tip) tip.classList.remove('is-on'); }

function panelTargets(c){ return c.el.querySelectorAll('.panel, .panel .cart, .panel li, .foot-h, .foot-p, .foot-mail, .foot-small'); }

function build(c){
  if (c.tl) { c.tl.scrollTrigger && c.tl.scrollTrigger.kill(true); c.tl.kill(); c.tl = null; }
  if (c.pin) { c.pin.kill(true); c.pin = null; }
  gsap.set(panelTargets(c), { clearProps: 'all' });
  gsap.set(c.groups, { clearProps: 'scale' });
  if (!reduce) c.el.classList.add('is-live');

  var W = c.box.clientWidth, H = c.box.clientHeight, cx = W / 2, cy = H / 2;
  var small = Math.min(innerWidth, innerHeight * 1.2) < 700, mid = innerWidth < 1100;
  var counts = small ? [6, 14, 6] : mid ? [9, 20, 8] : [12, 26, 10];
  populate(c, counts);

  var opening = c.mode === 'open';
  var R = rng(opening ? 11 : 29), P = 2 * (W + H);
  var sink = [0.10, 0.08, 0.06], reachK = [1.02, 0.74, 0.47], vis = [0.25, 0.31, 0.40], off = [0, 0.5, 0.25];
  var ringN = [0, 0, 0]; c.items.forEach(function(it){ ringN[it.cls]++; });
  var ringI = [0, 0, 0];

  c.items.forEach(function(it){
    var p = it.p, r = it.cls, n = ringN[r], i = ringI[r]++;
    var e = edgeAt((i + off[r] + (R() - 0.5) * 0.45) * P / n + (opening ? 0 : P * 0.13), W, H);
    var d = norm(cx - e.x, cy - e.y);
    var u = norm(e.nx * 0.55 + d[0] * 0.45, e.ny * 0.55 + d[1] * 0.45);
    var D = Math.hypot(cx - e.x, cy - e.y);
    var Lp = Math.max(D * reachK[r] * (0.9 + R() * 0.24), Math.min(W, H) * [0.34, 0.24, 0.15][r]);
    Lp = Math.min(Lp, Math.max(W, H) * [0.8, 0.5, 0.3][r]) / (1 - sink[r]);   // las ramitas del frente no crecen tanto en pantallas anchas
    var py = p[3], aspect = p[1] / p[2];
    var hT = Lp / (1 - 2 * py), wT = hT * aspect;
    it.h = hT;
    it.im.style.width = wT + 'px';
    it.im.style.transformOrigin = it.gr.style.transformOrigin = origin(p);
    if (!lowEnd) { it.im.style.setProperty('--sd', (5 + R() * 4).toFixed(2) + 's'); it.im.style.setProperty('--sdl', (-R() * 8).toFixed(2) + 's'); }
    var flip = R() < 0.5 ? -1 : 1;
    var A = { x: e.x - u[0] * Lp * sink[r], y: e.y - u[1] * Lp * sink[r], rotation: ang(u[0], u[1]) + (R() - 0.5) * 16 };
    var uo = norm(u[0] + e.tx * e.o * 0.5, u[1] + e.ty * e.o * 0.5);
    var back = Lp * (1 - vis[r] * (0.88 + R() * 0.24));
    var B = { x: e.x - u[0] * back + e.tx * e.o * Lp * 0.12, y: e.y - u[1] * back + e.ty * e.o * Lp * 0.12, rotation: ang(uo[0], uo[1]) + (R() - 0.5) * 12 };
    B.rotation = A.rotation + wrap180(B.rotation - A.rotation);
    var from = opening ? A : B, to = opening ? B : A;
    gsap.set(it.pl, { xPercent: -50, yPercent: -(1 - py) * 100, transformOrigin: origin(p), x: from.x, y: from.y, rotation: from.rotation, scaleX: flip });
    it.to = to; it.o = Math.abs(e.o);
  });

  if (c.visible || reduce) load(c);
  if (reduce) { c.items.forEach(function(it){ if (opening) gsap.set(it.pl, it.to); }); return; }

  /* apertura: la lámina se fija y el follaje se abre a lo largo de todo el tramo fijado.
     cierre: el follaje empieza a cerrarse mientras la lámina entra en pantalla y termina en un tramo fijado corto. */
  var vh = innerHeight, sc = small ? 0.35 : 0.7, tl;
  if (opening) {
    tl = gsap.timeline({ defaults: { ease: 'power2.inOut' }, scrollTrigger: {
      trigger: c.el, start: 'top top', end: '+=' + Math.round((small ? 0.95 : 1.15) * vh),
      pin: true, scrub: sc, anticipatePin: 1, refreshPriority: 10 } });
  } else {
    var pinPx = Math.round((small ? 0.5 : 0.65) * vh);
    c.pin = ScrollTrigger.create({ trigger: c.el, start: 'top top', end: '+=' + pinPx, pin: true, anticipatePin: 1, refreshPriority: -1 });
    tl = gsap.timeline({ defaults: { ease: 'power2.inOut' }, scrollTrigger: {
      start: function(){ return c.pin.start - vh; }, end: function(){ return c.pin.end; },
      scrub: sc, refreshPriority: -2 } });
  }

  c.items.forEach(function(it){
    var at = opening ? 0.02 + it.o * 0.22 + it.cls * 0.04 : 0.04 + (1 - it.o) * 0.2 + (2 - it.cls) * 0.05;
    tl.to(it.pl, { x: it.to.x, y: it.to.y, rotation: it.to.rotation, duration: 0.62 }, at);
  });
  // leve empuje de cámara: el follaje del frente se acerca más que el del fondo
  var zoom = [1.03, 1.06, 1.1];
  c.groups.forEach(function(g, k){
    if (opening) tl.fromTo(g, { scale: 1 }, { scale: zoom[k], duration: 0.9, ease: 'power1.inOut' }, 0.02);
    else tl.fromTo(g, { scale: zoom[k] }, { scale: 1, duration: 0.9, ease: 'power1.inOut' }, 0);
  });

  var q = function(s){ return c.el.querySelectorAll(s); };
  if (opening) {
    tl.to('#c-name', { autoAlpha: 0, y: -26, scale: 0.985, duration: 0.12, ease: 'power1.in' }, 0);
    tl.fromTo('#c-key', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.1, ease: 'none' }, 0.3);
    tl.fromTo('#c-key .cart', { y: 26, scale: 0.97 }, { y: 0, scale: 1, duration: 0.2, ease: 'power2.out' }, 0.3);
    tl.fromTo(q('#c-key li'), { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.14, stagger: 0.04, ease: 'power2.out' }, 0.34);
  } else {
    tl.fromTo('#c-contact', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.1, ease: 'none' }, 0.5);
    tl.fromTo('#c-contact .cart', { y: 30, scale: 0.96 }, { y: 0, scale: 1, duration: 0.2, ease: 'power2.out' }, 0.5);
    tl.fromTo(q('.foot-h, .foot-p, .foot-mail, .foot-links li, .foot-small'), { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.12, stagger: 0.03, ease: 'power2.out' }, 0.55);
  }
  tl.set({}, {}, 1);
  c.tl = tl;
}

/* entrada al cargar: las láminas brotan desde el marco y aparece la cartela */
function intro(c){
  var cart = document.querySelector('#c-name .cart');
  var words = document.querySelectorAll('.hero-name .w > span');
  var tl = gsap.timeline({ delay: 0.1 });
  tl.from(c.items.map(function(it){ return it.gr; }), { yPercent: 62, scale: 0.55, autoAlpha: 0, duration: 1.6, ease: 'expo.out',
    stagger: { each: 0.014, from: 'random' }, clearProps: 'transform,opacity,visibility' }, 0);
  tl.from(cart, { autoAlpha: 0, y: 18, duration: 1.1, ease: 'power3.out' }, 0.45);
  tl.from(words, { yPercent: 105, duration: 1.1, ease: 'expo.out', stagger: 0.09 }, 0.6);
  tl.from(cart.querySelectorAll('.hero-role, .hero-lede, .hint'), { autoAlpha: 0, y: 10, duration: 0.8, ease: 'power2.out', stagger: 0.08 }, 0.85);
  tl.add(function(){ var o = cart.querySelector('.orn'); if (o) o.classList.add('is-in'); }, 0.95);
  tl.add(function(){ cart.classList.add('is-grown'); }, 1.05);
}

function splitName(){
  var h = document.querySelector('.hero-name'); if (!h || h.querySelector('.w')) return;
  var txt = h.textContent.trim();
  h.setAttribute('aria-label', txt);
  h.innerHTML = txt.split(' ').map(function(w){ return '<span class="w" aria-hidden="true"><span>' + w + '</span></span>'; }).join(' ');
}

var rt, lastW = 0, lastH = 0;
function all(){ curtains.forEach(build); lastW = innerWidth; lastH = innerHeight; ScrollTrigger.refresh(); }

var dressPair = null;
function nextPair(){
  var list = PLANTS.filter(function(p){ return p[4] === 1; });
  var a = list[Math.floor(Math.random() * list.length)], b;
  do { b = list[Math.floor(Math.random() * list.length)]; } while (b === a);
  var suf = fine && dprCap > 1 ? '-l' : '-s';
  dressPair = [a, b].map(function(p){ var src = 'lam/' + p[0] + suf + '.webp'; new Image().src = src; return src; });
}

window.Botanico = {
  dress: function(){
    var l = document.querySelector('.mflora--l'), r = document.querySelector('.mflora--r');
    if (!l || !r) return;
    if (!dressPair) nextPair();
    l.src = dressPair[0]; r.src = dressPair[1];
    setTimeout(nextPair, 1500);
  },
  init: function(){
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });
    if (fine && !lowEnd && !reduce) doc.classList.add('sway');
    splitName();
    curtains = Array.prototype.map.call(document.querySelectorAll('[data-curtain]'), setup);
    all();
    var cart = document.querySelector('#c-name .cart');
    if (!reduce && scrollY < 40) intro(curtains[0]);
    else if (cart) { cart.classList.add('is-grown'); if (cart.querySelector('.orn')) cart.querySelector('.orn').classList.add('is-in'); }

    // solo se pintan (y se descargan) los telones cercanos a la pantalla
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function(es){ es.forEach(function(e){
        var c = e.target._c; c.visible = e.isIntersecting;
        c.el.classList.toggle('is-off', !e.isIntersecting);
        if (e.isIntersecting) load(c);
      }); }, { rootMargin: '100% 0px 100% 0px' });
      curtains.forEach(function(c){ c.el._c = c; io.observe(c.el); });
    } else curtains.forEach(load);

    if (c0qx()) addEventListener('pointermove', function(e){
      var nx = e.clientX / innerWidth - 0.5, ny = e.clientY / innerHeight - 0.5;
      curtains.forEach(function(c){ if (!c.visible) return;
        c.qx.forEach(function(q, k){ q(-nx * [8, 16, 30][k]); });
        c.qy.forEach(function(q, k){ q(-ny * [6, 12, 22][k]); });
      });
    }, { passive: true });

    addEventListener('resize', function(){ clearTimeout(rt); rt = setTimeout(function(){
      if (innerWidth !== lastW || Math.abs(innerHeight - lastH) > 140) all();
    }, 240); });
    addEventListener('load', function(){ ScrollTrigger.refresh(); });
    if ('ResizeObserver' in window) {
      var hs = new Map(), rq;
      var ro = new ResizeObserver(function(es){
        var changed = false;
        es.forEach(function(e){ var h = Math.round(e.contentRect.height); if (hs.get(e.target) !== h) { if (hs.has(e.target)) changed = true; hs.set(e.target, h); } });
        if (changed) { clearTimeout(rq); rq = setTimeout(function(){ ScrollTrigger.refresh(); }, 180); }
      });
      document.querySelectorAll('main > .sec, main > .orn').forEach(function(s){ ro.observe(s); });
    }
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function(){ ScrollTrigger.refresh(); });

    specimens();
    ornaments();
    setTimeout(nextPair, 4000);
  }
};
function c0qx(){ return curtains.length && curtains[0].qx; }

/* láminas sueltas junto a los títulos de sección */
function specimens(){
  document.querySelectorAll('.spec').forEach(function(f){
    var gr = f.querySelector('.gr');
    f.addEventListener('pointerenter', function(){ wiggle(gr); });
    if (reduce) return;
    gsap.from(gr, { scale: 0.8, rotation: -8, autoAlpha: 0, duration: 1.7, ease: 'expo.out',
      scrollTrigger: { trigger: f, start: 'top 88%', once: true } });
    if (fine) gsap.fromTo(f, { y: 30 }, { y: -40, ease: 'none',
      scrollTrigger: { trigger: f.closest('.sec'), start: 'top bottom', end: 'bottom top', scrub: true } });
  });
}

/* ornamentos entre secciones: el tallo se dibuja y las hojas brotan una vez */
function ornaments(){
  var els = document.querySelectorAll('.orn:not(.orn--s), .spec figcaption');
  if (reduce || !('IntersectionObserver' in window)) { els.forEach(function(o){ o.classList.add('is-in'); }); return; }
  var io = new IntersectionObserver(function(es){ es.forEach(function(e){
    if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
  }); }, { rootMargin: '0px 0px -12% 0px' });
  els.forEach(function(o){ io.observe(o); });
}
})();
