/* =========================================================
   Moldura, navegação e interações (mesmas rotas e ações da v3)
   ========================================================= */
const $ = s => document.querySelector(s);
const titleOf = id => [...SCREENS.app, ...SCREENS.web].find(x => x[0] === id)[1];
const statusBarApp = () => `<div class="sb" aria-hidden="true"><span>9:41</span><div class="isl"></div><div class="ic"><i style="width:3px;height:5px"></i><i style="width:3px;height:7px"></i><i style="width:3px;height:9px"></i><i style="width:3px;height:11px"></i><i style="width:22px;height:11px;border-radius:3.5px;margin-left:4px"></i></div></div>`;

function renderLeft() {
  const p = S.profile, routes = ROUTES.filter(r => r[0] === p);
  const cur = routes.find(r => r[2].includes(S.screen));
  return `
  <div class="pseg" role="tablist" aria-label="Perfil"><button role="tab" aria-selected="${p === 'app'}" class="${p === 'app' ? 'on' : ''}" data-profile="app">${ic('phone', 16, 2)}App do associado</button><button role="tab" aria-selected="${p === 'web'}" class="${p === 'web' ? 'on' : ''}" data-profile="web">${ic('grid', 16, 2)}Painel web</button></div>
  <p class="lh">Fluxos</p>
  <ol class="flows">${routes.map((r, k) => { const on = r === cur; return `<li class="${on ? 'on' : ''}"><button class="fl-h" data-go-direct="${r[2][0]}"><span class="num">${String(k + 1).padStart(2, '0')}</span>${r[1]}</button>${on ? `<div class="fl-s">${r[2].map(s => `<button class="${S.screen === s ? 'on' : ''}" data-go-direct="${s}">${titleOf(s)}</button>`).join('')}</div>` : ''}</li>`; }).join('')}</ol>
  <details class="allsc"><summary>Todas as telas <span class="num">${SCREENS[p].length}</span></summary><div class="slist">${SCREENS[p].map(([id, t]) => `<button class="${S.screen === id ? 'on' : ''}" data-go-direct="${id}" ${S.screen === id ? 'aria-current="page"' : ''}>${t}</button>`).join('')}</div></details>`;
}
function renderNotes() { return ''; }
function screenStep() {
  const L = SCREENS[S.profile], i = L.findIndex(x => x[0] === S.screen), prev = L[i - 1], next = L[i + 1];
  return `<div class="pstep"><button data-go-direct="${prev ? prev[0] : ''}" ${prev ? '' : 'disabled'} aria-label="Tela anterior">${ic('chevL', 18, 2.2)}</button>
  <div class="pst-m"><span><b class="num">${i + 1}</b> de ${L.length}</span><b>${titleOf(S.screen)}</b><p>${(NOTES[S.screen] || {}).d || ''}</p></div>
  <button data-go-direct="${next ? next[0] : ''}" ${next ? '' : 'disabled'} aria-label="Próxima tela">${ic('chev', 18, 2.2)}</button></div>`;
}
function render(keepScroll) {
  const isApp = S.profile === 'app';
  document.body.classList.toggle('mode-web', !isApp);
  $('#left').innerHTML = renderLeft();
  const nt = document.getElementById('notes'); if (nt) nt.innerHTML = renderNotes();
  const prev = document.querySelector('[data-scroll]');
  const top = keepScroll && prev ? prev.scrollTop : 0;
  if (isApp) {
    const scr = APP[S.screen]();
    const nav = (scr.h.match(/<nav class="tabbar"[\s\S]*?<\/nav>/) || [''])[0];
    const body = scr.h.replace(nav, '');
    $('#device').innerHTML = `${screenStep()}<div class="rph"><div class="dv-scr"><div class="phone"><div class="scr ${scr.ab ? 'has-ab' : ''}">${statusBarApp()}<div class="view" data-scroll>${body}</div>${nav}${scr.ab ? `<div class="ab">${scr.ab}</div>` : ''}<div class="toast" id="toast-app" role="status"></div><div class="home-ind"></div></div></div></div><img class="dv-frame" src="${DEV.iphone}" alt=""></div>`;
  } else {
    $('#device').innerHTML = screenStep() + webFrame(S.screen);
  }
  fitDevice();
  if (!keepScroll) { const v = document.querySelector('#device .view, #device .wmain'); if (v) { v.classList.remove('enter'); void v.offsetWidth; v.classList.add('enter'); } }
  const v = document.querySelector('[data-scroll]'); if (v) v.scrollTop = top;
  if (!document.body.classList.contains('deck-on') && location.hash.slice(1) !== S.screen) history.replaceState(null, '', '#' + S.screen);
}

