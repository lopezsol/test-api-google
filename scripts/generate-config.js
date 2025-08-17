const fs = require('fs');
const path = require('path');

const config = {
  googleClientId: process.env.GOOGLE_CLIENT_ID || '',
  googleApiKey: process.env.GOOGLE_API_KEY || '',
  mobyUrl: process.env.MOBY_URL || '',
  redirectUriLogin: process.env.REDIRECT_URI_LOGIN || '',
};

const assetsDir = path.join(__dirname, '../src/assets');

// Crear carpeta si no existe
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

const configPath = path.join(assetsDir, 'config.json');

fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
console.log(`Config file written to ${configPath}`);
