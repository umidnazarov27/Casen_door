# Local development

The first implementation is a local fixture-backed prototype. It does not connect to Shopify, send email or retain quotations across server restarts. Do not deploy the fixture API.

## Run

Use Node 24 (pinned in `.nvmrc`) and npm 11.9.0. Dependencies are locked in package-lock.json.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:5173. The frontend proxies `/api` and `/demo-assets` to the local API on 127.0.0.1:3001. Both processes start together. Ctrl-C stops them. Frontend edits reload; restart `npm run dev` after changes to the local API, shared server logic or PDF renderer.

If the bundled Codex Node runtime is needed on this computer:

```sh
PATH='/Users/umidnazarov/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin':"$PATH" npm run dev
```

This path is a local convenience, not a deployment dependency. No environment secrets are required for this demo.

## Commands

| Command | Result |
|---|---|
| `npm run typecheck` | Strict TypeScript validation |
| `npm run lint` | ESLint and React hook checks |
| `npm test` | Domain and local quotation-service tests |
| `npm run test:integration` | Local PDF/service integration checks |
| `npx playwright install chromium` | Install the matching test browser on first setup |
| `npm run test:e2e` | Desktop and Pixel-sized Chromium flows; starts server if needed |
| `npm run build` | Build local-preview frontend under dist/preview |
| `npm run build:theme` | Generate JS/CSS for the Shopify Liquid section |
| `npm run validate:catalogue` | Validate the demo schema; explicitly reports unverified launch photo coverage |
| `npm run sample:pdf` | Generate output/pdf/casen-demo-quotation.pdf |

The preview build still needs its local fixture API. It is not a ready-to-deploy static site. The theme bundle contains no fixture catalogue and needs a real app proxy/backend before it works on Shopify. See [shopify/README.md](../shopify/README.md).

## What works now

- Four steps with fixed demo dimensions, layout/island compatibility, storage additions and carcass choices.
- Shared domain validation, selection invalidation and integer minor-unit price/VAT calculation for the demo policy.
- Responsive reference gallery and keyboard-closeable modal.
- Server-generated PDF without email entry, scoped download token and duplicate-request reuse.
- Shopify page template/section and standalone bundle generation, not installed or verified in Shopify.

## Deliberate prototype limits

- GBP, 20% exclusive VAT, all prices/dimensions and compatibility are fixtures, not approved business rules. Current schema does not yet support negative carcass adjustments or other tax policies/currencies.
- Images come from the supplied design prototype and are always labelled references. Exact-combination mappings, generic fallback chains and launch coverage are not implemented.
- The demo catalogue is a local adapter; real Metaobjects import/pagination/publication remain pending.
- Quotation files/state live in process memory, with a 100-request safety cap; links expire after one hour and all links stop working after restart. Restart the local server to reset the demo store. Commercial 90-day validity is printed separately and does not imply file retention.
- PDF layout is provisional pending the user's sample. Dates currently use UTC calendar dates; production timezone policy is unconfirmed.
- Email is explicitly disabled and collects no contact details. Resend integration, personalized PDF review and delivery recovery remain pending.
- App installation/authentication, proxy verification, persistent PostgreSQL/private files, rate limiting, production error/status handling and deployment remain pending.
- No real Safari/Firefox/Edge/iOS/Android-device acceptance has occurred; mobile automation uses a Chromium viewport/device emulation.

## Next implementation work

1. Adapt the PDF layout when the sample arrives; retain the source-required content and notice.
2. Obtain/audit the development store and app ownership/access model, then implement the Shopify catalogue adapter and authenticated proxy endpoints.
3. Confirm service ownership, storage/retention and sender setup before production persistence/email integration.
4. Complete exact-photo mapping/coverage, remaining content states and the full acceptance matrix.

Test evidence and current blockers: [first implementation verification](../evidence/2026-09-28-first-slice.md).
