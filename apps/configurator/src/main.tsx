import { createRoot, type Root } from 'react-dom/client';
import { lazy, Suspense } from 'react';
import { App } from './App';

const DesignReview = lazy(() => import('./designs/DesignReview'));

const roots = new Map<HTMLElement, Root>();
function mount(scope: ParentNode = document) {
  scope.querySelectorAll<HTMLElement>('[data-casen-configurator]').forEach(element => {
    if (roots.has(element)) return;
    const root = createRoot(element);
    roots.set(element, root);
    const apiBase = element.dataset.apiBase ?? '/apps/casen-configurator';
    const showDesignReview = element.dataset.designReview === 'true' && /^\/designs(?:\/|$)/.test(window.location.pathname);
    root.render(showDesignReview ? <Suspense fallback={<p>Загрузка вариантов…</p>}><DesignReview apiBase={apiBase} /></Suspense> : <App apiBase={apiBase} />);
  });
}
mount();
document.addEventListener('shopify:section:load', () => mount());
document.addEventListener('shopify:section:unload', event => {
  if (!(event.target instanceof HTMLElement)) return;
  const section = event.target;
  for (const [element, root] of roots) {
    if (section.contains(element)) { root.unmount(); roots.delete(element); }
  }
});
if (import.meta.hot) import.meta.hot.dispose(() => { roots.forEach(root => root.unmount()); roots.clear(); });
