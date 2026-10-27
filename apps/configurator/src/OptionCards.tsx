import { formatMoney, isCompatible, type Catalogue, type Selection, type SelectionChange, type Layout } from '@casen/domain';
import styles from './Configurator.module.css';

function LayoutIcon({ family }: { family: Layout['family'] }) {
  const paths = { single: 'M12 20H68V32H12Z', 'l-shape': 'M16 10V45H66V33H28V10Z', 'u-shape': 'M10 10V45H70V10H58V33H22V10Z', galley: 'M10 12H70V24H10ZM10 36H70V48H10Z' };
  return <svg viewBox="0 0 80 60" className={styles.layoutIcon} aria-hidden="true"><path d={paths[family]} /></svg>;
}

export function OptionCards({ step, catalogue, selection, onChange, disabled, className = '' }: { step: number; catalogue: Catalogue; selection: Selection; onChange: (change: SelectionChange) => void; disabled: boolean; className?: string }) {
  if (step === 0) return <fieldset className={`${styles.options} ${className}`} disabled={disabled}><legend className={styles.srOnly}>Layout</legend>
    {catalogue.layouts.filter(item => item.active).map(item => <label key={item.id} className={`${styles.card} ${selection.layoutId === item.id ? styles.selected : ''}`}>
      <input type="radio" name="layout" checked={selection.layoutId === item.id} onChange={() => onChange({ type: 'layout', id: item.id })} />
      <LayoutIcon family={item.family} /><strong>{item.name}</strong><span>{item.description}</span><small>{item.dimensions}</small><b>{formatMoney(item.price)} base</b>
    </label>)}
  </fieldset>;
  const options = step === 1 ? catalogue.islands : step === 2 ? catalogue.storage : catalogue.carcasses;
  const type = step === 1 ? 'island' : step === 2 ? 'storage' : 'carcass';
  return <fieldset className={`${styles.listOptions} ${className}`} disabled={disabled}><legend className={styles.srOnly}>{type}</legend>
    {options.filter(item => item.active).map(item => {
      const selected = type === 'storage' ? selection.storageIds.includes(item.id) : type === 'island' ? selection.islandId === item.id : selection.carcassId === item.id;
      const compatible = isCompatible(item, selection.layoutId);
      return <label key={item.id} className={`${styles.listCard} ${selected ? styles.selected : ''} ${!compatible ? styles.unavailable : ''}`}>
        <input type={type === 'storage' ? 'checkbox' : 'radio'} name={type} checked={selected} disabled={!compatible} onChange={() => onChange({ type, id: item.id })} />
        {item.swatch && <span className={styles.swatch} style={{ background: item.swatch }} aria-hidden="true" />}
        <span className={styles.optionText}><strong>{item.name}</strong><span>{item.description}</span>{item.dimensions && <small>{item.dimensions}</small>}{!compatible && <small>Unavailable with this layout</small>}</span>
        <b>{item.price ? `+${formatMoney(item.price)}` : 'Included'}</b>
      </label>;
    })}
  </fieldset>;
}
