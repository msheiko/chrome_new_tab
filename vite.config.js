import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'url';

export default defineConfig({
  plugins: [vue()],
  build: {
    rolldownOptions: {
      input: fileURLToPath(new URL('./newtab.html', import.meta.url)),
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
});
