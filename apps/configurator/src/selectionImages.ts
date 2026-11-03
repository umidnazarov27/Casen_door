import type { Catalogue, Selection } from '@casen/domain';

export type GalleryImage = { src: string; label: string };

/** Option photography is shown separately; it is never a rendered combination. */
export function selectionImages(catalogue: Catalogue, selection: Selection, step: number): GalleryImage[] {
  const layout = catalogue.layouts.find(item => item.id === selection.layoutId);
  const options = [catalogue.layouts, catalogue.islands, catalogue.carcasses, catalogue.storage][step];
  const selectedIds = [[selection.layoutId], [selection.islandId], [selection.carcassId], selection.storageIds][step];
  const images = options.filter(item => item.active && (item.image || item.id === 'none'))
    .map(item => ({ src: item.image ?? layout?.image ?? catalogue.referenceImage, label: item.name, selectionOrder: selectedIds.lastIndexOf(item.id) }))
    .sort((a, b) => b.selectionOrder - a.selectionOrder);
  return images.length ? images : [{ src: catalogue.referenceImage, label: 'Kitchen reference' }];
}
