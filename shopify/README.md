# Shopify integration scaffold

Run `npm run build:theme` to generate the JS/CSS referenced by the Liquid section. Template and section are scaffolding only: no Shopify store has been audited, no app/proxy installed and no files uploaded.

The section requests its catalogue and quotation endpoints from its configured app proxy path. It has no embedded fixture catalogue, API credentials or local-server URL. A missing backend produces a retryable catalogue error. Do not deploy until the trusted Shopify adapter, proxy verification, durable quotation services and client catalogue are ready.

The demo API is deliberately local-only, uses memory for quotations, and must not be deployed. App registration, authentication, proxy configuration, theme compatibility/CLI validation and section load/unload behaviour still require a real development store. The custom template preserves the parent theme layout; the component is scoped to its own root.
