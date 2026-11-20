/* =========================================================
   PAINEL WEB DO ADMINISTRADOR
   ========================================================= */
const NAV_WEB = [
  ['Gestão', [['grid', 'Visão geral', 'web-painel'], ['trophy', 'Campeonatos', 'web-campeonatos'], ['podium', 'Classificação', 'web-ranking'], ['plus', 'Novo campeonato', 'web-novo']]],
  ['Cadastros', [['idcard', 'Associados', 'web-associados']]]
];
const NAV_OWNER = { 'web-camp': 'web-campeonatos', 'web-inscricoes': 'web-campeonatos', 'web-grupos': 'web-campeonatos', 'web-disputa': 'web-campeonatos', 'web-jogos': 'web-campeonatos' };
const WEB = {};
const wb = (t, attrs = '', v = 'pri', icon = '') => `<button class="wb wb-${v}" ${attrs}>${icon ? ic(icon, 18, 2) : ''}${t}</button>`;
const crumb = parts => `<nav class="crumb" aria-label="Caminho">${parts.map((p, i) => i ? `${ic('chev', 14, 2)}<span>${p}</span>` : `<span>${p}</span>`).join('')}</nav>`;
const whead = (parts, title, acts = '') => `${crumb(parts)}<div class="whead"><h1>${title}</h1><div class="acts">${acts}</div></div>`;
const wseg = (items, cur, act, vals) => `<div class="wseg" role="tablist">${items.map((t, i) => { const v = vals ? vals[i] : i; return `<button role="tab" aria-selected="${cur === v}" class="${cur === v ? 'on' : ''}" data-act="${act}" data-v="${v}">${t}</button>`; }).join('')}</div>`;
const stepper = (v, act, min, max, label) => `<span class="stp" role="group" aria-label="${label}"><button data-act="${act}" data-v="-1" ${v <= min ? 'disabled' : ''} aria-label="Diminuir">${ic('minus', 16, 2.2)}</button><b>${v}</b><button data-act="${act}" data-v="1" ${v >= max ? 'disabled' : ''} aria-label="Aumentar">${ic('plus', 16, 2.2)}</button></span>`;
const tog = (on, act, label) => `<button class="tog ${on ? 'on' : ''}" data-act="${act}" role="switch" aria-checked="${on}" aria-label="${label}"><i></i></button>`;
const modCell = (k, t, s) => `<span class="cn">${BALL[k](30)}<span><b style="font-weight:600">${t}</b><small>${s}</small></span></span>`;

/* ---------- Novo campeonato ---------- */
WEB['web-novo'] = () => {
  const n = S.novo, part = ['equipes', 'duplas', 'atletas'][n.part];
  return `
  ${whead(['Campeonatos', 'Novo campeonato'], 'Novo campeonato', wb('Cancelar', go('web-painel'), 'sec', 'x'))}
  <div class="cols">
  <section class="panel">
    <div class="sect"><h3 style="margin-bottom:16px">Modalidade</h3>
      <div class="mods">${['fut', 'vol', 'tru'].map(k => `<button class="mod ${n.mod === k ? 'on' : ''}" data-act="novo-mod" data-v="${k}" aria-pressed="${n.mod === k}">${BALL[k](44)}${MOD[k].s}</button>`).join('')}</div></div>
    <div class="sect"><h3 style="margin-bottom:16px">Informações</h3>
      <div class="wform">
        <label class="wf full"><span>Nome</span><input value="${n.mod === 'tru' ? 'Ranking de Truco 2027' : n.mod === 'vol' ? 'Vôlei Misto 2027' : 'Copa Futebol Society 2027'}"></label>
        <div class="wf full"><span>Participação</span>${wseg(['Equipe', 'Dupla', 'Individual'], n.part, 'novo-part')}</div>
        <label class="wf"><span>Inscrições abrem</span><input value="03/05/2027"></label>
        <label class="wf"><span>Inscrições fecham</span><input value="12/05/2027"></label>
        <label class="wf"><span>Atletas por ${['equipe', 'dupla', 'inscrição'][n.part]}</span><input value="${['6 a 10', '2', '1'][n.part]}"></label>
        <label class="wf"><span>Local</span><input value="${n.mod === 'tru' ? 'Salão de jogos' : n.mod === 'vol' ? 'Ginásio' : 'Campos 1 e 2'}"></label>
      </div></div>
  </section>
  <section class="panel">
    <h2 style="margin-bottom:16px">Regras gerais</h2>
    <div class="sw-row"><div class="m"><b>Campeonato por etapas</b><span>Pontos somam num ranking do ano.</span>
      ${n.etapas ? `<div style="display:flex;align-items:center;gap:12px;margin-top:12px;font-size:14px;color:var(--ink-2)">${stepper(n.n, 'novo-n', 2, 20, 'Número de etapas')}etapas</div>` : ''}</div>${tog(n.etapas, 'novo-etapas', 'Campeonato por etapas')}</div>
    <div class="sw-row"><div class="m"><b>Pontuação e ranking</b></div>${tog(n.pont, 'novo-pont', 'Pontuação e ranking')}</div>
    ${n.published ? `<div class="done" role="status"><b>Inscrições abertas</b><p></p>
      <div class="lk"><code>campeonatos.associacao/i/truco-2027-e4</code>${wb(flash('link', 'Copiar link', 'Copiado'), 'data-act="copy-link"', 'sec', S.flash === 'link' ? 'check' : 'copy')}</div>
      <div style="margin-top:12px">${wb('Ver inscrições', go('web-inscricoes'), 'pri', 'inbox')}</div></div>`
      : `<div style="margin-top:20px">${wb('Publicar e gerar link', 'data-act="novo-publish"', 'pri', 'link')}</div>`}
  </section></div>`;
};

/* ---------- Inscrições ---------- */
WEB['web-inscricoes'] = () => {
  const rows = DUPLAS.map((d, i) => [d, ['8 mai', '7 mai', '6 mai', '5 mai'][i % 4], i % 5 === 1 ? 1 : i % 7 === 3 ? 0 : 2]);
  const extra = S.invite === 'ok' ? `<tr><td class="mut num">29</td><td><span class="pcell">${duo('Carla Mendes', ME.nome, 24)}Carla e Rafael</span></td><td>Carla Mendes<small>A118230</small></td><td>Rafael Souza<small>A123456</small></td><td class="mut">hoje</td></tr>` : '';
  return `
  ${campHead('tru4', 'insc', wb('Exportar planilha', 'data-act="export"', 'sec', 'doc') + wb('Montar grupos', go('web-grupos'), 'pri', 'groups'))}
  <div class="slim"><div><b>${S.invite === 'ok' ? 29 : 28}</b>duplas</div><div><b>${S.invite === 'ok' ? 58 : 56}</b>atletas</div><div><b>12 mai</b>fim das inscrições</div></div>
  <section class="panel">
    <div class="tools">${wseg(['Duplas', 'Atletas'], S.inscTab, 'inscTab')}<span class="grow"></span><label class="wsearch" style="max-width:300px">${ic('search', 18)}<input placeholder="Nome ou matrícula" aria-label="Buscar inscrição"></label></div>
    <div class="tscroll"><table class="wt">${S.inscTab === 0 ? `
      <thead><tr><th scope="col" class="n" style="width:32px">#</th><th scope="col">Dupla</th><th scope="col">Jogador 1</th><th scope="col">Jogador 2</th><th scope="col">Inscrita em</th></tr></thead>
      <tbody>${rows.map(([d, dt, at], i) => `<tr><td class="mut num">${i + 1}</td><td><span class="pcell">${duo(d.a, d.b, 24)}${d.n.replace('&', 'e')}</span></td><td>${d.a}<small>A${118000 + i * 37}</small></td><td>${d.b}<small>A${120000 + i * 53}</small></td><td class="mut">${dt}</td></tr>`).join('')}${extra}</tbody>`
      : `<thead><tr><th scope="col">Atleta</th><th scope="col">Matrícula</th><th scope="col">Prédio e departamento</th><th scope="col" class="n">Idade</th><th scope="col">Gênero</th></tr></thead>
      <tbody>${rows.slice(0, 14).flatMap(([d]) => [d.a, d.b]).map((n, i) => `<tr><td><span class="pcell">${face(n, 28)}${n}</span></td><td class="mut num">A${118000 + i * 41}</td><td>Prédio ${[1, 3, 5, 7, 12][i % 5]} · ${['RH', 'Logística', 'TI', 'Motores', 'Cabines'][i % 5]}</td><td class="n">${26 + (i * 7) % 30}</td><td>${i % 2 ? 'Masculino' : 'Feminino'}</td></tr>`).join('')}</tbody>`}
    </table></div></section>`;
};

