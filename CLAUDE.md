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
- Bodovi (admin ih mijenja, dvije decimale): trening 1,00, utakmica 2,50, turnir 4,00, ručno dodjeljivanje 1,50 (npr. pomoć u organizaciji).
- **Katalog Ormara** generira se iz dumpa starog Ormara (`migracija/ormar_iz_dumpa.py` → `prototype/js/ormar-podaci.js`, stanje 26.11.2026.): 14 artikala + 2 paketa (Paket čarapa 25 € / Trening paket 20 €, stara zbrojena cijena prekrižena), kategorije Majice/Čarape/Torbe/Paketi, oznake **Novo** i tekst oznake (npr. "Ruksaci naručeni!"), više slika po artiklu (galerija sličica u prozoru Izaberi), veličine sa zalihom ("na stanju N") ili "predbilježba"; dječje veličine iz dumpa ("dječji XS…") mapirane u Kids XS/M/L/XL. Slike se hotlinkaju s ormar.zkkfalcons.hr/uploads/products/. **Dump se ne kopira u git, a tablica `settings` (hash lozinke admina, telefon) se ne čita.** Tekst iz starog Ormara: Falcoine se mogu dobiti i donacijom klubu kod trenera te u nagradnim igrama (dodano u objašnjenje FLC-a). Pravi Ormar naručuje preko WhatsAppa; u aplikaciji narudžba ide kroz sustav.
- **Veličine se mogu upisati i u Ormaru:** ispod stanja stoji kartica "Moje veličine" (majica, noga; ?? i crveni obrub dok nisu upisane) s olovkom koja otvara isti prozor kao na profilu; nakon spremanja artikli se odmah presložuju prema veličini.
- **Kartica artikla u Ormaru je čista:** slika, naziv, cijena, kratka oznaka ("Tvoja veličina M · na stanju N" / "nema tvoje veličine · predbilježba") i jedan gumb **"Izaberi"**. Tek **Izaberi otvara prozor** s kapsulama veličina (37–41 / 42–46 / XS–XL…, zaliha po veličini), klizačem Falcoini/gotovina i gumbom koji se sam mijenja: **Zamijeni** (sve Falcoinima), **Zamijeni + doplati** (dio gotovinom) ili **Predbilježi** (veličina bez zalihe).
- **Ormar prema veličinama iz profila:** artikli koji **na stanju imaju upravo njezinu veličinu** (majica; noga u rasponu čarapa) stoje **prvi**, sa zlatnim okvirom i oznakom "Tvoja veličina" i već odabranom veličinom. Svi ostali (nema njezine veličine ili nema zalihe) imaju **sivu samo sliku** (slika ostaje jasno vidljiva, samo u sivom tonu) s sitnim natpisom "nema veličine" pri dnu (ostatak kartice je normalan) — igračica vidi što može predbilježiti i gumb **"Predbilježi"** (predbilježba, bez umanjenja zalihe). Dječje brojeve majice mapiramo na Kids veličine (116/128 → Kids XS, 140 → Kids M, 152 → Kids L, 164 → Kids XL) — **provjeriti s pravom tablicom veličina**.
- **Artikli bez veličina (npr. ruksak, "Jedna veličina")** uvijek odgovaraju: idu na vrh s oznakom **"Odgovara ti"** i zlatnim okvirom, slika nije siva; ako nisu na stanju, piše "predbilježba" i gumb je "Predbilježi".
- **MyFalko — My favorites (ex Moja želja):** igračica u Ormaru srcem (♡/♥) može označiti **više artikala** (`state.zelje`); na MyFalku jedna kartica "My favorites" slaže red po artiklu (×, brojač artikala u zaglavlju), "Još ti fali X FLC", traku napretka i postotak (× makne želju); kad ima dovoljno, piše "Imaš dovoljno FLC!" i gumb Zamijeni. Bez želje stoji isprekidana kartica s uputom. **Tjedni zadatak** (umjesto ideje s nizom treninga, koje nema): kartica na vrhu MyFalka s naslovom, opisom, rokom (do nedjelje), kružićima napretka (u prototipu "Tjedan bez izostanka", 1 od 3 treninga) i bonusom u FLC iz pravila; admin ih **planira unaprijed u Planeru tjednih zadataka** (stranica MyFalko: popis idućih 6 tjedana, svaki ima Dodaj/Uredi, oznake aktivan / planirano / treba objaviti; forma: vrsta, naslov, opis, broj treninga; rok je uvijek nedjelja tog tjedna; izazov se igračicama pokaže u ponedjeljak). **Nagrada se upisuje po zadatku** (polje "Nagrada za ovaj zadatak (FLC)" u planeru, dvije decimale; svaki zadatak može imati drugi iznos; više nije stavka u pravilima bodovanja); vidi se u planeru, na kartici igračice (i prije otkrivanja zadatka) i isplaćuje se pri ispunjenju/odobrenju. **Vrste zadataka su tri: dolasci na treninge, video zadatak i fotografija** (igračica slika/odabire fotografiju, `accept=image/*`); admin ih bira u planeru, a **Predani radovi (video i fotografije)** ima ikonu po vrsti i Odobri/Odbij za oboje. **Vremenski okvir:** zadatak se **otkriva ponedjeljak u 00:01** (priključenima) i **traje do nedjelje u 12:00**. **Priključivanje se otvara u nedjelju u 12:01** (prije otkrivanja idućeg zadatka, da igračice "očekuju" novi); u to doba kartica pokazuje "Idući tjedni zadatak · otkriva se u ponedjeljak u 00:01" i gumb "Priključi se idućem zadatku". **Na kartici uvijek piše ishod prošlog tjedna:** "Prošli tjedan je bio uspješan (+X FLC)" / "neuspješan" / "nisi sudjelovala". **Ikonica sata** (uz nagradu) otvara prozor **Povijest zadataka**: popis prošlih tjedana s naslovom, tjednom, ishodom i osvojenim FLC-ima + sažetak "sudjelovala u X od Y, uspješno Z". (U prototipu sitni link "Prototip: pogledaj nedjelju 12:01" prebacuje prikaz između utorka i nedjelje; u pravoj aplikaciji faza dolazi iz sata.) **Tajna do priključivanja:** dok se igračica ne priključi, **naslov i opis zadatka su skriveni** ("??? ???", navy pozadina i obrub (zlatni "??? ???", bijeli tekst); vidi se samo rok i nagrada), a otkrivaju se kad pritisne "Priključi se i otkrij zadatak" — zadatak ostaje misterija; obavijesti o novom zadatku ne otkrivaju naslov. **U adminu je "Tjedni zadatak" zasebna rubrika u izborniku** (planer 6 tjedana, podsjetnik, predani videi s brojačem na čekanju; više nije na stranici MyFalko). **Priključivanje:** **uvijek** se igračica mora priključiti (nema opcije u adminu, to je zadano pravilo). Dok se ne priključi, kartica ima skriveni naslov/opis i gumb **"Priključi se i otkrij zadatak"**; napredak se računa od priključivanja, a video se može slati tek nakon toga; trener dobiva obavijest, a u planeru uz aktivni tjedan piše "priključeno N igračica". **Podsjetnik adminu:** dok idući tjedan nije planiran, na Pregledu i na MyFalku stoji žuti banner "Izazov za idući tjedan još nije planiran — najkasnije u nedjelju do 12:00" (gumb Planiraj zadatak) + obavijest u zvonu; isti rok kao raspored. **Vrste izazova:** *Dolasci na treninge* (kružići napretka) ili **Video zadatak** (npr. "Snimi kako zabijaš tricu"): igračica gumbom "Snimi ili dodaj video" bira/snima datoteku (`<input type=file accept=video capture>`), admin u kartici **Predani videi** (kasnije i trener) vidi popis i **Odobri / Odbij**; odobrenje isplaćuje bonus iz pravila + obavijesti igračici i roditelju. Prava aplikacija: učitavanje videa na poslužitelj (veličina, format, rok čuvanja, privola za snimke maloljetnica — pravno provjeriti). Prototip: unaprijed postavljena želja je Ruksak.
- **Milestones** su privremeno maknuti s MyFalka (kod u `app.js` je ostao, ne prikazuje se); ideja: bez bodova, skriveni dok se ne ostvare.
- **MyFalko nema podmeni**: ispod kartice sa stanjem i ulaza u Ormar slažu se kartice jedna ispod druge (zadnji naslov: "Povijest zarađenih FLC-a"): **Tjedni zadatak** (kartica izazova), **My favorites** (kartica želje, dosadašnja "Moja želja") i Povijest.
- **Tjedni zadaci posebno za Selekciju i za Škole košarke:** admin u planeru (Tjedni zadatak) bira karticu **Selekcija** ili **Škole košarke**; svaka publika ima vlastiti plan 6 tjedana (vrsta, naslov, opis, nagrada, rok) i vlastite objave. Podsjetnik "idući tjedan nije planiran" navodi za koju publiku (ili obje) nedostaje zadatak. U kalendaru se zadaci škola prikazuju s prefiksom "Škole:". U prototipu igračica vidi samo zadatak Selekcije; zadatak škola još nema ekran igračice/roditelja (Lea).
- **Isti zadatak za obje publike:** u formi zadatka kvačica "Isti zadatak za Selekciju i Škole košarke" sprema isti zadatak (naslov, opis, nagrada, rok) u oba plana odjednom; bez kvačice vrijedi samo za odabranu publiku.
- **Prototipni prekidač** (isprekidani okvir na kartici nakon priključivanja): vrsta zadatka (Dolasci/Video/Foto) i ishod (Nije poslano/Čeka/Odobreno/Odbijeno), samo za demonstraciju.
- **Obavijest o priključivanju:** u nedjelju u 12:01, kad se otvori priključivanje, igračice dobivaju obavijest (zvono/push) "Novi tjedni zadatak kreće uskoro! Priključi se i ti u MyFalko appu." — bez naziva i nagrade zadatka (u prototipu se okida prelaskom na prikaz nedjelje 12:01).
- **Video/fotografija i odobrenje:** nakon uploada kartica pokazuje "Čeka odobrenje trenera" (zadatak je ispunjen tek kad trener potvrdi, tada bonus); ako trener **odbije**, zadatak se **zaključava** za taj tjedan (nema ponovnog slanja, ishod "neuspješno");
- **Otvoren (otkriven) zadatak znači da je igračica priključena, pa nema oznake "Priključena".**
- **Kartica Tjednog zadatka je uvijek na navy pozadini** (i skrivena i otkrivena, u svim stanjima), s bijelim tekstom i zlatnim naglascima; iznos nagrade je skriven do priključivanja (kao i naziv); red "Prošli tjedan je bio…" je s aktivne kartice maknut (ishod je u Povijesti zadataka); ostaje samo u stanju nedjelja 12:01–ponedjeljak 00:01; gore desno ikona **?** (objašnjenje tjednog zadatka, `data-zhelp`), iznos i sat pomaknuti ulijevo; dok se igračica ne priključi **naziv zadatka nije uopće prikazan** (ni "???"), samo opis da je tajna; naslov je "Tjedni zadatak", ispod njega raspon tjedna "dd.mm. - dd.mm." (konstanta `IZ_RASPON`), desno iznos u FLC; naziv zadatka ("??? ???" dok se ne priključi) i opis idu ispod.
- **Kartica stanja na MyFalku:** ukupni iznos je **lijevo** (kovanica + iznos + FLC, ispod "= X € u Ormaru"), a **desno zlatna ikona torbe "Ormar"** koja otvara Ormar (zamjenjuje bivšu karticu "Uđi u klupski Ormar"); ? ostaje u gornjem desnom kutu.
- Igračica: tab **MyFalko** (stanje s ikonom **?** koja otvara objašnjenje FLC-a i popis "Kako zarađuješ", skeniranje, kartica **"Uđi u klupski Ormar"**, povijest; popis pravila više nije na stranici). **Ormar nije zaseban tab** nego se otvara iz Falcoina (gumb "‹ Falcoini" vraća; tab Falcoini ostaje označen); u Ormaru "Zamijeni" umanjuje stanje, artikl se preuzima kod trenera.
- **Odobrenje roditelja za narudžbu iz Ormara:** kad igračica izabere artikl (Zamijeni / Zamijeni + doplati / Predbilježi), narudžba dobiva status **"Čeka odobrenje roditelja"**: Falcoini se rezerviraju, **roditelj dobiva obavijest** ("Ana je izabrala artikl…") i u svom **Ormaru** (kartica "Ormar" na početnoj, crveno kad nešto čeka) vidi što je izabrala (artikl, veličina, Falcoini + doplata) s gumbima **Odobri / Odbij**. Tek nakon **Odobri** narudžba stiže adminu (obavijest + redak u Ormaru), a igračica dobiva obavijest; **Odbij** vraća Falcoine i zalihu, igračica dobiva obavijest. Admin ne vidi narudžbe koje čekaju roditelja. Igračica u svom Ormaru vidi "Čeka odobrenje roditelja".
- **Obavijest roditelju ima gumb "Pogledaj"** koji odmah otvara prozor s narudžbom (artikl, veličina, Falcoini + doplata) i gumbima Odobri / Odbij; ako je već odlučeno, prozor pokazuje "Već odobreno" / "Odbijeno".
- **Obavijest roditelju o ishodu zadatka (video/fotografija):** kad trener odluči, roditelj dobiva obavijest "Ana je ispunila tjedni zadatak" (odobreno, s osvojenim FLC) ili "Ana nije ispunila tjedni zadatak" (odbijeno, zadatak zaključan), oboje s gumbom **Pogledaj** koji otvara prozor samo s gumbom **Preuzmi video / Preuzmi fotografiju** (bez pregleda/live prikaza i bez napomene o roku). Za zadatak s dolascima obavijest nema datoteku.
- **Istek roka za preuzimanje:** ako roditelj pokuša preuzeti video/fotografiju iz obavijesti nakon 14 dana od uploada, dobiva poruku "Ovaj video / Ova fotografija izbrisan(a) je iz Arhive nakon isteka 14 dana od uploada." (u prototipu: starija obavijest od 8.11. u zvonu roditelja).
- **Roditelj naručuje iznenađenje:** roditelj ima pristup Ormaru (isti katalog, veličine djevojčice, bez srca/favorita) i može **naručiti za svoje dijete bez njezina znanja**: plaća se **gotovinom pri preuzimanju** (Falcoini se ne troše), narudžba ide odmah adminu s oznakom "Iznenađenje roditelja — ne najavljivati igračici"; **igračica ne dobiva nikakvu obavijest**. Otvoreno: tko preuzima (trener ne smije reći igračici), može li roditelj platiti i Falcoinima djeteta.
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
- **Utakmica — dva koraka:** (1) **Prije popisa** (termin/dvorana mogu još biti nepotvrđeni): **roditelj može unaprijed otkazati** igračicu za iduću utakmicu ("Ana ne može na utakmicu", uz "Ipak može") kako je treneri ne bi stavili na popis; igračica vidi "Roditelj je javio da ne možeš…", trener dobiva obavijest i u kartici Utakmica vidi popis "Ne mogu na utakmicu" i gumb **"Objavi popis"**. (2) **Kad trener objavi popis**, igračice na popisu i njihovi roditelji dobivaju **Dolazim / Ne dolazim** (igračica ili roditelj, odgovor zajednički, zadnji vrijedi; "što prije", bez roka od 3 sata) da trener što ranije zna broj igračica. Trener tada vidi brojače **dolazi / ne dolazi / čeka**, traku "odgovorilo X od Y", popis sa statusom i gumb **"Podsjeti one koje čekaju"**. Igračica koju je roditelj otkazao **nije u sastavu**: na njezinom rasporedu uz utakmicu stoji oznaka "Nije u sastavu", u kartici piše "Nisi u sastavu za ovu utakmicu: roditelj je javio da ne možeš", roditelj vidi "Neće biti u sastavu", a treneru je u kartici Utakmica označena "Nije u sastavu · roditelj javio" (prije i nakon objave popisa). **Termin i dvorana:** admin u Rasporedu (klik na dan utakmice) **upisuje datum (dd.mm.gggg), vrijeme (hh:mm) i bira dvoranu** pa potvrđuje; do potvrde igračica i roditelj vide žute oznake "Datum i vrijeme još nisu potvrđeni" / "Dvorana još nije potvrđena"; **nakon potvrde te oznake nestaju** i prikazuje se blok: *natjecanje/kategorija* · *dan dd.mm.gggg. u hh:mm* · *dvorana* (isto na rasporedu igračice); igračica, roditelj i trener dobivaju obavijest "Utakmica potvrđena". **Boje poruka o dolasku:** žuto = popis još nije objavljen / čeka se odgovor, crveno = roditelj javio ili igračica kaže da ne dolazi, zeleno = igračica potvrdila dolazak. Potvrda termina ne blokira potvrdu dolaska. Još nije u prototipu: trener ručno bira tko je na popisu, rok za potvrdu, zapisnik.
- Ispod današnjeg treninga stoji red **"Sutra"** (što se sutra očekuje: trening grupe ili "nema treninga" + prvi sljedeći).
- **Iduća utakmica** za njezinu grupu: datum i vrijeme, uz oznake "Datum i vrijeme još nisu potvrđeni" i "Dvorana još nije potvrđena" dok admin ne potvrdi.
- Fotografija je u traci iznad donjeg izbornika (samo početna), izvire iz zlatnog kruga i iznad okvira trake; zaglavlje je bez slike.

