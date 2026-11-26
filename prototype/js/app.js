// Klikabilni prototip — hash ruta: #uloga-ekran (npr. #trener-dolasci)
const $ = (s, r = document) => r.querySelector(s);
const ini = (ime) => ime.split(' ').map((p) => p[0]).slice(0, 2).join('');
const TODAY = 1; // utorak (indeks u DANI)

const ICON = {
  edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
  home: '<path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  x: '<path d="M18 6L6 18M6 6l12 12"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
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
  play: '<path d="M8 5l11 7-11 7z"/>',
  image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-9 9"/>',
  lock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  trash: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3"/>',
  folder: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
  download: '<path d="M12 4v12M7 11l5 5 5-5M4 20h16"/>',
  eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  cog: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
  chev: '<path d="M9 6l6 6-6 6"/>',
  coin: '<circle cx="12" cy="12" r="9"/><path d="M10 16V8h5M10 12h4"/>',
  bag: '<path d="M5 8h14l-1 12H6z"/><path d="M9 8a3 3 0 0 1 6 0"/>',
  qr: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM20 14v1M14 20h3M20 18v3"/>',
  bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  finger: '<path d="M12 11v3a8 8 0 0 1-1.5 4.7M7 11a5 5 0 0 1 10 0v2a13 13 0 0 1-1.2 5.4M3.5 9.5A9 9 0 0 1 20.5 9.5M12 15a17 17 0 0 1-1.2 4.7M7 14.5a21 21 0 0 1-.7 4"/>',
  cup: '<path d="M4 8h13v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M7 2v3M11 2v3M15 2v3"/>',
};
const ic = (n, s = 22) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICON[n]}</svg>`;
const LOGO = 'assets/falcons-logo.png';
const SEKCIJA_FALCOIN = 'MyFalko'; // naziv kategorije/taba s Falcoinima (valuta ostaje "Falcoin") — mijenja se samo ovdje
const APP_NAME = 'Oko Soko'; // radni naziv aplikacije — mijenja se samo ovdje
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
  { id: 101, dat: '24.11.2026.', ime: 'Dora', prezime: 'Šarić', rod: '2014-03-18', adresa: 'Ulica primjera 12', pbr: '10000', mjesto: 'Zagreb', oib: '54321098766', mob: '091 234 5678', email: 'roditelj.saric@example.com', grupa: 'Selekcija', majica: '152', foto: true, status: 'ceka' },
  { id: 102, dat: '23.11.2026.', ime: 'Ema', prezime: 'Kovač', rod: '2016-09-02', adresa: 'Trg primjera 3', pbr: '10020', mjesto: 'Zagreb', oib: '87654321011', mob: '098 111 2233', email: 'kovac.ema.mama@example.com', grupa: 'Škola košarke – OŠ 1', majica: '128', foto: false, status: 'ceka', dup: true },
  { id: 100, dat: '20.11.2026.', ime: 'Tia', prezime: 'Lončar', rod: '2013-06-11', adresa: 'Cesta primjera 7', pbr: '10010', mjesto: 'Zagreb', oib: '11111111119', mob: '095 555 1212', email: 'loncar.tia@example.com', grupa: 'Selekcija', majica: '164', foto: true, status: 'odobreno', dodijeljeno: 'U14' },
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
const MAJICE = ['116', '128', '140', '152', '164', 'XS', 'S', 'M', 'L', 'XL'];
const SAMPLE = { ime: 'Mila', prezime: 'Pavić', rod: '2014-05-20', adresa: 'Ulica primjera 5', pbr: '10000', mjesto: 'Zagreb', oib: '12345678903', mob: '091 000 1111', email: 'roditelj@example.com', grupa: 'Selekcija', majica: '152' };

function field(name, label, o = {}) {
  const { type = 'text', ph = 'obavezno', extra = '', opts } = o;
  const input = opts
    ? `<select class="input" name="${name}">${o.empty ? `<option value="">${o.empty}</option>` : ''}${opts.map((x) => `<option>${x}</option>`).join('')}</select>`
    : `<input class="input" name="${name}" type="${type}" placeholder="${ph}" ${extra}>`;
  return `<div class="field" data-field="${name}"><label>${label}</label>${input}<small class="err"></small></div>`;
}
function mailPreview(p) {
  const step = (n, t) => `<div style="display:flex;gap:10px;margin:6px 0"><b style="flex:0 0 22px;height:22px;border-radius:50%;background:#182454;color:#fff;font-size:12px;display:grid;place-items:center">${n}</b><span>${t}</span></div>`;
  return `<div class="mail"><div class="mail-head">${badge('lg')}<b>${APP_NAME.toUpperCase()} · ŽKK FALCONS ZAGREB</b></div>
    <div class="mail-body"><h2>Dobrodošla u ${APP_NAME}, ${p.ime}! 🏀</h2>
    <p>Prijava za ${p.ime} ${p.prezime} je potvrđena${p.dodijeljeno ? ` i raspoređena u grupu <b>${p.dodijeljeno}</b>` : ''}. Napravili smo vam račun u klupskoj aplikaciji, gdje pratite raspored treninga, članarinu i potvrde.</p>
    <p style="text-align:center;margin:20px 0"><span class="mail-btn">Postavi lozinku</span></p>
    <p style="font-size:12px;color:#6b7686;text-align:center">Link vrijedi 7 dana.</p>
    <div class="mail-box"><b>Instaliraj ${APP_NAME} na mobitel</b>
      <div style="margin-top:10px"><b style="font-size:13px">Android (Chrome)</b>${step(1, 'Otvori link iz maila u Chromeu')}${step(2, 'Dodirni ⋮ pa <b>Instaliraj aplikaciju</b>')}</div>
      <div style="margin-top:12px"><b style="font-size:13px">iPhone (Safari)</b>${step(1, 'Otvori link u <b>Safariju</b> (ne u mail aplikaciji)')}${step(2, 'Dodirni gumb Dijeli pa <b>Dodaj na početni zaslon</b>')}</div></div>
    <p style="font-size:12px;color:#6b7686;margin-top:18px">Ako imaš pitanja, odgovori na ovaj mail.<br>ŽKK Falcons Zagreb</p></div></div>`;
}
function modal(html) {
  const old = document.querySelector('.modal'); if (old) old.remove();
  const m = document.createElement('div'); m.className = 'modal';
  m.innerHTML = `<div class="sheet">${html}</div>`; document.body.appendChild(m);
}
function newPostSheet() {
  modal(`<div class="row spread" style="margin-bottom:12px"><h2 style="font-size:var(--fs-xl)">Nova objava</h2><button class="btn ghost sm" data-close>Zatvori</button></div>
    <form id="novostForm" class="stack" novalidate>
      ${field('naslov', 'Naslov')}
      <div class="field" data-field="tekst"><label>Tekst</label><textarea class="input" name="tekst" rows="5"></textarea><small class="err"></small></div>
      <div class="two">${field('grupa', 'Za koga', { opts: ['Svi', ...GROUPS.map((g) => g.ime)] })}${field('oznaka', 'Oznaka', { opts: Object.keys(OZNAKE) })}</div>
      <label class="check"><input type="checkbox" name="pin"><span>Prikvači na vrh</span></label>
      <div class="meta">Roditelji djevojčica u odabranoj grupi dobivaju objavu u aplikaciji.</div>
      <div class="row" style="gap:10px"><button class="btn ghost grow" type="button" data-close>Odustani</button><button class="btn red grow" type="submit">Objavi</button></div>
    </form>`);
}
function privacySheet() {
  modal(`<div class="row spread" style="margin-bottom:10px"><h2 style="font-size:var(--fs-xl)">Pravila privatnosti</h2><button class="btn ghost sm" data-close>Zatvori</button></div>
    <div class="policy">
      <div class="meta">Nacrt teksta — prije puštanja u rad treba ga provjeriti i dopuniti (npr. podaci o kontaktu i službeniku za zaštitu podataka, ako je potreban).</div>
      <h4>Tko obrađuje podatke</h4><p>Voditelj obrade je ŽKK Falcons Zagreb (adresa, OIB i kontakt kluba — dopuniti).</p>
      <h4>Koje podatke prikupljamo</h4><p>Ime i prezime, datum rođenja, OIB, adresa i mjesto djevojčice; ime, mobitel i e-mail roditelja/skrbnika; podatke o grupi, dolascima na treninge i članarini; fotografiju, ako je dana privola.</p>
      <h4>Zašto ih obrađujemo</h4><p>Za članstvo u klubu: raspored u grupe i treninge, evidenciju dolazaka, naplatu i evidenciju članarine, izdavanje potvrda o članstvu te komunikaciju s roditeljima.</p>
      <h4>Tko ima pristup</h4><p>Samo ovlaštene osobe kluba (uprava i treneri, u opsegu potrebnom za njihov posao). Podaci se ne prodaju niti ustupaju trećim stranama, osim kad to nalaže zakon.</p>
      <h4>Koliko dugo čuvamo</h4><p>Dok traje članstvo, te nakon toga onoliko koliko propisi zahtijevaju (dopuniti rokove).</p>
      <h4>Vaša prava</h4><p>Imate pravo na pristup, ispravak i brisanje podataka, ograničenje obrade, prigovor te povlačenje privole u bilo kojem trenutku. Zahtjev pošaljite klubu na e-mail (dopuniti). Imate i pravo prigovora Agenciji za zaštitu osobnih podataka (AZOP).</p>
    </div>
    <button class="btn block" style="margin-top:14px" data-close>Razumijem</button>`);
}
const closeModal = () => { const m = document.querySelector('.modal'); if (m) m.remove(); };

/* ---------- obavijesti (zvono) ---------- */
const OBAVIJESTI = {
  igracica: [{ naslov: 'Falcoini za dolazak', tekst: 'Dobila si +1,00 Falcoin za dolazak na trening U14 (20.11.).', vr: '20.11. 19:05', nova: false }],
  roditelj: [], trener: [],
  admin: [{ naslov: 'Tjedni zadatak', tekst: 'Planiraj tjedni zadatak za idući tjedan najkasnije do nedjelje u 12:00.', vr: 'Danas 08:00', nova: true }, { naslov: 'Nove prijave', tekst: '2 nove prijave čekaju potvrdu.', vr: '23.11. 18:40', nova: true }],
};
const uloga = () => location.hash.slice(1).split('-')[0];
const notify = (za, naslov, tekst) => OBAVIJESTI[za].unshift({ naslov, tekst, vr: 'Upravo sada', nova: true });
const novihObavijesti = (u = uloga()) => (OBAVIJESTI[u] || []).filter((n) => n.nova).length;
const bellBtn = (cls = '', attr = 'data-bell') => `<button class="cog bell ${cls}" ${attr} aria-label="Obavijesti">${ic('bell', 22)}${novihObavijesti() ? `<span class="nb">${novihObavijesti()}</span>` : ''}</button>`;
const bellList = () => { const l = OBAVIJESTI[uloga()] || []; return l.length ? `<div class="list">${l.map((n) => `<div class="row notif ${n.nova ? 'new' : ''}"><span class="n-ico">${ic('bell', 16)}</span><div class="grow"><h3 style="font-size:var(--fs-sm)">${n.naslov}</h3><div class="meta" style="color:var(--text)">${n.tekst}</div><div class="meta">${n.vr}</div></div></div>`).join('')}</div>` : '<p class="meta" style="text-align:center;padding:12px 0">Nema obavijesti.</p>'; };
const markRead = () => { (OBAVIJESTI[uloga()] || []).forEach((n) => (n.nova = false)); document.querySelectorAll('.bell .nb').forEach((x) => x.remove()); };
const awarded = {};

/* ---------- početna igračice: današnji trening (dolazim / ne dolazim) i iduća utakmica ---------- */
const DANAS_TRENING = { grupa: 'U14', vrijeme: '17:30', dvorana: 'OŠ Ante Kovačića', dan: 'utorak 24.11.' };
const PROTO_SADA = '12:10'; // "trenutno vrijeme" u prototipu
const minuta = (hm) => { const [h, m] = hm.split(':').map(Number); return h * 60 + m; };
const rsvpRok = () => { const m = minuta(DANAS_TRENING.vrijeme) - 180; return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`; };
const rsvpOtvoren = () => minuta(PROTO_SADA) <= minuta(rsvpRok());
const UTAKMICA = { grupa: 'U14', natjecanje: 'Prvenstvo U14', datum: 'Subota 28.11.2026.', vrijeme: '11:00', termin: false, dvorana: false };
const tjedanStavke = () => DANI.flatMap((d, i) => (TRENINZI[i] || []).filter((t) => t.g === 'U14').map((t) => ({ d, i, t })));
function tjedanKartica() {
  return `<div class="card week-dots" data-tjedan><div class="wk-head"><h3>Treninzi ovaj tjedan</h3><div class="wd-row">${tjedanStavke().map((s) => `<i class="${dotCls(s.i, s.t)}"></i>`).join('')}<span class="wd-chev">${ic('chev', 18)}</span></div></div>
    <div class="wk-detail"><div class="list">${tjedanStavke().map((s) => `<div class="row"><i class="${dotCls(s.i, s.t)} big"></i><div class="grow"><h3 style="font-size:var(--fs-sm)">${DANI_PUNO[s.i]} ${23 + s.i}.11. · ${s.t.v}–${s.t.do}</h3><div class="meta">${dolazakTekst(s.i, s.t)}</div></div></div>`).join('')}</div></div></div>`;
}
/* ---------- dulji izostanak (bolesna, izlet…) ---------- */
const IZ_RAZLOZI = ['Bolesna sam', 'Putovanje', 'Ozljeda', 'Loše ocjene', 'U kazni sam'];
const IZ_TRAJANJA = [{ k: 2, l: '2 dana' }, { k: 3, l: '3 dana' }, { k: 7, l: 'Tjedan dana' }, { k: 0, l: 'Dok ne deaktiviram' }];
const izPokriva = (i) => !!state.izostanak && i >= TODAY && (state.izostanak.do === null || i <= state.izostanak.do);
const izDo = (iz) => (iz.do === null ? 'dok ne deaktiviraš' : `do ${23 + iz.do}.11.`);
function izostanakKartica() {
  const iz = state.izostanak;
  return iz
    ? `<div class="card izostanak active"><div class="row spread"><div><div class="meta">Dulji izostanak je aktivan</div><h3>${iz.razlog} · ${izDo(iz)}</h3><div class="meta">Treninzi u tom razdoblju automatski su označeni kao opravdani izostanak.</div></div></div>
        <button class="btn ghost block sm" data-izend>Vratila sam se — završi izostanak</button></div>`
    : `<div class="card izostanak"><div class="row spread"><div><h3>Dulji izostanak</h3><div class="meta">Bolesna si ili te nema nekoliko dana? Javi jednom, ne za svaki trening.</div></div></div>
        <button class="btn navy block sm" data-izopen>Javi izostanak</button></div>`;
}
function izostanakSheet() {
  state.izForm = { razlog: IZ_RAZLOZI[0], dana: 3 };
  overlay(`<h2>Dulji izostanak</h2><div class="meta" style="margin-top:-4px">Razlog</div>
    <div class="sizes">${IZ_RAZLOZI.map((r, k) => `<button type="button" class="size ${k === 0 ? 'on' : ''}" data-izrazlog="${r}">${r}</button>`).join('')}</div>
    <div class="meta">Koliko dugo (od danas)</div>
    <div class="sizes">${IZ_TRAJANJA.map((t) => `<button type="button" class="size ${t.k === 3 ? 'on' : ''}" data-izdana="${t.k}">${t.l}</button>`).join('')}</div>
    <p class="meta" id="izNote">${izNote()}</p>
    <button class="btn red block" data-izsend>Javi izostanak</button><button class="btn ghost block" data-fxclose>Odustani</button>`);
}
const izNote = () => { const d = state.izForm.dana; return d === 0 ? 'Izostanak traje dok ga sama ne završiš. Trener i roditelj dobivaju obavijest.' : `Izostanak do ${23 + TODAY + d - 1}.11. Trener i roditelj dobivaju obavijest.`; };
function sutraRed() {
  const sutra = (TODAY + 1) % 7; const lista = (TRENINZI[sutra] || []).filter((t) => t.g === 'U14');
  let sljedeci = ''; if (!lista.length) { for (let k = 2; k < 8; k++) { const d = (TODAY + k) % 7; const t = (TRENINZI[d] || []).find((x) => x.g === 'U14'); if (t) { sljedeci = ` · sljedeći: ${DANI_PUNO[d].toLowerCase()} ${23 + d}.11. u ${t.v}`; break; } } }
  const tekst = lista.length ? lista.map((t) => `${t.v}–${t.do} · ${grupaLabel(t.g)} · ${t.d}`).join(', ') : `nema treninga${sljedeci}`;
  return `<div class="next-day"><b>Sutra, ${DANI_PUNO[sutra].toLowerCase()} ${23 + sutra}.11.</b><span>${tekst}${lista.length && izPokriva(sutra) ? ' · izostanak javljen' : ''}</span></div>`;
}
function treningKartica() {
  const iz = izPokriva(TODAY); const r = state.rsvp; const otv = rsvpOtvoren() && !iz;
  const poruka = iz ? `<div class="rsvp-msg no">Izostanak javljen: ${state.izostanak.razlog} (${izDo(state.izostanak)})</div>` : r === 'da' ? `<div class="rsvp-msg ok">${ic('check', 16)} ${state.rsvpTko === 'roditelj' ? 'Roditelj je javio da dolaziš.' : 'Javila si da dolaziš.'} Vidimo se!</div>`
    : r === 'ne' ? `<div class="rsvp-msg no">${state.rsvpTko === 'roditelj' ? 'Roditelj je javio da ne dolaziš.' : 'Javila si da ne dolaziš.'}</div>`
    : otv ? `<div class="rsvp-msg warn">Molim te budi odgovorna i javi na vrijeme.</div>`
    : `<div class="rsvp-msg warn">Prijave su zatvorene — nisi se javila.</div>`;
  return `<div class="card stack tight"><div class="row"><div class="time-block gold sm"><b>${DANAS_TRENING.vrijeme}</b><span>Danas</span></div><div class="grow"><div class="meta">Današnji trening</div><h3>${grupaLabel(DANAS_TRENING.grupa)} · ${DANAS_TRENING.dan}</h3><div class="meta">${DANAS_TRENING.dvorana}${iz ? '' : otv ? ` · javi se do ${rsvpRok()}` : ` · prijave zatvorene u ${rsvpRok()}`}</div></div></div>
    <div class="rsvp"><button class="${r === 'da' ? 'on yes' : ''}" data-rsvp="da" ${otv ? '' : 'disabled'}>${ic('check', 18)} Dolazim</button><button class="${r === 'ne' ? 'on no' : ''}" data-rsvp="ne" ${otv ? '' : 'disabled'}>${ic('x', 18)} Ne dolazim</button></div>
    ${poruka}${sutraRed()}</div>`;
}
function roditeljTrening(p) {
  const iz = izPokriva(TODAY); const r = state.rsvp; const otv = rsvpOtvoren() && !iz; const ime = p.ime.split(' ')[0];
  const poruka = iz ? `<div class="rsvp-msg no">Izostanak javljen: ${state.izostanak.razlog} (${izDo(state.izostanak)})</div>`
    : r ? `<div class="rsvp-msg ${r === 'da' ? 'ok' : 'no'}">${state.rsvpTko === 'roditelj' ? `Javio si da ${ime} ${r === 'da' ? 'dolazi' : 'ne dolazi'}.` : `${ime} je javila da ${r === 'da' ? 'dolazi' : 'ne dolazi'}.`}</div>`
    : otv ? `<div class="rsvp-msg warn">${ime} se još nije javila. Možeš javiti ti.</div>` : `<div class="rsvp-msg warn">Prijave su zatvorene.</div>`;
  return `<div class="par-train"><div class="meta">Današnji trening · ${DANAS_TRENING.vrijeme} · ${DANAS_TRENING.dvorana}${iz ? '' : otv ? ` · javi do ${rsvpRok()}` : ''}</div>
    <div class="rsvp"><button class="${r === 'da' ? 'on yes' : ''}" data-rsvpr="da" ${otv ? '' : 'disabled'}>${ic('check', 18)} Dolazi</button><button class="${r === 'ne' ? 'on no' : ''}" data-rsvpr="ne" ${otv ? '' : 'disabled'}>${ic('x', 18)} Ne dolazi</button></div>${poruka}</div>`;
}
/* ---------- potvrda dolaska na utakmicu ---------- */
const utkOtvoreno = () => !!state.utkPopis; // potvrda dolaska otvara se kad trener objavi popis
const utkNaPopisu = () => !state.utkOtkaz; // roditelj može unaprijed otkazati igračicu
const UTK_NAPOMENA = () => `<div class="rsvp-msg warn">Popis igračica za utakmicu još nije objavljen. Kad izađe, ovdje javi dolazi li.</div>`;
const UTK_KANDIDATI = PLAYERS.slice(0, 10); // igračice iz kojih trener slaže popis (izmišljeno)
const utkPozvane = () => UTK_KANDIDATI.filter((p) => p.id !== IGR_ID || utkNaPopisu());
const UTK_ODG = { 2: 'da', 3: 'da', 4: 'ne', 5: 'da', 7: 'da' }; // odgovori ostalih pozvanih; Ana (IGR_ID) odgovara sama ili roditelj
const utkOdg = (id) => (id === IGR_ID ? state.utkOdg : UTK_ODG[id]) || null;
const utkBrojevi = () => { const o = utkPozvane().map((p) => utkOdg(p.id)); return { ukupno: o.length, da: o.filter((x) => x === 'da').length, ne: o.filter((x) => x === 'ne').length, ceka: o.filter((x) => !x).length }; };
function utkPoruka(kao) { // kao: 'igracica' | 'roditelj'
  const r = state.utkOdg, tko = state.utkTko;
  if (!r) return `<div class="rsvp-msg warn">${kao === 'roditelj' ? 'Ana je pozvana na utakmicu. Potvrdi što prije.' : 'Pozvana si na utakmicu — potvrdi što prije.'} Treneru treba broj igračica.</div>`;
  const dolazi = r === 'da';
  if (kao === 'roditelj') return `<div class="rsvp-msg ${dolazi ? 'ok' : 'no'}">${tko === 'roditelj' ? `Javio si da Ana ${dolazi ? 'dolazi' : 'ne dolazi'} na utakmicu.` : `Ana je javila da ${dolazi ? 'dolazi' : 'ne dolazi'} na utakmicu.`}</div>`;
  return `<div class="rsvp-msg ${dolazi ? 'ok' : 'no'}">${tko === 'roditelj' ? `Roditelj je javio da ${dolazi ? 'dolaziš' : 'ne dolaziš'} na utakmicu.` : `Javila si da ${dolazi ? 'dolaziš' : 'ne dolaziš'} na utakmicu.`}</div>`;
}
const utkGumbi = (attr, da, ne) => `<div class="rsvp"><button class="${state.utkOdg === 'da' ? 'on yes' : ''}" ${attr}="da">${ic('check', 18)} ${da}</button><button class="${state.utkOdg === 'ne' ? 'on no' : ''}" ${attr}="ne">${ic('x', 18)} ${ne}</button></div>`;
function roditeljUtakmica(p) {
  const u = UTAKMICA; const ime = p.ime.split(' ')[0];
  let tijelo;
  if (state.utkOtkaz) tijelo = `<div class="rsvp-msg no">Javio si da ${ime} ne može na utakmicu. Treneri je neće staviti na popis.</div><button class="btn ghost block sm" data-utkotkaz="0">Ipak može</button>`;
  else if (!utkOtvoreno()) tijelo = `<div class="rsvp-msg warn">Popis još nije objavljen. Ako ${ime} ne može, javi odmah da je treneri ne stavljaju na popis.</div><button class="btn ghost block sm" data-utkotkaz="1">${ic('x', 16)} ${ime} ne može na utakmicu</button>`;
  else tijelo = utkGumbi('data-utkr', 'Dolazi', 'Ne dolazi') + utkPoruka('roditelj');
  return `<div class="par-train"><div class="meta">Iduća utakmica · ${u.datum} ${u.vrijeme} · ${u.natjecanje}</div>${tijelo}</div>`;
}
function utkTrenerKartica() {
  const b = utkBrojevi(); const u = UTAKMICA;
  if (!utkOtvoreno()) return `<div class="card stack tight"><div class="row"><div class="time-block sm"><b>${u.vrijeme}</b><span>Sub</span></div><div class="grow"><div class="meta">Iduća utakmica · ${u.datum}</div><h3>${u.natjecanje}</h3></div></div>${utkFlags()}
    <div class="utk-skip"><b>Ne mogu na utakmicu</b>${state.utkOtkaz ? `<div class="utk-p"><span>Ana Horvat</span><i class="utk-s no">roditelj javio</i></div><div class="meta">Ne stavljaj je na popis.</div>` : '<div class="meta">Za sada nitko nije javio da ne može.</div>'}</div>
    <button class="btn red block sm" data-utkobjavi>Objavi popis (${utkPozvane().length} igračica)</button><div class="meta">Kad objaviš popis, pozvane igračice i roditelji potvrđuju dolazak.</div></div>`;
  const st = (id) => { const o = utkOdg(id); return o === 'da' ? ['Dolazi', 'ok'] : o === 'ne' ? ['Ne dolazi', 'no'] : ['Čeka', 'wait']; };
  return `<div class="card stack tight utk-tr"><div class="row"><div class="time-block sm"><b>${u.vrijeme}</b><span>Sub</span></div><div class="grow"><div class="meta">Iduća utakmica · ${u.datum}</div><h3>${u.natjecanje}</h3></div></div>
    <div class="utk-count"><div class="ok"><b>${b.da}</b><span>dolazi</span></div><div class="no"><b>${b.ne}</b><span>ne dolazi</span></div><div class="wait"><b>${b.ceka}</b><span>čeka</span></div></div>
    <div class="progress"><i style="width:${Math.round((b.da + b.ne) / b.ukupno * 100)}%"></i></div><div class="meta">Odgovorilo ${b.da + b.ne} od ${b.ukupno} pozvanih</div>
    <div class="utk-list">${utkPozvane().map((p) => { const [t, c] = st(p.id); return `<div class="utk-p"><span>${p.ime}</span><i class="utk-s ${c}">${t}${p.id === IGR_ID && state.utkOdg && state.utkTko === 'roditelj' ? ' · roditelj' : ''}</i></div>`; }).join('')}</div>
    ${b.ceka ? `<button class="btn ghost block sm" data-utkpodsjeti>${ic('bell', 16)} Podsjeti one koje čekaju (${b.ceka})</button>` : ''}</div>`;
}
const utkFlags = () => `<div class="match-flags">${UTAKMICA.termin ? `<span class="okf">${ic('check', 14)} Datum i vrijeme potvrđeni</span>` : `<span>${ic('cal', 14)} Datum i vrijeme još nisu potvrđeni</span>`}${UTAKMICA.dvorana ? `<span class="okf">${ic('check', 14)} ${UTAKMICA.dvorana}</span>` : `<span>${ic('pin', 14)} Dvorana još nije potvrđena</span>`}</div>`;
function utakmicaKartica() {
  const u = UTAKMICA;
  return `<div class="card stack tight"><div class="row"><div class="time-block sm"><b>${u.vrijeme}</b><span>Sub</span></div><div class="grow"><div class="meta">Iduća utakmica</div><h3>${u.natjecanje}</h3><div class="meta">${u.datum} u ${u.vrijeme}</div></div></div>
    ${utkFlags()}
    ${state.utkOtkaz ? `<div class="rsvp-msg no">Roditelj je javio da ne možeš na ovu utakmicu. Treneri te neće staviti na popis.</div>`
      : utkOtvoreno() ? `<div class="meta"><b>Na popisu si.</b> Potvrdi dolazak što prije.</div>${utkGumbi('data-utk', 'Dolazim', 'Ne dolazim')}${utkPoruka('igracica')}` : UTK_NAPOMENA()}</div>`;
}

