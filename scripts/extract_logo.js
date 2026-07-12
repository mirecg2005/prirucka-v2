const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', '..', 'lidl-prirucka', 'index.html');
const content = fs.readFileSync(htmlPath, 'utf8');

// Match the specific img tag for the Lidl Logo
const match = content.match(/<img src="data:image\/png;base64,([^"]+)" alt="Lidl Logo"/);

if (match && match[1]) {
    const base64Data = match[1];
    const imageBuffer = Buffer.from(base64Data, 'base64');
    
    const publicDir = path.join(__dirname, '..', 'public');
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir);
    }
    
    fs.writeFileSync(path.join(publicDir, 'lidl-logo.png'), imageBuffer);
    console.log('Logo successfully extracted to public/lidl-logo.png');
} else {
    console.error('Could not find lidl-logo base64 data.');
}