## Raspored (kod igračice tab "Raspored", naslov stranice "Treninzi i utakmice")

- Prikazuje se **samo aktivni tjedan** (pon–ned), svi dani ispisani jedan ispod drugog s treninzima (vrijeme, grupa, dvorana); današnji dan je istaknut, prošli blijedi. Bez biranja dana.
- Na rasporedu igračice uz treninge stoje točke: **zelena** (bila), **žuta** (kasnila), **crvena** (nije bila); bez legende; današnji dan se označava samo bojom pozadine. **Cijeli redak treninga je obojan prema ishodu** (gradijent bijela → zelena / žuta / crvena / plava za opravdan izostanak, klase `.sd-t.r-yes/late/no/exc`), isto i na rasporedu roditelja; prošli dani blijede samo ako redak nema ishod.
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

## Prototipna traka

- Redoslijed tabova: **Početna, Javna prijava**, Trener, Roditelj, Igračica, Admin. **Gotovi ekrani (Početna, Javna prijava) su privremeno zeleni** (`GOTOVO` u `app.js`, klasa `.gotovo`); kasnije se vraćaju na boje kluba.

## Struktura

- `prototype/` — klikabilni HTML prototip (mobitel + admin desktop), izmišljeni podaci
- `assets/` — logo i ostali resursi (dodati)

