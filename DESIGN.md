# Fanisi Digital visual system

The owner selected Ecommelogic as the visual reference. The page adapts its wide device-led banner, Montserrat headings, white and pale mint section rhythm, paired introduction, process steps, rounded dark service cards and prominent contact CTA to Fanisi’s own brand.

- Navy `#072247`, accessible deep teal `#007b80`, decorative bright teal `#08b7b8`, pale mint `#edf9f7`, white surfaces.
- Montserrat headings; Inter body and controls. Rounded CTA buttons, 13px card corners, clear fine borders and restrained hover feedback.
- Desktop: 1200px maximum content width, split hero with laptop/browser composition on the left, value proposition and two actions on the right. Mobile: stacked device composition, text and actions, then single-column service/product/contact sections.
- The header crops the supplied logo to its FD symbol, with its background blended into the white header. The footer retains the full official logo. No competitor logos, marketing copy, claimed results or discount offers are used.
- Hero device mockup is illustrative and built in HTML/CSS. Workspace image is AI-generated; laptop image is an external local design reference pending reuse rights or replacement. Details in README.md.
- One H1, keyboard-operable Radix mobile menu and select, labelled fields, native FAQ disclosures, focus indicators, and reduced-motion support.
- FAQ answers and structured data share one source in `src/lib/seo.mjs`. Production HTML includes the content before JavaScript runs; local previews send noindex headers.

## Direction contract
THESIS: practical computer and website services presented through the owner-selected agency-style reference.
OWN-WORLD: navy/teal, white/mint alternating sections, Montserrat type, rounded deep-colour service cards.
STORY: understand the two offers, discuss the options, make an enquiry.
FIRST VIEWPORT: compact brand/navigation header above a two-column device-led banner and primary computer/website actions.
FORM: responsive agency landing page; explicit reference overrides random direction selection.
FINISH: inspect desktop and mobile, correct observed issues together, verify prerendered content and enquiry tests, document limits and hand off the local preview.


Customer guide: /guides/ uses the same brand chrome, a pale mint introduction, desktop sticky topic navigation, responsive decision cards and native question disclosures. /privacy/ provides a local information notice. Mobile headers use an equal-column grid with the FD symbol on the left, Fanisi Digital centred, and the hamburger on the right. Internal navigation uses relative paths; canonical metadata retains the intended public domain for SEO.

Performance: self-hosted variable fonts use optional display; responsive WebP assets replace PNG delivery. Off-screen sections use content-visibility:auto without removing their content from HTML. The production client is a small native interaction script; React is used for build-time page authoring and development only.
