// IZMIŠLJENI PODACI — samo za prototip. Imena i iznosi nisu stvarni.
const GROUPS = [
  { id: 'u12', ime: 'U12', trener: 'Ivan Petrović', cl: 14, raspored: 'Uto, Čet 16:00' },
  { id: 'u14', ime: 'U14', trener: 'Ivan Petrović', cl: 16, raspored: 'Pon, Uto, Čet 17:30' },
  { id: 'u16', ime: 'U16', trener: 'Maja Šimić', cl: 15, raspored: 'Pon, Sri, Pet 19:00' },
  { id: 'sen', ime: 'SEN', trener: 'Maja Šimić', cl: 13, raspored: 'Uto, Čet 20:30' },
  { id: 'skola', ime: 'Škola košarke', trener: 'Luka Barić', cl: 38, raspored: 'Pon, Sri 15:00' },
];

const PLAYERS = [
  { id: 1, foto: true, ime: 'Ana Horvat', god: 2012, grupe: ['U14'], roditelj: 'Marija Horvat', clanarina: 'ok' },
  { id: 2, foto: true, ime: 'Mia Kovač', god: 2012, grupe: ['U14'], roditelj: 'Petar Kovač', clanarina: 'ok' },
  { id: 3, ime: 'Lana Babić', god: 2013, grupe: ['U14', 'U12'], roditelj: 'Ivana Babić', clanarina: 'due' },
  { id: 4, foto: true, ime: 'Petra Marić', god: 2011, grupe: ['U14'], roditelj: 'Josip Marić', clanarina: 'ok' },
  { id: 5, ime: 'Ivana Jurić', god: 2012, grupe: ['U14'], roditelj: 'Katarina Jurić', clanarina: 'late' },
  { id: 6, foto: true, ime: 'Sara Novak', god: 2013, grupe: ['U14'], roditelj: 'Tomislav Novak', clanarina: 'ok' },
  { id: 7, foto: true, ime: 'Marta Knežević', god: 2012, grupe: ['U14'], roditelj: 'Ema Knežević', clanarina: 'ok' },
  { id: 8, ime: 'Luna Vuković', god: 2012, grupe: ['U14'], roditelj: 'Davor Vuković', clanarina: 'due' },
  { id: 9, foto: true, ime: 'Nika Pavlić', god: 2010, grupe: ['U16'], roditelj: 'Sanja Pavlić', clanarina: 'ok' },
  { id: 10, ime: 'Eva Božić', god: 2010, grupe: ['U16', 'SEN'], roditelj: 'Mario Božić', clanarina: 'ok' },
  { id: 11, foto: true, ime: 'Lea Matić', god: 2016, grupe: ['Škola košarke'], roditelj: 'Dora Matić', clanarina: 'due' },
  { id: 12, ime: 'Tena Perić', god: 2008, grupe: ['SEN'], roditelj: '—', clanarina: 'ok' },
];

const CLANARINA = {
  ok: { label: 'Plaćeno', cls: 'ok' },
  due: { label: 'Dospijeva', cls: 'warn' },
  late: { label: 'Kasni', cls: 'danger' },
};

const DANI = ['Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub', 'Ned'];
// raspored po danu (0 = ponedjeljak)
const TRENINZI = {
  0: [
    { v: '15:00', do: '16:30', g: 'Škola košarke', d: 'Dvorana B' },
    { v: '17:30', do: '19:00', g: 'U14', d: 'OŠ Ante Kovačića' },
    { v: '19:00', do: '20:30', g: 'U16', d: 'OŠ Ante Kovačića' },
  ],
  1: [
    { v: '16:00', do: '17:30', g: 'U12', d: 'Dvorana B' },
    { v: '17:30', do: '19:00', g: 'U14', d: 'OŠ Ante Kovačića' },
    { v: '20:30', do: '22:00', g: 'SEN', d: 'OŠ Ante Kovačića' },
  ],
  2: [
    { v: '15:00', do: '16:30', g: 'Škola košarke', d: 'Dvorana B' },
    { v: '17:30', do: '19:00', g: 'U14', d: 'OŠ Ante Kovačića' },
    { v: '19:00', do: '20:30', g: 'U16', d: 'OŠ Ante Kovačića' },
  ],
  3: [
    { v: '16:00', do: '17:30', g: 'U12', d: 'Dvorana B' },
    { v: '17:30', do: '19:00', g: 'U14', d: 'OŠ Ante Kovačića' },
    { v: '20:30', do: '22:00', g: 'SEN', d: 'OŠ Ante Kovačića' },
  ],
  4: [{ v: '19:00', do: '20:30', g: 'U16', d: 'OŠ Ante Kovačića' }],
  5: [],
  6: [],
};

