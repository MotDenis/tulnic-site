// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://tulnic.ro',
  // Păstrează spațiile dintre text și linkurile aflate pe rânduri diferite, ca în HTML.
  compressHTML: true,
});