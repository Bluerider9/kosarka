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
};
const ic = (n, s = 22) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICON[n]}</svg>`;
const FOTO = 'assets/primjer-igracica.png'; // u pravoj aplikaciji: fotografija svake igračice
const av = (p, cls = '') => p.foto
  ? `<div class="avatar ${cls} photo"><img src="${FOTO}" alt="${p.ime}"></div>`
  : `<div class="avatar ${cls}">${ini(p.ime)}</div>`;
const chip = (t, c = '') => `<span class="chip ${c}">${t}</span>`;
const clan = (k) => chip(CLANARINA[k].label, CLANARINA[k].cls);

/* ---------- mobilni zajednički dijelovi ---------- */
function mHeader(naslov, sub, foto = false) {
  return `<div class="app-header ${foto ? 'hero' : ''}"><div class="row"><div class="crest" title="Rezervirano za logo">F</div>
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
const ADMIN_NAV = [['pregled', 'Pregled', 'grid'], ['clanovi', 'Članovi', 'users'], ['grupe', 'Grupe', 'user'], ['raspored', 'Raspored', 'cal'], ['clanarine', 'Članarine', 'wallet']];
const memberRows = (q = '', g = 'Sve') => PLAYERS.filter((p) =>
  (g === 'Sve' || p.grupe.some((x) => x.startsWith(g))) && p.ime.toLowerCase().includes(q.toLowerCase()))
  .map((p) => `<tr><td><div class="who">${av(p, 'sm')}${p.ime}</div></td><td>${p.god}.</td>
    <td>${p.grupe.map((x) => chip(x, 'navy')).join(' ')}</td><td>${p.roditelj}</td><td>${clan(p.clanarina)}</td></tr>`).join('');

const ADMIN = {
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
const ROLES = [['trener', 'Trener'], ['roditelj', 'Roditelj'], ['igracica', 'Igračica'], ['admin', 'Admin (desktop)']];
const state = { dan: TODAY };
let toastT;

function toast(msg) {
  const t = $('#toast'); t.textContent = msg; t.classList.add('show');
  clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 1800);
}

function render() {
  const hash = location.hash.slice(1) || 'trener-danas';
  const [uloga, ...r] = hash.split('-'); const ekran = r.join('-');
  const app = $('#app'); const stage = $('#stage');
  $('#roleSeg').innerHTML = ROLES.map(([id, l]) => `<button class="${id === uloga ? 'on' : ''}" data-go="${id}-${id === 'admin' ? 'pregled' : id === 'trener' ? 'danas' : 'pocetna'}">${l}</button>`).join('');
  if (uloga === 'admin') {
    stage.className = 'stage admin-stage';
    const a = ekran in ADMIN ? ekran : 'pregled';
    app.innerHTML = `<div class="admin"><aside class="sidebar"><div class="logo"><div class="crest">F</div><div><b>FALCONS</b><small>Administracija</small></div></div>
      ${ADMIN_NAV.map(([id, l, i]) => `<button class="${id === a ? 'on' : ''}" data-go="admin-${id}">${ic(i, 20)}${l}</button>`).join('')}<div class="sp"></div>
      <button>${ic('user', 20)}Mislav</button></aside><main class="main">${ADMIN[a]()}</main></div>`;
    return;
  }
  stage.className = 'stage';
  const s = (SCREENS[`${uloga}-${ekran}`] || SCREENS['trener-danas'])();
  app.innerHTML = `<div class="device">${s.header}<div class="app-body">${s.body}</div>${s.tabs}<div class="toast" id="toastIn"></div></div>`;
}

document.addEventListener('click', (e) => {
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
