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

- **Radni naziv aplikacije: Oko Soko** (maskota kluba je Falko). Naziv je u `prototype/js/app.js` (`APP_NAME`), mijenja se na jednom mjestu. Još treba provjeriti je li ime slobodno.
  Logotip: `prototype/assets/oko-soko-logo-light.svg` (bijela slova, za tamnu podlogu) i `oko-soko-logo-dark.svg` (navy slova, za svijetlu) — Montserrat Black u krivuljama; dva "O" u OKO su oči sokola (zlatna šarenica, spušteni kapci, pogled prema K), a zadnji "O" u SOKO je košarkaška lopta (zlatna, navy šavovi).

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
- Potpis "Made by lots of ☕ by BLUE RIDER DESIGN": **tekst** (ne logotip), velika slova, razmaknuta, zlatni podvlaka; link na https://bluerider.hr.

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
  2/2 kontakt roditelja, grupa, veličina majice i privole ("Dalje" provjerava korak 1, "Natrag" čuva unos). Link "Imam račun, prijavi me" je odmaknut od vrha.
- Polja (kao u Relagu): ime, prezime, datum rođenja (spol se ne pita: ženski klub), adresa, poštanski broj, mjesto, OIB,
  mobitel, e-mail roditelja, grupa, veličina majice za nošenje (obavezno, umjesto napomene) + privole (obje privole obavezne: privatnost i fotografija, svaka zasebna kvačica).
- Grupa u obrascu: **Selekcija** (admin kasnije određuje U12/U14/U16/SEN) ili **Škola košarke – OŠ 1, OŠ 2…**
  (popis škola upravlja admin).
- Privole: tekst u obliku "kao roditelj/skrbnik dajem privolu…" (djevojčice su maloljetne), link na **Pravila privatnosti** (prozor preko obrasca, nacrt teksta
  koji treba pravno provjeriti i dopuniti podacima kluba). Uz prijavu se pri spajanju baze sprema datum i vrijeme privole.
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

## Profil igračice

- Svaka igračica ima **profil** (fotografija, grupe, kategorija po godištu, dolaznost, članarina, osobni podaci, roditelj/kontakt, potvrde i privole).
- Vidljivost po ulozi: **admin** sve (uključujući OIB, e-mail, povijest uplata, uređivanje, fotografija, promjena grupe); **roditelj** njezin profil bez kontakta
  (adresa, članarina, potvrde, privole); **trener** grupe, osnovne podatke i kontakt roditelja, bez OIB-a i financija; **igračica** vlastiti profil (tab "Profil").
- **Veličine (majica i noga):** kartica **"Moje veličine"** na profilu — **roditelj i igračica** mogu upisati/promijeniti veličinu majice i veličinu noge (padajući izbor, sprema se odmah, dijele isti podatak); admin i trener ih samo vide u "Osobni podaci". Služe za Ormar (majice, čarape).
- Ulazi: admin → Članovi → red; roditelj → gumb "Profil" na kartici; trener → Dolasci → strelica uz ime; igračica → tab Profil.

## Novosti za roditelje

- Roditelj ima tab **Novosti** (popis objava, prikvačene na vrhu, crvena točka = nepročitano, tap otvara cijeli tekst) i karticu s posljednjom novošću na početnoj.
- Admin ima stranicu **Novosti**: popis objava s oznakom, publikom (svi ili jedna grupa) i brojem pročitanih, te "Nova objava" (naslov, tekst, za koga, oznaka, prikvači).
- Roditelj vidi objave za "Svi" i za grupe svojih djevojčica. Push obavijesti i e-mail za nove objave dolaze kasnije (nisu u prototipu).

## Falcoini i Ormar

- **Falcoin** je klupska virtualna valuta; igračice ih skupljaju dolascima (trening, utakmica, turnir, bonusi) i mijenjaju za artikle u klupskom webshopu **Ormar**.
- **Bilježenje dolaska QR kodom:** trener u svojoj aplikaciji otvori QR za termin (bira vrstu: trening / utakmica / turnir), igračica ga skenira u svojoj aplikaciji → dolazak se sprema i dobiva Falcoine.
  Kod vrijedi samo za taj termin, jedan dolazak po igračici po terminu, trener može označiti dolazak i ručno (Dolasci). Prava aplikacija: QR s potpisanim tokenom (termin + vrijeme), kamera u PWA-u.
