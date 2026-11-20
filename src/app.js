/* =========================================================
   APP DO ASSOCIADO — convenções iOS, listas agrupadas
   ========================================================= */
const go = id => `data-go="${id}"`;
const ic = (k, s = 20, sw = 1.75) => g(k, s, sw);
const lockup = (light = false) => `<div class="lock2 ${light ? 'l' : ''}"><img src="${light ? LOGO_W : LOGO}" alt="Associação Volvo"><span class="lk-t">Campeonatos<br>e Torneios</span></div>`;
const navbar = (title, right = '') => `<header class="nb"><button class="nb-b" data-back aria-label="Voltar">${ic('chevL', 26, 2)}</button><span class="nb-t">${title}</span>${right || '<span></span>'}</header>`;
const sh = t => `<h2 class="sh">${t}</h2>`;
const grp = s => `<div class="grp">${s}</div>`;
const chevron = `<span class="chev">${ic('chev', 18, 2)}</span>`;
function row({ lead = '', t, s = '', tr = '', to, act = '', tag }) {
  const el = to || act ? 'button' : 'div';
  return `<${el} class="r ${lead ? 'has-lead' : ''}" ${to ? go(to) : ''} ${act}>${lead ? `<span class="r-l">${lead}</span>` : ''}<span class="r-m"><span class="r-t">${t}</span>${s ? `<span class="r-s">${s}</span>` : ''}</span>${tr ? `<span class="r-tr">${tr}</span>` : ''}${to ? chevron : ''}</${el}>`;
}
const kv = (k, v) => `<div class="r kv"><span class="r-m"><span class="r-t">${k}</span></span><span class="r-tr">${v}</span></div>`;
const btn = (t, attrs = '', v = 'pri', icon = '') => `<button class="b b-${v}" ${attrs}>${icon ? ic(icon, 20, 2) : ''}${t}</button>`;
const seg = (items, cur, act, vals) => `<div class="seg" role="tablist">${items.map((t, i) => { const v = vals ? vals[i] : i; return `<button role="tab" aria-selected="${cur === v}" class="${cur === v ? 'on' : ''}" data-act="${act}" data-v="${v}">${t}</button>`; }).join('')}</div>`;
const avatar = (ini, s = 36) => `<span class="av" style="width:${s}px;height:${s}px;font-size:${Math.round(s * .38)}px">${ini}</span>`;
const face = (n, s = 36) => FACE[n] ? `<span class="av ph" style="width:${s}px;height:${s}px;background-image:url(${FACE[n]})" role="img" aria-label="${n}"></span>` : avatar(n.split(' ').map(x => x[0]).join('').slice(0, 2).toUpperCase(), s);
const duo = (a, b, s = 28) => `<span class="duo" style="--o:-${Math.round(s * .3)}px">${face(a, s)}${face(b, s)}</span>`;
const meAv = (s = 36) => S.photo ? `<span class="av ph" style="width:${s}px;height:${s}px;background-image:url(${S.photo})" role="img" aria-label="Sua foto"></span>` : avatar('RS', s);
const photoPick = (s, cls = '') => `<label class="phpick ${cls}" aria-label="${S.photo ? 'Trocar foto de perfil' : 'Adicionar foto de perfil'}">${S.photo ? meAv(s) : `<span class="av" style="width:${s}px;height:${s}px">${ic('user', Math.round(s * .42), 1.6)}</span>`}<span class="cam">${ic('camera', 16, 2)}</span><input type="file" accept="image/*" data-photo hidden></label>`;
const fl = (label, val, attrs = '', help = '') => `<label class="fl"><span>${label}</span><input value="${val}" ${attrs}>${help ? `<span class="help">${help}</span>` : ''}</label>`;
const sel = (label, val) => `<label class="fl"><span>${label}</span><span class="sel">${val}${ic('down', 18, 2)}</span></label>`;
const flash = (key, normal, done) => S.flash === key ? done : normal;

function teamAbbr(n) {
  const w = n.trim().split(/\s+/).filter(Boolean); if (!w.length) return 'EQP';
  let a = w.map(x => x[0]).join('');
  if (a.length < 3) a += w[w.length - 1].slice(1, 1 + 3 - a.length);
  return a.slice(0, 3).toUpperCase();
}
function myCrest(s, o = {}) {
  const t = S.team; T.USR = { n: t.name, sh: t.shape, p: t.pat, c: PALS[t.pal] };
  if (t.photo) return `<span class="photo" style="width:${s}px;height:${Math.round(s * 1.12)}px">${ic('camera', Math.round(s * .3))}Foto</span>`;
  return crest('USR', s, Object.assign({ flat: true, label: teamAbbr(t.name) }, o));
}
const cr = (c, s) => crestMono(c, s);

const NAV_APP = [['field', 'Início', 'app-inicio'], ['trophy', 'Campeonatos', 'app-campeonatos'], ['cal', 'Jogos', 'app-jogos'], ['podium', 'Ranking', 'app-ranking'], ['user', 'Perfil', 'app-perfil']];
const navApp = on => `<nav class="tabbar" aria-label="Navegação principal">${NAV_APP.map(([k, l, id], i) => `<button class="${i === on ? 'on' : ''}" ${go(id)} ${i === on ? 'aria-current="page"' : ''}>${ic(k, 24, 1.75)}<span>${l}</span></button>`).join('')}</nav>`;
const pendingCount = () => (S.invite === 'pending' ? 1 : 0) + (S.created && S.roster.length < 6 ? 1 : 0);


