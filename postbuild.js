const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'out');
const indexHtmlPath = path.join(outDir, 'index.html');
const appHtmlPath = path.join(outDir, 'app.html');
const pageHtmlPath = path.join(outDir, 'page.html');

if (fs.existsSync(indexHtmlPath) && fs.existsSync(pageHtmlPath)) {
  fs.renameSync(indexHtmlPath, appHtmlPath);
  fs.renameSync(pageHtmlPath, indexHtmlPath);
  
  let content = fs.readFileSync(indexHtmlPath, 'utf8');
  content = content.replace(/href="index\.html"/g, 'href="app.html"');
  fs.writeFileSync(indexHtmlPath, content, 'utf8');
  console.log('Successfully remapped page.html to index.html and index.html to app.html');
} else {
  console.log('Skipping postbuild: out directory does not contain index.html and page.html');
}