/* ---------- Grupos ---------- */
WEB['web-grupos'] = () => {
  const byId = Object.fromEntries(DUPLAS.map(d => [d.id, d]));
  return `
  ${campHead('tru4', 'grupos', wb('Distribuir automaticamente', 'data-act="shuffle"', 'sec', 'shuffle') + wb('Salvar e definir disputa', go('web-disputa'), 'pri', 'sliders'))}
  <div class="tools"><span style="font-size:14px;color:var(--ink-2)">Quantidade de grupos</span>${wseg(['2', '3', '4', '5', '6'], S.nGroups, 'ngroups', [2, 3, 4, 5, 6])}<span style="font-size:14px;color:var(--ink-2);margin-left:8px" class="num">28 duplas: ${S.groups.map(c => c.length).join(', ')}</span></div>
  <div class="gcols" style="grid-template-columns:repeat(${S.nGroups},1fr)">${S.groups.map((col, gi) => `
    <section class="gcol" data-drop="${gi}" aria-label="Grupo ${'ABCDEF'[gi]}"><div class="gh"><b>Grupo ${'ABCDEF'[gi]}</b><span class="num">${col.length} duplas</span></div>
    ${col.map((id, j) => `<div class="gcard" draggable="true" data-drag="${id}"><span class="grip">${ic('grip', 16, 2)}</span>${byId[id].n.replace('&', 'e')}${j === 0 ? '<em>cabeça</em>' : ''}</div>`).join('')}</section>`).join('')}</div>`;
};

/* ---------- Sistema de disputa ---------- */
const ptsStep = (v, k) => `<span class="stp" role="group" aria-label="Pontos"><button data-act="pts-g" data-k="${k}" data-v="-1" ${v <= 0 ? 'disabled' : ''} aria-label="Menos um ponto">${ic('minus', 16, 2.2)}</button><b>${v}</b><button data-act="pts-g" data-k="${k}" data-v="1" ${v >= 9 ? 'disabled' : ''} aria-label="Mais um ponto">${ic('plus', 16, 2.2)}</button></span>`;
function cruz(G, per) {
  const L = 'ABCDEF';
  if (per !== 2) return 'melhor campanha contra pior campanha';
  const pairs = G === 2 ? [[0, 1], [1, 0]] : G === 4 ? [[0, 3], [1, 2], [2, 1], [3, 0]] : [...Array(G)].map((_, i) => [i, G - 1 - i]);
  return pairs.map(([a, b]) => `1º${L[a]} × 2º${L[b]}`).join(', ');
}
function chaveDupla() {
  const BW = 104, line = 'rgba(0,48,87,.38)';
  const game = (x, y, n, a, b) => `<g><text x="${x}" y="${y - 6}" font-size="9.5" fill="rgba(0,48,87,.55)">${n}</text><rect x="${x}" y="${y}" width="${BW}" height="48" rx="6" fill="#fff" stroke="rgba(0,48,87,.2)"/><line x1="${x}" x2="${x + BW}" y1="${y + 24}" y2="${y + 24}" stroke="rgba(0,48,87,.1)"/><text x="${x + 10}" y="${y + 16}" font-size="11" fill="#003057">${a}</text><text x="${x + 10}" y="${y + 40}" font-size="11" fill="#003057">${b}</text></g>`;
  const res = (x, y, t, s) => `<g><rect x="${x}" y="${y}" width="${BW}" height="40" rx="6" fill="#003057"/><text x="${x + 10}" y="${y + 17}" font-size="12" font-weight="600" fill="#C8F04A">${t}</text><text x="${x + 10}" y="${y + 32}" font-size="10" fill="rgba(255,255,255,.75)">${s}</text></g>`;
  const ln = (d, dash) => `<path d="${d}" fill="none" stroke="${line}" stroke-width="1.4" ${dash ? 'stroke-dasharray="3 3"' : ''}/>`;
  const X = [14, 150, 290], L = X[0];
  return `<svg class="chv" viewBox="0 0 400 300" width="100%" role="img" aria-label="Chave de eliminatória dupla com quatro duplas: invicto fica em 1º, vencedor da repescagem em 2º">
  ${game(X[0], 20, 'Jogo 1', 'Dupla 1', 'Dupla 2')}${game(X[0], 100, 'Jogo 2', 'Dupla 3', 'Dupla 4')}
  ${game(X[1], 60, 'Jogo 3 · vencedores', 'Vencedor J1', 'Vencedor J2')}
  ${game(X[1], 190, 'Jogo 4 · perdedores', 'Perdedor J1', 'Perdedor J2')}
  ${game(X[2], 160, 'Jogo 5 · repescagem', 'Perdedor J3', 'Vencedor J4')}
  ${res(X[2], 64, '1º da chave', 'invicto')}${res(X[2], 248, '2º da chave', 'repescagem')}
  ${ln(`M${L + BW} 44h16v40h16M${L + BW} 124h16v-40`)}
  ${ln(`M${X[1] + BW} 84h36`)}
  ${ln(`M${L} 32h-10v182h${X[1] - L + 10}M${L} 112h-10`, true)}
  ${ln(`M${X[1] + BW} 96h18v76h18`, true)}
  ${ln(`M${X[1] + BW} 214h18v-18h18`)}
  ${ln(`M${X[2] + BW / 2} 208v40`)}
  </svg>
  <p class="small" style="margin-top:4px">Linha tracejada: quem perdeu e ainda tem uma chance.</p>`;
}

WEB['web-disputa'] = () => {
  const d = S.disp, N = 28, G = S.nGroups;
  const qual = G * d.per + d.thirds;
  const start = qual >= 16 ? ['oit', 'oitavas'] : qual >= 8 ? ['qua', 'quartas'] : qual >= 4 ? ['sem', 'semifinal'] : ['fin', 'final'];
  const ok = [2, 4, 8, 16].includes(qual);
  const phases = [['oit', 'Oitavas de final', 16], ['qua', 'Quartas de final', 8], ['sem', 'Semifinal', 4], ['ter', 'Disputa de 3º lugar', 0], ['fin', 'Final', 0]];
  return `
  ${campHead('tru4', 'disputa')}
  <div class="cols">
  <section class="panel">
    <div class="sect"><h3>Fase de grupos</h3><p>${G} grupos de até ${Math.ceil(N / G)} duplas</p>
      <div class="fmts">${[['simple', 'Eliminatória simples', 'Perdeu, está fora.'], ['double', 'Eliminatória dupla', 'Sai com a segunda derrota. Padrão do truco.'], ['robin', 'Rodízio', 'Todos jogam contra todos do grupo.']].map(([k, a, b]) => `<button class="fmt ${d.fmt === k ? 'on' : ''}" data-act="fmt" data-v="${k}" role="radio" aria-checked="${d.fmt === k}"><span class="d">${fmtDiag(k, '#003057', '#003057', 72)}</span><span><b>${a}</b><span>${b}</span></span><span class="radio"></span></button>`).join('')}</div></div>
    ${d.fmt === 'robin' ? `<div class="sect"><h3 style="margin-bottom:8px">Pontos por jogo</h3>
      <div class="sw-row"><div class="m"><b>Vitória</b></div>${ptsStep(d.v, 'v')}</div>
      <div class="sw-row"><div class="m"><b>Empate</b></div>${ptsStep(d.e, 'e')}</div>
      <div class="sw-row"><div class="m"><b>Derrota</b></div>${ptsStep(d.dr, 'dr')}</div>
      <p class="small" style="margin-top:8px">Desempate: pontos, vitórias, saldo, confronto direto.</p></div>` : ''}
    ${d.fmt === 'double' ? `<div class="sect"><h3 style="margin-bottom:4px">Como fecha a chave</h3><p>O invicto é o 1º da chave. O vencedor da repescagem é o 2º.</p>${chaveDupla()}</div>` : ''}
    <div class="sect"><h3 style="margin-bottom:8px">Quem avança</h3>
      <div class="sw-row"><div class="m"><b>Classificados por grupo</b></div>${stepper(d.per, 'per', 1, 4, 'Classificados por grupo')}</div>
      <div class="sw-row"><div class="m"><b>Melhores ${d.per + 1}º colocados</b></div>${stepper(d.thirds, 'thirds', 0, G, 'Melhores colocados')}</div></div>
    <div class="sect"><h3 style="margin-bottom:12px">Classificação final</h3>${wseg(['Ranking completo', 'Só o pódio'], d.cls, 'cls', ['full', 'top3'])}</div>
  </section>
  <div>
  <section class="panel"><h2 style="margin-bottom:8px">Mata-mata</h2>
    <div class="phs">${phases.map(([k, t, need]) => { const dis = need && qual < need; const on = d.ph[k] && !dis; return `<button class="phr ${on ? 'on' : ''} ${dis ? 'dis' : ''}" ${dis ? 'aria-disabled="true"' : `data-act="phase" data-v="${k}"`} role="checkbox" aria-checked="${on}"><span class="cb">${on ? ic('check', 14, 2.6) : ''}</span>${t}${dis ? `<small>precisa de ${need}</small>` : ''}</button>`; }).join('')}</div></section>
  <section class="sum ${ok ? '' : 'bad'}" aria-live="polite"><span class="c">Resumo</span>
    <div class="flow"><span><b>${N}</b> duplas</span><span>em <b>${G}</b> grupos</span><span><b>${qual}</b> avançam</span><span class="to">${ok ? {oit:'começa nas oitavas',qua:'começa nas quartas',sem:'começa na semifinal',fin:'vai direto à final'}[start[0]] : 'chave incompleta'}</span></div>
    <p>${ok ? `Cruzamentos: ${cruz(G, d.per)}.` : `${qual} classificadas não formam uma chave. Use ${qual < 8 ? 8 : 16}: mude os classificados por grupo ou adicione melhores ${d.per + 1}º colocados.`}</p>
    <p style="margin-top:8px">${d.cls === 'full' ? 'Ranking: 1º a 4º pelos jogos finais. 5º a 8º pelos eliminados nas quartas, na ordem de quem os eliminou (quem perdeu para a 1ª fica em 5º). Do 9º em diante, pela campanha nos grupos.' : 'Só 1º, 2º e 3º recebem colocação.'}</p></section>
  <div style="margin-top:16px;display:flex;align-items:center;gap:16px">${wb('Gerar tabela de jogos', ok ? 'data-act="gen-table"' : 'disabled', 'pri', 'bracket')}${S.flash === 'table' ? `<span class="saved">${ic('check', 16, 2.4)}Tabela gerada</span>` : ''}</div>
  </div></div>`;
};

