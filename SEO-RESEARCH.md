# Fanisi Digital — SEO and GEO implementation

Research date: 30 October 2026. Search results indicate visibility for the queries inspected; they do not establish traffic, conversion performance or a stable ranking. Competitor text, claims, reviews and business schema were not copied.

## Local competitor observations

| Reference | Observed pattern | Fanisi adaptation |
| --- | --- | --- |
| [Priscom laptops](https://priscom.co.ke/products/laptops) | Local product/category intent, exact specifications, buying FAQs and visible contact details | Nairobi wording, factual specifications, availability clarification, buying FAQs |
| [Nairobi Computer Shop laptops](https://nairobicomputershop.co.ke/catalogue/category/laptops/) | Category navigation, named models and visible prices | Preserve computer/category and buying-guide links; retain one featured model |
| [Fahavi Computers](https://fahavicomputers.co.ke/) | Location, intended uses and product categories are explicit | Clearly identify Nairobi, computers and buying advice without importing warranty/delivery claims |
| [USBIT web design](https://www.usbitsolutions.com/web-design/) | At-a-glance inclusions, service pricing, process and FAQs | Explain Fanisi’s own KSh 24,999 starting offer and confirmed one-year inclusions |
| [Kenya Web Studio](https://webdesignkenya.co.ke/web-design-nairobi) | Service-and-location focus, scope explanations and direct answers | Original website-development copy and separately quoted full-stack work |
| [Codestream packages](https://codestream.co.ke/packages/) | Separate packages and explicit included features | Distinguish the landing page offer from full-stack websites |

## Implemented

- Production homepage title, description, canonical URL, en-KE language, Open Graph/social cards and favicon.
- Complete prerendered page content and crawlable links; a small native interaction script preserves enquiry and menu behaviour without shipping React hydration.
- Organization, WebSite, WebPage, Service and FAQPage JSON-LD using only supplied Fanisi facts. No invented street address, reviews, ratings, opening hours or live product inventory.
- Original visible FAQs, sharing their text with JSON-LD to prevent drift.
- robots.txt allows crawling; sitemap.xml lists the homepage, /guides/ and /privacy/, all implemented by this project. All customer navigation is local; old-site anchors have been replaced.
- Optional llms.txt factual summary; it is not a known ranking requirement or a promise of AI citations.
- Development and production-preview servers send noindex headers. Production HTML is indexable when deployed on the canonical domain without those preview headers.

## Guidance and limits

[Google AI features guidance](https://developers.google.com/search/docs/appearance/ai-features) says the usual SEO foundations apply and no special AI markup or text file is required. [JavaScript SEO guidance](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics) supports making content accessible to crawlers. [Organization guidance](https://developers.google.com/search/docs/appearance/structured-data/organization) informs business identity markup. [OpenAI crawler documentation](https://developers.openai.com/api/docs/bots) distinguishes search crawling from other bots; the general allow rule does not impose a new training preference.

FAQPage markup describes visible questions; no FAQ search-result enhancement or AI citation is promised. No external rich-result validator, Search Console ownership or analytics account was accessed. Lighthouse performance lab results are documented in PERFORMANCE.md; they are not ranking evidence. This is an offline implementation check, not evidence of indexing or ranking.

## When deploying to the existing domain

Deploy the generated dist/ assets to https://fanisidigital.co.ke/. The owner requested local navigation instead of old-site links. If replacing an existing production site, configure host-level redirects from retired URLs to the relevant new guide sections or homepage sections. Unknown paths must return real 404 responses rather than a catch-all homepage. Preserve any existing sitemap entries for real pages; merge these implemented page entries rather than replacing an established full-site sitemap blindly. Confirm HTTPS, the canonical www/non-www redirects and absence of noindex on production. Replace/clear the local-reference laptop photo before publishing. Validate rendered markup with Google Rich Results Test and Schema Markup Validator, then submit the sitemap in the owner’s Search Console and maintain consistent business details in their verified Business Profile. No account submissions or production changes were performed here.

