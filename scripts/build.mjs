import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const out=path.join(root,'dist');
fs.rmSync(out,{recursive:true,force:true});fs.mkdirSync(out,{recursive:true});
const skip=new Set(['.git','.github','dist','node_modules','scripts','README.md']);
function copyTree(src,dst){for(const entry of fs.readdirSync(src,{withFileTypes:true})){if(skip.has(entry.name))continue;const from=path.join(src,entry.name),to=path.join(dst,entry.name);if(entry.isDirectory()){fs.mkdirSync(to,{recursive:true});copyTree(from,to)}else if(!['.DS_Store'].includes(entry.name)){fs.mkdirSync(path.dirname(to),{recursive:true});fs.copyFileSync(from,to)}}}
copyTree(root,out);
const homePath=path.join(root,'content','home.json');
const legacyPath=path.join(root,'content','site.json');
const home=JSON.parse(fs.readFileSync(fs.existsSync(homePath)?homePath:legacyPath,'utf8'));
const manifestPath=path.join(root,'content','pages','index.json');
const manifest=fs.existsSync(manifestPath)?JSON.parse(fs.readFileSync(manifestPath,'utf8')):{pages:[]};
const template=fs.readFileSync(path.join(root,'index.html'),'utf8');
const safeSlug=s=>/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s);
for(const page of (manifest.pages||[])){
  if(!page.slug||!safeSlug(page.slug))throw new Error(`Invalid page slug: ${page.slug}`);
  const dataPath=path.join(root,'content','pages',`${page.slug}.json`);
  if(!fs.existsSync(dataPath))throw new Error(`Page manifest references missing content/pages/${page.slug}.json`);
  const target=path.join(out,page.slug,'index.html');fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,template);
}
// Keep a deployable 404 document that uses the same global shell and theme.
fs.writeFileSync(path.join(out,'404.html'),template);
console.log(`Built static site: ${manifest.pages?.length||0} custom page(s), homepage and CMS.`);
