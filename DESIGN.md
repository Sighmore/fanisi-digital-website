# Fanisi Digital design system

## Direction
Premium business-growth consultancy. Editorial hierarchy, a calm white/mint canvas, confident navy, purposeful teal, and realistic labelled customer-journey UI. The business promise leads on desktop and mobile. A single primary consultation action is consistent throughout.

## Extracted brand and reusable tokens
| Role | Token | HEX | Origin / use |
|---|---|---|---|
| Primary | --brand-primary / --teal | #006e73 | Exact live-site accessible teal; links and emphasis |
| Secondary / dark | --brand-secondary / --navy | #072247 | Exact live-site navy; headings, CTA, dark sections |
| Accent | --brand-accent / --aqua | #08b7b8 | Exact live-site aqua / supplied FD identity; decorative use |
| Light | --mint | #edf9f7 | Exact live-site mint; calm section rhythm |
| Border | --border | #dbe7e7 | Exact live-site border |
| Background | --background | #ffffff | Existing white |
| Surface | --surface | #f5faf9 | Teal-derived near-white |
| Raised tint | --surface-deep | #e3f2ef | Teal-derived tint |
| Body | --text | #233e50 | Navy-derived body |
| Secondary text | --text-secondary | #536772 | Navy/teal-derived accessible secondary text |
| Hover | --interactive-hover | #00575c | Darker primary teal |
| Focus | --focus | #006e73 | Light surfaces; #7addd2 or #70dcd0 on dark surfaces |

Montserrat display at weight 650 with responsive clamp(), Inter body at 16–19px and task labels at 14px. Secondary metadata is normally 12px; tiny type is confined to illustrative miniature UI. No new font families. Local licensed WOFF2 fonts are preloaded.

Spacing scale: 8 / 16 / 24 / 32 / 48 / 64 / 96px. Page max-width 1240px; desktop gutters 48px, tablet 32px, mobile 20px. CTA radius 6px, interface radius 10–12px. Focus rings remain visible, touch controls at least 44px, reduced-motion removes animations and smooth scrolling.

## Homepage architecture
Hero promise + labelled enquiry preview → expertise/process trust → business friction → three editorial service transformations → connected four-stage journey (six operational handoffs) → interactive sample demonstration → business-first approach + engagement process → consultation form and next-step explanation.

## Reuse
PageShell, SiteHeader, SiteFooter, ConsultationLink, HeroJourney, ServiceVisual, ConnectedJourney, GrowthDemo, FAQ and ContactSection. Service page content is centralized in src/lib/services.mjs; FAQ content and structured data share the same source. Inline production CSS prevents a blocking stylesheet request.

## Motion
One restrained hero entrance and short panel transitions; no autoplay, parallax, hidden-on-scroll content or continuous decoration. Native accessible controls provide the core experience.

## Visual refinement — approved copy retained

A generated editorial business-planning scene now anchors the hero above the illustrative enquiry preview. The photograph is an AI illustration, not a team or client claim. Original wording, navigation, enquiry behaviour and the interactive demonstration stay intact. The refinement adds stronger navy/teal section contrast, alternating service compositions, a dark application header, distinct consultation destination, and greater visual depth. Existing palette and fonts remain unchanged.

UI/UX Pro Max: the first broad design-system recommendation was rejected because liquid glass and a black/gold palette did not fit the approved brand. The verified narrower Minimalism & Swiss Style result informs grid clarity, type hierarchy, low-motion interactions and contrast; it does not replace Fanisi's palette. Frontend Design informs the editorial composition. No new runtime dependencies.
