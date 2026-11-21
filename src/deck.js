/* =========================================================
   APRESENTAÇÃO (site em scroll) + TOUR GUIADO
   ========================================================= */

/* ---------- telas reais renderizadas em mockups ---------- */
function phoneHTML(id) {
  const scr = APP[id]();
  const nav = (scr.h.match(/<nav class="tabbar"[\s\S]*?<\/nav>/) || [''])[0];
  const body = scr.h.replace(nav, '');
  return `<div class="phone"><div class="scr ${scr.ab ? 'has-ab' : ''}">${statusBarApp()}<div class="view">${body}</div>${nav}${scr.ab ? `<div class="ab">${scr.ab}</div>` : ''}<div class="home-ind"></div></div></div>`;
}
function withState(setup, fn) {
  const keep = JSON.parse(JSON.stringify(S));
  const sv = { profile: S.profile, screen: S.screen };
  try { if (setup) setup(); return fn(); }
  finally { Object.keys(S).forEach(k => delete S[k]); Object.assign(S, keep, sv); }
}
const SHOT_SRC = {};
/* iPhone real (moldura Apple, titânio preto) com espessura em 3D; pose = rotações em graus */
const PW = 420, PH = 842;
function phoneBody(id, setup) {
  const D = 14, layers = [6, 10].map(z => `<i class="ed" style="transform:translateZ(${-z}px)"></i>`).join('');
  return `<div class="i3">${layers}<i class="ed bk" style="transform:translateZ(${-D}px)"></i>
    <div class="dv-scr">${withState(setup, () => phoneHTML(id))}</div><img class="dv-frame" src="${DEV.iphone}" alt=""><i class="dglass"></i></div>`;
}
function phoneShot(id, s = .6, setup, scrollY = 0, pose = [0, 0, 0], cls = '') {
  const [rx, ry, rz] = pose;
  return `<a class="shot ph-shot ${cls}" href="#${id}" aria-label="Abrir ${titleOf(id)} no protótipo" style="width:${Math.round(PW * s)}px;height:${Math.round(PH * s)}px">
    <span class="sh3" style="transform:translateX(${-ry * 1.2}%) rotate(${rz}deg)"></span>
    <div class="shot-in p3" inert style="transform:scale(${s})" data-sy="${scrollY}"><div class="pose" style="transform:rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg)">${phoneBody(id, setup)}</div></div><span class="shot-go">${ic('arrowR', 14, 2.4)}Abrir no protótipo</span></a>`;
}
/* MacBook Pro real (moldura Apple). A tela tem 3023×1899 na imagem de 3824×2564 */
function macShot(id, w = 880, setup, scrollY = 0, pose = [0, 0]) {
  const [rx, ry] = pose, k = w / 3824, sw = 3023 * k, sh = 1899 * k, s = sw / 1200;
  return `<a class="mac" href="#${id}" aria-label="Abrir ${titleOf(id)} no protótipo" style="width:${w}px;height:${Math.round(2564 * k)}px">
    <div class="m3" style="transform:rotateX(${rx}deg) rotateY(${ry}deg)">
      <div class="mac-scr" style="left:${400 * k}px;top:${364 * k}px;width:${sw}px;height:${sh}px"><div class="shot-in" inert style="transform:scale(${s});width:1200px" data-sy="${scrollY}">${withState(setup, () => { S.profile = 'web'; return webFrame(id); })}</div></div>
      <img class="dv-frame" src="${DEV.mac}" alt=""></div><span class="mac-sh"></span><span class="shot-go">${ic('arrowR', 14, 2.4)}Abrir no protótipo</span></a>`;
}

/* ---------- peças da apresentação ---------- */
const bg = k => DIMG[k] ? `background-image:url(${DIMG[k]})` : '';
const kick = t => `<p class="kk">${t}</p>`;

function deckNav() {
  return `<header class="dnav"><a href="#apresentacao" class="dn-logo"><img src="${LOGO_W}" alt="Associação Volvo"><span>Campeonatos e Torneios</span></a>
  <nav aria-label="Seções"><a href="#s-app">App</a><a href="#s-painel">Painel</a><a href="#s-fim">Protótipo</a></nav>
  <div class="dn-act"><button class="db db-line" data-act="tour-start">${ic('play', 14, 2.2)}Apresentação guiada</button></div></header>`;
}

