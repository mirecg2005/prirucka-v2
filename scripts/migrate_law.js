const fs = require('fs');
const path = require('path');

const lawDatabase = [
    {
        keywords: ["alkohol", "promile", "pivo", "vino", "dych", "vypit", "alkoholu", "promila", "drink", "alcohol", "beer", "wine", "breath"],
        law_ref: "§ 4 ods. 2 písm. c) zákona č. 8/2009 Z. z.",
        fine_sk: "Od 150 € do 1000 €, zákaz činnosti do 5 rokov (nad 1 ‰ trestný čin s hrozbou väzenia)",
        fine_en: "From €150 to €1000, driving ban up to 5 years (above 1 ‰ is a criminal offense)",
        answer_sk: "Na Slovensku platí <strong>nulová tolerancia</strong> alkoholu za volantom. Vodič nesmie požiť alkohol pred jazdou ani počas nej. Odmietnutie dychovej skúšky sa posudzuje ako spáchanie trestného činu pod vplyvom návykovej látky.",
        answer_en: "Slovakia has <strong>zero tolerance</strong> for alcohol. A driver must not consume alcohol before or during driving. Refusing a breath test is treated as a criminal offense."
    },
    {
        keywords: ["rychlost", "prekrocenie", "obec", "rychlo", "km/h", "dialnica", "mimo obce", "speed", "limit", "highway", "city"],
        law_ref: "§ 16 zákona č. 8/2009 Z. z.",
        fine_sk: "Bloková pokuta od 20 € do 800 €, v správnom konaní až do 1000 € a zákaz činnosti",
        fine_en: "On-the-spot fine from €20 to €800, up to €1000 and driving ban in administrative proceedings",
        answer_sk: "Maximálne rýchlosti: <strong>v obci 50 km/h</strong>, <strong>mimo obce 90 km/h</strong>, <strong>na diaľnici 130 km/h</strong> (diaľnica v obci 90 km/h). Rýchlosť jazdy musíte prispôsobiť svojim schopnostiam, vlastnostiam vozidla a stavu vozovky.",
        answer_en: "Speed limits: <strong>in built-up areas 50 km/h</strong>, <strong>outside 90 km/h</strong>, <strong>on highways 130 km/h</strong> (highways in city 90 km/h). Speed must be adjusted to road conditions."
    },
    {
        keywords: ["mobil", "telefon", "telefonovanie", "drzat", "volat", "sms", "pisat", "handsfree", "phone", "mobile", "calling", "texting", "hands-free"],
        law_ref: "§ 4 ods. 2 písm. m) zákona č. 8/2009 Z. z.",
        fine_sk: "Bloková pokuta 150 €, v správnom konaní až 300 € (a možnosť straty VP)",
        fine_en: "On-the-spot fine €150, up to €300 in administrative proceedings",
        answer_sk: "Počas jazdy je prísne zakázané držať v ruke alebo iným spôsobom obsluhovať telefónny prístroj alebo iné hovorové či záznamové zariadenie. Povolené je výhradne používanie <strong>hands-free</strong> sád bez držania prístroja v ruke.",
        answer_en: "It is strictly forbidden to hold or operate a mobile phone or other recording device while driving. Only <strong>hands-free</strong> systems are allowed, without holding the device."
    },
    {
        keywords: ["pneumatiky", "zimne", "letne", "sneh", "lad", "prezut", "prezuvanie", "retaze", "dezen", "tires", "tyres", "winter", "summer", "snow", "ice"],
        law_ref: "§ 38 zákona č. 8/2009 Z. z.",
        fine_sk: "Bloková pokuta do 50 €",
        fine_en: "On-the-spot fine up to €50",
        answer_sk: "Zimné pneumatiky (označenie M+S, M.S, M&S alebo alpský symbol) sú povinné pre osobné autá <strong>od 15. novembra do 31. marca</strong>, ak sa na vozovke nachádza <strong>súvislá snehová vrstva, ľad alebo námraza</strong>. Odporúča sa však prezúvať hneď, ako teploty klesnú pod 7 °C.",
        answer_en: "Winter tires (marked M+S, M.S, M&S or alpine symbol) are mandatory for passenger cars <strong>from Nov 15 to Mar 31</strong> if there is a <strong>continuous layer of snow, ice or frost</strong> on the road."
    },
    {
        keywords: ["ulicka", "zachranarska", "koridor", "prejazd", "sanitka", "policia", "hasici", "emergency", "corridor", "lane", "ambulance", "towing"],
        law_ref: "§ 10 ods. 11 zákona č. 8/2009 Z. z.",
        fine_sk: "Za nevytvorenie 99 €, za neoprávnené zneužitie prejazdu až do 300 €",
        fine_en: "€99 for not creating, up to €300 for unauthorized usage of the corridor",
        answer_sk: "Pri tvorení kolóny na diaľnici alebo rýchlostnej ceste sú vodiči povinní vytvoriť <strong>záchranársku uličku</strong> (núdzový koridor) uprostred. Vodiči v ľavom pruhu sa tlačia čo najviac doľava, vodiči v ostatných pruhoch čo najviac doprava.",
        answer_en: "When a traffic jam forms on a highway, drivers are obliged to create an <strong>emergency corridor</strong> in the middle. Drivers in the left lane move as far left as possible, others as far right as possible."
    },
    {
        keywords: ["kruhovy", "objazd", "kruhovom", "smerovka", "blikat", "prednost", "roundabout", "indicator", "blinker", "priority"],
        law_ref: "§ 30 zákona č. 8/2009 Z. z.",
        fine_sk: "Bloková pokuta do 50 €",
        fine_en: "On-the-spot fine up to €50",
        answer_sk: "Smerové svetlo (smerovku) dávate <strong>iba pred výjazdom</strong> z kruhového objazdu (pri opúšťaní), aby ostatní vodiči vedeli, že uvoľňujete kruhový objazd. Pri vjazde na kruhový objazd sa smerovka nedáva. Prednosť na kruhovom objazde upravuje dopravné značenie.",
        answer_en: "Direction indicator (blinker) is given <strong>only when exiting</strong> the roundabout. Do not use blinkers when entering. Right of way is governed by road signs."
    },
    {
        keywords: ["pasy", "pas", "priputat", "pripútanie", "bezpecnostny", "airbag", "seatbelt", "belt", "fasten"],
        law_ref: "§ 8 zákona č. 8/2009 Z. z.",
        fine_sk: "Bloková pokuta 50 €",
        fine_en: "On-the-spot fine €50",
        answer_sk: "Osoba sediaca na sedadle povinne vybavenom bezpečnostným pásom je povinná ho počas jazdy <strong>použiť</strong>. Výnimku majú napr. inštruktori autoškoly, príslušníci záchranných zložiek pri plnení úloh alebo osoby s lekárskym potvrdením.",
        answer_en: "Every person sitting in a seat equipped with a seatbelt must <strong>use it</strong> during driving. Exceptions apply to driving instructors, emergency responders on duty, or persons with medical waivers."
    },
    {
        keywords: ["parkovanie", "chodnik", "chodniku", "státie", "zastavenie", "chodci", "chodce", "parking", "sidewalk", "pavement"],
        law_ref: "§ 52 ods. 2 zákona č. 8/2009 Z. z. (novela platná od 1. 10. 2023)",
        fine_sk: "Bloková pokuta do 50 €",
        fine_en: "On-the-spot fine up to €50",
        answer_sk: "Od 1. októbra 2023 platí <strong>úplný zákaz parkovania na chodníkoch</strong> pre motorové vozidlá. Parkovanie na chodníku je povolené len na miestach, kde to **výslovne povoľuje dopravné značenie**.",
        answer_en: "Since October 1, 2023, there is a <strong>complete ban on parking on pavements/sidewalks</strong> for motor vehicles. Parking on sidewalks is allowed only where explicitly permitted by road signs."
    },
    {
        keywords: ["chodec", "chodci", "priechod", "zebra", "prednost", "prechádzanie", "pedestrian", "pedestrians", "crossing", "priority"],
        law_ref: "§ 4 ods. 1 písm. f) zákona č. 8/2009 Z. z.",
        fine_sk: "Bloková pokuta od 30 € do 150 €",
        fine_en: "On-the-spot fine from €30 to €150",
        answer_sk: "Vodič je povinný <strong>dať prednosť chodcovi</strong>, ktorý vstúpil na priechod pre chodcov alebo naň zjavne hodlá vstúpiť. Nesmie ho pritom ohroziť. Táto povinnosť neplatí pre vodiča električky.",
        answer_en: "The driver is obliged to <strong>give way to a pedestrian</strong> who has entered or is clearly intending to enter a pedestrian crossing. The driver must not endanger them. This does not apply to tram drivers."
    },
    {
        keywords: ["zver", "zrazka", "lesna", "srna", "diviak", "jelen", "nehoda so zverou", "zrazka so zverou", "zvierata", "zverou", "animal", "deer", "collision", "accident with animal", "wildlife"],
        law_ref: "§ 49 zákona č. 8/2009 Z. z.",
        fine_sk: "0 € (zrážka so zverou je škodová udalosť, nie je to priestupok vodiča)",
        fine_en: "€0 (collision with wildlife is a damage event, not a driver traffic offense)",
        answer_sk: "Pri zrážke so zverou ide o škodovú udalosť. **Vodič je však vždy povinný volať políciu (158)**. Polícia upovedomí poľovnícke združenie na odstránenie zveri. **Upozornenie:** Zrazenú zver nikdy neberte so sebou (ide o trestný čin pytliactva).",
        answer_en: "A collision with wild animals is a damage event. **However, the driver must always call the police (158)**. The police will notify local hunters. **Warning:** Never take the animal with you (it is considered poaching)."
    },
    {
        keywords: ["zipsovanie", "zips", "striedave", "radenie", "zuzenie", "pruh", "pruhy", "zipper", "merge", "zipper merge", "lane narrowing"],
        law_ref: "§ 10 ods. 10 zákona č. 8/2009 Z. z.",
        fine_sk: "Bloková pokuta do 50 €",
        fine_en: "On-the-spot fine up to €50",
        answer_sk: "Zipsovanie (striedavé radenie) je **povinné** pri zužovaní pruhov alebo pri prekážke. Vodič v priebežnom pruhu je povinný umožniť vodičovi v končiacom pruhu striedavé zaradenie, a to tesne pred miestom zúženia.",
        answer_en: "Zipper merging is **mandatory** when lanes merge or at an obstacle. The driver in the continuous lane must allow one driver from the ending lane to merge just before the narrowing."
    },
    {
        keywords: ["predbiehanie", "predchadzanie", "plna ciara", "zakaz", "overtaking", "passing", "solid line", "forbidden"],
        law_ref: "§ 15 zákona č. 8/2009 Z. z.",
        fine_sk: "Od 60 € do 300 €, možnosť zákazu činnosti až na 2 roky",
        fine_en: "From €60 to €300, possible driving ban up to 2 years",
        answer_sk: "Predchádza sa zásadne **vľavo**. Predchádzať je zakázané: ak nemáte dostatočný výhľad, cez plnú čiaru, na priechode pre chodcov, na priecestí, na križovatke (s výnimkami) a tam, kde je to zakázané značkou.",
        answer_en: "Overtaking is performed on the **left**. Overtaking is forbidden: if you don't have clear view, across a solid line, on pedestrian crossings, junctions, or where forbidden by signs."
    },
    {
        keywords: ["hmlovky", "hmla", "hmly", "dazd", "snezenie", "svietenie", "fog", "lights", "fog lights", "rain", "snowing"],
        law_ref: "§ 32 ods. 3 zákona č. 8/2009 Z. z.",
        fine_sk: "Bloková pokuta od 10 € do 30 €",
        fine_en: "On-the-spot fine from €10 to €30",
        answer_sk: "Predné a zadné hmlové svetlá sa smú používať **výhradne za hmly, sneženia alebo za dažďa**. Používanie hmloviek za bežnej viditeľnosti (napr. za jasnej noci alebo v kolóne) oslňuje ostatných a je zakázané.",
        answer_en: "Front and rear fog lights may be used **only during fog, snow, or heavy rain**. Using fog lights under normal visibility (e.g. clear night or in a traffic queue) glares others and is forbidden."
    },
    {
        keywords: ["dezen", "hlbka", "miera", "opotrebenie", "milimetre", "mm", "tread", "depth", "wear", "millimeters"],
        law_ref: "Príloha č. 1 k vyhláške č. 134/2018 Z. z.",
        fine_sk: "Bloková pokuta do 50 € a odobratie osvedčenia o evidencii (technického preukazu)",
        fine_en: "On-the-spot fine up to €50 and retention of registration certificate",
        answer_sk: "Minimálna predpísaná hĺbka dezénu v SR: **1,6 mm pre letné pneumatiky** a **3 mm pre zimné pneumatiky** (na snehu/ľade). Odporúčaná bezpečná hĺbka je však 3 mm pre letné a 4 mm pre zimné pneu.",
        answer_en: "Minimum legal tread depth in SK: **1.6 mm for summer tires** and **3 mm for winter tires** (on snow/ice). Recommended safe depth is 3 mm for summer and 4 mm for winter."
    },
    {
        keywords: ["kolobezka", "elektrokolobezka", "kolobezke", "scooter", "e-scooter", "escooter"],
        law_ref: "§ 55a zákona č. 8/2009 Z. z.",
        fine_sk: "Bloková pokuta do 50 €",
        fine_en: "On-the-spot fine up to €50",
        answer_sk: "Na elektrokolobežke smie jazdiť iba **jedna osoba**. Vek nad 15 rokov je povinný (okrem cyklotrás a obytných zón). Tolerancia alkoholu je **max. 0,5 ‰** (iba pri jazde v obci alebo na cyklotrase). Jazdiť sa musí po cyklochodníku alebo pravom okraji cesty.",
        answer_en: "Only **one person** may ride an e-scooter. Age over 15 is mandatory (except cycle paths/residential zones). Alcohol tolerance is **max. 0.5 ‰** (only in municipality/cycle path). Must ride on right edge of road."
    },
    {
        keywords: ["lekarnicka", "vybava", "povinna", "trojuholnik", "vesta", "kit", "equipment", "mandatory", "triangle", "first-aid", "first aid"],
        law_ref: "Vyhláška č. 134/2018 Z. z.",
        fine_sk: "Bloková pokuta do 50 €",
        fine_en: "On-the-spot fine up to €50",
        answer_sk: "Povinná výbava osobného vozidla v SR zahŕňa: **homologovaný výstražný trojuholník**, **bezpečnostný reflexný odev (vestu)** pre každého člena posádky (v dosahu zo sedadla), **náhradné koleso/sadu na opravu defektu** a **nepoškodenú lekárničku**.",
        answer_en: "Mandatory equipment in SK includes: **certified warning triangle**, **reflective safety clothing (vest)** for each passenger (within reach from seat), **spare wheel/puncture repair kit**, and a **first-aid kit**."
    },
    {
        keywords: ["defekt", "koleso", "prepichnuta", "vymena", "guma", "dusa", "pneu", "pneumatika", "flat tire", "puncture", "wheel"],
        law_ref: "§ 40 zákona č. 8/2009 Z. z. a Fleetové pravidlá",
        fine_sk: "0 € (asistencia Ayvens je pre zamestnancov zadarmo; pokuta do 50 € hrozí, ak pri oprave na ceste neumiestnite trojuholník)",
        fine_en: "€0 (Ayvens assistance is free for employees; fine up to €50 only if warning triangle is not placed during road repair)",
        answer_sk: "Pri defekte zastavte na bezpečnom mieste, zapnite výstražné svetlá, oblečte si vestu a umiestnite trojuholník (na diaľnici 100 m za auto). **Ako vodič Lidl nemusíte meniť koleso sami:** zavolajte asistenciu Ayvens (0850 888 777), ktorá defekt vyrieši za vás (výmena alebo odtiahnutie).",
        answer_en: "In case of a flat tire, stop safely, turn on hazard lights, wear a vest, and place the warning triangle (100 m on highways). **As a Lidl driver, you do not need to change the wheel yourself:** call Ayvens assistance (0850 888 777) for a free repair or towing."
    },
    {
        keywords: ["skrabance", "skrabance na parkovisku", "parkovisko", "tukance", "skoda na parkovisku", "neznamy vinnik", "poskodenie na parkovisku", "preliacina", "parking damage", "scratches", "unknown culprit"],
        law_ref: "§ 65 a § 66 zákona č. 8/2009 Z. z. (Útek z miesta)",
        fine_sk: "0 € pre poškodeného; ak vy spôsobíte škodu a ujdete: od 300 € do 1300 € a zákaz činnosti na 1 až 5 rokov!",
        fine_en: "€0 for victim; if you cause damage and leave: €300 to €1300 and driving ban for 1 to 5 years!",
        answer_sk: "Ak nájdete auto poškodené na parkovisku bez lístka, nahláste to ako poistnú udalosť (MARSH). **Upozornenie:** Ak vy spôsobíte aj drobný škrabanec inému autu a odídete bez nahlásenia majiteľovi alebo polícii, je to posudzované ako **útek z miesta dopravnej nehody** s fatálnymi trestami.",
        answer_en: "If you find your car damaged in a parking lot, report it to MARSH. **Warning:** If you scrape another car and leave without notifying the owner or calling the police, it is classified as **hit and run** with severe penalties."
    },
    {
        keywords: ["kamienok", "sklo", "celne sklo", "prasklina", "celnom", "prasknute", "puknute", "stone chip", "windshield", "windscreen", "crack"],
        law_ref: "§ 4 písm. a) vyhlášky č. 134/2018 Z. z. (Technická nespôsobilosť)",
        fine_sk: "Bloková pokuta 50 € a zadržanie osvedčenia o evidencii (technického preukazu)",
        fine_en: "On-the-spot fine €50 and retention of registration certificate",
        answer_sk: "Poškodenie čelného skla odleteným kamienkom (ak je prasklina v stieranej zóne väčšia ako 2 cm) robí vozidlo **technicky nespôsobilým**. S takýmto autom nesmiete jazdiť. Škodovú udalosť hneď nahláste maklérovi MARSH a sklo dajte vymeniť/opraviť.",
        answer_en: "A cracked windshield (if the crack is in the wiper zone and larger than 2 cm) makes the vehicle **technically unfit for road**. You must not drive it. Report it to MARSH and arrange replacement."
    },
    {
        keywords: ["palivo", "nespravne palivo", "zmena paliva", "benzin do nafty", "nafta do benzinu", "natankoval", "wrong fuel", "misfueling"],
        law_ref: "Prevádzkový poriadok flotily / Fleet guidelines",
        fine_sk: "Podľa leasingovej zmluvy (ak naštartujete motor, hrozí zosobnenie celej škody na motore vodičovi!)",
        fine_en: "According to lease terms (starting the engine risk charging the entire engine repair cost to the driver!)",
        answer_sk: "Ak natankujete nesprávne palivo (napr. benzín do naftového motora), **NENAŠTARTOVALI MOTOR!** Nespúšťajte ani zapaľovanie (iDrive). Okamžite zavolajte asistenčnú službu Ayvens (0850 888 777) na odtiahnutie a odsatí paliva. Ak nenaštartujete, motor sa nepoškodí.",
        answer_en: "If you fill the wrong fuel, **DO NOT START THE ENGINE!** Do not even turn on the ignition (iDrive). Call Ayvens assistance (0850 888 777) immediately to tow the car and drain the fuel. If you don't start the engine, it won't be damaged."
    },
    {
        keywords: ["odtiahnutie", "odtiahnute", "odtiahli", "159", "mestska policia", "kde je auto", "towed", "towing", "city police"],
        law_ref: "§ 25 zákona č. 8/2009 Z. z. a zákon o obecnej polícii",
        fine_sk: "Pokuta za parkovanie do 50 € + poplatok za odťah (zvyčajne 100 € - 150 €) hradí vodič",
        fine_en: "Parking fine up to €50 + towing fee (usually €100 - €150) paid by the driver",
        answer_sk: "Ak po príchode na miesto parkovania nenájdete svoje auto, najskôr volajte **Mestskú políciu (159)**, ktorá preverí, či vozidlo nebolo odtiahnuté. Odťah a pokuta za nesprávne parkovanie idú na vrub vodiča a nepreplácajú sa ako služobný náklad.",
        answer_en: "If your car is missing, call the **City Police (159)** to check if it was towed. The towing fee and the parking fine are paid by the driver and cannot be claimed as business expenses."
    },
    {
        keywords: ["servis", "oprava", "prihlasenie", "nahlasenie", "nahlasim", "objednat", "objednanie", "servisu", "opravy", "booking", "service", "repair", "appointment"],
        law_ref: "Flotilové pravidlá Lidl",
        fine_sk: "Bez pokuty (povinnosť dodržiavať servisné intervaly - nedodržanie môže byť zosobnené!)",
        fine_en: "No fine (mandatory service intervals must be kept - failure can be charged!)",
        answer_sk: "Pre objednanie na pravidelný servis, výmenu čelného skla (Hornet) alebo opravu volajte zákaznícku linku Ayvens/LeasePlan: **0850 888 777** (zo zahraničia **+421 904 333 230**). Pre VW je zmluvná sieť TODOS, pre BMW zmluvní partneri BMW.",
        answer_en: "To book regular service, windshield replacement (Hornet), or repairs, call the Ayvens/LeasePlan hotline: **0850 888 777** (from abroad **+421 904 333 230**). VW uses TODOS network, BMW uses BMW partners."
    },
    {
        keywords: ["cistenie", "umyvanie", "ciste", "umyvaren", "umyt", "vysavanie", "spinave", "car wash", "cleaning", "wash"],
        law_ref: "Flotilové pravidlá Lidl",
        fine_sk: "Zákaz čistenia interiéru na náklady Lidl!",
        fine_en: "Prohibition of interior cleaning at Lidl expenses!",
        answer_sk: "Užívateľ je povinný udržiavať vozidlo čisté. **Dôležité:** Umývanie exteriéru je povolené **najlacnejším programom** na čerpacích staniciach **Shell a OMV** pomocou palivovej karty. Čistenie/tepovanie interiéru na náklady spoločnosti Lidl je **prísne zakázané**.",
        answer_en: "Drivers must keep the vehicle clean. **Important:** Exterior washing is allowed using the **cheapest program** at **Shell and OMV** stations using the fuel card. Interior cleaning at Lidl expense is **strictly forbidden**."
    },
    {
        keywords: ["kniha jazd", "nahlasovanie kilometrov", "kilometre", "km", "sukromne", "sluzobne", "logbook", "trips", "mileage"],
        law_ref: "Flotilové pravidlá Lidl",
        fine_sk: "Upozornenie: Povinnosť nahlásiť kilometre do 3. dňa nasledujúceho mesiaca!",
        fine_en: "Warning: Mandatory mileage report by 3rd day of the following month!",
        answer_sk: "Všetky služobné aj súkromné jazdy musíte evidovať. Stav tachometra a rozdelenie kilometrov musíte nahlásiť prostredníctvom aplikácie/systému najneskôr do **3. dňa** nasledujúceho mesiaca.",
        answer_en: "All business and private trips must be recorded. Odometer readings and trip division must be reported via the app/system by the **3rd day** of the following month."
    },
    {
        keywords: ["znamka", "znamky", "dialnicna", "dialnicnej", "eznamka", "vignette", "vignettes", "overenie", "kontrola", "kontrolu"],
        law_ref: "Zákon č. 488/2013 Z. z. (o diaľničnej známke)",
        fine_sk: "Bloková pokuta od 50 € do 200 € (v správnom konaní od 150 € do 500 €)",
        fine_en: "On-the-spot fine from €50 to €200 (in administrative proceedings €150 to €500)",
        answer_sk: "Pre jazdu na slovenských diaľniciach a rýchlostných cestách je povinná platná elektronická diaľničná známka. **Platnosť známky pre vaše EČV si môžete overiť priamo tu:** <a href=\"https://eznamka.sk/selfcare/modification/select/select-vignettes/?operation=Check\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"underline text-blue-600 font-bold dark:text-blue-400\">Otvoriť kontrolu platnosti na eznamka.sk</a>.",
        answer_en: "A valid electronic vignette is mandatory for driving on Slovak highways. **You can verify the vignette validity for your license plate directly here:** <a href=\"https://eznamka.sk/selfcare/modification/select/select-vignettes/?operation=Check\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"underline text-blue-600 font-bold dark:text-blue-400\">Open validity check on eznamka.sk</a>."
    }
];

