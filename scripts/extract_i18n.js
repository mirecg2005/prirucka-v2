const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', '..', 'lidl-prirucka', 'index.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

const startIndex = htmlContent.indexOf('const translations = {');
const endIndex = htmlContent.indexOf('// --- Jazyk ---');

if (startIndex !== -1 && endIndex !== -1) {
    let jsBlock = htmlContent.substring(startIndex, endIndex);
    
    try {
        let translations;
        eval(jsBlock.replace('const translations =', 'translations =')); 
        
        const sk = translations.sk;
        const en = translations.en;

        const i18nDir = path.join(__dirname, '..', 'src', 'i18n');
        if (!fs.existsSync(i18nDir)) fs.mkdirSync(i18nDir, { recursive: true });

        fs.writeFileSync(path.join(i18nDir, 'sk.json'), JSON.stringify(sk, null, 2), 'utf8');
        fs.writeFileSync(path.join(i18nDir, 'en.json'), JSON.stringify(en, null, 2), 'utf8');
        
        console.log('Translations extracted successfully! SK keys: ' + Object.keys(sk).length + ', EN keys: ' + Object.keys(en).length);
    } catch (e) {
        console.error('Error evaluating block:', e.message);
    }
} else {
    console.error('Could not find start/end markers.');
}
