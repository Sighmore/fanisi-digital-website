import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync,statSync} from 'node:fs';
import {guideFaqs} from '../src/lib/guides.mjs';
const load = path => readFileSync(new URL(`../dist/${path}`,import.meta.url),'utf8');
test('all pages have local navigation and a centred mobile brand label',()=>{
  for (const path of ['index.html','guides/index.html','privacy/index.html']) {
    const html=load(path);
    const links=[...html.matchAll(/<a\b[^>]*href="([^"]*)"/g)].map(m=>m[1]);
    assert.ok(!links.some(href=>/^https?:\/\/(www\.)?fanisidigital\.co\.ke/i.test(href)),path);
    assert.ok(html.includes('mobile-brand-title'),path);
    assert.match(html,/<a[^>]*href="\/guides\/"/);
    assert.equal((html.match(/<h1[ >]/g)||[]).length,1);
  }
});
test('guide content is rendered with its own metadata and matching FAQ data',()=>{
  const html=load('guides/index.html');
  assert.match(html,/<link[^>]*rel="canonical"[^>]*href="https:\/\/fanisidigital.co.ke\/guides\/"/);
  assert.ok(guideFaqs.length>=25);
  for (const {question,answer} of guideFaqs) {
    const escape=s=>s.replace(/&/g,'&amp;').replace(/'/g,'&#x27;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    const body=html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,'');
    assert.ok(body.includes(escape(question)),question);
    assert.ok(body.includes(escape(answer)),question);
  }
  const data=JSON.parse(html.match(/type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/)[1]);
  assert.equal(data['@graph'].find(n=>n['@type']==='FAQPage').mainEntity.length,guideFaqs.length);
});
test('internal page paths in anchor links resolve to generated pages',()=>{
  for (const file of ['index.html','guides/index.html','privacy/index.html']) {
    for(const [,href] of load(file).matchAll(/<a\b[^>]*href="([^"]*)"/g)) {
      if(!href.startsWith('/')||href.startsWith('//')) continue;
      const [path,fragment]=href.split('#');
      const target=load(path==='/'?'index.html':`${path.slice(1).replace(/\/$/,'')}/index.html`);
      if(fragment) assert.ok(target.includes(`id="${fragment}"`),`${file}: ${href}`);
    }
  }
});
test('the native enquiry form remains wired and production JavaScript stays small',()=>{
 const home=load('index.html');
 assert.match(home,/<form[^>]*data-enquiry-form/);
 assert.match(home,/<select[^>]*name="category"/);
 assert.match(home,/data-enquiry-message="/);
 const files=readdirSync(new URL('../dist/assets/',import.meta.url)).filter(file=>file.endsWith('.js'));
 const total=files.reduce((sum,file)=>sum+statSync(new URL(`../dist/assets/${file}`,import.meta.url)).size,0);
 assert.ok(total<10000,`Production browser JavaScript grew to ${total} bytes`);
 assert.doesNotMatch(home,/fonts\.googleapis|fonts\.gstatic/);
});
