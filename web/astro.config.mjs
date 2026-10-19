import { defineConfig } from 'astro/config';
import { remarkOverit } from './src/lib/remark-overit.mjs';

export default defineConfig({
  site: 'https://vimecodelat.cz',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  // Žádné vložené skripty, aby platila přísná Content-Security-Policy (vercel.json).
  vite: { build: { assetsInlineLimit: 0 } },
  markdown: {
    remarkPlugins: [remarkOverit],
    smartypants: false,
  },
});
