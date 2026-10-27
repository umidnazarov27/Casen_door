# Project delivery plan

Prepared: 28 September 2026. Baseline: [MVP v1.3](docs/SOURCE_SPECIFICATION.md).

## Selected implementation approach

Client follow-up, 25 October 2026: Option 01 is the selected design in the client's written feedback. Meeting notes add a proposed full kitchen product page and an administration discussion. The [meeting recap](docs/MEETING_2026-10-25.md) records the requests and unresolved scope/timeline questions. A 14-slide native Google Slides review, a seven-tab native Google Sheets input workbook and an English email draft are prepared; links are in the recap. Client sharing, sending the email and receipt of final materials remain outstanding. These preparation deliverables do not establish production completion or a revised launch date.

Build a Shopify custom page/template with a Liquid section mounting React + TypeScript, bundled with Vite and styled with CSS Modules. Use Shopify Metaobjects and media for the catalogue; connect a Node/TypeScript backend on Vercel through a Shopify app proxy. Generate PDFs with `@react-pdf/renderer` and send confirmed customer emails through a Resend adapter. Store issued quotation snapshots/dispatch state in a small managed PostgreSQL database and PDFs in private object storage. Provider/account/cost decisions and store compatibility remain audit items.

The [implementation plan](docs/IMPLEMENTATION_PLAN.md) defines the repository layout, API contracts and T01–T13 tickets mapped to the six-week schedule below. This is the user-selected planning direction; do not reselect the stack without evidence that a change is needed.

## Outcome and definition of finished

Deliver a branded configurator inside the existing Casen Doors Shopify storefront. A customer completes Layout → Island → Storage → Carcass, sees valid options and an estimated price, opens a provisional PDF without entering an email address, and can separately request an emailed copy after confirmation.

Finished means the approved launch catalogue is installed, every valid final combination has its supplied quotation photograph, all ten source acceptance criteria pass with evidence, the approved integration is live without regressions to the existing store, and Casen Doors can maintain the catalogue and operate the quotation service. A local demo or preview is an intermediate milestone.

## Scope boundaries

Required:

- Approved preset layouts and islands, including no-island where allowed; fixed dimensions in millimetres and island dimension images.
- Storage options with the required multi-select or exclusive behaviour; carcass choices with names, descriptions, swatches, reference photos and price differences.
- Four steps, progress/checkmarks, selected states, Back/Continue, retained selections, compatibility enforcement and clear invalidation notices.
- Photo galleries, detail views, labelled fallbacks, placeholders and an accessible lightbox.
- Price breakdown with client-approved currency/VAT rules; screen and PDF totals agree; shipping excluded.
- Branded PDF titled “Provisional Quotation”, issue/expiry dates, 90-day validity, exact required notice, selected options/dimensions and final-combination photo.
- Separate optional customer email flow. The capability is required even though using it is optional for the customer. No automatic company copy or enquiry notification.
- Responsive, accessible controls; current desktop Chrome/Safari/Edge/Firefox and mobile Safari/Chrome for Android; loading and error recovery.
- Editable Shopify-backed catalogue and photo mappings, where suitable, with no interface rebuild for new options/assets.

Optional, pending a launch decision: browser refresh recovery, existing analytics integration, automatic switching to storage preview images. Step-to-step retention remains required regardless of refresh recovery.

Outside MVP: customer measurement input, dimension matching, separate collection/colour step, 3D/WebGL, cabinetry drag-and-drop, live AI generation, generated manufacturing drawings, checkout/deposits/Draft Orders, CRM, accounts, public saved/shareable configurations and analytics dashboards. Door style, handles, worktops and appliances are separately scoped extensions. Do not import older brainstorm features into this scope.

## Working status

Use TODO, IN PROGRESS, BLOCKED and DONE. DONE requires the listed evidence; report partial completion explicitly.

| ID | Work package | Dependency | Status | Completion evidence |
|---|---|---|---|---|
| P0 | Capture source and prepare delivery/implementation plans | Source document and stack discussion | DONE | Source snapshot, stack-specific plan and T01–T13 tickets saved |
| P1 | Audit Shopify and confirm implementation decisions | Store access, visual reference, client decisions | IN PROGRESS | Reference visually inspected; store/app/service audit still blocked on access/details |
| P2 | Establish project and first end-to-end slice | P1 decisions for real integration; fixtures can start earlier | IN PROGRESS | Local React → trusted fixture price → PDF works; theme bundle builds; actual Shopify preview pending |
| P3 | Catalogue, compatibility and pricing | Approved data contract; production requires client data | IN PROGRESS | Fixture schema, rule/price tests and shared logic work; Shopify data and production rules pending |
| P4 | Complete UI and photographs | P2/P3, visual reference and approved brand direction | IN PROGRESS | Four demo steps, responsive gallery and lightbox verified; final content, exact photo mapping and remaining quality work pending |
| P5 | Production PDF and customer email | P3, confirmed infrastructure, approved wording | IN PROGRESS | Local PDF generated and inspected; sample layout, durable services and email pending |
| P6 | Client content and acceptance | P3–P5, complete approved assets | TODO | All acceptance rows pass; client preview review recorded |
| P7 | Launch and handover | P6 and live-change approval where not already authorized | TODO | Live smoke checks, rollback record, operating guide and walkthrough |

