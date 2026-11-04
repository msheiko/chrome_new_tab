import { describe, it, expect } from 'vitest';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import sites from './sites.json';

const publicDir = fileURLToPath(new URL('../../public', import.meta.url));

// Ошибки в sites.json иначе видны только глазами в браузере
describe('sites.json', () => {
  it.each(sites)('$title ($url) has valid fields', (site) => {
    expect(() => new URL(site.url)).not.toThrow();
    expect(site.title).toEqual(expect.any(String));
    expect(site.title.trim()).not.toBe('');
    expect(site.image).toMatch(/^\//);
    if ('group' in site) expect(site.group.trim()).not.toBe('');
  });

  it('references only existing logo files', () => {
    const missing = sites.map((s) => s.image).filter((img) => !existsSync(publicDir + img));
    expect(missing).toEqual([]);
  });

  it('has no duplicate urls', () => {
    const seen = new Set();
    const duplicates = sites.map((s) => s.url).filter((url) => seen.has(url) || !seen.add(url));
    expect(duplicates).toEqual([]);
  });
});
