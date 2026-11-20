/* =========================================================
   Campeonatos da Associação — component library (hand-built SVG)
   ========================================================= */
let U = 0; const uid = p => p + (++U);
const R = Math.PI / 180;
const f1 = n => (+n).toFixed(1);
const P = a => a.map(f1).join(' ');

/* ---------- metallic palettes ---------- */
const MET = {
  gold:   ['#7A4E0E','#C8902A','#F6D06A','#FFF6CF','#E7B23E','#8F5C10','#D9A23A'],
  silver: ['#4E5762','#9AA4AF','#E3E8ED','#FFFFFF','#BCC4CD','#59626D','#A9B2BC'],
  bronze: ['#5A2A10','#A9582A','#E9A574','#FFE0C4','#C9783F','#6A3214','#B8693A']
};
const metLin = (id, k, vert) => `<linearGradient id="${id}" x1="0" y1="0" x2="${vert?0:1}" y2="${vert?1:0}">${[0,.16,.36,.47,.6,.84,1].map((o,i)=>`<stop offset="${o}" stop-color="${MET[k][i]}"/>`).join('')}</linearGradient>`;
const metRad = (id, k) => `<radialGradient id="${id}" cx=".36" cy=".3" r=".8"><stop offset="0" stop-color="${MET[k][3]}"/><stop offset=".35" stop-color="${MET[k][2]}"/><stop offset=".75" stop-color="${MET[k][4]}"/><stop offset="1" stop-color="${MET[k][5]}"/></radialGradient>`;
function starPath(cx, cy, ro, ri, n = 5) {
  let d = ''; for (let i = 0; i < n * 2; i++) { const r = i % 2 ? ri : ro, a = (-90 + i * 180 / n) * R; d += (i ? 'L' : 'M') + f1(cx + r * Math.cos(a)) + ' ' + f1(cy + r * Math.sin(a)); } return d + 'Z';
}

/* ---------- shared ball shading ---------- */
const ballDefs = (sh, bl) => `<radialGradient id="${sh}" cx=".38" cy=".32" r=".78"><stop offset=".42" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".45"/></radialGradient><filter id="${bl}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3.2"/></filter>`;
const ballTop = (sh, bl) => `<circle cx="50" cy="50" r="49" fill="url(#${sh})"/><ellipse cx="35" cy="27" rx="16" ry="9" fill="#fff" opacity=".62" filter="url(#${bl})" transform="rotate(-32 35 27)"/>`;
const svgWrap = (s, inner, st = '', vb = '0 0 100 100') => `<svg viewBox="${vb}" width="${s}" height="${s}" style="overflow:visible;display:block;filter:drop-shadow(0 ${Math.max(4,s*.12)}px ${Math.max(5,s*.14)}px rgba(0,0,0,.24));${st}">${inner}</svg>`;

