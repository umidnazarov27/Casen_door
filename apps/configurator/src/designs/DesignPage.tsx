import { formatMoney, REQUIRED_NOTICE, type Catalogue } from '@casen/domain';
import { Gallery } from '../Gallery';
import { OptionCards } from '../OptionCards';
import { configurationSteps, useConfigurationFlow } from '../useConfigurationFlow';
import type { Concept } from './concepts';
import logo from './assets/casen-logo.svg';
import s from './Designs.module.css';

const headings = ['Choose your layout', 'Add an island', 'Make space for more', 'The finishing touch'];
const descriptions = ['A starting point for your space. Choose from our preset kitchen arrangements.', 'A place to prepare, gather and share. Choose an island, or keep your space open.', 'Thoughtful storage for the things you use every day. Choose any additions you need.', 'Choose the interior finish of your cabinets, then create your provisional quotation.'];

export function DesignPage({ concept, catalogue, apiBase }: { concept: Concept; catalogue: Catalogue; apiBase: string }) {
  const flow = useConfigurationFlow(catalogue, apiBase);
  const { selection, step, busy, maxStep, title, layout, state, select, navigate, price, canContinue, fileQuotation, pdfUrl, error } = flow;
  return <div className={`${s.concept} ${s[concept.id]}`}>
    <div className={s.announcement}>CASEN DOORS <span>·</span> THE KITCHEN COLLECTION</div>
    <header className={s.brandHeader}>
      <a href="https://casen-doors.com/" target="_blank" rel="noreferrer"><img src={logo} alt="Casen Doors home" /></a>
      <nav aria-label="Brand navigation"><a href="https://casen-doors.com/" target="_blank" rel="noreferrer">Our collection</a><a href="#concept-configure" aria-current="page">Kitchens</a><a href="#concept-details">The details</a></nav>
      <a className={s.headerAction} href="#concept-configure">Create your kitchen <span>↗</span></a>
    </header>
    <main>
      <div className={s.pageIntro}><div><p className={s.eyebrow}>PERSONAL BY DESIGN</p><h1>{concept.headline.split('\n').map((line, index) => <span key={line} className={index ? s.secondLine : ''}>{line}</span>)}</h1></div><div className={s.introAside}><p>{concept.intro}</p><a href="#concept-configure">Explore the possibilities <span>↓</span></a></div></div>
      <div className={s.designWorkspace} id="concept-configure">
        <div className={s.visualArea}>
          <Gallery catalogue={catalogue} className={s.conceptGallery} />
          <div className={s.visualCaption}><span>THE CASEN KITCHEN</span><p>Beautiful from every angle.<br />Considered in every detail.</p><span className={s.visualCount}>01 — 02</span></div>
        </div>
        <section className={s.controls} aria-label="Configure your kitchen">
          <nav className={s.stepNav} aria-label="Configuration steps">{configurationSteps.map((name, index) => <button key={name} aria-label={`${name}, step ${index + 1}`} title={name} aria-current={step === index ? 'step' : undefined} disabled={index > maxStep || busy} onClick={() => navigate(index)}><span>{index < step ? '✓' : `0${index + 1}`}</span><b>{name}</b></button>)}</nav>
          <div className={s.controlBody}>
            <div className={s.stepHeading}><p className={s.eyebrow}>YOUR KITCHEN / STEP 0{step + 1}</p><span>0{step + 1} <i>/ 04</i></span></div>
            <h2 ref={title} tabIndex={-1}>{headings[step]}</h2><p className={s.stepDescription}>{descriptions[step]}</p>
            <div aria-live="polite">{state.notices.map(notice => <p key={notice} className={s.notice}>{notice}</p>)}</div>
            <OptionCards step={step} catalogue={catalogue} selection={selection} onChange={select} disabled={busy} className={s.options} />
            {step === 0 && <p className={s.optionHint}><span aria-hidden="true">↔</span> Preset dimensions shown in millimetres.</p>}
            {step === 3 && <div className={s.selectionSummary}><p className={s.eyebrow}>YOUR CONFIGURATION</p><p>{layout?.name} · {catalogue.islands.find(item => item.id === selection.islandId)?.name}</p><small>{layout?.dimensions}</small><p>{selection.storageIds.length ? selection.storageIds.map(id => catalogue.storage.find(item => item.id === id)?.name).join(' · ') : 'No storage additions'}</p></div>}
            <div className={s.purchaseArea}>
              <div className={s.estimate}><div><p className={s.eyebrow}>ESTIMATED TOTAL</p><strong data-testid="total">{price ? formatMoney(price.total) : '—'}</strong></div><small>Including illustrative VAT<br />Excluding shipping</small></div>
              <div className={s.navigation}>{step > 0 && <button className={s.backButton} disabled={busy} onClick={() => navigate(step - 1)}>Back</button>}<button className={s.continueButton} disabled={!canContinue || busy} onClick={step < 3 ? () => navigate(step + 1) : fileQuotation}>{step < 3 ? `Continue to ${configurationSteps[step + 1]}` : busy ? 'Preparing PDF…' : 'File Quotation'}<span aria-hidden="true">{step < 3 ? '→' : '↗'}</span></button></div>
              <p className={s.quoteHint}>{step < 3 ? 'Your selections stay with you at every step.' : 'View or download your quotation. No email required.'}</p>
            </div>
            <div aria-live="polite">{error && <p role="alert" className={s.notice}>{error}</p>}{pdfUrl && <div className={s.pdfSuccess}><p>Your quotation is ready.</p><a href={pdfUrl} target="_blank" rel="noreferrer">View / download PDF ↗</a><small>If the new tab was blocked, use this link.</small></div>}</div>
            {step === 3 && <div className={s.emailPlaceholder}><button disabled>Email My Quotation</button><small>Email delivery is not connected in this preview.</small></div>}
          </div>
          <div className={s.controlsFoot}><span>01 — 04</span><span>YOURS, DOWN TO THE DETAILS</span></div>
        </section>
      </div>
      <section className={s.details} id="concept-details"><p className={s.eyebrow}>THOUGHTFULLY PUT TOGETHER</p><div><article><span>01</span><h3>A layout for your life</h3><p>Start with a considered arrangement and make the details your own.</p></article><article><span>02</span><h3>Every detail, in view</h3><p>Explore storage, island options and the interior finish of your cabinetry.</p></article><article><span>03</span><h3>A clear next step</h3><p>Create a provisional quotation to discuss with the Casen Doors team.</p></article></div></section>
    </main>
    <footer className={s.brandFooter}><div><img src={logo} alt="Casen Doors" /><span>Considered spaces. Everyday living.</span><a href="https://casen-doors.com/" target="_blank" rel="noreferrer">Visit Casen Doors ↗</a></div><p>{REQUIRED_NOTICE}</p><small>Design concept {concept.number} · Demonstration prices, dimensions and VAT. Reference imagery; final-combination photos to be supplied.</small></footer>
  </div>;
}
