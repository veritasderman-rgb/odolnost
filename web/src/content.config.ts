import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const obsah = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content' }),
  schema: z.object({
    title: z.string(),
    id: z.string(),
    popis: z.string().max(260),
    poradi: z.number().default(99),
    druh: z.enum(['modelovy', 'svedectvi']).optional(),
    cteni: z.number().optional(),
    krok: z.string().optional(),
    zdroje: z
      .array(z.object({ nazev: z.string(), url: z.string().url().optional(), datum: z.union([z.string(), z.number()]).optional() }))
      .default([]),
    autor: z.string().default('Redakce Víme, co dělat'),
    recenze: z.string().default('Čeká na odbornou revizi'),
    revidovano: z.union([z.string(), z.date()]).optional(),
    stav: z.enum(['navrh', 'revize', 'schvaleno']).default('navrh'),
  }),
});

export const collections = { obsah };
