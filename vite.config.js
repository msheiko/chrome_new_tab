import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = (path) => fileURLToPath(new URL(path, import.meta.url));
const readJson = (path) => JSON.parse(readFileSync(root(path), 'utf8'));

// Версия расширения берётся из package.json, чтобы не поддерживать её в двух местах
function extensionManifest() {
  return {
    name: 'extension-manifest',
    buildStart() {
      this.addWatchFile(root('./manifest.json'));
    },
    generateBundle() {
      const manifest = {
        ...readJson('./manifest.json'),
        version: readJson('./package.json').version,
      };
      this.emitFile({
        type: 'asset',
        fileName: 'manifest.json',
        source: JSON.stringify(manifest, null, 2) + '\n',
      });
    },
  };
}

export default defineConfig({
  plugins: [vue(), extensionManifest()],
  build: {
    rolldownOptions: {
      input: root('./newtab.html'),
      output: {
        entryFileNames: 'js/[name].[hash].js',
        chunkFileNames: 'js/[name].[hash].js',
        assetFileNames: (assetInfo) =>
          assetInfo.names.some((name) => name.endsWith('.css'))
            ? 'css/[name].[hash][extname]'
            : 'assets/[name].[hash][extname]',
      },
    },
    cssCodeSplit: false,
  },
  server: {
    port: 3000,
    open: false,
  },
  test: {
    include: ['src/**/*.test.js'],
  },
});
