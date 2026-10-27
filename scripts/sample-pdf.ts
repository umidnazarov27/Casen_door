import { mkdir, writeFile } from 'node:fs/promises';
import { createDemoService } from '../apps/api/src/service';
const result = await createDemoService().create({
  catalogueRevision: 'demo-v1', requestKey: 'sample-pdf-generation',
  selection: { layoutId: 'l-shape', islandId: 'compact', storageIds: ['cutlery'], carcassId: 'oak' },
});
await mkdir('output/pdf', { recursive: true });
await writeFile('output/pdf/casen-demo-quotation.pdf', result.pdf);
console.log('Created output/pdf/casen-demo-quotation.pdf — demo layout awaiting client sample.');
