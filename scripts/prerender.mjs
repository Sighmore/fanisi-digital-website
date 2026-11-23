import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createServer } from 'vite';
import React from 'react';
import { renderToString } from 'react-dom/server';
import {seoHead,pages} from '../src/lib/seo.mjs';

// Render complete HTML at build time; only the small native enhancement script runs in the browser.
// No browser renderer or extra deployment server is required.
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  let html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
  // The complete CSS is only ~9 KB compressed. Inline it to avoid a blocking
  // HTML -> stylesheet round trip and render fully styled even without JS.
  const stylesheets = [...html.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*>/g)];
  for (const [tag] of stylesheets) {
    const href = tag.match(/href="([^"]+)"/)[1];
    if (!href.startsWith('/assets/')) throw new Error('Unexpected stylesheet path');
    const css = await readFile(new URL(`../dist${href}`, import.meta.url), 'utf8');
    html = html.replace(tag, () => `<style data-fanisi-styles>${css.replace(/<\/style/gi, '<\\/style')}</style>`);
  }
  if (!html.includes('<div id="root"></div>')) throw new Error('Missing prerender root');
  for(const route of Object.keys(pages)) {
    const module=route==='/guides/'?'GuidePage':route==='/privacy/'?'PrivacyPage':route.startsWith('/solutions/')?'ServicePage':'App';
    const {default:Page}=await server.ssrLoadModule(`/src/${module}.tsx`);
    const markup=renderToString(React.createElement(React.StrictMode,null,React.createElement(Page,route.startsWith('/solutions/')?{slug:route.split('/')[2]}:{})));
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