/* ---------- senha forte ---------- */
const PW_RULES = [['len', 'Mínimo de 8 caracteres', p => p.length >= 8], ['up', 'Uma letra maiúscula', p => /[A-Z]/.test(p)], ['low', 'Uma letra minúscula', p => /[a-z]/.test(p)], ['num', 'Um número', p => /\d/.test(p)], ['sym', 'Um caractere especial (! @ # $ %)', p => /[^A-Za-z0-9]/.test(p)]];
const pwScore = p => PW_RULES.filter(r => r[2](p)).length;
const PW_LV = ['', 'Muito fraca', 'Fraca', 'Média', 'Forte', 'Muito forte'];
function pwBlock() {
  const p = S.pw, n = pwScore(p), m = S.pw2 ? S.pw === S.pw2 : null;
  return `<label class="fl"><span>Crie uma senha</span><span class="pwf"><input type="${S.pwShow ? 'text' : 'password'}" value="${p}" data-input="pw" autocomplete="new-password" aria-describedby="pwr"><button type="button" class="eye" data-act="pw-show" aria-label="${S.pwShow ? 'Ocultar senha' : 'Mostrar senha'}">${ic(S.pwShow ? 'x' : 'eye', 20, 1.8)}</button></span></label>
  <div class="pwm" aria-live="polite"><div class="bars">${[0, 1, 2, 3, 4].map(i => `<i class="${i < n ? 'on lv' + n : ''}"></i>`).join('')}</div><span>${p ? 'Segurança: ' + PW_LV[n] : 'Digite uma senha'}</span></div>
  <ul class="pwr" id="pwr">${PW_RULES.map(r => `<li class="${r[2](p) ? 'ok' : ''}">${ic(r[2](p) ? 'check' : 'minus', 16, 2.4)}${r[1]}</li>`).join('')}</ul>
  <label class="fl"><span>Confirme a senha</span><input type="${S.pwShow ? 'text' : 'password'}" value="${S.pw2}" data-input="pw2" autocomplete="new-password"></label>
  ${m === null ? '' : `<p class="${m ? 'okm' : 'err'}" style="margin:-8px 0 16px">${m ? 'As senhas são iguais' : 'As senhas não conferem'}</p>`}`;
}

const WA_LOGO = '<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path fill="#25D366" d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.05 21.5h-.01a9.4 9.4 0 0 1-4.79-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.38 9.38 0 0 1-1.44-5.01c0-5.19 4.23-9.42 9.43-9.42 2.52 0 4.88.98 6.66 2.76a9.36 9.36 0 0 1 2.76 6.67c0 5.2-4.23 9.42-9.43 9.42zm8.02-17.44A11.27 11.27 0 0 0 12.05.75C5.8.75.72 5.83.72 12.08c0 2 .52 3.95 1.52 5.66L.62 23.25l5.64-1.48a11.3 11.3 0 0 0 5.79 1.47h.01c6.25 0 11.33-5.08 11.33-11.33 0-3.03-1.18-5.87-3.32-8.01z"/></svg>';
const APP = {};


/* ---------- Entrar ---------- */
APP['app-login'] = () => ({
  h: `
  <div class="top" style="height:72px">${lockup()}</div>
  <h1 class="lt" style="margin-top:16px">Entrar</h1>
  ${fl('E-mail', S.loginEmail, 'type="email" data-input="login-email" autocomplete="email"')}
  <label class="fl"><span>Senha</span><span class="pwf"><input type="${S.pwShow ? 'text' : 'password'}" value="${S.loginPw}" data-input="login-pw" autocomplete="current-password"><button type="button" class="eye" data-act="pw-show" aria-label="${S.pwShow ? 'Ocultar senha' : 'Mostrar senha'}">${ic(S.pwShow ? 'x' : 'eye', 20, 1.8)}</button></span></label>
  ${S.loginErr ? `<p class="err" role="alert" style="margin:-8px 0 12px">${S.loginErr}</p>` : ''}
  <button class="b b-txt" ${go('app-esqueci')}>${ic('shield', 20, 2)}Esqueci minha senha</button>`,
  ab: btn('Entrar', 'data-act="login"', 'pri', 'arrowR') + btn('Criar conta', go('app-cadastro'), 'sec', 'userPlus')
});
APP['app-esqueci'] = () => S.forgotSent ? ({
  h: `${navbar('Recuperar senha')}
  <h1 class="lt md" style="margin-top:16px">Link enviado</h1>
  <p class="para">Enviamos para <b style="color:var(--ink)">${S.forgotEmail}</b> um link para criar uma nova senha. Ele vale por 30 minutos. Confira também a caixa de spam.</p>`,
  ab: btn('Voltar ao login', 'data-act="forgot-back"', 'pri', 'arrowL') + btn('Reenviar link', 'data-act="forgot-send"', 'sec', 'upload')
}) : ({
  h: `${navbar('Recuperar senha')}
  <h1 class="lt md" style="margin-top:16px">Esqueci minha senha</h1>
  <p class="para">Informe o e-mail cadastrado para receber um link de nova senha.</p>
  ${fl('E-mail', S.forgotEmail, 'type="email" data-input="forgot-email" autocomplete="email"')}
  ${S.forgotErr ? '<p class="err" role="alert" style="margin:-8px 0 12px">Digite um e-mail válido.</p>' : ''}`,
  ab: btn('Enviar link', 'data-act="forgot-send"', 'pri', 'link')
});