- Bodovi (admin ih mijenja, dvije decimale): trening 1,00, utakmica 2,50, turnir 4,00, bonus za niz od 5 treninga 2,00, ručno dodjeljivanje 1,50 (npr. pomoć u organizaciji).
- **Katalog Ormara** preuzet s https://ormar.zkkfalcons.hr (16 artikala, stanje 24.11.2026.): kategorije Sve/Majice/Čarape/Torbe/Paketi, artikli imaju veličine sa zalihom ("na stanju N") ili "predbilježba"; cijene u Falcoinima; paketi imaju dvije cijene (30/25, 24/20 — nejasno koja je akcijska, prototip prikazuje nižu kao aktualnu). Slike se hotlinkaju s ormar.zkkfalcons.hr/uploads/products/. Pravi Ormar naručuje preko WhatsAppa; u aplikaciji narudžba ide kroz sustav.
- **Veličina se bira izravno na artiklu u Ormaru** (kapsule 37–41 / 42–46 / XS–XL…); "na stanju N" prikazuje zalihu **odabrane veličine** (ili "predbilježba" / "nema na stanju" – tada je gumb isključen); odabir se prenosi u prozor narudžbe.
- **Ormar prema veličinama iz profila:** artikli koji **na stanju imaju upravo njezinu veličinu** (majica; noga u rasponu čarapa) stoje **prvi**, sa zlatnim okvirom i oznakom "Tvoja veličina" i već odabranom veličinom. Svi ostali (nema njezine veličine ili nema zalihe) su **sivi** s gumbom **"Prednaruči"** (predbilježba, bez umanjenja zalihe). Dječje brojeve majice mapiramo na Kids veličine (116/128 → Kids XS, 140 → Kids M, 152 → Kids L, 164 → Kids XL) — **provjeriti s pravom tablicom veličina**.
- Igračica: tabovi **Falcoini** (stanje, skeniranje, povijest, kako zarađuješ) i **Ormar** (artikli, "Zamijeni"; stanje se odmah umanjuje, artikl se preuzima kod trenera).
- Admin: stranice **Falcoini** (pravila, ljestvica, ručno dodjeljivanje) i **Ormar** (narudžbe s "Označi izdano", artikli i zaliha). Falcoini se vide i na profilu igračice (ne treneru).
- **1 Falcoin = 1 €**; svi iznosi (stanje, cijene, pravila bodovanja) imaju **dvije decimale** (hrvatski zapis 12,50). Računa se na cente i zaokružuje na 2 decimale.
- **Miješano plaćanje:** igračica klizačem bira koliko plaća Falcoinima, ostatak doplaćuje **gotovinom pri preuzimanju**. Pri narudžbi se odabrani Falcoini odmah **rezerviraju** (skidaju sa stanja);
  admin u Ormaru vidi koliko treba naplatiti ("Izdano i naplaćeno") ili narudžbu **otkaže**, pri čemu se Falcoini vraćaju na stanje (a zaliha povećava). Planirano: automatsko otkazivanje nakon 7 dana.
- Admin može Falcoine **dodijeliti i oduzeti** (oduzimanje traži razlog; stanje ne može biti negativno). Pravila bodovanja se mijenjaju na stranici Falcoini.
- Za gotovinu u prodaji robe provjeriti s knjigovođom treba li račun/fiskalizacija.
- Otvoreno: vrijede li Falcoini po sezoni ili stalno; treba li roditelj potvrditi zamjenu; trebaju li se bodovi poništiti ako trener ispravi dolazak; prave slike artikala.

## Dolasci → Falcoini i obavijesti

- Kad trener pritisne **"Spremi dolaske"**, svaka prisutna igračica automatski dobiva Falcoine za trening (iznos iz pravila bodovanja). Ponovno spremanje ne duplira bodove; ako trener kasnije skine kvačicu, bodovi se oduzimaju (ispravak u povijesti). QR dolazak i ručni unos dijele istu zaštitu od dvostrukog bodovanja.
- **Zvono (obavijesti)** stoji uz zupčanik (mobitel i admin desktop), s crvenom značkom nepročitanih. Igračica i roditelj dobivaju poruku "Dobila si +1,00 Falcoin za dolazak…", admin dobiva obavijest o novoj narudžbi u Ormaru. Prava aplikacija: push/e-mail uz isti sadržaj.

## Početna igračice