/* ---------- mobilni zajednički dijelovi ---------- */
function mHeader(naslov, sub, foto = false, cog = true) {
  return `<div class="app-header ${foto ? 'hero' : ''}"><div class="row">${badge()}
    <div class="grow"><h1>${naslov}</h1><div class="sub">${sub}</div></div>
    ${cog && uloga() !== 'roditelj' ? `<button class="cog qr" data-hdrqr aria-label="Skeniraj QR kod">${ic('qr', 22)}</button>` : ''}${cog ? bellBtn() : ''}${cog ? `<button class="cog" data-opt aria-label="Opcije">${ic('cog', 22)}</button>` : ''}</div>
    ${foto ? `<img class="hero-photo" src="${FOTO}" alt="">` : ''}</div>`;
}
function tabbar(uloga, tabs, aktivan) {
  return `<nav class="tabbar">${tabs.map(([id, label, icon]) =>
    `<button class="${id === aktivan ? 'on' : ''}" data-go="${uloga}-${id}"><span class="ico">${ic(icon, 22)}${id === 'novosti' && neprocitano(uloga) ? '<i class="tab-dot"></i>' : ''}</span>${label}</button>`).join('')}</nav>`;
}
function trenRow(t, extra = '') {
  return `<div class="row"><div class="time-block"><b>${t.v}</b><span>do ${t.do}</span></div>
    <div class="grow"><h3>${grupaLabel(t.g)}</h3><div class="meta">${t.d}</div></div>${extra}</div>`;
}
const grupaLabel = (g) => (g === 'U14' ? 'U14/U16/U18' : g); // zajednički trening
const DANI_PUNO = ['Ponedjeljak', 'Utorak', 'Srijeda', 'Četvrtak', 'Petak', 'Subota', 'Nedjelja'];
const RASPORED_NAPOMENA = `<div class="sched-note">${ic('cal', 16)}<span>Raspored za idući tjedan ažurira se <b>nedjeljom u podne</b>.</span></div>`;
// status dolaska po terminu: 'da' | broj minuta kašnjenja (računa se kao dolazak) | 'ne'; bez zapisa = trening još nije bio
const DOLAZAK_TJEDAN = { '0-U14-17:30': 'da' }; // prototip: Ana je bila na ponedjeljkovom treningu
const dolazak = (i, t) => DOLAZAK_TJEDAN[`${i}-${t.g}-${t.v}`];
const dolazakStatus = (i, t) => { const v = dolazak(i, t); return v === undefined ? (i < TODAY ? 'ne' : 'cekaj') : v === 'da' ? 'da' : v === 'ne' ? 'ne' : 'kasni'; };
const dotCls = (i, t) => (dolazakStatus(i, t) === 'cekaj' && izPokriva(i) ? 'dot-exc' : ({ da: 'dot-yes', kasni: 'dot-late', ne: 'dot-no', cekaj: 'dot-wait' })[dolazakStatus(i, t)]);
const minute = (n) => `${n} ${n % 10 === 1 && n % 100 !== 11 ? 'minutu' : [2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100) ? 'minute' : 'minuta'}`;
const dolazakTekst = (i, t) => { const s = dolazakStatus(i, t), v = dolazak(i, t); if (s === 'cekaj' && izPokriva(i)) return `Opravdani izostanak: ${state.izostanak.razlog}`; return { da: 'Bila si i odradila', kasni: `Kasnila ${minute(v)}`, ne: 'Nisi bila', cekaj: 'Još nije bio trening' }[s]; };
// utakmice igračice: 'igrala' (odigrane) i 'pozvana' (na popisu za iduću) — izmišljeni podaci
const UTAKMICE_IGR = [
  { dat: 'Sub 28.11.', vr: '11:00', opis: 'Prvenstvo U14', st: 'pozvana', nap: 'termin nije potvrđen' },
  { dat: 'Sub 22.11.', vr: '', opis: 'Prvenstvo U14 · ŽKK Primjer 2', st: 'igrala', rez: '54 : 48' },
  { dat: 'Sub 15.11.', vr: '', opis: 'Prvenstvo U14 · ŽKK Primjer 1', st: 'igrala', rez: '41 : 47' },
];
const utakmiceIgr = () => `<div class="card sched-matches"><h3>Utakmice</h3>${UTAKMICE_IGR.map((u) => `<div class="mt"><div class="mt-d"><b>${u.dat}</b><span>${u.vr || 'odigrano'}</span></div>
  <div class="mt-o"><b>${u.opis}</b>${u.nap ? `<small>${u.nap}</small>` : ''}</div>
  ${u.st === 'pozvana' ? (state.utkOtkaz ? chip('Ne možeš', 'danger') : !utkOtvoreno() ? chip('Čeka popis') : state.utkOdg ? chip(state.utkOdg === 'da' ? 'Dolaziš' : 'Ne dolaziš', state.utkOdg === 'da' ? 'ok' : 'danger') : chip('Potvrdi dolazak', 'warn')) : `<span class="mt-r ${+u.rez.split(' : ')[0] > +u.rez.split(' : ')[1] ? 'w' : 'l'}">${u.rez}</span>`}</div>`).join('')}</div>`;
function rasporedScreen(filterGrupe, tocke = false, tockeGrupe = []) {
  const redovi = DANI_PUNO.map((ime, i) => {
    const lista = (TRENINZI[i] || []).filter((t) => !filterGrupe || filterGrupe.includes(t.g));
    return `<div class="sd ${i === TODAY ? 'today' : ''} ${i < TODAY ? 'past' : ''}"><div class="sd-day"><b>${DANI[i]}</b><span>${23 + i}.11.</span></div>
      <div class="sd-list">${lista.length ? lista.map((t) => `<div class="sd-t"><b>${t.v}–${t.do}</b><span>${grupaLabel(t.g)}</span><small>${t.d}</small>${(tocke || tockeGrupe.includes(t.g)) && (i < TODAY || dolazak(i, t) || izPokriva(i)) ? `<i class="${dotCls(i, t)}"></i>` : ''}</div>`).join('') : '<div class="sd-none">—</div>'}</div></div>`;
  }).join('');
  return `${RASPORED_NAPOMENA}<div class="card sched-week">${redovi}</div>${tocke ? izostanakKartica() + utakmiceIgr() : ''}`;
}

/* ---------- PROFIL IGRAČICE (isti sadržaj, vidljivost po ulozi) ---------- */
const MAJICA = ['140', '152', '164', '152', '140', '128', '152', '164', '164', '164', 'M', '116'];
const kategorija = (p) => p.grupe.includes('Škola košarke') ? 'škola košarke' : p.god >= 2014 ? 'U12' : p.god >= 2012 ? 'U14' : p.god >= 2010 ? 'U16' : 'SEN';
function detalji(p) {
  const i = p.id;
  return { rod: `${String((i * 3) % 27 + 1).padStart(2, '0')}.${String((i * 5) % 12 + 1).padStart(2, '0')}.${p.god}.`,
    oib: `5432109876${i % 10}`, adresa: `Ulica primjera ${i + 3}, 10000 Zagreb`, mob: `09${i % 9 + 1} ${100 + i * 7} ${1000 + i * 13}`,
    email: `${p.roditelj.split(' ').pop().toLowerCase().replace(/[čćž]/g, 'c')}@example.com`, majica: MAJICA[(i - 1) % MAJICA.length],
    dolaznost: i === 1 ? 91 : 70 + (i * 7) % 28, treninga: 36 + (i * 5) % 20, od: i % 3 === 0 ? '2024.' : '2023.', zadnjaUplata: '24.11.2026.' };
}
const kv = (k, v) => `<div class="pf-kv"><span>${k}</span><b>${v}</b></div>`;
const NOGE = Array.from({ length: 20 }, (_, k) => String(28 + k)); // 28–47
const velOd = (p) => { state.vel = state.vel || {}; return state.vel[p.id] || (state.vel[p.id] = { majica: null, noga: null }); };
function profilBody(p, uloga) {
  const d = detalji(p); const vl = velOd(p); const admin = uloga === 'admin', trener = uloga === 'trener', roditelj = uloga === 'roditelj';
  const natrag = { admin: ['admin-clanovi', 'Članovi'], trener: ['trener-dolasci', 'Dolasci'], roditelj: ['roditelj-pocetna', 'Početna'] }[uloga];
  const hero = `${natrag ? `<a class="link back pf-back" data-go="${natrag[0]}">← ${natrag[1]}</a>` : ''}
    <div class="card pf-hero">${av(p, 'xl')}<h2>${p.ime}</h2>
      <div class="row" style="justify-content:center;flex-wrap:wrap;gap:6px">${p.grupe.map((x) => chip(x, 'navy')).join('')}</div>
      <div class="meta">Članica od ${d.od} · kategorija ${kategorija(p)}</div></div>
    <div class="pf-stats"><div class="card"><b>${d.dolaznost}%</b><span>Dolaznost</span></div><div class="card"><b>${d.treninga}</b><span>Treninga</span></div><div class="card">${clan(p.clanarina)}<span>Članarina</span></div></div>`;
  const osobno = `<div class="card pf-sec"><h4>Osobni podaci</h4>${kv('Datum rođenja', d.rod)}
    ${(admin || roditelj) ? kv('Adresa', d.adresa) : ''}${admin ? kv('OIB', d.oib) : ''}</div>`;
  const nedostaje = !vl.majica || !vl.noga;
  const velicine = (roditelj || uloga === 'igracica') ? `<div class="card pf-sec vel-card ${nedostaje ? 'missing' : ''}"><button class="vel-edit" data-velopen="${p.id}" aria-label="Uredi veličine">${ic('edit', 18)}</button><h4>Moje veličine</h4>
    <div class="vel-line"><span>Veličina majice</span><b class="${vl.majica ? '' : 'vel-empty'}">${vl.majica || '??'}</b></div>
    <div class="vel-line"><span>Veličina noge</span><b class="${vl.noga ? '' : 'vel-empty'}">${vl.noga || '??'}</b></div>
    <div class="vel-help"><b>Veličine odjevnih predmeta iz Ormara</b><div>Majice: 116–128 = Kids XS · 140 = Kids M · 152 = Kids L · 164 = Kids XL · XS–XL = odrasle</div><div>Čarape: 37–41 ili 42–46 (prema veličini noge)</div></div></div>` : '';
  const velRO = (admin || trener) ? `<div class="card pf-sec"><h4>Veličine (Ormar)</h4>${kv('Veličina majice', vl.majica || '—')}${kv('Veličina noge', vl.noga || '—')}</div>` : '';
  const treninzi = `<div class="card pf-sec"><h4>Grupe i treninzi</h4>${p.grupe.map((g) => { const gr = GROUPS.find((x) => x.ime === g); return kv(g, gr ? gr.raspored : ''); }).join('')}
    ${kv('Trener', GROUPS.find((x) => x.ime === p.grupe[0]).trener)}</div>`;
  const clanarina = (admin || roditelj || uloga === 'igracica') ? `<div class="card pf-sec"><h4>Članarina</h4>${kv('Status', clan(p.clanarina))}${kv('Zadnja uplata', d.zadnjaUplata)}
    ${admin ? `<button class="btn ghost block" data-toast="Povijest uplata — sljedeći korak">Povijest uplata</button>` : ''}</div>` : '';
  const falco = trener ? '' : `<div class="card pf-sec"><h4>Falcoini</h4>${kv('Stanje', fc(FALCOINI[p.id] || 0))}</div>`;
  const kontakt = (admin || trener) ? `<div class="card pf-sec"><h4>Roditelj / kontakt</h4>${kv('Ime', p.roditelj)}${kv('Mobitel', d.mob)}${admin ? kv('E-mail', d.email) : ''}</div>` : '';
  const potvrde = (admin || roditelj) ? `<div class="card pf-sec"><h4>Potvrde i privole</h4>${kv('Potvrda 2026/27', `kategorija ${kategorija(p)}`)}${kv('Pravila privatnosti', 'prihvaćeno 2023.')}${kv('Fotografija', p.foto ? 'dopuštena' : 'dopuštena, fotografija još nije dodana')}
    ${admin ? `<button class="btn ghost block" data-toast="U pravoj aplikaciji se ovdje preuzima PDF potvrde">Preuzmi potvrdu (PDF)</button>` : ''}</div>` : '';
  const akcije = admin ? `<div class="pf-actions"><button class="btn" data-toast="Uređivanje profila — sljedeći korak">Uredi podatke</button><button class="btn ghost" data-toast="Učitavanje fotografije — sljedeći korak">${ic('upload', 18)} Fotografija</button><button class="btn ghost" data-toast="Promjena grupe — sljedeći korak">Promijeni grupu</button></div>` : '';
  return hero + `<div class="pf-grid">${osobno}${velicine}${velRO}${treninzi}${falco}${clanarina}${kontakt}${potvrde}</div>${akcije}`;
}
const profilIgr = () => PLAYERS.find((x) => x.id === state.profil) || PLAYERS[0];
/* ---------- NOVOSTI ---------- */
const OZNAKE = { 'Važno': 'danger', 'Klub': 'navy', 'Trening': 'ok', 'Članarina': 'warn', 'Škola košarke': 'navy' };
const novostiRoditelj = () => NOVOSTI.filter((n) => n.grupa === 'Svi' || ['U14', 'Škola košarke'].includes(n.grupa))
  .sort((a, b) => (b.pin ? 1 : 0) - (a.pin ? 1 : 0));
