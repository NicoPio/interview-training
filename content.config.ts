import { defineContentConfig, defineCollection, z } from '@nuxt/content'

// Common schema for all content (reserved for future use)
const _commonSchema = z.object({
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
    // Homepage French content
    home_fr: defineCollection({
      type: 'page',
      source: 'home/fr/**',
      schema: z.object({
        title: z.string().describe('Titre de la page'),
        description: z.string().describe('Description de la page'),
        hero: z.object({
          title: z.string().describe('Titre principal du hero'),
          subtitle: z.string().describe('Sous-titre du hero'),
          primary_cta: z.object({
            text: z.string().describe('Texte du bouton principal'),
            link: z.string().describe('Lien du bouton principal'),
          }),
          secondary_cta: z.object({
            text: z.string().describe('Texte du bouton secondaire'),
            link: z.string().describe('Lien du bouton secondaire'),
          }),
        }),
        stats: z.object({
          total_label: z.string().describe('Label "Total"'),
          easy_label: z.string().describe('Label "Easy"'),
          medium_label: z.string().describe('Label "Medium"'),
          hard_label: z.string().describe('Label "Hard"'),
        }),
        categories: z.array(
          z.object({
            id: z.enum(['javascript', 'html', 'css', 'vuejs', 'reactjs']).describe('ID de la catégorie'),
            label: z.string().describe('Label affiché'),
            icon: z.string().editor({ input: 'icon' }).describe('Icône Heroicons'),
            color: z.enum(['blue', 'orange', 'indigo', 'green', 'cyan']).describe('Couleur principale'),
          })
        ).describe('Liste des catégories affichées'),
        questions_section: z.object({
          title: z.string().describe('Titre de la section questions'),
          filters_title: z.string().describe('Titre de la section filtres'),
        }),
        empty_state: z.object({
          icon: z.string().editor({ input: 'icon' }).describe('Icône de l\'état vide'),
          title: z.string().describe('Titre quand aucun résultat'),
          description: z.string().describe('Description de l\'état vide'),
          reset_button: z.string().describe('Texte du bouton reset'),
        }),
        footer: z.object({
          text: z.string().describe('Texte du footer'),
        }),
        seo: z.object({
          title: z.string().describe('Titre SEO'),
          description: z.string().describe('Description SEO'),
          og_image: z.string().describe('Image Open Graph'),
        }),
      }),
    }),
    // Homepage English content
    home_en: defineCollection({
      type: 'page',
      source: 'home/en/**',
      schema: z.object({
        title: z.string().describe('Page title'),
        description: z.string().describe('Page description'),
        hero: z.object({
          title: z.string().describe('Main hero title'),
          subtitle: z.string().describe('Hero subtitle'),
          primary_cta: z.object({
            text: z.string().describe('Primary button text'),
            link: z.string().describe('Primary button link'),
          }),
          secondary_cta: z.object({
            text: z.string().describe('Secondary button text'),
            link: z.string().describe('Secondary button link'),
          }),
        }),
        stats: z.object({
          total_label: z.string().describe('Label for "Total"'),
          easy_label: z.string().describe('Label for "Easy"'),
          medium_label: z.string().describe('Label for "Medium"'),
          hard_label: z.string().describe('Label for "Hard"'),
        }),
        categories: z.array(
          z.object({
            id: z.enum(['javascript', 'html', 'css', 'vuejs', 'reactjs']).describe('Category ID'),
            label: z.string().describe('Display label'),
            icon: z.string().editor({ input: 'icon' }).describe('Heroicons icon'),
            color: z.enum(['blue', 'orange', 'indigo', 'green', 'cyan']).describe('Primary color'),
          })
        ).describe('List of displayed categories'),
        questions_section: z.object({
          title: z.string().describe('Questions section title'),
          filters_title: z.string().describe('Filters section title'),
        }),
        empty_state: z.object({
          icon: z.string().editor({ input: 'icon' }).describe('Empty state icon'),
          title: z.string().describe('Title when no results'),
          description: z.string().describe('Empty state description'),
          reset_button: z.string().describe('Reset button text'),
        }),
        footer: z.object({
          text: z.string().describe('Footer text'),
        }),
        seo: z.object({
          title: z.string().describe('SEO title'),
          description: z.string().describe('SEO description'),
          og_image: z.string().describe('Open Graph image'),
        }),
      }),
    }),
  },
})
