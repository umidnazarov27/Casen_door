import { validateCatalogue } from '@casen/domain';

const layouts = ['l-shape', 'galley', 'single', 'u-shape'];
const image = (name: string) => `/client-assets/kitchen-set-01/${name}.jpg`;
// Zero amounts are schema placeholders only. Pending pricing blocks all estimates
// and quotations. Compatibility is permissive for review, not approved for sale.
const option = { price: 0, active: true, layoutIds: layouts };

export const clientCatalogue = validateCatalogue({
  revision: 'client-set-01-2026-11-03', demo: true, pricingStatus: 'pending',
  productTitle: 'Kitchen Collection', currency: 'GBP', vatBasisPoints: 0, vatTreatment: 'exclusive',
  referenceImage: image('layout-l-shape'), detailImage: image('storage-drawer-organiser'),
  layouts: [
    { id: 'l-shape', family: 'l-shape', name: 'L-shaped', description: 'Two adjoining runs.', image: image('layout-l-shape') },
    { id: 'galley', family: 'galley', name: 'Galley', description: 'Two parallel runs.', image: image('layout-galley') },
    { id: 'single', family: 'single', name: 'Single wall', description: 'One continuous cabinet run.', image: image('layout-single-wall') },
    { id: 'u-shape', family: 'u-shape', name: 'U-shaped', description: 'Cabinetry on three sides.', image: image('layout-u-shape') },
  ].map(layout => ({ ...layout, price: 0, active: true, dimensions: 'Dimensions to be confirmed' })),
  islands: [
    { ...option, id: 'illuminated', name: 'Illuminated island', description: 'A statement island with an illuminated stone-effect panel.', image: image('island-illuminated') },
    { ...option, id: 'standard', name: 'Standard island', description: 'A dark, veined island without an illuminated panel.', image: image('island-standard') },
    { ...option, id: 'none', name: 'No island', description: 'Keep the centre of your kitchen open.' },
  ],
  carcasses: [
    { ...option, id: 'matte-black', name: 'Matte Black', description: 'Dark interior finish.', image: image('carcass-matte-black') },
    { ...option, id: 'gunmetal-grey', name: 'Gunmetal Grey', description: 'Grey interior finish.', image: image('carcass-gunmetal-grey') },
    { ...option, id: 'oak', name: 'Oak', description: 'Wood-tone interior finish.', image: image('carcass-oak') },
    { ...option, id: 'artificial-leather', name: 'Artificial Leather', description: 'Light, textured interior finish.', image: image('carcass-artificial-leather') },
  ],
  storage: [
    { ...option, id: 'swing-pantry', name: 'Swing-out pantry', description: 'Shelves that swing out with the door.', image: image('storage-swing-pantry') },
    { ...option, id: 'tall-pull-out', name: 'Tall pull-out', description: 'Full-height pull-out storage.', image: image('storage-tall-pull-out') },
    { ...option, id: 'spice-pull-out', name: 'Spice pull-out', description: 'Storage for bottles, jars and utensils.', image: image('storage-spice-pull-out') },
    { ...option, id: 'drawer-organiser', name: 'Drawer organiser', description: 'Compartments for plates and everyday utensils.', image: image('storage-drawer-organiser') },
  ],
});
