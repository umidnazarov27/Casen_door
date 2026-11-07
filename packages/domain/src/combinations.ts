import { isCompatible } from './configuration';
import type { Catalogue, CombinationPhoto, Option, Selection } from './schema';

/** Guard against a catalogue whose storage rules would produce an unmanageable photo list. */
export const MAX_COMBINATIONS = 100_000;
const NO_STORAGE = '-';

export type Combination = { key: string; layoutId: string; islandId: string; carcassId: string; storageIds: string[] };
export type PhotoStatus = 'verified' | 'unverified' | 'missing';
export type CoverageRow = Combination & { image: string | null; status: PhotoStatus };

/**
 * Stable key for a complete selection, in step order: layout|island|carcass|storage.
 * Storage IDs are sorted so the order of selection never matters; '-' means no storage.
 */
export function combinationKey(selection: Selection) {
  const { layoutId, islandId, carcassId } = selection;
  if (!layoutId || !islandId || !carcassId) throw new Error('A combination needs a layout, island and carcass');
  const storage = [...selection.storageIds].sort();
  return [layoutId, islandId, carcassId, storage.length ? storage.join('+') : NO_STORAGE].join('|');
}

/** Every storage selection allowed by the rules: optional, any mix, at most one per exclusive group. */
function storageSelections(options: Option[]) {
  let selections: Option[][] = [[]];
  for (const option of options) {
    selections = selections.flatMap(selection => option.group && selection.some(item => item.group === option.group) ? [selection] : [selection, [...selection, option]]);
    if (selections.length > MAX_COMBINATIONS) throw new Error(`More than ${MAX_COMBINATIONS} storage selections; storage rules need limits`);
  }
  return selections.map(selection => selection.map(item => item.id).sort());
}

/**
 * Lists every complete selection a customer can reach, using the same compatibility rules as the configurator.
 * Order follows the steps: layout, island, carcass, then storage.
 */
export function enumerateCombinations(catalogue: Catalogue): Combination[] {
  const combinations: Combination[] = [];
  for (const layout of catalogue.layouts.filter(item => item.active)) {
    const compatible = (options: Option[]) => options.filter(option => isCompatible(option, layout.id));
    const storage = storageSelections(compatible(catalogue.storage));
    for (const island of compatible(catalogue.islands)) {
      for (const carcass of compatible(catalogue.carcasses)) {
        if (combinations.length + storage.length > MAX_COMBINATIONS) throw new Error(`More than ${MAX_COMBINATIONS} combinations`);
        for (const storageIds of storage) {
          const selection = { layoutId: layout.id, islandId: island.id, carcassId: carcass.id, storageIds };
          combinations.push({ ...selection, key: combinationKey(selection) });
        }
      }
    }
  }
  return combinations;
}

/**
 * Compares the reachable combinations with the catalogue's combination photos.
 * Launch needs every combination to have a client-verified photo and no photo mapped to an unreachable combination.
 */
export function photoCoverage(catalogue: Catalogue) {
  const photos = new Map(catalogue.combinationPhotos.map(photo => [photo.key, photo]));
  const combinations = enumerateCombinations(catalogue);
  const keys = new Set(combinations.map(item => item.key));
  const rows: CoverageRow[] = combinations.map(item => {
    const photo = photos.get(item.key);
    return { ...item, image: photo?.image ?? null, status: !photo ? 'missing' : photo.clientVerified ? 'verified' : 'unverified' };
  });
  const count = (status: PhotoStatus) => rows.filter(row => row.status === status).length;
  const unmatchedPhotos: CombinationPhoto[] = catalogue.combinationPhotos.filter(photo => !keys.has(photo.key));
  const verified = count('verified');
  return {
    total: rows.length, verified, unverified: count('unverified'), missing: count('missing'), unmatchedPhotos,
    launchReady: rows.length > 0 && verified === rows.length && unmatchedPhotos.length === 0,
    rows,
  };
}
export type PhotoCoverage = ReturnType<typeof photoCoverage>;
