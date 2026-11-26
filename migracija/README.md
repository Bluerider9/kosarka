# Migracija iz Falcons Trackera (portal.zkkfalcons.hr)

Izvor: phpMyAdmin dump `bluerder_portalwebapp` (MySQL 5.7, 26.11.2026.). **Dump i sve izvedene datoteke s osobnim podacima nisu u gitu** (`.gitignore`: `*.sql`, `migracija/podaci/`).

## Što stara baza ima (broj redaka)

| Tablica | Redaka | Sadržaj | Novi sustav |
|---|---|---|---|
| `players` | 76 | ime, prezime, datum/godina rođenja, telefon, `parent_contact` (jedno tekstualno polje), OIB, napomene, active | `igracice` (+ roditelji se tek stvaraju: **nema e-maila ni zasebnih roditelja**) |
| `player_groups` | 137 | igračica ↔ grupa (`is_primary`) | članstvo više-na-više |
| `groups_table` | 12 | `kind` = **trening** (U18/U16/U14, U13/U12, SEN, ŠK A. Kovačić, ŠK O. Iveković) ili **sastav** (Seniorke, Juniorke, Kadetkinje, Pretkadetkinje, U13, U12, U11) | vidi "Odluke" |
| `schedule_slots` / `trainings` | 16 / 128 | tjedni termini po grupi (dan, vrijeme, dvorana, trener) i stvarni treninzi | raspored, treninzi |
| `attendance` | 1648 | dolazak po treningu: `present`, `status` (prisutna…), `late_minutes` | dolasci (kašnjenje u minutama već postoji) |
| `player_schedule_exceptions` | 13 | igračica izuzeta iz termina | |
| `leagues` / `matches_table` | 8 / 56 | lige po sastavu, kola: datum, `is_home`, protivnik, dvorana, vrijeme; **bez rezultata** | **Lige / Protivnici** (već uvezeno u prototip) |
| `locations` | 6 | dvorane s cijenom najma po satu | dvorane |
| `admins` | 5 | korisnici: administrator / trener, bcrypt hash, `price_per_training` (naknada) | korisnici i uloge |
| `finance_payments` | 2 | praćenje računa/plaćanja po mjesecu za dvorane i trenere | **nije u prototipu** |
| `chat_messages`, `chat_reads` | 5, 5 | chat | **nije u prototipu** |
| `parent_remember_tokens` | 98 | "zapamti me" tokeni roditeljskog portala (prijava OIB-om djeteta) | ne migrira se |

**Nema:** članarina/uplata, Falcoina, novosti, veličina, privola. Uplate i članstvo su (kao što piše u CLAUDE.md) samo u Relagu.

## Skripte

- `dump_parser.py` — čita phpMyAdmin dump u Python rječnike (bez MySQL-a).
- `lige_iz_dumpa.py <dump.sql>` — generira `prototype/js/lige-podaci.js` (lige, kola, protivnici, dvorane; **bez osobnih podataka**). Protivnici su normalizirani (maknuto "ŽKK "/"KK ", točka na kraju; "Sisak" = "KK Sisak" — potvrđeno 26.11.). Domaćin koji igra izvan klupskih dvorana označen je kao **zamjena domaćinstva**, a ta dvorana je upisana kod protivnika.

## Odluke koje čekaju

1. **Grupe:** stari sustav razlikuje *trening grupe* (za raspored/dolaske) i *sastave* (za lige). Prototip koristi U12/U14/U16/SEN/Škole. Treba odlučiti: dvije vrste grupa u novom sustavu (preporuka, jer odgovara načinu rada), i kako se sastavi (Kadetkinje…) odnose na kategorije po godištu.
2. **Lozinke trenera/admina:** hashevi su bcrypt (`$2y$`), PHP ih može provjeriti; ili ih ne prenositi i svima poslati poveznicu za novu lozinku.
3. **Roditelji:** `parent_contact` je slobodan tekst; roditeljski računi se stvaraju iz e-maila koji se mora ponovno prikupiti (npr. pozivnica roditeljima).
4. **Financije dvorana i trenera** (cijena najma po satu, naknada po treningu, računi po mjesecu) postoje u starom sustavu: treba li ih u novom.
5. **Rezultati utakmica** nisu u staroj bazi.