/* ---------- Jogos e resultados ---------- */
WEB['web-jogos'] = () => {
  const j = S.jogos;
  const w1 = j.sf1[0] > j.sf1[1] ? 'CAB' : 'CMP', l1 = w1 === 'CAB' ? 'CMP' : 'CAB';
  const tie2 = j.sf2[0] === j.sf2[1];
  const w2 = !tie2 ? (j.sf2[0] > j.sf2[1] ? 'ONI' : 'MOT') : (j.pen2 || null), l2 = w2 ? (w2 === 'ONI' ? 'MOT' : 'ONI') : null;
  const sc = (k, i, team) => `<span class="sc" role="group" aria-label="Gols ${T[team].n}"><button data-act="score" data-k="${k}" data-i="${i}" data-v="-1" aria-label="Menos um gol">${ic('minus', 16, 2.2)}</button><b>${j[k][i]}</b><button data-act="score" data-k="${k}" data-i="${i}" data-v="1" aria-label="Mais um gol">${ic('plus', 16, 2.2)}</button></span>`;
  const game = (k, a, b, h, saved) => `<div class="game"><div class="w"><b>${h}</b>Campo 1</div>
    <div><div class="gl"><span class="tm r">${T[a].n}${cr(a, 24)}</span>${sc(k, 0, a)}<span class="x">×</span>${sc(k, 1, b)}<span class="tm">${cr(b, 24)}${T[b].n}</span></div>
    ${k === 'sf2' && tie2 ? `<div class="pen" style="margin-top:12px;justify-content:center">Empate. Quem venceu nos pênaltis? ${wseg([T.ONI.n, T.MOT.n], j.pen2, 'pen', ['ONI', 'MOT'])}</div>` : ''}</div>
    <div>${saved ? `<span class="saved">${ic('check', 16, 2.4)}Salvo</span>` : wb('Salvar', `data-act="save-game" data-v="${k}"`, 'pri', 'check')}</div></div>`;
  const slot = (c, lbl) => c ? `<span class="tm">${cr(c, 20)}${T[c].n}</span>` : `<span class="tbd">${lbl}</span>`;
  return `
  ${campHead('fut', 'jogos', wb('Ver classificação', 'data-act="camp-tab" data-c="fut" data-v="class"', 'sec', 'podium'))}
  <div class="stack">
    <section class="panel"><h2>Semifinais</h2><p class="pd">Sábado, 15 mai</p>
      ${game('sf1', 'CAB', 'CMP', '10:00', j.saved1)}${game('sf2', 'ONI', 'MOT', '11:30', j.saved2)}
      ${S.flash === 'tie' ? '<p class="err" role="alert" style="margin:8px 0 0">Empate: escolha quem venceu nos pênaltis antes de salvar.</p>' : ''}</section>
    <section class="panel"><h2 style="margin-bottom:12px">Sábado, 22 mai</h2>
      <div class="nx"><span class="w">Final · 10:00</span>${slot(j.saved1 ? w1 : null, 'Vencedor da semi 1')}<span class="x" style="color:var(--ink-3)">×</span>${slot(j.saved2 && w2 ? w2 : null, 'Vencedor da semi 2')}</div>
      <div class="nx"><span class="w">3º lugar · 08:30</span>${slot(j.saved1 ? l1 : null, 'Perdedor da semi 1')}<span class="x" style="color:var(--ink-3)">×</span>${slot(j.saved2 && l2 ? l2 : null, 'Perdedor da semi 2')}</div></section>
  </div>`;
};

/* ---------- Classificação ---------- */
WEB['web-ranking'] = () => {
  S.wr = S.wr || 0;
  const rows = RANK_PLAYERS.map(([n, p]) => ({ n, p, t: p.reduce((a, x) => a + ptsFor(x), 0), e: p.filter(Boolean).length })).sort((a, b) => b.t - a.t);
  const pos = i => i < 3 ? medal(12, ['gold', 'silver', 'bronze'][i], '#003057', '#C8F04A') : `<span class="mut num">${i + 1}</span>`;
  return `
  ${whead(['Gestão'], 'Classificação', wb(flash('pub', 'Publicar no app', 'Publicado no app'), 'data-act="publish-rank"', S.flash === 'pub' ? 'sec' : 'pri', S.flash === 'pub' ? 'check' : 'upload'))}
  <div class="cpick" role="tablist" aria-label="Campeonato">${[['tru', 'tru', 'Ranking de Truco 2027', '3 de 10 etapas'], ['fut', 'fut', 'Copa Futebol Society 2027', 'Semifinais'], ['vol', 'vol', 'Vôlei Misto 2027', 'Inscrições abertas']].map(([k, m, t, s]) => `<button role="tab" aria-selected="${S.rc === k}" class="${S.rc === k ? 'on' : ''}" data-act="rc" data-v="${k}">${BALL[m](28)}<span><b>${t}</b><small>${s}</small></span></button>`).join('')}</div>
  ${S.rc === 'fut' ? classFut() : S.rc === 'vol' ? classVol() : `<div class="wtabs" role="tablist">${['Ranking do ano', 'Etapa 3', 'Pontos por colocação'].map((t, i) => `<button role="tab" aria-selected="${S.wr === i}" class="${S.wr === i ? 'on' : ''}" data-act="wr" data-v="${i}">${t}</button>`).join('')}</div>
  ${S.wr === 0 ? `<p class="wnote">3 de 10 etapas · pontos por pessoa</p>
    <section class="panel"><div class="tscroll"><table class="wt"><thead><tr><th scope="col" style="width:40px">#</th><th scope="col">Associado</th><th scope="col" class="n">Etapa 1</th><th scope="col" class="n">Etapa 2</th><th scope="col" class="n">Etapa 3</th><th scope="col" class="n">Etapas jogadas</th><th scope="col" class="n">Total</th></tr></thead><tbody>
    ${rows.map((r, i) => `<tr><td>${pos(i)}</td><td><span class="pcell">${face(r.n, 28)}${r.n}</span></td>${r.p.map(x => `<td class="n">${x ? `${ptsFor(x)} <small style="display:inline">(${x}º)</small>` : '<span class="mut">–</span>'}</td>`).join('')}<td class="n">${r.e}</td><td class="n" style="font-weight:600">${r.t}</td></tr>`).join('')}</tbody></table></div></section>`
  : S.wr === 1 ? `
    <section class="panel"><div class="tscroll"><table class="wt"><thead><tr><th scope="col" style="width:40px">#</th><th scope="col">Dupla</th><th scope="col">Como chegou à posição</th><th scope="col" class="n">Pontos por atleta</th></tr></thead><tbody>
    ${ETAPA3.map(r => `<tr><td>${pos(r.pos - 1)}</td><td><span class="pcell">${duo(r.d.a, r.d.b, 24)}${r.d.n.replace('&', 'e')}</span></td><td class="mut">${r.how}</td><td class="n" style="font-weight:600">${ptsFor(r.pos)}</td></tr>`).join('')}</tbody></table></div></section>`
  : `<p class="wnote">[VALORES REAIS DA PLANILHA DA ASSOCIAÇÃO]</p>
    <section class="panel"><div class="ptsgrid">${S.pts.map((p, i) => `<label><span>${i + 1}º lugar</span><input type="number" min="0" value="${p}" data-input="pts" data-i="${i}"></label>`).join('')}</div>
    <p class="wnote" style="margin:16px 0 0">17º em diante: 2 pontos. Líder: <b style="color:var(--ink)">${rows[0].n}</b>, com <b style="color:var(--ink)" class="num">${rows[0].t}</b> pontos.</p></section>`}`}`;
};

