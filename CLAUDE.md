# Košarka — klupski sustav ŽKK Falcons Zagreb

Veliki klupski sustav koji zamjenjuje Falcons Tracker (portal.zkkfalcons.hr) i Relago:
članovi, grupe, treninzi i dolasci, članarine/uplate, portal za roditelje i igračice.

## Dogovori

- **Mobile-first PWA.** Roditelji, igračice i treneri koriste aplikaciju na mobitelu
  (instalirana na početni ekran). **Admin** dobiva i desktop verziju (miš, lakši upis).
- **Stack:** PHP + MySQL na HostGatoru. Bez Composera/frameworka dok se ne dokaže da radi
  (packagist.org je ranije bio blokiran). Čisti PHP, jasna struktura, PDO.
- **Redoslijed:** prvo sučelje (klikabilni prototip s izmišljenim podacima u `prototype/`),
  tek kad se odobri, spajanje na PHP i bazu. Prototip je pisan tako da se pretvara
  u PHP predloške bez prepisivanja.
- **Cilj prije puštanja:** ~80% funkcija (članstvo, grupe, treninzi, članarine s uvozom
  Erste izvoda, portal, potvrde). Utakmice/statistika, sponzori i obavijesti dolaze poslije.
- Staging: app.zkkfalcons.hr (odvojena baza). Live portal se ne dira dok nije spremno.
- Jezik sučelja: **hrvatski**. Kod i komentari mogu biti na hrvatskom ili engleskom, ali dosljedno.

## Dizajn (ŽKK Falcons)

| Token  | Vrijednost |
|--------|-----------|
| Navy   | `#182454` |
| Crvena | `#C04848` |
| Zlatna | `#F0B64E` |
| Srebrna| `#B4C0CC` |

- Font: **Montserrat** (naslovi 800/900, tekst 400–600).
- Boje su izvučene iz PNG logotipa, nisu službene. Provjeriti s brandbookom/vektorom.
- Emblem sokola (vektor, bez natpisa): `prototype/assets/falcons-emblem.svg` — za značke, ikone i male formate.
- Puni logo s natpisom: `prototype/assets/falcons-logo.png` (obrezan PNG s prozirnom pozadinom; originalni SVG/vektor još treba dodati).
  Na ekranima za prijavljene korisnike (zaglavlja, admin izbornik, welcome mail) u gornjem lijevom kutu stoji samo
  **emblem sokola bez pozadine i bez bijelog kvadratića**; tamnoplava krila na navy podlozi drži tanki srebrni obrub
  (CSS `drop-shadow`, kao obrub na originalnom logotipu) — `.logo-badge`.
  **Početna (prijava) je iznimka**: središnji logo (pola veličine) na plavoj podlozi.
- Potpis "App made by lots of ☕ by Bluerider Design": `prototype/assets/bluerider-logo-light.svg` (svijetla varijanta bez natpisa DESIGN, za tamnu
  podlogu), link na https://bluerider.hr.

## Poslovna pravila koja treba poštovati

- Igračica može biti u **više grupa** istovremeno (članstvo više-na-više).
- Kategorija na potvrdi određuje se **po godini rođenja**, ne po grupi; granice su
  specifične za sezonu i provjeravaju se svake sezone. Iznimka: škole košarke (partnerske
  škole) uvijek dobivaju tekst "škola košarke".
- Uplate se svaki ponedjeljak uvoze iz Erste izvoda (WRI format) i sparuju s članovima.
- Podaci o članovima i uplatama sada postoje samo u Relagu: treba plan migracije.

## Prijava nove članice (javni obrazac)

- Javni link (bez prijave) → obrazac → tablica `prijave` sa statusom "čeka" → admin potvrđuje i dodjeljuje grupu →
  tek tada nastaju igračica, roditeljski račun i veza, i šalje se welcome mail (link za lozinku + upute za instalaciju).
  (Prijedlog "mail tek nakon potvrde admina" — čeka potvrdu vlasnika.)
- Obrazac je **jedan okvir u dva koraka**: 1/2 podaci o djevojčici (ime, prezime, datum rođenja, OIB, adresa, poštanski broj, mjesto),
  2/2 kontakt roditelja, grupa, napomena i privole ("Dalje" provjerava korak 1, "Natrag" čuva unos). Link "Imam račun, prijavi me" je odmaknut od vrha.
- Polja (kao u Relagu): ime, prezime, datum rođenja (spol se ne pita: ženski klub), adresa, poštanski broj, mjesto, OIB,
  mobitel, e-mail roditelja, grupa, napomena + privole (privatnost obavezna; fotografija odvojeno).
- Grupa u obrascu: **Selekcija** (admin kasnije određuje U12/U14/U16/SEN) ili **Škola košarke – OŠ 1, OŠ 2…**
  (popis škola upravlja admin).
- Datum rođenja se **upisuje brojevima** (numerička tipkovnica, točke se dodaju same, oblik dd.mm.gggg), ne bira kalendarom; u bazi `gggg-mm-dd`.
- OIB: provjera kontrolne znamenke (ISO 7064 MOD 11,10); OIB ne sadrži datum rođenja, zato se pita posebno.
- `igracice.oib` i `roditelji.email` jedinstveni; isti e-mail + nova djevojčica → veže se na postojećeg roditelja;
  poznati OIB → prijava se označi "moguća dvostruka".
- Instalacija je PWA (ne trgovina aplikacija): Android Chrome "Instaliraj aplikaciju", iPhone Safari "Dodaj na početni zaslon".
- Fotografiju igračice naknadno učitava admin (privola za fotografiju se pamti uz igračicu).

## Prijava

- Početna: e-mail + lozinka, "Ostani prijavljena" (dugotrajna sesija), "Zatraži račun" vodi na obrazac prijave nove članice.
- Prijava otiskom prsta / Face ID-jem (passkey/WebAuthn) **ne stoji na početnoj**: nudi se **nakon prve uspješne prijave**
  ("Uključi brzu prijavu?" — Uključi / Ne sada), a može se uključiti i kasnije u Profilu. Na iPhoneu se nudi unutar
  instalirane aplikacije (PWA ima odvojenu prijavu od Safarija).

## Opcije (zupčanik)

- Zupčanik gore desno na svim ekranima za prijavljene (mobitel: u zaglavlju; admin: u kutu glavnog dijela).
- Mobitel: Moj profil, Brza prijava (prekidač za otisak prsta / Face ID), Upute za instalaciju, Pravila privatnosti, Odjava.
- Admin: Moj profil, Postavke kluba (grupe, popis škola, sezone), Korisnici i uloge, Predlošci e-mailova, Odjava.

## Struktura

- `prototype/` — klikabilni HTML prototip (mobitel + admin desktop), izmišljeni podaci
- `assets/` — logo i ostali resursi (dodati)
