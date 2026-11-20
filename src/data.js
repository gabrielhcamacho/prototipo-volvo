/* =========================================================
   Dados ilustrativos + estado do protótipo
   ========================================================= */
const MOD = {
  fut: { n: 'Futebol society', s: 'Futebol', c: '#D4F53C' },
  vol: { n: 'Vôlei', s: 'Vôlei', c: '#FF7A45' },
  tru: { n: 'Truco', s: 'Truco', c: '#B69CFF' }
};
const ME = { nome: 'Rafael Souza', ini: 'RS', mat: 'A123456', email: 'rafael.souza@email.com', tel: '(41) 99876-5432', nasc: '14/03/1991', idade: 36, gen: 'Masculino', predio: 'Prédio 12', depto: 'Engenharia de Cabines' };

/* ---- Futebol society: 8 equipes, 2 grupos, rodízio, semi + final + 3º ---- */
const FUT_GROUPS = {
  A: [['CAB', 3, 2, 1, 0, 5, 7], ['MOT', 3, 2, 0, 1, 3, 6], ['LOG', 3, 1, 1, 1, 0, 4], ['QUA', 3, 0, 0, 3, -8, 0]],
  B: [['ONI', 3, 3, 0, 0, 7, 9], ['CMP', 3, 1, 1, 1, 1, 4], ['ENG', 3, 1, 0, 2, -2, 3], ['TI', 3, 0, 1, 2, -6, 1]]
};

/* ---- Truco: jogadores e duplas ---- */
const NAMES = ['Carla Mendes', 'Jorge Lima', 'Ana Ribeiro', 'Diego Santos', 'Fernanda Alves', 'Marcos Teixeira', 'Patrícia Rocha', 'Bruno Costa', 'Luciana Prado', 'Thiago Nunes', 'Renata Dias', 'Sérgio Mota', 'Juliana Martins', 'Paulo Rezende', 'Camila Duarte', 'André Farias', 'Beatriz Lopes', 'Eduardo Pires', 'Gabriela Moura', 'Henrique Sales', 'Isabela Freitas', 'João Batista', 'Karina Vieira', 'Leonardo Brito', 'Mariana Castro', 'Nelson Araújo', 'Olívia Campos', 'Pedro Godoy', 'Quésia Ramos', 'Ricardo Tavares', 'Simone Barros', 'Tiago Moreira', 'Úrsula Pinto', 'Vinícius Rocha', 'Wagner Leite', 'Yasmin Cardoso', 'Zeca Monteiro', 'Aline Soares', 'Breno Matos', 'Cíntia Gomes', 'Davi Queiroz', 'Elaine Torres', 'Fábio Neves', 'Gisele Pacheco', 'Hugo Martins', 'Ivone Cruz', 'Júlio César', 'Larissa Melo', 'Mauro Sampaio', 'Nádia Coelho', 'Otávio Reis', 'Priscila Ramos', 'Rogério Antunes', 'Sabrina Franco', 'Tânia Lacerda', 'Ubiratan Silva'];
const first = n => n.split(' ')[0];
const DUPLAS = [...Array(28)].map((_, i) => ({ id: 'd' + i, a: NAMES[i * 2], b: NAMES[i * 2 + 1], n: first(NAMES[i * 2]) + ' & ' + first(NAMES[i * 2 + 1]) }));

/* classificação completa da etapa 3 (como a associação faz: 1–8 pelo mata-mata, 9+ pelas chaves) */
const ETAPA3 = (() => {
  const how = ['Campeã', 'Vice', 'Venceu a disputa de 3º', 'Perdeu a disputa de 3º', 'Caiu nas quartas para a 1ª', 'Caiu nas quartas para a 2ª', 'Caiu nas quartas para a 3ª', 'Caiu nas quartas para a 4ª'];
  const base = [4, 0, 9, 2, 13, 6, 11, 1, 17, 5, 21, 8, 14, 3, 19, 10, 25, 7, 23, 12, 16, 27, 15, 20, 18, 24, 22, 26];
  const order = [2, 0, 4, ...base.filter(x => ![2, 0, 4].includes(x))];
  return order.map((d, i) => ({ pos: i + 1, d: DUPLAS[d], how: i < 8 ? how[i] : `Fase de chaves · ${['3', '3', '2', '2', '2', '2', '1', '1', '1', '1', '1', '1', '0', '0', '0', '0', '0', '0', '0', '0'][i - 8]} vitórias` }));
})();

