import {guideFaqs} from './guides.mjs';
import {services} from './services.mjs';
export const site={url:'https://fanisidigital.co.ke/',name:'Fanisi Digital',title:'Websites, WhatsApp Automation & CRM in Kenya | Fanisi Digital',description:'Connected digital solutions for Kenyan businesses: strategic websites, WhatsApp lead qualification and custom CRM systems. Attract, engage, convert and retain customers.',telephone:'+254114488930',email:'fanisidigital@gmail.com'};
export const pages={
 '/':{title:site.title,description:site.description,label:'Home'},
 '/guides/':{title:'Business Websites, WhatsApp & CRM Questions | Fanisi Digital',description:'Practical answers about choosing a business website, WhatsApp automation, lead qualification and CRM solutions in Kenya.',label:'Business guide'},
 '/privacy/':{title:'Privacy & Your Information | Fanisi Digital',description:'Understand the Fanisi Digital enquiry form, sample demonstration and information handling before contacting us.',label:'Privacy'},
 ...Object.fromEntries(services.map(s=>[`/solutions/${s.slug}/`,{title:`${s.name} in Kenya | Fanisi Digital`,description:s.intro,label:s.name}]))
};
export function pageGraph(path='/'){
 const page=pages[path]||pages['/'];const url=new URL(path,site.url).href;const org=site.url+'#organization';const service=services.find(s=>path===`/solutions/${s.slug}/`);
 const graph=[
 {'@type':'Organization','@id':org,name:site.name,url:site.url,description:site.description,slogan:'Digital solutions better Business.',logo:{'@type':'ImageObject',url:site.url+'assets/optimized/logo-full.webp',width:480,height:160},telephone:site.telephone,email:site.email,founder:{'@type':'Person',name:'Simon Kuria'},address:{'@type':'PostalAddress',addressLocality:'Nairobi',addressCountry:'KE'},areaServed:{'@type':'Country',name:'Kenya'},contactPoint:{'@type':'ContactPoint',contactType:'business enquiries',telephone:site.telephone,email:site.email}},
 {'@type':'WebSite','@id':site.url+'#website',url:site.url,name:site.name,publisher:{'@id':org},inLanguage:'en-KE'},
 {'@type':'WebPage','@id':url+'#webpage',url,name:page.title,description:page.description,isPartOf:{'@id':site.url+'#website'},about:{'@id':org},inLanguage:'en-KE'},
 ...services.map(s=>({'@type':'Service','@id':`${site.url}solutions/${s.slug}/#service`,name:s.category,serviceType:s.name,description:s.intro,url:`${site.url}solutions/${s.slug}/`,provider:{'@id':org},areaServed:{'@type':'Country',name:'Kenya'}}))
 ];
 const faqs=path==='/guides/'?guideFaqs:service?.faq||[];
 if(faqs.length)graph.push({'@type':'FAQPage','@id':url+'#questions',mainEntity:faqs.map(({question,answer})=>({'@type':'Question',name:question,acceptedAnswer:{'@type':'Answer',text:answer}}))});
 if(path!=='/')graph.push({'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:site.url},{'@type':'ListItem',position:2,name:page.label,item:url}]});
 return {'@context':'https://schema.org','@graph':graph};
}
export function seoTags(production=true,path='/'){
 path=path.split('?')[0].replace(/index\.html$/,'');if(!path.endsWith('/'))path+='/';const page=pages[path]||pages['/'];const url=new URL(path,site.url).href;
 const meta=(name,content)=>({tag:'meta',attrs:{name,content}});const og=(property,content)=>({tag:'meta',attrs:{property,content}});
 return [{tag:'title',children:page.title.replace(/&/g,'&amp;').replace(/</g,'&lt;')},meta('description',page.description),meta('robots',production?'index, follow, max-image-preview:large':'noindex, nofollow'),{tag:'link',attrs:{rel:'canonical',href:url}},og('og:type','website'),og('og:site_name',site.name),og('og:locale','en_KE'),og('og:title',page.title),og('og:description',page.description),og('og:url',url),og('og:image',site.url+'assets/optimized/logo-full.webp'),og('og:image:alt','Fanisi Digital — Digital solutions better Business.'),meta('twitter:card','summary_large_image'),meta('twitter:title',page.title),meta('twitter:description',page.description),meta('twitter:image',site.url+'assets/optimized/logo-full.webp'),{tag:'link',attrs:{rel:'icon',type:'image/svg+xml',href:'/favicon.svg'}},{tag:'script',attrs:{type:'application/ld+json'},children:JSON.stringify(pageGraph(path)).replace(/</g,'\\u003c')}];
}
export function seoHead(production=true,path='/'){
 const escape=value=>String(value).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');
 return seoTags(production,path).map(({tag,attrs={},children=''})=>`<${tag}${Object.entries(attrs).map(([name,value])=>` ${name}="${escape(value)}"`).join('')}>${children}${['meta','link'].includes(tag)?'':`</${tag}>`}`).join('\n');
}
