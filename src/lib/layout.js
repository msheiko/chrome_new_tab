/**
 * @typedef {{ url: string, image: string, title: string, group?: string }} Site
 * @typedef {{ type: 'site', key: string, site: Site }} SiteEntry
 * @typedef {{ type: 'folder', key: string, name: string, sites: Site[] }} FolderEntry
 */

/**
 * Builds the top-level grid. Sites sharing a `group` collapse into one folder,
 * placed where the first site of that group appears.
 *
 * @param {Site[]} sites
 * @returns {(SiteEntry | FolderEntry)[]}
 */
export function buildLayout(sites) {
  const result = [];
  const folders = new Map();

  for (const site of sites) {
    if (!site.group) {
      result.push({ type: 'site', key: `site:${site.url}`, site });
      continue;
    }
    let folder = folders.get(site.group);
    if (!folder) {
      folder = { type: 'folder', key: `folder:${site.group}`, name: site.group, sites: [] };
      folders.set(site.group, folder);
      result.push(folder);
    }
    folder.sites.push(site);
  }

  return result;
}

/**
 * Up to `limit` sites with distinct logos, for a folder's preview.
 *
 * @param {Site[]} sites
 * @param {number} [limit]
 * @returns {Site[]}
 */
export function folderPreview(sites, limit = 4) {
  const byImage = new Map();
  for (const site of sites) {
    if (!byImage.has(site.image)) byImage.set(site.image, site);
    if (byImage.size === limit) break;
  }
  return [...byImage.values()];
}