/* ---------- 3D balls ---------- */
function soccer(s, st = '') {
  const c = uid('c'), b = uid('b'), sh = uid('s'), bl = uid('f');
  const cen = [...Array(5)].map((_, k) => { const a = (-90 + 72 * k) * R; return [50 + 15 * Math.cos(a), 50 + 15 * Math.sin(a)]; });
  const outs = [...Array(5)].map((_, k) => { const a = (-90 + 72 * k) * R, cx = 50 + 41 * Math.cos(a), cy = 50 + 41 * Math.sin(a);
    return [...Array(5)].map((_, i) => { const t = (180 + 72 * i) * R, x = 12.5 * Math.cos(t) * .7, y = 12.5 * Math.sin(t); return [cx + x * Math.cos(a) - y * Math.sin(a), cy + x * Math.sin(a) + y * Math.cos(a)]; }); });
  const poly = p => 'M' + p.map(P).join('L') + 'Z';
  let L = '';
  for (let k = 0; k < 5; k++) { const o = outs[k], pv = outs[(k + 4) % 5], a = (-90 + 72 * k) * R;
    L += `M${P(cen[k])}L${P(o[0])}M${P(o[1])}L${P(pv[4])}`;
    [[2, -.55], [3, .55]].forEach(([i, d]) => { const p = o[i]; L += `M${P(p)}L${f1(p[0] + 16 * Math.cos(a + d))} ${f1(p[1] + 16 * Math.sin(a + d))}`; }); }
  return svgWrap(s, `<defs><clipPath id="${c}"><circle cx="50" cy="50" r="49"/></clipPath><radialGradient id="${b}" cx=".4" cy=".35" r=".72"><stop offset="0" stop-color="#fff"/><stop offset=".6" stop-color="#EEF0F3"/><stop offset="1" stop-color="#A9B0BA"/></radialGradient>${ballDefs(sh, bl)}</defs>
  <circle cx="50" cy="50" r="49" fill="url(#${b})"/><g clip-path="url(#${c})"><path d="${poly(cen)}" fill="#17191E"/>${outs.map(o => `<path d="${poly(o)}" fill="#17191E"/>`).join('')}<path d="${L}" stroke="#2C3036" stroke-width="1.3" fill="none"/></g>${ballTop(sh, bl)}`, st);
}
function basket(s, st = '') {
  const c = uid('c'), b = uid('b'), sh = uid('s'), bl = uid('f');
  return svgWrap(s, `<defs><clipPath id="${c}"><circle cx="50" cy="50" r="49"/></clipPath><radialGradient id="${b}" cx=".4" cy=".34" r=".75"><stop offset="0" stop-color="#FFA36B"/><stop offset=".55" stop-color="#F0702E"/><stop offset="1" stop-color="#B4441A"/></radialGradient>${ballDefs(sh, bl)}</defs>
  <circle cx="50" cy="50" r="49" fill="url(#${b})"/><g clip-path="url(#${c})" transform="rotate(-20 50 50)" fill="none" stroke="#3A1C0E" stroke-width="2.6" stroke-linecap="round"><path d="M50 -4V104"/><path d="M-4 50H104"/><path d="M15 3C41 30 41 70 15 97"/><path d="M85 3C59 30 59 70 85 97"/></g>${ballTop(sh, bl)}`, st);
}
function tennis(s, st = '') {
  const b = uid('b'), sh = uid('s'), bl = uid('f'), n = uid('n'), c = uid('c');
  return svgWrap(s, `<defs><clipPath id="${c}"><circle cx="50" cy="50" r="49"/></clipPath><radialGradient id="${b}" cx=".4" cy=".34" r=".75"><stop offset="0" stop-color="#F4FF8A"/><stop offset=".55" stop-color="#D6EE2E"/><stop offset="1" stop-color="#8FA310"/></radialGradient><filter id="${n}"><feTurbulence type="fractalNoise" baseFrequency="1.6" numOctaves="2"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .22 0"/><feComposite in2="SourceGraphic" operator="in"/></filter>${ballDefs(sh, bl)}</defs>
  <circle cx="50" cy="50" r="49" fill="url(#${b})"/><circle cx="50" cy="50" r="49" fill="#fff" filter="url(#${n})"/><g clip-path="url(#${c})" fill="none" stroke-linecap="round"><path d="M12 8C50 30 50 70 12 92" stroke="#7E8F0C" stroke-opacity=".35" stroke-width="6"/><path d="M88 8C50 30 50 70 88 92" stroke="#7E8F0C" stroke-opacity=".35" stroke-width="6"/><path d="M12 8C50 30 50 70 12 92" stroke="#FBFFF0" stroke-width="3.4"/><path d="M88 8C50 30 50 70 88 92" stroke="#FBFFF0" stroke-width="3.4"/></g>${ballTop(sh, bl)}`, st);
}
function volley(s, st = '', cols = ['#FFC93C', '#2563EB']) {
  const c = uid('c'), b = uid('b'), sh = uid('s'), bl = uid('f');
  const Y = cols[0], B = cols[1], W = '#FFFFFF';
  const p1 = 'M50 50C50 30 62 14 80 10A50 50 0 0 1 92 24C76 22 62 32 58 47Z', p2 = 'M58 47C62 32 76 22 92 24A50 50 0 0 1 98 42C86 36 72 40 66 50Z';
  const seams = 'M50 50C50 30 62 14 80 10M58 47C62 32 76 22 92 24M66 50C72 40 86 36 98 42';
  const fills = [[Y, B], [B, W], [W, Y]];
  return svgWrap(s, `<defs><clipPath id="${c}"><circle cx="50" cy="50" r="49"/></clipPath><radialGradient id="${b}" cx=".4" cy=".35" r=".72"><stop offset="0" stop-color="#fff"/><stop offset=".65" stop-color="#F1F2F4"/><stop offset="1" stop-color="#B6BCC6"/></radialGradient>${ballDefs(sh, bl)}</defs>
  <circle cx="50" cy="50" r="49" fill="url(#${b})"/><g clip-path="url(#${c})">${[0, 1, 2].map(k => `<g transform="rotate(${120 * k} 50 50)"><path d="${p1}" fill="${fills[k][0]}" opacity="${fills[k][0] === W ? 0 : .95}"/><path d="${p2}" fill="${fills[k][1]}" opacity="${fills[k][1] === W ? 0 : .95}"/><path d="${seams}" fill="none" stroke="#25304A" stroke-opacity=".55" stroke-width="1.2"/></g>`).join('')}</g>${ballTop(sh, bl)}`, st);
}
function stopwatch(s, st = '', body = '#1A1D24') {
  const m = uid('m'), b = uid('b'), sh = uid('s'), bl = uid('f');
  let ticks = ''; for (let i = 0; i < 12; i++) { const a = i * 30 * R, r1 = i % 3 ? 27 : 24; ticks += `M${f1(50 + r1 * Math.sin(a))} ${f1(58 - r1 * Math.cos(a))}L${f1(50 + 30 * Math.sin(a))} ${f1(58 - 30 * Math.cos(a))}`; }
  return svgWrap(s, `<defs>${metLin(m, 'silver')}<radialGradient id="${b}" cx=".38" cy=".3" r=".8"><stop offset="0" stop-color="${body}" stop-opacity=".75"/><stop offset=".6" stop-color="${body}"/><stop offset="1" stop-color="#000"/></radialGradient>${ballDefs(sh, bl)}</defs>
  <rect x="42" y="0" width="16" height="9" rx="3" fill="url(#${m})"/><rect x="46.5" y="8" width="7" height="8" fill="url(#${m})"/><rect x="75" y="12" width="9" height="12" rx="2.5" fill="url(#${m})" transform="rotate(42 79 18)"/>
  <circle cx="50" cy="58" r="41" fill="url(#${b})"/><circle cx="50" cy="58" r="33" fill="#FBFBFA"/><path d="${ticks}" stroke="#20242C" stroke-width="2" stroke-linecap="round"/>
  <path d="M50 58L66 44" stroke="#FF5A36" stroke-width="3" stroke-linecap="round"/><path d="M50 58L50 38" stroke="#20242C" stroke-width="2.4" stroke-linecap="round"/><circle cx="50" cy="58" r="3.6" fill="#20242C"/>
  <g transform="translate(0 8)">${ballTop(sh, bl).replace('cx="50" cy="50" r="49"', 'cx="50" cy="50" r="41"')}</g>`, st, '0 0 100 100');
}
const BALL = { fut: soccer, vol: volley, bas: basket, ten: tennis, cor: stopwatch };

/* ---------- trophy ---------- */
function trophy(w, k = 'gold', place = 1, st = '') {
  const g = uid('t'), gv = uid('v'), b = uid('b'), bl = uid('f');
  return `<svg viewBox="0 0 120 160" width="${w}" height="${f1(w * 160 / 120)}" style="overflow:visible;display:block;filter:drop-shadow(0 ${w*.08}px ${w*.1}px rgba(0,0,0,.3));${st}"><defs>${metLin(g, k)}${metLin(gv, k, true)}<linearGradient id="${b}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3B4352"/><stop offset="1" stop-color="#12151C"/></linearGradient><filter id="${bl}"><feGaussianBlur stdDeviation="1.8"/></filter></defs>
  <path d="M33 30C10 28 7 64 40 70" fill="none" stroke="url(#${g})" stroke-width="7.5" stroke-linecap="round"/><path d="M87 30C110 28 113 64 80 70" fill="none" stroke="url(#${g})" stroke-width="7.5" stroke-linecap="round"/>
  <path d="M27 18H93C93 64 80 89 60 93C40 89 27 64 27 18Z" fill="url(#${g})"/>
  <ellipse cx="60" cy="18" rx="33" ry="7" fill="url(#${gv})"/><ellipse cx="60" cy="19" rx="28" ry="4.6" fill="${MET[k][0]}" opacity=".6"/>
  <path d="M37 27C37 55 43 76 53 87" fill="none" stroke="#fff" stroke-opacity=".65" stroke-width="4.5" stroke-linecap="round" filter="url(#${bl})"/>
  <path d="${starPath(60, 50, 11, 4.8)}" fill="${MET[k][5]}" opacity=".42"/><path d="${starPath(60, 49, 11, 4.8)}" fill="${MET[k][3]}" opacity=".35"/>
  <path d="M53.5 92H66.5L63.5 106H56.5Z" fill="url(#${g})"/><ellipse cx="60" cy="106.5" rx="10.5" ry="3.8" fill="url(#${g})"/>
  <path d="M45 110H75L81 124H39Z" fill="url(#${g})"/>
  <rect x="32" y="124" width="56" height="30" rx="3" fill="url(#${b})"/><rect x="32" y="124" width="56" height="2.2" fill="#fff" opacity=".16"/>
  <rect x="46" y="132" width="28" height="13" rx="1.5" fill="url(#${g})"/><text x="60" y="142" text-anchor="middle" font-size="9" font-weight="800" fill="${MET[k][5]}" style="font-family:Archivo">${place}º</text></svg>`;
}

