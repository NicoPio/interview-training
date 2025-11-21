/**
 * Global type definitions for the JS Interview Prep app
 */

/** Question difficulty level (easy, medium, or hard) */
export type DifficultyLevel = 'easy' | 'medium' | 'hard'

/** Question category (javascript, html, css, vuejs, reactjs) */
export type Category = 'javascript' | 'html' | 'css' | 'vuejs' | 'reactjs'

/** Filter status for question progress filtering */
export type FilterStatus = 'all' | 'not-seen' | 'seen' | 'mastered'

/**
 * Question structure from Nuxt Content
 *
 * This type represents the shape of questions fetched from Nuxt Content collections.
 * Each question has metadata and content stored in markdown files.
 */
export interface Question {
  /** Unique question ID */
  id: string | number

  /** Question title (can be at root or in meta) */
  title?: string

  /** Question metadata */
  meta: {
    /** Question title */
    title: string
    /** URL-friendly slug */
    slug: string
    /** Question category (e.g., 'javascript', 'vue') */
    category: string
    /** Difficulty level */
    difficulty?: DifficultyLevel
    /** Tags for filtering and search */
    tags?: string[]
  }

  /** Content path from Nuxt Content */
  _path?: string
}

/** Category color mapping */
export type CategoryColor = 'blue' | 'orange' | 'indigo' | 'green' | 'cyan'

/**
 * Homepage content structure from Nuxt Studio
 *
 * This type represents the shape of the homepage content managed in Nuxt Studio.
 * Content is stored in content/home/{locale}/index.md files.
 */
export interface HomeContent {
  /** Page title */
  title: string

  /** Page description */
  description: string

  /** Hero section content */
  hero: {
    /** Main hero title */
    title: string
    /** Hero subtitle */
    subtitle: string
    /** Primary CTA button */
    primary_cta: {
      text: string
      link: string
    }
    /** Secondary CTA button */
    secondary_cta: {
      text: string
      link: string
    }
  }

  /** Stats labels */
  stats: {
    total_label: string
    easy_label: string
    medium_label: string
    hard_label: string
  }

  /** Categories configuration */
  categories: Array<{
    id: Category
    label: string
    icon: string
    color: CategoryColor
  }>

  /** Questions section labels */
  questions_section: {
    title: string
    filters_title: string
  }

  /** Empty state content */
  empty_state: {
    icon: string
    title: string
    description: string
    reset_button: string
  }

  /** Footer content */
  footer: {
    text: string
  }

  /** SEO metadata */
  seo: {
    title: string
    description: string
    og_image: string
  }

  /** Content ID from Nuxt Content */
  _id?: string
}
