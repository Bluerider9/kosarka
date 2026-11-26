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
- **Veličine (majica i noga):** kartica **"Moje veličine"** na profilu (roditelj i igračica, dijele isti podatak). Dok nisu upisane, vrijednosti pišu **"??"**, a kartica ima **crveni obrub**; bez dodatnog tekstualnog upozorenja (dovoljni su crveni obrub, crvena olovka i ??); ispod vrijednosti stoji **objašnjenje veličina** (116–128 = Kids XS, 140 = Kids M, 152 = Kids L, 164 = Kids XL; XS–XL odrasle; čarape 37–41 / 42–46 — **tablicu provjeriti**); **olovka (uredi) gore desno** otvara poseban prozor s padajućim izborima i "Spremi". **Veličine su zaseban okvir**, ne dio "Osobnih podataka"; admin i trener vide zaseban okvir "Veličine (Ormar)" samo za čitanje (— ako nisu upisane). Služe za odjevne predmete iz Ormara.
- Ulazi: admin → Članovi → red; roditelj → gumb "Profil" na kartici; trener → Dolasci → strelica uz ime; igračica → tab Profil.

## Novosti za roditelje

- **Novosti vide svi:** roditelj, igračica i trener imaju tab **Novosti** (isti popis; igračica i trener vide objave za "Svi" i za svoje grupe), crvena točka na tabu = nepročitano; pročitano se pamti po ulozi. Trener ima i karticu Novosti na početnoj (Danas). Objave piše samo admin.
- Roditelj ima tab **Novosti** (popis objava, prikvačene na vrhu, crvena točka = nepročitano, tap otvara cijeli tekst) i karticu s posljednjom novošću na početnoj.
- Admin ima stranicu **Novosti**: popis objava s oznakom, publikom (svi ili jedna grupa) i brojem pročitanih, te "Nova objava" (naslov, tekst, za koga, oznaka, prikvači).
- Roditelj vidi objave za "Svi" i za grupe svojih djevojčica. Push obavijesti i e-mail za nove objave dolaze kasnije (nisu u prototipu).

## Falcoini i Ormar

- **Naziv sekcije/taba je "MyFalko"** (konstanta `SEKCIJA_FALCOIN` u `app.js`, privremeno ime, mijenja se na jednom mjestu); **"Falcoin" ostaje samo naziv valute, a kratica je "FLC"** (konstanta `FLC` u app.js; iznosi se pišu "12,50 FLC", 1 FLC = 1 €; na stanju igračice veliki iznos + FC, ispod sitno "= 18,50 € u Ormaru") (iznosi, pravila, povijest). Vrijedi za tab igračice, naslov stranice, gumb natrag iz Ormara i admin stranicu.

- **Falcoin** je klupska virtualna valuta; igračice ih skupljaju dolascima (trening, utakmica, turnir, bonusi) i mijenjaju za artikle u klupskom webshopu **Ormar**.
- **Bilježenje dolaska QR kodom:** trener u svojoj aplikaciji otvori QR za termin (bira vrstu: trening / utakmica / turnir), igračica ga skenira u svojoj aplikaciji → dolazak se sprema i dobiva Falcoine.
  Kod vrijedi samo za taj termin, jedan dolazak po igračici po terminu, trener može označiti dolazak i ručno (Dolasci). Prava aplikacija: QR s potpisanim tokenom (termin + vrijeme), kamera u PWA-u.
