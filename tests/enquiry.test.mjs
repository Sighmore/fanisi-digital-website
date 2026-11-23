import test from 'node:test';
import assert from 'node:assert/strict';
import {whatsappUrl} from '../src/lib/enquiry.mjs';
test('requires meaningful name and message',()=>{
 assert.throws(()=>whatsappUrl({name:' ',category:'CRM Solutions',message:'Hello'}));
 assert.throws(()=>whatsappUrl({name:'Amina',category:'CRM Solutions',message:' '}));
});
test('encodes punctuation, Unicode and newlines without changing recipient',()=>{
 const message='A CRM for my team? & customer follow-ups #Nairobi\nDetails + a quote';
 const url=new URL(whatsappUrl({name:' Amina & Co ',business:'Biashara + Design',category:'CRM Solutions',message}));
 assert.equal(url.pathname,'/254114488930');assert.equal(url.searchParams.get('text'),`Hello Fanisi, my name is Amina & Co.\n\nBusiness: Biashara + Design\n\nEnquiry: CRM Solutions\n\n${message}`);
});
test('omits optional business cleanly',()=>{
 const text=new URL(whatsappUrl({name:'Simon',category:'Website Development',message:'A clearer website'})).searchParams.get('text');assert.ok(!text.includes('Business:'));
});