/* ---------- medal with ribbon ---------- */
function medal(w, k = 'gold', c1 = '#003057', c2 = '#C8F04A', st = '') {
  const g = uid('m');
  return `<svg viewBox="0 0 60 90" width="${w}" height="${f1(w * 1.5)}" style="overflow:visible;display:block;filter:drop-shadow(0 3px 4px rgba(0,0,0,.22));${st}"><defs>${metRad(g, k)}</defs>
  <path d="M12 0H27L41 46H26Z" fill="${c1}"/><path d="M48 0H33L19 46H34Z" fill="${c2}"/><path d="M33 0H27L30 10Z" fill="#000" opacity=".15"/>
  <circle cx="30" cy="62" r="23" fill="url(#${g})"/><circle cx="30" cy="62" r="17" fill="none" stroke="${MET[k][5]}" stroke-opacity=".45" stroke-width="1.6"/>
  <path d="${starPath(30, 62, 9, 3.9)}" fill="${MET[k][5]}" opacity=".5"/></svg>`;
}

/* ---------- team crests ---------- */
const T = {
  CAB: { n: 'Cabines FC',     sh: 'shield', p: 'stripes', c: ['#0E2A5A', '#D4F53C'] },
  MOT: { n: 'Motores United', sh: 'badge',  p: 'sash',    c: ['#FF6B35', '#151515'] },
  LOG: { n: 'Logística',      sh: 'round',  p: 'hoops',   c: ['#7B5CFF', '#FFFFFF'] },
  ENG: { n: 'Engenharia',     sh: 'shield', p: 'split',   c: ['#2FA4FF', '#0B2545'] },
  TI:  { n: 'TI Esporte Clube',       sh: 'round',  p: 'chevron', c: ['#151515', '#D4F53C'] },
  ONI: { n: 'Ônibus',         sh: 'badge',  p: 'hoops',   c: ['#E8483B', '#FFE9D2'] },
  QUA: { n: 'Qualidade',      sh: 'shield', p: 'chevron', c: ['#17A673', '#FFFFFF'] },
  CMP: { n: 'Compras',        sh: 'badge',  p: 'stripes', c: ['#FFC83D', '#1A1A1A'] },
  SAQ: { n: 'Saque Certo',    sh: 'round',  p: 'split',   c: ['#0FA3B1', '#FFFFFF'] }
};
const MONO = { SAQ: ['#003057', '#FFFFFF'], CAB: ['#003057', '#FFFFFF'], MOT: ['#5F6B76', '#FFFFFF'], LOG: ['#101820', '#C9D1DA'], ENG: ['#8A96A3', '#003057'], TI: ['#003057', '#8A96A3'], ONI: ['#101820', '#FFFFFF'], QUA: ['#5F6B76', '#E4E8EC'], CMP: ['#003057', '#DCE2E8'] };
const SHAPE = { shield: 'M50 3L94 14V52C94 80 74 98 50 108C26 98 6 80 6 52V14Z', badge: 'M50 3L94 22V72L50 108L6 72V22Z', round: 'M50 6A50 50 0 1 1 49.99 6Z' };
const PAT = {
  stripes: c => [14, 38, 62].map(x => `<rect x="${x}" y="0" width="12" height="112" fill="${c}"/>`).join(''),
  sash: c => `<path d="M-6 20L18 -4L112 92L88 116Z" fill="${c}"/>`,
  hoops: c => [14, 82].map(y => `<rect x="0" y="${y}" width="100" height="14" fill="${c}"/>`).join(''),
  split: c => `<rect x="50" y="0" width="50" height="112" fill="${c}"/>`,
  chevron: c => `<path d="M0 62L50 88L100 62V78L50 104L0 78Z" fill="${c}"/>`
};
function crest(code, s, o = {}) {
  if (code === '?') return `<svg viewBox="0 0 100 112" width="${s}" height="${f1(s * 1.12)}" style="display:block;overflow:visible"><path d="${SHAPE.shield}" fill="${o.fill || 'rgba(255,255,255,.08)'}" stroke="${o.stroke || 'currentColor'}" stroke-width="2.5" stroke-dasharray="6 5"/><text x="50" y="68" text-anchor="middle" font-size="34" font-weight="700" fill="${o.stroke || 'currentColor'}" style="font-family:Archivo">?</text></svg>`;
  const t = T[code], [c1, c2] = o.mono ? MONO[code] : t.c, cl = uid('k'), gl = uid('g');
  const sh = SHAPE[o.shape || t.sh], pat = PAT[o.pat || t.p](c2);
  return `<svg viewBox="0 0 100 112" width="${s}" height="${f1(s * 1.12)}" style="display:block;overflow:visible;${o.flat ? '' : `filter:drop-shadow(0 ${s*.06}px ${s*.07}px rgba(0,0,0,.22))`}"><defs><clipPath id="${cl}"><path d="${sh}"/></clipPath><linearGradient id="${gl}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".38"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".14"/></linearGradient></defs>
  <path d="${sh}" fill="${c1}"/><g clip-path="url(#${cl})">${pat}</g>
  <path d="${sh}" fill="none" stroke="${o.mono ? c2 : '#fff'}" stroke-width="5" transform="translate(50 56) scale(.84) translate(-50 -56)" opacity=".9"/>
  <rect x="13" y="45" width="74" height="24" rx="${o.mono ? 1 : 5}" fill="${c1}"/><text x="50" y="63.5" text-anchor="middle" font-size="19" font-weight="800" fill="${c2}" style="font-family:Archivo;font-stretch:75%;letter-spacing:.04em">${o.label || code}</text>
  <path d="${starPath(50, 30, 6, 2.6)}" fill="${c2}" stroke="${c1}" stroke-width="1.2"/>
  ${o.gloss ? `<path d="${sh}" fill="url(#${gl})"/>` : ''}<path d="${sh}" fill="none" stroke="#000" stroke-opacity=".18" stroke-width="2"/></svg>`;
}
const shapeGlyph = (k, s, col, fill = 'none') => `<svg viewBox="0 0 100 112" width="${s}" height="${f1(s * 1.12)}" style="display:block"><path d="${SHAPE[k]}" fill="${fill}" stroke="${col}" stroke-width="7"/></svg>`;
const patGlyph = (k, s, c1, c2, r = 0) => { const cl = uid('q'); return `<svg viewBox="0 0 100 100" width="${s}" height="${s}" style="display:block"><defs><clipPath id="${cl}"><rect width="100" height="100" rx="${r}"/></clipPath></defs><g clip-path="url(#${cl})"><rect width="100" height="112" fill="${c1}"/>${PAT[k](c2)}</g></svg>`; };

