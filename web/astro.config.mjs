import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import { remarkOverit } from './src/lib/remark-overit.mjs';
import { remarkRazitko } from './src/lib/remark-razitko.mjs';

export default defineConfig({
  site: 'https://vimecodelat.cz',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  // Žádné vložené skripty, aby platila přísná Content-Security-Policy (vercel.json).
  vite: { build: { assetsInlineLimit: 0 } },
  markdown: {
    remarkPlugins: [remarkOverit, remarkRazitko],
    smartypants: false,
  },
  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
});
