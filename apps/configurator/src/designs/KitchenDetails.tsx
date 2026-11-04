import type { Catalogue } from '@casen/domain';
import { kitchenContent as content, kitchenImage } from './kitchenContent';
import s from './KitchenPage.module.css';

function DocumentLink({ href, label }: { href: string | null; label: string }) {
  if (href) return <a className={s.outlineButton} href={href} target="_blank" rel="noreferrer">{label} <span aria-hidden="true">↓</span></a>;
  return <button className={s.outlineButton} disabled aria-label={`${label}: coming soon`}>Download coming soon <span aria-hidden="true">↓</span></button>;
}

function Features({ catalogue }: { catalogue: Catalogue }) {
  return <section id="features" className={s.section} aria-labelledby="features-title">
    <div className={s.heading}><p className={s.kicker}>DESIGNED AROUND YOU</p><h2 id="features-title">The details make the kitchen</h2></div>
    <div className={s.features}>{content.features.map(feature => <article key={feature.title}>
      <img src={kitchenImage(feature.image)} alt={feature.title} loading="lazy" />
      <h3>{feature.title}</h3><p>{feature.description}</p>
    </article>)}</div>
    <details className={s.specifications}>
      <summary>Standard specifications <span>Materials, thicknesses & dimensions</span></summary>
      <dl>{content.specifications.map(([name, value]) => <div key={name}><dt>{name}</dt><dd>{value}</dd></div>)}
        <div><dt>Interior finishes</dt><dd>{catalogue.carcasses.map(item => item.name).join(' · ')}</dd></div>
      </dl><p className={s.note}>Final materials and specifications will be confirmed before ordering.</p>
    </details>
  </section>;
}

function ColourOptions({ catalogue }: { catalogue: Catalogue }) {
  return <section id="colour-options" className={`${s.section} ${s.colours}`} aria-labelledby="colours-title">
    <div className={s.finishGrid}>{catalogue.carcasses.map(finish => <figure key={finish.id}><img src={finish.image} alt={`${finish.name} interior`} loading="lazy" /><figcaption>{finish.name}</figcaption></figure>)}</div>
    <div className={s.editorialText}><p className={s.kicker}>COLOUR & FINISH</p><h2 id="colours-title">Find your finish</h2><p>Explore the cabinet interiors shown in this collection. The kitchen colour guide will bring the available colour and finish details together in one place.</p><h3>Kitchen colour guide</h3><DocumentLink href={content.colourGuide} label="Download kitchen colour guide" /><p className={s.note}>The kitchen colour PDF is awaiting confirmation.</p></div>
  </section>;
}

function Benefits() {
  return <section id="why-invest" className={s.section} aria-labelledby="benefits-title">
    <div className={s.heading}><p className={s.kicker}>MORE THAN A PLACE TO COOK</p><h2 id="benefits-title">Why invest in a kitchen?</h2></div>
    <div className={s.editorialRows}>{content.benefits.map((block, index) => <article className={s.editorialRow} key={block.title}>
      <img src={kitchenImage(block.image)} alt={block.alt} loading="lazy" />
      <div className={s.editorialText}><p className={s.kicker}>0{index + 1} / EVERYDAY LIVING</p><h3>{block.title}</h3><p>{block.text}</p><a className={s.textLink} href="#concept-configure">Explore your options <span aria-hidden="true">↗</span></a></div>
    </article>)}</div>
  </section>;
}

function PreviousWork() {
  return <section id="previous-work" className={s.section} aria-labelledby="work-title">
    <div className={s.heading}><p className={s.kicker}>KITCHENS IN FOCUS</p><h2 id="work-title">Previous work</h2><p>Completed kitchen projects will be featured here. For this preview, explore imagery from the supplied collection.</p></div>
    <div className={s.editorialRows}>{content.showcase.map(project => <article className={s.editorialRow} key={project.title}>
      <div className={s.projectImage}><img src={kitchenImage(project.image)} alt={project.title} loading="lazy" /><span>COLLECTION IMAGE · PROJECT PHOTOGRAPHY TO FOLLOW</span></div>
      <div className={s.editorialText}><p className={s.kicker}>COLLECTION PREVIEW</p><h3>{project.title}</h3><p>{project.text}</p><a className={s.textLink} href="https://casen-doors.com/pages/contact" target="_blank" rel="noreferrer">Talk to us about your space ↗</a></div>
    </article>)}</div>
  </section>;
}

function Guarantee() {
  return <section id="guarantee" className={`${s.section} ${s.guarantee}`} aria-labelledby="guarantee-title">
    <div className={s.guaranteeMark} aria-hidden="true"><span>10</span><p>YEAR GUARANTEE</p><small>PROPOSED · TERMS TO BE CONFIRMED</small></div>
    <div className={s.editorialText}><p className={s.kicker}>CARE BEYOND THE DESIGN</p><h2 id="guarantee-title">Your kitchen guarantee</h2><p>A 10-year guarantee is proposed for this collection. Kitchen coverage, exclusions and functionality terms will be confirmed in the approved guarantee document.</p><h3>Functionality guarantee</h3><p>Full details of the applicable cover will be available before ordering.</p><DocumentLink href={content.guaranteeDocument} label="Download kitchen guarantee" /></div>
  </section>;
}

function FrequentlyAskedQuestions() {
  return <section id="faq" className={`${s.section} ${s.faq}`} aria-labelledby="faq-title">
    <div><p className={s.kicker}>HERE TO HELP</p><h2 id="faq-title">Frequently asked questions</h2><p>Still have a question?</p><a className={s.textLink} href="https://casen-doors.com/pages/contact" target="_blank" rel="noreferrer">Contact the team ↗</a></div>
    <div>{content.faqs.map(faq => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div>
  </section>;
}

function Reviews() {
  return <section id="reviews" className={`${s.section} ${s.reviews}`} aria-labelledby="reviews-title">
    <div className={s.heading}><p className={s.kicker}>FROM OUR CUSTOMERS</p><h2 id="reviews-title">Google Reviews</h2></div>
    <div className={s.reviewPlaceholder} data-casen-reviews-slot>
      <span className={s.googleWordmark} aria-label="Google"><i>G</i><i>o</i><i>o</i><i>g</i><i>l</i><i>e</i></span>
      <h3>Customer experiences</h3><p>Live customer reviews will appear here on the Casen Doors store.</p><span className={s.note}>Reviews are not connected in this preview.</span>
    </div>
  </section>;
}

function RelatedProducts() {
  return <section id="related-products" className={s.section} aria-labelledby="related-title">
    <div className={s.relatedHeading}><div><p className={s.kicker}>CONTINUE EXPLORING</p><h2 id="related-title">You may also like</h2></div><a className={s.textLink} href="https://casen-doors.com/collections/all-doors" target="_blank" rel="noreferrer">View all doors ↗</a></div>
    <div className={s.relatedGrid}>{content.related.map(product => <a key={product.href} href={product.href} target="_blank" rel="noreferrer"><img src={product.image} alt={product.title} loading="lazy" /><p className={s.kicker}>{product.category}</p><h3>{product.title}</h3><span className={s.textLink}>View product ↗</span></a>)}</div>
  </section>;
}

/** Section order follows slides 2–11 of Kitchen_Page_Review_Final.pptx. */
export function KitchenDetails({ catalogue }: { catalogue: Catalogue }) {
  return <div className={s.content} id="concept-details"><Features catalogue={catalogue} /><ColourOptions catalogue={catalogue} /><Benefits /><PreviousWork /><Guarantee /><FrequentlyAskedQuestions /><Reviews /><RelatedProducts /></div>;
}
