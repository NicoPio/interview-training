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
    "@nuxt/test-utils",
    "@nuxt/ui",
    "@vueuse/nuxt",
    "motion-v/nuxt",
    "@nuxtjs/i18n",
  ],
  i18n: {
    locales: [
      { code: 'en', name: 'English', language: 'en-US', dir: 'ltr' },
      { code: 'fr', name: 'French', language: 'fr-FR' },
    ],
    strategy: 'prefix_except_default',
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
  // app: {
  //   baseURL: '/your-repo-name/',
  // },
  content: {
    preview: {
      api: 'https://api.nuxt.studio'
    }
  }
});