// Novosti vide svi: roditelj, igračica (grupa U14 + Svi) i trener (njegove grupe + Svi); pročitano se pamti po ulozi
const novostiZa = () => novostiRoditelj();
const citanoSet = (ul = uloga()) => (state.citanoPo[ul] = state.citanoPo[ul] || new Set([3, 4]));
const neprocitano = (ul = uloga()) => novostiZa().filter((n) => !citanoSet(ul).has(n.id)).length;
const novostiTeaser = (ul) => `<div class="card news-teaser" data-go="${ul}-novosti"><div class="row spread"><div class="row" style="gap:8px"><span class="pin">${ic('bell', 14)}</span><h3>Novosti</h3></div>${neprocitano() ? chip(neprocitano() + ' novo', 'warn') : ''}</div>
  <div class="meta" style="margin-top:6px">${novostiZa()[0].naslov}</div></div>`;
const novostiScreen = (ul, tabs) => ({
  header: mHeader('Novosti', neprocitano() ? `${neprocitano()} nepročitano` : 'Sve pročitano'),
  tabs, body: novostiZa().map(novostCard).join(''),
});
function novostCard(n) {
  const nova = !citanoSet().has(n.id);
  return `<div class="card news ${nova ? 'unread' : ''}" data-news="${n.id}">
    <div class="row spread"><div class="row" style="gap:8px">${n.pin ? `<span class="pin">${ic('bell', 14)}</span>` : ''}${chip(n.oznaka, OZNAKE[n.oznaka] || 'navy')}${n.grupa !== 'Svi' ? chip(n.grupa) : ''}</div>
      <span class="meta">${n.dat}</span></div>
    <h3>${nova ? '<i class="dot"></i>' : ''}${n.naslov}</h3><p class="news-text">${n.tekst}</p><span class="more">Prikaži više</span></div>`;
}
/* ---------- FALCOINI I ORMAR ---------- */
const coinSvg = (s = 18) => `<svg class="fcoin" width="${s}" height="${s}" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="#F0B64E"/><circle cx="12" cy="12" r="8.6" fill="none" stroke="#C98A1B" stroke-width="1.3"/><text x="12" y="16.4" text-anchor="middle" font-family="Montserrat,sans-serif" font-weight="900" font-size="12.5" fill="#182454">F</text></svg>`;
const FLC = 'FLC'; // kratica valute Falcoin
const r2 = (n) => Math.round(n * 100) / 100;
const fmt = (n) => r2(n).toFixed(2).replace('.', ',');
const fc = (n, s = 16) => `<span class="fc">${coinSvg(s)}<b>${typeof n === 'number' ? fmt(n) : n}</b><small class="flc">${FLC}</small></span>`;
const IGR_ID = 1; // prototip: prijavljena igračica je Ana Horvat
const saldo = () => FALCOINI[IGR_ID];
const plus = (n) => `<b class="amt ${n < 0 ? 'neg' : 'pos'}">${n > 0 ? '+' : ''}${fmt(n)} ${FLC}</b>`;
const pravilo = (k) => FALCOIN_PRAVILA.find((r) => r.k === k).iznos;
const toastIn = (msg) => { const t = $('#toastIn'); if (!t) return; t.textContent = msg; t.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 2200); };
function overlay(html, cls = '') {
  const dev = $('.device'); if (!dev) return;
  const old = dev.querySelector('.m-overlay.fx'); if (old) old.remove();
  const o = document.createElement('div'); o.className = `m-overlay fx ${cls}`; o.innerHTML = `<div class="m-sheet">${html}</div>`; dev.appendChild(o);
}
const closeOverlay = () => { const o = document.querySelector('.m-overlay.fx'); if (o) o.remove(); };
function scanSheet() {
  overlay(`<div class="viewfinder"><i class="c tl"></i><i class="c tr"></i><i class="c bl"></i><i class="c br"></i><div class="laser"></div>${ic('qr', 54)}</div>
    <h2>Skeniraj QR kod</h2><p>Usmjeri kameru na QR kod koji prikazuje trener.</p>
    <button class="btn red block" data-scanok>Simuliraj skeniranje</button><button class="btn ghost block" data-fxclose>Odustani</button>
    <small>Samo u prototipu: u pravoj aplikaciji se ovdje otvara kamera.</small>`);
}
function scanResult() {
  if (state.skenirano) { overlay(`<div class="scan-res warn">${ic('check', 34)}</div><h2>Već si evidentirana</h2><p>Dolazak za ovaj trening je već spremljen.</p><button class="btn block" data-fxclose>U redu</button>`); return; }
  const n = pravilo('trening'); state.skenirano = true; awarded[IGR_ID] = true; att[IGR_ID] = true; FALCOINI[IGR_ID] = r2(FALCOINI[IGR_ID] + n); FALCOIN_POVIJEST.unshift({ dat: 'Danas', opis: 'Trening U14 · 17:30', iznos: n });
  overlay(`<div class="scan-res">${coinSvg(64)}</div><h2>Dolazak spremljen!</h2><div class="scan-plus">+${fmt(n)} ${FLC}</div>
    <p>U14 · OŠ Ante Kovačića · 17:30<br>Novo stanje: <b>${fmt(saldo())} ${FLC}</b></p><button class="btn red block" data-fxclose>Super</button>`);
}
function redeemSheet(id) {
  const a = ORMAR.find((x) => x.id === id); const max = r2(Math.min(a.cijena, saldo()));
  const prva = a.velicine.find((v) => v.v === velOdabrana(a)) || a.velicine[0];
  state.redeem = { id, f: max, size: prva.v };
  overlay(`${itemTile(a, 'big')}<h2>${a.ime}</h2>${a.opis ? `<div class="meta" style="margin-top:-4px">${a.opis}</div>` : ''}
    <div class="sizes">${a.velicine.map((v) => `<button type="button" class="size ${v.v === prva.v ? 'on' : ''} ${!(v.n > 0) ? 'pre' : ''}" data-size="${v.v}">${v.v}<small>${!(v.n > 0) ? 'predbilježba' : `${v.n} kom`}</small></button>`).join('')}</div>
    <div class="meta">Cijena <b>${fmt(a.cijena)} ${FLC}</b> (1 ${FLC} = 1 €)</div>
    <div class="split"><div class="split-row"><span>Plaćam Falcoinima</span><b id="rdF">${fmt(max)} ${FLC}</b></div>
      <input type="range" class="slider" min="0" max="${max}" step="0.01" value="${max}" data-fcslider ${max === 0 ? 'disabled' : ''}>
      <div class="split-row cash"><span>Doplaćujem gotovinom</span><b id="rdC">${fmt(a.cijena - max)} €</b></div></div>
    <p id="rdNote">${rdNote(a, max)}</p>
    <button class="btn red block" id="rdBtn" data-redeemok="${id}">${rdBtn(a, max, prva.v)}</button><button class="btn ghost block" data-fxclose>Odustani</button>`);
}
const rdBtn = (a, f, vel) => { const v = a.velicine.find((x) => x.v === vel) || {}; return !(v.n > 0) ? 'Predbilježi' : f >= a.cijena - 0.004 ? 'Zamijeni' : 'Zamijeni + doplati'; };
const rdNote = (a, f) => { const v = a.velicine.find((x) => x.v === (state.redeem || {}).size) || {}; return `Stanje nakon narudžbe: <b>${fmt(saldo() - f)} ${FLC}</b><br>${!(v.n > 0) ? 'Predbilježba: javimo ti kad artikl stigne. ' : ''}${a.cijena - f > 0.004 ? 'Gotovinu doplaćuješ pri preuzimanju kod trenera.' : 'Artikl preuzimaš kod trenera na treningu.'}`; };
function falcoiniHistory() {
  return `<div class="card"><div class="list">${FALCOIN_POVIJEST.map((t) => `<div class="row"><div class="grow"><h3 style="font-size:var(--fs-sm)">${t.opis}</h3><div class="meta">${t.dat}</div></div>${plus(t.iznos)}</div>`).join('')}</div></div>`;
}
const zaliha = (a) => a.velicine.reduce((s, v) => s + (v.n || 0), 0);
const imaPre = (a) => a.velicine.some((v) => v.n === null);
const itemTile = (a, cls = '', nota = '') => `<div class="item-tile ${cls}">${a.ime.replace(/[^A-Za-zČĆŠŽĐčćšžđ]/g, '').charAt(0)}<img src="${a.slika}" alt="" loading="lazy" onerror="this.remove()">${nota ? `<span class="tile-note">${nota}</span>` : ''}</div>`;
const cijenaHtml = (a, s = 16) => `<span class="price">${a.staraCijena ? `<s>${fmt(a.staraCijena)}</s>` : ''}${fc(a.cijena, s)}</span>`;
/* moja veličina iz profila → veličina u Ormaru (dječje brojeve mapiramo na Kids veličine) */
const KIDS = { '116': 'Kids XS', '128': 'Kids XS', '140': 'Kids M', '152': 'Kids L', '164': 'Kids XL' };
const mojaVel = (a) => { const vl = velOd(PLAYERS[0]); const noga = +vl.noga;
  return a.velicine.find((v) => { const r = v.v.match(/^(\d+)[–-](\d+)$/); if (r) return noga >= +r[1] && noga <= +r[2]; if (v.v === 'Jedna veličina') return true; return v.v === (KIDS[vl.majica] || vl.majica); }); };
