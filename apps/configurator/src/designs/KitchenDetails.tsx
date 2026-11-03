import type { Catalogue } from '@casen/domain';
import s from './Designs.module.css';

export function KitchenDetails({ catalogue }: { catalogue: Catalogue }) {
  return <section className={s.collectionDetails} id="concept-details">
    <div className={s.collectionHeading}><p className={s.eyebrow}>THE COLLECTION / SET 01</p><h2>A place for every detail.</h2><p>Explore the layouts and interior finishes in this kitchen collection.</p></div>
    <div className={s.layoutShowcase}>{catalogue.layouts.map(layout => <article key={layout.id}>
      <img src={layout.image} alt={`${layout.name} kitchen`} loading="lazy" />
      <h3>{layout.name}</h3><p>{layout.description}</p>
    </article>)}</div>
    <div className={s.finishHeading}><h2>Consider the inside.</h2><p>Four interior finishes, each with its own character.</p></div>
    <div className={s.finishShowcase}>{catalogue.carcasses.map(finish => <article key={finish.id}>
      <img src={finish.image} alt={`${finish.name} cabinet interior`} loading="lazy" /><h3>{finish.name}</h3>
    </article>)}</div>
    <div className={s.collectionFaq}><div><p className={s.eyebrow}>GOOD TO KNOW</p><h2>Your kitchen, explained.</h2></div><div>
      <details><summary>Can I choose a kitchen without an island?</summary><p>Yes. Select “No island” at the Island step to keep the centre of the kitchen open.</p></details>
      <details><summary>Do the images show my complete configuration?</summary><p>Each image shows an individual layout, island, interior finish or storage option. They do not show every possible combination together.</p></details>
      <details><summary>When will prices and specifications be available?</summary><p>Prices and dimensions will be added once confirmed by Casen Doors. Cabinet materials, door thicknesses and detailed specifications are also awaiting confirmation.</p></details>
    </div></div>
  </section>;
}