## Six-week delivery sequence

The contractual clock starts only once the required inputs have arrived. Preparatory fixture work can happen sooner, but does not establish a contractual start date. Proposed internal checkpoints follow; they do not change the fee or deadline.

### Week 1 — audit, decisions and a working vertical slice

- [ ] Obtain the specific storefront URL, development access and source location; review theme/version, existing customizations, apps, templates and navigation.
- [ ] Inspect the primary visual reference in a browser, on desktop and mobile; capture its actual layout and interactions for implementation notes.
- [ ] Audit Metafields/Metaobjects, Files/media, permissions, app integration options, existing email capabilities and analytics.
- [ ] Validate the selected page/React/app-proxy integration against the actual store. Record app ownership/authentication, hosting/email/storage ownership, ongoing costs and release/rollback approach; change the baseline only if the audit justifies it.
- [ ] Prove the difficult path early: a valid fixture configuration generates a branded sample PDF containing an image; open/download it through the proposed storefront integration; prove email attachment delivery in a controlled test environment.
- [x] Establish local Git repository, reproducible setup, local preview, fixture validation and lint/type/build/test commands. Real Shopify staging remains under the integration task.
- [x] Deliver the local fixture slice: select a layout, show dimensions/reference image/price and produce a sample PDF. Demo labels are present throughout.

Exit: integration is feasible, major service dependencies are understood, and a working preview exists. Do not spend several weeks polishing a UI before proving quotation delivery.

### Week 2 — catalogue, rules and pricing

- [ ] Implement the data contract in [ARCHITECTURE.md](docs/ARCHITECTURE.md), starting with fixtures and an adapter for Shopify.
- [ ] Build validation for IDs, references, availability, dimensions, prices, currency and photo mappings; report invalid records clearly.
- [ ] Implement deterministic state transitions and compatibility rules, including storage selection groups and no-island eligibility.
- [ ] Implement price breakdown and approved VAT rounding. Treat a missing price as invalid data, never as zero.
- [ ] Validate selections and recalculate quotations from trusted catalogue data on the server.
- [ ] Build a catalogue validator that enumerates valid final combinations and reports missing exact photos. If combinations grow excessively, resolve the launch catalogue/asset supply with the client; do not silently reduce scope.
- [ ] Add meaningful rule and pricing tests, including layout changes that invalidate downstream selections.

Exit: every supported fixture combination behaves consistently; client catalogue structure is ready for content entry.

### Week 3 — complete customer interface

- [ ] Implement all four steps, progress/checkmarks, selection states, Back/Continue and summary.
- [ ] Show layout/island dimensions during selection; provide secondary island dimension images.
- [ ] Build storage and carcass cards with all supplied descriptions, prices and swatches.
- [ ] Implement primary photo, thumbnails, lightbox, exact/reference labels, loading state and fallback chain.
- [ ] Apply Casen Doors branding and approved hero copy; use the supplied reference as the primary design guide.
- [ ] Implement desktop photo/control proportions, mobile content order and suitable sticky controls without covering content.
- [ ] Verify keyboard focus, named swatches, alt text, contrast, touch interactions and narrow-screen layout.

Exit: complete responsive preview using validated fixture or client content, with no measurement input or out-of-scope steps.

### Week 4 — reliable PDF and email

- [ ] Finalize the quotation snapshot and branded PDF, including long content/page breaks, image placement, all prices and exact notices.
- [ ] Open the PDF in a new tab from File Quotation without collecting name/email; recover with an explicit open/download link if the browser blocks it.
- [ ] Implement separate Email My Quotation, name/email validation and explicit confirmation before sending.
- [ ] Include the name when provided; if adding a name creates an updated PDF, also expose that updated PDF for download so the customer and email versions agree.
- [ ] Keep PDF generation and email dispatch statuses separate. Provider acceptance is dispatch evidence; do not label it guaranteed inbox delivery.
- [ ] Handle generation errors, email failures, duplicate submissions and retries without losing selections or charging/requoting unexpectedly.
- [ ] Complete deployment configuration, secret handling, abuse controls and minimal operational logging.

Exit: a real preview quotation can be viewed/downloaded and emailed through configured infrastructure; both failure paths are demonstrated.

### Week 5 — client content and acceptance

