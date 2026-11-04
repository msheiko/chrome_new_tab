import { describe, it, expect } from 'vitest';
import { buildLayout, folderPreview } from './layout.js';

const site = (url, extra = {}) => ({ url, image: `/img/${url}.png`, title: url, ...extra });

describe('buildLayout', () => {
  it('keeps ungrouped sites as standalone entries', () => {
    const a = site('a');
    expect(buildLayout([a])).toEqual([{ type: 'site', key: 'site:a', site: a }]);
  });

  it('collapses a group into one folder at the position of its first site', () => {
    const [a, b, c, d] = [
      site('a', { group: 'G' }),
      site('b'),
      site('c', { group: 'G' }),
      site('d'),
    ];
    const layout = buildLayout([a, b, c, d]);

    expect(layout.map((e) => e.key)).toEqual(['folder:G', 'site:b', 'site:d']);
    expect(layout[0]).toMatchObject({ type: 'folder', name: 'G', sites: [a, c] });
  });

  it('treats group names case-sensitively', () => {
    const layout = buildLayout([site('a', { group: 'Work' }), site('b', { group: 'work' })]);
    expect(layout.map((e) => e.key)).toEqual(['folder:Work', 'folder:work']);
  });
});

describe('folderPreview', () => {
  it('deduplicates by image and respects the limit', () => {
    const sites = [
      site('a', { image: '/x.png' }),
      site('b', { image: '/x.png' }),
      site('c'),
      site('d'),
      site('e'),
      site('f'),
    ];
    expect(folderPreview(sites).map((s) => s.url)).toEqual(['a', 'c', 'd', 'e']);
  });

  it('returns a single entry when all logos match', () => {
    const sites = [site('a', { image: '/x.png' }), site('b', { image: '/x.png' })];
    expect(folderPreview(sites)).toHaveLength(1);
  });
});