## Pohrana predanih radova (tjedni zadaci)

- Uploadi (video/fotografije) tjednih zadataka spremaju se u **mapu kojoj admin može pristupiti**, organiziranu po tjednu: **"Tjedni - dd.mm - dd.mm"** (npr. "Tjedni - 23.11 - 29.11").
- **Brisanje:** radovi se iz baze/mape **automatski brišu nakon 14 dana**, ili **ručno** kad admin sam odabere brisanje (u prototipu: kanta uz svaki rad u rubrici Tjedni zadatak → Predani radovi; uz svaki rad piše "briše se za N dana").
- **Prikaz u adminu (Tjedni zadatak → Predani radovi):** radovi su složeni **po mapama tjedana** (zaglavlje s ikonom mape, nazivom, brojem radova i brojem onih koji čekaju); klik na mapu otvara popis radova s poravnatim stupcima (ikona vrste · igračica i datoteka · Odobri/Odbij ili status · preuzmi · obriši) i gumb "Preuzmi cijelu mapu (ZIP)". Otvorena je jedna mapa odjednom.
- **Preuzimanje:** admin može **preuzeti pojedini rad** (ikona preuzimanja uz rad) ili **cijelu mapu tjedna** (gumb "Preuzmi sve", ZIP) na računalo, da ih kasnije može koristiti za objave. Prije objave provjeriti privolu za fotografiju/snimke (privola se pamti uz igračicu); radovi se brišu nakon 14 dana, pa ih treba preuzeti prije toga.
- Pravna provjera: privola za snimke maloljetnica, rok čuvanja, veličina i format datoteka.

