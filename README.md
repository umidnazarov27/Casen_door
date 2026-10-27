# Casen Doors kitchen configurator

**Design review:** three interactive directions are ready at http://127.0.0.1:5173/designs after `npm run dev`. See [design concepts and client package](docs/DESIGN_CONCEPTS.md) for screenshots, offline presentation and current verification.

Delivery plan for the Shopify kitchen configurator described in MVP v1.3, dated 28 September 2026.

**Current status: first local prototype built and verified.** React/TypeScript/Vite renders the four-step configurator using labelled demo data. A local Node service validates selections and generates an actual quotation PDF. Shopify template/section assets build, but no store integration or deployment has occurred. Email is disabled; production catalogue, storage and service setup remain pending.

Run `npm ci` then `npm run dev` with Node 24. The preview is at http://127.0.0.1:5173. See [development setup and limitations](docs/DEVELOPMENT.md) and [verification evidence](evidence/2026-09-28-first-slice.md). Ten domain/service tests and four desktop/mobile-sized browser tests pass. The PDF layout is temporary while awaiting the user's sample.

## Start here

1. Read [PROJECT_PLAN.md](PROJECT_PLAN.md) for scope, milestones, dependencies and the next implementation task.
2. Follow [docs/IMPLEMENTATION_PLAN.md](docs/IMPLEMENTATION_PLAN.md) for the selected stack, repository layout, endpoints and T01–T13 build tickets.
3. Use [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for domain contracts and decisions to confirm during the Shopify audit.
4. Collect the information in [docs/CLIENT_INPUTS.md](docs/CLIENT_INPUTS.md).
5. Verify delivery against [docs/ACCEPTANCE.md](docs/ACCEPTANCE.md).
6. Use [CONTINUE_PROMPT.md](CONTINUE_PROMPT.md) to resume implementation in this folder.

The [source specification snapshot](docs/SOURCE_SPECIFICATION.md) preserves the full retrieved text. The [live Google Doc](https://docs.google.com/document/d/1Qnxm_5jpcCHkBK3l9TlQHbj7ZClYkmfxwr32wnYncBQ/edit?tab=t.0) is the source for checking later revisions; reconcile material changes explicitly.

## Delivery terms from the specification

- Fee: USD 2,000 for the described scope. Separate formal invoice; no invoice or payment has been verified here.
- Timeline: 6 weeks ±3 calendar days after receipt of all required Shopify access, photographs, catalogue information and pricing rules.
- Start date and launch date: not established. The schedule in the plan is relative to that input-complete date.
- Architecture, launch catalogue, compatibility, pricing/VAT, photographs, PDF/email content and optional features still require confirmation.

This folder contains plans and a local implementation. The selected production stack remains the development baseline; local results do not establish store compatibility, authorize service purchases or add client commitments.