/* no celular, o painel web é mostrado inteiro, reduzido para caber */
function fitDevice() {
  const d = document.querySelector('#device > .rph, #device > .browser'); if (!d) return;
  d.style.zoom = '';
  const w = document.getElementById('device').clientWidth;
  const hz = document.body.classList.contains('touring') ? (innerHeight - 64 - 90 - 150) : 1e5;
  if (d.classList.contains('browser')) { d.style.width = '1200px'; d.style.maxWidth = 'none'; const z = Math.min(w / 1200, hz / 800); if (z < 1) d.style.zoom = z.toFixed(3); else { d.style.width = ''; d.style.maxWidth = ''; } }
  else { const z = Math.min(w / 440, hz / 842); if (z < 1) d.style.zoom = z.toFixed(3); }
}
window.addEventListener('resize', () => { if (!document.body.classList.contains('deck-on')) fitDevice(); });
function navigate(id, push = true) {
  if (!NOTES[id]) return;
  if (push && id !== S.screen) S.hist.push(S.screen);
  S.profile = id.startsWith('web') ? 'web' : 'app';
  S.screen = id; S.flash = null; render(false);
}
function back() {
  let p = S.hist.pop();
  while (p && p.startsWith('web') !== S.screen.startsWith('web')) p = S.hist.pop();
  navigate(p || (S.profile === 'app' ? 'app-inicio' : 'web-painel'), false);
}

let toastT, flashT;
function toast(msg) {
  const el = document.getElementById(S.profile === 'app' ? 'toast-app' : 'toast-web'); if (!el) return;
  el.textContent = msg; el.classList.add('on');
  clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove('on'), 2600);
}
function flashOn(key, ms = 2200) { S.flash = key; render(true); clearTimeout(flashT); flashT = setTimeout(() => { if (S.flash === key) { S.flash = null; render(true); } }, ms); }
const upd = fn => { fn(); render(true); };
function copy(t) { try { navigator.clipboard.writeText(t).catch(() => { }); } catch (e) { } }

