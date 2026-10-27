import { resolveSelection } from './configuration';
import type { Catalogue, Selection } from './schema';

export const REQUIRED_NOTICE = 'This is a provisional quotation with a 90-day validity period from issue, subject to confirmation by Casen Doors staff. Shipping is not included at this stage and will be calculated on the final invoice. Please contact our staff for the final confirmed quotation and confirmation of its validity.';
export const REFERENCE_LABEL = 'Reference image — not the exact selected combination';

export function calculatePrice(catalogue: Catalogue, selection: Selection, requireComplete = true) {
  const resolved = resolveSelection(catalogue, selection, requireComplete);
  const items = [resolved.layout, resolved.island, ...resolved.storage, resolved.carcass].filter(item => item !== null);
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const vat = Math.round(subtotal * catalogue.vatBasisPoints / 10000);
  return { subtotal, vat, total: subtotal + vat, currency: catalogue.currency, vatBasisPoints: catalogue.vatBasisPoints };
}

export function formatMoney(minorUnits: number, currency = 'GBP') {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency, minimumFractionDigits: minorUnits % 100 === 0 ? 0 : 2 }).format(minorUnits / 100);
}

export function createQuotation(catalogue: Catalogue, selection: Selection, issuedAt: Date) {
  const resolved = resolveSelection(catalogue, selection);
  const expiresAt = new Date(issuedAt);
  expiresAt.setUTCDate(expiresAt.getUTCDate() + 90);
  const items = [resolved.layout, resolved.island, ...resolved.storage, resolved.carcass].filter(item => item !== null);
  return {
    demo: catalogue.demo, catalogueRevision: catalogue.revision,
    issuedOn: issuedAt.toISOString().slice(0, 10), expiresOn: expiresAt.toISOString().slice(0, 10),
    selection: structuredClone(selection),
    lines: items.map(item => ({ name: item.name, amount: item.price })),
    dimensions: [resolved.layout.dimensions, resolved.island?.dimensions].filter((value): value is string => Boolean(value)),
    price: calculatePrice(catalogue, selection), image: catalogue.referenceImage,
    imageLabel: REFERENCE_LABEL, notice: REQUIRED_NOTICE,
  };
}
export type Quotation = ReturnType<typeof createQuotation>;
