// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  // Enable SSR for proper content rendering
  ssr: true,

  vite: { plugins: [tailwindcss()] },
  css: ["./app/assets/css/main.css"],
  modules: [
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/test-utils/module",
    "@nuxt/ui",
    "@vueuse/nuxt",
    "@nuxtjs/i18n",
    "@nuxtjs/sitemap",
    'nuxt-studio'
  ],
  i18n: {
    locales: [
      { code: 'en', name: 'English', language: 'en-US', dir: 'ltr', files: ['en.json'] },
      { code: 'fr', name: 'French', language: 'fr-FR', files: ['fr.json'] },
    ],
    strategy: 'prefix',
    defaultLocale: 'fr',
  },

  // GitHub Pages configuration
  nitro: {
    preset: 'github-pages',
    prerender: {
      routes: ['/'],
      crawlLinks: true, // Auto-discover all routes
    }
  },

  // GitHub Pages base URL (uncomment and update if deploying to a repo page)
  app: {
    baseURL: '/interview-training/'
  },

  // Sitemap configuration
  site: {
    url: 'https://nicopio.github.io/interview-training',
    name: 'JS Interview Prep'
  },

  sitemap: {
    strictNuxtContentPaths: true,
    exclude: [
      '/_studio/**',
      '/api/**'
    ]
  },
  content: {
    preview: {
      api: 'https://api.nuxt.studio'
    }
  },
  studio: {
    // Studio admin route (default: '/_studio')
    route: '/_studio',

    // GitHub repository configuration (owner and repo are required)
    repository: {
      provider: 'github', // only GitHub is currently supported
      owner: 'NicoPio', // your GitHub username or organization
      repo: 'interview-training', // your repository name (not full URL)
      branch: 'main', // the branch to commit to (default: main)
      rootDir: '' // Nuxt app is at the root of the repository
    }
  },
});