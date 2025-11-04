import { defineContentConfig, defineCollection, z } from "@nuxt/content";

// Common schema for all content
const commonSchema = z.object({
  id: z.number().or(z.string()),
  title: z.string(),
  slug: z.string(),
  category: z.string(),
  difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
  tags: z.array(z.string()).optional(),
})

export default defineContentConfig({
  collections: {
    // English content collection
    content_en: defineCollection({
      type: 'page',
      source: {
        include: 'en/**',
        prefix: '',
      },
    }),
    // French content collection
    content_fr: defineCollection({
      type: 'page',
      source: {
        include: 'fr/**',
        prefix: '',
      },
    }),
  },
});