/* ---------- Cadastro ---------- */
APP['app-cadastro'] = () => ({
  h: `
  <div class="top">${lockup()}</div>
  <h1 class="lt" style="margin-top:12px">Criar conta</h1>
  <div class="phrow">${photoPick(72)}<div><b>Foto de perfil</b><span>Opcional</span></div></div>
  ${fl('Nome completo', ME.nome, 'autocomplete="name"')}
  <div class="two">${fl('Matrícula', ME.mat)}${fl('Nascimento', ME.nasc, 'inputmode="numeric"')}</div>
  ${fl('E-mail · será o seu login', ME.email, 'type="email"')}
  ${fl('Telefone', ME.tel, 'inputmode="tel"')}
  <div class="fl"><span>Gênero</span>${seg(['Feminino', 'Masculino', 'Outro'], S.cad.gen, 'gen')}</div>
  <div class="two">${sel('Prédio', ME.predio)}${sel('Departamento', 'Cabines')}</div>
  ${pwBlock()}
  <button class="check ${S.cad.terms ? 'on' : ''}" data-act="terms" role="checkbox" aria-checked="${S.cad.terms}"><span class="bx">${S.cad.terms ? ic('check', 16, 2.6) : ''}</span><span>Li e aceito os <u>termos de uso</u> e a <u>política de privacidade</u>. Meus dados ficam só com a associação.</span></button>
  ${S.cad.err ? (pwScore(S.pw) < 5 ? '<p class="err" role="alert">A senha precisa cumprir todos os requisitos.</p>' : S.pw !== S.pw2 ? '<p class="err" role="alert">As senhas não conferem.</p>' : !S.cad.terms ? '<p class="err" role="alert">Aceite os termos para criar a conta.</p>' : '') : ''}`,
  ab: btn('Criar conta', 'data-act="criar-conta"', 'pri', 'userPlus')
});

/* ---------- Início ---------- */
APP['app-inicio'] = () => {
  const n = pendingCount();
  const pend = [
    S.invite === 'pending' ? row({ lead: face('Carla Mendes'), t: 'Convite de Carla Mendes', s: 'Dupla no truco · Etapa 4 · responda até 12 mai', to: 'app-convite' }) : '',
    S.created && S.roster.length < 6 ? row({ lead: myCrest(28), t: S.team.name, s: `Vôlei Misto · ${S.roster.length} de 6 atletas`, to: 'app-equipe' }) : '',
  ].join('');
  return {
    nav: 0, h: `
  <div class="top">${lockup()}<button class="ib" ${go('app-convite')} aria-label="Notificações${n ? `, ${n} pendente${n > 1 ? 's' : ''}` : ''}">${ic('bell', 24)}${n ? `<span class="cnt">${n}</span>` : ''}</button></div>
  <h1 class="lt">Início</h1>
  <button class="feat" ${go('app-tabela')}>
    <span class="hph" style="background-image:url(${DIMG.ball})"></span>
    <span class="c">Próximo jogo</span>
    <span class="t">Semifinal da Copa Futebol Society</span>
    <span class="match">${cr('CAB', 26)}Cabines FC<span class="x">×</span>${cr('CMP', 26)}Compras</span>
    <span class="m">Sáb, 15 mai · 10:00 · Campo 1 · <b>em 5 dias</b></span>
  </button>
  ${sh('Precisa da sua atenção')}
  ${pend ? grp(pend) : grp('<p class="empty">Nada pendente. Convites e documentos que precisarem de resposta aparecem aqui.</p>')}
  ${sh('Inscrições abertas')}
  ${grp(row({ lead: volley(34), t: 'Vôlei Misto 2027', s: 'Até 28 mai · 9 equipes inscritas', to: 'app-camp-volei' }) + row({ lead: cards(36), t: 'Truco · Etapa 4', s: 'Até 12 mai · 26 duplas inscritas', to: 'app-convite' }))}
  ${navApp(0)}` };
};

/* ---------- Campeonatos ---------- */
APP['app-campeonatos'] = () => {
  const L = [
    [['vol', 'Vôlei Misto 2027', 'Inscrições até 28 mai · 9 equipes', 'app-camp-volei'], ['tru', 'Truco · Etapa 4', 'Inscrições até 12 mai · 26 duplas', 'app-convite']],
    [['fut', 'Copa Futebol Society', 'Semifinais · você joga pela Cabines FC', 'app-tabela'], ['tru', 'Ranking de Truco 2027', '3 de 10 etapas · você está em 17º', 'app-ranking']],
    [['tru', 'Truco · Etapa 3', 'Encerrado em 23 abr · campeã: Fernanda e Marcos', 'app-ranking'], ['fut', 'Copa Futebol 2026', 'Encerrado · campeão: Ônibus', 'app-ranking']]
  ][S.campTab];
  return {
    nav: 1, h: `
  <h1 class="lt" style="margin-top:16px">Campeonatos</h1>
  ${seg(['Abertos', 'Em andamento', 'Encerrados'], S.campTab, 'campTab')}
  <div style="height:16px"></div>
  ${grp(L.map(([k, t, s, id]) => row({ lead: BALL[k](34), t, s, to: id })).join(''))}
  ${navApp(1)}` };
};

/* ---------- Detalhe do campeonato ---------- */
APP['app-camp-volei'] = () => ({
  h: `
  ${navbar('', `<button class="nb-b" data-act="share-camp" aria-label="Compartilhar link do campeonato">${ic('share', 22)}</button>`)}
  <section class="hero"><span class="hph" style="background-image:url(${DIMG.volley})"></span>
    <span class="c">Inscrições abertas até 28 mai</span>
    <h1>Vôlei Misto 2027</h1>
    <p>Equipes mistas de 6 a 10 atletas.</p></section>
  ${sh('Informações')}
  ${grp(kv('Inscrições', 'até 28 mai') + kv('Jogos', '5 a 26 jun') + kv('Local', 'Ginásio') + kv('Formato', 'Grupos e finais'))}
  ${sh('9 equipes inscritas')}
  ${grp(`<div class="crests">${['LOG', 'ENG', 'QUA', 'TI', 'ONI', 'CMP', 'MOT'].map(c => cr(c, 26)).join('')}<span class="more">+2</span></div>`)}
  ${sh('Como funciona')}
  ${grp(row({ t: 'O capitão inscreve e convida os atletas' }) + row({ t: 'Grupos definidos depois do prazo' }))}`,
  ab: btn('Participar', go('app-participar'), 'pri', 'users')
});