const ACT = {
  gen: v => upd(() => S.cad.gen = +v),
  terms: () => upd(() => { S.cad.terms = !S.cad.terms; S.cad.err = false; }),
  login: () => { const e = S.loginEmail.trim(); if (!/^\S+@\S+\.\S+$/.test(e) || !S.loginPw) return upd(() => S.loginErr = !e || !S.loginPw ? 'Preencha e-mail e senha.' : 'E-mail inválido.'); S.loginErr = ''; S.hist = []; navigate('app-inicio', false); },
  'pw-show': () => upd(() => S.pwShow = !S.pwShow),
  'forgot-send': () => { if (!/^\S+@\S+\.\S+$/.test(S.forgotEmail.trim())) return upd(() => S.forgotErr = true); S.forgotErr = false; if (S.forgotSent) { flashOn('resent'); return; } upd(() => S.forgotSent = true); },
  'forgot-back': () => { S.forgotSent = false; S.hist = []; navigate('app-login', false); },
  role: v => upd(() => S.role = v),
  'role-go': () => { if (S.role === 'cap') return navigate('app-inscrever'); upd(() => S.roleDone = true); },
  'copy-mydata': () => { copy(ME.email + ' · ' + ME.mat); flashOn('mydata'); },
  'go-home': () => { S.hist = []; navigate('app-inicio', false); },
  'pts-g': (v, t) => upd(() => { const k = t.dataset.k; S.disp[k] = Math.max(0, Math.min(9, S.disp[k] + +v)); }),
  'criar-conta': () => { if (S.cad.terms && pwScore(S.pw) === 5 && S.pw === S.pw2) { S.hist = []; return navigate('app-inicio', false); } upd(() => S.cad.err = true); const v = document.querySelector('[data-scroll]'); if (v) v.scrollTop = v.scrollHeight; },
  campTab: v => upd(() => S.campTab = +v),
  'share-camp': () => { copy('campeonatos.associacao/c/volei-misto-2027'); toast('Link do campeonato copiado'); },
  photo: v => upd(() => S.team.photo = v === '1'),
  shape: v => upd(() => S.team.shape = v),
  pal: v => upd(() => S.team.pal = +v),
  pat: v => upd(() => S.team.pat = v),
  'create-team': () => { S.created = true; navigate('app-equipe'); S.hist = S.hist.filter(h => h !== 'app-inscrever'); },
  'finish-team': () => { S.hist = []; navigate('app-confirmada', false); },
  'copy-invite': () => { copy('campeonatos.associacao/c/' + teamAbbr(S.team.name).toLowerCase() + '-8F3K'); flashOn('invite'); },
  'share-invite': () => toast('No celular, abre o WhatsApp com o convite pronto'),
  add: v => { if (S.roster.length >= TEAM_MAX) return; upd(() => S.roster.push([v, 'Convidado', 'wait'])); },
  accept: () => upd(() => S.invite = 'ok'),
  decline: () => upd(() => S.invite = 'no'),
  'sample-file': () => upd(() => S.atestado = 'atestado-rafael-2027.pdf'),
  jt: v => upd(() => S.jt = +v),
  tabelaTab: v => upd(() => S.tabelaTab = +v),
  'assoc-open': v => { S.assocView = v; S.gq = ''; navigate('web-associado'); },
  nch: v => upd(() => S.nch = v),
  notify: v => upd(() => S.notify = v),
  'notify-close': () => upd(() => S.notify = null),
  'notify-send': v => { S.notified[v] = true; S.notify = null; render(true); toast(`Aviso enviado para ${ROSTER[v][0]}`); },
  'camp-open': v => { S.gq = ''; S.wc = v; S.wct = 'resumo'; navigate('web-camp'); },
  'camp-tab': (v, t) => { S.gq = ''; S.wc = t.dataset.c; S.wct = v; navigate(CAMP_SCREEN[v]); },
  cf: v => upd(() => S.cf = v),
  rc: v => upd(() => S.rc = v),
  'rc-go': v => { S.rc = v; navigate('web-ranking'); },
  'ver-time': v => { S.timeView = v; navigate('app-time'); },
  rankMod: v => upd(() => S.rankMod = v),
  rankView: v => upd(() => S.rankView = +v),
  'remove-photo': () => upd(() => S.photo = null),
  logout: () => { S.cad.terms = false; S.cad.err = false; S.loginPw = ''; S.loginErr = ''; S.hist = []; navigate('app-login', false); },
  /* web */
  'novo-mod': v => upd(() => { S.novo.mod = v; S.novo.part = v === 'tru' ? 1 : 0; S.novo.etapas = v === 'tru'; S.novo.published = false; }),
  'novo-part': v => upd(() => S.novo.part = +v),
  'novo-etapas': () => upd(() => S.novo.etapas = !S.novo.etapas),
  'novo-n': v => upd(() => S.novo.n = Math.max(2, Math.min(20, S.novo.n + +v))),
  'novo-pont': () => upd(() => S.novo.pont = !S.novo.pont),
  'novo-atest': () => upd(() => S.novo.atest = !S.novo.atest),
  'novo-publish': () => upd(() => S.novo.published = true),
  'copy-link': () => { copy('campeonatos.associacao/i/truco-2027-e4'); flashOn('link'); },
  export: () => toast('No produto final, baixa uma planilha .xlsx'),
  inscTab: v => upd(() => S.inscTab = +v),
  ngroups: v => upd(() => initGroups(+v)),
  shuffle: () => upd(() => { const ids = DUPLAS.map(d => d.id).sort(() => Math.random() - .5); const cols = [...Array(S.nGroups)].map(() => []); ids.forEach((id, i) => cols[i % S.nGroups].push(id)); S.groups = cols; }),
  fmt: v => upd(() => S.disp.fmt = v),
  per: v => upd(() => S.disp.per = Math.max(1, Math.min(4, S.disp.per + +v))),
  thirds: v => upd(() => S.disp.thirds = Math.max(0, Math.min(S.nGroups, S.disp.thirds + +v))),
  cls: v => upd(() => S.disp.cls = v),
  phase: v => upd(() => S.disp.ph[v] = !S.disp.ph[v]),
  'gen-table': () => flashOn('table', 4000),
  score: (v, el) => upd(() => { const k = el.dataset.k, i = +el.dataset.i; S.jogos[k][i] = Math.max(0, S.jogos[k][i] + +v); S.jogos[k === 'sf1' ? 'saved1' : 'saved2'] = false; if (S.flash === 'tie') S.flash = null; }),
  pen: v => upd(() => { S.jogos.pen2 = v; S.flash = null; }),
  'save-game': v => {
    const key = v === 'sf1' ? 'saved1' : 'saved2';
    if (v === 'sf2' && S.jogos.sf2[0] === S.jogos.sf2[1] && !S.jogos.pen2) return upd(() => S.flash = 'tie');
    upd(() => { S.jogos[key] = true; S.brkMsg = S.screen === 'web-camp'; });
  },
  'publish-rank': () => flashOn('pub', 3000),
  wr: v => upd(() => S.wr = +v),
  'assoc-ok': v => upd(() => S.assocOk[+v] = !S.assocOk[+v])
};

