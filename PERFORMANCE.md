# Performance verification

Measured on 30 October 2026 using Lighthouse 12.8.2, the installed Microsoft Edge Chromium browser, and the local production preview at http://127.0.0.1:5180/. Standard Lighthouse mobile simulation and desktop preset were used. Only the Performance category was audited. These are local lab results, not public Google PageSpeed Insights or real-user field data.

| Page and device | Performance | First contentful paint | Largest contentful paint | Blocking time | Layout shift |
| --- | ---: | ---: | ---: | ---: | ---: |
| Homepage, mobile | **99/100** | 1.3 s | 1.8 s | 80 ms | 0 |
| Homepage, desktop | **100/100** | 0.4 s | 0.4 s | 10 ms | 0 |
| Customer guide, mobile | **100/100** | 1.0 s | 1.6 s | 0 ms | 0 |

The first mobile audit scored 54/100, with 1,040 ms blocking time. The final production browser script is about 2.9 KB raw / 1.25 KB gzip, compared with roughly 384 KB before the architecture change. The source workspace image was 1.9 MB; responsive WebP variants are approximately 45 KB and 22 KB. The laptop variants are approximately 16 KB and 8 KB.

## Changes

- React renders the three complete pages at build time. Native dialog, form, select and FAQ controls use a small TypeScript enhancement script in production; the full page is not hydrated.
- All visible content, internal links and JSON-LD are present in the delivered HTML. Performance is not achieved by hiding content or delaying functionality for a benchmark.
- Fonts are local, preloaded and use optional display to avoid late font-swap layout work. Slow first visits may retain the fallback font until the next visit.
- Responsive WebP images, lazy loading below the fold, reserved image dimensions and off-screen layout containment reduce transfer and rendering work.
- Eleven regression tests cover local links, all generated pages, guide/schema parity, the enquiry flow, and a 10 KB production JavaScript budget. Browser checks cover centred mobile branding, menu navigation, guide layout and form prefilling/required-field validation.

## Reports and reproduction

HTML and JSON reports are in `reports/home-mobile-final.report.*`, `reports/home-desktop-final.report.*` and `reports/guide-mobile-final.report.*`. Original baseline reports are retained for comparison.

Run `npm run build`, `npm test` and `npm run preview`. Set CHROME_PATH to an installed Chrome or Edge executable, then use `node node_modules/lighthouse/cli/index.js <preview-url> --only-categories=performance --output=html`. Add `--preset=desktop` for a desktop run. Use the exact URL printed by the preview server.

## Limits

The homepage mobile result is **99, not 100**. No guarantee of a permanent 100 score is made. Hosting, compression, caching, network routing, device resources, browser version and content changes affect results. Google's public PageSpeed test cannot access this localhost preview. Deploy the static `dist/` output with HTTPS, compression and appropriate asset caching, then test the public URL. The development/preview servers intentionally send noindex headers; do not use them as a production host.

Google explains [PageSpeed lab and field data](https://developers.google.com/speed/docs/insights/v5/about) and [score variability](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring). A Lighthouse score is not a search-ranking or AI-citation guarantee.

## 2 November 2026 delivery update

The reported blocking request was the ~9 KB compressed stylesheet. Production prerendering now embeds the complete minified CSS in each HTML document, removing that render-blocking round trip and its HTML-to-CSS dependency. Development still uses Vite CSS delivery. Fonts remain self-hosted and preloaded.

Responsive AVIF photo sources retain WebP fallbacks: laptop 600px is 9,905 bytes (formerly 16,090); workspace 800px is 17,929 bytes (formerly 44,544 for 960px WebP), with 600px/400px alternatives of 12,388/7,199 bytes. Footer logos use 240px/480px WebP variants (3,400/7,652 bytes), are lazy loaded, and retain explicit dimensions.

Verified: zero external stylesheet links on all three production pages; browser-selected AVIF sources; desktop/mobile layout and menu operation; no horizontal overflow at 375px; all 11 regression checks; successful production build. These are dependency and byte-size checks, not a new Google PageSpeed score. The prior Lighthouse measurements above are historical.
