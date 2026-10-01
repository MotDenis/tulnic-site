// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://tulnic.ro',
  // Păstrează spațiile dintre text și linkurile aflate pe rânduri diferite, ca în HTML.
  compressHTML: true,
  // Fontul pentru nume și titluri. Astro îl descarcă la build și îl servește de pe site.
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Source Serif 4',
      cssVariable: '--font-heading',
      weights: [600],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['serif'],
    },
  ],
});