/* ---------- Associados ---------- */
WEB['web-associados'] = () => {
  const q = S.assocQ.toLowerCase();
  const list = ASSOC.map((a, i) => [a, i]).filter(([a]) => !q || a[0].toLowerCase().includes(q) || a[1].toLowerCase().includes(q));
  const pend = S.assocOk.filter(x => !x).length;
  return `
  ${whead(['Cadastros'], 'Associados', wb('Exportar para conferência', 'data-act="export"', 'sec', 'doc'))}
  <div class="slim"><div><b>1.248</b>cadastrados</div><div class="${pend ? 'hl' : ''}"><b>${pend}</b>aguardando conferência</div><div><b>100%</b>aceitaram os termos</div></div>
  <section class="panel">
    <div class="tools"><label class="wsearch" style="max-width:320px">${ic('search', 18)}<input placeholder="Nome ou matrícula" value="${S.assocQ}" data-input="assoc" aria-label="Buscar associado"></label></div>
    <table class="wt"><thead><tr><th scope="col">Nome</th><th scope="col">Matrícula</th><th scope="col">Prédio e departamento</th><th scope="col" class="n">Idade</th><th scope="col">Gênero</th><th scope="col">Cadastro</th><th scope="col">Conferido</th></tr></thead>
    <tbody>${list.length ? list.map(([a, i]) => `<tr class="click" data-act="assoc-open" data-v="${a[0]}"><td><span class="pcell">${a[0] === ME.nome && S.photo ? meAv(28) : face(a[0], 28)}<b class="lnkt">${a[0]}</b></span></td><td class="num">${a[1]}</td><td>${a[2]}</td><td class="n">${a[3]}</td><td>${a[4] === 'F' ? 'Feminino' : 'Masculino'}</td><td class="mut">${a[5]}</td><td><button class="cbx ${S.assocOk[i] ? 'on' : ''}" data-act="assoc-ok" data-v="${i}" role="checkbox" aria-checked="${S.assocOk[i]}" aria-label="Matrícula de ${a[0]} conferida">${S.assocOk[i] ? ic('check', 14, 2.6) : ''}</button></td></tr>`).join('') : '<tr><td colspan="7" class="mut" style="padding:24px 0">Nenhum associado com esse nome ou matrícula.</td></tr>'}</tbody></table></section>`;
};

function webFrame(id) {
  return `<div class="browser"><div class="bbar"><i></i><i></i><i></i><div class="url">painel · campeonatos da associação</div></div>
  <header class="wtop">${lockup()}<div class="gsw"><label class="wsearch">${ic('search', 18)}<input placeholder="Buscar campeonato, equipe ou associado" aria-label="Buscar" value="${S.gq}" data-input="gq" autocomplete="off"><kbd>⌘K</kbd></label>${gResults()}</div><div class="wuser">${face('Equipe da associação', 32)}<div>Equipe da associação<small>Administrador</small></div></div></header>
  <div class="wapp"><nav class="side" aria-label="Menu do painel">${NAV_WEB.map(([gname, items]) => `<div class="g">${gname}</div>${items.map(([k, l, s]) => `<button class="${s === (NAV_OWNER[id] || id) ? 'on' : ''}" ${go(s)} ${s === (NAV_OWNER[id] || id) ? 'aria-current="page"' : ''}>${ic(k, 20)}<span>${l}</span></button>`).join('')}`).join('')}</nav>
  <main class="wmain" data-scroll>${WEB[id]()}</main></div>${notifyModal()}<div class="wtoast" id="toast-web" role="status"></div></div>`;
}

/* =========================================================
   CAMPEONATO: cabeçalho, abas e classificação por campeonato
   ========================================================= */
const ST_LBL = { run: 'Em andamento', open: 'Inscrições abertas', done: 'Encerrado' };
const chipSt = st => `<span class="chip chip-${st}">${ST_LBL[st]}</span>`;
const campSteps = c => `<ol class="csteps">${c.steps.map((s, i) => `<li class="${i < c.at ? 'ok' : i === c.at ? 'now' : ''}"><span>${i < c.at ? ic('check', 12, 3) : i + 1}</span>${s}</li>`).join('')}</ol>`;
function campHead(id, tab, acts = '') {
  const c = CAMPS[id]; S.wc = id;
  return `${crumb(['Campeonatos', c.n])}
  <div class="chead"><span class="cball">${BALL[c.mod](44)}</span><div class="cm"><div class="ct"><h1>${c.n}</h1>${chipSt(c.st)}</div><span>${c.info} · ${c.fase}</span></div><div class="acts">${acts}</div></div>
  <div class="wtabs ctabs" role="tablist">${c.tabs.map(([k, t]) => `<button role="tab" aria-selected="${tab === k}" class="${tab === k ? 'on' : ''}" data-act="camp-tab" data-c="${id}" data-v="${k}">${t}</button>`).join('')}</div>`;
}
const gTable = (k, rows, small) => `<section class="panel"><h2 style="margin-bottom:12px">Grupo ${k}</h2><table class="wt ${small ? 'sm' : ''}"><thead><tr><th scope="col" style="width:28px">#</th><th scope="col">Equipe</th><th class="n" scope="col">J</th><th class="n" scope="col">V</th><th class="n" scope="col">E</th><th class="n" scope="col">D</th><th class="n" scope="col">SG</th><th class="n" scope="col">Pts</th></tr></thead><tbody>
  ${rows.map((r, i) => `<tr class="${i < 2 ? 'qual' : ''}"><td class="num">${i + 1}</td><td><span class="pcell">${cr(r[0], 22)}${T[r[0]].n}</span></td><td class="n">${r[1]}</td><td class="n">${r[2]}</td><td class="n">${r[3]}</td><td class="n">${r[4]}</td><td class="n">${r[5] > 0 ? '+' : ''}${r[5]}</td><td class="n" style="font-weight:600">${r[6]}</td></tr>`).join('')}</tbody></table>
  <p class="wleg"><i></i>Classificadas para a semifinal</p></section>`;
