// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://tulnic.ro',
  // Păstrează spațiile dintre text și linkurile aflate pe rânduri diferite, ca în HTML.
  compressHTML: true,
  // Generează la build sitemap-index.xml și sitemap-0.xml, cu toate paginile site-ului.
  integrations: [sitemap()],
  // Fonturile din design system. Astro le descarcă la build și le servește de pe site.
  fonts: [
    {
      // Titluri și numele Tulnic
      provider: fontProviders.google(),
      name: 'Zilla Slab',
      cssVariable: '--font-heading',
      weights: [600, 700],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['serif'],
    },
    {
      // Textul; font variabil, un singur fișier pentru greutățile 400–700
      provider: fontProviders.google(),
      name: 'Figtree',
      cssVariable: '--font-body',
      weights: ['400 700'],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['sans-serif'],
    },
  ],
});