function deckHTML() {
  return `${deckNav()}
  <main class="dk">

  <section class="hx" style="${bg('hero')}" id="s-topo">
    <div class="hx-in">
      <div class="hx-t">
        <img class="hx-logo" src="${LOGO_W}" alt="Associação Volvo">
        <h1>Campeonatos<br>e Torneios</h1>
        <p>O app dos campeonatos internos da associação. Futebol, vôlei e truco.</p>
        <div class="x-acts"><a class="db db-lime" href="#app-inicio">Navegar no protótipo</a><button class="db db-line" data-act="tour-start">${ic('play', 14, 2.2)}Apresentação guiada</button></div>
      </div>
      <div class="hx-dev"><div class="hx-mac">${macShot('web-painel', 820, null, 0, [6, 18])}</div><div class="hx-ph">${phoneShot('app-inicio', .62, null, 0, [4, -16, 0])}</div></div>
    </div>
  </section>

  <section class="x-st">
    <p><span>Inscrição, tabela, resultado e ranking num lugar só.</span> O associado acompanha pelo celular. A equipe da associação organiza pelo computador.</p>
  </section>

  <section class="x-mods" aria-label="Modalidades">
    <figure class="mo mo-a" style="${bg('ball')}"><figcaption><b>Futebol society</b><span>Fase de grupos e mata-mata</span></figcaption></figure>
    <figure class="mo" style="${bg('volley')}"><figcaption><b>Vôlei misto</b><span>Equipes de 6 a 10 atletas</span></figcaption></figure>
    <figure class="mo" style="${bg('cards')}"><figcaption><b>Truco</b><span>10 etapas e ranking do ano</span></figcaption></figure>
  </section>

  <section class="slab" style="${bg('slab')}" id="s-app">
    <div class="sl-t">${kick('No celular')}<h2>O associado sabe onde, <br>quando e contra quem joga.</h2></div>
    <div class="sl-ph">${phoneShot('app-jogos', .6, null, 0, [4, 32, 0])}${phoneShot('app-inicio', .7, null, 0, [8, 0, 0])}${phoneShot('app-ranking', .6, null, 0, [4, -32, 0])}</div>
  </section>

  <section class="fr">
    <div class="fr-t"><h3>Inscrição da equipe</h3><p>O capitão monta o elenco buscando por nome, matrícula ou e-mail. Quem não tem cadastro recebe o link pelo WhatsApp.</p><a class="x-tl" href="#app-participar">Ver no protótipo ${ic('arrowR', 14, 2.2)}</a></div>
    <div class="fr-v trio">${phoneShot('app-participar', .5, () => { S.role = 'cap'; }, 0, [10, 18, -8])}${phoneShot('app-equipe', .5, () => { S.roster.push(['Juliana Martins', 'Convidado', 'wait'], ['Diego Santos', 'Convidado', 'wait']); }, 0, [6, 0, 0])}${phoneShot('app-confirmada', .5, () => { S.roster.push(['Juliana Martins', 'Convidado', 'wait'], ['Diego Santos', 'Convidado', 'wait'], ['Beatriz Lopes', 'Convidado', 'wait']); }, 0, [10, -18, 8])}</div>
  </section>

  <section class="fr rv">
    <div class="fr-t"><h3>Jogos e chave</h3><p>Dia, hora e local de cada partida. No mata-mata, cada confronto num cartão, e a equipe adversária a um toque.</p><a class="x-tl" href="#app-tabela">Ver no protótipo ${ic('arrowR', 14, 2.2)}</a></div>
    <div class="fr-v duo2">${phoneShot('app-tabela', .6, () => { S.tabelaTab = 1; }, 0, [48, 0, -24], 'flat')}${phoneShot('app-time', .6, () => { S.timeView = 'CMP'; }, 0, [8, -26, 6])}</div>
  </section>

  <section class="rk2">
    <div class="rk-img" style="${bg('trophy')}"></div>
    <div class="rk-c"><h3>Ranking</h3><p>No truco, cada etapa soma pontos pela colocação até a décima. No futebol e no vôlei, vitórias, empates e saldo.</p>${phoneShot('app-ranking', .62, null, 0, [6, 22, -6])}</div>
  </section>

  <div class="pan"><div class="pan-bg" aria-hidden="true">${['stadium', 'cards', 'ball', 'trophy'].map((k, n) => `<div class="pan-img" data-n="${n}" style="${bg(k)}"></div>`).join('')}<i class="pan-shade"></i></div>
  <section class="x-nt" id="s-painel">
    <div class="nt-t">${kick('No computador')}<h2>A associação cria, organiza <br>e publica pelo painel.</h2></div>
    <div class="nt-mac">${macShot('web-painel', 1000, null, 0, [10, 0])}</div>
  </section>

  <section class="adsec ab-1"><div class="ad-i"><div class="ad-t"><h3>Cada campeonato com a sua página</h3><p>Andamento, quem lidera, próximos jogos, inscrições, grupos e histórico.</p></div><div class="mcell">${macShot('web-camp', 820, () => { S.wc = 'fut'; S.wct = 'resumo'; }, 0, [4, -16])}</div></div></section>
  <section class="adsec ab-2"><div class="ad-i"><div class="ad-t"><h3>Resultado lançado, chave atualizada</h3><p>A semifinal é lançada direto na chave. O vencedor vai para a final e a classificação é publicada no app.</p></div><div class="mcell">${macShot('web-camp', 820, () => { S.wc = 'fut'; S.wct = 'class'; }, 380, [4, 16])}</div></div></section>
  <section class="adsec ab-3"><div class="ad-i"><div class="ad-t"><h3>A disputa do jeito da associação</h3><p>Eliminatória simples, dupla ou rodízio. No truco, o invicto é o 1º e quem vence a repescagem é o 2º.</p></div><div class="mcell">${macShot('web-disputa', 820, null, 0, [4, -16])}</div></div></section>
  <section class="adsec ab-4"><div class="ad-i"><div class="ad-t"><h3>Uma ficha por associado</h3><p>Campeonatos, posição no ranking e cadastro. A busca do topo encontra qualquer pessoa ou equipe.</p></div><div class="mcell">${macShot('web-associado', 820, () => { S.assocView = 'Carla Mendes'; }, 0, [4, 16])}</div></div></section>

  <section class="fim" id="s-fim">
    <div class="fim-t"><h2>Veja funcionando.</h2><p>Navegue como associado ou como administrador, ou deixe a apresentação guiada mostrar o caminho.</p>
    <div class="x-acts"><a class="db db-lime" href="#app-inicio">Abrir o app</a><a class="db db-line" href="#web-painel">Abrir o painel</a><button class="db db-line" data-act="tour-start">${ic('play', 14, 2.2)}Apresentação guiada</button></div></div>
    <small>Associação Volvo · Curitiba</small>
  </section>
  </div>
  </main>`;
}