const UPLATE = [
  { dat: '24.11.', platitelj: 'MARIJA HORVAT', opis: 'Članarina studeni - Ana Horvat', iznos: 35, st: 'ok', clan: 'Ana Horvat' },
  { dat: '24.11.', platitelj: 'P KOVAC', opis: 'clanarina Mia', iznos: 35, st: 'ok', clan: 'Mia Kovač' },
  { dat: '24.11.', platitelj: 'JOSIP MARIC', opis: 'Petra studeni', iznos: 35, st: 'ok', clan: 'Petra Marić' },
  { dat: '23.11.', platitelj: 'D MATIC', opis: 'članarina 11/2026', iznos: 30, st: 'review', clan: 'Više podudaranja (Lea / Luka Matić)' },
  { dat: '23.11.', platitelj: 'ZAGREB D.O.O.', opis: 'Donacija', iznos: 200, st: 'none', clan: 'Nije članarina' },
  { dat: '22.11.', platitelj: 'E KNEZEVIC', opis: 'Marta Knezevic 11', iznos: 35, st: 'ok', clan: 'Marta Knežević' },
];

// Novosti za roditelje (grupa: 'Svi' ili naziv grupe). citalo = koliko je roditelja otvorilo objavu.
const NOVOSTI = [
  { id: 1, pin: true, oznaka: 'Važno', grupa: 'Svi', dat: '24.11.2026.', naslov: 'Promjena termina u dvorani B ovaj petak',
    tekst: 'Zbog održavanja dvorane B trening Škole košarke u petak se održava u dvorani A, u isto vrijeme. Molimo roditelje da djecu dovedu 10 minuta ranije kako bismo stigli pripremiti teren.', citalo: 41, od: 52 },
  { id: 2, oznaka: 'Klub', grupa: 'Svi', dat: '22.11.2026.', naslov: 'Fotografiranje ekipa — subota u 10:00',
    tekst: 'U subotu snimamo službene fotografije svih ekipa u dvorani A. Dođite u klupskim dresovima, a roditelje molimo da obavezno ponesu potpisanu privolu za fotografiju ako je još nisu predali.', citalo: 78, od: 128 },
  { id: 3, oznaka: 'Trening', grupa: 'U14', dat: '20.11.2026.', naslov: 'U14: dodatni trening četvrtkom',
    tekst: 'Do kraja prosinca U14 ima dodatni trening četvrtkom u 17:30. Dolazak je preporučen, a trener Ivan javlja detalje na treningu.', citalo: 12, od: 16 },
  { id: 4, oznaka: 'Članarina', grupa: 'Svi', dat: '18.11.2026.', naslov: 'Članarina za studeni dospijeva do 30.11.',
    tekst: 'Podsjećamo da članarina za studeni dospijeva do kraja mjeseca. Podaci za uplatu nalaze se u izborniku Članarina, a uplate se ažuriraju svakog ponedjeljka.', citalo: 96, od: 128 },
  { id: 5, oznaka: 'Škola košarke', grupa: 'Škola košarke', dat: '15.11.2026.', naslov: 'Škola košarke: nova grupa OŠ 3',
    tekst: 'Otvaramo novu grupu u OŠ 3, ponedjeljkom i srijedom u 15:00. Ima još nekoliko slobodnih mjesta, a prijava ide preko javnog obrasca.', citalo: 30, od: 38 },
];

