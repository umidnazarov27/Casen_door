import { useEffect, useState } from 'react';
import { validateCatalogue, type Catalogue } from '@casen/domain';
import { DesignPage } from './DesignPage';
import { concepts } from './concepts';
import s from './Designs.module.css';

/** The selected Signature page; the other concepts live only in the archive. */
export default function KitchenProductPage({ apiBase }: { apiBase: string }) {
  const [catalogue, setCatalogue] = useState<Catalogue | null>(null);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    document.title = 'Kitchen Collection | Casen Doors';
    fetch(`${apiBase}/catalogue?collection=client`, { signal: controller.signal }).then(async response => {
      if (!response.ok) throw new Error('Kitchen options are unavailable. Please try again.');
      setCatalogue(validateCatalogue(await response.json()));
    }).catch(error => {
      if (!controller.signal.aborted) setError(error instanceof Error ? error.message : 'Unable to load kitchen options.');
    });
    return () => controller.abort();
  }, [apiBase, attempt]);
  return <div className={s.designReview}>{catalogue
    ? <DesignPage key={catalogue.revision} concept={concepts[0]} catalogue={catalogue} apiBase={apiBase} />
    : <div className={s.loading} aria-live="polite">{error ? <><p role="alert">{error}</p><button onClick={() => { setError(''); setAttempt(value => value + 1); }}>Try again</button></> : 'Preparing your kitchen options…'}</div>
  }</div>;
}