const jednaVel = (a) => a.velicine.length === 1 && a.velicine[0].v === 'Jedna veličina';
const mojaNaStanju = (a) => jednaVel(a) || (() => { const v = mojaVel(a); return !!v && v.n > 0; })();
const velOdabrana = (a) => (state.ormarVel && state.ormarVel[a.id]) || (mojaVel(a) || a.velicine.find((v) => v.n > 0) || a.velicine[0]).v;
const IZ_RASPON = ['23.11. - 29.11.', '30.11. - 06.12.', '07.12. - 13.12.', '14.12. - 20.12.', '21.12. - 27.12.', '28.12. - 03.01.'];
const IZ_TJEDNI = [['23.–29.11.', '29.11.'], ['30.11.–6.12.', '6.12.'], ['7.–13.12.', '13.12.'], ['14.–20.12.', '20.12.'], ['21.–27.12.', '27.12.'], ['28.12.–3.1.', '3.1.']];
// planer izazova: indeks 0 = aktivni tjedan (isti objekt kao IZAZOV), ostalo unaprijed planirano (null = nije planirano)
let IZ_PLAN = [];
const VRSTE_ZADATKA = { dolasci: 'Dolasci na treninge', video: 'Video zadatak', foto: 'Fotografija' };
const jeRad = (z) => z.vrsta === 'video' || z.vrsta === 'foto';
const MAPE_STARE = [
  { naziv: 'Tjedni - 16.11 - 22.11', radovi: [{ igr: 'Ana Horvat', datoteka: 'dres_ana.jpg', st: 'odobreno', tip: 'foto', dani: 9 }, { igr: 'Lea Kovač', datoteka: 'dres_lea.jpg', st: 'odobreno', tip: 'foto', dani: 9 }, { igr: 'Ema Jurić', datoteka: 'dres_ema.heic', st: 'odbijeno', tip: 'foto', dani: 9 }] },
  { naziv: 'Tjedni - 09.11 - 15.11', radovi: [{ igr: 'Mia Babić', datoteka: 'sut_mia.mp4', st: 'odobreno', tip: 'video', dani: 13 }, { igr: 'Nika Pavlić', datoteka: 'sut_nika.mov', st: 'odobreno', tip: 'video', dani: 13 }] },
];
const VIDEA = [{ igr: 'Lea Kovač', datoteka: 'trica_lea.mp4', st: 'čeka', tip: 'video' }, { igr: 'Mia Babić', datoteka: 'zabijanje_mia.mov', st: 'čeka', tip: 'video' }, { igr: 'Nika Pavlić', datoteka: 'dres_nika.jpg', st: 'čeka', tip: 'foto' }]; // prototip: predani videi
const mapeSve = () => [{ naziv: `Tjedni - ${IZ_RASPON[0].replace(/\.( |$)/g, '$1')}`, radovi: VIDEA, aktivna: true }, ...MAPE_STARE];
function radoviMape() {
  const m = mapeSve(); if (state.admMapa === undefined) state.admMapa = 0;
  return `<div class="meta" style="margin-bottom:8px">Mape se automatski brišu nakon 14 dana ili ih admin briše ručno.</div>` + m.map((f, mi) => {
    const open = state.admMapa === mi, cek = f.radovi.filter((r) => r.st === 'čeka').length;
    return `<div class="mapa${open ? ' open' : ''}"><button type="button" class="mapa-h" data-mapa="${mi}"><span class="mapa-ic">${ic('folder', 18)}</span><span class="grow"><b>${f.naziv}</b><span class="meta">${f.radovi.length} ${f.radovi.length === 1 ? 'rad' : 'radova'}${cek ? ` · ${cek} čeka odobrenje` : ''}</span></span><span class="mapa-chev">${open ? '▾' : '▸'}</span></button>
      ${open ? `<div class="mapa-b">${f.radovi.length ? f.radovi.map((v, i) => `<div class="rad-row"><span class="rad-ic">${ic(v.tip === 'foto' ? 'image' : 'play', 18)}</span><span class="rad-t"><b>${v.igr}</b><span class="meta">${v.datoteka} · briše se za ${14 - (v.dani || 2)} dana</span></span>
        <span class="rad-st">${v.st === 'čeka' ? `<button class="btn sm" data-vidok="${i}">Odobri</button><button class="btn ghost sm" data-vidno="${i}">Odbij</button>` : chip(v.st, v.st === 'odobreno' ? 'ok' : 'danger')}</span>
        <button class="btn ghost sm rad-b" data-vidskini="${mi}:${i}" aria-label="Preuzmi rad">${ic('download', 16)}</button><button class="btn ghost sm rad-b" data-vidbrisi="${mi}:${i}" aria-label="Obriši rad">${ic('trash', 16)}</button></div>`).join('') : '<div class="meta" style="padding:8px">Mapa je prazna.</div>'}
        <button class="btn ghost block sm" style="margin-top:8px" data-vidskini="${mi}:sve">${ic('download', 16)} Preuzmi cijelu mapu (ZIP)</button></div>` : ''}</div>`;
  }).join('');
}
const IZAZOV = { nagrada: 3.0, prikljuci: true, vrsta: 'dolasci', naslov: 'Tjedan bez izostanka', opis: 'Dođi na sva 3 treninga ovaj tjedan.', cilj: 3, odradeno: 1, do: 'nedjelje 29.11. u 12:00' }; // prototip: admin postavlja izazov tjedna
IZ_PLAN = [IZAZOV, null, { nagrada: 2.0, prikljuci: true, vrsta: 'foto', naslov: 'Fotografiraj svoj Falcons dres', opis: 'Pošalji fotografiju sebe u dresu ispred koša.', cilj: 3, odradeno: 0, do: 'nedjelje 13.12. u 12:00' },  { nagrada: 5.0, prikljuci: true, vrsta: 'video', naslov: 'Snimi kako zabijaš tricu', opis: 'Snimi 3 pokušaja trice i pošalji najbolji.', cilj: 3, odradeno: 0, do: 'nedjelje 20.12. u 12:00' }, null, null];
const zeljaArtikl = () => ORMAR.find((a) => a.id === state.zelja);
function zeljaKartica() {
  const a = zeljaArtikl();
  if (!a) return `<div class="card wish empty" data-go="igracica-ormar"><div class="row" style="gap:12px"><span class="wish-heart">♡</span><div class="grow"><h3>My favorites</h3><div class="meta">Označi srcem artikl u Ormaru i prati koliko ti još fali.</div></div></div></div>`;
  const fali = r2(Math.max(0, a.cijena - saldo())); const pct = Math.min(100, Math.round(saldo() / a.cijena * 100));
  return `<div class="card wish"><div class="row" style="gap:12px">${itemTile(a, 'sm')}<div class="grow"><div class="meta">My favorites</div><h3>${a.ime}</h3>
    <div class="wish-line">${fali > 0 ? `Još ti fali <b>${fmt(fali)} ${FLC}</b>` : `<b class="ok">Imaš dovoljno ${FLC}!</b>`}</div></div>
    <button type="button" class="wish-x" data-zelja="${a.id}" aria-label="Makni želju">×</button></div>
    <div class="progress" style="margin-top:12px"><i style="width:${pct}%"></i></div>
    <div class="row spread" style="margin-top:6px"><span class="meta">${fmt(saldo())} / ${fmt(a.cijena)} ${FLC}</span><span class="meta">${pct}%</span></div>
    ${fali > 0 ? '' : `<button class="btn red block sm" style="margin-top:10px" data-redeem="${a.id}">Zamijeni</button>`}</div>`;
}
/* milestones: bez bodova; skriveni dok ih igračica ne ostvari */
const MILESTONES = [
  { id: 'prvi', glif: '1', naslov: 'Prvi trening', opis: 'Došla si na svoj prvi trening u klubu.', dat: '09.09.2026.' },
  { id: 'utk1', glif: '★', naslov: 'Prva utakmica', opis: 'Nastupila si na svojoj prvoj utakmici.', dat: '03.10.2026.' },
  { id: 'tr10', glif: '10', naslov: '10 treninga', opis: 'Deset dolazaka na trening.', dat: '17.10.2026.' },
  { id: 'pobjeda', glif: '✓', naslov: 'Prva pobjeda', opis: 'Tvoja ekipa je pobijedila dok si bila na popisu.', dat: '22.11.2026.' },
  { id: 'ormar', glif: 'F', naslov: 'Prva zamjena u Ormaru', opis: 'Zamijenila si FLC za svoj prvi artikl.', dat: '14.11.2026.' },
  { id: 'izazov', glif: '!', naslov: 'Izazov ispunjen', opis: 'Ispunila si svoj prvi izazov tjedna.', dat: null },
  { id: 'tr25', glif: '25', naslov: '25 treninga', opis: 'Dvadeset i pet dolazaka na trening.', dat: null },
  { id: 'tr50', glif: '50', naslov: '50 treninga', opis: 'Pedeset dolazaka na trening.', dat: null },
  { id: 'turnir', glif: 'T', naslov: 'Prvi turnir', opis: 'Nastupila si na svom prvom turniru.', dat: null },
  { id: 'flc100', glif: '100', naslov: '100 FLC skupljeno', opis: 'Ukupno si skupila 100 FLC.', dat: null },
  { id: 'sezona', glif: '★', naslov: 'Sezona bez izostanka', opis: 'Cijeli mjesec bez nenajavljenog izostanka.', dat: null },
  { id: 'veteran', glif: '∞', naslov: 'Falcon godinu dana', opis: 'Godinu dana si u klubu.', dat: null },
];
const odkrij = (id, dat = 'Danas') => { const m = MILESTONES.find((x) => x.id === id); if (m && !m.dat) { m.dat = dat; notify('igracica', 'Novi milestone!', m.naslov); notify('roditelj', 'Novi milestone', `Ana je otkrila milestone: ${m.naslov}`); } };
function milestoneKartica() {
  const otk = MILESTONES.filter((m) => m.dat).length;
  return `<div class="card miles"><div class="row spread"><h3>Milestones</h3><span class="meta">${otk} od ${MILESTONES.length} otkriveno</span></div>
    <div class="mile-grid">${MILESTONES.map((m) => m.dat ? `<button type="button" class="mile on" data-mile="${m.id}"><span class="mile-b">${m.glif}</span><b>${m.naslov}</b></button>`
      : `<button type="button" class="mile off" data-mile="${m.id}"><span class="mile-b">?</span><b>Skriveno</b></button>`).join('')}</div>
    <div class="meta" style="margin-top:10px">Milestones ne nose bodove. Otkrivaju se tek kad ih ostvariš.</div></div>`;
}
const MF_TABOVI = [['izazov', 'Izazov'], ['zelja', 'Želja'], ['mile', 'Milestones'], ['povijest', 'Povijest']];
const mfMenu = () => `<div class="mf-menu" role="tablist">${MF_TABOVI.map(([k, l]) => `<button type="button" role="tab" class="${state.mfTab === k ? 'on' : ''}" data-mftab="${k}">${l}${k === 'mile' ? `<small>${MILESTONES.filter((m) => m.dat).length}/${MILESTONES.length}</small>` : ''}</button>`).join('')}</div>`;
const mfSadrzaj = () => ({ izazov: izazovKartica, zelja: zeljaKartica, mile: milestoneKartica, povijest: falcoiniHistory })[state.mfTab]();
const ZADACI_POVIJEST = [
  { tjedan: '16.–22.11.', naslov: 'Pet minuta slobodnih bacanja', st: 'uspješno', nagrada: 2.5 },
  { tjedan: '9.–15.11.', naslov: 'Tjedan bez izostanka', st: 'neuspješno', nagrada: 3 },
  { tjedan: '2.–8.11.', naslov: 'Snimi kako vodiš loptu lijevom', st: 'nije sudjelovala', nagrada: 4 },
  { tjedan: '26.10.–1.11.', naslov: 'Dođi na sva 3 treninga', st: 'uspješno', nagrada: 3 },
];
const rezChip = (st) => chip(st === 'uspješno' ? 'Uspješno' : st === 'neuspješno' ? 'Neuspješno' : 'Nisi sudjelovala', st === 'uspješno' ? 'ok' : st === 'neuspješno' ? 'danger' : '');
const prosliTekst = (st, n) => st === 'uspješno' ? `Prošli tjedan je bio <b>uspješan</b>${n ? ` (+${fmt(n)} ${FLC})` : ''}` : st === 'neuspješno' ? 'Prošli tjedan je bio <b>neuspješan</b>' : 'Prošli tjedan <b>nisi sudjelovala</b>';
// ishod tjedna koji se upravo zatvara (nedjelja 12:01) — za igračicu u prototipu
const ovajTjedanRez = () => (!state.izPrikl ? 'nije sudjelovala' : (jeRad(IZAZOV) ? (state.video && state.video.st === 'odobreno') : IZAZOV.odradeno >= IZAZOV.cilj) ? 'uspješno' : 'neuspješno');
function zadatakPovijestSheet() {
  const sud = ZADACI_POVIJEST.filter((x) => x.st !== 'nije sudjelovala').length, usp = ZADACI_POVIJEST.filter((x) => x.st === 'uspješno').length;
  overlay(`<h2>Povijest zadataka</h2><div class="meta">Sudjelovala u ${sud} od ${ZADACI_POVIJEST.length} tjedana · uspješno ${usp}</div>
    <div class="zh-list">${ZADACI_POVIJEST.map((x) => `<div class="zh-row"><div class="grow"><b>${x.naslov}</b><div class="meta">${x.tjedan}</div></div><div class="zh-r">${rezChip(x.st)}${x.st === 'uspješno' ? `<small>+${fmt(x.nagrada)} ${FLC}</small>` : ''}</div></div>`).join('')}</div>
    <button class="btn block" data-fxclose>Zatvori</button>`);
}
function izazovKartica() {
  const z = IZAZOV; const faza = state.zadFaza; const sat = `<button type="button" class="zhist-btn" data-zhist aria-label="Povijest zadataka">${ic('clock', 18)}</button>`;
  const nagr = `<div class="row" style="gap:8px;margin-right:34px">${fc(z.nagrada, 16)}${sat}</div>`; const zq = '<button type="button" class="fc-help zq" data-zhelp aria-label="Što je tjedni zadatak?">?</button>';
  const proto = (k, t) => `<button type="button" class="proto-link" data-zfaza="${k}">Prototip: ${t}</button>`;
  if (faza === 'cekanje') {  // nedjelja 12:01 → ponedjeljak 00:01: zadatak je završen, novi još nije otkriven, priključivanje je otvoreno
    const prosli = ovajTjedanRez();
    return `<div class="card challenge mystery">${zq}<div class="row spread"><div><h3>Tjedni zadatak</h3><div class="meta">${IZ_RASPON[1]} · otkriva se u ponedjeljak u 00:01</div></div><span style="margin-right:34px">${sat}</span></div>
      <div class="prosli ${prosli}">${prosliTekst(prosli, prosli === 'uspješno' ? z.nagrada : 0)}</div>
      ${state.izPriklIduci ? `<div class="joined" style="margin-top:12px">${ic('check', 14)} Priključena — zadatak se otkriva u ponedjeljak u 00:01</div>` : `<div class="join-note">Priključivanje je otvoreno. Priključi se već sada pa u ponedjeljak u 00:01 odmah vidiš zadatak.</div><button class="btn red block" style="margin-top:10px" data-izprikl2>Priključi se idućem zadatku</button>`}
      ${proto('aktivan', 'vrati na utorak')}</div>`;
  }
  const head = `<div class="row spread"><div><h3>Tjedni zadatak</h3><div class="meta">${IZ_RASPON[0]}</div></div>${nagr}</div><h3 style="margin-top:6px">${z.naslov}</h3><div class="meta" style="margin-top:4px">${z.opis}</div>`;
  const pc = (g, v, t, on) => `<button type="button" class="pp-chip${on ? ' on' : ''}" data-zproto="${g}:${v}">${t}</button>`;
  const stV = state.video ? state.video.st : 'nista';
  const prek = state.izPrikl ? `<div class="proto-sw"><div><span>Prototip · vrsta</span>${pc('vrsta', 'dolasci', 'Dolasci', z.vrsta === 'dolasci')}${pc('vrsta', 'video', 'Video', z.vrsta === 'video')}${pc('vrsta', 'foto', 'Foto', z.vrsta === 'foto')}</div>${z.vrsta !== 'dolasci' ? `<div><span>Prototip · ishod</span>${pc('ishod', 'nista', 'Nije poslano', stV === 'nista')}${pc('ishod', 'čeka', 'Čeka', stV === 'čeka')}${pc('ishod', 'odobreno', 'Odobreno', stV === 'odobreno')}${pc('ishod', 'odbijeno', 'Odbijeno', stV === 'odbijeno')}</div>` : ''}</div>` : '';
  const kraj = prek + proto('cekanje', 'pogledaj nedjelju 12:01');
  if (z.prikljuci && !state.izPrikl) return `<div class="card challenge mystery">${zq}<div class="row spread"><div><h3>Tjedni zadatak</h3><div class="meta">${IZ_RASPON[0]}</div></div><span style="margin-right:34px">${sat}</span></div>
    <button class="btn red block" style="margin-top:10px" data-izprikl>Priključi se i otkrij zadatak</button>${kraj}</div>`;
  if (jeRad(z)) {
    const v = state.video; const foto = z.vrsta === 'foto';
    const dno = !v ? `<button class="btn red block" style="margin-top:12px" data-vidopen>${ic(foto ? 'image' : 'upload', 18)} ${foto ? 'Slikaj ili dodaj fotografiju' : 'Snimi ili dodaj video'}</button>`
      : v.st === 'čeka' ? `<div class="vid-state wait"><span class="vs-t">${ic('check', 16)} ${foto ? 'Fotografija poslana' : 'Video poslan'}: ${v.datoteka}</span><small>Čeka odobrenje trenera. Zadatak je ispunjen tek kad ga trener potvrdi.</small></div>`
      : v.st === 'odobreno' ? `<div class="vid-state ok"><span class="vs-t">${ic('check', 16)} Čestitam! Osvojila si ${fmt(z.nagrada)} ${FLC}-a</span></div>`
      : `<div class="vid-state no"><span class="vs-t">${ic('lock', 16)} Zadatak je zaključan</span><small>Trener ${foto ? 'fotografiju' : 'video'} nije odobrio, pa se zadatak ovaj tjedan više ne može ispuniti. Novi zadatak stiže u ponedjeljak u 00:01.</small></div>`;
    return `<div class="card challenge">${zq}${head}<div class="joined">${ic('check', 14)} Priključena</div>${dno}${kraj}</div>`;
  }
  const gotovo = z.odradeno >= z.cilj;
  return `<div class="card challenge">${zq}${head}<div class="joined">${ic('check', 14)} Priključena</div>
    <div class="streak-dots">${Array.from({ length: z.cilj }, (_, i) => `<span class="${i < z.odradeno ? 'on' : ''}">${i < z.odradeno ? '✓' : i + 1}</span>`).join('')}</div>
    <div class="meta" style="margin-top:8px;text-align:center">${gotovo ? 'Zadatak ispunjen — nagrada je tvoja!' : `${z.odradeno} od ${z.cilj} · još ${z.cilj - z.odradeno} do nagrade`}</div>${kraj}</div>`;
}
const izazovPodsjetnik = () => IZ_PLAN[1] ? '' : `<div class="admin-alert">${ic('bell', 20)}<div class="grow"><b>Tjedni zadatak za idući tjedan (30.11.–6.12.) još nije planiran</b><div>Planiraj ga najkasnije u <b>nedjelju 29.11. do 12:00</b> (za 5 dana), kad se objavljuje i raspored.</div></div><button class="btn sm" data-izuredi="1">Planiraj zadatak</button></div>`;
function videoSheet() {
  const foto = IZAZOV.vrsta === 'foto';
  overlay(`<div style="display:flex;justify-content:center">${coinSvg(48)}</div><h2>${IZAZOV.naslov}</h2><p>${IZAZOV.opis}</p>
    <label class="btn ghost block vid-pick">${ic(foto ? 'image' : 'upload', 18)} <span id="vidName">${foto ? 'Odaberi ili slikaj fotografiju' : 'Odaberi ili snimi video'}</span><input type="file" id="vidFile" accept="${foto ? 'image/*' : 'video/*'}" capture="environment" hidden></label>
    <button class="btn red block" data-vidsend>${foto ? 'Pošalji fotografiju' : 'Pošalji video'}</button><button class="btn ghost block" data-fxclose>Odustani</button>
    <small>${foto ? 'Fotografiju' : 'Video'} vidi samo trener. Nakon slanja čeka se odobrenje trenera: kad ${foto ? 'je' : 'ga'} potvrdi, zadatak je ispunjen i dobivaš nagradu; ako ${foto ? 'je' : 'ga'} odbije, zadatak se zaključava. (Prototip: datoteka se ne učitava stvarno.)</small>`);
}
function ormarVelStrip() { const vl = velOd(PLAYERS[0]); const nema = !vl.majica || !vl.noga;
  return `<div class="card row spread ormar-vel ${nema ? 'missing' : ''}"><div class="grow"><div class="meta">Moje veličine</div><div class="ov-vals"><span>Majica <b class="${vl.majica ? '' : 'vel-empty'}">${vl.majica || '??'}</b></span><span>Noga <b class="${vl.noga ? '' : 'vel-empty'}">${vl.noga || '??'}</b></span></div></div>
    <button class="vel-edit static" data-velopen="${PLAYERS[0].id}" aria-label="Uredi veličine">${ic('edit', 18)}</button></div>`; }
function ormarGrid() {
  const kat = state.ormarKat || 'Sve';
  const cats = `<div class="cats">${ORMAR_KATEGORIJE.map((k) => `<button class="${k === kat ? 'on' : ''}" data-okat="${k}">${k}</button>`).join('')}</div>`;
  return cats + `<div class="ormar-grid">${ORMAR.filter((a) => kat === 'Sve' || a.kat === kat).map((a, i) => ({ a, i })).sort((x, y) => (mojaNaStanju(y.a) - mojaNaStanju(x.a)) || (x.i - y.i)).map(({ a }) => { const puno = saldo() >= a.cijena; const sv = velOdabrana(a);
    const v = a.velicine.find((x) => x.v === sv) || a.velicine[0]; const ima = v.n > 0; const jedna = jednaVel(a); const moja = jedna || (mojaVel(a) && mojaVel(a).v === v.v && ima);
    return `<div class="card item ${ima || jedna ? '' : 'dim'} ${moja ? 'mine' : ''}"><button type="button" class="heart ${state.zelja === a.id ? 'on' : ''}" data-zelja="${a.id}" aria-label="My favorites">${state.zelja === a.id ? '♥' : '♡'}</button>${moja ? `<span class="mine-badge">${jedna ? 'Odgovara ti' : 'Tvoja veličina'}</span>` : ''}${itemTile(a, '', ima || jedna ? '' : 'nema veličine')}<h3>${a.ime}</h3>${cijenaHtml(a)}
      <div class="stock">${jedna ? (ima ? `na stanju ${v.n}` : 'predbilježba') : moja ? `Tvoja veličina ${v.v} · na stanju ${v.n}` : ima ? 'dostupno · izaberi veličinu' : 'nema tvoje veličine · predbilježba'}</div>
      <button class="btn ${ima ? 'red' : 'ghost'} sm block" data-redeem="${a.id}">Izaberi</button></div>`; }).join('')}</div>`;
}
/* ---------- TRENER ---------- */
const TRENER_TABS = [['danas', 'Danas', 'home'], ['dolasci', 'Dolasci', 'check'], ['raspored', 'Raspored', 'cal'], ['novosti', 'Novosti', 'bell'], ['profil', 'Profil', 'user']];
const najavljeno = (p) => p.id === IGR_ID && state.rsvp === 'ne';
const attSt = (p) => (att[p.id] ? (kasn[p.id] ? 'st-late' : 'st-ok') : p.id === IGR_ID && izPokriva(TODAY) ? 'st-exc' : najavljeno(p) ? 'st-ann' : 'st-abs');
const attSeg = (p) => { const s = att[p.id] ? (kasn[p.id] ? 'kasni' : 'da') : 'ne';
  return `<div class="seg3" role="group" aria-label="Dolazak">${[['ne', '✕', 'Nije došla'], ['kasni', '!', 'Kasni'], ['da', '✓', 'Došla']].map(([k, g, l]) => `<button type="button" class="s3 s3-${k} ${s === k ? 'on' : ''}" data-st="${k}" data-id="${p.id}" aria-label="${l}">${g}</button>`).join('')}</div>`; };
