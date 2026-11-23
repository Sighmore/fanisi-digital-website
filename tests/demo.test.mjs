import test from 'node:test';
import assert from 'node:assert/strict';
import {sampleOpportunity} from '../src/lib/demo.mjs';
test('ready enquiries have a discovery action, while exploratory enquiries get a suitable follow-up',()=>{
 assert.equal(sampleOpportunity().segment,'Discovery ready');
 const exploring=sampleOpportunity({readiness:'Exploring my options'});assert.equal(exploring.segment,'Nurture & follow up');assert.match(exploring.next,/Share relevant information/);
 const later=sampleOpportunity({timing:'Next quarter'});assert.equal(later.segment,'Nurture & follow up');
});
test('customer choices carry into the sample handoff without becoming real records',()=>{
 const input={interest:'CRM & customer follow-up',budget:'I have an agreed budget'};const result=sampleOpportunity(input);
 assert.equal(result.interest,input.interest);assert.equal(result.budget,input.budget);assert.equal(input.timing,undefined);
});