const formattedLaws = lawDatabase.map((law, index) => {
    // Generate a simple title based on the first keyword
    const key = law.keywords[0];
    const skTitle = key.charAt(0).toUpperCase() + key.slice(1);
    
    // Separate english vs slovak keywords (approximate based on known translations)
    const enKeywords = law.keywords.filter(k => 
        ["alcohol", "beer", "wine", "breath", "speed", "limit", "highway", "city", "phone", "mobile", "calling", "texting", "hands-free", "tires", "tyres", "winter", "summer", "snow", "ice", "emergency", "corridor", "lane", "ambulance", "towing", "roundabout", "indicator", "blinker", "priority", "seatbelt", "belt", "fasten", "parking", "sidewalk", "pavement", "pedestrian", "pedestrians", "crossing", "animal", "deer", "collision", "wildlife", "zipper", "merge", "lane narrowing", "overtaking", "passing", "solid line", "forbidden", "fog", "lights", "rain", "snowing", "tread", "depth", "wear", "millimeters", "scooter", "e-scooter", "escooter", "kit", "equipment", "mandatory", "triangle", "first-aid", "first aid", "flat tire", "puncture", "wheel", "parking damage", "scratches", "unknown culprit", "stone chip", "windshield", "windscreen", "crack", "wrong fuel", "misfueling", "towed", "city police", "booking", "service", "repair", "appointment", "car wash", "cleaning", "wash", "logbook", "trips", "mileage", "vignette", "vignettes"].includes(k)
    );
    const skKeywords = law.keywords.filter(k => !enKeywords.includes(k));

    return {
        id: "law_" + (index + 1).toString().padStart(2, '0'),
        title: { sk: skTitle, en: enKeywords[0] ? (enKeywords[0].charAt(0).toUpperCase() + enKeywords[0].slice(1)) : skTitle },
        keywords: { 
            sk: skKeywords.join(', '), 
            en: enKeywords.join(', ') || skKeywords.join(', ')
        },
        reference: law.law_ref,
        fine: { sk: law.fine_sk, en: law.fine_en },
        content: { sk: law.answer_sk, en: law.answer_en }
    };
});

fs.writeFileSync(path.join(__dirname, '..', 'src', 'data', 'law-database.json'), JSON.stringify(formattedLaws, null, 2), 'utf-8');
console.log('Migrated ' + formattedLaws.length + ' laws to law-database.json');