/* ---------- Capitão ou atleta ---------- */
APP['app-participar'] = () => {
  if (S.roleDone && S.role === 'atl') return {
    h: `${navbar('Inscrição')}
    <h1 class="lt md" style="margin-top:16px">Você entra pela equipe</h1>
    <p class="para">O capitão adiciona você pelo nome, matrícula ou e-mail, ou manda o link de convite. Quando ele adicionar, você recebe uma notificação.</p>
    ${grp(kv('Seu e-mail', ME.email) + kv('Sua matrícula', ME.mat))}`,
    ab: btn(flash('mydata', 'Copiar meus dados', 'Dados copiados'), 'data-act="copy-mydata"', 'pri', S.flash === 'mydata' ? 'check' : 'copy') + btn('Voltar ao início', go('app-inicio'), 'sec', 'field')
  };
  const opt = (v, icon, t, s) => `<button class="r opt-r ${S.role === v ? 'on' : ''}" data-act="role" data-v="${v}" role="radio" aria-checked="${S.role === v}"><span class="r-l">${ic(icon, 26, 1.75)}</span><span class="r-m"><span class="r-t" style="font-weight:600">${t}</span><span class="r-s">${s}</span></span><span class="radio"></span></button>`;
  return {
    h: `${navbar('Inscrição')}
    <p class="cap" style="margin:8px 4px 4px">Vôlei Misto 2027</p>
    <h1 class="lt md">Como você vai participar?</h1>
    ${grp(opt('cap', 'shield', 'Sou o capitão da equipe', 'Inscrevo a equipe e escolho os atletas') + opt('atl', 'user', 'Sou atleta', 'O capitão me adiciona ou me manda o link'))}`,
    ab: `<button class="b b-pri" data-act="role-go" ${S.role ? '' : 'disabled'}>${ic('arrowR', 20, 2)}Continuar</button>`
  };
};

/* ---------- Inscrição feita ---------- */
APP['app-confirmada'] = () => {
  const n = S.roster.length, falta = Math.max(0, TEAM_MIN - n);
  return {
    h: `<div style="height:40px"></div>
    <div class="okhero"><span class="okc">${myCrest(76)}<span class="okb">${ic('check', 18, 3)}</span></span></div>
    <h1 class="lt md" style="text-align:center;margin:20px 0 8px">Equipe inscrita</h1>
    <p class="para" style="text-align:center">${S.team.name} está no Vôlei Misto 2027.</p>
    ${grp(kv('Atletas', `<span class="num">${n} de ${TEAM_MAX}</span>`) + kv('Situação', falta ? `<span class="st-warn">Faltam ${falta} para o mínimo</span>` : '<span class="st-ok">Completa</span>') + kv('Inscrições até', '28 mai'))}`,
    ab: btn('Convidar mais atletas', go('app-equipe'), 'pri', 'userPlus') + btn('Ir para o início', 'data-act="go-home"', 'sec', 'field')
  };
};

/* ---------- Inscrever equipe ---------- */
APP['app-inscrever'] = () => {
  const t = S.team;
  return {
    h: `
  ${navbar('Nova equipe', '<span class="nb-b cap">1 de 2</span>')}
  <p class="cap" style="margin:8px 4px 4px">Vôlei Misto 2027</p>
  <h1 class="lt">Sua equipe</h1>
  ${fl('Nome da equipe', t.name, 'id="teamName" data-input="team-name" maxlength="22"')}
  <div class="fl" style="margin-bottom:8px"><span>Escudo</span></div>
  ${grp(`<div class="pad" style="padding-bottom:4px">${seg([ic('shield', 16, 2) + 'Gerar escudo', ic('camera', 16, 2) + 'Enviar foto'], t.photo ? 1 : 0, 'photo')}</div>
    <div class="esc"><div class="pv">${myCrest(60)}</div><div style="flex:1">
    ${t.photo ? `<button class="b b-sec b-sm" data-act="photo" data-v="1">${ic('upload', 18)}Escolher imagem</button>` : `
      <p class="olab">Formato</p><div class="opt">${['shield', 'badge', 'round'].map(k => `<button class="o ${t.shape === k ? 'on' : ''}" data-act="shape" data-v="${k}" aria-label="Formato ${k}" aria-pressed="${t.shape === k}">${shapeGlyph(k, 16, t.shape === k ? '#003057' : 'rgba(14,26,43,.46)')}</button>`).join('')}</div>
      <p class="olab">Cores</p><div class="opt">${PALS.map((p, i) => `<button class="sw ${t.pal === i ? 'on' : ''}" style="background:linear-gradient(135deg,${p[0]} 50%,${p[1]} 50%);box-shadow:${t.pal === i ? '' : 'inset 0 0 0 1px rgba(14,26,43,.12)'}" data-act="pal" data-v="${i}" aria-label="Cores ${i + 1}" aria-pressed="${t.pal === i}"></button>`).join('')}</div>
      <p class="olab">Padrão</p><div class="opt">${['stripes', 'sash', 'hoops', 'split', 'chevron'].map(k => `<button class="o ${t.pat === k ? 'on' : ''}" data-act="pat" data-v="${k}" aria-pressed="${t.pat === k}">${patGlyph(k, 20, PALS[t.pal][0], PALS[t.pal][1], 4)}</button>`).join('')}</div>`}
    </div></div>`)}`,
    ab: btn('Criar equipe', 'data-act="create-team"', 'pri', 'shield')
  };
};

