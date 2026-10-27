import { validateCatalogue } from '@casen/domain';

const all = ['single', 'l-shape', 'u-shape', 'galley'];
export const demoCatalogue = validateCatalogue({
  revision: 'demo-v1', demo: true, currency: 'GBP', vatBasisPoints: 2000, vatTreatment: 'exclusive',
  referenceImage: '/demo-assets/kitchen-reference.png', detailImage: '/demo-assets/storage-reference.png',
  layouts: [
    { id: 'single', family: 'single', name: 'Single wall', description: 'A considered, single cabinet run.', dimensions: 'Main run 3,000 mm · depth 600 mm', price: 800000, active: true },
    { id: 'l-shape', family: 'l-shape', name: 'L-shaped', description: 'Two adjoining runs, room to gather.', dimensions: 'Runs 3,000 × 2,400 mm · depth 600 mm', price: 980000, active: true },
    { id: 'u-shape', family: 'u-shape', name: 'U-shaped', description: 'Three sides of thoughtfully placed storage.', dimensions: 'Runs 2,400 / 3,000 / 2,400 mm · depth 600 mm', price: 1200000, active: true },
    { id: 'galley', family: 'galley', name: 'Galley', description: 'Two parallel runs, everything within reach.', dimensions: 'Two 3,000 mm runs · depth 600 mm each', price: 1050000, active: true },
  ],
  islands: [
    { id: 'none', name: 'No island', description: 'Keep the centre of your kitchen open.', price: 0, active: true, layoutIds: all },
    { id: 'compact', name: 'Compact island', description: 'A little more room to prepare and gather.', dimensions: 'Island 1,600 × 900 × 900 mm', price: 150000, active: true, layoutIds: ['l-shape', 'u-shape'] },
  ],
  storage: [
    { id: 'cutlery', name: 'Cutlery organiser', description: 'A dedicated place for everyday utensils.', price: 9000, active: true, layoutIds: all },
    { id: 'corner', name: 'Corner pull-out', description: 'Easy access to the deepest corner.', price: 42000, active: true, layoutIds: ['l-shape', 'u-shape'] },
    { id: 'recycling', name: 'Recycling centre', description: 'Concealed, separated everyday recycling.', price: 24000, active: true, layoutIds: all },
  ],
  carcasses: [
    { id: 'white', name: 'Warm white', description: 'A clean, quiet interior finish.', swatch: '#eeeae0', price: 0, active: true, layoutIds: all },
    { id: 'oak', name: 'Natural oak', description: 'Warm wood tones inside every cabinet.', swatch: '#b58f63', price: 120000, active: true, layoutIds: all },
  ],
});