const prevAtt = {};
const attSwipe = (p) => { const s = attSt(p), pr = prevAtt[p.id]; prevAtt[p.id] = s; return pr && pr !== s ? ` swipe" style="--prev: var(--g-${pr.slice(3)})` : ''; };
const kasn = {};
const attRuc = {}; let attRsvpApplied = null; // trener je ručno promijenio / najava već primijenjena
/* što više minuta, to jača žuta (svijetla → zlatna → tamna jantarna) */
const kasnBoja = (m) => { const t = Math.max(0, Math.min(1, ((+m || 0) - 1) / 14)); return `hsl(${Math.round(46 - 8 * t)} ${Math.round(90 + 5 * t)}% ${Math.round(88 - 38 * t)}%)`; };
function kasnjenjeSheet(id) {
  const p = PLAYERS.find((x) => x.id === id);
  overlay(`<h2>Kasni</h2><div class="meta" style="margin-top:-4px">${p.ime} · koliko minuta kasni?</div>
    <input id="kasnMin" class="kasn-input" style="background:${kasnBoja(kasn[id] || 5)}" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="2" value="${kasn[id] || 5}" aria-label="Minute kašnjenja">
    <div class="sizes">${[3, 6, 9, 10].map((m) => `<button type="button" class="size kasn-chip" style="background:${kasnBoja(m)}" data-kmin="${m}">${m} min</button>`).join('')}</div>
    <button class="btn navy block" data-ksave="${id}">Spremi</button><button class="btn ghost block" data-fxclose>Odustani</button>`);
  setTimeout(() => { const i = $('#kasnMin'); if (i) { i.focus(); i.select(); } }, 50);
}
const att = {}; PLAYERS.slice(0, 8).forEach((p, i) => (att[p.id] = i !== 4 && i !== 7));
const SCREENS = {
  'trener-danas': () => ({
    header: mHeader('Bok, Ivane', 'Utorak, 24. studenoga'),
    tabs: tabbar('trener', TRENER_TABS, 'danas'),
    body: `<div class="section-title">Danas</div>` +
      (TRENINZI[TODAY].filter((t) => t.g !== 'SEN').map((t) => `<div class="card stack">${trenRow(t, chip('8 igračica', 'navy'))}
        <div class="row" style="gap:10px"><button class="btn grow" data-go="trener-dolasci">${ic('check', 18)} Dolasci</button><button class="btn red grow" data-go="trener-qr">${ic('qr', 18)} QR za dolazak</button></div></div>`).join('')) +
      `<div class="section-title">Utakmica</div>` + utkTrenerKartica() + novostiTeaser('trener') +
      `<div class="section-title">Ovaj tjedan</div>
       <div class="card"><div class="row spread"><div><h3>Dolaznost</h3><div class="meta">Prosjek tvojih grupa</div></div><b style="font-size:var(--fs-xl);font-weight:900">84%</b></div>
       <div class="progress" style="margin-top:12px"><i style="width:84%"></i></div></div>`,
  }),
  'trener-novosti': () => novostiScreen('trener', tabbar('trener', TRENER_TABS, 'novosti')),
  'igracica-novosti': () => novostiScreen('igracica', tabbar('igracica', IGRACICA_TABS, 'novosti')),
  'trener-qr': () => {
    const tipovi = [['trening', 'Trening'], ['utakmica', 'Utakmica'], ['turnir', 'Turnir']];
    return {
      header: mHeader('QR za dolazak', 'U14 · Uto 24.11. · 17:30'),
      tabs: tabbar('trener', TRENER_TABS, 'danas'),
      body: `<a class="link back pf-back" data-go="trener-danas">← Danas</a>
        <div class="seg2">${tipovi.map(([k, l]) => `<button type="button" class="${state.qrTip === k ? 'on' : ''}" data-qrtip="${k}">${l}</button>`).join('')}</div>
        <div class="card qr-card"><img src="assets/qr-primjer.svg" alt="QR kod za dolazak"><div class="meta">Igračice skeniraju kod u aplikaciji</div>
          <div class="fc-badge">${fc('+' + fmt(pravilo(state.qrTip)), 18)}<span>po igračici</span></div></div>
        <div class="card"><div class="row spread"><h3>Skenirano</h3><b id="qrN" style="font-weight:900">5 / 8</b></div><div class="progress" style="margin-top:10px"><i style="width:62%"></i></div>
          <div class="meta" style="margin-top:10px">Kod vrijedi samo za ovaj termin. Tko nema mobitel, označi ga ručno u Dolascima.</div></div>`,
    };
  },
  'trener-dolasci': () => {
    const lista = PLAYERS.slice(0, 8);
    if (izPokriva(TODAY)) { att[IGR_ID] = false; kasn[IGR_ID] = 0; }
    else if ((state.rsvp === 'da' || state.rsvp === 'ne') && !attRuc[IGR_ID] && attRsvpApplied !== state.rsvp) { att[IGR_ID] = state.rsvp === 'da'; kasn[IGR_ID] = 0; attRsvpApplied = state.rsvp; }
    const n = lista.filter((p) => att[p.id]).length;
    return {
      header: mHeader('Dolasci', 'U14 · Uto 24.11. · 17:30'),
      tabs: tabbar('trener', TRENER_TABS, 'dolasci'),
      body: `<div class="card"><div class="row spread"><h3>Prisutno</h3><b id="attN" style="font-weight:900">${n} / ${lista.length}</b></div>
        <div class="progress" style="margin-top:10px"><i id="attBar" style="width:${(n / lista.length) * 100}%"></i></div></div>
        <div class="card"><div class="att-legend"><span class="al-name">Igračica</span><span class="al-prof">Profil</span><span class="al-tog">Dolazak</span></div><div class="list">${lista.map((p) => `<div class="row attend ${att[p.id] ? 'on' : ''} ${attSt(p)}${attSwipe(p)}">
          ${av(p, 'sm')}<div class="grow"><h3 class="att-name">${p.ime}</h3>${p.id === IGR_ID && state.rsvp === 'da' && !izPokriva(TODAY) && !kasn[p.id] ? `<span class="rsvp-chip ${state.rsvp}">${state.rsvp === 'da' ? (state.rsvpTko === 'roditelj' ? 'roditelj najavio dolazak' : 'najavila dolazak') : (state.rsvpTko === 'roditelj' ? 'roditelj najavio nedolazak' : 'najavila nedolazak')}</span>` : ''}${att[p.id] ? (kasn[p.id] ? `<span class="late-chip" style="background:${kasnBoja(kasn[p.id])}">kasni ${kasn[p.id]} min</span>` : '') : p.id === IGR_ID && izPokriva(TODAY) ? `<span class="abs-chip soft">Opravdani izostanak</span>` : najavljeno(p) ? `<span class="abs-chip ann">${state.rsvpTko === 'roditelj' ? 'Roditelj javio' : 'Najavljeno'}</span>` : '<span class="abs-chip hard">Nenajavljeno</span>'}</div><button class="pf-open" data-profil="${p.id}" aria-label="Profil">${ic('chev', 18)}</button>${attSeg(p)}</div>`).join('')}</div></div>
        <button class="btn red block" data-attsave>Spremi dolaske</button>`,
    };
  },
  'trener-raspored': () => ({
    header: mHeader('Raspored', 'Tjedan 23. – 29. 11.'),
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
          <div class="grow"><div class="meta">Sljedeći trening</div><h3>${p.grupe[0]}</h3></div></div>
        ${p.id === IGR_ID ? roditeljTrening(p) + roditeljUtakmica(p) : ''}
        <button class="btn ghost block" data-profil="${p.id}">Profil ${ic('chev', 16)}</button></div>`).join('') +
      `<div class="card row"><div class="grow"><h3>Dospjelo za platiti</h3><div class="meta">Lea · studeni 2026.</div></div><b style="font-size:var(--fs-lg);font-weight:900">30 €</b></div>
       ${novostiTeaser('roditelj')}
       <button class="btn red block" data-go="roditelj-clanarina">${ic('wallet', 18)} Podaci za uplatu</button>`,
  }),
  'roditelj-novosti': () => novostiScreen('roditelj', tabbar('roditelj', RODITELJ_TABS, 'novosti')),
  'roditelj-raspored': () => ({
    header: mHeader('Raspored', 'Ana · U14, Lea · Škola košarke'),
    tabs: tabbar('roditelj', RODITELJ_TABS, 'raspored'),
    body: rasporedScreen(['U14', 'Škola košarke'], false, ['U14']),
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
      <div class="login-top"><img class="login-logo" src="${LOGO}" alt="ŽKK Zagreb Falcons"></div>
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
          <span>Made by lots of <span class="cup">${ic('cup', 16)}</span> by</span>
          <a class="bluerider" href="https://bluerider.hr" target="_blank" rel="noopener" title="Bluerider Design — bluerider.hr">BLUE RIDER DESIGN</a>
        </div>
      </div>`,
  }),

  /* ---------- JAVNA PRIJAVA ---------- */
  'prijava-forma': () => ({
    header: mHeader('Prijava nove članice', `${APP_NAME} · ŽKK Falcons Zagreb`, false, false),
    tabs: '',
    body: `<a class="link back" data-go="start-login">← Imam račun, prijavi me</a>
      <form id="prijavaForm" novalidate data-step="1">
      <div class="card wiz">
        <div class="wiz-top"><div><div class="wiz-step" id="wizStep">1/2</div><h3 id="wizTitle">Podaci o djevojčici</h3></div><button type="button" class="btn ghost sm" data-fill title="Popuni primjerom">Primjer</button></div>
        <div class="wiz-bar"><i id="wizBar" style="width:50%"></i></div>

        <div class="step stack" data-stepbox="1">
          <div class="two">${field('ime', 'Ime')}${field('prezime', 'Prezime')}</div>
          ${field('rod', 'Datum rođenja', { ph: 'dd.mm.gggg', extra: 'inputmode="numeric" maxlength="10" autocomplete="off"' })}
          ${field('oib', 'OIB', { ph: '11 znamenki', extra: 'inputmode="numeric" maxlength="11"' })}
          ${field('adresa', 'Adresa')}
          <div class="two" style="grid-template-columns:1fr 1.4fr">${field('pbr', 'Poštanski broj', { extra: 'inputmode="numeric" maxlength="5"' })}${field('mjesto', 'Mjesto')}</div>
        </div>

        <div class="step stack" data-stepbox="2" hidden>
          <div class="sub-title">Kontakt roditelja</div>
          ${field('mob', 'Mobitel', { type: 'tel' })}${field('email', 'E-mail', { type: 'email' })}
          <div class="meta">Na ovaj e-mail stiže potvrda prijave i pristup aplikaciji.</div>
          <div class="sub-title">Grupa</div>
          ${field('grupa', 'Grupa', { opts: GRUPE_PRIJAVA })}
          <div class="meta">Ako se prijavljujete u selekciju, trener određuje u koju točno spada.</div>
          ${field('majica', 'Veličina majice za nošenje', { opts: MAJICE, empty: 'Odaberi veličinu' })}
          <div class="meta">Dječje veličine označene su visinom u cm. Ako ste između dvije, odaberite veću.</div>
          <div class="sub-title">Privole</div>
          <label class="check"><input type="checkbox" name="privola"><span>Kao roditelj/skrbnik djevojčice dajem privolu za obradu njezinih i mojih osobnih podataka (ime, OIB, adresa, kontakt) u svrhu članstva u klubu, u skladu s <a class="link" data-privacy>pravilima privatnosti</a>.</span></label><small class="err" data-err="privola"></small>
          <label class="check"><input type="checkbox" name="fotoPrivola"><span>Kao roditelj/skrbnik dopuštam korištenje fotografije djevojčice unutar klupske aplikacije.</span></label><small class="err" data-err="fotoPrivola"></small>
          <div class="meta">Privolu možete povući u svakom trenutku obraćanjem klubu.</div>
        </div>

        <div class="wiz-nav">
          <button class="btn ghost" type="button" data-prev hidden>Natrag</button>
          <button class="btn red grow" type="button" data-next>Dalje</button>
          <button class="btn red grow" type="submit" hidden>Pošalji prijavu</button>
        </div>
      </div></form><div style="height:6px"></div>`,
  }),
  'prijava-poslano': () => {
    const p = state.zadnja || SAMPLE;
    return {
      header: mHeader('Prijava poslana', 'Hvala!', false, false),
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
    header: mHeader('Bok, Ana', `<span class="hdr-att">Dolaznost u sezoni <b>91%</b></span><div class="hdr-prog"><i style="width:91%"></i></div>`),
    tabs: `<div class="hero-strip"><div class="hs-text"><b>Samo naprijed, Ana!</b><span>Svaki trening je korak bliže.</span></div><img src="${FOTO}" alt=""></div>` + tabbar('igracica', IGRACICA_TABS, 'pocetna'),
    body: tjedanKartica() + treningKartica() + utakmicaKartica() + ``,
  }),
  'igracica-falcoini': () => ({
    header: mHeader(SEKCIJA_FALCOIN, 'Skupljaj Falcoine i mijenjaj ih u Ormaru'),
    tabs: tabbar('igracica', IGRACICA_TABS, 'falcoini'),
    body: `<div class="card fc-hero compact"><button type="button" class="fc-help" data-flchelp aria-label="Što je FLC?">?</button><div class="fc-top">${coinSvg(36)}<div class="fc-main"><div class="fc-line"><div class="fc-num">${fmt(saldo())}</div><span class="fc-cur">${FLC}</span></div><small class="fc-eur2">= ${fmt(saldo())} € u Ormaru</small></div><button type="button" class="fc-ormar" data-go="igracica-ormar" aria-label="Uđi u klupski Ormar">${ic('bag', 24)}<span>Ormar</span></button></div>
        <button class="btn red block sm" data-scan>${ic('qr', 18)} Skeniraj QR za dolazak</button></div>
      ${izazovKartica()}${zeljaKartica()}
      <div class="section-title">Povijest zarađenih FLC-a</div>${falcoiniHistory()}`,
  }),
  'igracica-ormar': () => ({
    header: mHeader('Ormar', 'Zamijeni Falcoine za artikle'),
    tabs: tabbar('igracica', IGRACICA_TABS, 'falcoini'),
    body: `<button class="btn ghost block sm" data-go="igracica-falcoini">‹ ${SEKCIJA_FALCOIN}</button><div class="card row spread"><span class="meta">Tvoje stanje</span>${fc(saldo(), 20)}</div>${ormarVelStrip()}${ormarGrid()}`,
  }),
  'igracica-profil': () => ({
    header: mHeader('Moj profil', 'Ana Horvat'),
    tabs: tabbar('igracica', IGRACICA_TABS, 'profil'),
    body: profilBody(PLAYERS[0], 'igracica'),
  }),
  'roditelj-igracica': () => ({
    header: mHeader('Profil', profilIgr().ime),
    tabs: tabbar('roditelj', RODITELJ_TABS, 'pocetna'),
    body: profilBody(profilIgr(), 'roditelj'),
  }),
  'trener-igracica': () => ({
    header: mHeader('Profil', profilIgr().ime),
    tabs: tabbar('trener', TRENER_TABS, 'dolasci'),
    body: profilBody(profilIgr(), 'trener'),
  }),
  'igracica-raspored': () => ({
    header: mHeader('<span class="h1-sm">Treninzi i utakmice</span>', ''),
    tabs: tabbar('igracica', IGRACICA_TABS, 'raspored'),
    body: rasporedScreen(['U14'], true),
  }),
};
const RODITELJ_TABS = [['pocetna', 'Početna', 'home'], ['raspored', 'Raspored', 'cal'], ['novosti', 'Novosti', 'bell'], ['clanarina', 'Članarina', 'wallet'], ['potvrde', 'Potvrde', 'file']];
const IGRACICA_TABS = [['pocetna', 'Početna', 'home'], ['raspored', 'Raspored', 'cal'], ['novosti', 'Novosti', 'bell'], ['falcoini', SEKCIJA_FALCOIN, 'coin'], ['profil', 'Profil', 'user']];

/* ---------- ADMIN (desktop) ---------- */
const novihNarudzbi = () => NARUDZBE.filter((n) => n.st === 'čeka').length;
const ADMIN_NAV = [['pregled', 'Pregled', 'grid'], ['prijave', 'Prijave', 'file'], ['clanovi', 'Članovi', 'users'], ['grupe', 'Grupe', 'user'], ['raspored', 'Raspored', 'cal'], ['clanarine', 'Članarine', 'wallet'], ['novosti', 'Novosti', 'bell'], ['falcoini', SEKCIJA_FALCOIN, 'coin'], ['zadatak', 'Tjedni zadatak', 'check'], ['ormar', 'Ormar', 'bag']];
const memberRows = (q = '', g = 'Sve') => PLAYERS.filter((p) =>
  (g === 'Sve' || p.grupe.some((x) => x.startsWith(g))) && p.ime.toLowerCase().includes(q.toLowerCase()))
  .map((p) => `<tr class="click" data-profil="${p.id}"><td><div class="who">${av(p, 'sm')}${p.ime}</div></td><td>${p.god}.</td>
    <td>${p.grupe.map((x) => chip(x, 'navy')).join(' ')}</td><td>${p.roditelj}</td><td>${clan(p.clanarina)}</td></tr>`).join('');


