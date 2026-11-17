import fs from 'node:fs';
import crypto from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'dist');
const excluded = new Set(['.git', '.github', 'dist', 'node_modules', 'scripts', 'README.md', 'UPGRADE-NOTES.md']);

fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });

function copyTree(source, destination) {
  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    if (excluded.has(entry.name) || entry.name === '.DS_Store') continue;
    const from = path.join(source, entry.name);
    const to = path.join(destination, entry.name);
    if (entry.isDirectory()) {
      fs.mkdirSync(to, { recursive: true });
      copyTree(from, to);
    } else {
      fs.mkdirSync(path.dirname(to), { recursive: true });
      fs.copyFileSync(from, to);
    }
  }
}

copyTree(root, output);
const homeFile = path.join(root, 'content', 'home.json');
const home = JSON.parse(fs.readFileSync(homeFile, 'utf8'));
if (!home.site?.name || !home.hero?.headline) throw new Error('Homepage is missing required profile or hero content.');
const manifestFile = path.join(root, 'content', 'pages', 'index.json');
const manifest = fs.existsSync(manifestFile) ? JSON.parse(fs.readFileSync(manifestFile, 'utf8')) : { pages: [] };
const assetHash = relativePath => crypto
  .createHash('sha256')
  .update(fs.readFileSync(path.join(root, relativePath)))
  .digest('hex')
  .slice(0, 12);

const cssVersion = assetHash('assets/site.css');
const jsVersion = assetHash('assets/site.js');
const template = fs.readFileSync(path.join(root, 'index.html'), 'utf8')
  .replace('/assets/site.css', `/assets/site.css?v=${cssVersion}`)
  .replace('/assets/site.js', `/assets/site.js?v=${jsVersion}`);
fs.writeFileSync(path.join(output, 'index.html'), template);
const validSlug = slug => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
const seen = new Set();
for (const page of manifest.pages || []) {
  if (!page.slug || !validSlug(page.slug) || seen.has(page.slug)) throw new Error(`Invalid or duplicate custom page slug: ${page.slug}`);
  seen.add(page.slug);
  const source = path.join(root, 'content', 'pages', `${page.slug}.json`);
  if (!fs.existsSync(source)) throw new Error(`Missing custom page source: content/pages/${page.slug}.json`);
  JSON.parse(fs.readFileSync(source, 'utf8'));
  const destination = path.join(output, page.slug, 'index.html');
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, template);
}
fs.writeFileSync(path.join(output, '404.html'), template);
const sitemapUrls = ['https://sabbir.dpdns.org/', ...(manifest.pages || []).map(page => `https://sabbir.dpdns.org/${page.slug}/`)];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls.map(url => `  <url><loc>${url}</loc><changefreq>monthly</changefreq></url>`).join('\n')}\n</urlset>\n`;
fs.writeFileSync(path.join(output, 'sitemap.xml'), sitemap);
console.log(`Build complete: ${manifest.pages?.length || 0} custom page(s), homepage, CMS and static assets.`);