/* ---------- Minha equipe ---------- */
APP['app-equipe'] = () => {
  const t = S.team, q = S.search.toLowerCase();
  const people = PEOPLE.filter(p => !q || p[0].toLowerCase().includes(q) || p[1].toLowerCase().includes(q) || p[3].includes(q));
  const full = S.roster.length >= TEAM_MAX;
  const inRoster = n => S.roster.some(r => r[0] === n);
  const n = S.roster.length;
  const link = `campeonatos.associacao/c/${teamAbbr(t.name).toLowerCase()}-8F3K`;
  return {
    h: `
  ${navbar('Minha equipe')}
  <div class="hdr">${myCrest(52)}<div><h1>${t.name}</h1><p class="small">Vôlei Misto 2027</p></div></div>
  <div class="prog" role="progressbar" aria-valuenow="${n}" aria-valuemin="0" aria-valuemax="${TEAM_MAX}"><i style="width:${Math.min(100, n / TEAM_MAX * 100)}%"></i><b style="left:${TEAM_MIN / TEAM_MAX * 100}%"></b></div>
  <p class="small" style="margin-top:8px;display:flex;justify-content:space-between"><span><span class="num" style="color:var(--ink);font-weight:600">${n}/${TEAM_MAX}</span> atletas</span><span>mínimo ${TEAM_MIN}</span></p>
  ${sh('Convidar pelo link')}
  ${grp(`<div class="pad"><div class="linkf">${link}</div>
    <div class="two" style="margin-top:12px">${btn(flash('invite', 'Copiar link', 'Link copiado'), 'data-act="copy-invite"', 'tint', S.flash === 'invite' ? 'check' : 'copy')}<button class="b b-wa" data-act="share-invite">${WA_LOGO}WhatsApp</button></div></div>`)}
  ${sh('Adicionar quem já tem cadastro')}
  ${full ? '<p class="small" style="margin:0 16px 8px">A equipe chegou ao limite de ' + TEAM_MAX + ' atletas.</p>' : ''}${grp(`<label class="srch">${ic('search', 18)}<input placeholder="Nome, matrícula ou e-mail" value="${S.search}" data-input="search" aria-label="Buscar associado"></label>
    ${people.slice(0, 4).map(p => `<div class="r has-lead"><span class="r-l">${face(p[0])}</span><span class="r-m"><span class="r-t">${p[0]}</span><span class="r-s">${p[1]}</span></span>${inRoster(p[0]) ? `<span class="r-tr st-ok" style="display:flex;gap:4px;align-items:center">${ic('check', 16, 2.4)}Convite enviado</span>` : `<button class="b b-txt" data-act="add" data-v="${p[0]}" ${full ? 'disabled' : ''}>${ic('userPlus', 20, 2)}Adicionar</button>`}</div>`).join('') || `<div class="nocad">${ic('user', 22, 1.75)}<div><b>Ninguém com cadastro encontrado</b><span>Só quem tem cadastro pode ser adicionado. Envie o link: a pessoa se cadastra e já entra na equipe.</span><button class="b b-txt" data-act="copy-invite">${ic(S.flash === 'invite' ? 'check' : 'copy', 18, 2)}${flash('invite', 'Copiar link de convite', 'Link copiado')}</button></div></div>`}`)}
  ${sh('Elenco')}
  ${grp(S.roster.map(r => `<div class="r has-lead"><span class="r-l">${r[0] === ME.nome ? meAv() : face(r[0])}</span><span class="r-m"><span class="r-t">${r[0]}</span></span><span class="r-tr">${r[1] === 'Capitão' ? 'Capitão' : 'Aguardando confirmação'}</span></div>`).join(''))}`,
    ab: btn('Concluir', 'data-act="finish-team"', 'pri', 'check')
  };
};

/* ---------- Convite recebido ---------- */
APP['app-convite'] = () => {
  const info = grp(kv('Campeonato', 'Truco · Etapa 4') + kv('Data', 'Sex, 21 mai · 18:30') + kv('Local', 'Salão de jogos') + kv('Responder até', '12 mai'));
  if (S.invite === 'ok') return {
    h: `${navbar('Convite')}<div class="big3d">${cards(88)}</div>
    <div class="inviter">${duo('Carla Mendes', ME.nome, 44)}<div><b>Carla e Rafael</b><span>Dupla na Etapa 4</span></div></div>
    <h1 class="lt md">Você está na dupla com Carla Mendes</h1>${info}
`,
    ab: btn('Ver meus jogos', go('app-jogos'), 'pri', 'cal')
  };
  if (S.invite === 'no') return {
    h: `${navbar('Convite')}<h1 class="lt" style="margin-top:16px">Convite recusado</h1><p class="para">Você ainda pode jogar a Etapa 4 com outra dupla até 12 mai.</p>`,
    ab: btn('Ver campeonatos abertos', go('app-campeonatos'), 'pri', 'trophy')
  };
  return {
    h: `${navbar('Convite')}<div class="big3d">${cards(88)}</div>
    <div class="inviter">${face('Carla Mendes', 56)}<div><b>Carla Mendes</b><span>Prédio 3 · Logística</span></div></div>
    <h1 class="lt md">Carla Mendes convidou você para jogar a Etapa 4 do truco</h1>
    ${info}`,
    ab: btn('Aceitar convite', 'data-act="accept"', 'pri', 'check') + btn('Recusar', 'data-act="decline"', 'sec', 'x')
  };
};

/* ---------- Atestado ---------- */
APP['app-atestado'] = () => ({
  h: `
  ${navbar('Atestado médico')}
  ${S.atestado ? grp(row({ lead: ic('doc', 22), t: S.atestado, s: 'Enviado hoje' })) + `<label class="b b-sec" style="margin-top:12px">${ic('upload', 20, 2)}Trocar arquivo<input type="file" accept="application/pdf,image/*" data-file hidden></label>`
    : `<label class="b b-pri">${ic('upload', 20, 2)}Escolher arquivo<input type="file" accept="application/pdf,image/*" data-file hidden></label><p class="small" style="margin:8px 4px 0">PDF ou foto</p>
      <button class="b b-txt" style="margin-top:4px" data-act="sample-file">${ic('doc', 20, 2)}Usar um arquivo de exemplo</button>`}
  ${sh('Inscrições')}
  ${grp(row({ lead: soccer(30), t: 'Cabines FC', s: 'Copa Futebol Society', tr: S.atestado ? 'Enviado' : 'Não enviado' }) + (S.invite === 'ok' ? row({ lead: cards(32), t: 'Dupla com Carla Mendes', s: 'Truco · Etapa 4', tr: S.atestado ? 'Enviado' : 'Não enviado' }) : ''))}`
});