function bracketFut() {
  const j = S.jogos, sc = (k, i) => `<span class="sc sm" role="group" aria-label="Gols"><button data-act="score" data-k="${k}" data-i="${i}" data-v="-1" aria-label="Menos um gol">${ic('minus', 14, 2.2)}</button><b>${j[k][i]}</b><button data-act="score" data-k="${k}" data-i="${i}" data-v="1" aria-label="Mais um gol">${ic('plus', 14, 2.2)}</button></span>`;
  const win = (k, a, b) => { const s = j[k]; return s[0] > s[1] ? a : s[1] > s[0] ? b : j.pen2; };
  const both = j.saved1 && j.saved2, w1 = j.saved1 ? win('sf1', 'CAB', 'CMP') : null, w2 = j.saved2 ? win('sf2', 'ONI', 'MOT') : null;
  const l1 = w1 ? (w1 === 'CAB' ? 'CMP' : 'CAB') : null, l2 = w2 ? (w2 === 'ONI' ? 'MOT' : 'ONI') : null;
  const side = (k, a, b, saved, h) => {
    const s = j[k], tie = s[0] === s[1];
    if (saved) { const wn = win(k, a, b); return `<div class="bm"><span class="bw">Semifinal · 15 mai · ${h}<span class="bok">${ic('check', 12, 3)}Lançado</span></span>${[[a, 0], [b, 1]].map(([c, i]) => `<div class="bt ${wn === c ? 'win' : ''}">${cr(c, 20)}<span>${T[c].n}${tie && wn === c ? ' <small>nos pênaltis</small>' : ''}</span><b class="num">${s[i]}</b></div>`).join('')}</div>`; }
    return `<div class="bm edit"><span class="bw">Semifinal · 15 mai · ${h}<span class="bpend">Aguardando resultado</span></span>${[[a, 0], [b, 1]].map(([c, i]) => `<div class="bt">${cr(c, 20)}<span>${T[c].n}</span>${sc(k, i)}</div>`).join('')}
    ${tie ? `<div class="bpen"><span>Empate. Quem venceu nos pênaltis?</span>${[a, b].map(c => `<button class="pill ${j.pen2 === c ? 'on' : ''}" data-act="pen" data-v="${c}">${T[c].n}</button>`).join('')}</div>` : ''}
    ${S.flash === 'tie' ? '<p class="err" style="margin:0 12px 8px">Escolha quem venceu nos pênaltis.</p>' : ''}
    <div class="bsave"><button class="b b-pri b-sm" data-act="save-game" data-v="${k}" data-brk="1">${ic('check', 16, 2.4)}Salvar resultado</button></div></div>`;
  };
  const tm = c => c ? `<div class="bt">${cr(c, 20)}<span>${T[c].n}</span></div>` : '<div class="bt tbd"><span>A definir</span></div>';
  const fin = (t, h, a, b) => `<div class="bm"><span class="bw">${t} · 22 mai · ${h}</span>${tm(a)}${tm(b)}</div>`;
  return `<section class="panel"><div class="phd"><h2>Mata-mata</h2>${both ? wb(flash('pub', 'Publicar no app', 'Publicado no app'), 'data-act="publish-rank"', S.flash === 'pub' ? 'sec' : 'pri', S.flash === 'pub' ? 'check' : 'upload') : ''}</div>
  ${S.brkMsg ? `<div class="bnote">${ic('check', 18, 2.4)}<span><b>Resultado salvo e chave atualizada.</b> ${both ? `Final: ${T[w1].n} × ${T[w2].n}. Disputa de 3º: ${T[l1].n} × ${T[l2].n}. Confira e publique no app.` : 'A final se completa quando a outra semifinal for lançada.'}</span></div>` : ''}
  <div class="brk"><div class="bcol">${side('sf1', 'CAB', 'CMP', j.saved1, '10:00')}${side('sf2', 'ONI', 'MOT', j.saved2, '11:30')}</div><div class="bcol bc2">${fin('Final', '10:00', w1, w2)}${fin('3º lugar', '08:30', l1, l2)}</div></div></section>`;
}
const classFut = () => `<div class="g2">${gTable('A', FUT_GROUPS.A)}${gTable('B', FUT_GROUPS.B)}</div>${bracketFut()}`;
function classVol() {
  return `<section class="panel empty-st">${ic('clock', 28, 1.6)}<div><h2>A classificação começa com o primeiro jogo</h2><p class="pd" style="margin:4px 0 0">Inscrições até 28 mai. Rodízio a partir de 05 jun. Enquanto isso, o resultado da edição passada.</p></div></section>
  <section class="panel"><h2 style="margin-bottom:12px">Vôlei Misto 2026 · resultado final</h2><table class="wt"><thead><tr><th scope="col" style="width:40px">#</th><th scope="col">Equipe</th><th class="n" scope="col">Vitórias</th><th class="n" scope="col">Derrotas</th><th class="n" scope="col">Sets vencidos</th></tr></thead><tbody>
  ${VOL_2026.map((r, i) => `<tr><td>${i < 3 ? medal(12, ['gold', 'silver', 'bronze'][i], '#003057', '#C8F04A') : `<span class="mut num">${i + 1}</span>`}</td><td><span class="pcell">${cr(r[0], 22)}${T[r[0]].n}</span></td><td class="n" style="font-weight:600">${r[1]}</td><td class="n">${r[2]}</td><td class="n">${r[3]}</td></tr>`).join('')}</tbody></table></section>`;
}
const rankRows = () => RANK_PLAYERS.map(([n, p]) => ({ n, p, t: p.reduce((a, x) => a + ptsFor(x), 0), e: p.filter(Boolean).length })).sort((a, b) => b.t - a.t);
const medalPos = i => i < 3 ? medal(12, ['gold', 'silver', 'bronze'][i], '#003057', '#C8F04A') : `<span class="mut num">${i + 1}</span>`;
function classTru3() {
  return `<section class="panel"><div class="tscroll"><table class="wt"><thead><tr><th scope="col" style="width:40px">#</th><th scope="col">Dupla</th><th scope="col">Como chegou à posição</th><th scope="col" class="n">Pontos por atleta</th></tr></thead><tbody>
  ${ETAPA3.map(r => `<tr><td>${medalPos(r.pos - 1)}</td><td><span class="pcell">${duo(r.d.a, r.d.b, 24)}${r.d.n.replace('&', 'e')}</span></td><td class="mut">${r.how}</td><td class="n" style="font-weight:600">${ptsFor(r.pos)}</td></tr>`).join('')}</tbody></table></div></section>`;
}
function classTru4() {
  const rows = rankRows();
  return `<section class="panel empty-st">${ic('bracket', 28, 1.6)}<div><h2>A classificação da etapa sai depois das chaves</h2><p class="pd" style="margin:4px 0 0">Os jogos da Etapa 4 começam em 21 mai. Abaixo, como está o ranking do ano antes desta etapa.</p></div></section>
  <section class="panel"><div class="phd"><h2>Ranking de Truco 2027 · top 10</h2>${wb('Ver ranking completo', 'data-act="rc-go" data-v="tru"', 'sec', 'podium')}</div><table class="wt"><thead><tr><th scope="col" style="width:40px">#</th><th scope="col">Associado</th><th class="n" scope="col">Etapas</th><th class="n" scope="col">Pontos</th></tr></thead><tbody>
  ${rows.slice(0, 10).map((r, i) => `<tr><td>${medalPos(i)}</td><td><span class="pcell">${face(r.n, 28)}${r.n}</span></td><td class="n">${r.e}/3</td><td class="n" style="font-weight:600">${r.t}</td></tr>`).join('')}</tbody></table></section>`;
}
function teamsTable(id) {
  const fut = id === 'fut';
  const list = fut ? ['CAB', 'MOT', 'LOG', 'QUA', 'ONI', 'CMP', 'ENG', 'TI'].map((c, i) => [c, 7, ['20 mar', '21 mar', '21 mar', '22 mar', '22 mar', '24 mar', '25 mar', '26 mar'][i]]) : VOL_TEAMS;
  const full = fut ? 7 : 10, min = fut ? 7 : 6, inc = list.filter(r => r[1] < min).length;
  return `${fut ? '' : `<div class="slim"><div><b>${list.length}</b>equipes</div><div><b>${list.reduce((a, r) => a + r[1], 0)}</b>atletas</div><div class="${inc ? 'hl' : ''}"><b>${inc}</b>abaixo do mínimo</div><div><b>28 mai</b>fim das inscrições</div></div>`}
  <section class="panel"><table class="wt"><thead><tr><th scope="col">Equipe</th><th scope="col">Capitão</th><th scope="col">Atletas</th><th scope="col">Situação</th><th scope="col">Inscrita em</th></tr></thead><tbody>
  ${list.map(([c, n, dt]) => { const cap = (ROSTER[c] || ['Rafael Souza'])[0]; return `<tr><td><span class="pcell">${cr(c, 24)}<b style="font-weight:600">${T[c].n}</b></span></td><td><button class="pcell lnkp" data-act="assoc-open" data-v="${cap}">${cap === ME.nome ? meAv(26) : face(cap, 26)}${cap}</button></td><td><span class="mbar"><i style="width:${n / full * 100}%"></i></span><span class="num">${n}/${full}</span></td><td>${n >= min ? '<span class="st-ok">Completa</span>' : `<span class="st-warn">Faltam ${min - n}</span> ${S.notified[c] ? `<small class="mut">· avisado</small>` : `<button class="lnk" data-act="notify" data-v="${c}">Avisar</button>`}`}</td><td class="mut">${dt}</td></tr>`; }).join('')}</tbody></table></section>`;
}