/* ---------- jersey ---------- */
function jersey(s, num, o = {}) {
  const t = T[o.team || 'CAB'], [c1, c2] = o.mono ? MONO[o.team || 'CAB'] : t.c, cl = uid('j'), sh = uid('h');
  const d = 'M32 8L43 4C45.5 11 54.5 11 57 4L68 8L93 25L82 41L72 35V95H28V35L18 41L7 25Z';
  if (o.add) return `<svg viewBox="0 0 100 100" width="${s}" height="${s}" style="display:block"><path d="${d}" fill="none" stroke="${o.col || 'currentColor'}" stroke-width="3" stroke-dasharray="6 5" stroke-linejoin="round"/><path d="M50 44V70M37 57H63" stroke="${o.col || 'currentColor'}" stroke-width="4" stroke-linecap="round"/></svg>`;
  if (o.outline) return `<svg viewBox="0 0 100 100" width="${s}" height="${s}" style="display:block"><path d="${d}" fill="${o.bg || '#fff'}" stroke="${c1}" stroke-width="3" stroke-linejoin="round"/><path d="M43 4C45.5 11 54.5 11 57 4" fill="none" stroke="${c1}" stroke-width="3"/><text x="50" y="74" text-anchor="middle" font-size="34" font-weight="300" fill="${c1}" style="font-family:Archivo">${num}</text></svg>`;
  return `<svg viewBox="0 0 100 100" width="${s}" height="${s}" style="display:block;overflow:visible;filter:drop-shadow(0 ${s*.06}px ${s*.07}px rgba(0,0,0,.2))"><defs><clipPath id="${cl}"><path d="${d}"/></clipPath><linearGradient id="${sh}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".18"/><stop offset=".3" stop-color="#fff" stop-opacity=".14"/><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".2"/></linearGradient></defs>
  <path d="${d}" fill="${c1}" stroke-linejoin="round"/><g clip-path="url(#${cl})">${o.plain ? '' : [38, 56].map(x => `<rect x="${x}" y="0" width="6" height="100" fill="${c2}" opacity=".9"/>`).join('')}<rect x="0" y="0" width="100" height="100" fill="url(#${sh})"/></g>
  <path d="M43 4C45.5 11 54.5 11 57 4" fill="none" stroke="${c2}" stroke-width="3.5"/>
  <text x="50" y="76" text-anchor="middle" font-size="36" font-weight="800" fill="#fff" stroke="${c1}" stroke-width="5" paint-order="stroke" style="font-family:Archivo;font-stretch:75%">${num}</text></svg>`;
}

/* ---------- court line drawings & textures ---------- */
const COURT = {
  fut: '<rect x="3" y="3" width="94" height="144" rx="1"/><path d="M3 75H97"/><circle cx="50" cy="75" r="14"/><rect x="25" y="3" width="50" height="24"/><rect x="38" y="3" width="24" height="9"/><rect x="25" y="123" width="50" height="24"/><rect x="38" y="138" width="24" height="9"/><path d="M40 27A12 12 0 0 0 60 27M40 123A12 12 0 0 1 60 123"/>',
  vol: '<rect x="3" y="3" width="94" height="144" rx="1"/><path d="M-4 75H104" stroke-width="2.6"/><path d="M3 52H97M3 98H97"/><path d="M-4 75" />',
  bas: '<rect x="3" y="3" width="94" height="144" rx="1"/><path d="M3 75H97"/><circle cx="50" cy="75" r="12"/><rect x="35" y="3" width="30" height="32"/><rect x="35" y="115" width="30" height="32"/><circle cx="50" cy="35" r="10"/><circle cx="50" cy="115" r="10"/><path d="M12 3V18A38 38 0 0 0 88 18V3M12 147V132A38 38 0 0 1 88 132V147"/>',
  ten: '<rect x="3" y="3" width="94" height="144" rx="1"/><path d="M15 3V147M85 3V147M-4 75H104M15 40H85M15 110H85M50 40V110"/>',
  cor: '<rect x="3" y="3" width="94" height="144" rx="47"/><rect x="14" y="14" width="72" height="122" rx="36"/><rect x="25" y="25" width="50" height="100" rx="25"/><path d="M3 75H25M75 75H97"/>'
};
const court = (k, w, col, sw = 1.4, st = '') => `<svg viewBox="-2 -2 104 154" width="${w}" height="${f1(w * 1.5)}" style="display:block;${st}"><g fill="none" stroke="${col}" stroke-width="${sw}" vector-effect="non-scaling-stroke">${COURT[k]}</g></svg>`;
const pitchTex = (col, op, st = '') => `<svg viewBox="0 0 150 100" preserveAspectRatio="xMidYMid slice" style="position:absolute;inset:0;width:100%;height:100%;${st}"><g fill="none" stroke="${col}" stroke-opacity="${op}" stroke-width="1.1" vector-effect="non-scaling-stroke"><rect x="6" y="6" width="138" height="88"/><path d="M75 6V94"/><circle cx="75" cy="50" r="13"/><rect x="6" y="28" width="20" height="44"/><rect x="124" y="28" width="20" height="44"/><rect x="6" y="40" width="7" height="20"/><rect x="137" y="40" width="7" height="20"/><path d="M26 41A10 10 0 0 1 26 59M124 41A10 10 0 0 0 124 59"/></g></svg>`;
function topo(col, op, st = '', seed = 1) {
  let d = '';
  const centers = [[30, 40], [105, 70]];
  centers.forEach(([cx, cy], ci) => {
    for (let r = 10; r < 120; r += 9) { let s = '';
      for (let a = 0; a <= 360; a += 8) { const t = a * R, rr = r * (1 + .13 * Math.sin(3 * t + r * .06 + seed + ci) + .06 * Math.cos(5 * t - r * .04)); s += (a ? 'L' : 'M') + f1(cx + rr * Math.cos(t) * 1.15) + ' ' + f1(cy + rr * Math.sin(t)); }
      d += s + 'Z'; } });
  return `<svg viewBox="0 0 150 100" preserveAspectRatio="xMidYMid slice" style="position:absolute;inset:0;width:100%;height:100%;${st}"><path d="${d}" fill="none" stroke="${col}" stroke-opacity="${op}" stroke-width=".9" vector-effect="non-scaling-stroke"/></svg>`;
}