/* ---------- apresentação guiada: cursor que clica e digita de verdade ---------- */
const TT = { i: 0, on: false, play: false, run: 0 };
const sleep = ms => new Promise(r => setTimeout(r, ms));
function curEl() { let c = document.getElementById('tcur'); if (!c) { c = document.createElement('div'); c.id = 'tcur'; c.innerHTML = '<svg width="26" height="26" viewBox="0 0 24 24"><path d="M5 3l14 8-6 1.6L10 19z" fill="#fff" stroke="#0E1A2B" stroke-width="1.6" stroke-linejoin="round"/></svg>'; document.body.appendChild(c); c.style.left = innerWidth / 2 + 'px'; c.style.top = innerHeight / 2 + 'px'; } return c; }
function q(sel) { const els = [...document.querySelectorAll('#device ' + sel)].filter(e => e.offsetParent !== null); return els[0]; }
async function reveal(el) {
  const box = el.closest('[data-scroll]');
  if (box) { const r = el.getBoundingClientRect(), b = box.getBoundingClientRect(); if (r.top < b.top + 60 || r.bottom > b.bottom - 120) { box.scrollTo({ top: box.scrollTop + r.top - b.top - b.height / 3, behavior: 'smooth' }); await sleep(450); } }
  const r = el.getBoundingClientRect(); if (r.top < 70 || r.bottom > innerHeight - 120) { scrollBy({ top: r.top - innerHeight / 2.6, behavior: 'smooth' }); await sleep(450); }
}
async function moveTo(el, run) {
  await reveal(el); if (run !== TT.run) throw 0;
  const r = el.getBoundingClientRect(), c = curEl();
  c.style.left = (r.left + r.width / 2) + 'px'; c.style.top = (r.top + r.height / 2) + 'px';
  await sleep(700); if (run !== TT.run) throw 0;
}
async function tap(sel, run) {
  const el = q(sel); if (!el) return false;
  await moveTo(el, run);
  const c = curEl(); c.classList.add('down'); await sleep(140); c.classList.remove('down');
  const rp = document.createElement('i'); rp.className = 'tripple'; rp.style.left = c.style.left; rp.style.top = c.style.top; document.body.appendChild(rp); setTimeout(() => rp.remove(), 600);
  el.click(); await sleep(650); return true;
}
async function type(sel, text, run, clear = true) {
  let el = q(sel); if (!el) return;
  await moveTo(el, run); el.focus();
  const base = clear ? '' : el.value;
  for (let k = 0; k < text.length; k++) {
    if (run !== TT.run) throw 0;
    el = q(sel); el.value = base + text.slice(0, k + 1); el.dispatchEvent(new Event('input', { bubbles: true }));
    await sleep(55 + Math.random() * 70);
  }
  await sleep(350);
}
const reset = () => { S.hist = []; S.notify = null; S.gq = ''; S.flash = null; };
const CH = [
  ['Associado', 'Entrar', 'O associado entra com o e-mail e a senha do cadastro.', async r => {
    reset(); S.loginEmail = ''; S.loginPw = ''; S.pwShow = false; navigate('app-login', false); await sleep(500);
    await type('[data-input="login-email"]', 'rafael.souza@email.com', r);
    await type('[data-input="login-pw"]', 'Volvo@2027', r);
    await tap('[data-act="login"]', r); }],
  ['Associado', 'Início', 'O próximo jogo em destaque, convites e inscrições abertas.', async r => {
    if (S.screen !== 'app-inicio') navigate('app-inicio', false); await sleep(1600);
    const v = document.querySelector('#device [data-scroll]'); if (v) { v.scrollTo({ top: 260, behavior: 'smooth' }); await sleep(1200); v.scrollTo({ top: 0, behavior: 'smooth' }); await sleep(700); } }],
  ['Associado', 'Inscrever a equipe', 'Escolhe o campeonato, diz que é capitão e dá nome à equipe.', async r => {
    reset(); S.role = null; S.roleDone = false; S.team.name = 'Bloqueio Total'; S.roster = S.roster.slice(0, 1); navigate('app-inicio', false); await sleep(400);
    await tap('.tabbar [data-go="app-campeonatos"]', r);
    await tap('[data-go="app-camp-volei"]', r);
    await tap('.ab [data-go="app-participar"]', r);
    await tap('[data-act="role"][data-v="cap"]', r);
    await tap('[data-act="role-go"]', r);
    await type('[data-input="team-name"]', 'Bloqueio Total', r);
    await tap('[data-act="create-team"]', r); }],
  ['Associado', 'Montar o elenco', 'Busca colegas por nome, matrícula ou e-mail e conclui a inscrição.', async r => {
    if (S.screen !== 'app-equipe') { navigate('app-equipe', false); await sleep(400); }
    await type('[data-input="search"]', 'Juliana', r);
    await tap('[data-act="add"]', r);
    await type('[data-input="search"]', 'Diego', r);
    await tap('[data-act="add"]', r);
    S.search = '';
    await tap('[data-act="finish-team"]', r); await sleep(800); }],
  ['Associado', 'Jogos e chave', 'Dia, hora e local de cada partida, e a chave do mata-mata.', async r => {
    reset(); navigate('app-inicio', false); await sleep(300);
    await tap('.tabbar [data-go="app-jogos"]', r); await sleep(600);
    S.tabelaTab = 1; navigate('app-tabela', true); await sleep(900);
    await tap('[data-act="ver-time"][data-v="CMP"]', r); await sleep(900); }],
  ['Associado', 'Ranking', 'Pódio do ano no truco e a classificação do futebol.', async r => {
    reset(); S.rankMod = 'tru'; S.rankView = 0; navigate('app-ranking', false); await sleep(1200);
    await tap('[data-act="rankMod"][data-v="fut"]', r); await sleep(1000); }],
  ['Administrador', 'Visão geral do painel', 'Campeonatos ativos, jogos da semana e o que precisa ser feito.', async r => {
    reset(); navigate('web-painel', false); await sleep(1400);
    await tap('.ccard[data-v="fut"]', r); await sleep(800); }],
  ['Administrador', 'Lançar um resultado', 'O placar entra direto na chave, com pênaltis quando empata.', async r => {
    reset(); S.jogos.saved2 = false; S.jogos.sf2 = [1, 1]; S.jogos.pen2 = null; S.brkMsg = false; S.wc = 'fut'; S.wct = 'resumo'; navigate('web-camp', false); await sleep(400);
    await tap('.ctabs [data-v="class"]', r);
    await tap('[data-act="score"][data-k="sf2"][data-i="0"][data-v="1"]', r);
    await tap('[data-act="score"][data-k="sf2"][data-i="0"][data-v="1"]', r);
    await tap('[data-act="save-game"][data-v="sf2"]', r); await sleep(1200); }],
  ['Administrador', 'Montar a disputa do truco', 'Grupos e eliminatória dupla: invicto em 1º, repescagem em 2º.', async r => {
    reset(); navigate('web-disputa', false); await sleep(600);
    await tap('[data-act="fmt"][data-v="robin"]', r);
    await tap('[data-act="pts-g"][data-k="e"][data-v="1"]', r);
    await tap('[data-act="fmt"][data-v="double"]', r); await sleep(800); }],
  ['Administrador', 'Encontrar um associado', 'A busca do topo acha campeonato, equipe ou pessoa.', async r => {
    reset(); navigate('web-painel', false); await sleep(400);
    await type('[data-input="gq"]', 'Carla', r);
    await tap('.gr[data-act="assoc-open"]', r); await sleep(1400); }]
];
function tourBar() {
  const [who, t, d] = CH[TT.i];
  return `<div class="tour ${TT.play ? 'playing' : ''}" role="region" aria-label="Apresentação guiada">
    <div class="tr-m"><span class="tr-k">${who} · <span class="num">${TT.i + 1}/${CH.length}</span></span><b>${t}</b><span class="tr-d">${d}</span></div>
    <div class="tr-dots">${CH.map((_, k) => `<i class="${k < TT.i ? 'ok' : k === TT.i ? 'on' : ''}"></i>`).join('')}</div>
    <div class="tr-c"><button data-act="tour-prev" aria-label="Etapa anterior" ${TT.i ? '' : 'disabled'}>${ic('chevL', 20, 2.2)}</button><button class="tr-pp" data-act="tour-pp" aria-label="${TT.play ? 'Pausar' : 'Continuar'}">${ic(TT.play ? 'pause' : 'play', 20, 2.4)}</button><button data-act="tour-next" aria-label="Próxima etapa" ${TT.i < CH.length - 1 ? '' : 'disabled'}>${ic('chev', 20, 2.2)}</button><button data-act="tour-stop" aria-label="Fechar apresentação guiada">${ic('x', 18, 2.2)}</button></div></div>`;
}
function tourShow() {
  let el = document.getElementById('tourbar');
  if (!TT.on) { if (el) el.remove(); const c = document.getElementById('tcur'); if (c) c.remove(); document.body.classList.remove('touring'); fitDevice(); return; }
  if (!el) { el = document.createElement('div'); el.id = 'tourbar'; document.body.appendChild(el); }
  document.body.classList.add('touring'); el.innerHTML = tourBar();
}
async function tourGo(i) {
  TT.i = Math.max(0, Math.min(CH.length - 1, i)); const run = ++TT.run;
  setMode('proto'); tourShow(); curEl(); scrollTo(0, 0); fitDevice();
  try {
    await CH[TT.i][3](run);
    await sleep(900);
    if (run === TT.run && TT.play) { if (TT.i < CH.length - 1) tourGo(TT.i + 1); else { TT.play = false; tourShow(); } }
  } catch (e) { if (e !== 0) console.error(e); }
}
Object.assign(ACT, {
  'tour-start': () => { TT.on = true; TT.play = true; scrollTo(0, 0); tourGo(0); },
  'tour-next': () => tourGo(TT.i + 1),
  'tour-prev': () => tourGo(TT.i - 1),
  'tour-pp': () => { TT.play = !TT.play; if (TT.play) tourGo(TT.i); else { TT.run++; tourShow(); } },
  'tour-stop': () => { TT.on = false; TT.play = false; TT.run++; tourShow(); }
});

