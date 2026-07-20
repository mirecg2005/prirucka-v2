export const searchIndex = [
  {
    id: "accident",
    title: "Dopravná nehoda / Traffic Accident",
    route: "/section/accident",
    keywords: "nehoda havária zrážka polícia 158 112 zranenie škoda správa accident crash police injury damage fotoaparát marsh hlásenie",
    content: "Okamžitý postup pri dopravnej nehode: zabezpečenie miesta, volanie polície a záchranky (112), vyplnenie správy o nehode, fotodokumentácia, nahlásenie poistnej udalosti (Poisťovací maklér Marsh). Postup pri nehode na Slovensku (do 15 dní) aj v zahraničí (do 30 dní).",
    type: "section"
  },
  {
    id: "service",
    title: "Servis a Údržba / Service",
    route: "/section/service",
    keywords: "servis údržba stk ek olej garancia pneuservis pneumatiky kolesá prezutie zimné letné service maintenance tires oil defekt flat tire kontrolky dashboard tpms tlak porucha breakdown kluče keys adblue ayvens mobility",
    content: "Pravidelný servis, údržba a objednávanie vozidla do servisu. Riešenie porúch, odťahovej služby, výmeny pneumatík (pneuservis), STK a emisnej kontroly. Vysvetlenie kontroliek na prístrojovej doske (červené, oranžové). Kontakty na asistenčné služby.",
    type: "section"
  },
  {
    id: "fuel",
    title: "Tankovanie / Refueling",
    route: "/section/fuel",
    keywords: "tankovanie palivo nafta benzín karta shell omv strata kvapalina ostrekovače umývanie fuel gas petrol diesel zahraničie abroad partners ccs ccska",
    content: "Pravidlá pre tankovanie firemného vozidla, zoznam partnerských čerpacích staníc. Použitie palivových kariet (Shell, OMV, CCS) na Slovensku a v zahraničí. Nákup prevádzkových kvapalín (zmes do ostrekovačov, AdBlue) a úhrada umývania vozidla.",
    type: "section"
  },
  {
    id: "rules",
    title: "Pravidlá a Pokuty / Rules & Fines",
    route: "/section/rules",
    keywords: "pravidlá doklady vodičák techničák pzp stk rýchlosť obec diaľnica alkohol mobil telefonovanie rules speed alcohol phone pokuty fines zákon law vesta lekárnička výbava equipment zipsovanie cyklisti chodci známka vignette",
    content: "Zákonné pravidlá cestnej premávky. Rýchlostné limity (obec, mimo obce, diaľnica). Povinná výbava vozidla (lekárnička, reflexná vesta). Pravidlo zipsovania, správanie k cyklistom a chodcom. Prehľad pokút za najčastejšie priestupky (rýchlosť, alkohol, mobil).",
    type: "section"
  },
  {
    id: "insurance",
    title: "Poistné udalosti / Insurance",
    route: "/section/insurance",
    keywords: "poistka pzp kasko havarijné spoluúčasť škoda vandalizmus živel krádež insurance claim damage theft liability marsh sklo čelné hlásenie",
    content: "Riešenie poistných udalostí, havarijné poistenie (KASKO) a povinné zmluvné poistenie (PZP). Hlásenie škôd maklérovi (Marsh), výška spoluúčasti, postup pri krádeži, vandalizme, poškodení čelného skla, poškodení živlami (krúpy) a zrážke so zverou.",
    type: "section"
  },
  {
    id: "parking",
    title: "Parkovanie / Parking",
    route: "/section/parking",
    keywords: "parkovanie poloha gps kde je auto parking location map",
    content: "Uloženie polohy zaparkovaného vozidla a informácie o parkovaní.",
    type: "section"
  },
  {
    id: "logbook",
    title: "Kniha jázd / Logbook",
    route: "/section/logbook",
    keywords: "kniha jázd uzávierka firemné súkromné kilometre kilometre mobility logbook mileage private business concur vyúčtovanie gps kniha",
    content: "Ako správne viesť knihu jázd. Rozdiel medzi firemnými a súkromnými kilometrami. Mesačná uzávierka jázd, GPS sledovanie vozidla, vyúčtovanie súkromných ciest a komunikácia s oddelením Mobility a systémom Concur.",
    type: "section"
  },
  {
    id: "contacts",
    title: "Dôležité kontakty / Contacts",
    route: "/section/contacts",
    keywords: "kontakty číslo marsh ayvens asistencia mobility odťahovka porucha contacts phone assistance breakdown towing kooperativa asistenčná služba hr personálne fleet",
    content: "Zoznam všetkých dôležitých telefónnych čísel: oddelenie Mobility (Fleet), poisťovací maklér (Marsh), asistenčné služby (Ayvens, Kooperativa), tiesňové linky (112, 158, 150, 155).",
    type: "section"
  }
];

