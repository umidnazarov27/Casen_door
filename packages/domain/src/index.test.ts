import { describe, expect, it } from 'vitest';
import { calculatePrice, changeSelection, configurationSchema, createQuotation, initialSelection, validateCatalogue } from './index';
import { demoCatalogue } from '../../../fixtures/catalogue';

const complete = { layoutId: 'single', islandId: 'none', storageIds: [], carcassId: 'white' };

describe('configuration and quotation rules', () => {
  it('calculates base + island + storage + carcass using integer minor units', () => {
    const price = calculatePrice(demoCatalogue, { ...complete, layoutId: 'l-shape', islandId: 'compact', storageIds: ['cutlery'], carcassId: 'oak' });
    expect(price.subtotal).toBe(1_259_000);
    expect(price.vat).toBe(251_800);
    expect(price.total).toBe(1_510_800);
  });
  it('keeps valid choices and removes an incompatible island when the layout changes', () => {
    const result = changeSelection(demoCatalogue, { ...complete, layoutId: 'l-shape', islandId: 'compact', storageIds: ['cutlery'] }, { type: 'layout', id: 'single' });
    expect(result.selection).toEqual({ ...complete, islandId: null, storageIds: ['cutlery'] });
    expect(result.notices.length).toBeGreaterThan(0);
  });
  it('rejects incomplete and incompatible quotations', () => {
    expect(() => createQuotation(demoCatalogue, initialSelection, new Date('2026-09-28T00:00:00Z'))).toThrow();
    expect(() => calculatePrice(demoCatalogue, { ...complete, islandId: 'compact' })).toThrow(/compatible/);
  });
  it('rejects duplicate storage IDs and unknown fields such as a supplied total', () => {
    expect(configurationSchema.safeParse({ ...complete, storageIds: ['cutlery', 'cutlery'] }).success).toBe(false);
    expect(configurationSchema.safeParse({ ...complete, total: 1 }).success).toBe(false);
  });
  it('does not interpret a missing catalogue price as zero', () => {
    const broken = structuredClone(demoCatalogue);
    Reflect.deleteProperty(broken.layouts[0], 'price');
    expect(() => validateCatalogue(broken)).toThrow();
  });
  it('issues a fixed snapshot with a 90-day expiry and reference-image label', () => {
    const quote = createQuotation(demoCatalogue, complete, new Date('2026-12-15T00:00:00Z'));
    expect(quote.expiresOn).toBe('2027-03-15');
    expect(quote.imageLabel).toContain('not the exact selected combination');
    expect(quote.demo).toBe(true);
    expect(quote.lines[0].name).toBe('Single wall');
    expect(quote.price.total).toBe(960_000);
  });
  it('rejects unknown option IDs instead of falling back to a default', () => {
    expect(() => calculatePrice(demoCatalogue, { ...complete, layoutId: 'toString' })).toThrow();
  });
});
