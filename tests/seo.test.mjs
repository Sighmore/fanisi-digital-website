import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {pages,pageGraph} from '../src/lib/seo.mjs';
const load=path=>readFileSync(new URL('../dist/'+(path==='/'?'index.html':path.slice(1)+'index.html'),import.meta.url),'utf8');
const escape=s=>s.replace(/&/g,'&amp;').replace(/'/g,'&#x27;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
test('metadata identifies each service and retains the canonical domain',()=>{
 const titles=new Set();for(const [path,page]of Object.entries(pages)){
  const html=load(path);assert.ok(html.includes(`<title>${page.title.replace(/&/g,'&amp;')}</title>`));titles.add(page.title);
  assert.ok(html.includes(`rel="canonical" href="https://fanisidigital.co.ke${path}"`));
  assert.doesNotMatch(html,/localhost|127\.0\.0\.1/);
 }
 assert.equal(titles.size,6);
});
test('structured data claims match actual services and visible FAQs',()=>{
 for(const path of Object.keys(pages)){
  const html=load(path);const graph=JSON.parse(html.match(/type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/)[1])['@graph'];
  const org=graph.find(n=>n['@type']==='Organization');assert.equal(org.telephone,'+254114488930');assert.equal(org.founder.name,'Simon Kuria');
  assert.ok(!org.aggregateRating&&!org.openingHours&&!org.address.streetAddress);
  assert.equal(graph.filter(n=>n['@type']==='Service').length,3);assert.ok(!graph.some(n=>n['@type']==='Product'));
  const body=html.replace(/<script[^>]*>[\s\S]*?<\/script>/g,'');
  for(const item of graph.find(n=>n['@type']==='FAQPage')?.mainEntity||[]){assert.ok(body.includes(escape(item.name)),item.name);assert.ok(body.includes(escape(item.acceptedAnswer.text)),item.name);}
 }
});
test('sitemap advertises exactly the implemented pages',()=>{
 const sitemap=readFileSync(new URL('../dist/sitemap.xml',import.meta.url),'utf8');assert.equal((sitemap.match(/<loc>/g)||[]).length,6);
 for(const path of Object.keys(pages))assert.ok(sitemap.includes(`<loc>https://fanisidigital.co.ke${path}</loc>`));
 const llms=readFileSync(new URL('../dist/llms.txt',import.meta.url),'utf8');assert.doesNotMatch(llms,/laptop|elitebook|computer buying/i);
});