export const rulesIndex = [
  {
    id: "rule-parking",
    title: "Parkovacie škody (škrabance, preliačiny) - 25%",
    keywords: "parkovanie škoda škrabanec preliačina dvere nárazník parking damage scratch",
    type: "rule",
    content: "Pri parkovacích škodách s neznámym vinníkom (napríklad nájdený škrabanec na parkovisku) nie je vždy nutné volať políciu, ak je škoda zjavne nízka. Údalosť však musíte do 24 hodín nahlásiť poisťovaciemu maklérovi (Marsh) a odfotiť poškodenie zo všetkých strán. Nezabudnite informovať oddelenie Mobility."
  },
  {
    id: "rule-collision-low",
    title: "Zrážka s iným vozidlom (pri nízkej rýchlosti) - 20%",
    keywords: "zrážka nehoda malé poškodenie ťuknutie iné vozidlo collision crash low speed",
    type: "rule",
    content: "Ak nedošlo k zraneniu a odhadovaná škoda nepresahuje 3990 €, políciu volať nemusíte. Je však absolútne kritické vyplniť Správu o nehode, zabezpečiť podpisy oboch vodičov a nafotiť situáciu (značky, postavenie vozidiel). Vinník musí nehodu nahlásiť svojej poisťovni. Nehodu hláste oddeleniu Mobility a maklérovi Marsh."
  },
  {
    id: "rule-windshield",
    title: "Poškodenie čelného skla (od kamienkov) - 15%",
    keywords: "sklo čelné okno prasklina kamienok pavúk windshield glass crack",
    type: "rule",
    content: "Prasklinu na čelnom skle riešte okamžite, aby sa predišlo jej rozšíreniu. Neodkladne kontaktujte asistenčnú službu Ayvens (alebo Hornet Autosklo), ktorí zabezpečia opravu zaliatím alebo výmenu skla. Škoda sa likviduje z havarijného poistenia. Vopred informujte oddelenie Mobility."
  },
  {
    id: "rule-animal",
    title: "Zrážka so zverou - 8%",
    keywords: "zver zviera pes diviak srnka jeleň zrážka animal deer crash",
    type: "rule",
    content: "Pri zrážke so zverou MUSÍTE VŽDY volať políciu na číslo 158. Zvieraťa sa v žiadnom prípade nedotýkajte, ani ho nenakladajte do auta (hrozí obvinenie z pytliactva). Počkajte na príchod hliadky, vyžiadajte si policajný záznam a následne udalosť nahláste maklérovi Marsh ako škodu z havarijného poistenia."
  },
  {
    id: "rule-vandalism",
    title: "Vandalizmus (úmyselné poškodenie) - 6%",
    keywords: "vandalizmus úmysel kľúč škrabanec sprej poškodenie vandalism scratch",
    type: "rule",
    content: "Ak nájdete vozidlo úmyselne poškodené (poškriabaný lak kľúčom, odtrhnuté zrkadlo a podobne), vždy zavolajte políciu, aby zadokumentovala škodu neznámym páchateľom. Bez policajného záznamu môže poisťovňa robiť problémy pri plnení z havarijného poistenia. Udalosť následne nahláste oddeleniu Mobility."
  },
  {
    id: "rule-weather",
    title: "Poškodenie živlami (krúpy, víchrica, konár) - 5%",
    keywords: "počasie krúpy víchrica konár strom voda živel weather storm hail",
    type: "rule",
    content: "Škody spôsobené prírodnými živlami (krúpy, padnutý strom, víchrica) kryje havarijné poistenie. Políciu volať netreba, pokiaľ nevznikla škoda na majetku inej osoby. Dôkladne nafoťte situáciu na mieste činu (napr. strom ležiaci na aute) a udalosť ihneď nahláste maklérovi Marsh."
  },
  {
    id: "rule-obstacle",
    title: "Náraz do pevnej prekážky (stĺp, obrubník) - 4%",
    keywords: "prekážka stĺp obrubník stena náraz obstacle wall pole",
    type: "rule",
    content: "Ak ste narazili do stĺpa, značky, zvodidiel alebo inej prekážky a poškodili ste verejný majetok, MUSÍTE volať políciu. Z poistenia PZP sa bude hradiť oprava poškodeného majetku a z havarijného poistenia oprava vášho vozidla. Nezabudnite odoslať hlásenie maklérovi."
  },
  {
    id: "rule-theft-car",
    title: "Krádež celého vozidla - 3%",
    keywords: "krádež auto zmizlo zlodej ukradnuté theft stolen car",
    type: "rule",
    content: "V prípade zistenia krádeže vozidla okamžite volajte políciu (158). Následne bez zbytočného odkladu informujte oddelenie Mobility a lízingovú spoločnosť Ayvens, aby mohli vozidlo zablokovať cez GPS lokalizáciu. Vyžiadajte si potvrdenie od polície o nahlásení krádeže."
  },
  {
    id: "rule-theft-parts",
    title: "Krádež častí vozidla (kolesá, rádio) - 2%",
    keywords: "krádež kolesá rádio navigácia okno vlámanie theft parts wheels",
    type: "rule",
    content: "Ak zistíte vlámanie do vozidla (rozbité okno, ukradnuté rádio, chýbajúce kolesá), ničoho sa nedotýkajte a okamžite volajte políciu, aby zabezpečili stopy. Havarijné poistenie kryje ukradnuté súčasti vozidla, ale NEKRYJE vaše súkromné veci ponechané v aute (notebook, kabelka)."
  },
  {
    id: "rule-tech-failure",
    title: "Technická porucha - 2%",
    keywords: "porucha motor neštartuje kontrolka prevodovka failure breakdown engine",
    type: "rule",
    content: "Pri vážnej technickej poruche alebo rozsvecovaní červenej kontrolky okamžite bezpečne zastavte. Zavolajte asistenčnú službu Ayvens, ktorá zabezpečí odťah do autorizovaného servisu a v prípade potreby aj náhradné vozidlo. Oprava spadá pod servis a záruku, nejde o poistnú udalosť."
  },
  {
    id: "rule-rodent",
    title: "Škody spôsobené kunou / hlodavcami - 1.5%",
    keywords: "kuna zvieratá hlodavec káble motor myš rodent marten cables",
    type: "rule",
    content: "Ak motor stratí výkon alebo na prístrojovke svieti chyba motora a pod kapotou zistíte prehryzené káble (najčastejšie od kún), vozidlo neštartujte. Zavolajte asistenčnú službu pre odťah do servisu. Oprava sa rieši cez oddelenie Mobility (často kryté špecifickým poistením)."
  },
  {
    id: "rule-fire",
    title: "Požiar vozidla - 1%",
    keywords: "požiar dym oheň hasiči horí fire smoke burning",
    type: "rule",
    content: "Pri zistení dymu z motora okamžite zastavte na bezpečnom mieste, vystúpte z vozidla a volajte hasičov (150 alebo 112). Až do príchodu záchranných zložiek sa udržujte v bezpečnej vzdialenosti. Požiar zadokumentujte a oznámte lízingovke Ayvens a oddeleniu Mobility."
  },
  {
    id: "rule-flood",
    title: "Záplavy a poškodenie vodou - 1%",
    keywords: "voda záplava povodeň utopené auto dážď flood water",
    type: "rule",
    content: "Ak bolo vozidlo zatopené, v žiadnom prípade sa nepokúšajte naštartovať motor (hrozí nasatie vody do motora a jeho totálna deštrukcia). Počkajte na opadnutie vody, vozidlo nafoťte, zavolajte asistenčnú službu pre odťah a nahláste škodu maklérovi ako živelnú udalosť."
  },
  {
    id: "rule-pothole",
    title: "Poškodenie pneumatík a diskov (výtlky) - 0.8%",
    keywords: "výtlk diera jama pneumatika defekt disk pothole tire rim",
    type: "rule",
    content: "V prípade vážneho poškodenia disku a pneumatiky na veľkom výtlku zastavte, nafoťte dieru na ceste aj poškodenie auta. Pre preplatenie škody od správcu komunikácie je nutné privolať políciu! Ak ide len o bežný defekt bez poškodenia disku, využite asistenčnú službu."
  },
  {
    id: "rule-pedestrian",
    title: "Zrážka s cyklistom / chodcom - 0.7%",
    keywords: "zrážka chodec cyklista zranenie človek pedestrian cyclist injury",
    type: "rule",
    content: "Kritická udalosť! Okamžite zastavte, poskytnite prvú pomoc a bezodkladne volajte záchrannú službu a políciu (112). Zabezpečte miesto nehody výstražným trojuholníkom. Nikdy nemanipulujte s vozidlom do príchodu polície. Spolupracujte so zložkami a po ich odchode informujte Marsh a Mobility."
  },
  {
    id: "rule-wrong-fuel",
    title: "Tankovanie nesprávneho paliva - 0.5%",
    keywords: "palivo zle palivo benzín do nafty nafta do benzínu wrong fuel",
    type: "rule",
    content: "Ak zistíte omyl počas tankovania alebo po zaplatení, V ŽIADNOM PRÍPADE neštartujte motor. Dokonca ani nezasúvajte kľúč do zapaľovania (čerpadlo by potiahlo zlé palivo). Zavolajte asistenčnú službu Ayvens, auto sa musí odtiahnuť do servisu na vyčerpanie nádrže. Náklady spravidla hradí vodič."
  },
  {
    id: "rule-transport-damage",
    title: "Škody pri preprave vozidla (odťahovka) - 0.5%",
    keywords: "odťahovka preprava poškodenie asistenčná služba transport towing",
    type: "rule",
    content: "Ak dôjde k poškodeniu vášho vozidla neopatrnou manipuláciou pracovníkom odťahovej služby, okamžite trvajte na zadokumentovaní poškodenia priamo do preberacieho protokolu odťahovky (pred vaším podpisom). Nafoťte si auto a kontaktujte lízingovú spoločnosť."
  },
  {
    id: "rule-cargo-damage",
    title: "Poškodenie pri nakladaní / vykladaní nákladu - 0.5%",
    keywords: "náklad nakladanie tovar poškodenie interiéru kufra cargo loading",
    type: "rule",
    content: "Škody na interiéri vozidla (napríklad roztrhnuté sedadlo alebo poškriabané plasty kufra) pri prevoze súkromného alebo nadrozmerného nákladu spravidla nejdú kryť z havarijného poistenia bez finančnej spoluúčasti. Vodič nesie zodpovednosť za bezpečné upevnenie nákladu."
  },
  {
    id: "rule-intersection",
    title: "Zrážka na križovatke (stredne ťažká) - 0.5%",
    keywords: "križovatka nedanie prednosti zrážka červená intersection priority",
    type: "rule",
    content: "Pri nedaní prednosti v jazde a stredne ťažkej zrážke skontrolujte zdravotný stav všetkých účastníkov. Ak vozidlá tvoria prekážku a sú pojazdné, po ich nafotení alebo označení ich presuňte na okraj. Vyplňte Správu o nehode, zistite svedkov a nahláste škodu maklérovi Marsh."
  },
  {
    id: "rule-flat-tire",
    title: "Mám defekt na pneumatike",
    keywords: "defekt pneu guma koleso flat tire puncture",
    type: "rule",
    content: "Ak máte bežný defekt a vozidlo má rezervu, môžete si koleso vymeniť sami alebo zavolať asistenčnú službu. Ak ide o víkend alebo ste v zahraničí, kontaktujte nonstop asistenciu Kooperativa alebo Ayvens. Ak bol poškodený aj disk na výtlku, je potrebné zavolať políciu."
  },
  {
    id: "legal-speed",
    title: "Rýchlostné limity (Slovensko)",
    keywords: "rýchlosť limity obec diaľnica speed limits km/h",
    type: "rule",
    content: "Maximálna povolená rýchlosť v obci je 50 kilometrov za hodinu. Mimo obce je to 90 kilometrov za hodinu, a na diaľnici 130 kilometrov za hodinu."
  },
  {
    id: "legal-alcohol",
    title: "Alkohol za volantom",
    keywords: "alkohol pivo víno promile tolerancia alcohol",
    type: "rule",
    content: "Na Slovensku platí prísna nulová tolerancia alkoholu pred jazdou aj počas nej. Akékoľvek množstvo alkoholu v krvi je vážnym porušením predpisov."
  },
  {
    id: "legal-phone",
    title: "Používanie mobilného telefónu",
    keywords: "mobil telefón volanie sms písanie phone hands-free",
    type: "rule",
    content: "Počas šoférovania je prísne zakázané držať telefón v ruke, písať správy alebo scrollovať. Povolené je výhradne telefonovanie cez systém hands-free."
  },
  {
    id: "legal-zipper",
    title: "Pravidlo zipsovania",
    keywords: "zips zipsovanie pruhy kolóna radenie zipper",
    type: "rule",
    content: "V mieste, kde sa zbiehajú jazdné pruhy, platí striedavé radenie takzvané zipsovanie. Vodič v pokračujúcom pruhu musí pustiť pred seba jedno vozidlo z končiaceho pruhu."
  },
  {
    id: "legal-rescue",
    title: "Záchranárska ulička",
    keywords: "ulička záchranári sanitka kolóna rescue corridor",
    type: "rule",
    content: "V dopravnej zápche alebo kolóne vytvorte záchranársku uličku. Vozidlá v ľavom pruhu sa uhýbajú čo najviac doľava, všetky ostatné pruhy doprava, aj na krajnicu. Stred musí ostať voľný."
  },
  {
    id: "legal-winter",
    title: "Zimné pneumatiky a sneh",
    keywords: "zima sneh ľad pneumatiky prezutie winter tires",
    type: "rule",
    content: "Zimné pneumatiky sú povinné, ak je na ceste súvislá vrstva snehu alebo ľadu. Pred jazdou musíte z vozidla odstrániť sneh a ľad, aby boli okná a značky čisté."
  }
];

export const allSearchIndex = [...searchIndex, ...rulesIndex];
