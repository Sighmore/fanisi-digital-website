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

The live site is hosted through Sites using `.openai/hosting.json`, with fanisidigital.co.ke connected as its custom domain. GitHub stores the source; pushing here does not automatically deploy the website.

The published runtime is from commit `1304bcab64f14103e7455f80cd6abf88de663a6d` (Site version 4). Release verification is recorded in `docs/live-release-2026-11-23.json`. Subsequent documentation commits do not change the deployed runtime.

See `PRODUCT.md` and `DESIGN.md` for product scope and brand design decisions. The AI-generated editorial image is illustrative and does not represent Fanisi staff or a client photograph.