/* ---------- format diagrams ---------- */
function fmtDiag(type, line, node, w = 84) {
  const nd = (x, y, r = 2.6, f = node) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${f}"/>`;
  let g = '';
  if (type === 'simple') {
    g = `<path d="M6 6H20V12H34M6 18H20V12M6 30H20V36H34M6 42H20V36M34 12H47V24H62M34 36H47V24M62 24H70"/>` + [6, 18, 30, 42].map(y => nd(6, y)).join('') + nd(76, 24, 4.4);
  } else if (type === 'double') {
    g = `<path d="M6 5H18V10H30M6 15H18V10M30 10H44V24H62"/><path d="M6 33H18V38H30M6 43H18V38M30 38H44V24" stroke-dasharray="3 2.4"/><path d="M62 24H70"/>` + [5, 15].map(y => nd(6, y)).join('') + [33, 43].map(y => nd(6, y, 2.6, 'none')).join('').replace(/fill="none"/g, `fill="none" stroke="${line}" stroke-width="1.4"`) + nd(76, 24, 4.4);
  } else {
    // rodízio: 4 teams on a ring, arcs rotating between them
    const cx = 23, cy = 24, r = 17, gap = 17; let arcs = '', heads = '', nodes = '';
    [-90, 0, 90, 180].forEach(a0 => {
      const s = (a0 + gap) * R, e = (a0 + 90 - gap) * R;
      const sx = cx + r * Math.cos(s), sy = cy + r * Math.sin(s), ex = cx + r * Math.cos(e), ey = cy + r * Math.sin(e);
      arcs += `M${f1(sx)} ${f1(sy)}A${r} ${r} 0 0 1 ${f1(ex)} ${f1(ey)}`;
      const t = e + Math.PI / 2, hx = Math.cos(t), hy = Math.sin(t), px = -hy, py = hx;
      heads += `M${f1(ex - 3.6 * hx + 2.6 * px)} ${f1(ey - 3.6 * hy + 2.6 * py)}L${f1(ex)} ${f1(ey)}L${f1(ex - 3.6 * hx - 2.6 * px)} ${f1(ey - 3.6 * hy - 2.6 * py)}`;
      nodes += nd(f1(cx + r * Math.cos(a0 * R)), f1(cy + r * Math.sin(a0 * R)), 3.4);
    });
    g = `<path d="${arcs}"/><path d="${heads}"/>` + nodes;
  }
  return `<svg viewBox="0 0 84 48" width="${w}" height="${f1(w * 48 / 84)}" style="display:block;overflow:visible"><g fill="none" stroke="${line}" stroke-width="1.5" stroke-linejoin="round">${g}</g></svg>`;
}

/* ---------- match clock ring ---------- */
function ring(s, min, col, track, txt, font = 'inherit') {
  const r = 21, c = 2 * Math.PI * r, p = c * min / 90;
  return `<svg viewBox="0 0 50 50" width="${s}" height="${s}" style="display:block"><circle cx="25" cy="25" r="${r}" fill="none" stroke="${track}" stroke-width="3.2"/><circle cx="25" cy="25" r="${r}" fill="none" stroke="${col}" stroke-width="3.2" stroke-linecap="round" stroke-dasharray="${f1(p)} ${f1(c)}" transform="rotate(-90 25 25)"/><text x="25" y="29.5" text-anchor="middle" font-size="13" font-weight="800" fill="${txt}" style="font-family:${font}">${min}'</text></svg>`;
}

/* ---------- QR ---------- */
function qr(s, fg = '#111', bg = '#fff', seed = 7) {
  const n = 25, m = s / n; let x = seed, out = '';
  const rnd = () => (x = (x * 1103515245 + 12345) % 2147483648) / 2147483648;
  const finder = (i, j) => (i < 8 && j < 8) || (i < 8 && j > n - 9) || (i > n - 9 && j < 8);
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { if (finder(i, j)) continue; if (rnd() > .52) out += `<rect x="${f1(j * m)}" y="${f1(i * m)}" width="${f1(m + .2)}" height="${f1(m + .2)}"/>`; }
  const fp = (i, j) => `<rect x="${f1(j * m)}" y="${f1(i * m)}" width="${f1(7 * m)}" height="${f1(7 * m)}" rx="${f1(m * 1.6)}"/><rect x="${f1((j + 1) * m)}" y="${f1((i + 1) * m)}" width="${f1(5 * m)}" height="${f1(5 * m)}" rx="${f1(m)}" fill="${bg}"/><rect x="${f1((j + 2) * m)}" y="${f1((i + 2) * m)}" width="${f1(3 * m)}" height="${f1(3 * m)}" rx="${f1(m * .6)}"/>`;
  return `<svg viewBox="0 0 ${s} ${s}" width="${s}" height="${s}" style="display:block"><g fill="${fg}">${out}${fp(0, 0)}${fp(0, n - 7)}${fp(n - 7, 0)}</g></svg>`;
}

/* ---------- custom glyphs (24px, stroke) ---------- */
const G = {
  field: '<rect x="3.2" y="5" width="17.6" height="14" rx="2.6"/><path d="M12 5v14"/><circle cx="12" cy="12" r="2.6"/><path d="M3.2 9.4h2.6v5.2H3.2M20.8 9.4h-2.6v5.2h2.6"/>',
  cal: '<rect x="3.8" y="5" width="16.4" height="15.2" rx="3.2"/><path d="M8 3v4M16 3v4"/><text x="12" y="17.4" text-anchor="middle" font-size="7.6" font-weight="800" fill="currentColor" stroke="none" style="font-family:Archivo">14</text>',
  bracket: '<path d="M2.8 4.5h5v5.5h4.4M2.8 15.5h5V10"/><path d="M15 6.6h5v3.3a2.5 2.5 0 0 1-5 0z"/><path d="M17.5 12.4v2.8M15.4 17.4h4.2"/><path d="M2.8 19.8h9"/>',
  jersey: '<path d="M8.6 3.6 5 5.2 2.6 9.8l3.1 1.6 1-1.7v10.5h10.6V9.7l1 1.7 3.1-1.6L19 5.2l-3.6-1.6c-.4 1.7-1.8 2.8-3.4 2.8s-3-1.1-3.4-2.8z"/>',
  whistle: '<circle cx="8.6" cy="14.4" r="5.2"/><path d="M11.4 10 13.4 7.6h7.8v4.6h-7.6"/><path d="M5.4 9.6 4 7.2"/><circle cx="8.6" cy="14.4" r="1.5" fill="currentColor"/>',
  back: '<path d="M14.6 5.4 8 12l6.6 6.6"/>',
  arrowL: '<path d="M21 12H3.5m5.5-5.5L3.5 12 9 17.5"/>',
  arrowR: '<path d="M3 12h17.5M15 6.5l5.5 5.5-5.5 5.5"/>',
  share: '<path d="M12 14.6V3.4M7.6 7.8 12 3.4l4.4 4.4"/><path d="M5 12.4v6.2A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.4v-6.2"/>',
  down: '<path d="m7 10 5 5 5-5"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  grip: '<path d="M5 9h14M5 12h14M5 15h14"/>',
  wallet: '<rect x="3" y="6" width="18" height="13" rx="2.6"/><path d="M3 10h18M15.5 14.5h2"/>'
};
const g = (k, s = 22, sw = 1.8, st = '') => `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" style="display:block;flex:0 0 auto;${st}">${G[k]}</svg>`;