/* ---------- modo: apresentação ou protótipo ---------- */
let deckBuilt = false;
function setMode(m) {
  const deck = m === 'deck';
  document.body.classList.toggle('deck-on', deck);
  document.body.style.setProperty('--pbg-app', `url(${DIMG.slab})`); document.body.style.setProperty('--pbg-web', `url(${DIMG.stadium})`);
  if (deck) {
    if (TT.on) ACT['tour-stop']();
    if (!deckBuilt) { $('#deck').innerHTML = deckHTML(); deckBuilt = true; fixShots(); revealInit(); }
    fitShots();
  }
}
/* encolhe celulares e notebooks para caber na largura da tela */
function fitShots() {
  const vw = document.documentElement.clientWidth;
  document.querySelectorAll('#deck .shot, #deck .mac').forEach(el => {
    el.style.transform = ''; el.style.margin = ''; el.style.zoom = '';
    const box = el.closest('.sl-ph,.fr-v,.mcell,.nt-mac,.hx-ph,.rk-c') || el.parentElement;
    const group = el.closest('.sl-ph,.fr-v');
    let avail = Math.min(box.clientWidth || vw, vw - 32);
    if (group && vw >= 760) { const tot = [...group.children].reduce((a, c) => a + (parseFloat(c.style.width) || c.offsetWidth), 0) + 40 * (group.children.length - 1); if (tot > group.clientWidth) avail = (parseFloat(el.style.width) || el.offsetWidth) * group.clientWidth / tot; }
    if (group && vw < 760) avail = (vw - 40 - 12 * (group.children.length - 1)) / group.children.length;
    const w = (parseFloat(el.style.width) || el.offsetWidth) * (el.classList.contains('mac') ? 1.04 : el.classList.contains('flat') ? 1.5 : 1.15);
    if (w > avail) { const k = avail / w, ow = parseFloat(el.style.width) || el.offsetWidth, oh = parseFloat(el.style.height) || el.offsetHeight;
      el.style.transform = `scale(${k.toFixed(3)})`; el.style.transformOrigin = 'top center';
      el.style.margin = `0 ${(-(1 - k) * ow / 2).toFixed(1)}px ${(-(1 - k) * oh).toFixed(1)}px`; }
  });
}
let fitT, fitW = innerWidth; window.addEventListener('resize', () => { if (innerWidth === fitW) return; fitW = innerWidth; clearTimeout(fitT); fitT = setTimeout(() => { if (document.body.classList.contains('deck-on')) fitShots(); }, 120); });
function fixShots() { document.querySelectorAll('#deck .shot-in[data-sy]').forEach(el => { const y = +el.dataset.sy; if (y) { const v = el.querySelector('.view, .wmain'); if (v) v.scrollTop = y; } }); }
function panScroll() {
  const p = document.querySelector('.pan'); if (!p || !document.body.classList.contains('deck-on')) return;
  const r = p.getBoundingClientRect(), vh = innerHeight, t = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - vh)));
  const imgs = [...p.querySelectorAll('.pan-img')].filter(i => getComputedStyle(i).display !== 'none'), n = imgs.length, f = t * (n - 1);
  imgs.forEach((img, k) => {
    const d = Math.abs(f - k), o = Math.max(0, Math.min(1, 1.6 - d * 1.6));
    img.style.opacity = o.toFixed(3);
    img.style.transform = `scale(${(1.06 + (f - k + 1) * .05).toFixed(3)})`;
  });
}
function revealInit() {
  window.addEventListener('scroll', () => requestAnimationFrame(panScroll), { passive: true }); panScroll();
  window.addEventListener('scroll', () => { const n = document.querySelector('.dnav'); if (n) n.classList.toggle('dn-sc', scrollY > 40); }, { passive: true });
}

/* ---------- boot ---------- */
function route() {
  const h = location.hash.slice(1);
  if (NOTES[h]) { setMode('proto'); if (h !== S.screen || !document.querySelector('#device > *')) { S.profile = h.startsWith('web') ? 'web' : 'app'; S.screen = h; render(false); } window.scrollTo(0, 0); return; }
  if (h.startsWith('s-')) { setMode('deck'); return; }
  setMode('deck'); window.scrollTo(0, 0);
}
window.addEventListener('hashchange', route);
route();
