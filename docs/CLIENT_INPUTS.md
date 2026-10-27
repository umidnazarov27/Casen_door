# Client inputs and handoff checklist

Purpose: collect everything needed to complete the agreed scope. These items are not verified as received. The developer audits and implements; Casen Doors supplies or approves catalogue content, business rules, assets and wording.

## Required inputs

| Input | What to supply or confirm | Needed for | Status |
|---|---|---|---|
| Store access | Specific store URL, appropriate collaborator/development access, theme/source location, relevant app access | P1 audit | Not verified |
| Store safety | Preview method, current customizations, live-change approver and recoverable baseline | Integration and launch | Not verified |
| Brand and reference | Logo, approved brand assets/fonts if available, hero copy, accessible visual reference | UI and PDF | Not verified |
| Layout catalogue | IDs/names, families, descriptions, labelled fixed dimensions in mm, price, availability, display order | Layouts and pricing | Not verified |
| Islands | IDs/names, dimensions, prices, photos, dimension images, compatible layouts, no-island rules | Islands | Not verified |
| Storage | Names/descriptions, prices, photos, multi-select/exclusive groups, any minimum/maximum rules, compatibility | Storage | Not verified |
| Carcasses | Names/descriptions, named swatches, photos, price adjustments and compatibility | Carcass | Not verified |
| Business pricing | Currency, prices/modifiers, agreed extras if any, VAT treatment/rates/rounding, worked examples | Accurate quotation | Not verified |
| Final-combination photos | Mapping for every valid layout/island/storage/carcass combination; confirmed depiction and approved assets | Launch photo coverage | Not verified |
| Other imagery | Full-kitchen/detail views, dimension images, approved generic/fallback references | Galleries and failures | Not verified |
| Quotation content | PDF/email branding, wording, staff contact details if desired; confirm required notice and personalization flow | Final PDF/email | Not verified |
| Services | Available hosting/email capabilities, sender setup, service-account owner, ongoing costs, authorized test recipient | PDF/email operation | Not verified |
| Operational choices | Quote file/link retention, contact-data retention, issue/expiry timezone, failure/retry owner | Reliable delivery | Not verified |
| Optional launch features | Yes/no for refresh recovery, analytics integration, storage preview switching | Optional scope | Not verified |

Use secure account access and environment secret management. Do not put passwords, API keys or tokens in this folder's planning files.

## Suggested catalogue handoff

Accept a spreadsheet/CSV or existing Shopify records with stable IDs and asset references. Confirm final format during the audit; this is a suggested interchange structure, not a demand for a new admin system.

- Layouts: `id, name, family, description, dimensions_mm, base_price, currency, active, display_order`
- Islands: `id, name, description, dimensions_mm, price, photo_ref, dimension_image_ref, active, display_order`
- Storage: `id, name, description, price, photo_ref, selection_group, active, display_order`
- Carcasses: `id, name, description, price_modifier, swatch_name, swatch_value, reference_photo_ref, active, display_order`
- Compatibility: records linking allowed/blocked selections, no-island eligibility and storage group constraints.
- Photo manifest: `layout_id, island_id_or_none, sorted_storage_ids, carcass_id, exact_photo_ref, approved_by_client`
- Additional assets: `asset_id, view_type, asset_ref, alt_text, approved_reference_or_exact`

Represent dimensions with meaningful labels for the preset shape rather than assuming all kitchens fit one width/depth pair. Do not introduce customer dimension entry.

## Pricing examples to approve

Provide at least one basic layout without an island (where valid), one with an island/storage/carcass adjustment, and one VAT/rounding edge case. For each, show the expected components, tax treatment and final total. Include a confirmed zero-cost option if one exists; do not invent it.

## Input-complete record

- Required Shopify access received and working: pending.
- Required catalogue, compatibility and pricing rules received: pending.
- Required photographs and other client inputs received: pending.
- Contractual start date based on required input receipt: unset.
- Target delivery date: unset; calculate as six weeks from the established start, with the specification's ±3-calendar-day allowance.
- Architecture and live integration approval: pending.

Record dates and source references as inputs arrive. Missing content may allow demo development but cannot be represented as launch-ready.

## Client review package

Before requesting the live launch decision, provide a working preview, mobile/desktop evidence, representative final PDFs, controlled email evidence, photo coverage report, acceptance results, catalogue editing walkthrough and rollback procedure. Request a decision about that concrete release, and reuse any sufficient authorization already given.
