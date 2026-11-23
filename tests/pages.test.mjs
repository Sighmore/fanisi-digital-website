import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync,statSync,existsSync} from 'node:fs';
import {pages} from '../src/lib/seo.mjs';
import {guideFaqs} from '../src/lib/guides.mjs';
const load=path=>readFileSync(new URL('../dist/'+path,import.meta.url),'utf8');
const file=path=>path==='/'?'index.html':path.slice(1)+'index.html';
const escape=s=>s.replace(/&/g,'&amp;').replace(/'/g,'&#x27;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
test('six complete static pages use the new business positioning',()=>{
 assert.equal(Object.keys(pages).length,6);
 for(const path of Object.keys(pages)){
  const html=load(file(path));assert.equal((html.match(/<h1[ >]/g)||[]).length,1,path);
  assert.match(html,/mobile-brand-title/);assert.match(html,/id="mobile-navigation"/);
  assert.doesNotMatch(html,/laptop|elitebook|computer buying|30,000|24,999|testimonial|aggregateRating|revenue growth/i,path);
  assert.doesNotMatch(html,/\u00e2\u20ac|\u00c2\u00b7/,'No text encoding corruption');
 }
 const home=load('index.html');
 for(const word of ['Attract more customers.','Convert more enquiries.','Keep them coming back.','WhatsApp Automation','CRM Solutions','Simon Kuria'])assert.ok(home.includes(word),word);
 assert.ok(home.indexOf('Book a growth consultation')<home.indexOf('class="hero-journey"'),'Mobile content order must put the value and primary action first');
 assert.doesNotMatch(home,/free (growth )?consultation/i);
});
test('internal navigation resolves to real pages and section IDs',()=>{
 for(const path of Object.keys(pages))for(const [,href] of load(file(path)).matchAll(/<a\b[^>]*href="([^"]*)"/g)){
  if(!href.startsWith('/')&&!href.startsWith('#'))continue;
  const [target,fragment]=href.split('#');const targetPath=target||path;
  assert.ok(pages[targetPath],`${path}: ${href}`);const html=load(file(targetPath));
  if(fragment)assert.ok(html.includes(`id="${fragment}"`),`${path}: ${href}`);
 }
});
test('inline styles, working local assets and small production JavaScript preserve delivery budgets',()=>{
 for(const path of Object.keys(pages)){
  const html=load(file(path));assert.match(html,/<style data-fanisi-styles>/);assert.doesNotMatch(html,/<link[^>]*rel="stylesheet"/);
  for(const [,src]of html.matchAll(/(?:src|href)="(\/(?:assets|fonts)\/[^"]+)"/g))assert.ok(existsSync(new URL('../dist'+src,import.meta.url)),src);
 }
 const js=readdirSync(new URL('../dist/assets/',import.meta.url)).filter(f=>f.endsWith('.js'));
 assert.ok(js.reduce((n,f)=>n+statSync(new URL('../dist/assets/'+f,import.meta.url)).size,0)<12000);
 assert.doesNotMatch(load('index.html'),/fonts\.googleapis|fonts\.gstatic/);
});
test('business guide includes all supplied answers before JavaScript runs',()=>{
 const html=load('guides/index.html').replace(/<script[^>]*>[\s\S]*?<\/script>/g,'');
 for(const {question,answer}of guideFaqs){assert.ok(html.includes(escape(question)),question);assert.ok(html.includes(escape(answer)),question);}
});
test('enquiries require name and message and distinguish preparation from booking',()=>{
 const html=load('index.html');assert.match(html,/<form[^>]*data-enquiry-form/);
 assert.match(html,/<input[^>]*id="name"[^>]*required/);assert.match(html,/<textarea[^>]*id="message"[^>]*required/);
 assert.doesNotMatch(html,/<input[^>]*id="business"[^>]*required/);
 assert.match(html,/does not book a time or store your details/);
 assert.match(html,/no messages are sent and no CRM is connected/);
});
