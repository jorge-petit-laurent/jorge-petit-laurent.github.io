/* Topographic heat field: iso-lines of a slow noise terrain, tinted by an illustrative "temperature"
   that rises under the pointer and with scroll. WebGL2, one fragment shader, no dependencies. */
(function(){
  'use strict';

  var VERT = '#version 300 es\nin vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';

  var FRAG = '#version 300 es\n' +
  'precision highp float;\n' +
  'uniform vec2 uRes;uniform float uTime;uniform vec2 uMouse;uniform float uHeat;uniform float uWarm;uniform vec3 uBg;uniform float uLines;\n' +
  'out vec4 o;\n' +
  'float hash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}\n' +
  'float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);\n' +
  '  return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}\n' +
  'float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*noise(p);p=p*2.03+vec2(17.3,9.1);a*=.5;}return v;}\n' +
  'vec3 ramp(float t){\n' +
  '  vec3 c0=vec3(.36,.66,.52),c1=vec3(.55,.74,.78),c2=vec3(.93,.82,.46),c3=vec3(.94,.52,.22),c4=vec3(.86,.14,.26);\n' +
  '  if(t<.25)return mix(c0,c1,t/.25);\n' +
  '  if(t<.5)return mix(c1,c2,(t-.25)/.25);\n' +
  '  if(t<.75)return mix(c2,c3,(t-.5)/.25);\n' +
  '  return mix(c3,c4,(t-.75)/.25);}\n' +
  'void main(){\n' +
  '  float m=min(uRes.x,uRes.y);\n' +
  '  vec2 p=(gl_FragCoord.xy-.5*uRes)/max(m,uRes.y*.72);\n' +
  '  vec2 mp=(uMouse*uRes-.5*uRes)/max(m,uRes.y*.72);\n' +
  '  float t=uTime*.018;\n' +
  '  float d=length(p-mp);\n' +
  '  float spot=exp(-d*d/(2.*.055))*uHeat;\n' +
  '  vec2 q=p*1.7+vec2(t*2.6,-t*1.7);\n' +
  '  float h=fbm(q+1.6*fbm(q*.6+vec2(t,-t)));\n' +
  '  h+=spot*.07;\n' +
  '  float hh=h*uLines;\n' +
  '  float w=fwidth(hh);\n' +
  '  float f=abs(fract(hh+.5)-.5);\n' +
  '  float idx=floor(hh+.5);\n' +
  '  float major=step(mod(idx,5.),.5);\n' +
  '  float line=1.-smoothstep(0.,w*(1.1+.9*major),f);\n' +
  '  float temp=clamp(spot*1.1+uWarm*(.30+.7*smoothstep(.25,.75,h+p.y*.12)),0.,1.);\n' +
  '  vec3 col=ramp(temp);\n' +
  '  float a=line*(.22+.38*major)*(.55+.9*temp);\n' +
  '  float fill=smoothstep(.35,.7,h)*.06;\n' +
  '  vec3 base=uBg+col*(fill+spot*.10+uWarm*.03);\n' +
  '  o=vec4(mix(base,col,a),1.);\n' +
  '}';

  function compile(gl, type, src){
    var s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { console.warn(gl.getShaderInfoLog(s)); return null; }
    return s;
  }

  function Terrain(canvas, opts){
    opts = opts || {};
    var gl = canvas.getContext('webgl2', { antialias:false, alpha:false, powerPreference:'low-power' });
    if (!gl) { canvas.classList.add('is-static'); return null; }
    var vs = compile(gl, gl.VERTEX_SHADER, VERT), fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) { canvas.classList.add('is-static'); return null; }
    var prog = gl.createProgram();
    gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { canvas.classList.add('is-static'); return null; }
    gl.useProgram(prog);

    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    var U = {};
    ['uRes','uTime','uMouse','uHeat','uWarm','uBg','uLines'].forEach(function(n){ U[n] = gl.getUniformLocation(prog, n); });

    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    var state = {
      mouse: [0.68, 0.46], target: [0.68, 0.46], heat: 0, heatTarget: 0,
      warm: opts.warm || 0, time: opts.seed || 12, visible: true, lastInput: 0, running: false
    };
    var bg = opts.bg || [0.04, 0.078, 0.059];
    var scale = opts.scale || 0.75;

    function resize(){
      var dpr = Math.min(window.devicePixelRatio || 1, 1.5) * scale;
      var w = Math.max(2, Math.round(canvas.clientWidth * dpr)), h = Math.max(2, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; gl.viewport(0, 0, w, h); }
    }

    var last = 0;
    function frame(now){
      state.running = false;
      if (!state.visible || document.hidden) return;
      var dt = last ? Math.min(0.05, (now - last) / 1000) : 0.016; last = now;
      state.time += dt;
      // idle drift keeps the field alive on touch devices and when the pointer rests
      if (now - state.lastInput > 2600) {
        var s = now / 1000;
        state.target = [0.5 + 0.28 * Math.sin(s * 0.23), 0.5 + 0.22 * Math.sin(s * 0.31 + 1.3)];
        state.heatTarget = 0.55;
      }
      state.mouse[0] += (state.target[0] - state.mouse[0]) * 0.06;
      state.mouse[1] += (state.target[1] - state.mouse[1]) * 0.06;
      state.heat += (state.heatTarget - state.heat) * 0.05;
      draw();
      if (!reduce) request();
    }
    function draw(){
      resize();
      gl.uniform2f(U.uRes, canvas.width, canvas.height);
      gl.uniform1f(U.uTime, state.time);
      gl.uniform2f(U.uMouse, state.mouse[0], state.mouse[1]);
      gl.uniform1f(U.uHeat, state.heat);
      gl.uniform1f(U.uWarm, state.warm);
      gl.uniform3f(U.uBg, bg[0], bg[1], bg[2]);
      gl.uniform1f(U.uLines, opts.lines || 26);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
    function request(){ if (!state.running) { state.running = true; requestAnimationFrame(frame); } }

    function setPointer(e){
      var r = canvas.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width, y = 1 - (e.clientY - r.top) / r.height;
      if (x < 0 || x > 1 || y < 0 || y > 1) { state.heatTarget = 0; return; }
      state.target = [x, y]; state.heatTarget = 1; state.lastInput = performance.now();
    }
    if (!reduce && !opts.noPointer) {
      window.addEventListener('pointermove', setPointer, { passive: true });
      window.addEventListener('pointerdown', setPointer, { passive: true });
    }

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function(en){
        state.visible = en[0].isIntersecting;
        if (state.visible) { last = 0; request(); }
      }, { threshold: 0 }).observe(canvas);
    }
    document.addEventListener('visibilitychange', function(){ if (!document.hidden) { last = 0; request(); } });
    window.addEventListener('resize', function(){ if (reduce) draw(); });

    state.lastInput = -1e6;
    draw();
    if (!reduce) request();

    return { setWarm: function(v){ state.warm = v; if (reduce) draw(); }, state: state };
  }

  window.Terrain = Terrain;
})();
