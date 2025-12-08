import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve, dirname, join } from 'path';
import { existsSync, renameSync } from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'rename-index',
      closeBundle() {
        const distPath = resolve(__dirname, 'dist');
        const indexPath = join(distPath, 'index.html');
        const newtabPath = join(distPath, 'newtab.html');
        
        if (existsSync(indexPath)) {
          renameSync(indexPath, newtabPath);
        }
      },
    },
  ],
  publicDir: 'public',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: resolve(__dirname, 'index.html'),
      output: {
        entryFileNames: 'js/[name].[hash].js',
        chunkFileNames: 'js/[name].[hash].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.css')) {
            return 'css/[name].[hash][extname]';
          }
          if (assetInfo.name.match(/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i)) {
            return 'img/[name][extname]';
          }
          return '[name].[hash][extname]';
        },
        manualChunks: undefined,
      },
    },
    cssCodeSplit: false,
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  server: {
    port: 3000,
    open: false,
  },
});

