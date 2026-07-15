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

const skPhoneticRules: PhoneticRule[] = [
  // Značky a spoločnosti
  { pattern: /BMW/g, replacement: 'Bé em vé' },
  { pattern: /iDrive/gi, replacement: 'aj drajv' },
  { pattern: /AdBlue/gi, replacement: 'Adblú' },
  { pattern: /MARSH/g, replacement: 'Marš' },
  { pattern: /Marsh/g, replacement: 'Marš' },
  { pattern: /Ayvens/gi, replacement: 'Ajvens' },
  { pattern: /Concur/gi, replacement: 'Konkr' },
  
  // Skratky
  { pattern: /\bSTK\b/g, replacement: 'Es Té Ká' },
  { pattern: /\bEK\b/g, replacement: 'É Ká' },
  { pattern: /\bPZP\b/g, replacement: 'Pé Zet Pé' },
  { pattern: /\bGPS\b/g, replacement: 'Gé Pé Es' },
  { pattern: /\bTPMS\b/g, replacement: 'Té Pé Em Es' },
  { pattern: /\bPWA\b/g, replacement: 'Pé Vé Á' },
  { pattern: /\bSMS\b/g, replacement: 'Es Em Es' },
  
  // Tiesňové čísla a bežné čísla (od najdlhších po najkratšie)
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
 */
export function applyPhoneticRules(text: string, language: string): string {
  if (language !== 'sk') return text;
  
  let result = text;
  for (const rule of skPhoneticRules) {
    result = result.replace(rule.pattern, rule.replacement);
  }
  return result;
}