- **Dolaznost** (postotak + traka) stoji u zaglavlju ispod "Bok, Ana"; Falcoini nisu na početnoj (samo tab Falcoini). Cijela početna stane na jedan zaslon bez skrolanja.
- **Prvi red: "Treninzi ovaj tjedan"** — jedan tanki red s kružićem po treningu grupe: zeleni (bila i odradila), **žuti (kasnila)**, crveni (nije bila), sivi (još nije bio); strelica na kraju otvara detalje (dan, vrijeme, dvorana, status).
- **Kašnjenje:** trener u Dolascima žutim gumbom (!) otvori prozor i upiše točan broj minuta; igračici se prikazuje "Kasnila 7 minuta". Kašnjenje se **računa kao dolazak** (Falcoini, dolaznost); samo se bilježi i prikazuje žutim kružićem.
- **Današnji trening:** vrijeme, dvorana, gumbi **Dolazim / Ne dolazim** (otvoreni do 3 sata prije početka, do tada se odgovor može mijenjati); bez odgovora piše "Molim te budi odgovorna i javi na vrijeme."; nakon roka gumbi se zaključavaju. **Odgovor se prenosi treneru:** "Dolazim" unaprijed postavi zeleno ✓, "Ne dolazim" crveno ✕ u Dolascima (uz oznaku "najavila dolazak/nedolazak"); trener samo ispravlja (npr. upiše kašnjenje) i sprema.
- Ispod današnjeg treninga stoji red **"Sutra"** (što se sutra očekuje: trening grupe ili "nema treninga" + prvi sljedeći).
- **Iduća utakmica** za njezinu grupu: datum i vrijeme, uz oznake "Datum i vrijeme još nisu potvrđeni" i "Dvorana još nije potvrđena" dok admin ne potvrdi.
- Fotografija je u traci iznad donjeg izbornika (samo početna), izvire iz zlatnog kruga i iznad okvira trake; zaglavlje je bez slike.

## Raspored (kod igračice tab "Raspored", naslov stranice "Treninzi i utakmice")

- Prikazuje se **samo aktivni tjedan** (pon–ned), svi dani ispisani jedan ispod drugog s treninzima (vrijeme, grupa, dvorana); današnji dan je istaknut, prošli blijedi. Bez biranja dana.
- Na rasporedu igračice uz treninge stoje točke: **zelena** (bila), **žuta** (kasnila), **crvena** (nije bila); bez legende; današnji dan se označava samo bojom pozadine.
- Na rasporedu igračice ispod tjednog plana stoji kartica **Utakmice**: odigrane (rezultat, zeleno pobjeda / crveno poraz); popis će rasti pa se ovdje smije skrolati i one za koje je **pozvana** (oznaka "Pozvana", uz napomenu ako termin nije potvrđen).
- **Dolasci (trener): iznad popisa stoji zaglavlje stupaca** (Igračica · Profil · Dolazak); ime i prezime uvijek u jednom redu, na kraju retka je **trodijelni gumb**: crveno ✕ nije došla · žuto ! kasni · zeleno ✓ došla ; pritisak na žuti otvara mali prozor za **upis minuta** (brojevi + brze vrijednosti 3/6/9/10), a minute se vide uz ime; okvir s minutama i oznaka u retku su **žuti, a što je više minuta, žuta je jača**.
- **Dolasci (trener): cijeli redak je u boji, gradijent slijeva udesno** — na vrijeme: bijela → zelena; kasnila: žuta → zelena; opravdani izostanak: bijela → blaga crvena; najavljen nedolazak (igračica pritisnula "Ne dolazim"): bijela → srednje blaga crvena, oznaka "Najavljeno"; **nenajavljen izostanak (trener sam pritisne ✕): bijela → jaka crvena, oznaka "Nenajavljeno"**. Pri promjeni statusa nova boja se **animirano pomiče slijeva udesno** preko stare.
- **Dulji izostanak** (kartica između tjednog plana i utakmica): igračica jednom javi razlog (bolesna sam, putovanje, ozljeda, loše ocjene, u kazni sam) i trajanje (2 dana, 3 dana, tjedan dana ili **dok ne deaktiviram**). Dok je aktivan: treninzi u tom razdoblju su automatski **opravdan izostanak** (plavi kružić), na početnoj nestaju gumbi Dolazim/Ne dolazim, trener u Dolascima vidi oznaku "Opravdani izostanak" (blaga crvena; neopravdani izostanak, kad trener skine kvačicu, dobiva oznaku "Izostanak" u jakoj crvenoj) i igračica je automatski označena kao nedolazak (ne može se ručno označiti), trener i roditelj dobivaju obavijest; "Vratila sam se" ga završava.
- Opaska na vrhu rasporeda (odmah ispod zaglavlja): "Raspored za idući tjedan ažurira se nedjeljom u podne." (admin objavljuje idući tjedan do tada).

## Opcije (zupčanik)

- Zupčanik gore desno na svim ekranima za prijavljene (mobitel: u zaglavlju; admin: u kutu glavnog dijela).
- Mobitel: u zaglavlju stoje **tri ikone: QR (skeniranje), zvono, zupčanik**. QR otvara skener za dolazak (igračica) odnosno QR za termin (trener); **roditelj nema QR ikonu** (samo zvono i zupčanik).
- Mobitel: Moj profil, Brza prijava (prekidač za otisak prsta / Face ID), Upute za instalaciju, Pravila privatnosti, Odjava.
- Admin: Moj profil, Postavke kluba (grupe, popis škola, sezone), Korisnici i uloge, Predlošci e-mailova, Odjava.

## Struktura

- `prototype/` — klikabilni HTML prototip (mobitel + admin desktop), izmišljeni podaci
- `assets/` — logo i ostali resursi (dodati)
