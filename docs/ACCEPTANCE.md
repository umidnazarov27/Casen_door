# Acceptance and release evidence

Baseline: section 9 of [SOURCE_SPECIFICATION.md](SOURCE_SPECIFICATION.md). Full contract acceptance checks below remain **NOT RUN** with final client content/Shopify services. Partial local fixture verification is recorded in [first implementation evidence](../evidence/2026-09-28-first-slice.md): ten domain/service tests, four desktop/mobile-sized Chromium tests, and visual PDF review. Those results do not mark the full release criteria PASS.

For each check, record date, release/commit, environment, browser/device where relevant, fixture or client data used, result and evidence path/link. Use PASS, FAIL, BLOCKED or NOT RUN. Mocks prove local behaviour only; they do not prove Shopify integration, real email or live release success.

## Contract acceptance mapping

| ID | Source criterion | Demonstration required | Evidence | Status |
|---|---|---|---|---|
| AC01 | Existing Shopify integration | Configurator runs inside approved storefront; product pages, cart, navigation and relevant existing functionality still work; scripts/styles do not leak | Preview/live URLs, regression record | NOT RUN |
| AC02 | Four steps and retained selections | Complete Layout → Island → Storage → Carcass; navigate backward/forward; progress and checkmarks reflect valid completion; selections survive step changes | Browser walkthrough and state tests | NOT RUN |
| AC03 | Dimensions without matching engine | Fixed layout/island dimensions visible during selection and in summary/PDF; island dimension image opens; no customer measurement field or matching workflow | UI screenshots and sample PDFs | NOT RUN |
| AC04 | Exact photos and resilient gallery | Every valid final combination has a supplied matching quotation photo; thumbnails/lightbox work; forced image failures produce labelled references/placeholders without losing state/prices | Complete coverage report, client photo confirmation, failure tests | NOT RUN |
| AC05 | Compatibility | Incompatible options hidden/disabled; changing upstream selections clears invalid descendants and explains the change; invalid requests cannot produce a quote | Rule tests, browser tests, server rejection evidence | NOT RUN |
| AC06 | Consistent pricing/VAT | All approved price examples agree across UI, summary and PDF; shipping exclusion and VAT treatment clear in both | Worked examples and generated PDFs | NOT RUN |
| AC07 | PDF without email gate | File Quotation opens a new tab without name/email entry; download and popup recovery work; photo/options/dimensions/issue date/90-day expiry/notice present | PDF content/layout review and browser evidence | NOT RUN |
| AC08 | Optional email | Validated name/email and explicit confirmation; corresponding PDF sent only to requested customer; no automatic company copy; staff-confirmation wording present | Controlled provider dispatch evidence, attachment check | NOT RUN |
| AC09 | Quality and failures | Required browsers/devices, accessibility, responsive loading and error handling meet scope; failed PDF/email actions can retry without state loss | Browser matrix, accessibility review, failure scenarios | NOT RUN |
| AC10 | Content management | Approved assets replace demo content; authorized staff can add/edit/disable catalogue records and replace images without an interface rebuild | Admin walkthrough, new-record demonstration, validation output | NOT RUN |

## Meaningful automated checks

Select the actual runner/commands after the stack exists. Use failing behavioural tests before implementing pricing, rules and service recovery; avoid tests that merely repeat implementation details.

- Configuration: step changes retain state; layout changes invalidate only incompatible choices; no-island allowed/rejected correctly; exclusive groups enforce their constraints; inactive options cannot be quoted.
- Pricing: basic and fully configured examples, positive/negative carcass modifiers if supported, multiple storage additions, approved VAT rounding, unknown IDs, missing prices and forged browser totals.
- Photos: stable keys regardless of storage selection order; exact and fallback selection; failing primary/fallback assets; complete valid-combination enumeration and coverage validation.
- Quotation: server recalculation, stale catalogue handling, immutable snapshots, duplicate request handling, issue/expiry calculation over month/year/leap boundaries, required notice and structured PDF content.
- Email: invalid input rejected, confirmation required, PDF generation independent of email failure, retry/idempotency prevents accidental duplicates, provider timeout handled honestly, accepted dispatch state distinct from delivered.
- End to end: valid configuration → PDF without email → optional confirmed email; upstream change → correction → updated quotation; blocked tab → explicit download; forced service failure → retry with selections retained.