- Bodovi (admin ih mijenja, dvije decimale): trening 1,00, utakmica 2,50, turnir 4,00, tjedni zadatak (bonus) 3,00, ručno dodjeljivanje 1,50 (npr. pomoć u organizaciji).
- **Katalog Ormara** preuzet s https://ormar.zkkfalcons.hr (16 artikala, stanje 24.11.2026.): kategorije Sve/Majice/Čarape/Torbe/Paketi, artikli imaju veličine sa zalihom ("na stanju N") ili "predbilježba"; cijene u Falcoinima; paketi imaju dvije cijene (30/25, 24/20 — nejasno koja je akcijska, prototip prikazuje nižu kao aktualnu). Slike se hotlinkaju s ormar.zkkfalcons.hr/uploads/products/. Pravi Ormar naručuje preko WhatsAppa; u aplikaciji narudžba ide kroz sustav.
- **Veličine se mogu upisati i u Ormaru:** ispod stanja stoji kartica "Moje veličine" (majica, noga; ?? i crveni obrub dok nisu upisane) s olovkom koja otvara isti prozor kao na profilu; nakon spremanja artikli se odmah presložuju prema veličini.
- **Kartica artikla u Ormaru je čista:** slika, naziv, cijena, kratka oznaka ("Tvoja veličina M · na stanju N" / "nema tvoje veličine · predbilježba") i jedan gumb **"Izaberi"**. Tek **Izaberi otvara prozor** s kapsulama veličina (37–41 / 42–46 / XS–XL…, zaliha po veličini), klizačem Falcoini/gotovina i gumbom koji se sam mijenja: **Zamijeni** (sve Falcoinima), **Zamijeni + doplati** (dio gotovinom) ili **Predbilježi** (veličina bez zalihe).
- **Ormar prema veličinama iz profila:** artikli koji **na stanju imaju upravo njezinu veličinu** (majica; noga u rasponu čarapa) stoje **prvi**, sa zlatnim okvirom i oznakom "Tvoja veličina" i već odabranom veličinom. Svi ostali (nema njezine veličine ili nema zalihe) imaju **sivu samo sliku** (slika ostaje jasno vidljiva, samo u sivom tonu) s sitnim natpisom "nema veličine" pri dnu (ostatak kartice je normalan) — igračica vidi što može predbilježiti i gumb **"Predbilježi"** (predbilježba, bez umanjenja zalihe). Dječje brojeve majice mapiramo na Kids veličine (116/128 → Kids XS, 140 → Kids M, 152 → Kids L, 164 → Kids XL) — **provjeriti s pravom tablicom veličina**.
- **Artikli bez veličina (npr. ruksak, "Jedna veličina")** uvijek odgovaraju: idu na vrh s oznakom **"Odgovara ti"** i zlatnim okvirom, slika nije siva; ako nisu na stanju, piše "predbilježba" i gumb je "Predbilježi".
- **MyFalko — My favorites (ex Moja želja):** igračica u Ormaru srcem (♡/♥) označi jedan artikl; na MyFalku kartica pokazuje artikl, "Još ti fali X FLC", traku napretka i postotak (× makne želju); kad ima dovoljno, piše "Imaš dovoljno FLC!" i gumb Zamijeni. Bez želje stoji isprekidana kartica s uputom. **Tjedni zadatak** (umjesto ideje s nizom treninga, koje nema): kartica na vrhu MyFalka s naslovom, opisom, rokom (do nedjelje), kružićima napretka (u prototipu "Tjedan bez izostanka", 1 od 3 treninga) i bonusom u FLC iz pravila; admin ih **planira unaprijed u Planeru tjednih zadataka** (stranica MyFalko: popis idućih 6 tjedana, svaki ima Dodaj/Uredi, oznake aktivan / planirano / treba objaviti; forma: vrsta, naslov, opis, broj treninga; rok je uvijek nedjelja tog tjedna; izazov se igračicama pokaže u ponedjeljak). **Tajna do priključivanja:** dok se igračica ne priključi, **naslov i opis zadatka su skriveni** ("??? ???", isprekidani zlatni obrub; vidi se samo rok i nagrada), a otkrivaju se kad pritisne "Priključi se i otkrij zadatak" — zadatak ostaje misterija; obavijesti o novom zadatku ne otkrivaju naslov. **U adminu je "Tjedni zadatak" zasebna rubrika u izborniku** (planer 6 tjedana, podsjetnik, predani videi s brojačem na čekanju; više nije na stranici MyFalko). **Priključivanje:** admin po izazovu bira opciju "Igračica se mora priključiti zadatku" (zadano uključeno; isključeno = sudjeluju sve automatski). Dok se igračica ne priključi, kartica ima samo opis i gumb **"Priključi se i otkrij zadatak"**; napredak se računa od priključivanja, a video se može slati tek nakon toga; trener dobiva obavijest, a u planeru uz aktivni tjedan piše "priključeno N igračica". **Podsjetnik adminu:** dok idući tjedan nije planiran, na Pregledu i na MyFalku stoji žuti banner "Izazov za idući tjedan još nije planiran — najkasnije u nedjelju do 12:00" (gumb Planiraj zadatak) + obavijest u zvonu; isti rok kao raspored. **Vrste izazova:** *Dolasci na treninge* (kružići napretka) ili **Video zadatak** (npr. "Snimi kako zabijaš tricu"): igračica gumbom "Snimi ili dodaj video" bira/snima datoteku (`<input type=file accept=video capture>`), admin u kartici **Predani videi** (kasnije i trener) vidi popis i **Odobri / Odbij**; odobrenje isplaćuje bonus iz pravila + obavijesti igračici i roditelju. Prava aplikacija: učitavanje videa na poslužitelj (veličina, format, rok čuvanja, privola za snimke maloljetnica — pravno provjeriti). Prototip: unaprijed postavljena želja je Ruksak.
- **Milestones** su privremeno maknuti s MyFalka (kod u `app.js` je ostao, ne prikazuje se); ideja: bez bodova, skriveni dok se ne ostvare.
- **MyFalko nema podmeni**: ispod kartice sa stanjem i ulaza u Ormar slažu se kartice jedna ispod druge: **Tjedni zadatak** (kartica izazova), **My favorites** (kartica želje, dosadašnja "Moja želja") i Povijest.
- Igračica: tab **MyFalko** (stanje s ikonom **?** koja otvara objašnjenje FLC-a i popis "Kako zarađuješ", skeniranje, kartica **"Uđi u klupski Ormar"**, povijest; popis pravila više nije na stranici). **Ormar nije zaseban tab** nego se otvara iz Falcoina (gumb "‹ Falcoini" vraća; tab Falcoini ostaje označen); u Ormaru "Zamijeni" umanjuje stanje, artikl se preuzima kod trenera.
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
- **Roditelj može isto javiti dolazak/nedolazak za igračicu:** na početnoj, na kartici igračice, blok "Današnji trening" s gumbima **Dolazi / Ne dolazi** (isti rok: do 3 sata prije početka; odgovor je zajednički s igračičinim, zadnji vrijedi). Igračici piše **"Roditelj je javio da ne dolaziš"**, roditelju **"Ana je javila da ne dolazi"** (ili "Javio si da Ana ne dolazi"); trener u Dolascima vidi "Roditelj javio" / "roditelj najavio nedolazak"; sve strane dobivaju obavijest u zvonu.
- **Utakmica — dva koraka:** (1) **Prije popisa** (termin/dvorana mogu još biti nepotvrđeni): **roditelj može unaprijed otkazati** igračicu za iduću utakmicu ("Ana ne može na utakmicu", uz "Ipak može") kako je treneri ne bi stavili na popis; igračica vidi "Roditelj je javio da ne možeš…", trener dobiva obavijest i u kartici Utakmica vidi popis "Ne mogu na utakmicu" i gumb **"Objavi popis"**. (2) **Kad trener objavi popis**, igračice na popisu i njihovi roditelji dobivaju **Dolazim / Ne dolazim** (igračica ili roditelj, odgovor zajednički, zadnji vrijedi; "što prije", bez roka od 3 sata) da trener što ranije zna broj igračica. Trener tada vidi brojače **dolazi / ne dolazi / čeka**, traku "odgovorilo X od Y", popis sa statusom i gumb **"Podsjeti one koje čekaju"**. Igračica koju je roditelj otkazao nije na popisu. Potvrda termina i dvorane (admin: Raspored → kartica Utakmica) odvojena je i samo se prikazuje kao informacija. Još nije u prototipu: trener ručno bira tko je na popisu, rok za potvrdu, zapisnik.
- Ispod današnjeg treninga stoji red **"Sutra"** (što se sutra očekuje: trening grupe ili "nema treninga" + prvi sljedeći).
- **Iduća utakmica** za njezinu grupu: datum i vrijeme, uz oznake "Datum i vrijeme još nisu potvrđeni" i "Dvorana još nije potvrđena" dok admin ne potvrdi.
- Fotografija je u traci iznad donjeg izbornika (samo početna), izvire iz zlatnog kruga i iznad okvira trake; zaglavlje je bez slike.

