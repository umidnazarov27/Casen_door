# Selected Signature product page

Updated 4 November 2026. Full local page structure is implemented in Option 01, with English copy and client photographs. This is a review preview, not a Shopify release or final content approval.

## Preview routes

- `/`, `/kitchen`, `/designs/signature`: selected full page, without a design selector.
- `/designs`: archived comparison; Architectural and Studio remain available there.
- `/demo`: original catalogue with illustrative prices and provisional PDF generation.

Run `npm run dev`, then open http://127.0.0.1:5173/.

## PowerPoint mapping

Source: [Kitchen Page Review Final](../output/client-followup-2026-10-25/Kitchen_Page_Review_Final.pptx). Slide 2 lists the page order; the following slides describe each section.

| Order | Source slide | Implemented section | Outstanding content/integration |
| --- | --- | --- | --- |
| 1 | 3 | Product title, photo gallery and four-step configurator | Exact title, dimensions, option rules, prices/VAT and full-combination photography |
| 2 | 4 | Four circular feature images and expandable standard specifications | Approved feature copy, carcass/door materials and thicknesses, hardware |
| 3 | 5 | Finish photographs and colour-guide download placement | Kitchen colour PDF and approved link label; download disabled until supplied |
| 4 | 6 | Three alternating image/text benefits | Final headings, copy, block count and images |
| 5 | 7 | Two alternating project placements | Actual completed-project photos/captions; collection imagery is explicitly labelled as preview |
| 6 | 8 | Removed 8 November 2026 at the client's request | Guarantee terms move into the store terms and conditions (footer link); FAQ answer points there |
| 7 | 9 | Seven expandable FAQ rows | Client-approved questions and answers |
| 8 | 10 | Google Reviews placement | Existing Shopify plugin, selected review scope and live data; no invented rating/reviews |
| 9 | 11 | Four photographed products with storefront links | Client choice or Shopify recommendation rule |
| 10 | 11 | Local branded footer and Kitchen navigation | Reuse the actual theme header/footer and navigation during Shopify integration |

The optional Order Process on slide 12 is not included: its inclusion and position remain unconfirmed. The PPTX itself has not been changed.

Image frames are fixed and crop photos to fill them. Recommended export sizes are in [IMAGE_GUIDE.md](IMAGE_GUIDE.md).

## Editing content

- `apps/configurator/src/designs/kitchenContent.ts`: draft features, benefits, specifications, project placements, FAQs and document URLs. Add the approved `colourGuide` URL to enable that link, and update the surrounding pending copy.
- `fixtures/client-catalogue.ts`: temporary product title, option labels, photographs and pending-pricing flag.
- `apps/configurator/src/designs/relatedProducts.json`: storefront product titles, destinations, local photo paths and original photo URLs.
- `KitchenDetails.tsx`, `KitchenFooter.tsx` and `KitchenPage.module.css`: section structure and responsive presentation.

These are local code-backed inputs. Editing them currently requires rebuilding the frontend. Shopify-managed content/Metaobjects and native review/recommendation integration remain separate production work.

## Photography and recommendations

The 14 kitchen photographs retain the provenance recorded in [client inputs](client-inputs/2026-11-03/README.md). Images are individual option references, not a generated composite or proof of a completed customer installation.

Four related-product examples were read from the public [All Doors collection](https://casen-doors.com/collections/all-doors) on 4 November 2026. Titles and source-image URLs are retained in `relatedProducts.json`; the downloaded JPEGs are in `apps/configurator/public/brand-assets/related/`. This is a dated snapshot, not a live feed or an approved recommendation rule. No prices were copied.

## Verification and remaining work

See [4 November verification](../evidence/2026-11-04-product-page.md) for checks and screenshots.

Next: receive approved content/documents, confirm catalogue compatibility and prices, then integrate with the real Shopify theme, editable catalogue and existing apps. The quotation sample, durable quotation storage and email delivery are still outstanding. The client's Kitchen Product page PDF is an option sheet, not the missing quotation example.
