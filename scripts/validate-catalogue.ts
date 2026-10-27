import { validateCatalogue } from '@casen/domain';
import { demoCatalogue } from '../fixtures/catalogue';
const catalogue = validateCatalogue(demoCatalogue);
console.log(`Valid demo schema: ${catalogue.layouts.length} layouts, ${catalogue.islands.length} islands, ${catalogue.storage.length} storage options, ${catalogue.carcasses.length} carcasses.`);
console.log('Launch coverage: NOT VERIFIED. No exact-combination photographs are configured.');
