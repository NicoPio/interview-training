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