/* ---------- Meus jogos ---------- */
APP['app-jogos'] = () => {
  S.jt = S.jt || 0;
  const up = [
    ['15', 'mai', 'Sábado', '10:00', 'Semifinal · Futebol society', 'Cabines FC × Compras · Campo 1', 'app-tabela'],
    ['21', 'mai', 'Sexta', '18:30', 'Truco · Etapa 4', S.invite === 'ok' ? 'Dupla com Carla Mendes · Salão de jogos' : 'Convite pendente de Carla Mendes', 'app-convite'],
    ['22', 'mai', 'Sábado', '10:00', 'Final ou 3º lugar · Futebol', 'Adversário definido na semifinal · Campo 1', 'app-tabela']
  ];
  const res = [['08', 'mai', 'Grupo A · Futebol', 'Cabines 3 × 0 Qualidade', 'Vitória'], ['01', 'mai', 'Grupo A · Futebol', 'Cabines 1 × 1 Logística', 'Empate'], ['26', 'mar', 'Truco · Etapa 2', '11º lugar · 8 pontos', '11º']];
  const tile = (d, m, past) => `<span class="dt ${past ? 'past' : ''}"><b class="num">${d}</b><span>${m}</span></span>`;
  return {
    nav: 2, h: `
  <h1 class="lt" style="margin-top:16px">Jogos</h1>
  ${seg(['Próximos', 'Resultados'], S.jt, 'jt')}
  <div style="height:16px"></div>
  ${S.jt === 0 ? grp(up.map(([d, m, wd, h, t, s, to]) => `<button class="r ag" ${go(to)} aria-label="${wd}, ${d} ${m}, ${h}: ${t}">${tile(d, m)}<span class="r-m"><span class="ag-h num">${h} <small>${wd}</small></span><span class="ag-t">${t}</span><span class="r-s">${s}</span></span>${chevron}</button>`).join(''))
      : grp(res.map(([d, m, t, s, r]) => `<div class="r ag">${tile(d, m, true)}<span class="r-m"><span class="ag-t">${s}</span><span class="r-s">${t}</span></span><span class="r-tr">${r}</span></div>`).join(''))}
  ${navApp(2)}` };
};

/* ---------- Tabela e chave ---------- */
APP['app-tabela'] = () => {
  const grpT = (k, rows) => sh(`Grupo ${k} · os 2 primeiros avançam`) + grp(`<table class="tbl"><thead><tr><th scope="col"><span class="sr">Pos.</span></th><th scope="col">Equipe</th><th scope="col">J</th><th scope="col">V</th><th scope="col">E</th><th scope="col">D</th><th scope="col">SG</th><th scope="col">P</th></tr></thead><tbody>
    ${rows.map((r, i) => `<tr class="${i < 2 ? 'q' : ''} ${r[0] === 'CAB' ? 'me' : ''}"><td>${i + 1}</td><td><button class="tm tml" data-act="ver-time" data-v="${r[0]}">${cr(r[0], 16)}${T[r[0]].n}</button></td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td>${r[4]}</td><td>${r[5] > 0 ? '+' + r[5] : r[5]}</td><td>${r[6]}</td></tr>`).join('')}</tbody></table>`);
  const tm = c => `<button class="vt" data-act="ver-time" data-v="${c}" aria-label="Ver equipe ${T[c].n}">${cr(c, 40)}<span>${T[c].n}</span><small>Ver equipe</small></button>`;
  const tbd = t => `<div class="vt tbd"><span class="tq">?</span><span>${t}</span></div>`;
  const match = (d, m, wd, h, phase, a, b) => `<div class="mc"><div class="mc-h">${`<span class="dt"><b class="num">${d}</b><span>${m}</span></span>`}<span class="mc-i"><span class="ag-h num">${h} <small>${wd}</small></span><span class="ag-t">${phase}</span><span class="mc-l">${ic('pin', 16, 2)}${FUT_PLACE}</span></span></div><div class="mc-t">${a}<span class="vx">×</span>${b}</div></div>`;
  return {
    h: `
  ${navbar('Copa Futebol Society')}
  <div style="height:8px"></div>
  ${seg(['Grupos', 'Mata-mata'], S.tabelaTab, 'tabelaTab')}
  ${S.tabelaTab === 0 ? grpT('A', FUT_GROUPS.A) + grpT('B', FUT_GROUPS.B) : `
    ${sh('Semifinais')}${SEMIS.map(([x, y, h], i) => match('15', 'mai', 'Sábado', h, `Semifinal ${i + 1}`, tm(x), tm(y))).join('')}
    ${sh('Decisão')}${match('22', 'mai', 'Sábado', '08:30', 'Disputa de 3º lugar', tbd('Perdedor da semi 1'), tbd('Perdedor da semi 2'))}${match('22', 'mai', 'Sábado', '10:00', 'Final', tbd('Vencedor da semi 1'), tbd('Vencedor da semi 2'))}`}`
  };
};

