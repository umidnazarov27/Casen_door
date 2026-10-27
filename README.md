# Casen Doors kitchen configurator

Kitchen configurator for the existing Casen Doors Shopify storefront. Customers choose a preset layout, island, storage and carcass, review an estimated price and generate a provisional quotation PDF. The planned production flow also supports a separately confirmed email copy.

This repository contains the application code, project plans, reference assets, design presentations and client follow-up materials.

## Current status

Updated: 27 October 2026.

- The local prototype includes all four selection steps, compatibility checks, sample pricing, a photo gallery and quotation PDF generation.
- The client selected **Option 01: Signature**. Three original design concepts remain available for reference.
- The full kitchen page structure is ready for review in Google Slides. A Google Sheets workbook collects catalogue information and page content.
- Shopify installation, the final catalogue and photographs, production storage, email delivery and launch acceptance remain open. Local prices, dimensions and reference images are demonstrative.
- The quotation PDF still needs the client's sample and approved content. The follow-up email is a draft, and client sharing/sending has not been recorded as complete.

## Working documents online

| Document | Purpose |
| --- | --- |
| [Casen doors project: original Google Doc](https://docs.google.com/document/d/1Qnxm_5jpcCHkBK3l9TlQHbj7ZClYkmfxwr32wnYncBQ/edit?tab=t.0) | Source specification and scope. Compare later revisions against the repository snapshot. |
| [Kitchen Page Structure Review: Google Slides](https://docs.google.com/presentation/d/1qCzrYw27e5IvWUgwNa8aZhk74VWfhHwr4wKNC7Aw0yI/edit?usp=drivesdk) | 14 editable slides with the proposed page order, reference screenshots and space for William's feedback. |
| [Kitchen Catalogue and Content: Google Sheets](https://docs.google.com/spreadsheets/d/1lrwlQ6gLtqJnYMTiylQ5GsbTbSMVQrNeyxvVWteor_E/edit?usp=drivesdk) | Seven tabs covering page content, options, compatibility, photo mapping, settings, pricing examples and actions. |
| [Meeting with William: Granola notes](https://notes.granola.ai/t/4ade12de-b629-402c-a375-4e67a93b7442-009c2hma) | Shared meeting notes used for the 25 October recap and follow-up requests. |
| [Client review files: Google Drive folder](https://drive.google.com/drive/folders/1sVcz3ygnWyTmL50zq1cPWXDlFhBczWpb) | The ChatGPT folder containing the prepared Google Slides and Google Sheets documents. |

Google documents and local exports are separate copies. Changes in Drive do not automatically update files in this repository. Document access follows the existing Google sharing permissions.

## Project documentation

| Document | Contents |
| --- | --- |
| [Project delivery plan](PROJECT_PLAN.md) | Scope, milestones, dependencies, current work packages and next implementation task. |
| [Implementation plan](docs/IMPLEMENTATION_PLAN.md) | Selected stack, repository layout, API contracts and T01–T13 build tickets. |
| [Architecture](docs/ARCHITECTURE.md) | Configuration state, catalogue contracts, pricing, quotations and Shopify integration decisions. |
| [Client inputs checklist](docs/CLIENT_INPUTS.md) | Required access, catalogue information, prices, images, wording and operational decisions. |
| [Acceptance checklist](docs/ACCEPTANCE.md) | The ten MVP acceptance criteria and the evidence required for delivery. |
| [Development guide](docs/DEVELOPMENT.md) | Local setup, commands, demo endpoints and known limitations. |
| [Source specification snapshot](docs/SOURCE_SPECIFICATION.md) | Captured MVP v1.3 specification dated 28 September 2026. |
| [Design concepts](docs/DESIGN_CONCEPTS.md) | Signature, Architectural and Studio concepts, review links, asset provenance and recorded checks. |
| [Meeting recap: 25 October](docs/MEETING_2026-10-25.md) | Page sections, option counts, responsibilities, timeline questions and follow-up document links. |
| [Continuation prompt](CONTINUE_PROMPT.md) | Instructions for resuming development while preserving the agreed scope and existing work. |
| [Shopify integration scaffold](shopify/README.md) | Theme template, section and asset build notes. |
| [Reference assets and fixtures](fixtures/README.md) | Source and limitations of the demonstration catalogue and images. |
| [Client follow-up package guide](output/client-followup-2026-10-25/README.md) | Prepared review documents, draft email and outstanding client decisions. |

The original specification remains the baseline. The meeting recap records additional page requests and open questions, including the admin interface, milestone dates and bedroom-page scope.

## Client presentations and files

### Original design options

| Material | File |
| --- | --- |
| **01 Signature: selected direction** | [PDF presentation](output/pdf/design-presentations/Casen_Doors_01_Signature.pdf) |
| 02 Architectural | [PDF presentation](output/pdf/design-presentations/Casen_Doors_02_Architectural.pdf) |
| 03 Studio | [PDF presentation](output/pdf/design-presentations/Casen_Doors_03_Studio.pdf) |
| All three PDF presentations | [ZIP package](output/casen-design-presentations.zip) |
| Offline comparison with desktop and mobile screenshots | [HTML source](output/client-designs/index.html) and [downloadable ZIP](output/casen-design-options.zip) |

Extract the offline ZIP and open `index.html` in a browser. GitHub displays the HTML source rather than running the presentation.

### Meeting follow-up

| Material | File |
| --- | --- |
| Page structure review exported for the Google Slides import | [PowerPoint presentation](output/client-followup-2026-10-25/Kitchen_Page_Review_Final.pptx) |
| Catalogue and content template used for the Google Sheets import | [Excel workbook](outputs/casen-followup-2026-10-25/Kitchen_Catalogue_and_Content.xlsx) |
| Consolidated request for materials and decisions | [Draft email to William](output/client-followup-2026-10-25/Email_to_William_DRAFT.md) |

Use the Google Slides and Google Sheets links above for ongoing client review. The local PowerPoint and Excel files preserve the prepared import versions.

### Prototype evidence

| Material | File |
| --- | --- |
| First local implementation record | [Verification notes](evidence/2026-09-28-first-slice.md) |
| Example provisional quotation using demo data | [PDF](output/pdf/casen-demo-quotation.pdf), [rendered image](evidence/sample-quotation.png) and [extracted text](evidence/sample-quotation.txt) |
| Desktop and mobile prototype views | [Desktop screenshot](evidence/desktop-preview.png) and [mobile screenshot](evidence/mobile-preview.png) |
| Three-concept comparison and responsive screenshots | [Screenshot folder](output/playwright/designs/) |

## Design references

- [Casen Doors website](https://casen-doors.com/): existing branding and storefront.
- [Door product page inspected for the follow-up](https://casen-doors.com/products/luxury-exterior-doors-casen-series-2): reference for feature images, colour downloads, alternating content, FAQ and reviews. Confirm that this is the exact page used during the call.
- [Original kitchen configurator reference](https://sig-kitchen-configurator.an225771202.chatgpt.site/): primary visual and interaction reference recorded in the specification.

## Run locally

Use Node 24. The pinned version is in [.nvmrc](.nvmrc).

```bash
npm ci
npm run dev
```

| Preview | Local URL |
| --- | --- |
| Original working prototype | [127.0.0.1:5173](http://127.0.0.1:5173/) |
| All design concepts | [Design comparison](http://127.0.0.1:5173/designs) |
| Selected design | [01 Signature](http://127.0.0.1:5173/designs/signature) |
| Alternative design | [02 Architectural](http://127.0.0.1:5173/designs/architectural) |
| Alternative design | [03 Studio](http://127.0.0.1:5173/designs/studio) |

Local links require the development server on the same machine. See the [development guide](docs/DEVELOPMENT.md) for API behaviour and limitations.

### Checks and builds

```bash
npm test
npm run typecheck
npm run lint
npm run build
npm run build:theme
npm run test:e2e
```

Use [package.json](package.json) for all commands and the [acceptance checklist](docs/ACCEPTANCE.md) for production verification. Local checks do not establish Shopify or email acceptance.

## Repository layout

| Path | Purpose |
| --- | --- |
| [apps/configurator](apps/configurator/) | React and TypeScript interface, design variants and preview assets. |
| [apps/api](apps/api/) | Local Node service for configuration validation and sample quotations. |
| [packages/domain](packages/domain/) | Shared catalogue schemas, compatibility, pricing and quotation snapshots. |
| [packages/pdf](packages/pdf/) | Quotation PDF renderer. |
| [shopify](shopify/) | Shopify theme template and section scaffold. |
| [fixtures](fixtures/) | Demonstration catalogue and reference photographs. |
| [docs](docs/) | Requirements, plans, design notes and meeting records. |
| [tests](tests/) | Domain/service integration and browser checks. |
| [scripts](scripts/) | Development, catalogue validation and PDF generation utilities. |
| [evidence](evidence/) | Recorded verification and screenshots. |
| [output](output/) | Client presentations, PDFs, offline packages and the draft email. |
| [outputs](outputs/) | The prepared Excel import workbook. |

Temporary build and render files in `tmp/`, dependencies, environment secrets and generated theme bundles are excluded from Git.

## Delivery terms from the specification

- Fee: USD 2,000 for the described scope. A separate formal invoice is required. Invoice/payment receipt has not been verified in this repository.
- Timeline: six weeks ±3 calendar days after receipt of all required Shopify access, photographs, catalogue information and pricing rules.
- The contractual start and launch dates remain unset. The November and January milestones in the meeting notes need clarification.
- Confirm the launch catalogue, compatibility, pricing/VAT, exact photographs, PDF/email content, infrastructure and optional features before final acceptance.