/* ---------- Resumo de cada campeonato ---------- */
function resumo(id) {
  const kp = arr => `<div class="kpis">${arr.map(([v, l, s]) => `<div class="kpi"><b class="num">${v}</b><span>${l}</span>${s ? `<small>${s}</small>` : ''}</div>`).join('')}</div>`;
  const prog = `<section class="panel"><h2 style="margin-bottom:16px">Andamento</h2>${campSteps(CAMPS[id])}</section>`;
  if (id === 'fut') {
    const gols = FUT_GAMES.reduce((a, g) => a + g[1] + g[3], 0), j = S.jogos, played = 12 + (j.saved1 ? 1 : 0) + (j.saved2 ? 1 : 0);
    const lead = [...FUT_GROUPS.A, ...FUT_GROUPS.B].sort((a, b) => b[6] - a[6] || b[5] - a[5]).slice(0, 4);
    return `${prog}${kp([['8', 'equipes', '56 atletas'], [`${played}/16`, 'jogos disputados'], [gols, 'gols', `${(gols / 12).toFixed(1).replace('.', ',')} por jogo`], ['22 mai', 'final']])}
    <div class="cols">
      <section class="panel"><div class="phd"><h2>Quem está na frente</h2>${wb('Classificação completa', 'data-act="camp-tab" data-c="fut" data-v="class"', 'sec', 'podium')}</div>
        <table class="wt"><thead><tr><th scope="col" style="width:40px">#</th><th scope="col">Equipe</th><th class="n" scope="col">Pts</th><th class="n" scope="col">SG</th><th scope="col">Situação</th></tr></thead><tbody>
        ${lead.map((r, i) => `<tr><td>${medalPos(i)}</td><td><span class="pcell">${cr(r[0], 22)}${T[r[0]].n}</span></td><td class="n" style="font-weight:600">${r[6]}</td><td class="n">${r[5] > 0 ? '+' : ''}${r[5]}</td><td class="mut">Na semifinal</td></tr>`).join('')}</tbody></table></section>
      <section class="panel"><h2 style="margin-bottom:4px">Próximos jogos</h2>
        ${[['sf1', 'CAB', 'CMP', '10:00', j.saved1], ['sf2', 'ONI', 'MOT', '11:30', j.saved2]].map(([k, a, b, h, sv]) => `<div class="todo"><div class="m"><b>${T[a].n} × ${T[b].n}</b><span>Semifinal · sáb, 15 mai · ${h} · Campo 1</span></div>${sv ? `<span class="saved">${ic('check', 16, 2.4)}${S.jogos[k][0]} × ${S.jogos[k][1]}</span>` : wb('Lançar', 'data-act="camp-tab" data-c="fut" data-v="jogos"', 'sec', 'score')}</div>`).join('')}
        <div class="todo"><div class="m"><b>Final e 3º lugar</b><span>Sáb, 22 mai · 08:30 e 10:00 · Campo 1</span></div></div>
        <h2 style="margin:20px 0 4px">Últimos resultados</h2>
        ${FUT_GAMES.slice(-4).reverse().map(([a, x, b, y, dt]) => `<div class="todo"><div class="m"><b>${T[a].n} ${x} × ${y} ${T[b].n}</b><span>Grupo ${FUT_GROUPS.A.some(r => r[0] === a) ? 'A' : 'B'} · ${dt}</span></div></div>`).join('')}</section>
    </div>`;
  }
  if (id === 'tru4') {
    const rows = rankRows();
    return `${prog}${kp([['28', 'duplas inscritas', '56 atletas'], ['2 dias', 'para fechar', '12 mai'], ['4', 'grupos previstos', '7 duplas cada'], ['21 mai', 'jogos', 'Salão de jogos']])}
    <div class="cols">
      <section class="panel"><div class="phd"><h2>Ranking do ano antes desta etapa</h2>${wb('Ver ranking', 'data-act="camp-tab" data-c="tru4" data-v="class"', 'sec', 'podium')}</div>
        <table class="wt"><tbody>${rows.slice(0, 5).map((r, i) => `<tr><td style="width:40px">${medalPos(i)}</td><td><span class="pcell">${face(r.n, 28)}${r.n}</span></td><td class="n" style="font-weight:600">${r.t} pts</td></tr>`).join('')}</tbody></table></section>
      <section class="panel"><h2 style="margin-bottom:4px">Próximos passos</h2>
        <div class="todo"><div class="m"><b>Conferir inscrições</b><span>28 duplas · 2 inscritas hoje</span></div>${wb('Abrir', 'data-act="camp-tab" data-c="tru4" data-v="insc"', 'sec', 'inbox')}</div>
        <div class="todo"><div class="m"><b>Montar os grupos</b><span>Depois de 12 mai</span></div>${wb('Montar', 'data-act="camp-tab" data-c="tru4" data-v="grupos"', 'sec', 'groups')}</div>
        <div class="todo"><div class="m"><b>Definir a disputa e gerar a tabela</b><span>Eliminatória dupla nas chaves</span></div>${wb('Definir', 'data-act="camp-tab" data-c="tru4" data-v="disputa"', 'sec', 'sliders')}</div></section>
    </div>`;
  }
  if (id === 'vol') {
    const inc = VOL_TEAMS.filter(r => r[1] < 6);
    return `${prog}${kp([['9', 'equipes inscritas', '63 atletas'], [inc.length, 'abaixo do mínimo', '6 atletas'], ['9 dias', 'para fechar', '28 mai'], ['05 jun', 'primeiro jogo', 'Ginásio']])}
    <div class="cols">
      <section class="panel"><div class="phd"><h2>Equipes que precisam de atenção</h2>${wb('Todas as equipes', 'data-act="camp-tab" data-c="vol" data-v="equipes"', 'sec', 'users')}</div>
        ${inc.map(([c, n]) => `<div class="todo"><span class="pcell">${cr(c, 28)}</span><div class="m"><b>${T[c].n}</b><span>${n} de 6 atletas · capitão ${ROSTER[c][0]}</span></div>${S.notified[c] ? `<span class="saved">${ic('check', 16, 2.4)}Capitão avisado</span>` : wb('Avisar capitão', `data-act="notify" data-v="${c}"`, 'sec', 'bell')}</div>`).join('')}</section>
      <section class="panel"><h2 style="margin-bottom:12px">Campeã de 2026</h2><div class="champ">${cr('ENG', 56)}<div><b>Engenharia</b><span>8 vitórias · 16 sets</span></div></div>
        <div style="margin-top:16px">${wb('Ver classificação de 2026', 'data-act="camp-tab" data-c="vol" data-v="class"', 'sec', 'podium')}</div></section>
    </div>`;
  }
  const top = ETAPA3.slice(0, 3);
  return `${prog}${kp([['28', 'duplas'], ['54', 'jogos'], ['23 abr', 'encerrada'], ['30', 'pontos para os campeões']])}
  <section class="panel"><div class="phd"><h2>Pódio</h2>${wb('Classificação completa', 'data-act="camp-tab" data-c="tru3" data-v="class"', 'sec', 'podium')}</div>
  <div class="wpod">${top.map((r, i) => `<div class="wp wp-${i}">${medal(18, ['gold', 'silver', 'bronze'][i], '#003057', '#C8F04A')}${duo(r.d.a, r.d.b, 40)}<b>${r.d.n.replace('&', 'e')}</b><span>${r.how} · ${ptsFor(r.pos)} pts cada</span></div>`).join('')}</div></section>`;
}

WEB['web-camp'] = () => {
  const id = S.wc, c = CAMPS[id], t = S.wct;
  const acts = id === 'fut' ? wb('Lançar resultados', 'data-act="camp-tab" data-c="fut" data-v="jogos"', 'pri', 'score') : id === 'tru4' ? wb('Ver inscrições', 'data-act="camp-tab" data-c="tru4" data-v="insc"', 'pri', 'inbox') : id === 'vol' ? wb(flash('link', 'Copiar link de inscrição', 'Link copiado'), 'data-act="copy-link"', 'sec', 'link') : '';
  const body = t === 'hist' ? timeline(id) : t === 'class' ? (id === 'fut' ? classFut() : id === 'vol' ? classVol() : id === 'tru4' ? classTru4() : classTru3()) : t === 'equipes' ? teamsTable(id) : resumo(id);
  return campHead(id, t, acts) + body;
};