/* ---------- Equipe (elenco e histórico) ---------- */
APP['app-time'] = () => {
  const c = S.timeView || 'CAB', t = T[c];
  const g = Object.entries(FUT_GROUPS).find(([, rows]) => rows.some(r => r[0] === c)), gi = g[1].findIndex(r => r[0] === c), st = g[1][gi];
  const games = FUT_GAMES.filter(x => x[0] === c || x[2] === c).map(([h, hg, v, vg, dt]) => { const home = h === c, gf = home ? hg : vg, ga = home ? vg : hg, op = home ? v : h; return { op, gf, ga, dt, r: gf > ga ? 'V' : gf === ga ? 'E' : 'D' }; });
  const semi = SEMIS.find(s => s.includes(c)), op = semi ? (semi[0] === c ? semi[1] : semi[0]) : null;
  const cell = (k, v) => `<div class="sc-c"><b class="num">${v}</b><span>${k}</span></div>`;
  return {
    h: `${navbar('Equipe')}
  <div class="th">${cr(c, 64)}<div><h1 class="lt md" style="margin:0">${t.n}</h1><span class="r-s">Grupo ${g[0]} · ${gi + 1}º lugar · capitão ${ROSTER[c][0].split(' ')[0]}</span></div></div>
  ${grp(`<div class="scg">${`<div class="sc-c sc-p"><b class="num">${st[6]}</b><span>Pontos</span></div>`}${cell('Jogos', st[1]) + cell('Vitórias', st[2]) + cell('Empates', st[3]) + cell('Derrotas', st[4]) + cell('Saldo', (st[5] > 0 ? '+' : '') + st[5])}</div>`)}
  ${semi ? sh('Próximo jogo') + grp(`<button class="r ag" data-back><span class="dt"><b class="num">15</b><span>mai</span></span><span class="r-m"><span class="ag-h num">${semi[2]} <small>Sábado</small></span><span class="ag-t">Semifinal contra ${T[op].n}</span><span class="r-s">${FUT_PLACE}</span></span></button>`) : ''}
  ${sh(`Elenco · ${ROSTER[c].length} atletas`)}
  ${grp(ROSTER[c].map((n, i) => `<div class="r has-lead"><span class="r-l">${n === ME.nome ? meAv() : face(n)}</span><span class="r-m"><span class="r-t">${n === ME.nome ? n + ' (você)' : n}</span></span><span class="r-tr">${i === 0 ? 'Capitão' : ''}</span></div>`).join(''))}
  ${sh('Campanha nesta copa')}
  ${grp(games.map(x => `<div class="r has-lead"><span class="res res-${x.r}">${x.r}</span><span class="r-m"><span class="r-t">${x.gf} × ${x.ga} ${T[x.op].n}</span><span class="r-s">Grupo ${g[0]} · ${x.dt}</span></span>${cr(x.op, 22)}</div>`).join(''))}
  ${TITLES[c] ? sh('Histórico') + grp(TITLES[c].map((x, i) => row({ lead: trophy(24, x.startsWith('Campeão') ? 'gold' : x.startsWith('Vice') ? 'silver' : 'bronze', x.startsWith('Campeão') ? 1 : x.startsWith('Vice') ? 2 : 3), t: x }) ).join('')) : ''}`
  };
};

/* ---------- Ranking ---------- */
const PODK = ['gold', 'silver', 'bronze'];
const PODI = ['crown', 'trophy', 'ribbon'];
/* pódio em palco: foto com luz de cima, anéis metálicos e bases de vidro */
function podium(items, label = '') {
  const H = [118, 86, 64];
  const col = i => { const it = items[i]; if (!it) return ''; const k = PODK[i];
    return `<div class="sg-c sg-${k}" role="listitem"><div class="sg-av"><span class="mring">${it.av}</span>${i === 0 ? `<span class="sg-crown">${ic('crown', 14, 2)}</span>` : ''}</div>
      <b class="sg-n">${it.short}</b>${it.pts ? `<span class="sg-pts"><b class="num">${it.pts[0]}</b><small>${it.pts[1]}</small></span>` : ''}${it.sub ? `<span class="sg-sub">${it.sub.replace('<br>', ' · ')}</span>` : ''}
      <div class="sg-base" style="height:${H[i]}px"><span class="num">${i + 1}</span></div></div>`; };
  return `<section class="stage" style="background-image:url(${DIMG.trophy})" aria-label="Pódio">${label ? `<p class="sg-l">${label}</p>` : ''}<div class="sg-row" role="list">${col(1)}${col(0)}${col(2)}</div></section>`;
}
const topCard = (i, name, stats, side = '') => `<div class="tc tc-${PODK[i]}"><span class="ti">${ic(PODI[i], 26, 1.8)}</span><span class="tm2"><b>${name}</b><span class="ts">${stats.map(([k, v]) => `<span>${ic(k, 16, 1.9)}${v}</span>`).join('')}</span></span>${side ? `<span class="tside">${side}</span>` : ''}</div>`;
const initials = n => n.split(' ').map(x => x[0]).join('').slice(0, 2).toUpperCase();
const ringAv = (txt, s = 64) => `<span class="rav" style="width:${s}px;height:${s}px;font-size:${Math.round(s * .32)}px">${txt}</span>`;

