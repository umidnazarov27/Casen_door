# Prompt for the next implementation session

Paste the text below into Codex while this project folder is selected. This is a reusable prompt; saving it does not start an autonomous run, create a scheduled task or authorize external messages by itself.

---

Implement the Casen Doors kitchen configurator in this workspace, following the delivery plan through verified completion.

First read README.md, PROJECT_PLAN.md, docs/DEVELOPMENT.md, evidence/2026-09-28-first-slice.md, docs/IMPLEMENTATION_PLAN.md, docs/SOURCE_SPECIFICATION.md, docs/ARCHITECTURE.md, docs/CLIENT_INPUTS.md and docs/ACCEPTANCE.md. Check for applicable AGENTS.md instructions, inspect current files and version-control state, and preserve existing work. T02 and a local fixture/PDF slice are already implemented. Resume from actual progress; do not recreate the workspace or treat a checkbox as sufficient evidence.

The source is MVP v1.3 dated 28 September 2026, for USD 2,000 and a six-week ±3-calendar-day delivery window beginning only after receipt of the required Shopify access, photographs, catalogue information and pricing rules. Do not invent a start date or change commercial commitments. If the live source has changed, inspect the differences and reconcile the scope rather than silently combining versions.

Build the required flow: Layout → Island → Storage → Carcass → File Quotation → new-tab PDF/download → separate optional confirmed email → customer contacts Casen Doors staff. Keep fixed dimensions, compatibility, editable catalogue content, client-supplied photographs, clear VAT/shipping treatment and the exact provisional-quotation notice. Every supported final combination needs a matching client-supplied PDF photograph for launch; fallbacks must be labelled and keep the interface working. No email entry may gate File Quotation. The email capability is a required MVP feature; no automatic company copy or enquiry notification is required.

Use the selected baseline: Shopify page template + Liquid section mounting React/TypeScript/Vite with CSS Modules; Shopify Metaobjects/media; Node/TypeScript backend on Vercel through an app proxy; React PDF; Resend; managed PostgreSQL for quote/dispatch state and private object storage for PDF files. Provider/account/cost decisions, app ownership/authentication and store feasibility still need verification. Do not reopen the stack choice without a concrete incompatibility. Follow T01–T13 in docs/IMPLEMENTATION_PLAN.md and record actual setup commands.

Start with the next incomplete work package. Adapt PDF styling when the user supplies the sample, and audit Shopify before committing to a production integration. If access is absent, continue missing rule/catalogue/photo functionality with labelled fixtures and replaceable adapters; T02 and the local PDF proof are complete. Prove deployed PDF generation, new-tab/download behaviour and email attachment delivery early. Never deploy the local fixture API. A duplicate unpublished theme does not by itself isolate app proxy/backend configuration; use the staging arrangement specified in the plan. Follow relevant installed skills when implementation requires them.

If access or client assets are missing, record exactly what is unavailable and continue independent local work using clearly labelled fixtures and replaceable adapters. Ask for the specific missing input when needed. Do not claim fixture work is production-ready or mock dispatch proves real delivery. Do not fabricate assets, VAT rules, permissions, catalogue relationships or successful tests.

Keep compatibility, pricing, photo selection, state, catalogue access, PDF and email responsibilities separate. Revalidate IDs and compatibility and recompute quotation prices from trusted data on the server. Snapshot the issued quotation so retries and email do not silently change it. Keep customer data and secrets out of public assets and logs. Add meaningful tests for rules, pricing, document content, stale state, retries and service errors; verify actual browser behaviour and inspect generated PDFs.

Do not add measurements/matching, separate collection/colour steps, 3D, AI imagery, checkout, Draft Orders, CRM, accounts, manufacturing drawings or public saved configurations. Refresh recovery, analytics and storage-preview switching require the optional-feature decision recorded in the plan. Do not create subagents or separate chats unless explicitly requested or required by applicable instructions.

Proceed autonomously with authorized local development and verification. Prepare a concrete preview, evidence and rollback plan before seeking any still-needed source-required integration/live-change approval. Reuse existing authorization. Do not send external correspondence or real test emails without authorization for the recipient/send. Do not install paid services or assume recurring costs are approved.

After each work session, update PROJECT_PLAN.md with status, changed files, tests actually run and results, known blockers, decisions and the next concrete task. Store verification artifacts in an evidence directory when available and link them from docs/ACCEPTANCE.md. Mark DONE only with supporting evidence.

Continue until the approved implementation is integrated, AC01–AC10 pass, exact-photo coverage is complete, launch is verified and client handover is delivered, or a specific dependency prevents further useful authorized progress. If blocked, state what is complete and the exact remaining input; do not call the project finished.
