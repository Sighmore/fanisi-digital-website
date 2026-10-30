import {guideFaqs} from './guides.mjs';
export const site = {
  url: 'https://fanisidigital.co.ke/',
  name: 'Fanisi Digital',
  title: 'Laptops & Website Design in Nairobi | Fanisi Digital',
  description: 'Find laptops and computer buying advice in Nairobi. Fanisi Digital builds landing pages from KSh 24,999, with one year of domain and hosting included.',
  telephone: '+254114488930',
  email: 'fanisidigital@gmail.com',
};

// One source of truth for visible answers and their structured representation.
export const faqs = [
  {
    question: 'What does Fanisi Digital do in Nairobi?',
    answer: 'Fanisi Digital provides laptops, computer buying advice and website development in Nairobi, Kenya. Simon Kuria is your contact for computer and website enquiries.',
  },
  {
    question: 'Can I get advice before choosing a laptop?',
    answer: 'Yes. Tell Fanisi about your budget, the work you do and the software you use. Discuss the processor generation, memory, storage and listed features before choosing a laptop.',
  },
  {
    question: 'Is the featured HP EliteBook available at KSh 30,000?',
    answer: 'The HP EliteBook 840 G5 shown at KSh 30,000 is an illustrative selection with an Intel Core i5 8th Gen processor, 8GB RAM and 256GB SSD. Ask Fanisi to confirm availability, price and the exact unit’s condition before buying.',
  },
  {
    question: 'What does the landing page starter offer include?',
    answer: 'The landing page starter offer starts at KSh 24,999 and includes a landing page plus one year of domain registration and hosting. Discuss your business and the required content with Fanisi to confirm the scope.',
  },
  {
    question: 'Can Fanisi build a website with a product catalogue or payments?',
    answer: 'Fanisi builds full-stack websites with product catalogues, service management and payment integrations. Full-stack websites are quoted separately from the landing page starter offer.',
  },
  {
    question: 'How do I contact Fanisi Digital?',
    answer: 'Call or WhatsApp Simon Kuria on +254 114 488 930, or email fanisidigital@gmail.com. The enquiry form prepares a WhatsApp message for you to review and send; it does not store your details.',
  },
];

const id = fragment => `${site.url}#${fragment}`;
export const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization', '@id': id('organization'),
      name: site.name, url: site.url,
      description: 'Computers, computer buying advice and website development in Nairobi, Kenya.',
      slogan: 'Digital solutions better Business.',
      logo: { '@type': 'ImageObject', url: `${site.url}assets/fanisi-digital-logo.png`, width: 1600, height: 533 },
      telephone: site.telephone, email: site.email,
      founder: { '@type': 'Person', name: 'Simon Kuria' },
      address: { '@type': 'PostalAddress', addressLocality: 'Nairobi', addressCountry: 'KE' },
      areaServed: { '@type': 'City', name: 'Nairobi' },
      contactPoint: { '@type': 'ContactPoint', telephone: site.telephone, email: site.email, contactType: 'customer enquiries' },
    },
    { '@type': 'WebSite', '@id': id('website'), url: site.url, name: site.name, publisher: { '@id': id('organization') }, inLanguage: 'en-KE' },
    { '@type': 'WebPage', '@id': id('webpage'), url: site.url, name: site.title, description: site.description, isPartOf: { '@id': id('website') }, about: { '@id': id('organization') }, inLanguage: 'en-KE' },
    { '@type': 'Service', '@id': id('computer-advice'), name: 'Computer buying advice in Nairobi', serviceType: 'Computer buying advice', provider: { '@id': id('organization') }, areaServed: 'Nairobi, Kenya', url: `${site.url}computer-buying-advice/` },
    { '@type': 'Service', '@id': id('website-development'), name: 'Website design and development in Nairobi', serviceType: 'Landing page and full-stack website development', description: 'Landing pages from KSh 24,999 with one year of domain and hosting included. Full-stack websites quoted separately.', provider: { '@id': id('organization') }, areaServed: 'Nairobi, Kenya', url: `${site.url}website-development-nairobi/` },
    { '@type': 'FAQPage', '@id': id('questions'), isPartOf: { '@id': id('webpage') }, mainEntity: faqs.map(({question,answer})=>({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) },
  ],
};