## Raspored (kod igračice tab "Raspored", naslov stranice "Treninzi i utakmice")

- Prikazuje se **samo aktivni tjedan** (pon–ned), svi dani ispisani jedan ispod drugog s treninzima (vrijeme, grupa, dvorana); današnji dan je istaknut, prošli blijedi. Bez biranja dana.
- Na rasporedu igračice uz treninge stoje točke: **zelena** (bila), **žuta** (kasnila), **crvena** (nije bila); bez legende; današnji dan se označava samo bojom pozadine.
- **Roditelj** na svom rasporedu vidi **iste točke** (zelena/žuta/crvena, plava za opravdan izostanak) uz treninge igračice (u prototipu Ana, grupa U14); za Leu (škola košarke) točke još nisu u prototipu.
- Na rasporedu igračice ispod tjednog plana stoji kartica **Utakmice**: odigrane (rezultat, zeleno pobjeda / crveno poraz); popis će rasti pa se ovdje smije skrolati i one za koje je **pozvana** (oznaka "Pozvana", uz napomenu ako termin nije potvrđen).
- **Dolasci (trener): iznad popisa stoji zaglavlje stupaca** (Igračica · Profil · Dolazak); ime i prezime uvijek u jednom redu, na kraju retka je **trodijelni gumb**: crveno ✕ nije došla · žuto ! kasni · zeleno ✓ došla ; pritisak na žuti otvara mali prozor za **upis minuta** (brojevi + brze vrijednosti 3/6/9/10), a minute se vide uz ime; okvir s minutama i oznaka u retku su **žuti, a što je više minuta, žuta je jača**.
- **Dolasci (trener): cijeli redak je u boji, gradijent slijeva udesno** — na vrijeme: bijela → zelena; kasnila: žuta → zelena; opravdani izostanak: bijela → blaga crvena; najavljen nedolazak (igračica pritisnula "Ne dolazim"): bijela → srednje blaga crvena, oznaka "Najavljeno"; **nenajavljen izostanak (trener sam pritisne ✕): bijela → jaka crvena, oznaka "Nenajavljeno"**. Pri promjeni statusa nova boja se **animirano pomiče slijeva udesno** preko stare.
- **Dulji izostanak** (kartica između tjednog plana i utakmica): igračica jednom javi razlog (bolesna sam, putovanje, ozljeda, loše ocjene, u kazni sam) i trajanje (2 dana, 3 dana, tjedan dana ili **dok ne deaktiviram**). Dok je aktivan: treninzi u tom razdoblju su automatski **opravdan izostanak** (plavi kružić), na početnoj nestaju gumbi Dolazim/Ne dolazim, trener u Dolascima vidi oznaku "Opravdani izostanak" (blaga crvena; neopravdani izostanak, kad trener skine kvačicu, dobiva oznaku "Izostanak" u jakoj crvenoj) i igračica je automatski označena kao nedolazak (ne može se ručno označiti), trener i roditelj dobivaju obavijest; "Vratila sam se" ga završava.
- Opaska na vrhu rasporeda (odmah ispod zaglavlja): "Raspored za idući tjedan ažurira se nedjeljom u podne." (admin objavljuje idući tjedan do tada).