## Baza (admin)

- Admin izbornik ima stavku **Baza**: jedna tablica (izgled kao proračunska) s tabovima, svaki tab je jedna tablica buduće MySQL baze: Igračice, Grupe, Uplate, Falcoini, Ormar, Narudžbe, Novosti, Tjedni zadaci (broj redaka na tabu). Nazivi stupaca su nazivi polja u bazi (npr. `ime_prezime`), sticky zaglavlje, brojevi redaka, pretraga po tablici, **Izvezi CSV** za aktivni tab. U prototipu je samo za čitanje ("Novi redak" još nije u prototipu). Prava aplikacija: ista pregledna tablica nad stvarnim tablicama (uređivanje ćelija, uvoz iz Relaga).

## Fotografije igračica i logotipi protivnika (admin)

- **Fotografija igračice:** admin na profilu igračice (gumb "Dodaj / Promijeni fotografiju", "Ukloni") učitava sliku s računala ili mobitela (`accept=image/*`); prikazuje se svugdje gdje je avatar. U prototipu se slika drži samo u memoriji; prava aplikacija: upload na poslužitelj (veličina, format, smanjivanje). Privola za fotografiju pamti se uz igračicu.
- **Protivnici (admin izbornik):** popis klubova (naziv, grad) s karticom po klubu: "Učitaj / Promijeni logotip", "Ukloni", i "Novi klub" (naziv, grad, logotip). Dok logotipa nema, prikazuju se inicijali. Logotip se vidi uz utakmicu (blok s terminom: "protiv ŽKK …") i u popisu utakmica igračice. Utakmica je povezana s kolom lige (`UTAKMICA.kolo`).

