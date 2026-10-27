import { configurationSchema, type Catalogue, type Selection, type Option } from './schema';

export const isCompatible = (option: Option, layoutId: string | null) => option.active && layoutId !== null && option.layoutIds.includes(layoutId);
export type SelectionChange = { type: 'layout' | 'island' | 'carcass' | 'storage'; id: string };

export function changeSelection(catalogue: Catalogue, current: Selection, change: SelectionChange) {
  const selection = structuredClone(configurationSchema.parse(current));
  const notices: string[] = [];
  if (change.type === 'layout') {
    if (!catalogue.layouts.some(item => item.id === change.id && item.active)) throw new Error('Unknown layout');
    selection.layoutId = change.id;
  }
  if (change.type === 'island') selection.islandId = findOption(catalogue.islands, change.id, selection.layoutId).id;
  if (change.type === 'carcass') selection.carcassId = findOption(catalogue.carcasses, change.id, selection.layoutId).id;
  if (change.type === 'storage') selection.storageIds = toggleStorage(catalogue, selection, change.id);
  if (selection.islandId && !catalogue.islands.some(item => item.id === selection.islandId && isCompatible(item, selection.layoutId))) {
    selection.islandId = null; notices.push('Your island is not compatible with this layout. Please choose another option.');
  }
  if (selection.carcassId && !catalogue.carcasses.some(item => item.id === selection.carcassId && isCompatible(item, selection.layoutId))) {
    selection.carcassId = null; notices.push('Please choose a compatible carcass finish.');
  }
  const compatibleStorage = selection.storageIds.filter(id => catalogue.storage.some(item => item.id === id && isCompatible(item, selection.layoutId)));
  if (compatibleStorage.length !== selection.storageIds.length) notices.push('Incompatible storage options were removed.');
  selection.storageIds = compatibleStorage;
  return { selection, notices };
}

function toggleStorage(catalogue: Catalogue, selection: Selection, id: string) {
  const option = findOption(catalogue.storage, id, selection.layoutId);
  if (selection.storageIds.includes(id)) return selection.storageIds.filter(key => key !== id);
  return [...selection.storageIds.filter(key => !option.group || catalogue.storage.find(item => item.id === key)?.group !== option.group), id];
}

export function findOption(options: Option[], id: string, layoutId: string | null) {
  const option = options.find(item => item.id === id);
  if (!option || !isCompatible(option, layoutId)) throw new Error('Option is unknown or not compatible with the selected layout');
  return option;
}

export function resolveSelection(catalogue: Catalogue, raw: Selection, requireComplete = true) {
  const selection = configurationSchema.parse(raw);
  const layout = catalogue.layouts.find(item => item.id === selection.layoutId && item.active);
  if (!layout) throw new Error('Choose a valid layout');
  if (requireComplete && (!selection.islandId || !selection.carcassId)) throw new Error('Complete all configuration steps');
  const island = selection.islandId ? findOption(catalogue.islands, selection.islandId, layout.id) : null;
  const carcass = selection.carcassId ? findOption(catalogue.carcasses, selection.carcassId, layout.id) : null;
  const storage = selection.storageIds.map(id => findOption(catalogue.storage, id, layout.id));
  const groups = storage.flatMap(item => item.group ? [item.group] : []);
  if (new Set(groups).size !== groups.length) throw new Error('Select only one storage option per exclusive group');
  return { layout, island, carcass, storage };
}
