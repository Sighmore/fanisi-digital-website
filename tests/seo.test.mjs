import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const html = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');
test('production HTML contains useful content without executing JavaScript', () => {
  assert.match(html, /<h1[ >]/);
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1);
  for (const text of ['HP EliteBook 840 G5', '24,999', 'Simon Kuria', 'What does the landing page starter offer include?']) assert.ok(html.includes(text), text);
  assert.doesNotMatch(html, /<div id="root"><\/div>/);
});
test('production metadata uses the canonical public domain and matching social metadata', () => {
  assert.match(html, /<link[^>]*rel="canonical"[^>]*href="https:\/\/fanisidigital.co.ke\/"/);
  assert.match(html, /<title>Laptops &amp; Website Design in Nairobi \| Fanisi Digital<\/title>/);
  assert.match(html, /property="og:url"[^>]*content="https:\/\/fanisidigital.co.ke\/"/);
  assert.match(html, /name="twitter:card"[^>]*content="summary_large_image"/);
  assert.doesNotMatch(html, /noindex|localhost|127\.0\.0\.1/);
});
test('structured data identifies Fanisi and matches every visible FAQ', () => {
  const scripts = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  assert.equal(scripts.length, 1);
  const graph = JSON.parse(scripts[0][1])['@graph'];
  const business = graph.find(x => x['@type'] === 'Organization');
  assert.equal(business.name, 'Fanisi Digital');
  assert.equal(business.telephone, '+254114488930');
  assert.equal(business.email, 'fanisidigital@gmail.com');
  assert.equal(business.address.addressLocality, 'Nairobi');
  assert.ok(!business.aggregateRating && !business.openingHours && !business.address.streetAddress);
  const faq = graph.find(x => x['@type'] === 'FAQPage');
  assert.ok(faq.mainEntity.length >= 4);
  const visible = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '');
  for (const question of faq.mainEntity) {
    assert.ok(visible.includes(question.name));
    assert.ok(visible.includes(question.acceptedAnswer.text));
  }
  assert.ok(!graph.some(x => x['@type'] === 'Product'), 'Do not advertise the illustrative laptop as verified inventory');
});
test('crawl files only advertise the implemented canonical pages', () => {
  const sitemap = readFileSync(new URL('../dist/sitemap.xml', import.meta.url), 'utf8');
  assert.match(sitemap, /<loc>https:\/\/fanisidigital.co.ke\/<\/loc>/);
  assert.equal((sitemap.match(/<loc>/g)||[]).length, 3);
  assert.ok(sitemap.includes('<loc>https://fanisidigital.co.ke/guides/</loc>'));
  assert.ok(sitemap.includes('<loc>https://fanisidigital.co.ke/privacy/</loc>'));
  assert.ok(!sitemap.includes('<lastmod>'), 'No invented update dates');
  const robots = readFileSync(new URL('../dist/robots.txt', import.meta.url), 'utf8');
  assert.match(robots, /Allow: \//);
  assert.match(robots, /Sitemap: https:\/\/fanisidigital.co.ke\/sitemap.xml/);
  assert.ok(existsSync(new URL('../dist/assets/fanisi-digital-logo.png', import.meta.url)));
});