- [ ] Import approved layouts, islands, storage, carcasses, dimensions, prices, VAT rules, branding and copy.
- [ ] Run full valid-combination photo coverage: zero missing, unapproved or unreachable exact-photo mappings for launch.
- [ ] Verify exact-photo mappings semantically with client confirmation; a URL existing does not prove it depicts the selected combination.
- [ ] Complete [ACCEPTANCE.md](docs/ACCEPTANCE.md) across agreed devices/browsers and production-like services.
- [ ] Test the existing store's product pages, navigation and cart to detect integration regressions.
- [ ] Record client feedback against acceptance IDs; separate defects from proposed scope additions.
- [ ] Show Casen Doors how to add/edit/disable a catalogue item and replace a photo; confirm no frontend rebuild is needed.

Exit: no unresolved acceptance failures or missing launch content; client review has a concrete preview and evidence.

### Week 6 — fixes, launch and handover

- [ ] Resolve acceptance defects and rerun the affected checks; run one complete purchase-free quotation journey after the final candidate is built.
- [ ] Deliver the preview URL, sample PDFs, test record, known limitations and rollback steps for final review.
- [ ] Confirm the integration approach and live-change authorization required by the source document. Reuse authorization already given; do not add redundant approval steps.
- [ ] Capture a recoverable theme/code/configuration baseline and deploy the approved release without overwriting unrelated changes.
- [ ] Smoke-test the live journey, PDF download, controlled email, photo assets and existing storefront functions.
- [ ] Handover setup/run/deploy instructions, data field guide, catalogue validation, photo replacement, service ownership, operational costs, failed-email retry and rollback procedures.
- [ ] Record release identifier, URLs, test evidence, client acceptance, known limitations and ownership of any follow-up support. No ongoing monitoring or support term is assumed.

Exit: approved release live, all acceptance criteria verified, client handover complete.

## Dependency and decision rules

| Missing item | Work that can proceed | Work that remains blocked |
|---|---|---|
| Shopify access/source | Local fixture state/rule/UI work, architecture proposal | Audit conclusions, actual integration and deployment |
| Visual reference unavailable | Functional wireframes from the source requirements | Claiming design fidelity or final visual acceptance |
| Final catalogue/rules/prices/VAT | Schema and clearly labelled example fixtures | Production quotes and correctness acceptance |
| Exact photographs | Gallery/fallback implementation and coverage tooling | Launch photo acceptance |
| Email service/sender setup | Local/mock flow and error handling | Verified real email dispatch |
| PDF/email wording and brand assets | Sample layout with placeholders | Final branded documents |
| Optional-feature decision | Required core functionality | Implementing optional features as contractual scope |

Do not pause all development for one missing input. Continue independent authorized tasks, record the specific blocker and request only the information needed. Placeholders never count as approved content.

## Key risks and mitigations

| Risk | Mitigation | Owner |
|---|---|---|
| Too many combinations to photograph | Enumerate valid combinations in week 2; agree launch catalogue and photo manifest before bulk content work | Developer + Casen Doors |
| PDF/email integration is unsuitable | Run the end-to-end feasibility spike in week 1; record service costs and limitations | Developer |
| Theme customization disrupts the store | Isolate styles/scripts, use preview, regression check and recoverable baseline | Developer |
| VAT or prices differ between UI and PDF | Approved worked examples, trusted calculation and fixed quote snapshot | Casen Doors approves; developer implements |
| Late client inputs | Track missing inputs and receipt dates; determine actual start date from the source terms | Casen Doors + developer |
| Scope growth | Link requested additions to the baseline; obtain a separate scope/time/fee decision before committing | Both |

## Next implementation session

Read docs/DEVELOPMENT.md and evidence/2026-09-28-first-slice.md, inspect the implementation, and preserve completed T02 work. Next: adapt the PDF when the sample arrives and obtain the development store/app ownership details needed for T03/T05. Continue missing catalogue/photo/rule work with fixtures while access is pending. Do not deploy the local fixture API. Record actual verification and the next concrete action before ending each session.

## Latest implementation update

17 October 2026: added three Casen-branded design concepts (Signature, Architectural, Studio), a comparison page and a client screenshot/offline-presentation package. All use shared selection/pricing/PDF behaviour. Typecheck, lint, preview/theme builds, 10 domain/service tests and 4 existing browser regression checks passed. Three mobile concepts have no horizontal overflow at 390 px. Client design selection is pending; production integration gates remain unchanged. See docs/DESIGN_CONCEPTS.md.

28 September 2026: initialized Git and npm workspaces; built React UI, fixture catalogue, shared rules/pricing, local Node/PDF service, Shopify template/section and bundle scripts. Added setup instructions and evidence. Typecheck/lint/build/theme build pass; 10 domain/service tests and 4 Chromium desktop/mobile-sized tests pass. Sample PDF visually inspected after correcting title/date spacing. No store changes, hosting/storage provisioning or real emails. PDF sample reminder delivered this afternoon; sample still pending. T02 is complete; production-dependent tickets and full acceptance remain open.
