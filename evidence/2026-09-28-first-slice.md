# First implementation verification — 28 September 2026

Scope: local fixture-backed React/Vite interface, shared domain logic, local Node/PDF service and generated Shopify theme assets. No production or Shopify acceptance is claimed.

## Observed checks

| Check | Observed result |
|---|---|
| Initial test-first run | Two suites failed to import the not-yet-implemented domain/service modules |
| `npm test` | 10 tests passed in 2 suites after implementation; rerun with Node 24.19.0 passed |
| `npm run typecheck` | Passed |
| `npm run lint` | Passed |
| `npm run build` | Passed; preview JS 321.33 kB / 98.01 kB gzip, CSS 9.49 kB / 2.63 kB gzip |
| `npm run build:theme` | Passed; final theme JS 320.68 kB / 97.72 kB gzip, CSS 9.50 kB / 2.64 kB gzip |
| `npm run validate:catalogue` | Valid fixture schema: 4 layouts, 2 island choices, 3 storage choices, 2 carcass choices; exact-photo launch coverage explicitly unverified |
| Browser startup inspection | Correct page title/content, real interactive controls and reference images; no browser errors reported |
| `npm run test:e2e` | 4 tests passed: 2 desktop Chromium and 2 Pixel 7-sized Chromium checks |
| PDF rendering | Real one-page A4 PDF generated; text extracted and PNG visually inspected; initial title/date overlap corrected and re-rendered |

Browser setup initially failed because the installed Playwright package needed a newer Chromium binary. Installed the matching official browser and reran successfully. This was a tooling failure, not a passing application test. Poppler emitted non-writable font-cache notices, but completed rendering and text extraction; the final rendered page was inspected.

## Behaviour covered

- Pricing for layout + island + cutlery + carcass: demo subtotal £12,590; illustrative VAT £2,518; total £15,108.
- Layout change clears incompatible island but retains compatible storage.
- Missing prices, unknown IDs, duplicate storage IDs, incomplete/incompatible quotes and browser-supplied price fields rejected.
- 90-day expiry across a year boundary and reference-image label in the quote snapshot.
- Real PDF bytes generated; wrong access token rejected; concurrent retries deduplicated; changed request under the same key rejected; stale catalogue rejected.
- Browser selects all four steps, returns to storage with selection intact, generates a PDF without email entry and retrieves its download link.
- No horizontal overflow at the tested desktop/mobile viewport; lightbox opens and Escape closes it.

## Artifacts

- [Desktop preview](desktop-preview.png)
- [Mobile preview](mobile-preview.png)
- [Rendered PDF review](sample-quotation.png)
- [Extracted PDF text](sample-quotation.txt)
- [Demo quotation PDF](../output/pdf/casen-demo-quotation.pdf)

Reference website was opened successfully in the in-app browser. Observed desktop design: warm neutral palette, large serif heading, wide photograph/gallery, compact choices and a four-step panel. Its step order differs from the agreed document, so this implementation follows Layout → Island → Storage → Carcass. This is a design-direction check, not complete visual fidelity acceptance. Image source provenance is recorded in [fixtures/README.md](../fixtures/README.md).

## Remaining evidence gaps

No actual Shopify theme/store/proxy execution, staff catalogue editing, real client prices/VAT/dimensions, exact-combination photographs, production storage, email delivery, service limits or live deployment have been verified. The full AC01–AC10 release gate remains open. The PDF sample reminder was created for this afternoon and delivered in this chat; the user's sample has not arrived at this checkpoint.
