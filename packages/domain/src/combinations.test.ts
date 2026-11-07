import { describe, expect, it } from 'vitest';
import { combinationKey, enumerateCombinations, photoCoverage, resolveSelection, validateCatalogue, type Catalogue } from './index';
import { demoCatalogue } from '../../../fixtures/catalogue';
import { clientCatalogue } from '../../../fixtures/client-catalogue';

const withPhotos = (catalogue: Catalogue, photos: Catalogue['combinationPhotos']) => validateCatalogue({ ...catalogue, combinationPhotos: photos });

describe('combination enumeration', () => {
  it('counts the demo catalogue using its layout compatibility', () => {
    // single/galley: 1 island × 2 carcasses × 4 storage sets; l-shape/u-shape: 2 × 2 × 8.
    expect(enumerateCombinations(demoCatalogue)).toHaveLength(8 + 32 + 32 + 8);
  });
  it('counts the client collection: 4 layouts × 3 islands × 4 carcasses × 16 storage sets', () => {
    expect(enumerateCombinations(clientCatalogue)).toHaveLength(768);
  });
  it('produces only unique selections that the quotation rules accept', () => {
    for (const catalogue of [demoCatalogue, clientCatalogue]) {
      const combinations = enumerateCombinations(catalogue);
      expect(new Set(combinations.map(item => item.key)).size).toBe(combinations.length);
      for (const { key, ...selection } of combinations) {
        expect(() => resolveSelection(catalogue, selection)).not.toThrow();
        expect(combinationKey(selection)).toBe(key);
      }
    }
  });
  it('keys ignore storage selection order and mark no storage explicitly', () => {
    const selection = { layoutId: 'l-shape', islandId: 'none', carcassId: 'oak', storageIds: ['recycling', 'cutlery'] };
    expect(combinationKey(selection)).toBe('l-shape|none|oak|cutlery+recycling');
    expect(combinationKey({ ...selection, storageIds: ['cutlery', 'recycling'] })).toBe(combinationKey(selection));
    expect(combinationKey({ ...selection, storageIds: [] })).toBe('l-shape|none|oak|-');
    expect(() => combinationKey({ ...selection, carcassId: null })).toThrow();
  });
  it('allows at most one storage option from an exclusive group', () => {
    const grouped = validateCatalogue({ ...clientCatalogue, storage: clientCatalogue.storage.map(item => ({ ...item, group: 'storage' })) });
    expect(enumerateCombinations(grouped)).toHaveLength(4 * 3 * 4 * 5);
  });
  it('skips inactive layouts and options', () => {
    const reduced = validateCatalogue({
      ...clientCatalogue,
      layouts: clientCatalogue.layouts.map(item => ({ ...item, active: item.id !== 'galley' })),
      islands: clientCatalogue.islands.map(item => ({ ...item, active: item.id !== 'standard' })),
    });
    expect(enumerateCombinations(reduced)).toHaveLength(3 * 2 * 4 * 16);
  });
  it('rejects IDs that would make combination keys ambiguous', () => {
    expect(() => validateCatalogue({ ...demoCatalogue, carcasses: [{ ...demoCatalogue.carcasses[0], id: 'oak|white' }] })).toThrow();
    expect(() => validateCatalogue({ ...demoCatalogue, carcasses: [{ ...demoCatalogue.carcasses[0], id: '-' }] })).toThrow();
  });
});

describe('photo coverage', () => {
  it('reports every combination missing when no combination photos exist', () => {
    const coverage = photoCoverage(clientCatalogue);
    expect(coverage).toMatchObject({ total: 768, verified: 0, unverified: 0, missing: 768, launchReady: false });
  });
  it('separates verified, unverified, missing and unmatched photos', () => {
    const [first, second] = enumerateCombinations(demoCatalogue);
    const coverage = photoCoverage(withPhotos(demoCatalogue, [
      { key: first.key, image: '/photos/a.jpg', clientVerified: true },
      { key: second.key, image: '/photos/b.jpg', clientVerified: false },
      { key: 'single|compact|white|-', image: '/photos/c.jpg', clientVerified: true },
    ]));
    expect(coverage).toMatchObject({ total: 80, verified: 1, unverified: 1, missing: 78, launchReady: false });
    expect(coverage.unmatchedPhotos.map(photo => photo.key)).toEqual(['single|compact|white|-']);
    expect(coverage.rows[0]).toMatchObject({ image: '/photos/a.jpg', status: 'verified' });
  });
  it('is launch-ready only when every combination has a verified photo and nothing is unmatched', () => {
    const photos = enumerateCombinations(demoCatalogue).map(item => ({ key: item.key, image: `/photos/${item.key}.jpg`, clientVerified: true }));
    expect(photoCoverage(withPhotos(demoCatalogue, photos)).launchReady).toBe(true);
    expect(photoCoverage(withPhotos(demoCatalogue, [...photos, { key: 'galley|compact|oak|-', image: '/x.jpg', clientVerified: true }])).launchReady).toBe(false);
  });
  it('rejects two photos for the same combination', () => {
    const [first] = enumerateCombinations(demoCatalogue);
    const photo = { key: first.key, image: '/photos/a.jpg', clientVerified: true };
    expect(() => withPhotos(demoCatalogue, [photo, photo])).toThrow(/Duplicate combination photo/);
  });
});