## Opcije (zupčanik)

- Zupčanik gore desno na svim ekranima za prijavljene (mobitel: u zaglavlju; admin: u kutu glavnog dijela).
- Mobitel: u zaglavlju stoje **tri ikone: QR (skeniranje), zvono, zupčanik**. QR otvara skener za dolazak (igračica) odnosno QR za termin (trener); **roditelj nema QR ikonu** (samo zvono i zupčanik).
- Mobitel: Moj profil, Brza prijava (prekidač za otisak prsta / Face ID), Upute za instalaciju, Pravila privatnosti, Odjava.
- **Raspored (admin, desktop) je mjesečni kalendar po danima** (pon–ned, strelice ‹ › za mjesec, "Danas"): u svakom danu su sitni redovi **treninzi** (plavo), **utakmice** (crveno) i **tjedni zadatak** (zlatno: u ponedjeljak naslov, u nedjelju "Rok izazova"); prošli dani blijede, današnji ima zlatni obrub. Klik na dan otvara desno **detalj dana** (treninzi s dvoranom, utakmice sa statusom/rezultatom, izazov s "Uredi"); za dan utakmice ondje su i potvrde termina i dvorane. Treninzi se u prototipu ponavljaju po tjednom obrascu; "Novi termin" još nije u prototipu.
- Admin: Moj profil, Postavke kluba (grupe, popis škola, sezone), Korisnici i uloge, Predlošci e-mailova, Odjava.

## Struktura

- `prototype/` — klikabilni HTML prototip (mobitel + admin desktop), izmišljeni podaci
- `assets/` — logo i ostali resursi (dodati)
