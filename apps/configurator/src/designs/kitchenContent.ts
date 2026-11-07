import relatedProducts from './relatedProducts.json';

/** Draft page copy and source assets. Replace pending fields with client-approved content. */
export const kitchenImage = (name: string) => `/client-assets/kitchen-set-01/${name}.jpg`;

export const kitchenContent = {
  colourGuide: null as string | null,
  features: [
    { title: 'A layout for your space', description: 'Single wall, L-shaped, U-shaped or galley. Start with the arrangement that suits your room.', image: 'layout-l-shape' },
    { title: 'An island of your own', description: 'Explore the illuminated and standard island options, or keep your space open.', image: 'island-illuminated' },
    { title: 'Considered interiors', description: 'Choose from Matte Black, Gunmetal Grey, Oak and Artificial Leather finishes.', image: 'carcass-oak' },
    { title: 'Storage within reach', description: 'Explore pull-outs, pantry shelving and drawer organisation for everyday essentials.', image: 'storage-drawer-organiser' },
  ],
  specifications: [
    ['Carcass material', 'To be confirmed'], ['Carcass thickness', 'To be confirmed'],
    ['Cabinet door material', 'To be confirmed'], ['Cabinet door thickness', 'To be confirmed'],
    ['Preset dimensions', 'To be confirmed'], ['Hardware specification', 'To be confirmed'],
  ],
  benefits: [
    { title: 'Make room for everyday life', text: 'From the first coffee to a table full of friends, a kitchen has many roles. Begin with a layout that brings preparation, cooking and gathering together.', image: 'layout-u-shape', alt: 'U-shaped kitchen from the supplied collection' },
    { title: 'Keep the essentials close', text: 'Give plates, utensils and pantry ingredients their own place. Explore drawer organisers and pull-out storage as part of your kitchen configuration.', image: 'storage-drawer-organiser', alt: 'Drawer with plate and utensil compartments' },
    { title: 'Bring the details together', text: 'Explore the island and cabinet interior options alongside your chosen layout. See the individual finishes before discussing your final specification with the team.', image: 'island-illuminated', alt: 'Kitchen island with an illuminated panel' },
  ],
  showcase: [
    { title: 'A place to gather', text: 'An island-led arrangement from the supplied kitchen collection.', image: 'island-standard' },
    { title: 'Space on three sides', text: 'A U-shaped arrangement from the same collection.', image: 'layout-u-shape' },
  ],
  faqs: [
    { question: 'How do I start designing my kitchen?', answer: 'Choose a layout, then an island, carcass finish and storage options. Your choices remain selected as you move between the steps.' },
    { question: 'Can I choose a kitchen without an island?', answer: 'Yes. Select “No island” at the Island step. Final dimensions and compatibility will be confirmed with the team.' },
    { question: 'What materials and thicknesses are available?', answer: 'The standard specification will list the carcass and cabinet door materials, thicknesses and hardware. These details are awaiting confirmation for this collection.' },
    { question: 'How do I get a quotation?', answer: 'Once approved pricing is available, you will be able to open or download a provisional quotation after configuring your kitchen, without entering an email address. Pricing is not yet available in this preview.' },
    { question: 'Do the photographs show my complete configuration?', answer: 'The photographs show individual layouts, islands, carcass finishes and storage options. They do not show every selected combination together.' },
    { question: 'What about delivery, installation and care?', answer: 'Please discuss delivery, installation arrangements and care requirements with the Casen Doors team before placing an order. Shipping is excluded from the provisional quotation.' },
    { question: 'What does the kitchen guarantee cover?', answer: 'Guarantee cover for kitchens is set out in the Casen Doors terms and conditions, available from the Terms & conditions link at the bottom of this page.' },
  ],
  // Public storefront examples, not an approved recommendation rule. No copied prices.
  related: relatedProducts,
};