/* ---------- ADMIN KALENDAR (treninzi, utakmice, izazovi) ---------- */
const MJESECI = ['Siječanj', 'Veljača', 'Ožujak', 'Travanj', 'Svibanj', 'Lipanj', 'Srpanj', 'Kolovoz', 'Rujan', 'Listopad', 'Studeni', 'Prosinac'];
const MJ_GEN = ['siječnja', 'veljače', 'ožujka', 'travnja', 'svibnja', 'lipnja', 'srpnja', 'kolovoza', 'rujna', 'listopada', 'studenoga', 'prosinca'];
const pad2 = (n) => String(n).padStart(2, '0');
const dKey = (y, m, d) => `${y}-${pad2(m + 1)}-${pad2(d)}`;
const ADM_UTAKMICE = [
  { d: '2026-11-15', vr: '11:00', opis: 'Prvenstvo U14 · ŽKK Primjer 1', rez: '41 : 47' },
  { d: '2026-11-22', vr: '11:00', opis: 'Prvenstvo U14 · ŽKK Primjer 2', rez: '54 : 48' },
  { d: '2026-11-28', vr: '11:00', opis: 'Prvenstvo U14', glavna: true },
  { d: '2026-12-05', vr: '10:00', opis: 'Prvenstvo U16 · ŽKK Primjer 3', nepotvrdeno: true },
  { d: '2026-12-12', vr: '12:00', opis: 'Prvenstvo U14 · ŽKK Primjer 4', nepotvrdeno: true },
];
const danStavke = (y, m, d) => {
  const dt = new Date(y, m, d); const wd = (dt.getDay() + 6) % 7; const key = dKey(y, m, d); const st = [];
  (TRENINZI[wd] || []).forEach((t) => st.push({ t: 'tr', vr: t.v, label: grupaLabel(t.g), det: `${t.v}–${t.do} · ${t.d}` }));
  ADM_UTAKMICE.filter((u) => u.d === key).forEach((u) => st.push({ t: 'ut', vr: u.vr, label: 'Utakmica', det: `${u.vr} · ${u.opis}`, u }));
  const wk = Math.floor((dt - new Date(2026, 10, 23)) / 604800000);
  if (wk >= 0 && wk < IZ_PLAN.length && IZ_PLAN[wk]) { if (wd === 0) st.push({ t: 'iz', vr: '', label: IZ_PLAN[wk].naslov, det: `Tjedni zadatak · ${({ video: 'video zadatak', foto: 'fotografija' })[IZ_PLAN[wk].vrsta] || 'dolasci'}`, wk }); if (wd === 6) st.push({ t: 'iz', vr: '', label: 'Rok zadatka', det: `Rok: ${IZ_PLAN[wk].naslov}`, wk, rok: true }); }
  return st;
};
function adminKalendar() {
  const { y, m } = state.admMj; const sel = state.admDan; const prvi = new Date(y, m, 1); const off = (prvi.getDay() + 6) % 7; const dani = new Date(y, m + 1, 0).getDate(); const danas = dKey(2026, 10, 24);
  const cells = []; for (let i = 0; i < off; i++) cells.push(null); for (let d = 1; d <= dani; d++) cells.push(d); while (cells.length % 7) cells.push(null);
  const grid = cells.map((d) => { if (!d) return '<div class="cal-cell empty"></div>'; const key = dKey(y, m, d); const st = danStavke(y, m, d); const wd = (new Date(y, m, d).getDay() + 6) % 7;
    return `<div class="cal-cell ${key === danas ? 'today' : ''} ${key === sel ? 'sel' : ''} ${key < danas ? 'past' : ''} ${wd > 4 ? 'we' : ''}" data-admdan="${key}"><div class="cal-d">${d}</div>
      ${st.slice(0, 4).map((x) => `<div class="cal-it ${x.t}">${x.vr ? `<b>${x.vr}</b> ` : ''}${x.label}</div>`).join('')}${st.length > 4 ? `<div class="cal-more">+${st.length - 4}</div>` : ''}</div>`; }).join('');
  const [sy, sm, sd] = sel.split('-').map(Number); const sst = danStavke(sy, sm - 1, sd); const sdt = new Date(sy, sm - 1, sd);
  const detalj = `<div class="cal-detail card"><h3>${DANI_PUNO[(sdt.getDay() + 6) % 7]}, ${sd}. ${MJ_GEN[sm - 1]}</h3>
    ${['tr', 'ut', 'iz'].map((tip) => { const l = sst.filter((x) => x.t === tip); if (!l.length) return ''; const nas = { tr: 'Treninzi', ut: 'Utakmice', iz: 'Tjedni zadatak' }[tip];
      return `<div class="section-title small">${nas}</div>${l.map((x) => `<div class="cal-row ${x.t}"><b>${x.t === 'iz' ? x.label : x.det.split(' · ')[0]}</b><span>${x.t === 'tr' ? `${x.label} · ${x.det.split(' · ')[1]}` : x.t === 'ut' ? x.u.opis : x.det}</span>
        ${x.t === 'ut' ? (x.u.rez ? chip('Rezultat ' + x.u.rez, 'navy') : x.u.glavna ? (UTAKMICA.termin && UTAKMICA.dvorana ? chip('Potvrđeno', 'ok') : chip('Čeka potvrdu', 'warn')) : chip('Nije potvrđeno', 'warn')) : ''}
        ${x.t === 'iz' ? `<button class="btn ghost sm" data-izuredi="${x.wk}">Uredi</button>` : ''}</div>`).join('')}`; }).join('') || '<div class="meta">Nema termina ovaj dan.</div>'}
    ${sel === '2026-11-28' ? adminUtakmica() : ''}</div>`;
  return `<div class="page-head"><div><h1>Raspored</h1><div class="sub">Treninzi, utakmice i tjedni zadaci</div></div><div class="grow"></div>
      <button class="btn" data-toast="Novi termin — sljedeći korak">${ic('plus', 18)} Novi termin</button></div>
    ${RASPORED_NAPOMENA}
    <div class="cal-bar"><button class="btn ghost sm" data-admmj="-1" aria-label="Prethodni mjesec">‹</button><h2>${MJESECI[m]} ${y}.</h2><button class="btn ghost sm" data-admmj="1" aria-label="Sljedeći mjesec">›</button>
      <button class="btn ghost sm" data-admmj="0">Danas</button><div class="grow"></div>
      <span class="cal-leg"><i class="tr"></i>Trening</span><span class="cal-leg"><i class="ut"></i>Utakmica</span><span class="cal-leg"><i class="iz"></i>Zadatak</span></div>
    <div class="cal-wrap"><div class="cal-main"><div class="cal-head">${DANI.map((d) => `<div>${d}</div>`).join('')}</div><div class="cal-grid">${grid}</div></div>${detalj}</div>`;
}
function adminUtakmica() {
  const u = UTAKMICA;
  return `<div class="card adm-utk" style="margin-top:12px;box-shadow:none;border:1px solid var(--silver-100)"><h3>Utakmica · ${u.natjecanje}</h3><div class="meta">${u.datum} · ${u.vrijeme} · kandidata ${UTK_KANDIDATI.length} igračica</div>
    <div class="adm-utk-row"><div><b>Datum i vrijeme</b><div class="meta">${u.datum} u ${u.vrijeme}</div></div>${u.termin ? chip('Potvrđeno', 'ok') + '<button class="btn ghost sm" data-admutk="termin-off">Poništi</button>' : '<button class="btn sm" data-admutk="termin">Potvrdi</button>'}</div>
    <div class="adm-utk-row"><div><b>Dvorana</b><div class="meta">${u.dvorana || 'Dvorana A (predloženo)'}</div></div>${u.dvorana ? chip('Potvrđeno', 'ok') + '<button class="btn ghost sm" data-admutk="dvorana-off">Poništi</button>' : '<button class="btn sm" data-admutk="dvorana">Potvrdi</button>'}</div>
    <div class="meta" style="margin-top:10px">Igračice i roditelji potvrđuju dolazak kad trener objavi popis (ne čeka se potvrda termina).</div></div>`;
}
const ADMIN = {
  prijave: () => `<div class="page-head"><div><h1>Prijave</h1><div class="sub">Nove članice koje čekaju potvrdu</div></div><div class="grow"></div>
      <button class="btn ghost" data-go="prijava-forma">Otvori javni obrazac</button></div>
    <table><thead><tr><th>Datum</th><th>Djevojčica</th><th>Godište</th><th>Zatražena grupa</th><th>Kontakt roditelja</th><th>Status</th></tr></thead><tbody>${prijave.map((p) =>
      `<tr class="click" data-open="${p.id}"><td>${p.dat}</td><td><div class="who">${av(p, 'sm')}${p.ime} ${p.prezime}</div></td><td>${p.rod.slice(0, 4)}.</td><td>${chip(p.grupa, 'navy')}</td>
      <td>${p.email}</td><td>${chip(STATUS_P[p.status][0], STATUS_P[p.status][1])}${p.dup && p.status === 'ceka' ? ' ' + chip('Moguća dvostruka', 'danger') : ''}</td></tr>`).join('')}</tbody></table>`,
  pregled: () => `<div class="page-head"><div><h1>Pregled</h1><div class="sub">Utorak, 24. studenoga 2026.</div></div></div>${izazovPodsjetnik()}
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
  profil: () => profilBody(profilIgr(), 'admin'),
  zadatak: () => `<div class="page-head"><div><h1>Tjedni zadatak</h1><div class="sub">Planiranje zadataka i odobravanje videa i fotografija</div></div></div>${izazovPodsjetnik()}
    <div class="pf-grid">
      <div class="card pf-sec wide"><h4>Planer tjednih zadataka</h4>
        <div class="plan-list">${IZ_TJEDNI.map(([t], i) => { const z = IZ_PLAN[i]; return `<div class="plan-row ${state.izTjedan === i ? 'sel' : ''} ${i === 0 ? 'now' : ''}"><div class="plan-wk"><b>${t}</b><span>${i === 0 ? 'ovaj tjedan' : i === 1 ? 'idući tjedan' : ''}</span></div>
          <div class="grow">${z ? `<b>${z.naslov}</b><div class="meta">${z.vrsta === 'dolasci' ? `Dolasci na ${z.cilj} treninga` : VRSTE_ZADATKA[z.vrsta]} ${i === 0 && z.prikljuci ? ` · priključeno ${9 + (state.izPrikl ? 1 : 0)} igračica` : ''}</div>` : '<span class="meta">Nije planirano</span>'}</div>
          ${z ? `<span class="plan-rew">${fc(z.nagrada, 14)}</span>` : ''}${z ? chip(i === 0 ? 'aktivan' : 'planirano', i === 0 ? 'ok' : 'navy') : (i === 1 ? chip('treba objaviti', 'warn') : '')}
          <button class="btn ghost sm" data-izuredi="${i}">${z ? 'Uredi' : 'Dodaj'}</button></div>`; }).join('')}</div>
        ${(() => { const i = state.izTjedan; if (i === undefined || i === null) return '<div class="meta" style="margin-top:10px">Odaberi tjedan za planiranje (Dodaj / Uredi).</div>'; const z = IZ_PLAN[i] || { vrsta: 'dolasci', naslov: '', opis: '', cilj: 3 };
          return `<div class="plan-form"><h4 style="margin:0">Tjedan ${IZ_TJEDNI[i][0]}</h4>
        <div class="field"><label>Vrsta</label><select class="input" id="izVrsta"><option value="dolasci" ${z.vrsta === 'dolasci' ? 'selected' : ''}>Dolasci na treninge</option><option value="video" ${z.vrsta === 'video' ? 'selected' : ''}>Video zadatak (igračica šalje video)</option><option value="foto" ${z.vrsta === 'foto' ? 'selected' : ''}>Fotografija (igračica šalje fotografiju)</option></select></div>
        <div class="field"><label>Naslov</label><input class="input" id="izNaslov" value="${z.naslov}" placeholder="npr. Snimi kako zabijaš tricu"></div>
        <div class="field"><label>Opis zadatka</label><input class="input" id="izOpis" value="${z.opis}"></div>
        <div class="field"><label>Broj treninga (za dolaske)</label><input class="input" id="izCilj" type="number" min="1" max="7" value="${z.cilj}"></div>
        <div class="field"><label>Nagrada za ovaj zadatak (FLC)</label><input class="input" id="izNagrada" type="number" min="0" step="0.01" inputmode="decimal" value="${(z.nagrada ?? 3).toFixed(2)}"></div>
        <div class="meta">Nagrada se upisuje za svaki zadatak posebno. Zadatak se otkriva priključenim igračicama u <b>ponedjeljak u 00:01</b> i traje do <b>nedjelje u 12:00</b>. Priključivanje se otvara u nedjelju u 12:01 (prije otkrivanja novog zadatka).</div>
        <div class="row" style="gap:10px"><button class="btn grow" data-izspremi="${i}">Spremi zadatak</button>${IZ_PLAN[i] && i > 0 ? `<button class="btn ghost" data-izbrisi="${i}">Obriši</button>` : ''}</div></div>`; })()}</div>
      <div class="card pf-sec"><h4>Predani radovi (video i fotografije)</h4>${radoviMape()}</div>
    </div>`,
  falcoini: () => `<div class="page-head"><div><h1>${SEKCIJA_FALCOIN}</h1><div class="sub">Pravila bodovanja i ljestvica</div></div></div>
    <div class="pf-grid">
      <div class="card pf-sec"><h4>Pravila bodovanja</h4>${FALCOIN_PRAVILA.map((r) => `<div class="pf-kv"><span>${r.label}</span><span class="row" style="gap:8px">${coinSvg(18)}<input class="input fc-in" type="number" min="0" step="0.01" inputmode="decimal" value="${r.iznos.toFixed(2)}" data-rule="${r.k}"></span></div>`).join('')}
        <button class="btn ghost" data-toast="Pravila spremljena (prototip)">Spremi pravila</button></div>
      <div class="card pf-sec"><h4>Ljestvica sezone</h4>${PLAYERS.slice().sort((a, b) => FALCOINI[b.id] - FALCOINI[a.id]).slice(0, 6).map((p, i) => `<div class="pf-kv"><span class="row" style="gap:10px"><b style="width:18px;color:var(--muted)">${i + 1}.</b>${av(p, 'sm')}<span style="color:var(--text)">${p.ime}</span></span>${fc(FALCOINI[p.id])}</div>`).join('')}</div>
      <div class="card pf-sec"><h4>Ručno dodjeljivanje</h4>
        <div class="field"><label>Igračica</label><select class="input" id="fcWho">${PLAYERS.map((p) => `<option value="${p.id}">${p.ime}</option>`).join('')}</select></div>
        <div class="two"><div class="field"><label>Razlog</label><input class="input" id="fcWhy" placeholder="npr. pomoć na turniru"></div><div class="field"><label>Iznos</label><input class="input" id="fcAmt" type="number" min="0" step="0.01" inputmode="decimal" value="1.50"></div></div>
        <div class="row" style="gap:10px"><button class="btn grow" data-fcgive="1">Dodijeli</button><button class="btn ghost grow" data-fcgive="-1">Oduzmi</button></div>
        <small class="err" id="fcErr" style="color:var(--navy)">${(() => { const m = state.fcMsg || ''; state.fcMsg = ''; return m; })()}</small></div>
      <div class="card pf-sec"><h4>Kako se bilježi dolazak</h4>
        <div class="meta" style="line-height:1.6">Trener otvori QR za termin u svojoj aplikaciji, igračice ga skeniraju u svojoj. Kod vrijedi samo za taj termin, a igračica po terminu dobije bodove jednom. Trener može dolazak označiti i ručno.</div></div>
    </div>`,
  ormar: () => `<div class="page-head"><div><h1>Ormar</h1><div class="sub">Artikli za zamjenu i narudžbe</div></div><div class="grow"></div>
      <button class="btn" data-toast="Novi artikl — sljedeći korak">${ic('plus', 18)} Novi artikl</button></div>
    <div class="card row spread" style="margin-bottom:16px"><div><h3>Za naplatiti gotovinom</h3><div class="meta">${NARUDZBE.filter((n) => n.st === 'čeka' && n.gotovina > 0).length} narudžbi čeka preuzimanje s doplatom</div></div>
      <b style="font-size:var(--fs-xl);font-weight:900">${fmt(NARUDZBE.filter((n) => n.st === 'čeka').reduce((s, n) => s + n.gotovina, 0))} €</b></div>
    <h2 style="font-size:var(--fs-lg);margin:0 0 10px">Narudžbe</h2>
    <table><thead><tr><th>Igračica</th><th>Artikl</th><th>Falcoini</th><th>Gotovina</th><th>Datum</th><th>Status</th><th></th></tr></thead><tbody>${NARUDZBE.map((n, i) => `<tr><td><b>${n.igr}</b></td><td>${n.artikl}<div class="meta">veličina ${n.velicina}${n.pre ? ' · ' + 'predbilježba' : ''} · cijena ${fmt(n.cijena)}</div></td><td>${fc(n.f)}</td>
      <td>${n.gotovina > 0 ? `<b>${fmt(n.gotovina)} €</b>` : '—'}</td><td>${n.dat}</td>
      <td>${n.st === 'čeka' ? chip('Čeka preuzimanje', 'warn') : n.st === 'izdano' ? chip('Izdano', 'ok') : chip('Otkazano', 'danger')}</td>
      <td>${n.st === 'čeka' ? `<div class="row" style="gap:6px"><button class="btn ghost sm" data-izdano="${i}">${n.gotovina > 0 ? 'Izdano i naplaćeno' : 'Izdano'}</button><button class="btn ghost sm" data-otkazi="${i}">Otkaži</button></div>` : ''}</td></tr>`).join('')}</tbody></table>
    <h2 style="font-size:var(--fs-lg);margin:28px 0 10px">Artikli</h2>
    <table><thead><tr><th>Artikl</th><th>Kategorija</th><th>Cijena (F = €)</th><th>Zaliha</th></tr></thead><tbody>${ORMAR.map((a) => `<tr><td><div class="who">${itemTile(a, 'sm')}<span>${a.ime}</span></div></td><td>${chip(a.kat, 'navy')}</td><td>${cijenaHtml(a)}</td>
      <td>${zaliha(a) ? `${zaliha(a)} kom` : '—'}${imaPre(a) ? ` ${chip('predbilježba', 'warn')}` : ''}</td></tr>`).join('')}</tbody></table>`,
  novosti: () => `<div class="page-head"><div><h1>Novosti</h1><div class="sub">Objave za roditelje, igračice i trenere</div></div><div class="grow"></div>
      <button class="btn" data-newpost>${ic('plus', 18)} Nova objava</button></div>
    <table><thead><tr><th>Objava</th><th>Za</th><th>Datum</th><th>Pročitalo</th></tr></thead><tbody>${NOVOSTI.map((n) => `<tr><td><b>${n.pin ? '📌 ' : ''}${n.naslov}</b><div class="meta">${chip(n.oznaka, OZNAKE[n.oznaka] || 'navy')}</div></td>
      <td>${chip(n.grupa === 'Svi' ? 'Svi roditelji' : n.grupa, 'navy')}</td><td>${n.dat}</td><td>${n.citalo ? `${n.citalo} / ${n.od}` : '—'}</td></tr>`).join('')}</tbody></table>`,
  grupe: () => `<div class="page-head"><div><h1>Grupe</h1><div class="sub">${GROUPS.length} grupa</div></div><div class="grow"></div>
      <button class="btn" data-toast="Nova grupa — sljedeći korak">${ic('plus', 18)} Nova grupa</button></div>
    <div class="grid-3">${GROUPS.map((g) => `<div class="card stack"><div class="row spread"><h2 style="font-size:var(--fs-xl)">${g.ime}</h2>${chip(g.cl + ' članica', 'navy')}</div>
      <div class="meta">Trener: <b style="color:var(--text)">${g.trener}</b></div><div class="meta">${g.raspored}</div></div>`).join('')}</div>`,
  raspored: () => adminKalendar(),
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
const state = { dan: TODAY, bio: false, citanoPo: {}, zelja: 7, izPrikl: false, izPriklIduci: false, zadFaza: 'aktivan', izTjedan: null, mfTab: 'izazov', admMj: { y: 2026, m: 10 }, admDan: '2026-11-24', skenirano: false, qrTip: 'trening' };
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
      ${ADMIN_NAV.map(([id, l, i]) => `<button class="${id === a || (a === 'profil' && id === 'clanovi') ? 'on' : ''}" data-go="admin-${id}">${ic(i, 20)}${l}${id === 'prijave' && pending() ? `<span class="badge">${pending()}</span>` : ''}${id === 'zadatak' && VIDEA.filter((v) => v.st === 'čeka').length ? `<span class="badge">${VIDEA.filter((v) => v.st === 'čeka').length}</span>` : ''}${id === 'ormar' && novihNarudzbi() ? `<span class="badge">${novihNarudzbi()}</span>` : ''}</button>`).join('')}<div class="sp"></div>
      <button>${ic('user', 20)}Mislav</button></aside><main class="main">${bellBtn('admin-bell', 'data-bell-admin')}<button class="cog admin-cog" data-opt-admin aria-label="Opcije">${ic('cog', 22)}</button>${ADMIN[a]()}</main></div>`;
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
const optRow = (label, extra = '', attrs = '') => `<div class="opt-row ${attrs}">${label}${extra}</div>`;
function optSheet() {
  const dev = $('.device'); if (!dev || dev.querySelector('.opt')) return;
  const o = document.createElement('div'); o.className = 'm-overlay opt';
  o.innerHTML = `<div class="m-sheet opts"><div class="row spread" style="margin-bottom:6px"><h2>Opcije</h2><button class="btn ghost sm" data-optclose>Zatvori</button></div>
    <div class="opt-list">
      <div class="opt-row" data-toast="Moj profil — sljedeći korak"><span class="grow">Moj profil</span>${ic('chev', 18)}</div>
      <div class="opt-row attend ${state.bio ? 'on' : ''}" data-optbio><span class="grow">Brza prijava<small>Otisak prsta / Face ID</small></span><div class="toggle"></div></div>
      <div class="opt-row" data-toast="Upute za instalaciju — sljedeći korak"><span class="grow">Upute za instalaciju aplikacije</span>${ic('chev', 18)}</div>
      <div class="opt-row" data-privacy><span class="grow">Pravila privatnosti</span>${ic('chev', 18)}</div>
      <div class="opt-row danger" data-go="start-login"><span class="grow">Odjava</span></div>
    </div></div>`;
  dev.appendChild(o);
}
function optAdmin() {
  modal(`<div class="row spread" style="margin-bottom:6px"><h2 style="font-size:var(--fs-xl)">Opcije</h2><button class="btn ghost sm" data-close>Zatvori</button></div>
    <div class="opt-list">
      <div class="opt-row" data-toast="Moj profil — sljedeći korak"><span class="grow">Moj profil</span>${ic('chev', 18)}</div>
      <div class="opt-row" data-toast="Postavke kluba: grupe, škole, sezone — sljedeći korak"><span class="grow">Postavke kluba<small>Grupe, popis škola, sezone</small></span>${ic('chev', 18)}</div>
      <div class="opt-row" data-toast="Korisnici i uloge — sljedeći korak"><span class="grow">Korisnici i uloge<small>Treneri, administratori</small></span>${ic('chev', 18)}</div>
      <div class="opt-row" data-toast="Predlošci e-mailova — sljedeći korak"><span class="grow">Predlošci e-mailova</span>${ic('chev', 18)}</div>
      <div class="opt-row danger" data-go="start-login"><span class="grow">Odjava</span></div>
    </div>`);
}
function showErr(form, name, msg) {
  const f = form.querySelector(`[data-field="${name}"]`);
  if (f) { f.querySelector('.input').classList.toggle('bad', !!msg); f.querySelector('.err').textContent = msg || ''; }
}
// datum rođenja: upis dd.mm.gggg (točke se dodaju same), u podacima se čuva kao gggg-mm-dd
function datOk(s) {
  const m = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(s); if (!m) return false;
  const [d, mo, y] = [+m[1], +m[2], +m[3]]; const t = new Date(y, mo - 1, d);
  return t.getFullYear() === y && t.getMonth() === mo - 1 && t.getDate() === d && y >= 2000 && t <= new Date();
}
const datIso = (s) => s.split('.').reverse().join('-');
function readForm(form) { const d = {}; new FormData(form).forEach((v, k) => (d[k] = v.toString().trim())); return d; }
const STEP1 = ['ime', 'prezime', 'rod', 'adresa', 'pbr', 'mjesto', 'oib'];
const STEP2 = ['mob', 'email', 'majica'];
function validate(form, step) {
  const d = readForm(form); let ok = true;
  const need = step === 1 ? STEP1 : step === 2 ? STEP2 : [...STEP1, ...STEP2];
  need.forEach((k) => { const bad = !d[k]; showErr(form, k, bad ? (k === 'majica' ? 'Odaberi veličinu' : 'Obavezno polje') : ''); if (bad) ok = false; });
  if (need.includes('rod') && d.rod && !datOk(d.rod)) { showErr(form, 'rod', 'Upiši datum kao dd.mm.gggg'); ok = false; }
  if (need.includes('oib') && d.oib && !oibOk(d.oib)) { showErr(form, 'oib', 'OIB nije ispravan'); ok = false; }
  if (need.includes('email') && d.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.email)) { showErr(form, 'email', 'Unesi ispravan e-mail'); ok = false; }
  if (step !== 1) {
    [['privola', 'Privola je obavezna za prijavu'], ['fotoPrivola', 'Privola za fotografiju je obavezna']].forEach(([k, msg]) => { form.querySelector(`[data-err="${k}"]`).textContent = d[k] ? '' : msg; if (!d[k]) ok = false; });
  }
  return ok ? d : null;
}
function goStep(form, n) {
  form.dataset.step = n;
  form.querySelectorAll('[data-stepbox]').forEach((b) => (b.hidden = +b.dataset.stepbox !== n));
  $('#wizStep').textContent = `${n}/2`; $('#wizTitle').textContent = n === 1 ? 'Podaci o djevojčici' : 'Kontakt i grupa';
  $('#wizBar').style.width = n === 1 ? '50%' : '100%';
  form.querySelector('[data-prev]').hidden = n === 1; form.querySelector('[data-next]').hidden = n === 2; form.querySelector('[type=submit]').hidden = n === 1;
  const body = form.closest('.app-body'); if (body) body.scrollTo({ top: 0, behavior: 'smooth' });
}
document.addEventListener('submit', (e) => {
  if (e.target.id === 'novostForm') {
    e.preventDefault(); const f = e.target; const d = readForm(f); let ok = true;
    ['naslov', 'tekst'].forEach((k) => { const bad = !d[k]; showErr(f, k, bad ? 'Obavezno polje' : ''); if (bad) ok = false; });
    if (!ok) return;
    NOVOSTI.unshift({ id: Date.now(), pin: !!d.pin, oznaka: d.oznaka, grupa: d.grupa, dat: '24.11.2026.', naslov: d.naslov, tekst: d.tekst, citalo: 0, od: d.grupa === 'Svi' ? 128 : (GROUPS.find((g) => g.ime === d.grupa) || { cl: 0 }).cl });
    closeModal(); render(); return;
  }
  if (e.target.id === 'loginForm') {
    e.preventDefault(); const f = e.target; const d = readForm(f); let ok = true;
    showErr(f, 'email', d.email ? '' : 'Upiši e-mail'); showErr(f, 'lozinka', d.lozinka ? '' : 'Upiši lozinku');
    if (!d.email || !d.lozinka) ok = false;
    if (ok) bioSheet(); // u pravoj aplikaciji: uloga dolazi iz računa; prijedlog se nudi samo ako uređaj to podržava
    return;
  }
  if (e.target.id !== 'prijavaForm') return; e.preventDefault();
  if (e.target.dataset.step === '1') { if (validate(e.target, 1)) goStep(e.target, 2); return; }
  const d = validate(e.target); if (!d) { if (!validate(e.target, 1)) { goStep(e.target, 1); return; } const b = e.target.querySelector('.bad, .err:not(:empty)'); if (b) b.scrollIntoView({ block: 'center', behavior: 'smooth' }); return; }
  const dup = prijave.some((p) => p.oib === d.oib); // u pravoj aplikaciji: i provjera protiv postojećih članica
  const p = { id: Date.now(), dat: '24.11.2026.', ...d, rod: datIso(d.rod), foto: false, status: 'ceka', dup };
  prijave.unshift(p); state.zadnja = p; location.hash = 'prijava-poslano';
});
document.addEventListener('change', (e) => { if (e.target.id === 'vidFile') { const n = $('#vidName'); if (n && e.target.files[0]) n.textContent = e.target.files[0].name; } });
document.addEventListener('input', (e) => { if (e.target.id === 'kasnMin') e.target.style.background = kasnBoja(parseInt(e.target.value, 10) || 0); });
document.addEventListener('click', (e) => {
  const nx = e.target.closest('[data-next]'); if (nx) { const f = nx.closest('form'); if (validate(f, 1)) goStep(f, 2); else { const b = f.querySelector('.bad'); if (b) b.scrollIntoView({ block: 'center', behavior: 'smooth' }); } return; }
  const pv = e.target.closest('[data-prev]'); if (pv) { goStep(pv.closest('form'), 1); return; }
  if (e.target.closest('[data-privacy]')) { e.preventDefault(); privacySheet(); return; }
  if (e.target.closest('[data-opt]')) { optSheet(); return; }
  if (e.target.closest('[data-opt-admin]')) { optAdmin(); return; }
  if (e.target.closest('[data-optclose]') || e.target.classList.contains('opt')) { const o = document.querySelector('.m-overlay.opt'); if (o) o.remove(); return; }
  const ob = e.target.closest('[data-optbio]');
  if (ob) { state.bio = !state.bio; ob.classList.toggle('on', state.bio); return; }
  if (e.target.closest('[data-go]')) closeModal();
  const eye = e.target.closest('[data-eye]');
  if (eye) { const i = eye.parentElement.querySelector('input'); i.type = i.type === 'password' ? 'text' : 'password'; return; }
  const bio = e.target.closest('[data-bio]');
  if (bio) {
    if (bio.dataset.bio === 'yes') { const t = $('#toastIn'); t.textContent = 'Brza prijava uključena (u pravoj aplikaciji: potvrda otiskom/Face ID-jem)'; t.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 1800); setTimeout(() => (location.hash = 'roditelj-pocetna'), 1100); }
    else location.hash = 'roditelj-pocetna';
    return;
  }
  if (e.target.closest('[data-fill]')) {
    const f = $('#prijavaForm'); Object.entries(SAMPLE).forEach(([k, v]) => { const el = f.elements[k]; if (el) el.value = k === 'rod' ? v.split('-').reverse().join('.') : v; });
    f.elements.privola.checked = true; f.elements.fotoPrivola.checked = true; return;
  }
  if (e.target.closest('[data-close]') || e.target.classList.contains('modal')) { closeModal(); return; }
  const op = e.target.closest('[data-open]');
  if (op) {
    const p = prijave.find((x) => x.id === +op.dataset.open);
    const red = (l, v) => `<div class="kv"><span>${l}</span><b>${v || '—'}</b></div>`;
    modal(`<div class="row spread" style="margin-bottom:12px"><h2 style="font-size:var(--fs-xl)">${p.ime} ${p.prezime}</h2>${chip(STATUS_P[p.status][0], STATUS_P[p.status][1])}</div>
      ${p.dup && p.status === 'ceka' ? '<div class="alert">⚠ OIB se podudara s postojećom prijavom/članicom. Provjeri prije potvrde.</div>' : ''}
      <div class="kvs">${red('Datum rođenja', fmtDat(p.rod))}${red('OIB', p.oib)}${red('Adresa', `${p.adresa}, ${p.pbr} ${p.mjesto}`)}
      ${red('Mobitel', p.mob)}${red('E-mail', p.email)}${red('Zatražena grupa', p.grupa)}${red('Veličina majice', p.majica)}${red('Privola za fotografiju', p.foto ? 'Da' : 'Ne')}</div>
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
  if (e.target.closest('[data-scan]')) { scanSheet(); return; }
  if (e.target.closest('[data-hdrqr]')) { const u = uloga(); if (u === 'igracica') scanSheet(); else if (u === 'trener') location.hash = 'trener-qr'; return; }
  if (e.target.closest('[data-scanok]')) { scanResult(); return; }
  if (e.target.closest('[data-fxclose]')) { closeOverlay(); render(); return; }
  if (e.target.closest('[data-izprikl]')) { state.izPrikl = true; IZAZOV.odradeno = 0; render(); toastIn('Priključila si se zadatku'); notify('trener', 'Tjedni zadatak', 'Ana Horvat se priključila zadatku: ' + IZAZOV.naslov); return; }
  if (e.target.closest('[data-zhist]')) { zadatakPovijestSheet(); return; }
  const zp = e.target.closest('[data-zproto]'); if (zp) {
    const [g, v] = zp.dataset.zproto.split(':');
    if (g === 'vrsta') {
      const def = { dolasci: ['Tjedan bez izostanka', 'Dođi na sva 3 treninga ovaj tjedan.'], video: ['Snimi kako zabijaš tricu', 'Snimi 3 pokušaja trice i pošalji najbolji.'], foto: ['Fotografiraj svoj Falcons dres', 'Pošalji fotografiju sebe u dresu ispred koša.'] }[v];
      IZAZOV.vrsta = v; IZAZOV.naslov = def[0]; IZAZOV.opis = def[1]; state.video = null;
    } else state.video = v === 'nista' ? null : { igr: 'Ana', datoteka: IZAZOV.vrsta === 'foto' ? 'dres.jpg' : 'trica.mp4', st: v, tip: IZAZOV.vrsta };
    render(); return; }
  const zf = e.target.closest('[data-zfaza]'); if (zf) { state.zadFaza = zf.dataset.zfaza; render(); return; }
  if (e.target.closest('[data-izprikl2]')) { state.izPriklIduci = true; render(); toastIn('Priključena si idućem zadatku'); return; }
  const mt = e.target.closest('[data-mftab]'); if (mt) { state.mfTab = mt.dataset.mftab; render(); return; }
  const ml = e.target.closest('[data-mile]');
  if (ml) { const m = MILESTONES.find((x) => x.id === ml.dataset.mile); if (m.dat) overlay(`<div class="mile-big">${m.glif}</div><h2>${m.naslov}</h2><p>${m.opis}</p><div class="meta">Otkriveno ${m.dat}</div><button class="btn block" data-fxclose>Super</button>`); else toastIn('Još je skriveno — otkrit će se kad ga ostvariš'); return; }
  const zl = e.target.closest('[data-zelja]'); if (zl) { const id = +zl.dataset.zelja; state.zelja = state.zelja === id ? null : id; render(); if (state.zelja) toastIn('Dodano u My favorites'); return; }
  if (e.target.closest('[data-vidopen]')) { videoSheet(); return; }
  if (e.target.closest('[data-vidsend]')) { const f = $('#vidFile') && $('#vidFile').files[0]; const v = { igr: 'Ana Horvat', datoteka: f ? f.name : (IZAZOV.vrsta === 'foto' ? 'dres_ana.jpg' : 'trica_ana.mp4'), st: 'čeka', ana: true, tip: IZAZOV.vrsta };
    if (state.video) VIDEA.splice(VIDEA.indexOf(state.video), 1); VIDEA.unshift(v); state.video = v; closeOverlay(); render(); toastIn(IZAZOV.vrsta === 'foto' ? 'Fotografija poslana treneru' : 'Video poslan treneru');
    notify('admin', 'Novi rad za zadatak', `Ana Horvat: ${v.datoteka}`); notify('trener', 'Novi rad za zadatak', `Ana Horvat je poslala ${IZAZOV.vrsta === 'foto' ? 'fotografiju' : 'video'}: ${IZAZOV.naslov}`); return; }
  const mp = e.target.closest('[data-mapa]'); if (mp) { const k = +mp.dataset.mapa; state.admMapa = state.admMapa === k ? -1 : k; render(); return; }
  const vsk = e.target.closest('[data-vidskini]'); if (vsk) { const [mi, ri] = vsk.dataset.vidskini.split(':'); const f = mapeSve()[+mi]; toastIn(ri === 'sve' ? `Preuzimanje mape "${f.naziv}" (ZIP) — u prototipu se ne preuzima` : `Preuzimanje: ${f.radovi[+ri].datoteka} — u prototipu se ne preuzima`); return; }
  const vb = e.target.closest('[data-vidbrisi]'); if (vb) { const [mi, ri] = vb.dataset.vidbrisi.split(':'); mapeSve()[+mi].radovi.splice(+ri, 1); toastIn('Rad je obrisan iz mape'); render(); return; }
  const vk = e.target.closest('[data-vidok],[data-vidno]');
  if (vk) { const ok = vk.dataset.vidok !== undefined; const v = VIDEA[+(ok ? vk.dataset.vidok : vk.dataset.vidno)]; v.st = ok ? 'odobreno' : 'odbijeno';
    const pl = PLAYERS.find((p) => p.ime === v.igr);
    if (ok && pl) { const n = IZAZOV.nagrada; FALCOINI[pl.id] = r2(FALCOINI[pl.id] + n); if (pl.id === IGR_ID) { FALCOIN_POVIJEST.unshift({ dat: 'Danas', opis: `Tjedni zadatak: ${IZAZOV.naslov}`, iznos: n }); notify('igracica', 'Zadatak odobren', `Dobila si +${fmt(n)} ${FLC} za tjedni zadatak.`); notify('roditelj', 'Zadatak odobren', `Ana je ispunila tjedni zadatak (+${fmt(n)} ${FLC}).`); } }
    else if (v.ana) notify('igracica', 'Rad nije prihvaćen', 'Probaj ponovno.');
    render(); return; }
  const am = e.target.closest('[data-admmj]');
  if (am) { const v = +am.dataset.admmj; if (v === 0) { state.admMj = { y: 2026, m: 10 }; state.admDan = '2026-11-24'; } else { let { y, m } = state.admMj; m += v; if (m < 0) { m = 11; y--; } if (m > 11) { m = 0; y++; } state.admMj = { y, m }; } render(); return; }
  const ad = e.target.closest('[data-admdan]'); if (ad) { state.admDan = ad.dataset.admdan; render(); return; }
  const iu = e.target.closest('[data-izuredi]');
  if (iu) { state.izTjedan = +iu.dataset.izuredi; if (!location.hash.includes('admin-zadatak')) { location.hash = 'admin-zadatak'; } else render(); return; }
  const isp = e.target.closest('[data-izspremi]');
  if (isp) { const i = +isp.dataset.izspremi; const naslov = $('#izNaslov').value.trim(); if (!naslov) { toastIn('Upiši naslov izazova'); return; }
    const z = { vrsta: $('#izVrsta').value, naslov, opis: $('#izOpis').value.trim(), cilj: Math.max(1, Math.min(7, +$('#izCilj').value || 3)), prikljuci: true, nagrada: r2(Math.max(0, +$('#izNagrada').value || 0)), odradeno: 0, do: `nedjelje ${IZ_TJEDNI[i][1]} u 12:00` };
    if (i === 0) { Object.assign(IZAZOV, z); state.video = null; state.izPrikl = false; notify('igracica', 'Novi tjedni zadatak', 'Priključi se i otkrij što te čeka.'); notify('roditelj', 'Novi tjedni zadatak', 'Za tvoju igračicu je objavljen novi tjedni zadatak.'); } else IZ_PLAN[i] = z;
    toastIn(i === 0 ? 'Zadatak je objavljen' : 'Zadatak je planiran'); render(); return; }
  const ib = e.target.closest('[data-izbrisi]'); if (ib) { IZ_PLAN[+ib.dataset.izbrisi] = null; state.izTjedan = null; render(); return; }
  if (e.target.closest('[data-zhelp]')) { overlay(`<h2>Što je tjedni zadatak?</h2>
    <p>Svaki tjedan, od <b>ponedjeljka u 00:01 do nedjelje u 12:00</b>, klub igračicama zadaje jedan izazov.</p>
    <p>Priključiti se možeš od nedjelje u 12:01 za idući tjedan, a zadatak se priključenima otkriva u ponedjeljak u 00:01. <b>Zadatak je tajna.</b> Naziv, opis i nagrada vide se tek kad se priključiš. Napredak se računa od trenutka priključivanja.</p>
    <p>Za ispunjen zadatak dobivaš <b>dodatne Falcoine</b>, a iznos ovisi o težini zadatka.</p>
    <p>Ako je zadatak video ili fotografija, nakon uploada treba ga odobriti tvoj trener ili trenerica kako bi zadatak bio u potpunosti izvršen.</p>
    <p>Video ili fotografiju možeš poslati <b>samo jednom tjedno</b>, zato pažljivo odaberi što šalješ.</p>
    <button class="btn block" data-fxclose>Razumijem</button>`); return; }
  if (e.target.closest('[data-flchelp]')) { overlay(`<div style="display:flex;justify-content:center">${coinSvg(56)}</div><h2>Što je FLC?</h2>
    <p><b>FLC</b> je kratica za <b>Falcoin</b>, virtualnu valutu kluba. Skupljaš ih dolascima na treninge, utakmice i turnire te bonusima, a mijenjaš ih za artikle u Ormaru.</p>
    <p><b>1 FLC = 1 €.</b> Ako ti Falcoina nema dovoljno za artikl, ostatak doplaćuješ gotovinom pri preuzimanju kod trenera.</p>
    <div class="section-title small" style="margin:6px 0 4px">Kako zarađuješ</div>
    <div class="card earn" style="box-shadow:none;border:1px solid var(--silver-100)"><div class="list">${FALCOIN_PRAVILA.map((r) => `<div class="row spread"><span style="font-size:var(--fs-sm)">${r.label}</span>${fc(r.iznos)}</div>`).join('')}</div></div>
    <button class="btn block" data-fxclose>Razumijem</button>`); return; }
  const rd = e.target.closest('[data-redeem]'); if (rd) { redeemSheet(+rd.dataset.redeem); return; }
  const sz = e.target.closest('[data-size]');
  if (sz && state.redeem) { state.redeem.size = sz.dataset.size; document.querySelectorAll('.sizes .size').forEach((b) => b.classList.toggle('on', b === sz)); const a = ORMAR.find((x) => x.id === state.redeem.id); $('#rdNote').innerHTML = rdNote(a, state.redeem.f); $('#rdBtn').textContent = rdBtn(a, state.redeem.f, state.redeem.size); return; }
  const vo = e.target.closest('[data-velopen]'); if (vo) { const p = PLAYERS.find((x) => x.id === +vo.dataset.velopen), vl = velOd(p);
    overlay(`<h2>Moje veličine</h2><div class="meta" style="margin-top:-4px">Za odjevne predmete iz Ormara. Možeš ih promijeniti kad god želiš.</div>
      <label class="vel-row"><span>Veličina majice</span><select id="velMajica"><option value="">Odaberi</option>${MAJICE.map((m) => `<option ${m === vl.majica ? 'selected' : ''}>${m}</option>`).join('')}</select></label>
      <label class="vel-row"><span>Veličina noge</span><select id="velNoga"><option value="">Odaberi</option>${NOGE.map((m) => `<option ${m === vl.noga ? 'selected' : ''}>${m}</option>`).join('')}</select></label>
      <button class="btn red block" data-velsave="${p.id}">Spremi</button><button class="btn ghost block" data-fxclose>Odustani</button>`); return; }
  const vs = e.target.closest('[data-velsave]'); if (vs) { const p = PLAYERS.find((x) => x.id === +vs.dataset.velsave), vl = velOd(p); vl.majica = $('#velMajica').value || null; vl.noga = $('#velNoga').value || null; closeOverlay(); render(); toastIn('Veličine su spremljene'); return; }
  const ts = e.target.closest('[data-tsize]'); if (ts) { (state.ormarVel = state.ormarVel || {})[+ts.dataset.aid] = ts.dataset.tsize; render(); return; }
  const ok = e.target.closest('[data-okat]'); if (ok) { state.ormarKat = ok.dataset.okat; render(); return; }
  const rk = e.target.closest('[data-redeemok]');
  if (rk) { const a = ORMAR.find((x) => x.id === +rk.dataset.redeemok); const v = a.velicine.find((x) => x.v === state.redeem.size); const f = r2(Math.min(state.redeem.f || 0, saldo(), a.cijena)); const cash = r2(a.cijena - f);
    { const pre = !(v.n > 0); FALCOINI[IGR_ID] = r2(FALCOINI[IGR_ID] - f); if (!pre) v.n--; NARUDZBE.unshift({ igr: 'Ana Horvat', artikl: a.ime, velicina: v.v, pre, cijena: a.cijena, f, gotovina: cash, dat: '24.11.2026.', st: 'čeka' });
      if (f > 0) FALCOIN_POVIJEST.unshift({ dat: 'Danas', opis: `Rezervirano: ${a.ime} (${v.v})`, iznos: -f }); }
    notify('admin', 'Nova narudžba u Ormaru', `Ana Horvat: ${a.ime} (${v.v}), ${fmt(a.cijena)}${cash > 0 ? ` · naplatiti ${fmt(cash)} €` : ''}`); closeOverlay(); render(); toastIn(cash > 0 ? `Narudžba poslana — doplati ${fmt(cash)} € pri preuzimanju` : 'Narudžba poslana — preuzmi na treningu'); return; }
  const qt = e.target.closest('[data-qrtip]'); if (qt) { state.qrTip = qt.dataset.qrtip; render(); return; }
  const iz = e.target.closest('[data-izdano]'); if (iz) { NARUDZBE[+iz.dataset.izdano].st = 'izdano'; render(); return; }
  const ot = e.target.closest('[data-otkazi]');
  if (ot) { const n = NARUDZBE[+ot.dataset.otkazi]; n.st = 'otkazano'; const pl = PLAYERS.find((p) => p.ime === n.igr); const a = ORMAR.find((x) => x.ime === n.artikl); const vv = a && a.velicine.find((x) => x.v === n.velicina); if (vv && vv.n !== null && !n.pre) vv.n++;
    if (pl) { FALCOINI[pl.id] = r2(FALCOINI[pl.id] + n.f); if (pl.id === IGR_ID && n.f > 0) FALCOIN_POVIJEST.unshift({ dat: 'Danas', opis: `Povrat: ${n.artikl} (otkazano)`, iznos: n.f }); } render(); return; }
  const fg = e.target.closest('[data-fcgive]');
  if (fg) { const sign = +fg.dataset.fcgive, id = +$('#fcWho').value, n = r2(Math.abs(+$('#fcAmt').value)), why = $('#fcWhy').value.trim(), err = $('#fcErr'); const ime = PLAYERS.find((p) => p.id === id).ime;
    if (!n) { err.textContent = 'Upiši iznos'; return; }
    if (sign < 0 && !why) { err.textContent = 'Za oduzimanje upiši razlog'; return; }
    if (sign < 0 && FALCOINI[id] < n) { err.textContent = `${ime} ima samo ${fmt(FALCOINI[id])}`; return; }
    FALCOINI[id] = r2(FALCOINI[id] + sign * n);
    if (id === IGR_ID) FALCOIN_POVIJEST.unshift({ dat: 'Danas', opis: why || 'Ručno dodijeljeno', iznos: sign * n });
    state.fcMsg = `${sign > 0 ? 'Dodijeljeno' : 'Oduzeto'} ${fmt(n)} — ${ime}, novo stanje ${fmt(FALCOINI[id])}`; render(); return; }
  if (e.target.closest('[data-newpost]')) { newPostSheet(); return; }
  const nw = e.target.closest('[data-news]');
  if (nw) { const id = +nw.dataset.news; nw.classList.toggle('open'); nw.querySelector('.more').textContent = nw.classList.contains('open') ? 'Prikaži manje' : 'Prikaži više';
    if (citanoSet().add(id) && nw.classList.contains('unread')) { nw.classList.remove('unread'); const dot = nw.querySelector('.dot'); if (dot) dot.remove(); const sub = $('.app-header .sub'); if (sub) sub.textContent = neprocitano() ? `${neprocitano()} nepročitano` : 'Sve pročitano'; } return; }
  const pr = e.target.closest('[data-profil]');
  if (pr) { state.profil = +pr.dataset.profil; const u = location.hash.slice(1).split('-')[0]; location.hash = u === 'admin' ? 'admin-profil' : `${u}-igracica`; return; }
  if (e.target.closest('[data-bell]')) { overlay(`<div class="row spread" style="margin-bottom:6px"><h2>Obavijesti</h2><button class="btn ghost sm" data-fxclose>Zatvori</button></div>${bellList()}`); markRead(); return; }
  if (e.target.closest('[data-bell-admin]')) { modal(`<div class="row spread" style="margin-bottom:6px"><h2 style="font-size:var(--fs-xl)">Obavijesti</h2><button class="btn ghost sm" data-close>Zatvori</button></div>${bellList()}`); markRead(); return; }
  if (e.target.closest('[data-attsave]')) {
    const lista = PLAYERS.slice(0, 8); const n = pravilo('trening'); let dano = 0, vraceno = 0;
    lista.forEach((p) => {
      if (att[p.id] && !awarded[p.id]) { awarded[p.id] = true; FALCOINI[p.id] = r2((FALCOINI[p.id] || 0) + n); dano++;
        if (p.id === IGR_ID) { FALCOIN_POVIJEST.unshift({ dat: 'Danas', opis: 'Trening U14 · 17:30', iznos: n });
          notify('igracica', 'Falcoini za dolazak', `Dobila si +${fmt(n)} Falcoin za dolazak na trening U14 (24.11.)${kasn[IGR_ID] ? ` — kašnjenje od ${kasn[IGR_ID]} min računa se kao dolazak` : ''}. Novo stanje: ${fmt(saldo())}.`);
          notify('roditelj', 'Falcoini za dolazak', `${p.ime} je dobila +${fmt(n)} Falcoin za dolazak na trening U14 (24.11.).`); } }
      else if (!att[p.id] && awarded[p.id]) { awarded[p.id] = false; FALCOINI[p.id] = r2(Math.max(0, FALCOINI[p.id] - n)); vraceno++;
        if (p.id === IGR_ID) { state.skenirano = false; FALCOIN_POVIJEST.unshift({ dat: 'Danas', opis: 'Ispravak dolaska · Trening U14', iznos: -n });
          notify('igracica', 'Ispravak dolaska', `Dolazak na trening U14 (24.11.) je ispravljen, ${fmt(n)} Falcoin je oduzet.`); } }
    });
    DOLAZAK_TJEDAN['1-U14-17:30'] = att[IGR_ID] ? (kasn[IGR_ID] || 'da') : 'ne';
    toastIn(dano || vraceno ? `Spremljeno · dodijeljeno ${fmt(dano * n)} Falcoina za ${dano} ${dano === 1 ? 'igračicu' : 'igračica'}${vraceno ? `, vraćeno ${vraceno}` : ''}` : 'Dolasci spremljeni — nema promjena'); return;
  }
  const rs = e.target.closest('[data-rsvp]');
  const au = e.target.closest('[data-admutk]');
  if (au) { const [k, off] = au.dataset.admutk.split('-'); if (k === 'termin') UTAKMICA.termin = !off; else UTAKMICA.dvorana = off ? false : 'Dvorana A';
    if (UTAKMICA.termin && UTAKMICA.dvorana) { const t = `Utakmica ${UTAKMICA.datum} u ${UTAKMICA.vrijeme} (${UTAKMICA.dvorana}) je potvrđena.`; notify('igracica', 'Utakmica potvrđena', t); notify('roditelj', 'Utakmica potvrđena', t); notify('trener', 'Utakmica potvrđena', t); }
    render(); toastIn('Spremljeno'); return; }
  const uo = e.target.closest('[data-utkotkaz]');
  if (uo) { state.utkOtkaz = uo.dataset.utkotkaz === '1'; if (state.utkOtkaz) state.utkOdg = null;
    notify('trener', state.utkOtkaz ? 'Ne stavljaj na popis: Ana Horvat' : 'Ana Horvat ipak može', state.utkOtkaz ? `Roditelj je javio da Ana Horvat ne može na utakmicu ${UTAKMICA.datum}. Ne stavljaj je na popis.` : `Roditelj je javio da Ana Horvat ipak može na utakmicu ${UTAKMICA.datum}.`);
    notify('igracica', state.utkOtkaz ? 'Roditelj je javio da ne možeš na utakmicu' : 'Roditelj je javio da ipak možeš na utakmicu', `Utakmica ${UTAKMICA.datum}.`);
    render(); toastIn(state.utkOtkaz ? 'Javljeno treneru: Ana ne može na utakmicu' : 'Javljeno: Ana ipak može'); return; }
  if (e.target.closest('[data-utkobjavi]')) { state.utkPopis = true; const t = `Popis za utakmicu ${UTAKMICA.datum} je objavljen. Potvrdi dolazak što prije.`;
    if (utkNaPopisu()) { notify('igracica', 'Popis objavljen — potvrdi dolazak', t); notify('roditelj', 'Popis objavljen — potvrdite dolazak', t); }
    render(); toastIn('Popis objavljen: igračice i roditelji potvrđuju dolazak'); return; }
  const ug = e.target.closest('[data-utk],[data-utkr]');
  if (ug) { const roditelj = ug.hasAttribute('data-utkr'); state.utkOdg = roditelj ? ug.dataset.utkr : ug.dataset.utk; state.utkTko = roditelj ? 'roditelj' : 'igracica'; const d = state.utkOdg === 'da';
    if (roditelj) notify('igracica', d ? 'Roditelj je javio dolazak' : 'Roditelj je javio nedolazak', `Roditelj je javio da ${d ? 'dolaziš' : 'ne dolaziš'} na utakmicu ${UTAKMICA.datum} u ${UTAKMICA.vrijeme}.`);
    else notify('roditelj', d ? 'Ana dolazi na utakmicu' : 'Ana ne dolazi na utakmicu', `Ana je javila da ${d ? 'dolazi' : 'ne dolazi'} na utakmicu ${UTAKMICA.datum} u ${UTAKMICA.vrijeme}.`);
    const b = utkBrojevi(); notify('trener', `Utakmica: ${b.da} dolazi`, `Ana Horvat ${d ? 'dolazi' : 'ne dolazi'}. Dolazi ${b.da}, ne dolazi ${b.ne}, čeka ${b.ceka}.`);
    render(); toastIn(d ? 'Javljeno: dolazak na utakmicu' : 'Javljeno: nedolazak na utakmicu'); return; }
  if (e.target.closest('[data-utkpodsjeti]')) { toastIn(`Podsjetnik poslan: ${utkBrojevi().ceka} igračica / roditelja`); notify('igracica', 'Potvrdi dolazak na utakmicu', `Trener čeka tvoj odgovor za utakmicu ${UTAKMICA.datum}.`); notify('roditelj', 'Potvrdite dolazak na utakmicu', `Trener čeka odgovor za utakmicu ${UTAKMICA.datum}.`); return; }
  const rr = e.target.closest('[data-rsvpr]');
  if (rr && !rr.disabled) { state.rsvp = rr.dataset.rsvpr; state.rsvpTko = 'roditelj'; const d = state.rsvp === 'da';
    notify('igracica', d ? 'Roditelj je javio dolazak' : 'Roditelj je javio nedolazak', `Roditelj je javio da ${d ? 'dolaziš' : 'ne dolaziš'} na današnji trening (${DANAS_TRENING.vrijeme}).`);
    notify('trener', d ? 'Najava dolaska' : 'Najava nedolaska', `Ana Horvat: roditelj je javio da ${d ? 'dolazi' : 'ne dolazi'} na trening ${DANAS_TRENING.vrijeme}.`);
    render(); toastIn(d ? 'Javljeno: Ana dolazi na trening' : 'Javljeno: Ana ne dolazi na trening'); return; }
  if (rs && !rs.disabled) { state.rsvp = rs.dataset.rsvp; state.rsvpTko = 'igracica'; notify('roditelj', state.rsvp === 'da' ? 'Ana dolazi na trening' : 'Ana ne dolazi na trening', `Ana je javila da ${state.rsvp === 'da' ? 'dolazi' : 'ne dolazi'} na današnji trening (${DANAS_TRENING.vrijeme}).`); render(); toastIn(state.rsvp === 'da' ? 'Javljeno: dolaziš na trening' : 'Javljeno: ne dolaziš na trening'); return; }
  if (e.target.closest('[data-izopen]')) { izostanakSheet(); return; }
  const ir = e.target.closest('[data-izrazlog]'); if (ir) { state.izForm.razlog = ir.dataset.izrazlog; document.querySelectorAll('[data-izrazlog]').forEach((b) => b.classList.toggle('on', b === ir)); return; }
  const idn = e.target.closest('[data-izdana]'); if (idn) { state.izForm.dana = +idn.dataset.izdana; document.querySelectorAll('[data-izdana]').forEach((b) => b.classList.toggle('on', b === idn)); $('#izNote').textContent = izNote(); return; }
  if (e.target.closest('[data-izsend]')) { const f = state.izForm; state.izostanak = { razlog: f.razlog, do: f.dana === 0 ? null : TODAY + f.dana - 1 };
    notify('trener', 'Izostanak: Ana Horvat', `${f.razlog} · ${izDo(state.izostanak)}`); notify('roditelj', 'Izostanak javljen', `Ana je javila dulji izostanak: ${f.razlog} (${izDo(state.izostanak)}).`);
    closeOverlay(); render(); toastIn('Izostanak je javljen treneru'); return; }
  if (e.target.closest('[data-izend]')) { state.izostanak = null; render(); toastIn('Izostanak je završen — vidimo se na treningu!'); notify('trener', 'Izostanak završen', 'Ana Horvat se vratila na treninge.'); return; }
  const lt = e.target.closest('[data-late]');
  const sb = e.target.closest('[data-st]');
  if (sb) { const id = +sb.dataset.id, k = sb.dataset.st; if (id === IGR_ID && izPokriva(TODAY)) { toastIn('Ana ima javljen izostanak'); return; }
    if (k === 'kasni') { kasnjenjeSheet(id); return; }
    attRuc[id] = true; att[id] = k !== 'ne'; kasn[id] = 0; render(); return; }
  const km = e.target.closest('[data-kmin]'); if (km) { $('#kasnMin').value = km.dataset.kmin; $('#kasnMin').style.background = kasnBoja(km.dataset.kmin); return; }
  const ks = e.target.closest('[data-ksave]'); if (ks) { const id = +ks.dataset.ksave, v = Math.max(1, Math.min(90, parseInt($('#kasnMin').value, 10) || 0)); attRuc[id] = true; att[id] = true; kasn[id] = v; closeOverlay(); render(); return; }
  const tj = e.target.closest('[data-tjedan]'); if (tj) { tj.classList.toggle('open'); return; }
  const a = e.target.closest('[data-att]');
  if (a) {
    const id = +a.dataset.att; if (id === IGR_ID && izPokriva(TODAY)) { toastIn('Ana ima javljen izostanak'); return; } att[id] = !att[id]; if (!att[id]) kasn[id] = 0; render(); return;
  }
  const t = e.target.closest('[data-toast]'); if (t) { const inner = $('#toastIn'); if (inner) { inner.textContent = t.dataset.toast; inner.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => inner.classList.remove('show'), 1800); } else { const g = $('#toast'); g.textContent = t.dataset.toast; g.classList.add('show', 'fixed'); clearTimeout(toastT); toastT = setTimeout(() => g.classList.remove('show'), 1800); } return; }
  const f = e.target.closest('[data-f]');
  if (f) { document.querySelectorAll('#filters .chip').forEach((c) => c.classList.toggle('on', c === f)); $('#rows').innerHTML = memberRows($('#q').value, f.dataset.f); }
});
document.addEventListener('input', (e) => {
  if (e.target.name === 'rod' && e.target.closest('#prijavaForm')) {
    const z = e.target.value.replace(/\D/g, '').slice(0, 8);
    e.target.value = [z.slice(0, 2), z.slice(2, 4), z.slice(4)].filter(Boolean).join('.') + (z.length === 2 || z.length === 4 ? '.' : '');
  }
  if (e.target.id === 'q') { const on = $('#filters .chip.on'); $('#rows').innerHTML = memberRows(e.target.value, on ? on.dataset.f : 'Sve'); }
});
window.addEventListener('hashchange', render);
render();

// klizač: dio u Falcoinima, ostatak gotovinom
document.addEventListener('input', (e) => {
  if (!e.target.matches('[data-fcslider]') || !state.redeem) return;
  const a = ORMAR.find((x) => x.id === state.redeem.id); const f = r2(+e.target.value); state.redeem.f = f;
  $('#rdF').textContent = `${fmt(f)} ${FLC}`; $('#rdC').textContent = `${fmt(a.cijena - f)} €`; $('#rdNote').innerHTML = rdNote(a, f); $('#rdBtn').textContent = rdBtn(a, f, state.redeem.size);
});
// pravila bodovanja: spremanje pri promjeni, na dvije decimale
document.addEventListener('change', (e) => {
  if (!e.target.matches('[data-rule]')) return;
  const r = FALCOIN_PRAVILA.find((x) => x.k === e.target.dataset.rule); r.iznos = r2(Math.max(0, +e.target.value || 0)); e.target.value = r.iznos.toFixed(2);
});