/* ranking acumulado individual: posição de cada pessoa em cada etapa (null = não jogou) */
const RANK_PLAYERS = [
  ['Fernanda Alves', [1, 3, 1]], ['Marcos Teixeira', [1, 3, 1]], ['Carla Mendes', [2, 1, 2]], ['Jorge Lima', [2, 1, 2]], ['Luciana Prado', [4, 2, 3]],
  ['Thiago Nunes', [4, 2, 3]], ['Camila Duarte', [3, 6, 5]], ['André Farias', [3, 6, 5]], ['Patrícia Rocha', [6, 5, 6]], ['Bruno Costa', [6, null, 6]],
  ['Renata Dias', [8, 4, 9]], ['Sérgio Mota', [null, 4, 7]], ['Juliana Martins', [5, 9, 12]], ['Paulo Rezende', [5, null, 12]], ['Beatriz Lopes', [10, 7, 8]],
  ['Eduardo Pires', [12, 8, 4]], ['Rafael Souza', [null, 11, null], true], ['Gabriela Moura', [9, 12, 15]], ['Henrique Sales', [15, 10, 11]], ['Isabela Freitas', [11, 16, 10]]
];

/* associados cadastrados (admin) */
const ASSOC = [
  ['Rafael Souza', 'A123456', 'Prédio 12 · Eng. de Cabines', 36, 'M', '08/05', true],
  ['Carla Mendes', 'A118230', 'Prédio 3 · Logística', 41, 'F', '02/05', true],
  ['Juliana Martins', 'A130912', 'Prédio 12 · Qualidade', 29, 'F', '09/05', false],
  ['Diego Santos', 'A101554', 'Prédio 7 · Motores', 33, 'M', '09/05', false],
  ['Fernanda Alves', 'A097441', 'Prédio 1 · RH', 45, 'F', '28/04', true],
  ['Thiago Nunes', 'A125003', 'Prédio 7 · Motores', 27, 'M', '10/05', false],
  ['Beatriz Lopes', 'A133870', 'Prédio 3 · Compras', 31, 'F', '10/05', false],
  ['Sérgio Mota', 'A088120', 'Prédio 12 · Montagem', 52, 'M', '22/04', true],
  ['Renata Dias', 'A119987', 'Prédio 1 · Financeiro', 38, 'F', '30/04', true],
  ['Marcos Teixeira', 'A094410', 'Prédio 5 · TI', 44, 'M', '25/04', true]
];

/* busca de cadastrados para adicionar ao time */
const PEOPLE_RAW = [['Juliana Martins', 'Prédio 12 · Qualidade', 'JM'], ['Diego Santos', 'Prédio 7 · Motores', 'DS'], ['Beatriz Lopes', 'Prédio 3 · Compras', 'BL'], ['Thiago Nunes', 'Prédio 7 · Motores', 'TN'], ['Camila Duarte', 'Prédio 5 · TI', 'CD'], ['André Farias', 'Prédio 1 · RH', 'AF']];

const PALS = [['#0E2A5A', '#D4F53C'], ['#FF6B35', '#151515'], ['#7B5CFF', '#FFFFFF'], ['#E8483B', '#FFE9D2'], ['#17A673', '#FFFFFF'], ['#003057', '#7FCBFF']];

/* ---------------- estado ---------------- */
const S = {
  profile: 'app', screen: 'app-inicio', hist: [],
  cad: { gen: 1, terms: false },
  campTab: 0, tabelaTab: 1, rankMod: 'tru', rankView: 0,
  team: { name: 'Bloqueio Total', pal: 2, shape: 'shield', pat: 'hoops', photo: false, atest: false },
  roster: [['Rafael Souza', 'Capitão', 'ok']], invites: 0,
  search: '', invite: 'pending', atestado: null,
  pw: '', pw2: '', pwShow: false, loginEmail: 'rafael.souza@email.com', loginPw: '', loginErr: '', forgotEmail: 'rafael.souza@email.com', forgotSent: false, forgotErr: false, role: null, roleDone: false,
  /* web */
  novo: { mod: 'tru', part: 1, etapas: true, n: 10, pont: true, atest: false, published: false },
  inscTab: 0,
  groups: null, nGroups: 4,
  disp: { v: 3, e: 1, dr: 0, fmt: 'double', per: 2, thirds: 0, ph: { oit: false, qua: true, sem: true, ter: true, fin: true }, cls: 'full' },
  jogos: { sf1: [2, 1], sf2: [1, 1], saved1: true, saved2: false, pen2: null },
  pts: [30, 25, 21, 18, 15, 14, 13, 12, 10, 9, 8, 7, 6, 5, 4, 3],
  assocOk: ASSOC.map(a => a[6]), assocQ: ''
};
function initGroups(n) {
  const cols = [...Array(n)].map(() => []);
  DUPLAS.forEach((d, i) => cols[i % n].push(d.id));
  S.groups = cols; S.nGroups = n;
}
initGroups(4);
const ptsFor = p => p == null ? 0 : p <= 16 ? S.pts[p - 1] : 2;

const PEOPLE = PEOPLE_RAW.map(p => [...p, p[0].toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(' ', '.') + '@email.com']);
const TEAM_MAX = 10, TEAM_MIN = 6;

