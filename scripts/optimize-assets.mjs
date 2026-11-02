import sharp from 'sharp';
import {mkdir,copyFile,stat} from 'node:fs/promises';
await mkdir('public/assets/optimized',{recursive:true});
await mkdir('public/fonts',{recursive:true});
const jobs=[
 ['workspace-hero.png','workspace-hero.webp',960,76],
 ['workspace-hero.png','workspace-small.webp',540,76],
 ['elitebook-840-g5.png','elitebook.webp',600,82],
 ['elitebook-840-g5.png','elitebook-small.webp',360,80],
 ['fanisi-digital-logo.png','logo-full.webp',480,82],
 ['fanisi-digital-logo.png','logo-small.webp',240,82],
];
for (const [input,output,width,quality] of jobs) {
 await sharp(`public/assets/${input}`).resize({width,withoutEnlargement:true}).webp({quality}).toFile(`public/assets/optimized/${output}`);
}
// AVIF photo variants keep bandwidth low without changing the depicted content.
for (const width of [400,600,800]) {
 await sharp('public/assets/workspace-hero.png').resize({width,withoutEnlargement:true}).avif({quality:48,effort:5}).toFile(`public/assets/optimized/workspace-${width}.avif`);
}
for (const width of [360,600]) {
 await sharp('public/assets/elitebook-840-g5.png').resize({width,withoutEnlargement:true}).avif({quality:55,effort:5}).toFile(`public/assets/optimized/elitebook-${width}.avif`);
}
// Deterministic crop of the user-supplied FD mark; preserve the original asset.
await sharp('public/assets/fanisi-digital-logo.png').extract({left:78,top:132,width:352,height:262}).resize({width:130}).webp({quality:92}).toFile('public/assets/optimized/fd-mark.webp');
for(const font of ['inter','montserrat']) {
 await copyFile(`node_modules/@fontsource-variable/${font}/files/${font}-latin-wght-normal.woff2`,`public/fonts/${font}-latin.woff2`);
 await copyFile(`node_modules/@fontsource-variable/${font}/LICENSE`,`public/fonts/${font}-LICENSE.txt`);
}
for(const [,output] of jobs) console.log(`${output}: ${(await stat(`public/assets/optimized/${output}`)).size} bytes`);
