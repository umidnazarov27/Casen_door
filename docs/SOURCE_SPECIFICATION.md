# Source specification — MVP v1.3

Read from the Google Doc on 28 September 2026. This is a text snapshot, not a reproduction of the original layout; table cells appear as separate paragraphs.

- Document: [Casen doors project](https://docs.google.com/document/d/1Qnxm_5jpcCHkBK3l9TlQHbj7ZClYkmfxwr32wnYncBQ)
- Revision at capture: `ANLCKQmOxFGALD1WATeLwtCw18c3JW43F73nP4RXlYDyxzpdm53eHLVevIPBED-i3B1bidzIXGUfttfWNuoCD-mtd8fh9DgH22xdzcFmsUc`
- If scope changes, retain this baseline and record the approved differences in the plan.

---

Casen Doors Kitchen Configurator

Technical Specification and Scope of Work

Shopify integration  |  MVP v1.3  |  28 September 2026  |  For approval

Build a kitchen configurator integrated into the existing Casen Doors Shopify storefront, using custom code where appropriate. Customers select a predefined layout, island, storage and carcass options, view client-supplied photographs and pricing, and generate a provisional PDF quotation with an optional emailed copy. Casen Doors supplies all photographs and preset dimensions.

Customer workflow Layout → Island → Storage → Carcass → File Quotation → View PDF in new tab → Optionally email a copy → Contact staff for confirmation.

1 Customer journey

Four configuration steps: Layout → Island → Storage → Carcass. Show progress, completed-step checkmarks, selected states and Back/Continue controls. Retain selections between steps and recalculate dependent options, photographs and price after changes.

Layout and island

Customers choose from Casen Doors approved layouts: straight/single wall, L-shaped, U-shaped and galley, subject to the launch catalogue. Show each preset’s name, photograph and fixed dimensions in millimetres while customers choose the layout. No customer measurement input, dimension validation, nearest-preset matching or mismatch warnings are required.

Provide approved island options and a no-island choice where permitted, with names, prices and compatibility. Show fixed island dimensions during selection, including a client-supplied dimension image as a secondary gallery image. Selecting an island updates price and photographs. Casen Doors supplies dimensions, images, options and compatibility rules.

Storage and carcass

Storage options show selection state, name, description, photograph and additional price, with multiple or mutually exclusive selection as required. Examples include cutlery organisers, corner/pantry pull-outs and recycling centres. Carcass options show name, description, swatch, reference photograph and price difference. Casen Doors supplies materials and compatibility rules.

2 Photographs and fallbacks

Map photographs to layout, island, storage, carcass and view type. Show full-kitchen and detail thumbnails where supplied. Every supported final combination must have a matching client-supplied photograph in its quotation PDF. Casen Doors supplies and identifies the photograph for each valid combination; verify complete coverage before launch.

If an exact photograph is missing or fails to load, show the selected layout with separate island/detail images, then an approved generic reference. Label it “Reference image — not the exact selected combination” on screen and in the PDF. For example, a kitchen without the chosen island is only a reference. Keep selections, prices and quotation controls working; show a placeholder if no image loads. Fallbacks do not fulfil the exact-photo requirement for launch.

Casen Doors supplies all photographs, dimension images and fallback assets. Manage replaceable image mappings through Shopify Files, product media or Metaobjects where suitable. Development may use placeholders. No 3D rendering will be used; photography and AI image generation are outside the development scope.

3 Pricing and customer quotation

Keep a running estimated price visible. Calculate: base layout preset price + selected island price + carcass adjustment + selected storage + any agreed extras. Casen Doors supplies all prices, modifiers and VAT rules; show the VAT treatment clearly.

Required notice on screen and PDF “This is a provisional quotation with a 90-day validity period from issue, subject to confirmation by Casen Doors staff. Shipping is not included at this stage and will be calculated on the final invoice. Please contact our staff for the final confirmed quotation and confirmation of its validity.”

Summary and confirmation

After Carcass, show layout/island dimensions, storage, carcass and estimated total with VAT treatment. The “File Quotation” button generates the provisional PDF and opens it in a new browser tab for viewing/download, without email entry. Separately offer “Email My Quotation”; collect and validate name and email only for that option, then request confirmation.

Create a branded PDF titled “Provisional Quotation”, including a photograph of the final selected combination, selected options, preset dimensions, price breakdown, VAT treatment, total excluding shipping, issue date, 90-day expiry and the notice above. Include the customer’s name when supplied. Email the same PDF on request after confirmation. PDF generation and optional email delivery are required MVP features.

Customers present the PDF to Casen Doors staff for confirmation; no automatic company copy or enquiry notification is required. Confirm PDF generation and email dispatch separately after success. Allow retries without losing selections; email failure must not block access to the generated PDF.

4 Shopify integration and content management

Integrate the configurator into the existing storefront and Casen Doors branding. Custom HTML, CSS, JavaScript and supporting code may be used through a custom section, dedicated page/template or embedded component. Confirm architecture, PDF generation and email delivery after auditing Shopify. A dedicated template is optional; existing products and store functionality must remain unaffected.

Maintain one configuration state containing the selected layout preset and fixed dimensions, island, storage, carcass and calculated price. Connect it to compatibility rules, photograph selection, pricing, summary and PDF/email delivery.

Data entity

Configurable information

Layout preset

ID, name, family, description, fixed dimensions, base price, photographs, compatible options, status

Island option

ID, name, description, fixed dimensions, price, photographs, dimension image, compatible layouts, status

Storage

ID, name, description, thumbnail/detail photograph, price, compatibility, status

Carcass

ID, name, description, swatch/reference photograph, price modifier, compatibility, status

Use Shopify Metafields/Metaobjects where suitable so Casen Doors can edit records, dimensions, prices, descriptions, availability, display order and image mappings without code. Support dimension images and complete-configuration photos; add options/assets without rebuilding the interface.

Hide or disable incompatible options. Remove invalidated selections, update price and photographs, and notify the customer where needed. Block invalid combinations from confirmation and quotations.

5 Interface and quality requirements

Use the refined product page linked below as the primary design and functionality reference, with the additions in this scope. Apply Casen Doors branding, large photographs, editorial typography and compact option cards. Casen Doors supplies or approves the introduction/hero copy.

Refined product page: https://sig-kitchen-configurator.an225771202.chatgpt.site/

Desktop: approximately 55–60% width for the main photograph, reference labels and thumbnails; 40–45% for step controls, options, price and CTA. Keep photographs visible during normal interaction. A sticky panel is recommended where suitable. Clicking the main photograph opens a responsive lightbox with close control and desktop Escape support.

Support desktop, tablet and mobile without horizontal scrolling. Mobile order: photograph, progress, options, price and CTA. A sticky bottom price/action area is recommended, changing from Continue to File Quotation at the final stage, with a separate email option.

Provide keyboard-operable controls, labelled fields, named material swatches, meaningful image alt text, reasonable contrast and visible focus/selected states. Do not rely on colour alone to indicate selection. Support current Chrome, Safari, Edge and Firefox, mobile Safari and Chrome for Android.

Load only required photographs initially; load relevant layout/island photographs on selection and lazy-load storage/detail views. Use Shopify CDN where applicable, responsive sizes and WebP/AVIF where automatically supported. Show skeleton/blurred loading placeholders and keep the interface responsive; do not load the entire library upfront.

Handle missing images, unavailable options, compatibility conflicts, invalid name/email, PDF/email failures and JavaScript errors where possible. Preserve selections for retry. If the browser blocks the new PDF tab, provide an explicit link to open it in a new tab or download it.

6 Recommended and optional additions

Confirm browser storage for refresh recovery, integration with existing analytics and automatic storage-preview switching for launch. Retention between configuration steps is required. The customer PDF and optional email capability are included in MVP.

Recommended analytics events: configurator_started, layout_selected, island_selected, storage_selected, carcass_selected, quotation_requested and quotation_email_sent. Confirm compatibility with the existing analytics system; record dispatch only after the email service accepts the message.

Door style, handle, worktop and appliance configuration may be considered as separately agreed extensions. The current flow uses preset layouts and their supplied photographs.

7 Outside the core MVP

Excluded unless separately agreed: customer measurement input and automatic dimension matching; separate collection/colour selection; real-time 3D/WebGL; drag-and-drop cabinetry; automatic cabinet/appliance placement; live AI generation; millimetre-accurate generated visuals; plumbing/gas detection; electrical planning; AR scanning; floorplan recognition; and automatic manufacturing/dimensional drawings.

Future phases may add deposits, approved-configuration checkout, Shopify Draft Orders, CRM integration, account-based saving, shareable URLs, abandonment analytics and funnel dashboards. Any production drawings and final technical checks are handled outside the configurator through the sales/design process.

8 Client inputs and delivery

Casen Doors supplies or approves the catalogue, layout/island dimensions and dimension images; photographs for every supported final combination and fallbacks; storage/carcass materials, swatches, descriptions, availability, prices and compatibility; base prices, modifiers and VAT rules; page copy; and PDF/email branding and wording.

Provide access to review the Shopify theme, custom sections/code, templates, Metafields/Metaobjects, apps and email capabilities. Confirm the integration approach before live-site changes. Placeholders may be used until client assets and prices are ready; final content replaces them without rewriting the interface.

Delivery sequence

1. Audit Shopify; confirm integration, PDF/email delivery; build responsive steps and configuration state.
 2. Add layout/island dimensions, storage, carcass, compatibility, photo switching, pricing and VAT.
 3. Add File Quotation, final-combination photos, new-tab PDF/download, notices and optional email; insert approved client content.
 4. Test devices/browsers, accessibility, compatibility, pricing, PDFs, emails, fallbacks and performance; launch.

9 Acceptance criteria

The MVP is complete when the following are demonstrated:

1. The configurator works within the existing Shopify storefront without disrupting other store functionality.

2. Customers complete Layout, Island, Storage and Carcass, return to earlier steps and retain selections.

3. Layout/island dimensions are visible during selection and in the summary/PDF; island dimension images are available. No customer measurement input or matching engine remains.

4. Every supported final combination has a matching supplied photo in its PDF. Thumbnails and lightbox work; missing images retain selections/prices and show clearly labelled references or placeholders.

5. Compatibility rules prevent invalid combinations and update affected selections, photographs and prices.

6. Screen and PDF pricing/VAT agree; both state shipping is excluded and calculated on the final invoice.

7. File Quotation opens the PDF in a new tab without email entry, with download access and blocked-tab recovery. Contents include the final-combination photo, options, dimensions, issue/expiry dates and staff-confirmation notice.

8. The optional email flow validates name/email and sends the PDF on confirmation. No copy is required for Casen Doors; customers contact staff for the final confirmed quotation and its validity.

9. The stated device/browser, accessibility, loading and error-handling requirements are met, including PDF/email failure recovery.

10. Client assets replace placeholders and the catalogue can expand without rebuilding the interface.

Approval items Confirm the integration approach, launch layouts/islands and dimensions, compatibility, pricing/VAT, client photographs, PDF/email content and optional features.

10 Project fee and timeline

Total project fee USD 2,000 for the scope described in this document.

Project invoicing The developer will provide a separate formal project invoice. On receipt, Casen Doors will arrange payment and proceed with the work.

Delivery timeline 6 weeks (±3 calendar days) after receipt of all required Shopify access, photographs, catalogue information and pricing rules from Casen Doors.
