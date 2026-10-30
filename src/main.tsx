/// <reference types="vite/client" />
import './styles.css';
import {whatsappUrl} from './lib/enquiry.mjs';
// React authors the static pages at build time. Only these small interactions
// need browser JavaScript; content and native FAQ disclosures do not.
function wireInteractions(){
const menu=document.querySelector<HTMLDialogElement>('#mobile-navigation');
const trigger=document.querySelector<HTMLButtonElement>('[data-menu-open]');
function closeMenu(){menu?.close();trigger?.setAttribute('aria-expanded','false');document.body.classList.remove('menu-open');}
trigger?.addEventListener('click',()=>{menu?.showModal();trigger.setAttribute('aria-expanded','true');document.body.classList.add('menu-open');});
menu?.addEventListener('close',()=>{trigger?.setAttribute('aria-expanded','false');document.body.classList.remove('menu-open');});
menu?.querySelector('[data-menu-close]')?.addEventListener('click',closeMenu);
menu?.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
menu?.addEventListener('click',event=>{if(event.target===menu){const rect=menu.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom) closeMenu();}});
const form=document.querySelector<HTMLFormElement>('[data-enquiry-form]');
const status=form?.querySelector<HTMLElement>('[role=status]');
document.querySelectorAll<HTMLAnchorElement>('[data-enquiry-message]').forEach(link=>link.addEventListener('click',()=>{
 if(!form) return;
 const message=form.elements.namedItem('message') as HTMLTextAreaElement;
 const category=form.elements.namedItem('category') as HTMLSelectElement;
 message.value=link.dataset.enquiryMessage||'';
 category.value=link.dataset.enquiryCategory||'Buying a computer';
 if(status) status.textContent='';
 document.querySelector<HTMLInputElement>('#name')?.focus({preventScroll:true});
}));
form?.addEventListener('submit',event=>{
 event.preventDefault();
 const data=new FormData(form);
 try {
  const url=whatsappUrl({name:String(data.get('name')||''),business:String(data.get('business')||''),category:String(data.get('category')||'Buying a computer'),message:String(data.get('message')||'')});
  window.open(url,'_blank','noopener,noreferrer');
  if(status) status.textContent='Your message is ready in WhatsApp. Review it there and choose when to send.';
 } catch {if(status) status.textContent='Please enter your name and enquiry.';}
});

}
if(import.meta.env.DEV) import('./dev-render').then(module=>module.renderDevPage()).then(wireInteractions);
else wireInteractions();
