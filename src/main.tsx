/// <reference types="vite/client" />
import './styles.css';
import './visual-refinement.css';
import './remarc-direction.css';
import {whatsappUrl} from './lib/enquiry.mjs';
import {demoSteps,defaults,sampleOpportunity} from './lib/demo.mjs';
import {measure} from './lib/measurement';
function wireInteractions(){
 // One-time marketing entrances; forms and demonstration controls stay still.
 const motionPreference=window.matchMedia('(prefers-reduced-motion: reduce)');
 if(!motionPreference.matches && 'IntersectionObserver' in window){
  const elements=document.querySelectorAll<HTMLElement>('.section-heading,.transformation,.journey-rail li,.principles article,.about-grid,.engagement,.problem-grid>div');
  const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}}},{threshold:0.08,rootMargin:'0px 0px -24px 0px'});
  elements.forEach(el=>{if(el.getBoundingClientRect().top>window.innerHeight){el.classList.add('scroll-reveal');observer.observe(el);}});
  const showAll=()=>{if(motionPreference.matches){elements.forEach(el=>el.classList.add('is-visible'));observer.disconnect();}};
  motionPreference.addEventListener('change',showAll);
  document.addEventListener('focusin',event=>{const el=(event.target as HTMLElement).closest('.scroll-reveal');el?.classList.add('is-visible');});
 }

 const menu=document.querySelector<HTMLDialogElement>('#mobile-navigation');
 const trigger=document.querySelector<HTMLButtonElement>('[data-menu-open]');
 const closeMenu=()=>menu?.close();
 trigger?.addEventListener('click',()=>{menu?.showModal();trigger.setAttribute('aria-expanded','true');document.body.classList.add('menu-open');});
 menu?.addEventListener('close',()=>{trigger?.setAttribute('aria-expanded','false');document.body.classList.remove('menu-open');});
 menu?.querySelector('[data-menu-close]')?.addEventListener('click',closeMenu);
 menu?.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
 menu?.addEventListener('click',event=>{if(event.target===menu){const r=menu.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closeMenu();}});
 const nav=document.querySelector<HTMLDetailsElement>('.solutions-nav');
 document.addEventListener('click',event=>{if(nav?.open&&!nav.contains(event.target as Node))nav.open=false;});
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&nav?.open){nav.open=false;nav.querySelector('summary')?.focus();}});
 document.querySelectorAll<HTMLElement>('[data-track]').forEach(el=>el.addEventListener('click',()=>measure(el.dataset.track||'cta_click',el.dataset.placement||'page')));
 const form=document.querySelector<HTMLFormElement>('[data-enquiry-form]');
 const status=form?.querySelector<HTMLElement>('[role=status]');
 form?.addEventListener('submit',event=>{
  event.preventDefault();const data=new FormData(form);
  try{
   const url=whatsappUrl({name:String(data.get('name')||''),business:String(data.get('business')||''),category:String(data.get('category')||'Finding the right starting point'),message:String(data.get('message')||'')});
   window.open(url,'_blank','noopener,noreferrer');
   measure('consultation_enquiry_prepared','consultation-form');
   if(status)status.textContent='Your enquiry is prepared in WhatsApp. Review it and choose whether to send. A consultation time is agreed separately.';
  }catch{if(status)status.textContent='Please enter your name and a message with more than spaces.';}
 });
 const demo=document.querySelector<HTMLElement>('[data-demo]');
 if(demo){
  let stage=0;
  const controls=demo.querySelector<HTMLElement>('[data-demo-controls]');if(controls)controls.hidden=false;
  const value=(field:string)=>demo.querySelector<HTMLSelectElement>(`[data-demo-${field}]`)?.value||'';
  const sync=()=>{
   const result=sampleOpportunity({interest:value('interest'),timing:value('timing'),readiness:value('readiness'),budget:value('budget')});
   demo.querySelectorAll<HTMLElement>('[data-demo-output]').forEach(el=>{el.textContent=String(result[el.dataset.demoOutput as keyof typeof result]||'');});
   const segment=demo.querySelector<HTMLElement>('[data-demo-segment]');if(segment)segment.textContent=result.segment;
   const task=demo.querySelector<HTMLElement>('[data-demo-task]');if(task)task.textContent=result.next;
   const handoff=demo.querySelector<HTMLElement>('[data-demo-handoff]');if(handoff)handoff.textContent=result.handoff;
  };
  const setStage=(next:number)=>{
   stage=Math.max(0,Math.min(4,next));sync();
   demo.querySelectorAll<HTMLElement>('[data-demo-panel]').forEach(el=>el.hidden=Number(el.dataset.demoPanel)!==stage);
   document.querySelectorAll<HTMLElement>('[data-demo-step]').forEach(el=>el.setAttribute('aria-pressed',String(Number(el.dataset.demoStep)===stage)));
   const title=demo.querySelector<HTMLElement>('[data-demo-title]');if(title)title.textContent=demoSteps[stage];
   const status=demo.querySelector<HTMLElement>('[data-demo-status]');if(status)status.textContent=`Stage ${stage+1} of 5 · ${demoSteps[stage]}`;
   const nextButton=demo.querySelector<HTMLButtonElement>('[data-demo-next]');if(nextButton)nextButton.textContent=stage===4?'Start again':'Continue the journey';
   measure('demo_step',`stage-${stage+1}`);
  };
  const reset=()=>{for(const [field,initial]of Object.entries(defaults)){const el=demo.querySelector<HTMLSelectElement>(`[data-demo-${field}]`);if(el)el.value=initial;}setStage(0);};
  document.querySelectorAll<HTMLElement>('[data-demo-step]').forEach(el=>el.addEventListener('click',()=>setStage(Number(el.dataset.demoStep))));
  demo.querySelector('[data-demo-next]')?.addEventListener('click',()=>stage===4?reset():setStage(stage+1));
  demo.querySelector('[data-demo-reset]')?.addEventListener('click',reset);
  demo.querySelectorAll('select').forEach(el=>el.addEventListener('change',()=>{sync();measure('demo_choice','journey-demo');}));
 }
}
if(import.meta.env.DEV)import('./dev-render').then(module=>module.renderDevPage()).then(wireInteractions);else wireInteractions();