- **Lige (kategorije utakmica):** admin izbornik **Lige**: za svaku ligu (npr. Prvenstvo U14, U16; "Nova liga" = naziv + grupa) tablica **po kolima**: kolo, **datum (subota/nedjelja; upozorenje "nije vikend")**, **protivnik** (iz popisa Protivnici), **Doma / Gostujemo**, rezultat; "Dodaj kolo" (idući tjedan), kanta za brisanje. **Protivnik i datum se zadaju jednom u ligi**: u kalendaru (Raspored → dan utakmice) više **nema liste protivnika ni upisa datuma**, forma prikazuje zadano kolo ("Doma protiv ŽKK … · Subota dd.mm.gggg.") i traži samo **vrijeme, dvoranu i kvačicu Zamjena domaćinstva**. Kalendar utakmice puni iz liga. U prototipu je forma za potvrdu termina samo za jednu utakmicu (3. kolo U14); ostala kola samo prikazuju status.
- **Rezultat i strijelci (admin):** u **Lige** svaka kartica kola ima blok "Rezultat i strijelci": rezultat (Falcons : protivnik, uvijek naš prvi) i popis **strijelaca** (igračica + broj koševa, "Dodaj strijelca", kanta) uz provjeru "Strijelci X od Y" (zeleno kad se zbroj slaže). Sprema se na kolu (`k.nasi/njihovi/rez/strijelci`), polja se spremaju odmah bez ponovnog crtanja stranice. **Igračica i roditelj na kartici Utakmice (Raspored) za svaku odigranu utakmicu uvijek vide rezultat (zeleno pobjeda / crveno poraz) i koliko je koševa igračica zabila** ("Zabila si 8 koševa" / roditelju "Ana je zabila 8 koševa" / "Nisi zabila koš"); dok rezultat nije upisan piše "Rezultat još nije upisan". Još nije u prototipu: isti podatak na ekranu trenera i statistika sezone po igračici.
- **Dvorane protivnika:** svaki klub u Protivnicima ima **do 3 dvorane** (polja na kartici, spremaju se odmah; i u prozoru "Novi klub"). U formi utakmice (Raspored → klik na dan utakmice) admin bira **protivnika**, **Doma / Gostujemo** i dvoranu: kad **gostujemo**, popis dvorana su dvorane tog protivnika (ako ih nema, upozorenje da ih doda u Protivnici); kad smo domaćini, klupske dvorane. Na ekranima igračice/roditelja piše "gostovanje kod ŽKK …" odnosno "protiv ŽKK …".
- **Zamjena domaćinstva:** kvačica u formi utakmice. Po rasporedu natjecanja smo domaćini ili gosti (Doma / Gostujemo), a kvačica označava da se **igra u dvorani druge strane**: domaćin koji ipak ide u dvoranu protivnika, ili gost koji ipak igra u našoj. Popis dvorana prati stvarno mjesto igre (protivnikove dvorane ili naše), a igračica i roditelj vide žutu oznaku "Zamjena domaćinstva"; obavijest "Utakmica potvrđena" to navodi.