document.addEventListener('click', e => {
  const t = e.target.closest('[data-go],[data-go-direct],[data-back],[data-act],[data-profile]');
  if (!t || t.disabled) return;
  if (t.dataset.profile) { if (S.profile !== t.dataset.profile) { S.hist = []; navigate(t.dataset.profile === 'app' ? 'app-inicio' : 'web-painel', false); } return; }
  if (t.dataset.goDirect) return navigate(t.dataset.goDirect);
  if (t.dataset.go) return navigate(t.dataset.go);
  if ('back' in t.dataset) return back();
  const fn = ACT[t.dataset.act]; if (fn) { e.preventDefault(); fn(t.dataset.v, t); }
});
document.addEventListener('input', e => {
  const el = e.target, k = el.dataset.input; if (!k) return;
  if (k === 'team-name') S.team.name = el.value || 'Minha equipe';
  if (k === 'search') S.search = el.value;
  if (k === 'assoc') S.assocQ = el.value;
  if (k === 'gq') S.gq = el.value;
  if (k === 'pw') S.pw = el.value;
  if (k === 'pw2') S.pw2 = el.value;
  if (k === 'login-email') { S.loginEmail = el.value; S.loginErr = ''; }
  if (k === 'login-pw') { S.loginPw = el.value; S.loginErr = ''; }
  if (k === 'forgot-email') { S.forgotEmail = el.value; S.forgotErr = false; }
  if (k === 'pts') S.pts[+el.dataset.i] = Math.max(0, +el.value || 0);
  const pos = el.selectionStart, sel = `[data-input="${k}"]` + (el.dataset.i ? `[data-i="${el.dataset.i}"]` : '');
  render(true);
  const n = document.querySelector(sel); if (n) { n.focus(); try { n.setSelectionRange(pos, pos); } catch (_) { } }
});
document.addEventListener('change', e => { if (e.target.matches('[data-file]') && e.target.files[0]) upd(() => S.atestado = e.target.files[0].name); });
document.addEventListener('change', e => {
  if (!e.target.matches('[data-photo]') || !e.target.files[0]) return;
  const f = e.target.files[0]; if (!f.type.startsWith('image/')) return toast('Escolha uma imagem (JPG ou PNG)');
  const rd = new FileReader(); rd.onload = () => upd(() => S.photo = rd.result); rd.readAsDataURL(f);
});
let dragId = null;
document.addEventListener('dragstart', e => { const c = e.target.closest('[data-drag]'); if (!c) return; dragId = c.dataset.drag; c.classList.add('dragging'); try { e.dataTransfer.setData('text/plain', dragId); } catch (_) { } });
document.addEventListener('dragend', () => document.querySelectorAll('.dragging,.over').forEach(x => x.classList.remove('dragging', 'over')));
document.addEventListener('dragover', e => { const c = e.target.closest('[data-drop]'); if (!c || !dragId) return; e.preventDefault(); document.querySelectorAll('.over').forEach(x => x !== c && x.classList.remove('over')); c.classList.add('over'); });
document.addEventListener('drop', e => {
  const c = e.target.closest('[data-drop]'); if (!c || !dragId) return; e.preventDefault();
  const to = +c.dataset.drop; S.groups = S.groups.map(col => col.filter(x => x !== dragId)); S.groups[to].push(dragId); dragId = null; render(true);
});