/* ---------- Lista de campeonatos ---------- */
WEB['web-campeonatos'] = () => {
  const f = S.cf, ids = Object.keys(CAMPS).filter(k => f === 'all' || CAMPS[k].st === f);
  const lead = { fut: `${cr('ONI', 20)}<span>Ônibus</span>`, tru4: `${face('Fernanda Alves', 20)}<span>Fernanda</span>`, vol: '<span class="mut">Ainda sem jogos</span>', tru3: `${duo('Fernanda Alves', 'Marcos Teixeira', 20)}<span>Fernanda e Marcos</span>` };
  const next = { fut: 'Semifinais 15 mai', tru4: 'Fecha 12 mai', vol: 'Fecha 28 mai', tru3: '<span class="mut">–</span>' };
  const pct = id => Math.round(CAMPS[id].at / CAMPS[id].steps.length * 100);
  return `${whead(['Gestão'], 'Campeonatos', wb('Novo campeonato', go('web-novo'), 'pri', 'plus'))}
  <div class="tools" style="margin-bottom:16px">${wseg(['Todos', 'Em andamento', 'Inscrições abertas', 'Encerrados'], f, 'cf', ['all', 'run', 'open', 'done'])}</div>
  <section class="panel" style="padding:8px 24px"><table class="wt clist"><thead><tr><th scope="col">Campeonato</th><th scope="col">Situação</th><th scope="col">Andamento</th><th scope="col">Inscritos</th><th scope="col">Quem lidera</th><th scope="col">Próximo passo</th><th scope="col"><span class="sr">Abrir</span></th></tr></thead><tbody>
  ${ids.map(id => { const c = CAMPS[id]; return `<tr class="click" data-act="camp-open" data-v="${id}"><td>${modCell(c.mod, c.n, c.info.split(' · ')[0])}</td><td>${chipSt(c.st)}</td><td><span class="mbar"><i style="width:${pct(id)}%"></i></span><small style="display:block">${c.st === 'done' ? 'Concluído' : c.steps[c.at]}</small></td><td class="num">${c.ins}</td><td><span class="pcell">${lead[id]}</span></td><td>${next[id]}</td><td class="n">${ic('chev', 18, 2)}</td></tr>`; }).join('') || '<tr><td colspan="7" class="mut" style="padding:24px 0">Nenhum campeonato nesse filtro.</td></tr>'}
  </tbody></table></section>`;
};

/* ---------- Visão geral (nova) ---------- */
WEB['web-painel'] = () => {
  const j = S.jogos, pend = S.assocOk.filter(x => !x).length;
  return `${whead(['Gestão'], 'Visão geral', wb('Novo campeonato', go('web-novo'), 'pri', 'plus'))}
  <section class="banner"><span class="hph" style="background-image:url(${DIMG.stadium})"></span>
    <span class="c">Temporada 2027</span>
    <h2>Semifinais da Copa Futebol Society neste sábado</h2>
    <p>Cabines FC × Compras às 10:00 e Ônibus × Motores United às 11:30, no Campo 1.</p>
    <div class="stats"><div><b>1.248</b>associados cadastrados</div><div><b>3</b>campeonatos ativos</div><div><b>6</b>jogos nesta semana</div></div>
  </section>
  <div class="ccards">${['fut', 'tru4', 'vol'].map(id => { const c = CAMPS[id]; return `<button class="ccard" data-act="camp-open" data-v="${id}"><div class="cc-h">${BALL[c.mod](32)}${chipSt(c.st)}</div><b>${c.n}</b><span class="mut">${c.fase}</span>${campSteps(c)}
    <div class="cc-f">${id === 'fut' ? `${cr('ONI', 20)}<span>Lidera: <b>Ônibus</b>, 9 pts</span>` : id === 'tru4' ? `${face('Fernanda Alves', 20)}<span>Líder do ano: <b>Fernanda</b>, 81 pts</span>` : `${ic('users', 18, 1.8)}<span><b>9</b> equipes · 2 abaixo do mínimo</span>`}</div></button>`; }).join('')}</div>
  <div class="cols">
    <section class="panel"><h2 style="margin-bottom:4px">Esta semana</h2>
      ${[['15', 'mai', 'Sáb · 10:00', 'Cabines FC × Compras', 'Semifinal · Copa Futebol', j.saved1], ['15', 'mai', 'Sáb · 11:30', 'Ônibus × Motores United', 'Semifinal · Copa Futebol', j.saved2]].map(([d, m, h, t, s, sv]) => `<div class="todo"><span class="dt sm"><b class="num">${d}</b><span>${m}</span></span><div class="m"><b>${t}</b><span>${h} · ${s} · Campo 1</span></div>${sv ? `<span class="saved">${ic('check', 16, 2.4)}Lançado</span>` : wb('Lançar resultado', 'data-act="camp-tab" data-c="fut" data-v="jogos"', 'sec', 'score')}</div>`).join('')}
      <div class="todo"><span class="dt sm"><b class="num">12</b><span>mai</span></span><div class="m"><b>Fecham as inscrições do truco</b><span>Etapa 4 · 28 duplas</span></div>${wb('Ver', 'data-act="camp-tab" data-c="tru4" data-v="insc"', 'sec', 'inbox')}</div></section>
    <section class="panel"><h2 style="margin-bottom:4px">Para fazer</h2>
      <div class="todo"><div class="m"><b>Montar grupos do truco</b><span>Etapa 4 · depois de 12 mai</span></div>${wb('Montar', 'data-act="camp-tab" data-c="tru4" data-v="grupos"', 'sec', 'groups')}</div>
      <div class="todo"><div class="m"><b>Avisar 2 equipes do vôlei</b><span>Abaixo do mínimo de 6 atletas</span></div>${wb('Ver', 'data-act="camp-tab" data-c="vol" data-v="resumo"', 'sec', 'users')}</div>
      <div class="todo"><div class="m"><b>Conferir matrículas</b><span><span class="num">${pend}</span> cadastros novos aguardando</span></div>${wb('Conferir', go('web-associados'), 'sec', 'idcard')}</div>
    </section>
  </div>`;
};


/* ---------- Busca global ---------- */
function gResults() {
  const q = S.gq.trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  if (q.length < 2) return '';
  const nm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const camps = Object.keys(CAMPS).filter(k => nm(CAMPS[k].n).includes(q) || nm(MOD[CAMPS[k].mod] ? MOD[CAMPS[k].mod].n || '' : '').includes(q));
  const teams = Object.keys(T).filter(c => nm(T[c].n).includes(q)).slice(0, 4);
  const ppl = ALL_PEOPLE.filter(n => nm(n).includes(q) || person(n).mat.toLowerCase().includes(q)).slice(0, 5);
  const it = (attrs, lead, t, s) => `<button class="gr" ${attrs}>${lead}<span><b>${t}</b><small>${s}</small></span></button>`;
  const body = (camps.length ? `<div class="gh">Campeonatos</div>${camps.map(k => it(`data-act="camp-open" data-v="${k}"`, BALL[CAMPS[k].mod](24), CAMPS[k].n, ST_LBL[CAMPS[k].st] + ' · ' + CAMPS[k].fase)).join('')}` : '')
    + (teams.length ? `<div class="gh">Equipes</div>${teams.map(c => { const inF = ['CAB', 'MOT', 'LOG', 'QUA', 'ONI', 'CMP', 'ENG', 'TI'].includes(c); return it(`data-act="camp-tab" data-c="${inF ? 'fut' : 'vol'}" data-v="equipes"`, cr(c, 24), T[c].n, inF ? 'Copa Futebol e Vôlei Misto' : 'Vôlei Misto 2027'); }).join('')}` : '')
    + (ppl.length ? `<div class="gh">Associados</div>${ppl.map(n => { const p = person(n); return it(`data-act="assoc-open" data-v="${n}"`, n === ME.nome ? meAv(24) : face(n, 24), n, p.mat + ' · ' + p.dep); }).join('')}` : '');
  return `<div class="gres" role="listbox">${body || `<p class="gnone">Nada encontrado para “${S.gq}”.</p>`}</div>`;
}

/* ---------- Avisar capitão ---------- */
function notifyModal() {
  const c = S.notify; if (!c) return '';
  const cap = ROSTER[c][0], n = (VOL_TEAMS.find(r => r[0] === c) || [0, 0])[1], falta = Math.max(0, 6 - n);
  const msg = `Oi, ${cap.split(' ')[0]}! A ${T[c].n} está com ${n} atletas no Vôlei Misto 2027 e o mínimo é 6. Faltam ${falta}. As inscrições fecham em 28 mai. Dá para chamar mais gente pelo link de convite no app.`;
  const ch = (v, l) => `<button class="${S.nch === v ? 'on' : ''}" data-act="nch" data-v="${v}" role="radio" aria-checked="${S.nch === v}">${l}</button>`;
  return `<div class="wmodal" role="dialog" aria-modal="true" aria-labelledby="nm-t"><div class="wm-box">
    <div class="wm-h"><h2 id="nm-t">Avisar capitão</h2><button class="wm-x" data-act="notify-close" aria-label="Fechar">${ic('x', 20, 2)}</button></div>
    <div class="wm-to">${face(cap, 40)}<div><b>${cap}</b><span>Capitão da ${T[c].n} · ${person(cap).email}</span></div></div>
    <div class="wm-l">Enviar por</div><div class="wseg wm-seg" role="radiogroup">${ch('app', 'Notificação no app')}${ch('wa', 'WhatsApp')}${ch('ambos', 'Os dois')}</div>
    <div class="wm-l">Mensagem</div><textarea class="wm-msg" rows="5" aria-label="Mensagem">${msg}</textarea>
    <div class="wm-f">${wb('Cancelar', 'data-act="notify-close"', 'sec', 'x')}${wb('Enviar aviso', `data-act="notify-send" data-v="${c}"`, 'pri', 'send')}</div>
  </div></div>`;
}

