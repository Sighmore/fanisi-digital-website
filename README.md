# Fanisi Digital — business growth redesign

Local review build, 23 November 2026. Nothing in this redesign has been published or pushed to the hosted Site. The existing production website and DNS remain unchanged.

## Preview

Run `npm run build`, then `node node_modules/vite/bin/vite.js preview --host 127.0.0.1 --port 5180`. Open http://127.0.0.1:5180/. The preview sends X-Robots-Tag: noindex, nofollow. For source editing, `npm run dev` uses the React development renderer.

## Pages

- `/` — growth-focused homepage and interactive demonstration
- `/solutions/website-development/`
- `/solutions/whatsapp-automation/`
- `/solutions/crm-solutions/`
- `/guides/` — rewritten business guide
- `/privacy/`

React renders complete HTML at build time. Production ships a small native interaction script, inline CSS, the existing FD brand mark and locally licensed fonts. No new dependencies.

## Behaviour

The enquiry form validates required name and message, accepts an optional business name, prepares an encoded WhatsApp link and leaves sending to the visitor. It does not schedule an appointment or store input. The illustrative demo runs locally on preset sample information, adapts the suggested handoff, and does not connect to WhatsApp or a CRM.

Optional measurement hooks are disabled, with no analytics vendor, storage or network transmission. Details and a proposed baseline are in docs/redesign/MEASUREMENT.md.

## Review material

- PRODUCT.md — positioning, scope and product truth
- DESIGN.md — extracted exact brand palette and reusable tokens
- docs/redesign/AUDIT.md — existing-site audit and priorities
- docs/redesign/HOMEPAGE-COPY.md — complete copy review
- docs/redesign/REVIEW.md — QA, measured build budgets and outstanding launch decisions
- docs/redesign/MEASUREMENT.md — consent-gated tracking preparation

Run `npm test` after a successful build. The tests cover static content, internal links, service/FAQ metadata, removal of sales content, enquiry encoding and demonstration segmentation. Previous source is backed up in releases/redesign-before-2026-11-23.zip. Removed product imagery is preserved outside the website in source-assets/legacy/.

A release still requires explicit approval. Keep the existing hosted-source checkout and production manifest separate until that approval is given.
