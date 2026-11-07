import { z } from 'zod';

// IDs appear in combination keys, so they are limited to letters, digits, '-' and '_'.
const id = z.string().min(1).max(100).regex(/^[A-Za-z0-9][A-Za-z0-9_-]*$/, 'IDs may contain only letters, digits, hyphens and underscores');
const price = z.number().int().min(0).max(100_000_000);
const base = z.object({ id, name: z.string().min(1), description: z.string(), price, active: z.boolean(), image: z.string().optional() });
const layout = base.extend({ family: z.enum(['single', 'l-shape', 'u-shape', 'galley']), dimensions: z.string().min(1) });
/** Photograph of one complete kitchen combination, keyed by `combinationKey`. */
const combinationPhoto = z.object({ key: z.string().min(1).max(1000), image: z.string().min(1), clientVerified: z.boolean() }).strict();
const option = base.extend({ layoutIds: z.array(id).min(1), dimensions: z.string().optional(), swatch: z.string().optional(), group: z.string().optional() });
export const catalogueSchema = z.object({
  revision: id, demo: z.boolean(), pricingStatus: z.enum(['demo', 'pending', 'approved']).default('demo'), productTitle: z.string().optional(), currency: z.literal('GBP'),
  vatBasisPoints: z.number().int().min(0).max(10000), vatTreatment: z.literal('exclusive'),
  layouts: z.array(layout).min(1), islands: z.array(option).min(1), storage: z.array(option), carcasses: z.array(option).min(1),
  referenceImage: z.string().min(1), detailImage: z.string().min(1),
  combinationPhotos: z.array(combinationPhoto).default([]),
});
export type Catalogue = z.infer<typeof catalogueSchema>;
export type Option = z.infer<typeof option>;
export type Layout = z.infer<typeof layout>;
export type CombinationPhoto = z.infer<typeof combinationPhoto>;
export const configurationSchema = z.object({
  layoutId: id.nullable(), islandId: id.nullable(), carcassId: id.nullable(),
  storageIds: z.array(id).max(50).refine(ids => new Set(ids).size === ids.length, 'Duplicate storage selection'),
}).strict();
export type Selection = z.infer<typeof configurationSchema>;
export const initialSelection: Selection = { layoutId: null, islandId: null, storageIds: [], carcassId: null };

export function validateCatalogue(raw: unknown): Catalogue {
  const result = catalogueSchema.parse(raw);
  for (const records of [result.layouts, result.islands, result.storage, result.carcasses]) {
    if (new Set(records.map(item => item.id)).size !== records.length) throw new Error('Duplicate catalogue ID');
  }
  const layoutIds = new Set(result.layouts.map(item => item.id));
  for (const item of [...result.islands, ...result.storage, ...result.carcasses]) {
    if (item.layoutIds.some(key => !layoutIds.has(key))) throw new Error('Unknown layout reference');
  }
  if (new Set(result.combinationPhotos.map(photo => photo.key)).size !== result.combinationPhotos.length) throw new Error('Duplicate combination photo key');
  return result;
}