## Browser and visual review

Record exact browser/OS versions during testing; do not label an unspecified or emulated browser as a completed real-device test.

| Environment | Required checks | Status |
|---|---|---|
| Desktop Chrome | Full journey, layout, lightbox, PDF/email, blocked popup recovery | NOT RUN |
| Desktop Safari | Full journey, sticky layout, new-tab PDF, download, email | NOT RUN |
| Desktop Edge | Full journey and existing-store regressions | NOT RUN |
| Desktop Firefox | Full journey, focus/lightbox, PDF/download | NOT RUN |
| iPhone/mobile Safari | Narrow layout, touch targets, sticky controls, keyboard form interaction, PDF opening/download | NOT RUN |
| Android/mobile Chrome | Full mobile journey, email validation and recovery | NOT RUN |
| Tablet viewport/device | Intermediate widths, rotation, galleries and control layout | NOT RUN |

Check no horizontal scrolling at narrow, medium and large widths. Desktop should approximate the specified 55–60% photograph / 40–45% controls balance. Mobile order is photograph, progress, options, price and CTA. Sticky elements must not hide content or focused controls.

Lightbox: visible close button, desktop Escape, keyboard navigation/focus containment and focus return. Controls: labels, visible focus and selected states, named swatches and non-colour selection indicators. Images: meaningful alt text; dimension imagery needs usable dimension text alongside it. Test keyboard-only completion and a representative screen-reader journey.

Inspect representative PDFs visually as well as extracting their text: long option names, multiple storage selections, branding, image aspect ratio, page breaks, totals, dates and notice. An endpoint returning a PDF MIME type does not prove the PDF is complete or readable.

## Loading and failure scenarios

- Confirm only necessary initial assets load; selection loads relevant photos; storage/detail assets lazy-load. Record a network trace rather than assuming the entire library is deferred.
- Slow network: visible loading state and responsive controls; no stale response replaces the latest selection.
- Missing/exact image failure: fallback correctly labelled on screen and PDF; placeholder if all fail; quote controls remain usable.
- Catalogue unavailable or malformed: clear recoverable error; no invented prices or unsafe default selections.
- Service rejects incompatible/stale selections: clear guidance and preserved/reviewable state.
- PDF generation failure: clear status and retry; no false success; configuration retained.
- Email timeout/failure: PDF remains accessible; retry does not unexpectedly create duplicate emails.
- Blocked popup: explicit working open/download link.
- Optional refresh recovery, analytics or automatic storage preview: test only if approved, and record that decision. No PII in analytics; quotation_email_sent only after provider acceptance.

Performance has no numeric contractual budget in the source. Measure initial payload, unnecessary requests and responsiveness on the actual preview; agree any additional numeric targets rather than inventing acceptance conditions.

## Release gate

- [ ] AC01–AC10 pass with production-intended content and appropriate evidence.
- [ ] Every valid final combination passes exact-photo coverage and client depiction confirmation.
- [ ] No placeholders, guessed prices/VAT, missing launch assets or unresolved acceptance failures remain.
- [ ] Chosen optional features have explicit decisions; excluded features have not entered the release accidentally.
- [ ] Hosting/email configuration, sender, cost owner and operational retention are recorded; secrets are absent from frontend/repository.
- [ ] Client review package and source-required integration confirmation are recorded.
- [ ] Recoverable baseline and specific rollback instructions exist; release can be reverted without losing catalogue changes unnecessarily.
- [ ] Approved live deployment is followed by actual live smoke checks, including a controlled, authorized email test.
- [ ] Handover documents and catalogue maintenance walkthrough are delivered.

Final completion record: release identifier, deployment URL, date, acceptance evidence, client acceptance, service owners, rollback location and any explicitly agreed follow-up work. Until these exist, report the precise stage reached rather than “project complete.”
