import { useEffect, useState } from 'react';
import { validateCatalogue, type Catalogue } from '@casen/domain';
import { Configurator } from './Configurator';
import styles from './Configurator.module.css';

export function App({ apiBase }: { apiBase: string }) {
  const [catalogue, setCatalogue] = useState<Catalogue | null>(null);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    fetch(`${apiBase}/catalogue`, { signal: controller.signal }).then(async response => {
      if (!response.ok) throw new Error('Catalogue is unavailable. Please try again.');
      setCatalogue(validateCatalogue(await response.json()));
    }).catch(error => { if (!controller.signal.aborted) setError(error instanceof Error ? error.message : 'Unable to load catalogue'); });
    return () => controller.abort();
  }, [apiBase, attempt]);
  return <div className={styles.root}>
    <header className={styles.header}><a href="#casen-configure" className={styles.wordmark}>CASEN<span>DOORS</span></a><span className={styles.headerNote}>The kitchen collection</span></header>
    {!catalogue && <div className={styles.loadState} aria-live="polite">{error ? <><p>{error}</p><button onClick={() => { setError(''); setAttempt(value => value + 1); }}>Try again</button></> : 'Preparing your kitchen options…'}</div>}
    {catalogue && <Configurator key={catalogue.revision} catalogue={catalogue} apiBase={apiBase} />}
  </div>;
}