/* ---------- confetti ---------- */
function confetti(w, h, cols, n = 26, seed = 3) {
  let x = seed, o = ''; const rnd = () => (x = (x * 9301 + 49297) % 233280) / 233280;
  for (let i = 0; i < n; i++) { const cx = rnd() * w, cy = rnd() * h, c = cols[i % cols.length], r = rnd() * 180, t = rnd();
    o += t < .45 ? `<rect x="${f1(cx)}" y="${f1(cy)}" width="${f1(4 + rnd() * 5)}" height="${f1(9 + rnd() * 7)}" rx="1.5" fill="${c}" transform="rotate(${f1(r)} ${f1(cx)} ${f1(cy)})"/>` : t < .75 ? `<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(2.5 + rnd() * 2.5)}" fill="${c}"/>` : `<path d="M${f1(cx)} ${f1(cy)}q4 -6 8 0t8 0" fill="none" stroke="${c}" stroke-width="2.6" stroke-linecap="round" transform="rotate(${f1(r)} ${f1(cx)} ${f1(cy)})"/>`; }
  return `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" style="position:absolute;left:0;top:0;pointer-events:none">${o}</svg>`;
}

/* ---------- phone frame ---------- */
const statusBar = light => `<div class="sb" style="${light ? 'color:#fff' : ''}"><span>9:41</span><div class="isl"></div><div class="ic"><i style="width:3px;height:5px"></i><i style="width:3px;height:7px"></i><i style="width:3px;height:9px"></i><i style="width:3px;height:11px"></i><i style="width:22px;height:11px;border-radius:3.5px;margin-left:4px"></i></div></div>`;
const phone = (inner, o = {}) => `<div class="phone"><div class="scr">${o.under || ''}${statusBar(o.light)}${inner}<div class="home-ind" style="${o.lightInd ? 'background:#fff' : ''}"></div></div></div>`;

