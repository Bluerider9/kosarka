// IZMIŠLJENI PODACI — samo za prototip. Imena i iznosi nisu stvarni.
const GROUPS = [
  { id: 'u12', ime: 'U12', trener: 'Ivan Petrović', cl: 14, raspored: 'Uto, Čet 16:00' },
  { id: 'u14', ime: 'U14', trener: 'Ivan Petrović', cl: 16, raspored: 'Pon, Uto, Čet 17:30' },
  { id: 'u16', ime: 'U16', trener: 'Maja Šimić', cl: 15, raspored: 'Pon, Sri, Pet 19:00' },
  { id: 'sen', ime: 'SEN', trener: 'Maja Šimić', cl: 13, raspored: 'Uto, Čet 20:30' },
  { id: 'skola', ime: 'Škola košarke', trener: 'Luka Barić', cl: 38, raspored: 'Pon, Sri 15:00' },
];

const PLAYERS = [
  { id: 1, ime: 'Ana Horvat', god: 2012, grupe: ['U14'], roditelj: 'Marija Horvat', clanarina: 'ok' },
  { id: 2, ime: 'Mia Kovač', god: 2012, grupe: ['U14'], roditelj: 'Petar Kovač', clanarina: 'ok' },
  { id: 3, ime: 'Lana Babić', god: 2013, grupe: ['U14', 'U12'], roditelj: 'Ivana Babić', clanarina: 'due' },
  { id: 4, ime: 'Petra Marić', god: 2011, grupe: ['U14'], roditelj: 'Josip Marić', clanarina: 'ok' },
  { id: 5, ime: 'Ivana Jurić', god: 2012, grupe: ['U14'], roditelj: 'Katarina Jurić', clanarina: 'late' },
  { id: 6, ime: 'Sara Novak', god: 2013, grupe: ['U14'], roditelj: 'Tomislav Novak', clanarina: 'ok' },
  { id: 7, ime: 'Marta Knežević', god: 2012, grupe: ['U14'], roditelj: 'Ema Knežević', clanarina: 'ok' },
  { id: 8, ime: 'Luna Vuković', god: 2012, grupe: ['U14'], roditelj: 'Davor Vuković', clanarina: 'due' },
  { id: 9, ime: 'Nika Pavlić', god: 2010, grupe: ['U16'], roditelj: 'Sanja Pavlić', clanarina: 'ok' },
  { id: 10, ime: 'Eva Božić', god: 2010, grupe: ['U16', 'SEN'], roditelj: 'Mario Božić', clanarina: 'ok' },
  { id: 11, ime: 'Lea Matić', god: 2016, grupe: ['Škola košarke'], roditelj: 'Dora Matić', clanarina: 'due' },
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
    { v: '17:30', do: '19:00', g: 'U14', d: 'Dvorana A' },
    { v: '19:00', do: '20:30', g: 'U16', d: 'Dvorana A' },
  ],
  1: [
    { v: '16:00', do: '17:30', g: 'U12', d: 'Dvorana B' },
    { v: '17:30', do: '19:00', g: 'U14', d: 'Dvorana A' },
    { v: '20:30', do: '22:00', g: 'SEN', d: 'Dvorana A' },
  ],
  2: [
    { v: '15:00', do: '16:30', g: 'Škola košarke', d: 'Dvorana B' },
    { v: '19:00', do: '20:30', g: 'U16', d: 'Dvorana A' },
  ],
  3: [
    { v: '16:00', do: '17:30', g: 'U12', d: 'Dvorana B' },
    { v: '17:30', do: '19:00', g: 'U14', d: 'Dvorana A' },
    { v: '20:30', do: '22:00', g: 'SEN', d: 'Dvorana A' },
  ],
  4: [{ v: '19:00', do: '20:30', g: 'U16', d: 'Dvorana A' }],
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