const FEM = new Set(['Carla', 'Ana', 'Fernanda', 'Patrícia', 'Luciana', 'Renata', 'Juliana', 'Camila', 'Beatriz', 'Gabriela', 'Isabela', 'Karina', 'Mariana', 'Olívia', 'Quésia', 'Simone', 'Úrsula', 'Yasmin', 'Aline', 'Cíntia', 'Elaine', 'Gisele', 'Ivone', 'Larissa', 'Nádia', 'Priscila', 'Sabrina', 'Tânia']);
/* foto gerada por pessoa: mulheres em FACES_F, homens em FACES_M, na ordem em que aparecem */
const FACE = (() => { const m = {}, f = [], h = []; ['Rafael Souza', ...NAMES, 'Equipe da associação'].forEach(n => (FEM.has(n.split(' ')[0]) ? f : h).push(n));
  f.forEach((n, i) => { if (typeof FACES_F !== 'undefined' && FACES_F[i]) m[n] = FACES_F[i]; });
  h.forEach((n, i) => { if (typeof FACES_M !== 'undefined' && FACES_M[i]) m[n] = FACES_M[i]; });
  return m; })();
if (FACE['Rafael Souza']) S.photo = FACE['Rafael Souza'];

/* jogos da fase de grupos (mandante, gols, visitante, gols, data) */
const FUT_GAMES = [['CAB', 3, 'QUA', 0, '24 abr'], ['MOT', 2, 'LOG', 0, '24 abr'], ['CAB', 1, 'LOG', 1, '01 mai'], ['MOT', 4, 'QUA', 1, '01 mai'], ['CAB', 3, 'MOT', 1, '08 mai'], ['LOG', 2, 'QUA', 0, '08 mai'],
  ['ONI', 2, 'CMP', 1, '25 abr'], ['ENG', 4, 'TI', 2, '25 abr'], ['ONI', 3, 'ENG', 1, '02 mai'], ['CMP', 1, 'TI', 1, '02 mai'], ['ONI', 4, 'TI', 0, '09 mai'], ['CMP', 3, 'ENG', 1, '09 mai']];
const FUT_PLACE = 'Campo 1 · Sede da associação';
const SEMIS = [['CAB', 'CMP', '10:00'], ['ONI', 'MOT', '11:30']];
const TITLES = { ONI: ['Campeão · Copa 2026'], CAB: ['Vice · Copa 2026', 'Campeão · Copa 2025'], MOT: ['3º lugar · Copa 2026'], LOG: ['Vice · Copa 2025'] };
const ROSTER = (() => { const r = {}, codes = ['CAB', 'MOT', 'LOG', 'ENG', 'TI', 'ONI', 'QUA', 'CMP'], men = NAMES.filter(n => !FEM.has(n.split(' ')[0]));
  codes.forEach((c, i) => { const pick = [...Array(7)].map((_, j) => NAMES[(i * 7 + j * 3) % NAMES.length]); r[c] = c === 'CAB' ? ['Rafael Souza', ...pick.slice(0, 6)] : [men[i * 3 % men.length], ...pick.filter(n => n !== men[i * 3 % men.length]).slice(0, 6)]; });
  r.SAQ = ['Larissa Melo', 'Breno Matos', 'Aline Soares', 'Davi Queiroz', 'Gisele Pacheco', 'Hugo Martins', 'Sabrina Franco', 'Otávio Reis'];
  return r; })();

