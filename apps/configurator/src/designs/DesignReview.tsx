import { useEffect, useState } from 'react';
import { validateCatalogue, type Catalogue } from '@casen/domain';
import { concepts } from './concepts';
import { DesignPage } from './DesignPage';
import logo from './assets/casen-logo.svg';
import s from './Designs.module.css';

function readPreference() {
  try { return localStorage.getItem('casen-design-preference') ?? ''; }
  catch { return ''; }
}

export default function DesignReview({ apiBase }: { apiBase: string }) {
  const id = window.location.pathname.split('/')[2];
  const concept = concepts.find(item => item.id === id);
  const [preferred, setPreferred] = useState(readPreference);
  const [catalogue, setCatalogue] = useState<Catalogue | null>(null);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    document.title = concept ? `Casen Doors · ${concept.number} ${concept.name}` : 'Casen Doors · Three design directions';
    if (!concept) return;
    const controller = new AbortController();
    fetch(`${apiBase}/catalogue`, { signal: controller.signal }).then(async response => {
      if (!response.ok) throw new Error('Не удалось загрузить варианты кухни.');
      setCatalogue(validateCatalogue(await response.json()));
    }).catch(error => { if (!controller.signal.aborted) setError(error instanceof Error ? error.message : 'Ошибка загрузки'); });
    return () => controller.abort();
  }, [apiBase, concept, attempt]);

  function prefer() {
    if (!concept) return;
    setPreferred(concept.id);
    try { localStorage.setItem('casen-design-preference', concept.id); }
    catch { /* Selection remains visible for this session without persistent storage. */ }
  }

  if (!concept) return <div className={s.review}>
    <header className={s.reviewHeader}><img src={logo} alt="Casen Doors" /><a href="https://casen-doors.com/" target="_blank" rel="noreferrer">Сайт бренда ↗</a></header>
    <main className={s.reviewMain}>
      <p className={s.eyebrow}>KITCHEN CONFIGURATOR / DESIGN DIRECTIONS</p>
      <div className={s.reviewIntro}><h1>Один бренд.<br /><span>Три направления.</span></h1><p>Три варианта конфигуратора в стиле Casen Doors.<br />Откройте каждый, попробуйте настройки<br />и выберите подходящую подачу.</p></div>
      <div className={s.conceptCards}>{concepts.map(item => <article key={item.id} className={s.conceptCard}>
        <a href={`/designs/${item.id}`} className={s.cardImage} aria-label={`Открыть вариант ${item.number} ${item.name}`}><img src={`/design-previews/${item.id}.png`} alt={`Предпросмотр дизайна ${item.name}`} /><span>{item.number}</span></a>
        <div className={s.cardHeading}><h2>{item.name}</h2>{preferred === item.id && <span className={s.preferenceBadge}>Ваш выбор</span>}</div><h3>{item.nameRu}</h3><p>{item.description}</p><small>{item.detail}</small><a className={s.openConcept} href={`/designs/${item.id}`}>Открыть вариант {item.number}<span>↗</span></a>
      </article>)}</div>
      <div className={s.reviewFootnote}><p>Основа: фирменный логотип, шрифт Assistant, чёрно-белые элементы и крупные интерьерные фотографии Casen Doors.</p><p>Цены и размеры демонстрационные. Фото — референс; финальные изображения подставим после выбора дизайна.</p></div>
    </main>
  </div>;

  return <div className={s.designReview}>
    <div className={s.reviewBar}>
      <a href="/designs" className={s.backToReview}>← Все варианты</a>
      <nav aria-label="Дизайн-варианты">{concepts.map(item => <a key={item.id} href={`/designs/${item.id}`} aria-current={item.id === concept.id ? 'page' : undefined}><span>{item.number}</span> {item.name}</a>)}</nav>
      <button className={s.preferButton} onClick={prefer} aria-pressed={preferred === concept.id}>{preferred === concept.id ? '✓ Выбран' : 'Выбрать вариант'}</button>
    </div>
    {preferred === concept.id && <p className={s.preferenceMessage} role="status">Выбор сохранён в этом браузере. Сообщите нам номер варианта: {concept.number}.</p>}
    {catalogue ? <DesignPage key={concept.id} concept={concept} catalogue={catalogue} apiBase={apiBase} /> : <div className={s.loading} aria-live="polite">{error ? <><p>{error}</p><button onClick={() => { setError(''); setAttempt(value => value + 1); }}>Повторить</button></> : 'Загружаем конфигуратор…'}</div>}
  </div>;
}