/* ---------- Linha do tempo do campeonato ---------- */
function timeline(id) {
  const A = 'Equipe da associação';
  const ev = {
    fut: [...(S.jogos.saved2 ? [['agora', A, 'lançou o resultado', `Ônibus ${S.jogos.sf2[0]} × ${S.jogos.sf2[1]} Motores United${S.jogos.sf2[0] === S.jogos.sf2[1] ? ' (pênaltis)' : ''}`, 'score']] : []),
      ['15 mai · 11:42', A, 'lançou o resultado', `Cabines FC ${S.jogos.sf1[0]} × ${S.jogos.sf1[1]} Compras`, 'score'], ['10 mai', A, 'publicou a classificação dos grupos', 'Cabines FC e Ônibus em 1º', 'upload'],
      ['09 mai · 18:10', A, 'lançou 2 resultados', 'Ônibus 4 × 0 TI · Compras 3 × 1 Engenharia', 'score'], ['08 mai', A, 'lançou 2 resultados', 'Cabines FC 3 × 1 Motores · Logística 2 × 0 Qualidade', 'score'],
      ['14 abr', A, 'gerou a tabela', '2 grupos de 4 · semifinal cruzada', 'sliders'], ['12 abr', A, 'montou os grupos', 'Sorteio automático', 'groups'], ['26 mar', 'TI Esporte Clube', 'inscreveu a equipe', '7 atletas', 'userPlus'], ['20 mar', 'Rafael Souza', 'inscreveu a Cabines FC', '7 atletas', 'userPlus'], ['15 mar', A, 'criou o campeonato', 'Copa Futebol Society 2027', 'plus']],
    tru4: [['hoje · 09:12', 'Larissa Melo', 'inscreveu a dupla', 'com Sabrina Franco', 'userPlus'], ['hoje · 08:40', 'Nádia Barros', 'inscreveu a dupla', 'com Otávio Reis', 'userPlus'], ['02 mai', A, 'abriu as inscrições', 'Link enviado no grupo da associação', 'link'], ['30 abr', A, 'criou a etapa', 'Truco · Etapa 4 de 10', 'plus']],
    vol: [...Object.keys(S.notified).map(c => ['agora', A, 'avisou o capitão', `${T[c].n} · ${ROSTER[c][0]}`, 'bell']), ['08 mai', 'Tiago Moreira', 'inscreveu o Ônibus', '4 atletas', 'userPlus'], ['07 mai', 'Bruno Costa', 'inscreveu a Motores United', '5 atletas', 'userPlus'], ['02 mai', 'Henrique Sales', 'inscreveu a Engenharia', '10 atletas', 'userPlus'], ['01 mai', A, 'abriu as inscrições', 'Equipes de 6 a 10 atletas', 'link'], ['28 abr', A, 'criou o campeonato', 'Vôlei Misto 2027', 'plus']],
    tru3: [['23 abr · 22:05', A, 'publicou a classificação', 'Fernanda e Marcos campeões · ranking do ano atualizado', 'upload'], ['23 abr', A, 'lançou 54 resultados', 'Grupos, chaves e final', 'score'], ['16 abr', A, 'montou 4 grupos', '7 duplas cada', 'groups'], ['02 abr', A, 'abriu as inscrições', '28 duplas inscritas', 'link']]
  }[id];
  return `<section class="panel"><h2 style="margin-bottom:16px">Histórico</h2><ol class="tl">${ev.map(([t, who, act, det, icn]) => `<li><span class="tl-i">${ic(icn, 16, 2)}</span><div class="tl-m"><div>${who === A ? '' : face(who, 22)}<b>${who}</b> ${act}</div><span>${det}</span></div><time>${t}</time></li>`).join('')}</ol></section>`;
}

/* ---------- Associado ---------- */
WEB['web-associado'] = () => {
  const n = S.assocView, p = person(n), idx = ASSOC.findIndex(a => a[0] === n);
  const rk = rankRows(), ri = rk.findIndex(r => r.n === n), r = rk[ri];
  const dupla = DUPLAS.find(d => d.a === n || d.b === n), partner = dupla ? (dupla.a === n ? dupla.b : dupla.a) : null;
  const rp = (RANK_PLAYERS.find(x => x[0] === n) || [0, []])[1];
  const futT = ['CAB', 'MOT', 'LOG', 'QUA', 'ONI', 'CMP', 'ENG', 'TI'].find(c => ROSTER[c].includes(n));
  const volT = VOL_TEAMS.map(v => v[0]).find(c => ROSTER[c] && ROSTER[c].includes(n));
  const camps = [];
  if (dupla) camps.push([BALL.tru(24), 'Ranking de Truco 2027', `Dupla com ${partner}`, r ? `${ri + 1}º no ano · ${r.t} pts` : 'Ainda sem pontos', 'tru4']);
  if (futT) { const pos = [...FUT_GROUPS.A, ...FUT_GROUPS.B].findIndex(x => x[0] === futT); camps.push([BALL.fut(24), 'Copa Futebol Society 2027', `${T[futT].n}${ROSTER[futT][0] === n ? ' · capitão' : ''}`, ['CAB', 'ONI', 'MOT', 'CMP'].includes(futT) ? 'Na semifinal' : 'Eliminada nos grupos', 'fut']); }
  if (volT) camps.push([BALL.vol(24), 'Vôlei Misto 2027', `${T[volT].n}${ROSTER[volT][0] === n ? ' · capitão' : ''}`, 'Inscrita', 'vol']);
  const best = rp.filter(Boolean).length ? Math.min(...rp.filter(Boolean)) : null;
  return `${crumb(['Cadastros', 'Associados', n])}
  <div class="chead">${n === ME.nome && S.photo ? meAv(64) : face(n, 64)}<div class="cm"><div class="ct"><h1>${n}</h1>${idx < 0 || S.assocOk[idx] ? '<span class="chip chip-done">Conferido</span>' : '<span class="chip chip-open">Aguardando conferência</span>'}</div><span>${p.mat} · ${p.dep}</span></div>
  <div class="acts">${idx >= 0 && !S.assocOk[idx] ? wb('Marcar como conferido', `data-act="assoc-ok" data-v="${idx}"`, 'pri', 'check') : ''}${wb('Voltar', 'data-back', 'sec', 'arrowL')}</div></div>
  <div class="kpis">${[[camps.length, 'campeonatos em 2027'], [r ? `${ri + 1}º` : '–', 'no ranking de truco', r ? `${r.t} pts` : ''], [best ? `${best}º` : '–', 'melhor colocação numa etapa'], [rp.filter(Boolean).length + (futT ? 3 : 0), 'participações', 'etapas e jogos']].map(([v, l, s]) => `<div class="kpi"><b class="num">${v}</b><span>${l}</span>${s ? `<small>${s}</small>` : ''}</div>`).join('')}</div>
  <div class="cols">
    <section class="panel"><h2 style="margin-bottom:8px">Campeonatos</h2>
      ${camps.length ? camps.map(([b, t, s, st, id]) => `<div class="todo">${b}<div class="m"><b>${t}</b><span>${s}</span></div><span class="mut" style="font-size:14px">${st}</span>${wb('Abrir', `data-act="camp-open" data-v="${id}"`, 'sec', 'chev')}</div>`).join('') : '<p class="pd">Ainda não está em nenhum campeonato.</p>'}
      ${rp.length ? `<h2 style="margin:20px 0 8px">Truco · etapa a etapa</h2><table class="wt"><thead><tr><th scope="col">Etapa</th><th scope="col">Colocação</th><th class="n" scope="col">Pontos</th></tr></thead><tbody>${rp.map((x, i) => `<tr><td>Etapa ${i + 1}</td><td>${x ? `${x}º` : '<span class="mut">Não jogou</span>'}</td><td class="n" style="font-weight:600">${x ? ptsFor(x) : 0}</td></tr>`).join('')}</tbody></table>` : ''}
    </section>
    <section class="panel"><h2 style="margin-bottom:8px">Cadastro</h2>
      ${[['E-mail', p.email], ['Matrícula', p.mat], ['Prédio e departamento', p.dep], ['Idade', p.age + ' anos'], ['Gênero', p.g === 'F' ? 'Feminino' : 'Masculino'], ['Cadastrado em', p.since]].map(([k, v]) => `<div class="kvw"><span>${k}</span><b>${v}</b></div>`).join('')}
    </section>
  </div>`;
};
