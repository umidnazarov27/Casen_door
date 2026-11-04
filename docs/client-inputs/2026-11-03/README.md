# Kitchen collection 01: client inputs

Received 3 November 2026. Implemented in the local Signature preview; this is not a Shopify release.

## Sources

- [Client option sheet](Kitchen%20Product%20page.pdf): one-page visual mapping of four layouts, two island images, four carcass finishes and four storage systems. This is not a quotation PDF sample.
- [Client feedback screenshot](client-feedback.png): start with this collection, refine image sizes later, put Carcass third and Storage fourth, and leave pricing until the last part.
- [Asset manifest](assets.json): attachment numbers, original filenames, repository locations and SHA-256 checksums for all 14 images.
- [Original image files](../../../apps/configurator/public/client-assets/kitchen-set-01/): copied without alteration.

## Implemented

- Signature loads a separate client catalogue through `/api/catalogue?collection=client`.
- Shared step order is Layout → Island → Carcass → Storage. Required choices gate progression; Back retains selections.
- Four layouts, illuminated/standard/no island, four carcass finishes and four optional storage choices.
- Photo cards, selection-aware gallery, thumbnails and enlarged view. The most recently selected storage option appears first. No island uses the selected layout image.
- Product title comes from catalogue data. `Kitchen Collection` is a temporary title pending the exact approved name.
- Full product-page structure and draft English content now follow the selected design and PowerPoint. See [page implementation](../../PRODUCT_PAGE.md).
- Prices, price modifiers and quotations are disabled for this client catalogue until pricing is supplied. The original demo remains available at `/demo` for PDF verification.

## Assumptions and outstanding inputs

- “Leave price to the last part” is interpreted as deferring pricing implementation, not approval of a final price-display policy.
- Island and storage names/descriptions are descriptive draft labels, not approved commercial names or technical specifications.
- The preview permits all layout/option combinations and retains optional multi-select storage. Compatibility, exclusivity and quantities still need client confirmation.
- Prices and VAT are pending. Numeric zero fields are internal schema placeholders, never free/included offers; `pricingStatus: pending` blocks calculation and quotation creation.
- Full-combination photographs, fixed dimensions, cabinet materials/thicknesses, final title, guarantee/colour PDFs and quotation sample remain outstanding.
- Images represent separate options, not a composite of the customer's full selection. The tall pull-out source is low resolution; a larger original is needed for final photography.
- New FAQ text is draft explanatory copy. The full local section structure is implemented; approved content and Shopify integration remain open.

## Verification

- TypeScript, ESLint, preview build and theme asset build passed.
- 11 domain/service tests passed, including rejection of pending-price estimates and quotations.
- Four existing Playwright checks passed on desktop and mobile Chromium: updated step order, retained choices, real demo PDF response, overflow and image dialog.
- Signature manually checked in the browser at 1440px and 390px: option image switching, latest storage selection, Back retention, no-island image mapping, enlarged image and disabled quotation action. At 390px the document width was 390px and no GBP price text appeared.

No production deployment, email sending or client approval is implied by these checks.
