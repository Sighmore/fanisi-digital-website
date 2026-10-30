import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createServer } from 'vite';
import React from 'react';
import { renderToString } from 'react-dom/server';
import {seoHead} from '../src/lib/seo.mjs';

// Deliver the same React page as HTML, then hydrate it in the browser.
// No browser renderer or extra deployment server is required.
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
  if (!html.includes('<div id="root"></div>')) throw new Error('Missing prerender root');
  for(const [route,module] of [['/','App'],['/guides/','GuidePage'],['/privacy/','PrivacyPage']]) {
    const {default:Page}=await server.ssrLoadModule(`/src/${module}.tsx`);
    const markup=renderToString(React.createElement(React.StrictMode,null,React.createElement(Page)));
    const target=new URL(`../dist${route}`,import.meta.url);
    await mkdir(target,{recursive:true});
    const document=html.replace(/<!--fanisi-seo-start-->[\s\S]*?<!--fanisi-seo-end-->/,()=>seoHead(true,route)).replace('<div id="root"></div>',()=>`<div id="root">${markup}</div>`);
    await writeFile(new URL('index.html',target),document);
    console.log(`Prerendered ${route}: content is present without JavaScript.`);
  }
  await writeFile(new URL('../dist/404.html',import.meta.url),'<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Page not found | Fanisi Digital</title><h1>Page not found</h1><p><a href="/">Return to Fanisi Digital</a></p></html>');
} finally {
  await server.close();
}