export const pages = {
  '/': {title:site.title,description:site.description},
  '/guides/': {title:'Laptop Buying & Business Website Guide | Fanisi Digital',description:'Answers to laptop buying and business website questions in Kenya: specifications, used-device checks, pricing, scope, renewals, SEO and enquiries.'},
  '/privacy/': {title:'Privacy & Enquiry Information | Fanisi Digital',description:'How Fanisi Digital’s enquiry form prepares a WhatsApp message, what information to share and how to contact Simon Kuria about your details.'},
};
export function pageGraph(path = '/') {
  const metadata=pages[path] || pages['/'];
  const url=new URL(path,site.url).href;
  const graph=structuredData['@graph'].filter(node=>!['WebPage','FAQPage'].includes(node['@type'])).map(node=>node['@type']==='Service'?{...node,url:node.serviceType==='Computer buying advice'?`${site.url}guides/#laptop-basics`:`${site.url}#websites`}:node);
  graph.push({'@type':'WebPage','@id':`${url}#webpage`,url,name:metadata.title,description:metadata.description,isPartOf:{'@id':id('website')},about:{'@id':id('organization')},inLanguage:'en-KE'});
  if(path!=='/privacy/') graph.push({'@type':'FAQPage','@id':`${url}#questions`,isPartOf:{'@id':`${url}#webpage`},mainEntity:(path==='/guides/'?guideFaqs:faqs).map(({question,answer})=>({'@type':'Question',name:question,acceptedAnswer:{'@type':'Answer',text:answer}}))});
  if(path!=='/') graph.push({'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:site.url},{'@type':'ListItem',position:2,name:path==='/guides/'?'Customer guide':'Privacy',item:url}]});
  return {'@context':'https://schema.org','@graph':graph};
}
export function seoTags(production = true,path = '/') {
  path=path.split('?')[0].replace(/index\.html$/,'');
  if(!path.endsWith('/')) path+='/';
  const metadata=pages[path] || pages['/'];
  const url=new URL(path,site.url).href;
  const meta = (name, content) => ({ tag: 'meta', attrs: {name,content} });
  const og = (property, content) => ({ tag: 'meta', attrs: {property,content} });
  return [
    { tag: 'title', children: metadata.title.replace(/&/g, '&amp;').replace(/</g, '&lt;') },
    meta('description', metadata.description),
    meta('robots', production ? 'index, follow, max-image-preview:large' : 'noindex, nofollow'),
    { tag: 'link', attrs: {rel:'canonical',href:url} },
    og('og:type', 'website'), og('og:site_name', site.name), og('og:locale', 'en_KE'),
    og('og:title', metadata.title), og('og:description',metadata.description), og('og:url',url),
    og('og:image', `${site.url}assets/workspace-hero.png`),
    og('og:image:alt', 'An illustrative workspace for Fanisi Digital, computers and websites in Nairobi'),
    meta('twitter:card', 'summary_large_image'), meta('twitter:title', metadata.title), meta('twitter:description', metadata.description),
    meta('twitter:image', `${site.url}assets/workspace-hero.png`),
    { tag:'link',attrs:{rel:'icon',type:'image/svg+xml',href:'/favicon.svg'} },
    { tag:'script',attrs:{type:'application/ld+json'},children:JSON.stringify(pageGraph(path)).replace(/</g,'\u003c') },
  ];
}
export function seoHead(production=true,path='/') {
 const escape=value=>String(value).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');
 return seoTags(production,path).map(({tag,attrs={},children=''})=>`<${tag}${Object.entries(attrs).map(([name,value])=>` ${name}="${escape(value)}"`).join('')}>${children}${['meta','link'].includes(tag)?'':`</${tag}>`}`).join('\n');
}