APP['app-ranking'] = () => {
  let body = '';
  if (S.rankMod === 'tru') {
    const rows = RANK_PLAYERS.map(([n, p, me]) => ({ n, p, me, t: p.reduce((a, x) => a + ptsFor(x), 0), e: p.filter(Boolean).length, best: Math.min(...p.filter(Boolean)) })).sort((a, b) => b.t - a.t);
    const mine = rows.findIndex(r => r.me);
    if (S.rankView === 0) {
      body = `<div style="height:12px"></div>${seg(['Ano', 'Etapa 3'], S.rankView, 'rankView')}
      ${podium(rows.slice(0, 3).map((r, i) => ({ av: r.n === ME.nome ? meAv(i ? 56 : 68) : face(r.n, i ? 56 : 68), short: r.n.split(' ')[0], pts: [r.t, 'pts'], sub: `${r.e}/3 etapas<br>melhor: ${r.best}º` })), '3 de 10 etapas · pontos por pessoa')}
      ${sh('Demais posições')}
      ${grp(rows.slice(3, 10).map((r, i) => `<div class="rk"><span class="p">${i + 4}</span>${face(r.n, 32)}<span class="n">${r.n}</span><span class="t">${r.t}</span></div>`).join(''))}
      ${sh('Sua posição')}
      ${grp(`<div class="rk me"><span class="p">${mine + 1}</span>${meAv(32)}<span class="n">Você<small>${rows[mine].e}/3 etapas · melhor: ${rows[mine].best}º</small></span><span class="t">${rows[mine].t}</span></div>`)}`;
    } else {
      const top = ETAPA3.slice(0, 3);
      body = `<div style="height:12px"></div>${seg(['Ano', 'Etapa 3'], S.rankView, 'rankView')}
      ${podium(top.map((r, i) => ({ av: duo(r.d.a, r.d.b, i ? 44 : 52), short: r.d.n.replace(' & ', ' e '), pts: [ptsFor(r.pos), 'pts cada'], sub: r.how })), 'Etapa 3 · 28 duplas · 23 abr')}
      ${sh('Demais posições')}
      ${grp(ETAPA3.slice(3, 10).map(r => `<div class="rk"><span class="p">${r.pos}</span>${duo(r.d.a, r.d.b, 26)}<span class="n">${r.d.n.replace('&', 'e')}<small>${r.how}</small></span><span class="t">${ptsFor(r.pos)}</span></div>`).join(''))}
      <p class="small" style="margin:12px 16px 0">Mais 18 duplas</p>`;
    }
  } else {
    const fut = S.rankMod === 'fut';
    const L = fut
      ? [['ONI', 9, 1, 0, 18], ['CAB', 7, 2, 1, 11], ['MOT', 6, 1, 3, 7], ['LOG', 5, 2, 3, 4], ['ENG', 4, 1, 5, -2], ['CMP', 3, 2, 5, -5], ['TI', 2, 1, 7, -12], ['QUA', 1, 0, 9, -21]]
      : [['ENG', 8, 0, 1, 16], ['LOG', 6, 0, 3, 13], ['QUA', 5, 0, 4, 11], ['CAB', 4, 0, 5, 9], ['TI', 3, 0, 6, 7], ['MOT', 2, 0, 7, 5], ['CMP', 1, 0, 8, 3]];
    const pts = r => fut ? r[1] * 3 + r[2] : r[1];
    const st = r => fut ? `${r[1]}V · ${r[2]}E · ${r[3]}D<br>${r[4] > 0 ? '+' : ''}${r[4]} gols` : `${r[1]}V · ${r[3]}D<br>${r[4]} sets`;
    const stl = r => fut ? `${r[1]}V · ${r[2]}E · ${r[3]}D · saldo ${r[4] > 0 ? '+' : ''}${r[4]}` : `${r[1]}V · ${r[3]}D · ${r[4]} sets vencidos`;
    body = `<div style="height:16px"></div>${podium(L.slice(0, 3).map((r, i) => ({ av: `<span class="rav cr" style="width:${i ? 56 : 68}px;height:${i ? 56 : 68}px">${cr(r[0], i ? 34 : 42)}</span>`, short: T[r[0]].n, pts: [pts(r), fut ? 'pts' : 'vitórias'], sub: st(r) })), fut ? 'Copa Futebol 2026' : 'Vôlei Misto 2026')}
      ${sh('Demais posições')}
      ${grp(L.slice(3).map((r, i) => `<div class="rk"><span class="p">${i + 4}</span>${cr(r[0], 30)}<span class="n">${T[r[0]].n}<small>${stl(r)}</small></span><span class="t">${pts(r)}</span></div>`).join(''))}
      <p class="small" style="margin:12px 16px 0">${fut ? 'Pontos: vitória 3, empate 1. Desempate pelo saldo de gols.' : 'Classificação por vitórias. Desempate pelos sets vencidos.'}</p>`;
  }
  return {
    nav: 3, h: `
  <h1 class="lt" style="margin-top:16px">Ranking</h1>
  ${seg(['Truco', 'Futebol', 'Vôlei'], S.rankMod, 'rankMod', ['tru', 'fut', 'vol'])}
  ${body}
  ${navApp(3)}` };
};

/* ---------- Perfil ---------- */
APP['app-perfil'] = () => ({
  nav: 4, h: `
  <h1 class="lt" style="margin-top:16px">Perfil</h1>
  ${grp(`<div class="phead">${photoPick(80)}<div class="r-m"><span class="r-t" style="font-weight:600;font-size:18px">${ME.nome}</span><span class="r-s">Matrícula ${ME.mat}</span>
    <span class="phact"><label class="b b-txt">${ic('camera', 18, 2)}${S.photo ? 'Trocar' : 'Adicionar foto'}<input type="file" accept="image/*" data-photo hidden></label>${S.photo ? `<button class="b b-txt" style="color:var(--danger)" data-act="remove-photo">${ic('x', 18, 2)}Remover</button>` : ''}</span></div></div>`)}
  ${sh('Dados')}
  ${grp(kv('E-mail', ME.email) + kv('Telefone', ME.tel) + kv('Nascimento', ME.nasc) + kv('Gênero', ME.gen) + kv('Prédio', ME.predio) + kv('Departamento', ME.depto))}
  ${sh('Equipes')}
  ${grp(row({ lead: cr('CAB', 26), t: 'Cabines FC', s: 'Futebol society · capitão' }) + (S.created ? row({ lead: myCrest(26), t: S.team.name, s: 'Vôlei misto · capitão', to: 'app-equipe' }) : '') + (S.invite === 'ok' ? row({ lead: cards(30), t: 'Dupla com Carla Mendes', s: 'Truco · Etapa 4' }) : ''))}
  ${sh('Documentos')}
  ${grp(row({ t: 'Atestado médico', tr: S.atestado ? 'Enviado' : '', to: 'app-atestado' }))}
  <div class="grp" style="margin-top:16px"><button class="r" data-act="logout"><span class="r-m"><span class="r-t" style="color:var(--danger);display:flex;gap:10px;align-items:center">${ic('logout', 20, 2)}Sair</span></span></button></div>
  ${navApp(4)}`
});