## Admin sučelje: tablica + lepeza kartica

- Svaki popis u adminu je **tablica u stupcima (zadani prikaz)**, a **iznad nje stoji lepeza (coverflow)**: **jedna glavna kartica u sredini (veća, zlatni obrub) i po 2 sa svake strane** koje iz zamućenja i prozirnosti izlaze prema sredini odnosno odlaze u zamućenje; kartice su uske (~118 px). Pomicanje: strelice ‹ ›, klik na bočnu karticu je dovodi u sredinu, kotačić/horizontalni scroll; brojač "3 / 12". Klik na **glavnu** karticu otvara isto što i redak (npr. profil igračice). Jedna kartica po retku (igračica s fotografijom, trener, klub s logotipom, artikl, prijava, objava, grupa, narudžba, uplata…); lepeza prati pretragu, filtere i sortiranje. Komponenta: `lepezaHtml()`/`lepPostavi()` + opcije `lnaslov/lav/lsub/lchip` u `pogled()`; položaj se pamti u `state.lep[ključ]`.
- Uz tablicu ostaje izbor **Tablica (zadano) / Popis / Kartice**, **Prikaži:** kapsule polja, **Sortiraj** i **Grupiraj** (`state.pog[ključ]`, `pogled()` u `app.js`).
- Primijenjeno na: **Članovi, Prijave, Grupe (+ zaseban popis Treneri), Članarine (uplate), Novosti, Ormar (narudžbe i artikli)** i sve tabove **Baze**; **Protivnici** imaju lepezu klubova iznad kartica za uređivanje; **Lige** su kartice po kolu s izravnim izmjenama.

