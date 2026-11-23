export const demoSteps=['Receive an enquiry','Understand the intent','Qualify the opportunity','Organize the context','Bring your team in'];
export const defaults={interest:'Website development',timing:'This month',readiness:'Ready to discuss a project',budget:'I need guidance on scope'};
export function sampleOpportunity(input={}){
 const values={...defaults,...input};
 const ready=values.readiness===defaults.readiness&&values.timing==='This month';
 return {...values,segment:ready?'Discovery ready':'Nurture & follow up',next:ready?'Arrange a discovery conversation':'Share relevant information and agree a follow-up',handoff:ready?'A discovery-ready enquiry is ready for a personal conversation.':'This customer is exploring. Keep the follow-up helpful and match their timeline.'};
}
