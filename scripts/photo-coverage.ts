/**
 * Photo coverage report: lists every reachable kitchen combination and whether it has a client-verified photo.
 *
 *   npm run report:photos                      # client collection → output/photo-coverage/<revision>/
 *   npm run report:photos -- --catalogue=demo  # demo catalogue
 *   npm run report:photos -- --strict          # exit 1 unless launch coverage is complete
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { enumerateCombinations, photoCoverage, type Catalogue, type CoverageRow } from '@casen/domain';
import { clientCatalogue } from '../fixtures/client-catalogue';
import { demoCatalogue } from '../fixtures/catalogue';

const args = new Map(process.argv.slice(2).map(arg => { const [key, value = 'true'] = arg.replace(/^--/, '').split('='); return [key, value]; }));
const catalogues: Record<string, Catalogue> = { client: clientCatalogue, demo: demoCatalogue };
const catalogue = catalogues[args.get('catalogue') ?? 'client'];
if (!catalogue) throw new Error(`Unknown catalogue. Use one of: ${Object.keys(catalogues).join(', ')}`);
const outDir = join(args.get('out') ?? 'output/photo-coverage', catalogue.revision);

const coverage = photoCoverage(catalogue);
const name = (options: { id: string; name: string }[], id: string) => options.find(item => item.id === id)?.name ?? id;
const storageNames = (row: CoverageRow) => row.storageIds.length ? row.storageIds.map(id => name(catalogue.storage, id)).join(' + ') : 'No storage';

// Spreadsheet-safe CSV: quote every cell and neutralise leading formula characters.
const cell = (value: string) => `"${(/^[=+\-@]/.test(value) ? `'${value}` : value).replaceAll('"', '""')}"`;
const header = ['layout_id', 'layout', 'island_id', 'island', 'carcass_id', 'carcass', 'sorted_storage_ids', 'storage', 'combination_key', 'exact_photo_ref', 'approved_by_client', 'status'];
const csv = [header, ...coverage.rows.map(row => [
  row.layoutId, name(catalogue.layouts, row.layoutId), row.islandId, name(catalogue.islands, row.islandId),
  row.carcassId, name(catalogue.carcasses, row.carcassId), row.storageIds.join('+'), storageNames(row),
  row.key, row.image ?? '', row.status === 'verified' ? 'yes' : 'no', row.status,
])].map(line => line.map(cell).join(',')).join('\n');

// Discussion aids only: the same rules engine applied to alternative storage policies.
const scenarios: [string, Catalogue][] = [
  ['Current preview rules: storage optional, any mix of the storage options', catalogue],
  ['At most one storage option per kitchen', { ...catalogue, storage: catalogue.storage.map(item => ({ ...item, group: 'storage' })) }],
  ['Storage shown in its own photos, not in the full-kitchen photo', { ...catalogue, storage: [] }],
];

const perLayout = catalogue.layouts.filter(layout => layout.active).map(layout => {
  const rows = coverage.rows.filter(row => row.layoutId === layout.id);
  const distinct = (pick: (row: CoverageRow) => string) => new Set(rows.map(pick)).size;
  return `| ${layout.name} | ${distinct(row => row.islandId)} | ${distinct(row => row.carcassId)} | ${distinct(row => row.storageIds.join('+'))} | ${rows.length} | ${rows.filter(row => row.status === 'missing').length} |`;
});

const summary = `# Photo coverage: ${catalogue.productTitle ?? 'Kitchen'} (${catalogue.revision})

Generated ${new Date().toLocaleDateString('en-CA')} by \`npm run report:photos\`. Regenerate after any catalogue or rule change.

**Launch photo coverage: ${coverage.launchReady ? 'COMPLETE' : 'NOT COMPLETE'}.** The specification requires a client-verified photo for every complete combination a customer can choose.

| | Count |
|---|---:|
| Combinations a customer can choose | ${coverage.total} |
| Client-verified photo | ${coverage.verified} |
| Photo supplied, awaiting client check | ${coverage.unverified} |
| No photo | ${coverage.missing} |
| Photos mapped to a combination that cannot be chosen | ${coverage.unmatchedPhotos.length} |

## Where the number comes from

| Layout | Islands | Carcasses | Storage selections | Combinations | Missing photos |
|---|---:|---:|---:|---:|---:|
${perLayout.join('\n')}

Storage selections include choosing no storage.${catalogue.demo ? ' This catalogue still uses placeholder compatibility: every option is allowed with every layout. Confirmed client rules will change these numbers.' : ''}

## Options to discuss with the client

These use the same rules engine with a different storage policy. None of them is agreed; the third would change the specification's photo requirement.

| Storage policy | Combinations needing a photo |
|---|---:|
${scenarios.map(([label, item]) => `| ${label} | ${enumerateCombinations(item).length} |`).join('\n')}

## Files

- \`photo-checklist.csv\`: one row per combination, with IDs, names, the combination key, the photo reference and status. Columns follow the photo manifest in docs/CLIENT_INPUTS.md.
${coverage.unmatchedPhotos.length ? `\n## Photos that match no reachable combination\n\n${coverage.unmatchedPhotos.map(photo => `- \`${photo.key}\` → ${photo.image}`).join('\n')}\n` : ''}`;

await mkdir(outDir, { recursive: true });
await writeFile(join(outDir, 'photo-checklist.csv'), `${csv}\n`);
await writeFile(join(outDir, 'README.md'), summary);
console.log(`${catalogue.revision}: ${coverage.verified} of ${coverage.total} combinations have a client-verified photo (${coverage.unverified} awaiting check, ${coverage.missing} missing, ${coverage.unmatchedPhotos.length} unmatched).`);
console.log(`Wrote ${join(outDir, 'README.md')} and photo-checklist.csv`);
if (args.has('strict') && !coverage.launchReady) process.exitCode = 1;
