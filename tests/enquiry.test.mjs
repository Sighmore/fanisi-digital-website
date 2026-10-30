import test from 'node:test';
import assert from 'node:assert/strict';
import { whatsappUrl } from '../src/lib/enquiry.mjs';
test('requires meaningful name and message', () => {
  assert.throws(() => whatsappUrl({name:' ',category:'Buying a computer',message:'Hello'}));
  assert.throws(() => whatsappUrl({name:'Amina',category:'Buying a computer',message:' '}));
});
test('encodes names, newlines, unicode and punctuation without changing recipient', () => {
  const url = new URL(whatsappUrl({name:' Amina & Co ',business:'Biashara + Design',category:'Buying a computer',message:'HP EliteBook 840 G5 — KSh 30,000? #Nairobi'}));
  assert.equal(url.pathname,'/254114488930');
  assert.equal(url.searchParams.get('text'),'Hello Fanisi, my name is Amina & Co.\n\nBusiness: Biashara + Design\n\nEnquiry: Buying a computer\n\nHP EliteBook 840 G5 — KSh 30,000? #Nairobi');
});
test('omits optional business cleanly', () => {
  const text = new URL(whatsappUrl({name:'Simon',category:'Website and online presence',message:'A landing page'})).searchParams.get('text');
  assert.ok(!text.includes('Business:'));
});
