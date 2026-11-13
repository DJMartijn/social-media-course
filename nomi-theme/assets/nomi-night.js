
(() => {
  'use strict';
  const ROOT = (window.Shopify && window.Shopify.routes && window.Shopify.routes.root) || '/';
  const NN = document.querySelector('.nn');
  if (!NN || NN.dataset.ready) return;
  NN.dataset.ready = '1';
  const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const eur = n => '€' + n.toFixed(2).replace('.', ',');
  const purl = (h, tekst) => ROOT + 'products/' + h + (tekst ? '?tekst=' + encodeURIComponent(tekst) : '');
  const curl = h => ROOT + 'collections/' + h;
  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const store = (() => { try { return window.localStorage; } catch (e) { return null; } })();
  const save = (k, v) => { try { store && store.setItem(k, JSON.stringify(v)); } catch (e) {} };
  const load = (k, d) => { try { const v = store && store.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } };
  const ss = (a, b, v) => { const u = Math.min(1, Math.max(0, (v - a) / (b - a))); return u * u * (3 - 2 * u); };

  /* ---------------- producten (uit de NOMI-winkel) ---------------- */
  const NECK = '40 cm + 5 cm verlengketting';
  const RING = 'Maten 16, 17, 18 en 19 mm';
  let P = [
    {h:'naamketting',t:'Naamketting',ty:'Kettingen',p:32.95,pers:'Eén naam tot 12 tekens',size:NECK,occ:['geboorte','moeder'],d:'Jouw naam, of die van iemand die je dierbaar is, sierlijk uitgeschreven in één doorlopende letter.'},
    {h:'initiaalketting',t:'Initiaalketting',ty:'Kettingen',p:29.95,pers:'Eén letter',size:NECK,occ:['geboorte','liefde','vriendschap'],d:'Een fijne ketting met één initiaal-hanger. Minimalistisch, tijdloos en helemaal van jou.'},
    {h:'twee-initialen-ketting',t:'Twee-initialen ketting',ty:'Kettingen',p:31.95,pers:'Twee initialen, bijvoorbeeld A & M',size:NECK,occ:['liefde'],d:'Twee kleine initiaal-hangers naast elkaar: die van jou en van iemand die je dierbaar is.'},
    {h:'tekstketting',t:'Tekstketting',ty:'Kettingen',p:29.95,pers:'Eén woord tot 12 tekens',size:NECK,occ:['liefde'],d:'Een rond muntje met jouw woord. Een naam, een plek, een motto of een woord dat alleen jullie begrijpen.'},
    {h:'geboortedatum-ketting',t:'Geboortedatum-ketting',ty:'Kettingen',p:30.95,pers:'Eén datum',size:NECK,occ:['geboorte','liefde','moeder'],d:'Een hartje met jouw datum. Een geboortedag, een trouwdag of het moment dat alles begon.'},
    {h:'symboolketting',t:'Symboolketting',ty:'Kettingen',p:26.95,pers:'Maantje, hartje of veertje',size:NECK,occ:['verjaardag'],d:'Een klein symbool naar keuze. Drie tekens, elk met een eigen betekenis.'},
    {h:'moederketting',t:'Moederketting',ty:'Kettingen',p:33.95,pers:'Tot 4 initialen van je kinderen',size:NECK,occ:['moeder'],d:'Een klavertje vier, het symbool van geluk, met de initialen van je kinderen.'},
    {h:'familieketting',t:'Familieketting',ty:'Kettingen',p:34.95,pers:'Tot 5 initialen',size:NECK,occ:['geboorte','moeder'],d:'Een hanger van figuurtjes die samen je gezin vormen, met de initialen van iedereen die bij je hoort.'},
    {h:'geboortesteen-armband',t:'Geboortesteen-armband',ty:'Armbanden',p:27.95,pers:'Eén van de 12 geboortemaanden',size:'Geslepen zirkonia steen',occ:['geboorte','moeder','verjaardag'],d:'Een dun armbandje met één kleine steen in de kleur van jouw geboortemaand.'},
    {h:'sterrenbeeld-armband',t:'Sterrenbeeld-armband',ty:'Armbanden',p:24.95,pers:'Eén van de 12 sterrenbeelden',size:'Rond muntje, fijn om te stapelen',occ:['verjaardag'],d:'Een dun kettingarmbandje met een rond muntje waarop jouw sterrenbeeld staat.'},
    {h:'coordinaten-armband',t:'Coördinaten-armband',ty:'Armbanden',p:28.95,pers:'Coördinaten of plaatsnaam tot 40 tekens',size:'Plat staafje',occ:['liefde','vriendschap'],d:'De coördinaten van een plek die je nooit wilt vergeten. Waar je opgroeide, of waar jullie elkaar ontmoetten.'},
    {h:'symboolarmband',t:'Symboolarmband',ty:'Armbanden',p:23.95,pers:'Maantje, hartje of veertje',size:'Fijn om te stapelen',occ:['vriendschap'],d:'Een dun armbandje met een klein symbool naar keuze. Minimalistisch, met precies genoeg betekenis.'},
    {h:'naamring',t:'Naamring',ty:'Ringen',p:28.95,pers:'Eén naam tot 12 tekens',size:RING,occ:['liefde'],d:'Een platte bandring met een naam aan de buitenkant gegraveerd. Subtiel, om je vinger.'},
    {h:'geboortedatum-ring',t:'Geboortedatum-ring',ty:'Ringen',p:27.95,pers:'Eén datum',size:RING,occ:['geboorte'],d:'Een dunne, platte ring met een datum die voor jou alles betekent. Perfect om te stapelen.'},
    {h:'sterrenbeeld-ring',t:'Sterrenbeeld-ring',ty:'Ringen',p:26.95,pers:'Eén van de 12 sterrenbeelden',size:RING,occ:['verjaardag'],d:'Een dunne ring met een rond plaatje waarop jouw sterrenbeeld is gegraveerd.'},
    {h:'initiaal-oorstekers',t:'Initiaal-oorstekers',ty:'Oorbellen',p:25.95,pers:'Eén letter, op beide oorstekers',size:'RVS-achtersluitingen',occ:['verjaardag'],d:'Twee kleine oorstekers met jouw initiaal. Onopvallend genoeg om altijd in te laten.'},
    {h:'symbool-oorstekers',t:'Symbool-oorstekers',ty:'Oorbellen',p:24.95,pers:'Maantje, hartje of veertje',size:'RVS-achtersluitingen',occ:['vriendschap'],d:'Kleine oorstekers met een maantje, een hartje of een veertje. Subtiel genoeg voor elke dag.'},
    {h:'nomi-setje-ketting-armband',img:'nomi-setje',t:'Nomi Setje',ty:'Sets',p:39.95,pers:'Eén letter en één sterrenbeeld',size:NECK,occ:['vriendschap'],d:'Een initiaalketting en een armbandje met een sterrenbeeld-muntje, op elkaar afgestemd.'},
    {h:'vriendschapssetje',t:'Vriendschapssetje',ty:'Sets',p:32.95,fixed:1,pers:'Vast ontwerp, samen één hart',size:NECK,occ:['vriendschap'],d:'Twee kettingen die samen één hart vormen. Eén voor jou, één voor iemand die je nooit kwijt wilt.'},
    {h:'luxe-cadeauset',t:'Luxe Cadeauset',ty:'Sets',p:39.95,fixed:1,pers:'Vast ontwerp, inclusief sieradendoosje',size:NECK,occ:['moeder','verjaardag'],d:'Een fijne ketting met een hartje en bijpassende oorstekers, samen in een sieradendoosje.'}
  ];
  /* live gegevens uit de winkel (titel, prijs, foto's, link) gaan voor */
  const DATA = (() => { try { return (JSON.parse(document.getElementById('nn-data').textContent) || []).filter(Boolean); } catch (e) { return []; } })();
  const LIVE = Object.fromEntries(DATA.map(d => [d.h, d]));
  if (DATA.length) P = P.filter(p => LIVE[p.h]);
  P.forEach(p => { const d = LIVE[p.h]; if (!d) return; p.t = d.t; if (typeof d.p === 'number') p.p = d.p; p.u = d.u; p.i1 = d.i1; p.i2 = d.i2 || d.i1; });
  const byH = h => P.find(p => p.h === h);
  const img = (p, n) => (n == 2 ? (p.i2 || p.i1) : p.i1) || '';
  const OCC = [
    {k:'moeder',t:'Voor je moeder',c:'cadeau-voor-moeder'},
    {k:'geboorte',t:'Geboorte & kraamcadeau',c:'cadeau-geboorte'},
    {k:'verjaardag',t:'Verjaardag',c:'cadeau-verjaardag'},
    {k:'vriendschap',t:'Voor je beste vriendin',c:'cadeau-vriendschap'},
    {k:'liefde',t:'Voor je geliefde',c:'cadeau-liefde'},
    {k:'bon',t:'Cadeaubon',c:'cadeaubonnen'}
  ];
  const OCC_NAME = Object.fromEntries(OCC.map(o => [o.k, o.t.toLowerCase()]));

  /* ---------------- gouden lichtdraden ---------------- */
  function silk() {
    const c = $('#nn-silk'), g = $('#nn-silk-glow');
    if (!c.getContext) return;
    const x = c.getContext('2d'), gx = g.getContext('2d');
    const night = getComputedStyle(NN).getPropertyValue('--night').trim() || '#13110e';
    const small = window.innerWidth < 720;
    const N = small ? 46 : 74, S = small ? 46 : 62;
    const st = Array.from({length: N}, (_, i) => ({th: i / N * Math.PI * 2 + Math.random() * .25, r: .4 + Math.random() * .6, ph: Math.random() * 6.283, a: .55 + Math.random() * .45}));
    // [p0x,p0y, p1x,p1y, p2x,p2y, p3x,p3y, knoop, spreiding] als fractie van het scherm
    const K = [
      [1.15,-.10, .80,.30, .30,1.10, -.06,.70, .72,.30],
      [-.15,.12, .40,-.05, .72,1.05, 1.15,.78, .62,.27],
      [-.15,.55, .30,.12, .70,.98, 1.15,.42, .50,.22],
      [-.10,1.10, .25,.38, .80,.78, 1.15,.04, .40,.28],
      [1.12,1.05, .70,.50, .30,.98, -.12,.38, .55,.30]
    ];
    const cur = K[0].slice();
    const pts = new Float32Array((S + 1) * 5);
    let W = 0, H = 0, dpr = 1, t = Math.random() * 40, mx = 0, my = 0, tmx = 0, tmy = 0, last = 0;
    function size() {
      dpr = Math.min(window.devicePixelRatio || 1, small ? 1.25 : 1.5);
      W = window.innerWidth; H = window.innerHeight;
      c.width = Math.round(W * dpr); c.height = Math.round(H * dpr);
      g.width = Math.max(1, Math.round(W / 4)); g.height = Math.max(1, Math.round(H / 4));
    }
    function target() {
      const max = document.documentElement.scrollHeight - H;
      const sp = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      const f = sp * (K.length - 1), i = Math.min(K.length - 2, Math.floor(f));
      let u = f - i; u = u * u * (3 - 2 * u);
      return K[i].map((v, j) => v + (K[i + 1][j] - v) * u);
    }
    function draw(now) {
      const dt = Math.min(50, (now - last) || 16); last = now; t += dt * .001;
      const tg = target();
      for (let j = 0; j < cur.length; j++) cur[j] += (tg[j] - cur[j]) * (RM ? 1 : .05);
      mx += (tmx - mx) * .04; my += (tmy - my) * .04;
      const [a0,a1,b0,b1,c0,c1,d0,d1,uk,sm] = cur;
      const P0x=a0*W, P0y=a1*H;
      const P1x=(b0+Math.sin(t*.21)*.03+mx*.06)*W, P1y=(b1+Math.cos(t*.17)*.04+my*.06)*H;
      const P2x=(c0+Math.sin(t*.13+1)*.04+mx*.1)*W, P2y=(c1+Math.cos(t*.19)*.03+my*.08)*H;
      const P3x=d0*W, P3y=d1*H;
      for (let s = 0; s <= S; s++) {
        const u = s / S, v = 1 - u, o = s * 5;
        const bx = v*v*v*P0x + 3*v*v*u*P1x + 3*v*u*u*P2x + u*u*u*P3x;
        const by = v*v*v*P0y + 3*v*v*u*P1y + 3*v*u*u*P2y + u*u*u*P3y;
        const dx = 3*v*v*(P1x-P0x) + 6*v*u*(P2x-P1x) + 3*u*u*(P3x-P2x);
        const dy = 3*v*v*(P1y-P0y) + 6*v*u*(P2y-P1y) + 3*u*u*(P3y-P2y);
        const l = Math.hypot(dx, dy) || 1;
        pts[o]=bx; pts[o+1]=by; pts[o+2]=-dy/l; pts[o+3]=dx/l;
        pts[o+4]=(.006 + sm*Math.pow(Math.abs(u-uk), 1.1)) * H;
      }
      x.setTransform(dpr,0,0,dpr,0,0);
      x.globalCompositeOperation = 'source-over';
      x.globalAlpha = 1;
      x.fillStyle = night; x.fillRect(0,0,W,H);
      const ks = Math.round(uk*S)*5, kx = pts[ks], ky = pts[ks+1];
      const gr = x.createRadialGradient(kx,ky,0,kx,ky,Math.max(W,H)*.85);
      gr.addColorStop(0,'rgba(255,246,226,0.95)');
      gr.addColorStop(.1,'rgba(240,214,160,0.8)');
      gr.addColorStop(.45,'rgba(201,166,107,0.5)');
      gr.addColorStop(1,'rgba(217,184,168,0.2)');
      x.globalCompositeOperation = 'lighter';
      x.strokeStyle = gr; x.lineWidth = small ? .9 : 1;
      const tw = 2.4, ts = t * .22;
      for (let i = 0; i < N; i++) {
        const q = st[i];
        x.globalAlpha = (.05 + .2*(.5+.5*Math.cos(q.th + ts*1.3 + .6))) * q.a;
        x.beginPath();
        for (let s = 0; s <= S; s++) {
          const o = s*5, u = s/S, sp = pts[o+4];
          const off = sp*q.r*Math.sin(q.th + tw*u + ts) + H*.01*Math.sin(u*8 + t*.5 + q.ph)*(.4 + sp/H*3);
          const px = pts[o] + pts[o+2]*off, py = pts[o+1] + pts[o+3]*off;
          if (s) x.lineTo(px, py); else x.moveTo(px, py);
        }
        x.stroke();
      }
      x.globalAlpha = 1;
      const kr = H*.3, kg = x.createRadialGradient(kx,ky,0,kx,ky,kr);
      kg.addColorStop(0,'rgba(240,210,150,.3)'); kg.addColorStop(1,'rgba(240,210,150,0)');
      x.fillStyle = kg; x.fillRect(kx-kr,ky-kr,kr*2,kr*2);
      gx.clearRect(0,0,g.width,g.height); gx.drawImage(c,0,0,g.width,g.height);
      if (!RM) requestAnimationFrame(draw);
    }
    size();
    window.addEventListener('resize', () => { size(); if (RM) draw(16); });
    window.addEventListener('pointermove', e => { tmx = e.clientX / W - .5; tmy = e.clientY / H - .5; }, {passive: true});
    if (RM) { draw(16); window.addEventListener('scroll', () => requestAnimationFrame(draw), {passive: true}); }
    else requestAnimationFrame(draw);
  }

  /* ---------------- navigatie ---------------- */
  function nav() {
    const hd = $('#nn-hero-design');
    if (hd) hd.addEventListener('click', () => setTimeout(() => $('#nn-engrave').focus({preventScroll: true}), 450));
  }

  /* ---------------- gravure-atelier ---------------- */
  const MODES = {
    naam:     {label:'Naamketting', h:'naamketting', max:12, v:'Sophie', field:'jouw naam', rows:[['lengte','40 cm + 5 cm']]},
    initiaal: {label:'Initiaal', h:'initiaalketting', max:1, v:'S', field:'jouw letter', rows:[['lengte','40 cm + 5 cm']]},
    woord:    {label:'Woord', h:'tekstketting', max:12, v:'Thuis', field:'jouw woord', rows:[['lengte','40 cm + 5 cm']]},
    ring:     {label:'Naamring', h:'naamring', max:12, v:'Noor', field:'jouw naam', rows:[['maten','16 · 17 · 18 · 19 mm']]},
    datum:    {label:'Datum', h:'geboortedatum-ketting', max:10, v:'24.10.2019', field:'jouw datum', rows:[['lengte','40 cm + 5 cm']]}
  };
  let mode = 'naam';
  const NS = 'http://www.w3.org/2000/svg';
  const el = (tag, attrs, parent, text) => { const n = document.createElementNS(NS, tag); for (const k in attrs) n.setAttribute(k, attrs[k]); if (text != null) n.textContent = text; if (parent) parent.appendChild(n); return n; };
  const fit = (n, maxW, start, min) => { n.setAttribute('font-size', start); let w = 0; try { w = n.getComputedTextLength(); } catch (e) {} if (w > maxW) n.setAttribute('font-size', Math.max(min, start * maxW / w)); };
  const chain = (g, d) => el('path', {d, fill:'none', stroke:'url(#nn-gg)', 'stroke-width':1.4, 'stroke-dasharray':'2.6 1.6', 'stroke-linecap':'round'}, g);
  const engraved = (g, attrs, text, maxW, start, min) => {
    const hi = el('text', Object.assign({}, attrs, {fill:'rgba(255,244,214,.6)', transform:'translate(0 .9)'}), g, text);
    const lo = el('text', Object.assign({}, attrs, {fill:'#5b4318'}), g, text);
    fit(lo, maxW, start, min); hi.setAttribute('font-size', lo.getAttribute('font-size'));
  };
  function cleanVal(m, v) {
    if (m === 'initiaal') return (v.match(/\p{L}/u) || [''])[0].toUpperCase();
    if (m === 'datum') return v.replace(/[^0-9.\-\/ ]/g, '').slice(0, 10);
    return v.slice(0, MODES[m].max);
  }
  function renderPreview() {
    const g = $('#nn-pv'); g.replaceChildren();
    const m = MODES[mode];
    const v = (m.v || '').trim() || ({naam:'Sophie', initiaal:'S', woord:'Thuis', ring:'Noor', datum:'24.10.2019'})[mode];
    if (mode === 'naam') {
      const tx = el('text', {x:220, y:156, 'text-anchor':'middle', 'font-family':"'Pinyon Script', cursive", fill:'url(#nn-gg)', filter:'url(#nn-soft)'}, g, v);
      fit(tx, 330, 86, 30);
      let b = {x:150, width:140, y:110, height:60}; try { b = tx.getBBox(); } catch (e) {}
      const ay = b.y + b.height * .42, lx = b.x + 6, rx = b.x + b.width - 6;
      chain(g, `M4 -4 C 70 70, ${lx - 70} ${ay - 40}, ${lx} ${ay}`);
      chain(g, `M436 -4 C 370 70, ${rx + 70} ${ay - 40}, ${rx} ${ay}`);
      g.appendChild(tx);
    } else if (mode === 'initiaal' || mode === 'woord' || mode === 'datum') {
      chain(g, 'M30 -4 Q 150 62 220 76'); chain(g, 'M410 -4 Q 290 62 220 76');
      el('circle', {cx:220, cy:82, r:6, fill:'none', stroke:'url(#nn-gg)', 'stroke-width':2}, g);
      if (mode === 'initiaal') {
        const tx = el('text', {x:220, y:196, 'text-anchor':'middle', 'font-family':"'Playfair Display', Georgia, serif", 'font-weight':500, 'font-size':116, fill:'url(#nn-gg)', filter:'url(#nn-soft)'}, g, v);
        el('text', {x:220, y:196, 'text-anchor':'middle', 'font-family':"'Playfair Display', Georgia, serif", 'font-weight':500, 'font-size':116, fill:'none', stroke:'rgba(255,246,222,.35)', 'stroke-width':.8}, g, v);
        void tx;
      } else if (mode === 'woord') {
        el('circle', {cx:220, cy:152, r:66, fill:'url(#nn-gcoin)', filter:'url(#nn-soft)'}, g);
        el('circle', {cx:220, cy:152, r:58, fill:'none', stroke:'rgba(91,67,24,.35)', 'stroke-width':1}, g);
        engraved(g, {x:220, y:158, 'text-anchor':'middle', 'font-family':"'Playfair Display', Georgia, serif", 'font-weight':600, 'letter-spacing':2}, v.toUpperCase(), 96, 22, 9);
      } else {
        el('path', {d:'M220 214 C 158 176, 146 126, 176 104 C 196 90, 214 100, 220 114 C 226 100, 244 90, 264 104 C 294 126, 282 176, 220 214 Z', fill:'url(#nn-gcoin)', filter:'url(#nn-soft)'}, g);
        engraved(g, {x:220, y:150, 'text-anchor':'middle', 'font-family':"'Playfair Display', Georgia, serif", 'font-weight':500, 'letter-spacing':1}, v, 74, 17, 9);
      }
    } else if (mode === 'ring') {
      el('ellipse', {cx:220, cy:112, rx:160, ry:62, fill:'none', stroke:'#6f5226', 'stroke-width':26}, g);
      el('path', {d:'M60 112 A160 62 0 0 0 380 112', fill:'none', stroke:'url(#nn-gg)', 'stroke-width':26, filter:'url(#nn-soft)'}, g);
      el('path', {d:'M60 100 A160 62 0 0 0 380 100', fill:'none', stroke:'rgba(255,246,222,.35)', 'stroke-width':1}, g);
      el('path', {id:'nn-ringpath', d:'M70 114 A150 60 0 0 0 370 114', fill:'none'}, g);
      const mk = (fill, dy) => { const t = el('text', {'font-family':"'Playfair Display', Georgia, serif", 'font-style':'italic', 'font-size':Math.min(22, 220 / Math.max(4, v.length)), fill, 'letter-spacing':1.5, 'dominant-baseline':'central', transform:`translate(0 ${dy})`}, g); el('textPath', {href:'#nn-ringpath', startOffset:'50%', 'text-anchor':'middle'}, t, v); };
      mk('rgba(255,244,214,.55)', .9); mk('#4f3a14', 0);
    }
  }
  function renderAtelier() {
    const m = MODES[mode], p = byH(m.h);
    const inp = $('#nn-engrave');
    inp.maxLength = m.max; inp.value = m.v; $('#nn-engrave-label').textContent = m.field;
    $('#nn-count').textContent = `${[...m.v].length}/${m.max}`;
    $('#nn-con-path').textContent = `${m.h} / ${m.max === 1 ? '1 letter' : 'max ' + m.max + ' tekens'}`;
    $$('#nn-modes button').forEach(b => b.setAttribute('aria-pressed', b.dataset.m === mode));
    const rows = [['sieraad', p.t], ['materiaal', '14k verguld RVS · nikkelvrij'], ...m.rows, ['gravure', mode === 'ring' || mode === 'woord' || mode === 'datum' ? 'laser, strak en blijvend' : 'doorlopende hanger'], ['prijs', eur(p.p)]];
    if (mode === 'naam') rows[3] = ['letter', 'doorlopende schrijfletter'];
    if (mode === 'initiaal') rows[3] = ['hanger', 'één initiaal'];
    $('#nn-specs').innerHTML = rows.map(([a, b]) => `<dt>${esc(a)}</dt><dd>${esc(b)}</dd>`).join('');
    const link = $('#nn-con-link'); link.href = purl(m.h, m.v.trim()); link.firstChild.textContent = `Personaliseer de ${p.t} `;
    $('#nn-preview').setAttribute('aria-label', `Voorbeeld: ${p.t} met ${m.v || 'jouw tekst'}`);
    renderPreview();
  }
  function atelier() {
    $('#nn-modes').innerHTML = Object.entries(MODES).map(([k, m]) => `<button type="button" data-m="${k}" aria-pressed="${k === mode}">${m.label}</button>`).join('');
    $('#nn-modes').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; mode = b.dataset.m; renderAtelier(); });
    $('#nn-engrave').addEventListener('input', e => {
      const m = MODES[mode]; const v = cleanVal(mode, e.target.value);
      if (v !== e.target.value) e.target.value = v;
      m.v = v; $('#nn-count').textContent = `${[...v].length}/${m.max}`;
      $('#nn-preview').setAttribute('aria-label', `Voorbeeld: ${byH(m.h).t} met ${v || 'jouw tekst'}`);
      renderPreview();
      $('#nn-con-link').href = purl(m.h, v.trim());
      if (mode === 'naam') syncName(v, 'atelier');
    });
    renderAtelier();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { renderPreview(); medal(); });
  }

  /* ---------------- naam overal gelijk houden ---------------- */
  function syncName(v, from) {
    MODES.naam.v = v;
    if (from !== 'cta') { const c = $('#nn-cta-name'); if (c.value !== v) c.value = v; }
    $('#nn-cta-preview').textContent = v || 'Jouw naam';
    $('#nn-cta-link').href = purl('naamketting', v.trim());
    if (from !== 'atelier' && mode === 'naam') renderAtelier();
    medal();
  }
  function medal() {
    const v = MODES.naam.v.trim() || 'Sophie';
    $('#nn-medal-name').textContent = v; $('#nn-medal-label').textContent = v;
    const n = [...v].length;
    $('#nn-medal-name').style.setProperty('--mf', Math.max(26, Math.min(64, 230 / (n * .46))) + 'px');
  }

  /* ---------------- scroll-morph ---------------- */
  function morph() {
    const sec = $('#nn-voor-jou'), stage = $('#nn-morph-stage'), after = $('#nn-morph-after');
    if (RM) { sec.classList.add('nn-static'); return; }
    let tick = false;
    const upd = () => {
      tick = false;
      const r = sec.getBoundingClientRect(), vh = window.innerHeight, vw = document.documentElement.clientWidth;
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - vh)));
      const base = Math.min(132, vw * .3), med = Math.min(300, vw * .74);
      const gr = ss(.02, .4, p), k = ss(.6, .9, p);
      let w, h, rad;
      if (p < .6) { w = base + (vw - base) * gr; h = base + (vh - base) * gr; rad = 30 * (1 - gr); }
      else { w = vw + (med - vw) * k; h = vh + (med - vh) * k; rad = (med / 2) * k; }
      const s = stage.style;
      s.setProperty('--w', w.toFixed(1) + 'px'); s.setProperty('--h', h.toFixed(1) + 'px'); s.setProperty('--rad', rad.toFixed(1) + 'px');
      s.setProperty('--n', (1 - ss(.03, .16, p)).toFixed(3));
      s.setProperty('--f', (ss(.26, .4, p) * (1 - ss(.56, .66, p))).toFixed(3));
      s.setProperty('--m', ss(.8, .94, p).toFixed(3));
      s.setProperty('--c', (1 - ss(0, .08, p)).toFixed(3));
      const a = ss(.9, .99, p); s.setProperty('--a', a.toFixed(3));
      after.style.visibility = a > .02 ? 'visible' : 'hidden';
    };
    window.addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(upd); } }, {passive: true});
    window.addEventListener('resize', upd);
    upd();
  }

  /* ---------------- collectie + snelle weergave ---------------- */
  const cardHTML = p => `<button class="nn-card nn-rv" type="button" data-h="${p.h}" data-ty="${p.ty}" aria-label="${esc(p.t)}, ${eur(p.p)}. Bekijk details">
      <span class="nn-ph"><img class="nn-a" src="${img(p, 1)}" alt="${esc(p.t)} gedragen" loading="lazy" decoding="async" width="720" height="900"><img class="nn-b" src="${img(p, 2)}" alt="" loading="lazy" decoding="async"><span class="nn-badge${p.fixed ? ' nn-fixed' : ''}">${p.fixed ? 'vast ontwerp' : 'personaliseerbaar'}</span><span class="nn-glare"></span></span>
      <span class="nn-meta"><span class="nn-mono">${p.ty.toLowerCase()}</span><span class="nn-t">${esc(p.t)}</span><span class="nn-price">${eur(p.p)}</span><span class="nn-ps">${esc(p.pers)}</span></span>
    </button>`;
  function collection() {
    const grid = $('#nn-grid'), fl = $('#nn-filters');
    const types = ['Alles', 'Kettingen', 'Armbanden', 'Ringen', 'Oorbellen', 'Sets'];
    fl.innerHTML = types.map((t, i) => `<button class="nn-chip" type="button" data-f="${t}" aria-pressed="${i === 0}">${t}<span class="nn-n">${t === 'Alles' ? P.length : P.filter(p => p.ty === t).length}</span></button>`).join('');
    grid.innerHTML = P.map(cardHTML).join('');
    fl.addEventListener('click', e => {
      const b = e.target.closest('.nn-chip'); if (!b) return;
      $$('.nn-chip', fl).forEach(x => x.setAttribute('aria-pressed', x === b));
      const f = b.dataset.f; let n = 0;
      $$('.nn-card', grid).forEach(c => {
        const on = f === 'Alles' || c.dataset.ty === f;
        c.hidden = !on; c.classList.remove('nn-in', 'nn-pre');
        if (on && !RM) { void c.offsetWidth; c.style.animationDelay = (n++ % 8) * 40 + 'ms'; c.classList.add('nn-in'); }
      });
    });
    grid.addEventListener('click', e => { const c = e.target.closest('.nn-card'); if (c) openQV(c.dataset.h); });
    if (!RM && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      grid.addEventListener('pointermove', e => {
        const c = e.target.closest('.nn-card'); if (!c) return;
        const r = c.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        c.style.setProperty('--rx', ((.5 - py) * 7).toFixed(2) + 'deg'); c.style.setProperty('--ry', ((px - .5) * 9).toFixed(2) + 'deg');
        c.style.setProperty('--gx', (px * 100).toFixed(1) + '%'); c.style.setProperty('--gy', (py * 100).toFixed(1) + '%');
      });
      grid.addEventListener('pointerout', e => { const c = e.target.closest('.nn-card'); if (c && !c.contains(e.relatedTarget)) { c.style.setProperty('--rx', '0deg'); c.style.setProperty('--ry', '0deg'); } });
    }
  }
  let qvH = null;
  function openQV(h) {
    const p = byH(h); if (!p) return; qvH = h;
    const d = $('#nn-qv'), main = $('#nn-qv-img');
    main.src = img(p, 1); main.alt = `${p.t} gedragen`;
    $('#nn-qv-thumbs').innerHTML = [1, 2].map(n => `<button type="button" aria-pressed="${n === 1}" data-n="${n}" aria-label="Foto ${n} van ${esc(p.t)}"><img src="${img(p, n)}" alt=""></button>`).join('');
    $('#nn-qv-type').textContent = p.ty.toLowerCase();
    $('#nn-qv-title').textContent = p.t;
    $('#nn-qv-price').textContent = eur(p.p);
    $('#nn-qv-desc').textContent = p.d;
    $('#nn-qv-tags').innerHTML = p.occ.map(o => `<span>${esc(OCC_NAME[o])}</span>`).join('');
    const sizeLabel = p.size === NECK ? 'lengte' : p.size === RING ? 'maten' : 'detail';
    const rows = [['materiaal', '14k verguld roestvrij staal, nikkelvrij'], [p.fixed ? 'ontwerp' : 'personalisatie', p.pers], [sizeLabel, p.size], ['levering', 'Binnen 2–4 werkdagen met PostNL, gratis in NL vanaf €40'], ['retour', p.fixed ? '14 dagen bedenktijd' : 'Gepersonaliseerd, daarom uitgesloten van retour']];
    $('#nn-qv-specs').innerHTML = rows.map(([a, b]) => `<dt>${esc(a)}</dt><dd>${esc(b)}</dd>`).join('');
    $('#nn-qv-link').href = p.u || purl(p.h);
    $('#nn-qv-link').firstChild.textContent = p.fixed ? 'Naar het product ' : 'Personaliseer ';
    if (typeof d.showModal === 'function') d.showModal(); else d.setAttribute('open', '');
  }
  function quickview() {
    const d = $('#nn-qv');
    $('#nn-qv-close').addEventListener('click', () => d.close());
    d.addEventListener('click', e => { if (e.target === d) d.close(); });
    $('#nn-qv-thumbs').addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b || !qvH) return;
      const p = byH(qvH); $('#nn-qv-img').src = img(p, b.dataset.n);
      $$('#nn-qv-thumbs button').forEach(x => x.setAttribute('aria-pressed', x === b));
    });
    $('#nn-qv-add').addEventListener('click', () => { if (!qvH) return; addToSet(qvH); d.close(); });
  }

  /* ---------------- details ---------------- */
  function engraveLoop() {
    const EX = [
      {t:'52.3676° N, 4.9041° E', f:'', m:'coördinaten-armband · max. 40 tekens'},
      {t:'Sophie', f:'script', m:'naamketting · max. 12 tekens'},
      {t:'24.10.2019', f:'serif', m:'geboortedatum-ring · één datum'},
      {t:'THUIS', f:'caps', m:'tekstketting · max. 12 tekens'}
    ];
    const out = $('#nn-eng-text'), meta = $('#nn-eng-meta');
    if (RM || !('IntersectionObserver' in window)) return;
    let vis = false, i = 0, timer = null;
    const run = () => {
      if (!vis) { timer = null; return; }
      const ex = EX[i % EX.length]; out.className = 'nn-et' + (ex.f ? ' nn-' + ex.f : ''); meta.textContent = ex.m;
      const chars = [...ex.t]; let n = 0;
      const type = () => {
        if (!vis) { timer = null; return; }
        out.textContent = chars.slice(0, n).join('');
        if (n++ < chars.length) timer = setTimeout(type, 75);
        else timer = setTimeout(() => { i++; run(); }, 2200);
      };
      type();
    };
    new IntersectionObserver(es => es.forEach(e => { vis = e.isIntersecting; if (vis && !timer) run(); }), {threshold: .4}).observe(out.closest('.nn-viz'));
  }
  function ringSizer() {
    const box = $('#nn-rs-btns');
    box.innerHTML = [16, 17, 18, 19].map(s => `<button type="button" data-s="${s}" aria-pressed="${s === 17}">${s}</button>`).join('');
    box.addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return; const s = +b.dataset.s;
      $$('button', box).forEach(x => x.setAttribute('aria-pressed', x === b));
      $('#nn-rs-c').setAttribute('r', s * 3); $('#nn-rs-t').textContent = s;
      $('#nn-rs-m').textContent = `binnendiameter ${s} mm · omtrek ${(Math.PI * s).toFixed(1).replace('.', ',')} mm`;
    });
  }

  /* ---------------- gelegenheden ---------------- */
  function occasions() {
    const tabs = $('#nn-occ-tabs'), panel = $('#nn-occ-panel');
    tabs.innerHTML = OCC.map((o, i) => `<button type="button" role="tab" id="nn-tab-${o.k}" aria-controls="nn-occ-panel" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-k="${o.k}"><span>${o.t}</span><span class="nn-mono">${o.k === 'bon' ? '€10–100' : P.filter(p => p.occ.includes(o.k)).length}</span></button>`).join('');
    const show = k => {
      const o = OCC.find(x => x.k === k);
      $$('[role="tab"]', tabs).forEach(b => { const on = b.dataset.k === k; b.setAttribute('aria-selected', on); b.tabIndex = on ? 0 : -1; });
      panel.setAttribute('aria-labelledby', 'nn-tab-' + k);
      if (k === 'bon') {
        panel.innerHTML = `<div class="nn-bon">${LIVE.cadeaubon && LIVE.cadeaubon.i1 ? `<img src="${LIVE.cadeaubon.i1}" alt="Cadeaubon van NOMI Jewelry" loading="lazy">` : ''}<div style="display:flex;flex-direction:column;gap:14px;align-items:flex-start"><span class="nn-mono">cadeaubonnen / digitaal</span><h3>Laat haar zelf kiezen</h3><p style="color:var(--muted)">Met een cadeaubon kiest de ontvanger zelf een persoonlijk sieraad. Je krijgt de bon direct per e-mail, hij is onbeperkt geldig en er zijn geen verzendkosten.</p><div class="nn-amounts"><span>€10</span><span>€15</span><span>€25</span><span>€50</span><span>€100</span></div><a class="nn-btn nn-btn-gold" href="${purl('cadeaubon')}">Kies een cadeaubon</a></div></div>`;
        return;
      }
      const list = P.filter(p => p.occ.includes(k));
      panel.innerHTML = `<div class="nn-occ-top"><span class="nn-mono">collectie / ${o.c} · ${list.length} sieraden</span><a class="nn-btn nn-btn-ghost nn-btn-sm" href="${curl(o.c)}">Bekijk alles</a></div>
        <div class="nn-occ-row">${list.map(p => `<button class="nn-mini" type="button" data-h="${p.h}"><img src="${img(p, 1)}" alt="${esc(p.t)} gedragen" loading="lazy" width="720" height="900"><span>${esc(p.t)}</span><span class="nn-mono">${eur(p.p)}</span></button>`).join('')}</div>`;
    };
    tabs.addEventListener('click', e => { const b = e.target.closest('[role="tab"]'); if (b) show(b.dataset.k); });
    tabs.addEventListener('keydown', e => {
      const list = $$('[role="tab"]', tabs), i = list.indexOf(document.activeElement); if (i < 0) return;
      let n = null;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') n = (i + 1) % list.length;
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') n = (i - 1 + list.length) % list.length;
      if (n != null) { e.preventDefault(); list[n].focus(); show(list[n].dataset.k); }
    });
    panel.addEventListener('click', e => { const b = e.target.closest('.nn-mini'); if (b) openQV(b.dataset.h); });
    show('moeder');
  }

  /* ---------------- getallen ---------------- */
  function counters() {
    if (RM || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return; io.unobserve(e.target);
      const el2 = e.target, to = +el2.dataset.to, t0 = performance.now();
      const step = n => { const u = Math.min(1, (n - t0) / 1300); el2.textContent = Math.round(to * (1 - Math.pow(1 - u, 3))); if (u < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    }), {threshold: .6});
    $$('.nn-stat b[data-to]').forEach(b => io.observe(b));
  }

  /* ---------------- setkorting ---------------- */
  let SET = load('nomi-set', null);
  if (!SET || typeof SET !== 'object') SET = {'naamketting': 1, 'symbool-oorstekers': 1};
  const pct = n => n >= 4 ? 20 : n === 3 ? 15 : n === 2 ? 10 : 0;
  function renderSet() {
    const items = Object.entries(SET).filter(([h, q]) => q > 0 && byH(h));
    const n = items.reduce((a, [, q]) => a + q, 0);
    const sub = items.reduce((a, [h, q]) => a + byH(h).p * q, 0);
    const pc = pct(n), disc = Math.round(sub * pc) / 100, tot = Math.round((sub - disc) * 100) / 100;
    $('#nn-set-count').textContent = n === 1 ? '1 sieraad' : `${n} sieraden`;
    $('#nn-lines').innerHTML = items.length ? items.map(([h, q]) => { const p = byH(h); return `<div class="nn-line"><img src="${img(p, 1)}" alt=""><span class="nn-nm">${esc(p.t)}<span class="nn-mono">${eur(p.p)}</span></span><span class="nn-qty"><button type="button" data-h="${h}" data-d="-1" aria-label="Eén ${esc(p.t)} minder">−</button>${q}<button type="button" data-h="${h}" data-d="1" aria-label="Eén ${esc(p.t)} meer">+</button></span></div>`; }).join('') : '<p class="nn-empty">Nog leeg. Tik links op een sieraad om te beginnen.</p>';
    $('#nn-totals').innerHTML = `<span>Subtotaal</span><b>${eur(sub)}</b><span>Setkorting${pc ? ' ' + pc + '%' : ''}</span><b class="nn-disc">${disc ? '−' + eur(disc) : '€0,00'}</b><span>Totaal</span><b class="nn-big">${eur(tot)}</b>`;
    $('#nn-shipbar').style.setProperty('--v', Math.min(100, tot / 40 * 100).toFixed(1) + '%');
    const sh = $('#nn-ship-hint');
    if (!n) { sh.textContent = 'Gratis verzending in Nederland vanaf €40.'; sh.className = 'nn-hint'; }
    else if (tot >= 40) { sh.textContent = 'Je set krijgt gratis verzending in Nederland.'; sh.className = 'nn-hint nn-ok'; }
    else { sh.textContent = `Nog ${eur(40 - tot)} tot gratis verzending.`; sh.className = 'nn-hint'; }
    const th = $('#nn-tier-hint');
    th.textContent = n >= 4 ? 'Je hebt de hoogste setkorting: 20%.' : n === 0 ? 'Bij 2 sieraden krijg je 10% setkorting.' : `Nog 1 sieraad voor ${pct(n + 1)}% setkorting.`;
    th.className = n >= 4 ? 'nn-hint nn-ok' : 'nn-hint';
    $$('.nn-tier').forEach(t => t.classList.toggle('nn-on', n >= 2 && +t.dataset.min === Math.min(4, n)));
    save('nomi-set', SET);
  }
  let toastTimer = null;
  function toast(html) {
    const t = $('#nn-toast'); t.innerHTML = html; t.hidden = false;
    t.style.animation = 'none'; void t.offsetWidth; t.style.animation = '';
    clearTimeout(toastTimer); toastTimer = setTimeout(() => { t.hidden = true; }, 3800);
  }
  function addToSet(h) {
    SET[h] = (SET[h] || 0) + 1; renderSet();
    const n = Object.values(SET).reduce((a, q) => a + q, 0);
    toast(`<span>${esc(byH(h).t)} staat in je set · ${n} ${n === 1 ? 'sieraad' : 'sieraden'}${pct(n) ? ' · ' + pct(n) + '% korting' : ''}</span><a class="nn-btn nn-btn-gold nn-btn-sm" href="#nn-setkorting">Bekijk je set</a>`);
  }
  function setBuilder() {
    const pk = $('#nn-picker');
    pk.innerHTML = P.map(p => `<button class="nn-pick" type="button" data-h="${p.h}" aria-label="${esc(p.t)} toevoegen, ${eur(p.p)}"><img src="${img(p, 1)}" alt="" loading="lazy"><span class="nn-nm">${esc(p.t)}<span class="nn-mono">${eur(p.p)}</span></span><span class="nn-plus" aria-hidden="true">+</span></button>`).join('');
    pk.addEventListener('click', e => {
      const b = e.target.closest('.nn-pick'); if (!b) return;
      SET[b.dataset.h] = (SET[b.dataset.h] || 0) + 1; renderSet();
      b.classList.remove('nn-flash'); void b.offsetWidth; b.classList.add('nn-flash');
    });
    $('#nn-lines').addEventListener('click', e => {
      const b = e.target.closest('button[data-d]'); if (!b) return;
      const h = b.dataset.h; SET[h] = Math.max(0, (SET[h] || 0) + +b.dataset.d); if (!SET[h]) delete SET[h]; renderSet();
    });
    renderSet();
  }

  /* ---------------- afsluiter ---------------- */
  function cta() {
    const inp = $('#nn-cta-name');
    inp.addEventListener('input', () => { syncName(inp.value.slice(0, 12), 'cta'); });
    $('#nn-cta-form').addEventListener('submit', e => { e.preventDefault(); $('#nn-cta-link').focus(); });
  }

  /* ---------------- reveal + glans ---------------- */
  function reveal() {
    if (RM || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.remove('nn-pre'); io.unobserve(e.target); } }), {rootMargin: '0px 0px -6% 0px'});
    $$('.nn-rv').forEach(n => { if (n.getBoundingClientRect().top > window.innerHeight) { n.classList.add('nn-pre'); io.observe(n); } });
  }
  function spotlight() {
    if (!window.matchMedia('(hover: hover)').matches) return;
    $$('.nn-glass').forEach(g => g.addEventListener('pointermove', e => { const r = g.getBoundingClientRect(); g.style.setProperty('--mx', (e.clientX - r.left) + 'px'); g.style.setProperty('--my', (e.clientY - r.top) + 'px'); }));
  }

  silk(); nav(); atelier(); medal(); morph(); collection(); quickview();
  engraveLoop(); ringSizer(); occasions(); counters(); setBuilder(); cta();
  reveal(); spotlight();
})();
