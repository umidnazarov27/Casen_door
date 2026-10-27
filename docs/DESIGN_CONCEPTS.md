# Three client design directions — 17 October 2026

The user requested three different kitchen-configurator designs close to https://casen-doors.com/, for client selection. This checkpoint changes presentation only; store installation, catalogue approval, exact imagery, email and production storage remain open.

## Review links

Run `npm run dev` and open http://127.0.0.1:5173/designs.

| Direction | Local page | Composition |
|---|---|---|
| 01 Signature | http://127.0.0.1:5173/designs/signature | White storefront, Assistant type, large image left and controls right; closest to the current brand site |
| 02 Architectural | http://127.0.0.1:5173/designs/architectural | Warm stone background, serif headlines, panoramic image followed by horizontal options |
| 03 Studio | http://127.0.0.1:5173/designs/studio | Dark graphite canvas, warm accent, immersive image and narrow vertical step rail on desktop |

The comparison page and review toolbar are in Russian for the user; each proposed customer interface is in English. The English client presentation in the downloadable package opens offline without a server.

The “Выбрать вариант” button records a preference in this browser only. It does not email the client, update Shopify, publish a design or send a selection elsewhere. The user/client communicates the chosen number separately.

## Client deliverables

English PDF presentations added for the client: three landscape pages per direction, including a photographic concept overview, the clean desktop interface with composition/typography/colour notes, and mobile controls with a detail photograph and review guidance. Russian review controls are excluded from all PDF screenshots.

- [01 Signature PDF](../output/pdf/design-presentations/Casen_Doors_01_Signature.pdf)
- [02 Architectural PDF](../output/pdf/design-presentations/Casen_Doors_02_Architectural.pdf)
- [03 Studio PDF](../output/pdf/design-presentations/Casen_Doors_03_Studio.pdf)
- [All three PDFs in one ZIP](../output/casen-design-presentations.zip)

PDF builder: scripts/build_design_presentations.py. Clean screenshot inputs, measured page regions, converted logo assets and rendered QA pages are under tmp/pdfs/design-presentations/. All nine final pages were rendered and visually inspected. Each file was reopened and checked for page count, embedded images, English text and text within page bounds. Reference imagery and illustrative pricing are identified in the presentations.

- [Downloadable client package](../output/casen-design-options.zip): index.html, local logo/font, three desktop and three mobile screenshots. Extract the archive and open index.html; click a preview to inspect its full image.
- [Offline client presentation](../output/client-designs/index.html)
- [Comparison screenshot](../output/playwright/designs/comparison.png)
- Desktop: [Signature](../output/playwright/designs/signature.png), [Architectural](../output/playwright/designs/architectural.png), [Studio](../output/playwright/designs/studio.png).
- Mobile: [Signature](../output/playwright/designs/signature-mobile.png), [Architectural](../output/playwright/designs/architectural-mobile.png), [Studio](../output/playwright/designs/studio-mobile.png).

Interactive localhost links work on the machine running the preview. For a remote client, use the extracted presentation/screenshots or arrange a later hosted preview; no deployment was performed for this design checkpoint.

## Brand evidence and assets

The actual Casen Doors homepage was opened in a browser. Observed: white background, black rectangular buttons, Assistant body/headline font, original Casen Doors logo and large architectural photographs. Signature follows those choices most directly; Architectural and Studio extend the same identity into different compositions.

Public brand assets copied from the supplied site for these local concepts:

- Logo: https://casen-doors.com/cdn/shop/files/Logo.svg?v=1754142353&width=140
- Assistant regular: https://casen-doors.com/cdn/fonts/assistant/assistant_n4.9120912a469cad1cc292572851508ca49d12e768.woff2
- Brand files are under apps/configurator/src/designs/assets/.
- Kitchen reference imagery comes from the previously supplied configurator prototype, with provenance in [fixtures/README.md](../fixtures/README.md). It is not presented as an exact photo of every selected combination.

## Implementation and verification

- A lazy-loaded review entry is enabled by a local-preview-only data attribute. The original `/` configurator remains available. The Shopify section does not enable review routes automatically.
- All concepts reuse the same configuration hook, option cards, gallery, catalogue API and PDF endpoint. Shared behaviour was extracted from the original component without changing the pricing/compatibility rules.
- `npm test`: 10 domain/service tests passed.
- Existing `npm run test:e2e`: 4 desktop/mobile Chromium regression checks passed after the shared-hook extraction.
- `npm run typecheck`, `npm run lint`, `npm run build`, `npm run build:theme`: passed.
- All three concepts visually inspected on desktop and at 390 px mobile width. Document scroll width was 390 px in every mobile concept; visible images loaded; no browser errors reported.
- Studio's full configuration was exercised through the UI: L-shaped + compact island + cutlery + oak = £15,108, then File Quotation opened the real PDF in a new tab and exposed the download link.
- Comparison page loaded all three preview images and linked to the correct concept pages. Final preview PNGs were copied into the local gallery's public assets.
- Client ZIP integrity checked; all local presentation assets included.

This is design-review evidence, not full production acceptance. Prices, dimensions and VAT remain clearly illustrative; email remains disabled.
