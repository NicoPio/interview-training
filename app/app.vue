<script setup lang="ts">
const { locale } = useI18n()

// Set HTML lang attribute dynamically
useHead({
  htmlAttrs: {
    lang: locale.value,
  },
})

// Update lang attribute when locale changes
watch(locale, (newLocale) => {
  if (import.meta.client) {
    document.documentElement.lang = newLocale
  }
})
</script>

<template>
  <UApp>
    <!-- Skip to main content link for accessibility -->
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-500 focus:text-white focus:rounded focus:shadow-lg"
    >
      Aller au contenu principal
    </a>

    <NuxtLayout>
      <!-- Wrap page in main with ID for skip link -->
      <main id="main-content" tabindex="-1">
        <NuxtPage />
      </main>
    </NuxtLayout>
  </UApp>
</template>
