import sharp from 'sharp';
import {mkdir,copyFile,stat,writeFile} from 'node:fs/promises';
import {pages,site} from '../src/lib/seo.mjs';
await mkdir('public/assets/optimized',{recursive:true});
await mkdir('public/fonts',{recursive:true});
const input='public/assets/fanisi-digital-logo.png';
for(const [file,width] of [['logo-full.webp',480],['logo-small.webp',240]])await sharp(input).resize({width}).webp({quality:85}).toFile(`public/assets/optimized/${file}`);
await sharp(input).extract({left:78,top:132,width:352,height:262}).resize({width:130}).webp({quality:92}).toFile('public/assets/optimized/fd-mark.webp');
for(const font of ['inter','montserrat']){
 await copyFile(`node_modules/@fontsource-variable/${font}/files/${font}-latin-wght-normal.woff2`,`public/fonts/${font}-latin.woff2`);
 await copyFile(`node_modules/@fontsource-variable/${font}/LICENSE`,`public/fonts/${font}-LICENSE.txt`);
}
await writeFile('public/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${Object.keys(pages).map(path=>`<url><loc>${new URL(path,site.url).href}</loc></url>`).join('')}</urlset>`);
for(const file of ['fd-mark.webp','logo-full.webp'])console.log(`${file}: ${(await stat('public/assets/optimized/'+file)).size} bytes`);

// Project-bound Imagegen editorial photo; preserve the full original separately.
for(const width of [640,960]){
 await sharp('source-assets/business-planning-v1.png').resize({width}).avif({quality:46,effort:5}).toFile(`public/assets/optimized/business-planning-${width}.avif`);
 await sharp('source-assets/business-planning-v1.png').resize({width}).webp({quality:76}).toFile(`public/assets/optimized/business-planning-${width}.webp`);
}

// Real client website screenshot captured for the approved portfolio entry.
for(const width of [640,960]){
 await sharp('source-assets/coach-lincolyn-website.jpg').resize({width}).avif({quality:58,effort:5}).toFile(`public/assets/optimized/coach-lincolyn-${width}.avif`);
 await sharp('source-assets/coach-lincolyn-website.jpg').resize({width}).webp({quality:82}).toFile(`public/assets/optimized/coach-lincolyn-${width}.webp`);
}
