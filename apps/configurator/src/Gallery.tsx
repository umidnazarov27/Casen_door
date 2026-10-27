import { useEffect, useRef, useState } from 'react';
import { REFERENCE_LABEL, type Catalogue } from '@casen/domain';
import styles from './Configurator.module.css';

export function Gallery({ catalogue, className = '' }: { catalogue: Catalogue; className?: string }) {
  const [view, setView] = useState<'kitchen' | 'detail'>('kitchen');
  const [failedImages, setFailedImages] = useState<string[]>([]);
  const [enlarged, setEnlarged] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const src = view === 'kitchen' ? catalogue.referenceImage : catalogue.detailImage;
  const failed = failedImages.includes(src);
  useEffect(() => {
    if (enlarged) dialog.current?.showModal();
    if (!enlarged && dialog.current?.open) dialog.current.close();
  }, [enlarged]);
  const close = () => { setEnlarged(false); trigger.current?.focus(); };
  return <aside className={`${styles.gallery} ${className}`} aria-label="Kitchen reference gallery">
    <div className={styles.imageFrame}>
      {failed ? <div className={styles.placeholder}>Reference image unavailable.<br />Your configuration is still saved.</div> : <img className={styles.heroImage} src={src} alt={view === 'kitchen' ? 'Neutral kitchen with oak accents, shown as a reference only' : 'Internal drawer storage, shown as a reference only'} onError={() => setFailedImages(items => [...items, src])} />}
      {!failed && <button ref={trigger} className={styles.expand} aria-label="Enlarge reference image" onClick={() => setEnlarged(true)}>↗</button>}
      <span className={styles.imageTag}>REFERENCE VISUAL</span>
    </div>
    <p className={styles.referenceLabel}>{REFERENCE_LABEL}</p>
    <div className={styles.thumbnails}>
      <button aria-pressed={view === 'kitchen'} onClick={() => setView('kitchen')}><img src={catalogue.referenceImage} alt="" loading="lazy" />Full kitchen</button>
      <button aria-pressed={view === 'detail'} onClick={() => setView('detail')}><img src={catalogue.detailImage} alt="" loading="lazy" />Storage detail</button>
    </div>
    <div className={styles.galleryNote}><span>01 / A considered starting point</span><p>Choose your layout and the details that make it yours. Every quotation is reviewed by Casen Doors before confirmation.</p></div>
    <dialog ref={dialog} className={styles.lightbox} aria-label="Enlarged reference image" onCancel={close} onClose={close}>
      <button autoFocus onClick={close} aria-label="Close image">Close ×</button>
      <img src={src} alt="Enlarged kitchen reference, not the exact selected combination" />
      <p>{REFERENCE_LABEL}</p>
    </dialog>
  </aside>;
}
