/* Telón botánico: láminas de Claudio Gay que se abren hacia los bordes (apertura) y vuelven a cerrarse (contacto). */
(function(){
'use strict';
var PLANTS = [["p00.webp", 640, 477], ["p01.webp", 424, 640], ["p02.webp", 468, 640], ["p03.webp", 485, 640], ["p04.webp", 441, 640], ["p05.webp", 376, 640], ["p06.webp", 465, 640], ["p07.webp", 444, 640], ["p08.webp", 376, 640], ["p09.webp", 339, 640], ["p10.webp", 403, 640], ["p11.webp", 488, 640], ["p12.webp", 490, 640], ["p13.webp", 455, 640], ["p14.webp", 484, 640], ["p15.webp", 469, 640], ["p16.webp", 382, 640], ["p17.webp", 438, 640], ["p18.webp", 201, 640], ["p19.webp", 332, 640], ["p20.webp", 313, 640], ["p21.webp", 437, 640], ["p22.webp", 203, 640], ["p23.webp", 409, 640], ["p24.webp", 389, 640], ["p25.webp", 361, 640], ["p26.webp", 201, 640], ["p27.webp", 356, 640], ["p28.webp", 470, 640], ["p29.webp", 364, 640], ["p30.webp", 479, 384], ["p31.webp", 371, 640], ["p32.webp", 371, 640], ["p33.webp", 640, 583], ["p34.webp", 640, 599], ["p35.webp", 473, 640], ["p36.webp", 535, 373], ["p37.webp", 449, 640], ["p38.webp", 246, 640], ["p39.webp", 473, 640], ["p40.webp", 375, 640], ["p41.webp", 586, 640], ["p42.webp", 174, 640], ["p43.webp", 402, 640], ["p44.webp", 276, 640], ["p45.webp", 403, 640]];
var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
var curtains = [];

function rng(seed){ return function(){ seed |= 0; seed = seed + 0x6D2B79F5 | 0; var t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function wrap180(a){ return ((a + 180) % 360 + 360) % 360 - 180; }

function setup(el){
  var box = el.querySelector('.plants');
  var imgs = PLANTS.map(function(p){
    var im = new Image(); im.src = 'flora/' + p[0]; im.alt = ''; im.decoding = 'async'; box.appendChild(im); return im;
  });
  return { el: el, box: box, imgs: imgs, mode: el.getAttribute('data-curtain'), tl: null };
}

function build(c){
  if (c.tl) { c.tl.scrollTrigger && c.tl.scrollTrigger.kill(true); c.tl.kill(); c.tl = null; }
  c.el.classList.remove('is-live');
  var panels = c.el.querySelectorAll('.panel');
  gsap.set(panels, { clearProps: 'all' });
  c.imgs.forEach(function(im){ gsap.set(im, { clearProps: 'all' }); im.style.width = ''; });
  if (reduce) return;

  c.el.classList.add('is-live');
  var W = c.el.clientWidth, H = c.el.clientHeight, cx = W / 2, cy = H / 2;
  var opening = c.mode === 'open';
  var R = rng(opening ? 7 : 19), N = PLANTS.length;
  var cols = Math.max(3, Math.round(Math.sqrt(N * W / H))), rows = Math.ceil(N / cols);
  var cw = W / cols, ch = H / rows;
  var cells = []; for (var i = 0; i < N; i++) cells.push(i);
  for (var k = N - 1; k > 0; k--) { var j = Math.floor(R() * (k + 1)); var t = cells[k]; cells[k] = cells[j]; cells[j] = t; }

  var dur = opening ? 1.8 : 1.5;
  var tl = gsap.timeline({ defaults: { ease: 'power2.inOut' }, scrollTrigger: {
    trigger: c.el, start: 'top top', end: '+=' + Math.round(dur * innerHeight), pin: true, scrub: 0.9, anticipatePin: 1,
    refreshPriority: opening ? 10 : -1, invalidateOnRefresh: false } });

  c.imgs.forEach(function(im, i){
    var p = PLANTS[i], ar = p[1] / p[2];
    var cell = cells[i], col = cell % cols, row = Math.floor(cell / cols);
    var depth = [0.78, 1, 1.28][Math.floor(R() * 3)];
    var hT = ch * 2.05 * depth * (0.85 + R() * 0.3);
    var wT = hT * ar, cap = cw * 2.6 * depth; if (wT > cap) { wT = cap; hT = wT / ar; }
    var x0 = (col + 0.5) * cw + (R() - 0.5) * cw * 0.7, y0 = (row + 0.5) * ch + (R() - 0.5) * ch * 0.7;
    var r0 = (R() - 0.5) * 50, flip = R() < 0.5 ? -1 : 1;
    var dx = x0 - cx, dy = y0 - cy, dist = Math.hypot(dx / cx, dy / cy) || 0.01;
    var vx = dx / cx / dist, vy = dy / cy / dist;
    var push = Math.max(hT, wT) * (0.12 + 0.12 * depth);
    var x1 = cx + vx * cx + vx * push, y1 = cy + vy * cy + vy * push;
    var r1 = Math.atan2(-(vx * cx), vy * cy) * 180 / Math.PI + (R() - 0.5) * 24;
    r1 = r0 + wrap180(r1 - r0);
    var dn = Math.min(1, Math.hypot(dx / cx, dy / cy) / 1.25);   // 0 centro … 1 esquina
    im.style.width = wT + 'px'; im.style.zIndex = Math.round(depth * 10);
    var A = { x: x0, y: y0, rotation: r0 }, B = { x: x1, y: y1, rotation: r1 };
    var from = opening ? A : B, to = opening ? B : A;
    gsap.set(im, { xPercent: -50, yPercent: -50, x: from.x, y: from.y, rotation: from.rotation, scaleX: flip, scaleY: 1 });
    // apertura: del centro a los bordes; cierre: primero las del borde
    var at = opening ? 0.05 + dn * 0.10 : 0.06 + (1 - dn) * 0.12;
    tl.to(im, { x: to.x, y: to.y, rotation: to.rotation, duration: opening ? 0.16 : 0.2 }, at);
  });

  function show(sel, inAt, outAt){
    var e = c.el.querySelector(sel);
    gsap.set(e, { autoAlpha: 0, y: 18 });
    tl.to(e, { autoAlpha: 1, y: 0, duration: 0.07, ease: 'power1.out' }, inAt);
    if (outAt) tl.to(e, { autoAlpha: 0, y: -14, duration: 0.05, ease: 'power1.in' }, outAt);
  }
  if (opening) {
    gsap.set('#c-name', { autoAlpha: 1, y: 0 });
    tl.to('#c-name', { autoAlpha: 0, y: -14, duration: 0.06, ease: 'power1.in' }, 0.05);
    show('#c-key', 0.30, 0);
  } else {
    show('#c-contact', 0.50, 0);
  }
  tl.set({}, {}, 1);
  c.tl = tl;
}

var rt, lastW = 0, lastH = 0;
function all(){ curtains.forEach(build); lastW = innerWidth; lastH = innerHeight; if (window.ScrollTrigger) ScrollTrigger.refresh(); }

window.Botanico = {
  init: function(){
    gsap.registerPlugin(ScrollTrigger);
    curtains = Array.prototype.map.call(document.querySelectorAll('[data-curtain]'), setup);
    var pending = 0;
    curtains.forEach(function(c){ c.imgs.forEach(function(im){ pending++; var d = function(){ if (--pending === 0) all(); }; im.complete ? d() : (im.onload = im.onerror = d); }); });
    addEventListener('resize', function(){ clearTimeout(rt); rt = setTimeout(function(){
      if (innerWidth !== lastW || Math.abs(innerHeight - lastH) > 140) all();
    }, 220); });
    // plantas de los márgenes: deriva lenta al desplazarse
    if (!reduce) document.querySelectorAll('.flora').forEach(function(f){
      var side = f.classList.contains('flora--r2') ? -1 : 1;
      gsap.fromTo(f, { y: 40, rotate: side * -4 + (side > 0 ? -28 : 26) }, { y: -50, rotate: side * 3 + (side > 0 ? -28 : 26), ease: 'none',
        scrollTrigger: { trigger: f.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
  }
};
})();
