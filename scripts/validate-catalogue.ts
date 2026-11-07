import { photoCoverage, validateCatalogue } from '@casen/domain';
import { demoCatalogue } from '../fixtures/catalogue';
import { clientCatalogue } from '../fixtures/client-catalogue';

for (const raw of [demoCatalogue, clientCatalogue]) {
  const catalogue = validateCatalogue(raw);
  const coverage = photoCoverage(catalogue);
  console.log(`${catalogue.revision}: valid schema, ${catalogue.layouts.length} layouts, ${catalogue.islands.length} islands, ${catalogue.carcasses.length} carcasses, ${catalogue.storage.length} storage options.`);
  console.log(`  Launch photo coverage: ${coverage.launchReady ? 'COMPLETE' : 'NOT COMPLETE'} (${coverage.verified} of ${coverage.total} combinations client-verified, ${coverage.missing} missing). Details: npm run report:photos`);
}
