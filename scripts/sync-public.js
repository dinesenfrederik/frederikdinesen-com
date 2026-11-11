const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');

// Remove existing public dir (and any broken symlinks)
if (fs.existsSync(publicDir)) {
  fs.rmSync(publicDir, { recursive: true, force: true });
}

fs.mkdirSync(publicDir, { recursive: true });
fs.mkdirSync(path.join(publicDir, 'en'), { recursive: true });

// Files to copy directly to public/
const rootFiles = [
  'index.html',
  'main.js',
  'terms.html',
  'terms.js',
  'robots.txt',
  'sitemap.xml',
  'style.css',
  'indexnow-key.txt'
];

for (const file of rootFiles) {
  const src = path.join(rootDir, file);
  const dest = path.join(publicDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
  }
}

// Copy en/index.html
const enSrc = path.join(rootDir, 'en', 'index.html');
const enDest = path.join(publicDir, 'en', 'index.html');
if (fs.existsSync(enSrc)) {
  fs.copyFileSync(enSrc, enDest);
}

// Copy tools directory recursively
const toolsSrc = path.join(rootDir, 'tools');
const toolsDest = path.join(publicDir, 'tools');
if (fs.existsSync(toolsSrc)) {
  fs.cpSync(toolsSrc, toolsDest, { recursive: true });
}

console.log('✓ Public assets synced cleanly (real files, no symlinks).');