/* campeonatos do painel */
const CAMPS = {
  fut: { n: 'Copa Futebol Society 2027', mod: 'fut', st: 'run', fase: 'Semifinais', info: '8 equipes · 2 grupos · Campo 1', ins: '8 equipes', tabs: [['resumo', 'Resumo'], ['class', 'Classificação'], ['jogos', 'Jogos e resultados'], ['equipes', 'Equipes']], steps: ['Inscrições', 'Fase de grupos', 'Semifinais', 'Final'], at: 2 },
  tru4: { n: 'Truco · Etapa 4', mod: 'tru', st: 'open', fase: 'Inscrições até 12 mai', info: 'Ranking de Truco 2027 · etapa 4 de 10', ins: '28 duplas', tabs: [['resumo', 'Resumo'], ['insc', 'Inscrições'], ['grupos', 'Grupos'], ['disputa', 'Sistema de disputa'], ['class', 'Classificação']], steps: ['Inscrições', 'Grupos', 'Chaves', 'Final'], at: 0 },
  vol: { n: 'Vôlei Misto 2027', mod: 'vol', st: 'open', fase: 'Inscrições até 28 mai', info: 'Equipes de 6 a 10 atletas · Ginásio', ins: '9 equipes', tabs: [['resumo', 'Resumo'], ['equipes', 'Equipes'], ['class', 'Classificação']], steps: ['Inscrições', 'Rodízio', 'Semifinais', 'Final'], at: 0 },
  tru3: { n: 'Truco · Etapa 3', mod: 'tru', st: 'done', fase: 'Encerrado em 23 abr', info: 'Ranking de Truco 2027 · etapa 3 de 10', ins: '28 duplas', tabs: [['resumo', 'Resumo'], ['class', 'Classificação']], steps: ['Inscrições', 'Grupos', 'Chaves', 'Final'], at: 4 }
};
const CAMP_SCREEN = { resumo: 'web-camp', class: 'web-camp', equipes: 'web-camp', insc: 'web-inscricoes', grupos: 'web-grupos', disputa: 'web-disputa', jogos: 'web-jogos' };
const VOL_TEAMS = [['ENG', 10, '02 mai'], ['LOG', 8, '03 mai'], ['TI', 9, '03 mai'], ['QUA', 7, '04 mai'], ['CAB', 6, '05 mai'], ['SAQ', 8, '06 mai'], ['CMP', 6, '06 mai'], ['MOT', 5, '07 mai'], ['ONI', 4, '08 mai']];
const VOL_2026 = [['ENG', 8, 1, 16], ['LOG', 6, 3, 13], ['QUA', 5, 4, 11], ['CAB', 4, 5, 9], ['TI', 3, 6, 7], ['MOT', 2, 7, 5], ['CMP', 1, 8, 3]];
S.wc = 'fut'; S.wct = 'resumo'; S.cf = 'all'; S.rc = 'tru';

S.assocView = 'Carla Mendes'; S.gq = ''; S.notify = null; S.nch = 'ambos'; S.notified = {}; S.brkMsg = false;
CAMPS.fut.tabs.push(['hist', 'Histórico']); CAMPS.tru4.tabs.push(['hist', 'Histórico']); CAMPS.vol.tabs.push(['hist', 'Histórico']); CAMPS.tru3.tabs.push(['hist', 'Histórico']);
CAMP_SCREEN.hist = 'web-camp';
/* dados de qualquer pessoa (cadastro ou atleta) */
function person(n) {
  const a = ASSOC.find(x => x[0] === n);
  const h = [...n].reduce((s, ch) => s + ch.charCodeAt(0), 0);
  const p = PEOPLE.find(x => x[0] === n);
  return { n, mat: a ? a[1] : 'A1' + String(10000 + h * 37 % 89999).padStart(5, '0'), dep: a ? a[2] : p ? p[1] : ['Prédio 3 · Logística', 'Prédio 7 · Motores', 'Prédio 12 · Qualidade', 'Prédio 1 · Compras', 'Prédio 9 · TI'][h % 5], age: a ? a[3] : 24 + h % 30, g: a ? a[4] : FEM.has(n.split(' ')[0]) ? 'F' : 'M', since: a ? a[5] : ['12/02', '03/03', '21/03', '04/04'][h % 4], email: n === ME.nome ? ME.email : n.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(' ', '.') + '@email.com' };
}
const ALL_PEOPLE = [...new Set([...ASSOC.map(a => a[0]), ...NAMES])];

/* ---------- acabamento: fotografia no lugar das ilustrações ---------- */
const photoIc = (k, s, r) => `<span class="phi" role="img" aria-hidden="true" style="width:${s}px;height:${s}px;border-radius:${r ?? Math.round(s * .28)}px;background-image:url(${DIMG['th_' + k]})"></span>`;
soccer = s => photoIc('ball', s); volley = s => photoIc('volley', s); cards = s => photoIc('cards', s);
BALL.fut = soccer; BALL.vol = volley; BALL.tru = cards;
const _trophy = trophy;
trophy = (w, k = 'gold', place = 1, st = '') => w >= 48 ? photoIc('trophy', w) : _trophy(w, k, place, st);
/* escudo sóbrio: monograma na cor da equipe */
function crestMono(code, s) {
  const t = T[code]; if (!t) return crest(code, s, { flat: true });
  const c1 = t.c[0], light = (h => { const n = parseInt(h.slice(1), 16); return ((n >> 16) * .299 + ((n >> 8) & 255) * .587 + (n & 255) * .114) > 160; })(c1);
  const fg = light ? '#0E1A2B' : '#FFFFFF';
  return `<svg viewBox="0 0 100 112" width="${s}" height="${(s * 1.12).toFixed(1)}" style="display:block" role="img" aria-label="${t.n}"><path d="${SHAPE.shield}" fill="${c1}"/><path d="${SHAPE.shield}" fill="none" stroke="${fg}" stroke-opacity=".28" stroke-width="3" transform="translate(50 56) scale(.86) translate(-50 -56)"/><text x="50" y="66" text-anchor="middle" font-size="27" font-weight="600" fill="${fg}" style="font-family:Archivo;letter-spacing:.02em">${code}</text></svg>`;
}