// ---------- Falcoini i Ormar (webshop) ----------
// 1 Falcoin = 1 € (iznosi na dvije decimale). Vrijednosti su izmišljene.
const FALCOIN_PRAVILA = [
  { k: 'trening', label: 'Dolazak na trening', iznos: 1.0 },
  { k: 'utakmica', label: 'Dolazak na utakmicu (gledanje)', iznos: 2.5 },
  { k: 'turnir', label: 'Dolazak na turnir', iznos: 4.0 },
  { k: 'pomoc', label: 'Pomoć u organizaciji (ručno)', iznos: 1.5 },
];
// Stvarni katalog s ormar.zkkfalcons.hr (stanje 24.11.2026.). n = na stanju, n: null = predbilježba. Slike se učitavaju sa shopa.
const ORMAR_KATEGORIJE = ['Sve', 'Majice', 'Čarape', 'Torbe', 'Paketi'];
const ORMAR = [
  { id: 1, ime: "Paket čarapa – 3 para", cijena: 25.0, staraCijena: 30.0, kat: "Paketi", slika: 'https://ormar.zkkfalcons.hr/uploads/products/p_64462ca82f456aaa.jpg', opis: "Čarape \"FLCN\" bijele, plave i crvene", velicine: [{ v: "37–41", n: 73 }, { v: "42–46", n: 19 }] },
  { id: 2, ime: "Trening paket", cijena: 20.0, staraCijena: 24.0, kat: "Paketi", slika: 'https://ormar.zkkfalcons.hr/uploads/products/p_bcb638b037eb80e5.jpg', opis: "T-shirt \"Logo one color\" crvena + T-shirt \"Falcons Basketball\"", velicine: [{ v: "S", n: 4 }, { v: "Kids XS", n: 2 }, { v: "Kids M", n: 8 }, { v: "Kids L", n: 26 }, { v: "Kids XL", n: 7 }, { v: "M", n: null }, { v: "L", n: null }, { v: "XL", n: null }] },
  { id: 3, ime: "Falcons Zagreb", cijena: 12.0, kat: "Majice", slika: 'https://ormar.zkkfalcons.hr/uploads/products/p_f16f8512c532d374.jpg', velicine: [{ v: "XS", n: null }, { v: "S", n: null }, { v: "M", n: null }, { v: "L", n: null }, { v: "XL", n: null }, { v: "XXL", n: null }] },
  { id: 4, ime: "Čarape \"FLCN\" bijele", cijena: 10.0, kat: "Čarape", slika: 'https://ormar.zkkfalcons.hr/uploads/products/p_64462ca82f456aaa.jpg', velicine: [{ v: "37–41", n: 74 }, { v: "42–46", n: 19 }] },
  { id: 5, ime: "Čarape \"FLCN\" plave", cijena: 10.0, kat: "Čarape", slika: 'https://ormar.zkkfalcons.hr/uploads/products/p_b7074e76170f907e.jpg', velicine: [{ v: "37–41", n: 74 }, { v: "42–46", n: 19 }] },
  { id: 6, ime: "Čarape \"FLCN\" crvene", cijena: 10.0, kat: "Čarape", slika: 'https://ormar.zkkfalcons.hr/uploads/products/p_45f290ea6b2ebbe8.jpg', velicine: [{ v: "37–41", n: 73 }, { v: "42–46", n: 19 }] },
  { id: 7, ime: "Ruksak \"Falcons\"", cijena: 50.0, kat: "Torbe", slika: 'https://ormar.zkkfalcons.hr/uploads/products/p_6a67064e287b461a.jpg', opis: "Ruksaci su naručeni — predbilježba", velicine: [{ v: "Jedna veličina", n: null }] },
  { id: 8, ime: "T-shirt \"Logo one color\" plava", cijena: 12.0, kat: "Majice", slika: 'https://ormar.zkkfalcons.hr/uploads/products/p_42dd971bd5c22d7a.jpg', velicine: [{ v: "XS", n: 3 }, { v: "S", n: 2 }, { v: "XL", n: 3 }, { v: "M", n: null }, { v: "L", n: null }, { v: "XXL", n: null }] },
  { id: 9, ime: "T-shirt \"Logo one color\" crvena", cijena: 12.0, kat: "Majice", slika: 'https://ormar.zkkfalcons.hr/uploads/products/p_bcb638b037eb80e5.jpg', velicine: [{ v: "XS", n: 3 }, { v: "S", n: 4 }, { v: "Kids XS", n: 2 }, { v: "Kids M", n: 8 }, { v: "Kids L", n: 26 }, { v: "Kids XL", n: 7 }, { v: "M", n: null }, { v: "L", n: null }, { v: "XL", n: null }, { v: "XXL", n: null }] },
  { id: 10, ime: "T-shirt \"Falcon\"", cijena: 17.0, kat: "Majice", slika: 'https://ormar.zkkfalcons.hr/uploads/products/p_e502d54fa3ade141.jpg', velicine: [{ v: "M", n: 1 }, { v: "L", n: 3 }, { v: "XL", n: 2 }, { v: "XS", n: null }, { v: "S", n: null }, { v: "XXL", n: null }] },
  { id: 11, ime: "T-shirt \"Falcons Colorful\"", cijena: 17.0, kat: "Majice", slika: 'https://ormar.zkkfalcons.hr/uploads/products/p_3a402266f6887976.jpg', velicine: [{ v: "XS", n: 1 }, { v: "L", n: 1 }, { v: "XL", n: 2 }, { v: "S", n: null }, { v: "M", n: null }, { v: "XXL", n: null }] },
  { id: 12, ime: "T-shirt \"FLCN\" crvena", cijena: 12.0, kat: "Majice", slika: 'https://ormar.zkkfalcons.hr/uploads/products/p_2e958618c771473b.jpg', velicine: [{ v: "S", n: 1 }, { v: "L", n: 1 }, { v: "XL", n: 3 }, { v: "XS", n: null }, { v: "M", n: null }, { v: "XXL", n: null }] },
  { id: 13, ime: "T-shirt \"FLCN\" plava", cijena: 12.0, kat: "Majice", slika: 'https://ormar.zkkfalcons.hr/uploads/products/p_27331364a8e239ab.jpg', velicine: [{ v: "XS", n: 1 }, { v: "L", n: 3 }, { v: "S", n: null }, { v: "M", n: null }, { v: "XL", n: null }, { v: "XXL", n: null }] },
  { id: 14, ime: "T-shirt \"Falcons Basketball\"", cijena: 12.0, kat: "Majice", slika: 'https://ormar.zkkfalcons.hr/uploads/products/p_9633b109daddf24e.jpg', velicine: [{ v: "S", n: 8 }, { v: "M", n: 2 }, { v: "L", n: 3 }, { v: "XL", n: 1 }, { v: "Kids XS", n: 2 }, { v: "Kids M", n: 8 }, { v: "Kids L", n: 26 }, { v: "Kids XL", n: 7 }, { v: "XS", n: null }, { v: "XXL", n: null }] },
  { id: 15, ime: "T-shirt \"Logo\" plava", cijena: 17.0, kat: "Majice", slika: 'https://ormar.zkkfalcons.hr/uploads/products/p_53b95a5086465648.jpg', velicine: [{ v: "XS", n: null }, { v: "S", n: null }, { v: "M", n: null }, { v: "L", n: null }, { v: "XL", n: null }, { v: "XXL", n: null }] },
  { id: 16, ime: "T-shirt \"Logo\" crvena", cijena: 17.0, kat: "Majice", slika: 'https://ormar.zkkfalcons.hr/uploads/products/p_c9d8ee8aa1311b81.jpg', velicine: [{ v: "XS", n: null }, { v: "S", n: null }, { v: "M", n: null }, { v: "L", n: null }, { v: "XL", n: null }, { v: "XXL", n: null }] },
];
const FALCOINI = { 1: 18.5, 2: 24.0, 3: 9.5, 4: 31.0, 5: 6.0, 6: 15.0, 7: 20.5, 8: 4.0, 9: 27.5, 10: 33.0, 11: 12.0, 12: 9.0 };
const FALCOIN_POVIJEST = [
  { dat: '21.11.', opis: 'Utakmica U14 — gostovanje', iznos: 2.5 },
  { dat: '20.11.', opis: 'Trening U14', iznos: 1.0 },
  { dat: '18.11.', opis: 'Trening U14', iznos: 1.0 },
  { dat: '17.11.', opis: 'Bonus: tjedni zadatak', iznos: 3.0 },
  { dat: '14.11.', opis: 'Zamjena: Čarape "FLCN" bijele', iznos: -10.0 },
  { dat: '13.11.', opis: 'Trening U14', iznos: 1.0 },
];
// f = plaćeno Falcoinima (rezervirano pri narudžbi), gotovina = ostatak za naplatiti pri preuzimanju
const NARUDZBE = [
  { igr: 'Mia Kovač', artikl: 'T-shirt "Logo one color" crvena', velicina: 'Kids L', pre: false, cijena: 12.0, f: 8.0, gotovina: 4.0, dat: '23.11.2026.', st: 'čeka' },
  { igr: 'Petra Marić', artikl: 'Čarape "FLCN" plave', velicina: '37–41', pre: false, cijena: 10.0, f: 10.0, gotovina: 0, dat: '22.11.2026.', st: 'čeka' },
  { igr: 'Lana Babić', artikl: 'T-shirt "Logo" crvena', velicina: 'M', pre: true, cijena: 17.0, f: 9.5, gotovina: 7.5, dat: '21.11.2026.', st: 'čeka' },
  { igr: 'Ana Horvat', artikl: 'Čarape "FLCN" bijele', velicina: '37–41', pre: false, cijena: 10.0, f: 10.0, gotovina: 0, dat: '14.11.2026.', st: 'izdano' },
];