## Klub (admin)

- Admin izbornik ima kategoriju **Klub** s pet tabova (isti obrazac: tablica + lepeza + "Novi …"): **Grupe** (prije samostalna stavka izbornika; uključuje i popis Trenera; `#admin-grupe` otvara taj tab), **Raspored treninga** (tjedni obrazac: dan, vrijeme, grupa, dvorana, trener; `treningTablica()`), **Dvorane kluba** (6 klupskih dvorana iz Trackera: naziv, vrsta, adresa, cijena najma/sat, kontakt dvorane; adresa/cijena/kontakt još prazni "—" jer ih dump nema), **Osoblje kluba** (ime, uloga, grupe, kontakt, status; izmišljeni podaci, trener-grupe usklađene s Grupama) i **Inventar kluba** (stavka, kategorija, stanje dobro/istrošeno/za zamjenu; **količina se upisuje po prostoru**: stupac po svakoj dvorani + "Skladište" (`KLUB_PROSTORI`), a **ukupno u klubu se računa samo** i osvježava dok upisuješ; "Nova stavka" otvara prozor s početnom količinom u jednom prostoru; izmišljeni podaci). Podaci u `KLUB_OSOBLJE`/`KLUB_INVENTAR` (`data.js`), dvorane iz `DVORANE_KLUB`. Ekran `klubScreen()`.
- **Klub nema lepezu** (ni tabovi Grupe/Treneri): samo tablica; **podkategorije (tabovi) su zaobljeni gumbi**, ne bookmarkeri (`.baza-tabs`, isto i u Ligama i Bazi).
- **Članovi** (admin) ostaju kao baza kojom se bavimo tek kasnije: za sada se ne mijenjaju.

## Migracija iz Falcons Trackera

- Dump stare baze (`bluerder_portalwebapp`) je analiziran: opis tablica, mapiranje i otvorene odluke su u `migracija/README.md`. **Sam dump i osobni podaci nisu u gitu** (`.gitignore`). Prototip koristi samo neosobne podatke iz dumpa: **lige s kolima, protivnike, dvorane** (`prototype/js/lige-podaci.js`, generira `migracija/lige_iz_dumpa.py`). Igračice u prototipu ostaju izmišljene.
- Bitno za dizajn: stari sustav ima **trening grupe** (U18/U16/U14, U13/U12, SEN, ŠK A. Kovačić, ŠK O. Iveković) i **sastave za lige** (Seniorke, Juniorke, Kadetkinje, Pretkadetkinje, U13, U12, U11); lige su vezane uz sastav. Prototip još koristi U12/U14/U16/SEN: uskladiti.

- **Admin izbornik:** stavka koja je prije bila "Prijave" zove se **"Registracije"** (nove članice iz javnog obrasca koje čekaju potvrdu; ruta `admin-prijave` ostaje).
