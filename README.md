# Fanisi Digital

React + TypeScript + Vite, Tailwind CSS 4, and shadcn-style components built on Radix primitives.

## Run locally

```sh
npm install
npm run dev
```

Use the URL printed by Vite. `npm run build` creates `dist/`; `npm test` checks required enquiry fields and WhatsApp message encoding.

## Content and behavior

Business content is supplied by the owner. The single featured HP EliteBook is an illustrative KSh 30,000 selection; Fanisi must confirm availability and condition. There is no checkout, inventory system, analytics or form storage. The form opens WhatsApp with a prepared message; the visitor sends it themselves. All customer navigation is local: /, /guides/ and /privacy/, plus homepage sections. Canonical URLs identify the intended production domain without sending visitors to the old site.

## Assets

- `public/assets/workspace-hero.png`: generated using the built-in imagegen tool. Prompt: “A refined real sunlit creative workspace: an open silver business laptop on a warm ivory desk, a cobalt blue ceramic cup, small notebook, subtle leafy plant, warm off-white wall, soft daylight and natural shadows. Three-quarter view at desk height, laptop sits on right half, generous negative space on left. Calm professional welcoming aesthetic, premium architectural magazine photography, realistic materials. Laptop screen shows a simple abstract blue and cream website layout with no legible text. No people, no logos, no text, no watermarks. Wide 3:2 composition.” Illustrative editorial image, not the featured unit.
- `public/assets/elitebook-840-g5.png`: product reference photograph from https://upsbatterycity.com/product/hp-elitebook-840-g5-intel-core-i5-8th-6f . Listing verified at KSh 30,000 on 30 October 2026. Retailer image is for local design reference; replace with Fanisi's own product photograph or obtain reuse rights before public publication.

No public deployment was performed.

## Search and AI discovery

`npm run build` now prerenders the homepage into `dist/index.html`, and generates /guides/ and /privacy/, so content is readable without JavaScript. `npm test` includes built-artifact SEO checks: run the build first after edits. Metadata, business identity and FAQ copy share `src/lib/seo.mjs`. Native details/summary controls keep FAQ answers in the source HTML. React renders pages at build time; production uses a lightweight TypeScript interaction script rather than hydrating the whole page.

The development and preview servers deliberately return `X-Robots-Tag: noindex, nofollow`; the production artifact contains indexable metadata. Deploy dist/ through a production static host rather than using the preview server publicly. Preserve existing Fanisi service/guide/privacy routes and merge sitemap entries with the existing site. See SEO-RESEARCH.md for competitor references, implementation decisions and launch requirements. No rankings, indexing, AI citations or rich results have been verified or promised.

The current visual reference is Ecommelogic. Typography and section composition were adapted to Fanisi’s own branding; no competitor assets, testimonials or discounts were imported.

