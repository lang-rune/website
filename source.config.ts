import { defineConfig, defineDocs } from 'fumadocs-mdx/config';
import runeGrammar from './src/lib/rune-grammar/rune.tmLanguage.json';
import { runeTheme } from './src/lib/rune-grammar/rune-theme';

export const { docs, meta } = defineDocs({
  dir: 'content/docs',
});

export default defineConfig({
  mdxOptions: {
    rehypeCodeOptions: {
      langs: [
        {
          ...runeGrammar,
          name: 'rune',
        } as any
      ],
      themes: {
        light: runeTheme as any,
        dark: runeTheme as any,
      },
    },
  },
});