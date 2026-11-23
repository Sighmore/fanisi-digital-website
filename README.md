# Fanisi Digital website

Live website: https://fanisidigital.co.ke/

Fanisi Digital provides website development, WhatsApp automation and custom CRM solutions for Kenyan businesses. This repository contains the published website source, its static rendering scripts, local assets and automated tests.

## Run locally

Requires Node.js 22 or newer.

```sh
npm ci
npm run build
npm test
npm run preview -- --port 5180
```

For source editing, run `npm run dev`. Preview and development responses include a noindex header; production HTML remains indexable.

## Implementation

React and TypeScript render six complete pages at build time. The production site uses a small native browser script for navigation, the interactive sample journey and enquiry preparation. CSS includes the photo zoom, staggered entrances, one-time scroll reveals and reduced-motion support. Fonts and optimized images are hosted locally.

Pages: homepage, three solution pages, business guide and privacy page.

The enquiry form validates name and message, prepares an encoded WhatsApp link and leaves sending to the visitor. It stores no form details. The demonstration uses sample data and connects to neither WhatsApp nor a CRM. Optional measurement hooks are disabled by default.

## Deployment

GitHub Pages hosts the website at https://fanisidigital.co.ke/. The domain remains registered and managed at HostAfrica.

Every push to `main` triggers `.github/workflows/pages.yml`: install dependencies, build all six static pages, run the tests, upload `dist`, and deploy it with GitHub Pages. Manual deployment is also available from Actions. GitHub Pages settings use GitHub Actions as the source and `fanisidigital.co.ke` as the custom domain.

HostAfrica website DNS:

| Name | Type | Value |
| --- | --- | --- |
| @ | A | 185.199.108.153 |
| @ | A | 185.199.109.153 |
| @ | A | 185.199.110.153 |
| @ | A | 185.199.111.153 |
| www | CNAME | sighmore.github.io |

The original Sites deployment manifest is retained for release history. It does not control GitHub Pages hosting. Existing mail and Google verification records are separate from this website configuration.

See `PRODUCT.md` and `DESIGN.md` for product scope and brand design decisions. The AI-generated editorial image is illustrative and does not represent Fanisi staff or a client photograph.