/* ---------- bracket ---------- */
const QF = [['CAB', 3, 'LOG', 1], ['MOT', 2, 'ENG', 0], ['TI', 1, 'ONI', 2], ['QUA', 0, 'CMP', 1]];
const SF = [['CAB', 2, 'MOT', 1], ['ONI', 1, 'CMP', 1, 'live']];
function bracket(th) {
  const S = {
    a: { card: 'background:#fff;border:1px solid #D9DDE2;border-radius:2px', line: '#C9D0D7', you: '#003057', live: '#BF2012', mono: true, crestO: { mono: true, flat: true } },
    b: { card: 'background:#fff;border-radius:13px;box-shadow:0 1px 0 rgba(0,0,0,.04),0 6px 14px -8px rgba(0,0,0,.18)', line: '#D8D3C4', you: '#111', live: '#FF5A36', crestO: { gloss: true, flat: true } },
    c: { card: 'background:#fff;border:1px solid #E0E5EB;border-radius:11px', line: '#CDD5DE', you: '#003057', live: '#FF5A36', crestO: { gloss: true, flat: true } }
  }[th];
  const xs = [0, 109, 218], cw = 86, ys = [0, 72, 144, 216], sy = [36, 180], fy = 112;
  const row = (code, sc, state) => `<div style="display:flex;align-items:center;gap:6px;height:25px;padding:0 8px 0 6px;${state === 'l' ? 'opacity:.42' : ''}">${crest(code, 15, S.crestO)}<span style="flex:1;font-size:12.5px;font-weight:${state === 'w' ? 800 : 600};font-stretch:${th === 'b' ? '100%' : '80%'};letter-spacing:.02em">${code}</span><span style="font-size:13px;font-weight:800;font-variant-numeric:tabular-nums">${sc}</span></div>`;
  const card = (m, x, y) => { const live = m[4] === 'live'; const aw = m[1] > m[3], bw = m[3] > m[1];
    return `<div style="position:absolute;left:${x}px;top:${y}px;width:${cw}px;${S.card};${live ? `box-shadow:0 0 0 1.6px ${S.live}` : ''};overflow:visible">${live ? `<span style="position:absolute;right:0;top:-15px;font-size:10.5px;font-weight:800;color:${S.live};letter-spacing:.04em">38' AGORA</span>` : ''}${row(m[0], m[1], live ? '' : aw ? 'w' : 'l')}<div style="height:1px;background:${S.line};opacity:.6"></div>${row(m[2], m[3], live ? '' : bw ? 'w' : 'l')}</div>`; };
  const elbow = (x1, y1, x2, y2, you) => `<path d="M${x1} ${y1}H${(x1 + x2) / 2}V${y2}H${x2}" stroke="${you ? S.you : S.line}" stroke-width="${you ? 2.6 : 1.3}" fill="none" stroke-linejoin="round"/>`;
  let lines = '';
  ys.forEach((y, i) => { lines += elbow(cw, y + 25, xs[1], sy[Math.floor(i / 2)] + 25, i === 0); });
  sy.forEach((y, i) => { lines += elbow(xs[1] + cw, y + 25, xs[2], fy + 25, i === 0); });
  const trophyK = th === 'a' ? 'silver' : 'gold';
  return `<div style="position:relative;height:268px;width:304px">
    <svg width="304" height="268" style="position:absolute;inset:0;overflow:visible">${lines}</svg>
    ${QF.map((m, i) => card(m, xs[0], ys[i])).join('')}${SF.map((m, i) => card(m, xs[1], sy[i])).join('')}
    <div style="position:absolute;left:${xs[2] + 19}px;top:20px">${trophy(48, trophyK, 1)}</div>
    <div style="position:absolute;left:${xs[2]}px;top:${fy}px;width:${cw}px;${S.card};${th === 'b' ? 'background:#111;color:#fff' : th === 'c' ? 'border:1.6px solid #003057' : 'border:1.6px solid #003057'}">${row('CAB', '–', 'w')}<div style="height:1px;background:${th === 'b' ? '#333' : S.line}"></div><div style="display:flex;align-items:center;gap:6px;height:25px;padding:0 8px 0 6px;color:${th === 'b' ? '#888' : '#8A96A3'}">${crest('?', 15, { stroke: th === 'b' ? '#777' : '#A6B0BB', fill: 'none' })}<span style="font-size:11.5px;font-weight:600;white-space:nowrap">ONI/CMP</span></div></div>
    <div style="position:absolute;left:${xs[2]}px;top:${fy + 58}px;width:${cw}px;text-align:center;font-size:10.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;opacity:.55">Sáb · 10h</div>
  </div>`;
}

/* ---------- modality tile: simplified court glyphs drawn for small sizes ---------- */
const MINI = {
  fut: '<rect x="1.5" y="1.5" width="25" height="17" rx="2"/><path d="M14 1.5v17"/><circle cx="14" cy="10" r="3.2"/><path d="M1.5 6.5h3.4v7H1.5M26.5 6.5h-3.4v7h3.4"/>',
  vol: '<rect x="1.5" y="1.5" width="25" height="17" rx="2"/><path d="M14 0v20" stroke-width="2.6"/><path d="M9 1.5v17M19 1.5v17"/>',
  bas: '<rect x="1.5" y="1.5" width="25" height="17" rx="2"/><path d="M14 1.5v17"/><circle cx="14" cy="10" r="3"/><path d="M1.5 5.5a4.5 4.5 0 0 1 0 9M26.5 5.5a4.5 4.5 0 0 0 0 9"/>',
  ten: '<rect x="1.5" y="1.5" width="25" height="17" rx="1"/><path d="M14 0v20" stroke-width="2.4"/><path d="M1.5 5h25M1.5 15h25M7 5v10M21 5v10M7 10h14"/>',
  cor: '<rect x="1.5" y="1.5" width="25" height="17" rx="8.5"/><rect x="6.5" y="6.5" width="15" height="7" rx="3.5"/>'
};
const modTile = (k, s, bg, line, sw = 1.8) => `<span style="width:${s}px;height:${s}px;border-radius:${Math.round(s * .3)}px;background:${bg};display:flex;align-items:center;justify-content:center;flex:0 0 auto;box-shadow:inset 0 0 0 1px rgba(0,0,0,.06)"><svg viewBox="0 0 28 20" width="${Math.round(s * .68)}" height="${Math.round(s * .68 * 20 / 28)}" fill="none" stroke="${line}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" style="display:block">${MINI[k]}</svg></span>`;

/* ---------- truco: two playing cards (3D-ish) ---------- */
const SPADE = 'M0 -11C5 -5 12 -1 7 5.5C4.5 8.5 1.2 7.4 0 5.2C-1.2 7.4 -4.5 8.5 -7 5.5C-12 -1 -5 -5 0 -11ZM0 3L3.4 12H-3.4Z';
const HEART = 'M0 9C-10 2 -10.5 -6.5 -4.5 -7.4C-1.6 -7.8 0 -5.4 0 -4.2C0 -5.4 1.6 -7.8 4.5 -7.4C10.5 -6.5 10 2 0 9Z';
function cards(s, st = '') {
  const gA = uid('ca'), gB = uid('cb'), bl = uid('cf');
  const card = (grad, rot, tx, ty, rank, suit, col) => `<g transform="translate(${tx} ${ty}) rotate(${rot})">
    <rect x="-22" y="-31" width="44" height="62" rx="6" fill="url(#${grad})" stroke="#D9DDE3" stroke-width=".8"/>
    <text x="-16" y="-17" font-size="12" font-weight="800" fill="${col}" style="font-family:Archivo">${rank}</text>
    <path d="${suit}" fill="${col}" transform="translate(-12 -8) scale(.42)"/>
    <path d="${suit}" fill="${col}" transform="translate(3 9) scale(1.25)"/>
  </g>`;
  return svgWrap(s, `<defs><linearGradient id="${gA}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#E9ECF0"/></linearGradient><linearGradient id="${gB}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#EEF0F3"/></linearGradient><filter id="${bl}"><feGaussianBlur stdDeviation="2.4"/></filter></defs>
  ${card(gA, -14, 38, 52, 'A', SPADE, '#16181D')}${card(gB, 12, 62, 50, '7', HEART, '#E5483B')}
  <ellipse cx="54" cy="24" rx="14" ry="5" fill="#fff" opacity=".55" filter="url(#${bl})" transform="rotate(12 54 24)"/>`, st);
}
BALL.tru = cards;
MINI.tru = '<rect x="4.2" y="2.6" width="11" height="15" rx="2" transform="rotate(-12 9.7 10.1)"/><rect x="12.8" y="2.6" width="11" height="15" rx="2" transform="rotate(12 18.3 10.1)"/><path d="M18.4 8.4c-1.5-1.6-3.4.2-1.9 1.8l1.9 1.9 1.9-1.9c1.5-1.6-.4-3.4-1.9-1.8z" fill="currentColor" stroke="none"/>';

/* ---------- extra glyphs ---------- */
Object.assign(G, {
  trophy: '<path d="M7.5 4h9v5.2a4.5 4.5 0 0 1-9 0z"/><path d="M7.5 6H4.2v1.4A3.3 3.3 0 0 0 7.7 10.6M16.5 6h3.3v1.4a3.3 3.3 0 0 1-3.5 3.2"/><path d="M12 13.7V17M8.6 20.4h6.8M9.6 17h4.8v3.4H9.6z"/>',
  podium: '<path d="M9 9.5h6V20H9zM3 13.5h6V20H3zM15 15.5h6V20h-6z"/><path d="m12 3.2.9 1.9 2 .3-1.5 1.4.4 2-1.8-1-1.8 1 .4-2-1.5-1.4 2-.3z"/>',
  user: '<circle cx="12" cy="8.2" r="3.8"/><path d="M4.8 20c.6-3.9 3.5-6.2 7.2-6.2s6.6 2.3 7.2 6.2"/>',
  users: '<circle cx="9" cy="8.4" r="3.4"/><path d="M2.8 19.6c.5-3.4 3-5.4 6.2-5.4s5.7 2 6.2 5.4M15.6 5.2a3.3 3.3 0 0 1 0 6.4M17.6 14.6c2 .6 3.3 2.3 3.6 5"/>',
  link: '<path d="M10 14a4.2 4.2 0 0 0 6 0l3-3a4.2 4.2 0 0 0-6-6l-1.2 1.2"/><path d="M14 10a4.2 4.2 0 0 0-6 0l-3 3a4.2 4.2 0 0 0 6 6l1.2-1.2"/>',
  chat: '<path d="M4 18.8 5.3 15A7.6 7.6 0 1 1 8.6 18z"/><path d="M8.8 10.6h6.4M8.8 13.4h4"/>',
  copy: '<rect x="8.5" y="8.5" width="11.5" height="11.5" rx="2.6"/><path d="M15.5 8.5V6.6A2.6 2.6 0 0 0 12.9 4H6.6A2.6 2.6 0 0 0 4 6.6v6.3a2.6 2.6 0 0 0 2.6 2.6h1.9"/>',
  search: '<circle cx="10.8" cy="10.8" r="6.3"/><path d="m15.6 15.6 4.6 4.6"/>',
  doc: '<path d="M7 3.5h7l4.5 4.5v10.5a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5.5a2 2 0 0 1 2-2z"/><path d="M13.6 3.6V8.4h4.8M8.6 13h6.8M8.6 16.4h4.4"/>',
  upload: '<path d="M12 15.5V4.5M7.6 8.9 12 4.5l4.4 4.4"/><path d="M4.5 14.5v3.4A2.1 2.1 0 0 0 6.6 20h10.8a2.1 2.1 0 0 0 2.1-2.1v-3.4"/>',
  check: '<path d="M5 12.6l4.4 4.4L19 7.4"/>',
  x: '<path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/>',
  grid: '<rect x="3.6" y="3.6" width="7" height="7" rx="1.8"/><rect x="13.4" y="3.6" width="7" height="7" rx="1.8"/><rect x="3.6" y="13.4" width="7" height="7" rx="1.8"/><rect x="13.4" y="13.4" width="7" height="7" rx="1.8"/>',
  inbox: '<path d="M4 13.5 6.6 5.6A2 2 0 0 1 8.5 4.2h7a2 2 0 0 1 1.9 1.4L20 13.5V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/><path d="M4 13.5h4.6l1.4 2.4h4l1.4-2.4H20"/>',
  groups: '<rect x="3.4" y="4" width="7.6" height="16" rx="2"/><rect x="13" y="4" width="7.6" height="16" rx="2"/><path d="M5.6 8h3.2M5.6 11h3.2M15.2 8h3.2M15.2 11h3.2"/>',
  sliders: '<path d="M4 7h9M17 7h3M4 17h3M11 17h9"/><circle cx="15" cy="7" r="2.2"/><circle cx="9" cy="17" r="2.2"/>',
  score: '<rect x="3.4" y="5" width="17.2" height="14" rx="2.6"/><path d="M12 5v14M7.8 10v4M15 10.4c.5-.6 1-.8 1.6-.8.9 0 1.5.6 1.5 1.4 0 1.6-3.2 1.8-3.2 3h3.2"/>',
  idcard: '<rect x="3" y="5" width="18" height="14" rx="2.6"/><circle cx="8.6" cy="11" r="2.1"/><path d="M5.6 16c.4-1.6 1.6-2.4 3-2.4s2.6.8 3 2.4M14 10h4M14 13.4h3"/>',
  clock: '<circle cx="12" cy="12" r="8.4"/><path d="M12 7.6V12l3 1.8"/>',
  pin: '<path d="M12 20.6s6.6-5.8 6.6-10.8a6.6 6.6 0 0 0-13.2 0c0 5 6.6 10.8 6.6 10.8z"/><circle cx="12" cy="9.8" r="2.4"/>',
  shield: '<path d="M12 3.4 19 6v5.6c0 4.2-3 7.4-7 9-4-1.6-7-4.8-7-9V6z"/>',
  camera: '<path d="M4 8.6A2 2 0 0 1 6 6.6h1.8L9.4 4.4h5.2l1.6 2.2H18a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/><circle cx="12" cy="12.6" r="3.4"/>',
  logout: '<path d="M14 4.5H7a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h7M10.5 12H20M16.5 8.5 20 12l-3.5 3.5"/>',
  shuffle: '<path d="M4 7h3.6c2.2 0 3.4 1.2 4.4 3l1 2c1 1.8 2.2 3 4.4 3H20M16.6 4.4 20 7.2l-3.4 2.8M4 17h3.6c1.3 0 2.2-.4 3-1.2M13.2 8.2c.8-.8 1.7-1.2 3-1.2M16.6 13.8 20 16.6l-3.4 2.8"/>',
  eye: '<path d="M2.8 12S6 5.8 12 5.8 21.2 12 21.2 12 18 18.2 12 18.2 2.8 12 2.8 12z"/><circle cx="12" cy="12" r="2.8"/>',
  minus: '<path d="M6 12h12"/>',
  more: '<circle cx="6" cy="12" r="1.2" fill="currentColor"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/><circle cx="18" cy="12" r="1.2" fill="currentColor"/>',
  layers: '<path d="m12 4 8.4 4.4L12 12.8 3.6 8.4z"/><path d="m3.6 12.2 8.4 4.4 8.4-4.4M3.6 16 12 20.4l8.4-4.4"/>'
});
G.chev = '<path d="m9.5 6 6 6-6 6"/>';
G.chevL = '<path d="m14.5 6-6 6 6 6"/>';
G.bell = '<path d="M6.5 16.5v-5a5.5 5.5 0 0 1 11 0v5l1.5 1.5h-14z"/><path d="M10 20.5h4"/>';
G.userPlus = '<circle cx="10" cy="8.2" r="3.8"/><path d="M3 20c.6-3.9 3.4-6.2 7-6.2 1.6 0 3 .4 4.2 1.2M18.5 14v6M15.5 17h6"/>';
G.play = '<path d="M7.5 5.2v13.6L18.6 12z"/>';
G.crown = '<path d="M3.5 8.5 7.5 12 12 5.5 16.5 12l4-3.5-1.6 9.5H5.1z"/><path d="M5.2 20.5h13.6"/>';
G.ribbon = '<circle cx="12" cy="9" r="5.2"/><circle cx="12" cy="9" r="2.2"/><path d="m8.6 13 -1.6 7.6 5-2.6 5 2.6-1.6-7.6"/>';
G.trend = '<path d="m3.5 16.5 6-6 4 4 7-7.5"/><path d="M15.5 7h5v5"/>';
G.arrowL = G.arrowL || '<path d="M21 12H3.5m5.5-5.5L3.5 12 9 17.5"/>';
G.send = G.send || '<path d="M21 3 10.5 13.5M21 3l-6.5 18-4-7.5-7.5-4L21 3z"/>';
G.play = G.play || '<path d="M7 4.5v15l12-7.5z" fill="currentColor" stroke="none"/>';
G.pause = G.pause || '<path d="M8 5v14M16 5v14"/>';
G.phone = G.phone || '<rect x="6" y="2.5" width="12" height="19" rx="3"/><path d="M10.5 18.5h3"/>';
G.grid = G.grid || '<rect x="3.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.5"/>';
