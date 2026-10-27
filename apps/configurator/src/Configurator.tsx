import { formatMoney, REQUIRED_NOTICE, type Catalogue } from '@casen/domain';
import { useConfigurationFlow } from './useConfigurationFlow';
import { Gallery } from './Gallery';
import { OptionCards } from './OptionCards';
import styles from './Configurator.module.css';

const steps = ['Layout', 'Island', 'Storage', 'Carcass'];
const headings = ['Choose your layout', 'Make room for an island', 'A place for everything', 'Consider the inside'];
const descriptions = ['Start with the arrangement that works for your space. Each preset has fixed dimensions.', 'Add a little more preparation space, or leave the centre open.', 'Choose the details that bring order to everyday life. Storage additions are optional.', 'Select the interior finish for your cabinetry, then review your provisional quotation.'];

export function Configurator({ catalogue, apiBase }: { catalogue: Catalogue; apiBase: string }) {
  const { state, selection, step, busy, error, pdfUrl, title, price, canContinue, maxStep, layout, select, navigate, fileQuotation } = useConfigurationFlow(catalogue, apiBase);

  return <main id="casen-configure" className={styles.main}>
    {catalogue.demo && <div className={styles.demoBanner}>DEVELOPMENT PREVIEW <span>Demo prices, dimensions & VAT. Reference images only.</span></div>}
    <section className={styles.intro} aria-label="Introduction">
      <div><p className={styles.eyebrow}>THE KITCHEN COLLECTION</p><h1>A kitchen,<br /><em>considered.</em></h1></div>
      <p>Start with a layout. Make space for the details.<br />Explore your options and create a provisional quotation to discuss with Casen Doors.</p>
    </section>
    <div className={styles.workspace}>
      <Gallery catalogue={catalogue} />
      <section className={styles.panel} aria-label="Configure your kitchen">
        <nav className={styles.progress} aria-label="Configuration steps">
          {steps.map((name, index) => <button key={name} disabled={index > maxStep || busy} aria-current={step === index ? 'step' : undefined} onClick={() => navigate(index)}><span>{index < step ? '✓' : index + 1}</span>{name}</button>)}
        </nav>
        <div className={styles.stepContent}>
          <p className={styles.eyebrow}>STEP {step + 1} OF 4</p>
          <h2 ref={title} tabIndex={-1}>{headings[step]}</h2><p className={styles.description}>{descriptions[step]}</p>
          <div aria-live="polite">{state.notices.map(notice => <p key={notice} className={styles.notice}>{notice}</p>)}</div>
          <OptionCards step={step} catalogue={catalogue} selection={selection} onChange={select} disabled={busy} />
          {step === 3 && <div className={styles.summary}><p className={styles.eyebrow}>YOUR SELECTION</p><p>{layout?.name} · {catalogue.islands.find(item => item.id === selection.islandId)?.name}</p><small>{layout?.dimensions}</small><p>{selection.storageIds.length ? selection.storageIds.map(id => catalogue.storage.find(item => item.id === id)?.name).join(' · ') : 'No additional storage'}</p></div>}
          <div className={styles.actions}>{step > 0 && <button className={styles.back} disabled={busy} onClick={() => navigate(step - 1)}>Back</button>}
            {step < 3 && <button className={styles.primary} disabled={!canContinue || busy} onClick={() => navigate(step + 1)}>Continue to {steps[step + 1]} <span aria-hidden="true">→</span></button>}
            {step === 3 && <button className={styles.primary} disabled={!canContinue || busy} onClick={fileQuotation}>{busy ? 'Preparing PDF…' : 'File Quotation'} <span aria-hidden="true">↗</span></button>}
          </div>
          <div aria-live="polite">{error && <p role="alert" className={styles.notice}>{error}</p>}{pdfUrl && <div className={styles.success}><p>Your sample quotation is ready.</p><a href={pdfUrl} target="_blank" rel="noopener noreferrer">View / download PDF</a><small>If the new tab was blocked, use this link.</small></div>}</div>
          {step === 3 && <div className={styles.emailNote}><button disabled>Email My Quotation</button><small>Email delivery is not connected in this preview.</small></div>}
        </div>
        <div className={styles.priceBox}>
          <div><p className={styles.eyebrow}>{selection.carcassId && selection.islandId ? 'YOUR ESTIMATED PRICE' : 'CURRENT SELECTION'}</p><strong data-testid="total">{price ? formatMoney(price.total) : '—'}</strong><span>Including illustrative VAT · shipping excluded</span></div>
          <details><summary>View price breakdown</summary><dl><div><dt>Subtotal</dt><dd>{price ? formatMoney(price.subtotal) : '—'}</dd></div><div><dt>Illustrative VAT ({catalogue.vatBasisPoints / 100}%)</dt><dd>{price ? formatMoney(price.vat) : '—'}</dd></div></dl></details>
        </div>
      </section>
    </div>
    <footer className={styles.footer}><span className={styles.eyebrow}>BEFORE YOU MAKE IT YOURS</span><p>{REQUIRED_NOTICE}</p>{catalogue.demo && <small>Development preview · PDF layout will be updated when the client sample arrives.</small>}</footer>
  </main>;
}
