import { describe, expect, it } from 'vitest';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { clientCatalogue } from '../../fixtures/client-catalogue';
import { DesignPage } from '../../apps/configurator/src/designs/DesignPage';
import { concepts } from '../../apps/configurator/src/designs/concepts';

describe('selected kitchen product page', () => {
  it('renders the nine page sections in order without a guarantee section, design selector or invented reviews', () => {
    const html = renderToStaticMarkup(createElement(DesignPage, { concept: concepts[0], catalogue: clientCatalogue, apiBase: '/api' }));
    const sections = ['concept-configure', 'features', 'colour-options', 'why-invest', 'previous-work', 'faq', 'reviews', 'related-products', 'site-footer'];
    const positions = sections.map(id => html.indexOf(`id="${id}"`));
    expect(positions.every(position => position >= 0)).toBe(true);
    expect(positions).toEqual([...positions].sort((a, b) => a - b));
    expect(html).not.toContain('Выбрать вариант');
    expect(html).not.toContain('5.0');
    expect(html).not.toContain('£');
    expect(html).toContain('Kitchen colour guide');
    expect(html).toContain('Download coming soon');
    expect(html).not.toContain('id="guarantee"');
    expect(html).not.toContain('10-year');
  });
});
