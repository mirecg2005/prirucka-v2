"use client";

/**
 * Zdieľaný fonetický slovník pre TTS.
 * Používa sa v TTSButton aj TTSContext na nahradenie skratiek,
 * značiek a čísel ich fonetickými ekvivalentmi pre slovenčinu.
 */

type PhoneticRule = {
  pattern: RegExp;
  replacement: string;
};

/** Mapa číslic na slovenské slová */
const digitMap: Record<string, string> = {
  '0': 'nula',
  '1': 'jeden',
  '2': 'dva',
  '3': 'tri',
  '4': 'štyri',
  '5': 'päť',
  '6': 'šesť',
  '7': 'sedem',
  '8': 'osem',
  '9': 'deväť',
};

/**
 * Konvertuje telefónne číslo na čítanie po skupinách číslic.
 * Napr. "0850 888 777" → "nula osem päť nula, osem osem osem, sedem sedem sedem"
 * Napr. "+421 902 966 689" → "plus štyri dva jeden, deväť nula dva, deväť šesť šesť, šesť osem deväť"
 */
function phoneToSpeech(phone: string): string {
  // Rozdelíme podľa medzier a iných separátorov
  const groups = phone.trim().split(/[\s\-\/]+/);
  
  const spokenGroups = groups.map(group => {
    let result = '';
    for (const char of group) {
      if (char === '+') {
        result += 'plus ';
      } else if (digitMap[char]) {
        result += digitMap[char] + ' ';
      }
    }
    return result.trim();
  });
  
  return spokenGroups.join(', ');
}

/**
 * Nájde a nahradí všetky telefónne čísla v texte ich fonetickými verziami.
 * Rozpoznáva formáty:
 *   +421 902 966 689
 *   0850 888 777
 *   0904 333 230
 *   +421902966689
 */
function replacePhoneNumbers(text: string): string {
  // Medzinárodný formát: +421...
  let result = text.replace(
    /\+\d{3}\s?\d{3}\s?\d{3}\s?\d{3}/g,
    (match) => phoneToSpeech(match)
  );
  
  // Slovenský formát: 0XXX XXX XXX (s alebo bez medzier)
  result = result.replace(
    /\b0\d{3}\s?\d{3}\s?\d{3}\b/g,
    (match) => phoneToSpeech(match)
  );
  
  // Krátke čísla v zátvorke: (0850 888 777)
  result = result.replace(
    /\((\+?\d[\d\s\-]{6,})\)/g,
    (_, inner) => '(' + phoneToSpeech(inner) + ')'
  );
  
  return result;
}

const skPhoneticRules: PhoneticRule[] = [
  // Značky a spoločnosti
  { pattern: /BMW/g, replacement: 'Bé em vé' },
  { pattern: /iDrive/gi, replacement: 'aj drajv' },
  { pattern: /AdBlue/gi, replacement: 'Adblú' },
  { pattern: /MARSH/g, replacement: 'Marš' },
  { pattern: /Marsh/g, replacement: 'Marš' },
  { pattern: /Ayvens/gi, replacement: 'Ajvens' },
  { pattern: /Concur/gi, replacement: 'Konkur' },
  { pattern: /pneuservis/gi, replacement: 'pneu servis' },
  
  // Skratky
  { pattern: /\bSTK\b/g, replacement: 'Es Té Ká' },
  { pattern: /\bEK\b/g, replacement: 'É Ká' },
  { pattern: /\bPZP\b/g, replacement: 'Pé Zet Pé' },
  { pattern: /\bGPS\b/g, replacement: 'Gé Pé Es' },
  { pattern: /\bTPMS\b/g, replacement: 'Té Pé Em Es' },
  { pattern: /\bPWA\b/g, replacement: 'Pé Vé Á' },
  { pattern: /\bSMS\b/g, replacement: 'Es Em Es' },
  
  // Tiesňové čísla — tieto sú krátke a čítajú sa ako celé čísla
  { pattern: /\b3990\b/g, replacement: 'tri tisíc deväťsto deväťdesiat' },
  { pattern: /\b158\b/g, replacement: 'sto päťdesiat osem' },
  { pattern: /\b155\b/g, replacement: 'sto päťdesiat päť' },
  { pattern: /\b150\b/g, replacement: 'sto päťdesiat' },
  { pattern: /\b112\b/g, replacement: 'sto dvanásť' },
  
  // Meny a jednotky
  { pattern: /€/g, replacement: 'eur' },
  { pattern: /\bkm\/h\b/g, replacement: 'kilometrov za hodinu' },
  { pattern: /\btel\.\s*č\./gi, replacement: 'telefónne číslo' },
];

/**
 * Aplikuje fonetické náhrady na text podľa zvoleného jazyka.
 * Najprv nahradí telefónne čísla (po cifrách), potom ostatné pravidlá.
 */
export function applyPhoneticRules(text: string, language: string): string {
  if (language !== 'sk') return text;
  
  // 1. Najprv nahraď telefónne čísla (dlhé skupiny číslic po cifrách)
  let result = replacePhoneNumbers(text);
  
  // 2. Potom aplikuj ostatné pravidlá (skratky, značky, krátke čísla)
  for (const rule of skPhoneticRules) {
    result = result.replace(rule.pattern, rule.replacement);
  }
  return result;
}
