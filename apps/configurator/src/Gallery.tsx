import { useEffect, useRef, useState } from 'react';
import { REFERENCE_LABEL, type Catalogue } from '@casen/domain';
import type { GalleryImage } from './selectionImages';
import styles from './Configurator.module.css';

export function Gallery({ catalogue, className = '', images }: { catalogue: Catalogue; className?: string; images?: GalleryImage[] }) {
  const [view, setView] = useState(0);
  const entries = images ?? [{ src: catalogue.referenceImage, label: 'Full kitchen' }, { src: catalogue.detailImage, label: 'Storage detail' }];
  const current = entries[view] ?? entries[0];
  const caption = images ? `${current.label} — option image, not the complete selected combination` : REFERENCE_LABEL;
  const [failedImages, setFailedImages] = useState<string[]>([]);
  const [enlarged, setEnlarged] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const src = current.src;
  const failed = failedImages.includes(src);
  useEffect(() => {
    if (enlarged) dialog.current?.showModal();
    if (!enlarged && dialog.current?.open) dialog.current.close();
  }, [enlarged]);
  const close = () => { setEnlarged(false); trigger.current?.focus(); };
  return <aside className={`${styles.gallery} ${className}`} aria-label="Kitchen reference gallery">
    <div className={styles.imageFrame}>
      {failed ? <div className={styles.placeholder}>Reference image unavailable.<br />Your configuration is still saved.</div> : <img className={styles.heroImage} style={images ? { objectFit: 'contain' } : undefined} src={src} alt={current.label} onError={() => setFailedImages(items => [...items, src])} />}
      {!failed && <button ref={trigger} className={styles.expand} aria-label="Enlarge reference image" onClick={() => setEnlarged(true)}>↗</button>}
      <span className={styles.imageTag}>{images ? current.label : 'REFERENCE VISUAL'}</span>
    </div>
    <p className={styles.referenceLabel}>{caption}</p>
    <div className={styles.thumbnails}>
      {entries.map((entry, index) => <button key={`${entry.src}-${entry.label}`} aria-pressed={view === index} onClick={() => setView(index)}><img src={entry.src} alt="" loading="lazy" />{entry.label}</button>)}
    </div>
    <div className={styles.galleryNote}><span>01 / A considered starting point</span><p>Choose your layout and the details that make it yours. Every quotation is reviewed by Casen Doors before confirmation.</p></div>
    <dialog ref={dialog} className={styles.lightbox} aria-label="Enlarged reference image" onCancel={close} onClose={close}>
      <button autoFocus onClick={close} aria-label="Close image">Close ×</button>
      <img src={src} alt={`${current.label}, not the complete selected combination`} />
      <p>{caption}</p>
    </dialog>
  </aside>;
}
