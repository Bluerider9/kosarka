// Klikabilni prototip — hash ruta: #uloga-ekran (npr. #trener-dolasci)
const $ = (s, r = document) => r.querySelector(s);
const ini = (ime) => ime.split(' ').map((p) => p[0]).slice(0, 2).join('');
const TODAY = 1; // utorak (indeks u DANI)

const ICON = {
  home: '<path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  check: '<path d="M20 6L9 17l-5-5"/>',
  cal: '<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/>',
  wallet: '<path d="M3 7a2 2 0 0 1 2-2h14v4"/><path d="M3 7v11a2 2 0 0 0 2 2h16V9H5a2 2 0 0 1-2-2z"/><circle cx="16.5" cy="14.5" r="1"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2 20c0-3.5 3.5-5.5 7-5.5s7 2 7 5.5"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14.8c2.2.6 4 2.2 4 5.2"/>',
  file: '<path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  upload: '<path d="M12 16V4M7 9l5-5 5 5M4 20h16"/>',
  download: '<path d="M12 4v12M7 11l5 5 5-5M4 20h16"/>',
  eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  finger: '<path d="M12 11v3a8 8 0 0 1-1.5 4.7M7 11a5 5 0 0 1 10 0v2a13 13 0 0 1-1.2 5.4M3.5 9.5A9 9 0 0 1 20.5 9.5M12 15a17 17 0 0 1-1.2 4.7M7 14.5a21 21 0 0 1-.7 4"/>',
  cup: '<path d="M4 8h13v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M7 2v3M11 2v3M15 2v3"/>',
};
const ic = (n, s = 22) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICON[n]}</svg>`;
const LOGO = 'assets/falcons-logo.png';
const BLUERIDER = 'assets/bluerider-lockup-light.svg';
const EMBLEM = 'assets/falcons-emblem.svg';
const badge = (cls = '') => `<div class="logo-badge ${cls}"><img src="${EMBLEM}" alt="ŽKK Falcons Zagreb"></div>`;
const FOTO = 'assets/primjer-igracica.png'; // u pravoj aplikaciji: fotografija svake igračice
const av = (p, cls = '') => p.foto
  ? `<div class="avatar ${cls} photo"><img src="${FOTO}" alt="${p.ime}"></div>`
  : `<div class="avatar ${cls}">${ini(p.ime)}</div>`;
const chip = (t, c = '') => `<span class="chip ${c}">${t}</span>`;
const clan = (k) => chip(CLANARINA[k].label, CLANARINA[k].cls);

/* ---------- prijave (javni obrazac -> admin) ---------- */
const GRUPE_PRIJAVA = ['Selekcija', 'Škola košarke – OŠ 1', 'Škola košarke – OŠ 2', 'Škola košarke – OŠ 3'];
const GRUPE_DODJELA = ['U12', 'U14', 'U16', 'SEN', 'Škola košarke – OŠ 1', 'Škola košarke – OŠ 2', 'Škola košarke – OŠ 3'];
const prijave = [
  { id: 101, dat: '24.11.2026.', ime: 'Dora', prezime: 'Šarić', spol: 'Ž', rod: '2014-03-18', adresa: 'Ulica primjera 12', pbr: '10000', mjesto: 'Zagreb', oib: '54321098766', mob: '091 234 5678', email: 'roditelj.saric@example.com', grupa: 'Selekcija', napomena: 'Igrala dvije godine u školskoj ekipi.', foto: true, status: 'ceka' },
  { id: 102, dat: '23.11.2026.', ime: 'Ema', prezime: 'Kovač', spol: 'Ž', rod: '2016-09-02', adresa: 'Trg primjera 3', pbr: '10020', mjesto: 'Zagreb', oib: '87654321011', mob: '098 111 2233', email: 'kovac.ema.mama@example.com', grupa: 'Škola košarke – OŠ 1', napomena: '', foto: false, status: 'ceka', dup: true },
  { id: 100, dat: '20.11.2026.', ime: 'Tia', prezime: 'Lončar', spol: 'Ž', rod: '2013-06-11', adresa: 'Cesta primjera 7', pbr: '10010', mjesto: 'Zagreb', oib: '11111111119', mob: '095 555 1212', email: 'loncar.tia@example.com', grupa: 'Selekcija', napomena: '', foto: true, status: 'odobreno', dodijeljeno: 'U14' },
];
const pending = () => prijave.filter((p) => p.status === 'ceka').length;
const STATUS_P = { ceka: ['Čeka potvrdu', 'warn'], odobreno: ['Odobreno', 'ok'], odbijeno: ['Odbijeno', 'danger'] };
const fmtDat = (iso) => iso ? iso.split('-').reverse().join('.') + '.' : '';
function oibOk(v) {
  if (!/^\d{11}$/.test(v)) return false;
  let a = 10;
  for (let i = 0; i < 10; i++) { a = (a + +v[i]) % 10; if (a === 0) a = 10; a = (a * 2) % 11; }
  const k = 11 - a === 10 ? 0 : 11 - a;
  return k === +v[10];
}
const SAMPLE = { ime: 'Mila', prezime: 'Pavić', spol: 'Ž', rod: '2014-05-20', adresa: 'Ulica primjera 5', pbr: '10000', mjesto: 'Zagreb', oib: '12345678903', mob: '091 000 1111', email: 'roditelj@example.com', grupa: 'Selekcija' };

function field(name, label, o = {}) {
  const { type = 'text', ph = 'obavezno', extra = '', opts } = o;
  const input = opts
    ? `<select class="input" name="${name}">${opts.map((x) => `<option>${x}</option>`).join('')}</select>`
    : `<input class="input" name="${name}" type="${type}" placeholder="${ph}" ${extra}>`;
  return `<div class="field" data-field="${name}"><label>${label}</label>${input}<small class="err"></small></div>`;
}
function mailPreview(p) {
  const step = (n, t) => `<div style="display:flex;gap:10px;margin:6px 0"><b style="flex:0 0 22px;height:22px;border-radius:50%;background:#182454;color:#fff;font-size:12px;display:grid;place-items:center">${n}</b><span>${t}</span></div>`;
  return `<div class="mail"><div class="mail-head">${badge('lg')}<b>ŽKK FALCONS ZAGREB</b></div>
    <div class="mail-body"><h2>Dobrodošla u Falcons, ${p.ime}! 🏀</h2>
    <p>Prijava za ${p.ime} ${p.prezime} je potvrđena${p.dodijeljeno ? ` i raspoređena u grupu <b>${p.dodijeljeno}</b>` : ''}. Napravili smo vam račun u klupskoj aplikaciji, gdje pratite raspored treninga, članarinu i potvrde.</p>
    <p style="text-align:center;margin:20px 0"><span class="mail-btn">Postavi lozinku</span></p>
    <p style="font-size:12px;color:#6b7686;text-align:center">Link vrijedi 7 dana.</p>
    <div class="mail-box"><b>Instaliraj aplikaciju na mobitel</b>
      <div style="margin-top:10px"><b style="font-size:13px">Android (Chrome)</b>${step(1, 'Otvori link iz maila u Chromeu')}${step(2, 'Dodirni ⋮ pa <b>Instaliraj aplikaciju</b>')}</div>
      <div style="margin-top:12px"><b style="font-size:13px">iPhone (Safari)</b>${step(1, 'Otvori link u <b>Safariju</b> (ne u mail aplikaciji)')}${step(2, 'Dodirni gumb Dijeli pa <b>Dodaj na početni zaslon</b>')}</div></div>
    <p style="font-size:12px;color:#6b7686;margin-top:18px">Ako imaš pitanja, odgovori na ovaj mail.<br>ŽKK Falcons Zagreb</p></div></div>`;
}
function modal(html) {
  const old = document.querySelector('.modal'); if (old) old.remove();
  const m = document.createElement('div'); m.className = 'modal';
  m.innerHTML = `<div class="sheet">${html}</div>`; document.body.appendChild(m);
}
const closeModal = () => { const m = document.querySelector('.modal'); if (m) m.remove(); };

/* ---------- mobilni zajednički dijelovi ---------- */
function mHeader(naslov, sub, foto = false) {
  return `<div class="app-header ${foto ? 'hero' : ''}"><div class="row">${badge()}
    <div class="grow"><h1>${naslov}</h1><div class="sub">${sub}</div></div></div>
    ${foto ? `<img class="hero-photo" src="${FOTO}" alt="">` : ''}</div>`;
}
function tabbar(uloga, tabs, aktivan) {
  return `<nav class="tabbar">${tabs.map(([id, label, icon]) =>
    `<button class="${id === aktivan ? 'on' : ''}" data-go="${uloga}-${id}"><span class="ico">${ic(icon, 22)}</span>${label}</button>`).join('')}</nav>`;
}
function trenRow(t, extra = '') {
  return `<div class="row"><div class="time-block"><b>${t.v}</b><span>do ${t.do}</span></div>
    <div class="grow"><h3>${t.g}</h3><div class="meta">${t.d}</div></div>${extra}</div>`;
}
function rasporedScreen(filterGrupe) {
  const dan = state.dan;
  const strip = `<div class="daystrip">${DANI.map((d, i) =>
    `<button class="${i === dan ? 'on' : ''}" data-dan="${i}">${d}<b>${23 + i}</b></button>`).join('')}</div>`;
  let lista = (TRENINZI[dan] || []).filter((t) => !filterGrupe || filterGrupe.includes(t.g));
  const body = lista.length
    ? `<div class="card"><div class="list">${lista.map((t) => trenRow(t)).join('')}</div></div>`
    : `<div class="card meta" style="text-align:center;padding:32px 16px">Nema treninga ovaj dan.</div>`;
  return strip + body;
}

/* ---------- TRENER ---------- */
const TRENER_TABS = [['danas', 'Danas', 'home'], ['dolasci', 'Dolasci', 'check'], ['raspored', 'Raspored', 'cal'], ['profil', 'Profil', 'user']];
const att = {}; PLAYERS.slice(0, 8).forEach((p, i) => (att[p.id] = i !== 4 && i !== 7));
const SCREENS = {
  'trener-danas': () => ({
    header: mHeader('Bok, Ivane', 'Utorak, 24. studenoga'),
    tabs: tabbar('trener', TRENER_TABS, 'danas'),
    body: `<div class="section-title">Danas</div>` +
      (TRENINZI[TODAY].filter((t) => t.g !== 'SEN').map((t) => `<div class="card stack">${trenRow(t, chip('8 igračica', 'navy'))}
        <button class="btn block" data-go="trener-dolasci">${ic('check', 18)} Označi dolaske</button></div>`).join('')) +
      `<div class="section-title">Ovaj tjedan</div>
       <div class="card"><div class="row spread"><div><h3>Dolaznost</h3><div class="meta">Prosjek tvojih grupa</div></div><b style="font-size:var(--fs-xl);font-weight:900">84%</b></div>
       <div class="progress" style="margin-top:12px"><i style="width:84%"></i></div></div>`,
  }),
  'trener-dolasci': () => {
    const lista = PLAYERS.slice(0, 8);
    const n = lista.filter((p) => att[p.id]).length;
    return {
      header: mHeader('Dolasci', 'U14 · Uto 24.11. · 17:30'),
      tabs: tabbar('trener', TRENER_TABS, 'dolasci'),
      body: `<div class="card"><div class="row spread"><h3>Prisutno</h3><b id="attN" style="font-weight:900">${n} / ${lista.length}</b></div>
        <div class="progress" style="margin-top:10px"><i id="attBar" style="width:${(n / lista.length) * 100}%"></i></div></div>
        <div class="card"><div class="list">${lista.map((p) => `<div class="row attend ${att[p.id] ? 'on' : ''}" data-att="${p.id}">
          ${av(p, 'sm')}<div class="grow"><h3 style="font-size:var(--fs-sm)">${p.ime}</h3></div><div class="toggle"></div></div>`).join('')}</div></div>
        <button class="btn red block" data-toast="Dolasci spremljeni">Spremi dolaske</button>`,
    };
  },
  'trener-raspored': () => ({
    header: mHeader('Raspored', 'Tjedan 24. – 30. 11.'),
    tabs: tabbar('trener', TRENER_TABS, 'raspored'),
    body: rasporedScreen(['U12', 'U14']),
  }),
  'trener-profil': () => ({
    header: mHeader('Profil', 'Trener'),
    tabs: tabbar('trener', TRENER_TABS, 'profil'),
    body: `<div class="card stack"><div class="row"><div class="avatar">IP</div><div class="grow"><h3>Ivan Petrović</h3><div class="meta">Trener</div></div></div>
      <div class="row" style="flex-wrap:wrap">${chip('U12', 'navy')}${chip('U14', 'navy')}</div></div>
      <button class="btn ghost block">Odjava</button>`,
  }),

  /* ---------- RODITELJ ---------- */
  'roditelj-pocetna': () => ({
    header: mHeader('Bok, Marijo', 'Tvoje igračice'),
    tabs: tabbar('roditelj', RODITELJ_TABS, 'pocetna'),
    body: [PLAYERS[0], PLAYERS[10], PLAYERS[2]].slice(0, 2).map((p) => `<div class="card stack pcard ${p.foto ? 'withphoto' : ''}">
        ${p.foto ? `<img class="corner-photo" src="${FOTO}" alt="">` : ''}
        <div class="pc-top"><div class="pc-name">${p.ime}</div><div class="meta">${p.grupe.join(', ')}</div><div style="margin-top:8px">${clan(p.clanarina)}</div></div>
        <div class="row" style="background:var(--silver-100);border-radius:var(--r-md);padding:12px">
          <div class="time-block gold"><b>${p.god === 2012 ? '17:30' : '15:00'}</b><span>${p.god === 2012 ? 'Čet' : 'Sri'}</span></div>
          <div class="grow"><div class="meta">Sljedeći trening</div><h3>${p.grupe[0]}</h3></div></div></div>`).join('') +
      `<div class="card row"><div class="grow"><h3>Dospjelo za platiti</h3><div class="meta">Lea · studeni 2026.</div></div><b style="font-size:var(--fs-lg);font-weight:900">30 €</b></div>
       <button class="btn red block" data-go="roditelj-clanarina">${ic('wallet', 18)} Podaci za uplatu</button>`,
  }),
  'roditelj-raspored': () => ({
    header: mHeader('Raspored', 'Ana · U14, Lea · Škola košarke'),
    tabs: tabbar('roditelj', RODITELJ_TABS, 'raspored'),
    body: rasporedScreen(['U14', 'Škola košarke']),
  }),
  'roditelj-clanarina': () => ({
    header: mHeader('Članarina', 'Studeni 2026.'),
    tabs: tabbar('roditelj', RODITELJ_TABS, 'clanarina'),
    body: `<div class="card stack"><div class="section-title" style="padding:0">Podaci za uplatu</div>
        <div><div class="meta">Primatelj</div><b>ŽKK Falcons Zagreb</b></div>
        <div><div class="meta">IBAN</div><b>HR00 0000 0000 0000 0000 0</b></div>
        <div><div class="meta">Poziv na broj</div><b>HR00 2611-0011</b></div>
        <button class="btn ghost block" data-toast="IBAN kopiran">Kopiraj IBAN</button></div>
      <div class="section-title">Povijest</div>
      <div class="card"><div class="list">${[['Studeni 2026.', 'Ana', 35, 'ok'], ['Studeni 2026.', 'Lea', 30, 'due'], ['Listopad 2026.', 'Ana', 35, 'ok'], ['Listopad 2026.', 'Lea', 30, 'ok']].map(([m, k, i, s]) =>
        `<div class="row"><div class="grow"><h3 style="font-size:var(--fs-sm)">${m}</h3><div class="meta">${k}</div></div><b>${i} €</b>${clan(s)}</div>`).join('')}</div></div>`,
  }),
  'roditelj-potvrde': () => ({
    header: mHeader('Potvrde', 'Potvrda o članstvu u klubu'),
    tabs: tabbar('roditelj', RODITELJ_TABS, 'potvrde'),
    body: [PLAYERS[0], PLAYERS[10]].map((p) => `<div class="card stack"><div class="row">${av(p)}
      <div class="grow"><h3>${p.ime}</h3><div class="meta">Sezona 2026./2027.</div></div></div>
      <button class="btn block" data-toast="U pravoj aplikaciji se ovdje preuzima PDF">${ic('download', 18)} Preuzmi potvrdu (PDF)</button></div>`).join(''),
  }),

  /* ---------- POČETNA (prijava) ---------- */
  'start-login': () => ({
    bare: true,
    body: `<div class="login">
      <div class="login-top">${badge('lg')}<div><b class="lt">ŽKK Falcons Zagreb</b><small>Klupska aplikacija</small></div></div>
      <div class="login-card">
        <div class="seg2"><button class="on" type="button">Prijava</button><button type="button" data-go="prijava-forma">Registracija</button></div>
        <form id="loginForm" class="stack" novalidate>
          <div class="field" data-field="email"><label>E-mail</label><input class="input" name="email" type="email" placeholder="tvoj@email.com" autocomplete="username webauthn"><small class="err"></small></div>
          <div class="field" data-field="lozinka"><label>Lozinka</label><div class="pw"><input class="input" name="lozinka" type="password" placeholder="Unesi lozinku" autocomplete="current-password"><button type="button" class="eye" data-eye aria-label="Prikaži lozinku">${ic('eye', 20)}</button></div><small class="err"></small></div>
          <div class="row spread"><label class="check" style="align-items:center"><input type="checkbox" name="zapamti" checked><span>Ostani prijavljena</span></label><a class="link" data-toast="Link za novu lozinku šalje se na e-mail">Zaboravljena lozinka?</a></div>
          <button class="btn red block" type="submit">Prijavi se</button>
        </form>
        <div class="noacc">Nemaš račun? <a class="link" data-go="prijava-forma">Zatraži ga ovdje</a></div>
      </div>
      <div class="madeby">
          <span>App made by lots of <span class="cup">${ic('cup', 16)}</span> by</span>
          <a class="bluerider" href="https://bluerider.hr" target="_blank" rel="noopener" title="Bluerider Design — bluerider.hr"><img src="${BLUERIDER}" alt="Bluerider Design"></a>
        </div>
      </div>`,
  }),

  /* ---------- JAVNA PRIJAVA ---------- */
  'prijava-forma': () => ({
    header: mHeader('Prijava nove članice', 'ŽKK Falcons Zagreb'),
    tabs: '',
    body: `<a class="link back" data-go="start-login">← Imam račun, prijavi me</a><form id="prijavaForm" class="stack" novalidate>
      <div class="card stack"><div class="row spread"><h3>Podaci o djevojčici</h3><button type="button" class="btn ghost sm" data-fill>Popuni primjerom</button></div>
        <div class="two">${field('ime', 'Ime')}${field('prezime', 'Prezime')}</div>
        <div class="two">${field('spol', 'Spol', { opts: ['Ž', 'M'] })}${field('rod', 'Datum rođenja', { type: 'date', ph: '' })}</div>
        ${field('oib', 'OIB', { ph: '11 znamenki', extra: 'inputmode="numeric" maxlength="11"' })}
        ${field('adresa', 'Adresa')}
        <div class="two" style="grid-template-columns:1fr 1.4fr">${field('pbr', 'Poštanski broj', { extra: 'inputmode="numeric" maxlength="5"' })}${field('mjesto', 'Mjesto')}</div></div>
      <div class="card stack"><h3>Kontakt roditelja</h3>
        ${field('mob', 'Mobitel', { type: 'tel' })}${field('email', 'E-mail', { type: 'email' })}
        <div class="meta">Na ovaj e-mail stiže potvrda prijave i pristup aplikaciji.</div></div>
      <div class="card stack"><h3>Grupa</h3>${field('grupa', 'Grupa', { opts: GRUPE_PRIJAVA })}
        <div class="meta">Ako se prijavljujete u selekciju, trener određuje u koju točno spada.</div>
        <div class="field"><label>Napomena</label><textarea class="input" name="napomena" rows="3" placeholder="neobavezno"></textarea></div></div>
      <div class="card stack">
        <label class="check"><input type="checkbox" name="privola" required><span>Prihvaćam <u>pravila privatnosti</u> i obradu osobnih podataka (OIB, adresa) u svrhu članstva u klubu.</span></label><small class="err" data-err="privola"></small>
        <label class="check"><input type="checkbox" name="fotoPrivola"><span>Dopuštam korištenje fotografije djevojčice unutar klupske aplikacije.</span></label></div>
      <button class="btn red block" type="submit">Pošalji prijavu</button><div style="height:8px"></div></form>`,
  }),
  'prijava-poslano': () => {
    const p = state.zadnja || SAMPLE;
    return {
      header: mHeader('Prijava poslana', 'Hvala!'),
      tabs: '',
      body: `<div class="card stack" style="text-align:center;padding:28px 20px"><div style="font-size:42px">✅</div><h2 style="font-size:var(--fs-xl)">Primili smo prijavu za ${p.ime}</h2>
        <div class="meta">Potvrdu smo poslali na <b style="color:var(--text)">${p.email}</b>.</div></div>
        <div class="card stack"><h3>Što dalje?</h3>
        <div class="row"><span class="chip navy">1</span><div class="grow meta">Klub pregleda prijavu i dodjeljuje grupu.</div></div>
        <div class="row"><span class="chip navy">2</span><div class="grow meta">Dobit ćete e-mail s linkom za postavljanje lozinke i uputama za instalaciju aplikacije.</div></div>
        <div class="row"><span class="chip navy">3</span><div class="grow meta">Fotografiju djevojčice dodaje klub nakon potvrde.</div></div></div>`,
    };
  },

  /* ---------- IGRAČICA ---------- */
  'igracica-pocetna': () => ({
    header: mHeader('Bok, Ana', 'U14', true),
    tabs: tabbar('igracica', IGRACICA_TABS, 'pocetna'),
    body: `<div class="card stack"><div class="meta">Sljedeći trening</div>
        <div class="row"><div class="time-block gold"><b>17:30</b><span>Danas</span></div><div class="grow"><h3>U14</h3><div class="meta">Dvorana A</div></div></div></div>
      <div class="card"><div class="row spread"><div><h3>Moja dolaznost</h3><div class="meta">Ova sezona</div></div><b style="font-size:var(--fs-xl);font-weight:900">91%</b></div>
        <div class="progress" style="margin-top:12px"><i style="width:91%"></i></div></div>`,
  }),
  'igracica-raspored': () => ({
    header: mHeader('Raspored', 'U14'),
    tabs: tabbar('igracica', IGRACICA_TABS, 'raspored'),
    body: rasporedScreen(['U14']),
  }),
};
const RODITELJ_TABS = [['pocetna', 'Početna', 'home'], ['raspored', 'Raspored', 'cal'], ['clanarina', 'Članarina', 'wallet'], ['potvrde', 'Potvrde', 'file']];
const IGRACICA_TABS = [['pocetna', 'Početna', 'home'], ['raspored', 'Raspored', 'cal']];

/* ---------- ADMIN (desktop) ---------- */
const ADMIN_NAV = [['pregled', 'Pregled', 'grid'], ['prijave', 'Prijave', 'file'], ['clanovi', 'Članovi', 'users'], ['grupe', 'Grupe', 'user'], ['raspored', 'Raspored', 'cal'], ['clanarine', 'Članarine', 'wallet']];
const memberRows = (q = '', g = 'Sve') => PLAYERS.filter((p) =>
  (g === 'Sve' || p.grupe.some((x) => x.startsWith(g))) && p.ime.toLowerCase().includes(q.toLowerCase()))
  .map((p) => `<tr><td><div class="who">${av(p, 'sm')}${p.ime}</div></td><td>${p.god}.</td>
    <td>${p.grupe.map((x) => chip(x, 'navy')).join(' ')}</td><td>${p.roditelj}</td><td>${clan(p.clanarina)}</td></tr>`).join('');

const ADMIN = {
  prijave: () => `<div class="page-head"><div><h1>Prijave</h1><div class="sub">Nove članice koje čekaju potvrdu</div></div><div class="grow"></div>
      <button class="btn ghost" data-go="prijava-forma">Otvori javni obrazac</button></div>
    <table><thead><tr><th>Datum</th><th>Djevojčica</th><th>Godište</th><th>Zatražena grupa</th><th>Kontakt roditelja</th><th>Status</th></tr></thead><tbody>${prijave.map((p) =>
      `<tr class="click" data-open="${p.id}"><td>${p.dat}</td><td><div class="who">${av(p, 'sm')}${p.ime} ${p.prezime}</div></td><td>${p.rod.slice(0, 4)}.</td><td>${chip(p.grupa, 'navy')}</td>
      <td>${p.email}</td><td>${chip(STATUS_P[p.status][0], STATUS_P[p.status][1])}${p.dup && p.status === 'ceka' ? ' ' + chip('Moguća dvostruka', 'danger') : ''}</td></tr>`).join('')}</tbody></table>`,
  pregled: () => `<div class="page-head"><div><h1>Pregled</h1><div class="sub">Utorak, 24. studenoga 2026.</div></div></div>
    <div class="stats">
      <div class="stat"><div class="lbl">Aktivne članice</div><div class="val">128</div><div class="hint">+6 ovaj mjesec</div></div>
      <div class="stat gold"><div class="lbl">Grupe</div><div class="val">9</div><div class="hint">5 kategorija</div></div>
      <div class="stat silver"><div class="lbl">Dolaznost (tjedan)</div><div class="val">84%</div><div class="hint">prosjek svih grupa</div></div>
      <div class="stat red"><div class="lbl">Dospjele članarine</div><div class="val">14</div><div class="hint">420 € ukupno</div></div></div>
    <div class="grid-2">
      <div class="card"><h3 style="margin-bottom:16px">Današnji treninzi</h3><div class="list">${TRENINZI[TODAY].map((t) => trenRow(t, chip('trener: ' + GROUPS.find((g) => g.ime === t.g).trener.split(' ')[0], ''))).join('')}</div></div>
      <div class="card stack"><h3>Zadnji uvoz izvoda</h3><div class="meta">Ponedjeljak, 23.11. · Erste (WRI)</div>
        <div class="row">${chip('52 spareno', 'ok')}${chip('3 za pregled', 'warn')}${chip('1 nije članarina')}</div>
        <button class="btn ghost" data-go="admin-clanarine">Otvori članarine</button></div></div>`,
  clanovi: () => `<div class="page-head"><div><h1>Članovi</h1><div class="sub">128 aktivnih</div></div><div class="grow"></div>
      <button class="btn" data-toast="Obrazac za novu članicu — sljedeći korak">${ic('plus', 18)} Nova članica</button></div>
    <div class="toolbar"><label class="search">${ic('search', 18)}<input id="q" placeholder="Pretraži po imenu…"></label>
      <div class="filters" id="filters">${['Sve', 'U12', 'U14', 'U16', 'SEN', 'Škola'].map((f, i) => `<span class="chip ${i ? '' : 'on'}" data-f="${f}">${f}</span>`).join('')}</div></div>
    <table><thead><tr><th>Ime</th><th>Godište</th><th>Grupe</th><th>Roditelj</th><th>Članarina</th></tr></thead><tbody id="rows">${memberRows()}</tbody></table>`,
  grupe: () => `<div class="page-head"><div><h1>Grupe</h1><div class="sub">${GROUPS.length} grupa</div></div><div class="grow"></div>
      <button class="btn" data-toast="Nova grupa — sljedeći korak">${ic('plus', 18)} Nova grupa</button></div>
    <div class="grid-3">${GROUPS.map((g) => `<div class="card stack"><div class="row spread"><h2 style="font-size:var(--fs-xl)">${g.ime}</h2>${chip(g.cl + ' članica', 'navy')}</div>
      <div class="meta">Trener: <b style="color:var(--text)">${g.trener}</b></div><div class="meta">${g.raspored}</div></div>`).join('')}</div>`,
  raspored: () => `<div class="page-head"><div><h1>Raspored</h1><div class="sub">Tjedni raspored treninga</div></div><div class="grow"></div>
      <button class="btn" data-toast="Novi termin — sljedeći korak">${ic('plus', 18)} Novi termin</button></div>
    <table><thead><tr><th>Dan</th><th>Vrijeme</th><th>Grupa</th><th>Dvorana</th></tr></thead><tbody>${DANI.flatMap((d, i) =>
      (TRENINZI[i] || []).map((t, j) => `<tr><td>${j ? '' : '<b>' + d + '</b>'}</td><td>${t.v} – ${t.do}</td><td>${chip(t.g, 'navy')}</td><td>${t.d}</td></tr>`)).join('')}</tbody></table>`,
  clanarine: () => `<div class="page-head"><div><h1>Članarine</h1><div class="sub">Uplate i uvoz bankovnog izvoda</div></div></div>
    <div class="dropzone" style="margin-bottom:24px"><div style="color:var(--navy);margin-bottom:8px;display:flex;justify-content:center">${ic('upload', 28)}</div>
      <b style="color:var(--text)">Povuci Erste izvod (WRI) ovdje</b><div style="margin:4px 0 14px">ili</div>
      <button class="btn" data-toast="U pravoj aplikaciji se ovdje učitava izvod">Odaberi datoteku</button></div>
    <table><thead><tr><th>Datum</th><th>Platitelj</th><th>Opis</th><th class="num">Iznos</th><th>Sparena članica</th><th>Status</th></tr></thead><tbody>${UPLATE.map((u) =>
      `<tr><td>${u.dat}</td><td><b>${u.platitelj}</b></td><td>${u.opis}</td><td class="num">${u.iznos} €</td><td>${u.clan}</td>
      <td>${u.st === 'ok' ? chip('Spareno', 'ok') : u.st === 'review' ? chip('Za pregled', 'warn') : chip('Preskočeno')}</td></tr>`).join('')}</tbody></table>`,
};

/* ---------- usmjeravanje i prikaz ---------- */
const ROLES = [['start', 'Početna'], ['trener', 'Trener'], ['roditelj', 'Roditelj'], ['igracica', 'Igračica'], ['prijava', 'Javna prijava'], ['admin', 'Admin (desktop)']];
const DEFAULT_SCREEN = { start: 'login', trener: 'danas', roditelj: 'pocetna', igracica: 'pocetna', prijava: 'forma', admin: 'pregled' };
const state = { dan: TODAY };
let toastT;

function toast(msg) {
  const t = $('#toast'); t.textContent = msg; t.classList.add('show');
  clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 1800);
}

function render() {
  const hash = location.hash.slice(1) || 'start-login';
  const [uloga, ...r] = hash.split('-'); const ekran = r.join('-');
  const app = $('#app'); const stage = $('#stage');
  $('#roleSeg').innerHTML = ROLES.map(([id, l]) => `<button class="${id === uloga ? 'on' : ''}" data-go="${id}-${DEFAULT_SCREEN[id]}">${l}</button>`).join('');
  if (uloga === 'admin') {
    stage.className = 'stage admin-stage';
    const a = ekran in ADMIN ? ekran : 'pregled';
    app.innerHTML = `<div class="admin"><aside class="sidebar"><div class="logo">${badge('lg')}<div><b>FALCONS</b><small>Administracija</small></div></div>
      ${ADMIN_NAV.map(([id, l, i]) => `<button class="${id === a ? 'on' : ''}" data-go="admin-${id}">${ic(i, 20)}${l}${id === 'prijave' && pending() ? `<span class="badge">${pending()}</span>` : ''}</button>`).join('')}<div class="sp"></div>
      <button>${ic('user', 20)}Mislav</button></aside><main class="main">${ADMIN[a]()}</main></div>`;
    return;
  }
  stage.className = 'stage';
  const s = (SCREENS[`${uloga}-${ekran}`] || SCREENS['start-login'])();
  app.innerHTML = s.bare
    ? `<div class="device">${s.body}<div class="toast" id="toastIn"></div></div>`
    : `<div class="device">${s.header}<div class="app-body">${s.body}</div>${s.tabs}<div class="toast" id="toastIn"></div></div>`;
}

function bioSheet() {
  const dev = $('.device'); if (!dev) return;
  const o = document.createElement('div'); o.className = 'm-overlay';
  o.innerHTML = `<div class="m-sheet"><div class="bio-ico">${ic('finger', 34)}</div>
    <h2>Uključi brzu prijavu?</h2>
    <p>Sljedeći put se prijavi otiskom prsta ili Face ID-jem, bez upisivanja lozinke.</p>
    <button class="btn red block" data-bio="yes">Uključi</button>
    <button class="btn ghost block" data-bio="no">Ne sada</button>
    <small>Možeš ga uključiti i kasnije u Profilu.</small></div>`;
  dev.appendChild(o);
}
function showErr(form, name, msg) {
  const f = form.querySelector(`[data-field="${name}"]`);
  if (f) { f.querySelector('.input').classList.toggle('bad', !!msg); f.querySelector('.err').textContent = msg || ''; }
}
function readForm(form) { const d = {}; new FormData(form).forEach((v, k) => (d[k] = v.toString().trim())); return d; }
function validate(form) {
  const d = readForm(form); let ok = true;
  const need = ['ime', 'prezime', 'rod', 'adresa', 'pbr', 'mjesto', 'oib', 'mob', 'email'];
  need.forEach((k) => { const bad = !d[k]; showErr(form, k, bad ? 'Obavezno polje' : ''); if (bad) ok = false; });
  if (d.oib && !oibOk(d.oib)) { showErr(form, 'oib', 'OIB nije ispravan'); ok = false; }
  if (d.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.email)) { showErr(form, 'email', 'Unesi ispravan e-mail'); ok = false; }
  const pe = form.querySelector('[data-err="privola"]'); pe.textContent = d.privola ? '' : 'Privola je obavezna za prijavu'; if (!d.privola) ok = false;
  return ok ? d : null;
}
document.addEventListener('submit', (e) => {
  if (e.target.id === 'loginForm') {
    e.preventDefault(); const f = e.target; const d = readForm(f); let ok = true;
    showErr(f, 'email', d.email ? '' : 'Upiši e-mail'); showErr(f, 'lozinka', d.lozinka ? '' : 'Upiši lozinku');
    if (!d.email || !d.lozinka) ok = false;
    if (ok) bioSheet(); // u pravoj aplikaciji: uloga dolazi iz računa; prijedlog se nudi samo ako uređaj to podržava
    return;
  }
  if (e.target.id !== 'prijavaForm') return; e.preventDefault();
  const d = validate(e.target); if (!d) { const b = e.target.querySelector('.bad, .err:not(:empty)'); if (b) b.scrollIntoView({ block: 'center', behavior: 'smooth' }); return; }
  const dup = prijave.some((p) => p.oib === d.oib); // u pravoj aplikaciji: i provjera protiv postojećih članica
  const p = { id: Date.now(), dat: '24.11.2026.', ...d, foto: false, status: 'ceka', dup };
  prijave.unshift(p); state.zadnja = p; location.hash = 'prijava-poslano';
});
document.addEventListener('click', (e) => {
  const eye = e.target.closest('[data-eye]');
  if (eye) { const i = eye.parentElement.querySelector('input'); i.type = i.type === 'password' ? 'text' : 'password'; return; }
  const bio = e.target.closest('[data-bio]');
  if (bio) {
    if (bio.dataset.bio === 'yes') { const t = $('#toastIn'); t.textContent = 'Brza prijava uključena (u pravoj aplikaciji: potvrda otiskom/Face ID-jem)'; t.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 1800); setTimeout(() => (location.hash = 'roditelj-pocetna'), 1100); }
    else location.hash = 'roditelj-pocetna';
    return;
  }
  if (e.target.closest('[data-fill]')) {
    const f = $('#prijavaForm'); Object.entries(SAMPLE).forEach(([k, v]) => { const el = f.elements[k]; if (el) el.value = v; });
    f.elements.privola.checked = true; return;
  }
  if (e.target.closest('[data-close]') || e.target.classList.contains('modal')) { closeModal(); return; }
  const op = e.target.closest('[data-open]');
  if (op) {
    const p = prijave.find((x) => x.id === +op.dataset.open);
    const red = (l, v) => `<div class="kv"><span>${l}</span><b>${v || '—'}</b></div>`;
    modal(`<div class="row spread" style="margin-bottom:12px"><h2 style="font-size:var(--fs-xl)">${p.ime} ${p.prezime}</h2>${chip(STATUS_P[p.status][0], STATUS_P[p.status][1])}</div>
      ${p.dup && p.status === 'ceka' ? '<div class="alert">⚠ OIB se podudara s postojećom prijavom/članicom. Provjeri prije potvrde.</div>' : ''}
      <div class="kvs">${red('Spol', p.spol)}${red('Datum rođenja', fmtDat(p.rod))}${red('OIB', p.oib)}${red('Adresa', `${p.adresa}, ${p.pbr} ${p.mjesto}`)}
      ${red('Mobitel', p.mob)}${red('E-mail', p.email)}${red('Zatražena grupa', p.grupa)}${red('Napomena', p.napomena)}${red('Privola za fotografiju', p.foto ? 'Da' : 'Ne')}</div>
      ${p.status === 'ceka' ? `<div class="field" style="margin-top:16px"><label>Dodijeli grupu</label><select class="input" id="dodjela">${GRUPE_DODJELA.map((g) => `<option ${g === (p.grupa === 'Selekcija' ? 'U14' : p.grupa) ? 'selected' : ''}>${g}</option>`).join('')}</select></div>
      <div class="row" style="margin-top:16px;gap:8px"><button class="btn red grow" data-act="odobri" data-id="${p.id}">Potvrdi i pošalji welcome mail</button><button class="btn ghost" data-act="odbij" data-id="${p.id}">Odbij</button></div>`
      : `<div class="row" style="margin-top:16px;gap:8px"><button class="btn ghost grow" data-act="mail" data-id="${p.id}">Pogledaj welcome mail</button><button class="btn ghost" data-close>Zatvori</button></div>`}
      <div class="meta" style="margin-top:12px">Fotografiju igračice dodaješ na njenom profilu nakon potvrde.</div>`);
    return;
  }
  const act = e.target.closest('[data-act]');
  if (act) {
    const p = prijave.find((x) => x.id === +act.dataset.id);
    if (act.dataset.act === 'odobri') { p.status = 'odobreno'; p.dodijeljeno = $('#dodjela').value; render(); modal(`<div class="meta" style="margin-bottom:10px">✓ Prijava potvrđena. Ovaj e-mail je poslan na <b>${p.email}</b>:</div>${mailPreview(p)}<button class="btn block" style="margin-top:14px" data-close>Zatvori</button>`); }
    else if (act.dataset.act === 'odbij') { p.status = 'odbijeno'; render(); closeModal(); }
    else if (act.dataset.act === 'mail') { modal(`${mailPreview(p)}<button class="btn block" style="margin-top:14px" data-close>Zatvori</button>`); }
    return;
  }
  const go = e.target.closest('[data-go]'); if (go) { location.hash = go.dataset.go; return; }
  const dan = e.target.closest('[data-dan]'); if (dan) { state.dan = +dan.dataset.dan; render(); return; }
  const a = e.target.closest('[data-att]');
  if (a) {
    const id = +a.dataset.att; att[id] = !att[id]; a.classList.toggle('on', att[id]);
    const lista = PLAYERS.slice(0, 8); const n = lista.filter((p) => att[p.id]).length;
    $('#attN').textContent = `${n} / ${lista.length}`; $('#attBar').style.width = `${(n / lista.length) * 100}%`; return;
  }
  const t = e.target.closest('[data-toast]'); if (t) { const inner = $('#toastIn'); if (inner) { inner.textContent = t.dataset.toast; inner.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => inner.classList.remove('show'), 1800); } else { const g = $('#toast'); g.textContent = t.dataset.toast; g.classList.add('show', 'fixed'); clearTimeout(toastT); toastT = setTimeout(() => g.classList.remove('show'), 1800); } return; }
  const f = e.target.closest('[data-f]');
  if (f) { document.querySelectorAll('#filters .chip').forEach((c) => c.classList.toggle('on', c === f)); $('#rows').innerHTML = memberRows($('#q').value, f.dataset.f); }
});
document.addEventListener('input', (e) => {
  if (e.target.id === 'q') { const on = $('#filters .chip.on'); $('#rows').innerHTML = memberRows(e.target.value, on ? on.dataset.f : 'Sve'); }
});
window.addEventListener('hashchange', render);
render();
