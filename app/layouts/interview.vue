<script setup lang="ts">
import type { Question } from '~/types'

// Get current locale from i18n
const { locale } = useI18n()

// Fetch all questions for the TOC with i18n support
const { data: questions } = await useAsyncData(`all-questions-${locale.value}`, async () => {
  // Use the correct collection based on locale
  const collectionName = locale.value === 'fr' ? 'content_fr' : 'content_en'
  const allContent = await queryCollection(collectionName).all()
  return allContent.sort((a, b) => (Number(a.id) || 0) - (Number(b.id) || 0)) as unknown as Question[]
}, {
  watch: [locale] // Refetch when locale changes
})

// Mobile sidebar state
const isSidebarOpen = ref(false)

// Toggle sidebar on mobile
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

// Close sidebar when route changes (mobile)
const route = useRoute()
watch(() => route.path, () => {
  isSidebarOpen.value = false
})

// Initialize keyboard shortcuts
const { showHelp } = useKeyboardShortcuts()
</script>

<template>
  <UApp>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
      <!-- Header -->
      <header class="sticky top-0 z-50 border-b bg-white/80 backdrop-blur dark:bg-gray-950/80 dark:border-gray-800">
        <div class="container mx-auto px-4 py-4">
          <div class="flex items-center justify-between">
            <!-- Logo / Title -->
            <div class="flex items-center gap-4">
              <UButton
                icon="i-heroicons-bars-3"
                color="neutral"
                variant="ghost"
                class="lg:hidden"
                @click="toggleSidebar"
              />
              <NuxtLink to="/" class="flex items-center gap-2">
                <UIcon name="i-heroicons-code-bracket" class="text-2xl text-primary-500" />
                <span class="font-bold text-lg hidden sm:block">JS Interview Prep</span>
              </NuxtLink>
            </div>

            <!-- Header Actions -->
            <div class="flex items-center gap-2">
              <UButton
                icon="i-heroicons-magnifying-glass"
                color="neutral"
                variant="ghost"
                size="sm"
                to="/"
              >
                <span class="hidden sm:inline">Search</span>
              </UButton>
              <UButton
                icon="i-heroicons-question-mark-circle"
                color="neutral"
                variant="ghost"
                size="sm"
                @click="showHelp = true"
              >
                <span class="hidden sm:inline">Aide</span>
              </UButton>
              <LanguageSwitcher />
              <UColorModeButton />
            </div>
          </div>
        </div>
      </header>

      <!-- Main Content Area -->
      <div class="container mx-auto px-4 py-6">
        <div class="flex gap-6">
          <!-- Sidebar (Desktop) -->
          <aside class="hidden lg:block w-80 shrink overflow-y-auto max-h-lvh h-svh">
            <TableOfContents v-if="questions" :questions="questions" />
          </aside>

          <!-- Mobile Sidebar (Overlay) -->
          <Transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <div
              v-if="isSidebarOpen"
              class="fixed inset-0 z-40 bg-black/50 lg:hidden"
              @click="toggleSidebar"
            />
          </Transition>

          <Transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="-translate-x-full"
            enter-to-class="translate-x-0"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="translate-x-0"
            leave-to-class="-translate-x-full"
          >
            <aside
              v-if="isSidebarOpen"
              class="fixed left-0 top-0 bottom-0 z-50 w-80 bg-white dark:bg-gray-950 lg:hidden overflow-y-auto p-4"
            >
              <div class="flex items-center justify-between mb-4">
                <h2 class="font-bold text-lg">Questions</h2>
                <UButton
                  icon="i-heroicons-x-mark"
                  color="neutral"
                  variant="ghost"
                  size="sm"
                  @click="toggleSidebar"
                />
              </div>
              <TableOfContents v-if="questions" :questions="questions" />
            </aside>
          </Transition>

          <!-- Main Content -->
          <main class="flex-1 min-w-0">
            <slot />
          </main>
        </div>
      </div>

      <!-- Footer -->
      <footer class="border-t mt-12 bg-white dark:bg-gray-950 dark:border-gray-800">
        <div class="container mx-auto px-4 py-6">
          <div class="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600 dark:text-gray-400">
            <p>
              Built with
              <UIcon name="i-heroicons-heart-solid" class="text-red-500 inline" />
              using Nuxt 4 & Nuxt UI
            </p>
            <div class="flex items-center gap-4">
              <NuxtLink to="/" class="hover:text-primary-500 transition-colors">
                Home
              </NuxtLink>
              <UButton
                to="https://github.com"
                target="_blank"
                icon="i-heroicons-code-bracket"
                color="neutral"
                variant="ghost"
                size="xs"
              >
                GitHub
              </UButton>
            </div>
          </div>
        </div>
      </footer>

      <!-- Keyboard Shortcuts Help Modal -->
      <KeyboardShortcutsHelp />
    </div>
  </UApp>
</template>
